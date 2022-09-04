(() => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.MFile');
goog.require('Mixly.LayerExtend');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.WebSocket.File');

const {
    XML,
    Editor,
    MFile,
    LayerExtend
} = Mixly;
const { Socket, File } = Mixly.WebSocket;

const { form } = layui;

File.saveToCloud = () => {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        layer.prompt({
            title: MSG['save_ser'],
            shade: LayerExtend.shade,
            value: 'main.mix',
            success: function(layero, index) {
                $(layero).find('input').attr('spellcheck', false);
            }
        }, function(value, index, elem) {
            layer.close(index);
            const extname = value.substring(value.lastIndexOf('.')).toLowerCase();
            let saveType = [];
            MFile.saveFilters.map((filter) => {
                saveType = [ ...saveType, ...filter.extensions ];
            });
            if (!saveType.includes(extname.substring(1))) {
                layer.msg(indexText['文件后缀错误'], {
                    time: 1000
                });
                return;
            }
            let data;
            switch (extname) {
                case '.mix':
                    data = MFile.getMix();
                    break;
                case '.ino':
                case '.py':
                    data = MFile.getCode();
                default:
                    layer.msg(indexText['文件后缀错误'], {
                        time: 1000
                    });
            }
            if (!data) {
                return;
            }
            Socket.sendCommand({
                obj: 'File',
                func: 'saveAs',
                args: [ value, data ]
            });
        });
    });
}

File.saveSuccess = (filename) => {
    layer.msg(filename + ' ' + indexText['保存成功'], {
        time: 1000
    });
}

File.saveError = (filename, error) => {
    layer.msg(filename + ' ' + '保存失败', {
        time: 1000
    });
}

File.openFromCloud = () => {
    Socket.sendCommand({
        obj: 'File',
        func: 'getUserFilesInfo',
        args: []
    });
}

File.showOpenDialog = (filesObj) => {
    const $options = $('#mixly-selector-type');
    $options.empty();
    filesObj.map(file => {
        $options.append($(`<option value="${file.path}">${file.name}</option>`));
    });
    form.render();

    let initBtnClicked = false;

    const layerNum = layer.open({
        type: 1,
        id: "serial-select",
        title: "请选择需要打开的文件：",
        area: ['350px', '150px'],
        content: $('#mixly-selector-div'),
        shade: Mixly.LayerExtend.shade,
        resize: false,
        closeBtn: 0,
        success: function (layero) {
            $('#serial-select').css('height', '180px');
            $('#serial-select').css('overflow', 'inherit');
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-selector-btn1").off("click").click(() => {
                layer.close(layerNum);
            });
            $("#mixly-selector-btn2").click(() => {
                layer.close(layerNum);
                initBtnClicked = true;
            });
        },
        end: function () {
            $("#mixly-selector-btn1").off("click");
            $("#mixly-selector-btn2").off("click");
            $('#mixly-selector-div').css('display', 'none');
            $(".layui-layer-shade").remove();
            if (!initBtnClicked) {
                return;
            }
            const selectedFilePath = $('#mixly-selector-type option:selected').val();
            Socket.sendCommand({
                obj: 'File',
                func: 'open',
                args: [ selectedFilePath ]
            });
        }
    });
}

File.open = (extname, data) => {
    switch (extname) {
        case '.mix':
        case '.xml':
            Editor.items.vDrag.full('POSITIVE');
            try {
                data = XML.convert(data, true);
                data = data.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                console.log(error);
            }
            MFile.parseMix($(data), false, false, (message) => {
                Editor.blockEditor.scrollCenter();
                Blockly.hideChaff();
            });
            break;
        case '.ino':
        case '.py':
            Editor.items.vDrag.full('NEGATIVE');
            Editor.codeEditor.setValue(data, -1);
            break;
    }
}

File.openSuccess = (filename) => {
    layer.msg(filename + ' ' + '打开成功', {
        time: 1000
    });
}

File.openError = (filename, error) => {
    layer.msg(filename + ' ' + '打开失败', {
        time: 1000
    });
}

})();