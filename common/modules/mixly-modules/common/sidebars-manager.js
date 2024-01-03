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
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-manager.html'));
        this.TAB_TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/left-sidebar-tab.html'));
        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'local_storage'], SideBarLocalStorage);

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
        const $manager = $(XML.render(SideBarsManager.TEMPLATE, {
            mId: ids.managerId
        }));
        const $tab = $(XML.render(SideBarsManager.TAB_TEMPLATE, {
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

Mixly.SideBarsManager = SideBarsManager;

});