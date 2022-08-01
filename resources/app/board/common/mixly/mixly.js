(() => {
goog.provide('Mixly');
goog.provide('Mixly.Web');
goog.provide('Mixly.WebSocket');
goog.provide('Mixly.WebCompiler');
goog.provide('Mixly.Url');
goog.provide('Mixly.Config');

Mixly.get = (inPath) => {
    let str;
    if (typeof nw === 'object') {
        const fs = require('fs');
        const path = require('path');
        if (inPath.indexOf(window.location.origin) !== -1) {
            inPath = inPath.replace(window.location.origin, nw.__dirname);
        } else {
            let dirPath;
            if (fs.existsSync(nw.__filename) && fs.statSync(nw.__filename).isFile()) {
                dirPath = path.resolve(nw.__filename, '../');
            } else {
                dirPath = nw.__filename;
            }
            inPath = path.resolve(dirPath, './' + inPath);
        }
        str = fs.readFileSync(inPath, 'utf-8');
    } else {
        $.ajaxSettings.async = false;
        $.get(inPath, (data) => {
            str = data;
        }, 'text').fail(() => {
            console.log(inPath, '获取失败');
        });
        $.ajaxSettings.async = true;
    }
    return str;
}

Mixly.MIXLY_DIR_PATH = '../mixly';

goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/env.js', ['Mixly.Env'], ['Mixly']);
goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/deps.js', ['Mixly.Deps'], ['Mixly', 'Mixly.Env', 'Mixly.Url']);

const { Config, Url } = Mixly;

/**
* @function url转json
* @description 输入url，返回json
* @param url {String} 输入的url字符串
* @return object
*/
Url.urlToJson = (url) => {
    // 递归字符串生成json对象
    function strToObj(obj, str, value) {
        if(str.indexOf(".") !== -1) {
            let key = str.substring(0, str.indexOf("."));
            str = str.substring(str.indexOf(".") + 1, str.length);
            if (obj[key] === undefined) {
                obj[key] = {};
            }
            obj[key] = strToObj(obj[key], str, value);
            return obj;
        } else {
            const decodeValue = decodeURIComponent(value);
            const decodeKey = decodeURIComponent(str);
            if (isNaN(decodeValue)) {
                const decodeValueLower = decodeValue.toLowerCase();
                switch (decodeValueLower) {
                    case 'true':
                        obj[decodeKey] = true;
                        break;
                    case 'false':
                        obj[decodeKey] = false;
                        break;
                    case 'undefined':
                        obj[decodeKey] = undefined;
                        break;
                    case 'null':
                        obj[decodeKey] = null;
                        break;
                    default:
                        obj[decodeKey] = decodeValue;
                }
            } else {
                obj[decodeKey] = decodeValue-0;
            }
            return obj;
        }
    }
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        try {
            var hash0 = hash[0].replaceAll("@", "=");
            hash0 = hash0.replaceAll("$", "&");
            var hash1 = hash[1].replaceAll("@", "=");
            hash1 = hash1.replaceAll("$", "&");
            myJson = strToObj(myJson, hash0, hash1);
        } catch (e) {
            myJson = strToObj(myJson, hash[0], hash[1]);
        }
    }
    return myJson;
}

/**
* @function 获取主页面传递的配置信息
* @description 返回主页面传递的配置信息
* @return object
*/
Url.getConfig = () => {
    var href = "";
    try {
        href = window.location.href.replaceAll("#", "");
    } catch (e) {
        //console.log(e);
        href = window.location.href;
    }
    href = href.substring(href.indexOf("?") + 1, href.length);
    var board_config = Url.urlToJson(href);
    return board_config;
}

//json转url参数
Url.jsonToUrl = (param, key) => {
    var paramStr = "";
    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        try {
            var newKey = key.toString().replaceAll("=", "@");
            newKey = newKey.replaceAll("&", "$");
            var newParam = param.toString().replaceAll("=", "@")
            newParam = newParam.replaceAll("&", "$");
            paramStr += "&" + newKey + "=" + encodeURIComponent(newParam);
        } catch (e) {
            //console.log(e);
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        }
    } else {
        $.each(param, function (i) {
            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += '&' + Url.jsonToUrl(this, k);
        });
    }
    return paramStr.substr(1);
};

Url.changeURLArg = (url, arg, argVal) => {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + argVal;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}

Url.CRC32 = (str, radix = 10) => {
    const Utf8Encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        let text = "";
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                text += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                text += String.fromCharCode((c >> 6) | 192);
                text += String.fromCharCode((c & 63) | 128);
            } else {
                text += String.fromCharCode((c >> 12) | 224);
                text += String.fromCharCode(((c >> 6) & 63) | 128);
                text += String.fromCharCode((c & 63) | 128);
            }
        }
        return text;
    }

    const makeCRCTable = function () {
        let c;
        const crcTable = [];
        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    }

    const crcTable = makeCRCTable();
    const strUTF8 = Utf8Encode(str);
    let crc = 0 ^ (-1);
    for (let i = 0; i < strUTF8.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ strUTF8.charCodeAt(i)) & 0xFF];
    }
    crc = (crc ^ (-1)) >>> 0;
    return crc.toString(radix);
};

