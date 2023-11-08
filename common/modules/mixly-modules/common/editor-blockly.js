goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('WorkspaceSearch');
goog.require('Backpack');
goog.require('Minimap');
goog.require('PositionedMinimap');
goog.require('ContentHighlight');
goog.require('ZoomToFitControl');
goog.require('Multiselect');
goog.require('Blockly.FieldGridDropdown');
goog.require('Blockly.FieldDependentDropdown');
goog.require('Blockly.FieldSlider');
goog.require('Blockly.FieldBitmap');
goog.require('Blockly.FieldColourHsvSliders');
goog.require('Blockly.FieldDate');
goog.require('Blockly.Screenshot');
goog.require('Mixly.Config');
goog.require('Mixly.ToolboxSearcher');
goog.provide('Mixly.EditorBlockly');

const { Config, ToolboxSearcher } = Mixly;
const { USER, BOARD } = Config;

class EditorBlockly {
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

        if (USER.theme === 'dark') {
            this.editor.setTheme(Blockly.Themes.Dark);
        } else {
            this.editor.setTheme(Blockly.Themes.Classic);
        }

        this.addPlugins();
        const language = BOARD.language.toLowerCase();
        switch (language) {
        case 'python':
        case 'circuitpython':
        case 'micropython':
            this.generator = Blockly.Python;
            break;
        case 'lua':
            this.generator = Blockly.Lua;
            break;
        case 'javascript':
            this.generator = Blockly.Javascript;
            break;
        case 'c/c++':
            this.generator = Blockly.Arduino;
            break;
        default:
            this.generator = Blockly.Python ?? Blockly.Arduino;
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

    resize() {
        // 重新调整编辑器尺寸
        this.editor.hideChaff(false);
        $(this.editor.getParentSvg()).attr({
            width: this.$div.width(),
            height: this.$div.height()
        });
        this.editor.hideComponents(true);
        Blockly.common.svgResize(this.editor);
        Blockly.bumpObjects.bumpTopObjectsIntoBounds(this.editor);
    }

    addPlugins() {
        const { editor } = this;
        editor.configureContextMenu = (menuOptions, e) => {
            menuOptions.push(Blockly.ContextMenu.workspaceCommentOption(editor, e));
            const workspaceSearchOption = {
                text: Blockly.Msg['WORKSPACE_SEARCH_OPEN'],
                enabled: editor.getTopBlocks().length,
                callback: function() {
                    workspaceSearch.open();
                }
            };
            menuOptions.push(workspaceSearchOption);
            const screenshotOption = {
                text: Blockly.Msg['DOWNLOAD_SCREENSHOT'],
                enabled: editor.getTopBlocks().length,
                callback: function() {
                    Blockly.Screenshot.downloadScreenshot(editor);
                },
            };
            menuOptions.push(screenshotOption);
        }

        ToolboxSearcher.init(editor);
        const workspaceSearch = new WorkspaceSearch(editor);
        workspaceSearch.init();

        const zoomToFit = new ZoomToFitControl(editor);
        zoomToFit.init();
        const backpack = new Backpack(editor, {
            useFilledBackpackImage: true,
            skipSerializerRegistration: false,
            contextMenu: {
                emptyBackpack: true,
                removeFromBackpack: true,
                copyToBackpack: true,
                copyAllToBackpack: true,
                pasteAllToBackpack: true,
                disablePreconditionChecks: false
            }
        });
        backpack.init();

        if (USER.blocklyMultiselect === 'yes') {
            const multiselectPlugin = new Multiselect(editor);
            multiselectPlugin.init({
                useDoubleClick: false,
                bumpNeighbours: false,
                multiselectIcon: {
                    hideIcon: true
                },
                multiselectCopyPaste: {
                    crossTab: true,
                    menu: false
                }
            });
        }
        
        if (USER.blocklyShowMinimap === 'yes') {
            const minimap = new PositionedMinimap(editor);
            minimap.init();
        }
        
        if (USER.blocklyContentHighlight === 'yes') {
            const contentHighlight = new ContentHighlight(editor);
            contentHighlight.init();
        }
    }
}

Mixly.EditorBlockly = EditorBlockly;

});