goog.loadJs('common', () => {

goog.require('Mixly');
goog.provide('Mixly.PageBase');

class PageBase {
    #dirty = false;

    constructor() {
        this.$content = null;
        this.$tab = null;
        this.inited = false;
        this.isActivated = true;
    }

    init() {}

    getContainer() {
        return this.$content;
    }

    resize() {}

    dispose() {}

    onMounted() {
        this.isActivated = true;
    }

    onUnmounted() {
        this.isActivated = false;
        this.getContainer()?.detach();
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
        this.#dirty = true;
    }

    removeDirty() {
        const $tab = this.getTab();
        if (!$tab || !this.isDirty()) {
            return;
        }
        $tab.removeClass('dirty');
        this.#dirty = false;
    }

    isDirty() {
        return this.#dirty;
    }
}

Mixly.PageBase = PageBase;

});