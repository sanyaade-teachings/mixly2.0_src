goog.loadJs('common', () => {

goog.require('monaco');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorMonaco');

const {
    XML,
    Env,
    Msg,
    Debug,
    Events,
    HTMLTemplate,
    EditorBase
} = Mixly;


class EditorMonaco extends EditorBase {
    static {
        HTMLTemplate.add(
            'editor/editor-code.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-code.html')))
        );

        this.$monaco = $('<div class="page-item"></div>');
        this.editor = null;
        this.events = new Events(['change']);

        this.addEventsListener = () => {
            const { editor } = this;
            $('#mixly-footer-cursor').hide();

            editor.onDidBlurEditorText(() => {
                $('#mixly-footer-cursor').hide();
            });

            editor.onDidFocusEditorText(() => {
                const position = editor.getPosition();
                $('#mixly-footer-row').html(position.lineNumber);
                $('#mixly-footer-column').html(position.column);
                const selection = editor.getSelection();
                if (selection.isEmpty()) {
                    $('#mixly-footer-selected').parent().hide();
                } else {
                    const text = editor.getModel().getValueInRange(selection);
                    $('#mixly-footer-selected').parent().css('display', 'inline-flex');
                    $('#mixly-footer-selected').html(text.length);
                }
                $('#mixly-footer-cursor').show();
            });

            editor.onDidChangeCursorPosition((e) => {
                $('#mixly-footer-row').html(e.position.lineNumber);
                $('#mixly-footer-column').html(e.position.column);
            });

            editor.onDidChangeCursorSelection((e) => {
                if (e.selection.isEmpty()) {
                    $('#mixly-footer-selected').parent().hide();
                } else {
                    const text = editor.getModel().getValueInRange(e.selection);
                    $('#mixly-footer-selected').parent().css('display', 'inline-flex');
                    $('#mixly-footer-selected').html(text.length);
                }
            });

            editor.onDidChangeModelContent(() => {
                this.events.run('change');
            });
        }

        this.getEditor = () => {
            return this.editor;
        }

        this.getContent = () => {
            return this.$monaco;
        }

        this.initMonaco = () => {
            this.editor = monaco.editor.create(this.$monaco[0], {
                theme: 'vs-dark',
                disableLayerHinting: true, // 等宽优化
                emptySelectionClipboard: false, // 空选择剪切板
                selectionClipboard: false, // 选择剪切板
                codeLens: true, // 代码镜头
                scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
                colorDecorators: true, // 颜色装饰器
                accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
                lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
                lineNumbersMinChars: 5, // 行号最小字符   number
                enableSplitViewResizing: false,
                contextmenu: false,
                fontSize: 17,
                automaticLayout: false,
                wordWrap: 'wordWrapColumn',
                wordWrapColumn: 300,
                scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                }
            });
            this.addEventsListener();
        }

        this.initMonaco();
    }

    #readOnly = false;
    #changeListener_ = null;
    #enableChangeEvent_ = true;

    constructor() {
        super();
        const editorHTMLTemplate = HTMLTemplate.get('editor/editor-code.html');
        this.setContent($(editorHTMLTemplate.render()));
        this.addEventsType(['change']);
        this.editor = null;
        this.destroyed = false;
        this.state = null;
    }

    init() {
        super.init();
        this.editor = monaco.editor.createModel('');
    }

    onMounted() {
        super.onMounted();
        const editor = EditorMonaco.getEditor();
        editor.setModel(this.editor);
        if (this.state) {
            editor.restoreViewState(this.state);
        }
        this.setReadOnly(this.#readOnly);
        this.getContent().append(EditorMonaco.getContent());
        if (!this.#readOnly) {
            this.focus();
        }
        this.#addChangeEventListener_();
    }

    disableChangeEvent() {
        this.#enableChangeEvent_ = false;
    }

    enableChangeEvent() {
        this.#enableChangeEvent_ = true;
    }

    #addChangeEventListener_() {
        this.#changeListener_ = EditorMonaco.events.bind('change', () => {
            this.#enableChangeEvent_ && this.runEvent('change');
        });
    }

    #removeChangeEventListener_() {
        EditorMonaco.events.unbind(this.#changeListener_);
        this.offEvent('change');
    }

    onUnmounted() {
        super.onUnmounted();
        const editor = EditorMonaco.getEditor();
        this.state = editor.saveViewState();
        EditorMonaco.getContent().detach();
        this.getContent().empty();
        this.#removeChangeEventListener_();
    }

    dispose() {
        this.editor.dispose();
        super.dispose();
        this.editor = null;
        this.destroyed = true;
    }

    setTheme(mode) {
        const editor = EditorMonaco.getEditor();
        editor.updateOptions({
            theme: `vs-${mode}`
        });
    }

    setValue(data, ext) {
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
        const editor = EditorMonaco.getEditor();
        editor.setScrollTop(editor.getScrollHeight());
    }

    scrollToTop() {
        if (this.destroyed) {
            return;
        }
        const editor = EditorMonaco.getEditor();
        editor.setScrollTop(0);
    }

    resize() {
        super.resize();
        const editor = EditorMonaco.getEditor();
        editor.layout(null, true);
    }

    undo() {
        this.editor.undo();
    }

    redo() {
        this.editor.redo();
    }

    cut() {
        const editor = EditorMonaco.getEditor();
        let selection = editor.getSelection();
        let selectedText = this.editor.getValueInRange(selection);
        if (selection) {
            editor.executeEdits("cut", [{ range: selection, text: '' }]);
            navigator.clipboard.writeText(selectedText);
        }
        this.focus();
    }

    copy() {
        const editor = EditorMonaco.getEditor();
        editor.trigger('source', 'editor.action.clipboardCopyWithSyntaxHighlightingAction');
    }

    paste() {
        const editor = EditorMonaco.getEditor();
        navigator.clipboard.readText()
        .then((clipboardText) => {
            editor.trigger('source', 'type', { text: clipboardText });
            this.focus();
        })
        .catch(Debug.error);
    }

    getEditor() {
        return this.editor;
    }

    setReadOnly(readOnly) {
        const editor = EditorMonaco.getEditor();
        editor.updateOptions({ readOnly });
        this.#readOnly = readOnly;
    }

    setLanguage(language) {
        monaco.editor.setModelLanguage(this.editor, language);
    }

    setTabSize(tabSize) {
        this.editor.updateOptions({ tabSize });
    }

    setFontSize(fontSize) {
        const editor = EditorMonaco.getEditor();
        editor.updateOptions({ fontSize });
    }

    focus() {
        const editor = EditorMonaco.getEditor();
        editor.focus();
    }

    commentLine() {
        const editor = EditorMonaco.getEditor();
        EditorMonaco.getEditor().trigger('source', 'editor.action.commentLine');
    }

    blockComment() {
        const editor = EditorMonaco.getEditor();
        editor.trigger('source', 'editor.action.blockComment');
    }
}

Mixly.EditorMonaco = EditorMonaco;

});