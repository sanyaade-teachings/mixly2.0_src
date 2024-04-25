goog.loadJs('electron', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Serial');

const lodash_fp = Mixly.require('lodash/fp');
const child_process = Mixly.require('child_process');
const serialport = Mixly.require('serialport');

const {
    SerialPort,
    ReadlineParser,
    ByteLengthParser
} = serialport;

const {
    Serial,
    Electron
} = Mixly;


class ElectronSerial extends Serial {
    #serialport_ = null;
    #parserBytes_ = null;
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#parserBytes_.on('data', (buffer) => {
            this.onBuffer(buffer);
        });

        this.#serialport_.on('error', (error) => {
            this.onError(error);
            this.onClose(1);
        });

        this.#serialport_.on('open', () => {
            this.onOpen();
        });

        this.#serialport_.on('close', () => {
            this.onClose(1);
        });
    }

    open() {
        return new Promise((resolve, reject) => {
            super.open();
            this.#serialport_ = new SerialPort({
                path: this.getPort(),
                baudRate: this.getBaudRate() - 0,  // 波特率
                dataBits: 8,  // 数据位
                parity: 'none',  // 奇偶校验
                stopBits: 1,  // 停止位
                flowControl: false,
                autoOpen: false  // 不自动打开
            }, false);
            this.#parserBytes_ = this.#serialport_.pipe(new ByteLengthParser({ length: 1 }));
            this.#serialport_.open((error) => {
                if (error) {
                    reject(error);
                    this.onError(error);
                    // this.onClose(1);
                } else {
                    resolve();
                }
            });
            this.#addEventsListener_();
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            super.close();
            if (this.isOpened()) {
                this.#serialport_.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}

Electron.Serial = ElectronSerial;

});