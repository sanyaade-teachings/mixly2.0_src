goog.loadJs('common', () => {

goog.require('tippy');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.provide('Mixly.FooterLayer');

const { Env, XML, Msg } = Mixly;

const DEFAULT_CONFIG_TIPPY = {
    allowHTML: true,
    trigger: 'manual',
    interactive: true,
    hideOnClick: false,
    maxWidth: 'none',
    offset: [ 0, 6 ]
};

class FooterLayer {
    // 弹层模板
    static TEMPLATE = goog.get(Env.templatePath + '/footerlayer.html');

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
        this.btns = config.btns ?? [];
        this.btnsClickEvent = {};
        this.domId = domId;
        this.layer = null;
        this.createLayer();
        this.$content = $(this.layer.popper).find('.tippy-content');
        this.addSharedMethod();
        this.createBtnsClickEvent();
        this.addContainerOnclickEvent();
    }

    createLayer() {
        const { onShown, onAfterUpdate } = this.config;
        this.layer = tippy(`#${this.domId}`, { ...this.config })[0];
        this.layer.props.onShown = (instance) => {
            if (typeof onShown === 'function') {
                onShown(instance);
            }
            this.addBtnsClickEvent();
        }
        this.layer.props.onAfterUpdate = (instance) => {
            this.layer.props.onShown(instance);
            if (typeof onAfterUpdate === 'function') {
                onAfterUpdate(instance);
            }
        }
    }

    createBtnsClickEvent() {
        for (let i of this.btns) {
            if (!(i instanceof Object)) {
                continue;
            }
            if (typeof i.onclick !== 'function' || !(i.class)) {
                continue;
            }
            this.btnsClickEvent[i.class] = i.onclick;
            delete i.onclick;
        }
        this.btnsClickEvent['close'] = this.hide;
    }

    addBtnsClickEvent() {
        for (let key in this.btnsClickEvent) {
            $(this.layer.popper).find('.layui-layer-title').children(`.${key}`)
            .off().click(() => {
                this.btnsClickEvent[key]();
            });
        }
    }

    setContent(content) {
        content = XML.render(FooterLayer.TEMPLATE, {
            content,
            btns: this.btns,
            close: Msg.Lang['关闭窗口']
        });
        this.layer.setContent(content);
    }

    addBtnOnclickEvent() {
        $(instance.popper).find('.layui-layer-title').children('.close')
        .off().click(() => {
            instance.hide();
        });
    }

    addSharedMethod() {
        let sharedMethod = ['hide', 'show', 'destroy', 'setProps'];
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