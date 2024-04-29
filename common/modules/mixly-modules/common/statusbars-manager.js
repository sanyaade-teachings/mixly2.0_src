goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.StatusBarTerminal');
goog.require('Mixly.StatusBarSerial');
goog.require('Mixly.StatusBarFSEsptool');
goog.require('Mixly.PagesManager');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.DropdownMenu');
goog.require('Mixly.Menu');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Serial');
goog.provide('Mixly.StatusBarsManager');

const {
    XML,
    Env,
    Msg,
    Registry,
    Events,
    HTMLTemplate,
    StatusBarTerminal,
    StatusBarSerial,
    StatusBarFSEsptool,
    PagesManager,
    ContextMenu,
    DropdownMenu,
    Menu,
    IdGenerator,
    Serial
} = Mixly;

const { layer } = layui;


class StatusBarsManager extends PagesManager {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager.html')))
        );
        HTMLTemplate.add(
            'statusbar/statusbar-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-tab.html')))
        );
        HTMLTemplate.add(
            'statusbar/statusbar-manager-menu.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-manager-menu.html')))
        );
        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'terminal'], StatusBarTerminal);
        this.typesRegistry.register(['serial'], StatusBarSerial);
        this.typesRegistry.register(['filesystem-esptool'], StatusBarFSEsptool);

        this.getMain = function() {
            if (!this.managersRegistry.length()) {
                return null;
            }
            const key = this.managersRegistry.keys()[0];
            return this.managersRegistry.getItem(key);
        }

        this.add = function(manager) {
            this.managersRegistry.register(manager.id, manager);
        }

        this.remove = function(manager) {
            this.managersRegistry.unregister(manager.id);
        }
    }

    #shown_ = false;
    #dropdownMenu_ = null;

    constructor(element) {
        const managerHTMLTemplate = HTMLTemplate.get('statusbar/statusbar-manager.html');
        const tabHTMLTemplate = HTMLTemplate.get('statusbar/statusbar-tab.html');
        const $manager = $(managerHTMLTemplate.render());
        const $tab = $(tabHTMLTemplate.render());
        super({
            parentElem: element,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabContentElem: $tab[0],
            typesRegistry: StatusBarsManager.typesRegistry
        });
        this.tabId = tabHTMLTemplate.id;
        this.id = IdGenerator.generate();
        this.addEventsType(['show', 'hide', 'onSelectMenu', 'getMenu']);
        this.#addDropdownMenu_();
        this.#addEventsListener_();
        StatusBarsManager.add(this);
    }

    getStatusBarById(id) {
        return this.get(id);
    }

    removeStatusBarById(id) {
        this.remove(id);
    }

    show() {
        this.runEvent('show');
    }

    hide() {
        this.runEvent('hide');
    }
    
    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    isShown() {
        return this.#shown_;
    }

    #addDropdownMenu_() {
        const selector = `div[m-id="${this.tabId}"] .layui-btn`;
        let menu = new Menu();
        let serialChildMenu = new Menu(true);
        let toolChildMenu = new Menu();
        menu.add({
            weight: 0,
            type: 'serial-default',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开选中串口', ''),
                callback: (key, opt) => {
                    const port = Serial.getSelectedPortName();
                    if (port) {
                        this.runEvent('onSelectMenu', Serial.getSelectedPortName());
                    } else {
                        layer.msg(Msg.Lang["无可用设备"], {
                            time: 1000
                        });
                    }
                }
            }
        });
        menu.add({
            weight: 1,
            type: 'serial',
            children: serialChildMenu,
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开串口', '')
            }
        });
        menu.add({
            weight: 2,
            type: 'sep1',
            data: '---------'
        });
        menu.add({
            weight: 3,
            type: 'tool',
            children: toolChildMenu,
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('板卡文件管理', '')
            }
        });
        toolChildMenu.add({
            weight: 0,
            type: 'ampy-filesystem-tool',
            data: {
                isHtmlName: true,
                disabled: true,
                name: ContextMenu.getItem('Ampy', '不可用'),
                callback: (key, opt) => {}
            }
        });
        toolChildMenu.add({
            weight: 1,
            type: 'esptool-filesystem-tool',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('ESPTool', ''),
                callback: (key, opt) => {
                    this.add('filesystem-esptool', 'FS-ESPTool');
                    this.changeTo('ESPTool');
                }
            }
        });

        serialChildMenu.bind('onRead', () => {
            let options = this.#getMenu_() ?? {};
            options.list = options.list ?? [];
            options.empty = options.empty ?? Msg.Lang['无选项'];
            serialChildMenu.empty();
            if (!options.list.length) {
                serialChildMenu.add({
                    weight: 1,
                    type: 'empty',
                    data: {
                        isHtmlName: true,
                        name: options.empty,
                        disabled: true
                    }
                });
            }
            for (let i in options.list) {
                serialChildMenu.add({
                    weight: 1,
                    type: `serial${i}`,
                    data: {
                        isHtmlName: true,
                        name: options.list[i],
                        callback: (key, opt) => this.#onSelectMenu_(options.list[i])
                    }
                });
            }
        });
        this.#dropdownMenu_ = new DropdownMenu(selector, menu);
    }

    #onSelectMenu_(event) {
        this.runEvent('onSelectMenu', event);
    }

    #getMenu_() {
        let menus = this.runEvent('getMenu');
        if (menus && menus.length) {
            return menus[0];
        }
        return { list: [], empty: Msg.Lang['无选项'] };
    }

    #addEventsListener_() {
        this.bind('getMenu', () => {
            return StatusBarSerial.getMenu();
        });

        this.bind('onSelectMenu', (port) => {
            this.add('serial', port);
            this.changeTo(port);
            const statusBarSerial = this.getStatusBarById(port);
            statusBarSerial.open();
        });
    }

    getDropdownMenu() {
        return this.#dropdownMenu_;
    }

    dispose() {
        StatusBarsManager.remove(this);
        super.dispose();
    }
}

Mixly.StatusBarsManager = StatusBarsManager;

});