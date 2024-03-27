goog.loadJs('electron', () => {

goog.require('layui');
goog.require('Mixly.Config');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MString');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.BU');

const {
    Electron,
    Config,
    LayerExt,
    Env,
    Boards,
    MFile,
    MString,
    Msg
} = Mixly;

const { BU, Serial } = Electron;
const { BOARD, SELECTED_BOARD, USER } = Config;

var downloadShell = null;

const { form } = layui;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const path = Mixly.require('path');
const lodash_fp = Mixly.require('lodash/fp');
const child_process = Mixly.require('child_process');
const iconv_lite = Mixly.require('iconv-lite');
const os = Mixly.require('os');

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
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
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
            title: Msg.Lang['检测到多个同类型设备，请选择：'],
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: LayerExt.SHADE_ALL,
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
            title: (type === 'burn'? Msg.Lang['烧录中'] : Msg.Lang['上传中']) + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_ALL,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                if (type === 'burn') {
                    BU.copyFiles(type, index, startPath, result[0] + pathAdd + '/');
                } else {
                    fs_extra.outputFile(startPath, MFile.getCode())
                    .then(() => {
                        BU.copyFiles(type, index, startPath, result[0] + pathAdd + '/');
                    })
                    .catch((error) => {
                        layer.close(index);
                        BU.burning = false;
                        BU.uploading = false;
                        layer.msg(Msg.Lang['写文件出错了，错误是：'] + error, {
                            time: 1000
                        });
                        statusBarTerminal.setValue(Msg.Lang['写文件出错了，错误是：'] + error + '\n');
                    });
                }
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

/**
 * @function 将文件或文件夹下所有文件拷贝到指定文件夹
 * @param type {string} 值为'burn' | 'upload'
 * @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
 * @param startPath {string} 需要拷贝的文件或文件夹的路径
 * @param desPath {string} 文件的目的路径
 **/
BU.copyFiles = (type, layerNum, startPath, desPath) => {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const { burn, upload } = SELECTED_BOARD;
    if (type === 'upload' && upload.copyLib) {
        let startLibPath = path.dirname(upload.filePath);
        let pyFileArr = BU.copyLib(startPath, MFile.getCode());
        startPath = path.dirname(startPath);
    }
    // 如果需要拷贝的是文件，则在目的路径后要加上文件名
    if (fs_plus.isFileSync(startPath)) {
        desPath = path.join(desPath, path.basename(startPath));
    }
    fs_extra.copy(startPath, desPath)
    .then(() => {
        layer.close(layerNum);
        const message = (type === 'burn'? Msg.Lang['烧录成功'] : Msg.Lang['上传成功']);
        layer.msg(message, {
            time: 1000
        });
        statusBarTerminal.setValue(`==${message}==`);
        if (type === 'upload' && Serial.uploadPorts.length === 1) {
            if (USER.autoOpenPort === 'no') {
                return;
            }
            Serial.connect(Serial.uploadPorts[0].name, null, (opened) => {
                if (opened) {
                    Serial.writeCtrlD(Serial.uploadPorts[0].name);
                }
            });
        }
    })
    .catch((error) => {
        layer.close(layerNum);
        layer.msg(Msg.Lang['写文件出错了，错误是：'] + error, {
            time: 1000
        });
        statusBarTerminal.setValue(Msg.Lang['写文件出错了，错误是：'] + error + '\n');
        console.log(error);
    })
    .finally(() => {
        BU.burning = false;
        BU.uploading = false;
    });
}

/**
* @function 判断当前环境，以开始一个上传过程
* @param type {string} 值为'burn' | 'upload'
 * @param startPath {string} 需要拷贝的文件或文件夹的路径
* @return {void}
*/
BU.initWithDropdownBox = function (type, startPath) {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const layerNum = layer.open({
        type: 1,
        title: (type === 'burn'? Msg.Lang['烧录中'] : Msg.Lang['上传中']) + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_ALL,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            $(".layui-layer-page").css("z-index","198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(index);
                BU.cancel();
            });
            const desPath = $('#mixly-selector-type option:selected').val();
            if (type === 'burn') {
                BU.copyFiles(type, index, startPath, desPath);
            } else {
                fs_extra.outputFile(startPath, MFile.getCode())
                .then(() => {
                    BU.copyFiles(type, index, startPath, desPath);
                })
                .catch((error) => {
                    layer.close(index);
                    BU.burning = false;
                    BU.uploading = false;
                    layer.msg(Msg.Lang['写文件出错了，错误是：'] + err, {
                        time: 1000
                    });
                    statusBarTerminal.setValue(Msg.Lang['写文件出错了，错误是：'] + error + '\n');
                });
            }
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("#layui-layer-shade" + layerNum).remove();
        }
    });
}

