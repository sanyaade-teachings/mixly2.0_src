(() => {

goog.require('layui');
goog.require('Mixly.Config');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MString');
goog.require('Mixly.WebSocket.Serial');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.WebSocket.BU');

const {
    Config,
    StatusBar,
    StatusBarPort,
    LayerExtend,
    Env,
    Boards,
    MFile,
    MString
} = Mixly;

const { BU, Serial, Socket } = Mixly.WebSocket;
const { BOARD, SELECTED_BOARD } = Config;

const { form } = layui;

BU.uploading = false;

BU.burning = false;

BU.shell = null;

/**
 * @function 根据传入的stdout判断磁盘数量并选择对应操作
 * @param type {string} 值为'burn' | 'upload'
 * @param stdout {string} 磁盘名称字符串，形如'G:K:F:'
 * @param startPath {string} 需要拷贝的文件路径
 * @return {void}
 **/
BU.checkNumOfDisks = function (type, stdout, startPath) {
    let wmicResult = stdout;
    wmicResult = wmicResult.replace(/\s+/g, "");
    wmicResult = wmicResult.replace("DeviceID", "");
    // wmicResult = 'G:K:F:';
    let result = wmicResult.split(':');
    let pathAdd = (Env.currentPlatform === "win32") ? ':' : '';
    if (stdout.indexOf(":") != stdout.lastIndexOf(":")) {
        let form = layui.form;
        let devicesName = $('#mixly-selector-type');
        let oldDevice = $('#mixly-selector-type option:selected').val();
        devicesName.empty();
        for (let i = 0; i < result.length; i++) {
            if (result[i]) {
                if (oldDevice == result[i] + pathAdd) {
                    devicesName.append('<option value="' + result[i] + pathAdd + '" selected>' + result[i] + pathAdd + '</option>');
                } else {
                    devicesName.append('<option value="' + result[i] + pathAdd + '">' + result[i] + pathAdd + '</option>');
                }
            }
        }
        form.render();
        let initBtnClicked = false;
        const layerNum = layer.open({
            type: 1,
            id: "serial-select",
            title: indexText['检测到多个同类型设备，请选择：'],
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: LayerExtend.shade,
            resize: false,
            closeBtn: 0,
            success: function (layero) {
                $('#serial-select').css('height', '195px');
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-selector-btn1").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
                $("#mixly-selector-btn2").off("click").click(() => {
                    layer.close(layerNum);
                    initBtnClicked = true;
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                if (initBtnClicked) {
                    BU.initWithDropdownBox(type, startPath);
                }
                $("#mixly-selector-btn1").off("click");
                $("#mixly-selector-btn2").off("click");
            }
        });
    } else {
        const layerNum = layer.open({
            type: 1,
            title: (type === 'burn'? indexText['烧录中'] : indexText['上传中']) + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExtend.shadeWithHeight,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                BU.copyFiles(type, index, startPath, result[0] + pathAdd + '/');
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(index);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
            }
        });
    }
}

BU.copyFiles = (type, layerNum, startPath, desPath) => {
    const code = MFile.getCode();
    const {
        copyLib = false,
        libPath = []
    } = SELECTED_BOARD.upload;
    Socket.sendCommand({
        obj: 'BU',
        func: 'copyFiles',
        args: [ type, layerNum, startPath, desPath, code, copyLib, libPath ]
    });
}

BU.operateSuccess = (type, layerNum, port) => {
    layer.close(layerNum);
    const message = (type === 'burn'? indexText['烧录成功'] : indexText['上传成功']);
    layer.msg(message + '!', {
        time: 1000
    });
    const value = StatusBar.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    StatusBar.addValue(prefix + `==${message}==\n`, true);
    if (type === 'upload' && (Serial.uploadPorts.length === 1 || port)) {
        Serial.connect(port ?? Serial.uploadPorts[0].name, null);
    }
    BU.burning = false;
    BU.uploading = false;
}

BU.operateError = (type, layerNum, error) => {
    layer.close(layerNum);
    const value = StatusBar.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    StatusBar.addValue(prefix + error + '\n', true);
    console.log(error);
    BU.burning = false;
    BU.uploading = false;
}

BU.noDevice = () => {
    layer.msg(indexText['无可用设备'] + '!', {
        time: 1000
    });
    BU.burning = false;
    BU.uploading = false;
}

/**
* @function 判断当前环境，以开始一个上传过程
* @param type {string} 值为'burn' | 'upload'
 * @param startPath {string} 需要拷贝的文件或文件夹的路径
* @return {void}
*/
BU.initWithDropdownBox = function (type, startPath) {
    const layerNum = layer.open({
        type: 1,
        title: (type === 'burn'? indexText['烧录中'] : indexText['上传中']) + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExtend.shadeWithHeight,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            $(".layui-layer-page").css("z-index","198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(index);
                BU.cancel();
            });
            const desPath = $('#mixly-selector-type option:selected').val();
            BU.copyFiles(type, index, startPath, desPath);
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("#layui-layer-shade" + layerNum).remove();
        }
    });
}

/**
* @function 取消烧录或上传
* @return {void}
*/
BU.cancel = function () {
    Socket.sendCommand({
        obj: 'BU',
        func: 'cancel',
        args: []
    });
    if (BU.uploading) {
        BU.uploading = false;
        layer.msg(indexText['已取消上传'], {
            time: 1000
        });
    } else if (BU.burning) {
        BU.burning = false;
        layer.msg(indexText['已取消烧录'], {
            time: 1000
        });
    }
}

/**
* @function 开始一个烧录过程
* @return {void}
*/
BU.initBurn = function () {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        if (BU.burning) return;
        const { burn } = SELECTED_BOARD;
        StatusBar.setValue('', true);
        StatusBarPort.tabChange("output");
        StatusBar.show(1);
        BU.burning = true;
        BU.uploading = false;
        if (burn.type === 'volume') {
            Socket.sendCommand({
                obj: 'BU',
                func: 'getDisksWithVolumesName',
                args: [ 'burn', burn.volume, burn.filePath ]
            });
        } else {
            const port = Serial.getSelectedPortName();
            BU.burnWithPort(port, burn.command);
        }
    });
}

