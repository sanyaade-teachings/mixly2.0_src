(() => {

goog.require('Mixly');
goog.provide('Mixly.MJSON');

const { MJSON } = Mixly;

MJSON.operate = (jsonObj, optFunc) => {
    let newJsonObj = { ...jsonObj };
    // 循环所有键
    for (var key in newJsonObj) {
        //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
        var element = newJsonObj[key];
        if (element.length > 0 && typeof (element) == "object" || typeof (element) == "object") {
            let data = MJSON.operate(element, optFunc);
            for (let i in data) {
                newJsonObj[key][i] = data[i];
            }
        } else { //不是对象或数组、直接输出
            if (typeof (element) === 'string') {
                try {
                    newJsonObj[key] = optFunc(newJsonObj[key]);
                } catch (e) {
                }
            }
        }
    }
    return newJsonObj;
}

MJSON.decode = (jsonObj) => {
    return MJSON.operate(jsonObj, decodeURIComponent);
}

MJSON.encode = (jsonObj) => {
    return MJSON.operate(jsonObj, encodeURIComponent);;
}

MJSON.parse = (jsonStr) => {
    let jsonObj = null;
    try {
        jsonObj = JSON.parse(jsonStr);
    } catch (error) {
        console.log(error);
    }
    return jsonObj;
}

MJSON.stringify = (jsonObj) => {
    let jsonStr = '';
    try {
        jsonStr = JSON.stringify(jsonObj);
    } catch (error) {
        console.log(error);
    }
    return jsonStr;
}

MJSON.format = (json, options) => {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColon = (options.newlineAfterColon === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColon) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
};

MJSON.get = (path) => {
    const jsonStr = Mixly.get(path);
    if (jsonStr)
        try {
            return JSON.parse(jsonStr);
        } catch(error) {
            console.log(error);
        }
    return null;
}

})();