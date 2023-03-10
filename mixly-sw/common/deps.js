(() => {

goog.require('Mixly');
goog.require('Mixly.Env');
goog.provide('Mixly.Deps');

const { Env, Deps } = Mixly;

Deps.DEPENDENCY = {
    "electron": [],
    "web": [],
    "web-socket": {
        "electron": [],
        "web": [],
        "common": []
    },
    "web-compiler": {
        "electron": [],
        "web": [],
        "common": []
    },
    "node-modules": [],
    "common": [
        {
            "path": '/../board/common/ui/layui/layui.js',
            "provide": ['layui'],
            "require": []
        }, {
            "path": '/../board/common/ui/layui/extend/loading/loading.js',
            "provide": ['layui.loading'],
            "require": ['layui']
        }, {
            "path": '/../board/common/mixly/common/modules/lazyload.js',
            "provide": ['LazyLoad'],
            "require": []
        }, {
            "path": '/../board/common/mixly/common/local-storage.js',
            "provide": ['Mixly.LocalStorage'],
            "require": ['Mixly']
        }, {
            "path": '/../board/common/mixly/common/marray.js',
            "provide": ['Mixly.MArray'],
            "require": ['Mixly']
        }, {
            "path": '/../board/common/mixly/common/mjson.js',
            "provide": ['Mixly.MJSON'],
            "require": ['Mixly']
        }, {
            "path": '/../board/common/mixly/common/layer-ext.js',
            "provide": ['Mixly.LayerExt'],
            "require": ['layui', 'Mixly.Env', 'Mixly.Config', 'Mixly.DomOperator']
        }, {
            "path": '/../board/common/mixly/common/dom-operator.js',
            "provide": ['Mixly.DomOperator'],
            "require": ['Mixly.Config', 'Mixly.XML']
        }, {
            "path": '/../board/common/mixly/common/command.js',
            "provide": ['Mixly.Command'],
            "require": ['Mixly.Config', 'Mixly.MJSON']
        }, {
            "path": '/../board/common/mixly/electron/cloud-download.js',
            "provide": ['Mixly.CloudDownload'],
            "require": ['Mixly.Env', 'Mixly.Modules']
        }, {
            "path": '/../board/common/mixly/common/modules/store.modern.min.js',
            "provide": ['store'],
            "require": []
        }, {
            "path": '/../board/common/mixly/common/modules/select2.min.js',
            "provide": [],
            "require": []
        }, {
            "path": '/../board/common/mixly/common/modules/xterm.min.js',
            "provide": ['Terminal'],
            "require": []
        }
    ]
};

let depsJson = Mixly.Config.get(goog.normalizePath_(goog.basePath + Mixly.MIXLY_DIR_PATH + '/deps.json'), {});

Deps.DEPENDENCY["electron"] = [
    ...Deps.DEPENDENCY["electron"],
    ...depsJson["electron"]
];

Deps.DEPENDENCY["web"] = [
    ...Deps.DEPENDENCY["web"],
    ...depsJson["web"]
];

Deps.DEPENDENCY["common"] = [
    ...Deps.DEPENDENCY["common"],
    ...depsJson["common"]
];

Deps.DEPENDENCY["web-socket"]["common"] = [
    ...Deps.DEPENDENCY["web-socket"]["common"],
    ...depsJson["web-socket"]["common"]
];

Deps.DEPENDENCY["web-compiler"]["common"] = [
    ...Deps.DEPENDENCY["web-compiler"]["common"],
    ...depsJson["web-compiler"]["common"]
];

Deps.DEPENDENCY["web-socket"]["electron"] = [
    ...Deps.DEPENDENCY["web-socket"]["electron"],
    ...depsJson["web-socket"]["electron"]
];

Deps.DEPENDENCY["web-compiler"]["electron"] = [
    ...Deps.DEPENDENCY["web-compiler"]["electron"],
    ...depsJson["web-compiler"]["electron"]
];

Deps.DEPENDENCY["web-socket"]["web"] = [
    ...Deps.DEPENDENCY["web-socket"]["web"],
    ...depsJson["web-socket"]["web"]
];

Deps.DEPENDENCY["web-compiler"]["web"] = [
    ...Deps.DEPENDENCY["web-compiler"]["web"],
    ...depsJson["web-compiler"]["web"]
];

Deps.addDependency = (dependencyList) => {
    if (typeof dependencyList !== 'object') return;
    for (let i = 0; i < dependencyList.length; i++) {
        const googPath = dependencyList[i].path ?? null;
        const googProvide = dependencyList[i].provide ?? [];
        const googRequire = dependencyList[i].require ?? [];
        if (googPath && googProvide && googRequire)
            goog.addDependency(Mixly.MIXLY_DIR_PATH + googPath, googProvide, googRequire);
    }
}

Deps.initDependency = (dependency) => {
    if (typeof dependency !== 'object') return;
    let defaultDependency = {
        "electron": [],
        "web": [],
        "web-socket": {
            "electron": [],
            "web": [],
            "common": []
        },
        "web-compiler": {
            "electron": [],
            "web": [],
            "common": []
        },
        "common": []
    };

    let config = Object.assign(defaultDependency, dependency);

    //引入公共js文件
    Deps.addDependency(config["common"]);

    //判断当前是否在electron环境下
    if (Env.isElectron) {
        if (Env.hasSocketServer) {
            Deps.addDependency(config["web-socket"]["common"]);
            Deps.addDependency(config["web-socket"]["electron"]);
        } else if (Mixly.Env.hasCompiler) {
            Deps.addDependency(config["web-compiler"]["common"]);
            Deps.addDependency(config["web-compiler"]["electron"]);
        } else {
            Deps.addDependency(config["electron"]);
        }
    } else {
        if (Env.hasSocketServer) {
            Deps.addDependency(config["web-socket"]["common"]);
            Deps.addDependency(config["web-socket"]["web"]);
        } else if (Env.hasCompiler) {
            Deps.addDependency(config["web"]);
            Deps.addDependency(config["web-compiler"]["common"]);
            Deps.addDependency(config["web-compiler"]["web"]);
        } else {
            Deps.addDependency(config["web"]);
        }
    }
}

Deps.initDependency(Deps.DEPENDENCY);

goog.require('Mixly.Loading');
goog.require('layui');
goog.require('LazyLoad');
goog.require(Mixly.MIXLY_DIR_PATH + '/../board/common/mixly/common/modules/select2.min.js');
goog.require('Mixly.Msg');
goog.require('Mixly.XML');
goog.require('Mixly.Setting');
goog.require('Mixly.Interface');

if (Env.isElectron)
    goog.require('Mixly.Events');

})();