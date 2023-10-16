goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.DragV');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorCode');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorMix');

const { dropdown } = layui;
const {
    EditorBlockly,
    EditorCode,
    EditorBase,
    DragV,
    XML,
    Msg,
    Config,
    Env,
    ContextMenu,
    IdGenerator
} = Mixly;
const { BOARD } = Config;

class EditorMix extends EditorBase {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-mix.html'));
        this.BLOCKLY_IGNORE_EVENTS = [
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
    }

    constructor(dom, extname='.mix') {
        super();
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorMix.TEMPLATE, { mId: this.id }));
        this.drag = null;
        this.blocklyContextMenuItems = null;
        this.codeContextMenuItems = null;
        this.$blocklyContainer = this.$content.find('.editor-blockly');
        this.$codeContainer = this.$content.find('.editor-code');
        this.blockEditor = new EditorBlockly(this.$blocklyContainer[0], extname);
        this.codeEditor = new EditorCode(this.$codeContainer[0], this.#getCodeExtname_());
        this.blocklyContextMenu = {
            code: {
                isHtmlName: false,
                name: Msg.Lang['打开代码编辑器'],
                callback: (key, opt) => this.drag.full('NEGATIVE')
            }
        };
        this.codeContextMenu = {
            ...this.codeEditor.defaultContextMenu,
            sep2: '---------',
            block: {
                isHtmlName: false,
                name: Msg.Lang['退出代码编辑器'],
                callback: (key, opt) => this.drag.exitfull('POSITIVE')
            }
        };
        $parentContainer.append(this.$content);
    }

    init() {
        this.blockEditor.init();
        this.codeEditor.init();
        this.addDrag();
        const blocklyWorkspace = this.blockEditor.editor;
        this.blockEditor.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
            this.workspaceChangeEvent(event);
        });
        this.py2BlockEditorInit();
        const { events } = this.codeEditor.contextMenu;
        events.off('getMenu').bind('getMenu', () => {
            if (this.drag.shown !== 'NEGATIVE') {
                return this.blocklyContextMenu;
            } else {
                return this.codeContextMenu;
            }
        });
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

    workspaceChangeEvent(event) {
        const { blockEditor, codeEditor } = this;
        if (EditorMix.BLOCKLY_IGNORE_EVENTS.includes(event.type)
            || ['POSITIVE', 'NEGATIVE'].includes(this.drag.shown)) {
           return;
        }
        codeEditor.setValue(blockEditor.getValue(), false);
    }

    addDrag() {
        const { blockEditor, codeEditor } = this;
        const blocklyWorkspace = blockEditor.editor;
        const aceEditor = codeEditor.editor;
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
                    aceEditor.setReadOnly(true);
                    codeEditor.hideCtrlBtns();
                    blockEditor.editor.scrollCenter();
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 完全显示代码编辑器
                    blocklyWorkspace.setVisible(false);
                    aceEditor.setReadOnly(false);
                    codeEditor.showCtrlBtns();
                    if (this.py2BlockEditor && BOARD.pythonToBlockly) {
                        this.py2BlockEditor.fromCode = true;
                    }
                    break;
                }
            },
            exitfull: (type) => {
                blocklyWorkspace.setVisible(true);
                aceEditor.setReadOnly(true);
                codeEditor.hideCtrlBtns();
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 退出代码编辑器，进入块编辑器
                    if (this.py2BlockEditor 
                        && BOARD.pythonToBlockly 
                        && typeof this.py2BlockEditor.updateBlock === 'function') {
                        this.py2BlockEditor.updateBlock();
                    }
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 侧边代码栏开始显示
                    break;
                }
                blockEditor.updateCode();
                return true;
            }
        });
    }

    undo() {
        const { blockEditor, codeEditor } = this;
        const editor = this.drag.shown !== 'NEGATIVE'? blockEditor : codeEditor;
        editor.undo();
    }

    redo() {
        const { blockEditor, codeEditor } = this;
        const editor = this.drag.shown !== 'NEGATIVE'? blockEditor : codeEditor;
        editor.redo();
    }

    resize() {
        this.blockEditor.resize();
        this.codeEditor.resize();
    }

    dispose() {
        this.blockEditor.dispose();
        this.codeEditor.dispose();
    }

    onMounted() {
        this.blockEditor.onMounted();
        this.codeEditor.onMounted();
    }

    updateValue(data, ext) {

    }
}

Mixly.EditorMix = EditorMix;

});