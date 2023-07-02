goog.loadJs('common', () => {

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
        this.createLayer();
        this.addSharedMethod();
        this.addContainerOnclickEvent();
    }

    createLayer() {
        const { onShown, onAfterUpdate } = this.config;
        this.layer = tippy(`#${this.domId}`, { ...this.config })[0];
        this.layer.props.onShown = (instance) => {
            if (typeof onShown === 'function') {
                onShown(instance);
            }
            this.addCloseBtnOnclickEvent(instance);
        }
        this.layer.props.onAfterUpdate = (instance) => {
            this.layer.props.onShown(instance);
            if (typeof onAfterUpdate === 'function') {
                onAfterUpdate(instance);
            }
        }
    }

    addCloseBtnOnclickEvent(instance) {
        $(instance.popper).find('.footer-layer-close')
        .off().click(() => {
            instance.hide();
        });
    }

    addSharedMethod() {
        let sharedMethod = ['hide', 'show', 'destroy', 'setProps', 'setContent'];
        for (let type of sharedMethod) {
            this[type] = this.layer[type];
        }
    }

    /**
     * @method 为绑定的元素添加鼠标单击事件
     * @return {void}
     **/
    addContainerOnclickEvent() {
        $(`#${this.domId}`).off().click(() => {
            if (this.layer.state.isShown) {
                this.hide();
            } else {
                this.show();
            }
        });
    }
}

Mixly.FooterLayer = FooterLayer;

});