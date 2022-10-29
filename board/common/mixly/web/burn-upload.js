(() => {

goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Esptool');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.SerialPort');
goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.BU');

const {
    StatusBar,
    StatusBarPort,
    Web,
    LayerExt,
    Config,
    MFile,
    Boards
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
    let portName;
    if (SELECTED_BOARD.web.com == "usb") {
        portName = 'web-usb';
    } else {
        portName = 'web-serial';
    }
    const portObj = Serial.portsOperator[portName];
    if (portObj && portObj.portOpened) {
        Serial.portClose(portName);
    } else {
        Serial.connect(portName, 115200, (port) => {
            if (port) {
                StatusBar.show(1);
            } else {
                layer.msg(indexText['已取消连接'], { time: 1000 });
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
            layer.msg(indexText['已取消连接'], { time: 1000 });
            return;
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        const hexStr = Mixly.get(burn.filePath);
        const hex2Blob = new Blob([ hexStr ], { type: 'text/plain' });
        const buffer = await hex2Blob.arrayBuffer();
        if (!buffer) {
            layer.msg(indexText['固件读取出错'], { time: 1000 });
            return;
        }
        BU.burning = true;
        BU.uploading = false;
        StatusBar.setValue(indexText['烧录中'] + '...\n');
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        const layerNum = layer.open({
            type: 1,
            title: indexText['烧录中'] + '...',
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
                    StatusBar.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`);
                });
                USB.flash(buffer)
                .then(() => {
                    layer.close(index);
                    layer.msg(indexText['烧录成功'], { time: 1000 });
                    StatusBar.addValue(`==${indexText['烧录成功']}==\n`);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    StatusBar.addValue(`==${indexText['烧录失败']}==\n`);
                })
                .finally(() => {
                    BU.burning = false;
                    BU.uploading = false;
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
            layer.msg(indexText['已取消连接'], { time: 1000 });
            return;
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        StatusBar.setValue(indexText["固件读取中"] + "...");
        if (typeof burn.binFile !== 'object') {
            StatusBar.addValue(" Failed!\n" + indexText["配置文件读取出错"] + "！\n");
            // await endBurn(true, false);
            return;
        }
        const { binFile } = burn;
        let firmwarePromise = [];
        StatusBar.addValue("\n");
        for (let i of binFile) {
            if (i.path && i.offset) {
                StatusBar.addValue(`${indexText['读取固件'] + ' ' + indexText['路径']}:${i.path}, ${indexText['偏移']}:${i.offset}\n`);
                firmwarePromise.push(readBinFile(i.path, i.offset));
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
            StatusBar.addValue("Done!\n" + indexText["即将开始烧录"] + "...\n");
            BU.burning = true;
            BU.uploading = false;
            StatusBar.addValue(indexText['烧录中'] + '...\n');
            StatusBar.show(1);
            StatusBarPort.tabChange('output');
            const layerNum = layer.open({
                type: 1,
                title: indexText['烧录中'] + '...',
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
                        layer.msg(indexText['烧录成功'], { time: 1000 });
                        StatusBar.addValue(`==${indexText['烧录成功']}==\n`);
                    } catch (error) {
                        console.log(error);
                        layer.close(index);
                        StatusBar.addValue(`==${indexText['烧录失败']}==\n`);
                    } finally {
                        SerialPort.refreshOutputBuffer = true;
                        SerialPort.refreshInputBuffer = false;
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
            StatusBar.addValue("Failed!\n" + indexText["无法获取文件，请检查网络"] + "！\n");
            StatusBar.addValue("\n" + e + "\n", true);
        });
    });
}

async function clickSync() {
    if (await espTool.sync()) {
        StatusBar.addValue(indexText["正在连接"] + " " + await espTool.chipName() + "\n");
        StatusBar.addValue(indexText["MAC地址"] + "：" + formatMacAddr(espTool.macAddr()) + "\n");
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
    StatusBar.addValue(indexText["正在擦除闪存，请稍等"] + "..." + "\n");
    let stamp = Date.now();
    await stubLoader.eraseFlash();
    StatusBar.addValue(indexText["擦除完成，擦除耗时"] + (Date.now() - stamp) + "ms" + "\n");
    await sleep(100);
}

/**
 * @name clickProgram
 * Click handler for the program button.
 */
async function clickProgram(binFileOffset, binFile = null) {
    StatusBar.addValue(indexText["正在烧录固件"] + "\n");
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
    for (let name of moduleList) {
        if (!libList.includes(name)) {
            if (!lib[name]) {
                continue;
            }
            libList.push(name);
            StatusBar.addValue(indexText['拷贝库'] + ' ' + name + '.py\n');
            if (!lib[name].import.length) {
                continue;
            }
            libList = BU.searchLibs(lib[name].import, libList);
        }
    }
    return libList;
}

BU.initUpload = () => {
    const comName = 'web-' + (SELECTED_BOARD.web.com ?? 'serial');
    BU.uploadByPort(comName);
}

BU.uploadByPort = (port) => {
    Serial.connect(port, 115200, async (port) => {
        if (!port) {
            layer.msg(indexText['已取消连接'], { time: 1000 });
            return;
        }
        const portObj = Serial.portsOperator[port];
        const { serialport } = portObj;
        BU.burning = false;
        BU.uploading = true;
        StatusBar.setValue(indexText['上传中'] + '...\n');
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        const layerNum = layer.open({
            type: 1,
            title: indexText['上传中'] + '...',
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
                ampy.put('main.py', code)
                .then(() => {
                    layer.close(index);
                    layer.msg(indexText['上传成功'], { time: 1000 });
                    StatusBar.addValue(`==${indexText['上传成功']}==\n`);
                    StatusBarPort.tabChange(port);
                    StatusBarPort.scrollToTheBottom(port);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    StatusBar.addValue(`[Error] ${error}\n`);
                    StatusBar.addValue(`==${indexText['上传失败']}==\n`);
                })
                .finally(() => {
                    portObj.busy = false;
                    BU.burning = false;
                    BU.uploading = false;
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
    let firmwareData = obj.data;
    if (endType || typeof firmwareData !== 'object') {
        StatusBar.addValue(indexText["固件获取失败"] + "！\n");
        layer.close(layerType);
        return;
    }
    layer.title(indexText['上传中'] + '...', layerType);
    StatusBar.addValue(indexText["固件读取中"] + "... ");
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
    StatusBar.addValue("Done!\n" + indexText["即将开始烧录"] + "...\n");
    BU.burning = true;
    BU.uploading = false;
    StatusBar.addValue(indexText['上传中'] + '...\n');
    StatusBar.show(1);
    StatusBarPort.tabChange('output');
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
        layer.msg(indexText['上传成功'], { time: 1000 });
        StatusBar.addValue(`==${indexText['上传成功']}==\n`);
    } catch (error) {
        console.log(error);
        layer.close(layerType);
        StatusBar.addValue(`==${indexText['上传失败']}==\n`);
    } finally {
        SerialPort.refreshOutputBuffer = true;
        SerialPort.refreshInputBuffer = false;
    }
}

BU.uploadWithAvrUploader = async (endType, obj, layerType) => {
    let firmwareData = obj.data;
    if (endType || typeof firmwareData !== 'object') {
        StatusBar.addValue(indexText["固件获取失败"] + "！\n");
        layer.close(layerType);
        return;
    }
    StatusBar.addValue(indexText['上传中'] + '...\n');
    layer.title(indexText['上传中'] + '...', layerType);
    let uploadSucMessageShow = true;
    AvrUploader.upload(firmwareData[0].data, (progress) => {
        if (progress >= 100 && uploadSucMessageShow) {
            StatusBar.addValue(`==${indexText['上传成功']}==\n`);
            layer.msg(indexText['上传成功'], { time: 1000 });
            layer.close(layerType);
            uploadSucMessageShow = false;
        }
    }, true)
    .catch((error) => {
        layer.close(layerType);
        StatusBar.addValue(`==${indexText['上传失败']}==\n`);
    });
}

})();