goog.loadJs('web', () => {

goog.require('Mixly.Charts');
// goog.require('Mixly.StatusBar');
// goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Config');
goog.require('Mixly.Tools');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.XML');
goog.require('Mixly.MArray');
goog.require('Mixly.Msg');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.SerialPort');
goog.require('Mixly.Web.Bluetooth');
goog.provide('Mixly.Web.Serial');

const { 
    Web,
    Charts,
    Config,
    Tools,
    Env,
    LayerExt,
    XML,
    MArray,
    Msg
} = Mixly;

const { Serial, USB, SerialPort, Bluetooth } = Web;

const { BOARD, SELECTED_BOARD } = Config;

const { portAce } = StatusBarPort;

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

Serial.DEFAULT_BAUD = [9600, 19200, 28800, 38400, 57600, 115200];

Serial.DEFAULT_SEND_WITH = ['\\r\\n', '\\r', '\\n', 'no'];

/**
 * 用户配置的串口筛选项
 * @type { Object }
 **/
Serial.PORT_SELECT = {
    "BURN": BOARD?.burn?.portSelect ?? 'all',
    "UPLOAD": BOARD?.upload?.portSelect ?? 'all'
};

/**
 * 用户配置的上传和连接前的复位操作
 * @type { Object }
 * 
 **/
Serial.UPLOAD_RESET = BOARD?.upload?.reset ?? {};

/**
 * 检测配置文件中是否具有烧录和上传操作，如果没有则不需要筛选出对应串口
 * @type { Object }
 * 
 **/
Serial.HAS_PORT = {
    BURN: BOARD?.nav?.burn ?? false,
    UPLOAD: BOARD?.nav?.upload ?? false
}

Serial.MAX_OUTPUT_LINE = 500;

Serial.REFRESH_OUTPUT_TIME = 100;

Serial.BAUDRATES = [
    9600,
    19200,
    28800,
    38400,
    57600,
    115200
];

Serial.TERMINAL_COMMAND = {
    "config": {
        "-d|--dtr": {
            "help": "设置DTR, 可选值: [0, 1], 例如: config -d 1",
            "key": "DTR"
        },
        "-r|--rts": {
            "help": "设置RTS, 可选值: [0, 1], 例如: config -r 1",
            "key": "RTS"
        },
        "-b|--baud": {
            "help": "设置波特率, 可选值: [" + Serial.DEFAULT_BAUD.join(', ') + "], 例如: config -b " + Serial.DEFAULT_BAUD[0],
            "key": "BAUD"
        },
        "-t|--rtype": {
            "help": "设置串口接收数据的类型, 可选值: [0, 1], 例如: config -t 1",
            "key": "RTYPE"
        },
        "-w|--swith": {
            "help": "设置发送数据时的结尾字符串, 可选值: [" + Serial.DEFAULT_SEND_WITH.join(', ') + "], 例如: config -w " + Serial.DEFAULT_SEND_WITH[0],
            "key": "SWITH"
        },
        "-s|--scroll": {
            "help": "设置接收框滑动条是否一直在最下方, 可选值: [0, 1], 例如: config -s 1",
            "key": "SCROLL"
        },
        "-h|--help": {
            "help": "输出帮助信息, 例如: config -h",
            "key": "HELP"
        },
        "callback": "terminalConfigCallback"
    },
    "port": {
        "-o|--open": {
            "help": "打开当前串口, 例如: port -o",
            "key": "OPEN"
        },
        "-c|--close": {
            "help": "关闭当前串口, 例如: port -c",
            "key": "CLOSE"
        },
        "-h|--help": {
            "help": "输出帮助信息, 例如: port -h",
            "key": "HELP"
        },
        "callback": "terminalPortCallback"
    },
    "send": {
        "-s|--str": {
            "help": "发送字符串, 可选值: 字符串, 例如: send -s 你好Mixly",
            "key": "STR"
        },
        "-b|--bytes": {
            "help": "发送字节数组, 可选值: 字符串, 例如: send -b 0x01,0x02,0x03",
            "key": "BYTES"
        },
        "-w|--with": {
            "help": "发送数据时的结尾字符串, 可选值: [" + Serial.DEFAULT_SEND_WITH.join(', ') + "], 例如: send -s 你好Mixly -w \\r\\n",
            "key": "WITH"
        },
        "-h|--help": {
            "help": "输出帮助信息, 例如: send -h",
            "key": "HELP"
        },
        "callback": "terminalSendCallback"
    },
    "exit": {
        "callback": "terminalExitCallback"
    }
}

/**
 * 储存用户对于每个串口的操作及对应配置
 * @type { Object }
 *  "portsOperator": {
 *      "port": {
 *          "toolConfig": Object, //用户对于串口工具的配置项
 *          "toolOpened": Boolean, //标记串口工具中是否显示了此串口
 *          "portOpened": Boolean, //标记此串口是否处于打开状态
 *          "vendorId": String, //串口的VID值
 *          "productId": String, //串口的PID值
 *          "dom": Object, //串口工具的dom对象
 *          "serialport": Object, //此串口的serialport对象
 *          "output": Array //串口的输出数据,
 *          "terminalOpend": Boolean,
 *          "cursorCallback": String,
 *          "refreshOutputBoxTimer": Number,
 *          "userOnData": Function,
 *          "endPos": Object //结尾文字所在位置
 *      }
 *  }
 **/
Serial.portsOperator = {};

/**
 * 储存已经死亡的用户对于每个串口的操作及对应配置，
 * 在未来检测到这里包含某个串口的配置后将会重新启用
 * @type { Object }
 *  "deadPortOperator" = {...portOperator}
 **/
Serial.deadPortsOperator = {};

Serial.refreshToolPortSelectBox = () => {
    const { form } = layui;
    for (let i in Serial.portsOperator) {
        const { dom } = Serial.portsOperator[i];
        if (dom) {
            const { selectPortId } = dom.id;
            const { formFilter } = dom.filter;
            const selectPortDom = $('#' + selectPortId);
            selectPortDom.empty();
            selectPortDom.append($(`<option value="${i}" selected>${i}</option>`));
            form.render('select', formFilter);
        }
    }
}

Serial.refreshPortOperator = (ports) => {
    const oldPortOperator = { ...Serial.portsOperator };
    Serial.portsOperator = {};
    let portsName = [];
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        portsName.push(port.name);
        if (oldPortOperator[port.name]) {
            Serial.portsOperator[port.name] = oldPortOperator[port.name];
        } else if (Serial.deadPortsOperator[port.name]) {
            Serial.portsOperator[port.name] = { ...Serial.deadPortsOperator[port.name] };
            delete Serial.deadPortsOperator[port.name];
            Serial.refreshToolPortSelectBox();
        } else {
            const defaultPortConfig = {
                toolConfig: { ...Serial.TOOL_DEFAULT_CONFIG },
                toolOpened: false,
                portOpened: false,
                vendorId: port.vendorId,
                productId: port.productId,
                dom: null,
                serialport: null,
                output: []
            }
            Serial.portsOperator[port.name] = defaultPortConfig;
        }
        Serial.refreshTerminalMenu(port.name);
    }
    for (let i in oldPortOperator) {
        if (!portsName.includes(i)) {
            const portObj = oldPortOperator[i];
            const { dom } = portObj;
            if (dom) {
                if (portObj.toolOpened) {
                    const { form } = layui;
                    const { selectPortId } = dom.id;
                    const { formFilter } = dom.filter;
                    const selectPortDom = $('#' + selectPortId);
                    selectPortDom.empty();
                    form.render('select', formFilter);
                    Serial.deadPortsOperator[i] = { ...portObj };
                } else {
                    dom.destroy();
                }
            }
            Serial.refreshTerminalMenu(i);
        }
    }
}

Serial.refreshOutputBox = (port) => {
    const portObj = Serial.portsOperator[port];
    if (!portObj) return;
    if (portObj.busy) {
        return;
    }
    const { dom, toolConfig, toolOpened, endPos, serialport } = portObj;
    if (!serialport) {
        return;
    }
    const output = serialport.output;
    for (let i = output.length; i > Serial.MAX_OUTPUT_LINE; i--) {
        output.shift();
    }
    let outputStr = output.join('\n');
    if (toolOpened) {
        Serial.receiveBoxSetValue(port, outputStr, toolConfig.scroll);
    } else {
        outputStr = outputStr.replaceAll('\r\n', '\n');
        if (endPos && typeof endPos === 'object') {
            const oldOutputStr = StatusBarPort.getValueRange(port, {
                row: 0,
                column: 0
            }, endPos);
            if (outputStr === oldOutputStr)
                return;
        }
        StatusBarPort.setValue(port, outputStr, toolConfig.scroll);
        portObj.endPos = StatusBarPort.getEndPos(port);
        portAce[port] && portAce[port].setReadOnly(false);
    }
}

/**
* @function 打开串口工具
* @description 打开串口工具并打开串口列表中选中的串口
* @return void
**/
Serial.openTool = () => {
    let portName = `web-${SELECTED_BOARD.web.com ?? 'serial'}`;
    if (!navigator.serial || !navigator.usb) {
        portName = 'web-bluetooth';
    }
    const baud = Serial.portsOperator[portName]?.toolConfig?.baudRates ?? Serial.TOOL_DEFAULT_CONFIG.baudRates;
    Serial.connect(portName, baud, (selectedPort) => {
        if (!selectedPort) {
            layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
            return;
        }
        let portObj = Serial.portsOperator[selectedPort];
        const { toolConfig } = portObj;
        const { baudRates } = toolConfig;
        let successFunc = (serialDom) => {
            if (!portObj.dom)
                portObj.dom = serialDom;
            Serial.refreshToolPortSelectBox();
            const { selectPortId } = serialDom.id;
            portObj.toolOpened = true;
            StatusBar.show(1);
            serialDom.nowPort = selectedPort;
            serialDom.prevPort = null;
            const element = layui.element;
            const { tabFilter } = serialDom.filter;
            element.tabChange(tabFilter, portObj.toolConfig.tabIndex);
            Serial.refreshConnectStatus(serialDom.nowPort);
            // Serial.connect(serialDom.nowPort, baudRates ?? 9600);
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
            const newPortObj = Serial.portsOperator[port];
            const deadPortObj = Serial.deadPortsOperator[port];
            if (newPortObj)
                newPortObj.toolOpened = false;
            else if (deadPortObj) {
                deadPortObj.dom.destroy();
                delete Serial.deadPortsOperator[port];
            }
            Serial.refreshTerminalMenu(port);
        }
        let toolDom = portObj.dom;
        if (!portObj.dom) {
            toolDom = LayerExt.openSerialTool(toolConfig, successFunc, endFunc);
        } else {
            toolDom.updateTool(toolConfig);
            toolDom.open(successFunc, endFunc);
        }

        toolDom.onClickSetDtr((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            const { portOpened, serialport, toolConfig } = newPortObj;
            toolConfig.dtr = data.elem.checked;
            const { dtr, rts } = newPortObj.toolConfig;
            portOpened && serialport.setSignals(dtr, rts);
        });

        toolDom.onClickSetRts((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            const { portOpened, serialport, toolConfig } = newPortObj;
            toolConfig.rts = data.elem.checked;
            const { dtr, rts } = newPortObj.toolConfig;
            portOpened && serialport.setSignals(dtr, rts);
        });

        toolDom.onClickSendType((port, data) => {
            let { sendId } = toolDom.id;
            let sendDom = $('#' + sendId);
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.sendStr = data.elem.checked;
            if (data.elem.checked) {
                sendDom.attr("placeholder", Msg.Lang["请输入内容"]);
            } else {
                sendDom.attr("placeholder", Msg.Lang["请输入内容"] + "  " + Msg.Lang["例如"] + ":0x03,0x04");
            }
        });

        /*toolDom.onClickSelectPort((prevPort, newPort, data) => {
            const newPortObj = Serial.portsOperator[newPort];
            const prevPortObj = Serial.portsOperator[prevPort];
            newPortObj.toolConfig = { ...prevPortObj.toolConfig };
            newPortObj.dom = prevPortObj.dom;
            prevPortObj.dom = null;
            prevPortObj.toolOpened = false;
            newPortObj.toolOpened = true;
            const prevSerialport = prevPortObj.serialport;
            if (prevSerialport && prevSerialport.isOpen) {
                prevSerialport.close(() => {
                    Serial.connect(newPort, newPortObj.toolConfig.baudRates);
                });
            }
        });*/

        toolDom.onClickSelectBaud((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            const { portOpened, serialport, toolConfig } = newPortObj;
            toolConfig.baudRates = data.elem.value - 0;
            portOpened && serialport.setBaudRate(data.elem.value - 0);
        });

        toolDom.onClickTab((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.tabIndex = data.index;
            if (data.index === 1) {
                const portObj = Serial.portsOperator[port];
                const { dom } = portObj;
                Charts.init(portObj.portOpened, dom);
            } else {
                Mixly.Charts.destroy();
            }
        });

        toolDom.onClickConnectBtn((port) => {
            const newPortObj = Serial.portsOperator[port];
            if (newPortObj.portOpened) {
                Serial.portClose(port)
            } else {
                Serial.openTool();
            }
        });

        toolDom.onClickSendBtn((port) => {
            Serial.write(port, 0);
        });

        toolDom.onClickClearBtn((port) => {
            Serial.clearContent(port);
        });

        toolDom.onClickChartSendBtn((port) => {
            Serial.write(port, 1);
        });

        toolDom.onClickCtrlCBtn((port) => {
            Serial.writeCtrlC(port);
        });

        toolDom.onClickCtrlDBtn((port) => {
            Serial.writeCtrlD(port);
        });

        toolDom.onClickScroll((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.scroll = data.elem.checked;
        });

        toolDom.onClickReceiveType((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.receiveStr = data.elem.checked;
        });

        toolDom.onClickSelectPointNum((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.pointNum = data.elem.value;
        });

        toolDom.onClickSelectSendWith((port, data) => {
            const newPortObj = Serial.portsOperator[port];
            newPortObj.toolConfig.sendWith = data.elem.value;
        });
    });
}

Serial.refreshConnectStatus = (port) => {
    const portObj = Serial.portsOperator[port];
    const deadPortObj = Serial.deadPortsOperator[port];
    if (!portObj && !deadPortObj) return;
    const { dom, portOpened } = portObj ?? deadPortObj;
    if (dom) {
        const { connectBtnId } = dom.id;
        const connectBtnDom = $('#' + connectBtnId);
        if (portOpened) {
            connectBtnDom.text(Msg.Lang["关闭"]);
            connectBtnDom.attr("class", "layui-btn layui-btn-danger");
        } else {
            connectBtnDom.text(Msg.Lang["打开"]);
            connectBtnDom.attr("class", "layui-btn layui-btn-normal");
        }
    }
    if (portOpened) {
        $('#operate-connect-btn').html(MSG['disconnect']);
        $('#operate-connect-btn').removeClass('icon-link').addClass('icon-unlink');
        $('#connect-btn').html(MSG['disconnect']);
        $('#connect-btn').removeClass('icon-link').addClass('icon-unlink');
    } else {
        $('#operate-connect-btn').html(MSG['connect']);
        $('#operate-connect-btn').removeClass('icon-unlink').addClass('icon-link');
        $('#connect-btn').html(MSG['connect']);
        $('#connect-btn').removeClass('icon-unlink').addClass('icon-link');
    }
}

Serial.receiveBoxAddValue = (port, data, scroll = false) => {
    const newData = Serial.receiveBoxGetValue(port) + data;
    Serial.receiveBoxSetValue(port, newData, scroll);
}

Serial.receiveBoxSetValue = (port, data, scroll = false) => {
    const portObj = Serial.portsOperator[port];
    if (!portObj) return;
    const { dom } = portObj;
    if (dom) {
        const { receiveId } = dom.id;
        const receiveDom = $('#' + receiveId);
            receiveDom.val(data);
        scroll && receiveDom.scrollTop(receiveDom[0].scrollHeight);
    }
}

Serial.receiveBoxGetValue = (port) => {
    const portObj = Serial.portsOperator[port];
    if (!portObj) return '';
    const { dom } = portObj;
    if (!dom) return '';
    const { receiveId } = dom.id;
    const receiveDom = $('#' + receiveId);
    return receiveDom.val();
}

Serial.receiveBoxscrollToBottom = () => {
    const portObj = Serial.portsOperator[port];
    const { dom } = portObj;
    if (dom) {
        const { receiveId } = dom.id;
        const receiveDom = $('#' + receiveId);
        receiveDom.scrollTop(receiveDom[0].scrollHeight);
    }
}

Serial.receiveBoxscrollToTop = () => {
    
}

Serial.statusBarPortAddHotKey = (port) => {
    const session = portAce[port].getSession();
    portAce[port].commands.addCommands([
        {
            name: "Empty",
            bindKey: "Ctrl-E",
            exec: (editor) => {
                // StatusBarPort.setValue(port, "");
                const portObj = Serial.portsOperator[port];
                if (portObj) {
                    portObj.output = [];
                }
            }
        }, {
            name: "Terminal",
            bindKey: "Ctrl-T",
            exec: (editor) => {
                Serial.statusBarPortEnterTerminal(port);
            }
        }, {
            name: "ChangeEditor",
            bindKey: "Delete|Ctrl-X|Backspace",
            exec: (editor) => {
                const portObj = Serial.portsOperator[port];
                if (!portObj || !portObj.portOpened) {
                    return false;
                }
                const { endPos } = portObj;
                if (!endPos || typeof endPos !== 'object') {
                    portAce[port].setReadOnly(true);
                    return false;
                }
                const cursor = session.selection.getCursor();
                if (cursor.row < endPos.row)
                    return true;
                else if (cursor.row === endPos.row
                      && cursor.column <= endPos.column)
                    return true;
                return false;
            }
        }, {
            name: "Enter",
            bindKey: "Enter",
            exec: (editor) => {
                const portObj = Serial.portsOperator[port];
                if (!portObj || !portObj.portOpened) {
                    return false;
                }
                const { endPos } = portObj;
                if (!endPos || typeof endPos !== 'object') {
                    return false;
                }
                const cursor = session.selection.getCursor();
                if (cursor.row === endPos.row) {
                    const newPos = StatusBarPort.getEndPos(port);
                    const sendStr = StatusBarPort.getValueRange(port, endPos, newPos);
                    Serial.writeString(port, sendStr, '\r\n');
                }
                return false;
            }
        }
    ]);
    session.selection.on('changeCursor', function() {
        const portObj = Serial.portsOperator[port];
        if (!portObj || !portObj.portOpened) {
            portAce[port].setReadOnly(false);
            return;
        }
        const { endPos } = portObj;
        if (!endPos || typeof endPos !== 'object') {
            portAce[port].setReadOnly(false);
            return;
        }
        const cursor = session.selection.getCursor();
        if (cursor.row < endPos.row)
            portAce[port].setReadOnly(true);
        else if (cursor.row === endPos.row
              && cursor.column < endPos.column)
            portAce[port].setReadOnly(true);
        else
            portAce[port].setReadOnly(false);
    });

    const portObj = Serial.portsOperator[port];
    if (!portObj) return;
    Serial.refreshTerminalMenu(port);
}

Serial.statusBarPortEnterTerminal = (port) => {
    const portObj = Serial.portsOperator[port];
    if (portObj && !portObj.toolOpened) {
        Serial.statusBarPortRemoveCursorEvent(port);
        portObj.refreshOutputBoxTimer && clearInterval(portObj.refreshOutputBoxTimer);
        portObj.refreshOutputBoxTimer = null;
        setTimeout(() => {
            Serial.statusBarPortAddCursorEvent(port);
        }, Serial.REFRESH_OUTPUT_TIME + 100);
    }
}

Serial.refreshTerminalMenu = (port) => {
    const portObj = Serial.portsOperator[port];
    let newPort = port;
    try {
        newPort = newPort.replaceAll('/', '-');
        newPort = newPort.replaceAll('.', '-');
    } catch (error) {
        console.log(error);
    }
    const menuElem = '<div style="float:left;">{{d.name}}&nbsp</div><div style="float:right;">{{d.hotKey}}</div>';
    const terminalMenu = {
        elem: `#tab-${newPort}-ace`,
        trigger: 'contextmenu',
        isAllowSpread: true,
        id: `tab-${newPort}-ace-terminal`,
        className: 'editor-dropdown-menu',
        click: function(obj, othis){
            if (obj.id === `tab-${newPort}-ace-terminal-exit`) {
                Serial.statusBarPortAddCommand(port, 'exit');
            } else if (obj.id === `tab-${newPort}-ace-terminal-open`) {
                Serial.statusBarPortEnterTerminal(port);
            } else if (obj.id === `tab-${newPort}-ace-terminal-close`) {
                StatusBarPort.tabDelete(port);
            } else if (obj.id === `tab-${newPort}-ace-terminal-help`) {
                Serial.statusBarPortAddCommand(port, 'config port send -h');
            } else if (obj.id === `tab-${newPort}-ace-fontsize-decrease`) {
                const size = parseInt(portAce[port].getFontSize(), 10) || 12;
                portAce[port].setFontSize(Math.max(size - 1 || 1));
            } else if (obj.id === `tab-${newPort}-ace-fontsize-increase`) {
                const size = parseInt(portAce[port].getFontSize(), 10) || 12;
                portAce[port].setFontSize(size + 1);
            } else if (obj.id === `tab-${newPort}-ace-fontsize-default`) {
                portAce[port].setFontSize(12);
            } else if (obj.id === `tab-${newPort}-ace-terminal-port-close`) {
                Serial.statusBarPortAddCommand(port, 'port -c');
            } else if (obj.id === `tab-${newPort}-ace-terminal-port-open`) {
                Serial.statusBarPortAddCommand(port, 'port -o');
            } else if (obj.id === `tab-${newPort}-ace-terminal-send-ctrlc`) {
                Serial.statusBarPortAddCommand(port, 'send -b 0x03,0x0d,0x0a -w no');
            } else if (obj.id === `tab-${newPort}-ace-terminal-send-ctrld`) {
                Serial.statusBarPortAddCommand(port, 'send -b 0x03,0x04 -w no');
            } else if (obj.id === `tab-${newPort}-ace-terminal-send-str`) {
                Serial.statusBarPortAddCommand(port, 'send -w \\r\\n -s ', false);
            } else if (obj.id === `tab-${newPort}-tool-close`) {
                portObj.dom.close();
            } else if (obj.id === `tab-${newPort}-ace-close`) {
                StatusBarPort.tabDelete(port);
            } else if (obj.id === `tab-${newPort}-ace-empty`) {
                Serial.clearContent(port);
            } else if (obj.id === `tab-${newPort}-serial-send-ctrlc`) {
                Serial.writeCtrlC(port);
            } else if (obj.id === `tab-${newPort}-serial-send-ctrld`) {
                Serial.writeCtrlD(port);
            }
        }
    }
    if (!portObj) {
        terminalMenu.data = [{
            title: Msg.Lang['关闭串口输出框'],
            id: `tab-${newPort}-ace-close`
        }];
        layui.dropdown.render(terminalMenu);
        return;
    };

    if (portObj && portObj.toolOpened) {
        terminalMenu.data = [{
            title: Msg.Lang['关闭串口工具'],
            id: `tab-${newPort}-tool-close`
        }];
        layui.dropdown.render(terminalMenu);
        return;
    };
    const { toolConfig } = portObj;
    const TERMINAL_MENU_DATA = {
        portOpend: {
            terminalOpend: [{
                title: XML.render(menuElem, { name: Msg.Lang['关闭串口'], hotKey: 'port -c' }),
                id: `tab-${newPort}-ace-terminal-port-close`
            },
            (toolConfig.ctrlCBtn ? {
                title: XML.render(menuElem, { name: Msg.Lang['中断'], hotKey: '' }),
                id: `tab-${newPort}-ace-terminal-send-ctrlc`
            } : {}),
            (toolConfig.ctrlDBtn ? {
                title: XML.render(menuElem, { name: Msg.Lang['复位'], hotKey: '' }),
                id: `tab-${newPort}-ace-terminal-send-ctrld`
            } : {}), {
                title: XML.render(menuElem, { name: Msg.Lang['发送字符串'], hotKey: '' }),
                id: `tab-${newPort}-ace-terminal-send-str`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['帮助'], hotKey: '' }),
                id: `tab-${newPort}-ace-terminal-help`
            }/*, {type:'-'}, {
                title: XML.render(menuElem, { name: Msg.Lang['退出串口终端'], hotKey: 'exit' }),
                id: `tab-${newPort}-ace-terminal-exit`
            }*/],
            terminalClosed: [{
                title: XML.render(menuElem, { name: Msg.Lang['清空'], hotKey: 'Ctrl+E' }),
                id: `tab-${newPort}-ace-empty`
            }, {type:'-'}, {
                title: XML.render(menuElem, { name: Msg.Lang['增大字号'], hotKey: 'Ctrl+=' }),
                id: `tab-${newPort}-ace-fontsize-increase`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['减小字号'], hotKey: 'Ctrl+-' }),
                id: `tab-${newPort}-ace-fontsize-decrease`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['默认字号'], hotKey: 'Ctrl+0' }),
                id: `tab-${newPort}-ace-fontsize-default`
            }, {type:'-'},
            (toolConfig.ctrlCBtn ? {
                title: XML.render(menuElem, { name: Msg.Lang['中断'], hotKey: '' }),
                id: `tab-${newPort}-serial-send-ctrlc`
            } : {}),
            (toolConfig.ctrlDBtn ? {
                title: XML.render(menuElem, { name: Msg.Lang['复位'], hotKey: '' }),
                id: `tab-${newPort}-serial-send-ctrld`
            } : {})/*, {
                title: XML.render(menuElem, { name: Msg.Lang['打开串口终端'], hotKey: 'Ctrl+T' }),
                id: `tab-${newPort}-ace-terminal-open`
            }*/]
        },
        portClosed: {
            terminalOpend: [{
                title: XML.render(menuElem, { name: Msg.Lang['打开串口'], hotKey: 'port -o' }),
                id: `tab-${newPort}-ace-terminal-port-open`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['帮助'], hotKey: '' }),
                id: `tab-${newPort}-ace-terminal-help`
            }/*, {type:'-'}, {
                title: XML.render(menuElem, { name: Msg.Lang['退出串口终端'], hotKey: 'exit' }),
                id: `tab-${newPort}-ace-terminal-exit`
            }*/],
            terminalClosed: [{
                title: XML.render(menuElem, { name: Msg.Lang['清空'], hotKey: 'Ctrl+E' }),
                id: `tab-${newPort}-ace-empty`
            }, {type:'-'}, {
                title: XML.render(menuElem, { name: Msg.Lang['增大字号'], hotKey: 'Ctrl+=' }),
                id: `tab-${newPort}-ace-fontsize-increase`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['减小字号'], hotKey: 'Ctrl+-' }),
                id: `tab-${newPort}-ace-fontsize-decrease`
            }, {
                title: XML.render(menuElem, { name: Msg.Lang['默认字号'], hotKey: 'Ctrl+0' }),
                id: `tab-${newPort}-ace-fontsize-default`
            }/*, {type:'-'}, {
                title: XML.render(menuElem, { name: Msg.Lang['打开串口终端'], hotKey: 'Ctrl+T' }),
                id: `tab-${newPort}-ace-terminal-open`
            }*/]
        }
    }
    terminalMenu.data = TERMINAL_MENU_DATA[
        portObj.portOpened ? 'portOpend' : 'portClosed'
    ][
        portObj.terminalOpend ? 'terminalOpend' : 'terminalClosed'
    ];
    layui.dropdown.render(terminalMenu);
}