/**
* @function 根据传入的盘符名称获取对应的磁盘名称
* @param type {string} 值为'burn' | 'upload'
* @param volumeName {string} 所要查找盘符的名称
* @param startPath {string} 需要拷贝文件的路径
* @return {void}
*/
BU.getDisksWithVolumesName = function (type, volumeName, startPath) {
    let dirPath = path.dirname(startPath);
    fs_extra.ensureDirSync(dirPath);
    if (Env.currentPlatform === "win32") {
        child_process.exec('wmic logicaldisk where "' + volumeName + '" get DeviceID', function (err, stdout, stderr) {
            if (err || stderr) {
                $('#mixly-loader-div').css('display', 'none');
                console.log("root path open failed" + err + stderr);
                layer.msg(Msg.Lang['无可用设备'], {
                    time: 1000
                });
                BU.burning = false;
                BU.uploading = false;
                return;
            }
            BU.checkNumOfDisks(type, stdout, startPath);
        });
    } else {
        let diskPath = '/Volumes/';
        let addChar = ' ';
        if (Env.currentPlatform === "linux") {
            diskPath = '/media/';
            addChar = '';
        }
        let stdout = '';
        let result = null;
        result = volumeName.split('/');
        let deviceNum = 0;
        for (var i = 0; i < result.length; i++) {
            if (result[i] === '') continue;
            for (var j = 0; ; j++) {
                if (fs_plus.isDirectorySync(diskPath + result[i] + (j == 0 ? '' : (addChar + j)))) {
                    stdout += diskPath + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                    deviceNum++;
                } else if (fs_plus.isDirectorySync(diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)))) {
                    stdout += diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                    deviceNum++;
                } else {
                    break;
                }
            }
        }
        if (deviceNum === 0) {
            layer.msg(Msg.Lang['无可用设备'], {
                time: 1000
            });
            BU.burning = false;
            BU.uploading = false;
            return;
        }
        BU.checkNumOfDisks(type, stdout, startPath);
    }
}

/**
* @function 取消烧录或上传
* @return {void}
*/
BU.cancel = function () {
    if (BU.shell) {
        BU.shell.stdout.end();
        BU.shell.stdin.end();
        if (Env.currentPlatform === 'win32') {
            child_process.exec('taskkill /pid ' + BU.shell.pid + ' /f /t');
        } else {
            BU.shell.kill("SIGTERM");
        }
        BU.shell = null;
    } else {
        if (BU.uploading) {
            BU.uploading = false;
            layer.msg(Msg.Lang['已取消上传'], {
                time: 1000
            });
        } else if (BU.burning) {
            BU.burning = false;
            layer.msg(Msg.Lang['已取消烧录'], {
                time: 1000
            });
        }
    }
}

/**
* @function 开始一个烧录过程
* @return {void}
*/
BU.initBurn = function () {
    if (BU.burning) return;
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const { burn } = SELECTED_BOARD;
    statusBarTerminal.setValue('');
    mainStatusBarTab.changeTo("output");
    mainStatusBarTab.show();
    BU.burning = true;
    BU.uploading = false;
    if (burn.type === 'volume') {
        BU.getDisksWithVolumesName('burn', burn.volume, burn.filePath);
    } else {
        const port = Serial.getSelectedPortName();
        BU.burnWithPort(port, burn.command);
    }
}

/**
* @function 开始一个上传过程
* @return {void}
*/
BU.initUpload = function () {
    if (BU.uploading) return;
    const { upload } = SELECTED_BOARD;
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    statusBarTerminal.setValue('');
    mainStatusBarTab.changeTo('output');
    mainStatusBarTab.show();
    BU.burning = false;
    BU.uploading = true;
    if (upload.type === "volume") {
        BU.getDisksWithVolumesName('upload', upload.volume, upload.filePath);
    } else {
        const port = Serial.getSelectedPortName();
        BU.uploadWithPort(port, upload.command);
    }
}

/**
 * @function 递归代码找出import项并拷贝对应库文件到filePath所在目录
 * @param filePath {string} 主代码文件所在路径
 * @param code {string} 主代码数据
 * @return {array} 库列表
 **/
