goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Electron.FS');
goog.provide('Mixly.Electron.FileTree');

const { FileTree, Electron } = Mixly;
const { FS } = Electron;

const chokidar = Mixly.require('chokidar');

class FileTreeExt extends FileTree {
    constructor(element) {
        super(element);
        this.watcher = null;
    }

    async getContent(inPath) {
        let output = [];
        const status = await FS.isDirectory(inPath);
        if (!status) {
            return output;
        }
        const children = await FS.readDirectory(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (await FS.isDirectory(dataPath)) {
                const isDirEmtpy = await FS.isDirectoryEmpty(dataPath);
                output.push({
                    type: 'dir',
                    id: dataPath,
                    children: !isDirEmtpy
                });
            } else {
                output.push({
                    type: 'file',
                    id: dataPath,
                    children: false
                });
            }
        }
        return output;
    }

    setFolderPath(folderPath) {
        if (this.watcher) {
            this.watcher.close().then(() => {
                this.watcher = null;
                super.setFolderPath(folderPath);
                this.watchFolder(folderPath);
            });
            return;
        }
        super.setFolderPath(folderPath);
        this.watchFolder(folderPath);
    }

    watchFolder(folderPath) {
        this.watcher = chokidar.watch(path.join(folderPath), {
            persistent: true,
            // ignored: /(^|[\/\\])\../,
            depth: 0,
            ignoreInitial: true,
        });
        this.watcher.on('add', (path, stats) => {
            console.log('add', path, stats);
        });

        this.watcher.on('addDir', (path, stats) => {
            console.log('addDir', path, stats);
        });

        this.watcher.on('unlink', (path, stats) => {
            console.log('unlink', path, stats);
        });

        this.watcher.on('unlinkDir', (path, stats) => {
            console.log('unlinkDir', path, stats);
        });
    }
}

Electron.FileTree = FileTreeExt;

});