(() => {

goog.require('Mixly.Web');
goog.provide('Mixly.Web.USB');

const {
    Web
} = Mixly;

const { USB } = Web;

USB.readStrList = [];

USB.obj = null;

USB.connect = (baud = 115200) => {
    return new Promise((resolve, reject) => {
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
            USB.addReadEvent();
            resolve();
        })
        .catch(reject);
    });
}

USB.close = () => {
    return USB.DAPLink.disconnect();
}

USB.isConnected = () => {
    return USB.DAPLink.connected;
}

USB.addReadEvent = () => {
    USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
    USB.DAPLink.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, data => {
        const dataList = data.split('\r\n');
        const endStr = USB.readStrList.pop() ?? '';
        if (endStr.lastIndexOf('\n') === endStr.length - 1) {
            USB.readStrList.push(endStr);
        }
        if (dataList.length === 1) {
            USB.readStrList.push(endStr + dataList[0]);
        } else if (dataList.length > 1) {
            USB.readStrList.push(endStr + dataList[0] + '\n');
            console.log(endStr + dataList[0] + '\n');
        } else {
            return;
        }
        let i = 1;
        for (; i < dataList.length - 1; i++) {
            USB.readStrList.push(dataList[i] + '\n');
            console.log(dataList[i] + '\n');
        }
        if (dataList.length > 1) {
            USB.readStrList.push(dataList[i]);
        }
    });
    return USB.DAPLink.startSerialRead(USB.obj);
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
    console.log('writeCtrlC');
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
        let len = USB.readStrList.length;
        if (USB.readStrList[len - 1] && USB.readStrList[len - 1].lastIndexOf('\n') !== USB.readStrList[len - 1].length - 1) {
            len--;
        }
        if (len) {
            for (let i = 0; i < len; i++) {
                const data = USB.readStrList.shift();
                if (data.indexOf(str) !== -1) {
                    USB.readStrList = [];
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
    try {
        if (!await USB.interrupt()) {
            return '中断失败';
        }
        console.log('中断成功')
        if (!await USB.enterRawREPL()) {
            return '无法进入Raw REPL';
        }
        console.log('进入Raw REPL')
        console.log('写入code中...')
        await USB.writeCodeString(fileName, code);
        console.log('写入code成功')
        await USB.writeByteArr([4]);
        if (!await USB.exitRawREPL()) {
            return '无法退出Raw REPL';
        }
        await USB.writeCtrlD();
    } catch (error) {
        console.log(error);
    }
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
        await USB.writeString("file.write('''" + newData + "''')\r\n");
        console.log('写入', "file.write('''" + newData + "''')\r\n");
    }
    await USB.writeString("file.close()\r\n");
}

USB.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

})();