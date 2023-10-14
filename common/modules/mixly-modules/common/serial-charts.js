goog.loadJs('common', () => {

goog.require('Highcharts');
goog.require('Mixly.Regression');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.Charts');

const {
    Regression,
    Config,
    Msg,
    Charts
} = Mixly;

const { USER } = Config;

Charts.startTime = 0;
Charts.oldTime = 0;
Charts.nowTime = 0;
//Charts.timeDiff = 0;
Charts.pointNum = 100;
Charts.xData = [];
Charts.yData = [];
Charts.data = [];

const regression = new Regression();

Charts.darkTheme = {
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

Charts.lightTheme = {
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

Highcharts.setOptions(Charts.lightTheme);

Charts.lightTheme = $.extend(true, {}, Highcharts.getOptions(), {});

function resetOptions() {
    var defaultOptions = Highcharts.getOptions();
    for (var prop in defaultOptions) {
        if (typeof defaultOptions[prop] !== 'function') delete defaultOptions[prop];
    }
    Highcharts.setOptions(Charts.lightTheme);
}

Charts.chart = null;

Charts.draw = null;
Charts.addData = null;

Charts.init = function (serialOpened, dom) {
    if (USER.theme === 'dark') {
        Highcharts.setOptions(Charts.darkTheme);
    } else {
        resetOptions();
    }
    Charts.startTime = Number(new Date());
    Charts.nowTime = Charts.startTime;
    //Charts.timeDiff = 0;
    Charts.oldTime = Charts.nowTime;
    Charts.xData = [];
    Charts.yData = [];
    Charts.data = [];
    const { dataDrawId, yMinId, yMaxId } = dom.id;
    const yMinDom = $('#' + yMinId),
        yMaxDom = $('#' + yMaxId);
    Charts.chart = Highcharts.chart(dataDrawId, {
        chart: {
            type: 'line'
        },
        title: {
            text: Msg.Lang['串口数据']
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        xAxis: {
            //reversed: false,
            title: {
                enabled: true,
                text: Msg.Lang['时间/ms']
            },
            lineWidth: 2
            //endOnTick: true
            //maxPadding: 0.05,
            //showLastLabel: true
        },
        yAxis: {
            title: {
                text: Msg.Lang['串口数据']
            },
            endOnTick: true,
            lineWidth: 2
        },
        series: [{
            name: Msg.Lang['串口数据'] + '1',
            data: []
        }]
    });
    if (yMaxDom.val() && yMinDom.val() && Mixly.Charts?.chart?.yAxis !== undefined) {
        var yMax = yMaxDom.val() || 100;
        var yMin = yMinDom.val() || 0;
        Charts.chart.yAxis[0].setExtremes(yMin, yMax);
    }
    if (serialOpened) {
        Charts.draw = window.setInterval(() => {
            Charts.drawLines(dom);
        }, 100);
    }
}

Charts.drawLines = function (dom) {
    let { yMinId, yMaxId } = dom.id;
    let yMinDom = $('#' + yMinId),
        yMaxDom = $('#' + yMaxId);
    if (yMaxDom.val() && yMinDom.val() && Mixly.Charts?.chart?.yAxis !== undefined) {
        var yMax = yMaxDom.val() || 100;
        var yMin = yMinDom.val() || 0;
        Charts.chart.yAxis[0].setExtremes(yMin, yMax);
    }
    var xMin = 0;
    if (Charts.data.length > 0 && Charts.data[0].length > 0) {
        xMin = Charts.data[0][0];
    }
    var xMax = xMin + 100;
    if (Charts.data.length > 0 && Charts.data.length < Charts.pointNum) {
        regression.fit(Charts.xData, Charts.yData);
        xMax = regression.predict([Charts.pointNum]);
        if (Charts.data.length > 0 && xMax < Charts.data[Charts.data.length - 1][0]) {
            xMax = Charts.data[Charts.data.length - 1][0];
        }
        Charts.chart.xAxis[0].setExtremes(xMin, xMax);
    } else if (Charts.data.length >= Charts.pointNum) {
        xMax = Charts.data[Charts.pointNum - 1][0];
        Charts.chart.xAxis[0].setExtremes(xMin, xMax);
    }
    var seriesData = [];
    seriesData[0] = getCol(Charts.data, 0);
    for (var i = 0; i < Charts.chart.series.length; i++) {
        seriesData[1] = getCol(Charts.data, i + 1);
        let data = reverseMatrix(seriesData);
        Charts.chart.series[i].setData(data, true, false, false);
    }
    Charts.update(dom);
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

Charts.addData = function (serialData) {
    var timeData = Number(new Date());
    var serialNumber = getNumber(serialData);
    if (timeData - Charts.nowTime > 50 && serialNumber && serialNumber.length > 0) {
        /*
        if (timeData - Charts.nowTime > Charts.timeDiff) {
            Charts.timeDiff = timeData - Charts.nowTime;
        }
        */
        Charts.oldTime = Charts.nowTime;
        Charts.nowTime = timeData;
        var newData = [Charts.nowTime - Charts.startTime, serialNumber[0]];
        for (var i = 1; i < serialNumber.length; i++) {
            newData.push(serialNumber[i]);
        }
        while (Charts.data.length > Charts.pointNum) {
            Charts.data.shift();
        }
        if (Charts.data.length < Charts.pointNum) {
            Charts.xData.push(Charts.data.length);
            Charts.yData.push(Charts.nowTime - Charts.startTime);
        }
        Charts.data.push(newData);
        while (Charts.chart && Charts.chart.series && Charts.chart.series.length < serialNumber.length) {
            Charts.chart.addSeries({
                name: Msg.Lang['串口数据'] + (Charts.chart.series.length + 1),
                data: []
            });
        }
    }
}

Charts.update = function (dom) {
    let { pointNumId } = dom.id;
    if ($('#' + pointNumId + ' option:selected').val() - 0 != Charts.pointNum) {
        try {
            Charts.chart.destroy();
        } catch (e) {
            console.log(e);
        }
        Charts.pointNum = $('#' + pointNumId + ' option:selected').val() - 0;
        if (Charts.draw) {
            clearInterval(Charts.draw);
            Charts.init(true, dom);
        }
    }
}

Charts.destroy = () => {
    try {
        Charts.chart && Charts.chart.destroy();
        Charts.chart = null;
    } catch (e) {
        console.log(e);
    }
    Charts.stopRefresh();
}

Charts.stopRefresh = () => {
    Charts.draw && clearInterval(Charts.draw);
    Charts.addData && clearInterval(Charts.addData);
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

});