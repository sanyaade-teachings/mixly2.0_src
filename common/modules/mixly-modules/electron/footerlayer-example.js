goog.loadJs('electron', () => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.Electron.File');
goog.provide('Mixly.Electron.FooterLayerExample');

const {
    Env,
    Config,
    Modules,
    MFile,
    Title,
    XML,
    FooterLayerExample,
    Electron
} = Mixly;

const { dropdown, tree } = layui;

const { File } = Electron;

const { BOARD } = Config;

const {
    fs,
    fs_extend,
    fs_extra,
    path,
    app
} = Modules;

class FooterLayerExampleExt extends FooterLayerExample {
    constructor(exampleBtnId) {
        super(exampleBtnId);
    }

    getRoot() {
        let exampleList = [];
        let samplePath;
        if (BOARD.thirdPartyBoard) {
            samplePath = path.resolve(Env.indexDirPath, 'examples');
        } else {
            samplePath = path.resolve(app.getAppPath(), 'src/sample', BOARD.boardType);
        }
        const sampleList = this.getExamplesByPath(samplePath, '.mix');
        if (sampleList.length) {
            exampleList.push({
                id: samplePath,
                title: BOARD.boardType,
                children: []
            });
        }
        const thirdPartyPath = path.resolve(Env.indexDirPath, 'libraries/ThirdParty');
        if (fs_extend.isdir(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let lib of libList) {
                const libPath = path.resolve(thirdPartyPath, lib);
                if (fs_extend.isfile(libPath))
                    continue;
                const examplesPath = path.resolve(libPath, 'examples');
                if (fs_extend.isfile(examplesPath))
                    continue;
                const thirdPartyList = this.getExamplesByPath(examplesPath, '.mix');
                if (thirdPartyList.length) {
                    exampleList.push({
                        id: examplesPath,
                        title: lib,
                        children: []
                    });
                }
            }
        }
        return exampleList;
    }

    getChildren(inPath) {
        return this.getExamplesByPath(inPath, '.mix');
    }

    dataToWorkspace(inPath) {
        if (!fs_extend.isfile(inPath)) {
            return;
        }
        const data = fs.readFileSync(inPath, 'utf8');
        const extname = path.extname(inPath);
        this.updateCode(extname, data);
        File.openedFilePath = null;
    }

    getExamplesByPath(inPath, fileExtname) {
        let exampleList = [];
        if (fs_extend.isdir(inPath)) {
            const dataList = fs.readdirSync(inPath);
            for (let data of dataList) {
                const dataPath = path.resolve(inPath, data);
                if (fs_extend.isdir(dataPath)) {
                    exampleList.push({ title: data, id: dataPath, children: [] });
                } else {
                    const extname = path.extname(data);
                    if (extname === fileExtname) {
                        exampleList.push({ title: data, id: dataPath });
                    }
                }
            }
        }
        return exampleList;
    }
}

Electron.FooterLayerExample = FooterLayerExampleExt;

});