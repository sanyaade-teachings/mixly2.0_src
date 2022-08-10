goog.provide('Mixly.WebSocket.Serial');

goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.Charts');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Config');

Mixly.WebSocket.Serial.dom = null;

/**
  * 储存串口最近一次接收到的数据
  * @type {String}
  */
Mixly.WebSocket.Serial.receiveData = "";

/**
  * 判断串口工具是否打开，若打开则为true
  * @type {Boolean}
  */
Mixly.WebSocket.Serial.toolOpened = false;

/**
  * 储存筛选后的串口
  * @type {Array}
  */
Mixly.WebSocket.Serial.portList = [];

Mixly.WebSocket.Serial.receiveValue = [];

/**
  * 储存上一次上传所使用的串口
  * @type {String}
  */
Mixly.WebSocket.Serial.selectedPortName = null;

Mixly.WebSocket.Serial.dtrValue = true;

Mixly.WebSocket.Serial.rtsValue = false;

Mixly.WebSocket.Serial.opened = false;

Mixly.WebSocket.Serial.burnPortSelect = Mixly.Config.BOARD?.burn?.portSelect ?? 'all';

Mixly.WebSocket.Serial.uploadPortSelect = Mixly.Config.BOARD?.upload?.portSelect ?? 'all';

Mixly.WebSocket.Serial.burnPortList = [];

Mixly.WebSocket.Serial.uploadPortList = [];

Mixly.WebSocket.Serial.burn = Mixly.Config.BOARD;

/**
* @function 打开串口工具
* @description 打开串口工具并打开串口列表中选中的串口
* @return void
*/
Mixly.WebSocket.Serial.openTool = () => {
    /*
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url + '，请在设置中连接', {time: 1000});
        return;
    }
    */
    Mixly.WebSocket.Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        let serialConfig = Mixly.Config.BOARD.serial ?? {};
        if (!Mixly.WebSocket.Serial.dom)
            Mixly.WebSocket.Serial.dom = new SerialDomGenerator(0, serialConfig, Code.LANG, Mixly.Env.isElectron);
        let serialDom = Mixly.WebSocket.Serial.dom;
        if (serialDom.lang !== Code.LANG) {
            serialDom.lang = Code.LANG;
            serialDom.updateDom();
        }
        let { receiveId } = serialDom.id;
        let receiveDom = $('#' + receiveId);
        let successFunc = () => {
            Mixly.WebSocket.Serial.open();
            Mixly.StatusBar.show(1);
            Mixly.WebSocket.Serial.toolOpened = true;
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'Serial',
                function: 'sendPorts',
                args: []
            });
        }

        let endFunc = () => {
            /*
            if (Mixly.WebSocket.Serial.object && Mixly.WebSocket.Serial.object.isOpen && receiveDom.val() != "") {
                if (Mixly.StatusBarPort.portAce[Mixly.WebSocket.Serial.object.path]) {
                    Mixly.StatusBarPort.setValue(Mixly.WebSocket.Serial.object.path, receiveDom.val(), true);
                }
            }
            */
            try {
                Mixly.Charts.chart && Mixly.Charts.chart.destroy();
                Mixly.Charts.chart = null;
            } catch (e) {
                console.log(e);
            }
            Mixly.Charts.draw && clearInterval(Mixly.Charts.draw);
            Mixly.Charts.addData && clearInterval(Mixly.Charts.addData);
            //serial_com_update && clearInterval(serial_com_update);
            let { tabFilter } = Mixly.WebSocket.Serial.dom.filter;
            layui.element.tabChange(tabFilter, '1');
            Mixly.WebSocket.Serial.toolOpened = false;
        }

        serialDom.onClickSetDtr((data) => {
            Mixly.WebSocket.Serial.updateDtrAndRts();
        });

        serialDom.onClickSetRts((data) => {
            Mixly.WebSocket.Serial.updateDtrAndRts();
        });

        serialDom.onClickSendType((data) => {
            let { sendId } = serialDom.id;
            let sendDom = $('#' + sendId);
            if (data.elem.checked) {
                sendDom.attr("placeholder", indexText["请输入内容"]);
            } else {
                sendDom.attr("placeholder", indexText["请输入内容"] + "  " + indexText["例如"] + ":0x03 0x04");
            }
        });

        serialDom.onClickSelectPort((data) => {
            //let { selectPortId } = Mixly.WebSocket.Serial.dom.id;
            //let port = $('#' + selectPortId + ' option:selected').val();
            let { selectBaudId, setDtrId, setRtsId } = Mixly.WebSocket.Serial.dom.id;
            let port = data.elem.value;
            let baud = $('#' + selectBaudId + ' option:selected').val() - 0;
            let setDtrDom = $('#' + setDtrId),
                setRtsDom = $('#' + setRtsId);
            let dtr = setDtrDom[0].checked ?? true,
                rts = setRtsDom[0].checked ?? true;
            let reset = Mixly.Config.BOARD?.upload?.reset ?? "None";
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'Serial',
                function: 'onClickSelectPort',
                args: [port, baud, reset, dtr, rts]
            });
            Mixly.WebSocket.Serial.selectedPortName = port;
        });

        serialDom.onClickSelectBaud((data) => {
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'Serial',
                function: 'onClickSelectBaud',
                args: [data.elem.value - 0]
            });
        });

        serialDom.onClickTab((data) => {
            if (data.index == 1) {
                Mixly.Charts.init();
            } else {
                try {
                    Mixly.Charts.chart && Mixly.Charts.chart.destroy();
                    Mixly.Charts.chart = null;
                } catch (e) {
                    console.log(e);
                }
                Mixly.Charts.draw && clearInterval(Mixly.Charts.draw);
                Mixly.Charts.addData && clearInterval(Mixly.Charts.addData);
            }
        });

        serialDom.onClickConnectBtn(() => {
            /*
            let { selectPortId, selectBaudId, setDtrId, setRtsId } = Mixly.WebSocket.Serial.dom.id;
            let port = $('#' + selectPortId + ' option:selected').val();
            let baud = $('#' + selectBaudId + ' option:selected').val() - 0;
            let setDtrDom = $('#' + setDtrId),
                setRtsDom = $('#' + setRtsId);
            let dtr = setDtrDom[0].checked ?? true,
                rts = setRtsDom[0].checked ?? true;
            let reset = Mixly.Config.BOARD?.upload?.reset ?? "None";
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'Serial',
                function: 'portOpenOrClose',
                args: [port, baud, reset, dtr, rts]
            });
            */
            if (Mixly.WebSocket.Serial.opened)
                Mixly.WebSocket.Serial.close();
            else
                Mixly.WebSocket.Serial.open();
        });

        serialDom.onClickSendBtn(() => {
            Mixly.WebSocket.Serial.send();
        });

        serialDom.onClickClearBtn(() => {
            Mixly.WebSocket.Serial.clearContent();
        });

        serialDom.onClickChartSendBtn(() => {
            Mixly.WebSocket.Serial.chartSendString();
        });

        serialDom.onClickCtrlCBtn(() => {
            Mixly.WebSocket.Serial.sendCtrlC();
        });

        serialDom.onClickCtrlDBtn(() => {
            Mixly.WebSocket.Serial.sendCtrlD();
        });

        serialDom.openSerialTool(successFunc, endFunc);
    });
}

