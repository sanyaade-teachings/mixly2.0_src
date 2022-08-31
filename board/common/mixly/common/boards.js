(() => {

goog.require('layui');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.Modules');
goog.require('Mixly.MString');
goog.provide('Mixly.Boards');

const {
    Config,
    LayerExtend,
    XML,
    Env,
    ToolboxSearcher,
    Modules,
    MString,
    Boards
} = Mixly;

const { form, element, dropdown } = layui;

const { BOARD, USER, SELECTED_BOARD } = Config;

/**
 * INFO = {
 *      "boardName": {
 *          "key": string | null,
 *          "config": object | null,
 *          "default": object | null
 *      }
 * }
 **/
Boards.INFO = {};

Boards.NAME = [];

Boards.HAS_CONFIG_SETTING = false;

Boards.init = () => {
    if (BOARD.board) {
        let num = 0;
        let userBoard = {};
        const { board = {} } = USER;
        if (board && board[BOARD.boardName] && typeof board[BOARD.boardName] === 'object') {
            userBoard = board[BOARD.boardName];
        }
        for (let i in BOARD.board) {
            Boards.NAME.push(i);
            const boardInfo = BOARD.board[i];
            if (typeof boardInfo === 'string') {
                Boards.INFO[i] = {
                    key: boardInfo,
                    config: null,
                    default: null,
                    ignore: []
                };
                num++;
            } else if (typeof boardInfo === 'object') {
                const { key = null, config = null, ignore = [] } = boardInfo;
                let defaultConfig = null;
                if (typeof config === 'object') {
                    defaultConfig = {};
                    const userConfig = userBoard.default,
                    userBoardKey = userBoard.key;
                    if (typeof userConfig === 'object' && userBoardKey === key) {
                        for (let key in userConfig) {
                            if (!config[key] || typeof config[key] !== 'object') {
                                delete userConfig[key];
                                continue;
                            }
                            let needDel = true;
                            for (let option of config[key]) {
                                if (option.key === userConfig[key]) {
                                    needDel = false;
                                    break;
                                }
                            }
                            if (needDel)
                                delete userConfig[key];
                        }
                        defaultConfig = { ...userConfig };
                    } else {
                        for (let j in config) {
                            if (typeof config[j] === 'object' && typeof config[j][0] === 'object') {
                                //defaultConfig[j] = { ...config[j][0] };
                                defaultConfig[j] = config[j][0].key;
                            }
                        }
                    }
                } else {
                    num++;
                }
                Boards.INFO[i] = { key, config, ignore, default: defaultConfig };
            }
        }
        if (num === Boards.NAME.length)
            Boards.HAS_CONFIG_SETTING = false;
        else
            Boards.HAS_CONFIG_SETTING = true;
    } else {
        Boards.NAME.push(BOARD.boardName);
        Boards.INFO[BOARD.boardName] = {
            key: null,
            config: null,
            default: null,
            ignore: []
        };
        Boards.HAS_CONFIG_SETTING = false;
    }

    const boardNames = $('#boards-type');

    const selectedBoardName = (window?.localStorage[BOARD.boardName] ?? '').match(/(?<=board[\s]*=[\s]*\")[^\n\"]+(?=\")/g);
    if (boardNames) {
        boardNames.empty();
        for (let board of Boards.NAME)
            boardNames.append(`<option value="${Boards.INFO[board]?.key ?? board}" ${(selectedBoardName && selectedBoardName[0] === board)? ' selected' : ''}>${board}</option>`);
        form.render('select', 'boards-type-filter');
    }
    $('#mixly-board-config').off().click(function() {
        Boards.showConfigMenu();
    });
    $(window).on('resize', function() {
        if (Boards.layerMenuNum) {
            $('#layui-layer' + Boards.layerMenuNum).css('display', 'none');
            layer.close(Boards.layerMenuNum);
        }
    });
}

Boards.getConfigInfo = (boardName) => {
    if (!Boards.INFO[boardName]) return '';
    const { config } = Boards.INFO[boardName];
    const defaultConfig = Boards.INFO[boardName].default;
    let info = '';
    for (let i in defaultConfig)
        if (typeof config[i] === 'object')
            for (let j of config[i])
                if (j.key === defaultConfig[i]) {
                    info += i + ': ' + j.label + '<br/>';
                    break;
                }
    return info;
}

Boards.updateBoardDefaultConfig = (boardName) => {
    const { config = null } = Boards.INFO[boardName];
    let defaultConfig = null;
    if (typeof config === 'object') {
        defaultConfig = {};
        for (let j in config) {
            if (typeof config[j] === 'object' && typeof config[j][0] === 'object') {
                defaultConfig[j] = config[j][0].key;
            }
        }
    }
    Boards.INFO[boardName].default = defaultConfig;
}

Boards.getType = () => {
    let str = BOARD.boardIndex ?? '';
    str = str.replaceAll('\\', '/');
    if (BOARD.thirdPartyBoard) {
        return str.match(/(?<=board\/ThirdParty\/)[^?\/\\、*\"><|]+/g)[0];
    } else {
        return str.match(/(?<=board\/)[^?\/\\、*\"><|]+/g)[0];
    }
}

Boards.getSelectedBoardName = () => {
    const boardKey = Boards.getSelectedBoardKey();
    const { INFO } = Boards;
    for (let i in INFO) {
        if (INFO[i].key === boardKey)
            return i;
    }
    return boardKey;
}

Boards.getSelectedBoardKey = () => {
    return $('#boards-type').val();
}

Boards.setSelectedBoard = (name, userConfig) => {
    const charIndex = name.indexOf('@');
    if (charIndex !== -1) {
        name = name.substring(charIndex + 1, name.length);
    }
    if (!Boards.NAME.includes(name))
        return;
    const boardInfo = Boards.INFO[name];
    if (boardInfo && boardInfo.key) {
        $("#boards-type").val(boardInfo.key);
        if (typeof userConfig === 'object') {
            const { config } = boardInfo;
            for (let key in userConfig) {
                if (!config[key] || typeof config[key] !== 'object') {
                    delete userConfig[key];
                    continue;
                }
                let needDel = true;
                for (let option of config[key]) {
                    if (option.key === userConfig[key]) {
                        needDel = false;
                        break;
                    }
                }
                if (needDel)
                    delete userConfig[key];
            }
            boardInfo.default = { ...userConfig };
        }
        form.render('select', 'boards-type-filter');
    }
    Boards.changeTo(Boards.INFO[name].key);
    Boards.updateCategories(name);
    if (typeof profile === 'object' && profile[name])
        profile['default'] = profile[name];
}

Boards.getSelectedBoardConfig = (defaultConfig = true) => {
    const boardName = Boards.getSelectedBoardName();
    if (defaultConfig)
        return Boards.INFO[boardName]?.default ?? null;
    else
        return Boards.INFO[boardName]?.config ?? null;
}

Boards.getBoardCommandParam = (boardName) => {
    if (!Boards.INFO[boardName]) return null;
    const info = Boards.INFO[boardName];
    let { key, ignore = [] } = info;
    const defaultConfig = info.default;
    if (!key) return null;
    const index = key.indexOf('@');
    if (index !== -1)
        key = key.substring(0, index);
    let commandStr = key;
    if (typeof defaultConfig === 'object') {
        commandStr += ':';
        for (let i in defaultConfig) {
            if (!ignore.includes(i))
                commandStr += i + '=' + defaultConfig[i] + ',';
        }
        commandStr = commandStr.substring(0, commandStr.length - 1);
    }
    return commandStr;
}

Boards.getSelectedBoardCommandParam = () => {
    const boardName = Boards.getSelectedBoardName();
    return Boards.getBoardCommandParam(boardName);
}

Boards.getSelectedBoardConfigParam = (param) => {
    const defaultConfig = Boards.getSelectedBoardConfig();
    if (defaultConfig && typeof defaultConfig === 'object')
        return defaultConfig[param] ?? '';
    return '';
}

/**
 * @function 更新当前所选择板卡及其相关配置
 * @param boardName {string} 板卡名
 * @return {void}
 **/
Boards.changeTo = (boardName) => {
    const boardKey = Boards.INFO[boardName].key;
    for (let i in SELECTED_BOARD) {
        delete SELECTED_BOARD[i];
    }
    for (let i in BOARD) {
        if (BOARD[i] instanceof Object) {
            SELECTED_BOARD[i] = { ...BOARD[i] };
        } else {
            SELECTED_BOARD[i] = BOARD[i];
        }
    }
    if (BOARD.web instanceof Object) {
        for (let value of [{
                type: 'burn',
                obj: BOARD.web.burn
            }, {
                type: 'upload',
                obj: BOARD.web.upload
            }]) {
            if (!(value.obj instanceof Object)) {
                continue;
            }
            let outObj;
            if (value.obj[boardKey]) {
                outObj = { ...value.obj, ...value.obj[boardKey] };
            } else {
                outObj = { ...value.obj };
            }
            for (let i in Boards.INFO) {
                const key = Boards.INFO[i].key;
                if (outObj[key]) {
                    delete outObj[key];
                }
            }
            SELECTED_BOARD.web[value.type] = outObj;
        }
    }
    for (let value of [{
            type: 'burn',
            obj: BOARD.burn
        }, {
            type: 'upload',
            obj: BOARD.upload
        }]) {
        if (!(value.obj instanceof Object)) {
            continue;
        }
        let outObj;
        if (value.obj[boardKey]) {
            outObj = { ...value.obj, ...value.obj[boardKey] };
        } else {
            outObj = { ...value.obj };
        }
        for (let i in Boards.INFO) {
            const key = Boards.INFO[i].key;
            if (outObj[key]) {
                delete outObj[key];
            }
        }
        const pathObj = {
            path: Env.clientPath,
            indexPath: Env.indexPath
        };
        switch (outObj.type) {
            case 'volume':
                if (Env.currentPlatform == "win32") {
                    if (typeof outObj.volumeName == "string") {
                        outObj.volume = "VolumeName='" + outObj.volumeName + "'";
                    } else if (typeof outObj.volumeName == "object") {
                        outObj.volume = "VolumeName='" + outObj.volumeName[0] + "'";
                        for (let i = 1; i < outObj.volumeName.length; i++) {
                            outObj.volume += " or VolumeName='" + outObj.volumeName[i] + "'";
                        }
                    } else {
                        outObj.volume = "VolumeName='CIRCUITPY'";
                    }
                } else {
                    if (typeof outObj.volumeName == "string") {
                        outObj.volume = outObj.volumeName;
                    } else if (typeof outObj.volumeName == "object") {
                        outObj.volume = outObj.volumeName[0];
                        for (var i = 1; i < outObj.volumeName.length; i++) {
                            outObj.volume += "/" + outObj.volumeName[i];
                        }
                    } else {
                        outObj.volume = "CIRCUITPY";
                    }
                }
                break;
            case 'command':
                let pyToolPath = "{path}/mixpyBuild/win_python3/Lib/site-packages/";
                if (Env.currentPlatform == "darwin" || Env.currentPlatform == "linux") {
                    pyToolPath = "{path}/pyTools/";
                }
                let obj = {};
                let pyTools = {
                    'esptool': 'esptool.py',
                    'kflash': 'kflash.py',
                    'stm32loader': 'stm32loader.py',
                    'stm32bl': 'stm32bl.py',
                    'ampy': 'ampy/cli.py'
                };
                for (let key in pyTools) {
                    obj[key] = Env.python3Path + "\" \"" + pyToolPath + pyTools[key];
                }
                if (outObj.reset) {
                    let resetStr = '{}';
                    try {
                        resetStr = JSON.stringify(outObj.reset);
                        resetStr = resetStr.replaceAll('\"', '\\\"');
                        obj.reset = resetStr;
                    } catch (e) {
                        console.log(e);
                    }
                }
                outObj.command = MString.tpl(outObj.command, obj);
                outObj.command = MString.tpl(outObj.command, pathObj);
                break;
        }
        if (value.type === 'upload' && Env.isElectron && outObj.copyLib) {
            const { path } = Modules;
            if (outObj.libPath) {
                let libPath = [];
                for (let dirPath of outObj.libPath) {
                    libPath.push(MString.tpl(dirPath, pathObj));
                }
                outObj.libPath = libPath;
            } else {
                outObj.libPath = [ path.resolve(Env.indexPath, 'build/lib/') ];
            }
        }
        if (Env.isElectron) {
            const { path } = Modules;
            if (outObj.filePath) {
                outObj.filePath = MString.tpl(outObj.filePath, pathObj);
            } else {
                outObj.filePath = path.resolve(Env.indexPath, 'build/main.py');
            }
        }
        SELECTED_BOARD[value.type] = outObj;
    }
}

Boards.updateCategories = (boardName, enforce = false) => {
    if (Boards.selected === boardName && !enforce) return;
    Boards.selected = boardName;
    if (typeof profile === 'object' && profile[boardName]) {
        profile['default'] = profile[boardName];
    } else {
        profile = typeof profile === 'object' ? profile : {};
        profile['default'] = profile['default'] ?? {};
    }
    $('#mixly-footer-boardname').html(boardName);
    if (Boards.INFO[boardName] && Boards.INFO[boardName].config) {
        $('#mixly-board-config').css('display', 'inline-flex');
    } else {
        $('#mixly-board-config').css('display', 'none');
    }
    if (Boards.layerMenuNum) {
        $('#layui-layer' + Boards.layerMenuNum).css('display', 'none');
        layer.close(Boards.layerMenuNum);
    }
    let thirdPartyStr = '';
    if (Env.isElectron) {
        thirdPartyStr = Env.thirdPartyXML.join('');
    }
    const searchCategoryStr = '<category id="catSearch" hidden="true" colour="#ff6666"><label text="'
                             + indexText['无数据']
                             + '"></label></category>';
    thirdPartyStr = Boards.selectCategories(boardName, thirdPartyStr);
    const toolboxDom = $('#toolbox');
    toolboxDom.html(
        Boards.selectCategories(boardName, XML.CATEGORIES_STR[boardName] ?? Env.defaultXML)
    );
    toolboxDom.append(thirdPartyStr);
    toolboxDom.append(searchCategoryStr);
    const categoriesDom = toolboxDom.find('category');
    for (let i = 0; categoriesDom[i]; i++) {
        if (categoriesDom[i].hasAttribute('toolboxitemid')) continue;
        categoriesDom[i].setAttribute('toolboxitemid', categoriesDom[i].id);
    }
    Code.initLanguage(false);
    if (Blockly.mainWorkspace) {
        Blockly.mainWorkspace.updateToolbox(toolboxDom[0]);
        ToolboxSearcher.restart();
        Blockly.mainWorkspace.scrollCenter();
        Blockly.hideChaff();
    }
}

Boards.selectCategories = (boardName, categoriesStr) => {
    const boardKeyList = (Boards.INFO[boardName].key ?? '').split(':');
    if (!boardKeyList.length) return categoriesStr;
    const xmlDom = $('<xml></xml>');
    xmlDom.html(categoriesStr);
    const categories = xmlDom.find('category');
    for (let i = 0; categories[i]; i++) {
        const removed = Boards.removeBlocks($(categories[i]), boardKeyList);
        if (!removed) {
            const blocks = $(categories[i]).children('block');
            for (let j = 0; blocks[j]; j++) {
                Boards.removeBlocks($(blocks[j]), boardKeyList);
            }
        }
    }
    return xmlDom.html();
}

Boards.removeBlocks = (blocksdom, boardKeyList) => {
    const mShow = blocksdom.attr('m-show');
    const mHide = blocksdom.attr('m-hide');
    if (mShow || mHide) {
        const select = mShow ? mShow : mHide;
        let needRemove = mShow ? true : false;
        const selectList = select.split(' ');
        for (let key of selectList) {
            const keyList = key.split(':');
            const len = keyList.length;
            if (![1, 2, 3].includes(len)) {
                continue;
            }
            if ([2, 3].includes(len)) {
                const param3 = (len === 3 ? String(keyList[2]).split(',') : []);
                if (keyList[0] === boardKeyList[0]
                 && keyList[1] === boardKeyList[1]) {
                    if (!param3.length) {
                        needRemove = mShow ? false : true;
                        break;
                    }
                    for (let value of param3) {
                        if (value === boardKeyList[2]) {
                            needRemove = mShow ? false : true;
                            break;
                        }
                    }
                }
            } else {
                if (keyList[0] === boardKeyList[2]) {
                    needRemove = mShow ? false : true;
                    break;
                }
            }
            if ((!needRemove && mShow) || (needRemove && !mShow))
                break;
        }
        if (needRemove) {
            blocksdom.remove();
            return true;
        }
    }
    return false;
}

Boards.showConfigMenu = () => {
    if (Boards.layerMenuNum)
        return;
    const selectedBoardName = Boards.getSelectedBoardName();
    const { INFO } = Boards;
    const { config, ignore, key } = INFO[selectedBoardName];
    INFO[selectedBoardName].default = INFO[selectedBoardName].default ?? {};
    const defaultConfig = INFO[selectedBoardName].default;
    let list = [];
    for (let key in config) {
        let selectedConfig = defaultConfig[key] ?? config[key][0].label;
        let options = [];
        for (let i of config[key]) {
            if (defaultConfig[key] && i.key === defaultConfig[key])
                selectedConfig = i.label;
            options.push({
                title: i.label,
                id: i.key
            });
        }
        if (!defaultConfig)
            selectedConfig = config[key][0].label;
        list.push({
            name: key,
            label: selectedConfig,
            options
        });
    }
    const xmlStr = XML.render(XML.TEMPLATE_STR['BOARD_CONFIG_MENU_DIV'], {
        list,
        reset: indexText['使用默认配置'],
        close: indexText['关闭窗口']
    });
    Boards.layerMenuNum = layer.tips(`<div id="mixly-board-config" 
                                        style="
                                            max-height:calc(100vh - var(--footer-height));
                                            height:100%;
                                            width:100%;
                                            overflow:hidden;
                                        "
                                    >${xmlStr}
                                    </div>`, '#mixly-board-config', {
        tips: 1,
        time: 0,
        offset: 'rb',
        move: false,
        tipsMore: false,
        success: function(layero, index) {
            $('#board-config-menu-reset').off().click(function() {
                INFO[selectedBoardName].default = INFO[selectedBoardName].default ?? {};
                for (let key in config) {
                    defaultConfig[key] = config[key][0].key;
                    $('#board-config-' + key).find('p').text(config[key][0].label);
                }
            });
            $('#board-config-menu-colse').off().click(function() {
                layero.css('display', 'none');
                layer.close(Boards.layerMenuNum);
            });
            layero.css({
                'left': 'auto',
                'right': '5px',
                'top': 'auto',
                'bottom': 'calc(var(--footer-height) + 1px)',
                'width': 'auto',
                'height': 'auto',
                'max-height': 'calc(100vh - var(--footer-height))'
            });
            layero.children('.layui-layer-content').css({
                'padding': '0px',
                'max-height': 'calc(100vh - var(--footer-height))'
            });
            layero.find('.layui-layer-TipsG').css('display', 'none');
            Boards.renderConfigMenuDropdown(list);
        },
        end: function() {
            Boards.layerMenuNum = null;
            Boards.writeSelectedBoardConfig();
        }
    });
}

Boards.renderConfigMenuDropdown = (optionList) => {
    const selectedBoardName = Boards.getSelectedBoardName();
    for (let item of optionList) {
        dropdown.render({
            elem: '#board-config-' + item.name,
            align: 'right',
            data: item.options,
            anywhereClose: true,
            className: 'layer-extend editor-dropdown-menu board-config-menu',
            style: 'display:inline-block;box-shadow:1px 1px 30px rgb(0 0 0 / 12%);',
            ready: function(elemPanel, elem) {
                const $elemPanel = $(elemPanel);
                const $elem = $(elem);
                $elemPanel.css({
                    'left': 'auto',
                    'right': 'calc(100vw - ' + ($elem.offset().left + $elem.outerWidth()) + 'px)',
                    'min-width': $elem.outerWidth() + 'px'
                });
                const $p = $elem.find('p');
                const $lis = $elemPanel.find('li');
                for (let i = 0; $lis[i]; i++) {
                    const $div = $($lis[i]).children('div');
                    if ($div.text() === $p.text()) {
                        $($lis[i]).css('background-color', '#5FB878');
                        $div.css('color', '#fff');
                    }
                }
            },
            click: function(data, othis){
                const $elem = $(this.elem);
                const $p = $elem.children('p');
                $p.text(data.title);
                Boards.INFO[selectedBoardName].default[item.name] = data.id;
            }
        });
    }
}

Boards.writeSelectedBoardConfig = () => {
    if (!Env.isElectron)
        return;
    USER.board = USER.board ?? {};
    const { board } = USER;
    board[BOARD.boardName] = board[BOARD.boardName] ?? {};
    board[BOARD.boardName].key = Boards.getSelectedBoardKey();
    const selectedBoardName = Boards.getSelectedBoardName();
    if (!Boards.INFO[selectedBoardName])
        return;
    const defaultConfig = Boards.INFO[selectedBoardName].default;
    board[BOARD.boardName].default = { ...defaultConfig };
    const { fs_extra, path } = Modules;
    try {
        fs_extra.outputJsonSync(path.resolve(Env.clientPath, 'setting/config.json'), USER, {
            spaces: '    '
        });
    } catch (error) {
        console.log(error);
    }
}

})();