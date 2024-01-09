goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.FS');

const { FS } = Mixly.Electron;

const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const fs_promise = Mixly.require('node:fs/promises');
const electron_remote = Mixly.require('@electron/remote');
const { dialog, app } = electron_remote;

FS.showOpenFilePicker = () => {
    return new Promise((resolve, reject) => {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.focus();
        dialog.showOpenDialog(currentWindow, {
            title: '打开文件',
            defaultPath: File.workingPath,
            filters,
            properties: ['openFile', 'showHiddenFiles'],
            message: '打开文件'
        })
        .then(result => {
            const filePath = result.filePaths[0];
            if (filePath) {
                resolve(new File(filePath));
            } else {
                reject('file not found');
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

FS.showDirectoryPicker = () => {
    return new Promise((resolve, reject) => {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.focus();
        dialog.showOpenDialog(currentWindow, {
            title: '打开文件夹',
            // defaultPath: File.workingPath,
            // filters,
            properties: ['openDirectory', 'createDirectory'],
            message: '打开文件夹'
        })
        .then(result => {
            const folderPath = result.filePaths[0];
            if (folderPath) {
                resolve(folderPath);
            } else {
                resolve(null);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

FS.showSaveFilePicker = () => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

FS.readFile = (path) => {
    return fs_promise.readFile(path, { encoding: 'utf8' });
}

FS.writeFile = (data) => {
    return fs_promise.writeFile(data, { encoding: 'utf8' });
}

FS.isFile = (path) => {
    return new Promise((resolve, reject) => {
        resolve(fs_plus.isFileSync(path));
    });
}

FS.readDirectory = (path) => {
    return fs_promise.readdir(path);
}

FS.isDirectory = (path) => {
    return new Promise((resolve, reject) => {
        fs_plus.isDirectory(path, (status) => {
            resolve(status);
        });
    });
}

FS.isDirectoryEmpty = async (path) => {
    return !(await FS.readDirectory(path)).length;
}

});