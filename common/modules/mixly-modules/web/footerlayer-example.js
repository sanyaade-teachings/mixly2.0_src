goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.MJSON');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.Boards');
goog.provide('Mixly.Web.FooterLayerExample');

const {
    Config,
    Env,
    FooterLayerExample,
    MJSON,
    Boards,
    Web
} = Mixly;

const { BOARD } = Config;

class FooterLayerExampleExt extends FooterLayerExample {
    static DIR_TREE = MJSON.get(path.join(Env.indexDirPath, `../sample/${Boards.getType()}.json`)) ?? [];

    constructor(exampleBtnId) {
        super(exampleBtnId);
    }

    getRoot() {
        const { DIR_TREE } = FooterLayerExampleExt;
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

    getChildren(inPath) {
        const { DIR_TREE } = FooterLayerExampleExt;
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
            if (!(obj[key] instanceof Object)) {
                continue;
            }
            const exampleObj = {
                title: obj[key]['__name__'],
                id: inPath + '/' + key
            };
            if (!obj[key]['__file__']) {
                exampleObj.children = [];
            }
            exampleList.push(exampleObj);
        }
        return exampleList;
    }

    dataToWorkspace(inPath) {
        const data = goog.get(Config.pathPrefix + `sample/${inPath}`);
        this.updateCode(inPath.substring(inPath.lastIndexOf('.')), data);
    }
}

Web.FooterLayerExample = FooterLayerExampleExt;

});