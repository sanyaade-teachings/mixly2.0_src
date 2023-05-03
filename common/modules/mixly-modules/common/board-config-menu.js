(() => {

goog.require('layui');
goog.require('tippy');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.MArray');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.provide('Mixly.BoardConfigMenu');

const {
    FooterLayer,
    MArray,
    Env,
    XML,
    Msg
} = Mixly;

const { dropdown } = layui;

class BoardConfigMenu extends FooterLayer {
    /**
     * @param domId { string } 绑定dom的id
     * @param boardsInfo { obj } 板卡配置信息
        {
            "xxx板卡": BoardConfigItem,
            ...
        }
     * @return { BoardConfigMenu obj }
     **/
    constructor(domId, boardsInfo) {
        super(domId, {
            onMount: (instance) => {
                this.renderMenu(instance);
                $('#board-config-menu-reset').off().click(() => {
                    const selectedBoardName = this.boardName;
                    let { defaultOptions } = this.boardsInfo[selectedBoardName];
                    this.setSelectedOptions(instance, defaultOptions);
                });
            },
            onHidden: (instance) => {
                this.boardsInfo[this.boardName].writeSelectedOptions();
            }
        });
        this.containerId = domId;
        this.boardsInfo = boardsInfo;
        this.boardName = null;
        this.template = goog.get(Env.templatePath + '/board-config-menu-div.html');
    }

    getOptionsByBoardName(name) {

    }

    renderMenu(instance) {
        const selectedBoardName = this.boardName;
        let { options, selectedOptions } = this.boardsInfo[selectedBoardName];
        this.renderTemplate(options);
        this.setSelectedOptions(instance, selectedOptions);
        this.renderOptions(instance, options);
    }

    setSelectedOptions(instance, selectedOptions) {
        // 每次打开板卡设置窗口时设置其默认选中项
        const selectedBoardName = this.boardName;
        const boardsInfo = this.boardsInfo[selectedBoardName];
        let optionsType = Object.keys(boardsInfo.defaultOptions);
        for (let i in selectedOptions) {
            let label = boardsInfo.defaultOptions[i].label;
            if (boardsInfo.optionIsLegal(i, selectedOptions[i])) {
                label = selectedOptions[i].label;
            }
            $('#board-config-' + i).find('p').text(label);
            boardsInfo.setSelectedOption(i, selectedOptions[i]);
        }
        // 重新计算窗口的位置
        instance.setProps({});
    }

    renderOptions(instance, options) {
        const boardName = this.boardName;
        const _this = this;
        for (let item of options) {
            dropdown.render({
                elem: '#board-config-' + item.key,
                align: 'right',
                data: item.options,
                anywhereClose: true,
                className: 'scrollbar1 editor-dropdown-menu board-config-menu',
                style: 'display:inline-block;box-shadow:1px 1px 30px rgb(0 0 0 / 12%);',
                ready: function(elemPanel, elem) {
                    const $elemPanel = $(elemPanel);
                    const $elem = $(elem);
                    $elemPanel.css({
                        'left': 'auto',
                        'right': 'calc(100vw - ' + ($elem.offset().left + $elem.outerWidth()) + 'px)',
                        'min-width': $elem.outerWidth() + 'px'
                    });
                    const $p = $elem.find('p');
                    const $lis = $elemPanel.find('li');
                    for (let i = 0; $lis[i]; i++) {
                        const $div = $($lis[i]).children('div');
                        if ($div.text() === $p.text()) {
                            $($lis[i]).css('background-color', '#5FB878');
                            $div.css('color', '#fff');
                        }
                    }
                },
                click: function(data, othis) {
                    const $elem = $(this.elem);
                    const $p = $elem.children('p');
                    $p.text(data.title);
                    _this.boardsInfo[boardName].selectedOptions[item.key] = {
                        key: data.id,
                        label: data.title
                    };
                    instance.setProps({});
                }
            });
        }
    }

    renderTemplate(options) {
        const xmlStr = XML.render(this.template, {
            options,
            reset: Msg.Lang['使用默认配置'],
            close: Msg.Lang['关闭窗口']
        });
        this.updateContent(xmlStr);
    }

    changeTo(boardName) {
        if (this.boardName === boardName) {
            return;
        }
        if (this.boardsInfo[boardName] && this.boardsInfo[boardName].options.length) {
            $('#' + this.containerId).css('display', 'inline-flex');
        } else {
            $('#' + this.containerId).css('display', 'none');
        }
        this.boardName = boardName;
        this.destroy();
    }
}

Mixly.BoardConfigMenu = BoardConfigMenu;

})();