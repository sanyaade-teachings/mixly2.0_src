(() => {

goog.require('Mixly.FooterLayer');
goog.require('Mixly.MArray');
goog.require('Mixly.Env');
goog.provide('Mixly.BoardConfigMenu');

const {
    FooterLayer,
    MArray,
    Env
} = Mixly;

class BoardConfigMenu {
    /**
     * @param domId { string } 绑定dom的id
     * @param config { obj } 板卡配置信息，结构如下所示
        {
            "板卡名": {
                "key": "板卡key",
                "config": [
                    {
                        "label": "配置x的描述信息",
                        "key": "配置x的key",
                        "options": [
                            {
                                "key": "选项x的key",
                                "label": "选项x"
                            },
                            ...
                        ]
                    },
                    ...
                ]
            },
            ...
        }
     * @return {obj}
     **/
    constructor(domId, config, defaultConfig) {
        if (typeof config !== 'object') {

        }
        this.containerId = domId;
        this.config = config;
        this.defaultConfig = defaultConfig || {};
        this.boardName = null;
        this.menu = {};
        this.menuLayer = null;
        this.template = goog.get(Env.templatePath + '/board-config-menu-div.html');
        // this.addClickEvent();
        this.buildIndex();
    }

    buildIndex() {
        this.boardNameToBoardKey = {};
        this.boardKeyToBoardName = {};
        this.boardsName = [];
        this.boardsKey = [];
        this.boardsInfo = {};
        for (let boardName in this.config) {
            const info = this.config[boardName];
            let boardKey, config, ignore;
            if (info instanceof String) {
                boardKey = info;
                config = [];
                ignore = [];
            } else if (info instanceof Object) {
                if (!info.key) {
                    continue;
                }
                boardKey = info.key;
                config = info.config || [];
                ignore = info.ignore || [];
            } else {
                continue;
            }
            this.boardsName.push(boardName);
            this.boardsKey.push(boardKey);
            this.boardNameToBoardKey[boardName] = boardKey;
            this.boardKeyToBoardName[boardKey] = boardName;
            this.boardsInfo[boardName] = {
                key: boardKey,
                config,
                ignore
            };
            this.defaultConfig[boardName] = this.defaultConfig[boardName] || {};
            for (let item of config) {
                let boardDefaultConfig = this.defaultConfig[boardName];
                let { key, options = [] } = item;
                // 如果某个配置项中没有任何选项则忽略这个配置
                if (!options.length) {
                    continue;
                }
                let defaultOption = options[0];
                if (!Object.keys(boardDefaultConfig).includes(item.key)) {
                    boardDefaultConfig[item.key] = { ...defaultOption };
                }
                for (let option of options) {
                    if (MArray.equals(option, boardDefaultConfig[item.key])) {
                        defaultOption = option;
                    }
                }
                boardDefaultConfig[item.key] = { ...defaultOption };
            }
        }
    }

    addClickEvent() {
        this.menuLayer = new FooterLayer(this.containerId, {
            tippy: {
                onMount(instance) {
                    $('#board-config-menu-reset').off().click(function() {
                        INFO[selectedBoardName].default = INFO[selectedBoardName].default ?? {};
                        for (let key in config) {
                            defaultConfig[key] = config[key][0].key;
                            $('#board-config-' + key).find('p').text(config[key][0].label);
                        }
                        linstance.setProps({});
                    });
                    Boards.renderConfigMenu(this.configMenu);
                },
                onHidden(instance) {
                    Boards.writeSelectedBoardConfig();
                }
            },
            onShow() {
                const selectedBoardName = Boards.getSelectedBoardName();
                const { INFO } = Boards;
                const { config, ignore, key } = INFO[selectedBoardName];
                INFO[selectedBoardName].default = INFO[selectedBoardName].default ?? {};
                const defaultConfig = INFO[selectedBoardName].default;
                let list = [];
                for (let key in config) {
                    let selectedConfig = defaultConfig[key] ?? config[key][0].label;
                    let options = [];
                    for (let i of config[key]) {
                        if (defaultConfig[key] && i.key === defaultConfig[key])
                            selectedConfig = i.label;
                        options.push({
                            title: i.label,
                            id: i.key
                        });
                    }
                    if (!defaultConfig)
                        selectedConfig = config[key][0].label;
                    list.push({
                        name: key,
                        label: selectedConfig,
                        options
                    });
                }
                const xmlStr = XML.render(this.template['BOARD_CONFIG_MENU_DIV'], {
                    list,
                    reset: Msg.Lang['使用默认配置'],
                    close: Msg.Lang['关闭窗口']
                });
                this.menuLayer.list = list;
                this.menuLayer.updateContent(xmlStr);
            }
        });
    }

    getOptionsByBoardName(name) {

    }

    showMenu() {
        
    }

    renderMenu() {

    }

    resetOptions() {

    }

    renderOptions() {
        const boardName = this.boardName;
        for (let item of optionList) {
            dropdown.render({
                elem: '#board-config-' + item.name,
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
                    Boards.INFO[boardName].default[item.name] = data.id;
                    Boards.configMenu.layer[0].setProps({});
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
        this.menuLayer.updateContent(xmlStr);
    }

    changeTo(boardName) {
        if (this.boardName === boardName) {
            return;
        }

    }
}

Mixly.BoardConfigMenu = BoardConfigMenu;

})();