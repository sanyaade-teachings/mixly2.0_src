goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Drag');
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
    Drag,
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
        const { events } = this.fileTree;
        events.bind('selectLeaf', (selected) => {
            this.editorManager.editorTabs.addTab({
                name: selected[0].text,
                favicon: false,
                title: selected[0].id
            });
        });
        this.fileTree.setDirPath('D:/gitee/mixly/mixly2.0-win32-x64/resources/app/src/sample');
    }

    addFuncForEditorManager() {
        const { events } = this.editorManager.editorTabs;
        events.bind('activeTabChange', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.select(tabId);
        });

        events.bind('tabRemove', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.deselect(tabId);
        });
    }

    addFuncForStatusbarTabs() {
        const _this = this;
        this.statusBarTabs.show = function() {
            _this.dragH.show();
        }

        this.statusBarTabs.hide = function() {
            _this.dragH.hide();
        }
    }

    addDrag() {
        // 编辑器(上)+状态栏(下)
        this.dragH = new DragH(this.$dragH[0], {
            min: '50px',
            startSize: '100%'
        });

        const eventsH = this.dragH.events;
        eventsH.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(左)+[编辑器(上)+状态栏(下)]
        this.dragV = new DragV(this.$dragV[0], {
            min: '100px',
            full: [true, false],
            startSize: '0%'
        });

        const eventsV = this.dragV.events;
        eventsV.bind('sizeChanged', () => {
            this.resize();
        });
    }

    resize() {
        this.editorManager.resize();
    }
}

Mixly.Workspace = Workspace;

});