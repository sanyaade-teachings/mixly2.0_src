goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.DragV');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMixed');

const { dropdown } = layui;
const {
    EditorBlockly,
    EditorCode,
    DragV,
    XML,
    Msg,
    Config
} = Mixly;
const { BOARD } = Config;

class EditorMixed {
    constructor(editorConfig) {
        const { blockEditorConfig, codeEditorConfig } = editorConfig;
        this.blockEditor = new EditorBlockly(blockEditorConfig.id, blockEditorConfig.toolboxId);
        this.codeEditor = new EditorCode(codeEditorConfig.id);
        this.selected = 'BLOCK';
        this.drag = this.addDrag();
        this.addNavBtnClickEvent();
        this.codeEditorMenuRender();
        const blocklyWorkspace = this.blockEditor.editor;
        this.blockEditor.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
            this.codeChangeEvent(event);
        });
    }

    py2BlockEditorInit() {
        if (typeof Sk === 'object'
            && typeof PythonToBlocks === 'function'
            && typeof Py2blockEditor === 'function') {
            const py2blockConverter = new PythonToBlocks();
            this.py2BlockEditor = new Py2blockEditor(py2blockConverter, this.editor);
            Sk.python3 = true;
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

    codeEditorMenuRender() {
        const { codeEditor } = this;
        let data = [];
        if (this.selected === 'CODE') {
            const options = [
                { name: Msg.Lang['剪切'], hotKey: 'Ctrl+X', id: 'cut' },
                { name: Msg.Lang['复制'], hotKey: 'Ctrl+C', id: 'copy' },
                { name: Msg.Lang['粘贴'], hotKey: 'Ctrl+V', id: 'paste' },
                { type:'-' },
                { name: Msg.Lang['全选'], hotKey: 'Ctrl+A', id: 'selectall' },
                { name: Msg.Lang['查找'], hotKey: 'Ctrl+F', id: 'find' },
                { type:'-' },
                { name: Msg.Lang['切换行注释'], hotKey: 'Ctrl+/', id: 'togglecomment' },
                { name: Msg.Lang['切换块注释'], hotKey: 'Ctrl+Shift+/', id: 'toggleBlockComment' },
                { type:'-' },
                // { name: Msg.Lang['命令面板'], hotKey: 'F1', id: 'openCommandPallete' },
                // { type:'-' },
                { name: Msg.Lang['退出代码编辑器'], hotKey: 'Ctrl+E', id: 'exitCodeEditor' }
            ];
            data = this.codeEditor.generateMenu(options);
            const language = BOARD.language.toLowerCase();
            if ([ 'python', 'circuitpython', 'micropython' ].includes(language)) {
                data.splice(8, 1);
            }
        } else {
            const options = [{ name: Msg.Lang['打开代码编辑器'], hotKey: '', id: 'openCodeEditor'} ]
            data = this.codeEditor.generateMenu(options);
        }

        const { editor } = codeEditor;
        const { selection } = editor;
        
        dropdown.render({
            elem: `#${codeEditor.id}`,
            trigger: 'contextmenu',
            data,
            className: 'editor-dropdown-menu',
            click: (obj, othis) => {
                switch (obj.id) {
                case 'selectall':
                case 'find':
                case 'togglecomment':
                case 'toggleBlockComment':
                case 'openCommandPallete':
                    editor.execCommand(obj.id);
                    break;
                case 'cut':
                case 'copy':
                case 'paste':
                    editor[obj.id]();
                    break;
                case 'openCodeEditor':
                    if (this.selected === 'CODE')
                        break;
                    this.drag.full('NEGATIVE');
                    break;
                case 'exitCodeEditor':
                    if (this.selected === 'BLOCK')
                        break;
                    this.drag.show();
                    break;
                }
            }
        });
    }

    addDrag() {
        const { blockEditor, codeEditor } = this;
        const blocklyWorkspace = blockEditor.editor;
        const aceEditor = codeEditor.editor;
        const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
        const $codeArea = $('#nav').find('button[m-id="code-area"]').children('a');
        const vDrag = new DragV('v-container', {
            min: '200px',
            full: [true, true],
            sizeChanged: () => {
                // 重新调整编辑器尺寸
                $(blocklyWorkspace.getParentSvg()).attr({
                    width: blockEditor.$div.width(),
                    height: blockEditor.$div.height()
                });

                codeEditor.resize();
                blockEditor.resize();
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
                    blocklyWorkspace.scrollCenter();
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 完全显示代码编辑器
                    $codeArea.removeClass('icon-code-1').addClass('icon-block');
                    $codeArea.parent().attr('m-id', 'block-area');
                    aceEditor.setReadOnly(false);
                    codeEditor.showCtrlBtns();
                    this.selected = 'CODE';
                    codeEditor.shown = true;
                    blockEditor.shown = false;
                    const { py2BlockEditor } = blockEditor;
                    if (py2BlockEditor && BOARD.pythonToBlockly) {
                        py2BlockEditor.fromCode = true;
                    }
                    break;
                }
                this.codeEditorMenuRender();
            },
            exitfull: (type) => {
                codeEditor.shown = true;
                blockEditor.shown = true;
                aceEditor.setReadOnly(true);
                this.selected = 'BLOCK';
                this.codeEditorMenuRender();
                codeEditor.hideCtrlBtns();
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 退出代码编辑器，进入块编辑器
                    $codeArea.removeClass('icon-block').addClass('icon-code-1');
                    $codeArea.parent().attr('m-id', 'code-area');
                    const { py2BlockEditor } = blockEditor;
                    if (py2BlockEditor 
                        && BOARD.pythonToBlockly 
                        && typeof py2BlockEditor.updateBlock === 'function') {
                        py2BlockEditor.updateBlock();
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
        return vDrag;
    }

    addNavBtnClickEvent() {
        const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
        const $buttons = $('#nav-right-btn-list').find('button[m-id!="h-bar"]');
        for (let i = 0; $buttons[i]; i++) {
            const $button = $($buttons[i]);
            $button.click(() => {
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
}

Mixly.EditorMixed = EditorMixed;

});