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

MJSON.get = (inPath) => {
    return goog.getJSON(inPath);
}

})();