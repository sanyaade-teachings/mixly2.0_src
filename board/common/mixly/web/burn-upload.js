let espTool;

(() => {

goog.require('Mixly.StatusBar');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Esptool');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.provide('Mixly.Web.BU');

const {
    StatusBar,
    Web,
    LayerExtend,
    Config,
    MFile,
    Boards
} = Mixly;

const {
    Serial,
    Esptool,
    BU
} = Web;

const { BOARD } = Config;

BU.uploading = false;
BU.burning = false;

let isConnected = false;
let stubLoader = null;
let closed = null;

BU.readConfigAndSet = () => {
    const selectedBoardKey = Boards.getSelectedBoardKey();
    let burn, upload;
    if (BOARD.burn[selectedBoardKey]) {
        burn = { ...BOARD.burn, ...BOARD.burn[selectedBoardKey] };
    } else {
        burn = { ...BOARD.burn };
    }
    if (BOARD.upload[selectedBoardKey]) {
        upload = { ...BOARD.upload, ...BOARD.upload[selectedBoardKey] };
    } else {
        upload = { ...BOARD.upload };
    }
    if (BOARD.burn[selectedBoardKey] || BOARD.upload[selectedBoardKey]) {
        for (let i in Boards.INFO) {
            const key = Boards.INFO[i].key;
            if (burn[key]) {
                delete burn[key];
            }
            if (upload[key]) {
                delete upload[key];
            }
        }
    }

    if (upload?.filePath) {
        let uploadFilePath = upload.filePath;
        if (uploadFilePath.toLowerCase().indexOf(".py") != -1) {
            BU.uploadFileType = "py";
        } else {
            BU.uploadFileType = "hex";
        }
    } else {
        BU.uploadFileType = "py";
    }

    if (upload?.type) {
        BU.uploadType = upload.type;
    } else {
        BU.uploadType = "ampy";
    }
}

BU.readConfigAndSet();

BU.cancel = async function () {
    layer.closeAll('page');
    document.getElementById('serial-device-form').style.display = 'none';
    document.getElementById('mixly-loader-div').style.display = 'none';

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

BU.toggleUIToolbar = function (connected) {
    try {
        if (connected) {
            document.getElementById('operate-connect-btn').textContent = MSG['disconnect'];
            document.getElementById('operate-connect-btn').className = "icon-unlink";
            document.getElementById('connect-btn').textContent = MSG['disconnect'];
            document.getElementById('connect-btn').className = "icon-unlink";
        } else {
            document.getElementById('operate-connect-btn').textContent = MSG['connect'];
            document.getElementById('operate-connect-btn').className = "icon-link";
            document.getElementById('connect-btn').textContent = MSG['connect'];
            document.getElementById('connect-btn').className = "icon-link";
        }
    } catch (e) {
        console.log(e);
    }
}

BU.clickConnect = async function () {
    if (BU.uploadFileType == "hex") {
        if (!Serial.target) {
            BU.toggleUIToolbar(Serial.selectDevice());
            StatusBar.setValue("", true);
            $("#serial_content").val("");
        } else {
            try {
                await Serial.target.disconnect();
                BU.toggleUIToolbar(false);
                Serial.target = null;
            } catch (e) {
                console.log(e);
                BU.toggleUIToolbar(true);
            }
        }
    } else {
        StatusBar.show(1);
        if (espTool.connected()) {
            Serial.dataUpdate && clearInterval(Serial.dataUpdate);
            sleep(100);
            try {
                await disconnect();
            } catch (e) {

            }
            if (StatusBar.getValue().lastIndexOf("\n") != StatusBar.getValue().length - 1) {
                StatusBar.addValue('\n已断开连接\n', true);
            } else {
                StatusBar.addValue('已断开连接\n', true);
            }
            BU.toggleUIToolbar(false);
            return;
        }
        StatusBar.setValue("");
        try {
            await espTool.justConnect();
        } catch (e) {
            try {
                await disconnect();
            } catch (e) {

            }
            console.log(e);
            StatusBar.addValue(e + "\n", true);
            StatusBar.addValue("已取消连接\n", true);
            BU.toggleUIToolbar(false);
            return;
        }
        Serial.writeCtrlD();
        Serial.dataUpdate = setInterval(Serial.dataRefresh, 100);
        BU.toggleUIToolbar(true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    espTool = new EspLoader({
        updateProgress: false,
        logMsg: false,
        debugMsg: false,
        debug: false
    })
    window.addEventListener('error', function (event) {
        StatusBar.addValue("Got an uncaught error: " + event.error + "\n", true)
        console.log("Got an uncaught error: " + event.error)
    });
});

/**
 * @name connect
 * Opens a Web Serial connection to a micro:bit and sets up the input and
 * output stream.
 */
async function connect() {
    StatusBar.addValue("连接中...\n", true)
    await espTool.connect()
    closed = readLoop();
}

/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {
    await espTool.disconnect();
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

BU.burn = async function () {
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
    BU.burning = true;
    BU.uploading = false;
    StatusBar.setValue("");
    StatusBar.show(1);

    try {
        await BU.justConnect();
    } catch (e) {
        console.log(e);
        StatusBar.addValue("已取消烧录\n", true);
        BU.burning = false;
        BU.uploading = false;
        return;
    }

    if (espTool.connected()) {
        BU.toggleUIToolbar(true);
        layer.open({
            type: 1,
            title: '烧录中...',
            content: $('#mixly-loader-div'),
            shade: LayerExtend.shade,
            closeBtn: 0,
            end: function () {
                document.getElementById('mixly-loader-div').style.display = 'none';
            }
        });
        const selectedBoardKey = Boards.getSelectedBoardKey();
        let burn = { ...BOARD.web.burn };
        if (BOARD?.web?.burn[selectedBoardKey]) {
            burn = { ...burn, ...BOARD.web.burn[selectedBoardKey] };
            for (let i in Boards.INFO) {
                const key = Boards.INFO[i].key;
                if (burn[key]) {
                    delete burn[key];
                }
            }
        }
        StatusBar.addValue("固件读取中...", true);
        if (typeof burn.binFile !== 'object') {
            StatusBar.addValue(" Failed!\n配置文件读取出错！\n", true);
            await endBurn(true, false);
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
            if (espTool.connected()) {
                if (await clickSync()) {
                    if (burn.erase) {
                        await clickErase();
                    }
                    for (let i of newFilmwareList)
                        await clickProgram(i.offset, i.binBuf);
                }
                await endBurn(true, true);
            } else {
                StatusBar.addValue("设备已断开连接！\n", true);
                await endBurn(false, true);
            }
        })
        .catch(async e => {
            StatusBar.addValue("Failed!\n无法获取文件，请检查网络！\n", true);
            StatusBar.addValue("\n" + e + "\n", true);
            await endBurn(true, false);
        });
    }
}

async function clickDisconnect() {
    if (espTool.connected()) {
        await disconnect();
    }
}

/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 */
BU.justConnect = async () => {
    if (!espTool.connected()) {
        await connect();
    } else {
        Serial.dataUpdate && clearInterval(Serial.dataUpdate);
        sleep(100);
        await espTool.reset();
        closed = readLoop();
    }
    BU.toggleUIToolbar(true);
}

async function clickSync() {
    try {
        if (await espTool.sync()) {
            let baud = 115200;
            StatusBar.addValue("正在连接 " + await espTool.chipName() + "\n", true);
            StatusBar.addValue("MAC地址：" + formatMacAddr(espTool.macAddr()) + "\n", true);
            stubLoader = await espTool.runStub();
            return 1;
        }
    } catch (e) {
        StatusBar.addValue(e + "\n", true);
        BU.toggleUIToolbar(false);
        await disconnect();
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
    try {
        StatusBar.addValue("正在擦除闪存，请稍等..." + "\n", true);
        let stamp = Date.now();
        await stubLoader.eraseFlash();
        StatusBar.addValue("擦除完成. 擦除耗时" + (Date.now() - stamp) + "ms" + "\n", true);
        await sleep(100);
    } catch (e) {
        StatusBar.addValue(e, true);
    } finally {

    }
}

/**
 * @name clickProgram
 * Click handler for the program button.
 */
async function clickProgram(binFileOffset, binFile = null) {
    StatusBar.addValue("正在烧录固件\n", true);
    try {
        let binOffset = parseInt(binFileOffset, 16);
        await stubLoader.flashData(binFile, binOffset);
        await sleep(100);
    } catch (e) {
        errorMsg(e);
        StatusBar.addValue(e + "\n", true);
    }
}

function errorMsg(text) {
    console.log(text);
}

/**
 * @name readLoop
 * Reads data from the input stream and places it in the inputBuffer
 */
async function readLoop() {
    let keepReading = true;
    StatusBar.addValue("循环读取开始" + "\n", true);
    while (port && port.readable && keepReading) {
        if (port.readable.locked) {
            await reader.cancel();
            try {
                reader.releaseLock();
            } catch (e) {
                console.log(e);
            }
        }
        reader = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done || !BU.burning) {
                    reader.releaseLock();
                    inputStream = null;
                    try {
                        if (port.writable.locked) {
                            writer.releaseLock();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    outputStream = null;
                    console.log("done!");
                    keepReading = false;
                    break;
                }
                inputBuffer = inputBuffer.concat(Array.from(value));
            }
        } catch (error) {
            // Handle |error|...
        } finally {
            reader.releaseLock();
        }
    }
    try {
        await port.close();
    } catch (e) {
        console.log(e);
    }
    port = null;
    BU.toggleUIToolbar(false);
}

async function closeReader() {
    keepReading = false;
    reader.cancel();
    await closed;
}

function formatMacAddr(macAddr) {
    return macAddr.map(value => value.toString(16).toUpperCase().padStart(2, "0")).join(":");
}

BU.upload = async function () {
    if (BU.uploadFileType == "hex") {
        Serial.update();
    } else {
        BU.uploading = true;
        BU.burning = false;
        if (BU.uploadType == "volumeLabel") {
            mixlyjs.savePyFileAs();
        } else {
            StatusBar.show(1);
            if (!espTool.connected()) {
                try {
                    await espTool.justConnect(async function () {
                        BU.toggleUIToolbar(true);
                        await BU.uploadWithAmpy();
                    });
                } catch (e) {
                    console.log(e);
                    StatusBar.addValue(e + "\n", true);
                    StatusBar.addValue("已取消连接\n", true);
                    BU.toggleUIToolbar(false);
                    return;
                }
            } else {
                await BU.uploadWithAmpy();
            }
        }
        BU.uploading = false;
        BU.burning = false;
        Serial.dataUpdate = setInterval(Serial.dataRefresh, 100);
    }
}

BU.interrupt = () => {
    return new Promise(async (resolve, reject) => {
        await Serial.reset();
        await sleep(100);
        await Serial.writeCtrlC();
        await sleep(100);
        const startTime = Number(new Date());
        let nowTime = startTime;
        while (nowTime - startTime < 10000) {
            const nowTime = Number(new Date());
            if (StatusBar.getValue().lastIndexOf('>>>') !== -1) {
                StatusBar.setValue("", true);
                resolve();
                return;
            }
            if (!((nowTime - startTime) % 1000)) {
                await Serial.writeCtrlC();
            }
            if (nowTime - startTime >= 10000) {
                reject('中断失败');
                return;
            }
            await sleep(100);
        }
    });
}

BU.uploadWithAmpy = async function () {
    // 判断字符是否为汉字，
    function isChinese(s){
        return /[\u4e00-\u9fa5]/.test(s);
    }

    // 中文unicode编码
    function ch2Unicode(str) {
        if(!str){
            return;
        }
        var unicode = '';
        for (var i = 0; i <  str.length; i++) {
            var temp = str.charAt(i);
            if(isChinese(temp)){
                unicode += '\\u' +  temp.charCodeAt(0).toString(16);
            }
            else{
                unicode += temp;
            }
        }
        return unicode;
    }

    layer.open({
        type: 1,
        title: '上传中...',
        content: $('#mixly-loader-div'),
        shade: LayerExtend.shade,
        closeBtn: 0,
        end: function () {
            layer.closeAll('page');
            document.getElementById('mixly-loader-div').style.display = 'none';
        }
    });

    /*
    const Encoder = new TextEncoder();

    const exec_ = async (command) => {
        let commandBytes;
        commandBytes = Encoder.encode(command);

        for (let i = 0; i < commandBytes.length; i += 256) {
            await espTool.writeArrayBuffer(commandBytes.slice(i, Math.min(i + 256, commandBytes.length)));
            await sleep(100);
        }
        await espTool.writeArrayBuffer([4]);
    }
    */

    StatusBar.setValue("", true);
    BU.interrupt()
    .then(async () => {
        let textEncoder = new TextEncoder();
        await Serial.writeCtrlA();
        await espTool.write("file = open('main.py', 'w')\r\n");
        await sleep(100);
        let writeData = MFile.getCode();
        writeData = ch2Unicode(writeData) ?? '';
        for (let i = 0; i < writeData.length / 50; i++) {
            let newData = writeData.substring(i * 50, (i + 1) * 50);
            newData = newData.replaceAll('\'', '\\\'');
            newData = newData.replaceAll('\\x', '\\\\x');
            await espTool.write("file.write('''" + newData + "''')\r\n");
            await sleep(100);
            StatusBar.setValue("", true);
        }
        /*
        await exec_("f = open('main.py', 'wb')\r\n");
        var size = writeData.length;
        for (let i = 0; i < size; i += 32) {
            let chunkSize = Math.min(32, size - i);
            let chunk = "b\'" + writeData.substring(i, chunkSize) + "\'";
            await exec_("f.write(" + chunk + ")");
        }
        await exec_("f.close()\r\n");
        */
        await sleep(100);
        await espTool.write("file.close()\r\n");
        await sleep(500);
        await espTool.writeArrayBuffer(new Int8Array([4]).buffer);
        await sleep(500);
        await Serial.writeCtrlB();
        await sleep(500);
        await Serial.reset();
        await sleep(100);
        StatusBar.setValue("", true);
        await Serial.writeCtrlD();
        layer.closeAll('page');
        layer.msg('上传成功！', {
            time: 1000
        });
    })
    .catch((error) => {
        console.log(error);
        layer.closeAll('page');
        layer.msg('上传失败', {
            time: 1000
        });
        StatusBar.setValue(error.toString() + '\n', true);
    })
    .finally(() => {
        $('mixly-loader-div').css('display', 'none');
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