/**
* @function 开始一个上传过程
* @return {void}
*/
BU.initUpload = function () {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        if (BU.uploading) return;
        const { upload } = SELECTED_BOARD;
        StatusBar.setValue('', true);
        StatusBarPort.tabChange("output");
        StatusBar.show(1);
        BU.burning = false;
        BU.uploading = true;
        if (upload.type === "volume") {
            Socket.sendCommand({
                obj: 'BU',
                func: 'getDisksWithVolumesName',
                args: [ 'upload', upload.volume, upload.filePath ]
            });
        } else {
            const port = Serial.getSelectedPortName();
            BU.uploadWithPort(port, upload.command);
        }
    });
}

/**
* @function 通过cmd烧录
 * @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.burnByCmd = function (layerNum, port, command) {
    const newCommand = MString.tpl(command, { com: port });
    Socket.sendCommand({
        obj: 'BU',
        func: 'burnByCmd',
        args: [ layerNum, port, newCommand ]
    });
}

/**
* @function 通过cmd上传
* @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.uploadByCmd = function (layerNum, port, command) {
    const newCommand = MString.tpl(command, { com: port });
    const { upload } = SELECTED_BOARD;
    const {
        filePath,
        copyLib = false,
        libPath = []
    } = upload;
    const code = MFile.getCode();
    StatusBar.addValue(indexText['上传中'] + '...\n', true);
    Socket.sendCommand({
        obj: 'BU',
        func: 'uploadByCmd',
        args: [ layerNum, port, newCommand, code, filePath, copyLib, libPath ]
    });
}

/**
 * @function 特殊固件的烧录
 * @return {void}
 **/
