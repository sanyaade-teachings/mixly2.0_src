goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.EditorCode');

const { Config, XML, EditorAce } = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorAce {
    constructor(id) {
        super(id);
        this.id = id;
        this.toCodeEditor();
    }

    toCodeEditor() {
        this.addCtrlBtns();
        this.editor.setShowPrintMargin(false);
        this.editor.setReadOnly(true);
        this.editor.setScrollSpeed(0.8);
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
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
        case 'javascript':
            session.setTabSize(4);
            session.setMode('ace/mode/javascript');
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
    }
}

Mixly.EditorCode = EditorCode;

});