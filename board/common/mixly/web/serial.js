(() => {

goog.provide('Mixly.Web.Serial');
goog.require('Mixly.Charts');
goog.require('Mixly.StatusBar');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');

const {
    Web,
    Charts,
    StatusBar,
    LayerExtend,
    Config,
    MFile
} = Mixly;
const { BOARD } = Config;
const { Serial } = Web;

Serial.TOOL_DEFAULT_CONFIG = {
    "ctrlCBtn": false,
    "ctrlDBtn": false,
    "baudRates": 115200,
    "yMax": 100,
    "yMin": 0,
    "pointNum": 100,
    "rts": false,
    "dtr": false,
    "scroll": true,
    "sendStr": true,
    "receiveStr": true,
    "sendWith": "\\r\\n",
    "tabIndex": 0,
    ...BOARD?.serial ?? {}
};

Serial.opened = false;
Serial.dataUpdate = null;
Serial.serialReceive = "";
Serial.restString = "";
Serial.deviceObj = null;
Serial.transport = null;
Serial.target = null;

Serial.restStr = "";

Serial.portOperator = {
    toolConfig: { ...Serial.TOOL_DEFAULT_CONFIG }
};

Serial.UPLOAD_RESET = BOARD?.upload?.reset ?? {};

const { portOperator } = Serial;

Serial.openTool = function () {
    const { toolConfig } = portOperator;
    let successFunc = (serialDom) => {
        if (!portOperator.dom)
            portOperator.dom = serialDom;
        const { selectPortId } = serialDom.id;
        portOperator.toolOpened = true;
        StatusBar.show(1);
        const element = layui.element;
        const { tabFilter } = serialDom.filter;
        element.tabChange(tabFilter, 0);
    }

    let endFunc = (port) => {
        try {
            Charts.chart && Charts.chart.destroy();
            Charts.chart = null;
        } catch (e) {
            console.log(e);
        }
        Charts.draw && clearInterval(Charts.draw);
        Charts.addData && clearInterval(Charts.addData);
        portOperator.toolOpened = false;
    }
    if (!portOperator.dom) {
        portOperator.dom = LayerExtend.openSerialTool(toolConfig, successFunc, endFunc);
    } else {
        portOperator.dom.updateTool(toolConfig);
        portOperator.dom.open(successFunc, endFunc);
    }

    portOperator.dom.onClickSetDtr((port, data) => {
        toolConfig.dtr = data.elem.checked;
        Serial.setDtrAndRts(toolConfig.dtr, toolConfig.rts);
    });

    portOperator.dom.onClickSetRts((port, data) => {
        toolConfig.rts = data.elem.checked;
        Serial.setDtrAndRts(toolConfig.dtr, toolConfig.rts);
    });

    portOperator.dom.onClickSendType((port, data) => {
        let { sendId } = portOperator.dom.id;
        let sendDom = $('#' + sendId);
        toolConfig.sendStr = data.elem.checked;
        if (data.elem.checked) {
            sendDom.attr("placeholder", indexText["请输入内容"]);
        } else {
            sendDom.attr("placeholder", indexText["请输入内容"] + "  " + indexText["例如"] + ":0x03,0x04");
        }
    });

    portOperator.dom.onClickTab((port, data) => {
        toolConfig.tabIndex = data.index;
        if (data.index === 1) {
            const { dom } = portOperator;
            Charts.init(1, dom);
        } else {
            Charts.destroy();
        }
    });

    portOperator.dom.onClickSendBtn((port) => {
        Serial.write();
    });

    portOperator.dom.onClickClearBtn((port) => {
        Serial.clearContent(port);
    });

    portOperator.dom.onClickChartSendBtn((port) => {
        Serial.writeString();
    });

    portOperator.dom.onClickCtrlCBtn((port) => {
        Serial.writeCtrlC();
    });

    portOperator.dom.onClickCtrlDBtn((port) => {
        Serial.writeCtrlD();
    });

    portOperator.dom.onClickScroll((port, data) => {
        toolConfig.scroll = data.elem.checked;
    });

    portOperator.dom.onClickReceiveType((port, data) => {
        toolConfig.receiveStr = data.elem.checked;
    });

    portOperator.dom.onClickSelectPointNum((port, data) => {
        toolConfig.pointNum = data.elem.value;
    });

    portOperator.dom.onClickSelectSendWith((port, data) => {
        toolConfig.sendWith = data.elem.value;
    });

    /*layui.use(['layer', 'element', 'form'], function () {
        var layer = layui.layer;
        var element = layui.element;
        var form = layui.form;
        var serial_com_update = null;
        element.on('tab(serial)', function (elem) {
            if (elem.index == 1) {
                Charts.init();
            } else {
                try {
                    Charts.chart && Charts.chart.destroy();
                } catch (e) {
                    //console.log(e);
                }
                Charts.draw && clearInterval(Charts.draw);
                Charts.addData && clearInterval(Charts.addData);
            }
        });

        form.on('checkbox', function (data) {
            if (data.elem.id == "set_dtr" || data.elem.id == "set_rts") {
                Serial.setDtrAndRts();
            } else if (data.elem.id == "send_serial_data_type") {
                if (data.elem.checked) {
                    $("#serial_write").attr("placeholder", "请输入内容");
                } else {
                    $("#serial_write").attr("placeholder", "请输入内容  例如:0x03 0x04");
                }
            }
        });

        var layer = layui.layer;
        layer.open({
            type: 1,
            id: "serial_page",
            title: false,
            area: ["90%", "80%"],
            closeBtn: 1,
            resize: true,
            fixed: true,
            move: $('#serial-move'),
            content: $('#serial-form'),
            shade: LayerExtend.shade,
            success: function (layero, index) {
                try {
                    var now_page = document.getElementById(layero.selector.replace("#", ""));
                    now_page.style.minWidth = "600px";
                    now_page.style.minHeight = "250px";
                    now_page.style.maxWidth = "710px";
                    now_page.style.maxHeight = "500px";
                    var now_height = document.documentElement.clientHeight;
                    var now_width = document.documentElement.clientWidth;
                    now_page.style.left = (now_width - now_page.clientWidth) / 2 + "px";
                    now_page.style.top = (now_height - now_page.clientHeight) / 2 + "px";
                    now_page.style.borderRadius = "8px";
                } catch (e) {
                    console.log(e);
                }

                var serialPage = document.getElementById("serial_page");
                serialPage.style.overflow = "hidden";
                serialPage.style.maxWidth = "710px";
                serialPage.style.maxHeight = "500px";
                serialPage.style.minWidth = "600px";
                serialPage.style.minHeight = "250px";
                serialPage.style.borderRadius = "8px";

                layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
                layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');

                StatusBar.show(1);
                Serial.opened = true;
            },
            end: function () {
                Charts.draw && clearInterval(Charts.draw);
                Charts.addData && clearInterval(Charts.addData);
                document.getElementById('serial-form').style.display = 'none';
                StatusBar.setValue($("#serial_content").val(), true);
                try {
                    Charts.chart && Charts.chart.destroy();
                } catch (e) {
                    //console.log(e);
                }
                //if (!espTool.connected()) {
                //  Serial.dataUpdate && clearInterval(Serial.dataUpdate);
                //}
                element.tabChange('serial', '1');
                Serial.opened = false;
            }
        });
    });*/
    if (!espTool.connected()) {
        Mixly.Web.BU.clickConnect();
    }
}

Serial.setDtrAndRts = async function (dtr, rts) {
    if (espTool.connected()) {
        await espTool.setSignals(dtr ?? true, rts ?? true);
    }
}

/**
* @ function 串口发送
* @ description 串口发送Ctrl + A
* @ return void
*/
Serial.writeCtrlA = async function () {
    if (espTool.connected()) {
        var serialArray = [1, 13, 10];
        var arrayBuffer = new Int8Array(serialArray).buffer;
        await espTool.writeArrayBuffer(arrayBuffer);
    }
}

/**
* @ function 串口发送
* @ description 串口发送Ctrl + B
* @ return void
*/
Serial.writeCtrlB = async function () {
    if (espTool.connected()) {
        var serialArray = [2, 13, 10];
        var arrayBuffer = new Int8Array(serialArray).buffer;
        await espTool.writeArrayBuffer(arrayBuffer);
    }
}

/**
* @ function 串口发送
* @ description 串口发送Ctrl + C
* @ return void
*/
Serial.writeCtrlC = async function () {
    if (espTool.connected()) {
        var serialArray = [3, 13, 10];
        var arrayBuffer = new Int8Array(serialArray).buffer;
        await espTool.writeArrayBuffer(arrayBuffer);
    }
}

/**
* @ function 串口发送
* @ description 串口发送Ctrl + D
* @ return void
*/
Serial.writeCtrlD = async function () {
    if (espTool.connected()) {
        var serialArray = [3, 4];
        var arrayBuffer = new Int8Array(serialArray).buffer;
        await espTool.writeArrayBuffer(arrayBuffer);
    }
}


/**
* @ function 读取串口发送框数据并发送
* @ description 读取串口发送框数据并发送，然后清空串口发送框
* @ return void
*/
Serial.write = async function () {
    if (espTool.connected()) {
        const { dom } = portOperator;
        const { sendId, sendWithId, sendTypeId, chartSendId } = dom.id;
        const sendDom = $('#' + sendId);
        let sendTail = $('#' + sendWithId + ' option:selected').val();
        sendTail = sendTail.replace("\\r", "\r");
        sendTail = sendTail.replace("\\n", "\n");
        if (sendTail == "no") {
            sendTail = "";
        }
        const sendStr = sendDom.val();
        sendDom.val('');
        if ($('#' + sendTypeId)[0].checked == false) {
            var hexStrList = sendStr.trim().split(/\s+/);
            var hexNumList = [];
            for (var i = 0; i < hexStrList.length; i++) {
                if (parseInt(hexStrList[i], 16))
                    hexNumList.push(parseInt(hexStrList[i], 16));
            }
            espTool.writeArrayBuffer(hexNumList);
        } else {
            await espTool.write(sendStr);
        }
        if (sendTail !== '') {
            await espTool.write(sendTail);
        }
    }
}

/**
* @ function 读取串口发送框数据并发送字符串
* @ description 读取串口发送框数据并发送字符串，然后清空串口发送框
* @ return void
*/
Serial.writeString = async function () {
    if (espTool.connected()) {
        const { dom } = portOperator;
        const { chartSendId, chartSendWithId } = dom.id;
        const chartSendDom = $('#' + chartSendId);
        const chartSendStr = chartSendDom.val();
        chartSendDom.val('');
        let chartSendTail = $('#' + chartSendWithId + ' option:selected').val();
        chartSendTail = chartSendTail.replace("\\r", "\r");
        chartSendTail = chartSendTail.replace("\\n", "\n");
        if (chartSendTail == "no") {
            chartSendTail = "";
        }
        if (chartSendStr) {
            await espTool.write(chartSendStr + chartSendTail);
        }
    }
}

Serial.receiveBoxAddValue = (data, scroll = false) => {
    const newData = Serial.receiveBoxGetValue() + data;
    Serial.receiveBoxSetValue(newData, scroll);
}

Serial.receiveBoxSetValue = (data, scroll = false) => {
    const { dom } = portOperator;
    if (!dom) return;
    const { receiveId } = dom.id;
    const receiveDom = $('#' + receiveId);
        receiveDom.val(data);
    scroll && receiveDom.scrollTop(receiveDom[0].scrollHeight);
}

Serial.receiveBoxGetValue = () => {
    const { dom } = portOperator;
    if (!dom) return '';
    const { receiveId } = dom.id;
    const receiveDom = $('#' + receiveId);
    return receiveDom.val();
}

Serial.receiveBoxScrollToTheBottom = () => {
    const { dom } = portOperator;
    if (!dom) return;
    const { receiveId } = dom.id;
    const receiveDom = $('#' + receiveId);
    receiveDom.scrollTop(receiveDom[0].scrollHeight);
}

Serial.receiveBoxScrollToTheTop = () => {
    
}

/**
* @ function 清空串口输出框
* @ description 清空当前串口输出框中的数据
* @ return void
*/
Serial.clearContent = function () {
    const { toolConfig } = portOperator;
    Serial.receiveBoxSetValue('', toolConfig.scroll);
}

Serial.dataRefresh = async function () {
    if (espTool.connected() && !Mixly.Web.BU.burning) {
        const { toolConfig } = portOperator;
        try {
            var result = await espTool.read();
            Serial.receiveData = result;

            let disposeRead = Serial.receiveData.split(/[(\r\n)\r\n]+/);
            if (typeof disposeRead === "object" && disposeRead.length > 0) {
                disposeRead[0] = Serial.restStr + disposeRead[0];
                Serial.restStr = disposeRead.pop();
                for (let i = 0; i < disposeRead.length; i++) {
                    Charts.addData(disposeRead[i]);
                }
            }

            var oldReceiveData = "";
            var disposeData = [];
            if (portOperator.toolOpened) {
                oldReceiveData = Serial.receiveBoxGetValue();
            } else {
                oldReceiveData = StatusBar.getValue();
            }

            disposeData = oldReceiveData.split(/[(\r\n)\r\n]+/);

            if (!toolConfig.receiveStr) {
                Serial.receiveData = Uint8ArrayToString(stringToByte(Serial.receiveData));
                Serial.receiveData = Serial.receiveData.replace(/^\s*/, "");
            }

            oldReceiveData = "";
            if (disposeData.length >= 1000) {
                for (var z = disposeData.length - 1000; z < disposeData.length - 1; z++) {
                    oldReceiveData += disposeData[z] + "\n";
                }
            } else {
                for (var z = 0; z < disposeData.length - 1; z++) {
                    oldReceiveData += disposeData[z] + "\n";
                }
            }
            oldReceiveData += disposeData[disposeData.length - 1];
            if (portOperator.toolOpened) {
                Serial.receiveBoxSetValue(oldReceiveData + Serial.receiveData, toolConfig.scroll);
            } else {
                if (oldReceiveData + Serial.receiveData == "\n") {
                    StatusBar.setValue('', true);
                } else {
                    StatusBar.setValue(oldReceiveData + Serial.receiveData, true);
                }
            }
            Serial.receiveData = "";
        } catch (e) {
        }
    } else {
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Serial.reset = async () => {
    const reset = Serial.UPLOAD_RESET;
    if (typeof reset !== 'object') return;
    let len = reset.length;
    for (var i = 0; i < len; i++) {
        if (reset[i].dtr !== undefined
            || reset[i].rts !== undefined) {
            var dtrValue = false;
            var rtsValue = false;
            if (reset[i]?.dtr) {
                dtrValue = true;
            }
            if (reset[i]?.rts) {
                rtsValue = true;
            }
            await Serial.setDtrAndRts(dtrValue, rtsValue);
            console.log('dtr', dtrValue, 'rts', rtsValue)
        } else if (reset[i]?.sleep) {
            var sleepValue = parseInt(reset[i].sleep) || 100;
            await sleep(sleepValue);
        }
    }
}

Serial.connectCom = function () {
    if (Mixly.Web.BU.uploadFileType == "hex") {
        Serial.selectDevice();
    } else {
        Mixly.Web.BU.clickConnect();
    }
    StatusBar.show(1);
}

// Choose a device
Serial.selectDevice = async () => {
    // setStatus("Selecting device...");
    // setTransfer();
    try {
        const device = await navigator.usb.requestDevice({
            filters: [{ vendorId: 0xD28 }]
        });
        Serial.deviceObj = device;
        Serial.transport = new DAPjs.WebUSB(Serial.deviceObj);
        Serial.target = new DAPjs.DAPLink(Serial.transport);
        await Serial.target.connect();
        await Serial.target.setSerialBaudrate(115200);
        Serial.serialRead();
        return true;
    } catch (error) {
        Serial.setStatus(error);
        Serial.target = null;
        Mixly.Web.BU.toggleUIToolbar(false);
        return false;
    }
}

Serial.buildTarget = async () => {
    if (Serial.target && Serial.target.transport) {
        return;
    }
    else {
        if (!Serial.deviceObj) {
            modalAlert('无可用设备!');
            return;
        }
        else {
            Serial.transport = new DAPjs.WebUSB(Serial.deviceObj);
            Serial.target = new DAPjs.DAPLink(Serial.transport);
            await Serial.target.connect();
            await Serial.target.setSerialBaudrate(115200);
        }
    }
}

//-----------------------------------------------------------
Serial.setStatus = state => {
    alert(state);
}

Serial.setTransfer = progress => {

}

// Update a device with the firmware image transferred from block/code
Serial.update = async () => {
    if (!Serial.target) {
        if (!await Serial.selectDevice()) {
            StatusBar.setValue("", true);
            $("#serial-receive-0").val("");
            return;
        }
    }
    let buffer = null;
    var hex2Blob = new Blob([MFile.getHex()], { type: 'text/plain' });
    buffer = await hex2Blob.arrayBuffer()
    if (!buffer) return;

    Serial.target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
        Serial.setTransfer(progress);
    });

    try {
        // Push binary to board
        // setStatus(`Flashing binary file ${buffer.byteLength} words long...`);
        await Serial.target.connect();
        await Serial.target.setSerialBaudrate(115200);
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 1,
                title: '上传中...',
                content: $('#mixly-loader-div'),
                shade: LayerExtend.shade,
                closeBtn: 0,
                end: async function () {
                    try {
                        await Serial.target.disconnect();
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });
        await Serial.target.flash(buffer);
        layer.closeAll('page');
        await Serial.target.disconnect();
        //await Serial.target.connect();
        // Serial.setStatus("Flash complete!");
    } catch (error) {
        Serial.setStatus(error);
        layer.closeAll('page');
        Serial.target = null;
    }
    Mixly.Web.BU.toggleUIToolbar(false);
}

Serial.serialRead = async () => {
    if (!Serial.target) {
        Serial.selectDevice();
        StatusBar.setValue("", true);
        $("#serial-receive-0").val("");
        return;
    }
    if (!Serial.target.connected) {
        try {
            await Serial.target.connect();
        }
        catch (e) {
            console.log(e);
        }
        StatusBar.setValue("", true);
        $("#serial-receive-0").val("");
    }
    StatusBar.show(1);
    //防止重复绑定事件监听
    Serial.target.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
    Serial.target.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, data => {
        if (Serial.opened) {
            serial_receive_old = $("#serial-receive-0").val();
        } else {
            serial_receive_old = StatusBar.getValue();
        }
        if ($("#serial-receivetype-0")[0].checked == false) {
            data = Uint8ArrayToString(stringToByte(data));
            data = data.replace(/^\s*/, "");
            data += "\n";
        }
        if (Serial.opened) {
            $("#serial-receive-0").val(serial_receive_old + data);
            $("#serial-scroll-0")[0].checked == true && $("#serial-receive-0").scrollTop($("#serial-receive-0")[0].scrollHeight);
            Charts.addData(data);
        } else {
            StatusBar.setValue(serial_receive_old + data, true);
        }

    });
    await Serial.target.startSerialRead(Serial.deviceObj);
}

Serial.serialWrite = async () => {
    if (!Serial.target.connected) {
        try {
            await Serial.target.connect();
        }
        catch (e) {
            console.error(e);
        }
    }
    if (await Serial.target.getSerialBaudrate() != 115200) {
        try {
            await Serial.target.setSerialBaudrate(115200);
        }
        catch (e) {
            console.error(e);
        }
    }
    var ready_send_data = $("#serial-send-0").val() || $("#serial-chartsend-0").val();
    var ready_send_data_end = $('#serial-sendwith-0 option:selected').val();
    ready_send_data_end = ready_send_data_end.replace("\\r", "\r");
    ready_send_data_end = ready_send_data_end.replace("\\n", "\n");
    if (ready_send_data_end == "no") {
        ready_send_data_end = "";
    }
    if (ready_send_data) {
        await Serial.target.serialWrite(ready_send_data + ready_send_data_end);
        $("#serial-chartsend-0").val("");
        $("#serial-send-0").val("");
        //可能是因为mutex lock的原因，每次发送后需要重新启动监听，并且清理缓冲区
        await Serial.target.stopSerialRead();
        await Serial.target.startSerialRead();
    }
}

})();