goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.Drag');
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
    Drag,
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
        this.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
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

    updateCode() {
        this.blockEditor.editor.fireChangeListener(this.codeChangeListener);
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
            startSize: '100%'
        });
        const { events } = this.drag;
        events.bind('sizeChanged', () => this.resize());
        events.bind('onfull', (type) => {
            switch(type) {
            case Drag.Extend.POSITIVE: // 拖拽元素移动方向：左→右 完全显示块编辑器
                aceEditor.setReadOnly(true);
                codeEditor.hideCtrlBtns();
                blockEditor.editor.scrollCenter();
                break;
            case Drag.Extend.NEGATIVE: // 拖拽元素移动方向：右→左 完全显示代码编辑器
                blocklyWorkspace.setVisible(false);
                aceEditor.setReadOnly(false);
                codeEditor.showCtrlBtns();
                if (this.py2BlockEditor && BOARD.pythonToBlockly) {
                    this.py2BlockEditor.fromCode = true;
                }
                break;
            }
        });
        events.bind('exitfull', (type) => {
            blocklyWorkspace.setVisible(true);
            aceEditor.setReadOnly(true);
            codeEditor.hideCtrlBtns();
            switch(type) {
            case Drag.Extend.POSITIVE: // 拖拽元素移动方向：左→右 退出代码编辑器，进入块编辑器
                if (this.py2BlockEditor 
                    && BOARD.pythonToBlockly 
                    && typeof this.py2BlockEditor.updateBlock === 'function') {
                    this.py2BlockEditor.updateBlock();
                }
                break;
            case Drag.Extend.NEGATIVE: // 拖拽元素移动方向：右→左 侧边代码栏开始显示
                this.updateCode();
                break;
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
        try {
            data = XML.convert(data, true);
            data = data.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
            });
        } catch (error) {
            console.log(error);
        }
        this.parseMix($(data), false, false, (message) => {
            if (message) {
                switch (message) {
                case 'USE_CODE':
                    // console.log('已从code标签中读取代码');
                    break;
                case 'USE_INCOMPLETE_BLOCKS':
                    // console.log('一些块已被忽略');
                    break;
                }
                this.blockEditor.scrollCenter();
                Blockly.hideChaff();
            } else {
            }
        });
    }

    parseMix(xml, useCode = false, useIncompleteBlocks = false, endFunc = (message) => {}) {
        const mixDom = xml;
        let xmlDom, configDom, codeDom;
        for (let i = 0; mixDom[i]; i++) {
            switch (mixDom[i].nodeName) {
            case 'XML':
                xmlDom = $(mixDom[i]);
                break;
            case 'CONFIG':
                configDom = $(mixDom[i]);
                break;
            case 'CODE':
                codeDom = $(mixDom[i]);
                break;
            }
        }
        if (!xmlDom && !codeDom) {
            layer.msg(Msg.Lang['未找到有效数据'], { time: 1000 });
            return;
        }
        for (let i of ['version', 'id', 'type', 'varid', 'name', 'x', 'y', 'items']) {
            const nowDom = xmlDom.find('*[' + i + ']');
            if (nowDom.length) {
                for (let j = 0; nowDom[j]; j++) {
                    let attr = $(nowDom[j]).attr(i);
                    try {
                        attr = attr.replaceAll('\\\"', '');
                    } catch (error) {
                        console.log(error);
                    }
                    $(nowDom[j]).attr(i, attr);
                }
            }
        }
        let config, configStr = configDom && configDom.html();
        try {
            if (configStr)
                config = JSON.parse(configStr);
        } catch (error) {
            console.log(error);
        }
        let boardName = xmlDom.attr('board') ?? '';
        // Boards.setSelectedBoard(boardName, config);
        let code = codeDom ? codeDom.html() : '';
        if (Base64.isValid(code)) {
            code = Base64.decode(code);
        } else {
            try {
                code = util.unescape(code);
                code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                    try {
                        return decodeURIComponent(s.replace(/_/g, '%'));
                    } catch (error) {
                        return s;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        if (useCode) {
            if (!codeDom) {
                layer.msg(Msg.Lang['未找到有效数据'], { time: 1000 });
                return;
            }
            this.drag.full('NEGATIVE'); // 完全显示代码编辑器
            this.codeEditor.setValue(code, -1);
            this.blockEditor.clear();
            endFunc('USE_CODE');
            return;
        }
        const blockDom = mixDom.find('block');
        const shadowDom = mixDom.find('shadow');
        blockDom.removeAttr('id varid');
        shadowDom.removeAttr('id varid');
        let blocks = [];
        let undefinedBlocks = [];
        for (let i = 0; blockDom[i]; i++) {
            const blockType = $(blockDom[i]).attr('type');
            if (blockType && !blocks.includes(blockType))
                blocks.push(blockType);
        }
        for (let i = 0; shadowDom[i]; i++) {
            const shadowType = $(shadowDom[i]).attr('type');
            if (shadowType && !blocks.includes(shadowType))
                blocks.push(shadowType);
        }
        const blocklyGenerator = this.blockEditor.generator;
        for (let i of blocks) {
            if (Blockly.Blocks[i] && blocklyGenerator.forBlock[i]) {
                continue;
            }
            undefinedBlocks.push(i);
        }
        if (undefinedBlocks.length) {
            this.showParseMixErrorDialog(mixDom, undefinedBlocks, endFunc);
            return;
        }
        this.blockEditor.editor.clear();
        Blockly.Xml.domToWorkspace(xmlDom[0], this.blockEditor.editor);
        this.blockEditor.editor.scrollCenter();
        Blockly.hideChaff();
        if (!useIncompleteBlocks && codeDom) {
            const workspaceCode = MFile.getCode();
            if (workspaceCode !== code) {
                this.drag.full('NEGATIVE'); // 完全显示代码编辑器
                this.codeEditor.setValue(code, -1);
            }
            endFunc();
            return;
        }
        this.drag.full('POSITIVE'); // 完全显示块编辑器
        if (useIncompleteBlocks)
            endFunc('USE_INCOMPLETE_BLOCKS');
        else
            endFunc();
    }

    showParseMixErrorDialog(xml, undefinedBlocks, endFunc = () => {}) {
        const { PARSE_MIX_ERROR_DIV } = XML.TEMPLATE_STR;
        const renderStr = XML.render(PARSE_MIX_ERROR_DIV, {
            text: undefinedBlocks.join('<br/>'),
            btn1Name: Msg.Lang['取消'],
            btn2Name: Msg.Lang['忽略未定义块'],
            btn3Name: Msg.Lang['读取代码']
        })
        Mixly.LayerExt.open({
            title: Msg.Lang['一些图形化模块尚未定义'],
            id: 'parse-mix-error-layer',
            area: ['50%', '250px'],
            max: ['500px', '250px'],
            min: ['350px', '100px'],
            shade: Mixly.LayerExt.SHADE_ALL,
            content: renderStr,
            borderRadius: '5px',
            success: (layero, index) => {
                $('#parse-mix-error-layer').css('overflow', 'hidden');
                form.render(null, 'parse-mix-error-filter');
                layero.find('button').click((event) => {
                    layer.close(index);
                    const mId = $(event.currentTarget).attr('m-id');
                    switch (mId) {
                    case '0':
                        break;
                    case '1':
                        for (let i of undefinedBlocks) {
                            xml.find('*[type='+i+']').remove();
                        }
                        this.parseMix(xml, false, true, endFunc);
                        break;
                    case '2':
                        this.parseMix(xml, true, false, endFunc);
                        break;
                    }
                });
            }
        });
    }
}

Mixly.EditorMix = EditorMix;

});