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
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorBlockly');

const {
    Config,
    Env,
    XML,
    IdGenerator,
    ToolboxSearcher,
    EditorBase
} = Mixly;
const { USER, BOARD } = Config;

class EditorBlockly extends EditorBase {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-blockly.html'));
    }

    constructor(dom, extname='.mix') {
        super();
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorBlockly.TEMPLATE, {
            mId: this.id
        }));
        this.$loading = this.$content.find('.loading');
        this.$editorContainer = this.$content.find('.editor');
        $parentContainer.append(this.$content);
        this.codeChangeListener = null;
    }

    init() {
        const media = Config.pathPrefix + 'common/media/';
        this.$toolbox = $('#toolbox');
        const renderer = ['geras', 'zelos'].includes(USER.blockRenderer) ? USER.blockRenderer : 'geras';
        const grid = USER.blocklyShowGrid ==='yes' ? {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            } : {};
        this.editor = Blockly.inject(this.$editorContainer[0], {
            media,
            toolbox: this.$toolbox[0],
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
        case 'c/c++':
            this.generator = Blockly.Arduino;
            break;
        default:
            this.generator = Blockly.Python ?? Blockly.Arduino;
        }
        this.onMounted();
        const toolboxWidth = this.$editorContainer.find('.blocklyToolboxDiv').outerWidth(true);
        this.$loading.children('.left').animate({
          width: toolboxWidth + 'px'
        }, 'normal', () => {
            this.$loading.fadeOut("fast", () => {
                this.$loading.remove();
            });
        });
    }

    undo() {
        this.editor.undo(0);
    }

    redo() {
        this.editor.undo(1);
    }

    setVisible(status) {
        this.editor.setVisible(status);
    }

    scrollCenter() {
        this.editor.scrollCenter();
    }

    resize() {
        // 重新调整编辑器尺寸
        this.editor.hideChaff(false);
        $(this.editor.getParentSvg()).attr({
            width: this.$content.width(),
            height: this.$content.height()
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

        // ToolboxSearcher.init(editor);
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

    updateToolbox() {
        this.editor.updateToolbox(this.$toolbox[0]);
    }

    dispose() {
        this.editor.dispose();
    }

    onMounted() {
        this.updateToolbox();
        this.resize();
        this.editor.scrollCenter();
    }

    updateValue(data) {
        
    }

    getValue() {
        let code = this.generator.workspaceToCode(this.editor) || '';
        code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
            try {
                return decodeURIComponent(s.replace(/_/g, '%'));
            } catch (error) {
                return s;
            }
        });
        return code;
    }
}

Mixly.EditorBlockly = EditorBlockly;

});