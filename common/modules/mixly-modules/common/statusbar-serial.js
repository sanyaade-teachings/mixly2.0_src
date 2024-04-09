goog.loadJs('common', () => {

goog.require('path');
goog.require('$.ui');
goog.require('$.flot');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.StatusBar');
goog.require('Mixly.SideBarsManager');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.PageBase');
goog.require('Mixly.Regression');
goog.provide('Mixly.StatusBarSerial');

const {
    Env,
    StatusBar,
    SideBarsManager,
    RightSideBarsManager,
    HTMLTemplate,
    PageBase,
    Regression
} = Mixly;


class StatusBarSerialOutput extends StatusBar {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

class StatusBarSerialChart extends PageBase {
    constructor() {
        super();
        const $draw = $('<div style="width: 100%; height: 100%;"></div>');
        this.setContent($draw);
        const regression = new Regression();

        var data = [],
            startTime = Date.now(),
            totalPoints = 500,
            needUpdate = false;

        function getData() {
            return [
                { data, lines: { show: true }}
            ];
        }

        function setData() {
            while (data.length > totalPoints) {
                data.shift();
            }
            var y = Math.random() * 100;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }
            data.push([Date.now(), y]);
            needUpdate = true;
        }

        const setRange = (plot) => {
            let { xaxis } = this.plot.getAxes();
            let { data = [] } = this.plot.getData()[0] ?? {};
            if (!data.length) {
                return;
            }
            if (data.length >= totalPoints) {
                xaxis.options.min = data[0][0];
                xaxis.options.max = data[totalPoints - 1][0];
                return;
            }
            let x = [], y = [];
            for (let i in data) {
                x.push((i - 0) + 1);
                y.push(data[i][0] - data[0][0]);
            }
            regression.fit(x, y);
            let xMax = regression.predict([totalPoints])[0] + data[0][0];
            let xMin = data[0][0];
            xaxis.options.min = xMin;
            xaxis.options.max = xMax;
        }

        // Set up the control widget

        this.plot = $.plot($draw, getData(), {
            series: {
                shadowSize: 1   // Drawing is faster without shadows
            },
            yaxis: {
                min: 0,
                max: 100,
                show: true,
                font: {
                    fill: "#c2c3c2"
                },
                labelWidth: 30
            },
            xaxis: {
                show: true,
                font: {
                    fill: "#c2c3c2"
                },
                mode: 'time',
                timezone: 'browser',
                twelveHourClock: true,
                timeBase: 'milliseconds',
                minTickSize: [1, 'second'],
                min: startTime,
                max: startTime + 1000 * 10,
            }
        });

        const update = () => {
            if (!needUpdate) {
                setTimeout(update, 10);
                return;
            }
            this.plot.setData(getData());
            this.plot.getSurface().clearCache();
            // this.plot.resize();
            this.plot.setupGrid(false);
            this.plot.draw();
            setRange(this.plot);
            needUpdate = false;
            // setTimeout(update, 1);
            window.requestAnimationFrame(update);
        }

        // window.requestAnimationFrame(update);

        // update();

        // setInterval(setData, 100);
        // setInterval(setData, 1);
    }

    init() {
        super.init();
        this.hideCloseBtn();
        this.resize();
    }

    resize() {
        this.plot.getSurface().clearCache();
        super.resize();
        this.plot.resize();
        this.plot.setupGrid(false);
        this.plot.draw();
    }
}

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
    #$settingMenu= null;
    #manager_ = null;

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
        const serialOutput = this.getManager().get('serial_output');
        serialOutput.setValue(data, scroll);
    }

    addValue(data) {
        if (!this.isInited()) {
            this.#valueTemp_ += data;
            return;
        }
        const serialOutput = this.getManager().get('serial_output');
        serialOutput.setValue(data);
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