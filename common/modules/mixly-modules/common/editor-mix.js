goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.DragV');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMix');

const { dropdown } = layui;
const {
    EditorBlockly,
    EditorCode,
    DragV,
    XML,
    Msg,
    Config,
    Env,
    IdGenerator
} = Mixly;
const { BOARD } = Config;

class EditorMix {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-mix.html'));
    }

    constructor(dom, extname='.mix') {
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorMix.TEMPLATE, { mId: this.id }));
        this.drag = null;
        this.selected = 'BLOCK';
        this.blocklyContextMenuItems = null;
        this.codeContextMenuItems = null;
        this.$blocklyContainer = this.$content.find('.editor-blockly');
        this.$codeContainer = this.$content.find('.editor-code');
        this.blockEditor = new EditorBlockly(this.$blocklyContainer[0], extname);
        this.codeEditor = new EditorCode(this.$codeContainer[0], this.#getCodeExtname_());
        $parentContainer.append(this.$content);
    }

    init() {
        this.codeEditor.getContextMenuItems = this.getContextMenuItems.bind(this);
        this.blockEditor.init();
        this.codeEditor.init();
        this.addDrag();
        this.addNavBtnClickEvent();
        const blocklyWorkspace = this.blockEditor.editor;
        this.blockEditor.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
            this.codeChangeEvent(event);
        });
        this.py2BlockEditorInit();
        this.onMount();
        this.blocklyContextMenuItems = {
            code: {
                isHtmlName: false,
                name: Msg.Lang['打开代码编辑器'],
                callback: (key, opt) => this.drag.full('NEGATIVE')
            }
        };
        this.codeContextMenuItems = {
            ...this.codeEditor.defaultContextMenuItems,
            sep2: '---------',
            block: {
                isHtmlName: false,
                name: Msg.Lang['退出代码编辑器'],
                callback: (key, opt) => this.drag.exitfull('POSITIVE')
            }
        };
    }

    getContainer() {
        return this.$content;
    }

    #getCodeExtname_() {
        let extname = '.c';
        const language = BOARD.language.toLowerCase();
        switch (language) {
        case 'python':
        case 'circuitpython':
        case 'micropython':
            extname = '.py';
            break;
        case 'lua':
            extname = '.lua';
            break;
        case 'c/c++':
        default:
            extname = '.c';
        }
        return extname;
    }

    py2BlockEditorInit() {
        if (typeof Sk === 'object'
            && typeof PythonToBlocks === 'function'
            && typeof Py2blockEditor === 'function') {
            const py2blockConverter = new PythonToBlocks();
            this.py2BlockEditor = new Py2blockEditor(py2blockConverter, this.codeEditor.editor);
        }
    }

    codeChangeEvent(event) {
        const { blockEditor, codeEditor } = this;
        const ignoreEvent = [
            Blockly.Events.UI,
            Blockly.Events.VIEWPORT_CHANGE,
            Blockly.Events.COMMENT_CHANGE,
            Blockly.Events.COMMENT_CREATE,
            Blockly.Events.COMMENT_DELETE,
            Blockly.Events.COMMENT_MOVE,
            Blockly.Events.TRASHCAN_OPEN,
            Blockly.Events.CLICK,
            Blockly.Events.SELECTED,
            Blockly.Events.THEME_CHANGE,
            Blockly.Events.BUBBLE_OPEN,
            Blockly.Events.THEME_CHANGE,
            Blockly.Events.TOOLBOX_ITEM_SELECT,
        ];
        if (ignoreEvent.includes(event.type) || this.selected !== 'BLOCK' || !codeEditor.shown) {
           return;
        }
        let code = blockEditor.generator.workspaceToCode(blockEditor.editor) || '';
        code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
            try {
                return decodeURIComponent(s.replace(/_/g, '%'));
            } catch (error) {
                return s;
            }
        });
        codeEditor.setValue(code, false);
    }

    getContextMenuItems() {
        if (this.selected === 'BLOCK') {
            return this.blocklyContextMenuItems;
        } else {
            return this.codeContextMenuItems;
        }
    }

    addDrag() {
        const { blockEditor, codeEditor } = this;
        const blocklyWorkspace = blockEditor.editor;
        const aceEditor = codeEditor.editor;
        const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
        const $codeArea = $('#nav').find('button[m-id="code-area"]').children('a');
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
                case 'POSITIVE': // 拖拽元素移动方向：左→右 完全显示块编辑器
                    $vBar.removeClass('icon-hide-bar-e').addClass('icon-show-bar-e');
                    aceEditor.setReadOnly(true);
                    codeEditor.hideCtrlBtns();
                    this.selected = 'BLOCK';
                    codeEditor.shown = false;
                    blockEditor.shown = true;
                    this.resize();
                    blockEditor.editor.scrollCenter();
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 完全显示代码编辑器
                    blocklyWorkspace.setVisible(false);
                    $codeArea.removeClass('icon-code-1').addClass('icon-block');
                    $codeArea.parent().attr('m-id', 'block-area');
                    aceEditor.setReadOnly(false);
                    codeEditor.showCtrlBtns();
                    this.selected = 'CODE';
                    codeEditor.shown = true;
                    blockEditor.shown = false;
                    if (this.py2BlockEditor && BOARD.pythonToBlockly) {
                        this.py2BlockEditor.fromCode = true;
                    }
                    break;
                }
            },
            exitfull: (type) => {
                blocklyWorkspace.setVisible(true);
                codeEditor.shown = true;
                blockEditor.shown = true;
                aceEditor.setReadOnly(true);
                this.selected = 'BLOCK';
                codeEditor.hideCtrlBtns();
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 退出代码编辑器，进入块编辑器
                    $codeArea.removeClass('icon-block').addClass('icon-code-1');
                    $codeArea.parent().attr('m-id', 'code-area');
                    if (this.py2BlockEditor 
                        && BOARD.pythonToBlockly 
                        && typeof this.py2BlockEditor.updateBlock === 'function') {
                        this.py2BlockEditor.updateBlock();
                    }
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 侧边代码栏开始显示
                    $vBar.removeClass('icon-show-bar-e').addClass('icon-hide-bar-e');
                    break;
                }
                blockEditor.updateCode();
                return true;
            }
        });
    }

    addNavBtnClickEvent() {
        const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
        const $buttons = $('#nav-right-btn-list').find('button[m-id!="h-bar"]');
        for (let i = 0; $buttons[i]; i++) {
            const $button = $($buttons[i]);
            $button.click((event) => {
                event.stopPropagation();
                const $a = $button.children('a');
                const mId = $button.attr('m-id');
                switch($button.attr('m-id')) {
                case 'v-bar':
                    if ($a.hasClass('icon-hide-bar-e')) {
                        $a.removeClass('icon-hide-bar-e');
                        $a.addClass('icon-show-bar-e');
                        this.drag.full('POSITIVE');
                    } else {
                        $a.removeClass('icon-show-bar-e');
                        $a.addClass('icon-hide-bar-e');
                        this.drag.show();
                    }
                    break;
                case 'code-area':
                    $button.attr('m-id', 'block-area');
                    $a.removeClass('icon-code-1').addClass('icon-block');
                    $vBar.removeClass('icon-show-bar-e').addClass('icon-hide-bar-e');
                    this.drag.full('NEGATIVE');
                    break;
                case 'block-area':
                    $button.attr('m-id', 'code-area');
                    $a.removeClass('icon-block').addClass('icon-code-1');
                    $vBar.removeClass('icon-hide-bar-e').addClass('icon-show-bar-e');
                    this.drag.full('POSITIVE');
                    if (this.py2BlockEditor 
                        && BOARD.pythonToBlockly 
                        && typeof this.py2BlockEditor.updateBlock === 'function') {
                        this.py2BlockEditor.updateBlock();
                    }
                    break;
                }
            });
        }
    }

    undo() {
        const { blockEditor, codeEditor } = this;
        if (this.selected === 'BLOCK') {
            blockEditor.undo();
        } else {
            codeEditor.undo();
        }
    }

    redo() {
        const { blockEditor, codeEditor } = this;
        if (this.selected === 'BLOCK') {
            blockEditor.redo();
        } else {
            codeEditor.redo();
        }
    }

    resize() {
        this.blockEditor.resize();
        this.codeEditor.resize();
    }

    dispose() {
        this.blockEditor.dispose();
        this.codeEditor.dispose();
    }

    onMount() {
        this.blockEditor.onMount && this.blockEditor.onMount();
        this.codeEditor.onMount && this.codeEditor.onMount();
    }

    updateValue(data, ext) {

    }
}

Mixly.EditorMix = EditorMix;

});