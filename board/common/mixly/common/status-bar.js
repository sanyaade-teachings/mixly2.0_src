(() => {

goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Config');
goog.require('Mixly.Drag');
goog.provide('Mixly.StatusBar');

let {
    Env,
    XML,
    StatusBar,
    Config,
    Drag
} = Mixly;
StatusBar.selected = false;

const { BOARD, USER } = Config;
let { Ace } = StatusBar;

/**
* @function 初始化状态栏
* @description 初始化状态栏
* @return void
*/
StatusBar.init = () => {
    Ace = ace.edit("div_inout_middle");
    StatusBar.Ace = Ace;
    if (USER.theme === 'dark')
        Ace.setOption("theme", "ace/theme/terminal");
    else
        Ace.setOption("theme", "ace/theme/xcode");
    Ace.getSession().setMode("ace/mode/python");
    Ace.setFontSize(document.body.clientWidth / 95);
    Ace.setReadOnly(false);
    Ace.setScrollSpeed(0.3);
    Ace.setShowPrintMargin(false);
    Ace.renderer.setShowGutter(false);
    Ace.commands.addCommands([
        {
            name: "increaseFontSize",
            bindKey: "Ctrl-=|Ctrl-+",
            exec: (editor) => {
                var size = parseInt(editor.getFontSize(), 10) || 12;
                editor.setFontSize(size + 1);
            }
        }, {
            name: "decreaseFontSize",
            bindKey: "Ctrl+-|Ctrl-_",
            exec: (editor) => {
                var size = parseInt(editor.getFontSize(), 10) || 12;
                editor.setFontSize(Math.max(size - 1 || 1));
            }
        }, {
            name: "resetFontSize",
            bindKey: "Ctrl+0|Ctrl-Numpad0",
            exec: (editor) => {
                editor.setFontSize(12);
            }
        }, {
            name: "sendCtrlC",
            bindKey: "Ctrl-Shift-C",
            exec: (editor) => {
                if (Mixly.Env.isElectron) {
                    Mixly.Electron.Serial.writeCtrlC();
                } else {
                    Mixly.Web.Serial.writeCtrlC();
                }
            }
        }, {
            name: "sendCtrlD",
            bindKey: "Ctrl-Shift-D",
            exec: (editor) => {
                if (Mixly.Env.isElectron) {
                    Mixly.Electron.Serial.writeCtrlD();
                } else {
                    Mixly.Web.Serial.writeCtrlD();
                }
            }
        }, {
            name: "Empty",
            bindKey: "Ctrl-E",
            exec: (editor) => {
                StatusBar.setValue("");
            }
        }
    ]);
}

/**
* @function 显示、隐藏或反转状态栏
* @description 显示、隐藏或反转状态栏
* @param type {number} 0 - 反转状态栏，1 - 打开状态栏，2 - 关闭状态栏
* @return void
*/
StatusBar.show = (type) => {
    const { hDrag } = Drag.items;
    switch (type) {
        case 1:
            hDrag.show();
            break;
        case 2:
            hDrag.full('POSITIVE');
            break;
        case 0:
        default:
            if (hDrag.onfull) {
                if (hDrag.onfull === 'POSITIVE')
                    hDrag.show();
                else
                    hDrag.full('POSITIVE');
            } else {
                hDrag.full('POSITIVE');
            }

    }
}

/**
* @function 状态栏显示数据
* @description 显示数据到状态栏内
* @param data {String} 需要显示的字符串
* @param scroll {Boolean} 是否将滚动条移到底部，true - 移动到底部，false - 保持当前位置不变
* @return void
*/
StatusBar.setValue = (data, scroll = true) => {
    if (!Ace) return;
    Ace.updateSelectionMarkers();
    const { selection } = Ace;
    const initCursor = selection.getCursor();
    if (StatusBar.getValue() === data) return;
        Ace.setValue(data, -1);
    if (scroll) {
        Ace.gotoLine(Ace.session.getLength());
        selection.moveCursorLineEnd();
    } else {
        selection.moveCursorTo(initCursor.row, initCursor.column, true);
        selection.clearSelection();
    }
}


/**
* @function 获取状态栏数据
* @description 获取当前状态栏显示的数据
* @return String
*/
StatusBar.getValue = function () {
    if (!Ace) return "";
    return Ace.getValue();
}

/**
* @function 状态栏追加数据
* @description 显示数据到状态栏内
* @param data {String} 需要追加的字符串
* @param scroll {Boolean} 是否将滚动条移到底部，true - 移动到底部，false - 保持当前位置不变
* @return void
*/
StatusBar.addValue = (data, scroll = true) => {
    if (!Ace) return;
    Ace.updateSelectionMarkers();
    const { selection, session } = Ace;
    const initCursor = selection.getCursor();
    Ace.gotoLine(session.getLength());
    selection.moveCursorLineEnd();
    Ace.insert(data);
    if (scroll) {
        Ace.gotoLine(session.getLength());
        selection.moveCursorLineEnd();
    } else {
        selection.moveCursorTo(initCursor.row, initCursor.column, true);
    }
}

/**
* @function 移动滚动条到底部
* @description 移动状态栏的滚动条到最底部
* @return void
*/
StatusBar.scrollToTheBottom = () => {
    if (!Ace) return;
    Ace.updateSelectionMarkers();
    Ace.gotoLine(Ace.session.getLength());
}

/**
* @function 移动滚动条到顶部
* @description 移动状态栏的滚动条到最顶部
* @return void
*/
StatusBar.scrollToTheTop = () => {
    if (!Ace) return;
    Ace.gotoLine(0);
}
})();