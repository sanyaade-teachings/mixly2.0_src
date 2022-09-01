(() => {

goog.require('Mixly.Boards');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.MString');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.WebSocket.Serial');
goog.provide('Mixly.WebSocket.BU');

const {
    Boards,
    Config,
    MFile,
    MString,
    StatusBar,
    StatusBarPort
} = Mixly;

const { BOARD, SELECTED_BOARD } = Config;

const { BU, Serial, Socket } = Mixly.WebSocket;

BU.boardType = Mixly.Tools.getBoardType();

BU.burnCommand = Mixly.Config.BOARD?.burn?.command ?? null;

BU.uploadCommand = Mixly.Config.BOARD?.upload?.command ?? null;

BU.uploadType = Mixly.Config.BOARD?.upload?.type ?? 'ampy';

BU.uploadFilePath = Mixly.Config.BOARD?.upload?.filePath ?? '{indexPath}/build/upload/main.py';

BU.copyLib = Mixly.Config.BOARD?.upload?.copyLib ?? true;

if (BU.uploadFilePath.toLowerCase().indexOf(".py") != -1)
    BU.uploadFileType = "py";
else
    BU.uploadFileType = "hex";

BU.burn = () => {
    /*
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url + '，请在设置中连接', {time: 1000});
        return;
    }
    */
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        StatusBarPort.tabChange('output');
        let command = BU.burnCommand;
        let boardType = BU.boardType;
        let ports = Serial.burnPortList;
        if (ports.length === 1) {
            BU.burnWithPort(boardType, ports[0], command);
        } else if (ports.length === 0) {
            layer.msg(indexText['无可用设备'] + '!', {
                time: 1000
            });
        } else {
            let form = layui.form;
            const devNames = $('#mixly-selector-type');
            let oldDevice = $('#mixly-selector-type option:selected').val();
            devNames.empty();
            ports.map(port => {
                if (`${port}` != "undefined") {
                    if (`${port}` == oldDevice) {
                        devNames.append($(`<option value="${port}" selected>${port}</option>`));
                    } else {
                        devNames.append($(`<option value="${port}">${port}</option>`));
                    }
                }
            });
            form.render();

            let initBtnClicked = false;

            layui.use(['layer', 'form'], function () {
                var layer = layui.layer;
                layer.open({
                    type: 1,
                    id: "serialSelect",
                    title: indexText["检测到多个串口，请选择："],
                    area: ['350px', '150px'],
                    content: $('#mixly-selector-div'),
                    shade: Mixly.LayerExtend.shade,
                    closeBtn: 0,
                    success: function (layero) {
                        document.getElementById("serialSelect").style.height = "180px";
                        $(".layui-layer-page").css("z-index", "198910151");
                        $("#mixly-selector-btn1").click(function(){
                            layer.closeAll();
                            layer.msg(indexText['已取消烧录'], { time: 1000 });
                        });
                        $("#mixly-selector-btn2").click(function(){
                            layer.closeAll();
                            initBtnClicked = true;
                        });
                    },
                    end: function () {
                        document.getElementById('mixly-selector-div').style.display = 'none';
                        $(".layui-layer-shade").remove();
                        if (initBtnClicked) {
                            let selectedPort = $('#mixly-selector-type option:selected').val();
                            BU.burnWithPort(boardType, selectedPort, command);
                        }
                    }
                });
            });
        }
    });
}

BU.burnWithPort = (boardType, port, command) => {
    Mixly.StatusBar.show(1);
    Mixly.StatusBar.setValue('');

    layui.use('layer', function () {
        var layer = layui.layer;
        let cancelBtnClicked = false;
        layer.open({
            type: 1,
            title: indexText["烧录中"] + "...",
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index", "198910151");
                Socket.sendCommand({
                    obj: 'BU',
                    function: 'burn',
                    args: [boardType, port, command]
                });
                $("#webusb-cancel").click(function(){
                    layer.closeAll();
                    cancelBtnClicked = true;
                });
            },
            end: function () {
                document.getElementById('mixly-loader-div').style.display = 'none';
                $(".layui-layer-shade").remove();
                if (cancelBtnClicked)
                    Socket.sendCommand({
                        obj: 'BU',
                        function: 'cancel',
                        args: [
                            indexText['已取消烧录']
                        ]
                    });
            }
        });
    });
}

