class Regression {
    constructor() {
        this.x = [];
        this.y = [];
        this.n = 0;
        this.beta = 1;
        this.alpha = 0;
    }
    /**
   * 适配
   * @param {Array} x 
   * @param {Array} y 
   */
    fit(x, y) {
        this.x = x;
        this.y = y;
        this.n = x.length;
        this.beta = this.getBeta();
        this.alpha = this.getAlpha(this.beta);
    }
    /**
   * 预测
   * @param {Array}  x 数据集
   * @returns {Array} 预测结果数据集
   */
    predict(x) {
        if (!Array.isArray(x)) x = [x];
        const y = [];
        for (const num of x) {
            y.push(this.alpha + num * this.beta);
        }
        return y;
    }
    /**
   * 获取beta
   * @returns {Number}  斜率
   */
    getBeta() {
        const beta = (this.sum(this.x, (v, k) => v * this.y[k]) * this.n
            - this.sum(this.x) * this.sum(this.y)) /
            (this.sum(this.x, (v) => v * v) * this.n
                - Math.pow(this.sum(this.x), 2));
        return beta;
    }
    /**
   * 获取alpha
   * @param {Number} beta 斜率
   * @returns {Number}  偏移量
   */
    getAlpha(beta) {
        return this.avg(this.y) - this.avg(this.x) * beta;
    }
    /**
   * 求和(Σ)
   * @param {Array} arr 数字集合
   * @param {Function}  fun 每个集合的操作方法
   */
    sum(arr, fun = (v, k) => v) {
        let s = 0;
        const operate = fun;
        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            s += operate(num, i);
        }
        return s;
    }
    /**
   * 均值
   * @param {Array} arr 数字集合
   */
    avg(arr) {
        const s = this.sum(arr);
        return s / arr.length;
    }
}

const regression = new Regression();

goog.require('Highcharts');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.Charts');

Mixly.Modules.highcharts = Highcharts;

Mixly.Charts.startTime = 0;
Mixly.Charts.oldTime = 0;
Mixly.Charts.nowTime = 0;
//Mixly.Charts.timeDiff = 0;
Mixly.Charts.pointNum = 100;
Mixly.Charts.xData = [];
Mixly.Charts.yData = [];
Mixly.Charts.data = [];

