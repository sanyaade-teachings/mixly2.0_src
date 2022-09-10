(() => {

goog.require('Mixly.Web');
goog.provide('Mixly.Web.SerialPort');

const { Web } = Mixly;

const { SerialPort } = Web;

SerialPort.output = [];
SerialPort.inputBuffer = [];
SerialPort.outputBuffer = [];
SerialPort.refreshInputBuffer = false;
SerialPort.refreshOutputBuffer = true;
SerialPort.obj = null;

SerialPort.encoder = new TextEncoder();
SerialPort.decoder = new TextDecoder();

SerialPort.connect = (baud = 115200, onDataLine = (message) => {}) => {
    return new Promise((resolve, reject) => {
        if (SerialPort.isConnected()) {
            resolve();
            return;
        }
        navigator.serial.requestPort()
        .then((device) => {
            console.log(device);
            SerialPort.obj = device;
            return device.open({ baudRate: baud });
        })
        .then(() => {
            SerialPort.keepReading = true;
            SerialPort.addReadEvent(onDataLine);
            resolve();
        })
        .catch(reject);
    });
}

SerialPort.close = async () => {
    if (SerialPort.isConnected()) {
        SerialPort.keepReading = false;
        if (SerialPort.obj && SerialPort.obj.readable) {
            if (SerialPort.obj.readable.locked) {
                await SerialPort.reader.cancel();
                try {
                    SerialPort.reader.releaseLock();
                } catch (e) {
                    console.log(e);
                }
            }
        }

        if (SerialPort.obj && SerialPort.obj.writable) {
            try {
                if (SerialPort.obj.writable.locked) {
                    SerialPort.writer.releaseLock();
                }
                //await writer.close();
            } catch (e) {
                console.log(e);
            }
        }

        try {
            await SerialPort.obj.close();
        } catch (e) {
            //console.log(e);
        }
        SerialPort.obj = null;
    }
}

SerialPort.isConnected = () => {
    return SerialPort.obj;
}

SerialPort.read = async () => {
    let returnStr = "";
    const { value, done } = await reader.read();
    restBuffer = [...restBuffer, ...value];
    do {
        var { text, arr } = this.readString(restBuffer);
        restBuffer = arr;
        returnStr += text;
    } while (text);
    return returnStr;
}

SerialPort.readLine = () => {
    var text = "";
    var endWithLF = false;
    const len = SerialPort.outputBuffer.length;
    let i = 0;
    for (let data of SerialPort.outputBuffer) {
        i++;
        if (data === 0x0a) {
            endWithLF = true;
            break;
        }
        text += String.fromCharCode(data);
        if (i === len) {
            break;
        }
    }
    SerialPort.outputBuffer = SerialPort.outputBuffer.slice(i);
    return { text: text, endWithLF: endWithLF };
}

SerialPort.readChar = () => {
    let arr = SerialPort.outputBuffer;
    var readBuf = [];
    var buffLength = 0;
    var nowIndex = -1;
    var text = "";
    /*  UTF-8编码方式
    *   ------------------------------------------------------------
    *   |1字节 0xxxxxxx                                             |
    *   |2字节 110xxxxx 10xxxxxx                                    |
    *   |3字节 1110xxxx 10xxxxxx 10xxxxxx                           |
    *   |4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx                  |
    *   |5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx         |
    *   |6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx|
    *   ------------------------------------------------------------
    */
    for (var i = 0; i < arr.length; i++) {
        if ((arr[i] & 0x80) == 0x00) {
            text = String.fromCharCode(arr[i]);
            nowIndex = i;
            break;
        } else if ((arr[i] & 0xc0) == 0x80) {
            readBuf.push(arr[i]);
            if (readBuf.length >= buffLength) {
                text = this.decoder.decode(new Uint8Array(readBuf));
                nowIndex = i;
                break;
            }
        } else {
            let dataNum = arr[i] & 0xe0;
            switch (dataNum) {
                case 0xfc:
                    buffLength = 6;
                    break;
                case 0xf8:
                    buffLength = 5;
                    break;
                case 0xf0:
                    buffLength = 4;
                    break;
                case 0xe0:
                    buffLength = 3;
                    break;
                case 0xc0:
                default:
                    buffLength = 2;
            }
            readBuf.push(arr[i]);
        }
    }
    if (nowIndex == -1) {
        arr = arr.slice(0);
    } else {
        arr = arr.slice(nowIndex + 1);
    }
    return text;
}

SerialPort.readString = (arr) => {
    var readStr = "";
    do {
        var { text, arr } = this.readChar(arr);
        readStr += text;
    } while (text);

    return { text: readStr, arr: arr };
}

SerialPort.startReadLine = () => {
    SerialPort.readLineTimer = window.setTimeout(() => {
        if (!SerialPort.keepReading) {
            window.clearTimeout(SerialPort.readLineTimer);
            return;
        }
        let endWithLF = false;
        do {
            const readObj = SerialPort.readLine();
            endWithLF = readObj.endWithLF;
            const { text } = readObj;
            SerialPort.output.push((SerialPort.output.length? SerialPort.output.pop() : '') + text);
            if (endWithLF) {
                SerialPort.output.push('');
            }
        } while (endWithLF);
        if (SerialPort.keepReading) {
            SerialPort.startReadLine();
        }
    }, 100);
}

SerialPort.addReadEvent = async (onDataLine = (message) => {}) => {
    SerialPort.output = [];
    SerialPort.inputBuffer = [];
    SerialPort.outputBuffer = [];
    SerialPort.refreshInputBuffer = false;
    SerialPort.refreshOutputBuffer = true;
    SerialPort.startReadLine();
    while (SerialPort.obj.readable && SerialPort.keepReading) {
        SerialPort.reader = SerialPort.obj.readable.getReader();
        /*const timer = setTimeout(() => {
            SerialPort.reader.releaseLock();
        }, 500);*/
        try {
            while (true) {
                const { value, done } = await SerialPort.reader.read();
                if (SerialPort.refreshOutputBuffer) {
                    SerialPort.outputBuffer = [ ...SerialPort.outputBuffer, ...value ];
                }
                if (SerialPort.refreshInputBuffer) {
                    SerialPort.inputBuffer = [ ...SerialPort.inputBuffer, ...value ];
                }
                if (done) {
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            SerialPort.reader.releaseLock();
        }
    }
    await SerialPort.obj.close();
}

SerialPort.AddOnConnectEvent = (onConnect) => {
    navigator.serial.addEventListener('connect', (event) => {
        onConnect();
    });
}

SerialPort.AddOnDisconnectEvent = (onDisconnect) => {
    navigator.serial.addEventListener('disconnect', (event) => {
        SerialPort.obj = null;
        onDisconnect();
    });
}

SerialPort.writeString = async (str) => {
    const buffer = SerialPort.encoder.encode(str);
    await SerialPort.writeByteArr(buffer);
}

SerialPort.writeByteArr = async (buffer) => {
    const writer = SerialPort.obj.writable.getWriter();
    await writer.write(new Int8Array(buffer).buffer);
    writer.releaseLock();
    await SerialPort.sleep(200);
}

SerialPort.writeCtrlA = async () => {
    await SerialPort.writeByteArr([1, 13, 10]);
}

SerialPort.writeCtrlB = async () => {
    await SerialPort.writeByteArr([2, 13, 10]);
}

SerialPort.writeCtrlC = async () => {
    await SerialPort.writeByteArr([3, 13, 10]);
}

SerialPort.writeCtrlD = async () => {
    await SerialPort.writeByteArr([3, 4]);
}

SerialPort.setBaudRate = (baud) => {
    SerialPort.obj.baudRate = baud;
}

SerialPort.find = async (str, timeout, doFunc) => {
    const startTime = Number(new Date());
    let nowTime = startTime;
    while (nowTime - startTime < timeout) {
        const nowTime = Number(new Date());
        let len = SerialPort.output.length;
        if (len) {
            const lastData = SerialPort.output[len - 1];
            if (!lastData) {
                len--;
            }
            for (let i = 0; i < len; i++) {
                const data = SerialPort.output.shift();
                if (data.indexOf(str) !== -1) {
                    SerialPort.output = [];
                    return true;
                }
            }
        }
        if (!((nowTime - startTime) % 500)) {
            await doFunc();
        }
        if (nowTime - startTime >= timeout) {
            console.log(str + '查找失败');
            return false;
        }
        await SerialPort.sleep(100);
    }
}

SerialPort.interrupt = async (timeout = 5000) => {
    await SerialPort.writeCtrlC();
    await SerialPort.sleep(100);
    if (await SerialPort.find('>>>', timeout, SerialPort.writeCtrlC)) {
        return true;
    }
}

SerialPort.enterRawREPL = async (timeout = 5000) => {
    await SerialPort.writeCtrlA();
    await SerialPort.sleep(100);
    if (await SerialPort.find('raw REPL; CTRL-B to exit', timeout, SerialPort.writeCtrlA)) {
        return true;
    }
}

SerialPort.exitRawREPL = async (timeout = 5000) => {
    await SerialPort.writeCtrlB();
    await SerialPort.sleep(100);
    if (await SerialPort.find('>>>', timeout, SerialPort.writeCtrlB)) {
        return true;
    }
}

SerialPort.put = async (fileName, code) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await SerialPort.interrupt()) {
                reject('中断失败');
                return;
            }
            console.log('中断成功')
            if (!await SerialPort.enterRawREPL()) {
                reject('无法进入Raw REPL');
                return;
            }
            console.log('进入Raw REPL')
            console.log('写入code中...')
            await SerialPort.writeCodeString(fileName, code);
            console.log('写入code成功')
            await SerialPort.writeByteArr([4]);
            if (!await SerialPort.exitRawREPL()) {
                reject('无法退出Raw REPL');
                return;
            }
            await SerialPort.writeCtrlD();
            resolve();
        } catch (error) {
            reject(error.toString());
        }
    })
}

SerialPort.writeCodeString = async (fileName, code) => {
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
    await SerialPort.writeString("file = open('" + fileName + "', 'w')\r\n");
    console.log("file = open('" + fileName + "', 'w')\r\n")
    code = ch2Unicode(code) ?? '';
    for (let i = 0; i < code.length / 30; i++) {
        let newData = code.substring(i * 30, (i + 1) * 30);
        newData = newData.replaceAll('\'', '\\\'');
        newData = newData.replaceAll('\\x', '\\\\x');
        newData = newData.replaceAll('\\u', '\\\\u');
        await SerialPort.writeString("file.write('''" + newData + "''')\r\n");
        // console.log('写入', "file.write('''" + newData + "''')\r\n");
    }
    await SerialPort.writeString("file.close()\r\n");
}

SerialPort.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

})();