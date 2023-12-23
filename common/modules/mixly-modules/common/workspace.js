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
goog.require('Mixly.Electron.FileTree');
goog.require('Mixly.Web.FileTree');
goog.require('Mixly.StatusBarsManager')
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
    StatusBarsManager,
    Electron = {},
    Web = {}
} = Mixly;

const { FileTree } = goog.isElectron? Electron : Web;

class Workspace {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'workspace.html'));
        this.workspaces = [];

        this.getAll = () => {
            return this.workspaces;
        }

        this.add = (workspace) => {
            this.remove(workspace);
            this.workspaces.push(workspace);
        }

        this.remove = (workspace) => {
            for (let i in this.workspaces) {
                if (this.workspaces[i].id !== workspace.id) {
                    continue;
                }
                this.workspaces.slice(i, 1);
            }
        }

        this.getMain = () => {
            if (this.workspaces.length) {
                return this.workspaces[0];
            }
            return null;
        }
    }

    constructor(element) {
        const $parentContainer = $(element);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(Workspace.TEMPLATE, {
            mId: this.id
        }));
        $parentContainer.append(this.$content);
        this.$leftTabs = this.$content.find('.left-tabs');
        this.$leftSidebar = this.$content.find('.left-sidebar');
        this.$rightSidebar = this.$content.find('.right-sidebar');
        this.$editor = this.$content.find('.editor');
        this.$dragVLeft = this.$content.find('.drag-v-left');
        this.$dragVRight = this.$content.find('.drag-v-right');
        this.$dragH = this.$content.find('.drag-h');
        this.$statusBarTabs = this.$content.find('.statusbar-tabs');
        this.statusBarTabs = new StatusBarsManager(this.$statusBarTabs[0]);
        this.statusBarTabs.add('terminal', 'output', Msg.Lang['输出']);
        this.statusBarTabs.changeTo('output');
        this.editorManager = new EditorsManager(this.$editor[0]);
        this.dragH = null;
        this.dragV = null;
        Workspace.add(this);
        this.addDragEvents();
        this.addEventsForFileTree();
        this.addEventsForEditorManager();
        this.addFuncForStatusbarTabs();
    }

    addEventsForFileTree() {
        this.fileTree = new FileTree(this.$leftSidebar[0]);
        const { events } = this.fileTree;
        events.bind('selectLeaf', (selected) => {
            this.editorManager.tabs.addTab({
                name: selected[0].text,
                title: selected[0].id,
                id: selected[0].id,
                type: path.extname(selected[0].id)
            });
        });
        this.fileTree.setDirPath('D:/gitee');
    }

    addEventsForEditorManager() {
        const { events } = this.editorManager.tabs;
        events.bind('activeChange', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.select(tabId);
        });

        events.bind('destroyed', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.fileTree.deselect(tabId);
        });
    }

    addFuncForStatusbarTabs() {
        const { events } = this.statusBarTabs;
        events.bind('show', () => this.dragH.show());
        events.bind('hide', () => this.dragH.hide());
    }

    addDragEvents() {
        // 编辑器(上)+状态栏(下)
        this.dragH = new DragH(this.$dragH[0], {
            min: '50px',
            startSize: '100%',
            startExitFullSize: '70%'
        });

        const eventsH = this.dragH.events;
        eventsH.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(左)+[编辑器(上)+状态栏(下)]
        this.dragVLeft = new DragV(this.$dragVLeft[0], {
            min: '100px',
            full: [true, false],
            startSize: '0%',
            startExitFullSize: '15%'
        });

        const eventsVLeft = this.dragVLeft.events;
        eventsVLeft.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(右)+[编辑器(上)+状态栏(下)]
        this.dragVRight = new DragV(this.$dragVRight[0], {
            min: '100px',
            full: [false, true],
            startSize: '100%',
            startExitFullSize: '85%'
        });

        const eventsVRight = this.dragVRight.events;
        eventsVRight.bind('sizeChanged', () => {
            this.resize();
        });
    }

    resize() {
        this.editorManager.resize();
    }

    dispose() {
        Workspace.remove(this);
    }
}

Mixly.Workspace = Workspace;

});