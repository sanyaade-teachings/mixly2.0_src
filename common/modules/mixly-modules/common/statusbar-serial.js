goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    constructor(element) {
        super(element);
        this.opened = false;
    }

    open() {
        if (this.isOpened()) {
            return;
        }
        this.addDirty();
        this.opened = true;
    }

    close() {
        if (!this.isOpened()) {
            return;
        }
        this.removeDirty();
        this.opened = false;
    }

    isOpened() {
        return this.opened;
    }

    getPort() {
        return this.$tab.attr('data-tab-id');
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});