Url.initFingerprintJS = () => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            // This is the visitor identifier:
            let visitorId16 = result.visitorId;
            let VisitorIdNum = parseInt(visitorId16, 16);
            let visitorId32 = VisitorIdNum.toString(32);
            Config.BOARD.visitorId = {
                str16: visitorId16,
                str32: visitorId32,
                str16CRC32b: Url.CRC32(visitorId16, 16),
                str32CRC32b: Url.CRC32(visitorId32, 16)
            };
            console.log(Config.BOARD);
        })
        .catch(error => {
            console.error(error);
            console.log(Config.BOARD);
        });
}

Url.getIPAddress = () => {
    const url = window.location.host;
    const IPList = url.match(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g);
    if (IPList && IPList.length > 0) {
        return IPList[0];
    }
    return null;
}

Config.get = (path, defaultConfig = {}) => {
    const jsonStr = Mixly.get(path);
    try {
        return { ...defaultConfig, ...JSON.parse(jsonStr) };
    } catch (error) {
        console.log(error);
    }
    return defaultConfig;
}

Config.init = () => {
    const urlDefaultConfig = {
        "thirdPartyBoard": false
    }
    let urlConfig = Url.getConfig();
    urlConfig = Object.assign(urlDefaultConfig, urlConfig);
    const boardDefaultConfig = {
        "burn": "None",
        "upload": "None",
        "nav": "None",
        "serial": "None",
        "saveMixWithCode": true
    }
    const swDefaultConfig = {
        "version": "Mixly2.0"
    }
    Config.BOARD = Config.get('./config.json', boardDefaultConfig);
    if (typeof urlConfig === 'object') {
        let {
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardName,
            filePath
        } = urlConfig;
        thirdPartyBoard = thirdPartyBoard ?? false;
        Config.BOARD = {
            ...Config.BOARD,
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardName,
            filePath
        };
        delete urlConfig.thirdPartyBoard;
        delete urlConfig.boardImg;
        delete urlConfig.boardIndex;
        delete urlConfig.boardName;
        delete urlConfig.filePath;
    }

    console.log('Config.BOARD:', Config.BOARD);

    let pathPrefix = '../';
    if (Config.BOARD.thirdPartyBoard)
        pathPrefix = '../../';

    Config.SOFTWARE = Config.get(pathPrefix + '../sw-config.json', swDefaultConfig);
    if (typeof urlConfig === 'object')
        Config.SOFTWARE = { ...Config.SOFTWARE, ...urlConfig };
    Config.pathPrefix = pathPrefix;
    console.log('Config.SOFTWARE:', Config.SOFTWARE);

    //Url.BOARD_CONFIG = { ...Config.BOARD, ...Config.SOFTWARE };

    $.getScript(pathPrefix + 'common/mixly/fp.min.js', () => {
        Url.initFingerprintJS();
    }).fail(() => {
    });
}

Config.init();

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true'
};

Mixly.require = (requireObj) => {
    if (typeof requireObj !== 'object') return;

    const { SOFTWARE } = Config;
    const defaultRequire = {
        "electron": [],
        "web": [],
        "web-socket": {
            "electron": [],
            "web": [],
            "common": []
        },
        "web-compiler": {
            "electron": [],
            "web": [],
            "common": []
        },
        "common": []
    };

    let nowRequire = {
        ...defaultRequire,
        ...requireObj
    };

    Mixly.requireList(nowRequire['common']);

    if (window?.process?.versions?.electron)
        if (SOFTWARE?.nodeServer?.enabled)
            Mixly.requireList([
                ...nowRequire['web-socket']['common'],
                ...nowRequire['web-socket']['electron']
            ]);
        else if (SOFTWARE?.webCompiler?.enabled)
            Mixly.requireList([
                ...nowRequire['web-compiler']['common'],
                ...nowRequire['web-compiler']['electron']
            ]);
    else
        if (SOFTWARE?.nodeServer?.enabled)
            Mixly.requireList([
                ...nowRequire['web-socket']['common'],
                ...nowRequire['web-socket']['web']
            ]);
        else if (SOFTWARE?.webCompiler?.enabled)
            Mixly.requireList([
                ...nowRequire['web-compiler']['common'],
                ...nowRequire['web-compiler']['web']
            ]);
}

Mixly.requireList = (list) => {
    if (typeof list !== 'object') return;
    for (let i = 0; i < list.length; i++)
        goog.require(list[i]);
}

goog.require('Mixly.Env');
goog.require('Mixly.Deps');

})();