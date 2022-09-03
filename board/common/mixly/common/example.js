(() => {

goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.provide('Mixly.Example');

const {
    MFile,
    Title,
    XML
} = Mixly;

const { dropdown, tree } = layui;

Mixly.Example = function (containerId, exampleBtnId) {
    this.DEPTH = 5;
    this.containerId_ = containerId;
    this.exampleBtnId_ = exampleBtnId;
    this.$container_ = $(`#${containerId}`);
    this.$container_.children().first().prepend(`
        <button
            id="${exampleBtnId}"
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
}

Mixly.Example.prototype.render = function () {
    const _this = this;
    this.dropdownId_ = dropdown.render({
        elem: '#' + _this.exampleBtnId_,
        content: `<div id="${_this.exampleBtnId_}-tree" style="height:100%;width:100%;overflow:auto;"></div>`,
        className: 'layer-extend examples-dropdown',
        style: 'display:inline-block;box-shadow:1px 1px 30px rgb(0 0 0 / 12%);',
        ready: function() {
            const $treeDiv = $(`#${_this.exampleBtnId_}-tree`);
            const $treeDivParent = $treeDiv.parent();
            $treeDivParent.css({
                'bottom': 'var(--footer-height)',
                'top': 'auto',
                'margin-bottom': '0px'
            });
            _this.examplesTree_ = tree.render({
                elem: `#${_this.exampleBtnId_}-tree`,
                data: _this.getExampleList(),
                id: `${_this.exampleBtnId_}-tree-dom`,
                accordion: true,
                anim: false,
                icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
                getChildren: function(obj) {
                    return _this.getExamples(obj.data.id);
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
                    _this.dataToWorkspace(obj.data.id);
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
            _this.examplesTree_.config.statusChange();
        }
    });
}

Mixly.Example.prototype.getExampleList = function () {
    
}

Mixly.Example.prototype.getExamples = function (inPath) {

}

Mixly.Example.prototype.dataToWorkspace = function (inPath) {

}

Mixly.Example.prototype.updateCode = (extname, data) => {
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
            MFile.parseMix($(data), false, false, (message) => {
                Blockly.mainWorkspace.scrollCenter();
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

})();