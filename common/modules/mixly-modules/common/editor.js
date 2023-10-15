goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.DragH');
goog.require('Mixly.EditorMix');
goog.require('Mixly.StatusBarTabs');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Nav');
goog.require('ChromeTabs');
goog.require('$.jstree');
goog.require('Mixly.EditorsManager');
goog.require('Mixly.Workspace');
goog.provide('Mixly.Editor');

const {
    DragH,
    DragV,
    EditorMix,
    StatusBarTabs,
    Msg,
    Config,
    Nav,
    EditorsManager,
    Workspace,
    Editor
} = Mixly;

const { USER, BOARD } = Config;

Editor.init = () => {
    Editor.mainEditor = new EditorMix($('<div></div>')[0]);
    Editor.mainEditor.init();
    Editor.blockEditor = Editor.mainEditor.blockEditor.editor;
    Editor.codeEditor = Editor.mainEditor.codeEditor.editor;
    Editor.workspace = new Workspace($('#mixly-body')[0]);
    // Editor.addBtnClickEvent();
    Mixly.mainStatusBarTabs = Editor.workspace.statusBarTabs;
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
            const { mainStatusBarTabs } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
                $hBar.removeClass('icon-hide-bar-s').addClass('icon-show-bar-s');
                mainStatusBarTabs.shown = false;
                break;
            case 'NEGATIVE': // 拖拽元素移动方向：下→上
                blockEditor.editor.setVisible(false);
                break;
            }
        },
        exitfull: (type) => {
            const { mainStatusBarTabs } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
                blockEditor.editor.setVisible(true);
                break;
            case 'NEGATIVE': // 拖拽元素移动方向：下→上
                $hBar.removeClass('icon-show-bar-s').addClass('icon-hide-bar-s');
                mainStatusBarTabs.shown = true;
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