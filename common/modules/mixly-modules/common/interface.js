goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.App');
goog.require('Mixly.Msg');
goog.require('Mixly.UserEvents');
goog.require('Mixly.Electron.LibManager');
goog.require('Mixly.Electron.WikiManager');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.WebCompiler.Compiler');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.WebSocket.BU');
goog.require('Mixly.WebSocket.ArduShell');
goog.require('Mixly.WebSocket.File');
goog.require('Mixly.Web.BU');
goog.require('Mixly.Web.File');
goog.require('Mixly.Web.Lms');
goog.provide('Mixly.Interface');

const {
    Config,
    Boards,
    Interface,
    Env,
    App,
    Msg,
    UserEvents,
    Electron = {},
    Web = {},
    WebSocket = {}
} = Mixly;

const electron = Mixly.require('electron');

const {
    LibManager,
    WikiManager,
    Lms
} = goog.isElectron? Electron : Web;
const { Socket } = WebSocket;


window.addEventListener('load', () => {
    const $xml = $(goog.get(Env.boardIndexPath));
    let scrpitPathList = [];
    let cssPathList = [];
    let $categories = null;
    for (let i = 0; i < $xml.length; i++) {
        const $xmli = $($xml[i]);
        switch ($xml[i].nodeName) {
        case 'SCRIPT':
            $xmli.attr('src') && scrpitPathList.push(path.join(Env.boardDirPath, $xmli.attr('src')));
            break;
        case 'LINK':
            $xmli.attr('href') && cssPathList.push(path.join(Env.boardDirPath, $xmli.attr('href')));
            break;
        case 'XML':
            $categories = $xmli;
            break;
        }
    }
    if (!$categories.children('category').length) {
        $categories.html('<category></category>');
    }
    if (!goog.isElectron) {
        Lms.changeState();
    }
    $('#toolbox').html($categories.html());
    LazyLoad.css(cssPathList);
    LazyLoad.js(scrpitPathList, () => {
        Interface.app = new App($('body')[0]);
        Boards.init();
        if (window.frames.length != parent.frames.length) {
            window.userEvents = new UserEvents(Editor.blockEditor);
        }
        if (Env.hasSocketServer) {
            Socket.init();
        }
        if (goog.isElectron) {
            if (typeof LibManager === 'object') {
                LibManager.init();
            }
        } else {
            Env.defaultXML = $('#toolbox').html();
        }
        const selectedBoardName = Boards.getSelectedBoardName();
        Boards.changeTo(selectedBoardName);
        Boards.updateCategories(selectedBoardName);
        Msg.renderToolbox(true);
        if (goog.isElectron) {
            const { Serial = undefined } = Electron;
            if (typeof Serial === 'object') {
                Serial.addStatusbarTabExtFunc();
                Serial.refreshPorts();
            }
        }
    });
});

Interface.feedback = () => {
    const href = 'https://gitee.com/mixly2/mixly2.0_src/issues';
    Interface.open(href);
}

Interface.open = (href) => {
    if (goog.isElectron) {
        const { shell } = electron;
        shell.openExternal(href);
    } else {
        window.open(href, '_blank');
    }
}

});