Serial.statusBarPortAddCursorEvent = (port) => {
    const portObj = Serial.portsOperator[port];
    if (portObj.output[portObj.output.length - 1] === '')
        Serial.outputBoxAdd(port, '>>>', false);
    else
        Serial.outputBoxAdd(port, '>>>', true);
    Serial.refreshOutputBox(port);
    portObj.terminalOpend = true;
    Serial.refreshTerminalMenu(port);
    const nowPortAce = portAce[port];
    const { selection } = nowPortAce;
    const session = nowPortAce.getSession();
    const initRow = session.getLength();
    nowPortAce.gotoLine(initRow);
    selection.moveCursorLineEnd();
    const initCursor = selection.getCursor();
    portObj.cursorCallback = session.selection.on('changeCursor', function (e) {
        if (!portObj.terminalOpend) return;
        const cursor = selection.getCursor();
        if (cursor.row < initCursor.row)
            selection.moveCursorTo(initCursor.row, initCursor.column, true);
        else if (cursor.row === initCursor.row
              && cursor.column <= initCursor.column)
            selection.moveCursorTo(initCursor.row, initCursor.column, true);
        let endRowStr = session.getLine(cursor.row - 1);
        if (endRowStr.indexOf('>>>') !== -1
         && cursor.row === initCursor.row + 1
         && cursor.column === 0) {
            endRowStr = endRowStr.replace('>>>', '');
            Serial.outputBoxAdd(port, endRowStr);
            Serial.handleCommand(port, endRowStr);
            Serial.statusBarPortRemoveCursorEvent(port);
        } else {
            const nowRow = session.getLength();
            if (nowRow !== initRow)
                Serial.statusBarPortRemoveCursorEvent(port);
        }
    });
}

