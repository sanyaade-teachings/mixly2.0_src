goog.loadJs('web', () => {

goog.require('workerpool');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.FS');

const { FS } = Mixly.Web;

FS.pool = workerpool.pool('../common/modules/mixly-modules/workers/file-system-access.js', {
    workerOpts: {
        name: 'fileSystemAccess'
    },
    workerType: 'web'
});

FS.showOpenFilePicker = async () => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

FS.showDirectoryPicker = async () => {
    return new Promise((resolve, reject) => {
        window.showDirectoryPicker({
            mode: 'readwrite'
        })
        .then((filesystem) => {
            return FS.pool.exec('addFileSystemHandler', [filesystem]);
        })
        .then((folderPath) => {
            resolve(folderPath);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

FS.showSaveFilePicker = async () => {
    return new Promise((resolve, reject) => {
        
    });
}

FS.readFile = (path) => {
    // return fs_promise.readFile(path, { encoding: 'utf8' });
}

FS.writeFile = (data) => {
    // return fs_promise.writeFile(data, { encoding: 'utf8' });
}

FS.isFile = (path) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

FS.readDirectory = (path) => {
    return new Promise(async (resolve, reject) => {
        const [error, entries] = await FS.pool.exec('readdir', [path]);
        if (error) {
            reject(error);
        } else {
            resolve(entries);
        }
    });
}

FS.isDirectory = (path) => {
    return new Promise(async (resolve, reject) => {
        const [_, stats] = await FS.pool.exec('stat', [path]);
        if (stats.mode === 33188) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

FS.isDirectoryEmpty = async (path) => {
    return !(await FS.readDirectory(path) ?? []).length;
}

});