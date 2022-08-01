(() => {
goog.provide('Mixly.StatusBarPort');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Config');
goog.require('layui');

const { element } = layui;

const { StatusBarPort, Config, StatusBar } = Mixly;

const { USER } = Config;

StatusBarPort.portAce = {};

StatusBarPort.portNames = [];

let { portAce, portNames } = StatusBarPort;

StatusBarPort.addDefaultCommand = (port) => {
    portAce[port].commands.addCommands([
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
        }
    ]);
}

StatusBarPort.tabAdd = (port, defaultShortcutKeys = true, sucFunc = (data) => {}, delFunc = (data) => {}) => {
    
    if (!portNames.includes(port)) {
        let newPort = port;
        try {
            newPort = newPort.replaceAll('/', '-');
            newPort = newPort.replaceAll('.', '-');
        } catch (error) {
            console.log(error);
        }
        let contentData = `<pre class="tab-ace" id="tab-${newPort}-ace" align="center"></pre>`;
        element.tabAdd('status-bar-ace', {
            title: port + `<span id="tab-ace-${newPort}-span" class="layui-badge-dot layui-bg-orange"></span>`,
            content: contentData,
            id: `tab-ace-${newPort}`
        });
        portNames.push(port);
        portAce[port] = ace.edit(`tab-${newPort}-ace`);
        if (USER.theme === "dark") {
            portAce[port].setOption("theme", "ace/theme/terminal");
        } else {
            portAce[port].setOption("theme", "ace/theme/xcode");
        }
        portAce[port].getSession().setMode("ace/mode/python");
        portAce[port].setFontSize(document.body.clientWidth / 95);
        portAce[port].setReadOnly(false);
        portAce[port].setScrollSpeed(0.3);
        portAce[port].setShowPrintMargin(false);
        portAce[port].renderer.setShowGutter(false);

        if (defaultShortcutKeys) {
            StatusBarPort.addDefaultCommand(port);
        }

        if (typeof sucFunc === 'function')
            sucFunc(port);

        element.on('tabDelete(status-bar-ace)', (data) => {
            let portName = portNames[data.index - 1];
            portAce[portName].destroy();
            portAce[portName].container.remove();
            portNames.splice(data.index - 1, 1);
            delete portAce[portName];
            if (typeof delFunc === 'function')
                delFunc(portName);
        });

        element.on('tab(status-bar-ace)', (data) => {
            if (data.index == 0) {
                StatusBar.scrollToTheBottom();
            } else {
                StatusBarPort.scrollToTheBottom(portNames[data.index - 1]);
            }
        });
    } else {
        StatusBarPort.open(port);
    }
}

StatusBarPort.tabChange = (id) => {
    let newPort = id;
    try {
        newPort = newPort.replaceAll('/', '-');
        newPort = newPort.replaceAll('.', '-');
    } catch (error) {
        console.log(error);
    }
    element.tabChange("status-bar-ace", `tab-ace-${newPort}`);
}

StatusBarPort.tabDelete = (id) => {
    let newPort = id;
    try {
        newPort = newPort.replaceAll('/', '-');
        newPort = newPort.replaceAll('.', '-');
    } catch (error) {
        console.log(error);
    }
    element.tabDelete("status-bar-ace", `tab-ace-${newPort}`);
}

/**
* @function 状态栏显示数据
* @description 显示数据到状态栏内
* @param data {String} 需要显示的字符串
* @param scroll {Boolean} 是否将滚动条移到底部，true - 移动到底部，false - 保持当前位置不变
* @return void
*/
StatusBarPort.setValue = (portName, data, scroll = false) => {
    if (!portAce[portName]) return;
    portAce[portName].updateSelectionMarkers();
    const { selection } = portAce[portName];
    const initCursor = selection.getCursor();
    if (StatusBarPort.getValue(portName) === data) return;
        portAce[portName].setValue(data);
    if (scroll) {
        portAce[portName].gotoLine(portAce[portName].session.getLength());
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
StatusBarPort.getValue = (portName) => {
    if (!portAce[portName]) return "";
    return portAce[portName].getValue();
}

/**
* @function 获取状态栏数据
* @description 根据所给定的范围获取对应数据
* @return String
*/
StatusBarPort.getValueRange = (portName, startPos, endPos) => {
    if (!portAce[portName]) return "";
    if (!startPos || !endPos || typeof startPos !== 'object' || typeof endPos !== 'object')
        return "";
    const session = portAce[portName].getSession();
    return session.getTextRange(new ace.Range(
        startPos.row,
        startPos.column,
        endPos.row,
        endPos.column
    ));
}

/**
* @function 状态栏追加数据
* @description 显示数据到状态栏内
* @param data {String} 需要追加的字符串
* @param scroll {Boolean} 是否将滚动条移到底部，true - 移动到底部，false - 保持当前位置不变
* @return void
*/
StatusBarPort.addValue = (portName, data, scroll = false) => {
    if (!portAce[portName]) return;
    portAce[portName].updateSelectionMarkers();
    const { selection } = portAce[portName];
    const initCursor = selection.getCursor();
    portAce[portName].gotoLine(portAce[portName].session.getLength());
    selection.moveCursorLineEnd();
    portAce[portName].insert(data);
    if (!scroll) {
        selection.moveCursorTo(initCursor.row, initCursor.column, true);
    } else {
        portAce[portName].gotoLine(portAce[portName].session.getLength());
        selection.moveCursorLineEnd();
    }
}

/**
* @function 状态栏获取结尾字符的位置
* @description 状态栏获取结尾字符的位置
* @return object { row: number, column: number }
*/
StatusBarPort.getEndPos = (portName) => {
    if (!portAce[portName]) return;
    const session = portAce[portName].getSession();
    const row = session.getLength() - 1;
    const column = session.getLine(row).length;
    return { row, column };
}

/**
* @function 移动滚动条到底部
* @description 移动状态栏的滚动条到最底部
* @return void
*/
StatusBarPort.scrollToTheBottom = (portName) => {
    if (!portAce[portName]) return;
    portAce[portName].updateSelectionMarkers();
    portAce[portName].gotoLine(portAce[portName].session.getLength());
    portAce[portName].selection.moveCursorLineEnd();
}

/**
* @function 移动滚动条到顶部
* @description 移动状态栏的滚动条到最顶部
* @return void
*/
StatusBarPort.scrollToTheTop = (portName) => {
    if (!portAce[portName]) return;
    portAce[portName].gotoLine(0);
}

StatusBarPort.open = (portName) => {
    let newPort = portName;
    try {
        newPort = newPort.replaceAll('/', '-');
        newPort = newPort.replaceAll('.', '-');
    } catch (error) {
        console.log(error);
    }
    let aceSpan = $(`#tab-ace-${newPort}-span`);
    if (aceSpan && aceSpan[0]) {
        aceSpan[0].className = "layui-badge-dot layui-bg-orange";
    }
}

StatusBarPort.close = (portName) => {
    let newPort = portName;
    try {
        newPort = newPort.replaceAll('/', '-');
        newPort = newPort.replaceAll('.', '-');
    } catch (error) {
        console.log(error);
    }
    let aceSpan = $(`#tab-ace-${newPort}-span`);
    if (aceSpan && aceSpan[0]) {
        aceSpan[0].className = "layui-badge-dot layui-bg-blue";
    }
}
})();