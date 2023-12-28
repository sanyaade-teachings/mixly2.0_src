(() => {

goog.require('layui');
goog.require('Mixly.Url');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.BoardManager');
goog.require('Mixly.XML');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.Msg');
goog.require('Mixly.XML');
goog.require('Mixly.Setting');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.Interface');

const {
    Url,
    Env,
    Config,
    BoardManager,
    XML,
    Setting,
    Electron,
    Interface
} = Mixly;

const { carousel } = layui;

const { BOARD_PAGE } = Config;

const { PythonShell } = Electron;

Interface.init = () => {
    $('body').append(XML.TEMPLATE_STR['INTERFACE']);
    if (goog.isElectron) {
        PythonShell.init();
    }
    if (Env.hasSocketServer) {
        const { Socket } = Mixly.WebSocket;
        Socket.init();
    }
    BoardManager.loadBoards();
    BoardManager.updateBoardsCard();
    Setting.init();
    window.addEventListener('resize', BoardManager.updateBoardsCard, false);
    carousel.on('change(board-switch-filter)', function (obj) {
        const boardType = obj.item.find('.mixly-board').find('h2').html() ?? 'Add';
        history.replaceState({}, "", Url.changeURLArg(window.location.href, "boardType", boardType));
        BOARD_PAGE.boardType = boardType;
    });

    $("#loading").fadeOut("normal", () => {
        $('#loading').remove();
    });

    if (goog.isElectron) {
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?abaf69d60c36ba7411ea3e02f5f76c39";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
    } else {
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?3914f31c236391e8ad9780ff27a6ab23";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
    }
}

window.addEventListener('load', () => {
    Interface.init();
});

})();