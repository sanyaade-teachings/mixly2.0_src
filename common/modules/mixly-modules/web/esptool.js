(() => {

goog.require('Mixly.StatusBar');
goog.require('Mixly.Msg');
goog.require('Mixly.Web.Utilities');
goog.require('Mixly.Web.SerialPort');
goog.provide('Mixly.Web.Esptool');

const {
    StatusBar,
    Msg,
    Web
} = Mixly;

const {
    Utilities,
    SerialPort,
    Esptool
} = Web;

const esp8266FlashSizes = {
    "512KB": 0x00,
    "256KB": 0x10,
    "1MB": 0x20,
    "2MB": 0x30,
    "4MB": 0x40,
    "2MB-c1": 0x50,
    "4MB-c1": 0x60,
    "8MB": 0x80,
    "16MB": 0x90,
};

const esp32FlashSizes = {
    "1MB": 0x00,
    "2MB": 0x10,
    "4MB": 0x20,
    "8MB": 0x30,
    "16MB": 0x40
};

const flashMode = {
    'qio': 0,
    'qout': 1,
    'dio': 2,
    'dout': 3
};

const flashFreq = {
    '40m': 0,
    '80m': 0xf
}

// Defaults
// Flash Frequency: 40m
// Flash Mode: qio
// Flash Size: 1MB

const ESP_ROM_BAUD = 115200;
const FLASH_WRITE_SIZE = 0x400;
const STUBLOADER_FLASH_WRITE_SIZE = 0x4000;
const FLASH_SECTOR_SIZE = 0x1000;  // Flash sector size, minimum unit of erase.

const SYNC_PACKET = toByteArray("\x07\x07\x12 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
const CHIP_DETECT_MAGIC_REG_ADDR = 0x40001000;
const ESP8266 = 0x8266;
const ESP32 = 0x32;
const ESP32S2 = 0x3252;
const ESP32S3 = 0x3253;
const ESP32C3 = 0x32C3;
const ESP32_DATAREGVALUE = 0x15122500;
const ESP8266_DATAREGVALUE = 0x00062000;
const ESP32S2_DATAREGVALUE = 0x500;

// Commands supported by ESP8266 ROM bootloader
const ESP_FLASH_BEGIN = 0x02;
const ESP_FLASH_DATA = 0x03;
const ESP_FLASH_END = 0x04;
const ESP_MEM_BEGIN = 0x05;
const ESP_MEM_END = 0x06;
const ESP_MEM_DATA = 0x07;
const ESP_SYNC = 0x08;
const ESP_WRITE_REG = 0x09;
const ESP_READ_REG = 0x0A;

// Some comands supported by ESP32 ROM bootloader (or -8266 w/ stub)
const ESP_SPI_SET_PARAMS = 0x0B;
const ESP_SPI_ATTACH = 0x0D;
const ESP_READ_FLASH_SLOW = 0x0E  // ROM only, much slower than the stub flash read
const ESP_CHANGE_BAUDRATE = 0x0F;
const ESP_FLASH_DEFL_BEGIN = 0x10
const ESP_FLASH_DEFL_DATA = 0x11
const ESP_FLASH_DEFL_END = 0x12
const ESP_SPI_FLASH_MD5 = 0x13;

// Commands supported by ESP32-S2/S3/C3/C6 ROM bootloader only
const ESP_GET_SECURITY_INFO = 0x14;

// Some commands supported by stub only
const ESP_ERASE_FLASH = 0xD0;
const ESP_ERASE_REGION = 0xD1;
const ESP_READ_FLASH = 0xD2;
const ESP_RUN_USER_CODE = 0xD3;

// Response code(s) sent by ROM
const ROM_INVALID_RECV_MSG = 0x05;

// Initial state for the checksum routine
const ESP_CHECKSUM_MAGIC = 0xEF;


const UART_DATE_REG_ADDR = 0x60000078;

const USB_RAM_BLOCK = 0x800;
const ESP_RAM_BLOCK = 0x1800;

// Timeouts
const DEFAULT_TIMEOUT = 3000;
const CHIP_ERASE_TIMEOUT = 120000;             // timeout for full chip erase in ms
const MAX_TIMEOUT = CHIP_ERASE_TIMEOUT * 2;    // longest any command can run in ms
const SYNC_TIMEOUT = 100;                      // timeout for syncing with bootloader in ms
const ERASE_REGION_TIMEOUT_PER_MB = 30000;     // timeout (per megabyte) for erasing a region in ms
const MEM_END_ROM_TIMEOUT = 500;


const supportedChips = {
    "ESP8266": {
        "chipId": ESP8266,
        "chipName": "ESP8266EX",
        "magicVal": [0xfff0c101],
        "baseFuseAddr": 0x3FF00050,
        "macFuseAddr": 0x3FF00050,
        "stubFile": "esp8266",
        "spiRegBase": 0x60000200,
        "spiUsrOffs": 0x1c,
        "spiUsr1Offs": 0x20,
        "spiUsr2Offs": 0x24,
        "spiMosiDlenOffs": null,
        "spiMisoDlenOffs": null,
        "spiW0Offs": 0x40,
    },
    "ESP32": {
        "chipId": ESP32,
        "chipName": "ESP32",
        "magicVal": [0x00f01d83],
        "baseFuseAddr": 0x3FF5A000,
        "macFuseAddr": 0x3FF5A000,
        "stubFile": "esp32",
        "spiRegBase": 0x3ff42000,
        "spiUsrOffs": 0x1c,
        "spiUsr1Offs": 0x20,
        "spiUsr2Offs": 0x24,
        "spiMosiDlenOffs": 0x28,
        "spiMisoDlenOffs": 0x2c,
        "spiW0Offs": 0x80,
    },
    "ESP32S2": {
        "chipId": ESP32S2,
        "chipName": "ESP32-S2",
        "magicVal": [0x000007c6],
        "baseFuseAddr": 0x3f41A000,
        "macFuseAddr": 0x3f41A044,
        "stubFile": "esp32s2",
        "spiRegBase": 0x3f402000,
        "spiUsrOffs": 0x18,
        "spiUsr1Offs": 0x1c,
        "spiUsr2Offs": 0x20,
        "spiMosiDlenOffs": 0x24,
        "spiMisoDlenOffs": 0x28,
        "spiW0Offs": 0x58,
    },
    "ESP32S3": {
        "chipId": ESP32S3,
        "chipName": "ESP32-S3",
        "magicVal": [0x9],
        "baseFuseAddr": 0x60007000,
        "macFuseAddr": 0x60007044,
        "stubFile": "esp32s3",
        "spiRegBase": 0x60002000,
        "spiUsrOffs": 0x18,
        "spiUsr1Offs": 0x1c,
        "spiUsr2Offs": 0x20,
        "spiMosiDlenOffs": 0x24,
        "spiMisoDlenOffs": 0x28,
        "spiW0Offs": 0x58,
    },
    "ESP32C3": {
        "chipId": ESP32C3,
        "chipName": "ESP32-C3",
        "magicVal": [0x6921506f, 0x1b31506f],
        "baseFuseAddr": 0x60008800,
        "macFuseAddr": 0x60008800 + 0x044,
        "stubFile": "esp32c3",
        "spiRegBase": 0x60002000,
        "spiUsrOffs": 0x18,
        "spiUsr1Offs": 0x1c,
        "spiUsr2Offs": 0x20,
        "spiMosiDlenOffs": 0x24,
        "spiMisoDlenOffs": 0x28,
        "spiW0Offs": 0x58,
    }
}

const STUBS = {
    "esp8266": {
        "text": "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", "text_start": 1074847744, "entry": 1074847748, "data": "CIH+PwUFBAACAwcAAwMLAFHnEECH5xBAtecQQFToEEAF9xBAuugQQBDpEEBc6RBABfcQQCLqEECf6hBAYOsQQAX3EEAF9xBA+OsQQAX3EEDX7hBAn+8QQNjvEEAF9xBABfcQQHXwEEAF9xBAW/EQQAHyEEBA8xBA//MQQND0EEAF9xBABfcQQAX3EEAF9xBA/vUQQAX3EED09hBAL+0QQCfoEEBC9RBAS+oQQJjpEEAF9xBAiPYQQM/2EEAF9xBABfcQQAX3EEAF9xBABfcQQAX3EEAF9xBABfcQQMDpEED/6RBAWvUQQAEAAAACAAAAAwAAAAQAAAAFAAAABwAAAAkAAAANAAAAEQAAABkAAAAhAAAAMQAAAEEAAABhAAAAgQAAAMEAAAABAQAAgQEAAAECAAABAwAAAQQAAAEGAAABCAAAAQwAAAEQAAABGAAAASAAAAEwAAABQAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAUAAAAGAAAABgAAAAcAAAAHAAAACAAAAAgAAAAJAAAACQAAAAoAAAAKAAAACwAAAAsAAAAMAAAADAAAAA0AAAANAAAAAAAAAAAAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAANAAAADwAAABEAAAATAAAAFwAAABsAAAAfAAAAIwAAACsAAAAzAAAAOwAAAEMAAABTAAAAYwAAAHMAAACDAAAAowAAAMMAAADjAAAAAgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAgAAAAMAAAADAAAAAwAAAAMAAAAEAAAABAAAAAQAAAAEAAAABQAAAAUAAAAFAAAABQAAAAAAAAAAAAAAAAAAABAREgAIBwkGCgULBAwDDQIOAQ8AAQEAAAEAAAAEAAAA",
        "data_start": 1073720488
    },
    "esp32": {
        "text": "CAD0PxwA9D8AAPQ/pOv9PxAA9D82QQAh+v/AIAA4AkH5/8AgACgEICB0nOIGBQAAAEH1/4H2/8AgAKgEiAigoHTgCAALImYC54b0/yHx/8AgADkCHfAAAPgg9D/4MPQ/NkEAkf3/wCAAiAmAgCRWSP+R+v/AIACICYCAJFZI/x3wAAAAECD0PwAg9D8AAAAINkEA5fz/Ifv/DAjAIACJApH7/4H5/8AgAJJoAMAgAJgIVnn/wCAAiAJ88oAiMCAgBB3wAAAAAEA2QQBl/P8Wmv+B7f+R/P/AIACZCMAgAJgIVnn/HfAAAAAAAAEAAIAAmMD9P////wAEIPQ/NkEAIfz/MiIEFkMFZfj/FuoEpfv/OEIM+AwUUfT/N6gLOCKAMxDMM1Hy/xwEiCJAOBEl8/+B8P+AgxAx8P/AIACJAzHS/8AgAFJjAMAgAFgDVnX/OEJAM8A5QjgiSkNJIh3wAJDA/T8IQP0/gIAAAISAAABAQAAASID9P5TA/T82QQCx+P8goHRlrwCW6gWB9v+R9v+goHSQmIDAIACyKQCR8/+QiIDAIACSGACQkPQbycDA9MAgAMJYAJqbwCAAokkAwCAAkhgAger/kJD0gID0h5lGgeT/keX/oej/mpjAIADICbHk/4ecGUYCAHzohxrhRgkAAADAIACJCsAgALkJRgIAwCAAuQrAIACJCZHY/5qIDAnAIACSWAAd8AAAUC0GQDZBAEGz/1g0UDNjFuMDWBRaU1BcQYYAACXs/4hEphgEiCSHpfKl5P8Wmv+oFDDDICCyIIHy/+AIAIw6IqDEKVQoFDoiKRQoNDAywDk0HfAACCD0PwAAQABw4vo/SCQGQPAiBkA2YQCl3f+tAYH8/+AIAD0KDBLs6ogBkqIAkIgQiQFl4v+R8v+h8//AIACICaCIIMAgAIJpALIhAKHv/4Hw/+AIAKAjgx3wAAD/DwAANkEAgYf/kqABkkgAMJxBkmgCkfr/MmgBKTgwMLSaIiozMDxBDAIpWDlIpfj/LQqMGiKgxR3wAAAskgBANkEAgqDArQKHkg6ioNuB+//gCACioNyGAwCCoNuHkgiB9//gCACioN2B9P/gCAAd8AAAADZBADoyBgIAAKICABsi5fv/N5L0HfAAAAAQAABYEAAAfNoFQNguBkCc2gVAHNsFQDYhIaLREIH6/+AIAIYJAABR9v+9AVBDY80ErQKB9v/gCAD8Ks0EvQGi0RCB8//gCABKIkAzwFZj/aHs/7LREBqqge7/4AgAoen/HAsaqiX4/y0DBgEAAAAioGMd8AAAADZBAKKgwIHM/+AIAB3wAABsEAAAaBAAAHAQAAB0EAAAeBAAAPxnAEDQkgBACGgAQDZBIWH5/4H5/xpmSQYaiGLREAwELApZCEJmGoH2/+AIAFHx/4HN/xpVWAVXuAIGNwCtBoHL/+AIAIHt/3Hp/xqIelFZCEYlAIHo/0BzwBqIiAi9AXB4Y80HIKIggcL/4AgAjLpx4P8MBVJmFnpxhgwA5fX/cLcgrQFl7P8l9f/NB70BYKYggbj/4AgAeiJ6RDe00IHW/1B0wBqIiAiHN6cG8P8ADAqiRmyB0f8aiKIoAIHR/+AIAFbq/rGo/6IGbBq7pXsA9+oM9kUJWreiSwAbVYbz/7Kv/reayGZFCFImGje1Ale0qKGd/2C2IBCqgIGf/+AIAKXt/6GY/xwLGqrl4//l7P8sCoG9/+AIAB3wAMD8P09IQUmo6/0/fOELQBTgC0AMAPQ/OED0P///AAAAAAEAjIAAABBAAAAAQAAAAMD8PwTA/D8QJwAAFAD0P/D//wCo6/0/CMD8P7DA/T98aABA7GcAQFiGAEBsKgZAODIGQBQsBkDMLAZATCwGQDSFAEDMkABAeC4GQDDvBUBYkgBATIIAQDbBACHe/wwKImEIQqAAge7/4AgAIdn/Mdr/BgEAQmIASyI3Mvcl4f8MS6LBIKXX/2Xg/zHm/iHm/kHS/yojwCAAOQKx0f8hi/4MDAxaSQKB3//gCABBzf9SoQHAIAAoBCwKUCIgwCAAKQSBfv/gCACB2P/gCAAhxv/AIAAoAsy6HMRAIhAiwvgMFCCkgwwLgdH/4AgA8b//0Ur/wb//saz+4qEADAqBzP/gCAAhvP8MBSozIan+YtIrwCAAKAMWcv/AIAAoAwwUwCAAWQNCQRBCAgEMJ0JBEXJRCVlRJpQHHDd3FB4GCABCAgNyAgKARBFwRCBmRBFIIsAgAEgESVFGAQAAHCRCUQnl0v8Mi6LBEGXJ/0ICA3ICAoBEEXBEIHGg/3Bw9Ee3EqKgwGXE/6Kg7iXE/yXQ/0bf/wByAgEM2ZeXAoafAHc5TmZnAgbJAPZ3IGY3AsZxAPZHCGYnAkZXAAYmAGZHAkaFAGZXAoakAEYiAAyZl5cCxpcAdzkIZncCRqYARh0AZpcChpkADLmXlwJGggAGGQAcOZeXAgZCAHc5Kma3AsZPABwJdzkMDPntBZeXAoY2AMYQABwZl5cCBlcAHCRHlwIGbQCGCwCSoNKXlwLGMgB3ORCSoNCXFySSoNGXFzHGBAAAAJKg05eXAoY6AZKg1JeXAoZIAO0FcqD/RqMADBdWZCiBdP/gCACgdIOGngAAACaEBAwXBpwAQiICciIDcJQgkJC0Vrn+pav/cESAnBoG+P8AoKxBgWj/4AgAVjr9ctfwcKTAzCeGcQAAoID0Vhj+RgQAoKD1gWH/4AgAVir7gUv/gHfAgUr/cKTAdzjkxgMAAKCsQYFY/+AIAFY6+XLX8HCkwFan/kZhAHKgwCaEAoZ9AO0FRlMAAAAmtPUGVAByoAEmtAKGdwCyIgOiIgLlsf8GCQAAcqABJrQCBnIAkTb/QiIEUOUgcqDCR7kCBm4AuFKoIgwXZaX/oHWDxmkADBlmtCxIQqEs/+0FcqDCR7oCBmUAeDK4UqgicHSCmeHlov9BEv6Y4VlkQtQreSSglYN9CQZcAJEN/u0FogkAcqDGFkoWeFmYIkLE8ECZwKKgwJB6kwwKkqDvhgIAAKqysgsYG6qwmTBHKvKiAgVCAgSAqhFAqiBCAgbtBQBEEaCkIEICB4BEAaBEIECZwEKgwZB0k4ZEAEH1/e0FkgQAcqDGFkkQmDRyoMhWyQ+SRAB4VAY9AAAcie0FDBeXFALGOQDoYvhy2FLIQrgyqCKBCP/gCADtCqB1g0YzAAwXJkQCxjAAqCK9BYEA/+AIAIYPAADtBXKgwCa0AgYrAEgieDLAIAB5BAwHhicAZkQCRqj/7QVyoMAGJAAADBcmtAJGIQBB5/6YUngimQRB5f55BH0FhhwAseL+DBfYC0LE8J0FQJeT0HWTcJkQ7QVyoMZWeQWB3P5yoMnICEc8TECgFHKgwFY6BH0KDB+GAgAAepKYaUt3mQqdD3qtcOzARzftFvniqQvpCAaK/wAMF2aEF0HM/ngEjBdyoMhZBAwaQcj+cKWDWQR9Cu0FcKB04mENpY3/4iEN4KB0JY3/JZn/VsfAQgIBcqAPdxRARzcUZkQCRnkAZmQCxn8AJjQChvv+hh8AHCd3lAKGcwBHNwscF3eUAgY6AEb1/gByoNJ3FE9yoNR3FHNG8f4AAAC4MqGu/ngiucGBuv7gCAAhq/6RrP7AIAAoArjBIEQ1wCIRkCIQICQgsLKCrQVwu8KBsf7gCACio+iBrv7gCAAG4P4AANIiBcIiBLIiA6giJZL/Rtv+ALICA0ICAoC7EUC7ILLL8KLCGKVy/wbV/kICA3ICAoBEEXBEIHF6/ULE8Jg3kERjFqSzmBealJCcQQYCAJJhDqVd/5IhDqInBKYaBKgnp6nrpVX/Fpr/oicBQMQgssIYgZH+4AgAFkoAIqDEKVcoF0oiKRcoN0BCwEk3xrv+cgIDkgICgHcRkHcgQsIYcsfwDBwGIACRd/4hev3iKQByYQfgIsAiYQYoJgwaJ7cBDDqZ4anB6dElVv+owSFu/qkB6NGhbf69BMLBHPLBGN0CgXb+4AgAzQq4JqhxmOGgu8C5JqB3wLgJqkSoYaq7C6ygrCC5CaCvBSC7wMya0tuADB7QroMW6gCtApnhycHlYv+Y4cjBKQmBPf0oOIynwJ8xwJnA1ikAVrL21qwAgTj9QqDHSVhGAACMPJwCxov+FsKiQTP9IqDIKVRGiP4AgTD9IqDJKVhGhf4AKCJW8qCtBYFT/uAIAKE//oFN/uAIAIFQ/uAIAEZ9/gAoMhbynq0FgUv+4AgAoqPogUX+4AgA4AIABnb+HfAAADZBAJ0CgqDAKAOHmQ/MMgwShgcADAIpA3zihg4AJhIHJiIWhgMAAACCoNuAKSOHmSYMIikDfPJGBwAioNwnmQgMEikDLQiGAwCCoN188oeZBgwSKQMioNsd8AAA",
        "text_start": 1074520064,
        "entry": 1074521496,
        "data": "CMD8Pw==",
        "data_start": 1073605544
    },
    "esp32s2": {
        "text": "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",
        "text_start": 1073905664,
        "entry": 1073907516,
        "data": "CAD9Pw==",
        "data_start": 1073622004
    },
    "esp32c3": {
        "text": "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",
        "text_start": 1077411840,
        "entry": 1077413488,
        "data": "DEDIPw==",
        "data_start": 1070164904
    }
};


class EspLoader {

    constructor(params) {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        this._chipfamily = null;
        this.readTimeout = 3000;  // Arbitrary number for now. This should be set more dynamically in the sendCommand function
        this._efuses = new Array(4).fill(0);
        this._flashsize = 4 * 1024 * 1024;
        if (this.isFunction(params.updateProgress)) {
            this.updateProgress = params.updateProgress
        } else {
            this.updateProgress = null
        }

        if (this.isFunction(params.logMsg)) {
            this.logMsg = params.logMsg
        } else {
            this.logMsg = console.log
        }
        this.debug = false;
        if (this.isFunction(params.debugMsg)) {
            if (params.debug !== false) {
                this.debug = true;
            }
            this._debugMsg = params.debugMsg
        } else {
            this._debugMsg = this.logMsg()
        }
        this.IS_STUB = false;
        this.syncStubDetected = false;
    }

    isFunction(functionObj) {
        return functionObj && {}.toString.call(functionObj) === '[object Function]';
    }

    toHex(value, size = 2) {
        return "0x" + value.toString(16).toUpperCase().padStart(size, "0");
    }

    getChromeVersion() {
        let raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

        return raw ? parseInt(raw[2], 10) : false;
    }

    /**
     * @name slipEncode
     * Take an array buffer and return back a new array where
     * 0xdb is replaced with 0xdb 0xdd and 0xc0 is replaced with 0xdb 0xdc
     */
    slipEncode(buffer) {
        let encoded = [0xC0];
        for (let byte of buffer) {
            if (byte == 0xDB) {
                encoded = encoded.concat([0xDB, 0xDD]);
            } else if (byte == 0xC0) {
                encoded = encoded.concat([0xDB, 0xDC]);
            } else {
                encoded.push(byte);
            }
        }
        encoded.push(0xC0);
        return encoded;
    };

    /**
     * @name macAddr
     * The MAC address burned into the OTP memory of the ESP chip
     */
    macAddr() {
        let macAddr = new Array(6).fill(0);
        let mac0 = this._efuses[0];
        let mac1 = this._efuses[1];
        let mac2 = this._efuses[2];
        let mac3 = this._efuses[3];
        let oui;
        if (this._chipfamily == ESP8266) {
            if (mac3 != 0) {
                oui = [(mac3 >> 16) & 0xFF, (mac3 >> 8) & 0xFF, mac3 & 0xFF];
            } else if (((mac1 >> 16) & 0xFF) == 0) {
                oui = [0x18, 0xFE, 0x34];
            } else if (((mac1 >> 16) & 0xFF) == 1) {
                oui = [0xAC, 0xD0, 0x74];
            } else {
                throw ("Couldnt determine OUI");
            }

            macAddr[0] = oui[0];
            macAddr[1] = oui[1];
            macAddr[2] = oui[2];
            macAddr[3] = (mac1 >> 8) & 0xFF;
            macAddr[4] = mac1 & 0xFF;
            macAddr[5] = (mac0 >> 24) & 0xFF;
        } else if (this._chipfamily == ESP32) {
            macAddr[0] = (mac2 >> 8) & 0xff;
            macAddr[1] = mac2 & 0xff;
            macAddr[2] = (mac1 >> 24) & 0xff;
            macAddr[3] = (mac1 >> 16) & 0xff;
            macAddr[4] = (mac1 >> 8) & 0xff;
            macAddr[5] = mac1 & 0xff;
        } else if ([ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily)) {
            macAddr[0] = (mac1 >> 8) & 0xff;
            macAddr[1] = mac1 & 0xff;
            macAddr[2] = (mac0 >> 24) & 0xff;
            macAddr[3] = (mac0 >> 16) & 0xff;
            macAddr[4] = (mac0 >> 8) & 0xff;
            macAddr[5] = mac0 & 0xff;
        } else {
            throw ("Unknown chip family")
        }
        return macAddr;
    };

    debugMsg(debugLevel, ...values) {
        if (this.debug) {
            this._debugMsg(debugLevel, ...values);
        }
    }

    /**
     * @name _readEfuses
     * Read the OTP data for this chip and store into this.efuses array
     */
    async _readEfuses() {
        let chipType = await this.chipType();
        let chipInfo = this.getChipInfo(chipType);
        for (let i = 0; i < 4; i++) {
            this._efuses[i] = await this.readRegister(chipInfo.macFuseAddr + 4 * i);
        }
    };

    /**
     * @name readRegister
     * Read a register within the ESP chip RAM, returns a 4-element list
     */
    async readRegister(reg) {
        if (this.debug) {
            this.debugMsg(1, "Reading from Register " + this.toHex(reg, 8));
        }
        let packet = struct.pack("<I", reg);
        await this.command(ESP_READ_REG, packet);
        let [val, data] = await this.getResponse(ESP_READ_REG);
        return val;
    };

    /**
     * @name writeRegister
     * Write to a register within the ESP chip RAM, returns a 4-element list
     */
    async writeRegister(addr, value, mask = 0xFFFFFFFF, delayUs = 0, delayAfterUs = 0) {
        if (this.debug) {
            this.debugMsg(1, "Writing to Register " + this.toHex(addr, 8));
        }
        let packet = struct.pack("<IIII", addr, value, mask, delayUs);
        if (delayAfterUs > 0) {
            packet = packet.concat(struct.pack('<IIII', UART_DATE_REG_ADDR, 0, 0, delayAfterUs))
        }
        let returnVal = await this.checkCommand(ESP_WRITE_REG, packet);
        return returnVal;
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * @name chipType
     * ESP32 or ESP8266 based on which chip type we're talking to
     */
    async chipType() {
        if (this._chipfamily === null) {
            this._chipfamily = await this.detectChip()
        }
        return this._chipfamily;
    };

    getChipInfo(chipId) {
        // Loop through supported chips and return the data for that chip
        for (const [key, value] of Object.entries(supportedChips)) {
            if (value["chipId"] == chipId) {
                return value;
            }
        }

        throw ("Chip Id is not Supported")
    }

    async detectChip() {
        let chipMagicValue = await this.readRegister(CHIP_DETECT_MAGIC_REG_ADDR);

        // Loop through magicValues and if the value matches, then the key is the chip ID
        for (const [key, value] of Object.entries(supportedChips)) {
            if (value["magicVal"].includes(chipMagicValue)) {
                return value["chipId"]
            }
        }
        throw ("Unable to detect Chip");
    }

    /**
     * @name chipType
     * The specific name of the chip, e.g. ESP8266EX, to the best
     * of our ability to determine without a stub bootloader.
     */
    async chipName() {
        let chipType = await this.chipType();
        let chipInfo = this.getChipInfo(chipType);
        await this._readEfuses();
        if (chipType == ESP8266) {
            if (this._efuses[0] & (1 << 4) || this._efuses[2] & (1 << 16)) {
                return "ESP8285";
            }
        }
        return chipInfo.chipName;
    };

    /**
     * @name checkCommand
     * Send a command packet, check that the command succeeded and
     * return a tuple with the value and data.
     * See the ESP Serial Protocol for more details on what value/data are
     */
    async checkCommand(opcode, buffer, checksum = 0, timeout = DEFAULT_TIMEOUT) {
        timeout = Math.min(timeout, MAX_TIMEOUT);
        await this.command(opcode, buffer, checksum);
        let [value, data] = await this.getResponse(opcode, timeout);
        let statusLen;
        if (data !== null) {
            if (this.IS_STUB) {
                statusLen = 2;
            } else if (this._chipfamily == ESP8266) {
                statusLen = 2;
            } else if ([ESP32, ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily)) {
                statusLen = 4;
            } else {
                if ([2, 4].includes(data.length)) {
                    statusLen = data.length;
                }
            }
        }

        if (data === null || data.length < statusLen) {
            throw ("Didn't get enough status bytes");
        }
        let status = data.slice(-statusLen, data.length);
        data = data.slice(0, -statusLen);
        if (this.debug) {
            this.debugMsg(1, "status", status);
            this.debugMsg(1, "value", value);
            this.debugMsg(1, "data", data);
        }
        if (status[0] == 1) {
            if (status[1] == ROM_INVALID_RECV_MSG) {
                throw ("Invalid (unsupported) command " + this.toHex(opcode));
            } else {
                throw ("Command failure error code " + this.toHex(status[1]));
            }
        }

        if (data.length > 0) {
            return data;
        }
        return value;
    };

    /**
     * @name timeoutPerMb
     * Scales timeouts which are size-specific
     */
    timeoutPerMb(secondsPerMb, sizeBytes) {
        let result = Math.floor(secondsPerMb * (sizeBytes / 0x1e6));
        if (result < DEFAULT_TIMEOUT) {
            return DEFAULT_TIMEOUT;
        }
        return result;
    };

    /**
     * @name command
     * Send a slip-encoded, checksummed command over the UART,
     * does not check response
     */
    async command(opcode, buffer, checksum = 0) {
        //SerialPort.inputBuffer = []; // Reset input buffer
        let packet = struct.pack("<BBHI", 0x00, opcode, buffer.length, checksum);
        packet = packet.concat(buffer);
        packet = this.slipEncode(packet);
        this.debugMsg(2, "Writing " + packet.length + " byte" + (packet.length == 1 ? "" : "s") + ":", packet);
        await SerialPort.writeByteArr(packet);
    };

    async reset() {
        const signals = await SerialPort.obj.getSignals();
        this.logMsg("尝试复位")
        Mixly.StatusBar.addValue(Msg.Lang["尝试复位"] + "\n", true);
        await SerialPort.obj.setSignals({ dataTerminalReady: false, requestToSend: true });
        await SerialPort.obj.setSignals({ dataTerminalReady: true, requestToSend: false });
        await this.sleep(1000);
    }

    hexFormatter(bytes) {
        return "[" + bytes.map(value => this.toHex(value)).join(", ") + "]"
    }

    /**
     * @name readPacket
     * Generator to read SLIP packets from a serial port.
     * Yields one full SLIP packet at a time, raises exception on timeout or invalid data.
     * Designed to avoid too many calls to serial.read(1), which can bog
     * down on slow systems.
     */

    async readPacket() {
        let partialPacket = null;
        let inEscape = false;
        let readBytes = [];
        this.debugMsg(2, "Read Timeout", this.readTimeout)
        while (true) {
            let stamp = Date.now();
            readBytes = [];
            while (Date.now() - stamp < this.readTimeout) {
                if (SerialPort.inputBuffer.length > 0) {
                    readBytes.push(SerialPort.inputBuffer.shift());
                    break;
                } else {
                    await this.sleep(10);
                }
            }
            if (readBytes.length == 0) {
                let waitingFor = partialPacket === null ? "header" : "content";
                this.debugMsg(1, "Timed out waiting for packet " + waitingFor);
                console.error("Timed out waiting for packet " + waitingFor)
                throw new SlipReadError("Timed out waiting for packet " + waitingFor);
            }
            this.debugMsg(2, "Read " + readBytes.length + " bytes: " + this.hexFormatter(readBytes));
            for (let b of readBytes) {
                if (partialPacket === null) {  // waiting for packet header
                    if (b == 0xc0) {
                        partialPacket = [];
                    } else {
                        this.debugMsg(1, "Read invalid data: " + this.hexFormatter(readBytes));
                        this.debugMsg(1, "Remaining data in serial buffer: " + this.hexFormatter(SerialPort.inputBuffer));
                        throw new SlipReadError('Invalid head of packet (' + this.toHex(b) + ')');
                    }
                } else if (inEscape) {  // part-way through escape sequence
                    inEscape = false;
                    if (b == 0xdc) {
                        partialPacket.push(0xc0);
                    } else if (b == 0xdd) {
                        partialPacket.push(0xdb);
                    } else {
                        this.debugMsg(1, "Read invalid data: " + this.hexFormatter(readBytes));
                        this.debugMsg(1, "Remaining data in serial buffer: " + this.hexFormatter(SerialPort.inputBuffer));
                        throw new SlipReadError('Invalid SLIP escape (0xdb, ' + this.toHex(b) + ')');
                    }
                } else if (b == 0xdb) {  // start of escape sequence
                    inEscape = true;
                } else if (b == 0xc0) {  // end of packet
                    this.debugMsg(2, "Received full packet: " + this.hexFormatter(partialPacket))
                    return partialPacket;
                    partialPacket = null;
                } else {  // normal byte in packet
                    partialPacket.push(b);
                }
            }
        }
        return '';
    }

    /**
     * @name getResponse
     * Read response data and decodes the slip packet, then parses
     * out the value/data and returns as a tuple of (value, data) where
     * each is a list of bytes
     */
    async getResponse(opcode, timeout = DEFAULT_TIMEOUT) {
        this.readTimeout = timeout;
        let packet;
        let packetLength = 0;
        let resp, opRet, lenRet, val, data;
        for (let i = 0; i < 100; i++) {
            try {
                packet = await this.readPacket();
            } catch (e) {
                this.debugMsg(1, "Timed out after " + this.readTimeout + " milliseconds");
                return [null, null];
            }

            if (packet.length < 8) {
                continue;
            }

            [resp, opRet, lenRet, val] = struct.unpack('<BBHI', packet.slice(0, 8));
            if (resp != 1) {
                continue;
            }
            data = packet.slice(8);
            if (opcode == null || opRet == opcode) {
                return [val, data];
            }
            if (data[0] != 0 && data[1] == ROM_INVALID_RECV_MSG) {
                SerialPort.inputBuffer = [];
                throw ("Invalid (unsupported) command " + this.toHex(opcode));
            }
        }
        throw ("Response doesn't match request");
    };

    /**
       * @name read
       * Read response data and decodes the slip packet.
       * Keeps reading until we hit the timeout or get
       * a packet closing byte
       */
    async readBuffer(timeout = DEFAULT_TIMEOUT) {
        this.readTimeout = timeout;
        let packet;
        try {
            packet = await this.readPacket();
        } catch (e) {
            this.debugMsg(1, "Timed out after " + this.readTimeout + " milliseconds");
            return null;
        }

        return packet;
    };


    /**
     * @name checksum
     * Calculate checksum of a blob, as it is defined by the ROM
     */
    checksum(data, state = ESP_CHECKSUM_MAGIC) {
        for (let b of data) {
            state ^= b;
        }
        return state;
    };

    setPortBaudRate(baud) {
        if (this.getChromeVersion() < 86) {
            port.baudrate = baud;
        } else {
            port.baudRate = baud;
        }
    }

    getPortBaudRate() {
        if (this.getChromeVersion() < 86) {
            return port.baudrate;
        }
        return port.baudRate;
    }

    async setBaudrate(baud) {
        if (this._chipfamily == ESP8266) {
            this.logMsg("Baud rate can only change on ESP32 and ESP32-S2");
            StatusBar.addValue(Msg.Lang["只能在ESP32和ESP32-S2上修改波特率"] + '\n');

        } else {
            this.logMsg("Attempting to change baud rate to " + baud + "...");
            StatusBar.addValue(Msg.Lang["尝试修改波特率为"] + baud + "\n");
            try {
                // stub takes the new baud rate and the old one
                let oldBaud = this.IS_STUB ? this.getPortBaudRate() : 0;
                let buffer = struct.pack("<II", baud, oldBaud);
                await this.checkCommand(ESP_CHANGE_BAUDRATE, buffer);
                this.setPortBaudRate(baud);
                await this.sleep(50);
                //SerialPort.inputBuffer = [];
                this.logMsg("Changed baud rate to " + baud);
                StatusBar.addValue(Msg.Lang["已修改波特率为"] + baud + "\n");
            } catch (e) {
                throw ("Unable to change the baud rate, please try setting the connection speed from " + baud + " to 115200 and reconnecting.");
            }
        }
    };

    /**
     * @name sync
     * Put into ROM bootload mode & attempt to synchronize with the
     * ESP ROM bootloader, we will retry a few times
     */
    async sync() {
        this.logMsg("Performing sync...")
        for (let i = 0; i < 5; i++) {
            SerialPort.inputBuffer = []
            let response = await this._sync();
            if (response) {
                await this.sleep(100);
                this.logMsg("Successfully synced.")
                return true;
            }
            await this.sleep(100);
        }

        throw ("Couldn't sync to ESP. Try resetting.");
    };

    /**
     * @name _sync
     * Perform a soft-sync using AT sync packets, does not perform
     * any hardware resetting
     */
    async _sync() {
        await this.command(ESP_SYNC, SYNC_PACKET);
        let [val, data] = await this.getResponse(ESP_SYNC, SYNC_TIMEOUT);
        this.syncStubDetected = (val === 0 ? 1 : 0);
        for (let i = 0; i < 8; i++) {
            let [val, data] = await this.getResponse(ESP_SYNC, SYNC_TIMEOUT);
            this.syncStubDetected &= (val === 0 ? 1 : 0);
            if (data === null) {
                continue;
            }
            if (data.length > 1 && data[0] == 0 && data[1] == 0) {
                return true;
            }
        }
        return false;
    };

    /**
     * @name getFlashWriteSize
     * Get the Flash write size based on the chip
     */
    getFlashWriteSize() {
        return FLASH_WRITE_SIZE;
    };

    /**
     * @name flashData
     * Program a full, uncompressed binary file into SPI Flash at
     *   a given offset. If an ESP32 and md5 string is passed in, will also
     *   verify memory. ESP8266 does not have checksum memory verification in
     *   ROM
     */
    async flashData(binaryData, offset = 0, part = 0) {
        let filesize = binaryData.byteLength;
        this.logMsg("\nWriting data with filesize:" + filesize);
        StatusBar.addValue(Msg.Lang["写入数据，文件大小："] + filesize + "\n");
        let blocks = await this.flashBegin(filesize, offset);
        let block = [];
        let seq = 0;
        let written = 0;
        let address = offset;
        let position = 0;
        let stamp = Date.now();
        let flashWriteSize = this.getFlashWriteSize();

        while (filesize - position > 0) {
            let percentage = Math.floor(100 * (seq + 1) / blocks);
            /*
            this.logMsg(
                "Writing at " + this.toHex(address + seq * flashWriteSize, 8) + "... (" + percentage + " %)"
            );
            */
            //StatusBar.addValue("Writing at " + this.toHex(address + seq * flashWriteSize, 8) + "... (" + percentage + " %)\n", true);
            if (StatusBar.getValue().lastIndexOf("(" + percentage + " %)") == -1) {
                StatusBar.addValue(Msg.Lang["写入数据到"] + " " + this.toHex(address + seq * flashWriteSize, 8) + "... (" + percentage + " %)\n");
            }
            if (this.updateProgress !== null) {
                this.updateProgress(part, percentage);
            }
            if (filesize - position >= flashWriteSize) {
                block = Array.from(new Uint8Array(binaryData, position, flashWriteSize));
            } else {
                // Pad the last block
                block = Array.from(new Uint8Array(binaryData, position, filesize - position));
                block = block.concat(new Array(flashWriteSize - block.length).fill(0xFF));
            }
            await this.flashBlock(block, seq);
            seq += 1;
            written += block.length;
            position += flashWriteSize;
        }
        this.logMsg("Took " + (Date.now() - stamp) + "ms to write " + filesize + " bytes");
        StatusBar.addValue(Msg.Lang["写入"] + " " + filesize + " bytes" + " " + Msg.Lang["耗时"] + " " + (Date.now() - stamp) + " ms\n");
    };

    /**
     * @name flashDeflBegin
     * Start downloading compressed data to Flash (performs an erase)
     *     Returns number of blocks (size FLASH_WRITE_SIZE) to write.
     */
    async flashDeflBegin(size, compsize, offset) {
        let params;
        let flashWriteSize = this.getFlashWriteSize();
        let numBlocks = Math.floor((compsize + flashWriteSize - 1) / flashWriteSize);
        let eraseBlocks = Math.floor((size + flashWriteSize - 1) / flashWriteSize);

        let stamp = Date.now()
        let writeSize, timeout;
        if (this.IS_STUB) {
            writeSize = size  // stub expects number of bytes here, manages erasing internally
            timeout = DEFAULT_TIMEOUT
        } else {
            writeSize = eraseBlocks * self.FLASH_WRITE_SIZE  // ROM expects rounded up to erase block size
            timeout = this.timeoutPerMb(ERASE_REGION_TIMEOUT_PER_MB, writeSize);
        }
        this.logMsg("Compressed " + size + " bytes to " + compsize + "...")
        params = struct.pack(
            "<IIII", writeSize, numBlocks, flashWriteSize, offset
        );
        if ([ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily) && !this.IS_STUB) {
            params = params.concat(struct.pack("<I", 0));
        }

        await this.checkCommand(ESP_FLASH_DEFL_BEGIN, params, 0, timeout);

        if (size != 0 && !this.IS_STUB) {
            // (stub erases as it writes, but ROM loaders erase on begin)
            this.logMsg("Took " + (Date.now() - stamp) + "ms to erase flash block");
        }
        return numBlocks;
    }

    /**
     * @name flashDeflBlock
     * Write block to flash, send compressed
     */
    async flashDeflBlock(data, seq, timeout = DEFAULT_TIMEOUT) {
        await this.checkCommand(
            ESP_FLASH_DEFL_DATA,
            struct.pack("<IIII", data.length, seq, 0, 0).concat(data),
            this.checksum(data),
            timeout,
        );
    };

    /**
     * @name flashDeflFinish
     * Write block to flash, send compressed
     */
    async flashDeflFinish(reboot = false) {
        if (!reboot && !this.IS_STUB) {
            // skip sending flash_finish to ROM loader, as this
            // exits the bootloader. Stub doesn't do this.
            return;
        }
        let pkt = struct.pack('<I', reboot ? 0 : 1);
        await this.checkCommand(ESP_FLASH_DEFL_END, pkt);
    };

    /**
     * @name flashBegin
     * Prepare for flashing by attaching SPI chip and erasing the
     *   number of blocks requred.
     */
    async flashBegin(size = 0, offset = 0, encrypted = false) {
        let buffer;
        let flashWriteSize = this.getFlashWriteSize();
        if (!this.IS_STUB) {
            if ([ESP32, ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily)) {
                await this.checkCommand(ESP_SPI_ATTACH, new Array(8).fill(0));
            }
        }
        //let flashId = await this.flashId();

        if (this._chipfamily == ESP32) {
            // We are hardcoded for 4MB flash on ESP32
            buffer = struct.pack(
                "<IIIIII", 0, this._flashsize, 0x10000, 4096, 256, 0xFFFF
            )
            await this.checkCommand(ESP_SPI_SET_PARAMS, buffer);
        }
        let numBlocks = Math.floor((size + flashWriteSize - 1) / flashWriteSize);
        let eraseSize = this.getEraseSize(offset, size);

        let timeout;
        if (this.IS_STUB) {
            timeout = DEFAULT_TIMEOUT;
        } else {
            timeout = this.timeoutPerMb(ERASE_REGION_TIMEOUT_PER_MB, size);
        }

        let stamp = Date.now();
        buffer = struct.pack(
            "<IIII", eraseSize, numBlocks, flashWriteSize, offset
        );
        if ([ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily) && !this.IS_STUB) {
            buffer = buffer.concat(struct.pack(
                "<I", encrypted ? 1 : 0
            ));
        }
        this.logMsg(
            "Erase size " + eraseSize + ", blocks " + numBlocks + ", block size " + flashWriteSize + ", offset " + this.toHex(offset, 4) + ", encrypted " + (encrypted ? "yes" : "no")
        );
        await this.checkCommand(ESP_FLASH_BEGIN, buffer, 0, timeout);
        if (size != 0 && !this.IS_STUB) {
            this.logMsg("Took " + (Date.now() - stamp) + "ms to erase " + numBlocks + " bytes");
        }
        return numBlocks;
    };

    /**
     * @name flashBlock
     * Send one block of data to program into SPI Flash memory
     */
    async flashBlock(data, seq, timeout = DEFAULT_TIMEOUT) {
        await this.checkCommand(
            ESP_FLASH_DATA,
            struct.pack("<IIII", data.length, seq, 0, 0).concat(data),
            this.checksum(data),
            timeout,
        );
    };

    async flashFinish() {
        let buffer = struct.pack('<I', 1);
        await this.checkCommand(ESP_FLASH_END, buffer);
    };

    /**
     * @name runSpiflashCommand
     * Run an arbitrary SPI flash command.
     *    This function uses the "USR_COMMAND" functionality in the ESP
     *    SPI hardware, rather than the precanned commands supported by
     *    hardware. So the value of spiflash_command is an actual command
     *    byte, sent over the wire.
     *    After writing command byte, writes 'data' to MOSI and then
     *    reads back 'read_bits' of reply on MISO. Result is a number.
     */
    async runSpiflashCommand(spiflashCommand, data = [], readBits = 0, addr = null, addrLen = 0, dummyLen = 0) {
        let chipType = await this.chipType();
        let chipInfo = this.getChipInfo(chipType);

        // SPI_USR register flags
        const SPI_USR_COMMAND = (1 << 31)
        const SPI_USR_ADDR = (1 << 30)
        const SPI_USR_DUMMY = (1 << 29)
        const SPI_USR_MISO = (1 << 28)
        const SPI_USR_MOSI = (1 << 27)

        // SPI registers, base address differs ESP32* vs 8266
        const base = chipInfo.spiRegBase
        const SPI_CMD_REG = base + 0x00
        const SPI_ADDR_REG = base + 0x04
        const SPI_USR_REG = base + chipInfo.spiUsrOffs
        const SPI_USR1_REG = base + chipInfo.spiUsr1Offs
        const SPI_USR2_REG = base + chipInfo.spiUsr2Offs
        const SPI_W0_REG = base + chipInfo.spiW0Offs

        // shift values
        const SPI_USR2_COMMAND_LEN_SHIFT = 28
        const SPI_USR_ADDR_LEN_SHIFT = 26

        // SPI peripheral "command" bitmasks for SPI_CMD_REG
        const SPI_CMD_USR = (1 << 18);

        let setDataLengths;
        let flags;
        //following two registers are ESP32 and later chips only
        if (chipInfo.spiMosiDlenOffs != null) {
            // ESP32 and later chips have a more sophisticated way to set up "user" commands
            setDataLengths = async function (mosi_bits, miso_bits) {
                const SPI_MOSI_DLEN_REG = base + chipInfo.spiMosiDlenOffs;
                const SPI_MISO_DLEN_REG = base + chipInfo.spiMisoDlenOffs;
                if (mosi_bits > 0) {
                    await this.writeRegister(SPI_MOSI_DLEN_REG, mosi_bits - 1);
                }
                if (miso_bits > 0) {
                    await this.writeRegister(SPI_MISO_DLEN_REG, miso_bits - 1);
                }
                flags = 0;
                if (dummyLen > 0) {
                    flags |= (dummyLen - 1);
                }
                if (addrLen > 0) {
                    flags |= (addrLen - 1) << SPI_USR_ADDR_LEN_SHIFT;
                }
                if (flags) {
                    await this.writeRegister(SPI_USR1_REG, flags);
                }
            }
        } else {
            setDataLengths = async function (mosi_bits, miso_bits) {
                const SPI_DATA_LEN_REG = SPI_USR1_REG;
                const SPI_MOSI_BITLEN_S = 17;
                const SPI_MISO_BITLEN_S = 8;
                let mosi_mask = (mosi_bits == 0) ? 0 : (mosi_bits - 1);
                let miso_mask = (miso_bits == 0) ? 0 : (miso_bits - 1);
                flags = (miso_mask << SPI_MISO_BITLEN_S) | (mosi_mask << SPI_MOSI_BITLEN_S);
                if (dummyLen > 0) {
                    flags |= (dummyLen - 1);
                }
                if (addrLen > 0) {
                    flags |= (addrLen - 1) << SPI_USR_ADDR_LEN_SHIFT;
                }
                await this.writeRegister(SPI_DATA_LEN_REG, flags);
            }
        }
        setDataLengths = setDataLengths.bind(this);
        if (readBits > 32) {
            throw new FatalError("Reading more than 32 bits back from a SPI flash operation is unsupported")
        }
        if (data.length > 64) {
            throw new FatalError("Writing more than 64 bytes of data with one SPI command is unsupported")
        }

        let dataBits = data.length * 8
        let old_spi_usr = await this.readRegister(SPI_USR_REG);
        let old_spi_usr2 = await this.readRegister(SPI_USR2_REG);
        flags = SPI_USR_COMMAND;
        if (readBits > 0) {
            flags |= SPI_USR_MISO;
        }
        if (dataBits > 0) {
            flags |= SPI_USR_MOSI;
        }
        if (addrLen > 0) {
            flags |= SPI_USR_ADDR;
        }
        if (dummyLen > 0) {
            flags |= SPI_USR_DUMMY;
        }
        await setDataLengths(dataBits, readBits);
        await this.writeRegister(SPI_USR_REG, flags)
        await this.writeRegister(SPI_USR2_REG,
            (7 << SPI_USR2_COMMAND_LEN_SHIFT) | spiflashCommand)
        if (addr != null && addrLen > 0) {
            await this.writeRegister(SPI_ADDR_REG, addr);
        }
        if (dataBits == 0) {
            await this.writeRegister(SPI_W0_REG, 0)  // clear data register before we read it
        } else {
            data = data.concat(new Array(4 - data.length).fill(0));  // pad to 32-bit multiple
            let words = struct.unpack("I" * Math.floor(data.length / 4), data);
            let next_reg = SPI_W0_REG;
            for (let word of words) {
                await this.writeRegister(next_reg, word)
                next_reg += 4;
            }
        }
        await this.writeRegister(SPI_CMD_REG, SPI_CMD_USR)

        let waitDone = async function () {
            for (let i = 0; i < 10; i++) {
                if ((await this.readRegister(SPI_CMD_REG) & SPI_CMD_USR) == 0) {
                    return
                }
            }
            throw new FatalError("SPI command did not complete in time")
        }
        waitDone = waitDone.bind(this);
        await waitDone();

        let status = await this.readRegister(SPI_W0_REG);
        // restore some SPI controller registers
        await this.writeRegister(SPI_USR_REG, old_spi_usr);
        await this.writeRegister(SPI_USR2_REG, old_spi_usr2);
        return status

    }

    async flashId() {
        const SPIFLASH_RDID = 0x9F;

        return await this.runSpiflashCommand(SPIFLASH_RDID, [], 24);
    }

    /**
     * @name getEraseSize
     * Calculate an erase size given a specific size in bytes.
     *   Provides a workaround for the bootloader erase bug on ESP8266.
     */
    getEraseSize(offset, size) {
        if (this._chipfamily != ESP8266 || this.IS_STUB) {
            return size;
        }
        let sectorsPerBlock = 16;
        let sectorSize = FLASH_SECTOR_SIZE;
        let numSectors = Math.floor((size + sectorSize - 1) / sectorSize);
        let startSector = Math.floor(offset / sectorSize);

        let headSectors = sectorsPerBlock - (startSector % sectorsPerBlock);
        if (numSectors < headSectors) {
            headSectors = numSectors;
        }

        if (numSectors < 2 * headSectors) {
            return Math.floor((numSectors + 1) / 2 * sectorSize);
        }

        return (numSectors - headSectors) * sectorSize;
    };

    /**
   * @name memBegin (592)
   * Start downloading an application image to RAM
   */
    async memBegin(size, blocks, blocksize, offset) {
        if (this.IS_STUB) {
            let stub = await this.getStubCode();
            let load_start = offset;
            let load_end = offset + size;
            console.log(load_start, load_end);
            console.log(stub.data_start, stub.data.length, stub.text_start, stub.text.length);
            for (let [start, end] of [
                [stub.data_start, stub.data_start + stub.data.length],
                [stub.text_start, stub.text_start + stub.text.length]]
            ) {
                if (load_start < end && load_end > start) {
                    throw ("Software loader is resident at " + this.toHex(start, 8) + "-" + this.toHex(end, 8) + ". " +
                        "Can't load binary at overlapping address range " + this.toHex(load_start, 8) + "-" + this.toHex(load_end, 8) + ". " +
                        "Try changing the binary loading address.");
                }
            }
        }

        return this.checkCommand(ESP_MEM_BEGIN, struct.pack('<IIII', size, blocks, blocksize, offset));
    }

    /**
     * @name memBlock (609)
     * Send a block of an image to RAM
     */
    async memBlock(data, seq) {
        return await this.checkCommand(
            ESP_MEM_DATA,
            struct.pack('<IIII', data.length, seq, 0, 0).concat(data),
            this.checksum(data)
        );
    }

    /**
     * @name memFinish (615)
     * Leave download mode and run the application
     *
     * Sending ESP_MEM_END usually sends a correct response back, however sometimes
     * (with ROM loader) the executed code may reset the UART or change the baud rate
     * before the transmit FIFO is empty. So in these cases we set a short timeout and
     * ignore errors.
     */
    async memFinish(entrypoint = 0) {
        let timeout = this.IS_STUB ? DEFAULT_TIMEOUT : MEM_END_ROM_TIMEOUT;
        let data = struct.pack('<II', parseInt(entrypoint == 0), entrypoint);
        try {
            return await this.checkCommand(ESP_MEM_END, data, 0, timeout);
        } catch (e) {
            if (this.IS_STUB) {
                throw (e);
            }
        }
    }

    async getStubCode() {
        let chipType = await this.chipType();
        let chipInfo = this.getChipInfo(chipType);
        /*
        let response = await fetch('stubs/' + this.getStubFile() + '.json');
        let stubcode = await response.json();
     
        // Base64 decode the text and data
        stubcode.text = toByteArray(atob(stubcode.text));
        stubcode.data = toByteArray(atob(stubcode.data));
        */

        var stubcode = {};
        let subCodeKey = ["text", "text_start", "entry", "data", "data_start"];
        for (let i = 0; i < subCodeKey.length; i++) {
            if (STUBS[chipInfo.stubFile]
                && STUBS[chipInfo.stubFile][subCodeKey[i]]) {
                if (subCodeKey[i] == "text" || subCodeKey[i] == "data") {
                    stubcode[subCodeKey[i]] = toByteArray(atob(STUBS[chipInfo.stubFile][subCodeKey[i]]));
                } else {
                    stubcode[subCodeKey[i]] = parseInt(STUBS[chipInfo.stubFile][subCodeKey[i]]);
                }
            }
        }

        return stubcode;
    }
    getStubLoaderClass() {
        // Based on current chip, we return the appropriate stub loader class
    }

    getRomClass() {
        // Based on current chip, we return the appropriate Rom class
    }

    async runStub(stub = null) {
        if (stub === null) {
            stub = await this.getStubCode();
        }

        if (this.syncStubDetected || this.IS_STUB) {
            this.logMsg("Stub is already running. No upload is necessary.");
            return this.stubClass;
        }

        let ramBlock = ESP_RAM_BLOCK;
        // We're transferring over USB, right?
        if ([ESP32S2, ESP32S3, ESP32C3].includes(this._chipfamily)) {
            ramBlock = USB_RAM_BLOCK;
        }

        // Upload
        this.logMsg("Uploading stub...")
        StatusBar.addValue(Msg.Lang["上传"] + " stub...\n");
        for (let field of ['text', 'data']) {
            if (Object.keys(stub).includes(field)) {
                let offset = stub[field + "_start"];
                let length = stub[field].length;
                let blocks = Math.floor((length + ramBlock - 1) / ramBlock);
                await this.memBegin(length, blocks, ramBlock, offset);
                for (let seq of Array(blocks).keys()) {
                    let fromOffs = seq * ramBlock;
                    let toOffs = fromOffs + ramBlock;
                    if (toOffs > length) {
                        toOffs = length;
                    }
                    await this.memBlock(stub[field].slice(fromOffs, toOffs), seq);
                }
            }
        }
        this.logMsg("Running stub...")
        StatusBar.addValue(Msg.Lang["运行"] + " stub...\n");
        await this.memFinish(stub['entry']);

        let p = await this.readBuffer(500);
        p = String.fromCharCode(...p);

        if (p != 'OHAI') {
            throw "Failed to start stub. Unexpected response: " + p;
        }
        this.logMsg("Stub is now running...");
        StatusBar.addValue("Stub " + Msg.Lang["正在运行中"] + "...\n");
        this.stubClass = new EspStubLoader({
            updateProgress: this.updateProgress,
            logMsg: this.logMsg,
            debugMsg: this._debugMsg,
            debug: this.debug,
        });
        return this.stubClass;
    }
}

class EspStubLoader extends EspLoader {
    /*
      The Stubloader has commands that run on the uploaded Stub Code in RAM
      rather than built in commands.
    */
    constructor(params) {
        super(params);
        this.IS_STUB = true;
    }
    /**
     * @name eraseFlash
     * depending on flash chip model the erase may take this long (maybe longer!)
     */
    async eraseFlash() {
        await this.checkCommand(ESP_ERASE_FLASH, [], 0, CHIP_ERASE_TIMEOUT);
    };

    /**
     * @name getFlashWriteSize
     * Get the Flash write size based on the chip
     */
    getFlashWriteSize() {
        return STUBLOADER_FLASH_WRITE_SIZE;
    };
}

class Esp32StubLoader extends EspStubLoader {

}

/*
Represents error when NVS Partition size given is insufficient
to accomodate the data in the given csv file
*/
class SlipReadError extends Error {
    constructor(message) {
        super(message);
        this.name = "SlipReadError";
    }
}

class FatalError extends Error {
    constructor(message) {
        super(message);
        this.name = "FatalError";
    }
}

Esptool.EspLoader = EspLoader;
Esptool.EspStubLoader = EspStubLoader;
Esptool.SlipReadError = SlipReadError;
Esptool.FatalError = FatalError;

})();

