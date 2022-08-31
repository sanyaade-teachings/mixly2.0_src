(() => {

goog.require('Mixly');
goog.provide('Mixly.MString');

const { MString } = Mixly;

/**
 * @function 使用传入值替换字符串中{xxx}
 * @param str {string} 传入字符串
 * @param obj {object}
 *  obj = {
 *      xxx: value1，
 *      xxx: value2
 *  }
 *  使用value替换{xxx}
 * @return {string} 返回处理后的字符串
 **/
MString.tpl = (str, obj) => {
    if (typeof str !== 'string' || !(obj instanceof Object)) {
        return str;
    }
    for (let key in obj) {
        let re = new RegExp("{[\s]*" + key + "[\s]*}", "gim");
        str = str.replace(re, obj[key]);
    }
    return str;
}

})();