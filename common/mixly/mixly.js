(() => {

goog.provide('Mixly');

/**
  * mixly文件夹相对于base.js的路径
  * @type {string}
  */
Mixly.MIXLY_DIR_PATH = '../mixly';

/**
  * 所有模块的信息所构成的列表，其中模块路径为其相对于mixly目录的相对路径
  * @type {list}
  */
Mixly.DEPENDENCY = [
    {
        "path": '/../ui/layui/layui.js',
        "provide": ['layui'],
        "require": []
    }, {
        "path": '/../ui/layui/extend/loading/loading.js',
        "provide": ['layui.loading'],
        "require": ['layui']
    }, {
        "path": '/../blockly-core/blockly_compressed.js',
        "provide": ['Blockly'],
        "require": []
    }, {
        "path": '/../blockly-core/field_grid_dropdown.js',
        "provide": ['Blockly.FieldGridDropdown'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/field_slider.js',
        "provide": ['Blockly.FieldSlider'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/field_bitmap.js',
        "provide": ['Blockly.FieldBitmap'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/field_colour_hsv_sliders.js',
        "provide": ['Blockly.FieldColourHsvSliders'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/field_date.js',
        "provide": ['Blockly.FieldDate'],
        "require": ['Blockly']
    }/*, {
        "path": '/../blockly-core/continuous_toolbox.js',
        "provide": ['ContinuousToolbox', 'ContinuousFlyout', 'ContinuousMetrics'],
        "require": ['Blockly']
    }*/, {
        "path": '/../blockly-core/workspace_search.js',
        "provide": ['WorkspaceSearch'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/workspace_backpack.js',
        "provide": ['Backpack'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/content_highlight.js',
        "provide": ['ContentHighlight'],
        "require": ['Blockly']
    }, {
        "path": '/../blockly-core/zoom_to_fit.js',
        "provide": ['ZoomToFitControl'],
        "require": ['Blockly']
    }, {
        "path": '/common/modules/lazyload.js',
        "provide": ['LazyLoad'],
        "require": []
    }, {
        "path": '/common/modules/microbit-fs.umd.min.js',
        "provide": ['microbitFs'],
        "require": []
    }, {
        "path": '/common/modules/base64.min.js',
        "provide": ['Base64'],
        "require": []
    }, {
        "path": '/common/modules/sortable.min.js',
        "provide": ['Sortable'],
        "require": []
    }, {
        "path": '/common/modules/store.modern.min.js',
        "provide": ['store'],
        "require": []
    }, {
        "path": '/common/modules/xscrollbar.js',
        "provide": ['XScrollbar'],
        "require": []
    }, {
        "path": '/common/modules/popper.min.js',
        "provide": ['Popper'],
        "require": []
    }, {
        "path": '/common/modules/tippy-bundle.umd.min.js',
        "provide": ['tippy'],
        "require": ['Popper']
    }, {
        "path": '/common/modules/select2.min.js',
        "provide": [],
        "require": []
    }, {
        "path": '/common/modules/xterm.min.js',
        "provide": ['Terminal'],
        "require": []
    }, {
        "path": '/common/modules/highcharts.js',
        "provide": ['Highcharts'],
        "require": []
    }, {
        "path": '/common/modules/pouchdb.min.js',
        "provide": ['PouchDB'],
        "require": []
    }, {
        "path": '/common/modules/ace/ace.js',
        "provide": ['ace'],
        "require": []
    }, {
        "path": '/common/modules/ace/ext-language_tools.js',
        "provide": ['ace.ExtLanguageTools'],
        "require": ['ace']
    }, {
        "path": '/web/dap.umd.js',
        "provide": ['DAPjs'],
        "require": []
    }, {
        "path": '/web/serialport.js',
        "provide": ['WebSerialPort'],
        "require": []
    }, {
        "path": '/web-compiler/avr-uploader.js',
        "provide": ['AvrUploader'],
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
    const depsJson = Mixly.getJSON(goog.normalizePath_(goog.basePath + Mixly.MIXLY_DIR_PATH + '/deps.json'), {});
    if (depsJson && typeof depsJson === 'object') {
        for (let i in depsJson) {
            Mixly.DEPENDENCY.push(depsJson[i]);
        }
    }
    Mixly.addDependency(Mixly.DEPENDENCY);
}

Mixly.initDependency();

goog.require('Mixly.Loading');
goog.require('Mixly.JSFuncs');
goog.require('Mixly.Interface');
goog.require('Blockly.FieldGridDropdown');
goog.require('Blockly.FieldSlider');
goog.require('Blockly.FieldBitmap');
goog.require('Blockly.FieldColourHsvSliders');
goog.require('Blockly.FieldDate');
goog.require(Mixly.MIXLY_DIR_PATH + '/common/modules/select2.min.js');
goog.require('XScrollbar');
goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('PouchDB');

/*if (Env.isElectron) {
    goog.require('Mixly.Electron.Loader');
    goog.require('Mixly.Electron.File');
    if (Env.hasSocketServer) {
        goog.require('Mixly.WebSocket.BU');
        goog.require('Mixly.WebSocket.ArduShell');
        goog.require('Mixly.WebSocket.Serial');
        goog.require('Mixly.WebSocket.File');
    } else if (Env.hasCompiler) {
        goog.require('Mixly.WebCompiler.Compiler');
        goog.require('AvrUploader');
    } else {
        goog.require('Mixly.Electron.ArduShell');
        goog.require('Mixly.Electron.Serial');
        goog.require('Mixly.Electron.BU');
        goog.require('Mixly.Electron.PythonShell');
        goog.require('Mixly.Electron.Events');
    }
} else {
    if (Env.hasSocketServer) {
        goog.require('Mixly.WebSocket.BU');
        goog.require('Mixly.WebSocket.ArduShell');
        goog.require('Mixly.WebSocket.Serial');
        goog.require('Mixly.WebSocket.File');
    } else {
        if (Env.hasCompiler) {
            goog.require('Mixly.WebCompiler.Compiler');
            goog.require('AvrUploader');
        }
        goog.require('Highcharts');
        goog.require('Mixly.Web.Serial');
        if (BOARD?.nav?.upload) {
            goog.require('Mixly.Web.Utilities');
            goog.require('Mixly.Web.Esptool');
            goog.require('Mixly.Web.Ampy');
            goog.require('Mixly.Web.BU');
            goog.require('DAPjs');
        }
    }
    goog.require('Mixly.Web.File');
}*/


})();
