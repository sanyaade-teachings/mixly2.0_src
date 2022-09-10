(() => {

goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.SerialPort');

const { Web } = Mixly;

const { SerialPort, Ampy } = Web;

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
        } catch (error) {
            console.log(error);
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

SerialPort.startReadLine = (onDataLine = (message) => {}) => {
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
                const len = SerialPort.output.length;
                if (len) {
                    onDataLine(SerialPort.output[len - 1]);
                }
                SerialPort.output.push('');
            }
        } while (endWithLF);
        if (SerialPort.keepReading) {
            SerialPort.startReadLine(onDataLine);
        }
    }, 100);
}

SerialPort.addReadEvent = async (onDataLine = (message) => {}) => {
    SerialPort.output = [];
    SerialPort.inputBuffer = [];
    SerialPort.outputBuffer = [];
    SerialPort.refreshInputBuffer = false;
    SerialPort.refreshOutputBuffer = true;
    SerialPort.startReadLine(onDataLine);
    while (SerialPort.obj.readable && SerialPort.keepReading) {
        SerialPort.reader = SerialPort.obj.readable.getReader();
        /*const timer = setTimeout(() => {
            SerialPort.reader.releaseLock();
        }, 500);*/
        try {
            while (true) {
                const { value, done } = await SerialPort.reader.read();
                if (SerialPort.refreshOutputBuffer && value) {
                    SerialPort.outputBuffer = [ ...SerialPort.outputBuffer, ...value ];
                }
                if (SerialPort.refreshInputBuffer && value) {
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

SerialPort.setDTR = async (value) => {
    await SerialPort.obj.setSignals({ dataTerminalReady: value });
}

SerialPort.setRTS = async (value) => {
    await SerialPort.obj.setSignals({ requestToSend: value });
}

SerialPort.setSignals = async (dtr, rts) => {
    await SerialPort.obj.setSignals({ dataTerminalReady: dtr, requestToSend: rts });
}

SerialPort.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

})();