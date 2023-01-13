(() => {

goog.require('Mixly');
goog.require('Mixly.Env');
goog.require('Mixly.LocalStorage');
goog.require('Mixly.Modules');
goog.require('Mixly.Config');
goog.provide('Mixly.Loading');

const {
    Loading,
    Env,
    LocalStorage,
    Modules,
    Config
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

if (!Env.isElectron || Config.USER.themeAuto) {
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    themeMedia.addListener(e => {
        if (Env.isElectron && !Config.USER.themeAuto) {
            return;
        }
        if (e.matches) {
            $('body').removeClass('dark').addClass('light');
        } else {
            $('body').removeClass('light').addClass('dark');
        }
    });
}

if (!Env.isElectron || Config.USER.languageAuto) {
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

Loading.COMMON_CSS = `
.loader{
    --size: 32px;
    --duration: 800ms;
    width: 96px;
    height: 64px;
    margin: 50px auto;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    position: absolute;
    top: 40%;
    left: 45%;
}
.loader .box{
    width:  32px;
    height: 32px;
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
}
.loader .box:nth-child(1){
    transform: translate(100%, 0);
    animation: box1 800ms linear infinite;
}
.loader .box:nth-child(2){
    transform: translate(0, 100%);
    animation: box2 800ms linear infinite;
}
.loader .box:nth-child(3){
    transform: translate(100%, 100%);
    animation: box3 800ms linear infinite;
}
.loader .box:nth-child(4){
    transform: translate(200%, 0);
    animation: box4 800ms linear infinite;
}
.loader .box > div{
    --translateZ: calc(var(--size) / 2);
    --rotateY: 0deg;
    --rotateX: 0deg;
    background: #5c8df6;
    width: 100%;
    height: 100%;
    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
}
.loader .box > div:nth-child(1){
    top: 0;
    left: 0;
}
.loader .box > div:nth-child(2){
    background: #145af2;
    right: 0;
    --rotateY: 90deg;
}
.loader .box > div:nth-child(3){
    background: #447cf5;
    --rotateX: -90deg;
}
.loader .box > div:nth-child(4){
    background: #dbe3f4;
    top: 0;
    left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
}
@keyframes box1{
    0%, 50%{ transform: translate(100%, 0); }
    100%{ transform: translate(200%, 0); }
}
@keyframes box2{
    0%{ transform: translate(0, 100%); }
    50%{ transform: translate(0, 0); }
    100%{ transform: translate(100%, 0); }
}
@keyframes box3{
    0%, 50%{ transform: translate(100%, 100%); }
    100%{ transform: translate(0, 100%); }
}
@keyframes box4{
    0%{ transform: translate(200%, 0); }
    50%{ transform: translate(200%, 100%); }
    100%{ transform: translate(100%, 100%); }
}`;

Loading.LIGHT_CSS = `
.loading {
    position: absolute;
    z-index: 100000;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #f9f2f2;
}

body {
    background-color: #fff !important;
}

#footer > div > p {
    color: #888;
}

.layui-carousel-arrow {
    background-color: rgba(0,0,0,.2);
}

.layui-carousel-arrow:hover, .layui-carousel-ind ul:hover {
    background-color: rgba(0,0,0,.35);
}

.service-single {
    background: #fff;
}

.service-single h2 {
    color: #232323;
}`;

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

body {
    background-color: #181818 !important;
}

#footer > div > p {
    color: #fff;
}

.layui-carousel-arrow {
    background-color: #555;
}

.layui-carousel-arrow:hover, .dark .layui-carousel-ind ul:hover {
    background-color: rgba(119,119,119,.35);
}

.service-single {
    background: #3F3E40;
}

.service-single h2 {
    color: #fff;
}`;

const nowWindow = Env.currentWindow;
const winTheme = Config.USER.theme;
if (winTheme === "dark")
    nowWindow && nowWindow.setBackgroundColor("#181818");
else
    nowWindow && nowWindow.setBackgroundColor("#fff");

const loadingStyle = $('<style type="text/css"></style>').text(
    Loading.COMMON_CSS + (winTheme === "dark" ? Loading.DARK_CSS : Loading.LIGHT_CSS)
);
$('head').append(loadingStyle);
$('html').append(
    `<div class="loading" id="loading"></div>`
);

window.addEventListener('DOMContentLoaded', () => {
    if (winTheme === "dark") {
        $("body").addClass('dark');
    } else {
        $("body").addClass('light');
    }
});


})();