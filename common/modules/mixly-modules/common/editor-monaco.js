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


/*monaco.editor.defineTheme("myCustomTheme", {
    base: "vs-dark", // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
        {
            token: "comment",
            foreground: "7f8c8d"
        }, {
            token: "storage",
            foreground: "0ca1a6"
        }, {
            token: "support",
            foreground: "0ca1a6"
        }, {
            token: "string.quoted.single",
            foreground: "0ca1a6"
        }, {
            token: "meta.function",
            foreground: "F39C12"
        }, {
            token: "entity.name.function",
            foreground: "F39C12"
        }, {
            token: "meta.function-call",
            foreground: "F39C12"
        }, {
            token: "variable.other",
            foreground: "F39C12"
        }, {
            token: "punctuation.section",
            foreground: "dae3e3"
        }, {
            token: "meta.function-call",
            foreground: "dae3e3"
        }, {
            token: "meta.block",
            foreground: "dae3e3"
        }, {
            token: "meta.function",
            foreground: "dae3e3"
        }, {
            token: "variable",
            foreground: "dae3e3"
        }, {
            token: "variable.name",
            foreground: "dae3e3"
        }, {
            token: "entity.name.function.preprocessor",
            foreground: "569CD6"
        }, {
            token: "meta.preprocessor.macro",
            foreground: "569CD6"
        }, {
            token: "string.quoted.double",
            foreground: "7fcbcd"
        }, {
            token: "string.quoted.other.lt-gt",
            foreground: "7fcbcd"
        }, {
            token: "constant",
            foreground: "7fcbcd"
        }, {
            token: "keyword.control",
            foreground: "C586C0"
        }, {
            token: "meta.preprocessor",
            foreground: "C586C0"
        }, {
            token: "meta.preprocessor.macro",
            foreground: "434f54"
        }, {
            token: "constant.numeric.preprocessor",
            foreground: "434f54"
        }, {
            token: "meta.preprocessor.macro",
            foreground: "434f54"
        }
    ],
    colors: {
        "editor.foreground": "#dae3e3",
    },
});*/


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

    #readOnly_ = false;
    #changeListener_ = null;
    #enableChangeEvent_ = true;
    #editor_ = null;
    #state_ = null;
    #tabSize_ = null;
    #language_ = null;

    constructor() {
        super();
        const editorHTMLTemplate = HTMLTemplate.get('editor/editor-code.html');
        this.setContent($(editorHTMLTemplate.render()));
        this.addEventsType(['change']);
    }

    init() {
        super.init();
        this.#editor_ = monaco.editor.createModel('');
    }

    onMounted() {
        super.onMounted();
        const editor = EditorMonaco.getEditor();
        editor.setModel(this.#editor_);
        if (this.#state_) {
            editor.restoreViewState(this.#state_);
        }
        this.setReadOnly(this.#readOnly_);
        this.getContent().append(EditorMonaco.getContent());
        if (!this.#readOnly_) {
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
        this.#changeListener_ && EditorMonaco.events.unbind(this.#changeListener_);
        this.offEvent('change');
    }

    onUnmounted() {
        super.onUnmounted();
        const editor = EditorMonaco.getEditor();
        this.#state_ = editor.saveViewState();
        EditorMonaco.getContent().detach();
        this.getContent().empty();
        this.#removeChangeEventListener_();
    }

    dispose() {
        this.#removeChangeEventListener_();
        this.#editor_.dispose();
        super.dispose();
        this.#editor_ = null;
    }

    setTheme(mode) {
        const editor = EditorMonaco.getEditor();
        editor.updateOptions({
            theme: `vs-${mode}`
            // theme: 'myCustomTheme'
        });
    }

    setValue(data, ext) {
        if (this.getValue() === data) {
            return;
        }
        this.#editor_.setValue(data);
    }

    addValue(data) {
        const prevData = this.getValue();
        this.setValue(prevData + data);
    }

    getValue() {
        return this.#editor_.getValue();
    }

    clear() {
        this.setValue('', true);
    }

    scrollToBottom() {
        const editor = EditorMonaco.getEditor();
        editor.setScrollTop(editor.getScrollHeight());
    }

    scrollToTop() {
        const editor = EditorMonaco.getEditor();
        editor.setScrollTop(0);
    }

    resize() {
        super.resize();
        const editor = EditorMonaco.getEditor();
        editor.layout(null, true);
    }

    undo() {
        this.#editor_.undo();
    }

    redo() {
        this.#editor_.redo();
    }

    cut() {
        const editor = EditorMonaco.getEditor();
        let selection = editor.getSelection();
        let selectedText = this.#editor_.getValueInRange(selection);
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
        return this.#editor_;
    }

    setReadOnly(readOnly) {
        const editor = EditorMonaco.getEditor();
        editor.updateOptions({ readOnly });
        this.#readOnly_ = readOnly;
    }

    setLanguage(language) {
        if (this.#language_ === language) {
            return;
        }
        this.#language_ = language;
        monaco.editor.setModelLanguage(this.#editor_, language);
    }

    setTabSize(tabSize) {
        if (this.#tabSize_ === tabSize) {
            return;
        }
        this.#tabSize_ = tabSize;
        this.#editor_.updateOptions({ tabSize });
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