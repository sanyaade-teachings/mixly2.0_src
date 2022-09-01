goog.require('Mixly.Config');
goog.require('Mixly.Charts');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Command');
goog.require('Mixly.WebSocket');
goog.provide('Mixly.WebSocket.Socket');

Mixly.WebSocket.Socket.obj = null;

Mixly.WebSocket.Socket.url = 'ws://127.0.0.1:8081/';

Mixly.WebSocket.Socket.jsonArr = [];

Mixly.WebSocket.Socket.connected = false;

Mixly.WebSocket.Socket.debug = false;

Mixly.WebSocket.Socket.initFunc = null;

$.get('../../config.json', (fileStr) => {
    let configObj = null;
    let WS = Mixly.WebSocket.Socket;
    try {
        configObj = JSON.parse(fileStr);
        //WS.IPAddress = configObj.IPAddress;
        WS.port = configObj.socket.port;
        //WS.url = 'ws://' + WS.IPAddress + ':' + WS.port + '/';
        WS.debug = configObj.debug;
        Mixly.Config.BOARD.server = configObj;
        let url = window.location.host;
        let IPList = url.match(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g);
        if (IPList && IPList.length > 0) {
            WS.url = 'ws://' + IPList[0] + ':' + WS.port + '/';
            WS.IPAddress = IPList[0];
        }
    } catch (e) {
        console.log(e);
    }
}).fail(function () {
    console.log('无法加载config.json文件');
});

try {
    console.log()
} catch (e) {
    console.log(e);
}

Mixly.WebSocket.Socket.init = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Mixly.WebSocket.Socket.connected) {
        if (Mixly.WebSocket.Socket.initFunc) {
            Mixly.WebSocket.Socket.initFunc();
            Mixly.WebSocket.Socket.initFunc = null;
        }
        doFunc();
        return;
    }
    
    let WS = Mixly.WebSocket.Socket;
    WS.obj = new WebSocket(WS.url);
    WS.obj.onopen = () => {
        console.log('已连接' + WS.url);
        Mixly.StatusBar.show(1);
        Mixly.StatusBarPort.tabChange('output');
        Mixly.StatusBar.setValue(WS.url + '连接成功\n', true);
        WS.connected = true;
        Mixly.WebSocket.Socket.toggleUIToolbar(true);
        Mixly.WebSocket.Socket.initFunc = doFunc;
        onopenFunc(WS);
    };

    WS.obj.onmessage = (event) => {
        let command = Mixly.Command.parse(event.data);
        if (Mixly.WebSocket.Socket.debug)
            console.log('receive -> ', event.data);
        /*if (command && command.obj && command.function) {
            if (command.type === 1) {
                let args = command.args ?? [];
                try {
                    if (window[command.obj][command.function])
                        window[command.obj][command.function](...args);
                } catch (e) {
                    console.log(e);
                }
            }
        }*/
        Mixly.Command.run(command);
    };

    WS.obj.onerror = (event) => {
        console.log('WebSocket error: ', event);
        //Mixly.StatusBar.addValue(event.toString(), true);
    };

    WS.obj.onclose = () => {
        WS.connected = false;
        console.log('已断开' + WS.url);
        Mixly.StatusBar.show(1);
        Mixly.StatusBarPort.tabChange('output');
        Mixly.StatusBar.setValue(WS.url + '连接断开\n', true);
        let ports = Mixly.StatusBarPort.portsName;
        for (let i = 0; i < ports.length; i++) {
            Mixly.StatusBarPort.close(ports[i]);
        }
        Mixly.WebSocket.Socket.toggleUIToolbar(false);
        layer.closeAll();
        layer.msg('未连接' + WS.url + '，请在设置中连接', { time: 1000 });
    }
}

Mixly.WebSocket.Socket.parseCommand = (commandStr) => {
    function decodeJson(jsonObj) {
        // 循环所有键
        for (var key in jsonObj) {
            //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
            var element = jsonObj[key];
            if (element.length > 0 && typeof (element) == "object" || typeof (element) == "object") {
                element = { ...decodeJson(element) };
            } else { //不是对象或数组、直接输出
                if (typeof (element) === 'string') {
                    try {
                        jsonObj[key] = decodeURIComponent(jsonObj[key]);
                    } catch (e) {
                    }
                }
            }
        }
        return jsonObj;
    }
    try {
        return decodeJson(JSON.parse(commandStr));
    } catch (e) {
        console.log(e);
        return null;
    }
}

Mixly.WebSocket.Socket.sendCommand = (command) => {
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url, {time: 1000});
        return;
    }
    let commandStr = '';
    function encodeJson(jsonObj) {
        // 循环所有键
        for (var key in jsonObj) {
            //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
            var element = jsonObj[key];
            if (element.length > 0 && typeof (element) == "object" || typeof (element) == "object") {
                element = { ...encodeJson(element) };
            } else { //不是对象或数组、直接输出
                if (typeof (element) === 'string') {
                    try {
                        jsonObj[key] = encodeURIComponent(jsonObj[key]);
                    } catch (e) {
                    }
                }
            }
        }
        return jsonObj;
    }

    try {
        commandStr = JSON.stringify(encodeJson(command));
        if (Mixly.WebSocket.Socket.debug)
            console.log('send -> ', commandStr);
    } catch (e) {
        console.log(e);
        return;
    }
    WS.obj.send(commandStr);
}

Mixly.WebSocket.Socket.clickConnect = () => {
    if (Mixly.WebSocket.Socket.connected) {
        Mixly.WebSocket.Socket.disconnect();
    } else {
        Mixly.WebSocket.Socket.connect((WS) => {
            layer.closeAll();
            layer.msg(WS.url + '连接成功', { time: 1000 });
        });
    }
}

