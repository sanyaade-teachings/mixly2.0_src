(() => {

goog.require('tippy');
goog.require('Mixly');
goog.provide('Mixly.FooterLayer');

const DEFAULT_CONFIG_TIPPY = {
    allowHTML: true,
    trigger: 'manual',
    interactive: true,
    hideOnClick: false,
    maxWidth: 'none',
    offset: [ 0, 6 ]
};

class FooterLayer {
    /**
     * @param domId 被绑定元素的ID
     * @param config 配置项
        {
            ...DEFAULT_CONFIG_TIPPY
        }
     **/
    constructor(domId, config) {
        this.config = {
            ...DEFAULT_CONFIG_TIPPY,
            ...(config ?? {})
        };
        this.domId = domId;
        this.layer = null;
        this.addClickEvent();
    }

    /**
     * @method 为绑定的元素添加鼠标单击事件
     * @return {void}
     **/
    addClickEvent() {
        $(`#${this.domId}`).off().click(() => {
            if (this.layer?.length && !this.layer[0].state.isDestroyed) {
                if (this.layer[0].state.isShown) {
                    this.layer[0].destroy();
                    this.layer = null;
                } else {
                    this.layer[0].show();
                }
            } else {
                this.show();
            }
        });
    }

    /**
     * @method 在绑定元素上显示弹层
     * @return {void}
     **/
    show() {
        if (this.layer?.length) {
            return;
        }
        const _this = this;
        const { onMount, onHidden } = this.config;
        this.layer = tippy(`#${this.domId}`, {
            ...this.config,
            onMount(instance) {
                if (typeof onMount === 'function') {
                    onMount(instance);
                }
                $(instance.popper).find('.footer-layer-close').off().click(function() {
                    instance.destroy();
                    _this.layer = null;
                });
            },
        });
        this.layer[0].show();
    }

    /**
     * @method 更新弹层中的显示内容
     * @param content {string} html片段
     * @return {void}
     **/
    setContent(content) {
        this.layer[0].setContent(content);
    }

    /**
     * @method 更新弹层组件的配置
     * @param config {object} 配置项
     * @return {void}
     **/
    setProps(config = {}) {
        this.layer[0].setProps(config);
    }

    /**
     * @method 销毁弹层
     * @return {void}
     **/
    destroy() {
        if (this.layer?.length && !this.layer[0].state.isDestroyed) {
            this.layer[0].destroy();
        }
    }
}

Mixly.FooterLayer = FooterLayer;

})();