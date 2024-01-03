goog.loadJs('common', () => {

goog.require('Mixly.PagesTab');
goog.require('Mixly.Registry');
goog.provide('Mixly.PagesManager');

const {
    PagesTab,
    Registry
} = Mixly;

class PagesManager {
    /**
     * config = {
     *      parentElem: element,
     *      managerId: string,
     *      managerContentElem: element,
     *      bodyElem: element,
     *      tabElem: element,
     *      tabId: string,
     *      tabContentElem: element,
     *      typesRegistry: Mixly.Registry
     * }
     **/
    constructor(config) {
        const $parentContainer = $(config.parentElem);
        this.$content = $(config.managerContentElem);
        this.typesRegistry = config.typesRegistry;
        this.$container = this.$content.children('div');
        this.$tabsContainer = $(config.tabElem);
        this.$editorContainer = $(config.bodyElem);
        this.id = config.managerId;
        this.tabs = new PagesTab({
            id: config.tabId,
            parentElem: config.tabElem,
            contentElem: config.tabContentElem
        });
        this.$container.append(this.$editorContainer);
        this.$welcomePage = null;
        $parentContainer.empty();
        $parentContainer.append(this.$content);
        let PageType = this.typesRegistry.getItem('#welcome');
        if (PageType) {
            this.$welcomePage = (new PageType()).getContainer();
            this.$container.replaceWith(this.$welcomePage);
        }
        this.page = 'welcome';
        this.#addEventsListener_();
        this.pagesRegistry = new Registry();
        this.activeId = null;
    }

    #addEventsListener_() {
        const pageTabs = this.getTabs();
        // active Tab被改变时触发
        pageTabs.bind('activeChange', (event) => {
            const prevEditor = this.getActive();
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const page = this.pagesRegistry.getItem(id);
            this.activeId = id;
            this.$editorContainer.children().detach();
            if (prevEditor) {
                prevEditor.onUnmounted();
            }
            this.$editorContainer.empty();
            this.$editorContainer.append(page.getContainer());
            if (!page.inited) {
                return;
            }
            page.onMounted();
        });

        // 添加新Tab时触发
        pageTabs.bind('created', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const type = $(tabEl).attr('data-tab-type');
            let PageType = this.typesRegistry.getItem(type);
            if (!PageType) {
                PageType = this.typesRegistry.getItem('#default');
            }
            let page = new PageType(this.$editorContainer[0]);
            this.pagesRegistry.register(id, page);
            page.setTab($(tabEl));
            if (this.$welcomePage) {
                if (this.pagesRegistry.length() && this.page === 'welcome') {
                    this.$welcomePage.replaceWith(this.$container);
                    this.page = 'editor';
                }
            }
            page.inited = true;
            page.init();
            page.onMounted();
        });

        // 移除已有Tab时触发
        pageTabs.bind('destroyed', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const page = this.pagesRegistry.getItem(id);
            if (!page) {
                return;
            }
            page.dispose();
            this.pagesRegistry.unregister(id);
            if (this.$welcomePage) {
                if (!this.pagesRegistry.length() && this.page !== 'welcome') {
                    this.$container.replaceWith(this.$welcomePage);
                    this.page = 'welcome';
                }
            }
        });
    }

    resize() {
        const page = this.getActive();
        page && page.resize();
        this.tabs.resize();
    }

    getActive() {
        return this.get(this.activeId);
    }

    add(type, id, name = null) {
        this.tabs.addTab({
            name: name ?? id,
            title: id,
            type: type
        });
    }

    remove(id) {
        this.tabs.removeTab(id);
    }

    changeTo(id) {
        if (!this.get(id)) {
            return;
        }
        this.tabs.setCurrentTab(id);
    }

    get(id) {
        return this.pagesRegistry.getItem(id);
    }

    keys() {
        return this.pagesRegistry.keys();
    }

    getTabs() {
        return this.tabs;
    }
}

Mixly.PagesManager = PagesManager;

});