BU.upload = () => {
    /*
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url + '，请在设置中连接', {time: 1000});
        return;
    }
    */
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        StatusBarPort.tabChange('output');
        let boardType = BU.boardType;
        let uploadFilePath = BU.uploadFilePath;
        let copyLib = BU.copyLib;
        if (BU.uploadType === 'ampy') {
            let code = Mixly.Tools.getPy();
            let command = BU.uploadCommand;
            let ports = Serial.uploadPortList;
            if (ports.length === 1) {
                BU.uploadWithPortByAmpy(boardType, ports[0], code, uploadFilePath, copyLib, command);
            } else if (ports.length === 0) {
                layer.msg(indexText['无可用设备'] + '!', {
                    time: 1000
                });
            } else {
                let form = layui.form;
                const devNames = $('#mixly-selector-type');
                let oldDevice = $('#mixly-selector-type option:selected').val();
                devNames.empty();
                ports.map(port => {
                    if (`${port}` != "undefined") {
                        if (`${port}` == oldDevice) {
                            devNames.append($(`<option value="${port}" selected>${port}</option>`));
                        } else {
                            devNames.append($(`<option value="${port}">${port}</option>`));
                        }
                    }
                });
                form.render();

                let initBtnClicked = false;

                layui.use(['layer', 'form'], function () {
                    var layer = layui.layer;
                    layer.open({
                        type: 1,
                        id: "serialSelect",
                        title: indexText["检测到多个串口，请选择："],
                        area: ['350px', '150px'],
                        content: $('#mixly-selector-div'),
                        shade: Mixly.LayerExtend.shade,
                        closeBtn: 0,
                        success: function (layero) {
                            document.getElementById("serialSelect").style.height = "180px";
                            $(".layui-layer-page").css("z-index", "198910151");
                            $("#mixly-selector-btn1").click(function(){
                                layer.closeAll();
                                layer.msg(indexText['已取消上传'], { time: 1000 });
                            });
                            $("#mixly-selector-btn2").click(function(){
                                layer.closeAll();
                                initBtnClicked = true;
                            });
                        },
                        end: function () {
                            document.getElementById('mixly-selector-div').style.display = 'none';
                            $(".layui-layer-shade").remove();
                            if (initBtnClicked) {
                                let selectedPort = $('#mixly-selector-type option:selected').val();
                                BU.uploadWithPortByAmpy(boardType, selectedPort, code, uploadFilePath, copyLib, command);
                            }
                        }
                    });
                });
            }
        } else {
            let uploadFileType = BU.uploadFileType;
            let volumeName = Mixly.Config.BOARD?.upload?.volumeName ?? "CIRCUITPY";
            let code = '';
            if (uploadFileType === 'hex')
                code = Mixly.Tools.getHex();
            else
                code = Mixly.Tools.getPy();
            Socket.sendCommand({
                obj: 'BU',
                function: 'uploadWithVolumeName',
                args: [boardType, volumeName, code, uploadFilePath, copyLib]
            });
        }
    });
}

BU.uploadWithPortByAmpy = (boardType, port, code, uploadFilePath, copyLib, command) => {
    Mixly.StatusBar.show(1);
    Mixly.StatusBar.setValue('');
    layui.use('layer', function () {
        var layer = layui.layer;

        let cancelBtnClicked = false;
        layer.open({
            type: 1,
            title: indexText["上传中"] + "...",
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index", "198910151");
                Socket.sendCommand({
                    obj: 'BU',
                    function: 'uploadByAmpy',
                    args: [boardType, port, code, uploadFilePath, copyLib, command]
                });

                $("#webusb-cancel").click(function(){
                    layer.closeAll();
                    cancelBtnClicked = true;
                });
            },
            end: function () {
                document.getElementById('mixly-loader-div').style.display = 'none';
                $(".layui-layer-shade").remove();
                if (cancelBtnClicked)
                    Socket.sendCommand({
                        obj: 'BU',
                        function: 'cancel',
                        args: [
                            indexText['已取消上传']
                        ]
                    });
            }
        });
    });
}

BU.uploadWithVolumes = (boardType, volumeName, code, uploadFilePath, copyLib) => {
    Mixly.StatusBar.show(1);
    Mixly.StatusBar.setValue('');
    layui.use('layer', function () {
        var layer = layui.layer;

        let cancelBtnClicked = false;
        layer.open({
            type: 1,
            title: indexText["上传中"] + "...",
            content: $('#mixly-loader-div'),
            shade: Mixly.LayerExtend.shade,
            closeBtn: 0,
            success: function () {
                $(".layui-layer-page").css("z-index", "198910151");
                Socket.sendCommand({
                    obj: 'BU',
                    function: 'writeAndCopyFile',
                    args: [boardType, code, uploadFilePath, volumeName, copyLib]
                });

                $("#webusb-cancel").click(function(){
                    layer.closeAll();
                    cancelBtnClicked = true;
                });
            },
            end: function () {
                document.getElementById('mixly-loader-div').style.display = 'none';
                $(".layui-layer-shade").remove();
                if (cancelBtnClicked)
                    Socket.sendCommand({
                        obj: 'ArduShell',
                        function: 'cancel',
                        args: [
                            indexText['已取消上传']
                        ]
                    });
            }
        });
    });
}

BU.showVolumesSelectBox = (boardType, volumeName, code, uploadFilePath, copyLib) => {
    let form = layui.form;
    const devNames = $('#mixly-selector-type');
    let oldDevice = $('#mixly-selector-type option:selected').val();
    devNames.empty();
    volumeName.map(name => {
        if (`${name}` != "undefined") {
            if (`${name}` === oldDevice) {
                devNames.append($(`<option value="${name}" selected>${name}</option>`));
            } else {
                devNames.append($(`<option value="${name}">${name}</option>`));
            }
        }
    });
    form.render();

    let initBtnClicked = false;

    layui.use(['layer', 'form'], function () {
        var layer = layui.layer;
        layer.open({
            type: 1,
            id: "serialSelect",
            title: indexText["检测到多个同类型设备，请选择："],
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: Mixly.LayerExtend.shade,
            closeBtn: 0,
            success: function (layero) {
                document.getElementById("serialSelect").style.height = "180px";
                $(".layui-layer-page").css("z-index", "198910151");
                $("#mixly-selector-btn1").click(function(){
                    layer.closeAll();
                    layer.msg(indexText['已取消上传'], { time: 1000 });
                });
                $("#mixly-selector-btn2").click(function(){
                    layer.closeAll();
                    initBtnClicked = true;
                });
            },
            end: function () {
                document.getElementById('mixly-selector-div').style.display = 'none';
                $(".layui-layer-shade").remove();
                if (initBtnClicked) {
                    let selectedName = $('#mixly-selector-type option:selected').val();
                    BU.uploadWithVolumes(boardType, selectedName, code, uploadFilePath, copyLib);
                }
            }
        });
    });
}

})();