Mixly.Charts.darkTheme = {
    colors: "#2b908f #90ee7e #f45b5b #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),
    chart: {
        backgroundColor: {
            linearGradient: {
                x1: 0, y1: 0, x2: 1, y2: 1
            },
            stops: [
                [0, "#2a2a2b"],
                [1, "#3e3e40"]]
        },
        style: {
            fontFamily: "'Unica One', sans-serif"
        },
        plotBorderColor: "#606063"
    }, 
    title: { 
        style: { 
            color: "#E0E0E3", 
            textTransform: "uppercase", 
            fontSize: "20px" 
        } 
    }, 
    subtitle: { 
        style: { 
            color: "#E0E0E3", 
            textTransform: "uppercase" 
        } 
    },
    xAxis: { 
        gridLineColor: "#707073", 
        labels: { 
            style: { 
                color: "#E0E0E3" 
            } 
        }, 
        lineColor: "#707073", 
        minorGridLineColor: "#505053", 
        tickColor: "#707073", 
        title: { 
            style: { 
                color: "#A0A0A3" 
            } 
        } 
    }, 
    yAxis: { 
        gridLineColor: "#707073", 
        labels: { 
            style: { 
                color: "#E0E0E3" 
            } 
        }, 
        lineColor: "#707073", 
        minorGridLineColor: "#505053", 
        tickColor: "#707073", 
        tickWidth: 1, 
        title: { 
            style: { 
                color: "#A0A0A3" 
            } 
        } 
    }, 
    tooltip: { 
        backgroundColor: "rgba(0, 0, 0, 0.85)", 
        style: { 
            color: "#F0F0F0" 
        } 
    }, 
    plotOptions: {
        series: { 
            dataLabels: { 
                color: "#F0F0F3", 
                style: { 
                    fontSize: "13px" 
                } 
            }, 
            marker: { 
                lineColor: "#333" 
            } 
        },
        boxplot: { 
            fillColor: "#505053" 
        }, 
        candlestick: { 
            lineColor: "white" 
        }, 
        errorbar: { 
            color: "white" 
        }
    }, 
    legend: { 
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        itemStyle: { 
            color: "#E0E0E3" 
        }, 
        itemHoverStyle: { 
            color: "#FFF" 
        }, 
        itemHiddenStyle: { 
            color: "#606063" 
        }, title: { 
            style: { 
                color: "#C0C0C0" 
            } 
        } 
    }, 
    credits: { 
        style: { 
            color: "#666" 
        } 
    }, 
    labels: { 
        style: { 
            color: "#707073" 
        } 
    }, 
    drilldown: { 
        activeAxisLabelStyle: { 
            color: "#F0F0F3" 
        }, 
        activeDataLabelStyle: { 
            color: "#F0F0F3" 
        } 
    }, 
    navigation: { 
        buttonOptions: { 
            symbolStroke: "#DDDDDD", 
            theme: { 
                fill: "#505053" 
            } 
        } 
    }, 
    rangeSelector: {
        buttonTheme: {
            fill: "#505053",
            stroke: "#000000", 
            style: { 
                color: "#CCC" 
            }, 
            states: { 
                hover: { 
                    fill: "#707073", 
                    stroke: "#000000", 
                    style: { 
                        color: "white" 
                    } 
                }, 
                select: { 
                    fill: "#000003", 
                    stroke: "#000000", 
                    style: { 
                        color: "white" 
                    } 
                } 
            }
        }, 
        inputBoxBorderColor: "#505053", 
        inputStyle: { 
            backgroundColor: "#333", 
            color: "silver" 
        }, labelStyle: { 
            color: "silver" 
        }
    }, navigator: { 
        handles: { 
            backgroundColor: "#666", 
            borderColor: "#AAA" 
        }, 
        outlineColor: "#CCC", 
        maskFill: "rgba(255,255,255,0.1)", 
        series: { 
            color: "#7798BF", 
            lineColor: "#A6C7ED" 
        }, 
        xAxis: { 
            gridLineColor: "#505053" 
        } 
    }, scrollbar: {
        barBackgroundColor: "#808083",
        barBorderColor: "#808083", 
        buttonArrowColor: "#CCC", 
        buttonBackgroundColor: "#606063", 
        buttonBorderColor: "#606063", 
        rifleColor: "#FFF", 
        trackBackgroundColor: "#404043", 
        trackBorderColor: "#404043"
    }
};

Mixly.Charts.lightTheme = {
    colors: "#7cb5ec #f7a35c #90ee7e #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "), 
    chart: { 
        backgroundColor: null, 
        style: {
            fontFamily: "Dosis, sans-serif" 
        } 
    }, title: { 
        style: { 
            fontSize: "16px", 
            fontWeight: "bold", 
            textTransform: "uppercase" 
        } 
    }, tooltip: { 
        borderWidth: 0, 
        backgroundColor: "rgba(219,219,216,0.8)", 
        shadow: !1 
    }, 
    legend: { 
        backgroundColor: "#F0F0EA", 
        itemStyle: { 
            fontWeight: "bold", 
            fontSize: "13px" 
        } 
    }, 
    xAxis: {
        gridLineWidth: 1,
        labels: { 
            style: { 
                fontSize: "12px" 
            } 
        }
    }, yAxis: { 
        minorTickInterval: "auto", 
        title: { 
            style: { 
                textTransform: "uppercase" 
            } 
        }, labels: { 
            style: { 
                fontSize: "12px" 
            } 
        } 
    }, plotOptions: { 
        candlestick: { 
            lineColor: "#404048" 
        } 
    }
};

Mixly.Modules.highcharts.setOptions(Mixly.Charts.lightTheme);

