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
        const rePath = '/' + path.relative(this.getFolderPath(), inPath);
        const status = await FS.isDirectory(rePath);
        let output = [];
        if (!status) {
            return output;
        }
        const children = await FS.readDirectory(rePath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            const reDataPath = path.join(rePath, data);
            if (await FS.isDirectory(reDataPath)) {
                const isDirEmpty = await FS.isDirectoryEmpty(reDataPath);
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