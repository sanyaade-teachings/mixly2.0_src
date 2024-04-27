goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.provide('Mixly.Serial');

const { Config, Events } = Mixly;

const { BOARD } = Config;


class Serial {
    static {
        this.DEFAULT_CONFIG = {
            ctrlCBtn: false,
            ctrlDBtn: false,
            baudRates: 9600,
            yMax: 100,
            yMin: 0,
            pointNum: 100,
            rts: true,
            dtr: true
        };

        this.getSelectedPortName = function () {
            return $('#ports-type').val();
        }

        this.getConfig = function () {
            let config = BOARD?.serial ?? {};
            return {
                ...this.DEFAULT_CONFIG,
                ...config
            };
        }
    }

    #buffer_ = [];
    #bufferLength_ = 0;
    #encoder_ = new TextEncoder();
    #decoder_ = new TextDecoder('utf-8');
    #baud_ = 115200;
    #dtr_ = false;
    #rts_ = false;
    #isOpened_ = false;
    #port_ = '';
    #events_ = new Events(['onOpen', 'onClose', 'onError', 'onBuffer', 'onString']);
    constructor(port) {
        this.#port_ = port;
        this.resetBuffer();
    }

    decodeBuffer(buffer) {
        let output = '';
        for (let i = 0; i < buffer.length; i++) {
            output += this.decodeByte(buffer[i]);
        }
        return output;
    }

    /*  UTF-8编码方式
    *   ------------------------------------------------------------
    *   |1字节 0xxxxxxx                                             |
    *   |2字节 110xxxxx 10xxxxxx                                    |
    *   |3字节 1110xxxx 10xxxxxx 10xxxxxx                           |
    *   |4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx                  |
    *   |5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx         |
    *   |6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx|
    *   ------------------------------------------------------------
    **/
    decodeByte(byte) {
        let output = '';
        if ((byte & 0x80) === 0x00) {
            // 1字节
            this.#buffer_ = [];
            this.#bufferLength_ = 0;
            if (byte !== 0x0A) {
                output += String.fromCharCode(byte);
            }
        } else if ((byte & 0xc0) === 0x80) {
            /*
            * 2字节以上的中间字节，10xxxxxx
            * 如果没有起始头，则丢弃这个字节
            * 如果不是2字节及以上的起始头，则丢弃这个字节
            **/
            if (!this.#buffer_.length || this.#bufferLength_ < 2) {
                return output;
            }
            this.#buffer_.push(byte);
            if (this.#bufferLength_ === this.#buffer_.length) {
                output += this.#decoder_.decode(new Uint8Array(this.#buffer_));
                this.#buffer_ = [];
            }
        } else {
            // 2字节以上的起始头
            if (this.#buffer_.length) {
                this.#buffer_ = [];
            }
            this.#bufferLength_ = this.#getBufferLength_(byte);
            this.#buffer_.push(byte);
        }
        return output;
    }

    #getBufferLength_(byte) {
        let len = 2;
        if ((byte & 0xFC) === 0xFC) {
            len = 6;
        } else if ((byte & 0xF8) === 0xF8) {
            len = 5;
        } else if ((byte & 0xF0) === 0xF0) {
            len = 4;
        } else if ((byte & 0xE0) === 0xE0) {
            len = 3;
        } else if ((byte & 0xC0) === 0xC0) {
            len = 2;
        }
        return len;
    }

    resetBuffer() {
        this.#buffer_ = [];
        this.#bufferLength_ = 0;
    }

    open(baud) {
        this.#isOpened_ = true;
    }

    close() {
        this.#isOpened_ = false;
    }

    toggle() {
        if (this.isOpened()) {
            return this.close();
        } else {
            return this.open();
        }
    }

    setBaudRate(baud) {
        this.#baud_ = baud;
    }

    setDTR(dtr) {
        this.#dtr_ = dtr;
    }

    setRTS(rts) {
        this.#rts_ = rts;
    }

    setDTRAndRTS(dtr, rts) {
        this.#dtr_ = dtr;
        this.#rts_ = rts;
    }

    getPort() {
        return this.#port_;
    }

    getBaudRate() {
        return this.#baud_;
    }

    getDTR() {
        return this.#dtr_;
    }

    getRTS() {
        return this.#rts_;
    }

    sendString(str) {}

    sendBuffer(buffer) {}

    onBuffer(buffer) {
        this.#events_.run('onBuffer', buffer);
        const data = this.decodeBuffer(buffer);
        if (!data) {
            return;
        }
        this.#events_.run('onString', data);
    }

    onOpen() {
        this.#isOpened_ = true;
        this.#events_.run('onOpen');
    }

    onClose(code) {
        this.#isOpened_ = false;
        this.#events_.run('onClose', code);
    }

    onError(error) {
        this.#isOpened_ = false;
        this.#events_.run('onError', error);
    }

    isOpened() {
        return this.#isOpened_;
    }

    config(info) {
        return Promise.all([
            this.setBaudRate(info.baud),
            this.setDTRAndRTS(info.dtr, info.rts)
        ]);
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        return this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

Mixly.Serial = Serial;

});