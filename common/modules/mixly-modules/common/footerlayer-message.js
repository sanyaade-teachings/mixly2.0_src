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
    static MENU_TEMPLATE = goog.get(Env.templatePath + '/message-footer-layer.html');
    static MENU_ITEM = goog.get(Env.templatePath + '/message-footer-layer-item.html');
    static MENU_ITEM_WITH_ICON = goog.get(Env.templatePath + '/message-footer-layer-item-with-icon.html');
    static STYLES = [ 'primary', 'secondary', 'success', 'danger', 'warning' ];

    constructor(domId) {
        super(domId, {
            onMount: (instance) => {
                if (this.$container.length) {
                    return;
                }
                const { MENU_TEMPLATE } = FooterLayerMessage;
                const xmlStr = XML.render(MENU_TEMPLATE, {
                    close: Msg.Lang['关闭窗口'],
                    list: []
                });
                instance.setContent(xmlStr);
                instance.setProps({});
                this.$container = this.$content.find('.toast-container');
                this.$body = this.$container.parent();
                this.$body.css('width', '100px');
                for (let config of this.messageQuery) {
                    this.add_(config);
                }
                this.messageQuery = [];
            },
            onShown: (instance) => {
                let $container = this.$content.find('.toast-container');
                $container.parent().scrollTop(this.$container.parent().prop('scrollHeight'));
            }
        });
        this.DEFALUT_ITEM_CONFIG = {
            type: 0,
            style: 'primary',
            src: '../../../common/media/mixly.png',
            name: '',
            onMount: (obj) => {},
            onDestroy: () => {}
        };
        this.messageQuery = [];
        this.$content = $(this.layer.popper).find('.tippy-content');
        this.$container = this.$content.find('.toast-container');
        this.$body = this.$container.parent();
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
        if (typeof config.onMount === 'function') {
            config.onMount($template);
        }
        if (typeof config.onDestroy === 'function') {
            $template.find('.btn-close[data-bs-dismiss="toast"]').off().click(() => {
                $template.remove();
                if (!this.$container.children('div').length) {
                    this.$container.html('无消息');
                    this.$body.css('width', '100px');
                    this.setProps({});
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
        this.$container.html('无消息');
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