goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.require('Mixly.PageBase');
goog.provide('Mixly.EditorBase');

const { Events, PageBase } = Mixly;

class EditorBase extends PageBase {
    constructor() {
        super();
        this.events = new Events(['onAddDirty', 'onRemoveDirty']);
        this.$btnsGroup = null;
        this.dirty = false;
    }

    getBtnsContainer() {
        return this.$btnsContent;
    }

    addDirty() {
        super.addDirty();
        const $tab = this.getTab();
        if (!$tab || this.isDirty()) {
            return;
        }
        this.events.run('onAddDirty', $tab);
    }

    removeDirty() {
        super.removeDirty();
        const $tab = this.getTab();
        if (!$tab || !this.isDirty()) {
            return;
        }
        this.events.run('onRemoveDirty', $tab);
    }

    setValue(data, ext) {
        this.removeDirty();
    }

    undo() {}

    redo() {}
}

Mixly.EditorBase = EditorBase;

});