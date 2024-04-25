goog.loadJs('common', () => {

goog.require('$.ui');
goog.require('$.flot');
goog.require('Mixly.PageBase');
goog.require('Mixly.Regression');
goog.provide('Mixly.StatusBarSerialChart');

const { PageBase, Regression } = Mixly;


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

Mixly.StatusBarSerialChart = StatusBarSerialChart;

});