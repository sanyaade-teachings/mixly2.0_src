goog.loadJs('common', () => {

goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.StatusBar');

const {
    IdGenerator,
    XML,
    Env,
    Config,
    EditorAce
} = Mixly;
const { USER } = Config;

class StatusBar extends EditorAce {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar/statusbar.html'));
    }

    constructor(element) {
        const $parentContainer = $(element);
        const id = IdGenerator.generate();
        const $content = $(XML.render(StatusBar.TEMPLATE, {
            mId: id
        }));
        super($content.children('div')[0]);
        this.id = id;
        this.$content = $content;
        $parentContainer.append(this.$content);
    }

    init() {
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
}

Mixly.StatusBar = StatusBar;

});