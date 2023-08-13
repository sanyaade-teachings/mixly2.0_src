goog.loadJs('common', () => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.NavEvents');
goog.require('Mixly.XML');
goog.require('Mixly.Nav');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.Modules');
goog.require('Mixly.Editor');
goog.require('Mixly.Msg');
goog.require('Mixly.LevelSelector');
goog.require('Mixly.FooterBar');
goog.require('Mixly.Electron.LibManager');
goog.require('Mixly.Electron.WikiManager');
goog.require('Mixly.Electron.FooterLayerExample');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Electron.Loader');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.WebCompiler.Compiler');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.WebSocket.BU');
goog.require('Mixly.WebSocket.ArduShell');
goog.require('Mixly.WebSocket.File');
goog.require('Mixly.Web.FooterLayerExample');
goog.require('Mixly.Web.BU');
goog.provide('Mixly.Interface');

const {
    Url,
    Config,
    NavEvents,
    XML,
    Nav,
    Boards,
    Modules,
    Interface,
    Env,
    ToolboxSearcher,
    Editor,
    Msg,
    LevelSelector,
    FooterBar
} = Mixly;

const { BOARD, USER } = Config;

Interface.init = () => {
    $('body').append(XML.TEMPLATE_DOM['APP_DIV']);
    const { FooterLayerExample } = Env.isElectron? Mixly.Electron : Mixly.Web;
    if (FooterLayerExample instanceof Object) {
        FooterLayerExample.obj = new FooterLayerExample('mixly-example-menu');
    }
    Nav.init();
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
    } else {
        Env.defaultXML = $('#toolbox').html();
    }
    FooterBar.init();
    const selectedBoardName = Boards.getSelectedBoardName();
    Boards.changeTo(selectedBoardName);
    Boards.updateCategories(selectedBoardName);
    Msg.renderToolbox(true);
    Editor.init();
    if (Env.isElectron) {
        const { Electron } = Mixly;
        const { Serial = undefined } = Electron;
        if (typeof Serial === 'object' && !Nav.CONFIG.run && !Nav.CONFIG.webrun) {
            Serial.addStatusbarTabExtFunc();
        }
    }
    window.addEventListener('resize', Interface.onresize, false);
    Interface.onresize();
    // Drag.init();
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
    const { codeEditor, blockEditor } = Editor;
    codeEditor.resize();
    blockEditor.resize();
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
    let href = Config.pathPrefix + '/index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType });
    pageReload(href);
}

Interface.feedback = () => {
    const href = 'https://gitee.com/mixly2/mixly2.0_src/issues';
    Interface.open(href);
}

Interface.open = (href) => {
    if (Env.isElectron) {
        const { electron } = Modules;
        const { shell } = electron;
        shell.openExternal(href);
    } else {
        window.open(href, '_blank');
    }
}

});