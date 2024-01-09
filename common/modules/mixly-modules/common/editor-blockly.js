goog.loadJs('common', () => {

goog.require('path');
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
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorBlockly');

const {
    Config,
    Env,
    XML,
    HTMLTemplate,
    ToolboxSearcher,
    EditorBase
} = Mixly;
const { USER, BOARD } = Config;

class EditorBlockly extends EditorBase {
    static {
        HTMLTemplate.add(
            'editor/editor-blockly.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-blockly.html')))
        );
        HTMLTemplate.add(
            'xml/default-categories.xml',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'xml/default-categories.xml')))
        );
        this.$blockly = null;
        this.blockEditor = null;
        this.initBlockly = () => {
            const DEFAULT_CATEGORIES = HTMLTemplate.get('xml/default-categories.xml').render();
            const media = path.join(Config.pathPrefix, 'common/media/');
            const renderer = ['geras', 'zelos'].includes(USER.blockRenderer) ? USER.blockRenderer : 'geras';
            this.$blockly = $('<div class="page-item"></div>');
            this.editor = Blockly.inject(this.$blockly[0], {
                media,
                toolbox: DEFAULT_CATEGORIES,
                renderer,
                zoom: {
                    controls: true,
                    wheel: true,
                    scaleSpeed: 1.03
                },
                grid: USER.blocklyShowGrid ==='yes' ? {
                    spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                } : {}
            });

            if (USER.theme === 'dark') {
                this.editor.setTheme(Blockly.Themes.Dark);
            } else {
                this.editor.setTheme(Blockly.Themes.Classic);
            }

            this.addPlugins();
        }

        this.addPlugins = () => {
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

        this.getEditor = () => {
            return this.editor;
        }

        this.getContent = () => {
            return this.$blockly;
        }

        this.initBlockly();
    }

    constructor(element) {
        super();
        const $parentContainer = $(element);
        this.setContent(
            $(HTMLTemplate.get('editor/editor-blockly.html').render())
        );
        $parentContainer.append(this.getContent());
        this.editor = EditorBlockly.getEditor();
        this.$toolbox = null;
        this.workspaceState = null;
        this.undoStack = null;
        this.redoStack = null;
    }

    init() {
        this.$toolbox = $('#toolbox');
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
        this.editor.registerToolboxCategoryCallback(
            Blockly.Variables.CATEGORY_NAME,
            Blockly.Variables.flyoutCategory
        );

        this.editor.registerToolboxCategoryCallback(
            Blockly.Procedures.CATEGORY_NAME,
            Blockly.Procedures.flyoutCategory
        );
    }

    undo() {
        super.undo();
        this.editor.undo(0);
    }

    redo() {
        super.redo();
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
        super.resize();
    }

    updateToolbox() {
        this.editor.updateToolbox(this.$toolbox[0]);
    }

    dispose() {
        super.dispose();
        if (this.isActive()) {
            EditorBlockly.getContent().detach();
            this.$content.empty();
        }
        this.$content.remove();
    }

    onMounted() {
        super.onMounted();
        this.$content.append(EditorBlockly.getContent());
        this.updateToolbox();
        Blockly.Events.disable();
        if (this.workspaceState) {
            Blockly.serialization.workspaces.load(this.workspaceState, this.editor, {
                recordUndo: false
            });
        }
        if (this.undoStack) {
            this.editor.undoStack_ = [...this.undoStack];
        }
        if (this.redoStack) {
            this.editor.redoStack_ = [...this.redoStack];
        }
        Blockly.Events.enable();
        this.resize();
        this.editor.scrollCenter();
    }

    onUnmounted() {
        super.onUnmounted();
        this.workspaceState = Blockly.serialization.workspaces.save(this.editor);
        this.undoStack = [...this.editor.undoStack_];
        this.redoStack = [...this.editor.redoStack_];
        Blockly.Events.disable();
        this.editor.clear();
        this.editor.clearUndo();
        Blockly.Events.enable();
        EditorBlockly.getContent().detach();
        this.$content.empty();
    }

    setValue(data) {
        
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