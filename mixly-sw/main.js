(() => {

const NOW_ENV = window?.process?.versions?.electron ? 'electron' : 'web';

goog.loadJs = (type, func) => {
    if (type !== NOW_ENV && type !== 'common') {
        return;
    }
    func();
}

/**
  * mixly文件夹相对于base.js的路径
  * @type {string}
  */
goog.MIXLY_DIR_PATH = '../../mixly-sw/mixly-modules';

/**
  * 所有模块的信息所构成的列表，其中模块路径为其相对于mixly目录的相对路径
  * @type {list}
  */
goog.DEPENDENCIES = [
    {
        "path": '/../../common/ui/layui/layui.js',
        "provide": ['layui'],
        "require": []
    }, {
        "path": '/../../common/ui/layui/extend/loading/loading.js',
        "provide": ['layui.loading'],
        "require": ['layui']
    }, {
        "path": '/../../common/modules/web-modules/lazyload.js',
        "provide": ['LazyLoad'],
        "require": []
    }, {
        "path": '/../../common/modules/web-modules/pouchdb.min.js',
        "provide": ['PouchDB'],
        "require": []
    }, {
        "path": '/../../common/modules/mixly-modules/common/local-storage.js',
        "provide": ['Mixly.LocalStorage'],
        "require": ['Mixly']
    }, {
        "path": '/../../common/modules/mixly-modules/common/marray.js',
        "provide": ['Mixly.MArray'],
        "require": ['Mixly']
    }, {
        "path": '/../../common/modules/mixly-modules/common/mjson.js',
        "provide": ['Mixly.MJSON'],
        "require": ['Mixly']
    }, {
        "path": '/../../common/modules/mixly-modules/common/layer-ext.js',
        "provide": ['Mixly.LayerExt'],
        "require": ['layui', 'Mixly.Env', 'Mixly.Config', 'Mixly.DomOperator']
    }, {
        "path": '/../../common/modules/mixly-modules/common/dom-operator.js',
        "provide": ['Mixly.DomOperator'],
        "require": ['Mixly.Config', 'Mixly.XML']
    }, {
        "path": '/../../common/modules/mixly-modules/common/command.js',
        "provide": ['Mixly.Command'],
        "require": ['Mixly.Config', 'Mixly.MJSON']
    }, {
        "path": '/../../common/modules/mixly-modules/common/url.js',
        "provide": ['Mixly.Url'],
        "require": ['Mixly']
    }, {
        "path": '/../../common/modules/mixly-modules/electron/cloud-download.js',
        "provide": ['Mixly.Electron.CloudDownload'],
        "require": ['Mixly.Env', 'Mixly.Modules', 'Mixly.Electron']
    }, {
        "path": '/../../common/modules/web-modules/store.modern.min.js',
        "provide": ['store'],
        "require": []
    }, {
        "path": '/../../common/modules/web-modules/select2.min.js',
        "provide": ['select2'],
        "require": []
    }, {
        "path": '/../../common/modules/web-modules/xterm.min.js',
        "provide": ['Terminal'],
        "require": []
    }
];

/**
  * 缓存已请求成功的文本数据，防止重复请求
  * @type {object}
  */
goog.files = {};

/**
 * @function 根据传入的相对路径获取文件数据
 * @param inPath {string} 文件所在的相对路径
 * @return {string | null} 请求成功返回请求文本，请求失败或请求超时时返回null
 **/
goog.get = (inPath) => {
    let str;
    if (goog.files[inPath]) {
        return goog.files[inPath];
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
    goog.files[inPath] = str;
    return str;
}

/**
 * @function 获取对应路径下JSON数据
 * @param inPath {string} JSON文件的相对路径
 * @param defaultConfig {object} 默认的JSON配置信息
 * @return {object | null} 当对应路径下文件不存在时将返回null
 **/
goog.getJSON = (inPath, defaultValue = {}) => {
    let jsonStr = goog.get(inPath);
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
 * @function 添加依赖项
 * @param dependencies {list} 依赖列表
 * @return {void}
 **/
goog.addDependencies = (dependencies) => {
    if (typeof dependencies !== 'object') return;
    for (let i = 0; i < dependencies.length; i++) {
        const googPath = dependencies[i].path ?? null;
        const googProvide = dependencies[i].provide ?? [];
        const googRequire = dependencies[i].require ?? [];
        if (!googPath || !googProvide || !googRequire) {
            continue;
        }
        goog.addDependency(goog.MIXLY_DIR_PATH + googPath, googProvide, googRequire);
    }
}

goog.initDependencies = () => {
    const depsJson = goog.getJSON(goog.normalizePath_(goog.basePath + goog.MIXLY_DIR_PATH + '/deps.json'), {});
    if (depsJson && typeof depsJson === 'object') {
        for (let i in depsJson) {
            goog.DEPENDENCIES.push(depsJson[i]);
        }
    }
    goog.addDependencies(goog.DEPENDENCIES);
}

goog.initDependencies();

goog.require('Mixly.Loading');
goog.require('select2');
goog.require('Mixly.Interface');
goog.require('PouchDB');

})();