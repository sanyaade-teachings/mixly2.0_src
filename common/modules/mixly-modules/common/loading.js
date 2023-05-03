(() => {

goog.require('layui');
goog.require('store');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');
goog.require('Mixly.LocalStorage');
goog.require('Mixly.CssLoader');
goog.provide('Mixly.Loading');

const {
    Env,
    Config,
    Modules,
    LocalStorage,
    CssLoader,
    Loading
} = Mixly;

const { laytpl } =layui;

// 如果当前在electron环境下，则从本地setting文件夹下读取用户配置，
// 如果在Web下，则从window.localStorage.setting中读取用户配置
let userConfig = null;
if (Env.isElectron) {
    const { fs_extra, path } = Modules;
    const SETTING_FILE = path.resolve(Env.clientPath, './setting/config.json');
    userConfig = fs_extra.readJsonSync(SETTING_FILE, { throws: false });
} else {
    userConfig = store.get('mixly2.0-config');
}

if (userConfig)
    Config.USER = {
        ...Config.USER,
        ...userConfig
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

let windowBackgroundColor;
if (Config.USER.theme === 'dark') {
    windowBackgroundColor = '#181818';
} else {
    windowBackgroundColor = '#fff';
}

Loading.CSS_CONFIG = {
    dark: {
        loading: '#181818',
        loadingLeftDiv: '#333333',
        loadingTopDiv: '#2F4056',
        loadingBottomDiv: '#007acc',
        body: '#181818'
    },
    light: {
        loading: '#fff',
        loadingLeftDiv: '#ddd',
        loadingTopDiv: '#009688',
        loadingBottomDiv: '#05bbaa',
        body: '#fff'
    }
};

Loading.TEMPLATE_RAW = goog.get(Env.templatePath + '/skeleton.html');
Loading.TEMPLATE_RENDER = laytpl(Loading.TEMPLATE_RAW).render(Loading.CSS_CONFIG[Config.USER.theme]);

const nowWindow = Modules.currentWindow;
const winTheme = Config.USER.theme;
nowWindow && nowWindow.setBackgroundColor(windowBackgroundColor);

$('html').append(Loading.TEMPLATE_RENDER);

if (Config.USER.theme === 'dark') {
    $('html').attr('data-bs-theme', 'dark');
} else {
    $('html').attr('data-bs-theme', 'light');
}

window.addEventListener('DOMContentLoaded', () => {
    if (winTheme === "dark") {
        $("body").addClass('dark');
    } else {
        $("body").addClass('light');
    }
});

})();