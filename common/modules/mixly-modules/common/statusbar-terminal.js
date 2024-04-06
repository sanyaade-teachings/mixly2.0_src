goog.loadJs('common', () => {

goog.require('Mprogress');
goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarTerminal');

const {
    StatusBar,
    Regression
} = Mixly;

class StatusBarTerminal extends StatusBar {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.StatusBarTerminal = StatusBarTerminal;

});