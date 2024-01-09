goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.StatusBarTerminal');
goog.require('Mixly.StatusBarSerial');
goog.require('Mixly.PagesManager');
goog.provide('Mixly.StatusBarsManager');

const {
    XML,
    Env,
    Msg,
    Registry,
    Events,
    HTMLTemplate,
    StatusBarTerminal,
    StatusBarSerial,
    PagesManager
} = Mixly;

class StatusBarsManager extends PagesManager {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager.html')))
        );
        HTMLTemplate.add(
            'statusbar/statusbar-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-tab.html')))
        );
        HTMLTemplate.add(
            'statusbar/statusbar-manager-menu.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager-menu.html')))
        );
        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'terminal'], StatusBarTerminal);
        this.typesRegistry.register(['serial'], StatusBarSerial);

        this.getMain = function() {
            if (!this.managersRegistry.length()) {
                return null;
            }
            const key = this.managersRegistry.keys()[0];
            return this.managersRegistry.getItem(key);
        }

        this.add = function(manager) {
            this.managersRegistry.register(manager.id, manager);
        }

        this.remove = function(manager) {
            this.managersRegistry.unregister(manager.id);
        }
    }

    constructor(element) {
        const managerHTMLTemplate = HTMLTemplate.get('statusbar/statusbar-manager.html');
        const tabHTMLTemplate = HTMLTemplate.get('statusbar/statusbar-tab.html');
        const $manager = $(managerHTMLTemplate.render());
        const $tab = $(tabHTMLTemplate.render());
        super({
            parentElem: element,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabContentElem: $tab[0],
            typesRegistry: StatusBarsManager.typesRegistry
        });
        this.id = managerHTMLTemplate.id;
        this.$btn = $tab.find('.operation > button');
        this.shown = false;
        this.events = new Events(['show', 'hide', 'onSelectMenu', 'getMenu']);
        this.#addMenuBtn_();
        StatusBarsManager.add(this);
    }

    getStatusBarById(id) {
        return this.get(id);
    }

    removeStatusBarById(id) {
        this.remove(id);
    }

    show() {
        this.events.run('show');
    }

    hide() {
        this.events.run('hide');
    }
    
    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    isShown() {
        return this.shown;
    }

    #addMenuBtn_() {
        this.$menu = tippy(this.$btn[0], {
            allowHTML: true,
            content: '',
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 6 ],
            appendTo: document.body,
            onMount: (instance) => {
                let options = this.#getMenu_() ?? {};
                options.list = options.list ?? [];
                options.empty = options.empty ?? Msg.Lang['无选项'];
                const menuHTMLTemplate = HTMLTemplate.get('statusbar/statusbar-manager-menu.html');
                instance.setContent(menuHTMLTemplate.render(options));
                $(instance.popper).find('li').off().click((event) => {
                    this.#onSelectMenu_(event);
                    this.$menu.hide(100);
                });
            }
        });
    }

    #onSelectMenu_(event) {
        this.events.run('onSelectMenu', event);
    }

    #getMenu_() {
        let menus = this.events.run('getMenu');
        if (menus && menus.length) {
            return menus[0];
        }
        return { list: [], empty: Msg.Lang['无选项'] };
    }

    dispose() {
        StatusBarsManager.remove(this);
    }

    bind(type, func) {
        return this.events.bind(type, func);
    }

    unbind(id) {
        this.events.unbind(id);
    }

    off(type) {
        this.events.off(type);
    }
}

Mixly.StatusBarsManager = StatusBarsManager;

});