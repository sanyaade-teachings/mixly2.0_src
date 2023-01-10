(() => {

goog.require('layui');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.require('Mixly.BoardManager');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.provide('Mixly.Setting');

const {
    XML,
    LayerExt,
    Msg,
    BoardManager,
    Config,
    Env,
    Modules,
    Setting
} = Mixly;

const { LANG } = Msg;
const { element, form } = layui;
const { fs_extra, path } = Modules;
const { USER } = Config;

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
        try {
            fs_extra.outputJsonSync(path.resolve(Env.clientPath, './setting/config.json'), USER, {
                spaces: '    '
            });
        } catch(error) {
            console.log(error);
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
    element.render('collapse', 'test');
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
                try {
                    fs_extra.outputJsonSync(path.resolve(Env.clientPath, './setting/config.json'), USER, {
                        spaces: '    '
                    });
                } catch(error) {
                    console.log(error);
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
    element.on('tab(setting-menu-filter)', function(data){
        if (data.index === 1) {
            if (data.index !== Setting.nowIndex) {
                BoardManager.onclickImportBoards();
            } else {
                layui.table.resize('cloud-boards-table');
            }
        } else if (data.index === 2) {
            if (data.index !== Setting.nowIndex) {
                element.render('nav', 'manage-board-form-filter');
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

window.addEventListener('DOMContentLoaded', () => {
    Setting.init();
});

})();