(() => {

goog.provide('Mixly.Setting');

Mixly.require({
    "electron": [],
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
    "common": ["layui", "layui.loading", "store", "Mixly.XML",
               "Mixly.LayerExt", "Mixly.Msg", "Mixly.BoardManager", "Mixly.Config",
               "Mixly.Env", "Mixly.Modules", "Mixly.MJSON"]
});

const {
    XML,
    LayerExt,
    Msg,
    BoardManager,
    Config,
    Env,
    Modules,
    MJSON,
    Setting
} = Mixly;

const { LANG } = Msg;
const { element, form, loading, layer } = layui;
const { fs_extra, path } = Modules;
const { USER, SOFTWARE } = Config;

Setting.ID = 'setting-menu';
Setting.CONFIG = {}
Setting.nowIndex = 0;
Setting.config = {};

Setting.init = () => {
    element.tab({
        headerElem: '#setting-menu-options>li',
        bodyElem: '#setting-menu-body>.menu-body'
    });
    element.render('nav', 'setting-menu-filter');
    Setting.addOnchangeOptionListener();

    form.on('switch(setting-theme-filter)', function(data) {
        const { checked } = data.elem;
        USER.theme = checked ? 'dark' : 'light';
        $('body').removeClass('dark light')
                 .addClass(USER.theme);
        LayerExt.updateShade();
        if (Env.isElectron) {
            try {
                fs_extra.outputJsonSync(path.resolve(Env.clientPath, './setting/config.json'), USER, {
                    spaces: '    '
                });
            } catch(error) {
                console.log(error);
            }
        } else {
            store.set('mixly2.0-config', USER);
        }
    });

    form.on('submit(open-setting-dialog-filter)', function(data) {
        Setting.onclick();
        return false;
    });

    form.on('submit(board-reset-filter)', function(data) {
        BoardManager.resetBoard((error) => {
            if (error) {
                console.log(error);
            }
            BoardManager.screenWidthLevel = -1;
            BoardManager.screenHeightLevel = -1;
            BoardManager.loadBoards();
            BoardManager.updateBoardsCard();
        });
        return false;
    });
}

Setting.menuInit = () => {
    $('#setting-menu-options').children('.layui-this').removeClass('layui-this');
    $('#setting-menu-options').children('li').first().addClass('layui-this');
    $('#setting-menu-body').children('.layui-show').removeClass('layui-show');
    $('#setting-menu-body').children('div').first().addClass('layui-show');
    form.render(null, 'setting-form-filter');
    form.val('setting-form-filter', USER);
}

Setting.onclick = () => {
    Setting.menuInit();
    let obj = $(".setting-menu-item").select2({
        width: '100%',
        minimumResultsForSearch: 10
    });
    Setting.configMenuSetValue(obj, USER);
    element.render('collapse', 'menu-user-collapse-filter');
    Setting.nowIndex = 0;
    LayerExt.open({
        title: [Msg.getLang('设置'), '36px'],
        id: 'setting-menu-layer',
        content: $('#' + Setting.ID),
        shade: LayerExt.SHADE_ALL,
        area: ['50%', '50%'],
        min: ['400px', '200px'],
        success: () => {
        }
    });
    $('#setting-menu-user button').off().click((event) => {
        const type = $(event.currentTarget).attr('value');
        switch (type) {
            case 'apply':
                let oldTheme = USER.themeAuto? 'auto' : USER.theme;
                let oldLanglage = USER.languageAuto? 'auto' : USER.language;
                let updateTheme = false, updateLanguage = false;
                let value = Setting.configMenuGetValue(obj);
                for (let i in value) {
                    USER[i] = value[i];
                }
                updateTheme = oldTheme !== USER.theme;
                updateLanguage = oldLanglage !== USER.language;
                if (updateTheme) {
                    if (USER.theme === 'auto') {
                        const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
                        USER.theme = themeMedia.matches ? 'light' : 'dark';
                        USER.themeAuto = true;
                    } else {
                        USER.themeAuto = false;
                    }
                    $('body').removeClass('dark light')
                             .addClass(USER.theme);
                }
                if (updateLanguage) {
                    if (USER.language === 'auto') {
                        switch (navigator.language) {
                            case 'zh-CN':
                                USER.language = 'zh-hans';
                                break;
                            case 'zh-HK':
                            case 'zh-SG':
                            case 'zh-TW':
                                USER.language = 'zh-hant';
                                break;
                            default:
                                USER.language = 'en';
                        }
                        USER.languageAuto = true;
                    } else {
                        USER.languageAuto = false;
                    }
                    Msg.nowLang = USER.language ?? 'zh-hans';
                    LayerExt.updateShade();
                }
                if (updateTheme || updateLanguage) {
                    BoardManager.screenWidthLevel = -1;
                    BoardManager.screenHeightLevel = -1;
                    BoardManager.updateBoardsCard();
                }
                if (Env.isElectron) {
                    try {
                        fs_extra.outputJsonSync(path.resolve(Env.clientPath, './setting/config.json'), USER, {
                            spaces: '    '
                        });
                    } catch(error) {
                        console.log(error);
                    }
                } else {
                    store.set('mixly2.0-config', USER);
                }
                layer.closeAll(() => {
                    XML.renderAllTemplete();
                    layer.msg(Msg.getLang('配置更新成功'), { time: 1000 });
                });
                break;
            case 'reset':
                Setting.configMenuReset(obj);
                break;
        }
    }); 
}

Setting.addOnchangeOptionListener = () => {
    element.on('tab(setting-menu-filter)', function(data) {
        let $li = $(data.elem.context);
        let index = $li.attr('lay-id') - 0;
        if (index === 1) {
            if (data.index !== Setting.nowIndex) {
                Env.isElectron && BoardManager.onclickImportBoards();
            } else {
                layui.table.resize('cloud-boards-table');
            }
        } else if (index === 2) {
            if (data.index !== Setting.nowIndex) {
                $('#setting-menu-update').loading({
                    background: USER.theme === 'dark' ? '#807b7b' : '#fff',
                    opacity: 1,
                    animateTime: 0,
                    imgSrc: 1
                });
                const { Socket } = Mixly.WebSocket;
                Socket.sendCommand({
                    obj: 'Socket',
                    func: 'getConfigByUrl',
                    args: [ SOFTWARE.configUrl ]
                });
            }
        }
        Setting.nowIndex = data.index;
    });
}

Setting.configMenuReset = (obj) => {
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        let newValue = $item.children('option').first().val();
        $item.val(newValue).trigger("change");
    }
}

Setting.configMenuSetValue = (obj, value) => {
    let newValue = { ...value };
    if (value.themeAuto) {
        newValue.theme = 'auto';
    }
    if (value.languageAuto) {
        newValue.language = 'auto';
    }
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        let type = $item.attr('value');
        if (!newValue[type]) {
            continue;
        }
        $item.val(newValue[type]).trigger("change");
    }
}

