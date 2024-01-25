goog.loadJs('common', () => {

goog.require('_');
goog.require('path');
goog.require('ChromeTabs');
goog.require('XScrollbar');
goog.require('Sortable');
goog.require('$.contextMenu');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.Component');
goog.provide('Mixly.PagesTab');

const {
    IdGenerator,
    Config,
    Events,
    Registry,
    Component
} = Mixly;

const { USER } = Config;

class PagesTab extends Component {
    /**
     * config = {
     *      parentElem: element,
     *      contentElem: element
     * }
     **/
    constructor(config) {
        super();
        const $parentsContainer = $(config.parentElem);
        const $content = $(config.contentElem);
        this.$tabsContainer = $content.children('div');
        this.chromeTabs = new ChromeTabs();
        this.chromeTabs.init(this.$tabsContainer[0]);
        this.scrollbar = new XScrollbar($content.find('.chrome-tabs-content')[0], {
            onlyHorizontal: true,
            thumbSize: 1.7,
            thumbRadius: 0,
            thumbBackground: USER.theme === 'dark'? '#b0b0b0' : '#5f5f5f'
        });
        this.sortable = new Sortable(this.chromeTabs.tabContentEl, {
            animation: 150,
            ghostClass: 'blue-background-class',
            direction: 'horizontal'
        });
        this.setContent($content);
        this.mountOn($parentsContainer);
        this.#addEventsListener_();
        this.tabsRegistry = new Registry();
        this.addEventsType(['activeTabChange', 'tabCreated', 'tabDestroyed', 'tabCheckDestroy', 'tabBeforeDestroy']);
    }

    #addEventsListener_() {
        const { $tabsContainer } = this;
        const container = $tabsContainer[0];

        this.chromeTabs.checkDestroy = (event) => {
            const status = this.runEvent('tabCheckDestroy', event);
            return _.sum(status) == status.length;
        }

        // active Tab被改变时触发
        container.addEventListener('activeChange', (event) => {
            this.runEvent('activeTabChange', event);
        });

        // 添加新Tab时触发
        container.addEventListener('created', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.register(tabId, tabEl);
            this.runEvent('tabCreated', event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });

        // 移除已有Tab之前触发
        container.addEventListener('beforeDestroy', (event) => {
            this.runEvent('tabBeforeDestroy', event);
        });

        // 移除已有Tab时触发
        container.addEventListener('destroyed', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.unregister(tabId);
            this.runEvent('tabDestroyed', event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });
    }

    addTab(tabProperties, others = {}) {
        tabProperties = { ...tabProperties };
        const { title } = tabProperties;
        tabProperties.id = title ?? IdGenerator.generate();
        let tab = this.tabsRegistry.getItem(title);
        if (tab) {
            this.updateTab(tabProperties.id, tabProperties);
            this.setCurrentTab(tabProperties.id);
        } else {
            tab = this.chromeTabs.addTab(tabProperties, others);
        }
        let { left } = $(tab).position();
        this.scrollbar.$container.scrollLeft = left;
        this.scrollbar.update();
    }

    removeTab(id) {
        const elem = this.tabsRegistry.getItem(id);
        this.chromeTabs.removeTab(elem);
        this.tabsRegistry.unregister(id);
    }

    setCurrentTab(id) {
        const elem = this.tabsRegistry.getItem(id);
        this.chromeTabs.setCurrentTab(elem);
    }

    updateTab(id, tabProperties) {
        const elem = this.tabsRegistry.getItem(id);
        const newId = tabProperties.id || id;
        this.chromeTabs.updateTab(elem, tabProperties);
        if (id !== newId) {
            this.tabsRegistry.unregister(id);
            this.tabsRegistry.register(id, elem);
        }
    }

    dispose() {
        this.chromeTabs.dispose();
        this.tabsRegistry.reset();
        super.dispose();
    }
}

Mixly.PagesTab = PagesTab;

});