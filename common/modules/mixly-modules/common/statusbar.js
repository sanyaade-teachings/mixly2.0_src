goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.StatusBar');

const { Config, EditorAce } = Mixly;
const { USER } = Config;

class StatusBar extends EditorAce {
    constructor(dom) {
        super(dom);
        super.init();
        this.toStatusBar();
    }

    toStatusBar() {
        if (USER.theme === "dark") {
            this.editor.setOption("theme", "ace/theme/terminal");
        } else {
            this.editor.setOption("theme", "ace/theme/xcode");
        }
        this.editor.getSession().setMode("ace/mode/python");
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