goog.loadJs('common', () => {

goog.require('layui');
goog.require('store');
goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.LocalStorage');
goog.require('Mixly.CssLoader');
goog.provide('Mixly.Loading');

const {
    Env,
    Config,
    LocalStorage,
    CssLoader,
    Loading
} = Mixly;

const { USER } = Config;

const { laytpl } =layui;

let windowBackgroundColor;
if (USER.theme === 'dark') {
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

Loading.TEMPLATE_RAW = goog.get(path.join(Env.templatePath, 'skeleton.html'));
Loading.TEMPLATE_RENDER = laytpl(Loading.TEMPLATE_RAW).render(Loading.CSS_CONFIG[USER.theme]);
const winTheme = USER.theme;

$('html').append(Loading.TEMPLATE_RENDER);

if (USER.theme === 'dark') {
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

});