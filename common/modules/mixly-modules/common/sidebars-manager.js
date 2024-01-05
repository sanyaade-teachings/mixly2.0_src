goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.SideBarLocalStorage');
goog.require('Mixly.PagesManager');
goog.provide('Mixly.SideBarsManager');
goog.provide('Mixly.LeftSideBarsManager');
goog.provide('Mixly.RightSideBarsManager');

const {
    IdGenerator,
    XML,
    Env,
    Msg,
    Registry,
    Events,
    SideBarLocalStorage,
    PagesManager
} = Mixly;

class SideBarsManager extends PagesManager {
    static {
        this.LEFT_MANAGER_TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-manager.html'));
        this.LEFT_TAB_TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-tab.html'));
        this.RIGHT_MANAGER_TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/right-sidebar-manager.html'));
        this.RIGHT_TAB_TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/right-sidebar-tab.html'));
        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'local_storage'], SideBarLocalStorage);
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
        let managerTemplate = '', tabTemplate = '';
        if (align === SideBarsManager.Align.RIGHT) {
            managerTemplate = SideBarsManager.RIGHT_MANAGER_TEMPLATE;
            tabTemplate = SideBarsManager.RIGHT_TAB_TEMPLATE;
        } else {
            managerTemplate = SideBarsManager.LEFT_MANAGER_TEMPLATE;
            tabTemplate = SideBarsManager.LEFT_TAB_TEMPLATE;
        }
        const ids = IdGenerator.generate(['managerId', 'tabId']);
        const $manager = $(XML.render(managerTemplate, {
            mId: ids.managerId
        }));
        const $tab = $(XML.render(tabTemplate, {
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
            typesRegistry: SideBarsManager.typesRegistry
        });
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