goog.loadJs('common', () => {

goog.require('layui');
goog.require('tippy');
goog.require('shortid');
goog.require('Mixly.StatusBarSerial');
goog.require('Mixly.StatusBarTerminal');
goog.require('Mixly.Drag');
goog.require('Mixly.XML');
goog.require('Mixly.MArray');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.provide('Mixly.StatusBarTab');

const { element } = layui;
const {
    StatusBarSerial,
    StatusBarTerminal,
    Drag,
    XML,
    MArray,
    Env,
    Msg
} = Mixly;

class StatusBarTab {
    static CTRL_BTN_TEMPLATE = goog.get(Env.templatePath + '/statusbar-tab-ctrl-btn.html');
    static MENU_TEMPLATE = goog.get(Env.templatePath + '/statusbar-tab-menu.html');

    constructor(id, drag) {
        this.id = id;
        this.drag = drag;
        this.shown = false;
        this.statusBars = {};
        this.statusBarIndexToIds = [];
        this.addChangeListener();
    }

    add(type, id, name = null) {
        let aceId = id;
        try {
            aceId = aceId.replaceAll('/', '-')
                         .replaceAll('.', '-');
        } catch (error) {
            console.log(error);
        }
        if (this.getStatusBarById(id)) {
            return;
        }
        let statusBar;
        if (type === 'serial') {
            statusBar = StatusBarSerial;
        } else {
            statusBar = StatusBarTerminal;
        }

        let config = {
            tabId: shortid.generate(),
            titleId: shortid.generate(),
            contentId: shortid.generate()
        };

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

    show() {
        if (this.isShown()) {
            return;
        }
        this.drag.show();
        this.shown = true;
    }

    hide() {
        if (!this.shown) {
            return;
        }
        this.drag.hide();
        this.shown = false;
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
        this.$ctrlBtn = $(StatusBarTab.CTRL_BTN_TEMPLATE);
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
                const menuTemplate = XML.render(StatusBarTab.MENU_TEMPLATE, options);
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

Mixly.StatusBarTab = StatusBarTab;

});