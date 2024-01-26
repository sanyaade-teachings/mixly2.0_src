goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    #$close_ = null;
    #opened_ = false;
    #valueTemp_ = '';
    #statusTemp_ = false;

    constructor() {
        super();
        this.addEventsType(['reconnect']);
    }

    init() {
        super.init();
        this.addDirty();
        const $tab = this.getTab();
        $tab.dblclick(() => {
            this.runEvent('reconnect');
        });
        this.#$close_ = $tab.find('.chrome-tab-close');
        this.#$close_.addClass('layui-badge-dot layui-bg-blue');
        if (this.#statusTemp_) {
            this.open();
        } else {
            this.close();
        }
        this.setValue(this.#valueTemp_);
    }

    open() {
        if (!this.isInited()) {
            this.#statusTemp_ = true;
            return;
        }
        if (this.isOpened()) {
            return;
        }
        this.#opened_ = true;
        this.#$close_.removeClass('layui-bg-blue');
        this.#$close_.addClass('layui-bg-orange');
    }

    close() {
        if (!this.isInited()) {
            this.#statusTemp_ = false;
            return;
        }
        if (!this.isOpened() || !this.#$close_) {
            return;
        }
        this.#opened_ = false;
        this.#$close_.removeClass('layui-bg-orange');
        this.#$close_.addClass('layui-bg-blue');
    }

    isOpened() {
        return this.#opened_;
    }

    getPort() {
        const $tab = this.getTab();
        return $tab.attr('data-tab-id');
    }

    dispose() {
        super.dispose();
        this.#$close_ = null;
    }

    setValue(data, scroll) {
        if (!this.isInited()) {
            this.#valueTemp_ = data;
            return;
        }
        super.setValue(data, scroll);
    }

    addValue(data) {
        if (!this.isInited()) {
            this.#valueTemp_ += data;
            return;
        }
        super.addValue(data);
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});