Mixly.Charts.lightTheme = $.extend(true, {}, Mixly.Modules.highcharts.getOptions(), {});

function resetOptions() {
    var defaultOptions = Mixly.Modules.highcharts.getOptions();
    for (var prop in defaultOptions) {
        if (typeof defaultOptions[prop] !== 'function') delete defaultOptions[prop];
    }
    Mixly.Modules.highcharts.setOptions(Mixly.Charts.lightTheme);
}

Mixly.Charts.chart = null;

Mixly.Charts.draw = null;
Mixly.Charts.addData = null;

Mixly.Charts.init = function (serialOpened, dom) {
    const { USER } = Mixly.Config;
    if (USER.theme === 'dark') {
        Mixly.Modules.highcharts.setOptions(Mixly.Charts.darkTheme);
    } else {
        resetOptions();
    }
    Mixly.Charts.startTime = Number(new Date());
    Mixly.Charts.nowTime = Mixly.Charts.startTime;
    //Mixly.Charts.timeDiff = 0;
    Mixly.Charts.oldTime = Mixly.Charts.nowTime;
    Mixly.Charts.xData = [];
    Mixly.Charts.yData = [];
    Mixly.Charts.data = [];
    const { dataDrawId, yMinId, yMaxId } = dom.id;
    const yMinDom = $('#' + yMinId),
        yMaxDom = $('#' + yMaxId);
    Mixly.Charts.chart = Mixly.Modules.highcharts.chart(dataDrawId, {
        chart: {
            type: 'line'
        },
        title: {
            text: Mixly.Msg.Lang['串口数据']
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        xAxis: {
            //reversed: false,
            title: {
                enabled: true,
                text: Mixly.Msg.Lang['时间/ms']
            },
            lineWidth: 2
            //endOnTick: true
            //maxPadding: 0.05,
            //showLastLabel: true
        },
        yAxis: {
            title: {
                text: Mixly.Msg.Lang['串口数据']
            },
            endOnTick: true,
            lineWidth: 2
        },
        series: [{
            name: Mixly.Msg.Lang['串口数据'] + '1',
            data: []
        }]
    });
    if (yMaxDom.val() && yMinDom.val() && Mixly.Charts?.chart?.yAxis !== undefined) {
        var yMax = yMaxDom.val() || 100;
        var yMin = yMinDom.val() || 0;
        Mixly.Charts.chart.yAxis[0].setExtremes(yMin, yMax);
    }
    if (serialOpened) {
        Mixly.Charts.draw = window.setInterval(() => {
            Mixly.Charts.drawLines(dom);
        }, 100);
    }
}

Mixly.Charts.drawLines = function (dom) {
    let { yMinId, yMaxId } = dom.id;
    let yMinDom = $('#' + yMinId),
        yMaxDom = $('#' + yMaxId);
    if (yMaxDom.val() && yMinDom.val() && Mixly.Charts?.chart?.yAxis !== undefined) {
        var yMax = yMaxDom.val() || 100;
        var yMin = yMinDom.val() || 0;
        Mixly.Charts.chart.yAxis[0].setExtremes(yMin, yMax);
    }
    var xMin = 0;
    if (Mixly.Charts.data.length > 0 && Mixly.Charts.data[0].length > 0) {
        xMin = Mixly.Charts.data[0][0];
    }
    var xMax = xMin + 100;
    if (Mixly.Charts.data.length > 0 && Mixly.Charts.data.length < Mixly.Charts.pointNum) {
        regression.fit(Mixly.Charts.xData, Mixly.Charts.yData);
        xMax = regression.predict([Mixly.Charts.pointNum]);
        if (Mixly.Charts.data.length > 0 && xMax < Mixly.Charts.data[Mixly.Charts.data.length - 1][0]) {
            xMax = Mixly.Charts.data[Mixly.Charts.data.length - 1][0];
        }
        Mixly.Charts.chart.xAxis[0].setExtremes(xMin, xMax);
    } else if (Mixly.Charts.data.length >= Mixly.Charts.pointNum) {
        xMax = Mixly.Charts.data[Mixly.Charts.pointNum - 1][0];
        Mixly.Charts.chart.xAxis[0].setExtremes(xMin, xMax);
    }
    var seriesData = [];
    seriesData[0] = getCol(Mixly.Charts.data, 0);
    for (var i = 0; i < Mixly.Charts.chart.series.length; i++) {
        seriesData[1] = getCol(Mixly.Charts.data, i + 1);
        let data = reverseMatrix(seriesData);
        Mixly.Charts.chart.series[i].setData(data, true, false, false);
    }
    Mixly.Charts.update(dom);
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column[i] = matrix[i][col];
    }
    return column;
}

