goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorUnknown');

const {
    XML,
    Env,
    HTMLTemplate,
    EditorBase
} = Mixly;

class EditorUnknown extends EditorBase {
    static {
        HTMLTemplate.add(
            'editor/editor-unknown.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-unknown.html')))
        );
    }

    constructor(element) {
        super();
        const $parentContainer = $(element);
        this.setContent(
            $(HTMLTemplate.get('editor/editor-unknown.html').render())
        );
        $parentContainer.append(this.getContent());
    }
}

Mixly.EditorUnknown = EditorUnknown;

});