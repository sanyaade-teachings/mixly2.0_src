goog.loadJs('common', () => {

goog.require('marked');
goog.require('markedKatex');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Drag');
goog.require('Mixly.DragV');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.require('Mixly.EditorMonaco');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMd');

const {
    XML,
    Env,
    Drag,
    DragV,
    IdGenerator,
    HTMLTemplate,
    EditorBase,
    EditorMonaco,
    EditorCode
} = Mixly;


class EditorMd extends EditorBase {
    static {
        HTMLTemplate.add(
            'editor/editor-md.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-md.html')))
        );
        HTMLTemplate.add(
            'editor/editor-md-btns.html',
            goog.get(path.join(Env.templatePath, 'editor/editor-md-btns.html'))
        );
        marked.use(markedKatex({ throwOnError: false }));
    }

    // 私有属性
    #prevCode_ = '';
    #listener_ = null;
    constructor(element) {
        super();
        const $parentContainer = $(element);
        const $content = $(HTMLTemplate.get('editor/editor-md.html').render());
        this.$codeContainer = $content.find('.editor-code');
        this.$previewContainer = $content.find('.markdown-body');
        this.codeEditor = new EditorCode(this.$codeContainer);
        this.$btnsContent = $(HTMLTemplate.get('editor/editor-md-btns.html'));
        this.$btns = this.$btnsContent.find('button');
        this.drag = null;
        this.setContent($content);
        $parentContainer.append(this.getContent());
    }

    init() {
        super.init();
        this.codeEditor.init();
        this.#addDragEventsListener_();
        this.#addBtnEventsListener_();
    }

    onMounted() {
        super.onMounted();
        this.codeEditor.onMounted();
        this.#addChangeEventListener_();
    }

    onUnmounted() {
        super.onUnmounted();
        this.codeEditor.onUnmounted();
        this.#removeChangeEventListener_();
    }

    resize() {
        super.resize();
        this.codeEditor.resize();
    }

    #addDragEventsListener_() {
        this.drag = new DragV(this.getContent()[0], {
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

    #addBtnEventsListener_() {
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

    #addChangeEventListener_() {
        const editor = EditorMonaco.getEditor();
        this.#listener_ = editor.onDidChangeModelContent(() => {
            if (this.drag.shown === 'NEGATIVE') {
                return;
            }
            this.updatePreview();
        });
    }

    #removeChangeEventListener_() {
        this.#listener_.dispose();
    }

    updatePreview() {
        const code = this.codeEditor.getValue();
        if (code === this.#prevCode_) {
            return;
        }
        this.#prevCode_ = code;
        const $dom = $(marked.parse(this.codeEditor.getValue()));
        const $as = $dom.find('a');
        $as.attr('target', '_blank');
        this.$previewContainer.html($dom);
    }

    setValue(data, ext) {
        this.codeEditor.setValue(data, ext);
    }

    dispose() {
        this.codeEditor.dispose();
        this.drag.dispose();
        super.dispose();
    }
}

Mixly.EditorMd = EditorMd;

});