goog.loadJs('web', () => {

goog.require('DAPjs');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.USB');

const {
    Web
} = Mixly;

const { USB } = Web;

USB.output = [];
USB.encoder = new TextEncoder('utf8');
USB.decoder = new TextDecoder('utf8');

USB.obj = null;
USB.onDataLine = null;
USB.name = 'usb';

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
            USB.onDataLine = onDataLine;
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
    if (typeof buffer.unshift === 'function') {
        buffer.unshift(buffer.length);
        buffer = new Uint8Array(buffer).buffer;
    }
    await USB.DAPLink.send(132, buffer);
    await USB.sleep(200);
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

USB.setSignals = async (dtr, rts) => {
}

USB.setBaudRate = (baud) => {
    return USB.DAPLink.setSerialBaudrate(baud);
}

USB.flash = (buffer) => {
    return USB.DAPLink.flash(buffer);
}

USB.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

});