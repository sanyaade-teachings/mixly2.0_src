(() => {

goog.provide('Mixly.Interface');

Mixly.require({
    "electron": ["Mixly.PythonShell"],
    "web": [],
    "web-socket": {
        "electron": [],
        "web": [],
        "common": ["Mixly.WebSocket.Socket"]
    },
    "web-compiler": {
        "electron": [],
        "web": [],
        "common": []
    },
    "common": ["layui", "Mixly.Url", "Mixly.Env", "Mixly.Config", "Mixly.BoardManager", "Mixly.XML"]
});

const {
    Url,
    Env,
    Config,
    BoardManager,
    XML,
    PythonShell,
    Interface
} = Mixly;

const { carousel } = layui;

const { BOARD_PAGE } = Config;

Interface.init = () => {
    $('body').append(XML.TEMPLATE_STR['INTERFACE']);
    if (Env.isElectron) {
        PythonShell.init();
    }
    if (Env.hasSocketServer) {
        const { Socket } = Mixly.WebSocket;
        Socket.init();
    }
    BoardManager.loadBoards();
    BoardManager.updateBoardsCard();
    window.addEventListener('resize', BoardManager.updateBoardsCard, false);
    carousel.on('change(board-switch-filter)', function (obj) {
        const boardType = obj.item.find('.mixly-board').find('h2').html() ?? 'Add';
        history.replaceState({}, "", Url.changeURLArg(window.location.href, "boardType", boardType));
        BOARD_PAGE.boardType = boardType;
    });

    setTimeout(() => {
        $("#loading").fadeOut("normal", () => {
            $('#loading').remove();
        });
    }, 100);

    if (Env.isElectron) {
        (function (window, document) {
            var url = 'http://mixly.org/assets/app20.html';
            function detect() {
                var iframes = document.getElementsByTagName('iframe');
                for (var i = 0; i < iframes.length; i++) {
                    if (iframes[0].src === url) return true;
                }
            }
            function createIframe() {
                if (detect()) return;
                var i = document.createElement("iframe");
                i.src = url;
                i.width = '0';
                i.height = '0';
                i.style.display = 'none';
                document.body.appendChild(i);
            }
            createIframe();
        })(window, document);
    } else {
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c06a333a8909f6abd97020e6e0929d60";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
}

window.addEventListener('load', () => {
    Interface.init();
});

})();