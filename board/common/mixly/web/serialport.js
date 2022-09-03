(() => {

goog.require('Mixly.Web');
goog.provide('Mixly.Web.SerialPort');

const { Web } = Mixly;

class WebSerialPort {
    constructor(config = {}) {
        const DEFAULT_CONIFG = {
            baudRate: 9600,
            vendorId: undefined,
            productId: undefined,
            //bufferSize: 255,
            //dataBits: 8,
            //flowControl: 'none',
            //parity: 'none',
            //stopBits: 1
        }
        this.config = { ...DEFAULT_CONIFG, ...config };
        const { vendorId, productId } = this.config;
        this.port = null;
        this.isOpen = false;
        this.inputBuffer = [];
    }

    async init() {
        const { vendorId, productId } = this.config;
        const filters = {
            filters: [
                {
                    usbVendorId: vendorId,
                    usbProductId: productId
                }
            ]
        }
        this.port = await navigator.serial.requestPort();
    }

    async open() {
        const config = this.config;
        const portConfig = {
            baudRate: config.baudRate,
            bufferSize: config.bufferSize,
            dataBits: config.dataBits,
            flowControl: config.dataBits,
            parity: config.parity,
            stopBits: config.stopBits
        }
        await this.port.open(portConfig);
        const { writable, readable } = this.port;
        this.isOpen = true;
        this.writer = writable.getWriter();
        this.reader = readable.getReader();
    }

    async close() {
        const { port } = this;
        if (port && port.readable) {
            if (port.readable.locked) {
                await reader.cancel();
                reader.releaseLock();
            }
        }

        if (port && port.writable) {
            if (port.writable.locked) {
                writer.releaseLock();
            }
        }
        await port.close();
        this.isOpen = false;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onopen(doFunc) {
        this.port.addEventListener('connect', event => {
            doFunc(event);
        });
    }

    onclose(doFunc) {
        this.port.addEventListener('disconnect', event => {
            doFunc(event);
        });
    }

    async writeToStream(data) {
        await this.writer.write(new Uint8Array(data));
        //writer.releaseLock();
    }

    async write(data) {
        const dataArrayBuffer = this.encoder.encode(data);
        await this.writer.write(dataArrayBuffer);
        //writer.releaseLock();
    }

    async setDTR(value) {
        await this.port.setSignals({ dataTerminalReady: value });
    }

    async setRTS(value) {
        await this.port.setSignals({ requestToSend: value });
    }

    async reset(data) {
        if (typeof data !== 'object') return;
        let len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].dtr !== undefined
                || data[i].rts !== undefined) {
                var dtrValue = false;
                var rtsValue = false;
                if (data[i]?.dtr) {
                    dtrValue = true;
                }
                if (data[i]?.rts) {
                    rtsValue = true;
                }
                await port.setSignals({ dataTerminalReady: dtrValue, requestToSend: rtsValue });
            } else if (data[i]?.sleep) {
                var sleepValue = parseInt(data[i].sleep) || 100;
                await this.sleep(sleepValue);
            }
        }
    }

    async read() {
        let returnStr = "";
        const { value, done } = await this.reader.read();
        restBuffer = [...restBuffer, ...value];
        do {
            var { text, arr } = this.readString(restBuffer);
            restBuffer = arr;
            returnStr += text;
        } while (text);
        return returnStr;
    }

    readLine(buf) {
        var text = "";
        var endWithLF = false;
        for (var i = 0; i < buf.length; i++) {
            text += String.fromCharCode(buf[i]);
            if (buf[i] === 0x0a) {
                if (i === buf.length - 1) {
                    endWithLF = true;
                }
                break;
            }
        }
        text = text.trim();
        buf = buf.subarray(i + 1);
        return { text: text, buf: buf, endWithLF: endWithLF };
    }

    readChar(arr) {
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
        return { text: text, arr: arr };
    }

    readString(arr) {
        var readStr = "";
        do {
            var { text, arr } = this.readChar(arr);
            readStr += text;
        } while (text);

        return { text: readStr, arr: arr };
    }

    async readLoop() {
        const { port, writer } = this;
        while (port && port.readable && this.keepReading) {
            if (port.readable.locked) {
                //
                try {
                    await this.reader.cancel();
                    this.reader.releaseLock();
                } catch (e) {
                    console.log(e);
                }
            }
            this.reader = port.readable.getReader();
            try {
                while (true) {
                    const { value, done } = await this.reader.read();
                    if (done) {
                        this.reader.releaseLock();
                        try {
                            if (port.writable.locked) {
                                writer.releaseLock();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                        console.log("done!");
                        this.keepReading = false;
                        break;
                    }
                    this.inputBuffer = this.inputBuffer.concat(Array.from(value));
                }
            } catch (error) {
                // Handle |error|...
            } finally {
                this.reader.releaseLock();
            }
        }
        try {
            await port.close();
            this.isOpen = false;
        } catch (e) {
            console.log(e);
        }
    }

    async startRead() {
        this.keepReading = true;
        this.closed = this.readLoop();
    }

    async endRead() {
        this.keepReading = false;
        this.reader.cancel();
        await this.closed;
    }

    async endWrite() {
        const { port, writer } = this;
        if (port && port.writable) {
            if (port.writable.locked) {
                writer.releaseLock();
            }
        }  
    }

    setBaudRate(baud) {
        this.port.baudRate = baud;
    }

    getBaudRate() {
        return this.port.baudRate;
    }
}

Web.SerialPort = WebSerialPort;

})();