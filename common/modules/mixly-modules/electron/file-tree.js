goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Electron.FS');
goog.provide('Mixly.Electron.FileTree');

const { FileTree, Electron } = Mixly;
const { FS } = Electron;

class FileTreeExt extends FileTree {
    constructor(element) {
        super(element);
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
}

Electron.FileTree = FileTreeExt;

});