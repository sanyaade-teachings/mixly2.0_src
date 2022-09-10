(() => {

goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Esptool');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.SerialPort');
goog.provide('Mixly.Web.BU');

const {
    StatusBar,
    StatusBarPort,
    Web,
    LayerExtend,
    Config,
    MFile,
    Boards
} = Mixly;

const {
    Serial,
    Esptool,
    BU,
    USB,
    SerialPort
} = Web;

const { BOARD, SELECTED_BOARD } = Config;

BU.uploading = false;
BU.burning = false;

let isConnected = false;
let stubLoader = null;
let closed = null;
let espTool;

BU.cancel = async function () {
    layer.closeAll('page');
    $('#mixly-loader-div').hide();

    if (BU.uploading) {
        BU.uploading = false;
        layer.msg('已取消上传', {
            time: 1000
        });
    } else if (BU.burning) {
        if (port && port.writable) {
            try {
                if (port.writable.locked) {
                    writer.releaseLock();
                }
                //await writer.close();
            } catch (e) {
                console.log(e);
            }
            outputStream = null;
        }
        reader.cancel();
        await closed;
        BU.burning = false;
        StatusBar.addValue("已取消烧录\n", true);
        BU.toggleUIToolbar(false);
        layer.msg('已取消烧录', {
            time: 1000
        });
    }
}

/*BU.toggleUIToolbar = function (connected) {
    if (connected) {
        $('#operate-connect-btn').html(MSG['disconnect']);
        $('#operate-connect-btn').removeClass('icon-link').addClass('icon-unlink');
        $('#connect-btn').html(MSG['disconnect']);
        $('#connect-btn').removeClass('icon-link').addClass('icon-unlink');
    } else {
        $('#operate-connect-btn').html(MSG['connect']);
        $('#operate-connect-btn').removeClass('icon-unlink').addClass('icon-link');
        $('#connect-btn').html(MSG['connect']);
        $('#connect-btn').removeClass('icon-unlink').addClass('icon-link');
    }
}*/

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
                layer.msg('已取消连接', { time: 1000 });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    espTool = new Esptool.EspLoader({
        updateProgress: false,
        logMsg: false,
        debugMsg: false,
        debug: false
    });
    /*window.addEventListener('error', function (event) {
        StatusBar.addValue("Got an uncaught error: " + event.error + "\n", true)
        console.log("Got an uncaught error: " + event.error)
    });*/
});

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
            layer.msg('已取消连接', { time: 1000 });
            return;
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        const hexStr = Mixly.get(burn.filePath);
        const hex2Blob = new Blob([ hexStr ], { type: 'text/plain' });
        const buffer = await hex2Blob.arrayBuffer();
        if (!buffer) {
            layer.msg('固件读取出错', { time: 1000 });
            return;
        }
        BU.burning = true;
        BU.uploading = false;
        StatusBar.setValue("固件烧录中...\n", true);
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        const layerNum = layer.open({
            type: 1,
            title: indexText['烧录中'] + '...',
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
                    StatusBar.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`, true);
                });
                USB.flash(buffer)
                .then(() => {
                    layer.close(index);
                    layer.msg('烧录成功', { time: 1000 });
                    StatusBar.addValue("==固件烧录成功==\n", true);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    layer.msg('烧录失败', { time: 1000 });
                    StatusBar.addValue("==固件烧录失败==\n", true);
                })
                .finally(() => {
                    BU.burning = false;
                    BU.uploading = false;
                    USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_PROGRESS);
                });
            },
            end: function () {
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
            layer.msg('已取消连接', { time: 1000 });
            return;
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        StatusBar.addValue("固件读取中...", true);
        if (typeof burn.binFile !== 'object') {
            StatusBar.addValue(" Failed!\n配置文件读取出错！\n", true);
            // await endBurn(true, false);
            return;
        }
        const { binFile } = burn;
        let firmwarePromise = [];
        StatusBar.addValue("\n", true);
        for (let i of binFile) {
            if (i.path && i.offset) {
                StatusBar.addValue(`读取固件 路径:${i.path}, 偏移:${i.offset}\n`, true);
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
            StatusBar.addValue("Done!\n即将开始烧录...\n", true);
            BU.burning = true;
            BU.uploading = false;
            StatusBar.addValue("固件烧录中...\n", true);
            StatusBar.show(1);
            StatusBarPort.tabChange('output');
            const layerNum = layer.open({
                type: 1,
                title: indexText['烧录中'] + '...',
                content: $('#mixly-loader-div'),
                shade: LayerExtend.shadeWithHeight,
                resize: false,
                closeBtn: 0,
                success: async function (layero, index) {
                    $(".layui-layer-page").css("z-index","198910151");
                    $("#mixly-loader-btn").off("click").click(() => {
                        layer.close(index);
                        BU.cancel();
                    });
                    try {
                        SerialPort.refreshOutputBuffer = false;
                        SerialPort.refreshInputBuffer = true;
                        if (await clickSync()) {
                            if (burn.erase) {
                                await clickErase();
                            }
                            for (let i of newFilmwareList) {
                                await clickProgram(i.offset, i.binBuf);
                            }
                        }
                        layer.close(index);
                    } catch (error) {
                        layer.close(index);
                    } finally {
                        Serial.portClose(portName);
                        SerialPort.refreshOutputBuffer = true;
                        SerialPort.refreshInputBuffer = false;
                    }
                },
                end: function () {
                    $('#mixly-loader-div').css('display', 'none');
                    $("#layui-layer-shade" + layerNum).remove();
                }
            });
        })
        .catch(async e => {
            StatusBar.addValue("Failed!\n无法获取文件，请检查网络！\n", true);
            StatusBar.addValue("\n" + e + "\n", true);
        });
    });
}

async function clickSync() {
    if (await espTool.sync()) {
        StatusBar.addValue("正在连接 " + await espTool.chipName() + "\n", true);
        StatusBar.addValue("MAC地址：" + formatMacAddr(espTool.macAddr()) + "\n", true);
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
    StatusBar.addValue("正在擦除闪存，请稍等..." + "\n", true);
    let stamp = Date.now();
    await stubLoader.eraseFlash();
    StatusBar.addValue("擦除完成. 擦除耗时" + (Date.now() - stamp) + "ms" + "\n", true);
    await sleep(100);
}

/**
 * @name clickProgram
 * Click handler for the program button.
 */
async function clickProgram(binFileOffset, binFile = null) {
    StatusBar.addValue("正在烧录固件\n", true);
    let binOffset = parseInt(binFileOffset, 16);
    await stubLoader.flashData(binFile, binOffset);
    await sleep(100);
}

async function closeReader() {
    keepReading = false;
    reader.cancel();
    await closed;
}

function formatMacAddr(macAddr) {
    return macAddr.map(value => value.toString(16).toUpperCase().padStart(2, "0")).join(":");
}

BU.initUpload = () => {
    const comName = 'web-' + (SELECTED_BOARD.web.com ?? 'serial');
    BU.uploadByPort(comName);
}

BU.uploadByPort = (port) => {
    Serial.connect(port, 115200, async (port) => {
        if (!port) {
            layer.msg('已取消连接', { time: 1000 });
            return;
        }
        const portObj = Serial.portsOperator[port];
        const { serialport } = portObj;
        BU.burning = false;
        BU.uploading = true;
        StatusBar.setValue("程序上传中...\n", true);
        StatusBar.show(1);
        StatusBarPort.tabChange('output');
        const layerNum = layer.open({
            type: 1,
            title: indexText['上传中'] + '...',
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
                serialport.put('main.py', MFile.getCode())
                .then(() => {
                    layer.close(index);
                    layer.msg('程序写入成功', { time: 1000 });
                    StatusBar.addValue("==程序写入成功==\n", true);
                    StatusBarPort.tabChange(port);
                    StatusBarPort.scrollToTheBottom(port);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    layer.msg('程序写入失败', { time: 1000 });
                    StatusBar.addValue("==程序写入失败==\n", true);
                })
                .finally(() => {
                    BU.burning = false;
                    BU.uploading = false;
                });
            },
            end: function () {
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

BU.uploadWithEsptool = async (endType, firmwareData, layerType) => {
    async function endBurn(serialClose = false, finish = false) {
        if (serialClose) {
            reader.cancel();
            await closed;
        }
        if (finish) {
            errorMsg("To run the new firmware, please reset your device.")
            StatusBar.addValue("要运行新固件，请重置您的设备。\n", true);
        }
        BU.toggleUIToolbar(false);
        layer.closeAll('page');
        document.getElementById('mixly-loader-div').style.display = 'none';
        BU.burning = false;
        BU.uploading = false;
    }
    if (endType || typeof firmwareData !== 'object') {
        StatusBar.addValue("固件获取失败！\n", true);
        layer.close(layerType);
        return;
    }
    BU.burning = true;
    BU.uploading = false;
    if (espTool.connected()) {
        BU.toggleUIToolbar(true);
        layer.title('上传中...', layerType);
        StatusBar.addValue("固件读取中... ", true);
        let firmwareList = [];
        for (let i of firmwareData) {
            const firmware = {
                offset: i.offset,
                binBuf: hexToBuf(i.data)
            };
            firmwareList.push(firmware);
        }
        StatusBar.addValue("Done!\n即将开始烧录...\n", true);
        if (espTool.connected()) {
            if (await clickSync()) {
                if (burn.erase) {
                    await clickErase();
                }
                for (let i of firmwareList)
                    await clickProgram(i.offset, i.binBuf);
            }
            await endBurn(true, true);
        } else {
            StatusBar.addValue("设备已断开连接！\n", true);
            await endBurn(false, true);
        }
    } else {
        layer.close(layerType);
    }
}

BU.uploadWithAvrUploader = async (endType, firmwareData, layerType) => {
    if (endType || typeof firmwareData !== 'object') {
        StatusBar.addValue("固件获取失败！\n");
        layer.close(layerType);
        return;
    }
    StatusBar.addValue("上传中...\n", true);
    layer.title('上传中...', layerType);
    try {
        let uploadSucMessageShow = true;
        await AvrUploader.upload(firmwareData[0].data, (progress) => {
            if (progress >= 100 && uploadSucMessageShow) {
                StatusBar.addValue("==上传成功==\n", true);
                layer.msg('上传成功', { time: 1000 });
                layer.close(layerType);
                uploadSucMessageShow = false;
            }
        }, true);
    } catch (error) {
        StatusBar.addValue("==上传失败==\n", true);
        layer.msg('上传失败', { time: 1000 });
    }
}

})();