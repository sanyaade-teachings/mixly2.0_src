(() => {

goog.require('Mixly.Web');
goog.provide('Mixly.Web.USB');

const {
    Web
} = Mixly;

const { USB } = Web;

USB.output = [];

USB.obj = null;

USB.connect = (baud = 115200, onDataLine = (message) => {}) => {
    return new Promise((resolve, reject) => {
        if (USB.isConnected()) {
            resolve();
            return;
        }
        navigator.usb.requestDevice({
            filters: [{ vendorId: 0xD28 }]
        })
        .then((device) => {
            USB.obj = device;
            USB.WebUSB = new DAPjs.WebUSB(device);
            USB.DAPLink = new DAPjs.DAPLink(USB.WebUSB);
            return USB.DAPLink.connect();
        })
        .then(() => {
            return USB.setBaudRate(baud);
        })
        .then(() => {
            USB.addReadEvent(onDataLine);
            resolve();
        })
        .catch(reject);
    });
}

USB.close = () => {
    if (USB.isConnected()) {
        USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
        USB.DAPLink.stopSerialRead();
        USB.DAPLink.disconnect()
        .then(() => {
            return USB.WebUSB.close();
        })
        .then(() => {
            return USB.obj.close();
        })
        .catch((error) => {
            console.log(error);
        })
        
    }
}

USB.isConnected = () => {
    return USB.obj && USB.obj.opened;
}

USB.addReadEvent = (onDataLine = (message) => {}) => {
    USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
    USB.DAPLink.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, data => {
        let dataList = data.split('\n');
        if (!dataList.length) {
            return;
        }
        let endStr = '';
        if (USB.output.length) {
            endStr = USB.output.pop();
            USB.output.push(endStr + dataList.shift());
            if (dataList.length) {
                // console.log(USB.output[USB.output.length - 1]);
                onDataLine(USB.output[USB.output.length - 1]);
            }
        }
        let i = 0;
        for (let value of dataList) {
            i++;
            USB.output.push(value);
            if (i < dataList.length) {
                // console.log(value);
                onDataLine(value);
            }
        }
        while (USB.output.length > 500) {
            USB.output.shift();
        }
    });
    USB.DAPLink.startSerialRead(USB.obj);
}

USB.AddOnConnectEvent = (onConnect) => {
    navigator.usb.addEventListener('connect', (event) => {
        onConnect();
    });
}

USB.AddOnDisconnectEvent = (onDisconnect) => {
    navigator.usb.addEventListener('disconnect', (event) => {
        onDisconnect();
    });
}

USB.writeString = async (str) => {
    await USB.DAPLink.serialWrite(str);
    await USB.sleep(200);
}

USB.writeByteArr = async (buffer) => {
    let sendStr = '';
    buffer.map((data) => {
        sendStr += String.fromCharCode(data);
    });
    await USB.writeString(sendStr);
}

USB.writeCtrlA = async () => {
    await USB.writeByteArr([1, 13, 10]);
}

USB.writeCtrlB = async () => {
    await USB.writeByteArr([2, 13, 10]);
}

USB.writeCtrlC = async () => {
    await USB.writeByteArr([3, 13, 10]);
}

USB.writeCtrlD = async () => {
    await USB.writeByteArr([3, 4]);
}

USB.write = async (type, data, dataTail) => {
    switch (type) {
        case 'string':
            return USB.writeString(data + dataTail);
            break;
        default:
            await USB.writeByteArr(data);
            return USB.writeString(dataTail);
    }
}

USB.setBaudRate = (baud) => {
    return USB.DAPLink.setSerialBaudrate(baud);
}

USB.find = async (str, timeout, doFunc) => {
    const startTime = Number(new Date());
    let nowTime = startTime;
    while (nowTime - startTime < timeout) {
        const nowTime = Number(new Date());
        let len = USB.output.length;
        if (len) {
            const lastData = USB.output[len - 1];
            if (!lastData) {
                len--;
            }
            for (let i = 0; i < len; i++) {
                const data = USB.output.shift();
                if (data.indexOf(str) !== -1) {
                    USB.output = [];
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
        await USB.sleep(100);
    }
}

USB.interrupt = async (timeout = 5000) => {
    await USB.writeCtrlC();
    await USB.sleep(100);
    if (await USB.find('>>>', timeout, USB.writeCtrlC)) {
        return true;
    }
}

USB.enterRawREPL = async (timeout = 5000) => {
    await USB.writeCtrlA();
    await USB.sleep(100);
    if (await USB.find('raw REPL; CTRL-B to exit', timeout, USB.writeCtrlA)) {
        return true;
    }
}

USB.exitRawREPL = async (timeout = 5000) => {
    await USB.writeCtrlB();
    await USB.sleep(100);
    if (await USB.find('>>>', timeout, USB.writeCtrlB)) {
        return true;
    }
}

USB.put = async (fileName, code) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await USB.interrupt()) {
                reject('中断失败');
                return;
            }
            console.log('中断成功')
            if (!await USB.enterRawREPL()) {
                reject('无法进入Raw REPL');
                return;
            }
            console.log('进入Raw REPL')
            console.log('写入code中...')
            await USB.writeCodeString(fileName, code);
            console.log('写入code成功')
            await USB.writeByteArr([4]);
            if (!await USB.exitRawREPL()) {
                reject('无法退出Raw REPL');
                return;
            }
            await USB.writeCtrlD();
            resolve();
        } catch (error) {
            reject(error.toString());
        }
    })
}

USB.writeCodeString = async (fileName, code) => {
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
    await USB.writeString("file = open('" + fileName + "', 'w')\r\n");
    console.log("file = open('" + fileName + "', 'w')\r\n")
    code = ch2Unicode(code) ?? '';
    for (let i = 0; i < code.length / 30; i++) {
        let newData = code.substring(i * 30, (i + 1) * 30);
        newData = newData.replaceAll('\'', '\\\'');
        newData = newData.replaceAll('\\x', '\\\\x');
        newData = newData.replaceAll('\\u', '\\\\u');
        await USB.writeString("file.write('''" + newData + "''')\r\n");
        // console.log('写入', "file.write('''" + newData + "''')\r\n");
    }
    await USB.writeString("file.close()\r\n");
}

USB.flash = (buffer) => {
    return USB.DAPLink.flash(buffer);
}

USB.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

})();