function reverseMatrix(sourceArr) {
    var reversedArr = [];
    for (var n = 0; n < sourceArr[0].length; n++) {
        reversedArr[n] = [];
        for (var j = 0; j < sourceArr.length; j++) {
            reversedArr[n][j] = sourceArr[j][n];
        }
    }
    return reversedArr;
}

Mixly.Charts.addData = function (serialData) {
    var timeData = Number(new Date());
    var serialNumber = getNumber(serialData);
    if (timeData - Mixly.Charts.nowTime > 50 && serialNumber && serialNumber.length > 0) {
        /*
        if (timeData - Mixly.Charts.nowTime > Mixly.Charts.timeDiff) {
            Mixly.Charts.timeDiff = timeData - Mixly.Charts.nowTime;
        }
        */
        Mixly.Charts.oldTime = Mixly.Charts.nowTime;
        Mixly.Charts.nowTime = timeData;
        var newData = [Mixly.Charts.nowTime - Mixly.Charts.startTime, serialNumber[0]];
        for (var i = 1; i < serialNumber.length; i++) {
            newData.push(serialNumber[i]);
        }
        while (Mixly.Charts.data.length > Mixly.Charts.pointNum) {
            Mixly.Charts.data.shift();
        }
        if (Mixly.Charts.data.length < Mixly.Charts.pointNum) {
            Mixly.Charts.xData.push(Mixly.Charts.data.length);
            Mixly.Charts.yData.push(Mixly.Charts.nowTime - Mixly.Charts.startTime);
        }
        Mixly.Charts.data.push(newData);
        while (Mixly.Charts.chart && Mixly.Charts.chart.series && Mixly.Charts.chart.series.length < serialNumber.length) {
            Mixly.Charts.chart.addSeries({
                name: Mixly.Msg.Lang['串口数据'] + (Mixly.Charts.chart.series.length + 1),
                data: []
            });
        }
    }
}

Mixly.Charts.update = function (dom) {
    let { pointNumId } = dom.id;
    if ($('#' + pointNumId + ' option:selected').val() - 0 != Mixly.Charts.pointNum) {
        try {
            Mixly.Charts.chart.destroy();
        } catch (e) {
            console.log(e);
        }
        Mixly.Charts.pointNum = $('#' + pointNumId + ' option:selected').val() - 0;
        if (Mixly.Charts.draw) {
            clearInterval(Mixly.Charts.draw);
            Mixly.Charts.init(true, dom);
        }
    }
}

Mixly.Charts.destroy = () => {
    try {
        Mixly.Charts.chart && Mixly.Charts.chart.destroy();
        Mixly.Charts.chart = null;
    } catch (e) {
        console.log(e);
    }
    Mixly.Charts.stopRefresh();
}

Mixly.Charts.stopRefresh = () => {
    Mixly.Charts.draw && clearInterval(Mixly.Charts.draw);
    Mixly.Charts.addData && clearInterval(Mixly.Charts.addData);
}

function getNumber(val) {
    var numArr = val.match(/-?([0-9]\d*(\.\d*)*(\e\+[0-9]*)*|0\.[0-9]\d*)/g);
    var numArr1 = [];
    if (numArr) {
        for (var i = 0; i < numArr.length; i++) {
            numArr1.push(parseFloat(numArr[i]));
        }
    }
    return numArr1;
}