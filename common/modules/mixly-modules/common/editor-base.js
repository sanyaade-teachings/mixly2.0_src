goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.require('Mixly.PageBase');
goog.provide('Mixly.EditorBase');

const { Events, PageBase } = Mixly;

class EditorBase extends PageBase {
    #$btnsContent_ = null;

    constructor() {
        super();
    }

    getBtnsContent() {
        return this.#$btnsContent_;
    }

    setBtnsContent($elem) {
        this.#$btnsContent_ = $elem;
    }

    setValue(data, ext) {
        this.removeDirty();
    }

    undo() {}

    redo() {}
}

Mixly.EditorBase = EditorBase;

});