BU.burnWithSpecialBin = () => {
    const devNames = $('#mixly-selector-type');
    let oldDevice = $('#mixly-selector-type option:selected').val();
    devNames.empty();
    let firmwareList = BOARD.burn.special;
    let firmwareObj = {};
    for (let i = 0; i < firmwareList.length; i++)
        firmwareObj[firmwareList[i].name] = firmwareList[i].command;
    firmwareList.map(firmware => {
        if (!firmware?.name && !firmware?.command) return;

        if (`${firmware.name}` == oldDevice) {
            devNames.append($(`<option value="${firmware.name}" selected>${firmware.name}</option>`));
        } else {
            devNames.append($(`<option value="${firmware.name}">${firmware.name}</option>`));
        }
    });
    form.render();

    let initBtnClicked = false;

    const layerNum = layer.open({
        type: 1,
        id: "serial-select",
        title: "请选择固件：",
        area: ['350px', '150px'],
        content: $('#mixly-selector-div'),
        shade: Mixly.LayerExtend.shade,
        resize: false,
        closeBtn: 0,
        success: function (layero) {
            $('#serial-select').css('height', '180px');
            $('#serial-select').css('overflow', 'inherit');
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-selector-btn1").off("click").click(() => {
                layer.close(layerNum);
            });
            $("#mixly-selector-btn2").click(() => {
                layer.close(layerNum);
                initBtnClicked = true;
            });
        },
        end: function () {
            $("#mixly-selector-btn1").off("click");
            $("#mixly-selector-btn2").off("click");
            $('#mixly-selector-div').css('display', 'none');
            $(".layui-layer-shade").remove();
            if (initBtnClicked) {
                let selectedFirmwareName = $('#mixly-selector-type option:selected').val();
                try {
                    firmwareObj[selectedFirmwareName] = firmwareObj[selectedFirmwareName].replace(/\\/g, "/");
                } catch (e) {
                    console.log(e);
                }
                let pyToolName = ["esptool", "kflash", "stm32loader", "stm32bl"];
                let pyToolPath = "{path}/mixpyBuild/win_python3/Lib/site-packages/"
                if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
                    pyToolPath = "{path}/pyTools/";
                }
                for (let i = 0; i < pyToolName.length; i++) {
                    if (firmwareObj[selectedFirmwareName].indexOf("\"") != -1) {
                        firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.python3Path + "\" \"" + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
                    } else {
                        firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.python3Path + " " + pyToolPath + pyToolName[i] + ".py", pyToolName[i]);
                    }
                }
                firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.clientPath, "path");
                firmwareObj[selectedFirmwareName] = replaceWithReg(firmwareObj[selectedFirmwareName], Env.indexPath, "indexPath");
                StatusBar.setValue('', true);
                StatusBarPort.tabChange("output");
                StatusBar.show(1);
                BU.burning = true;
                BU.uploading = false;
                const port = Serial.getSelectedPortName();
                BU.burnWithPort(port, firmwareObj[selectedFirmwareName]);
            } else {
                layer.msg(indexText['已取消烧录'], { time: 1000 });
            }
        }
    });
}

/**
 * @function 通过串口执行命令行烧录或上传操作
 * @param type {string} 值为 'burn' | 'upload'
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.operateWithPort = (type, port, command) => {
    if (!port) {
        layer.msg(indexText['无可用设备'] + '!', {
            time: 1000
        });
        BU.burning = false;
        BU.uploading = false;
        return;
    }
    const title = (type === 'burn' ? indexText['烧录中'] : indexText['上传中']) + '...';
    const operate = () => {
        const layerNum = layer.open({
            type: 1,
            title,
            content: $('#mixly-loader-div'),
            shade: LayerExtend.shadeWithHeight,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                $(".layui-layer-page").css("z-index","198910151");
                switch (type) {
                    case 'burn':
                        BU.burnByCmd(index, port, command);
                        break;
                    case 'upload':
                    default:
                        BU.uploadByCmd(index, port, command);
                }
                $("#mixly-loader-btn").off("click").click(() => {
                    $("#mixly-loader-btn").css('display', 'none');
                    switch (type) {
                        case 'burn':
                            layer.title(indexText['烧录终止中'] + '...', index);
                            break;
                        case 'upload':
                        default:
                            layer.title(indexText['上传终止中'] + '...', index);
                    }
                    BU.cancel(type);
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
    operate();
}

/**
 * @function 通过串口执行命令行烧录操作
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.burnWithPort = (port, command) => {
    BU.operateWithPort('burn', port, command);
}

/**
 * @function 通过串口执行命令行上传操作
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.uploadWithPort = (port, command) => {
    BU.operateWithPort('upload', port, command);
}

})();