goog.loadJs('common', () => {

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
    static MENU_TEMPLATE = goog.get(Env.templatePath + '/footerlayer-message.html');
    static MENU_ITEM = goog.get(Env.templatePath + '/footerlayer-message-item.html');
    static MENU_ITEM_WITH_ICON = goog.get(Env.templatePath + '/footerlayer-message-item-with-icon.html');
    static STYLES = [ 'primary', 'secondary', 'success', 'danger', 'warning' ];

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
            onDestroy: () => {}
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
        let template = this.genItemTemplate({
            type: config.type,
            style: config.style,
            src: config.src,
            name: config.name,
            message: config.message
        });
        let $template = $(template);
        this.$container.append($template);
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