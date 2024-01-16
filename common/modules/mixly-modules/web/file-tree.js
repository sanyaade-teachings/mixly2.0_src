goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.Web.FileTree');

const { FileTree, Web } = Mixly;
const { FS } = Web;

class FileTreeExt extends FileTree {
    constructor(element, mprogress) {
        super(element, mprogress, FS);
    }

    async getContent(inPath) {
        const status = await FS.isDirectory(inPath);
        let output = [];
        if (!status) {
            return output;
        }
        const children = await FS.readDirectory(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (await FS.isDirectory(dataPath)) {
                const isDirEmpty = await FS.isDirectoryEmpty(dataPath);
                output.push({
                    type: 'folder',
                    id: dataPath,
                    children: !isDirEmpty
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

Web.FileTree = FileTreeExt;

});