goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.DragH');
goog.require('Mixly.EditorMix');
goog.require('Mixly.StatusBarTab');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Nav');
goog.require('ChromeTabs');
goog.require('jstree');
goog.require('Mixly.EditorsManager');
goog.require('Mixly.Workspace');
goog.provide('Mixly.Editor');

const {
    DragH,
    DragV,
    EditorMix,
    StatusBarTab,
    Msg,
    Config,
    Nav,
    EditorsManager,
    Workspace,
    Editor
} = Mixly;

const { USER, BOARD } = Config;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');

function getFileType(fileName) {
      let suffix = ''; // 后缀获取
      let result = ''; // 获取类型结果
      if (fileName) {
        const flieArr = fileName.split('.'); // 根据.分割数组
        suffix = flieArr[flieArr.length - 1]; // 取最后一个
      }
      if (!suffix) return false; // fileName无后缀返回false
      suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
      // 匹配图片
      const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'ico', 'icns']; // 图片格式
      result = imgList.find(item => item === suffix);
      if (result) return 'image';
      // 匹配txt
      const txtList = ['txt'];
      result = txtList.find(item => item === suffix);
      if (result) return 'txt';
      // 匹配excel
      const excelList = ['xls', 'xlsx'];
      result = excelList.find(item => item === suffix);
      if (result) return 'excel';
      // 匹配word
      const wordList = ['doc', 'docx'];
      result = wordList.find(item => item === suffix);
      if (result) return 'word';
      // 匹配pdf
      const pdfList = ['pdf'];
      result = pdfList.find(item => item === suffix);
      if (result) return 'pdf';
      // 匹配ppt
      const pptList = ['ppt', 'pptx'];
      result = pptList.find(item => item === suffix);
      if (result) return 'ppt';
      // 匹配zip
      const zipList = ['rar', 'zip', '7z'];
      result = zipList.find(item => item === suffix);
      if (result) return 'zip';
      // 匹配视频
      const videoList = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
      result = videoList.find(item => item === suffix);
      if (result) return 'video';
      // 匹配音频
      const radioList = ['mp3', 'wav', 'wmv'];
      result = radioList.find(item => item === suffix);
      if (result) return 'radio';
      // 匹配代码
      const codeList = ['py', 'js', 'ts', 'css', 'less', 'html', 'xml', 'json', 'c', 'cpp', 'h', 'hpp', 'mix', 'mil'];
      result = codeList.find(item => item === suffix);
      if (result) return 'code';
      // 其他文件类型
      return 'other';
}

const getPath = function (inPath) {
    let exampleList = [];
    if (fs_plus.isDirectorySync(inPath)) {
        const dataList = fs.readdirSync(inPath);
        for (let data of dataList) {
            const dataPath = path.join(inPath, data);
            if (fs_plus.isDirectorySync(dataPath)) {
                let children = false;
                let icon = 'icon-folder-empty';
                if (fs.readdirSync(dataPath).length) {
                    children = true;
                    icon = 'icon-folder';
                }
                exampleList.push({
                    text: data,
                    id: dataPath,
                    children,
                    li_attr: {
                        title: dataPath
                    },
                    icon
                });
            } else {
                const extname = path.extname(data, '.');
                let icon = 'icon-doc';
                const fileType = getFileType(extname);
                switch (fileType) {
                case 'image':
                    icon = 'icon-file-image';
                    break;
                case 'txt':
                    icon = 'icon-doc-text-inv';
                    break;
                case 'excel':
                    icon = 'icon-file-excel';
                    break;
                case 'word':
                    icon = 'icon-file-word';
                    break;
                case 'pdf':
                    icon = 'icon-file-pdf';
                    break;
                case 'ppt':
                    icon = 'icon-file-powerpoint';
                    break;
                case 'zip':
                    icon = 'icon-file-archive';
                    break;
                case 'video':
                    icon = 'icon-file-video';
                    break;
                case 'radio':
                    icon = 'icon-file-audio';
                    break;
                case 'code':
                    icon = 'icon-file-code-1';
                    break;
                case 'other':
                default:
                    icon = 'icon-doc';
                }
                exampleList.push({
                    text: data,
                    id: dataPath,
                    children: false,
                    li_attr: {
                        title: dataPath
                    },
                    icon
                });
            }
        }
    }
    return exampleList;
}

