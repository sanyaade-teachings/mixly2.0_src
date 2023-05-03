(() => {

goog.require('Mixly.Modules');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.Title');
goog.require('Mixly.MFile');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Drag');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron.ArduShell');
goog.require('Mixly.Electron.BU');
goog.provide('Mixly.Electron.File');

const {
    Modules,
    Env,
    LayerExt,
    Config,
    Title,
    MFile,
    XML,
    Editor,
    Drag,
    Msg,
    Electron
} = Mixly;

const { BOARD } = Config;

const { File, ArduShell, BU } = Electron;

const {
    fs_extra,
    fs_extend,
    fs,
    path,
    electron_remote,
    app
} = Modules;

const { dialog } = electron_remote;

const { MSG } = Blockly.Msg;

File.DEFAULT_PATH = path.resolve(app.getAppPath(), 'src/sample');

File.workingPath = File.DEFAULT_PATH;

File.openedFilePath = null;

File.userPath = {
    img: null,
    mix: null,
    code: null,
    hex: null
}

File.showSaveDialog = (title, filters, endFunc) => {
    const { currentWindow } = Modules;
    currentWindow.focus();
    dialog.showSaveDialog(currentWindow, {
        title,
        defaultPath: File.workingPath,
        filters,
        // nameFieldLabel: Msg.Lang['替换文件'],
        showsTagField: true,
        properties: ['showHiddenFiles'],
        message: title
    }).then(result => {
        let res = result.filePath;
        if (res)
            endFunc(res);
    }).catch(error => {
        console.log(error);
    });
}

File.showOpenDialog = (title, filters, endFunc) => {
    const { currentWindow } = Modules;
    currentWindow.focus();
    dialog.showOpenDialog(currentWindow, {
        title,
        defaultPath: File.workingPath,
        filters,
        properties: ['openFile', 'showHiddenFiles'],
        message: title
    })
    .then(result => {
        let res = result.filePaths[0];
        if (res)
            endFunc(res);
    })
    .catch(error => {
        console.log(error);
    });
}

File.save = (endFunc = () => {}) => {
    if (File.openedFilePath) {
        const extname = path.extname(File.openedFilePath);
        let data = '';
        switch (extname) {
            case '.mix':
                data = MFile.getMix();
                break;
            case '.py':
            case '.ino':
                data = MFile.getCode();
                break;
            default:
                layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
                return;
        }
        fs_extra.outputFile(File.openedFilePath, data)
        .then(() => {
            Title.updeteFilePath(File.openedFilePath);
            layer.msg(Msg.Lang['保存成功'], { time: 1000 });
        })
        .catch((error) => {
            File.openedFilePath = null;
            console.log(error);
            layer.msg(Msg.Lang['写文件出错'], { time: 1000 });
        })
        .finally(() => {
            endFunc();
        })
    } else {
        File.saveAs(endFunc);
    }
}

File.saveAs = (endFunc = () => {}) => {
    File.showSaveDialog(Msg.Lang['另存为'], MFile.saveFilters, (filePath) => {
        const extname = path.extname(filePath);
        if (['.mix', '.py', '.ino'].includes(extname)) {
            File.openedFilePath = filePath;
            File.workingPath = path.dirname(filePath);
            File.save(endFunc);
        } else {
            switch (extname) {
                case '.bin':
                case '.hex':
                    if (BOARD?.nav?.compile) {
                        ArduShell.saveBinOrHex(filePath);
                    } else {
                        const hexStr = MFile.getHex();
                        fs_extra.outputFile(filePath, hexStr)
                        .then(() => {
                            layer.msg(Msg.Lang['保存成功'], { time: 1000 });
                        })
                        .catch((error) => {
                            console.log(error);
                            layer.msg(Msg.Lang['写文件出错'], { time: 1000 });
                        })
                        .finally(() => {
                            endFunc();
                        });
                    }
                    break;
                case '.png':
                    MFile.getBlocksPng()
                    .then((data) => {
                        return fs_extra.outputFile(filePath, data);
                    })
                    .then(() => {
                        layer.msg(Msg.Lang['保存成功'], { time: 1000 });
                    })
                    .catch((error) => {
                        console.log(error);
                        layer.msg(Msg.Lang['写文件出错'], { time: 1000 });
                    })
                    .finally(() => {
                        endFunc();
                    });
                    break;
                case '.mil':
                    const milStr = MFile.getMil();
                    const $mil = $(milStr);
                    $mil.attr('name', path.basename(filePath, '.mil'));
                    fs_extra.outputFile(filePath, $mil[0].outerHTML)
                    .then(() => {
                        layer.msg('库导出成功', { time: 1000 });
                    })
                    .catch((error) => {
                        console.log(error);
                        layer.msg(Msg.Lang['写文件出错'], { time: 1000 });
                    })
                    .finally(() => {
                        endFunc();
                    });
                    break;
                default:
                    layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
                    endFunc();
            }
        }
    });
}

File.exportLib = (endFunc = () => {}) => {
    File.showSaveDialog('导出库', [ MFile.SAVE_FILTER_TYPE.mil ], (filePath) => {
        const milStr = MFile.getMil();
        const $mil = $(milStr);
        $mil.attr('name', path.basename(filePath, '.mil'));
        fs_extra.outputFile(filePath, $mil[0].outerHTML)
        .then(() => {
            layer.msg('库导出成功', { time: 1000 });
        })
        .catch((error) => {
            console.log(error);
            layer.msg(Msg.Lang['写文件出错'], { time: 1000 });
        })
        .finally(() => {
            endFunc();
        });
    });
}

File.newFile = () => {
    const blocksList = Editor.blockEditor.getAllBlocks();
    const { blockEditor, codeEditor, selected } = Editor;
    const blocklyGenerator = Blockly?.Python ?? Blockly.Arduino;
    if (selected === 'CODE') {
        const code = codeEditor.getValue(),
        workspaceToCode = blocklyGenerator.workspaceToCode(blockEditor) || '';
        if (!blocksList.length && workspaceToCode === code) {
            layer.msg(Msg.Lang['代码区已清空'], { time: 1000 });
            File.openedFilePath = null;
            Title.updateTitle(Title.title);
            return;
        }
    } else {
        if (!blocksList.length) {
            layer.msg(Msg.Lang['工作区已清空'], { time: 1000 });
            File.openedFilePath = null;
            Title.updateTitle(Title.title);
            return;
        }
    }
    layer.confirm(MSG['confirm_newfile'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        success: (layero) => {
            layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
            layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
        },
        btn: [MSG['newfile_yes'], MSG['newfile_no']],
        btn2: (index, layero) => {
            layer.close(index);
        }
    }, (index, layero) => {
        layer.close(index);
        blockEditor.clear();
        blockEditor.scrollCenter();
        Blockly.hideChaff();
        codeEditor.setValue(blocklyGenerator.workspaceToCode(blockEditor) || '', -1);
        File.openedFilePath = null;
        Title.updateTitle(Title.title);
    });
}

File.open = () => {
    File.showOpenDialog(Msg.Lang['打开'], [
        { name: Msg.Lang['Mixly文件'], extensions: MFile.openFilters }
    ], (filePath) => {
        File.openFile(filePath);
    });
}

File.openFile = (filePath) => {
    const extname = path.extname(filePath);
    let data;
    if (!fs_extend.isfile(filePath)) {
        console.log(filePath + '不存在');
        return;
    }
    try {
        data = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.log(error);
        return;
    }
    switch (extname) {
        case '.mix':
        case '.xml':
            try {
                data = XML.convert(data, true);
                data = data.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                console.log(error);
            }
            MFile.parseMix($(data), false, false, (message) => {
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
                    File.openedFilePath = null;
                    Title.updateTitle(Title.title);
                } else {
                    File.openedFilePath = filePath;
                    File.workingPath = path.dirname(filePath);
                    Title.updeteFilePath(File.openedFilePath);
                }
            });
            break;
        case '.ino':
        case '.py':
            Drag.items.vDrag.full('NEGATIVE'); // 完全显示代码编辑器
            Editor.codeEditor.setValue(data, -1);
            File.openedFilePath = filePath;
            File.workingPath = path.dirname(filePath);
            Title.updeteFilePath(File.openedFilePath);
            break;
        case '.bin':
        case '.hex':
            if (BOARD?.nav?.compile) {
                ArduShell.showUploadBox(filePath);
            } else {
                MFile.loadHex(data);
            }
            break;
        default:
            layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
    }
}

})();