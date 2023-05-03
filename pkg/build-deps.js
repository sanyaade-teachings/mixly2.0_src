const fs = require('fs');
const fs_extra = require('fs-extra');
const fs_extend = require('../common/modules/node-modules/fsExtend.js');
const path = require('path');

const scan = (dir, ignore = {}) => {
    let googList = [];
    const dirName = path.basename(dir);
    const dirIgnore = ignore?.dir ?? [];
    const fileIgnore = ignore?.file ?? [];
    if (!fs_extend.isdir(dir) || dirIgnore.includes(dir)) {
        return googList;
    }

    let childrenName = fs.readdirSync(dir);
    for (let i = 0; i < childrenName.length; i++) {
        let childPath = path.join(dir, childrenName[i]);
        if (fs_extend.isfile(childPath)) {
            if (fileIgnore.includes(childPath)) {
                continue;
            }
            let jsStr = fs.readFileSync(childPath, 'utf8');
            let googObj = {};
            googObj.path = '/' + dirName + '/' + childrenName[i];
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

const generate = (needBuildDir) => {
    let outputConfig = [];
    outputConfig = scan(needBuildDir);
    return outputConfig
}

module.exports = {
    generate: generate
};