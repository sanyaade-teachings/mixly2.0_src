goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.Config');
goog.require('Mixly.Nav');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.provide('Mixly.Editor');

const {
    Config,
    Nav,
    XML,
    Msg,
    Editor
} = Mixly;

const {
    BOARD,
    USER,
    SOFTWARE
} = Config;

Editor.DIV_NAME = {
    'CODE': 'code-editor',
    'BLOCK': 'block-editor'
};

Editor.selected = 'BLOCK';

Editor.init = () => {
    $('#mixly-footer-codelang').html(BOARD.language ?? '未知');
    Editor.codeEditorInit();
    Editor.blockEditorInit();
    const { blockEditor, codeEditor } = Editor;
    let blocklyGenerator;
    switch (BOARD.language) {
        case 'Python':
        case 'CircuitPython':
        case 'MicroPython':
            blocklyGenerator = Blockly.Python;
            codeEditor.getSession().setMode('ace/mode/python');
            codeEditor.getSession().setTabSize(4);
            if (USER.theme === 'dark') {
                codeEditor.setTheme('ace/theme/dracula');
            } else {
                codeEditor.setTheme('ace/theme/crimson_editor');
            }
            Editor.py2BlockEditorInit(codeEditor);
            break;
        case 'C/C++':
            blocklyGenerator = Blockly.Arduino;
            codeEditor.getSession().setTabSize(2);
            codeEditor.getSession().setMode('ace/mode/c_cpp');
            if (USER.theme === 'dark') {
                codeEditor.setTheme('ace/theme/dracula');
            } else {
                codeEditor.setTheme('ace/theme/xcode');
            }
            break;
        default:
            blocklyGenerator = Blockly.Python ?? Blockly.Arduino;
    }
    //实时更新右侧对比代码
    Editor.codeChangeEvent = blockEditor.addChangeListener(codeChangeEvent);
    function getboardType () {
        let str = BOARD.boardIndex ?? '';
        str = str.replaceAll('\\', '/');
        if (BOARD.thirdPartyBoard) {
            return str.match(/(?<=boards\/extend\/)[^?\/\\、*\"><|]+/g)[0];
        } else {
            return str.match(/(?<=boards\/default\/)[^?\/\\、*\"><|]+/g)[0];
        }
    }
    function codeChangeEvent (masterEvent) {
        if (masterEvent.type === Blockly.Events.UI || Editor.selected !== 'BLOCK') {
           return;  // Don't update UI events.
        }
        //更新代码
        var code = blocklyGenerator.workspaceToCode(blockEditor) || '';
        code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
            try {
                return decodeURIComponent(s.replace(/_/g, '%'));
            } catch (error) {
                return s;
            }
        });
        if (BOARD.boardIndex.indexOf("/python_mixpy/") !== -1) {
            try {
                var inputArr = code.match(/(?<![\w+])input\(/g);
                if (inputArr) {
                    code = "\n" + code;
                }
            } catch (e) {
                console.log(e);
            }
        } else if (getboardType() === 'python_skulpt_mixtoy'
                || getboardType() === 'python_skulpt_car') {
            if ((code.indexOf("import blocktool")!=-1)||(code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
                //正则匹配替换block id元素
                var code_piece=[];
                code_piece=code.split("\n");
                for(var i=0;i<code_piece.length;i++){
                    if(code_piece[i].indexOf("block_id") >= 0 ){  
                        var target="";
                        var re=/,?'block_id=[\s\S]*'/.exec(code_piece[i]);
                        if(re!=null){
                            target=re[0];
                            code_piece[i]=code_piece[i].replace(target,"");
                        } 
                    }
                    //检查是否是高亮辅助块\toll，如果是，则将此行代码移除
                    if((code_piece[i].indexOf("import blocktool") >= 0) || (code_piece[i].indexOf("blocktool.highlight") >= 0) ){  
                        code_piece[i]="delete";
                    }
                    
                }   
                code="";
                for(var i=0;i<code_piece.length;i++){
                    if(code_piece[i]!="delete"){
                        code+=code_piece[i]+'\n'
                    }
                } 
            }
        }
        codeEditor.setValue(code, -1);
    }

    if (SOFTWARE?.socketServer?.enabled === 'true') {
        Mixly.WebSocket.Socket.init();
    }
}

Editor.blockEditorInit = () => {
    const media = Config.pathPrefix + 'common/media/';
    const toolbox = $('#toolbox')[0];
    const renderer = ['geras', 'zelos'].includes(USER.blockRenderer) ? USER.blockRenderer : 'geras';
    const grid = USER.blocklyShowGrid ==='yes' ? {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        } : {};
    Editor.blockEditor = Blockly.inject($('#' + Editor.DIV_NAME.BLOCK)[0], {
        media,
        toolbox,
        renderer,
        zoom: {
            controls: true,
            wheel: true,
            scaleSpeed: 1.03
        },
        grid
    });

    Editor.blockEditor.registerToolboxCategoryCallback(
        Blockly.Variables.CATEGORY_NAME,
        Blockly.Variables.flyoutCategory
    );

    Editor.blockEditor.registerToolboxCategoryCallback(
        Blockly.Procedures.CATEGORY_NAME,
        Blockly.Procedures.flyoutCategory
    );

    if (USER.theme === 'dark') {
        Editor.blockEditor.setTheme(Blockly.Themes.Dark);
    } else {
        Editor.blockEditor.setTheme(Blockly.Themes.Classic);
    }
}

Editor.codeEditorInit = () => {
    Editor.codeEditor = ace.edit(Editor.DIV_NAME.CODE);
    const { codeEditor } = Editor;
    codeEditor.setFontSize(Math.max($('body').width() / 85, $('body').height() / 85, 12));
    codeEditor.setShowPrintMargin(false);
    codeEditor.setReadOnly(true);
    codeEditor.setScrollSpeed(0.8);
    codeEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    Editor.codeEditorAddCommands();
    Editor.codeEditorAddBtn();
    Editor.codeEditorMenuRender();
    Editor.codeEditorAddEvent();
}

Editor.py2BlockEditorInit = (editor) => {
    if (typeof Sk === 'object'
        && typeof PythonToBlocks === 'function'
        && typeof Py2blockEditor === 'function') {
        const py2blockConverter = new PythonToBlocks();
        Editor.py2BlockEditor = new Py2blockEditor(py2blockConverter, editor);
        Sk.python3 = true;
    }
}

Editor.redo = () => {
    const { blockEditor, codeEditor } = Editor;
    if (Editor.selected === 'BLOCK') {
        blockEditor.undo(1);
    } else {
        codeEditor.redo();
    }
}

Editor.undo = () => {
    const { blockEditor, codeEditor } = Editor;
    if (Editor.selected === 'BLOCK') {
        blockEditor.undo(0);
    } else {
        codeEditor.undo();
    }
}

Editor.codeEditorAddCommands = () => {
    const { codeEditor } = Editor;
    codeEditor.commands.addCommands([{
        name: "increaseFontSize",
        bindKey: "Ctrl-=|Ctrl-+",
        exec: function (editor) {
            const size = parseInt(editor.getFontSize(), 10) || 12;
            editor.setFontSize(size + 1);
        }
    }, {
        name: "decreaseFontSize",
        bindKey: "Ctrl+-|Ctrl-_",
        exec: function (editor) {
            const size = parseInt(editor.getFontSize(), 10) || 12;
            editor.setFontSize(Math.max(size - 1 || 1));
        }
    }, {
        name: "resetFontSize",
        bindKey: "Ctrl+0|Ctrl-Numpad0",
        exec: function (editor) {
            editor.setFontSize(Math.max($('body').width() / 85, $('body').height() / 85, 12));
        }
    }, {
        name: "exitCodeEditor",
        bindKey: "Ctrl+E",
        exec: function (editor) {
            if (Editor.selected === 'BLOCK')
                return;
            Editor.items.vDrag.full('POSITIVE');
        }
    }]);
}

Editor.codeEditorAddBtn = () => {
    const $codeEditorDiv = $('#' + Editor.DIV_NAME.CODE);
    $codeEditorDiv.append('<div id="resetFontSize" m-id="resetFontSize" class="code-editor-btn setFontSize" width="32" height="32" style="cursor:hand;display:none;"></div>');
    $codeEditorDiv.append('<div id="increaseFontSize" m-id="increaseFontSize" class="code-editor-btn setFontSize" width="32" height="32" style="cursor:hand;display:none;"></div>');
    $codeEditorDiv.append('<div id="decreaseFontSize" m-id="decreaseFontSize" class="code-editor-btn setFontSize" width="32" height="32" style="cursor:hand;display:none;"></div>');
    $codeEditorDiv.children('.code-editor-btn').click(function() {
        const mId = $(this).attr('m-id');
        switch (mId) {
            case 'resetFontSize':
                Editor.codeEditorRstFontSize();
                break;
            case 'increaseFontSize':
                Editor.codeEditorIncFontSize();
                break;
            case 'decreaseFontSize':
                Editor.codeEditorDecFontSize();
                break;
        }
    })
}

Editor.codeEditorShowBtn = () => {
    const $codeEditorDiv = $('#' + Editor.DIV_NAME.CODE);
    const btns = $codeEditorDiv.children('.code-editor-btn');
    btns.css('display', 'block');
}

Editor.codeEditorHideBtn = () => {
    const $codeEditorDiv = $('#' + Editor.DIV_NAME.CODE);
    const btns = $codeEditorDiv.children('.code-editor-btn');
    btns.css('display', 'none');
}

Editor.codeEditorMenuRender = () => {
    const { codeEditor } = Editor;
    const menuElem = '<div style="float:left;">{{d.name}}&nbsp</div><div style="float:right;">&nbsp{{d.hotKey}}</div>';
    let data = [];
    if (Editor.selected === 'CODE') {
        data = [{
            title: XML.render(menuElem, { name: Msg.Lang['剪切'], hotKey: 'Ctrl+X' }),
            id: 'cut'
        }, {
            title: XML.render(menuElem, { name: Msg.Lang['复制'], hotKey: 'Ctrl+C' }),
            id: 'copy'
        }, {
            title: XML.render(menuElem, { name: Msg.Lang['粘贴'], hotKey: 'Ctrl+V' }),
            id: 'paste'
        }, {type:'-'}, {
            title: XML.render(menuElem, { name: Msg.Lang['全选'], hotKey: 'Ctrl+A' }),
            id: 'selectall'
        }, {
            title: XML.render(menuElem, { name: Msg.Lang['查找'], hotKey: 'Ctrl+F' }),
            id: 'find'
        }, {type:'-'}, {
            title: XML.render(menuElem, { name: Msg.Lang['切换行注释'], hotKey: 'Ctrl+/' }),
            id: 'togglecomment'
        }, {
            title: XML.render(menuElem, { name: Msg.Lang['切换块注释'], hotKey: 'Ctrl+Shift+/' }),
            id: 'toggleBlockComment'
        }/*, {type:'-'}, {
            title: XML.render(menuElem, { name: Msg.Lang['命令面板'], hotKey: 'F1' }),
            id: 'openCommandPallete'
        }*/, {type:'-'}, {
            title: XML.render(menuElem, { name: Msg.Lang['退出代码编辑器'], hotKey: 'Ctrl+E' }),
            id: 'exitCodeEditor'
        }];
        switch (BOARD.language) {
            case 'Python':
            case 'CircuitPython':
            case 'MicroPython':
                data.splice(8, 1);
                break;   
        }
    } else {
        data = [{
            title: XML.render(menuElem, { name: Msg.Lang['打开代码编辑器'], hotKey: '' }),
            id: 'openCodeEditor'
        }];
    }
    
    layui.dropdown.render({
        elem: '#code-editor',
        trigger: 'contextmenu',
        data,
        className: 'editor-dropdown-menu',
        click: (obj, othis) => {
            switch (obj.id) {
                case 'selectall':
                case 'find':
                case 'togglecomment':
                case 'toggleBlockComment':
                case 'openCommandPallete':
                    codeEditor.execCommand(obj.id);
                    break;
                case 'cut':
                    const cutLine = codeEditor.selection.isEmpty();
                    const range = cutLine ? codeEditor.selection.getLineRange() : codeEditor.selection.getRange();
                    codeEditor._emit("cut", range);
                    if (!range.isEmpty()) {
                        const copyText = codeEditor.session.getTextRange(range);
                        navigator.clipboard.writeText(copyText)
                        .then((message) => {
                            // console.log('clipboard：复制成功');
                        }).catch((error) => {
                            // console.log('clipboard：复制失败');
                        });
                        codeEditor.session.remove(range);
                    }
                    codeEditor.clearSelection();
                    break;
                case 'copy':
                    const copyText = codeEditor.getSelectedText();
                    codeEditor.clearSelection();
                    if (copyText)
                        navigator.clipboard.writeText(copyText)
                        .then((message) => {
                            // console.log('clipboard：复制成功');
                        }).catch((error) => {
                            // console.log('clipboard：复制失败');
                        });
                    break;
                case 'paste':
                    navigator.clipboard.readText()
                    .then((message) => {
                        codeEditor.execCommand(obj.id, message);
                        // console.log('clipboard：粘贴成功');
                    })
                    .catch((error) => {
                        // console.log('clipboard：粘贴失败');
                    });
                    break;
                case 'openCodeEditor':
                    if (Editor.selected === 'CODE')
                        break;
                    Editor.items.vDrag.full('NEGATIVE');
                    break;
                case 'exitCodeEditor':
                    if (Editor.selected === 'BLOCK')
                        break;
                    Editor.items.vDrag.full('POSITIVE');
                    break;
            }
        }
    });
}


Editor.codeEditorIncFontSize = () => {
    const { codeEditor } = Editor;
    //放大代码界面字体
    const size = parseInt(codeEditor.getFontSize(), 10) || 12;
    codeEditor.setFontSize(size + 1);
}

Editor.codeEditorDecFontSize = () => {
    const { codeEditor } = Editor;
    const size = parseInt(codeEditor.getFontSize(), 10) || 12;
    codeEditor.setFontSize(Math.max(size - 1 || 1));
}

Editor.codeEditorRstFontSize = () => {
    const { codeEditor } = Editor;
    codeEditor.setFontSize(Math.max($('body').width() / 85, $('body').height() / 85, 12));
}

Editor.codeEditorAddEvent = () => {
    const { codeEditor } = Editor;
    $('#mixly-footer-cursor').hide();
    codeEditor.on('focus', function() {
        $('#mixly-footer-cursor').show();
    });
    codeEditor.on("blur", function() {
        $('#mixly-footer-cursor').hide();
    });
    const { selection } = codeEditor.getSession(); 
    selection.on('changeCursor', function () {
        const cursor = selection.getCursor();
        $('#mixly-footer-row').html(cursor.row + 1);
        $('#mixly-footer-column').html(cursor.column + 1);
    });
    selection.on("changeSelection", function () {
        if (selection.isEmpty()) {
            $('#mixly-footer-selected').parent().hide();
        } else {
            const range = selection.getRange();
            const text = codeEditor.session.getTextRange(range);
            $('#mixly-footer-selected').parent().css('display', 'inline-flex');
            $('#mixly-footer-selected').html(text.length); 
        }
    });
}

Editor.blockEditorUpdateCode = () => {
    const { blockEditor } = Editor;
    blockEditor.fireChangeListener(Editor.codeChangeEvent);
}

Editor.py2BlockEditorChangeStatus = () => {
    const pythonToBlocklyDom = $('#python-to-blockly-btn');
    const status = BOARD.pythonToBlockly ?? false;
    if (status) {
        pythonToBlocklyDom.html(MSG['enablePythonToBlockly'])
                          .attr('class', 'icon-toggle-off-1');
        BOARD.pythonToBlockly = false;
    } else {
        pythonToBlocklyDom.html(MSG['disablePythonToBlockly'])
                          .attr('class', 'icon-toggle-on-1');
        BOARD.pythonToBlockly = true;
    }
}

});