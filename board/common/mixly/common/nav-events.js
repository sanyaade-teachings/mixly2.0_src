(() => {

goog.require('layui');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Boards');
goog.require('Mixly.Editor');
goog.provide('Mixly.NavEvents');

const { form } = layui;

const {
    LayerExt,
    NavEvents,
    Boards,
    Editor
} = Mixly;

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