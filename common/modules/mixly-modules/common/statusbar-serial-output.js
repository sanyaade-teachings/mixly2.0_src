goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerialOutput');

const { StatusBar } = Mixly;


class StatusBarSerialOutput extends StatusBar {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.StatusBarSerialOutput = StatusBarSerialOutput;

});