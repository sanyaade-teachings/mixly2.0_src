goog.loadJs('common', () => {

goog.require('marked');
goog.require('markedKatex');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.DragV');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMd');

const {
    XML,
    Env,
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
        this.shown = 'CODE';
        this.codeContextMenuItems = null;
        this.PreviewContextMenuItems = null;
        this.$content = $content;
        this.$codeContainer = $codeContainer;
        this.$previewContainer = this.$content.find('.markdown-body');
        $parentContainer.append(this.$content);
    }

    init() {
        super.init();
        this.addDrag();
        this.addChangeListener();
    }

    addDrag() {
        this.drag = new DragV(this.$content.children('div')[0], {
            min: '200px',
            full: [true, true],
            startSize: '100%',
            sizeChanged: () => {
                // 重新调整编辑器尺寸
                this.resize();
            },
            onfull: (type) => {
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 完全显示md编辑器
                    this.shown = 'CODE';
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 完全显示预览框
                    this.shown = 'PREVIEW';
                    break;
                }
            },
            exitfull: (type) => {
                this.shown = 'BOTH';
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 退出侧边预览框，进入md编辑器
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 侧边预览框开始显示
                    this.updatePreview();
                    break;
                }
                return true;
            }
        });
    }

    addChangeListener() {
        this.editor.on('change', () => {
            if (this.shown === 'CODE') {
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