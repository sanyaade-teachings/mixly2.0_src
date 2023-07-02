goog.loadJs('common', () => {

goog.require('tippy');
goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Msg');
goog.require('Mixly.Env');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerExample');

const {
    MFile,
    Title,
    XML,
    Editor,
    Msg,
    Env,
    FooterLayer
} = Mixly;

const { dropdown, tree } = layui;

class FooterLayerExample extends FooterLayer {
    constructor(domId) {
        super(domId, {
            onMount: (instance) => {
                this.render(instance);
            }
        });
        this.DEPTH = 5;
        this.containerId = domId;
        this.menuHTML = XML.render(XML.TEMPLATE_STR['EXAMPLE_MENU_DIV'], {
            id: this.containerId,
            close: Msg.Lang['关闭窗口']
        });
    }

    render(instance) {
        this.setContent(this.menuHTML);
        this.examplesTree = tree.render({
            elem: `#${this.containerId}-tree-body`,
            data: this.getRoot(),
            id: `${this.containerId}-tree-dom`,
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
                instance.setProps({});
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
                console.log(error);
            }
            // 如果当前在代码区则先切换到模块区
            if (Editor.selected === 'CODE') {
                Editor.items.vDrag.full('POSITIVE');
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