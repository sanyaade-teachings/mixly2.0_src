goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('WorkspaceSearch');
goog.require('Backpack');
goog.require('ContentHighlight');
goog.require('ZoomToFitControl');
goog.require('Blockly.FieldGridDropdown');
goog.require('Blockly.FieldSlider');
goog.require('Blockly.FieldBitmap');
goog.require('Blockly.FieldColourHsvSliders');
goog.require('Blockly.FieldDate');
goog.require('Mixly.Config');
goog.require('Mixly.ToolboxSearcher');
goog.provide('Mixly.BlockEditor');

const { Config, ToolboxSearcher } = Mixly;
const { USER, BOARD } = Config;

class BlockEditor {
    constructor(id, toolboxId) {
        this.id = id;
        this.$div = $(`#${this.id}`);
        this.codeChangeListener = null;
        const media = Config.pathPrefix + 'common/media/';
        const $toolbox = $(`#${toolboxId}`);
        const renderer = ['geras', 'zelos'].includes(USER.blockRenderer) ? USER.blockRenderer : 'geras';
        const grid = USER.blocklyShowGrid ==='yes' ? {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            } : {};
        this.editor = Blockly.inject(this.$div[0], {
            media,
            toolbox: $toolbox[0],
            renderer,
            zoom: {
                controls: true,
                wheel: true,
                scaleSpeed: 1.03
            },
            grid
        });

        this.editor.registerToolboxCategoryCallback(
            Blockly.Variables.CATEGORY_NAME,
            Blockly.Variables.flyoutCategory
        );

        this.editor.registerToolboxCategoryCallback(
            Blockly.Procedures.CATEGORY_NAME,
            Blockly.Procedures.flyoutCategory
        );

        this.addPlugins();

        if (USER.theme === 'dark') {
            this.editor.setTheme(Blockly.Themes.Dark);
        } else {
            this.editor.setTheme(Blockly.Themes.Classic);
        }

        switch (BOARD.language) {
        case 'Python':
        case 'CircuitPython':
        case 'MicroPython':
            this.generator = Blockly.Python;
            break;
        case 'C/C++':
            this.generator = Blockly.Arduino;
            break;
        default:
            this.generator = Blockly.Python ?? Blockly.Arduino;
        }
    }

    py2BlockEditorInit(codeEditor) {
        if (typeof Sk === 'object'
            && typeof PythonToBlocks === 'function'
            && typeof Py2blockEditor === 'function') {
            const py2blockConverter = new PythonToBlocks();
            this.py2BlockEditor = new Py2blockEditor(py2blockConverter, tcodeEditor);
            Sk.python3 = true;
        }
    }

    updateCode() {
        if (typeof this.codeChangeListener  === 'function') {
            this.editor.fireChangeListener(this.codeChangeListener);
        }
    }

    undo() {
        this.editor.undo(0);
    }

    redo() {
        this.editor.undo(1);
    }

    addPlugins() {
        const { editor } = this;
        editor.configureContextMenu = (menuOptions, e) => {
            menuOptions.push(
                Blockly.ContextMenu.workspaceCommentOption(editor, e)
            );
        }
        const zoomToFit = new ZoomToFitControl(editor);
        zoomToFit.init();
        ToolboxSearcher.init(editor);
        const workspaceSearch = new WorkspaceSearch(editor);
        workspaceSearch.init();
        const backpack = new Backpack(editor);
        backpack.init();
        if (USER.blocklyContentHighlight === 'yes') {
            const contentHighlight = new ContentHighlight(editor);
            contentHighlight.init();
        }
        const workspaceSearchOpen = {
            displayText: Blockly.Msg['WORKSPACE_SEARCH_OPEN'],
            preconditionFn: function(scope) {
                const blocks = editor.getAllBlocks();
                if (blocks.length)
                    return 'enabled';
                else
                    return 'hidden';
            },
            callback: function() {
                workspaceSearch.open();
            },
            scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
            id: 'workspaceSearch_open',
            weight: 200
        };
        Blockly.ContextMenuRegistry.registry.register(workspaceSearchOpen);
    }
}

Mixly.BlockEditor = BlockEditor;

});