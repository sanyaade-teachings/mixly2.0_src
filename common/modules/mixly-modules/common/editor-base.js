goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.provide('Mixly.EditorBase');

const { Events } = Mixly;

class EditorBase {
    constructor() {
        this.events = new Events(['onAddDirty', 'onRemoveDirty']);
        this.$content = null;
        this.$tab = null;
        this.dirty = false;
    }

    init() {}

    getContainer() {
        return this.$content;
    }

    resize() {}

    dispose() {}

    onMounted() {}

    onUnmounted() {}

    addDirty() {
        if (!this.$tab || this.dirty) {
            return;
        }
        this.events.run('onAddDirty', this.$tab);
        this.$tab.addClass('dirty');
        this.dirty = true;
    }

    removeDirty() {
        if (!this.$tab || !this.dirty) {
            return;
        }
        this.events.run('onRemoveDirty', this.$tab);
        this.$tab.removeClass('dirty');
        this.dirty = false;
    }

    setTab($tab) {
        this.$tab = $tab;
    }

    setValue(data, ext) {
        this.removeDirty();
    }

    undo() {}

    redo() {}
}

Mixly.EditorBase = EditorBase;

});