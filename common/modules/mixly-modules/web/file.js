(() => {

goog.require('Mixly.MFile');
goog.require('Mixly.Editor');
goog.require('Mixly.Drag');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.provide('Mixly.Web.File');

const {
    MFile,
    Editor,
    Drag,
    Web,
    LayerExt,
    Msg
} = Mixly;

const { File } = Web;

File.obj = null;

/*File.open = () => {
    
}*/

File.open = async () => {
    if (window.location.protocol === 'https:') {
        let filters = [];
        MFile.openFilters.map((data) => {
            filters.push('.' + data);
        });
        const fileConfig = {
            multiple: false,
            types: [{
                description: 'Mixly File',
                accept: {
                    'application/xml': filters
                }
            }],
            suggestedStartLocation: 'pictures-library'
        };
        try {
            const [ obj ] = await window.showOpenFilePicker(fileConfig);
            if (!obj) {
                return;
            }
            File.obj = obj;
            const ext = obj.name.substring(obj.name.lastIndexOf('.'));
            const fileInfo = await File.obj.getFile();
            if (!fileInfo) {
                return;
            }
            File.parseData(ext, await fileInfo.text());
        } catch (error) {
            console.log(error);
        }
    } else {
        const filters = '.' + MFile.openFilters.join(',.');
        MFile.openFile(filters, 'text', (fileObj) => {
            let { data, filename } = fileObj;
            const filesuffix = filename.substring(filename.lastIndexOf('.'));
            File.parseData(filesuffix, data);
        });
    }
}

File.parseData = (ext, text) => {
    switch (ext) {
        case '.mix':
        case '.xml':
            try {
                text = text.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                console.log(error);
            }
            MFile.parseMix($(text), false, false, (message) => {
                if (message) {
                    switch (message) {
                        case 'USE_CODE':
                            // console.log('已从code标签中读取代码');
                            break;
                        case 'USE_INCOMPLETE_BLOCKS':
                            // console.log('一些块已被忽略');
                            break;
                    }
                    Editor.blockEditor.scrollCenter();
                    Blockly.hideChaff();
                }
            });
            break;
        case '.ino':
        case '.py':
            Drag.items.vDrag.full('NEGATIVE'); // 完全显示代码编辑器
            Editor.codeEditor.setValue(text, -1);
            break;
        case '.bin':
        case '.hex':
            MFile.loadHex(text);
            break;
        default:
            layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
            File.obj = null;
    }
}

File.save = async () => {
    if (!File.obj) {
        File.saveAs();
        return;
    }
    let text = '';
    const ext = File.obj.name.substring(File.obj.name.lastIndexOf('.'));
    switch (ext) {
        case '.mix':
        case '.xml':
            text = MFile.getMix();
            break;
        case '.ino':
        case '.py':
            text = MFile.getCode();
            break;
        default:
            return;
    }
    try {
        const writer = await File.obj.createWritable();
        await writer.write(text);
        layer.msg('写入新数据到' + File.obj.name, { time: 1000 });
        await writer.close();
    } catch (error) {
        console.log(error);
    }
}

File.saveAs = async () => {
    let filters = [];
    MFile.saveFilters.map((data) => {
        filters.push('.' + data.extensions[0]);
    });
    const fileConfig = {
        types: [{
            description: 'Mixly File',
            accept: {
                'application/xml': filters
            }
        }]
    };
    try {
        const obj = await window.showSaveFilePicker(fileConfig);
        if (!obj) {
            return;
        }
        File.obj = obj;
        File.save();
    } catch (error) {
        console.log(error);
    }
}

File.new = async () => {
    layer.confirm(MSG['confirm_newfile'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        success: (layero) => {
            layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
            layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
        },
        btn: [MSG['newfile_yes'], MSG['newfile_no']],
        btn2: function (index, layero) {
            layer.close(index);
        }
    }, async function (index, layero) {
        mixlyjs.createFn();
        layer.close(index);
        File.obj = null;
    });
}

File.saveCode = () => {

}

File.saveMix = () => {

}

File.saveImg = () => {

}

File.saveHex = () => {

}

})();