Serial.statusBarPortRemoveCursorEvent = (port) => {
    const nowPortAce = portAce[port];
    const portObj = Serial.portsOperator[port];
    if (!portObj || !nowPortAce) return;
    const session = nowPortAce.getSession();
    if (portObj.cursorCallback) {
        session.selection.removeEventListener('changeCursor', portObj.cursorCallback);
        Serial.refreshOutputBox(port);
        portObj.terminalOpend = false;
        Serial.refreshTerminalMenu(port);
        if (portObj.portOpened && !portObj.refreshOutputBoxTimer)
            portObj.refreshOutputBoxTimer = setInterval(() => {
                Serial.refreshOutputBox(port);
            }, Serial.REFRESH_OUTPUT_TIME);
    }
}

Serial.outputBoxAdd = (port, str, withNewLine = false) => {
    const portObj = Serial.portsOperator[port];
    const { serialport } = portObj;
    if (withNewLine)
        serialport.output.push('');
    serialport.output[serialport.output.length - 1] += str;
}

Serial.handleCommand = (port, command) => {
    const portObj = Serial.portsOperator[port];
    const commandList = command.split(' ');
    const commandObj = minimist(commandList);
    if (commandObj['_'].length >= 1) {
        for (let i of commandObj['_']) {
            const commandName = i;
            const commandNameList = Object.keys(Serial.TERMINAL_COMMAND);
            if (commandNameList.includes(commandName)) {
                const callbackName = Serial.TERMINAL_COMMAND[commandName].callback;
                Serial[callbackName] && Serial[callbackName](port, commandObj);
            } else {
                Serial.outputBoxAdd(port, commandName + '为无效指令', true);
                Serial.outputBoxAdd(port, '', true);
            }
        }
    } else {
        Serial.outputBoxAdd(port, '无可用指令', true);
        Serial.outputBoxAdd(port, '', true);
    }
}

