goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.provide('Mixly.EditorAce');

const { XML, Msg } = Mixly;

class EditorAce {
    static {
        this.CTRL_BTNS = ['resetFontSize', 'increaseFontSize', 'decreaseFontSize'];
        this.CTRL_BTN_TEMPLATE = '<div m-id="{{d.mId}}" class="code-editor-btn setFontSize"></div>';
        this.MENU_TEMPLATE = '<div style="float:left;">{{d.name}}&nbsp</div><div style="float:right;">&nbsp{{d.hotKey}}</div>';
    }

    constructor(dom) {
        this.$container = $(dom);
        this.destroyed = false;
    }

    init() {
        this.editor = ace.edit(this.$container[0]);
        this.resetFontSize();
        this.addCursorLayer();
        this.addCursorEvent();
        this.addDefaultCommand();
    }

    dispose() {
        this.editor.destroy();
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
        if (this.destroyed) {
            return;
        }
        this.editor.updateSelectionMarkers();
        const { selection, session } = this.editor;
        const initCursor = selection.getCursor();
        this.scrollToBottom();
        this.editor.insert(data);
        if (scroll) {
            this.scrollToBottom();
        } else {
            selection.moveCursorTo(initCursor.row, initCursor.column, true);
        }
    }

    getValue() {
        return this.destroyed ? '' : this.editor.getValue();
    }

    getValueRange(startPos, endPos) {
        if (this.destroyed || !startPos || !endPos 
            || typeof startPos !== 'object' || typeof endPos !== 'object') {
            return "";
        }
        const session = this.editor.getSession();
        return session.getTextRange(new ace.Range(
            startPos.row,
            startPos.column,
            endPos.row,
            endPos.column
        ));
    }

    getEndPos() {
        if (this.destroyed) {
            return { row: 0, column: 0 };
        }
        const session = this.editor.getSession();
        const row = session.getLength() - 1;
        const column = session.getLine(row).length;
        return { row, column };
    }

    clear() {
        this.setValue('', true);
    }

    scrollToBottom() {
        if (this.destroyed) {
            return;
        }
        const { selection, session } = this.editor;
        this.editor.updateSelectionMarkers();
        this.editor.gotoLine(session.getLength());
        selection.moveCursorLineEnd();
    }

    scrollToTop() {
        if (this.destroyed) {
            return;
        }
        this.editor.gotoLine(0);
    }

    addDefaultCommand() {
        const { commands } = this.editor;
        commands.addCommands([{
            name: "increaseFontSize",
            bindKey: "Ctrl-=|Ctrl-+",
            exec: (editor) => {
                this.increaseFontSize();
            }
        }, {
            name: "decreaseFontSize",
            bindKey: "Ctrl+-|Ctrl-_",
            exec: (editor) => {
                this.decreaseFontSize();
            }
        }, {
            name: "resetFontSize",
            bindKey: "Ctrl+0|Ctrl-Numpad0",
            exec: (editor) => {
                this.resetFontSize();
            }
        }, {
            name: "mixly-message",
            bindKey: "backspace|delete|enter",
            readOnly: true,
            exec: (editor) => {
                if (!editor.getReadOnly()) {
                    return false;
                }
                this.cursorLayer.show();
                return false;
            }
        }]);
    }

    addCursorLayer() {
        this.cursorLayer = tippy(this.$container.find('.ace_cursor')[0], {
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
        const { editor } = this;
        $('#mixly-footer-cursor').hide();
        editor.on('focus', () => {
            const cursor = selection.getCursor();
            $('#mixly-footer-row').html(cursor.row + 1);
            $('#mixly-footer-column').html(cursor.column + 1);
            $('#mixly-footer-cursor').show();
        });
        editor.on("blur", () => {
            this.cursorLayer.hide();
            $('#mixly-footer-cursor').hide();
        });
        const { selection } = editor.getSession();
        const { session } = editor;
        selection.on('changeCursor', () => {
            const cursor = selection.getCursor();
            $('#mixly-footer-row').html(cursor.row + 1);
            $('#mixly-footer-column').html(cursor.column + 1);
        });
        selection.on("changeSelection", () => {
            if (selection.isEmpty()) {
                $('#mixly-footer-selected').parent().hide();
            } else {
                const range = selection.getRange();
                const text = session.getTextRange(range);
                $('#mixly-footer-selected').parent().css('display', 'inline-flex');
                $('#mixly-footer-selected').html(text.length); 
            }
        });
        session.on("changeScrollTop", () => {
            this.cursorLayer.hide();
        });
    }

    addCtrlBtns() {
        for (let mId of EditorAce.CTRL_BTNS) {
            this.$container.append(XML.render(EditorAce.CTRL_BTN_TEMPLATE, { mId }));
        }
        this.$ctrlBtns = this.$container.children('.code-editor-btn');
        this.$ctrlBtns.off().click((event) => {
            const mId = $(event.target).attr('m-id');
            this[mId]();
        });
    }

    showCtrlBtns() {
        this.$ctrlBtns.css('display', 'block');
    }

    hideCtrlBtns() {
        this.$ctrlBtns.css('display', 'none');
    }

    resetFontSize() {
        const size = parseInt(Math.max(window.screen.width / 85, window.screen.height / 85, 12));
        this.editor.setFontSize(size);
    }

    increaseFontSize() {
        const size = parseInt(this.editor.getFontSize(), 10) || 12;
        this.editor.setFontSize(size + 1);
    }

    decreaseFontSize() {
        const size = parseInt(this.editor.getFontSize(), 10) || 12;
        this.editor.setFontSize(Math.max(size - 1 || 1));
    }

    undo() {
        this.editor.undo();
    }

    redo() {
        this.editor.redo();
    }

    resize() {
    	this.editor.resize();
    }

    generateMenu(options) {
        let data = [];
        for (let option of options) {
            let item = {};
            const { id, name, hotKey } = option;
            if (id && name) {
                item.title = XML.render(EditorAce.MENU_TEMPLATE, { name, hotKey });
                item.id = id;
            } else {
                item.type = '-';
                item.title = '';
            }
            data.push(item);
        }
        return data;
    }

    cut() {
        const { selection, session } = this.editor;
        const cutLine = selection.isEmpty();
        const range = cutLine ? selection.getLineRange() : selection.getRange();
        this.editor._emit('cut', range);
        if (!range.isEmpty()) {
            const copyText = session.getTextRange(range);
            navigator.clipboard.writeText(copyText)
            .then((message) => {
                // console.log('clipboard：复制成功');
            }).catch((error) => {
                // console.log('clipboard：复制失败');
            });
            session.remove(range);
        }
        this.editor.clearSelection();
    }

    copy() {
        const copyText = this.editor.getSelectedText();
        this.editor.clearSelection();
        if (!copyText) {
            return;
        }
        navigator.clipboard.writeText(copyText)
        .then((message) => {
            // console.log('clipboard：复制成功');
        }).catch((error) => {
            // console.log('clipboard：复制失败');
        });
    }

    paste() {
        navigator.clipboard.readText()
        .then((message) => {
            this.editor.execCommand('paste', message);
            // console.log('clipboard：粘贴成功');
        })
        .catch((error) => {
            // console.log('clipboard：粘贴失败');
        });
    }
}

Mixly.EditorAce = EditorAce;

});