(() => {

goog.require('tippy');
goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Msg');
goog.provide('Mixly.Example');

const {
    MFile,
    Title,
    XML,
    Editor,
    Msg
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
            m-title="${Msg.Lang['例程']}"
            class="layui-btn layui-btn-xs layui-btn-primary m-btn"
            style="cursor:pointer;border:none;margin-left:7px;padding:3px;display:inline-flex;align-items:center;"
        >
            <a
                class="icon-doc-text"
                style="color:#fff;font-size:12px;line-height:12px;"
            >${Msg.Lang['例程']}</a>
        </button>
    `);
    _this = this;
    _this.menuHTML = XML.render(XML.TEMPLATE_STR['EXAMPLE_MENU_DIV'], {
        id: _this.exampleBtnId_,
        close: Msg.Lang['关闭窗口']
    });
    $('#' + _this.exampleBtnId_).off().click(function() {
        if (_this.menu
         && _this.menu.length
         && !_this.menu[0].state.isDestroyed) {
            if (_this.menu[0].state.isShown) {
                _this.menu[0].destroy();
                _this.menu = null;
            } else {
                _this.menu[0].show();
            }
        } else {
            _this.render();
            _this.menu[0].show();
        }
    });
}

Mixly.Example.prototype.render = function () {
    const _this = this;
    _this.menu = tippy('#' + _this.exampleBtnId_, {
        allowHTML: true,
        content: _this.menuHTML,
        trigger: 'manual',
        interactive: true,
        hideOnClick: false,
        maxWidth: 'none',
        offset: [ 0, 6 ],
        onMount(instance) {
            $(`#${_this.exampleBtnId_}-tree-colse`).off().click(function() {
                _this.menu[0].destroy();
                _this.menu = null;
            });
            _this.examplesTree_ = tree.render({
                elem: `#${_this.exampleBtnId_}-tree-body`,
                data: _this.getExampleList(),
                id: `${_this.exampleBtnId_}-tree-dom`,
                accordion: true,
                anim: false,
                icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
                getChildren: function(obj) {
                    return _this.getExamples(obj.data.id);
                },
                click: function(obj) {
                    if (obj.data.children)
                        return;
                    _this.dataToWorkspace(obj.data.id);
                },
                statusChange: function() {
                    _this.menu[0].setProps({});
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

})();