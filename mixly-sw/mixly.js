(() => {

goog.provide('Mixly');
goog.provide('Mixly.Web');
goog.provide('Mixly.WebSocket');
goog.provide('Mixly.WebCompiler');
goog.provide('Mixly.Url');
goog.provide('Mixly.Config');

/**
 * @function 根据传入的相对路径获取文件数据
 * @param inPath {string}
 * @return {string | null}
 **/
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

// mixly-sw文件夹相对于base.js的路径
Mixly.MIXLY_DIR_PATH = '../../../mixly-sw';

// 添加Mixly.Env和Mixly.Deps对象所在文件路径到goog的依赖项列表中
goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/env.js', ['Mixly.Env'], ['Mixly']);
goog.addDependency(Mixly.MIXLY_DIR_PATH + '/common/deps.js', ['Mixly.Deps'], ['Mixly', 'Mixly.Env']);

// 获取Mixly对象中的Config、Url对象
const { Url, Config } = Mixly;

/* Mixly.Url {object} */

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
 * @function JSON对象转Url字符串
 * @param param {object | array | string | number | boolean} 传入的JSON对象或者是转换过程中某个键的对应值
 * @param key {null | string} 转换过程中传入的JSON对象中的某个键
 * @return {string} 转换后的Url字符串
 **/
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

/**
* @function 获取板卡页面传递的配置信息
* @description 返回板卡页面传递的配置信息
* @return object
*/
Url.getConfig = () => {
    var href = "";
    try {
        href = window.location.href.replaceAll("#", "");
    } catch (e) {
        href = window.location.href;
    }
    if (href.indexOf("?") !== -1)
        href = href.substring(href.indexOf("?") + 1, href.length);
    else
       return null;
    var board_config = Url.urlToJson(href);
    return board_config;
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
 * @function 获取对应路径下JSON数据
 * @param inPath {string} JSON文件的相对路径
 * @param defaultConfig {object} 默认的JSON配置信息
 * @return {object | null} 当对应路径下文件不存在时将返回null
 **/
Config.get = (path, defaultConfig = {}) => {
    let jsonStr = Mixly.get(path);
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
    const swDefaultConfig = {
        "version": "Mixly2.0",
        "board": {
            "url": "https://gitee.com/mixly2/cloud-libraries/raw/master/cloud-boards/boards.json"
        },
        "defaultPath": {
            "win32": {
                "arduinoCli": "None",
                "python3": "None"
            },
            "darwin": {
                "arduinoCli": "None",
                "python3": "None"
            },
            "linux": {
                "arduinoCli": "None",
                "python3": "None"
            }
        },
        "webSocket": {
            "enabled": false,
            "port": 8082,
            "protocol": "ws:"
        },
        "webCompiler": {
            "enabled": false,
            "port": 8082,
            "protocol": "http:"
        },
        "debug": false
    }
    Config.SOFTWARE = Config.get('./sw-config.json', swDefaultConfig);
    console.log('Config.SOFTWARE:', Config.SOFTWARE);
    Config.BOARDS_INFO = Config.get('./boards.json', {});
    console.log('Config.BOARDS_INFO:', Config.BOARDS_INFO);
    const boardPageConfig = Url.getConfig();
    Config.BOARD_PAGE = boardPageConfig ?? {};
    console.log('Config.BOARD_PAGE:', Config.BOARD_PAGE);
    document.title = Config.SOFTWARE.version ?? 'Mixly 2.0';
}

Config.init();

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true',
    boardIgnore: []
};

goog.require('Mixly.Env');
goog.require('Mixly.Deps');

})();