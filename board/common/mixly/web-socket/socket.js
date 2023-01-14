(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.require('Mixly.Charts');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Command');
goog.require('Mixly.MJSON');
goog.require('Mixly.WebSocket');
goog.provide('Mixly.WebSocket.Socket');

const {
    Env,
    Config,
    Boards,
    Charts,
    StatusBar,
    StatusBarPort,
    Command,
    MJSON
} = Mixly;

const { BOARD, SELECTED_BOARD, SOFTWARE } = Config;

const { Socket } = Mixly.WebSocket;

Socket.obj = null;
Socket.url = 'ws://127.0.0.1:8082/';
Socket.jsonArr = [];
Socket.connected = false;
Socket.initFunc = null;
Socket.port = SOFTWARE.webSocket.port;
Socket.debug = SOFTWARE.debug;
BOARD.server = { ...SOFTWARE.webSocket };
const { hostname } = window.location;
Socket.url = SOFTWARE.webSocket.protocol + '//' + hostname + ':' + Socket.port + '/';
Socket.IPAddress = hostname;

let lockReconnect = false; //避免重复连接
let timeoutFlag = true;
let timeoutSet = null;
let reconectNum = 0;
const timeout = 5000; //超时重连间隔

function reconnect () {
    if (lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        timeoutFlag = true;
        Socket.init();
        console.info(`正在重连第${reconectNum + 1}次`);
        reconectNum++;
        lockReconnect = false;
    }, timeout); //这里设置重连间隔(ms)
}

//心跳检测
const heartCheck = {
    timeout, //毫秒
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
        let WS = Socket;
        this.timeoutObj = setInterval(() => {
            if (count < 3) {
                if (WS.obj.readyState === 1) {
                    WS.obj.send('HeartBeat');
                    console.info(`HeartBeat第${count + 1}次`);
                }
                count++;
            } else {
                clearInterval(this.timeoutObj);
                count = 0;
                if (WS.obj.readyState === 0 && WS.obj.readyState === 1) {
                    WS.obj.close();
                }
            }
        }, self.timeout);
    }
}

Socket.init = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Socket.connected) {
        if (Socket.initFunc) {
            Socket.initFunc();
            Socket.initFunc = null;
        }
        doFunc();
        return;
    }

    timeoutSet = setTimeout(() => {
        if (timeoutFlag && reconectNum < 3) {
            console.info(`重连`);
            reconectNum++;
            Socket.init();
        }
    }, timeout);
    
    let WS = Socket;
    WS.obj = new WebSocket(WS.url);
    WS.obj.onopen = () => {
        console.log('已连接' + WS.url);
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        StatusBar.setValue(WS.url + '连接成功\n');
        WS.connected = true;
        Socket.toggleUIToolbar(true);
        Socket.initFunc = doFunc;
        reconectNum = 0;
        timeoutFlag = false;
        clearTimeout(timeoutSet);
        heartCheck.reset().start();
        onopenFunc(WS);
    };

    WS.obj.onmessage = (event) => {
        heartCheck.reset().start();
        let command = Command.parse(event.data);
        if (Socket.debug)
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
        Command.run(command);
    };

    WS.obj.onerror = (event) => {
        console.log('WebSocket error: ', event);
        reconnect(); //重连
        //StatusBar.addValue(event.toString());
    };

    WS.obj.onclose = (event) => {
        WS.connected = false;
        console.log('已断开' + WS.url);
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        StatusBar.setValue(WS.url + '连接断开，请在设置中重新连接\n');
        let ports = StatusBarPort.portsName;
        for (let i = 0; i < ports.length; i++) {
            StatusBarPort.close(ports[i]);
        }
        Socket.toggleUIToolbar(false);
        layer.closeAll();
        Mixly.WebSocket.BU.burning = false;
        Mixly.WebSocket.BU.uploading = false;
        Mixly.WebSocket.ArduShell.compiling = false;
        Mixly.WebSocket.ArduShell.uploading = false;

        console.info(`关闭`, event.code);
        if (event.code !== 1000) {
            timeoutFlag = false;
            clearTimeout(timeoutSet);
            reconnect();
        } else {
            clearInterval(heartCheck.timeoutObj);
            clearTimeout(heartCheck.serverTimeoutObj);
        }
    }
}

Socket.sendCommand = (command) => {
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url, {time: 1000});
        return;
    }
    let commandStr = '';
    
    try {
        commandStr = JSON.stringify(MJSON.encode(command));
        if (Socket.debug)
            console.log('send -> ', commandStr);
    } catch (e) {
        console.log(e);
        return;
    }
    WS.obj.send(commandStr);
}

Socket.clickConnect = () => {
    if (Socket.connected) {
        Socket.disconnect();
    } else {
        Socket.connect((WS) => {
            layer.closeAll();
            layer.msg(WS.url + '连接成功', { time: 1000 });
        });
    }
}

Socket.openLoadingBox = (title, successFunc = () => {}, endFunc = () => {}) => {
    layer.open({
        type: 1,
        title: title,
        content: $('#mixly-loader-div'),
        shade: Mixly.LayerExt.SHADE_ALL,
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
            if (Socket.connected)
                endFunc();
        }
    });
}

Socket.connect = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Socket.connected) {
        doFunc();
        return;
    }
    let title = '连接中...';
    Socket.openLoadingBox(title, () => {
        setTimeout(() => {
            Socket.init(onopenFunc);
        }, 1000);
    }, doFunc);
}

Socket.disconnect = () => {
    if (!Socket.connected)
        return;
    let title = '断开中...';
    Socket.openLoadingBox(title, () => {
        Socket.obj.close();
    });
}

Socket.toggleUIToolbar = (connected) => {
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

Socket.updateSelectedBoardConfig = (info) => {
    Env.currentPlatform = info.currentPlatform;
    info.clientPath = info.clientPath.replaceAll('\\', '/');
    Env.clientPath = info.clientPath;
    info.appPath = info.appPath.replaceAll('\\', '/');
    Env.srcPath = info.appPath;
    Env.indexPath = goog.normalizePath_(Env.srcPath + '/' + BOARD.boardIndex + '/../');
    Env.python3Path = info.python3Path;
    const boardType = Boards.getSelectedBoardName();
    Boards.changeTo(boardType);
}

})();
