goog.loadJs('common', () => {

goog.require('monaco');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorMonaco');

const {
    XML,
    Msg,
    EditorBase
} = Mixly;

class EditorMonaco extends EditorBase {
    static {
        this.CTRL_BTNS = ['resetFontSize', 'increaseFontSize', 'decreaseFontSize'];
        this.CTRL_BTN_TEMPLATE = '<div m-id="{{d.mId}}" class="code-editor-btn setFontSize"></div>';
    }

    constructor(dom) {
        super();
        this.$container = $(dom);
        this.destroyed = false;
        this.$content = this.$container;
    }

    init() {
        this.editor = monaco.editor.create(this.$container[0], {
            language: 'javascript',
            theme: 'vs-dark'
        });
        this.addCursorLayer();
        /*this.resetFontSize();
        this.addCursorLayer();
        this.addCursorEvent();
        this.addDefaultCommand();*/
    }

    dispose() {
        this.editor.dispose();
        this.destroyed = true;
    }

    setValue(data, scroll = true) {
        if (this.destroyed) {
            return;
        }
        this.editor.updateSelectionMarkers();
        const { selection } = this.editor;
        const initCursor = selection.getCursor();
        if (this.getValue() !== data) {
            this.editor.setValue(data);
        }
        if (scroll) {
            this.scrollToBottom();
        } else {
            selection.moveCursorTo(initCursor.row, initCursor.column, true);
            selection.clearSelection();
        }
    }

    addValue(data) {
        const prevData = this.getValue();
        this.setValue(prevData + data);
    }

    getValue() {
        return this.destroyed ? '' : this.editor.getValue();
    }

    clear() {
        this.setValue('', true);
    }

    scrollToBottom() {
        if (this.destroyed) {
            return;
        }
    }

    scrollToTop() {
        if (this.destroyed) {
            return;
        }
    }

    addCursorLayer() {
        this.cursorLayer = tippy(this.$container.find('.monaco-mouse-cursor-text')[0], {
            content: Msg.Lang['此视图只读'],
            trigger: 'manual',
            hideOnClick: true,
            delay: 0,
            duration: [ 0, 0 ],
            placement: 'right',
            offset: [ 0, 0 ],
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['top-end', 'right']
                        }
                    }
                ]
            }
        });
    }

    addCursorEvent() {
        
    }

    undo() {
        test.editor.getModel().undo();
    }

    redo() {
        test.editor.getModel().redo();
    }

    resize() {
    	this.editor.layout();
    }

    cut() {
        
    }

    copy() {
        
    }

    paste() {
        
    }
}

Mixly.EditorMonaco = EditorMonaco;

});