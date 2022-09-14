(() => {

goog.require('layui');
goog.require('Mixly.Modules');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.Title');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MArray');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.WebSocket.Serial');
goog.provide('Mixly.WebSocket.ArduShell');

const {
    Modules,
    Env,
    LayerExt,
    StatusBar,
    StatusBarPort,
    Title,
    Boards,
    MFile,
    MArray,
    Config
} = Mixly;

const { BOARD, SOFTWARE, USER } = Config;

const { 
    Socket,
    ArduShell,
    Serial
} = Mixly.WebSocket;

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.initCompile = () => {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        ArduShell.compile();
    });
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.compile = () => {
    StatusBarPort.tabChange("output");
    ArduShell.compiling = true;
    ArduShell.uploading = false;
    const boardType = Boards.getSelectedBoardCommandParam();
    StatusBar.show(1);
    const layerNum = layer.open({
        type: 1,
        title: indexText["编译中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: (layero, index) => {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(indexText['编译终止中'] + '...', index);
                ArduShell.cancel();
            });
            StatusBar.setValue(indexText["编译中"] + "...\n");
            const code = MFile.getCode();
            Socket.sendCommand({
                obj: 'ArduShell',
                func: 'compile',
                args: [ index, boardType, code ]
            });
        },
        end: () => {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
}

/**
* @function 初始化上传
* @description 关闭已打开的串口，获取当前所连接的设备数，然后开始上传程序
* @return void
*/
ArduShell.initUpload = () => {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        ArduShell.compiling = false;
        ArduShell.uploading = true;
        const boardType = Boards.getSelectedBoardCommandParam();
        const uploadType = Boards.getSelectedBoardConfigParam('upload_method');
        let port = Serial.getSelectedPortName();
        switch (uploadType) {
            case 'STLinkMethod':
            case 'jlinkMethod':
            case 'usb':
                port = 'None';
                break;
        }
        if (port) {
            ArduShell.upload(boardType, port);
        } else {
            layer.msg(indexText["无可用设备"] + "!", {
                time: 1000
            });
        }
    });
}

/**
* @function 上传程序
* @description 通过所选择串口号开始一个上传过程
* @return void
*/
ArduShell.upload = (boardType, port) => {
    StatusBarPort.tabChange("output");
    const layerNum = layer.open({
        type: 1,
        title: indexText["上传中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(indexText['上传终止中'] + '...', index);
                ArduShell.cancel();
            });
            StatusBar.show(1);
            StatusBar.setValue(indexText["上传中"] + "...\n");
            const code = MFile.getCode();
            Socket.sendCommand({
                obj: 'ArduShell',
                func: 'upload',
                args: [ index, boardType, port, code ]
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    }); 
}

ArduShell.operateSuccess = (type, layerNum, port, baud, timeCostStr) => {
    layer.close(layerNum);
    const value = StatusBar.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    StatusBar.addValue(prefix);
    const message = (type === 'compile' ? indexText["编译成功"] : indexText["上传成功"]);
    StatusBar.addValue("==" + message + "(" + indexText["用时"] + " " + timeCostStr + ")==\n");
    layer.msg(message + '！', {
        time: 1000
    });
    if (type === 'upload' && port) {
        Serial.connect(port, baud - 0);
    }
    ArduShell.compiling = false;
    ArduShell.uploading = false;
}

ArduShell.operateOnError = (type, layerNum, error) => {
    StatusBar.addValue(error);
}

ArduShell.operateEndError = (type, layerNum, error) => {
    layer.close(layerNum);
    const value = StatusBar.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    StatusBar.addValue(prefix);
    error && StatusBar.addValue(error + '\n');
    const message = (type === 'compile' ? indexText["编译失败"] : indexText["上传失败"]);
    StatusBar.addValue("==" + message + "==\n");
    ArduShell.compiling = false;
    ArduShell.uploading = false;
}

/**
* @function 取消编译或上传
* @description 取消正在执行的编译或上传过程
* @return void
*/
ArduShell.cancel = function () {
    Socket.sendCommand({
        obj: 'ArduShell',
        func: 'cancel',
        args: []
    });
}

})();