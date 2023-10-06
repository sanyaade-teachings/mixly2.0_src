goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.EditorUnknown');

const {
    XML,
    Env,
    IdGenerator
} = Mixly;

class EditorUnknown {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-unknown.html'));
    }

    constructor(dom) {
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorUnknown.TEMPLATE, {
            mId: this.id
        }));
        this.$container = this.$content.children('div');
        $parentContainer.append(this.$content);
    }

    init() {
        
    }

    getContainer() {
        return this.$content;
    }

    resize() {

    }

    dispose() {

    }

    onMount() {

    }

    updateValue(data, ext) {

    }
}

Mixly.EditorUnknown = EditorUnknown;

});