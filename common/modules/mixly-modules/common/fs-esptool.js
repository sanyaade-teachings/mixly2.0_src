goog.loadJs('common', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Boards');
goog.provide('Mixly.FSEsptool');

const {
    Serial,
    Boards
} = Mixly;


class FSEsptool {
    static {
        this.ESP32_PARTITIONS = {
            'app3M_fat9M_16MB': {
                type: 'fat',
                offset: 0x610000,
                size: 0x9F0000,
                blocksize: 4096,
                pagesize: 256
            },
            'default': {
                type: 'spiffs',
                offset: 0x290000,
                size: 0x160000
            },
            'default_8MB': {
                type: 'spiffs',
                offset: 0x670000,
                size: 0x190000
            },
            'default_16MB': {
                type: 'spiffs',
                offset: 0xc90000,
                size: 0x370000
            },
            'default_ffat': {
                type: 'fat',
                offset: 0x290000,
                size: 0x170000
            },
            'ffat': {
                type: 'fat',
                offset: 0x410000,
                size: 0xBF0000
            },
            'huge_app': {
                type: 'spiffs',
                offset: 0x310000,
                size: 0xF0000
            },
            'large_spiffs_16MB': {
                type: 'spiffs',
                offset: 0x910000,
                size: 0x6F0000
            },
            'min_spiffs': {
                type: 'spiffs',
                offset: 0x3D0000,
                size: 0x30000
            },
            'minimal': {
                type: 'spiffs',
                offset: 0x150000,
                size: 0xB0000
            },
            'no_ota': {
                type: 'spiffs',
                offset: 0x210000,
                size: 0x1F0000
            },
            'noota_3g': {
                type: 'spiffs',
                offset: 0x110000,
                size: 0x2F0000
            },
            'noota_3gffat': {
                type: 'fat',
                offset: 0x110000,
                size: 0x2F0000
            },
            'noota_ffat': {
                type: 'fat',
                offset: 0x210000,
                size: 0x1F0000
            },
            'rainmaker': {
                offset: 0x290000,
                size: 0x160000
            }
        };
    }

    #config_ = {
        port: '',
        type: 'spiffs',
        offset: 0x290000,
        size: 0x160000,
        usrFolder: '',
        blocksize: 4096,
        pagesize: 256
    };

    constructor() {}

    download(usrFolder) {
        this.config({ usrFolder });
    }

    upload(usrFolder) {
        this.config({ usrFolder });
    }

    config(config) {
        this.#config_.port = Serial.getSelectedPortName();
        const keys = Boards.getSelectedBoardKey().split(':');
        if (keys[0] === 'esp32') {
            const partitionScheme = Boards.getSelectedBoardConfigParam('PartitionScheme');
            Object.assign(this.#config_, FSEsptool.ESP32_PARTITIONS[partitionScheme]);
        } else if (keys[0] === 'esp8266') {

        }
        Object.assign(this.#config_, config);
    }

    getConfig() {
        return this.#config_;
    }
}

Mixly.FSEsptool = FSEsptool;

});