Setting.configMenuGetValue = (obj) => {
    let config = {};
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        config[$item.attr('value')] = $item.val();
    }
    return config;
}

Setting.refreshUpdateMenuStatus = (config) => {
    console.log(config);
    const {
        serverVersion,
        clientVersion
    } = config;
    let $serverDiv = $('#setting-menu-update-server');
    let $clientDiv = $('#setting-menu-update-client');
    let $btnDiv = $('#setting-menu-update > div:nth-child(2)');
    $serverDiv.find('span').css('display', 'none');
    $clientDiv.find('span').css('display', 'none');
    let needUpdateServer = false, needUpdateClient = false;
    if (serverVersion && serverVersion !== SOFTWARE.serverVersion) {
        $serverDiv.find('span[value="obsolete"]').css('display', 'inline-block');
        needUpdateServer = true;
        $serverDiv.find('text').text(`${SOFTWARE.serverVersion} → ${serverVersion}`);
    } else {
        $serverDiv.find('span[value="latest"]').css('display', 'inline-block');
        $serverDiv.find('text').text(SOFTWARE.serverVersion);
    }
    if (clientVersion && clientVersion !== SOFTWARE.clientVersion) {
        $clientDiv.find('span[value="obsolete"]').css('display', 'inline-block');
        needUpdateClient = true;
        $clientDiv.find('text').text(`${SOFTWARE.clientVersion} → ${clientVersion}`);
    } else {
        $clientDiv.find('span[value="latest"]').css('display', 'inline-block');
        $clientDiv.find('text').text(SOFTWARE.clientVersion);
    }
    if (needUpdateServer || needUpdateClient) {
        $btnDiv.css('display', 'flex');
        $btnDiv.children('button').off().click((event) => {
            let index = layer.load(2);
            layer.alert('正在更新中，更新结束后将会自动重载页面，<br/>若页面长时间未重载请尝试手动重载页面。', {
                shade: LayerExt.SHADE_ALL
            });
            const { Socket } = Mixly.WebSocket;
            Socket.sendCommand({
                obj: 'PM2',
                func: 'updateSW',
                args: []
            });
        });
    } else {
        $btnDiv.css('display', 'none');
    }
    setTimeout(() => {
        $('#setting-menu-update').loading('destroy');
    }, 500);
}

window.addEventListener('DOMContentLoaded', () => {
    Setting.init();
});

})();