goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Drag');
goog.require('Mixly.DragH');
goog.require('Mixly.DragV');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorsManager');
goog.require('Mixly.StatusBarsManager');
goog.require('Mixly.LeftSideBarsManager');
goog.require('Mixly.RightSideBarsManager');
goog.require('Mixly.Component');
goog.provide('Mixly.Workspace');

const {
    XML,
    Env,
    Msg,
    Drag,
    DragH,
    DragV,
    HTMLTemplate,
    EditorsManager,
    StatusBarsManager,
    LeftSideBarsManager,
    RightSideBarsManager,
    Component
} = Mixly;


class Workspace extends Component {
    static {
        HTMLTemplate.add(
            'workspace.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'workspace.html')))
        );

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
        super();
        const $content = $(HTMLTemplate.get('workspace.html').render());
        this.setContent($content);
        this.mountOn($(element));
        this.$leftTabs = $content.find('.left-tabs');
        this.$leftSidebar = $content.find('.left-sidebar');
        this.$rightSidebar = $content.find('.right-sidebar');
        this.$editor = $content.find('.editor');
        this.$dragVLeft = $content.find('.drag-v-left');
        this.$dragVRight = $content.find('.drag-v-right');
        this.$dragH = $content.find('.drag-h');
        this.$statusBarTabs = $content.find('.statusbar-tabs');
        this.statusBarTabs = new StatusBarsManager(this.$statusBarTabs[0]);
        this.statusBarTabs.add('terminal', 'output', Msg.Lang['输出']);
        this.statusBarTabs.changeTo('output');
        this.editorManager = new EditorsManager(this.$editor[0]);
        this.leftSideBarManager = new LeftSideBarsManager(this.$leftSidebar[0]);
        this.leftSideBarManager.add('local_storage', 'local_storage', '本地');
        this.leftSideBarManager.add('local_storage', 'examples', '例程');
        this.leftSideBarManager.add('local_storage', 'wiki', '文档');
        this.leftSideBarManager.add('libs', 'libs', '库管理');
        this.leftSideBarManager.changeTo('local_storage');
        this.rightSideBarManager = new RightSideBarsManager(this.$rightSidebar[0]);
        this.rightSideBarManager.add('local_storage', 'local_storage', '库管理');
        this.dragH = null;
        this.dragV = null;
        Workspace.add(this);
        this.#addEventsListenerForFileTree_();
        this.#addDragEventsListener_();
        this.#addEventsListenerForEditorManager_();
        this.#addFuncForStatusbarTabs_();
    }

    #addEventsListenerForFileTree_() {
        const leftSideBarLocalStorage = this.leftSideBarManager.get('local_storage');
        const fileTree = leftSideBarLocalStorage.getFileTree();
        fileTree.bind('selectLeaf', (selected) => {
            const tabs = this.editorManager.getTabs();
            tabs.addTab({
                name: selected[0].text,
                title: selected[0].id,
                id: selected[0].id,
                type: path.extname(selected[0].id),
                favicon: selected[0].icon
            });
        });
    }

    #addEventsListenerForEditorManager_() {
        const { tabs } = this.editorManager;
        tabs.bind('activeTabChange', (event) => {
            const leftSideBarLocalStorage = this.leftSideBarManager.get('local_storage');
            const fileTree = leftSideBarLocalStorage.getFileTree();
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            fileTree.deselectAll();
            fileTree.select(tabId);
        });
        tabs.bind('tabDestroyed', (event) => {
            const leftSideBarLocalStorage = this.leftSideBarManager.get('local_storage');
            const fileTree = leftSideBarLocalStorage.getFileTree();
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            fileTree.deselect(tabId);
        });
    }

    #addFuncForStatusbarTabs_() {
        this.statusBarTabs.bind('show', () => this.dragH.show());
        this.statusBarTabs.bind('hide', () => this.dragH.hide());
    }

    #addDragEventsListener_() {
        // 编辑器(上)+状态栏(下)
        this.dragH = new DragH(this.$dragH[0], {
            min: '50px',
            startSize: '100%',
            startExitFullSize: '70%'
        });

        this.dragH.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(左)+[编辑器(上)+状态栏(下)]
        this.dragVLeft = new DragV(this.$dragVLeft[0], {
            min: '100px',
            full: [true, false],
            startSize: '0%',
            startExitFullSize: '15%'
        });

        this.dragVLeft.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(右)+[编辑器(上)+状态栏(下)]
        this.dragVRight = new DragV(this.$dragVRight[0], {
            min: '100px',
            full: [false, true],
            startSize: '100%',
            startExitFullSize: '85%'
        });

        this.dragVRight.bind('sizeChanged', () => {
            this.resize();
        });
    }

    resize() {
        super.resize();
        this.editorManager.resize();
        this.leftSideBarManager.resize();
        this.rightSideBarManager.resize();
        this.statusBarTabs.resize();
    }

    dispose() {
        Workspace.remove(this);
        super.dispose();
    }
}

Mixly.Workspace = Workspace;

});