Serial.parseOptions = (commandList, options) => {
    let configKeyList1 = [], configKeyList2 = [], keyList = [];
    for (let i in options) {
        const nowOption = i.split('|');
        const key = options[i]?.key;
        if (nowOption.length !== 2 || !key) continue;
        if (nowOption[0].indexOf('-') === -1 || nowOption[1].indexOf('-') === -1) continue;
        keyList.push(key);
        for (let j of nowOption) {
            if (j.length === 2)
                configKeyList1.push(j);
            else
                configKeyList2.push(j);
        }
    }
    const configKeyList = [configKeyList1, configKeyList2, keyList];
    const configObj = {};
    for (let i in commandList) {
        option = commandList[i];
        if (configKeyList[0].includes('-' + i)) {
            configObj[configKeyList[2][configKeyList[0].indexOf('-' + i)]] = option;
            configKeyList[1][i] = null;
        } else if (configKeyList[1].includes('--' + i)) {
            configObj[configKeyList[2][configKeyList[1].indexOf('--' + i)]] = option;
        }
    }
    return configObj;
}

Serial.terminalAddHelpInfo = (port, commandType, options) => {
    this.getSpace = (num) => {
        var arr = new Array(num).fill(' ');
        return arr.join('');
    }
    Serial.outputBoxAdd(port, commandType + '指令可用选项如下：', true);
    let optionsKeys = Object.keys(options);
    let maxLen = 0;
    for (let i of optionsKeys)
        if (i.length > maxLen)
            maxLen = i.length;
    for (let i in options) {
        if (i === 'callback') continue;
        try {
            Serial.outputBoxAdd(port, i + this.getSpace(maxLen - i.length) + '    ' + (options[i].help ?? ''), true);
        } catch (error) {
            console.log(error);
        }
    }
    Serial.outputBoxAdd(port, '', true);
    return;
}

