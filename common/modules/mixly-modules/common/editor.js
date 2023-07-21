goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.DragH');
goog.require('Mixly.EditorMixed');
goog.require('Mixly.StatusBarTab');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.provide('Mixly.Editor');

const {
    DragH,
    EditorMixed,
    StatusBarTab,
    Msg,
    Config,
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
}

Editor.addDrag = () => {
    const { blockEditor, codeEditor } = Editor.mainEditor;
    const $hBar = $('#nav').find('button[m-id="h-bar"]').children('a');
    const hDrag = new DragH('h-container', {
        min: '50px',
        sizeChanged: () => {
            // 重新调整编辑器尺寸
            codeEditor.resize();
            blockEditor.resize();
        },
        onfull: (type) => {
            const { mainStatusBarTab } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
                $hBar.removeClass('icon-hide-bar-s').addClass('icon-show-bar-s');
                mainStatusBarTab.shown = false;
                break;
            case 'NEGATIVE': // 拖拽元素移动方向：下→上
                break;
            }
        },
        exitfull: (type) => {
            const { mainStatusBarTab } = Mixly;
            switch(type) {
            case 'POSITIVE': // 拖拽元素移动方向：上→下
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