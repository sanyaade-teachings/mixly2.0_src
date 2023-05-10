goog.loadJs('common', () => {

goog.require('tippy');
goog.require('layui');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.Modules');
goog.require('Mixly.MString');
goog.require('Mixly.Editor');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.Msg');
goog.require('Mixly.BoardConfigMenu');
goog.require('Mixly.BoardConfigItem');
goog.require('Mixly.FooterBar');
goog.provide('Mixly.Boards');

const {
    Config,
    LayerExt,
    XML,
    Env,
    ToolboxSearcher,
    Modules,
    MString,
    Editor,
    FooterLayer,
    Msg,
    Boards,
    BoardConfigItem,
    BoardConfigMenu
} = Mixly;

const { form } = layui;

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
    Boards.dict = {};
    if (BOARD.board instanceof Object || BOARD.board instanceof String) {
        for (let i in BOARD.board) {
            Boards.dict[i] = new BoardConfigItem(i, BOARD.board[i]);
            if (USER.board && USER.board[BOARD.boardType]) {
                Boards.dict[i].setSelectedOptions(USER.board[BOARD.boardType].default);
            }
        }
    } else {
        Boards.dict[BOARD.boardType] = new BoardConfigItem(BOARD.boardType, BOARD.boardType);
    }
    Boards.NAME = Object.keys(Boards.dict);
    Boards.configMenu = new BoardConfigMenu('mixly-board-config', Boards.dict);
    const $boards = $('#boards-type');
    if ($boards.length) {
        $boards.empty();
        for (let name of Object.keys(Boards.dict)) {
            $boards.append(`<option value="${Boards.dict[name].key}">${name}</option>`);
        }
        form.render('select', 'boards-type-filter');
    }
    Mixly.FooterBar.init();
}

Boards.getType = () => {
    let str = BOARD.boardIndex ?? '';
    str = str.replaceAll('\\', '/');
    if (BOARD.thirdPartyBoard) {
        return str.match(/(?<=boards\/extend\/)[^?\/\\、*\"><|]+/g)[0];
    } else {
        return str.match(/(?<=boards\/default\/)[^?\/\\、*\"><|]+/g)[0];
    }
}

Boards.getSelectedBoardName = () => {
    return $('#boards-type option:selected').text();
}

Boards.getSelectedBoardKey = () => {
    return $('#boards-type option:selected').val();
}

Boards.setSelectedBoard = (name, userConfig) => {
    const charIndex = name.indexOf('@');
    if (charIndex !== -1) {
        name = name.substring(charIndex + 1, name.length);
    }
    if (!Boards.NAME.includes(name))
        return;
    const boardInfo = Boards.dict[name];
    if (boardInfo && boardInfo.key) {
        $("#boards-type").val(boardInfo.key);
        boardInfo.setSelectedOptions(userConfig);
        form.render('select', 'boards-type-filter');
    }
    Boards.changeTo(name);
    Boards.updateCategories(name);
    if (typeof profile === 'object' && profile[name]) 
        profile['default'] = profile[name];
}

Boards.getSelectedBoardConfig = () => {
    const boardName = Boards.getSelectedBoardName();
    return Boards.dict[boardName]?.selectedOptions ?? null;
}

Boards.getBoardCommandParam = (boardName) => {
    if (!Boards.dict[boardName]) return null;
    const info = Boards.dict[boardName];
    let { key, ignore = [] } = info;
    const { selectedOptions } = info;
    if (!key) return null;
    const index = key.indexOf('@');
    if (index !== -1)
        key = key.substring(0, index);
    let commandStr = key;
    if (typeof selectedOptions === 'object') {
        commandStr += ':';
        for (let i in selectedOptions) {
            if (!ignore.includes(i))
                commandStr += i + '=' + selectedOptions[i].key + ',';
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
    const selectedOptions = Boards.getSelectedBoardConfig();
    if (selectedOptions && typeof selectedOptions === 'object')
        return selectedOptions[param].key ?? '';
    return '';
}

/**
 * @function 更新当前所选择板卡及其相关配置
 * @param boardName {string} 板卡名
 * @return {void}
 **/
Boards.changeTo = (boardName) => {
    profile = typeof profile === 'object' ? profile : {};
    if (profile[boardName]) {
        profile['default'] = profile[boardName];
    } else {
        profile['default'] = profile['default'] ?? {};
    }
    const boardKey = Boards.dict[boardName].key;
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
            for (let i in Boards.dict) {
                const key = Boards.dict[i].key;
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
        for (let i in Boards.dict) {
            const key = Boards.dict[i].key;
            if (outObj[key]) {
                delete outObj[key];
            }
        }
        const pathObj = {
            path: Env.clientPath,
            indexPath: Env.indexDirPath,
            srcPath: Env.srcPath
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
                let pyToolsPath = "{srcPath}/pyTools/";
                let obj = {};
                let pyTools = {
                    'esptool': 'esptool.py',
                    'kflash': 'kflash.py',
                    'stm32loader': 'stm32loader.py',
                    'stm32bl': 'stm32bl.py',
                    'ampy': 'ampy/cli.py'
                };
                for (let key in pyTools) {
                    obj[key] = Env.python3Path + "\" \"" + pyToolsPath + pyTools[key];
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
                if (outObj.special && outObj.special instanceof Array) {
                    for (let key in outObj.special) {
                        if (!outObj.special[key]?.name
                         || !outObj.special[key]?.command) {
                            continue;
                        }
                        outObj.special[key].command = MString.tpl(outObj.special[key].command, obj);
                        outObj.special[key].command = MString.tpl(outObj.special[key].command, pathObj);
                    }
                }
                break;
        }
        if (value.type === 'upload' && (Env.isElectron || Env.hasSocketServer) && outObj.copyLib) {
            const { path } = Modules;
            if (outObj.libPath) {
                let libPath = [];
                for (let dirPath of outObj.libPath) {
                    libPath.push(MString.tpl(dirPath, pathObj));
                }
                outObj.libPath = libPath;
            } else {
                if (Env.isElectron) {
                    outObj.libPath = [ path.resolve(Env.indexDirPath, 'build/lib/') ];
                } else {
                    outObj.libPath = goog.normalizePath_(Env.indexDirPath + '/build/lib/');
                }
            }
        }
        if (Env.isElectron || Env.hasSocketServer) {
            const { path } = Modules;
            if (outObj.filePath) {
                outObj.filePath = MString.tpl(outObj.filePath, pathObj);
            } else {
                if (Env.isElectron) {
                    outObj.filePath = path.resolve(Env.indexDirPath, 'build/main.py');
                } else {
                    outObj.filePath = goog.normalizePath_(Env.indexDirPath + '/build/main.py');
                }
            }
        }
        SELECTED_BOARD[value.type] = outObj;
    }
}

Boards.updateCategories = (boardName, enforce = false) => {
    if (Boards.selected === boardName && !enforce) return;
    Boards.selected = boardName;
    $('#mixly-footer-boardname').html(boardName);
    Boards.configMenu.changeTo(boardName);
    let thirdPartyStr = '';
    if (Env.isElectron) {
        thirdPartyStr = Env.thirdPartyXML.join('');
    }
    const searchCategoryStr = '<category id="catSearch" hidden="true" colour="#ff6666"><label text="'
                             + Msg.Lang['无数据']
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
    if (Editor.blockEditor) {
        Editor.blockEditor.updateToolbox(toolboxDom[0]);
        ToolboxSearcher.restart();
        Editor.blockEditor.scrollCenter();
        Blockly.hideChaff();
    }
}

Boards.selectCategories = (boardName, categoriesStr) => {
    const boardKeyList = (Boards.dict[boardName] ? Boards.dict[boardName].key : '').split(':');
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

});