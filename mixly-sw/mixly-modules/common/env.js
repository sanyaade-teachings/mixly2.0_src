(() => {
goog.require('Mixly');
goog.require('Mixly.Config');
goog.provide('Mixly.Env');
goog.provide('Mixly.Modules');

const { Env, Config, Modules } = Mixly;

const { SOFTWARE } = Config;

/**
  * 获取当前mixly2.0的路径
  * @type {String}
  */
Env.clientPath = null;

/**
  * 获取板卡index或主页面index的路径
  * @type {String} 
  */
Env.indexPath = null;

/**
  * 检测是否启用node服务器
  * @type {Boolean}
  */
Env.hasSocketServer = SOFTWARE?.webSocket?.enabled ? true : false;

/**
  * 检测是否启用node编译服务器
  * @type {Boolean}
  */
Env.hasCompiler = SOFTWARE?.webCompiler?.enabled ? true : false;

Env.thirdPartyBoardPath = './boards/extend';

if (goog.isElectron) {
    Modules.fs = require('fs');
    Modules.fs_extra = require('fs-extra');
    Modules.fs_plus = require('fs-plus');
    Modules.path = require('path');
    Modules.os = require('os');
    Modules.electron = require('electron');
    Modules.electron_remote = require('@electron/remote');
    Modules.node_downloader_helper = require('node-downloader-helper');
    Modules.adm_zip_iconv = require('adm-zip-iconv');
    Modules.compressing = require('compressing');
    Modules.json2md = require('json2md');

    const {
        fs_extra,
        fs_plus,
        path,
        os,
        electron_remote
    } = Modules;

    Env.currentPlatform = os.platform();
    Env.currentWindow = electron_remote.getCurrentWindow();
    const { app } = electron_remote;
    // 获取软件所在路径
    const { currentPlatform } = Env;
    if (currentPlatform === "darwin")
        Env.clientPath = path.resolve(app.getPath("exe"), '../../../../');
    else
        Env.clientPath = path.resolve(app.getPath("exe"), '../');
    if (Env.currentPlatform === "darwin" || Env.currentPlatform === "linux") {
        Env.python3Path = '/usr/bin/python3';
    } else {
        Env.python3Path = path.resolve(Env.clientPath, 'mixpyBuild/win_python3/python3.exe');
    }
    Env.thirdPartyBoardPath = path.resolve(__dirname, Env.thirdPartyBoardPath);
    // 获取当前index.html所在文件夹
    Env.indexPath = path.resolve(__dirname);

    Env.arduinoCliPath = path.resolve(Env.clientPath, './arduino-cli/');
    const cliFilePath = path.resolve(Env.arduinoCliPath, './arduino-cli' + (currentPlatform === 'win32'? '.exe':''));
    if (!fs_plus.isFileSync(cliFilePath)) {
        const defaultPath = SOFTWARE?.defaultPath[currentPlatform] ?? null;
        if (defaultPath?.arduinoCli) {
            Env.arduinoCliPath = path.resolve(Env.clientPath, defaultPath.arduinoCli, '../');
        } else {
            Env.arduinoCliPath = null;
        }
    }
}

})()