Mixly.WebSocket.Socket.openLoadingBox = (title, successFunc = () => {}, endFunc = () => {}) => {
    layer.open({
        type: 1,
        title: title,
        content: $('#mixly-loader-div'),
        shade: Mixly.LayerExtend.shade,
        closeBtn: 0,
        success: function () {
            $("#webusb-cancel").css("display","none");
            $(".layui-layer-page").css("z-index", "198910151");
            successFunc();
        },
        end: function () {
            $("#mixly-loader-div").css("display", "none");
            $(".layui-layer-shade").remove();
            $("#webusb-cancel").css("display", "unset");
            if (Mixly.WebSocket.Socket.connected)
                endFunc();
        }
    });
}

Mixly.WebSocket.Socket.connect = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Mixly.WebSocket.Socket.connected) {
        doFunc();
        return;
    }
    let title = '连接中...';
    Mixly.WebSocket.Socket.openLoadingBox(title, () => {
        setTimeout(() => {
            Mixly.WebSocket.Socket.init(onopenFunc);
        }, 1000);
    }, doFunc);
}

Mixly.WebSocket.Socket.disconnect = () => {
    if (!Mixly.WebSocket.Socket.connected)
        return;
    let title = '断开中...';
    Mixly.WebSocket.Socket.openLoadingBox(title, () => {
        Mixly.WebSocket.Socket.obj.close();
    });
}

Mixly.WebSocket.Socket.toggleUIToolbar = (connected) => {
    try {
        if (connected) {
            $('#socket-connect-btn').html(MSG['disconnect']);
            $('#socket-connect-btn').removeClass('icon-link').addClass('icon-unlink');
        } else {
            $('#socket-connect-btn').html(MSG['connect']);
            $('#socket-connect-btn').removeClass('icon-unlink').addClass('icon-link');
        }
    } catch (e) {
        console.log(e);
    }
}

/*
Mixly.WebSocket.Socket.longSock = (url, fn, intro = '') => {
    if (Mixly.WebSocket.Socket.connected) return;
    let lockReconnect = false; //避免重复连接
    let timeoutFlag = true;
    let timeoutSet = null;
    let reconectNum = 0;
    const timeout = 30000; //超时重连间隔
    let wsObj;
    function reconnect() {
        if (lockReconnect) return;
        lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        if (reconectNum < 3) {
            setTimeout(function () {
                timeoutFlag = true;
                createWebSocket();
                console.info(`${intro}正在重连第${reconectNum + 1}次`);
                reconectNum++;
                lockReconnect = false;
            }, 5000); //这里设置重连间隔(ms)
        }
    }
    //心跳检测
    const heartCheck = {
        timeout: 5000, //毫秒
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
            clearInterval(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            const self = this;
            let count = 0;
            this.timeoutObj = setInterval(() => {
                if (count < 3) {
                    if (wsObj.readyState === 1) {
                        wsObj.send('HeartBeat');
                        console.info(`${intro}HeartBeat第${count + 1}次`);
                    }
                    count++;
                } else {
                    clearInterval(this.timeoutObj);
                    count = 0;
                    if (wsObj.readyState === 0 && wsObj.readyState === 1) {
                        wsObj.close();
                    }
                }
            }, self.timeout);
        }
    }
    const createWebSocket = () => {
        console.info(`${intro}创建11`);
        timeoutSet = setTimeout(() => {
            if (timeoutFlag && reconectNum < 3) {
                console.info(`${intro}重连22`);
                reconectNum++;
                createWebSocket();
            }
        }, timeout);
        let WS = Mixly.WebSocket.Socket;

        wsObj = new WebSocket(url);

        WS.obj = wsObj;

        wsObj.onopen = () => {
            WS.connected = true;
            reconectNum = 0;
            timeoutFlag = false;
            clearTimeout(timeoutSet);
            heartCheck.reset().start();
        }
        wsObj.onmessage = evt => {
            heartCheck.reset().start();
            // console.info(evt);
            if (evt.data === 'HeartBeat') return;
            fn(evt, wsObj);
        }
        wsObj.onclose = e => {
            WS.connected = false;
            console.log('已断开与node服务器的连接！');
            layer.msg('已断开与node服务器的连接!', {
                time: 1000
            });
            let ports = Mixly.StatusBarPort.portName;
            for (let i = 0; i < ports.length; i++) {
                Mixly.StatusBarPort.close(ports[i]);
            }
            Mixly.WebSocket.Serial.setConnectStatus('', false);

            console.info(`${intro}关闭11`, e.code);
            if (e.code !== 1000) {
                timeoutFlag = false;
                clearTimeout(timeoutSet);
                reconnect();
            } else {
                clearInterval(heartCheck.timeoutObj);
                clearTimeout(heartCheck.serverTimeoutObj);
            }
        }
        wsObj.onerror = function () {
            console.info(`${intro}错误11`);
            reconnect(); //重连
        }
    }
    createWebSocket();
}

//方法调用
const handler = (event, ws) => {
    //event 是 websockett数据
    //ws 是请求名称，方便关闭websocket
    let WS = Mixly.WebSocket.Socket;
    let command = WS.parseCommand(event.data);
    if (Mixly.WebSocket.Socket.debug)
        console.log('receive -> ', event.data);
    if (command && command.obj && command.function) {
        if (command.type === 1) {
            let args = command.args ?? [];
            try {
                if (window[command.obj][command.function])
                    window[command.obj][command.function](...args);
            } catch (e) {
                console.log(e);
            }
        }
    }
 }

Mixly.WebSocket.Socket.init = (doFunc = () => {}) => {
    let WS = Mixly.WebSocket.Socket;
    WS.longSock(WS.url, handler, WS.url);
}

Mixly.WebSocket.Socket.init();
*/