Serial.terminalConfigCallback = (port, commandList) => {
    const portObj = Serial.portsOperator[port];
    const { toolConfig } = portObj;
    if (!portObj) return;
    const configOptions = Serial.TERMINAL_COMMAND.config;
    const newConfigOptions = Serial.parseOptions(commandList, configOptions);
    if (newConfigOptions.HELP) {
        Serial.terminalAddHelpInfo(port, 'config', configOptions);
        return;
    }
    Serial.outputBoxAdd(port, '获取指令' + JSON.stringify(newConfigOptions), true);
    Serial.outputBoxAdd(port, '', true);
    toolConfig.dtr = newConfigOptions.DTR ?? toolConfig.dtr;
    toolConfig.rts = newConfigOptions.RTS ?? toolConfig.rts;
    toolConfig.scroll = newConfigOptions.SCROLL ?? toolConfig.scroll;
    toolConfig.baudRates = (newConfigOptions.BAUD 
                         && Serial.DEFAULT_BAUD.includes(newConfigOptions.BAUD))
                         ? newConfigOptions.BAUD : toolConfig.baudRates;
    toolConfig.receiveStr = newConfigOptions.RTYPE ?? toolConfig.receiveStr;
    toolConfig.sendWith = (newConfigOptions.SWITH 
                        && Serial.DEFAULT_SEND_WITH.includes(newConfigOptions.SWITH))
                        ? newConfigOptions.SWITH : toolConfig.sendWith;
    Serial.setDtrAndRts(port, toolConfig.dtr, toolConfig.rts);
    Serial.setBaudRate(port, toolConfig.baudRates);
}

