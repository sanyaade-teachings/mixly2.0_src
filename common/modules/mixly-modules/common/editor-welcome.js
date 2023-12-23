goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorWelcome');

const {
    XML,
    Env,
    IdGenerator,
    EditorBase
} = Mixly;

class EditorWelcome extends EditorBase {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-welcome.html'));
    }

    constructor() {
        super();
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorWelcome.TEMPLATE, {
            mId: this.id
        }));
        this.$container = this.$content.children('div');
    }
}

Mixly.EditorWelcome = EditorWelcome;

});