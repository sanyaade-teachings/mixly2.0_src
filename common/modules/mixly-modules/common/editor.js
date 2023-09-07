goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.DragH');
goog.require('Mixly.EditorMixed');
goog.require('Mixly.StatusBarTab');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Nav');
goog.provide('Mixly.Editor');

const {
    DragH,
    EditorMixed,
    StatusBarTab,
    Msg,
    Config,
    Nav,
    Editor
} = Mixly;

const { BOARD } = Config;

Editor.init = () => {
    const mainEditor = new EditorMixed({
        blockEditorConfig: {
            id: 'block-editor',
            toolboxId: 'toolbox'
        },
        codeEditorConfig: {
            id: 'code-editor'
        }
    });
    Editor.mainEditor = mainEditor;
    Editor.blockEditor = mainEditor.blockEditor.editor;
    Editor.codeEditor = mainEditor.codeEditor.editor;
    Editor.drag = Editor.addDrag();
    const mainStatusBarTab = new StatusBarTab('status-bar-ace', Editor.drag);
    mainStatusBarTab.add('terminal', 'output', Msg.Lang['输出']);
    mainStatusBarTab.changeTo('output');
    Mixly.mainStatusBarTab = mainStatusBarTab;
    Editor.addBtnClickEvent();
    Nav.register({
        icon: 'icon-ccw',
        title: 'undo(ctrl+z)',
        id: 'undo-btn',
        displayText: Blockly.Msg.MSG['undo'],
        preconditionFn: () => {
            return true;
        },
        callback: () => mainEditor.undo(),
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
        callback: () => mainEditor.redo(),
        scopeType: Nav.Scope.LEFT,
        weight: 1
    });
}

Editor.addDrag = () => {
    const { blockEditor, codeEditor } = Editor.mainEditor;
    const $hBar = $('#nav').find('button[m-id="h-bar"]').children('a');
    const hDrag = new DragH('h-container', {
        min: '50px',
        sizeChanged: () => {
            // 重新调整编辑器尺寸
            blockEditor.resize();
            codeEditor.resize();
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