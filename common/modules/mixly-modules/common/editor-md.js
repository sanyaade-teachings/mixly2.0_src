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
        this.BTNS_TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-md-btns.html'));
        marked.use(markedKatex({ throwOnError: false }));
    }

    // 私有属性
    #prevCode_ = '';

    constructor(element) {
        const id = IdGenerator.generate();
        const $parentContainer = $(element);
        const $content = $(XML.render(EditorMd.TEMPLATE, { mId: id }));
        const $codeContainer = $content.find('.editor-code');
        super($codeContainer);
        this.$btnsContent = $(EditorMd.BTNS_TEMPLATE);
        this.drag = null;
        this.codeContextMenuItems = null;
        this.PreviewContextMenuItems = null;
        this.$content = $content;
        this.$codeContainer = $codeContainer;
        this.$previewContainer = this.$content.find('.markdown-body');
        this.$btns = this.$btnsContent.find('button');
        $parentContainer.append(this.$content);
    }

    init() {
        super.init();
        this.addDragEventsListener();
        this.addBtnEventsListener();
        this.addChangeListener();
    }

    addDragEventsListener() {
        this.drag = new DragV(this.$content.children('div')[0], {
            min: '200px',
            full: [true, true],
            startSize: '0%',
            startExitFullSize: '70%'
        });
        const { events } = this.drag;
        events.bind('sizeChanged', () => this.resize());
        events.bind('onfull', (type) => {
            this.$btns.removeClass('self-adaption-btn');
            let $btn = null;
            switch(type) {
            case Drag.Extend.POSITIVE:
                $btn = this.$btns.filter('[m-id="code"]');
                break;
            case Drag.Extend.NEGATIVE:
                $btn = this.$btns.filter('[m-id="preview"]');
                break;
            }
            $btn.addClass('self-adaption-btn');
        });
        events.bind('exitfull', (type) => {
            this.$btns.removeClass('self-adaption-btn');
            const $btn = this.$btns.filter('[m-id="mixture"]');
            $btn.addClass('self-adaption-btn');
            if (type === Drag.Extend.POSITIVE) {
                this.updatePreview();
            }
        });
    }

    addBtnEventsListener() {
        this.$btns.on('click', (event) => {
            const $btn = $(event.currentTarget);
            const mId = $btn.attr('m-id');
            if (!$btn.hasClass('self-adaption-btn')) {
                this.$btns.removeClass('self-adaption-btn');
                $btn.addClass('self-adaption-btn');
            }
            switch (mId) {
            case 'code':
                this.drag.full(Drag.Extend.POSITIVE);
                break;
            case 'mixture':
                this.drag.exitfull(Drag.Extend.POSITIVE);
                this.drag.exitfull(Drag.Extend.NEGATIVE);
                break;
            case 'preview':
                this.drag.full(Drag.Extend.NEGATIVE);
                break;
            }
        })
    }

    addChangeListener() {
        /*this.editor.on('change', () => {
            if (this.drag.shown === 'NEGATIVE') {
                return;
            }
            this.updatePreview();
        });*/
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