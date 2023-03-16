(() => {

goog.provide('Mixly');

/**
  * mixly-sw文件夹相对于base.js的路径
  * @type {string}
  */
Mixly.MIXLY_DIR_PATH = '../../mixly-sw';

/**
  * 所有模块的信息所构成的列表，其中模块路径为其相对于mixly目录的相对路径
  * @type {list}
  */
Mixly.DEPENDENCY = [
    {
        "path": '/../common/ui/layui/layui.js',
        "provide": ['layui'],
        "require": []
    }, {
        "path": '/../common/ui/layui/extend/loading/loading.js',
        "provide": ['layui.loading'],
        "require": ['layui']
    }, {
        "path": '/../common/mixly/common/modules/lazyload.js',
        "provide": ['LazyLoad'],
        "require": []
    }, {
        "path": '/../common/mixly/common/local-storage.js',
        "provide": ['Mixly.LocalStorage'],
        "require": ['Mixly']
    }, {
        "path": '/../common/mixly/common/marray.js',
        "provide": ['Mixly.MArray'],
        "require": ['Mixly']
    }, {
        "path": '/../common/mixly/common/mjson.js',
        "provide": ['Mixly.MJSON'],
        "require": ['Mixly']
    }, {
        "path": '/../common/mixly/common/layer-ext.js',
        "provide": ['Mixly.LayerExt'],
        "require": ['layui', 'Mixly.Env', 'Mixly.Config', 'Mixly.DomOperator']
    }, {
        "path": '/../common/mixly/common/dom-operator.js',
        "provide": ['Mixly.DomOperator'],
        "require": ['Mixly.Config', 'Mixly.XML']
    }, {
        "path": '/../common/mixly/common/command.js',
        "provide": ['Mixly.Command'],
        "require": ['Mixly.Config', 'Mixly.MJSON']
    }, {
        "path": '/../common/mixly/common/url.js',
        "provide": ['Mixly.Url'],
        "require": ['Mixly']
    }, {
        "path": '/../common/mixly/electron/cloud-download.js',
        "provide": ['Mixly.CloudDownload'],
        "require": ['Mixly.Env', 'Mixly.Modules']
    }, {
        "path": '/../common/mixly/common/modules/store.modern.min.js',
        "provide": ['store'],
        "require": []
    }, {
        "path": '/../common/mixly/common/modules/select2.min.js',
        "provide": [],
        "require": []
    }, {
        "path": '/../common/mixly/common/modules/xterm.min.js',
        "provide": ['Terminal'],
        "require": []
    }
];

/**
  * 缓存已请求成功的文本数据，防止重复请求
  * @type {object}
  */
Mixly.files = {};

/**
 * @function 根据传入的相对路径获取文件数据
 * @param inPath {string} 文件所在的相对路径
 * @return {string | null} 请求成功返回请求文本，请求失败或请求超时时返回null
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
 * @function 获取对应路径下JSON数据
 * @param inPath {string} JSON文件的相对路径
 * @param defaultConfig {object} 默认的JSON配置信息
 * @return {object | null} 当对应路径下文件不存在时将返回null
 **/
Mixly.getJSON = (inPath, defaultValue = {}) => {
    let jsonStr = Mixly.get(inPath);
    try {
        // 去除JSON字符串中的注释
        jsonStr = jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
        return { ...defaultValue, ...JSON.parse(jsonStr) };
    } catch (error) {
        console.log(error);
    }
    return defaultValue;
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

/**
 * @function 添加依赖项
 * @param {list} 依赖列表
 * @return {void}
 **/
Mixly.addDependency = (dependencyList) => {
    if (typeof dependencyList !== 'object') return;
    for (let i = 0; i < dependencyList.length; i++) {
        const googPath = dependencyList[i].path ?? null;
        const googProvide = dependencyList[i].provide ?? [];
        const googRequire = dependencyList[i].require ?? [];
        if (!googPath || !googProvide || !googRequire) {
            continue;
        }
        goog.addDependency(Mixly.MIXLY_DIR_PATH + googPath, googProvide, googRequire);
    }
}

Mixly.initDependency = () => {
    const depsJson = Mixly.getJSON(goog.normalizePath_(goog.basePath + Mixly.MIXLY_DIR_PATH + '/deps.json'));
    if (depsJson && typeof depsJson === 'object') {
        for (let i in depsJson) {
            Mixly.DEPENDENCY.push(depsJson[i]);
        }
    }
    Mixly.addDependency(Mixly.DEPENDENCY);
}

Mixly.initDependency();

goog.require('Mixly.Loading');
goog.require(Mixly.MIXLY_DIR_PATH + '/../common/mixly/common/modules/select2.min.js');
goog.require('Mixly.Interface');

})();