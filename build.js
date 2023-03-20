const fs = require('fs');
const fs_extra = require('fs-extra');
const fs_extend = require('./common/modules/node-modules/fsExtend.js');
const path = require('path');

const config = {
    "workPath": __dirname,
    "fileIgnore": [
    ],
    "dirIgnore": [
    ]
};

const needBuildDirList = [
    __dirname + '/mixly-sw/mixly-modules/',
    __dirname + '/common/modules/mixly-modules/'
];

const scan = (dir, ignore) => {
    let googList = [];
    const dirName = path.basename(dir);
    const dirIgnore = ignore?.dir ?? [];
    const fileIgnore = ignore?.file ?? [];
    if (!fs_extend.isdir(dir) || dirIgnore.includes(dir)) {
        return googList;
    }

    let childNames = fs.readdirSync(dir);
    for (let i = 0; i < childNames.length; i++) {
        let childPath = path.join(dir, childNames[i]);
        if (fs_extend.isfile(childPath)) {
            if (fileIgnore.includes(childPath)) {
                continue;
            }
            let jsStr = fs.readFileSync(childPath, 'utf8');
            let googObj = {};
            googObj.path = '/' + dirName + '/' + childNames[i];
            googObj.require = match('goog.require', jsStr);
            googObj.provide = match("goog.provide", jsStr);
            if (googObj.require || googObj.provide) {
                if (!googObj.require) {
                    googObj.require = [];
                }
                if (!googObj.provide) {
                    googObj.provide = [];
                }
                googList.push(googObj);
            }
        } else {
            googList = [...googList, ...scan(childPath, ignore)];
        }
    }

    return googList;
}

/*const addDeps = (obj, outputConfig) => {
    let electronObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['electron']]
    };
    electronObj.require = unique(electronObj.require);
    let webObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['web']]
    };
    webObj.require = unique(webObj.require);
    let websocketElectronObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['web-socket']['common'], ...obj['require']['web-socket']['electron']]
    };
    websocketElectronObj.require = unique(websocketElectronObj.require);
    let websocketWebObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['web-socket']['common'], ...obj['require']['web-socket']['web']]
    };
    websocketWebObj.require = unique(websocketWebObj.require);
    let webcompilerElectronObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['web-compiler']['common'], ...obj['require']['web-compiler']['electron']]
    };
    webcompilerElectronObj.require = unique(webcompilerElectronObj.require);
    let webcompilerWebObj = {
        'path': obj['path'],
        'provide': obj['provide'],
        'require': [...obj['require']['common'], ...obj['require']['web-compiler']['common'], ...obj['require']['web-compiler']['web']]
    };
    webcompilerWebObj.require = unique(webcompilerWebObj.require);
    outputConfig['electron'].push(electronObj);
    outputConfig['web'].push(webObj);
    outputConfig['web-socket']['electron'].push(websocketElectronObj);
    outputConfig['web-socket']['web'].push(websocketWebObj);
    outputConfig['web-compiler']['electron'].push(webcompilerElectronObj);
    outputConfig['web-compiler']['web'].push(webcompilerWebObj);
}*/

const match = (type, jsStr) => {
    let list = [];
    if (type === 'goog.require') {
        list = jsStr.match(/(?<=goog.require[\s]*\(["|'])[\w-.]+(?=["|'][\s]*\))/g);
    } else if (type === 'goog.provide') {
        list = jsStr.match(/(?<=goog.provide[\s]*\(["|'])[\w-.]+(?=["|'][\s]*\))/g);
    } else if (type === 'Mixly.require') {
        let strList = jsStr.match(/(?<=Mixly.require[\s]*\()[^)]+(?=\))/g);
        if (strList) {
            for (let i = 0; i < strList.length; i++) {
                if (!strList[i]) continue;
                try {
                    list.push(JSON.parse(strList[i]));
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    if (list)
        list = unique(list);
    return list;
}

// 数组去重
const unique = (list) => {
    return Array.from(new Set(list));
}

const formatJson = (json, options) => {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    }
    );
    return formatted;
};

const generateDeps = () => {
    for (let needBuildDir of needBuildDirList) {
        let fileIgnore = [];
        let dirIgnore = [];
        if (typeof config.fileIgnore === 'object') {
            for (let data of config.fileIgnore) {
                fileIgnore.push(path.resolve(needBuildDir, data));
            }
        }
        if (typeof config.dirIgnore === 'object') {
            for (let data of config.dirIgnore) {
                dirIgnore.push(path.resolve(needBuildDir, data));
            }
        }
        let outputConfig = [];
        console.log('deps.json生成中...');
        const ignore = {
            dir: dirIgnore,
            file: fileIgnore
        };
        outputConfig = scan(path.resolve(needBuildDir, 'common'), ignore);
        outputConfig = [
            ...scan(path.resolve(needBuildDir, 'electron'), ignore),
            ...outputConfig
        ];
        outputConfig = [
            ...scan(path.resolve(needBuildDir, 'web'), ignore),
            ...outputConfig
        ];
        outputConfig = [
            ...scan(path.resolve(needBuildDir, 'web-compiler'), ignore),
            ...outputConfig
        ];
        outputConfig = [
            ...scan(path.resolve(needBuildDir, 'web-socket'), ignore),
            ...outputConfig
        ];
        fs.writeFileSync(path.join(needBuildDir, 'deps.json'), formatJson(JSON.stringify(outputConfig)));
        console.log(path.join(needBuildDir, 'deps.json') + '生成成功');
    }
}

generateDeps();