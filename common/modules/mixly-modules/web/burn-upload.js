goog.loadJs('web', () => {

goog.require('AvrUploader');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.require('Mixly.Msg');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Esptool');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.SerialPort');
goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.BU');

const {
    Env,
    Web,
    LayerExt,
    Config,
    MFile,
    Boards,
    Msg
} = Mixly;

const {
    Serial,
    Esptool,
    BU,
    USB,
    SerialPort,
    Ampy
} = Web;

const { BOARD, SELECTED_BOARD } = Config;

BU.uploading = false;
BU.burning = false;

let stubLoader = null;
const espTool = new Esptool.EspLoader({
    updateProgress: false,
    logMsg: false,
    debugMsg: false,
    debug: false
});

BU.clickConnect = async function () {
    let portName = `web-${SELECTED_BOARD.web.com ?? 'serial'}`;
    if (!navigator.serial || !navigator.usb) {
        portName = 'web-bluetooth';
    }
    const portObj = Serial.portsOperator[portName];
    if (portObj && portObj.portOpened) {
        Serial.portClose(portName);
    } else {
        Serial.connect(portName, 115200, (port) => {
            const { mainStatusBarTab } = Mixly;
            const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
            if (port) {
                mainStatusBarTab.show();
            } else {
                layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
            }
        });
    }
}

function base64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const readUploadedFileAsArrayBuffer = (inputFile) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(inputFile);
    });
};

const readBinFile = (path, offset) => {
    return new Promise((resolve, reject) => {
        fetch(path)
        .then((response) => {
            return response.blob();
        })
        .then(data => {
            resolve({
                offset: offset,
                blob: data
            });
        })
        .catch((error) => {
            resolve({
                offset: offset,
                blob: null
            });
        });
    });
}

BU.initBurn = () => {
    if (SELECTED_BOARD.web.com === 'usb') {
        BU.burnByUSB();
    } else {
        BU.burnWithEsptool();
    }
}

