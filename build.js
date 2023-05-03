const fs = require('fs');
const fs_extra = require('fs-extra');
const fs_extend = require('./common/modules/node-modules/fsExtend.js');
const path = require('path');

const config = {
    "workPath": __dirname,
    "fileIgnore": [
        path.resolve(__dirname, './common/modules/mixly-modules/mixly.min.js')
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

const match = (type, jsStr) => {
    let list = [];
    if (type === 'goog.require') {
        list = jsStr.match(/(?<=goog.require[\s]*\(["|'])[\w-.]+(?=["|'][\s]*\))/g);
    } else {
        list = jsStr.match(/(?<=goog.provide[\s]*\(["|'])[\w-.]+(?=["|'][\s]*\))/g);
    }
    if (list) {
        list = unique(list);
    }
    return list;
}

// 数组去重
const unique = (list) => {
    return Array.from(new Set(list));
}

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
        outputConfig = scan(needBuildDir, ignore);
        try {
            fs_extra.outputJsonSync(path.join(needBuildDir, 'deps.json'), outputConfig, {
                spaces: '    '
            });
            console.log(path.join(needBuildDir, 'deps.json') + '生成成功');
        } catch (error) {
            console.log(error);
        }
    }
}

generateDeps();