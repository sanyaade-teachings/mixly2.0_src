goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('tippy');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.StatusBarSerial');
goog.require('Mixly.StatusBarTerminal');
goog.require('Mixly.Drag');
goog.require('Mixly.XML');
goog.require('Mixly.MArray');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.provide('Mixly.StatusBarTabs');

const { element } = layui;
const {
    IdGenerator,
    StatusBarSerial,
    StatusBarTerminal,
    Drag,
    XML,
    MArray,
    Env,
    Msg
} = Mixly;

class StatusBarTabs {
    static {
        this.CTRL_BTN_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar-tab-ctrl-btn.html'));
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar-tab-menu.html'));
    }

    constructor(id) {
        this.id = id;
        this.shown = false;
        this.statusBars = {};
        this.statusBarIndexToIds = [];
        this.addChangeListener();
    }

    add(type, id, name = null) {
        let aceId = id;
        let statusBar;
        let config = IdGenerator.generate(['tabId', 'titleId', 'contentId']);
        
        try {
            aceId = aceId.replaceAll('/', '-')
                         .replaceAll('.', '-');
        } catch (error) {
            console.log(error);
        }
        if (this.getStatusBarById(id)) {
            return;
        }
        
        if (type === 'serial') {
            statusBar = StatusBarSerial;
        } else {
            statusBar = StatusBarTerminal;
        }

        element.tabAdd(this.id, {
            title: XML.render(statusBar.TITLE, {
                title: name ?? id,
                id: config.titleId
            }),
            content: XML.render(statusBar.CONTENT, {
                id: config.contentId
            }),
            id: config.tabId
        });
        this.statusBars[id] = new statusBar(id, config);
        this.statusBarIndexToIds.push(id);
    }

    remove(id) {
        let statusBar = this.getStatusBarById(id);
        element.tabDelete(this.id, statusBar.config.tabId);
    }

    changeTo(id) {
        let statusBar = this.getStatusBarById(id);
        if (!statusBar) {
            return;
        }
        element.tabChange(this.id, statusBar.config.tabId);
    }

    getStatusBarById(id) {
        return this.statusBars[id] || null;
    }

    getStatusBarByIndex(index) {
        if (index > this.statusBars.length - 1) {
            return null;
        }
        let id = this.statusBarIndexToIds[index];
        return this.getStatusBarById(id);
    }

    removeStatusBarById(id) {
        let statusBar = this.getStatusBarById(id);
        statusBar.dispose();
        delete this.statusBars[id];
        MArray.remove(this.statusBarIndexToIds, id);
    }

    removeStatusBarByIndex(index) {
        if (index > this.statusBars.length - 1) {
            return null;
        }
        let id = this.statusBarIndexToIds[index];
        this.removeStatusBarById(id);
    }

    // 可覆盖
    show() {
    }

    // 可覆盖
    hide() {
    }
    
    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    isShown() {
        return this.shown;
    }

    addChangeListener() {
        element.on(`tabDelete(${this.id})`, (data) => {
            let statusBar = this.getStatusBarByIndex(data.index);
            if (typeof statusBar.onRemove === 'function') {
                statusBar.onRemove();
            }
            statusBar.dispose();
            this.removeStatusBarByIndex(data.index);
        });

        element.on(`tab(${this.id})`, (data) => {
            let statusBar = this.getStatusBarByIndex(data.index);
            if (typeof statusBar.onTab === 'function') {
                statusBar.onTab();
            }
            statusBar.scrollToBottom();
        });
    }

    addCtrlBtn() {
        this.$ctrlBtn = $(StatusBarTabs.CTRL_BTN_TEMPLATE);
        $(`.layui-tab[lay-filter="${this.id}"] > .layui-tab-title`).append(this.$ctrlBtn);
        this.$menu = tippy(this.$ctrlBtn[0], {
            allowHTML: true,
            content: '',
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 6 ],
            onMount: (instance) => {
                let options = this.getMenuOptions() ?? {};
                options.list = options.list ?? [];
                options.empty = options.empty ?? Msg.Lang['无选项'];
                const menuTemplate = XML.render(StatusBarTabs.MENU_TEMPLATE, options);
                instance.setContent(menuTemplate);
                $(instance.popper).find('li').off().click((event) => {
                    this.menuOptionOnclick(event);
                    this.$menu.hide(100);
                });
            }
        });

        $(window).on('resize', () => {
            this.$menu.hide(100);
        });
    }

    // 可覆盖
    menuOptionOnclick(event) {

    }

    // 可覆盖
    getMenuOptions() {
        return { list: [], empty: Msg.Lang['无选项'] };
    }
}

Mixly.StatusBarTabs = StatusBarTabs;

});