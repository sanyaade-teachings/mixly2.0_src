goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.provide('Mixly.Modules');

const { Env, Modules } = Mixly;

const loadNodeModules = () => {
    Modules.path = require('path');
    Modules.child_process = require("child_process");
    Modules.fs = require('fs');
    Modules.fs_extra = require('fs-extra');
    Modules.fs_extend = require('../../../common/modules/node-modules/fsExtend.js');
    Modules.compressing = require('compressing');
    Modules.json2md = require('json2md');
    Modules.electron = require('electron');
    Modules.chokidar = require('chokidar');
    Modules.clipboard = Modules.electron.clipboard;
    Modules.electron_localshortcut = require('electron-localshortcut');
    Modules.os = require('os');
    Modules.electron_remote = require('@electron/remote');
    const { electron_remote } = Modules;
    Modules.app = electron_remote.app;
    Modules.currentWebContents = electron_remote.getCurrentWebContents();
    Modules.currentWindow = electron_remote.getCurrentWindow();
    Modules.lodash_fp = require('lodash/fp');
    Modules.node_downloader_helper = require('node-downloader-helper');
    Env.currentPlatform = Modules.os.platform();
    const { path, fs_extend, app } = Modules;
    if (Env.currentPlatform === "darwin") {
        Env.clientPath = path.resolve(app.getPath("exe"), '../../../../');
    } else {
        Env.clientPath = path.resolve(app.getPath("exe"), '../');
    }
    Env.pyFilePath = path.resolve(Env.clientPath, 'mixpyBuild/mixly.py');
    if (Env.currentPlatform === 'win32') {
        Env.python3Path = path.resolve(Env.clientPath, 'mixpyBuild/win_python3/python3.exe');
    } else {
        Env.python3Path = '/usr/bin/python3';
        if (fs_extend.isfile('/usr/local/bin/python3')) {
            Env.python3Path = '/usr/local/bin/python3';
        }
    }
    
    Env.srcPath = path.resolve(Env.indexDirPath, '../');
}

Env.isElectron && loadNodeModules();

});