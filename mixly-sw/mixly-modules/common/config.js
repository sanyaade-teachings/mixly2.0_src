(() => {

goog.require('Mixly.Url');
goog.provide('Mixly.Config');

const { Url, Config } = Mixly;

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    Config.SOFTWARE = goog.getJSON('./sw-config.json', {});
    console.log('Config.SOFTWARE:', Config.SOFTWARE);
    Config.BOARDS_INFO = goog.getJSON('./boards.json', {});
    console.log('Config.BOARDS_INFO:', Config.BOARDS_INFO);
    const boardPageConfig = Url.getConfig();
    Config.BOARD_PAGE = boardPageConfig ?? {};
    console.log('Config.BOARD_PAGE:', Config.BOARD_PAGE);
    document.title = Config.SOFTWARE.version ?? 'Mixly 2.0';
}

Config.init();

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true',
    boardIgnore: []
};

})();