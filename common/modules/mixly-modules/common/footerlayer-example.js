goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Env');
goog.require('Mixly.Debug');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerExample');

const {
    MFile,
    Title,
    XML,
    Editor,
    Env,
    Debug,
    FooterLayer
} = Mixly;

const { dropdown, tree } = layui;

class FooterLayerExample extends FooterLayer {
    static {
        // 弹层模板
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'footerlayer/footerlayer-example.html'));
    }

    constructor(domId) {
        super(domId, {
            onMount: (instance) => {
                this.examplesTree.reload({ data: this.getRoot() });
            }
        });
        this.$content.addClass('footer-layer-example');
        this.updateContent(FooterLayerExample.MENU_TEMPLATE);
        this.$treeBody = this.$body.children('.example-tree-body');
        this.DEPTH = 5;
        this.containerId = domId;
        this.render();
    }

    render() {
        this.examplesTree = tree.render({
            elem: this.$treeBody[0],
            data: this.getRoot(),
            accordion: true,
            anim: false,
            icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
            getChildren: (obj) => {
                return this.getChildren(obj.data.id);
            },
            click: (obj) => {
                if (obj.data.children) {
                    return;
                }
                this.dataToWorkspace(obj.data.id);
            },
            statusChange: () => {
                this.setProps({});
            }
        });
        this.examplesTree.config.statusChange();
    }

    // 可覆盖
    getRoot() {

    }

    // 可覆盖
    getChildren(inPath) {

    }

    // 可覆盖
    dataToWorkspace(inPath) {

    }

    updateCode(extname, data) {
        switch (extname) {
        case '.mix':
        case '.xml':
            try {
                data = XML.convert(data, true);
                data = data.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                Debug.error(error);
            }
            // 如果当前在代码区则先切换到模块区
            if (Editor.selected === 'CODE') {
                Editor.mainEditor.drag.full('POSITIVE');
            }
            MFile.parseMix($(data), false, false, (message) => {
                Editor.blockEditor.scrollCenter();
                Blockly.hideChaff();
            });
            break;
        case '.ino':
        case '.py':
            editor.setValue(data, -1);
            break;
        }
        Title.updateTitle(Title.title);
    }
}

Mixly.FooterLayerExample = FooterLayerExample;

});