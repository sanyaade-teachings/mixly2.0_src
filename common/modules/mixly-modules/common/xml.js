(() => {

goog.require('layui');
goog.require('Mixly.Tools');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.require('Code');
goog.provide('Mixly.XML');

const {
    Tools,
    Env,
    Config,
    Msg,
    XML
} = Mixly;
const { BOARD } = Config;
const { laytpl } = layui;

XML.TEMPLATE_DIR_PATH = goog.normalizePath_(goog.basePath + '../template/');

XML.TEMPLATE_CONFIG = [
    {
        type: 'LOADER_DIV',
        path: '/loader-div.html',
        config: {
            btnName: Msg.Lang['取消']
        },
        appendToBody: true
    }, {
        type: 'SELECTOR_DIV',
        path: '/selector-div.html',
        config: {
            btn1Name: Msg.Lang['取消'],
            btn2Name: Msg.Lang['确定']
        },
        appendToBody: true
    }, {
        type: 'SIMULATOR_DIV',
        path: '/simulator-div.html',
        config: {},
        appendToBody: true
    }, {
        type: 'BOARD_SELECTOR',
        path: '/board-selector-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'PORT_SELECTOR',
        path: '/port-selector-div.html',
        config: {
            selectPort: Msg.Lang['选择串口'],
            noPort: Msg.Lang['无可用串口']
        },
        appendToBody: false
    }, {
        type: 'PARSE_MIX_ERROR_DIV',
        path: '/parse-mix-error-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'READ_BITMAP_DIV',
        path: '/read-bitmap-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'SEARCH_DIV',
        path: '/search-div.html',
        config: {
            search: Msg.Lang['查找']
        },
        appendToBody: false
    }, {
        type: 'PROGRESS_BAR_DIV',
        path: '/progress-bar-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'LIB_MANAGER_DIV',
        path: '/lib-manager-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'APP_DIV',
        path: '/app.html',
        config: {
            outputAceName: Msg.Lang['输出'],
            row: Msg.Lang['行'],
            column: Msg.Lang['列'],
            unknown: Msg.Lang['未知'],
            config: Msg.Lang['配置板卡'],
            selected: Msg.Lang['已选择'],
            on: Msg.Lang['在'],
            message: '消息'
        },
        appendToBody: false
    }, {
        type: 'BOARD_CONFIG_MENU_DIV',
        path: '/board-config-menu-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'EXAMPLE_MENU_DIV',
        path: '/example-menu-div.html',
        config: {},
        appendToBody: false
    }
];

XML.TEMPLATE_ENV = {
    LOADER_DIV: true,
    SELECTOR_DIV: true,
    SIMULATOR_DIV: Env.isElectron && BOARD?.nav?.compile,
    BOARD_SELECTOR: true,
    PORT_SELECTOR: !(BOARD?.nav?.run || BOARD?.nav?.cancel || BOARD?.nav?.webrun || BOARD?.nav?.webcancel || (!Env.isElectron && !Env.hasSocketServer)),
    PARSE_MIX_ERROR_DIV: true,
    READ_BITMAP_DIV: true,
    SEARCH_DIV: true,
    PROGRESS_BAR_DIV: Env.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary,
    LIB_MANAGER_DIV: Env.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary,
    APP_DIV: true,
    BOARD_CONFIG_MENU_DIV: true,
    EXAMPLE_MENU_DIV: true
};

XML.TEMPLATE_STR = {};

XML.TEMPLATE_STR_RENDER = {};

XML.TEMPLATE_DOM = {};

XML.CATEGORIES_STR = {};

XML.getDom = (xmlStr, config = {}) => {
    return $(laytpl(xmlStr).render(config));
}

XML.render = (xmlStr, config = {}) => {
    const newConfig = {};
    for (let i in config) {
        if (typeof config[i] === 'function')
            newConfig[i] = config[i]();
        else
            newConfig[i] = config[i];
    }
    return laytpl(xmlStr).render(newConfig);
}

XML.convert = function (str, trimEscaped) {
    var xml = "";
    var hasComleteAngleBracket = true;
    var lenStr = str.length;
    for (var i = 0; i < lenStr; i++) {
        if (str[i] === "<") {
            hasComleteAngleBracket = false;
        } else if (str[i] === ">") {
            hasComleteAngleBracket = true;
        }

        if (trimEscaped
            && !hasComleteAngleBracket
            && i + 1 < lenStr
            && str[i] === "\\"
            && str[i + 1] === '"') {
            i += 1;
        }

        if (!trimEscaped
            && !hasComleteAngleBracket
            && i > 0
            && str[i - 1] !== "\\"
            && str[i] === '"') {
            xml += "\\";
        }
        xml += str[i];
    }
    return xml;
}

for (let i of XML.TEMPLATE_CONFIG) {
    const { type, path, config, appendToBody } = i;
    if (XML.TEMPLATE_ENV[type]) {
        const xmlStr = goog.get(XML.TEMPLATE_DIR_PATH + path);
        if (xmlStr) {
            XML.TEMPLATE_STR[type] = xmlStr;
            XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr, config);
            XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
            if (appendToBody)
                $('body').append(XML.TEMPLATE_DOM[type]);
        }
    }
}

if (layui._typeof(BOARD.board) === 'object') {
    for (let i in BOARD.board) {
        const boardConfig = BOARD.board[i];
        if (layui._typeof(boardConfig) === 'object'
         && layui._typeof(boardConfig.xmlPath) === 'string') {
            const categoriesStr = goog.get(boardConfig.xmlPath);
            if (categoriesStr)
                XML.CATEGORIES_STR[i] = categoriesStr;
        }
    }
}

window.addEventListener('load', () => {
    for (let i of XML.TEMPLATE_CONFIG) {
        const { type, appendToBody } = i;
        if (XML.TEMPLATE_ENV[type] && XML.TEMPLATE_DOM[type] && appendToBody) {
            $('body').append(XML.TEMPLATE_DOM[type]);
        }
    }
});

})();