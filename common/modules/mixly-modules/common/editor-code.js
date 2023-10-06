goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.EditorCode');

const {
    Config,
    IdGenerator,
    XML,
    Env,
    EditorAce
} = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorAce {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-code.html'));
    }

    constructor(dom) {
        const $parentContainer = $(dom);
        const id = IdGenerator.generate();
        const $content = $(XML.render(EditorCode.TEMPLATE, {
            mId: id
        }));
        const $editorContainer = $content.find('.editor');
        super($editorContainer[0]);
        this.id = id;
        this.$content = $content;
        this.$loading = this.$content.find('.loading');
        this.$editorContainer = $editorContainer;
        $parentContainer.append(this.$content);
    }

    init() {
        super.init();
        this.toCodeEditor();
        this.$loading.remove();
    }

    getContainer() {
        return this.$content;
    }

    toCodeEditor() {
        this.addCtrlBtns();
        this.editor.setShowPrintMargin(false);
        this.editor.setReadOnly(false);
        this.editor.setScrollSpeed(0.8);
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            autoScrollEditorIntoView: true,
            // customScrollbar: true,
        });
        const session = this.editor.getSession();
        const language = BOARD.language.toLowerCase();
        switch (language) {
        case 'python':
        case 'circuitpython':
        case 'micropython':
            session.setTabSize(4);
            session.setMode('ace/mode/python');
            this.editor.setTheme('ace/theme/' + 
                (USER.theme === 'dark' ? 'dracula' : 'crimson_editor'));
            break;
        case 'lua':
            session.setTabSize(4);
            session.setMode('ace/mode/lua');
            this.editor.setTheme('ace/theme/' + 
                (USER.theme === 'dark' ? 'dracula' : 'xcode'));
            break;
        case 'c/c++':
        default:
            session.setTabSize(2);
            session.setMode('ace/mode/c_cpp');
            this.editor.setTheme('ace/theme/' + 
                (USER.theme === 'dark' ? 'dracula' : 'xcode'));
        }
        if (USER.theme === "dark") {
            this.editor.setOption("theme", "ace/theme/twilight");
        } else {
            this.editor.setOption("theme", "ace/theme/xcode");
        }
    }

    updateValue(data, ext) {
        this.setValue(data);
    }
}

Mixly.EditorCode = EditorCode;

});