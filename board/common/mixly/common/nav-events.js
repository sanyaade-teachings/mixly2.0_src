(() => {

goog.require('layui');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.ScriptLoader');
goog.require('Mixly.Modules');
goog.require('Mixly.Theme');
goog.require('Mixly.Boards');
goog.require('Mixly.Editor');
goog.provide('Mixly.NavEvents');

const { element, slider, form } = layui;

const {
    Env,
    ScriptLoader,
    Modules,
    LayerExt,
    NavEvents,
    Config,
    XML,
    Theme,
    Boards,
    Editor,
    Electron = {},
    Web = {}
} = Mixly;

const { BOARD } = Config;

NavEvents.onclickNewFile = () => {
    layer.confirm(MSG['confirm_newfile'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        btn: [MSG['newfile_yes'], MSG['newfile_no']]
        , btn2: function (index, layero) {
            layer.close(index);
        }
    }, function (index, layero) {
        mixlyjs.createFn();
        layer.close(index);
    });
}

NavEvents.onclickChangeLang = () => {
    let updateWorkspace = () => {
        let nowCode = editor.getValue();
        showTag();
        Code.initLanguage(false);
        let endBtnId = 'left-nav-mark';
        MixlyBlockly.LEFT_MARK_X = getid(endBtnId).offsetLeft + getid(endBtnId).offsetWidth;
        Blockly.fireUiEvent(window, 'resize');
        if (document.getElementById('changemod-btn') 
            && document.getElementById('changemod-btn').value === 0) {
            editor.setValue(nowCode, -1);
        } else {
            try {
                let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                Blockly.mainWorkspace.scrollCenter();
            } catch (e) {
                //Blockly.mainWorkspace.clear();
                console.log(e);
            }
        }

        if (typeof serialInit !== "undefined") {
            serialInit();
        }
        if (typeof updateIndexText !== "undefined") {
            updateIndexText();
        }
        Blockly.hideChaff();
    }
    layer.confirm(MSG['choose_language'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        btn: ['简体中文', '繁体中文', 'English']
        , btn3: function (index, layero) {
            localStorage.Language = 'en';
            ScriptLoader.loadLangJs(Code.LANG, "en", function() {
                updateWorkspace();
            });
            layer.closeAll();
        }
    }, function (index, layero) {
        localStorage.Language = 'zh-hans';
        ScriptLoader.loadLangJs(Code.LANG, "zh-hans", function() {
            updateWorkspace();
        });
        layer.closeAll();
    }, function (index) {
        localStorage.Language = 'zh-hant';
        ScriptLoader.loadLangJs(Code.LANG, "zh-hant", function() {
            updateWorkspace();
        });
        layer.closeAll();
    });
}

NavEvents.onclickChangeTheme = () => {
    layer.confirm(MSG['choose_theme'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        btn: ['Dark', 'Light']
        , btn2: function (index, layero) {
            localStorage.Theme = 'Light';
            Env.theme = 'light';
            Theme.changeEditorTheme_light();
            $("body").css("background-color","#fff");
            $(".content").css("background-color","#fff");
            if (Env.isElectron) {
                Modules.currentWindow.setBackgroundColor("#fff");
            }
            LayerExt.updateShade();
        }
    }, function (index, layero) {
        localStorage.Theme = 'Dark';
        Env.theme = 'dark';
        Theme.changeEditorTheme_dark();
        $("body").css("background-color","#181818");
        $(".content").css("background-color","#181818");
        if (Env.isElectron) {
            Modules.currentWindow.setBackgroundColor("#181818");
        }
        LayerExt.updateShade();
        layer.close(index);
    });
}

NavEvents.onclickChangeWinSize = () => {
    let winSize = Env.winSize;
    let ins1 = null;

    layer.open({
        type: 1,
        id: "winsize",
        title: MSG['windowSize'],
        area: ['350px', '180px'],
        content: `<div style="padding:50px 20px 20px 20px;"><div id="slider_winsize" class="slider"></div></div>`,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        closeBtn: 1,
        btn: [indexText["复位"], indexText["应用"]],
        yes: function () {
            Modules.currentWebContents.setZoomFactor(Mixly.Env.winSize/100);
            Env.winSize = 100;
            localStorage.winSize = 100;
            winSize = 100;
            Modules.currentWebContents.setZoomFactor(1.0);
            ins1.setValue(50);
            console.log("屏幕缩放比例为1.0");
            return false;
        },
        btn2: function () {
            Env.winSize = winSize;
            localStorage.winSize = winSize;
            winSize = winSize / 100;
            Modules.currentWebContents.setZoomFactor(winSize);
            console.log("屏幕缩放比例为" + winSize);
            return false;
        },
        success: function (layero) {
            $(".layui-layer-page").css("z-index", "198910151");
            ins1 = slider.render({
                elem: '#slider_winsize',
                input: true, //输入框
                min: 50, //最小值
                max: 150, //最大值
                value: winSize,
                setTips: function(value){
                    return value + '%';
                },
                change: function (vals) {
                    vals = vals.replace("%", "");
                    winSize = vals - 0;
                }
            });
        },
        end: function () {
            $(".layui-layer-shade").remove();
        }
    });
}
NavEvents.init = () => {
    //nav二级菜单栏事件
    $(".layui-nav-third-child").hide();
    $(".third-class").hover(function () {
        $(".layui-nav-third-child").hide();
        $(this).next().css('left', $(this).parent().parent().width() + 1);
        $(this).next().toggle();
    }, function () {
        $(".layui-nav-third-child").hide();
    });
    $(".layui-nav-third-child").hover(function () {
        $(this).toggle();
    }, function () {
        $(".layui-nav-third-child").hide();
    });

    $(".layui-nav-item").hover(function () {
        if ($(this).find('dl').css('right') == "0px") {
            $(this).find('dl').css('left', parseInt(parseInt(($(this).width()) - parseInt($(this).find('dl').width())) / 2));
            $(this).find('dl').css('right', "auto");
        }
    }, function () {
    });

    form.on('select(boards-type)', function (data) {
        const boardName = Boards.getSelectedBoardName();
        Boards.changeTo(boardName);
        if (Boards.selected !== boardName) {
            try {
                var xmlDom = Blockly.Xml.workspaceToDom(Editor.blockEditor);
                Editor.blockEditor.clear();
                Blockly.Xml.domToWorkspace(Editor.blockEditor, xmlDom);
                if (Editor.selected === 'BLOCK') {
                    Editor.blockEditorUpdateCode();
                }
            } catch (error) {
                console.log(error);
            }
        }
        Boards.updateCategories(boardName);
    });

    form.on('select(ports-type)', function (data) {
        $('#mixly-footer-port-div').css('display', 'inline-flex');
        $('#mixly-footer-port').html(data.value);
    });
}
})();