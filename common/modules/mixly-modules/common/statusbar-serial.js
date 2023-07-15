goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    static CONTENT = '<pre class="tab-ace" id="{{d.id}}" align="center"></pre>';
    static TITLE = '{{d.title}}<span id="{{d.id}}" class="layui-badge-dot layui-bg-orange"></span>';

    constructor(id, config) {
        super(config.contentId);
        this.id = id;
        this.opened = true;
        this.config = config;
    }

    open() {
        if (this.isOpened()) {
            return;
        }
        let $span = $(`#${this.config.titleId}`);
        $span.removeClass('layui-bg-blue').addClass('layui-bg-orange');
        this.opened = true;
    }

    close() {
        if (!this.isOpened()) {
            return;
        }
        let $span = $(`#${this.config.titleId}`);
        $span.removeClass('layui-bg-orange').addClass('layui-bg-blue');
        this.opened = false;
    }

    isOpened() {
        return this.opened;
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});