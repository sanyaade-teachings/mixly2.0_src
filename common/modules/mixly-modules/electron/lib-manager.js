(() => {

goog.require('LazyLoad');
goog.require('layui');
goog.require('Code');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.require('Mixly.XML');
goog.require('Mixly.ScriptLoader');
goog.require('Mixly.CssLoader');
goog.require('Mixly.Boards');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.Nav');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron.CloudDownload');
goog.provide('Mixly.Electron.LibManager');

const {
    Env,
    Modules,
    Electron,
    XML,
    ScriptLoader,
    CssLoader,
    Boards,
    LayerExt,
    Config,
    Nav,
    Msg
} = Mixly;

const {
    fs,
    fs_extra,
    fs_extend,
    path,
    compressing,
    electron_remote
} = Modules;

const { BOARD, USER } = Config;

const { CloudDownload, LibManager } = Electron;

const { table, element } = layui;

const { dialog, shell } = electron_remote;

LibManager.URL = {
    mixly: BOARD?.lib?.mixly?.url[0],
    arduino: BOARD?.lib?.arduino?.url[0],
    python: BOARD?.lib?.python?.url[0]
}

LibManager.LOCAL_IMPORT_FILTERS = {
    'MIXLY': [
        { name: 'Mixly Lib File', extensions: ['xml', 'mil', 'zip'] }
    ],
    'ARDUINO': [
        { name: 'ZIP File', extensions: ['zip'] }
    ],
    'PYTHON': [
        { name: 'Python File', extensions: ['py'] }
    ]
};

LibManager.getDefaultXML = () => {
    let $toolbox = $('#toolbox');
    return $toolbox.html();
}

LibManager.getLibs = (libsDir) => {
    let thirdPartyXML = [];
    let loadJs = [];
    let loadCss = [];
    if (!fs_extend.isdir(libsDir))
        return {
            xml: thirdPartyXML,
            js: loadJs,
            css: loadCss
        };
    const libList = fs.readdirSync(libsDir);
    for (let libName of libList) {
        const nowPath = path.resolve(libsDir, './' + libName);
        if (fs_extend.isdir(nowPath)) {
            const dataList = fs.readdirSync(nowPath);
            for (let dataName of dataList) {
                const extname = path.extname(dataName);
                if (extname !== '.xml') continue;
                let text = fs.readFileSync(path.resolve(nowPath, './' + dataName), 'utf8');
                const $xml = XML.getDom(text, {
                    libPath: nowPath
                });
                for (let i = 0; $xml[i]; i++) {
                    if (['SCRIPT', 'LINK'].includes($xml[i].nodeName)) {
                        let loader, src;
                        if ($xml[i].nodeName == 'SCRIPT') {
                            loader = loadJs;
                            src = $xml[i].src;
                        } else {
                            loader = loadCss;
                            src = $xml[i].href;
                        }
                        try {
                            src = decodeURIComponent(src.replace('file:///', ''));
                            const reSrcIndexDir = path.relative(Env.indexDirPath, src);
                            const reSrcThirdDir = path.relative(Env.indexDirPath, path.resolve(nowPath, reSrcIndexDir));
                            const srcIndexDir = path.resolve(Env.indexDirPath, reSrcIndexDir);
                            const srcThirdDir = path.resolve(Env.indexDirPath, reSrcThirdDir);
                            if (fs_extend.isfile(srcIndexDir)) {
                                loader.push(reSrcIndexDir);
                            } else if (fs_extend.isfile(srcThirdDir)) {
                                loader.push(reSrcThirdDir);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    } else if ($xml[i].nodeName == 'CATEGORY') {
                        thirdPartyXML.push($xml[i].outerHTML);
                    }
                }
            }
        } else {
            const extname = path.extname(nowPath);
            const fileName = path.basename(nowPath, '.mil');
            if (extname !== '.mil') continue;
            const text = fs.readFileSync(nowPath, 'utf8');
            const $mil = $('<category name="' + fileName + '" colour="#74a55b"></category>');
            $mil.append($(text).html());
            thirdPartyXML.push($mil[0].outerHTML);
        }
    }
    return {
        xml: thirdPartyXML,
        js: loadJs,
        css: loadCss
    };
}

LibManager.convertLibs = (libsDir) => {
    if (!fs_extend.isdir(libsDir)) return;
    const libList = fs.readdirSync(libsDir);
    for (let libName of libList) {
        const libDir = path.resolve(libsDir, './' + libName);
        if (!fs_extend.isdir(libDir)) continue;
        const dataList = fs.readdirSync(libDir);
        const blocksDir = path.resolve(libDir, './block');
        // 将1.x版本xml转化为2.0可用
        for (let data of dataList) {
            const extname = path.extname(data);
            if (extname !== '.xml') continue;
            const xmlPath = path.resolve(libDir, './' + data);
            let xmlData = fs.readFileSync(xmlPath, 'utf8');
            try {
                xmlData = xmlData.replace(/\.\.\/\.\.\/blocks\/company\//g, "libraries/ThirdParty/" + libName + "/block/");
                xmlData = xmlData.replace(/\.\.\/\.\.\/generators\/arduino\/company\//g, "libraries/ThirdParty/" + libName + "/generator/");
                fs.writeFileSync(xmlPath, xmlData);
            } catch (e) {
                console.log(e);
            }
        }
        if (!fs_extend.isdir(blocksDir)) return;
        // 将1.x版本block转化为2.0可用
        const blockList = fs.readdirSync(blocksDir);
        for (let block of blockList) {
            const blockPath = path.resolve(blocksDir, './' + block);
            if (fs_extend.isdir(blockPath)) {
                continue;
            }
            let blockData = fs.readFileSync(blockPath, 'utf8');
            try {
                blockData = blockData.replace(/\.\.\/\.\.\/media\//g, "./libraries/ThirdParty/" + libName + "/media/");
                blockData = blockData.replace(/Blockly\.Block\.obtain\([\s]*workspace[\s]*\,/g, "workspace.newBlock(");
                blockData = blockData.replace(/Blockly\.FieldTextArea/g, "Blockly.FieldMultilineInput");
                blockData = blockData.replace(/Blockly\.Blocks\.[\u4E00-\u9FA5A-Za-z0-9_]+\.[\u4E00-\u9FA5A-Za-z0-9_]+/g, function (s) {
                    let strList = s.split('.');
                    if (strList.length !== 4) {
                        return s;
                    }
                    return `Blockly.Msg['${strList[2].toUpperCase()}_${strList[3].toUpperCase()}']`;
                });
                fs.writeFileSync(blockPath, blockData);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

LibManager.loadLibsAndUpdateJsCssList = (doFunc = () => {}) => {
    const {
        js,
        css,
        xml
    } = LibManager.getLibs(path.resolve(Env.indexDirPath, './libraries/ThirdParty/'));
    Env.thirdPartyXML = xml;
    let loadPromise = [];
    if (js.length) {
        loadPromise.push(new Promise((resove, reject) => {
            LazyLoad.js(js, function () {
                resove();
            });
        }));
    }
    if (css.length) {
        loadPromise.push(new Promise((resove, reject) => {
            LazyLoad.css(css, function () {
                resove();
            });
        }));
    }
    if (loadPromise.length)
        Promise.all(loadPromise)
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            doFunc();
        })
    else
        doFunc();
    Env.thirdPartyCSS = [...Env.thirdPartyCSS, ...(css ?? [])];
    Env.thirdPartyJS = [...Env.thirdPartyJS, ...(js ?? [])];
}

LibManager.init = () => {
    Env.defaultXML = LibManager.getDefaultXML();
    Env.thirdPartyXML = [];
	LibManager.reloadThirdPartyLibs();
}

LibManager.reloadThirdPartyLibs = () => {
    // 遍历第三方库文件夹，将一些不兼容库转为2.0可用
    LibManager.convertLibs(path.resolve(Env.indexDirPath, './libraries/ThirdParty/'));
    for (let i = 0; i < Env.thirdPartyJS.length; i++) {
        ScriptLoader.removeScript(Env.thirdPartyJS[i]);
    }
    for (let i = 0; i < Env.thirdPartyCSS.length; i++) {
        CssLoader.removeCss(Env.thirdPartyCSS[i]);
    }
    Env.thirdPartyJS = [];
    Env.thirdPartyCSS = [];
    // Code.loadThirdPartyLanJs();
    $('#toolbox').html(Env.defaultXML);
    LibManager.loadLibsAndUpdateJsCssList(function() {
        // Blockly.fireUiEvent(window, 'resize');
        const board = Boards.getSelectedBoardName();
        // Boards.changeTo(Boards.INFO[board].key);
        Boards.updateCategories(board, true);
    });
}

LibManager.menuAddEvent = (layero) => {
    const thirdPartyPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty');
    // 左侧菜单状态, 右侧菜单状态×2
    let menuStatus = [0, 0, 0];
    element.tab({
        headerElem: '#libs-menu-options>li',
        bodyElem: '#libs-menu-body>.menu-body'
    });
    element.render('nav', 'libs-menu-filter');
    // 左侧菜单点击事件
    element.on('tab(libs-menu-filter)', function (data) {
        const { index } = data;
        if (index === menuStatus[0]) return;
        if (index) {
            LibManager.onclickManageLibs();
        } else {
            LibManager.onclickImportLibs();
        }
        menuStatus[0] = index;
    });
    // 右侧菜单点击事件
    element.on('tab(import-lib-page-filter)', function (data) {
        const { index } = data;
        if (index === menuStatus[1]) return;
        if (data.index) {
            
        } else {
            
        }
        menuStatus[1] = index;
    });
    // 右侧菜单点击事件
    element.on('tab(del-lib-page-filter)', function (data) {
        const { index } = data;
        if (index === menuStatus[2]) return;
        if (data.index) {

        } else {
            
        }
        menuStatus[2] = index;
    });
    // 按钮点击事件
    layero.find('button').off().click(function () {
        const $this = $(this);
        const mId = $this.attr('m-id');
        let importType, delType;
        if (menuStatus[1]) {
            if (Nav.codeEnv === 'c') {
                importType = 'ARDUINO';
            } else {
                importType = 'PYTHON';
            }
        } else {
            importType = 'MIXLY';
        }
        if (menuStatus[2]) {
            if (Nav.codeEnv === 'c') {
                delType = 'ARDUINO';
            } else {
                delType = 'PYTHON';
            }
        } else {
            delType = 'MIXLY';
        }
        switch (mId) {
            case 'cloud-import':
                const cloudTableId = menuStatus[1] ? 'cloud-code-lib-table' : 'cloud-mixly-lib-table';
                const cloudCheckStatus = table.checkStatus(cloudTableId);
                var selected = cloudCheckStatus.data;
                var libList = [];
                for (let i = 0; i < selected.length; i++) {
                    libList.push({
                        desPath: thirdPartyPath,
                        ...selected[i]
                    });
                }
                if (libList.length > 0) {
                    LibManager.showCloudImportProgress(libList);
                } else {
                    layer.msg(Msg.Lang['请选择至少一个库'] + '!', { time: 1000 });
                }
                break;
            case 'local-import':
                LibManager.showLocalImportDialog(importType);
                break;
            case 'del':
                const delTableId = menuStatus[2] ? 'del-code-lib-table' : 'del-mixly-lib-table';
                const delCheckStatus = table.checkStatus(delTableId);
                var selected = delCheckStatus.data;
                var libPathList = [];
                for (let i = 0; i < selected.length; i++) {
                    libPathList.push(selected[i].path);
                }
                if (libPathList.length > 0) {
                    LibManager.showDelLibsProgress((index) => {
                        LibManager.delLibs(delType, libPathList, index);
                    });
                } else {
                    layer.msg(Msg.Lang['请选择至少一个库'] + '!', { time: 1000 });
                }
                break;
            case 'open-folder':
                const arduinoLibPath = path.resolve(Env.indexDirPath, 'libraries/myLib');
                const pyLibPath = path.resolve(Env.indexDirPath, 'build/lib');
                let needOpenedPath;
                switch (delType) {
                    case 'ARDUINO':
                        needOpenedPath = arduinoLibPath;
                        break;
                    case 'PYTHON':
                        needOpenedPath = pyLibPath;
                        break;
                    default:
                        needOpenedPath = thirdPartyPath;
                }
                fs_extra.ensureDir(needOpenedPath)
                .then(() => {
                    return shell.openPath(needOpenedPath);
                })
                .catch(console.log);
        }
    });
}

LibManager.showManageDialog = () => {
    const htmlStr = XML.render(XML.TEMPLATE_STR.LIB_MANAGER_DIV, {
        importBoard: Msg.Lang['导入库'],
        delBoard: Msg.Lang['管理库'],
        mixlyLib: 'Mixly',
        codeLib: Nav.codeEnv === 'c'? 'Arduino' : 'Python',
        cloudImport: Msg.Lang['云端导入'],
        localImport: Msg.Lang['本地导入'],
        openFolder: Msg.Lang['打开对应文件夹'],
        del: Msg.Lang['删除']
    });
    LayerExt.open({
        title: [Msg.Lang['库管理器'], '35px'],
        id: 'lib-manage-layer',
        content: htmlStr,
        shade: LayerExt.SHADE_ALL,
        area: ['60%', '60%'],
        min: ['400px', '200px'],
        max: ['800px', '400px'],
        success: (layero) => {
            LibManager.onclickImportLibs();
            LibManager.menuAddEvent(layero);
        }
    });
}

LibManager.compareLibConfig = (cloudConfig) => {
    const { version, url } = cloudConfig;
    cloudConfig.downloadIndex = true;
    const libDir = path.resolve(Env.indexDirPath, 'libraries/ThirdParty', path.basename(url, '.zip'));
    if (fs_extend.isdir(libDir)) {
        const localConfigPath = path.resolve(libDir, './config.json');
        const localConfig = fs_extra.readJsonSync(localConfigPath, { throws: false });
        if (localConfig !== null) {
            if (localConfig.version === version)
                cloudConfig.downloadIndex = false;
        }
        if (cloudConfig.downloadIndex)
            cloudConfig.status = Msg.Lang['待更新'];
        else
            cloudConfig.status = Msg.Lang['已安装'];
    } else {
        cloudConfig.status = Msg.Lang['待安装'];
    }
    return cloudConfig;
}

LibManager.onclickImportLibs = () => {
    // 显示mixly云端库
    let mixlyTableConfig = {
        id: 'cloud-mixly-lib-table',
        elem: '#import-mixly-lib-page',
        data: [],
        defaultToolbar: [],
        title: Msg.Lang['云端库'],
        cols: [[
            { type: 'checkbox', unresize: false, align: "center" },
            { field: 'status', title: Msg.Lang['状态'], sort: true, unresize: false, align: "center", minWidth: 100 },
            { field: 'name', title: Msg.Lang['名称'], sort: true, unresize: false, align: "center", minWidth: 200 },
            { field: 'version', title: Msg.Lang['版本'], unresize: false, align: "center", minWidth: 80 },
            { field: 'desc', title: Msg.Lang['介绍'], unresize: false, align: "center", minWidth: 250 }
        ]],
        limit: 1000,
        skin: 'line',
        even: false,
        size: 'sm'
    };
    // 显示code云端库
    let codeTableConfig = {
        id: 'cloud-code-lib-table',
        elem: '#import-code-lib-page',
        data: [],
        defaultToolbar: [],
        title: Msg.Lang['云端库'],
        cols: [[
            { type: 'checkbox', unresize: false, align: "center" },
            { field: 'name', title: Msg.Lang['名称'], sort: true, unresize: false, align: "center", minWidth: 200 },
            { field: 'version', title: Msg.Lang['版本'], unresize: false, align: "center", minWidth: 80 },
            { field: 'desc', title: Msg.Lang['介绍'], unresize: false, align: "center", minWidth: 250 }
        ]],
        limit: 1000,
        skin: 'line',
        even: false,
        size: 'sm'
    };
    table.render({
        ...mixlyTableConfig,
        text: {
            none: Msg.Lang['云端库JSON下载中'] + '...'
        }
    });
    table.render({
        ...codeTableConfig,
        text: {
            none: Msg.Lang['云端库JSON下载中'] + '...'
        }
    });

    table.on('row(import-mixly-lib-page-filter)', function(obj) {
        let $checkbox = obj.tr.first().find('.layui-form-checkbox');
        obj.setRowChecked({
            checked: !$checkbox.hasClass('layui-form-checked')
        });
    });

    const thirdPartyPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty');
    if (LibManager.URL.mixly) {
        CloudDownload.getJson(LibManager.URL.mixly, thirdPartyPath, (message) => {
            if (message[0]) {
                console.log(message[0]);
                table.render({
                    ...mixlyTableConfig,
                    text: {
                        none: Msg.Lang['无数据']
                    }
                });
                return;
            }
            let libsConfig = [];
            for (let i of message[1]) {
                libsConfig.push(LibManager.compareLibConfig({ ...i }));
            }
            mixlyTableConfig.data = libsConfig;
            table.render(mixlyTableConfig);
        });
    } else {
        table.render({
            ...mixlyTableConfig,
            text: {
                none: Msg.Lang['无数据']
            }
        });
    }
    let codeLibPath, codeLibUrl;
    if (Nav.codeEnv === 'c') {
        codeLibPath = path.resolve(Env.indexDirPath, './libraries/myLib');
        codeLibUrl = LibManager.URL.arduino;
    } else {
        codeLibPath = path.resolve(Env.indexDirPath, './build/lib');
        codeLibUrl = LibManager.URL.python;
    }
    if (codeLibUrl) {
        CloudDownload.getJson(codeLibUrl, codeLibPath, (message) => {
            if (message[0]) {
                console.log(message[0]);
                table.render({
                    ...codeTableConfig,
                    text: {
                        none: Msg.Lang['无数据']
                    }
                });
                return;
            }
            let libsConfig = [];
            for (let i of message[1]) {
                libsConfig.push(LibManager.compareLibConfig({ ...i }));
            }
            codeTableConfig.data = libsConfig;
            table.render(codeTableConfig);
        });
    } else {
        table.render({
            ...codeTableConfig,
            text: {
                none: Msg.Lang['无数据']
            }
        });
    }
}

LibManager.onclickManageLibs = () => {
    // 显示mixly云端库
    let mixlyTableConfig = {
        id: 'del-mixly-lib-table',
        elem: '#del-mixly-lib-page',
        data: [],
        defaultToolbar: [],
        title: Msg.Lang['管理库'],
        cols: [[
            { type: 'checkbox', unresize: false, align: "center" },
            { field: 'name', title: Msg.Lang['名称'], sort: true, unresize: false, align: "center", minWidth: 150 },
            { field: 'path', title: Msg.Lang['路径'], unresize: false, align: "center", minWidth: 300 }
        ]],
        limit: 1000,
        skin: 'line',
        even: false,
        size: 'sm'
    };
    // 显示code云端库
    let codeTableConfig = {
        id: 'del-code-lib-table',
        elem: '#del-code-lib-page',
        data: [],
        defaultToolbar: [],
        title: Msg.Lang['管理库'],
        cols: mixlyTableConfig.cols,
        limit: 1000,
        skin: 'line',
        even: false,
        size: 'sm'
    };
    table.render({
        ...mixlyTableConfig,
        text: {
            none: Msg.Lang['本地库读取中'] + '...'
        }
    });
    table.render({
        ...codeTableConfig,
        text: {
            none: Msg.Lang['本地库读取中'] + '...'
        }
    });
    const thirdPartyPath = path.resolve(Env.indexDirPath, 'libraries/ThirdParty');
    const arduinoLibPath = path.resolve(Env.indexDirPath, 'libraries/myLib');
    const pythonLibPath = path.resolve(Env.indexDirPath, 'build/lib');
    let codeLibPath = Nav.codeEnv === 'c' ? arduinoLibPath : pythonLibPath;
    let needReadPathList = [{
        path: thirdPartyPath,
        tableConfig: mixlyTableConfig
    }, {
        path: codeLibPath,
        tableConfig: codeTableConfig
    }];
    for (let needRead of needReadPathList) {
        if (fs_extend.isdir(needRead.path)) {
            fs.readdir(needRead.path, (error, readList) => {
                if (error) {
                    console.log(error);
                    table.render({
                        ...needRead.tableConfig,
                        text: {
                            none: Msg.Lang['读取失败']
                        }
                    });
                    return;
                }
                let data = [];
                for (let read of readList) {
                    const extname = path.extname(read);
                    if (extname === '.json') continue;
                    data.push({
                        name: read,
                        path: path.resolve(needRead.path, read)
                    });
                }
                if (data.length)
                    table.render({
                        ...needRead.tableConfig,
                        data
                    });
                else
                    table.render({
                        ...needRead.tableConfig,
                        text: {
                            none: Msg.Lang['无数据']
                        }
                    });
            });
        } else {
            table.render({
                ...needRead.tableConfig,
                text: {
                    none: Msg.Lang['无数据']
                }
            });
        }
    }
}

LibManager.showLocalImportDialog = (type) => {
    Modules.currentWindow.focus();
    let layerNum;
    dialog.showOpenDialog(Modules.currentWindow, {
        title: Msg.Lang['导入库'],
        defaultPath: Env.clientPath,
        buttonLabel: Msg.Lang['确定'],
        // 限制能够选择的文件类型
        filters: LibManager.LOCAL_IMPORT_FILTERS[type],
        properties: ['openFile', 'showHiddenFiles'],
        message: Msg.Lang['导入库']
    }).then(result => {
        const selectedPath = result.filePaths[0];

        if (!selectedPath) return;

        console.log('待导入文件路径：', selectedPath);

        LibManager.importFromLocal(type, selectedPath, () => {
            layerNum = layer.open({
                type: 1,
                id: "import-local-lib-layer",
                title: Msg.Lang["导入中"] + "...",
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_ALL,
                closeBtn: 0,
                success: function (layero) {
                    $("#mixly-loader-btn").css('display', 'none');
                },
                end: function () {
                    $("#mixly-loader-btn").css('display', 'inline-block');
                    $('#layui-layer-shade' + layerNum).remove();
                }
            });
        }, (error) => {
            console.log(error);
            layer.msg(error, { time: 1000 });
        }, (error) => {
            layer.close(layerNum);
            if (error) {
                console.log(error);
                layer.msg(Msg.Lang['导入失败'], { time: 1000 });
            } else {
                layer.msg(Msg.Lang['导入成功'], { time: 1000 });
            }
        });
    }).catch(error => {
        layer.close(layerNum);
        console.log(error);
        layer.msg(Msg.Lang['导入失败'], { time: 1000 });
    });
}

LibManager.importFromLocal = (type, inPath, sucFunc, errorFunc, endFunc) => {
    const extname = path.extname(inPath);
    const pyLibPath = path.resolve(Env.indexDirPath, './build/lib');
    const thirdPartyPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty');
    if (fs_extend.isfile(inPath)) {
        switch (extname) {
            case '.py':
                var dirPath = path.resolve(inPath, '../');
                if (pyLibPath === dirPath) {
                    errorFunc(Msg.Lang['此库已导入']);
                    return;
                }
                sucFunc();
                LibManager.importFromLocalWithFile(type, inPath, endFunc);
                break;
            case '.mil':
                var dirPath = path.resolve(inPath, '../');
                if (thirdPartyPath === dirPath) {
                    errorFunc(Msg.Lang['此库已导入']);
                    return;
                }
                sucFunc();
                LibManager.importFromLocalWithFile(type, inPath, endFunc);
                break;
            case '.xml':
                var dirPath = path.resolve(inPath, '../../');
                if (dirPath === thirdPartyPath) {
                    errorFunc(Msg.Lang['此库已导入']);
                    return;
                }
                sucFunc();
                LibManager.importFromLocalWithFile(type, inPath, endFunc);
                break;
            case '.zip':
                sucFunc();
                LibManager.importFromLocalWithZip(type, inPath, endFunc);
                break;
            default:
                errorFunc(Msg.Lang['所选文件非配置文件']);
        }
    } else {
        errorFunc(Msg.Lang['文件不存在']);
    }
}

LibManager.importFromLocalWithFile = (type, filePath, endFunc) => {
    const thirdPartyPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty');
    const extname = path.extname(filePath);
    const basename = path.basename(filePath);
    let copyPromiseList = [];
    switch (extname) {
        case '.xml':
            const NEED_COPY = {
                FILE: ["CHANGELOG.md", "README.md", 'config.json', basename],
                DIR: [
                    "block",
                    "generator",
                    "converter",
                    "css",
                    "media",
                    "language",
                    "companypin",
                    "examples",
                    "wiki",
                    "libraries"
                ]
            }
            const dirPath = path.dirname(filePath);
            const dirName = path.basename(dirPath);
            const dataList = fs.readdirSync(dirPath);
            for (let data of dataList) {
                const dataPath = path.resolve(dirPath, './' + data);
                if (fs_extend.isfile(dataPath)) {
                    if (NEED_COPY.FILE.includes(data)) {
                        const desPath = path.resolve(thirdPartyPath, dirName, data);
                        copyPromiseList.push(LibManager.copyFile(dataPath, desPath));
                    }
                } else {
                    if (NEED_COPY.DIR.includes(data)) {
                        const desPath = path.resolve(thirdPartyPath, dirName, data);
                        copyPromiseList.push(LibManager.copyDir(dataPath, desPath));
                    }
                }
            }
            /*const libsPath = path.resolve(dirPath, 'libraries');
            if (fs_extend.isdir(libsPath)) {
                const libList = fs.readdirSync(libsPath);
                const myLibPath = path.resolve(Env.indexDirPath, 'libraries/myLib');
                for (let lib of libList) {
                    const libPath = path.resolve(libsPath, lib);
                    if (fs_extend.isfile(libPath)) continue;
                    const desPath = path.resolve(myLibPath, lib);
                    copyPromiseList.push(LibManager.copyDir(libPath, desPath));
                }
            }*/
            break;
        case '.mil':
            const milPath = path.resolve(thirdPartyPath, path.basename(filePath));
            copyPromiseList.push(LibManager.copyFile(filePath, milPath));
            break;
        case '.py':
            const pyPath = path.resolve(Env.indexDirPath, 'build/lib', path.basename(filePath));
            copyPromiseList.push(LibManager.copyFile(filePath, pyPath));
            break;
        default:
            layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
            endFunc(Msg.Lang['文件后缀错误']);
    }
    Promise.all(copyPromiseList)
    .then((message) => {
        if (type === 'MIXLY') {
            LibManager.reloadThirdPartyLibs();
        }
        endFunc(null);
    })
    .catch((error) => {
        endFunc(error);
    })
    .finally(() => {
    });
}

LibManager.importFromLocalWithZip = (type, filePath, endFunc) => {
    const thirdPartyPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty/');
    const myLibPath = path.resolve(Env.indexDirPath, './libraries/myLib/');
    let desPath;
    switch (type) {
        case 'MIXLY':
            desPath = thirdPartyPath;
            break;
        case 'ARDUINO':
            desPath = myLibPath;
            break;
        default:
            endFunc(Msg.Lang['解压出错']);
            return;
    }
    LibManager.unZip(filePath, desPath, false, (error) => {
        if (type === 'MIXLY')
            LibManager.reloadThirdPartyLibs();
        endFunc(error);
    });
}

LibManager.delLibs = (type, libPathList, layerNum) => {
    let delPromiseList = [];
    for (let libPath of libPathList) {
        delPromiseList.push(new Promise((resove, reject) => {
            fs_extra.remove(libPath, (error) => {
                resove(error);
            });
        }));
    }
    Promise.all(delPromiseList)
    .then((message) => {
        LibManager.onclickManageLibs();
        if (type === 'MIXLY') {
            LibManager.reloadThirdPartyLibs();
        }
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        layer.close(layerNum);
    });
}

LibManager.showDelLibsProgress = (sucFunc) => {
    const layerNum = layer.open({
        type: 1,
        id: "del-local-lib-layer",
        title: Msg.Lang["删除中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_ALL,
        closeBtn: 0,
        success: function (layero, index) {
            $("#mixly-loader-btn").css('display', 'none');
            sucFunc(index);
        },
        end: function () {
            $('#layui-layer-shade' + layerNum).remove();
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
}

LibManager.unZip = (inPath, desPath, delZip, endFunc = (errorMessage) => {}) => {
    const dirName = path.basename(inPath, '.zip');
    const unZipPath = path.resolve(desPath, dirName);
    compressing.zip.uncompress(inPath, desPath, {
        zipFileNameEncoding: 'GBK'
    })
    .then(() => {
        if (delZip)
            try {
                fs.unlinkSync(inPath);
            } catch (error) {
                console.log(error);
            }
        endFunc(null);
    })
    .catch((error) => {
        endFunc(error);
    });
}

LibManager.copyDir = (startPath, endPath) => {
    return new Promise((resove, reject) => {
        fs_extra.ensureDir(endPath)
        .then(() => {
            return fs_extra.emptyDir(endPath);
        })
        .then(() => {
            return fs_extra.copy(startPath, endPath);
        })
        .then(() => {
            resove({ error: null, endPath });
        })
        .catch((error) => {
            resolve({ error, endPath });
        });
    });
}

LibManager.copyFile = (startPath, endPath) => {
    return new Promise((resove, reject) => {
        const endDirPath = path.dirname(endPath);
        fs_extra.ensureDir(endDirPath)
        .then(() => {
            return fs_extra.copy(startPath, endPath);
        })
        .then(() => {
            resove({ error: null, endPath });
        })
        .catch((error) => {
            resolve({ error, endPath });
        });
    });
}

LibManager.showCloudImportProgress = (importList, endFunc = (errorMessages) => {}) => {
    const parentDom = $('<div></div>');
    parentDom.css({
        'overflow': 'hidden',
        'width': '100%',
        'height': '100%',
        'display': 'none'
    });
    const childDom = $('<div></div>');
    childDom.css({
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'left': '5px',
        'right': '5px',
        'top': '5px',
        'bottom': '5px',
        'position': 'absolute'
    });
    for (let i in importList) {
        const info = importList[i];
        const panelConfig = {
            panelId: i + '-panel-id',
            name: info.name,
            progressFilter: i + '-progress-filter',
            progressStatusId: i + '-progress-status-id'
        };
        childDom.append(
            XML.render(XML.TEMPLATE_STR.PROGRESS_BAR_DIV, panelConfig)
        );
    }
    parentDom.append(childDom);
    $('body').append(parentDom);
    element.render('progress');
    LayerExt.open({
        title: Msg.Lang['导入中'] + '...',
        id: 'setting-menu-layer1',
        content: parentDom,
        shade: LayerExt.SHADE_ALL,
        area: ['40%', '60%'],
        max: ['800px', (importList.length * 106 + 42) + 'px'],
        min: ['500px', '100px'],
        success: (layero, index) => {
            layero.find('.layui-layer-setwin').css('display', 'none');
            LibManager.importFromCloud(importList, layero, index);
        },
        end: () => {
            parentDom.remove();
        }
    });
}

LibManager.importFromCloud = (importList, layero, layerIndex) => {
    let importPromise = [];
    for (let i in importList) {
        importList[i].index = i;
        importPromise.push(LibManager.importWithUrl(importList[i]));
    }
    
    Promise.all(importPromise)
    .then((message) => {
        let sucTimes = 0;
        let failedTimes = 0;
        for (let i of message) {
            const progressStatusDom = $('#' + i.index + '-progress-status-id');
            const panelDom = $('#' + i.index + '-panel-id');
            const cardHeadDom = panelDom.children('.layui-card-header').first();
            progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
            if (i.error) {
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(i.name + ' - ' + Msg.Lang['导入失败']);
                failedTimes++;
                console.log(i.error);
            } else {
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(i.name + ' - ' + Msg.Lang['导入完成']);
                sucTimes++;
                // BoardManager.writePackageConfig(i);
            }
        }
        const sucIcon = `<i class="layui-icon layui-icon-ok" style="font-size:13px;color:#41ce28;"></i>`;
        const errIcon = `<i class="layui-icon layui-icon-close" style="font-size:13px;color:#b9063b;"></i>`;
        layer.title(Msg.Lang['导入完成'] + ' ' + sucTimes + sucIcon + ' ' + failedTimes + errIcon, layerIndex);
    })
    .catch((error) => {
        layer.title(Msg.Lang['导入失败'], layerIndex);
    })
    .finally(() => {
        layero.find('.layui-layer-setwin').css('display', 'block');
        LibManager.onclickImportLibs();
        LibManager.reloadThirdPartyLibs();
    });
}

LibManager.writeLibConfig = (info) => {
    const {
        desPath,
        version,
        name,
        url
    } = info;
    if (!name) return;
    const libDir = path.resolve(desPath, path.basename(url, '.zip'));
    if (fs_extend.isdir(libDir)) {
        const configPath = path.resolve(libDir, 'config.json');
        const libConfig = {
            version
        };
        try {
            fs_extra.outputJsonSync(configPath, libConfig, {
                spaces: '    '
            });
        } catch (error) {
            console.log(error);
        }
    }
}

/*{
    "index": Number,
    "desPath"： String,
    "error": Object,
    "name": "TFT",
    "version": "1.0.0",
    "desc": "TFT彩色屏幕扩展库",
    "url": "https://gitee.com/mixly2/cloud-libraries/raw/master/cloud-libs/c_common/TFT.zip"
}*/
LibManager.importWithUrl = (info) => {
    return new Promise((resolve, reject) => {
        if (!info.url) {
            info.error = 'url读取出错';
            resolve(info);
        }
        // 下载板卡文件
        LibManager.downloadPromise(info, {
            desPath: path.resolve(Env.clientPath, './download'),
            url: info.downloadIndex ? info.url : 'None',
            startMessage: Msg.Lang['下载中'] + '...',
            endMessage: Msg.Lang['下载完成'],
            errorMessage: Msg.Lang['下载失败']
        })
        .then((newInfo) => {
            if (newInfo.error)
                throw newInfo.error;
            else
                // 解压板卡文件
                return LibManager.unZipPromise(newInfo, {
                    desPath: newInfo.desPath,
                    zipPath: newInfo.downloadPath,
                    startMessage: Msg.Lang['解压中'] + '...',
                    endMessage: Msg.Lang['解压完成'],
                    errorMessage: Msg.Lang['解压失败']
                });
        })
        .then((newInfo) => {
            if (newInfo.error)
                throw newInfo.error;
            const panelDom = $('#' + newInfo.index + '-panel-id');
            const cardHeadDom = panelDom.children('.layui-card-header').first();
            const progressStatusDom = $('#' + newInfo.index + '-progress-status-id');
            if (!info.downloadIndex) {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                cardHeadDom.html(newInfo.name + ' - ' + Msg.Lang['已是最新版']);
                progressStatusDom.addClass('layui-icon-ok-circle');
                element.progress(newInfo.index + '-progress-filter', '100%');
                element.render('progress', newInfo.index + '-progress-filter');
            } else {
                LibManager.writeLibConfig(newInfo);
            }
            resolve(newInfo);
        })
        .catch((error) => {
            info.error = error;
            resolve(info);
        });
    });
}

LibManager.downloadPromise = (info, config) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_CONFIG = {
            desPath: path.resolve(Env.clientPath, './download'),
            url: null,
            startMessage: Msg.Lang['下载中'] + '...',
            endMessage: Msg.Lang['下载完成'],
            errorMessage: Msg.Lang['下载失败']
        };
        if (typeof config !== 'object')
            config = DEFAULT_CONFIG
        else
            config = { ...DEFAULT_CONFIG, ...config };

        const {
            desPath,
            url,
            startMessage,
            endMessage,
            errorMessage
        } = config;

        if (!url || url === 'None' || !desPath) {
           info.error = null;
           info.downloadPath = null;
           resolve(info);
           return;
        }

        try {
            fs_extra.ensureDirSync(desPath);
        } catch (error) {
            info.error = error;
            info.downloadPath = null;
            resolve(info);
            return;
        }
        const panelDom = $('#' + info.index + '-panel-id');
        const cardHeadDom = panelDom.children('.layui-card-header').first();
        cardHeadDom.html(info.name + ' - ' + startMessage);
        const progressStatusDom = $('#' + info.index + '-progress-status-id');
        progressStatusDom.removeClass('layui-icon-ok-circle layui-icon-close-fill');
        progressStatusDom.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
        element.progress(info.index + '-progress-filter', '0%');
        element.render('progress', info.index + '-progress-filter');
        CloudDownload.download(url, desPath, {
            progress: (stats) => {
                const { speed, progress } = stats;
                const speedUnit = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
                let type = 0;
                let nowProgress = parseInt(progress);
                nowProgress = nowProgress > 100 ? 100 : nowProgress;
                let nowSpeed = speed;
                for (let i = 0; i < 3; i++) {
                    if (nowSpeed / 1000 > 1) {
                        nowSpeed /= 1024;
                        type++;
                    } else {
                        break;
                    }
                }

                nowSpeed = nowSpeed.toFixed(1);
                cardHeadDom.html(info.name + ' - ' + startMessage + ' - ' + nowSpeed + speedUnit[type]);
                element.progress(info.index + '-progress-filter', parseInt(progress) + '%');
                element.render('progress', info.index + '-progress-filter');
            },
            error: (message) => {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(info.name + ' - ' + errorMessage);
            },
            end: (downloadInfo) => {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(info.name + ' - ' + endMessage);
            },
            timeout: this.error
        })
        .then((message) => {
            if (message[0])
                throw message[0];
            info.error = null;
            info.downloadPath = message[1];
            resolve(info);
        })
        .catch((error) => {
            info.error = error;
            info.downloadPath = null;
            resolve(info);
        });
    });
}

LibManager.unZipPromise = (info, config) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_CONFIG = {
            desPath: path.resolve(Env.clientPath, './download'),
            zipPath: null,
            startMessage: Msg.Lang['解压中'] + '...',
            endMessage: Msg.Lang['解压完成'],
            errorMessage: Msg.Lang['解压失败'],
            delZip: true
        };
        if (typeof config !== 'object')
            config = DEFAULT_CONFIG
        else
            config = { ...DEFAULT_CONFIG, ...config };

        const {
            zipPath,
            desPath,
            delZip,
            startMessage,
            endMessage,
            errorMessage
        } = config;

        if (!zipPath || !desPath) {
            info.error = null;
            info.unZipPath = null;
            resolve(info);
            return;
        }
        const panelDom = $('#' + info.index + '-panel-id');
        const cardHeadDom = panelDom.children('.layui-card-header').first();
        cardHeadDom.html(info.name + ' - ' + startMessage);
        const progressStatusDom = $('#' + info.index + '-progress-status-id');
        progressStatusDom.removeClass('layui-icon-ok-circle layui-icon-close-fill');
        progressStatusDom.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
        element.progress(info.index + '-progress-filter', '0%');
        element.render('progress', info.index + '-progress-filter');
        LibManager.unZip(zipPath, desPath, delZip, (error) => {
            if (error) {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(info.name + ' - ' + errorMessage);
                info.error = error;
                info.unZipPath = null;
                resolve(info);
            } else {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(info.name + ' - ' + endMessage);
                info.error = null;
                info.unZipPath = desPath;
                element.progress(info.index + '-progress-filter', '100%');
                element.render('progress', info.index + '-progress-filter');
                resolve(info);
            }
        })
    });
}

})();