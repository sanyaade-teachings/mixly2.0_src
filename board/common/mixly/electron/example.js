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
goog.provide('Mixly.Electron.Example');

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

const { File, Example, BU } = Electron;

const { BOARD } = Config;

const {
    fs,
    fs_extend,
    fs_extra,
    path,
    app
} = Modules;

Example.DEPTH = 4;

Example.init = () => {
    const $footer = $('#mixly-footer');
    $footer.children().first().prepend(`
        <button
            id="mixly-examples"
            type="button"
            m-title="${indexText['例程']}"
            class="layui-btn layui-btn-xs layui-btn-primary m-btn"
            style="cursor:pointer;border:none;margin-left:15px;padding:0px;display:inline-flex;align-items:center;"
        >
            <a
                href="javascript:;"
                class="icon-doc-text"
                style="color:#fff;font-size:12px;line-height:12px;"
            >${indexText['例程']}</a>
        </button>
    `);
    Example.render();
}

Example.getExampleList = () => {
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

Example.render = () => {
    const inst = dropdown.render({
        elem: '#mixly-examples',
        content: `<div id="mixly-examples-tree" style="height:100%;width:100%;overflow:auto;"></div>`,
        className: 'layer-extend examples-dropdown',
        style: 'display:inline-block;box-shadow:1px 1px 30px rgb(0 0 0 / 12%);',
        ready: function() {
            const $treeDiv = $('#mixly-examples-tree');
            const $treeDivParent = $treeDiv.parent();
            $treeDivParent.css({
                'bottom': 'var(--footer-height)',
                'top': 'auto',
                'margin-bottom': '0px'
            });
            const examplesTree = tree.render({
                elem: '#mixly-examples-tree',
                data: Example.getExampleList(),
                id: 'mixly-examples-tree-dom',
                accordion: true,
                anim: false,
                icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
                getChildren: function(obj) {
                    return Example.getExamplesByPath(obj.data.id, '.mix');
                },
                click: function(obj) {
                    const offset = $treeDivParent.offset();
                    const height = $treeDiv.prop("scrollHeight");
                    const bodyHeight = $('body').height();
                    const bodyWidth = $('body').width();
                    offset.bottom = 23;
                    $treeDivParent.css({
                        'max-height': (bodyHeight - offset.bottom) + 'px',
                        'max-width': (bodyWidth - offset.left) + 'px'
                    });
                    if (obj.data.children)
                        return;
                    if (!fs_extend.isfile(obj.data.id))
                        return;
                    let data =fs.readFileSync(obj.data.id, 'utf8');
                    const extname = path.extname(obj.data.id);
                    Example.updateCode(extname, data);
                },
                statusChange: function() {
                    const offset = $treeDivParent.offset();
                    const height = $treeDiv.prop("scrollHeight");
                    const width = $treeDiv.prop("scrollWidth");
                    const bodyHeight = $('body').height();
                    const bodyWidth = $('body').width();
                    offset.bottom = 23;
                    if (bodyHeight < offset.bottom + height) {
                        $treeDivParent.css({
                            'height': (bodyHeight - offset.bottom) + 'px'
                        });
                    } else {
                        $treeDivParent.css({
                            'height': 'auto'
                        });
                    }
                    if (bodyWidth < offset.left + width) {
                        $treeDivParent.css('width', (bodyWidth - offset.left) + 'px');
                    } else {
                        $treeDivParent.css('width', 'auto');
                    }
                }
            });
            examplesTree.config.statusChange();
        }
    });
}

Example.updateCode = (extname, newData) => {
    switch (extname) {
        case '.mix':
        case '.xml':
            try {
                newData = XML.convert(newData, true);
                newData = newData.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                console.log(error);
            }
            MFile.parseMix($(newData), false, false, (message) => {
                Blockly.mainWorkspace.scrollCenter();
                Blockly.hideChaff();
            });
            break;
        case '.ino':
        case '.py':
            editor.setValue(newData, -1);
            break;
    }
    File.openedFilePath = null;
    Title.updateTitle(Title.title);
}

Example.getExamples = (dirPath, depth = 0) => {
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

Example.getExamplesByPath = (dirPath, fileExtname) => {
    let exampleList = [];
    if (fs_extend.isdir(dirPath)) {
        const dataList = fs.readdirSync(dirPath);
        for (let data of dataList) {
            const dataPath = path.resolve(dirPath, data);
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

})();