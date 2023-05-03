'use strict';

const pkg = require('./package.json');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const header = require('gulp-header');
const footer = require('gulp-footer');
const del = require('del');
const minimist = require('minimist');
const yargs = require('yargs');
const build_deps = require('./pkg/build-deps.js');
const path = require('path');
const fs_extra = require('fs-extra');

const NEED_BUILD_PATH = [
    './common/modules/mixly-modules/common',
    './common/modules/mixly-modules/electron',
    './common/modules/mixly-modules/web',
    './common/modules/mixly-modules/web-compiler',
    './common/modules/mixly-modules/web-socket'
];

const OUPUT_DEPS_PATH = './common/modules/mixly-modules/deps.json';

const genDeps = () => {
    let deps = [];
    for (let buildPath of NEED_BUILD_PATH) {
        buildPath = path.resolve(__dirname, buildPath);
        deps = [ ...deps, ...build_deps.generate(buildPath) ];
    }
    return deps;
}

let deps = genDeps(NEED_BUILD_PATH);
let provideList = [],
    requireList = [],
    requireFromOthersList = [];
for (let dep of deps) {
    provideList.push(...dep.provide);
    requireList.push(...dep.require);
}

const outputDeps = (deps) => {

}

provideList = Array.from(new Set(provideList));
requireList = Array.from(new Set(requireList));

for (let requireName of requireList) {
    if (provideList.includes(requireName)) {
        continue;
    }
    requireFromOthersList.push(requireName);
}

const getNodes = (obj) => {
    let nodeNum = 0;
    let nowNodes = [];
    let { hasProvide, nodes, load } = obj;
    for (let node of nodes) {
        let nowRequireList = [];
        let prevRequireList = node.require;
        for (let i of prevRequireList) {
            if (hasProvide.includes(i)) {
                continue;
            }
            nowRequireList.push(i);
        }
        if (nowRequireList.length) {
            nowNodes.push({
                path: node.path,
                require: nowRequireList,
                provide: node.provide
            });
        } else {
            nodeNum++;
            hasProvide.push(...node.provide);
            load.push(node.path);
        }
    }
    if (!nodeNum) {
        return {
            hasProvide,
            load,
            nodes: nowNodes
        };
    } else {
        return getNodes({
            hasProvide,
            nodes: nowNodes,
            load
        });
    }
    /*const children = getNodes({
        hasProvide,
        nodes: nowNodes,
        load
    });
    if (children) {
        return children;
    } else {
        return {
            hasProvide,
            load,
            nodes: nowNodes
        }
    }*/
}

let { load, hasProvide } = getNodes({
    hasProvide: [...requireFromOthersList],
    nodes: deps,
    load: []
});

let newProvide = [];
for (let data of hasProvide) {
    if (requireFromOthersList.includes(data)) {
        continue;
    }
    newProvide.push(data);
}

for (let i in load) {
    load[i] = path.resolve('./common/modules/mixly-modules', './' + load[i]);
}

const newDep = [
    {
        path: "/mixly.min.js",
        require: requireFromOthersList,
        provide: newProvide
    }
];

try {
    fs_extra.outputJsonSync(path.resolve('./common/modules/mixly-modules/deps.json'), newDep, {
        spaces: '    '
    });
    console.log('deps.json生成成功');
} catch (error) {
    console.log(error);
}

console.log(load);

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src(load)
        .pipe(concat('mixly.js'))
        // .pipe(gulp.dest('./common/modules/mixly-modules/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle:true}))
        .pipe(gulp.dest('./common/modules/mixly-modules/'));
})