BU.copyLib = function (filePath, code) {
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const { upload } = SELECTED_BOARD;
    fs_extra.ensureDirSync(dirPath);
    try {
        const libFiles = fs.readdirSync(dirPath);
        for (let value of libFiles) {
            if (value !== fileName) {
                fs.unlinkSync(path.join(dirPath, value));
            }
        }
    } catch (e) {
        console.log(e);
    }
    var pyFileArr = [];
    const thirdPartyPath = path.join(Env.boardDirPath, 'libraries/ThirdParty');
    let libsPathArr = [];
    if (fs_plus.isDirectorySync(thirdPartyPath)) {
        const names = fs.readdirSync(thirdPartyPath);
        for (let name of names) {
            const libPath = path.join(thirdPartyPath, name, 'libraries');
            if (fs_plus.isDirectorySync(libPath)) {
                libsPathArr.push(libPath);
            }
        }
    }
    if (upload?.libPath instanceof Array) {
        libsPathArr = [...libsPathArr, ...upload.libPath];
    }
    pyFileArr = BU.searchLibs(dirPath, code, pyFileArr, libsPathArr);
    return pyFileArr;
}

/**
 * @function 获取当前代码数据中所使用的库并检测此文件是否在库目录下存在，
 *           若存在则拷贝到主文件所在目录
 * @param dirPath {string} 主代码文件所在目录的路径
 * @param code {string} 主代码数据
 * @param libArr {array} 当前已查找出的库列表
 * @param libsPathArr {array} 需要搜索的库路径
 * @return {array} 库列表
 **/