Serial.terminalPortCallback = (port, commandList) => {
    const portObj = Serial.portsOperator[port];
    const { toolConfig } = portObj;
    if (!portObj) return;
    const portOptions = Serial.TERMINAL_COMMAND.port;
    const newPortOptions = Serial.parseOptions(commandList, portOptions);
    if (newPortOptions.HELP) {
        Serial.terminalAddHelpInfo(port, 'port', portOptions);
        return;
    }
    Serial.outputBoxAdd(port, '获取指令' + JSON.stringify(newPortOptions), true);
    Serial.outputBoxAdd(port, '', true);
    if (newPortOptions.OPEN) {
        if (!portObj.portOpened)
            Serial.connect(port, portObj.toolConfig.baudRates);
    } else if (newPortOptions.CLOSE) {
        if (portObj.portOpened)
            Serial.portClose(port);
    } else {
        Serial.outputBoxAdd(port, '无效指令', false);
        Serial.outputBoxAdd(port, '', true);
    }
}

Serial.terminalSendCallback = (port, commandList) => {
    const portObj = Serial.portsOperator[port];
    const { toolConfig } = portObj;
    if (!portObj) return;
    const sendOptions = Serial.TERMINAL_COMMAND.send;
    const newSendOptions = Serial.parseOptions(commandList, sendOptions);
    if (newSendOptions.HELP) {
        Serial.terminalAddHelpInfo(port, 'send', sendOptions);
        return;
    }
    Serial.outputBoxAdd(port, '获取指令' + JSON.stringify(newSendOptions), true);
    Serial.outputBoxAdd(port, '', true);
    if (!portObj.portOpened) {
        Serial.outputBoxAdd(port, '串口已关闭，无法发送数据！', false);
        Serial.outputBoxAdd(port, '', true);
        return;
    }
    let sendWith = toolConfig.sendWith ?? '\\r\\n';
    if (newSendOptions.WITH && Serial.DEFAULT_SEND_WITH.includes(newSendOptions.WITH))
        sendWith = newSendOptions.WITH;
    if (newSendOptions.STR) {
        Serial.writeString(port, newSendOptions.STR, sendWith);
    } else if (newSendOptions.BYTES) {
        Serial.writeByteArr(port, newSendOptions.BYTES, sendWith);
    } else {
        Serial.outputBoxAdd(port, '无效指令', false);
        Serial.outputBoxAdd(port, '', true);
    }
}

Serial.terminalExitCallback = (port, commandList) => {
    const portObj = Serial.portsOperator[port];
    if (!portObj) return;
    Serial.outputBoxAdd(port, '', true);
}

Serial.statusBarPortAddCommand = (port, command, withNewLine = true) => {
    StatusBarPort.addValue(port, command + (withNewLine ? '\n' : ''), true);
    if (withNewLine)
        Serial.refreshOutputBox(port);
}