BU.burnByUSB = () => {
    const portName = 'web-usb';
    Serial.connect(portName, 115200, async (port) => {
        if (!port) {
            layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
            return;
        }
        let portObj = Serial.portsOperator[portName];
        const { toolConfig, serialport } = portObj;
        const prevBaud = toolConfig.baudRates;
        if (prevBaud !== 115200) {
            toolConfig.baudRates = 115200;
            await serialport.setBaudRate(toolConfig.baudRates);
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        const hexStr = goog.get(path.join(Env.boardDirPath, burn.filePath));
        const hex2Blob = new Blob([ hexStr ], { type: 'text/plain' });
        const buffer = await hex2Blob.arrayBuffer();
        if (!buffer) {
            layer.msg(Msg.Lang['固件读取出错'], { time: 1000 });
            return;
        }
        BU.burning = true;
        BU.uploading = false;
        const { mainStatusBarTab } = Mixly;
        const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
        statusBarTerminal.setValue(Msg.Lang['烧录中'] + '...\n');
        mainStatusBarTab.show();
        mainStatusBarTab.changeTo('output');
        const layerNum = layer.open({
            type: 1,
            title: Msg.Lang['烧录中'] + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-loader-btn").hide();
                let prevPercent = 0;
                USB.DAPLink.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
                    const nowPercent = Math.floor(progress * 100);
                    if (nowPercent > prevPercent) {
                        prevPercent = nowPercent;
                    } else {
                        return;
                    }
                    const nowProgressLen = Math.floor(nowPercent / 2);
                    const leftStr = new Array(nowProgressLen).fill('=').join('');
                    const rightStr = (new Array(50 - nowProgressLen).fill('-')).join('');
                    statusBarTerminal.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`);
                });
                USB.flash(buffer)
                .then(() => {
                    layer.close(index);
                    layer.msg(Msg.Lang['烧录成功'], { time: 1000 });
                    statusBarTerminal.addValue(`==${Msg.Lang['烧录成功']}==\n`);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    statusBarTerminal.addValue(`==${Msg.Lang['烧录失败']}==\n`);
                })
                .finally(async () => {
                    BU.burning = false;
                    BU.uploading = false;
                    if (toolConfig.baudRates !== prevBaud) {
                        toolConfig.baudRates = prevBaud;
                        await serialport.setBaudRate(prevBaud);
                    }
                    USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_PROGRESS);
                });
            },
            end: function () {
                $("#mixly-loader-btn").css('display', 'inline-block');
                $('#mixly-loader-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
            }
        });
    });
}

BU.burnWithEsptool = () => {
    const portName = 'web-serial';
    Serial.connect(portName, 115200, async (port) => {
        if (!port) {
            layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
            return;
        }
        let portObj = Serial.portsOperator[portName];
        const { toolConfig, serialport } = portObj;
        const prevBaud = toolConfig.baudRates;
        if (prevBaud !== 115200) {
            toolConfig.baudRates = 115200;
            await serialport.setBaudRate(toolConfig.baudRates);
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        const { mainStatusBarTab } = Mixly;
        const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
        statusBarTerminal.setValue(Msg.Lang["固件读取中"] + "...");
        if (typeof burn.binFile !== 'object') {
            statusBarTerminal.addValue(" Failed!\n" + Msg.Lang["配置文件读取出错"] + "！\n");
            // await endBurn(true, false);
            return;
        }
        const { binFile } = burn;
        let firmwarePromise = [];
        statusBarTerminal.addValue("\n");
        for (let i of binFile) {
            if (i.path && i.offset) {
                let absolutePath = path.join(Env.boardDirPath, i.path);
                statusBarTerminal.addValue(`${Msg.Lang['读取固件'] + ' '
                    + Msg.Lang['路径']}:${absolutePath}, ${Msg.Lang['偏移']}:${i.offset}\n`);
                firmwarePromise.push(readBinFile(absolutePath, i.offset));
            }
        }
        Promise.all(firmwarePromise)
        .then(async data => {
            console.log(data)
            let newFilmwareList = [];
            for (let i of data) {
                if (i.blob && i.offset) {
                    newFilmwareList.push({
                        offset: i.offset,
                        binBuf: await readUploadedFileAsArrayBuffer(i.blob)
                    });
                }
            }
            if (!newFilmwareList.length) {
                throw '';
            }
            statusBarTerminal.addValue("Done!\n" + Msg.Lang["即将开始烧录"] + "...\n");
            BU.burning = true;
            BU.uploading = false;
            statusBarTerminal.addValue(Msg.Lang['烧录中'] + '...\n');
            mainStatusBarTab.show();
            mainStatusBarTab.changeTo('output');
            const layerNum = layer.open({
                type: 1,
                title: Msg.Lang['烧录中'] + '...',
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_NAV,
                resize: false,
                closeBtn: 0,
                success: async function (layero, index) {
                    $(".layui-layer-page").css("z-index","198910151");
                    $("#mixly-loader-btn").hide();
                    try {
                        SerialPort.refreshOutputBuffer = false;
                        SerialPort.refreshInputBuffer = true;
                        await espTool.reset();
                        if (await clickSync()) {
                            if (burn.erase) {
                                await clickErase();
                            }
                            for (let i of newFilmwareList) {
                                await clickProgram(i.offset, i.binBuf);
                            }
                        }
                        layer.close(index);
                        layer.msg(Msg.Lang['烧录成功'], { time: 1000 });
                        statusBarTerminal.addValue(`==${Msg.Lang['烧录成功']}==\n`);
                        Serial.reset(portName, 'burn');
                    } catch (error) {
                        console.log(error);
                        layer.close(index);
                        statusBarTerminal.addValue(`==${Msg.Lang['烧录失败']}==\n`);
                    } finally {
                        SerialPort.refreshOutputBuffer = true;
                        SerialPort.refreshInputBuffer = false;
                        if (toolConfig.baudRates !== prevBaud) {
                            toolConfig.baudRates = prevBaud;
                            await serialport.setBaudRate(prevBaud);
                        }
                    }
                },
                end: function () {
                    $("#mixly-loader-btn").css('display', 'inline-block');
                    $('#mixly-loader-div').css('display', 'none');
                    $("#layui-layer-shade" + layerNum).remove();
                }
            });
        })
        .catch(async e => {
            statusBarTerminal.addValue("Failed!\n" + Msg.Lang["无法获取文件，请检查网络"] + "！\n");
            statusBarTerminal.addValue("\n" + e + "\n", true);
        });
    });
}

async function clickSync() {
    if (await espTool.sync()) {
        const { mainStatusBarTab } = Mixly;
        const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
        statusBarTerminal.addValue(Msg.Lang["正在连接"] + " " + await espTool.chipName() + "\n");
        statusBarTerminal.addValue(Msg.Lang["MAC地址"] + "：" + formatMacAddr(espTool.macAddr()) + "\n");
        stubLoader = await espTool.runStub();
        return 1;
    }
    return 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @name clickErase
 * Click handler for the erase button.
 */
async function clickErase() {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    statusBarTerminal.addValue(Msg.Lang["正在擦除闪存，请稍等"] + "..." + "\n");
    let stamp = Date.now();
    await stubLoader.eraseFlash();
    statusBarTerminal.addValue(Msg.Lang["擦除完成，擦除耗时"] + (Date.now() - stamp) + "ms" + "\n");
    await sleep(100);
}

/**
 * @name clickProgram
 * Click handler for the program button.
 */
async function clickProgram(binFileOffset, binFile = null) {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    statusBarTerminal.addValue(Msg.Lang["正在烧录固件"] + "\n");
    let binOffset = parseInt(binFileOffset, 16);
    await stubLoader.flashData(binFile, binOffset);
    await sleep(100);
}

function formatMacAddr(macAddr) {
    return macAddr.map(value => value.toString(16).toUpperCase().padStart(2, "0")).join(":");
}

BU.getImportModulesName = (code) => {
    const { web = {} } = SELECTED_BOARD;
    const { lib } = web;
    if (!(lib instanceof Object)) {
        return [];
    }
    let lineList = [];
    code.trim().split("\n").forEach(function (v, i) {
        lineList.push(v);
    });
    let moduleName = "";
    let moduleList = [];
    for (let data of lineList) {
        let fromLoc = data.indexOf("from");
        let importLoc = data.indexOf("import");
        const str = data.substring(0, (fromLoc === -1)? importLoc : fromLoc);
        str.split('').forEach((ch) => {
            if (ch !== ' ' && ch !== '\t') {
                fromLoc = -1;
                importLoc = -1;
                return;
            }
        });
        if (fromLoc !== -1) {
            moduleName = data.substring(fromLoc + 4, data.indexOf("import"));
        } else if (importLoc !== -1) {
            moduleName = data.substring(importLoc + 6);
        } else {
            continue;
        }
        moduleName = moduleName.replaceAll(' ', '');
        moduleName = moduleName.replaceAll('\r', '');
        moduleList = [ ...moduleList, ...moduleName.split(",") ];
    }
    return moduleList;
}

BU.searchLibs = (moduleList, libList = []) => {
    const { web = {} } = SELECTED_BOARD;
    const { lib } = web;
    if (!(lib instanceof Object)) {
        return [];
    }
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    for (let name of moduleList) {
        if (!libList.includes(name)) {
            if (!lib[name]) {
                continue;
            }
            libList.push(name);
            statusBarTerminal.addValue(Msg.Lang['拷贝库'] + ' ' + name + '.py\n');
            if (!lib[name].import.length) {
                continue;
            }
            libList = BU.searchLibs(lib[name].import, libList);
        }
    }
    return libList;
}

BU.initUpload = () => {
    let portName = `web-${SELECTED_BOARD.web.com ?? 'serial'}`;
    if (!navigator.serial || !navigator.usb) {
        portName = 'web-bluetooth';
    }
    BU.uploadWithAmpy(portName);
}

BU.uploadWithAmpy = (port) => {
    Serial.connect(port, 115200, async (port) => {
        if (!port) {
            layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
            return;
        }
        const { mainStatusBarTab } = Mixly;
        const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
        const portObj = Serial.portsOperator[port];
        const { serialport, toolConfig } = portObj;
        const prevBaud = toolConfig.baudRates;
        if (prevBaud !== 115200) {
            toolConfig.baudRates = 115200;
            await serialport.setBaudRate(toolConfig.baudRates);
        }
        BU.burning = false;
        BU.uploading = true;
        statusBarTerminal.setValue(Msg.Lang['上传中'] + '...\n');
        mainStatusBarTab.show();
        mainStatusBarTab.changeTo('output');
        const layerNum = layer.open({
            type: 1,
            title: Msg.Lang['上传中'] + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                $("#mixly-loader-btn").hide();
                $(".layui-layer-page").css("z-index","198910151");
                const ampy = new Ampy(serialport, port === 'web-serial');
                const code = MFile.getCode();
                /*let moduleList = BU.getImportModulesName(code);
                moduleList = BU.searchLibs(moduleList);
                const moduleInfo = {};
                for (let name of moduleList) {
                    moduleInfo[name] = SELECTED_BOARD.web.lib[name].path;
                }*/
                portObj.busy = true;
                Serial.reset(port, 'upload')
                .then(() => {
                    return ampy.put('main.py', code);
                })
                .then(() => {
                    layer.close(index);
                    layer.msg(Msg.Lang['上传成功'], { time: 1000 });
                    statusBarTerminal.addValue(`==${Msg.Lang['上传成功']}==\n`);
                    mainStatusBarTab.changeTo(port);
                    const statusBarSerial = mainStatusBarTab.getStatusBarById(port);
                    statusBarSerial.scrollToBottom(port);
                    if (window.userOpEvents) {
                        window.userOpEvents.addRecord({
                            operation: 'upload-success'
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    statusBarTerminal.addValue(`[Error] ${error}\n`);
                    statusBarTerminal.addValue(`==${Msg.Lang['上传失败']}==\n`);
                    if (window.userOpEvents) {
                        window.userOpEvents.addRecord({
                            operation: 'upload-error'
                        });
                    }
                })
                .finally(async () => {
                    portObj.busy = false;
                    BU.burning = false;
                    BU.uploading = false;
                    if (toolConfig.baudRates !== prevBaud) {
                        toolConfig.baudRates = prevBaud;
                        await serialport.setBaudRate(prevBaud);
                    }
                });
            },
            end: function () {
                $("#mixly-loader-btn").css('display', 'inline-block');
                $('#mixly-loader-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
            }
        });
    });
}

function hexToBuf (hex) {
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    }));
    
    return typedArray.buffer;
}

BU.uploadWithEsptool = async (endType, obj, layerType) => {
    const portName = 'web-serial';
    const portObj = Serial.portsOperator[portName];
    const { serialport, toolConfig } = portObj;
    let prevBaud = toolConfig.baudRates;
    if (prevBaud !== 115200) {
        toolConfig.baudRates = 115200;
        await serialport.setBaudRate(toolConfig.baudRates);
    }
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    let firmwareData = obj.data;
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang["固件获取失败"] + "！\n");
        layer.close(layerType);
        return;
    }
    layer.title(Msg.Lang['上传中'] + '...', layerType);
    statusBarTerminal.addValue(Msg.Lang["固件读取中"] + "... ");
    let firmwareList = [];
    for (let i of firmwareData) {
        if (!i.offset || !i.data) {
            continue;
        }
        const firmware = {
            offset: i.offset,
            binBuf: hexToBuf(i.data)
        };
        firmwareList.push(firmware);
    }
    statusBarTerminal.addValue("Done!\n" + Msg.Lang["即将开始烧录"] + "...\n");
    BU.burning = true;
    BU.uploading = false;
    statusBarTerminal.addValue(Msg.Lang['上传中'] + '...\n');
    mainStatusBarTab.show();
    mainStatusBarTab.changeTo('output');
    try {
        SerialPort.refreshOutputBuffer = false;
        SerialPort.refreshInputBuffer = true;
        await espTool.reset();
        if (await clickSync()) {
            // await clickErase();
            for (let i of firmwareList) {
                await clickProgram(i.offset, i.binBuf);
            }
        }
        layer.close(layerType);
        layer.msg(Msg.Lang['上传成功'], { time: 1000 });
        statusBarTerminal.addValue(`==${Msg.Lang['上传成功']}==\n`);
        Serial.reset(portName, 'upload');
        mainStatusBarTab.changeTo(portName);
    } catch (error) {
        console.log(error);
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['上传失败']}==\n`);
    } finally {
        SerialPort.refreshOutputBuffer = true;
        SerialPort.refreshInputBuffer = false;
        const code = MFile.getCode();
        const baudRateList = code.match(/(?<=Serial.begin[\s]*\([\s]*)[0-9]*(?=[\s]*\))/g);
        if (baudRateList && Serial.BAUDRATES.includes(baudRateList[0]-0)) {
            prevBaud = baudRateList[0]-0;
        }
        if (toolConfig.baudRates !== prevBaud) {
            toolConfig.baudRates = prevBaud;
            await serialport.setBaudRate(prevBaud);
        }
    }
}

BU.uploadWithAvrUploader = async (endType, obj, layerType) => {
    let firmwareData = obj.data;
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang["固件获取失败"] + "！\n");
        layer.close(layerType);
        return;
    }
    statusBarTerminal.addValue(Msg.Lang['上传中'] + '...\n');
    layer.title(Msg.Lang['上传中'] + '...', layerType);
    let uploadSucMessageShow = true;
    AvrUploader.upload(firmwareData[0].data, (progress) => {
        if (progress >= 100 && uploadSucMessageShow) {
            statusBarTerminal.addValue(`==${Msg.Lang['上传成功']}==\n`);
            layer.msg(Msg.Lang['上传成功'], { time: 1000 });
            layer.close(layerType);
            uploadSucMessageShow = false;
        }
    }, true)
    .catch((error) => {
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['上传失败']}==\n`);
    });
}

});