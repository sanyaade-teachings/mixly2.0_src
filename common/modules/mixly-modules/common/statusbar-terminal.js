goog.loadJs('common', () => {

goog.require('Mprogress');
goog.require('$.ui');
goog.require('$.flot');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Regression');
goog.provide('Mixly.StatusBarTerminal');

const {
    StatusBar,
    Regression
} = Mixly;

class StatusBarTerminal extends StatusBar {
    constructor() {
        super();

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

        function setRange(plot) {
            let { xaxis } = plot.getAxes();
            let { data = [] } = plot.getData()[0] ?? {};
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

        // let $draw = $content.find('.draw');
        // var plot = $.plot($draw, getData(), {
        //     series: {
        //         shadowSize: 1   // Drawing is faster without shadows
        //     },
        //     yaxis: {
        //         min: 0,
        //         max: 100,
        //         show: true,
        //         font: {
        //             fill: "#c2c3c2"
        //         },
        //         labelWidth: 30
        //     },
        //     xaxis: {
        //         show: true,
        //         font: {
        //             fill: "#c2c3c2"
        //         },
        //         mode: 'time',
        //         timezone: 'browser',
        //         twelveHourClock: true,
        //         timeBase: 'milliseconds',
        //         minTickSize: [1, 'second'],
        //         min: startTime,
        //         max: startTime + 1000 * 10,
        //     }
        // });

        // function update () {
        //     if (!needUpdate) {
        //         setTimeout(update, 10);
        //         return;
        //     }
        //     plot.setData(getData());
        //     plot.getSurface().clearCache();
        //     plot.resize();
        //     plot.setupGrid(false);
        //     plot.draw();
        //     setRange(plot);
        //     needUpdate = false;
        //     setTimeout(update, 1);
        //     // window.requestAnimationFrame(update);
        // }

        // setTimeout(() => {
        //     plot.resize();
        // }, 5000)

        // window.requestAnimationFrame(update);

        // update();

        // setInterval(setData, 10);
        // setInterval(setData, 1);
        /*var mprogress3 = new Mprogress({
            speed: 1000,
            template: 3,
            parent: `[m-id="${mId}"] > .progress`
        });
        mprogress3.start();*/
    }

    init() {
        super.init();
        const $closeBtn = this.getTab().find('.chrome-tab-close');
        $closeBtn.css('display', 'none');
    }
}

Mixly.StatusBarTerminal = StatusBarTerminal;

});