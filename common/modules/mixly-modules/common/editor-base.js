goog.loadJs('common', () => {

goog.provide('Mixly.EditorBase');

class EditorBase {
    constructor() {
        this.$content = null;
    }

    init() {}

    getContainer() {
        return this.$content;
    }

    resize() {}

    dispose() {}

    onMounted() {}

    onUnmounted() {}

    setValue(data, ext) {}

    undo() {}

    redo() {}
}

Mixly.EditorBase = EditorBase;

});