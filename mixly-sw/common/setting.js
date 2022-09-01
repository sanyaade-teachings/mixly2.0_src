(() => {

goog.require('layui');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.Msg');
goog.require('Mixly.BoardManager');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.provide('Mixly.Setting');

const {
    XML,
    LayerExtend,
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

Setting.CONFIG = {

}

Setting.nowIndex = 0;

Setting.config = {};

Setting.init = () => {
    element.tab({
        headerElem: '#setting-menu-options>li',
        bodyElem: '#setting-menu-body>.menu-body'
    });
    element.render('nav', 'setting-menu-filter');
    Setting.onchangeOption();
    form.on('submit(setting-submit)', function(data) {
        for (let i in data.field) {
            USER[i] = data.field[i];
        }
        try {
            fs_extra.outputJsonSync(path.resolve(Env.clientPath, './setting/config.json'), USER, {
                spaces: '    '
            });
        } catch(error) {
            console.log(error);
        }
        Msg.nowLang = USER.language ?? 'zh-hans';
        Env.theme = USER.theme;
        LayerExtend.updateShade();
        layer.closeAll(() => {
            XML.renderAllTemplete();
            layer.msg(Msg.getLang('配置更新成功'), { time: 1000 });
            $('body').removeClass('dark light')
                     .addClass(Env.theme);
        });
        return false;
    });

    form.on('switch(setting-theme-filter)', function(data) {
        const { checked } = data.elem;
        USER.theme = checked ? 'dark' : 'light';
        Env.theme = USER.theme;
        $('body').removeClass('dark light')
                 .addClass(Env.theme);
        LayerExtend.updateShade();
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
            if (error)
                console.log(error);
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
    Setting.nowIndex = 0;
    LayerExtend.open({
        title: [Msg.getLang('设置'), '36px'],
        id: 'setting-menu-layer',
        content: $('#' + Setting.ID),
        shade: LayerExtend.shade,
        area: ['50%', '50%'],
        min: ['400px', '200px'],
        success: () => {
        }
    });
}

Setting.onchangeOption = () => {
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

window.addEventListener('DOMContentLoaded', () => {
    Setting.init();
});

})();