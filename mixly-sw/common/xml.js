(() => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.XML');

const { Env, Config, Msg, XML } = Mixly;
const { SOFTWARE, USER } = Config;
const { laytpl } = layui;

XML.TEMPLATE_DIR_PATH = './mixly-sw/templete';

let env = 'electron';
if (Env.hasSocketServer) {
    env = 'web-socket';
} else if (Env.hasCompiler) {
    env = 'web-compiler';
}
if (env === 'electron' && !Env.isElectron) {
    env = 'web';
}

XML.TEMPLATE_CONFIG = [
    {
        type: 'SETTING_DIV',
        path: '/setting-div.html',
        config: {
            env,
            personalise: () => {
                return Msg.getLang('个性化');
            },
            theme: () => {
                return Msg.getLang('主题');
            },
            light: () => {
                return Msg.getLang('浅色');
            },
            dark: () => {
                return Msg.getLang('深色');
            },
            language: () => {
                return Msg.getLang('语言');
            },
            autoUpdate: () => {
                return Msg.getLang('自动检查更新');
            },
            blockRenderer: () => {
                return Msg.getLang('块渲染器');
            },
            apply: () => {
                return Msg.getLang('应用');
            },
            reset: () => {
                return Msg.getLang('重置');
            },
            compileCAndH: () => {
                return Msg.getLang('同时编译同目录.c和.h');
            },
            autoOpenPort: () => {
                return Msg.getLang('上传结束后自动打开串口');
            },
            autoWithSys: () => {
                return Msg.getLang('跟随系统');
            },
            yes: () => {
                return Msg.getLang('是');
            },
            no: () => {
                return Msg.getLang('否');
            },
            manageBoard: () => {
                return Msg.getLang('管理板卡');
            },
            resetBoard: () => {
                return Msg.getLang('复位板卡');
            },
            importBoard: () => {
                return Msg.getLang('导入板卡');
            },
            softwareSettings: () => {
                return Msg.getLang('软件');
            },
            boardSettings: () => {
                return Msg.getLang('板卡');
            },
            checkForUpdates: () => {
                return Msg.getLang('检查更新');
            },
            server: () => {
                return Msg.getLang('服务器');
            },
            client: () => {
                return Msg.getLang('客户端');
            },
            version: () => {
                return Msg.getLang('版本');
            },
            latest: () => {
                return Msg.getLang('已最新');
            },
            obsolete: () => {
                return Msg.getLang('待更新');
            },
            update: () => {
                return Msg.getLang('更新');
            },
            blocklyContentHighlight: () => {
                return Msg.getLang('工作区高亮显示所有块');
            },
            blocklyShowGrid: () => {
                return Msg.getLang('工作区显示网格');
            }

        },
        appendToBody: true,
        generateDom: false,
        render: true
    }, {
        type: 'PROGRESS_BAR_DIV',
        path: '/progress-bar-div.html',
        config: {},
        appendToBody: false,
        generateDom: false,
        render: false
    }, {
        type: 'LOADER_DIV',
        path: '/loader-div.html',
        config: {
            btnName: () => {
                return Msg.getLang('取消');
            }
        },
        appendToBody: true,
        generateDom: false,
        render: true
    }, {
        type: 'INTERFACE',
        path: '/interface.html',
        config: {},
        appendToBody: false,
        generateDom: false,
        render: false
    }
];

XML.TEMPLATE_ENV = {
    SETTING_DIV: true,
    PROGRESS_BAR_DIV: true,
    LOADER_DIV: true,
    INTERFACE: true
};

XML.TEMPLATE_STR = {};

XML.TEMPLATE_STR_RENDER = {};

XML.TEMPLATE_DOM = {};

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

XML.renderAllTemplete = () => {
    for (let i of XML.TEMPLATE_CONFIG) {
        const {
            type,
            config,
            appendToBody,
            render
        } = i;
        if (render && XML.TEMPLATE_ENV[type]) {
            const xmlStr = XML.TEMPLATE_STR[type];
            XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr);
            if (appendToBody) {
                $('*[mxml-id="' + type + '"]').remove();
                XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
                XML.TEMPLATE_DOM[type].attr('mxml-id', type);
                $('body').append(XML.TEMPLATE_DOM[type]);
            }
        }
    }
}

XML.getDom = (xmlStr, config = {}) => {
    return $(XML.render(xmlStr, config));
}

for (let i of XML.TEMPLATE_CONFIG) {
    const {
        type,
        path,
        config,
        appendToBody,
        generateDom
    } = i;
    if (XML.TEMPLATE_ENV[type]) {
        const xmlStr = Mixly.get(XML.TEMPLATE_DIR_PATH + path);
        if (xmlStr) {
            XML.TEMPLATE_STR[type] = xmlStr;
            if (generateDom) {
                XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr, config);
                XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
            }
            if (appendToBody) {
                if (!XML.TEMPLATE_DOM[type]) {
                    XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
                }
                XML.TEMPLATE_DOM[type].attr('mxml-id', type);
                $('body').append(XML.TEMPLATE_DOM[type]);
            }
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