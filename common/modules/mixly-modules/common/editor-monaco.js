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
    #readOnly = false;
    constructor(element) {
        super();
        this.setContent($(element));
        this.destroyed = false;
    }

    init() {
        this.editor = monaco.editor.create(this.getContent()[0], {
            theme: "vs-dark",
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            codeLens: true, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
            lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
            lineNumbersMinChars: 5, // 行号最小字符   number
            enableSplitViewResizing: false,
            contextmenu: false,
            fontSize: 17,
            automaticLayout: false,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
            }
        });
    }

    onMounted() {
        if (!this.#readOnly) {
            this.focus();
        }
    }

    dispose() {
        this.editor.dispose();
        this.destroyed = true;
    }

    setTheme(mode) {
        this.editor.updateOptions({
            theme: `vs-${mode}`
        });
    }

    setValue(data, scroll = true) {
        if (this.destroyed || this.getValue() === data) {
            return;
        }
        this.editor.setValue(data);
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
        this.editor.setScrollTop(this.editor.getScrollHeight());
    }

    scrollToTop() {
        if (this.destroyed) {
            return;
        }
        this.editor.setScrollTop(0);
    }

    undo() {
        this.editor.getModel().undo();
    }

    redo() {
        this.editor.getModel().redo();
    }

    resize() {
        this.editor.layout();
    }

    cut() {
        let selection = this.editor.getSelection();
        let selectedText = this.editor.getModel().getValueInRange(selection);
        if (selection) {
            this.editor.executeEdits("cut", [{ range: selection, text: '' }]);
            navigator.clipboard.writeText(selectedText);
        }
        this.focus();
    }

    copy() {
        this.editor.trigger('source', 'editor.action.clipboardCopyWithSyntaxHighlightingAction');
    }

    paste() {
        navigator.clipboard.readText()
        .then((clipboardText) => {
            this.editor.trigger('source', 'type', { text: clipboardText });
            this.focus();
        })
        .catch(console.log);
    }

    getEditor() {
        return this.editor;
    }

    setReadOnly(readOnly) {
        this.editor.updateOptions({ readOnly });
        this.#readOnly = readOnly;
    }

    setLanguage(language) {
        monaco.editor.setModelLanguage(this.editor.getModel(), language);
    }

    setTabSize(tabSize) {
        this.editor.updateOptions({ tabSize });
    }

    setFontSize(fontSize) {
        this.editor.updateOptions({ fontSize });
    }

    focus() {
        this.editor.focus();
    }

    commentLine() {
        this.editor.trigger('source', 'editor.action.commentLine');
    }

    blockComment() {
        this.editor.trigger('source', 'editor.action.blockComment');
    }
}

Mixly.EditorMonaco = EditorMonaco;

});