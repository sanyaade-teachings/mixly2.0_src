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
    /**
     * config = {
     *      id: sring, 
     *      parentElem: element,
     *      contentElem: element
     * }
     **/
    constructor(config) {
        const $parentsContainer = $(config.parentElem);
        this.id = config.id;
        this.$content = $(config.contentElem);
        this.$container = this.$content.children('div');
        this.chromeTabs = new ChromeTabs();
        this.chromeTabs.init(this.$container[0]);
        let trackBackground, thumbBackground;
        if (USER.theme === 'dark') {
            trackBackground = '#222';
            thumbBackground = '#b0b0b0';
        } else {
            trackBackground = '#ddd';
            thumbBackground = '#5f5f5f';
        }
        this.scrollbar = new XScrollbar(this.$content.find('.chrome-tabs-content')[0], {
            onlyHorizontal: true,
            thumbSize: 1.7,
            thumbRadius: 1,
            trackBackground,
            thumbBackground
        });
        this.sortable = new Sortable(this.chromeTabs.tabContentEl, {
            animation: 150,
            ghostClass: 'blue-background-class',
            direction: 'horizontal'
        });
        $parentsContainer.empty();
        $parentsContainer.append(this.$content);
        this.#addEvents_();
        this.tabsRegistry = new Registry();
        this.events = new Events(['activeChange', 'created', 'destroyed', 'checkDestroy', 'beforeDestroy']);
    }

    #addEvents_() {
        const { $container } = this;
        const container = $container[0];

        this.chromeTabs.checkDestroy = (event) => {
            const status = this.events.run('checkDestroy', event);
            return _.sum(status) == status.length;
        }

        // active Tab被改变时触发
        container.addEventListener('activeChange', (event) => {
            this.events.run('activeChange', event);
        });

        // 添加新Tab时触发
        container.addEventListener('created', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.register(tabId, tabEl);
            this.events.run('created', event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });

        // 移除已有Tab之前触发
        container.addEventListener('beforeDestroy', (event) => {
            this.events.run('beforeDestroy', event);
        });

        // 移除已有Tab时触发
        container.addEventListener('destroyed', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.tabsRegistry.unregister(tabId);
            this.events.run('destroyed', event);
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
            this.updateTab(tab, tabProperties);
            this.setCurrentTab(tab);
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
        const newId = tabProperties.id || id;
        this.chromeTabs.updateTab(tabEl, tabProperties);
        if (id !== newId) {
            this.tabsRegistry.unregister(id);
            this.tabsRegistry.register(id, tabEl);
        }
    }

    dispose() {

    }

    bind(type, func) {
        return this.events.bind(type, func);
    }

    unbind(id) {
        this.events.unbind(id);
    }

    off(type) {
        this.events.off(type);
    }
}

Mixly.PagesTab = PagesTab;

});