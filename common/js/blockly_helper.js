
'use strict'

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
    var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    xml = Blockly.Xml.domToText(xml);
    var mixlyVersion = "Mixly 2.0";
    if (Mixly.Config.SOFTWARE?.version) {
        mixlyVersion = Mixly.Config.SOFTWARE.version;
    }
    if (document.getElementById("boards-type")) {
        xml = xml.replace("<xml xmlns=\"https://developers.google.com/blockly/xml\"", "<xml version=\"" + mixlyVersion + "\" board=\"" + $('#boards-type').find("option:selected").text() + "\" xmlns=\"http://www.w3.org/1999/xhtml\"");
    } else {
        xml = xml.replace("<xml xmlns=\"https://developers.google.com/blockly/xml\"", "<xml version=\"" + mixlyVersion + "\" board=\"all\" xmlns=\"http://www.w3.org/1999/xhtml\"");
    }

    if ('localStorage' in window && window['localStorage'] != null) {
        window.localStorage.setItem(Mixly.Config.BOARD.boardType, xml);
        window.localStorage.setItem(Mixly.Config.BOARD.boardType + ".openedPath", Mixly.Title.getFilePath());
    } else {
        //当同时打开打开两个以上（含两个）的Mixly窗口时，只有第一个打开的窗口才有window.localStorage对象，怀疑是javafx的bug.
        //其他的窗口得通过java写cache文件来实现，否则这些窗口在普通、高级视图中进行切换时，无法加载切换之前的块
        //JSFuncs.saveToLocalStorageCache(xml);
    }

    if ('localStorage' in window && window['localStorage'] != null && Mixly.Editor.mainEditor.selected === 'CODE') {
        window.localStorage.setItem(Mixly.Config.BOARD.boardType + ".code", Mixly.Editor.codeEditor.getValue());
        window.localStorage.setItem(Mixly.Config.BOARD.boardType + ".loadCode", "true");
    } else {
        window.localStorage.setItem(Mixly.Config.BOARD.boardType + ".loadCode", "false");
    }
}

function clear_blocks_from_storage() {
    var itl = setInterval(function () {
        if (window) {
            if ('localStorage' in window && window['localStorage'] != null && window.localStorage[Mixly.Config.BOARD.boardType]) {
                window.localStorage.removeItem(Mixly.Config.BOARD.boardType);
            }
            Mixly.Editor.blockEditor.clear();
            clearInterval(itl);
        }
    }, 200);
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
    const {
        Config,
        Electron = {},
        Web = {},
        Env,
        Drag,
        Editor,
        Boards,
        Title
    } = Mixly;
    const { BOARD } = Config;
    if (!('localStorage' in window && window['localStorage'] != null)) {
        return;
    }
    if (window.localStorage[BOARD.boardType + '.filePath'] && goog.isElectron) {
        const { File } = Electron;
        File.openFile(window.localStorage[BOARD.boardType + '.filePath']);
        window.localStorage[BOARD.boardType + '.filePath'] = '';
    } else if (window.localStorage[BOARD.boardType]) {
        let xml;
        try {
            xml = $(window.localStorage[BOARD.boardType])[0];
            if ($("#boards-type").length) {
                const boardNameList = window.localStorage[BOARD.boardType].match(/(?<=board[\s]*=[\s]*\")[^\n\"]+(?=\")/g);
                let boardName = boardNameList.length? boardNameList[0] : '';
                if (BOARD.boardName
                 && boardName !== BOARD.boardName
                 && BOARD.board
                 && BOARD.board[BOARD.boardName]) {
                    boardName = BOARD.boardName;
                }
                Boards.setSelectedBoard(boardName);
                profile['default'] = profile[boardName] ?? profile['default'];
            }
            Blockly.Xml.domToWorkspace(xml, Editor.blockEditor);
            Editor.blockEditor.scrollCenter();
        } catch (e) {
            Editor.blockEditor.clear();
            console.log(e);
            clear_blocks_from_storage();
        }
        if (window.localStorage[BOARD.boardType + ".loadCode"]
            && window.localStorage[BOARD.boardType + ".loadCode"] == "true") {
            if (window.localStorage[BOARD.boardType + ".code"]) {
                Editor.mainEditor.drag.full('NEGATIVE');
                Editor.codeEditor.setValue(window.localStorage[BOARD.boardType + ".code"], -1);
            }
        }
        if (window.localStorage[BOARD.boardType + ".openedPath"]
            && window.localStorage[BOARD.boardType + ".openedPath"] !== 'null'
            && goog.isElectron) {
            const filePath = window.localStorage[BOARD.boardType + ".openedPath"];
            const { File } = Electron;
            File.openedFilePath = filePath;
            File.workingPath = path.dirname(filePath);
            Title.updeteFilePath(File.openedFilePath);
        }
    }
    const $loading = $('.loading');
    const toolboxWidth = $('.blocklyToolboxDiv').width();
    $loading.children('.left-div').animate({
      width: toolboxWidth + 'px'
    }, () => {
        $loading.fadeOut("fast", () => {
            $loading.remove();
        });
    });
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(restore_blocks, 200);
    // Hook a save function onto unload.
    bindEvent(window, 'unload', backup_blocks);
    // tabClick(selected);
    //$('.loading').remove();
    
    //Mixly.Editor.blockEditor.clear();
    // Init load event.
    //var loadInput = document.getElementById('load');
    //loadInput.addEventListener('change', load, false);
    //document.getElementById('fakeload').onclick = function () {
    //    loadInput.click();
    //};
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
    if (element.addEventListener) {  // W3C
        element.addEventListener(name, func, false);
    } else if (element.attachEvent) {  // IE
        element.attachEvent('on' + name, func);
    }
}