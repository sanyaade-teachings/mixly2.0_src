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
goog.MIXLY_DIR_PATH = '../modules/mixly-modules';

/**
  * 所有模块的信息所构成的列表，其中模块路径为其相对于mixly目录的相对路径
  * @type {list}
  */
goog.DEPENDENCIES = [
    {
        "path": '/../../ui/layui/layui.js',
        "provide": ['layui'],
        "require": []
    }, {
        "path": '/../../ui/layui/extend/loading/loading.js',
        "provide": ['layui.loading'],
        "require": ['layui']
    }, {
        "path": '/../../ui/bootstrap/bootstrap.min.js',
        "provide": ['bootstrap'],
        "require": ['Popper']
    }, {
        "path": '/../../blockly-core/blockly_compressed.js',
        "provide": ['Blockly'],
        "require": []
    }, {
        "path": '/../../blockly-core/plugins/field_grid_dropdown.js',
        "provide": ['Blockly.FieldGridDropdown'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/field_slider.js',
        "provide": ['Blockly.FieldSlider'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/field_bitmap.js',
        "provide": ['Blockly.FieldBitmap'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/field_colour_hsv_sliders.js',
        "provide": ['Blockly.FieldColourHsvSliders'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/field_date.js',
        "provide": ['Blockly.FieldDate'],
        "require": ['Blockly']
    }/*, {
        "path": '/../blockly-core/continuous_toolbox.js',
        "provide": ['ContinuousToolbox', 'ContinuousFlyout', 'ContinuousMetrics'],
        "require": ['Blockly']
    }*/, {
        "path": '/../../blockly-core/plugins/workspace_search.js',
        "provide": ['WorkspaceSearch'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/workspace_backpack.js',
        "provide": ['Backpack'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/content_highlight.js',
        "provide": ['ContentHighlight'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/zoom_to_fit.js',
        "provide": ['ZoomToFitControl'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/lexical_variables.js',
        "provide": ['LexicalVariables'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/disable_top_blocks.js',
        "provide": ['DisableTopBlocks'],
        "require": ['Blockly']
    }, {
        "path": '/../../blockly-core/plugins/screenshot.js',
        "provide": ['Blockly.Screenshot'],
        "require": ['Blockly']
    }, {
        "path": '/../web-modules/lazyload.js',
        "provide": ['LazyLoad'],
        "require": []
    }, {
        "path": '/../web-modules/microbit-fs.umd.min.js',
        "provide": ['microbitFs'],
        "require": []
    }, {
        "path": '/../web-modules/base64.min.js',
        "provide": ['Base64'],
        "require": []
    }, {
        "path": '/../web-modules/sortable.min.js',
        "provide": ['Sortable'],
        "require": []
    }, {
        "path": '/../web-modules/store.modern.min.js',
        "provide": ['store'],
        "require": []
    }, {
        "path": '/../web-modules/xscrollbar.js',
        "provide": ['XScrollbar'],
        "require": []
    }, {
        "path": '/../web-modules/popper.min.js',
        "provide": ['Popper'],
        "require": []
    }, {
        "path": '/../web-modules/tippy-bundle.umd.min.js',
        "provide": ['tippy'],
        "require": ['Popper']
    }, {
        "path": '/../web-modules/select2.min.js',
        "provide": ['select2'],
        "require": []
    }, {
        "path": '/../web-modules/xterm.min.js',
        "provide": ['Terminal'],
        "require": []
    }, {
        "path": '/../web-modules/highcharts.min.js',
        "provide": ['Highcharts'],
        "require": []
    }, {
        "path": '/../web-modules/pouchdb.min.js',
        "provide": ['PouchDB'],
        "require": []
    }, {
        "path": '/../web-modules/avr-uploader.min.js',
        "provide": ['AvrUploader'],
        "require": []
    }, {
        "path": '/../web-modules/ace/ace.js',
        "provide": ['ace'],
        "require": []
    }, {
        "path": '/../web-modules/ace/ext-language_tools.js',
        "provide": ['ace.ExtLanguageTools'],
        "require": ['ace']
    }, {
        "path": '/../web-modules/dap.umd.js',
        "provide": ['DAPjs'],
        "require": []
    }, {
        "path": '/../web-modules/d3.min.js',
        "provide": ['d3'],
        "require": []
    }, {
        "path": '/../web-modules/shortid.js',
        "provide": ['shortid'],
        "require": []
    }, {
        "path": '/web/serialport.js',
        "provide": ['WebSerialPort'],
        "require": []
    }, {
        "path": '/web-compiler/avr-uploader.js',
        "provide": ['AvrUploader'],
        "require": []
    }, {
        "path": '/../../msg/blockly/lang.js',
        "provide": ['Blockly.Lang'],
        "require": ['Blockly']
    }, {
        "path": '/../../msg/blockly/zh-hans.js',
        "provide": ['Blockly.Lang.ZhHans'],
        "require": ['Blockly.Lang']
    }, {
        "path": '/../../msg/blockly/zh-hant.js',
        "provide": ['Blockly.Lang.ZhHant'],
        "require": ['Blockly.Lang']
    }, {
        "path": '/../../msg/blockly/en.js',
        "provide": ['Blockly.Lang.En'],
        "require": ['Blockly.Lang']
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
goog.require('Mixly.JSFuncs');
goog.require('Mixly.Interface');
goog.require('select2');
goog.require('XScrollbar');
goog.require('PouchDB');
goog.require('d3');
goog.require('Mixly.Electron.Events');
goog.require('bootstrap');

})();