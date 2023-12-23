goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.require('Mixly.PageBase');
goog.provide('Mixly.EditorBase');

const { Events, PageBase } = Mixly;

class EditorBase extends PageBase {
    constructor() {
        super();
        this.$btnsContent = null;
    }

    getBtnsContainer() {
        return this.$btnsContent;
    }

    setValue(data, ext) {
        this.removeDirty();
    }

    undo() {}

    redo() {}
}

Mixly.EditorBase = EditorBase;

});