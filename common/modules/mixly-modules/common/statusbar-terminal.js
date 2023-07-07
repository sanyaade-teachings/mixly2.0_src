goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarTerminal');

const { StatusBar } = Mixly;

class StatusBarTerminal extends StatusBar {
    static CONTENT = '<pre class="tab-ace" id="{{d.id}}" align="center"></pre>';
    static TITLE = '{{d.title}}';

    constructor(id, config) {
        super(config.contentId);
        this.id = id;
        this.config = config;
    }
}

Mixly.StatusBarTerminal = StatusBarTerminal;

});