Mixly.WebSocket.Serial.open = () => {
    let { selectPortId } = Mixly.WebSocket.Serial.dom.id;
    let port = $('#' + selectPortId + ' option:selected').val();
    Mixly.WebSocket.Serial.openPort(port);
}

Mixly.WebSocket.Serial.openPort = (port) => {
    let { selectBaudId, setDtrId, setRtsId } = Mixly.WebSocket.Serial.dom.id;
    if (Mixly.WebSocket.Serial.opened || port === undefined) {
        if (Mixly.WebSocket.Serial.opened)
            Mixly.StatusBarPort.tabChange(port);
        return;
    }
    let baud = $('#' + selectBaudId + ' option:selected').val() - 0;
    let setDtrDom = $('#' + setDtrId),
        setRtsDom = $('#' + setRtsId);
    let dtr = setDtrDom[0].checked ?? true,
        rts = setRtsDom[0].checked ?? true;
    let reset = Mixly.Config.BOARD?.upload?.reset ?? "None";
    Mixly.WebSocket.Serial.selectedPortName = port;
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'open',
        args: [port, baud, reset, dtr, rts]
    });
}

Mixly.WebSocket.Serial.close = () => {
    if (!Mixly.WebSocket.Serial.opened) {
        Mixly.StatusBarPort.tabChange('output');
        return;
    }
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'close',
        args: []
    });
}

