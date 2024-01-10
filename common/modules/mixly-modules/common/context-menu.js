goog.loadJs('common', () => {

goog.require('$.contextMenu');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Events');
goog.provide('Mixly.ContextMenu');

const {
    XML,
    Env,
    Events
} = Mixly;

class ContextMenu {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'context-menu-item.html'));
        this.getItem = (name, hotKey) => XML.render(ContextMenu.TEMPLATE, { name, hotKey });
    }

    constructor(selector, config = {}) {
        this.selector = selector;
        this.events = new Events(['getMenu']);
        this.menu = $.contextMenu({
            selector,
            build: ($trigger, e) => {
                return { items: this.#getMenu_($trigger, e) }
            },
            animation: { duration: 0, show: 'show', hide: 'hide' },
            ...config
        });
    }

    #getMenu_($trigger, e) {
        const outputs = this.events.run('getMenu', $trigger, e);
        if (!outputs.length) {
            return {};
        }
        return outputs[0] ?? {};
    }

    dispose() {
        $.contextMenu('destroy', this.selector);
        this.events.reset();
        this.menu = null;
        this.selector = null;
    }

    hide() {
        $(this.selector).contextMenu('hide');
    }

    bind(type, func) {
        return this.events.bind(type, func);
    }

    unbind(id) {
        this.events.unbind(id);
    }

    addEventsType(eventsType) {
        this.events.addType(eventsType);
    }

    runEvent(eventsType) {
        this.events.run(eventsType);
    }

    offEvent(eventsType) {
        this.events.off(eventsType);
    }
}

Mixly.ContextMenu = ContextMenu;

});