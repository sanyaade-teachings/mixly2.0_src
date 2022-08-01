goog.provide('Mixly.WebSocket.ArduShell');

goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.WebSocket.Serial');

Mixly.WebSocket.ArduShell.compile = () => {
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
        Mixly.StatusBar.show(1);
        Mixly.StatusBar.setValue('');
        let code = "";
        if (document.getElementById('tab_arduino').className == 'tabon') {
            code = editor.getValue();
        } else {
            code = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace) || '';
        }
        let boardType = $('#boards-type option:selected').val();
        let command = {
            obj: 'ArduShell',
            function: 'compile',
            args: [
                boardType,
                code
            ]
        }

        function init() {
            layui.use('layer', function () {
                var layer = layui.layer;

                let cancelBtnClicked = false;
                layer.open({
                    type: 1,
                    title: indexText["编译中"] + "...",
                    content: $('#mixly-loader-div'),
                    shade: Mixly.LayerExtend.shade,
                    closeBtn: 0,
                    success: function () {
                        $(".layui-layer-page").css("z-index", "198910151");
                        Mixly.WebSocket.Socket.sendCommand(command);
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
                                    indexText['已取消编译']
                                ]
                            });
                    }
                });
            });
        }

        init();
    });
}

Mixly.WebSocket.ArduShell.upload = () => {
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
        let ports = Mixly.WebSocket.Serial.uploadPortList;
        let code = "";
        if (document.getElementById('tab_arduino').className == 'tabon') {
            code = editor.getValue();
        } else {
            code = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace) || '';
        }
        let boardType = $('#boards-type option:selected').val();
        if (ports.length === 1) {
            Mixly.WebSocket.ArduShell.uploadWithPort(boardType, ports[0], code);
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
                            Mixly.WebSocket.ArduShell.uploadWithPort(boardType, selectedPort, code);
                        }
                    }
                });
            });
        }
    });
}

Mixly.WebSocket.ArduShell.uploadWithPort = (boardType, port, code) => {
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
                    obj: 'ArduShell',
                    function: 'upload',
                    args: [
                        boardType,
                        port,
                        code
                    ]
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