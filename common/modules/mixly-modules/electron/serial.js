goog.loadJs('electron', () => {

goog.require('layui');
goog.require('Mixly.Serial');
goog.require('Mixly.Env');
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
    Env,
    Electron
} = Mixly;

const { form } = layui;


class ElectronSerial extends Serial {
    static {
        this.ports = [];

        this.getCurrentPorts = function () {
            return this.ports;
        }

        this.getPorts = function () {
            return new Promise((resolve, reject) => {
                if (Env.currentPlatform === 'linux') {
                    child_process.exec('ls /dev/ttyACM* /dev/ttyUSB* /dev/tty*USB*', (err, stdout, stderr) => {
                        let portsName = stdout.split('\n');
                        let newPorts = [];
                        for (let i = 0; i < portsName.length; i++) {
                            if(portsName[i]) {
                                newPorts.push({
                                    vendorId: 'None',
                                    productId: 'None',
                                    name: portsName[i]
                                });
                            }
                        }
                        resolve(newPorts);
                    });
                } else {
                    setTimeout(() => {
                        SerialPort.list().then(ports => {
                            let newPorts = [];
                            for (let i = 0; i < ports.length; i++) {
                                let port = ports[i];
                                newPorts.push({
                                    vendorId: port.vendorId,
                                    productId: port.productId,
                                    name: port.path
                                });
                            }
                            resolve(newPorts);
                        }).catch(error => {
                            reject(error);
                        });
                    }, 100);
                }
            });
        }

        this.refreshPorts = function () {
            this.getPorts()
            .then((ports) => {
                this.ports = ports;
                this.renderSelectBox(ports);
            })
            .catch((error) => {
                console.log(error);
            });
        }

        /**
         * @function 重新渲染串口下拉框
         * @param {array} 当前可用的所有串口
         * @return {void}
         **/
        this.renderSelectBox = function (ports) {
            const $select = $('#ports-type');
            const selectedPort = $select.val();
            $select.empty();
            ports.map(port => {
                let $option = $(`<option value="${port.name}">${port.name}</option>`);
                if (selectedPort === port.name) {
                    $option.attr('selected', true);
                }
                $select.append($option);
            });
            form.render('select', 'ports-type-filter');
            let footerStatus = ports.length ? 'inline-flex' : 'none';
            $('#mixly-footer-port-div').css('display', footerStatus);
            $('#mixly-footer-port').html($select.val());
        }
    }

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
            if (this.isOpened()) {
                resolve();
                return;
            }
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
                    this.onError(error);
                    reject(error);
                } else {
                    resolve();
                }
            });
            this.#addEventsListener_();
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            super.close();
            this.#serialport_.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    setBaudRate(baud) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.update({ baudRate: baud - 0 }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    super.setBaudRate(baud);
                    resolve();
                }
            });
        });
    }

    send(data) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.write(data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    sendString(str) {
        return this.send(str);
    }

    sendBuffer(buffer) {
        return this.send(buffer);
    }

    setDTRAndRTS(dtr, rts) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.set({ dtr, rts }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    super.setDTRAndRTS(dtr, rts);
                    resolve();
                }
            });
        });
    }

    setDTR(dtr) {
        return this.setDTRAndRTS(dtr, this.getRTS());
    }

    setRTS(rts) {
        return this.setDTRAndRTS(this.getDTR(), rts);
    }
}

Electron.Serial = ElectronSerial;

});