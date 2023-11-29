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
        this.BREADCRUMBS_TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-toolbar-breadcrumbs.html'));
        this.BREADCRUMBS_MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-toolbar-breadcrumbs-menu.html'));
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
        this.$breadcrumbs = this.$content.find('.breadcrumbs');
        this.$btns = this.$content.find('.operate-btns > button');
        this.blockEditor = new EditorBlockly(this.$blocklyContainer[0], extname);
        this.codeEditor = new EditorCode(this.$codeContainer[0], this.#getCodeExtname_());
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
        this.addDragEvents();
        this.addBtnEvents();
        this.blockEditor.init();
        this.codeEditor.init();
        this.codeEditor.setReadOnly(true);
        this.updateBreadcrumbsMenu();
        const blocklyWorkspace = this.blockEditor.editor;
        this.codeChangeListener = blocklyWorkspace.addChangeListener((event) => {
            this.workspaceChangeEvent(event);
        });
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
        if ([Blockly.Events.SELECTED, Blockly.Events.BLOCK_DRAG].includes(event.type)) {
            this.updateBreadcrumbsMenu();
        }
        if (EditorMix.BLOCKLY_IGNORE_EVENTS.includes(event.type)) {
            return;
        }
        this.addDirty();
        if (this.drag.shown !== Drag.Extend.BOTH) {
           return;
        }
        codeEditor.setValue(blockEditor.getValue(), false);
    }

    updateBreadcrumbsMenu() {
        const { editor } = this.blockEditor;
        let block = Blockly.getSelected();
        let breadcrumbs = [];
        if (block) {
            do {
                breadcrumbs.unshift({
                    id: block.id,
                    name: block.type
                });
            } while (block = block.getSurroundParent());
        }
        breadcrumbs.unshift({
            id: editor.id,
            name: '工作区'
        });
        this.$breadcrumbs.html(XML.render(EditorMix.BREADCRUMBS_TEMPLATE, {
            list: breadcrumbs
        }));
        this.disposeBreadcrumbsMenu();
        const btns = this.$breadcrumbs[0].querySelectorAll('button');
        this.breadcrumbsMenu = tippy(btns, {
            allowHTML: true,
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 6 ],
            placement: 'bottom',
            zIndex: 1000,
            appendTo: document.body,
            onMount: (instance) => {
                let options = this.getMenuOptions($(instance.reference).attr('m-id')) ?? {};
                options.list = options.list ?? [];
                options.empty = options.empty ?? Msg.Lang['无选项'];
                const menuTemplate = XML.render(EditorMix.BREADCRUMBS_MENU_TEMPLATE, options);
                instance.setContent(menuTemplate);
                $(instance.popper).find('li').off().click((event) => {
                    this.menuOptionOnclick(event);
                    instance.hide(100);
                });
            }
        });
    }

    getMenuOptions(id) {
        const { editor } = this.blockEditor;
        const selectedBlock = Blockly.getSelected();
        const selectedBlockId = selectedBlock && selectedBlock.id;
        let menu = [];
        let children = [];
        let nextBlock = null;
        if (id === editor.id) {
            children = editor.getTopBlocks(); 
        } else {
            const block = editor.getBlockById(id);
            children = block.getChildren();
            nextBlock = block.getNextBlock();
        }
        for (let child of children) {
            if (child.isShadow()) {
                continue;
            }
            if (nextBlock && nextBlock.id === child.id) {
                continue;
            }
            let menuItem = { id: child.id };
            if (typeof child.getDescription === 'function') {
                menuItem.name = child.getDescription();
            } else {
                menuItem.name = child.type;
            }
            if (selectedBlockId === child.id) {
                menuItem.selected = true;
            }
            menu.push(menuItem);
        }
        if (menu.length) {
            return { list: menu };
        }
        return { list: [], empty: Msg.Lang['无选项'] };
    }

    menuOptionOnclick(event) {
        const { editor } = this.blockEditor;
        const $li = $(event.currentTarget);
        const id = $li.attr('value');
        // editor.zoomToFit();
        editor.centerOnBlock(id);
        let block = Blockly.getSelected();
        Blockly.Events.disable();
        if (block) {
            block.unselect();
        }
        Blockly.Events.enable();
        block = editor.getBlockById(id);
        block.select();
    }

    addDragEvents() {
        const { blockEditor, codeEditor } = this;
        this.drag = new DragV(this.$content.find('.editor')[0], {
            min: '200px',
            full: [true, true],
            startSize: '100%',
            startExitFullSize: '70%'
        });
        const { events } = this.drag;
        events.bind('sizeChanged', () => this.resize());
        events.bind('onfull', (type) => {
            switch(type) {
            case Drag.Extend.POSITIVE:
                blockEditor.scrollCenter();
                break;
            case Drag.Extend.NEGATIVE:
                blockEditor.setVisible(false);
                codeEditor.setReadOnly(false);
                codeEditor.showCtrlBtns();
                if (this.py2BlockEditor && BOARD.pythonToBlockly) {
                    this.py2BlockEditor.fromCode = true;
                }
                break;
            }
        });
        events.bind('exitfull', (type) => {
            switch(type) {
            case Drag.Extend.NEGATIVE:
                blockEditor.setVisible(true);
                codeEditor.setReadOnly(true);
                codeEditor.hideCtrlBtns();
                if (this.py2BlockEditor 
                    && BOARD.pythonToBlockly 
                    && typeof this.py2BlockEditor.updateBlock === 'function') {
                    this.py2BlockEditor.updateBlock();
                }
                break;
            case Drag.Extend.POSITIVE:
                codeEditor.setValue(blockEditor.getValue(), false);
                break;
            }
        });
    }

    addBtnEvents() {
        this.$btns.on('click', (event) => {
            const $btn = $(event.currentTarget);
            const mId = $btn.attr('m-id');
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
        const editor = this.getCurrentEditor();
        editor.undo();
    }

    redo() {
        const editor = this.getCurrentEditor();
        editor.redo();
    }

    resize() {
        this.blockEditor.resize();
        this.codeEditor.resize();
    }

    disposeBreadcrumbsMenu() {
        for (let item of this.breadcrumbsMenu) {
            item.destroy();
        }
    }

    dispose() {
        this.disposeBreadcrumbsMenu();
        this.blockEditor.dispose();
        this.codeEditor.dispose();
    }

    onMounted() {
        this.blockEditor.onMounted();
        this.codeEditor.onMounted();
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