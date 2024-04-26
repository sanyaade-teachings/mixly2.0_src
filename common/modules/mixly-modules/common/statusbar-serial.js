goog.loadJs('common', () => {

goog.require('path');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
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
    Msg,
    Debug,
    StatusBar,
    SideBarsManager,
    RightSideBarsManager,
    HTMLTemplate,
    PageBase,
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

        this.getMenu = function () {
            let ports = [];
            let menu = { list: ports };
            Serial.getCurrentPorts().map((port) => {
                ports.push(port.name);
            });
            if (!ports.length) {
                menu.empty = Msg.Lang['无可用串口'];
            }
            return menu;
        }
    }

    #$close_ = null;
    #opened_ = false;
    #valueTemp_ = '';
    #statusTemp_ = false;
    #$sendInput_ = null;
    #$settingMenu_ = null;
    #$dtr_ = null;
    #$rts_ = null;
    #manager_ = null;
    #output_ = null;
    #chart_ = null;
    #serial_ = null;
    #port_ = '';
    #config_ = {
        baud: 115200,
        dtr: true,
        rts: false
    };
    #sendWith_ = '';
    #dropdownMenu_ = null;

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-serial.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$settingMenu_ = $content.find('.setting-menu');
        this.#$settingMenu_.select2({
            minimumResultsForSearch: 50,
            dropdownAutoWidth: true,
            dropdownCssClass: 'mixly-scrollbar'
        });
        this.id = template.getId();
        this.#$sendInput_ = $content.find('.send > .box > input');
        this.#$dtr_ = $content.find('.dtr');
        this.#$rts_ = $content.find('.rts');
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
            this.setStatus(true);
            this.setValue(`==串口${this.getPort()}开启==\n`);
            this.#$sendInput_.attr('disabled', false);
            this.#serial_.config(this.#config_).catch(Debug.error);
        });

        this.#serial_.bind('onClose', () => {
            this.setStatus(false);
            this.addValue(`\n==串口${this.getPort()}关闭==`);
            this.#$sendInput_.val('');
            this.#$sendInput_.attr('disabled', true);
        });

        this.#serial_.bind('onError', (error) => {
            this.addValue(`${String(error)}\n`);
        });

        this.#serial_.bind('onString', (str) => {
            this.addValue(str);
        });

        this.#$settingMenu_.on('select2:select', (event) => {
            const { id } = event.currentTarget.dataset;
            const { data } = event.params;
            if (id === 'baud') {
                const baud = data.id - 0;
                if (!this.isOpened) {
                    this.#config_.baud = baud;
                    return;
                }
                this.#serial_.setBaudRate(baud)
                .then(() => {
                    this.#config_.baud = baud;
                })
                .catch((error) => {
                    this.#$settingMenu_.filter('[data-id="baud"]').val(data).trigger('change');
                });
            } else if (id === 'send-with') {
                if (data.id === 'no') {
                    this.#sendWith_ = '';
                } else {
                    this.#sendWith_ = data.id.replace('\\r', '\r').replace('\\n', '\n');
                }
            }
        });

        this.#$sendInput_.keydown((event) => {
            if (event.keyCode !== 13) {
                return;
            }
            const data = this.#$sendInput_.val() + this.#sendWith_;
            this.#serial_.sendString(data).catch(Debug.error);
            this.#$sendInput_.val('');
        });

        this.#$dtr_.change((event) => {
            let dtr = false;
            if (this.#$dtr_.prop('checked')) {
                dtr = true;
            }
            if (this.isOpened()) {
                this.#serial_.setDTR(dtr)
                .then(() => {
                    this.#config_.dtr = dtr;
                })
                .catch(Debug.error);
            } else {
                this.#config_.dtr = dtr;
            }
        });

        this.#$rts_.change((event) => {
            let rts = false;
            if (this.#$rts_.prop('checked')) {
                rts = true;
            }
            if (this.isOpened()) {
                this.#serial_.setRTS(rts)
                .then(() => {
                    this.#config_.rts = rts;
                })
                .catch(Debug.error);
            } else {
                this.#config_.rts = rts;
            }
        });
    }

    init() {
        super.init();
        this.addDirty();
        const $tab = this.getTab();
        this.#port_ = $tab.attr('data-tab-id');
        this.#serial_ = new Serial(this.getPort());
        this.#addEventsListener_();
        $tab.dblclick(() => this.toggle());
        this.#$close_ = $tab.find('.chrome-tab-close');
        this.#$close_.addClass('layui-badge-dot layui-bg-blue');
        if (!this.#statusTemp_) {
            this.open();
        } else {
            this.close();
        }
        this.setValue(this.#valueTemp_);
        this.#$settingMenu_.filter('[data-id="baud"]').val(this.#config_.baud).trigger('change');
        this.#$dtr_.prop('checked', this.#config_.dtr);
        this.#$rts_.prop('checked', this.#config_.rts);
    }

    open() {
        this.#serial_.open().catch(Debug.error);
    }

    close() {
        this.#serial_.close().catch(Debug.error);
    }

    toggle() {
        this.#serial_.toggle().catch(Debug.error);
    }

    setStatus(isOpened) {
        if (!this.isInited()) {
            this.#statusTemp_ = true;
            return;
        }
        if (this.isOpened() === isOpened || !this.#$close_) {
            return;
        }
        this.#opened_ = isOpened;
        if (isOpened) {
            this.#$close_.removeClass('layui-bg-blue');
            this.#$close_.addClass('layui-bg-orange');
        } else {
            this.#$close_.removeClass('layui-bg-orange');
            this.#$close_.addClass('layui-bg-blue');
        }
    }

    isOpened() {
        return this.#opened_;
    }

    getPort() {
        return this.#port_;
    }

    getSerial() {
        return this.#serial_;
    }

    dispose() {
        this.close();
        this.getManager().dispose();
        this.#$settingMenu_.select2('destroy');
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