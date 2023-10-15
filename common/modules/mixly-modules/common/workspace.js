goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.DragH');
goog.require('Mixly.DragV');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorsManager');
goog.require('Mixly.StatusBarTabs');
goog.require('Mixly.Electron.FileTree');
goog.provide('Mixly.Workspace');

const {
    XML,
    Env,
    Msg,
    DragH,
    DragV,
    IdGenerator,
    EditorsManager,
    StatusBarTabs,
    Electron = {}
} = Mixly;

const { FileTree } = goog.isElectron? Electron : Web;

class Workspace {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'workspace.html'));
    }

    constructor(dom) {
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.statusBarTabsFilter = IdGenerator.generate();
        this.$content = $(XML.render(Workspace.TEMPLATE, {
            mId: this.id,
            statusBarTabsFilter: this.statusBarTabsFilter
        }));
        $parentContainer.append(this.$content);
        this.$leftTabs = this.$content.find('.left-tabs');
        this.$sidebar = this.$content.find('.sidebar');
        this.$editor = this.$content.find('.editor');
        this.$dragV = this.$content.find('.drag-v');
        this.$dragH = this.$content.find('.drag-h');
        this.$statusBarTabs = this.$content.find('.statusbar-tabs');
        this.statusBarTabs = new StatusBarTabs(this.statusBarTabsFilter);
        this.statusBarTabs.add('terminal', 'output', Msg.Lang['输出']);
        this.statusBarTabs.changeTo('output');
        this.editorManager = new EditorsManager(this.$editor[0]);
        this.addDrag();
        this.addFuncForFileTree();
        this.addFuncForEditorManager();
        this.addFuncForStatusbarTabs();
    }

    addFuncForFileTree() {
        this.fileTree = new FileTree(this.$sidebar[0]);
        this.fileTree.onClickLeaf = (selected) => {
            this.editorManager.editorTabs.addTab({
                name: selected[0].text,
                favicon: false,
                title: selected[0].id
            });
        }
        this.fileTree.setDirPath('D:/gitee/mixly2.0-win32-x64/resources/app/src/sample');
    }

    addFuncForEditorManager() {
        this.editorManager.addEventListener('activeTabChange', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.select(tabId);
        });

        this.editorManager.addEventListener('tabRemove', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.deselect(tabId);
        });
    }

    addFuncForStatusbarTabs() {
        const _this = this;
        this.statusBarTabs.show = function() {
            if (this.isShown()) {
                return;
            }
            _this.dragH.show();
            this.shown = true;
        }

        this.statusBarTabs.hide = function() {
            if (!this.shown) {
                return;
            }
            _this.dragH.hide();
            this.shown = false;
        }
    }

    addDrag() {
        // 编辑器(上)+状态栏(下)
        this.dragH = new DragH(this.$dragH[0], {
            min: '50px',
            startSize: '100%',
            sizeChanged: () => {
                // 重新调整编辑器尺寸
                this.editorManager.resize();
            },
            onfull: (type) => {
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：上→下
                    this.statusBarTabs.shown = false;
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：下→上
                    break;
                }
            },
            exitfull: (type) => {
                switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：上→下
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：下→上
                    this.statusBarTabs.shown = true;
                    break;
                }
                return true;
            }
        });

        // 侧边栏(左)+[编辑器(上)+状态栏(下)]
        this.dragV = new DragV(this.$dragV[0], {
            min: '100px',
            full: [true, false],
            startSize: '0%',
            sizeChanged: () => {
                this.editorManager.resize();
            },
            onfull: (type) => {
            },
            exitfull: (type) => {
                return true;
            }
        });
    }
}

Mixly.Workspace = Workspace;

});