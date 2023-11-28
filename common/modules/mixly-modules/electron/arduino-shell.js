goog.loadJs('electron', () => {

goog.require('path');
goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.Title');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MArray');
goog.require('Mixly.Msg');
goog.require('Mixly.MString');
goog.require('Mixly.Nav');
goog.require('Mixly.Workspace');
goog.require('Mixly.EditorMix');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Electron.Shell');
goog.provide('Mixly.Electron.ArduShell');

const {
    Env,
    Electron,
    LayerExt,
    Title,
    Boards,
    MFile,
    MArray,
    Msg,
    MString,
    Nav,
    Workspace,
    EditorMix,
    Config
} = Mixly;

const { BOARD, SOFTWARE, USER } = Config;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const lodash_fp = Mixly.require('lodash/fp');
const child_process = Mixly.require('child_process');
const iconv_lite = Mixly.require('iconv-lite');

const { 
    ArduShell,
    Serial,
    Shell
} = Electron;

ArduShell.DEFAULT_CONFIG = {
    "board_manager": {
        "additional_urls": []
    },
    "daemon": {
        "port": "50051"
    },
    "directories": {
        "data": "",
        "downloads": "",
        "user": ""
    },
    "library": {
        "enable_unsafe_install": false
    },
    "logging": {
        "file": "",
        "format": "text",
        "level": "info"
    },
    "metrics": {
        "addr": "9090",
        "enabled": true
    },
    "sketch": {
       "always_export_binaries": false 
    }
};

ArduShell.binFilePath = '';

ArduShell.shellPath = null;

ArduShell.shell = null;

ArduShell.ERROR_ENCODING = Env.currentPlatform == 'win32' ? 'cp936' : 'utf-8';

ArduShell.updateShellPath = () => {
    let shellPath = path.join(Env.clientPath, 'arduino-cli');
    if (Env.currentPlatform === 'win32')
        shellPath = path.join(shellPath, 'arduino-cli.exe');
    else
        shellPath = path.join(shellPath, 'arduino-cli');
    if (!fs_plus.isFileSync(shellPath)) {
        const { defaultPath = {} } = SOFTWARE;
        if (typeof defaultPath[Env.currentPlatform] === 'object') {
            let defaultShellPath = defaultPath[Env.currentPlatform].arduinoCli ?? '';
            defaultShellPath = path.join(Env.clientPath, defaultShellPath);
            if (fs_plus.isFileSync(defaultShellPath))
                shellPath = defaultShellPath;
            else
                shellPath = null;
        }
    }
    ArduShell.shellPath = shellPath;
}

ArduShell.updateConfig = (config) => {
    if (!ArduShell.shellPath) return;
    const configPath = path.join(ArduShell.shellPath, '../arduino-cli.json');
    let nowConfig = fs_extra.readJsonSync(configPath, { throws: false }) ?? { ...ArduShell.DEFAULT_CONFIG };
    if (typeof config === 'object') {
        if (MArray.equals(nowConfig.directories, config.directories))
            return;
        nowConfig = {
            ...nowConfig,
            ...config
        };
        fs_extra.outputJson(configPath, nowConfig, {
            spaces: '    '
        })
        .then(() => {
            console.log('arduino-cli.json已更新');
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

ArduShell.init = () => {
    ArduShell.updateShellPath();
    if (!ArduShell.shellPath) return;
    ArduShell.updateConfig({
        directories: {
            data: path.join(ArduShell.shellPath, '../Arduino15'),
            downloads: path.join(ArduShell.shellPath, '../staging'),
            user: path.join(ArduShell.shellPath, '../Arduino')
        }
    });
}

ArduShell.init();

ArduShell.burn = () => {
    Mixly.Electron.BU.initBurn();
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.initCompile = () => {
    ArduShell.compile(() => {});
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.compile = (doFunc = () => {}) => {
    if (!ArduShell.shellPath) {
        ArduShell.shellPath = '';
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue('');
    mainStatusBarTabs.changeTo("output");
    ArduShell.compiling = true;
    ArduShell.uploading = false;
    const boardType = Boards.getSelectedBoardCommandParam();
    mainStatusBarTabs.show();
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang["编译中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: () => {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(Msg.Lang['编译终止中'] + '...', layerNum);
                ArduShell.cancel();
            });
        },
        end: () => {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
    setTimeout(() => {
        statusBarTerminal.setValue(Msg.Lang["编译中"] + "...\n");

        let myLibPath = path.join(Env.boardDirPath, "/libraries/myLib/");
        if (fs_plus.isDirectorySync(myLibPath))
            myLibPath += '\",\"';
        else
            myLibPath = '';
        const thirdPartyPath = path.join(Env.boardDirPath, 'libraries/ThirdParty');
        if (fs_plus.isDirectorySync(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let libName of libList) {
                const libPath = path.join(thirdPartyPath, libName, 'libraries');
                if (!fs_plus.isDirectorySync(libPath)) continue;
                myLibPath += libPath + ',';
            }
        }
        const configPath = path.join(ArduShell.shellPath, '../arduino-cli.json'),
        defaultLibPath = path.join(ArduShell.shellPath, '../libraries'),
        buildPath = path.join(Env.clientPath, './mixlyBuild'),
        buildCachePath = path.join(Env.clientPath, './mixlyBuildCache'),
        codePath = path.join(Env.clientPath, './testArduino/testArduino.ino');
        const cmdStr = '\"'
                     + ArduShell.shellPath
                     + '\" compile -b '
                     + boardType
                     + ' --config-file \"'
                     + configPath
                     + '\" --build-cache-path \"' + buildCachePath + '\" --verbose --libraries \"'
                     + myLibPath
                     + defaultLibPath
                     + '\" --build-path \"'
                     + buildPath
                     + '\" \"'
                     + codePath
                     + '\" --no-color';
        ArduShell.runCmd(layerNum, 'compile', cmdStr, doFunc);
    }, 100);
}

/**
* @function 初始化上传
* @description 关闭已打开的串口，获取当前所连接的设备数，然后开始上传程序
* @return void
*/
ArduShell.initUpload = () => {
    ArduShell.compiling = false;
    ArduShell.uploading = true;
    const boardType = Boards.getSelectedBoardCommandParam();
    const uploadType = Boards.getSelectedBoardConfigParam('upload_method');
    let port = Serial.getSelectedPortName();
    switch (uploadType) {
        case 'STLinkMethod':
        case 'jlinkMethod':
        case 'usb':
            port = 'None';
            break;
    }
    if (port) {
        Serial.portClose(port, () => {
            ArduShell.upload(boardType, port);
        });
    } else {
        layer.msg(Msg.Lang["无可用设备"], {
            time: 1000
        });
    }
}

/**
* @function 上传程序
* @description 通过所选择串口号开始一个上传过程
* @return void
*/
ArduShell.upload = (boardType, port) => {
    if (!ArduShell.shellPath) {
        ArduShell.shellPath = '';
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue('');
    mainStatusBarTabs.changeTo("output");
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang["上传中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: function () {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(Msg.Lang['上传终止中'] + '...', layerNum);
                ArduShell.cancel();
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
    mainStatusBarTabs.show();
    statusBarTerminal.setValue(Msg.Lang["上传中"] + "...\n");
    const configPath = path.join(ArduShell.shellPath, '../arduino-cli.json'),
    defaultLibPath = path.join(ArduShell.shellPath, '../libraries'),
    buildPath = path.join(Env.clientPath, './mixlyBuild'),
    buildCachePath = path.join(Env.clientPath, './mixlyBuildCache'),
    codePath = path.join(Env.clientPath, './testArduino/testArduino.ino');
    let cmdStr = '';
    if (ArduShell.binFilePath !== '') {
        cmdStr = '\"'
            + ArduShell.shellPath
            + '\" -b '
            + boardType
            + ' upload -p '
            + port
            + ' --config-file \"'
            + configPath
            + '\" --verbose '
            + '-i \"' + ArduShell.binFilePath + '\" --no-color';
        ArduShell.binFilePath = '';
    } else {
        let myLibPath = path.join(Env.boardDirPath, "/libraries/myLib/");
        if (fs_plus.isDirectorySync(myLibPath))
            myLibPath += '\",\"';
        else
            myLibPath = '';
        const thirdPartyPath = path.join(Env.boardDirPath, 'libraries/ThirdParty');
        if (fs_plus.isDirectorySync(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let libName of libList) {
                const libPath = path.join(thirdPartyPath, libName, 'libraries');
                if (!fs_plus.isDirectorySync(libPath)) continue;
                myLibPath += libPath + ',';
            }
        }
        cmdStr = '\"'
            + ArduShell.shellPath
            + '\" compile -b '
            + boardType
            + ' --upload -p '
            + port
            + ' --config-file \"'
            + configPath
            + '\" --build-cache-path \"' + buildCachePath + '\" --verbose --libraries \"'
            + myLibPath
            + defaultLibPath
            + '\" --build-path \"'
            + buildPath
            + '\" \"'
            + codePath
            + '\" --no-color';
    }
    ArduShell.runCmd(layerNum, 'upload', cmdStr,
        function () {
            const code = MFile.getCode();
            mainStatusBarTabs.show();
            const portObj = Serial.portsOperator[port];
            if (!portObj) return;
            const { toolConfig } = portObj;
            const baudRateList = code.match(/(?<=Serial.begin[\s]*\([\s]*)[0-9]*(?=[\s]*\))/g);
            if (baudRateList && Serial.BAUDRATES.includes(baudRateList[0]-0)) {
                toolConfig.baudRates = baudRateList[0]-0;
            }
            if (USER.autoOpenPort === 'no') {
                return;
            }
            Serial.connect(port, toolConfig.baudRates);
        }
    );
}

/**
* @function 取消编译或上传
* @description 取消正在执行的编译或上传过程
* @return void
*/
ArduShell.cancel = function () {
    ArduShell.shell && ArduShell.shell.kill();
    ArduShell.shell = null;
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否在扩展名列表内
* @param fileName {String} 文件名
* @param extensionList {Array} 扩展名列表
* @return Boolean
*/
ArduShell.checkFileNameExtension = (fileName, extensionList) => {
    if (!fileName) return false;
    let fileNameToLowerCase = fileName;
    let fileNameLen = fileNameToLowerCase.length;
    let fileType = fileNameToLowerCase.substring(fileNameToLowerCase.lastIndexOf("."), fileNameLen);
    if (extensionList.includes(fileType)) {
        return true;
    } else {
        return false;
    }
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否为.c/.cpp或.h/.hpp
* @param fileName {String} 文件名
* @return Boolean
*/
ArduShell.isCppOrHpp = (fileName) => {
    return ArduShell.checkFileNameExtension(fileName, [".c", ".cpp", ".h", ".hpp"])
}

/**
* @function 检测文件扩展名
* @description 检测文件扩展名是否为.mix/.xml或.ino
* @param fileName {String} 文件名
* @return Boolean
*/
ArduShell.isMixOrIno = (fileName) => {
    return ArduShell.checkFileNameExtension(fileName, [".mix", ".xml", ".ino"]);
}

/**
* @function 删除给定文件夹下文件
* @description 删除给定文件夹下.c/.cpp和.h/.hpp文件
* @param dir {String} 文件夹路径
* @return void
*/
ArduShell.clearDirCppAndHppFiles = (dir) => {
    if (fs_plus.isDirectorySync(dir)) {
        let libDir = fs.readdirSync(dir);
        for (let i = 0; i < libDir.length; i++) {
            if (ArduShell.isCppOrHpp(libDir[i])) {
                const nowPath = path.join(dir, libDir[i]);
                fs.unlinkSync(nowPath);
            }
        }
    }
}

/**
* @function 拷贝文件
* @description 拷贝给定文件夹下.c/.cpp和.h/.hpp文件到目标目录
* @param oldDir {String} 起始文件夹路径
* @param newDir {String} 目标文件夹路径
* @return void
*/
ArduShell.copyHppAndCppFiles = (oldDir, newDir) => {
    if (fs_plus.isDirectorySync(oldDir) && fs_plus.isDirectorySync(newDir)) {
        let oldLibDir = fs.readdirSync(oldDir);
        for (let i = 0; i < oldLibDir.length; i++) {
            if (ArduShell.isCppOrHpp(oldLibDir[i])) {
                const oldPath = path.join(oldDir, oldLibDir[i]);
                const newPath = path.join(newDir, oldLibDir[i]);
                try {
                    fs.copyFileSync(oldPath, newPath);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

/**
* @function 写库文件
* @description 将库文件数据写入本地
* @param inPath {string} 需要写入库文件的目录
* @return void
*/
ArduShell.writeLibFiles = (inPath) => {
    return new Promise((resolve, reject) => {
        const promiseList = [];
        for (let name in Blockly.Arduino.libs_) {
            const data = Blockly.Arduino.libs_[name];
            const codePath = path.join(inPath, name + '.h');
            promiseList.push(
                new Promise((childResolve, childReject) => {
                    fs_extra.outputFile(codePath, data)
                    .finally(() => {
                        childResolve();
                    });
                }
            ));
        }
        if (!promiseList.length) {
            resolve();
            return;
        }
        Promise.all(promiseList)
        .finally(() => {
            resolve();
        });
    });
}

/**
* @function 运行一个cmd命令
* @description 输入编译或上传的cmd命令
* @param cmd {String} 输入的cmd命令
* @return void
*/
ArduShell.runCmd = (layerNum, type, cmd, sucFunc) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.editorManager.getActiveEditor();
    const code = editor.getValue();
    const testArduinoDirPath = path.join(Env.clientPath, 'testArduino');
    const codePath = path.join(testArduinoDirPath, 'testArduino.ino');
    const nowFilePath = Title.getFilePath();
    ArduShell.clearDirCppAndHppFiles(testArduinoDirPath);
    if (USER.compileCAndH === 'yes' && fs_plus.isFileSync(nowFilePath) && ArduShell.isMixOrIno(nowFilePath)) {
        const nowDirPath = path.dirname(nowFilePath);
        ArduShell.copyHppAndCppFiles(nowDirPath, testArduinoDirPath);
    }
    ArduShell.writeLibFiles(testArduinoDirPath)
    .then(() => {
        return fs_extra.outputFile(codePath, code);
    })
    .then(() => {
        ArduShell.shell = new Shell(cmd);
        return ArduShell.shell.exec(cmd);
    })
    .then((info) => {
        layer.close(layerNum);
        const message = (type === 'compile' ? Msg.Lang["编译成功"] : Msg.Lang["上传成功"]);
        statusBarTerminal.addValue(`==${message}(${Msg.Lang["用时"]} ${info.time})==\n`);
        layer.msg(message, { time: 1000 });
        sucFunc();
    })
    .catch((error) => {
        layer.close(layerNum);
        const message = (type === 'compile' ? Msg.Lang["编译失败"] : Msg.Lang["上传失败"]);
        statusBarTerminal.addValue("==" + message + "==\n");
        layer.msg(message, { time: 1000 });
    })
    .finally(() => {
        statusBarTerminal.scrollToBottom();
    });
}

ArduShell.saveBinOrHex = function (writePath) {
    ArduShell.writeFile(Env.clientPath + "/mixlyBuild", writePath);
}

ArduShell.writeFile = function (readPath, writePath) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    ArduShell.compile(function () {
        window.setTimeout(function () {
            const layerNum = layer.open({
                type: 1,
                title: Msg.Lang['保存中'] + '...',
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_ALL,
                resize: false,
                closeBtn: 0,
                success: function () {
                    $(".layui-layer-page").css("z-index", "198910151");
                    $("#mixly-loader-btn").off("click").click(() => {
                        layer.close(layerNum);
                        ArduShell.cancel();
                    });
                    window.setTimeout(function () {
                        try {
                            readPath = readPath.replace(/\\/g, "/");
                            writePath = writePath.replace(/\\/g, "/");
                        } catch (e) {
                            console.log(e);
                        }
                        try {
                            let writeDirPath = writePath.substring(0, writePath.lastIndexOf("."));
                            let writeFileName = writePath.substring(writePath.lastIndexOf("/") + 1, writePath.lastIndexOf("."));
                            let writeFileType = writePath.substring(writePath.lastIndexOf(".") + 1);
                            if (!fs.existsSync(writeDirPath)) {
                                fs.mkdirSync(writeDirPath);
                            }
                            if (fs.existsSync(writePath)) {
                                fs.unlinkSync(writePath);
                            }
                            let readBinFilePath = readPath + "/testArduino.ino." + writeFileType;
                            let binFileData = fs.readFileSync(readBinFilePath);
                            fs.writeFileSync(writePath, binFileData);
                            let binFileType = [
                                ".eep",
                                ".hex",
                                ".with_bootloader.bin",
                                ".with_bootloader.hex",
                                ".bin",
                                ".elf",
                                ".map",
                                ".partitions.bin",
                                ".bootloader.bin"
                            ]
                            for (let i = 0; i < binFileType.length; i++) {
                                let readFilePath = readPath + "/testArduino.ino" + binFileType[i];
                                let writeFilePath = writeDirPath + "/" + writeFileName + binFileType[i];
                                if (fs.existsSync(readFilePath)) {
                                    let binData = fs.readFileSync(readFilePath);
                                    fs.writeFileSync(writeFilePath, binData);
                                }
                            }
                            layer.msg(Msg.Lang['保存成功'], {
                                time: 1000
                            });
                        } catch (e) {
                            console.log(e);
                            statusBarTerminal.addValue(e + "\n");
                        }
                        layer.close(layerNum);
                    }, 500);
                },
                end: function () {
                    $('#mixly-loader-div').css('display', 'none');
                    $("layui-layer-shade" + layerNum).remove();
                    $("#mixly-loader-btn").off("click");
                }
            });
        }, 1000);
    });
}

ArduShell.showUploadBox = function (filePath) {
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    if (fs_plus.isDirectorySync(path.join(dirPath, fileName))) {
        filePath = path.join(dirPath, fileName, path.basename(filePath));
    }
    const layerNum = layer.msg(Msg.Lang['所打开文件可直接上传'], {
        time: -1,
        btn: [Msg.Lang['取消'], Msg.Lang['上传']],
        shade: LayerExt.SHADE_ALL,
        btnAlign: 'c',
        yes: function () {
            layer.close(layerNum);
            ArduShell.binFilePath = '';
            layer.msg(Msg.Lang['已取消上传'], {
                time: 1000
            });
        },
        btn2: function () {
            layer.close(layerNum);
            ArduShell.uploadWithBinOrHex(filePath);
        },
        end: function () {
            ArduShell.binFilePath = '';
        }
    });
}

ArduShell.uploadWithBinOrHex = function (filePath) {
    layer.closeAll();
    ArduShell.binFilePath = filePath;
    ArduShell.initUpload();
}

Nav.register({
    icon: 'icon-check',
    title: '',
    id: 'arduino-compile-btn',
    displayText: Blockly.Msg.MSG['compile'],
    preconditionFn: () => {
        const { SELECTED_BOARD } = Config;
        if (!goog.isElectron || !SELECTED_BOARD?.nav?.compile) {
            return false;
        }
        const workspace = Workspace.getMain();
        const { editorManager } = workspace;
        const editor = editorManager.getActiveEditor();
        if (!editor) {
            return false;
        }
        if (editor instanceof EditorMix) {
            return true;
        }
        return false;
    },
    callback: () => ArduShell.initCompile(),
    scopeType: Nav.Scope.LEFT,
    weight: 4
});

Nav.register({
    icon: 'icon-upload',
    title: '',
    id: 'arduino-upload-btn',
    displayText: Blockly.Msg.MSG['upload'],
    preconditionFn: () => {
        const { SELECTED_BOARD } = Config;
        if (!goog.isElectron || !SELECTED_BOARD?.nav?.compile || !SELECTED_BOARD?.nav?.upload) {
            return false;
        }
        const workspace = Workspace.getMain();
        const { editorManager } = workspace;
        const editor = editorManager.getActiveEditor();
        if (!editor) {
            return false;
        }
        if (editor instanceof EditorMix) {
            return true;
        }
        return false;
    },
    callback: () => ArduShell.initUpload(),
    scopeType: Nav.Scope.LEFT,
    weight: 5
});

});