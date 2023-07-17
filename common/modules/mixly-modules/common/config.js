goog.loadJs('common', () => {

goog.require('FingerprintJS');
goog.require('Mixly.Url');
goog.provide('Mixly.Config');

const { Config, Url } = Mixly;

// 被选中板卡的配置信息
Config.SELECTED_BOARD = {};
// 板卡页面的配置信息
Config.BOARD = {};
// 软件的配置信息
Config.SOFTWARE = {};

const URL_DEFAULT_CONFIG = {
    "thirdPartyBoard": false
};
const BOARD_DEFAULT_CONFIG = {
    "burn": "None",
    "upload": "None",
    "nav": "None",
    "serial": "None",
    "saveMixWithCode": true
};
const SOFTWARE_DEFAULT_CONFIG = {
    "version": "Mixly2.0"
};

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    const urlConfig = {
        ...URL_DEFAULT_CONFIG,
        ...Url.getConfig()
    };
    Config.BOARD = goog.getJSON('./config.json', BOARD_DEFAULT_CONFIG);
    if (typeof urlConfig === 'object') {
        let {
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardType,
            boardName,
            filePath
        } = urlConfig;
        thirdPartyBoard = thirdPartyBoard ?? false;
        Config.BOARD = {
            ...Config.BOARD,
            thirdPartyBoard,
            boardImg,
            boardIndex,
            boardType,
            boardName,
            filePath
        };
        delete urlConfig.thirdPartyBoard;
        delete urlConfig.boardImg;
        delete urlConfig.boardIndex;
        delete urlConfig.boardType;
        delete urlConfig.boardName;
        delete urlConfig.filePath;
    }

    console.log('Config.BOARD:', Config.BOARD);

    let pathPrefix = '../../../';

    Config.SOFTWARE = goog.getJSON(pathPrefix + 'sw-config.json', SOFTWARE_DEFAULT_CONFIG);
    if (typeof urlConfig === 'object')
        Config.SOFTWARE = { ...Config.SOFTWARE, ...urlConfig };
    Config.pathPrefix = pathPrefix;
    console.log('Config.SOFTWARE:', Config.SOFTWARE);

    FingerprintJS.load()
    .then(fp => fp.get())
    .then(result => {
        let visitorId16 = result.visitorId;
        let VisitorIdNum = parseInt(visitorId16, 16);
        let visitorId32 = VisitorIdNum.toString(32);
        Config.BOARD.visitorId = {
            str16: visitorId16,
            str32: visitorId32,
            str16CRC32b: Url.CRC32(visitorId16, 16),
            str32CRC32b: Url.CRC32(visitorId32, 16)
        };
        console.log(Config.BOARD);
    })
    .catch(error => {
        console.error(error);
        console.log(Config.BOARD);
    });
}

Config.init();

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true'
};

});