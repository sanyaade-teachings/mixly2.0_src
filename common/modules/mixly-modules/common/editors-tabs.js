goog.loadJs('common', () => {

goog.require('path');
goog.require('ChromeTabs');
goog.require('XScrollbar');
goog.require('Sortable');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Config');
goog.provide('Mixly.EditorsTabs');

const {
    Env,
    IdGenerator,
    XML,
    Config
} = Mixly;

const { USER } = Config;

class EditorsTabs {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-tab.html'));
    }

    constructor(dom) {
        const $parentsContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorsTabs.TEMPLATE, {
            mId: this.id
        }));
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
            thumbSize: 1.5,
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
        this.tabs = {};
    }

    #addEvents_() {
        const { $container } = this;
        const container = $container[0];
        container.addEventListener('activeTabChange', (event) => {
            this.activeTabChange && this.activeTabChange(event);
            /*let left = $(event.detail.tabEl).attr('m-left');
            this.scrollbar.$container.scrollLeft = left;
            this.scrollbar.update();*/
        });
        container.addEventListener('tabAdd', (event) => {
            this.tabAdd && this.tabAdd(event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });
        container.addEventListener('tabRemove', (event) => {
            this.tabRemove && this.tabRemove(event);
            setTimeout(() => {
                this.scrollbar.update();
            }, 500);
        });
    }

    // 可覆盖
    activeTabChange(event) {

    }

    // 可覆盖
    tabAdd(event) {

    }

    // 可覆盖
    tabRemove(event) {

    }

    addTab(tabProperties, others = {}) {
        tabProperties = { ...tabProperties };
        const { title } = tabProperties;
        tabProperties.id = title ?? IdGenerator.generate();
        if (this.tabs[title]) {
            this.updateTab(this.tabs[title], tabProperties);
            this.setCurrentTab(this.tabs[title]);
        } else {
            this.tabs[title] = this.chromeTabs.addTab(tabProperties, others);
        }
    }

    removeTab(tabEl) {
        const tabId = $(tabEl).attr('data-tab-id');
        this.chromeTabs.removeTab(tabEl);
        delete this.tabs[tabId];
    }

    setCurrentTab(tabEl) {
        this.chromeTabs.setCurrentTab(tabEl);
    }

    updateTab(tabEl, tabProperties) {
        this.chromeTabs.updateTab(tabEl, tabProperties);
    }
}

Mixly.EditorsTabs = EditorsTabs;

});