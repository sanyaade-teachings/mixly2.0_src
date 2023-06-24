goog.loadJs('common', () => {

goog.require('tippy');
goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Msg');
goog.require('Mixly.Env');
goog.provide('Mixly.Example');

const {
    MFile,
    Title,
    XML,
    Editor,
    Msg,
    Env
} = Mixly;

const { dropdown, tree } = layui;

Mixly.Example = function (containerId, exampleBtnId) {
    this.DEPTH = 5;
    this.containerId_ = containerId;
    this.exampleBtnId_ = exampleBtnId;
    this.$container_ = $(`#${containerId}`);
    this.CTRL_BTN_TEMPLATE = goog.get(Env.templatePath + '/example-ctrl-btn.html');
    const template = XML.render(this.CTRL_BTN_TEMPLATE, {
        id: exampleBtnId,
        name: Msg.Lang['例程']
    });
    this.$container_.children().first().prepend(template);
    this.menuHTML = XML.render(XML.TEMPLATE_STR['EXAMPLE_MENU_DIV'], {
        id: this.exampleBtnId_,
        close: Msg.Lang['关闭窗口']
    });
    $('#' + this.exampleBtnId_).off().click(() => {
        if (this.menu
         && this.menu.length
         && !this.menu[0].state.isDestroyed) {
            if (this.menu[0].state.isShown) {
                this.menu[0].destroy();
                this.menu = null;
            } else {
                this.menu[0].show();
            }
        } else {
            this.render();
            this.menu[0].show();
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
                data: _this.getRoot(),
                id: `${_this.exampleBtnId_}-tree-dom`,
                accordion: true,
                anim: false,
                icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
                getChildren: function(obj) {
                    return _this.getChildren(obj.data.id);
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

Mixly.Example.prototype.getRoot = function () {
    
}

Mixly.Example.prototype.getChildren = function (inPath) {

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

});