goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.StatusBar');

const {
    XML,
    Env,
    Config,
    EditorAce
} = Mixly;
const { USER } = Config;

class StatusBar extends EditorAce {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.#toStatusBar_();
    }

    #toStatusBar_() {
        const editor = this.getEditor();
        if (USER.theme === "dark") {
            editor.setOption("theme", "ace/theme/tomorrow_night");
        } else {
            editor.setOption("theme", "ace/theme/xcode");
        }
        editor.getSession().setMode("ace/mode/python");
        editor.setReadOnly(true);
        editor.setScrollSpeed(0.3);
        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(false);
        editor.setOptions({
            enableBasicAutocompletion: false,
            enableSnippets: false,
            enableLiveAutocompletion: false
        });
        editor.setHighlightActiveLine(false);
    }
}

Mixly.StatusBar = StatusBar;

});