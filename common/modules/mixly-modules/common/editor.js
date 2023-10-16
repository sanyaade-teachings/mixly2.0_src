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