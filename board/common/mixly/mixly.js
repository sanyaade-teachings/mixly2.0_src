(() => {
goog.provide('Mixly');
goog.provide('Mixly.Web');
goog.provide('Mixly.WebSocket');
goog.provide('Mixly.WebCompiler');
goog.provide('Mixly.Url');
goog.provide('Mixly.Config');


/* Mixly {object} */

Mixly.files = {};

/**
 * @function 根据传入的相对路径获取文件数据
 * @param inPath {string}
 * @return {string | null}
 **/
Mixly.get = (inPath) => {
    let str;
    if (Mixly.files[inPath]) {
        return Mixly.files[inPath];
    }
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
    Mixly.files[inPath] = str;
    return str;
}

/**
 * @function 根据不同环境require不同对象
 * @param requireObj {object}
 * @return {void}
 **/
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
        if (SOFTWARE?.webSocket?.enabled)
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
        if (SOFTWARE?.webSocket?.enabled)
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

/**
 * @function require多个对象
 * @param list {array} 对象字符串列表
 * @return {void}
 **/
Mixly.requireList = (list) => {
    if (typeof list !== 'object') return;
    for (let i = 0; i < list.length; i++)
        goog.require(list[i]);
}

// mixly文件夹相对于base.js的路径
Mixly.MIXLY_DIR_PATH = '../mixly';

// 添加Mixly.Env和Mixly.Deps对象所在文件路径到goog的依赖项列表中
goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/env.js', ['Mixly.Env'], ['Mixly']);
goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/deps.js', ['Mixly.Deps'], ['Mixly', 'Mixly.Env', 'Mixly.Url']);

// 获取Mixly对象中的Config、Url对象
const { Config, Url } = Mixly;

/* Mixly.Url {object} */

/**
* @function 输入url，返回json
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
 * @function JSON对象转Url字符串
 * @param param {object | array | string | number | boolean} 传入的JSON对象或者是转换过程中某个键的对应值
 * @param key {null | string} 转换过程中传入的JSON对象中的某个键
 * @return {string} 转换后的Url字符串
 **/
Url.jsonToUrl = (param, key = null) => {
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

/**
* @function 获取主页面传递的配置信息
* @return {object}
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
    var boardConfig = Url.urlToJson(href);
    return boardConfig;
}

/**
 * @function 更改传入Url字符串中某个参数的值，如果没有则添加该参数
 * @param url {string} Url字符串
 * @param arg {string} 参数名
 * @param argVal {string} 参数名对应值
 * @return {string} 修改后的Url字符串
 **/
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

/**
 * @function 求解某个字符串的CRC32值
 * @param str {string} 传入的字符串
 * @param radix {number} 返回文本的进制，默认十进制
 * @return {string}
 **/
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

/**
 * @function 查询浏览器属性并从中计算出哈希访问者标识符
 * @return {void}
 **/
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

/**
 * @function 获取当前网页的IP地址
 * @return {string | null}
 **/
Url.getIPAddress = () => {
    const url = window.location.host;
    const IPList = url.match(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g);
    if (IPList && IPList.length > 0) {
        return IPList[0];
    }
    return null;
}

/* Mixly.Config {object} */

// 被选中板卡的配置信息
Config.SELECTED_BOARD = {};
// 板卡页面的配置信息
Config.BOARD = {};
// 软件的配置信息
Config.SOFTWARE = {};

const URL_DEFAULT_CONFIG = {
    "thirdPartyBoard": false
};
const BOARD_DEFAULT_CONFIG = {
    "burn": "None",
    "upload": "None",
    "nav": "None",
    "serial": "None",
    "saveMixWithCode": true
};
const SOFTWARE_DEFAULT_CONFIG = {
    "version": "Mixly2.0"
};

/**
 * @function 获取对应路径下JSON数据
 * @param inPath {string} JSON文件的相对路径
 * @param defaultConfig {object} 默认的JSON配置信息
 * @return {object | null} 当对应路径下文件不存在时将返回null
 **/
Config.get = (inPath, defaultConfig = {}) => {
    let jsonStr = Mixly.get(inPath);
    try {
        // 去除JSON字符串中的注释
        jsonStr = jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
        return { ...defaultConfig, ...JSON.parse(jsonStr) };
    } catch (error) {
        console.log(error);
    }
    return defaultConfig;
}

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    const urlConfig = {
        ...URL_DEFAULT_CONFIG,
        ...Url.getConfig()
    };
    Config.BOARD = Config.get('./config.json', BOARD_DEFAULT_CONFIG);
    if (typeof urlConfig === 'object') {
        let {
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardType,
            boardName,
            filePath
        } = urlConfig;
        thirdPartyBoard = thirdPartyBoard ?? false;
        Config.BOARD = {
            ...Config.BOARD,
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardType,
            boardName,
            filePath
        };
        delete urlConfig.thirdPartyBoard;
        delete urlConfig.boardImg;
        delete urlConfig.boardIndex;
        delete urlConfig.boardType;
        delete urlConfig.boardName;
        delete urlConfig.filePath;
    }

    console.log('Config.BOARD:', Config.BOARD);

    let pathPrefix = '../';
    if (Config.BOARD.thirdPartyBoard)
        pathPrefix = '../../';

    Config.SOFTWARE = Config.get(pathPrefix + '../sw-config.json', SOFTWARE_DEFAULT_CONFIG);
    if (typeof urlConfig === 'object')
        Config.SOFTWARE = { ...Config.SOFTWARE, ...urlConfig };
    Config.pathPrefix = pathPrefix;
    console.log('Config.SOFTWARE:', Config.SOFTWARE);
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

goog.require('Mixly.Env');
goog.require('Mixly.Deps');

document.write(`<script language=javascript src='${Config.pathPrefix}common/mixly/lms.js'></script>`);
})();
