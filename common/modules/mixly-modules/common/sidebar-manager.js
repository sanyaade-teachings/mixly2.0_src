goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.SideBarBoardStorageAmpy');
goog.require('Mixly.SideBarBoardStorageEsptool');
goog.require('Mixly.SideBarLocalStorage');
goog.require('Mixly.PagesManager');
goog.provide('Mixly.SideBarsManager');

const {
    IdGenerator,
    XML,
    Env,
    Msg,
    Registry,
    Events,
    StatusBarTerminal,
    StatusBarSerial,
    PagesManager
} = Mixly;

class SideBarsManager extends PagesManager {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager.html'));
        this.TAB_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar/statusbar-tab.html'));
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager-menu.html'));
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
        const ids = IdGenerator.generate(['managerId', 'tabId']);
        const $manager = $(XML.render(StatusBarsManager.TEMPLATE, {
            mId: ids.managerId
        }));
        const $tab = $(XML.render(StatusBarsManager.TAB_TEMPLATE, {
            mId: ids.tabId
        }));
        super({
            parentElem: element,
            managerId: ids.managerId,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabId: ids.tabId,
            tabContentElem: $tab[0],
            typesRegistry: StatusBarsManager.typesRegistry
        });
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
                const menuTemplate = XML.render(StatusBarsManager.MENU_TEMPLATE, options);
                instance.setContent(menuTemplate);
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