goog.provide('Mixly.WebSocket.BU');

goog.require('Mixly.Tools');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');

MixlySocketBU.boardType = Mixly.Tools.getBoardType();

MixlySocketBU.burnCommand = Mixly.Config.BOARD?.burn?.command ?? null;

MixlySocketBU.uploadCommand = Mixly.Config.BOARD?.upload?.command ?? null;

MixlySocketBU.uploadType = Mixly.Config.BOARD?.upload?.type ?? 'ampy';

MixlySocketBU.uploadFilePath = Mixly.Config.BOARD?.upload?.filePath ?? '{indexPath}/build/upload/main.py';

MixlySocketBU.copyLib = Mixly.Config.BOARD?.upload?.copyLib ?? true;

if (MixlySocketBU.uploadFilePath.toLowerCase().indexOf(".py") != -1)
    MixlySocketBU.uploadFileType = "py";
else
    MixlySocketBU.uploadFileType = "hex";

MixlySocketBU.burn = () => {
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
        Mixly.StatusBarPort.tabChange('output');
        let command = MixlySocketBU.burnCommand;
        let boardType = MixlySocketBU.boardType;
        let ports = Mixly.WebSocket.Serial.burnPortList;
        if (ports.length === 1) {
            MixlySocketBU.burnWithPort(boardType, ports[0], command);
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
                            MixlySocketBU.burnWithPort(boardType, selectedPort, command);
                        }
                    }
                });
            });
        }
    });
}

MixlySocketBU.burnWithPort = (boardType, port, command) => {
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
                Mixly.WebSocket.Socket.sendCommand({
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
                    Mixly.WebSocket.Socket.sendCommand({
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

MixlySocketBU.upload = () => {
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
        Mixly.StatusBarPort.tabChange('output');
        let boardType = MixlySocketBU.boardType;
        let uploadFilePath = MixlySocketBU.uploadFilePath;
        let copyLib = MixlySocketBU.copyLib;
        if (MixlySocketBU.uploadType === 'ampy') {
            let code = Mixly.Tools.getPy();
            let command = MixlySocketBU.uploadCommand;
            let ports = Mixly.WebSocket.Serial.uploadPortList;
            if (ports.length === 1) {
                MixlySocketBU.uploadWithPortByAmpy(boardType, ports[0], code, uploadFilePath, copyLib, command);
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
                                MixlySocketBU.uploadWithPortByAmpy(boardType, selectedPort, code, uploadFilePath, copyLib, command);
                            }
                        }
                    });
                });
            }
        } else {
            let uploadFileType = MixlySocketBU.uploadFileType;
            let volumeName = Mixly.Config.BOARD?.upload?.volumeName ?? "CIRCUITPY";
            let code = '';
            if (uploadFileType === 'hex')
                code = Mixly.Tools.getHex();
            else
                code = Mixly.Tools.getPy();
            Mixly.WebSocket.Socket.sendCommand({
                obj: 'BU',
                function: 'uploadWithVolumeName',
                args: [boardType, volumeName, code, uploadFilePath, copyLib]
            });
        }
    });
}

MixlySocketBU.uploadWithPortByAmpy = (boardType, port, code, uploadFilePath, copyLib, command) => {
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
                Mixly.WebSocket.Socket.sendCommand({
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
                    Mixly.WebSocket.Socket.sendCommand({
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

MixlySocketBU.uploadWithVolumes = (boardType, volumeName, code, uploadFilePath, copyLib) => {
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
                Mixly.WebSocket.Socket.sendCommand({
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
                    Mixly.WebSocket.Socket.sendCommand({
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

MixlySocketBU.showVolumesSelectBox = (boardType, volumeName, code, uploadFilePath, copyLib) => {
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
                    MixlySocketBU.uploadWithVolumes(boardType, selectedName, code, uploadFilePath, copyLib);
                }
            }
        });
    });
}