/**
* @function 连接串口
* @description 读取串口下拉列表中选中的串口并连接
* @param port {String} 串口号
* @param baud {Number} 波特率
* @return void
*/
Serial.connect = function (port = null, baud = null, endFunc = (data) => {}) {
    if (!port) {
        endFunc(null);
        return;
    }
    StatusBarPort.tabChange(port);
    Serial.refreshPortOperator([{
            name: port,
            vendorId: 'None',
            productId: 'None'
    }]);
    const portObj = Serial.portsOperator[port];
    const { toolConfig } = portObj;
    if (!baud)
        baud = toolConfig.baudRates ?? 9600;
    const { dom } = portObj;
    if (portObj.portOpened) {
        endFunc(port);
        return;
    }
    portObj.refreshOutputBoxTimer = null;
    if (port === 'web-usb') {
        portObj.serialport = USB;
    } else if (port === 'web-bluetooth') {
        portObj.serialport = Bluetooth;
    } else {
        portObj.serialport = SerialPort;
    }
    portObj.serialport.connect(baud, (data) => {
        Charts.addData(data);
    })
    .then(() => {
        Serial.onConnect(port);
        /* portObj.serialport.AddOnConnectEvent(() => {
            Serial.onConnect(port);
        });*/
        portObj.serialport.AddOnDisconnectEvent(() => {
            Serial.onDisconnect(port);
        });
        endFunc(port);
        return Serial.reset(port, 'upload');
    })
    .catch((error) => {
        console.log(error);
        Serial.onDisconnect(port);
        endFunc(null);
    })
    .finally(() => {
        Serial.refreshConnectStatus(port);
    });
}

Serial.onConnect = (port) => {
    const portObj = Serial.portsOperator[port];
    const { serialport } = portObj;
    portObj.portOpened = true;
    StatusBarPort.tabAdd(port, true, Serial.statusBarPortAddHotKey, (portName) => {
        const newPortObj = Serial.portsOperator[portName];
        if (newPortObj && newPortObj.serialport && newPortObj.portOpened) {
            Serial.portClose(portName);
            StatusBarPort.tabChange("output");
            if (StatusBar.getValue().lastIndexOf("\n") != StatusBar.getValue().length - 1) {
                StatusBar.addValue('\n' + Msg.Lang['已关闭串口'] + portName + '\n');
            } else {
                StatusBar.addValue(Msg.Lang['已关闭串口'] + portName + '\n');
            }
        }
    });
    StatusBarPort.tabChange(port);
    Serial.refreshTerminalMenu(port);
    StatusBarPort.setValue(port, Msg.Lang['已打开串口'] + ': ' + port + '\n', true);
    Serial.receiveBoxSetValue(port, Msg.Lang['已打开串口'] + ': ' + port + '\n', true);
    serialport.output.push('');
    Serial.outputBoxAdd(port, Msg.Lang['已打开串口'] + ': ' + port);
    serialport.output.push('');
    portObj.refreshOutputBoxTimer = setInterval(() => {
        Serial.refreshOutputBox(port);
    }, Serial.REFRESH_OUTPUT_TIME);
    $('#operate-connect-btn').html(MSG['disconnect']);
    $('#operate-connect-btn').removeClass('icon-link').addClass('icon-unlink');
    $('#connect-btn').html(MSG['disconnect']);
    $('#connect-btn').removeClass('icon-link').addClass('icon-unlink');
}

Serial.onDisconnect = (port) => {
    layer.closeAll();
    const portObj = Serial.portsOperator[port];
    const { serialport } = portObj;
    if (USB.DAPLink && USB.DAPLink.connected) {
        USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
    }
    if (!portObj.portOpened) {
        return;
    }
    portObj.portOpened = false;
    StatusBarPort.close(port);
    Serial.refreshConnectStatus(port);
    Serial.refreshTerminalMenu(port);
    portObj.refreshOutputBoxTimer && clearInterval(portObj.refreshOutputBoxTimer);
    portObj.refreshOutputBoxTimer = null;
    Charts.stopRefresh();
    const receiveStr = Serial.receiveBoxGetValue(port);
    if (receiveStr && receiveStr.lastIndexOf("\n") != receiveStr.length - 1) {
        Serial.receiveBoxAddValue(port, '\n' + Msg.Lang['已关闭串口'] + ': ' + port + '\n', true);
    } else {
        Serial.receiveBoxAddValue(port, Msg.Lang['已关闭串口'] + ': ' + port + '\n', true);
    }

    if (StatusBarPort.getValue(port).lastIndexOf("\n") != StatusBarPort.getValue(port).length - 1) {
        StatusBarPort.addValue(port, '\n' + Msg.Lang['已关闭串口'] + ': ' + port + '\n', true);
    } else {
        StatusBarPort.addValue(port, Msg.Lang['已关闭串口'] + ': ' + port + '\n', true);
    }
    if (serialport) {
        serialport.output = [];
        portObj.serialport = null;
    }
    $('#operate-connect-btn').html(MSG['connect']);
    $('#operate-connect-btn').removeClass('icon-unlink').addClass('icon-link');
    $('#connect-btn').html(MSG['connect']);
    $('#connect-btn').removeClass('icon-unlink').addClass('icon-link');
}

Serial.portClose = (port, endFunc = () => {}) => {
    const portObj = Serial.portsOperator[port];
    if (portObj && portObj.portOpened) {
        const newSerialport = portObj.serialport;
        newSerialport.close();
        Serial.onDisconnect(port);
        endFunc();
    } else {
        endFunc();
    }
}

/**
* @function 显示串口报错信息到串口输出框或状态栏
* @description 
* @param select {Boolean} true - 显示报错信息到串口输出框，false - 显示报错信息到状态栏
* @param data {String} 报错信息
* @return void
*/
Serial.showErrorData = function (port, select, data) {
    const portObj = Serial.portsOperator[port];
    const { toolOpened, dom, toolConfig } = portObj;
    if (!toolConfig.receiveStr) {
        data = Tools.uint8ArrayToStr(Tools.strToByte(data));
        data = data.replace(/^\s*/, "");
        data += "\n";
    }
    if (toolOpened) {
        Serial.receiveBoxAddValue(port, data, toolConfig.scroll);
    } else {
        StatusBarPort.addValue(port, data, true);
    }
}

