goog.loadJs('common', () => {

goog.require('FingerprintJS');
goog.require('Mixly.Url');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.require('Mixly.LocalStorage');
goog.provide('Mixly.Config');

const {
    Config,
    Url,
    Env,
    Modules,
    LocalStorage
} = Mixly;

// 被选中板卡的配置信息
Config.SELECTED_BOARD = {};

// 板卡页面的配置信息
Config.BOARD = {};

// 软件的配置信息
Config.SOFTWARE = {};

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true'
};

const BOARD_DEFAULT_CONFIG = {
    "burn": "None",
    "upload": "None",
    "nav": "None",
    "serial": "None",
    "saveMixWithCode": true,
    "thirdPartyBoard": false
};

const SOFTWARE_DEFAULT_CONFIG = {
    "version": "Mixly2.0"
};

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    Config.BOARD = {
        ...goog.getJSON('./config.json', BOARD_DEFAULT_CONFIG),
        ...Url.getConfig()
    };

    console.log('Config.BOARD:', Config.BOARD);

    let pathPrefix = '../../../';

    Config.SOFTWARE = goog.getJSON(pathPrefix + 'sw-config.json', SOFTWARE_DEFAULT_CONFIG);
    Config.pathPrefix = pathPrefix;
    console.log('Config.SOFTWARE:', Config.SOFTWARE);

    Env.hasSocketServer = Config.SOFTWARE?.webSocket?.enabled ? true : false;
    Env.hasCompiler = Config.SOFTWARE?.webCompiler?.enabled ? true : false;

    // 如果当前在electron环境下，则从本地setting文件夹下读取用户配置，
    // 如果在Web下，则从window.localStorage.setting中读取用户配置
    /*let userConfig = null;
    if (Env.isElectron) {
        const { fs_extra, path } = Modules;
        const SETTING_FILE = path.resolve(Env.clientPath, './setting/config.json');
        userConfig = fs_extra.readJsonSync(SETTING_FILE, { throws: false });
    } else {
        userConfig = store.get('mixly2.0-config');
    }*/

    Config.USER = {
        ...Config.USER,
        ...LocalStorage.get(LocalStorage.PATH['USER']) ?? {}
    };

    if (Config.USER.themeAuto) {
        const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
        Config.USER.theme = themeMedia.matches ? 'light' : 'dark';
    }

    if (Config.USER.languageAuto) {
        switch (navigator.language) {
        case 'zh-CN':
            Config.USER.language = 'zh-hans';
            break;
        case 'zh-HK':
        case 'zh-SG':
        case 'zh-TW':
            Config.USER.language = 'zh-hant';
            break;
        default:
            Config.USER.language = 'en';
        }
    }

    console.log('Config.USER', Config.USER);
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

});