Mixly.WebSocket.Serial.refreshPortSelectBox = (ports) => {
    if (typeof layui === 'undefined') return;
    let nowList = [];
    for (let i = 0; i < ports.length; i++)
        nowList.push(ports[i]);
    var form = layui.form;
    let serialConfig = Mixly.Config.BOARD.serial ?? {};
    if (!Mixly.WebSocket.Serial.dom)
        Mixly.WebSocket.Serial.dom = new SerialDomGenerator(0, serialConfig, Code.LANG, Mixly.Env.isElectron);
    let { selectPortId } = Mixly.WebSocket.Serial.dom.id;
    const devNames = $('#' + selectPortId);
    const oldPort = $('#' + selectPortId + ' option:selected').val();
    devNames.empty();
    for (let i = 0; i < nowList.length; i++) {
        if (oldPort == nowList[i]) {
            devNames.append($(`<option value="${nowList[i]}" selected>${nowList[i]}</option>`));
        } else {
            devNames.append($(`<option value="${nowList[i]}">${nowList[i]}</option>`));
        }
    }
    form.render();
}

Mixly.WebSocket.Serial.refreshBurnPortList = (ports) => {
    Mixly.WebSocket.Serial.burnPortList = [];
    let select = Mixly.WebSocket.Serial.burnPortSelect;
    Mixly.WebSocket.Serial.burnPortList = Mixly.WebSocket.Serial.getPortList(ports, select);
}

Mixly.WebSocket.Serial.refreshUploadPortList = (ports) => {
    Mixly.WebSocket.Serial.uploadPortList = [];
    let select = Mixly.WebSocket.Serial.uploadPortSelect;
    Mixly.WebSocket.Serial.uploadPortList = Mixly.WebSocket.Serial.getPortList(ports, select);
}

Mixly.WebSocket.Serial.getPortList = (ports, select) => {
    let newPorts = [];
    for (let i = 0; i < ports.length; i++) {
        if (Mixly.Config.BOARD.upload?.port) {
            if (Mixly.Config.BOARD.upload.port === ports[i].portName) {
                newPorts.push(ports[i].portName);
                break;
            }
        } else {
            if (ports[i].portName.indexOf('ttyS') != -1) {
                continue;
            }
            if (ports[i].vendorId
                && ports[i].productId
                && ports[i].vendorId === 'None'
                && ports[i].productId === 'None')
                select = 'all';
        if (select == "all")
            newPorts.push(ports[i].portName);
        else if (typeof (select) === "object") {
            for (let j = 0; j < select.length; j++) {
                if (ports[i].vendorId
                    && ports[i].productId
                    && ports[i].vendorId.toLowerCase() == select[j].vendorId.toLowerCase()
                    && ports[i].productId.toLowerCase() == select[j].productId.toLowerCase()) {
                    newPorts.push(ports[i].portName);
                }
            }
        }
    }
    return newPorts;
}

Mixly.WebSocket.Serial.refreshPortList = (ports) => {
    Mixly.WebSocket.Serial.refreshBurnPortList(ports);
    Mixly.WebSocket.Serial.refreshUploadPortList(ports);
    Mixly.WebSocket.Serial.refreshPortSelectBox(Mixly.WebSocket.Serial.uploadPortList);
}

Mixly.WebSocket.Serial.addValue = (value) => {
    Mixly.Charts.addData(value);
    let valueList = Mixly.WebSocket.Serial.receiveValue;
    valueList.push(value);
    if (valueList.length > 500)
        valueList.shift();
    Mixly.WebSocket.Serial.refreshReceiveBox();

}

Mixly.WebSocket.Serial.refreshReceiveBox = () => {
    let valueList = Mixly.WebSocket.Serial.receiveValue;
    let receiveStr = valueList.join('');
    let { selectPortId, selectBaudId, receiveId, connectBtnId } = Mixly.WebSocket.Serial.dom.id;
    let port = $('#' + selectPortId + ' option:selected').val();
    if (Mixly.WebSocket.Serial.toolOpened) {
        let receiveDom = $('#' + receiveId);
        receiveDom.val(receiveStr);
        receiveDom.scrollTop(receiveDom[0].scrollHeight);
    } else {
        Mixly.StatusBarPort.setValue(port, receiveStr, true);
    }
}

Mixly.WebSocket.Serial.setConnectStatus = (portName, opened) => {
    if (!Mixly.WebSocket.Serial.dom) {
        let serialConfig = Mixly.Config.BOARD.serial ?? {};
        Mixly.WebSocket.Serial.dom = new SerialDomGenerator(0, serialConfig, Code.LANG, Mixly.Env.isElectron);
    }
    let { connectBtnId, receiveId } = Mixly.WebSocket.Serial.dom.id;
    let connectBtnDom = $('#' + connectBtnId);
    if (opened) {
        Mixly.StatusBarPort.tabAdd(portName, true, null, () => {
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'Serial',
                function: 'close',
                args: []
            });
        });
        Mixly.StatusBarPort.tabChange(portName);
        Mixly.StatusBarPort.addValue(portName, '');
        connectBtnDom.text(indexText["关闭"]);
        connectBtnDom.attr("class", "layui-btn layui-btn-danger");
        let receiveDom = $('#' + receiveId);
        receiveDom.val('');
        Mixly.WebSocket.Serial.receiveValue = [];
        Mixly.WebSocket.Serial.opened = true;
    } else {
        connectBtnDom.text(indexText["打开"]);
        connectBtnDom.attr("class", "layui-btn layui-btn-normal");
        Mixly.WebSocket.Serial.opened = false;
    }
}

