goog.loadJs('common', () => {

goog.require('$.contextMenu');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.provide('Mixly.ContextMenu');

const {
    XML,
    Env,
    Events,
    Registry
} = Mixly;

class ContextMenu {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'context-menu-item.html'));
        this.getItem = (name, hotKey) => XML.render(ContextMenu.TEMPLATE, { name, hotKey });

        this.generate = (menu, $trigger) => {
            let menuItems = {};
            for (let item of menu.getAllItems()) {
                if (typeof item.preconditionFn === 'function'
                    && !item.preconditionFn($trigger)) {
                    continue;
                }
                menuItems[item.type] = item.data;
            }
            return menuItems;
        }
    }

    #menus_ = new Registry();
    #events_ = new Events(['getMenu']);
    constructor(selector, config = {}) {
        this.selector = selector;
        this.menu = $.contextMenu({
            selector,
            build: ($trigger) => {
                return { items: this.#getMenu_($trigger) }
            },
            animation: { duration: 0, show: 'show', hide: 'hide' },
            ...config
        });
    }

    #getMenu_($trigger, e) {
        const outputs = this.#events_.run('getMenu', $trigger, e);
        if (!outputs.length) {
            return {};
        }
        const menu = this.#menus_.getItem(outputs[0]);
        if (!menu) {
            return {};
        }
        return ContextMenu.generate(menu, $trigger, e);
    }

    dispose() {
        $.contextMenu('destroy', this.selector);
        this.#events_.reset();
        this.#menus_.reset();
        this.menu = null;
        this.selector = null;
    }

    hide() {
        $(this.selector).contextMenu('hide');
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType) {
        this.#events_.run(eventsType);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    register(id, menu) {
        this.#menus_.register(id, menu);
    }

    unregister(id) {
        this.#menus_.unregister(id);
    }

    getItem(id) {
        return this.#menus_.getItem(id);
    }
}

Mixly.ContextMenu = ContextMenu;

});