Editor.init = () => {
    Editor.mainEditor = new EditorMix($('<div></div>')[0]);
    Editor.mainEditor.init();
    Editor.blockEditor = Editor.mainEditor.blockEditor.editor;
    Editor.codeEditor = Editor.mainEditor.codeEditor.editor;
    Editor.workspace = new Workspace($('#mixly-body')[0]);
    // Editor.addBtnClickEvent();
    Mixly.mainStatusBarTab = Editor.workspace.statusBarTabs;
    Nav.register({
        icon: 'icon-ccw',
        title: 'undo(ctrl+z)',
        id: 'undo-btn',
        displayText: Blockly.Msg.MSG['undo'],
        preconditionFn: () => {
            return true;
        },
        callback: () => Editor.mainEditor.undo(),
        scopeType: Nav.Scope.LEFT,
        weight: 0
    });
    Nav.register({
        icon: 'icon-cw',
        title: 'redo(ctrl+y)',
        id: 'redo-btn',
        displayText: Blockly.Msg.MSG['redo'],
        preconditionFn: () => {
            return true;
        },
        callback: () => Editor.mainEditor.redo(),
        scopeType: Nav.Scope.LEFT,
        weight: 1
    });

    if (USER.theme === 'dark') {
        trackBackground = '#222';
        thumbBackground = '#b0b0b0';
    } else {
        trackBackground = '#ddd';
        thumbBackground = '#5f5f5f';
    }

    let rootPath = 'D:/gitee/mixly2.0-win32-x64/resources/app/src/sample';
    const $tree = Editor.workspace.$sidebar
      .on('click.jstree', '.jstree-open>a', ({ target }) => {
        setTimeout(() => $tree.jstree(true).close_node(target));
      })
      .on('click.jstree', '.jstree-closed>a', ({ target }) => {
        setTimeout(() => $tree.jstree(true).open_node(target));
      })
      .on('click', () => {

      })
      .jstree({
        core: {
            multiple: false,
            animation: 0,
            worker: false,
            data: function (node, cb) {
                if(node.id === "#") {
                  cb([{
                    text: `<div style="font-weight: bold;display: unset;">SAMPLE</div>`,
                    id: 'D:/gitee/mixly2.0-win32-x64/resources/app/src/sample',
                    children: true,
                    li_attr: {
                        title: "D:/gitee/mixly2.0-win32-x64/resources/app/src/sample"
                    },
                    icon: 'icon-folder'
                }]);
                } else {
                  cb(getPath(node.id));
                }
            },
            themes: {
                dots: false,
                name: 'default-dark',
                responsive: false,
                ellipsis: true
            }
        },
        // plugins: ['wholerow', 'search', 'truncate', 'state'],
        plugins: ['wholerow']
    });
    const scrollbar = new XScrollbar(Editor.workspace.$sidebar[0], {
        onlyHorizontal: false,
        thumbSize: 4,
        thumbRadius: 2,
        trackBackground,
        thumbBackground
    });

    $tree.on("changed.jstree", function (e, data) {
        const selected = data.instance.get_selected(true);
        if (!selected.length) {
            return;
        }
        if (['icon-folder', 'icon-folder-empty'].includes(selected[0].icon)) {
            return;
        }
        Editor.workspace.editorManager.editorTabs.addTab({
            name: selected[0].text,
            favicon: false,
            title: selected[0].id
        });
    });
}

Editor.addDrag = () => {
    const { blockEditor, codeEditor } = Editor.mainEditor;
    const $hBar = $('#nav').find('button[m-id="h-bar"]').children('a');
    const hDrag = new DragH($('#h-container')[0], {
        min: '50px',
        startSize: '100%',
        sizeChanged: () => {
            // 重新调整编辑器尺寸
            Editor.editorManager.resize();
        },
        onfull: (type) => {
            const { mainStatusBarTab } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
                $hBar.removeClass('icon-hide-bar-s').addClass('icon-show-bar-s');
                mainStatusBarTab.shown = false;
                break;
            case 'NEGATIVE': // 拖拽元素移动方向：下→上
                blockEditor.editor.setVisible(false);
                break;
            }
        },
        exitfull: (type) => {
            const { mainStatusBarTab } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
                blockEditor.editor.setVisible(true);
                break;
            case 'NEGATIVE': // 拖拽元素移动方向：下→上
                $hBar.removeClass('icon-show-bar-s').addClass('icon-hide-bar-s');
                mainStatusBarTab.shown = true;
                break;
            }
            return true;
        }
    });
    return hDrag;
}

Editor.addBtnClickEvent = () => {
    const $button = $('#nav').find('button[m-id="h-bar"]');
    const $a = $button.children('a');
    $button.click(() => {
        if ($a.hasClass('icon-hide-bar-s')) {
            Editor.drag.hide();
        } else {
            Editor.drag.show();
        }
    });
}

Editor.py2BlockEditorChangeStatus = () => {
    const pythonToBlocklyDom = $('#python-to-blockly-btn');
    const status = BOARD.pythonToBlockly ?? false;
    if (status) {
        pythonToBlocklyDom.html(Blockly.Msg.MSG['enablePythonToBlockly'])
                          .attr('class', 'icon-toggle-off-1');
        BOARD.pythonToBlockly = false;
    } else {
        pythonToBlocklyDom.html(Blockly.Msg.MSG['disablePythonToBlockly'])
                          .attr('class', 'icon-toggle-on-1');
        BOARD.pythonToBlockly = true;
    }
}

});