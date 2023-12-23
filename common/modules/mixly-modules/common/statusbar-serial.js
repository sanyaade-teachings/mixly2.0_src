goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    constructor(element) {
        super(element);
        this.opened = false;
        this.$close = null;
    }

    init() {
        super.init();
        this.addDirty();
        const $tab = this.getTab();
        this.$close = $tab.find('.chrome-tab-close');
        this.$close.addClass('layui-badge-dot layui-bg-blue');
    }

    open() {
        if (this.isOpened()) {
            return;
        }
        this.$close.removeClass('layui-bg-blue');
        this.$close.addClass('layui-bg-orange');
        this.opened = true;
    }

    close() {
        if (!this.isOpened() || !this.$close) {
            return;
        }
        this.$close.removeClass('layui-bg-orange');
        this.$close.addClass('layui-bg-blue');
        this.opened = false;
    }

    isOpened() {
        return this.opened;
    }

    getPort() {
        return this.$tab.attr('data-tab-id');
    }

    dispose() {
        super.dispose();
        this.$close = null;
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});