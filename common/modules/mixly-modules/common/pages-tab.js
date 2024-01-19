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
goog.provide('Mixly.PagesTab');

const {
    IdGenerator,
    Config,
    Events,
    Registry
} = Mixly;

const { USER } = Config;

class PagesTab {
    #events_ = null;
    
    /**
     * config = {
     *      parentElem: element,
     *      contentElem: element
     * }
     **/
    constructor(config) {
        const $parentsContainer = $(config.parentElem);
        this.$content = $(config.contentElem);
        this.$container = this.$content.children('div');
        this.chromeTabs = new ChromeTabs();
        this.chromeTabs.init(this.$container[0]);
        this.scrollbar = new XScrollbar(this.$content.find('.chrome-tabs-content')[0], {
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
        $parentsContainer.empty();
        $parentsContainer.append(this.$content);
        this.#addEventsListener_();
        this.tabsRegistry = new Registry();
        this.#events_ = new Events(['activeChange', 'created', 'destroyed', 'checkDestroy', 'beforeDestroy']);
    }

    #addEventsListener_() {
        const { $container } = this;
        const container = $container[0];

        this.chromeTabs.checkDestroy = (event) => {
            const status = this.runEvent('checkDestroy', event);
            return _.sum(status) == status.length;
        }

        // active Tab被改变时触发
        container.addEventListener('activeChange', (event) => {
            this.runEvent('activeChange', event);
        });

        // 添加新Tab时触发
        container.addEventListener('created', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.register(tabId, tabEl);
            this.runEvent('created', event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });

        // 移除已有Tab之前触发
        container.addEventListener('beforeDestroy', (event) => {
            this.runEvent('beforeDestroy', event);
        });

        // 移除已有Tab时触发
        container.addEventListener('destroyed', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.unregister(tabId);
            this.runEvent('destroyed', event);
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
        this.tabsRegistry.unregister(tabId);
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

    resize() {
    }

    dispose() {
        this.chromeTabs.dispose();
        this.$content.remove();
        this.$container.remove();
        this.tabsRegistry.reset();
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

Mixly.PagesTab = PagesTab;

});