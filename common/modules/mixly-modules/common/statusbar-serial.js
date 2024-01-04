goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    constructor(element) {
        super(element);
        this.opened = false;
        this.$close = null;
        this.addEventsType(['reconnect']);
        this.valueTemp = '';
        this.statusTemp = false;
    }

    init() {
        super.init();
        this.addDirty();
        const $tab = this.getTab();
        $tab.dblclick(() => {
            this.runEvent('reconnect');
        });
        this.$close = $tab.find('.chrome-tab-close');
        this.$close.addClass('layui-badge-dot layui-bg-blue');
        if (this.statusTemp) {
            this.open();
        } else {
            this.close();
        }
        this.setValue(this.valueTemp);
    }

    open() {
        if (!this.isInited()) {
            this.statusTemp = true;
            return;
        }
        if (this.isOpened()) {
            return;
        }
        this.opened = true;
        this.$close.removeClass('layui-bg-blue');
        this.$close.addClass('layui-bg-orange');
    }

    close() {
        if (!this.isInited()) {
            this.statusTemp = false;
            return;
        }
        if (!this.isOpened() || !this.$close) {
            return;
        }
        this.opened = false;
        this.$close.removeClass('layui-bg-orange');
        this.$close.addClass('layui-bg-blue');
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

    setValue(data, scroll) {
        if (!this.isInited()) {
            this.valueTemp = data;
            return;
        }
        super.setValue(data, scroll);
    }

    addValue(data) {
        if (!this.isInited()) {
            this.valueTemp += data;
            return;
        }
        super.addValue(data);
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});