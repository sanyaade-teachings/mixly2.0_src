goog.loadJs('common', () => {

goog.require('marked');
goog.require('markedKatex');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Drag');
goog.require('Mixly.DragV');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMd');

const {
    XML,
    Env,
    Drag,
    DragV,
    IdGenerator,
    EditorCode
} = Mixly;


class EditorMd extends EditorCode {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-md.html'));
        marked.use(markedKatex({ throwOnError: false }));
    }

    // 私有属性
    #prevCode_ = '';

    constructor(dom, extname='.md') {
        const id = IdGenerator.generate();
        const $parentContainer = $(dom);
        const $content = $(XML.render(EditorMd.TEMPLATE, { mId: id }));
        const $codeContainer = $content.find('.editor-code');
        super($codeContainer, extname);
        this.drag = null;
        this.codeContextMenuItems = null;
        this.PreviewContextMenuItems = null;
        this.$content = $content;
        this.$codeContainer = $codeContainer;
        this.$previewContainer = this.$content.find('.markdown-body');
        $parentContainer.append(this.$content);
    }

    init() {
        super.init();
        this.addDragEvents();
        this.addChangeListener();
    }

    addDragEvents() {
        this.drag = new DragV(this.$content.children('div')[0], {
            min: '200px',
            full: [true, true],
            startSize: '0%'
        });
        const { events } = this.drag;
        events.bind('sizeChanged', () => this.resize());
        events.bind('exitfull', (type) => {
            if (type === Drag.Extend.POSITIVE) {
                this.updatePreview();
            }
        });
    }

    addChangeListener() {
        this.editor.on('change', () => {
            if (this.drag.shown === 'NEGATIVE') {
                return;
            }
            this.updatePreview();
        });
    }

    updatePreview() {
        const code = this.getValue();
        if (code === this.#prevCode_) {
            return;
        }
        this.#prevCode_ = code;
        const $dom = $(marked.parse(this.getValue()));
        const $as = $dom.find('a');
        $as.attr('target', '_blank');
        this.$previewContainer.html($dom);
    }
}

Mixly.EditorMd = EditorMd;

});