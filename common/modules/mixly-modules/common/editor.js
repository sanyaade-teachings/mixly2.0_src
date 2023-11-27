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
goog.require('Mixly.Drag');
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
    Drag,
    Editor
} = Mixly;

const { USER, BOARD } = Config;

Editor.init = () => {
    Editor.mainEditor = new EditorMix($('<div></div>')[0]);
    Editor.mainEditor.init();
    Editor.blockEditor = Editor.mainEditor.blockEditor.editor;
    Editor.codeEditor = Editor.mainEditor.codeEditor.editor;
    Editor.workspace = new Workspace($('#mixly-body')[0]);
    Mixly.mainStatusBarTabs = Editor.workspace.statusBarTabs;
    const { editorManager } = Editor.workspace;
    const { events } = editorManager.editorTabs;
    events.bind('activeTabChange', (event) => {
        Nav.resize();
    });
    events.bind('tabRemove', (event) => {
        !editorManager.getActiveEditor() && Nav.resize();
    });
    Nav.register({
        icon: 'icon-ccw',
        title: 'undo(ctrl+z)',
        id: 'undo-btn',
        displayText: Blockly.Msg.MSG['undo'],
        preconditionFn: () => {
            return !!editorManager.getActiveEditor();
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
            return !!editorManager.getActiveEditor();
        },
        callback: () => Editor.mainEditor.redo(),
        scopeType: Nav.Scope.LEFT,
        weight: 1
    });

    editorManager.editorTabs.addTab({
        name: 'Untitled-1.mix',
        title: 'Untitled-1.mix'
    });

    const leftSideBarOption = Nav.register({
        icon: 'codicon-layout-sidebar-left-off',
        title: '操作左侧边栏',
        id: 'left-sidebar-btn',
        preconditionFn: () => {
            return true;
        },
        callback: (dom) => {
            const $a = $(dom).children('a');
            const drag = Editor.workspace.dragVLeft;
            if (drag.shown === Drag.Extend.NEGATIVE) {
                drag.exitfull(Drag.Extend.NEGATIVE);
            } else {
                drag.full(Drag.Extend.NEGATIVE);
            }
        },
        scopeType: Nav.Scope.CENTER,
        weight: 1
    });

    const leftSideBarEvents = Editor.workspace.dragVLeft.events;
    leftSideBarEvents.bind('onfull', (type) => {
        const { $btn } = leftSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.NEGATIVE) {
            return;
        }
        $a.removeClass('codicon-layout-sidebar-left');
        $a.addClass('codicon-layout-sidebar-left-off');
    });

    leftSideBarEvents.bind('exitfull', (type) => {
        const { $btn } = leftSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.NEGATIVE) {
            return;
        }
        $a.removeClass('codicon-layout-sidebar-left-off');
        $a.addClass('codicon-layout-sidebar-left');
    });

    const rightSideBarOption = Nav.register({
        icon: 'codicon-layout-sidebar-right-off',
        title: '操作右侧边栏',
        id: 'right-sidebar-btn',
        preconditionFn: () => {
            return true;
        },
        callback: (dom) => {
            const $a = $(dom).children('a');
            const drag = Editor.workspace.dragVRight;
            if (drag.shown === Drag.Extend.POSITIVE) {
                drag.exitfull(Drag.Extend.POSITIVE);
            } else {
                drag.full(Drag.Extend.POSITIVE);
            }
        },
        scopeType: Nav.Scope.CENTER,
        weight: 3
    });

    const rightSideBarEvents = Editor.workspace.dragVRight.events;
    rightSideBarEvents.bind('onfull', (type) => {
        const { $btn } = rightSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.POSITIVE) {
            return;
        }
        $a.removeClass('codicon-layout-sidebar-right');
        $a.addClass('codicon-layout-sidebar-right-off');
    });

    rightSideBarEvents.bind('exitfull', (type) => {
        const { $btn } = rightSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.POSITIVE) {
            return;
        }
        $a.removeClass('codicon-layout-sidebar-right-off');
        $a.addClass('codicon-layout-sidebar-right');
    });

    const bottomSideBarOption = Nav.register({
        icon: 'codicon-layout-panel-off',
        title: '操作状态栏',
        id: 'bottom-sidebar-btn',
        preconditionFn: () => {
            return true;
        },
        callback: (dom) => {
            const $a = $(dom).children('a');
            const drag = Editor.workspace.dragH;
            if (drag.shown === Drag.Extend.POSITIVE) {
                drag.exitfull(Drag.Extend.POSITIVE);
            } else {
                drag.full(Drag.Extend.POSITIVE);
            }
        },
        scopeType: Nav.Scope.CENTER,
        weight: 2
    });

    const bottomSideBarEvents = Editor.workspace.dragH.events;
    bottomSideBarEvents.bind('onfull', (type) => {
        const { $btn } = bottomSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.POSITIVE) {
            return;
        }
        $a.removeClass('codicon-layout-panel');
        $a.addClass('codicon-layout-panel-off');
    });

    bottomSideBarEvents.bind('exitfull', (type) => {
        const { $btn } = bottomSideBarOption;
        const $a = $btn.children('a');
        if (type !== Drag.Extend.POSITIVE) {
            return;
        }
        $a.removeClass('codicon-layout-panel-off');
        $a.addClass('codicon-layout-panel');
    });
}

});