(() => {

goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.MJSON');
goog.require('Mixly.Example');
goog.require('Mixly.Boards');
goog.provide('Mixly.Web.ExampleExt');

const {
    Config,
    Env,
    Example,
    MJSON,
    Boards
} = Mixly;

const { BOARD } = Config;

class ExampleExt extends Example {
    constructor(containerId, exampleBtnId) {
        super(containerId, exampleBtnId);
        this.render();
    }

    getExampleList() {
        const { DIR_TREE } = ExampleExt;
        let exampleList = [];
        if ((DIR_TREE instanceof Object) && DIR_TREE[BOARD.boardType]) {
            exampleList = [{
                title: BOARD.boardType,
                id: BOARD.boardType,
                children: []
            }];
        }
        return exampleList;
    }

    getExamples(inPath) {
        const { DIR_TREE } = ExampleExt;
        const pathList = inPath.split('/');
        let obj = DIR_TREE;
        for (let key of pathList) {
            if (obj[key]) {
                obj = obj[key];
            } else {
                return [];
            }
        }
        if (!(obj instanceof Object)) {
            return [];
        }
        let exampleList = [];
        for (let key in obj) {
            const exampleObj = {
                title: key,
                id: inPath + '/' + key
            };
            if (obj[key] instanceof Object) {
                exampleObj.children = [];
            }
            exampleList.push(exampleObj);
        }
        return exampleList;
    }

    dataToWorkspace(inPath) {
        const data = goog.get(Config.pathPrefix + `../sample/${inPath}`);
        this.updateCode(inPath.substring(inPath.lastIndexOf('.')), data);
    }
}

Object.defineProperty(Mixly.Web, 'ExampleExt', {
    value: ExampleExt,
    writable: true,
    enumerable: true,
    configurable: true,
});

if (!Env.isElectron) {
    ExampleExt.DIR_TREE = MJSON.get(`../../../sample/${Boards.getType()}.json`) ?? [];
}

})();