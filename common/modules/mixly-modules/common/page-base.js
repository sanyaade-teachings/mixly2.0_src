goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.provide('Mixly.PageBase');

const { Events } = Mixly;

class PageBase {
    #dirty = false;

    constructor() {
        this.$content = null;
        this.$tab = null;
        this.inited = false;
        this.isActivated = true;
        this.events = new Events(['addDirty', 'removeDirty', 'destroyed', 'created', 'active']);
    }

    init() {
        this.events.run('created');
    }

    getContainer() {
        return this.$content;
    }

    resize() {}

    dispose() {
        this.events.run('destroyed');
        this.getContainer().remove();
    }

    onMounted() {
        this.isActivated = true;
        this.events.run('active');
    }

    onUnmounted() {
        this.isActivated = false;
    }

    setTab($tab) {
        this.$tab = $tab;
    }

    getTab() {
        return this.$tab;
    }

    addDirty() {
        const $tab = this.getTab();
        if (!$tab || this.isDirty()) {
            return;
        }
        $tab.addClass('dirty');
        this.events.run('addDirty');
        this.#dirty = true;
    }

    removeDirty() {
        const $tab = this.getTab();
        if (!$tab || !this.isDirty()) {
            return;
        }
        this.events.run('removeDirty');
        $tab.removeClass('dirty');
        this.#dirty = false;
    }

    isDirty() {
        return this.#dirty;
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

Mixly.PageBase = PageBase;

});