Mixly.WebSocket.Serial.send = () => {
    let { sendTypeId } = Mixly.WebSocket.Serial.dom.id;
    if ($('#' + sendTypeId)[0].checked == false) {
        Mixly.WebSocket.Serial.sendByteArr();
    } else {
        Mixly.WebSocket.Serial.sendString();
    }
}

Mixly.WebSocket.Serial.sendByteArr = () => {
    let { sendId, sendWithId } = Mixly.WebSocket.Serial.dom.id;
    let sendDom = $('#' + sendId);
    let sendDataStr = sendDom.val();
    let sendDataTail = $('#' + sendWithId + ' option:selected').val();
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'sendByteArr',
        args: [sendDataStr, sendDataTail]
    });
}

Mixly.WebSocket.Serial.sendString = () => {
    let { sendId, sendWithId } = Mixly.WebSocket.Serial.dom.id;
    let sendDom = $('#' + sendId);
    let sendDataStr = sendDom.val();
    let sendDataTail = $('#' + sendWithId + ' option:selected').val();
    sendDataTail = sendDataTail.replace("\\r", "\r");
    sendDataTail = sendDataTail.replace("\\n", "\n");
    if (sendDataTail == "no") {
        sendDataTail = "";
    }
    if (sendDataStr) {
        Mixly.WebSocket.Socket.sendCommand({
            obj: 'Serial',
            function: 'sendString',
            args: [sendDataStr, sendDataTail]
        });
    }
}

Mixly.WebSocket.Serial.chartSendString = () => {
    let { chartSendId, chartSendWithId } = Mixly.WebSocket.Serial.dom.id;
    let sendDom = $('#' + chartSendId);
    let sendDataStr = sendDom.val();
    let sendDataTail = $('#' + chartSendWithId + ' option:selected').val();
    sendDataTail = sendDataTail.replace("\\r", "\r");
    sendDataTail = sendDataTail.replace("\\n", "\n");
    if (sendDataTail == "no") {
        sendDataTail = "";
    }
    if (sendDataStr) {
        Mixly.WebSocket.Socket.sendCommand({
            obj: 'Serial',
            function: 'sendString',
            args: [sendDataStr, sendDataTail]
        });
    }
}

Mixly.WebSocket.Serial.enptySendBox = () => {
    let { sendId, chartSendId } = Mixly.WebSocket.Serial.dom.id;
    let sendDom = $('#' + sendId);
    let chartSendDom = $('#' + chartSendId);
    sendDom.val('');
    chartSendDom.val('');
}

Mixly.WebSocket.Serial.sendCtrlC = () => {
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'sendCtrlC',
        args: []
    });
}

Mixly.WebSocket.Serial.sendCtrlD = () => {
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'sendCtrlD',
        args: []
    });
}

/**
* @function 清空串口输出框
* @description 清空当前串口输出框中的数据
* @return void
*/
Mixly.WebSocket.Serial.clearContent = function () {
    let { receiveId } = Mixly.WebSocket.Serial.dom.id;
    let receiveDom = $('#' + receiveId);
    receiveDom.val('');
    Mixly.WebSocket.Serial.receiveValue = [];
}

Mixly.WebSocket.Serial.updateDtrAndRts = () => {
    let { setDtrId, setRtsId } = Mixly.WebSocket.Serial.dom.id;
    let setDtrDom = $('#' + setDtrId),
        setRtsDom = $('#' + setRtsId);
    let dtr = setDtrDom[0].checked ?? true,
        rts = setRtsDom[0].checked ?? true;
    Mixly.WebSocket.Socket.sendCommand({
        obj: 'Serial',
        function: 'updateDtrAndRts',
        args: [dtr, rts]
    });
}

Mixly.WebSocket.Serial.initPortList = (ports) => {
    Mixly.WebSocket.Serial.refreshPortList(ports);
    Mixly.WebSocket.Socket.init(); 
}