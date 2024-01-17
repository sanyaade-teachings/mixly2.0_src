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
     *      managerContentElem: element,
     *      bodyElem: element,
     *      tabElem: element,
     *      tabContentElem: element,
     *      typesRegistry: Mixly.Registry
     * }
     **/
    constructor(config) {
        const $parentContainer = $(config.parentElem);
        this.$content = $(config.managerContentElem);
        this.typesRegistry = config.typesRegistry;
        this.$tabsContainer = $(config.tabElem);
        this.$editorContainer = $(config.bodyElem);
        this.tabs = new PagesTab({
            parentElem: config.tabElem,
            contentElem: config.tabContentElem
        });
        this.$content.append(this.$editorContainer);
        this.$welcomePage = null;
        $parentContainer.empty();
        $parentContainer.append(this.$content);
        let PageType = this.typesRegistry.getItem('#welcome');
        if (PageType) {
            this.$welcomePage = (new PageType()).getContent();
            this.$content.replaceWith(this.$welcomePage);
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
            this.$editorContainer.append(page.getContent());
            page.onMounted();
            page.resize();
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
            let page = new PageType();
            this.pagesRegistry.register(id, page);
            page.setTab($(tabEl));
            if (this.$welcomePage) {
                if (this.pagesRegistry.length() && this.page === 'welcome') {
                    this.$welcomePage.replaceWith(this.$content);
                    this.page = 'editor';
                }
            }
            page.init();
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
                    this.$content.replaceWith(this.$welcomePage);
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