goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.StatusBarTerminal');
goog.require('Mixly.StatusBarSerial');
goog.require('Mixly.PagesManager');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Menu');
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
    PagesManager,
    ContextMenu,
    Menu
} = Mixly;

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

    #$btn_ = null;
    #shown_ = false;
    #$menu_ = null;
    #tabMenu_ = null;

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
        this.id = managerHTMLTemplate.id;
        this.#$btn_ = $tab.find('.operation > button');
        this.addEventsType(['show', 'hide', 'onSelectMenu', 'getMenu']);
        this.#addMenuBtn_();
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

    #addMenuBtn_() {
        this.#tabMenu_ = new ContextMenu(`div[m-id="${this.tabId}"] .layui-btn`, {
            trigger: 'none',
            position: (opt) => {
                opt.$menu.css({
                    top: 0,
                    left: 0,
                    position: 'relative',
                    margin: 0
                });
            },
            events: {
                show: (opt) => {
                    opt.$menu.detach();
                    $('.statusbar-tab-menu > .tippy-box > .tippy-content').empty().append(opt.$menu);
                    this.#$menu_.setProps({});
                    this.#tabMenu_.shown = true;
                },
                hide: (opt) => {
                    this.#tabMenu_.shown = false;
                    if (this.#$menu_.state.isShown) {
                        this.#$menu_.hide();
                    }
                }
            }
        });

        let menu = new Menu();
        let serialChildMenu = new Menu();
        let toolChildMenu = new Menu();
        menu.add({
            weight: 0,
            type: 'serial',
            children: serialChildMenu,
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开串口', '')
            }
        });
        menu.add({
            weight: 1,
            type: 'sep1',
            data: '---------'
        });
        menu.add({
            weight: 2,
            type: 'tool',
            children: toolChildMenu,
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('工具', ''),
                callback: (key, opt) => console.log(123)
            }
        });
        toolChildMenu.add({
            weight: 0,
            type: 'ampy-filesystem-tool',
            data: {
                isHtmlName: true,
                name: 'Ampy板卡文件系统管理',
                callback: (key, opt) => console.log(123)
            }
        });
        toolChildMenu.add({
            weight: 1,
            type: 'esptool-filesystem-tool',
            data: {
                isHtmlName: true,
                name: 'ESPTool板卡文件系统管理',
                callback: (key, opt) => console.log(123)
            }
        });
        
        this.#tabMenu_.register('code', menu);
        this.#tabMenu_.bind('getMenu', () => 'code');

        this.#$menu_ = tippy(this.#$btn_[0], {
            allowHTML: true,
            content: '',
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 0 ],
            appendTo: document.body,
            arrow: false,
            placement: 'bottom-start',
            delay: 0,
            duration: [ 0, 0 ],
            onCreate: (instance) => {
                $(instance.popper).addClass('statusbar-tab-menu');
            },
            onMount: (instance) => {
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
                this.#tabMenu_.show();
            },
            onHide: () => {
                if (this.#tabMenu_.shown) {
                    this.#tabMenu_.hide();
                }
            }
        });
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

    dispose() {
        StatusBarsManager.remove(this);
        super.dispose();
    }
}

Mixly.StatusBarsManager = StatusBarsManager;

});