goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorUnknown');

const {
    XML,
    Env,
    IdGenerator,
    EditorBase
} = Mixly;

class EditorUnknown extends EditorBase {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-unknown.html'));
    }

    constructor(element) {
        super();
        const $parentContainer = $(element);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorUnknown.TEMPLATE, {
            mId: this.id
        }));
        this.$container = this.$content.children('div');
        $parentContainer.append(this.$content);
    }
}

Mixly.EditorUnknown = EditorUnknown;

});