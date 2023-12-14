goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Electron.FS');
goog.provide('Mixly.Electron.FileTree');

const { FileTree, Electron } = Mixly;
const { FS } = Electron;

class FileTreeExt extends FileTree {
    constructor(dom) {
        super(dom);
    }

    async getContent(inPath) {
        const status = await FS.isDirectory(inPath);
        if (!status) {
            return output;
        }
        let output = [];
        const children = await FS.readDirectory(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (await FS.isDirectory(dataPath)) {
                const hasChildren = !!(await FS.readDirectory(dataPath)).length;
                output.push({
                    type: 'dir',
                    id: dataPath,
                    children: hasChildren
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