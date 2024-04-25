goog.loadJs('common', () => {

goog.require('path');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.StatusBar');
goog.require('Mixly.SideBarsManager');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.PageBase');
goog.require('Mixly.StatusBarSerialOutput');
goog.require('Mixly.StatusBarSerialChart');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Web.Serial');
goog.provide('Mixly.StatusBarSerial');

const {
    Env,
    StatusBar,
    SideBarsManager,
    RightSideBarsManager,
    HTMLTemplate,
    PageBase,
    Regression,
    StatusBarSerialOutput,
    StatusBarSerialChart,
    Electron = {},
    Web = {}
} = Mixly;

const { Serial } = goog.isElectron ? Electron : Web;


class StatusBarSerial extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-serial.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-serial.html')))
        );
        SideBarsManager.typesRegistry.register(['serial_output'], StatusBarSerialOutput);
        SideBarsManager.typesRegistry.register(['serial_chart'], StatusBarSerialChart);
    }

    #$close_ = null;
    #opened_ = false;
    #valueTemp_ = '';
    #statusTemp_ = false;
    #$send_ = null;
    #$settingMenu = null;
    #manager_ = null;
    #output_ = null;
    #chart_ = null;
    #serial_ = null;
    #port_ = '';

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('statusbar/statusbar-serial.html').render());
        this.setContent($content);
        this.#$settingMenu = $content.find('.setting-menu');
        this.#$settingMenu.select2({
            minimumResultsForSearch: 50,
            dropdownAutoWidth: true,
            dropdownCssClass: 'mixly-scrollbar'
        });
        this.#$send_ = $content.find('.send');
        this.#manager_ = new RightSideBarsManager($content.find('.content')[0]);
        this.#manager_.add('serial_output', 'serial_output', '监视器');
        this.#manager_.add('serial_chart', 'serial_chart', '绘图器');
        this.#manager_.changeTo('serial_output');
        this.#output_ = this.#manager_.get('serial_output');
        this.#chart_ = this.#manager_.get('serial_chart');
        this.addEventsType(['reconnect']);
    }

    #addEventsListener_() {
        this.#serial_.bind('onOpen', () => {
            this.open();
            this.setValue(`===串口${this.getPort()}开启===\n`);
        });

        this.#serial_.bind('onClose', () => {
            this.close();
            this.addValue(`\n===串口${this.getPort()}关闭===`);
        });

        this.#serial_.bind('onError', (error) => {
            this.addValue(`${String(error)}\n`);
        });

        this.#serial_.bind('onString', (str) => {
            this.addValue(str);
        });
    }

    init() {
        super.init();
        this.addDirty();
        const $tab = this.getTab();
        this.#port_ = $tab.attr('data-tab-id');
        this.#serial_ = new NodeSerial(this.getPort());
        this.#addEventsListener_();
        $tab.dblclick(() => {
            if (this.isOpened()) {
                this.#serial_.close();
            } else {
                this.#serial_.open();
            }
        });
        
        this.#$close_ = $tab.find('.chrome-tab-close');
        this.#$close_.addClass('layui-badge-dot layui-bg-blue');
        if (!this.#statusTemp_) {
            this.#serial_.open();
        } else {
            this.#serial_.close();
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
        return this.#port_;
    }

    dispose() {
        this.getManager().dispose();
        this.#$settingMenu.select2('destroy');
        super.dispose();
        this.#$close_ = null;
    }

    setValue(data, scroll) {
        if (!this.isInited()) {
            this.#valueTemp_ = data;
            return;
        }
        this.#output_.setValue(data, scroll);
    }

    addValue(data) {
        if (!this.isInited()) {
            this.#valueTemp_ += data;
            return;
        }
        this.#output_.addValue(data);
    }

    getManager() {
        return this.#manager_;
    }

    resize() {
        super.resize();
        this.getManager().resize();
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});