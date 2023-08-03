goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerBoardConfig');

const {
    FooterLayer,
    Env,
    XML,
    Msg,
} = Mixly;

const { dropdown } = layui;

class FooterLayerBoardConfig extends FooterLayer {
    // 弹层模板
    static MENU_TEMPLATE = goog.get(Env.templatePath + '/footerlayer-board-config.html');

    /**
     * @param domId { string } 绑定dom的id
     * @param boardsInfo { obj } 板卡配置信息
        {
            "xxx板卡": BoardConfigItem,
            ...
        }
     * @return { FooterLayerBoardConfig obj }
     **/
    constructor(id, boardsInfo) {
        super(id, {
            onHidden: (instance) => {
                this.boardsInfo[this.boardName].writeSelectedOptions();
            },
            onMount: (instance) => {
                if (this.renderBoardName === this.boardName) {
                    return;
                }
                this.renderMenu();
            },
            btns: [
                {
                    class: 'reset',
                    title: Msg.Lang['使用默认配置'],
                    icon: 'layui-icon-refresh-1',
                    onclick: () => {
                        const selectedBoardName = this.boardName;
                        let { defaultOptions } = this.boardsInfo[selectedBoardName];
                        this.setSelectedOptions(defaultOptions);
                    }
                }
            ]
        });
        this.$content.addClass('footer-layer-board-config');
        this.containerId = id;
        this.$footerContainer = $(`#${id}`);
        this.boardsInfo = boardsInfo;
        // 当前用户所选择的板卡
        this.boardName = null;
        // 当前渲染的板卡配置所对应的板卡名
        this.renderBoardName = null;
        this.dropdownItems = {};
    }

    getSelectedOptions() {
        const selectedBoardName = this.boardName;
        let { selectedOptions } = this.boardsInfo[selectedBoardName];
        return selectedOptions;
    }

    getSelectedParams() {
        let options = this.getSelectedOptions();
        let paramList = [];
        for (let i in options) {
            paramList.push(i + '=' + options[i].key);
        }
        let { boardKey } = this;
        const index = key.indexOf('@');
        if (index !== -1) {
            boardKey = boardKey.substring(0, index);
        }
        return paramList.length ? (boardKey + ':' + paramList.join(',')) : boardKey;
    }

    getSelectedParamByName(name) {
        let options = this.getSelectedOptions();
        for (let i in options) {
            if (i === name) {
                return options[i].key;
            }
        }
        return '';
    }

    renderMenu() {
        let { options, selectedOptions } = this.boardsInfo[this.boardName];
        this.renderTemplate(options);
        this.setSelectedOptions(selectedOptions);
        this.renderOptions(options);
        this.renderBoardName = this.boardName
    }

    setSelectedOptions(selectedOptions) {
        // 每次打开板卡设置窗口时设置其默认选中项
        const boardsInfo = this.boardsInfo[this.boardName];
        let optionsType = Object.keys(boardsInfo.defaultOptions);
        for (let i in selectedOptions) {
            let label = boardsInfo.defaultOptions[i].label;
            if (boardsInfo.optionIsLegal(i, selectedOptions[i])) {
                label = selectedOptions[i].label;
            }
            this.$body.find(`[mid=${i}]`).find('p').text(label);
            boardsInfo.setSelectedOption(i, selectedOptions[i]);
        }
        // 重新计算窗口的位置
        this.setProps({});
    }

    renderOptions(options) {
        const _this = this;
        for (let item of options) {
            this.createDropdownMenu(item.key, item.options);
            this.createMessageLayer(item.key, item.messageId);
        }
    }

    createMessageLayer(mId, messageId) {
        if (!messageId) {
            return;
        }
        if (!Blockly.Msg[messageId]) {
            return;
        }
        let $container = this.$body.find(`[mid="${mId}-label"]`);
        tippy($container[0], {
            content: Blockly.Msg[messageId],
            allowHTML: true,
            interactive: true,
            placement: 'left',
            offset: [ 0, 21 ]
        });
    }

    createDropdownMenu(mId, options) {
        let $container = this.$body.find(`[mid="${mId}"]`);
        if (!$container.length) {
            return;
        }
        const boardName = this.boardName;
        let _this = this;
        let config = {
            elem: $container[0],
            align: 'right',
            data: options,
            anywhereClose: true,
            className: 'mixly-scrollbar editor-dropdown-menu board-config-menu',
            style: 'display:inline-block;box-shadow:1px 1px 30px rgb(0 0 0 / 12%);',
            ready: (elemPanel, elem) => {
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
                        let $li = $($lis[i]);
                        $li.addClass('selected');
                        $div.css('color', '#fff');
                    }
                }
            },
            click: function(data, othis) {
                const $elem = $(this.elem);
                const $p = $elem.children('p');
                $p.text(data.title);
                _this.boardsInfo[boardName].setSelectedOption(mId, {
                    key: data.id,
                    label: data.title
                });
                _this.setProps({});
            }
        };
        this.dropdownItems[mId] = dropdown.render(config);
    }

    renderTemplate(options) {
        const xmlStr = XML.render(FooterLayerBoardConfig.MENU_TEMPLATE, { options });
        this.updateContent(xmlStr);
    }

    changeTo(boardName) {
        if (this.boardsInfo[boardName]?.options.length) {
            this.$footerContainer.css('display', 'inline-flex');
        } else {
            this.$footerContainer.css('display', 'none');
            this.hide();
        }
        this.boardName = boardName;
        this.boardKey = this.boardsInfo[boardName].key;
        this.renderMenu(this.layer);
    }
}

Mixly.FooterLayerBoardConfig = FooterLayerBoardConfig;

});