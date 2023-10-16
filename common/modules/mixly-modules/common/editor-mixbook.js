goog.loadJs('common', () => {

goog.require('EditorJS');
goog.require('Paragraph');
goog.require('Header');
goog.require('Quote');
goog.require('Warning');
goog.require('Delimiter');
goog.require('Alert');
goog.require('ToggleBlock');
goog.require('List');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.EditorMixbook');

const {
    XML,
    Env,
    IdGenerator
} = Mixly;


class EditorMixbook {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-mixbook.html'));
    }

    constructor(dom, extname='.mixbook') {
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorMixbook.TEMPLATE, {
            mId: this.id
        }));
        this.$editorContainer = this.$content.children('div');
        $parentContainer.append(this.$content);
    }

    init() {
        this.editor = new EditorJS({
            holder: this.$editorContainer[0],
            tools: {
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true
                },
                header: Header,
                quote: Quote,
                warning: Warning,
                delimiter: Delimiter,
                alert: Alert,
                /*toggle: {
                    class: ToggleBlock,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },*/
            }
        });
    }

    dispose() {
        this.editor.destroy();
    }
}

Mixly.EditorMixbook = EditorMixbook;

});