goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.SideBarLocalStorage');
goog.require('Mixly.SideBarLibs');
goog.require('Mixly.PagesManager');
goog.provide('Mixly.SideBarsManager');
goog.provide('Mixly.LeftSideBarsManager');
goog.provide('Mixly.RightSideBarsManager');

const {
    XML,
    Env,
    Msg,
    Registry,
    Events,
    HTMLTemplate,
    SideBarLocalStorage,
    SideBarLibs,
    PagesManager
} = Mixly;

class SideBarsManager extends PagesManager {
    static {
        HTMLTemplate.add(
            'sidebar/left-sidebar-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-manager.html')))
        );

        HTMLTemplate.add(
            'sidebar/left-sidebar-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-tab.html')))
        );

        HTMLTemplate.add(
            'sidebar/right-sidebar-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/right-sidebar-manager.html')))
        );

        HTMLTemplate.add(
            'sidebar/right-sidebar-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/right-sidebar-tab.html')))
        );

        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'local_storage'], SideBarLocalStorage);
        this.typesRegistry.register(['libs'], SideBarLibs);
        this.Align = {
            LEFT: 0,
            RIGHT: 1,
            0: 'LEFT',
            1: 'RIGHT'
        };

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

    constructor(element, align = SideBarsManager.Align.LEFT) {
        let managerHTMLTemplate = '', tabHTMLTemplate = '';
        if (align === SideBarsManager.Align.RIGHT) {
            managerHTMLTemplate = HTMLTemplate.get('sidebar/right-sidebar-manager.html');
            tabHTMLTemplate = HTMLTemplate.get('sidebar/right-sidebar-tab.html');
        } else {
            managerHTMLTemplate = HTMLTemplate.get('sidebar/left-sidebar-manager.html');
            tabHTMLTemplate = HTMLTemplate.get('sidebar/left-sidebar-tab.html');
        }
        const $manager = $(managerHTMLTemplate.render());
        const $tab = $(tabHTMLTemplate.render());
        super({
            parentElem: element,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabContentElem: $tab[0],
            typesRegistry: SideBarsManager.typesRegistry
        });
        this.id = managerHTMLTemplate.id;
        this.shown = false;
        this.events = new Events(['show', 'hide']);
        SideBarsManager.add(this);
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

    dispose() {
        SideBarsManager.remove(this);
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

class LeftSideBarsManager extends SideBarsManager {
    constructor(element) {
        super(element, SideBarsManager.Align.LEFT);
    }
}

class RightSideBarsManager extends SideBarsManager {
    constructor(element) {
        super(element, SideBarsManager.Align.RIGHT);
    }
}

Mixly.SideBarsManager = SideBarsManager;
Mixly.LeftSideBarsManager = LeftSideBarsManager;
Mixly.RightSideBarsManager = RightSideBarsManager;

});