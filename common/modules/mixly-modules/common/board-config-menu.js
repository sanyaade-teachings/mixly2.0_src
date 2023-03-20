(() => {

class BoardConfigMenu {
    /**
     * @param dom { string } 绑定dom的id
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
                ],
                "ignore": [
                    配置x的key,
                    ...
                ],
                "default": {
                    "配置x的key": "选项x的key",
                    ...
                }
            },
            ...
        }
     * @param defaultConfig {object} 板卡的默认配置
     * 
     * @return {obj}
     **/
    constructor(dom, config, defaultConfig) {
        if (typeof config !== 'object') {

        }
        this.board_ = null;
        this.menu_ = {};
        this.menuLayer_ = null;
        /*if (defaultConfig instanceof Object) {
            this.defaultConfig_ = defaultConfig;
        } else {
            this.defaultConfig_ = {};
        }
        for (let board in config) {
            this.menu_[board] = [];
            if (typeof(config[board]?.config) !== 'object') {
                continue;
            }
            const defaultBoardConfig = this.defaultConfig_[board];
            for (let item of config[board].config) {
                if (!(item instanceof Object)) {
                    continue;
                }
                if (!(item.options instanceof Array)) {
                    continue;
                }
                let options = [];
                for (let option of item) {

                }
            }
            this.menu_[board]
        }*/
        $('#' + dom).off().click(function() {
            if (this.menuLayer_?.length
             && !this.menuLayer_[0].state.isDestroyed) {
                if (this.menuLayer_[0].state.isShown) {
                    this.menuLayer_[0].destroy();
                    this.menuLayer_ = null;
                } else {
                    this.menuLayer_[0].show();
                }
            } else {
                this.showMenu();
                this.menuLayer_[0].show();
            }
        });
    }

    getOptionsByBoardName(name) {

    }

    showMenu() {
        
    }

    changeTo(board) {

    }
}
})();