goog.loadJs('common', () => {

goog.require('layui');
goog.require('tippy');
goog.require('Blockly');
goog.require('Mixly.Drag');
goog.require('Mixly.DragV');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.HTMLTemplate');
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
    HTMLTemplate,
    LayerExt
} = Mixly;
const { BOARD } = Config;

const { form } = layui;

class EditorMix extends EditorBase {
    static {
        HTMLTemplate.add(
            'editor/editor-mix.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-mix.html')))
        );
        HTMLTemplate.add(
            'editor/editor-mix-btns.html',
            goog.get(path.join(Env.templatePath, 'editor/editor-mix-btns.html'))
        );
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

    constructor(element) {
        super();
        const $parentContainer = $(element);
        this.$content = $(HTMLTemplate.get('editor/editor-mix.html').render());
        this.$btnsContent = $(HTMLTemplate.get('editor/editor-mix-btns.html'));
        this.drag = null;
        this.blocklyContextMenuItems = null;
        this.codeContextMenuItems = null;
        this.$blocklyContainer = this.$content.find('.editor-blockly');
        this.$codeContainer = this.$content.find('.editor-code');
        this.$btns = this.$btnsContent.find('button');
        this.blockEditor = new EditorBlockly(this.$blocklyContainer[0]);
        this.codeEditor = new EditorCode(this.$codeContainer[0]);
        this.blocklyContextMenu = {
            code: {
                isHtmlName: false,
                name: Msg.Lang['打开代码编辑器'],
                callback: (key, opt) => this.drag.full(Drag.Extend.NEGATIVE)
            }
        };
        this.codeContextMenu = {
            ...this.codeEditor.defaultContextMenu,
            sep2: '---------',
            block: {
                isHtmlName: false,
                name: Msg.Lang['退出代码编辑器'],
                callback: (key, opt) => this.drag.exitfull(Drag.Extend.NEGATIVE)
            }
        };
        this.breadcrumbsMenu = [];
        $parentContainer.append(this.$content);
    }

    init() {
        super.init();
        this.addDragEventsListener();
        this.addBtnEventsListener();
        this.blockEditor.init();
        this.codeEditor.init();
        this.codeEditor.setReadOnly(true);
        this.py2BlockEditorInit();
        const { events } = this.codeEditor.contextMenu;
        events.off('getMenu').bind('getMenu', () => {
            if (this.drag.shown !== Drag.Extend.NEGATIVE) {
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
        if (EditorMix.BLOCKLY_IGNORE_EVENTS.includes(event.type)) {
            return;
        }
        this.addDirty();
        if (this.drag.shown !== Drag.Extend.BOTH) {
           return;
        }
        codeEditor.setValue(blockEditor.getValue(), false);
    }

    addDragEventsListener() {
        const { blockEditor, codeEditor } = this;
        this.drag = new DragV(this.$content, {
            min: '200px',
            full: [true, true],
            startSize: '100%',
            startExitFullSize: '70%'
        });
        const { events } = this.drag;
        events.bind('sizeChanged', () => this.resize());
        events.bind('onfull', (type) => {
            this.$btns.removeClass('self-adaption-btn');
            let $btn = null;
            switch(type) {
            case Drag.Extend.POSITIVE:
                $btn = this.$btns.filter('[m-id="block"]');
                blockEditor.scrollCenter();
                break;
            case Drag.Extend.NEGATIVE:
                $btn = this.$btns.filter('[m-id="code"]');
                codeEditor.setReadOnly(false);
                codeEditor.focus();
                if (this.py2BlockEditor && BOARD.pythonToBlockly) {
                    this.py2BlockEditor.fromCode = true;
                }
                break;
            }
            $btn.addClass('self-adaption-btn');
        });
        events.bind('exitfull', (type) => {
            this.$btns.removeClass('self-adaption-btn');
            const $btn = this.$btns.filter('[m-id="mixture"]');
            $btn.addClass('self-adaption-btn');
            switch(type) {
            case Drag.Extend.NEGATIVE:
                codeEditor.setReadOnly(true);
                if (this.py2BlockEditor 
                    && BOARD.pythonToBlockly 
                    && typeof this.py2BlockEditor.updateBlock === 'function') {
                    this.py2BlockEditor.updateBlock();
                } else {
                    codeEditor.setValue(blockEditor.getValue(), false);
                }
                break;
            case Drag.Extend.POSITIVE:
                codeEditor.setValue(blockEditor.getValue(), false);
                break;
            }
            blockEditor.resize();
            blockEditor.scrollCenter();
        });
    }

    addBtnEventsListener() {
        this.$btns.on('click', (event) => {
            const $btn = $(event.currentTarget);
            const mId = $btn.attr('m-id');
            if (mId === 'deps') {
                return;
            }
            if (!$btn.hasClass('self-adaption-btn')) {
                this.$btns.removeClass('self-adaption-btn');
                $btn.addClass('self-adaption-btn');
            }
            switch (mId) {
            case 'block':
                this.drag.full(Drag.Extend.POSITIVE);
                break;
            case 'mixture':
                this.drag.exitfull(Drag.Extend.POSITIVE);
                this.drag.exitfull(Drag.Extend.NEGATIVE);
                break;
            case 'code':
                this.drag.full(Drag.Extend.NEGATIVE);
                break;
            }
        })
    }

    getCurrentEditor() {
        const { blockEditor, codeEditor } = this;
        if (this.drag.shown === Drag.Extend.NEGATIVE) {
            return codeEditor;
        } else {
            return blockEditor;
        }
    }

    undo() {
        super.undo();
        const editor = this.getCurrentEditor();
        editor.undo();
    }

    redo() {
        super.redo();
        const editor = this.getCurrentEditor();
        editor.redo();
    }

    resize() {
        super.resize();
        this.blockEditor.resize();
        this.codeEditor.resize();
    }

    dispose() {
        super.dispose();
        this.$btnsContent.remove();
        this.blockEditor.dispose();
        this.codeEditor.dispose();
    }

    onMounted() {
        super.onMounted();
        this.blockEditor.onMounted();
        this.codeEditor.onMounted();
        const blocklyWorkspace = this.blockEditor.editor;
        this.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
            this.workspaceChangeEvent(event);
        });
    }

    onUnmounted() {
        super.onUnmounted();
        const blocklyWorkspace = this.blockEditor.editor;
        blocklyWorkspace.removeChangeListener(this.codeChangeListener);
        this.blockEditor.onUnmounted();
        this.codeEditor.onUnmounted();
    }

    setValue(data, ext) {
        Blockly.Events.disable();
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
        Blockly.Events.enable();
    }

    getValue() {
        return this.getCurrentEditor().getValue();
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
            this.drag.full(Drag.Extend.NEGATIVE); // 完全显示代码编辑器
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
                this.drag.full(Drag.Extend.NEGATIVE); // 完全显示代码编辑器
                this.codeEditor.setValue(code, -1);
            }
            endFunc();
            return;
        }
        this.drag.full(Drag.Extend.POSITIVE); // 完全显示块编辑器
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
        LayerExt.open({
            title: Msg.Lang['一些图形化模块尚未定义'],
            id: 'parse-mix-error-layer',
            area: ['50%', '250px'],
            max: ['500px', '250px'],
            min: ['350px', '100px'],
            shade: LayerExt.SHADE_ALL,
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