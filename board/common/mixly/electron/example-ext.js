(() => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Example');
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
    Example,
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

const ExampleExt = function (containerId, exampleBtnId) {
    Example.call(this, containerId, exampleBtnId);
    this.render();
}

ExampleExt.prototype = Object.create(Example.prototype);
ExampleExt.constructor = ExampleExt;

ExampleExt.prototype.getExampleList = function () {
    let exampleList = [];
    let samplePath;
    if (BOARD.thirdPartyBoard) {
        samplePath = path.resolve(Env.indexPath, 'examples');
    } else {
        samplePath = path.resolve(app.getAppPath(), 'src/sample', BOARD.boardName);
    }
    const sampleList = this.getExamplesByPath(samplePath, '.mix');
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

ExampleExt.prototype.getExamples = function (inPath) {
    return this.getExamplesByPath(inPath, '.mix');
}

ExampleExt.prototype.dataToWorkspace = function (inPath) {
    if (!fs_extend.isfile(inPath)) {
        return;
    }
    const data = fs.readFileSync(inPath, 'utf8');
    const extname = path.extname(inPath);
    this.updateCode(extname, data);
}

ExampleExt.prototype.getExamplesByPath = function (inPath, fileExtname) {
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

Object.defineProperty(Mixly.Electron, 'ExampleExt', {
  value: ExampleExt,
  writable: true,
  enumerable: true,
  configurable: true,
});

})();