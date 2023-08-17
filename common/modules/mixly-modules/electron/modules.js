goog.loadJs('electron', () => {

goog.require('Mixly.Env');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Modules');

const { Env, Electron } = Mixly;
const { Modules } = Mixly.Electron;

Modules.init = function () {
	this.path = require('path');
    this.child_process = require("child_process");
    this.fs = require('fs');
    this.fs_extra = require('fs-extra');
    this.fs_plus = require('fs-plus');
    this.compressing = require('compressing');
    this.json2md = require('json2md');
    this.electron = require('electron');
    this.chokidar = require('chokidar');
    this.electron_localshortcut = require('electron-localshortcut');
    this.os = require('os');
    this.electron_remote = require('@electron/remote');
    const { electron_remote } = Modules;
    this.app = electron_remote.app;
    this.currentWebContents = electron_remote.getCurrentWebContents();
    this.currentWindow = electron_remote.getCurrentWindow();
    this.lodash_fp = require('lodash/fp');
    this.node_downloader_helper = require('node-downloader-helper');
    this.iconv_lite = require('iconv-lite');
    this.python_shell = require('python-shell');

    Env.currentPlatform = this.os.platform();
    const { path, fs_plus, app } = Modules;
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
        if (fs_plus.isFileSync('/usr/local/bin/python3')) {
            Env.python3Path = '/usr/local/bin/python3';
        }
    }
    
    Env.srcDirPath = path.resolve(Env.indexDirPath, '../../../');
}

});