/**
* @function 串口发送字节数组
* @description 
* @param sendDataStr {String} 要发送的数据
* @param sendDataTail {String} 数据的尾部
* @return void
*/
Serial.writeByteArr = function (port, sendDataStr, sendDataTail) {
    const portObj = Serial.portsOperator[port];
    const nowSerialport = portObj.serialport;
    let sendDataArr;
    let sendStr = '';
    if (typeof sendDataStr !== 'string')
        sendStr = sendDataStr.toString();
    else
        sendStr = sendDataStr;
    sendDataArr = sendStr.trim().split(/,+/);
    var sendDataNum = [];
    for (var i = 0; i < sendDataArr.length; i++) {
        if (isNaN(sendDataArr[i])) {
            sendDataNum = [...sendDataNum, ...Tools.strToByte(sendDataArr[i])];
        } else {
            sendDataArr[i] = sendDataArr[i].toLowerCase();
            if (sendDataArr[i].length > 2 && sendDataArr[i].substring(0, 2) === '0o') {
                sendDataNum.push(parseInt(sendDataArr[i].substring(2), 8));
            } else {
                sendDataNum.push(parseInt(sendDataArr[i]-0, 10));
            }
        }
    }
    nowSerialport.writeByteArr(sendDataNum)
    .then(() => {
        sendDataTail = sendDataTail.replace("\\r", "\r");
        sendDataTail = sendDataTail.replace("\\n", "\n");
        if (sendDataTail == "no") {
            sendDataTail = "";
        }
        if (sendDataTail) {
            nowSerialport.writeString(sendDataTail);
        }
    })
    .catch(console.log);
}

/**
* @function 串口发送字符串
* @description 串口发送字符串
* @return void
*/
Serial.writeString = function (port, sendDataStr, sendDataTail) {
    const portObj = Serial.portsOperator[port];
    const nowSerialport = portObj.serialport;
    if (nowSerialport) {
        sendDataTail = sendDataTail.replace("\\r", "\r");
        sendDataTail = sendDataTail.replace("\\n", "\n");
        if (sendDataTail === "no") {
            sendDataTail = "";
        }
        if (sendDataStr) {
            nowSerialport.writeString(sendDataStr + sendDataTail);
        }
    }
}

/**
* @function 读取串口发送框数据并发送
* @description 读取串口发送框数据并发送，然后清空串口发送框
* @return void
*/
Serial.write = function (port, strReadType = 0) {
    const portObj = Serial.portsOperator[port];
    const nowSerialport = portObj.serialport;
    const { dom } = portObj;
    if (nowSerialport) {
        const { sendId, sendWithId, sendTypeId, chartSendId } = dom.id;
        const sendDom = $('#' + sendId);
        const chartSendDom = $('#' + chartSendId);
        let sendDataStr = '';
        if (strReadType) {
            sendDataStr = chartSendDom.val();
            chartSendDom.val('');
        } else {
            sendDataStr = sendDom.val();
            sendDom.val('');
        }
        const sendDataTail = $('#' + sendWithId + ' option:selected').val();
        if ($('#' + sendTypeId)[0].checked == false) {
            Serial.writeByteArr(port, sendDataStr, sendDataTail);
        } else {
            Serial.writeString(port, sendDataStr, sendDataTail);
        }
    }
}

/**
* @function 串口发送
* @description 串口发送Ctrl + C
* @return void
*/
Serial.writeCtrlC = function (port) {
    const portObj = Serial.portsOperator[port];
    const nowSerialport = portObj.serialport;
    if (nowSerialport) {
        nowSerialport.writeCtrlC();
    }
}

/**
* @function 串口发送
* @description 串口发送Ctrl + D
* @return void
*/
Serial.writeCtrlD = function (port) {
    const portObj = Serial.portsOperator[port];
    const nowSerialport = portObj.serialport;
    if (nowSerialport) {
        nowSerialport.writeCtrlD();
    }
}

/**
* @function 清空串口输出框
* @description 清空当前串口输出框中的数据
* @return void
*/
Serial.clearContent = function (port) {
    Serial.receiveBoxSetValue(port, '');
    const portObj = Serial.portsOperator[port] ?? {};
    const { serialport } = portObj;
    if (serialport) {
        serialport.output = [];
    } else {
        StatusBarPort.setValue(port, '');
    }
}

Serial.updateDtrAndRts = async function (port) {
    const portObj = Serial.portsOperator[port];
    const { toolConfig } = portObj;
    const serialport = portObj.serialport;
    if (portObj.portOpened && serialport) {
        await serialport.setSignals(toolConfig.dtr, toolConfig.rts);
    }
}

Serial.reset = async function (port, resetType) {
    const resetConfig = Serial.getResetConfig(resetType);
    const newPortObj = Serial.portsOperator[port];
    const newSerialport = newPortObj.serialport;
    if (typeof resetConfig !== 'object') {
        return;
    };
    let len = resetConfig.length;
    for (var i = 0; i < len; i++) {
        if (resetConfig[i].dtr !== undefined
            || resetConfig[i].rts !== undefined) {
            var dtrValue = false;
            var rtsValue = false;
            if (resetConfig[i]?.dtr) {
                dtrValue = true;
            }
            if (resetConfig[i]?.rts) {
                rtsValue = true;
            }
            await newSerialport.setSignals(dtrValue, rtsValue);
        } else if (resetConfig[i]?.sleep) {
            var sleepValue = parseInt(resetConfig[i].sleep) || 100;
            await Serial.sleep(sleepValue);
        }
    }
}

Serial.setBaudRate = (port, baud) => {
    const newPortObj = Serial.portsOperator[port];
    const newSerialport = newPortObj.serialport;
    if (newSerialport && newSerialport.isOpen) {
        newSerialport.setBaudRate(baud);
    }
}

Serial.sleep = async function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Serial.getResetConfig = (type) => {
    if (typeof SELECTED_BOARD !== 'object') {
        return null;
    }
    let resetConfig = null;
    if (SELECTED_BOARD.web && SELECTED_BOARD.web[type] && SELECTED_BOARD.web[type].reset) {
        resetConfig = SELECTED_BOARD.web[type].reset;
    } else if (SELECTED_BOARD[type]) {
        resetConfig = SELECTED_BOARD[type].reset;
    }
    return resetConfig;
}

});