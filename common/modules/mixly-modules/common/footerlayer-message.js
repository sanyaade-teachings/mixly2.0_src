goog.loadJs('common', () => {

goog.require('shortid');
goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Env');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerMessage');

const {
    XML,
    Msg,
    Env,
    FooterLayer
} = Mixly;

class FooterLayerMessage extends FooterLayer {
    // 弹层模板
    static {
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'footerlayer-message.html'));
        this.MENU_ITEM = goog.get(path.join(Env.templatePath, 'footerlayer-message-item.html'));
        this.MENU_ITEM_WITH_ICON = goog.get(path.join(Env.templatePath, 'footerlayer-message-item-with-icon.html'));
        this.STYLES = [ 'primary', 'secondary', 'success', 'danger', 'warning' ];
    }

    constructor(domId) {
        super(domId, {
            onMount: (instance) => {
                this.$body.scrollTop(this.$container.parent().prop('scrollHeight'));
            },
            btns: [
                {
                    class: 'clear',
                    title: Msg.Lang['清空'],
                    icon: 'layui-icon-delete',
                    onclick: () => {
                        this.clear();
                    }
                }
            ]
        });
        this.DEFALUT_ITEM_CONFIG = {
            type: 0,
            style: 'primary',
            src: '../../../common/media/mixly.png',
            name: '',
            onCreate: (obj) => {},
            onDestroy: () => {},
            btns: [],
            checkbox: false
        };
        const { MENU_TEMPLATE } = FooterLayerMessage;
        this.updateContent(MENU_TEMPLATE);
        this.messageQuery = [];
        this.$content.addClass('footer-layer-message');
        this.$container = this.$content.find('.toast-container');
        this.clear();
    }

    append(config) {
        config.operate = 'append';
        if (!this.$container.length) {
            this.messageQuery.push(config);
            if (this.messageQuery.length > 50) {
                this.messageQuery.shift();
            }
            return;
        }
        this.add_(config);
    }

    add_(config) {
        config = { ...this.DEFALUT_ITEM_CONFIG, ...config };
        this.$body.css('width', '350px');
        let $children = this.$container.children('div');
        if (!$children.length) {
            this.$container.html('');
        } else if ($children.length >= 50) {
            for (let i = 0; i <= $children.length - 50; i++) {
                $($children[i]).remove();
            }
        }
        if (!FooterLayerMessage.STYLES.includes(config.style)) {
            config.style = FooterLayerMessage.STYLES[0];
        }

        let btnsFunc = [];
        config.btns = config.btns ?? [];
        for (let i in config.btns) {
            if (!(config.btns[i] instanceof Object)) {
                continue;
            }
            btnsFunc.push(config.btns[i].onclick);
            delete config.btns[i].onclick;
            config.btns[i].mId = i;
        }
        
        let checkbox = {
            checked: '',
            show: false,
            title: ''
        };
        if (config.checkbox instanceof Object) {
            checkbox.id = shortid.generate();
            checkbox.show = true;
            checkbox.title = config.checkbox.title;
            checkbox.checked = config.checkbox.checked ? 'checked' : '';
        }
        let template = this.genItemTemplate({
            type: config.type,
            style: config.style,
            src: config.src,
            name: config.name,
            message: config.message,
            btns: config.btns,
            checkbox
        });
        let $template = $(template);
        this.$container.append($template);
        this.createBtnsClickEvent_($template, config.checkbox, btnsFunc);
        this.scrollToBottom();
        this.setProps({});
        if (typeof config.onCreate === 'function') {
            config.onCreate($template);
        }
        if (typeof config.onDestroy === 'function') {
            $template.find('.btn-close[data-bs-dismiss="toast"]').off().click(() => {
                $template.remove();
                if (!this.$container.children('div').length) {
                    this.clear();
                }
                config.onDestroy();
            });
        }
    }

    createBtnsClickEvent_(container, checkbox, btnsFunc) {
        container.find('.btns').children('button').off().click((event) => {
            let $target = $(event.target);
            let mId = parseInt($target.attr('m-id'));
            let checkboxValue = null;
            if (checkbox) {
                checkboxValue = container.find('input[class="form-check-input"]').prop('checked');
            }
            if (typeof btnsFunc[mId] === 'function') {
                btnsFunc[mId](event, container, checkboxValue);
            }
            if (!this.$container.children('div').length) {
                this.clear();
            }
        });
    }

    remove() {
        if (!this.$container.children('div').length) {
            return;
        }
        $container.eq(-1).remove();
    }

    clear() {
        this.$container.html(Msg.Lang['无消息']);
        this.$body.css('width', '100px');
        this.setProps({});
    }

    genItemTemplate(items) {
        const {
            MENU_ITEM_WITH_ICON,
            MENU_ITEM
        } = FooterLayerMessage;
        let template = '';
        if (items.type === 1) {
            template = MENU_ITEM_WITH_ICON;
        } else {
            template = MENU_ITEM;
        }
        return XML.render(template, items);
    }

    scrollToTop() {
        this.$body.scrollTop(0);
    }

    scrollToBottom() {
        this.$body.scrollTop(this.$body.prop('scrollHeight'));
    }
}

Mixly.FooterLayerMessage = FooterLayerMessage;

});