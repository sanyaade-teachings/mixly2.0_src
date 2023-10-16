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

    constructor(selector) {
        this.selector = selector;
        this.events = new Events([ 'getMenu' ]);
        $.contextMenu({
            selector,
            build: ($trigger, e) => {
                return { items: this.getMenu() }
            },
            animation: { duration: 0, show: 'show', hide: 'hide' }
        });
    }

    getMenu() {
        const outputs = this.events.run('getMenu');
        if (!outputs.length) {
            return {};
        }
        return outputs[0] ?? {};
    }

    dispose() {
        $.contextMenu('destroy', this.selector);
    }
}

Mixly.ContextMenu = ContextMenu;

});