(() => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.NavEvents');
goog.require('Mixly.StatusBar');
goog.require('Mixly.XML');
goog.require('Mixly.Nav');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.Modules');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.Drag');
goog.require('Mixly.Editor');
goog.require('Mixly.LevelSelector');
goog.require('WorkspaceSearch');
goog.require('Backpack');
goog.require('ContentHighlight');
goog.require('ZoomToFitControl');
goog.provide('Mixly.Interface');

Mixly.require({
    "electron": [
        "Mixly.Electron",
        "Mixly.Electron.LibManager",
        "Mixly.Electron.WikiManager",
        "Mixly.Electron.ExampleExt",
        "Mixly.Electron.Serial"
    ],
    "web": [
        "Mixly.Web.ExampleExt"
    ],
    "web-socket": {
        "electron": [],
        "web": [],
        "common": [
            "Mixly.WebSocket.Socket",
            "Mixly.Web.ExampleExt"
        ]
    },
    "web-compiler": {
        "electron": [],
        "web": [],
        "common": [
            "Mixly.Web.ExampleExt"
        ]
    },
    "common": []
});

const {
    Url,
    Config,
    NavEvents,
    StatusBar,
    XML,
    Nav,
    Boards,
    Modules,
    Interface,
    Env,
    ToolboxSearcher,
    Drag,
    Editor,
    LevelSelector
} = Mixly;

const { BOARD, USER } = Config;

Interface.init = () => {
    $('body').append(XML.TEMPLATE_DOM['APP_DIV']);
    const { ExampleExt } = Env.isElectron? Mixly.Electron : Mixly.Web;
    if (ExampleExt instanceof Object) {
        ExampleExt.obj = new ExampleExt('mixly-footer', 'mixly-examples');
    }
    Nav.init();
    Code.init();
    Boards.init();
    if (Env.isElectron) {
        const { Electron } = Mixly;
        const {
            LibManager = undefined,
            WikiManager = undefined,
            Serial = undefined
        } = Electron;
        if (typeof LibManager === 'object') {
            LibManager.init();
        }
        if (typeof WikiManager === 'object' && Nav.CONFIG.setting.wiki) {
            WikiManager.registerContextMenu();
        }
        if (typeof Serial === 'object' && !Nav.CONFIG.run && !Nav.CONFIG.webrun) {
            Serial.addBtnToStatusBar();
        }
    } else {
        Env.defaultXML = $('#toolbox').html();
    }
    const selectedBoardName = Boards.getSelectedBoardName();
    Boards.changeTo(selectedBoardName);
    Boards.updateCategories(selectedBoardName);
    Editor.init();
    window.addEventListener('resize', Interface.onresize, false);
    Interface.onresize();
    Drag.init();
    if (BOARD.nav.levelSelector) {
        LevelSelector.init();
        const $loading = $('.loading');
        const toolboxWidth = $('.blocklyToolboxDiv').width();
        $loading.children('.left-div').animate({
          width: toolboxWidth + 'px'
        }, () => {
            $loading.fadeOut("fast", () => {
                $loading.remove();
            });
        });
        LevelSelector.xmlToWorkspace(1);
    } else {
        auto_save_and_restore_blocks();
    }
    NavEvents.init();
    StatusBar.init();
    const zoomToFit = new ZoomToFitControl(Blockly.mainWorkspace);
    zoomToFit.init();
    ToolboxSearcher.init();
    const workspaceSearch = new WorkspaceSearch(Blockly.mainWorkspace);
    workspaceSearch.init();
    const backpack = new Backpack(Blockly.mainWorkspace);
    backpack.init();
    if (USER.blocklyContentHighlight === 'yes') {
        const contentHighlight = new ContentHighlight(Blockly.mainWorkspace);
        contentHighlight.init();
    }
    const workspaceSearchOpen = {
        displayText: Blockly.Msg['WORKSPACE_SEARCH_OPEN'],
        preconditionFn: function(scope) {
            const blocks = Blockly.mainWorkspace.getAllBlocks();
            if (blocks.length)
                return 'enabled';
            else
                return 'hidden';
        },
        callback: function() {
            workspaceSearch.open();
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        id: 'workspaceSearch_open',
        weight: 200
    };
    Blockly.ContextMenuRegistry.registry.register(workspaceSearchOpen);
    if (Env.hasSocketServer) {
        const { Socket } = Mixly.WebSocket;
        Socket.init();
    }
}

Interface.onresize = (event) => {
    const $nav = $('#nav');
    const $navLeftBtnList = $('#nav-left-btn-list');
    const $navRightBtnList = $('#nav-right-btn-list');
    const $liOperate = $('#li_operate');
    if ($navRightBtnList.offset().left < Nav.leftWidth + 70 || $nav[0].scrollWidth > $nav[0].offsetWidth) {
        for (let i = 0; i < Nav.navItemId.length; i++) {
            const $navItem = $('#' + Nav.navItemId[i]);
            $navItem.css('display', 'none');
        }
        $liOperate.css('display', 'inline-block');
        const nowLeftWidth = $navLeftBtnList.offset().left + $navLeftBtnList.width();
        const gap = $navRightBtnList.offset().left - nowLeftWidth;
        if (gap < 70) {
            $('#copyright').css('display', 'none');
        } else {
            $('#copyright').css('display', '-webkit-box');
        }
    } else {
        $('#copyright').css('display', '-webkit-box');
        $liOperate.css('display', 'none');
        for (let i = 0; i < Nav.navItemId.length; i++) {
            const $navItem = $('#' + Nav.navItemId[i]);
            $navItem.css('display', 'inline-block');
        }
        Nav.leftWidth = $navLeftBtnList.offset().left + $navLeftBtnList.width();
    }
    Editor.codeEditor.resize();
    Editor.blockEditor.resize();
}

window.addEventListener('load', () => {
    
});

window.addEventListener('DOMContentLoaded', () => {
    Interface.init();
});

Interface.onbeforeunload = (reload = false) => {
    const pageReload = (href) => {
        if (!reload) {
            window.location.replace(href);
        } else {
            window.location.reload(true);
        }
    }
    let href = Config.pathPrefix + '../index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType });
    pageReload(href);
}

Interface.feedback = () => {
    const href = 'https://gitee.com/mixly2/mixly2.0_src/issues';
    if (Env.isElectron) {
        const { electron } = Modules;
        const { shell } = electron;
        shell.openExternal(href);
    } else {
        window.open(href, '_blank');
    }
}

})();