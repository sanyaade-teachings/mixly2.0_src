goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.Web.FileTree');

const { FileTree, Web } = Mixly;
const { FS } = Web;

class FileTreeExt extends FileTree {
    constructor(dom) {
        super(dom);
    }

    async getContent(inPath) {
        const rePath = '/' + path.relative('/test', inPath);
        const status = await FS.isDirectory(rePath);
        if (!status) {
            return output;
        }
        let output = [];
        const children = await FS.readDirectory(rePath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            const reDataPath = path.join(rePath, data);
            if (await FS.isDirectory(reDataPath)) {
                const hasChildren = !!((await FS.readDirectory(reDataPath)) ?? []).length;
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

Web.FileTree = FileTreeExt;

});