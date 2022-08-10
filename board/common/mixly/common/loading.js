(() => {
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

// 如果当前在electron环境下，则从本地setting文件夹下读取用户配置，
// 如果在Web下，则从window.localStorage.setting中读取用户配置
let userConfig = null;
if (Env.isElectron) {
    const { fs_extra, path } = Modules;
    const SETTING_FILE = path.resolve(Env.clientPath, './setting/config.json');
    userConfig = fs_extra.readJsonSync(SETTING_FILE, { throws: false });
} else {
    userConfig = LocalStorage.readJson('setting');
}

if (userConfig)
    Config.USER = {
        ...Config.USER,
        ...userConfig
    };

if (!Env.isElectron) {
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    Config.USER.theme = themeMedia.matches ? 'light' : 'dark';
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

Loading.LIGHT_CSS = `
.loading {
    position: absolute;
    z-index: 100000;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.loading .left-div {
    position: absolute;
    left: 0px;
    top: var(--nav-height);
    bottom: var(--footer-height);
    width: 160px;
    background-color: #ddd;
    border-radius: 2px;
    opacity: 0.9;
}

.loading .top-div {
    position: absolute;
    left: 0px;
    top: 0px;
    height: var(--nav-height);
    width: 100%;
    background-color: #009688;
    border-radius: 2px;
    opacity: 0.9;
}

.loading .bottom-div {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: var(--footer-height);
    width: 100%;
    background-color: #05bbaa;
    border-radius: 2px;
    opacity: 0.9;
}

body {
    background-color: #fff !important;
}
`;

Loading.DARK_CSS = `
.loading {
    position: absolute;
    z-index: 100000;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #181818;
}

.loading .left-div {
    position: absolute;
    left: 0px;
    top: var(--nav-height);
    bottom: var(--footer-height);
    width: 160px;
    background-color: #333333;
    border-radius: 2px;
    opacity: 0.9;
}

.loading .top-div {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: var(--nav-height);
    background-color: #2F4056;
    border-radius: 2px;
    opacity: 0.9;
}

.loading .bottom-div {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: var(--footer-height);
    width: 100%;
    background-color: #007acc;
    border-radius: 2px;
    opacity: 0.9;
}

body {
    background-color: #181818 !important;
}`;

const nowWindow = Modules.currentWindow;
const winTheme = Config.USER.theme;
if (winTheme === "dark")
    nowWindow && nowWindow.setBackgroundColor("#181818");
else
    nowWindow && nowWindow.setBackgroundColor("#fff");


const loadingStyle = $('<style type="text/css"></style>').text(
    winTheme === "dark" ? Loading.DARK_CSS : Loading.LIGHT_CSS
);
$('head').append(loadingStyle);
$('html').append(
    `<div class="loading" id="loading">
        <div class="left-div">
        </div>
        <div class="top-div">
        </div>
        <div class="bottom-div">
        </div>
    </div>`
);

window.addEventListener('DOMContentLoaded', () => {
    if (winTheme === "dark") {
        $("body").addClass('dark');
    } else {
        $("body").addClass('light');
    }
});

})();