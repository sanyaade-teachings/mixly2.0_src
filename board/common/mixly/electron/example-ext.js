(() => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Electron.BU');
goog.require('Mixly.Electron.File');
goog.provide('Mixly.Electron.ExampleExt');

const {
    Env,
    Config,
    Modules,
    MFile,
    Title,
    XML,
    Electron
} = Mixly;

const { dropdown, tree } = layui;

const { File, BU } = Electron;

const { BOARD } = Config;

const {
    fs,
    fs_extend,
    fs_extra,
    path,
    app
} = Modules;

class ExampleExt extends Example {
    constructor(containerId, exampleBtnId) {
        super(containerId, exampleBtnId);
        this.render();
    }

    getExampleList() {
        let exampleList = [];
        let samplePath;
        if (BOARD.thirdPartyBoard) {
            samplePath = path.resolve(Env.indexPath, 'examples');
        } else {
            samplePath = path.resolve(app.getAppPath(), 'src/sample', BOARD.boardName);
        }
        const sampleList = Example.getExamplesByPath(samplePath, '.mix');
        if (sampleList.length) {
            exampleList.push({
                id: samplePath,
                title: BOARD.boardName,
                children: []
            });
        }
        const thirdPartyPath = path.resolve(Env.indexPath, 'libraries/ThirdParty');
        if (fs_extend.isdir(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let lib of libList) {
                const libPath = path.resolve(thirdPartyPath, lib);
                if (fs_extend.isfile(libPath))
                    continue;
                const examplesPath = path.resolve(libPath, 'examples');
                if (fs_extend.isfile(examplesPath))
                    continue;
                const thirdPartyList = Example.getExamplesByPath(examplesPath, '.mix');
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

    getExamples(inPath) {
        depth++;
        let exampleList = [];
        if (fs_extend.isdir(dirPath)) {
            const dataList = fs.readdirSync(dirPath);
            for (let data of dataList) {
                const dataPath = path.resolve(dirPath, data);
                if (fs_extend.isdir(dataPath) && depth < Example.DEPTH) {
                    const childList = Example.getExamples(dataPath, depth);
                    if (!childList.length)
                        continue;
                    exampleList.push({
                        title: data,
                        id: dataPath,
                        children: childList
                    });
                } else {
                    exampleList.push({ title: data, id: dataPath });
                }
            }
        }
        return exampleList;
    }

    dataToWorkspace(inPath) {
        if (!fs_extend.isfile(inPath))
            return;
        const data = fs.readFileSync(inPath, 'utf8');
        const extname = path.extname(inPath);
        Example.updateCode(extname, data);
    }
}

Object.defineProperty(Mixly.Electron, 'ExampleExt', {
  value: ExampleExt,
  writable: true,
  enumerable: true,
  configurable: true,
});

})();