BU.searchLibs = function (dirPath, code, libArr, libsPathArr) {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    let arrayObj = new Array();
    code.trim().split("\n").forEach(function (v, i) {
        arrayObj.push(v);
    });
    let moduleName = "";
    let pyFileArr = [];
    for (let i = 0; i < arrayObj.length; i++) {
        let fromLoc = arrayObj[i].indexOf("from");
        let importLoc = arrayObj[i].indexOf("import");
        const str = arrayObj[i].substring(0, (fromLoc === -1)? importLoc : fromLoc);
        str.split('').forEach((ch) => {
            if (ch !== ' ' && ch !== '\t') {
                fromLoc = -1;
                importLoc = -1;
                return;
            }
        });
        if (fromLoc !== -1) {
            moduleName = arrayObj[i].substring(fromLoc + 4, arrayObj[i].indexOf("import"));
        } else if (importLoc !== -1) {
            let endPos = arrayObj[i].indexOf("as");
            if (endPos === -1) {
                endPos = arrayObj[i].length;
            }
            moduleName = arrayObj[i].substring(importLoc + 6, endPos);
        } else {
            continue;
        }
        moduleName = moduleName.replaceAll(' ', '');
        moduleName = moduleName.replaceAll('\r', '');
        let moduleArr = moduleName.split(",");
        for (let j = 0; j < moduleArr.length; j++) {
            if (!libArr.includes(moduleArr[j] + '.py') && !libArr.includes(moduleArr[j] + '.mpy')) {
                try {
                    let oldLibPath = null;
                    for (let nowDirPath of libsPathArr) {
                        const nowMpyFilePath = path.join(nowDirPath, moduleArr[j] + '.mpy');
                        const nowPyFilePath = path.join(nowDirPath, moduleArr[j] + '.py');
                        if (fs_plus.isFileSync(nowMpyFilePath)) {
                            oldLibPath = nowMpyFilePath;
                            break;
                        } else if (fs_plus.isFileSync(nowPyFilePath)) {
                            oldLibPath = nowPyFilePath;
                        }
                    }
                    if (oldLibPath) {
                        const extname = path.extname(oldLibPath);
                        const newLibPath = path.join(dirPath, moduleArr[j] + extname);
                        statusBarTerminal.addValue(Msg.Lang['拷贝库'] + ' ' + moduleArr[j] + '\n');
                        fs.copyFileSync(oldLibPath, newLibPath);
                        libArr.push(moduleArr[j] + extname);
                        if (extname === '.py') {
                            pyFileArr.push(moduleArr[j] + extname);
                            code = fs.readFileSync(oldLibPath, 'utf8');
                            libArr = BU.searchLibs(dirPath, code, libArr, libsPathArr);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    return libArr;
}

/**
* @function 通过cmd烧录
 * @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.burnByCmd = function (layerNum, port, command) {
    BU.runCmd(layerNum, 'burn', port, command);
}

/**
* @function 通过cmd上传
* @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.uploadByCmd = async function (layerNum, port, command) {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const { upload } = SELECTED_BOARD;
    const code = MFile.getCode();
    if (upload.copyLib) {
        BU.copyLib(upload.filePath, code);
    }

    fs_extra.outputFile(upload.filePath, code)
    .then(() => {
        statusBarTerminal.addValue(Msg.Lang['上传中'] + '...\n');
        BU.runCmd(layerNum, 'upload', port, command);
    })
    .catch((error) => {
        statusBarTerminal.setValue(error.toString() + '\n');
        console.log(error);
        layer.close(layerNum);
        BU.uploading = false;
    });
}

/**
* @function 运行cmd
* @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param type {string} 值为 'burn' | 'upload'
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @param sucFunc {function} 指令成功执行后所要执行的操作
* @return {void}
*/
BU.runCmd = function (layerNum, type, port, command, sucFunc) {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    let nowCommand = MString.tpl(command, { com: port });

    BU.shell = child_process.exec(nowCommand, { encoding: 'binary' }, function (error, stdout, stderr) {
        layer.close(layerNum);
        BU.burning = false;
        BU.uploading = false;
        BU.shell = null;
        const text = statusBarTerminal.getValue();
        if (text.lastIndexOf('\n') !== text.length - 1) {
            statusBarTerminal.addValue('\n');
        }
        if (error) {
            if (Env.currentPlatform === 'win32') {
                error = iconv_lite.decode(Buffer.from(error.message, 'binary'), 'cp936');
            } else {
                let lines = error.message.split('\n');
                for (let i in lines) {
                    if (lines[i].indexOf('Command failed') !== -1) {
                        continue;
                    }
                    lines[i] = iconv_lite.decode(Buffer.from(lines[i], 'binary'), 'utf-8');
                }
                error = lines.join('\n');
            }
            error = MString.decode(error);
            statusBarTerminal.addValue(error);
            statusBarTerminal.addValue('==' + (type === 'burn' ? Msg.Lang['烧录失败'] : Msg.Lang['上传失败']) + '==\n');
        } else {
            layer.msg((type === 'burn' ? Msg.Lang['烧录成功'] : Msg.Lang['上传成功']), {
                time: 1000
            });
            statusBarTerminal.addValue('==' + (type === 'burn' ? Msg.Lang['烧录成功'] : Msg.Lang['上传成功']) + '==\n');
            if (type === 'upload') {
                mainStatusBarTab.show();
                if (USER.autoOpenPort === 'no') {
                    return;
                }
                Serial.connect(port, null, (opened) => {
                    if (!opened) {
                        return;
                    }
                    setTimeout(() => {
                        Serial.clearContent(port);
                        Serial.writeCtrlD(port);
                    }, 1000);
                });
            }
        }
    })

    BU.shell.stdout.on('data', function (data) {
        if (BU.uploading || BU.burning) {
            data = iconv_lite.decode(Buffer.from(data, 'binary'), 'utf-8');
            data = MString.decode(data);
            statusBarTerminal.addValue(data);
        }
    });
}

/**
 * @function 特殊固件的烧录
 * @return {void}
 **/
BU.burnWithSpecialBin = () => {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const $selector = $('#mixly-selector-type');
    let oldOption = $('#mixly-selector-type option:selected').val();
    $selector.empty();
    const firmwareList = SELECTED_BOARD.burn.special;
    let firmwareObj = {};
    for (let firmware of firmwareList) {
        if (!firmware?.name && !firmware?.command) return;
        firmwareObj[firmware.name] = firmware.command;
        if (`${firmware.name}` == oldOption) {
            $selector.append($(`<option value="${firmware.name}" selected>${firmware.name}</option>`));
        } else {
            $selector.append($(`<option value="${firmware.name}">${firmware.name}</option>`));
        }
    }
    form.render();

    let initBtnClicked = false;

    const layerNum = layer.open({
        type: 1,
        id: "serial-select",
        title: "请选择固件：",
        area: ['350px', '150px'],
        content: $('#mixly-selector-div'),
        shade: Mixly.LayerExt.SHADE_ALL,
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
                statusBarTerminal.setValue('');
                mainStatusBarTab.changeTo('output');
                mainStatusBarTab.show();
                BU.burning = true;
                BU.uploading = false;
                const port = Serial.getSelectedPortName();
                BU.burnWithPort(port, firmwareObj[selectedFirmwareName]);
            } else {
                layer.msg(Msg.Lang['已取消烧录'], { time: 1000 });
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
        layer.msg(Msg.Lang['无可用设备'], {
            time: 1000
        });
        BU.burning = false;
        BU.uploading = false;
        return;
    }
    const title = (type === 'burn' ? Msg.Lang['烧录中'] : Msg.Lang['上传中']) + '...';
    const operate = () => {
        const layerNum = layer.open({
            type: 1,
            title,
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
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
                            layer.title(Msg.Lang['烧录终止中'] + '...', index);
                            break;
                        case 'upload':
                        default:
                            layer.title(Msg.Lang['上传终止中'] + '...', index);
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
    Serial.portClose(port, operate);
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

});