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
goog.require('Mixly.Events');
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
    Msg,
    Events
} = Mixly;

class StatusBarTabs {
    static {
        this.CTRL_BTN_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar-tab-ctrl-btn.html'));
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'statusbar-tab-menu.html'));

        /**
         * {
         *      "type": Array | String
         *      "statusBar": Class
         * }
         **/
        this.config = {};

        this.register = function(config) {
            if (config.type instanceof Array) {
                for (let i of config.type) {
                    this.config[i] = config.statusBar;
                }
            } else {
                this.config[config.type] = config.statusBar;
            }
        }
    }

    constructor(element) {
        this.$content = $(element);
        this.$container = this.$content.children();
        this.id = IdGenerator.generate();
        this.$container.attr('lay-filter', this.id);
        this.shown = false;
        this.statusBars = {};
        this.statusBarIndexToIds = [];
        this.events = new Events(['show', 'hide']);
        this.addChangeListener();
    }

    add(type, id, name = null) {
        if (this.getStatusBarById(id) || !StatusBarTabs.config[type]) {
            return;
        }

        let aceId = id;
        let statusBar;
        let $title = $('<div></div>');
        let $content = $('<div></div>');
        let tabId = IdGenerator.generate();
        
        try {
            aceId = aceId.replaceAll('/', '-')
                         .replaceAll('.', '-');
        } catch (error) {
            console.log(error);
        }
        
        statusBar = StatusBarTabs.config[type];

        element.tabAdd(this.id, {
            title: $title[0],
            content: $content[0],
            id
        });
        this.statusBars[id] = new statusBar({
            id,
            title: name ?? id,
            titleElement: $title[0],
            contentElement: $content[0]
        });
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
        element.tabChange(this.id, statusBar.id);
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
        this.events.run('show');
    }

    // 可覆盖
    hide() {
        this.events.run('hide');
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
            if (!statusBar) {
                return;
            }
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

StatusBarTabs.register({
    type: ['terminal'],
    statusBar: StatusBarTerminal
});

StatusBarTabs.register({
    type: ['serial'],
    statusBar: StatusBarSerial
});

Mixly.StatusBarTabs = StatusBarTabs;

});