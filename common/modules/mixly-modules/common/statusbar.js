goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.CodeEditor');
goog.provide('Mixly.StatusBar');

const { Config, CodeEditor } = Mixly;
const { USER } = Config;

class StatusBar extends CodeEditor {
    constructor(id) {
        super(id);
        this.id = id;
        this.toStatusBar();
    }

    toStatusBar() {
        if (USER.theme === "dark") {
            this.editor.setOption("theme", "ace/theme/terminal");
        } else {
            this.editor.setOption("theme", "ace/theme/xcode");
        }
        this.editor.getSession().setMode("ace/mode/python");
        this.editor.setFontSize(document.body.clientWidth / 95);
        this.editor.setReadOnly(true);
        this.editor.setScrollSpeed(0.3);
        this.editor.setShowPrintMargin(false);
        this.editor.renderer.setShowGutter(false);
        this.editor.setOptions({
            enableBasicAutocompletion: false,
            enableSnippets: false,
            enableLiveAutocompletion: false
        });
    }

    // 可覆盖
    onTab() {
    }

    // 可覆盖
    onRemove() {
    }
}

Mixly.StatusBar = StatusBar;

});