goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.FileTree');

const { FileTree, Electron } = Mixly;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');

class FileTreeExt extends FileTree {
    constructor(dom) {
        super(dom);
    }

    getContent(inPath) {
        let output = [];
        if (!fs_plus.isDirectorySync(inPath)) {
            return output;
        }

        const children = fs.readdirSync(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (fs_plus.isDirectorySync(dataPath)) {
                let hasChildren = false;
                if (fs.readdirSync(dataPath).length) {
                    hasChildren = true;
                }
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