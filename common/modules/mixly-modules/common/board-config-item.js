(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Modules');
goog.provide('Mixly.BoardConfigItem');

const {
    Env,
    Config,
    Modules
} = Mixly;

const { USER, BOARD } = Config;

class BoardConfigItem {
    /**
     * @param boardName {string} 板卡名
     * @param boardInfo {object} 某个板卡的配置信息
        ------------------------------------------
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
        }
        ------------------------------------------
        // 不支持
        "板卡名": {
            "key": "板卡key",
            "config": {
                "配置x的key": [
                    {
                        "key": "选项x的key",
                        "label": "选项x"
                    },
                    ...
                ],
                ...
            }
        }
        ------------------------------------------
        "板卡名": "板卡key"
        ------------------------------------------
     * 
     **/
    constructor(boardName, boardInfo) {
        this.name = boardName;
        this.config = { ...boardInfo.config };
        this.ignore = [];
        if (boardInfo instanceof String) {
            this.key = boardInfo;
        } else if (boardInfo instanceof Object) {
            this.key = boardInfo.key;
            this.ignore = boardInfo.ignore ?? [];
        } else {
            this.key = boardName;
        }
        this.generateOptions();
    }

    generateOptions() {
        this.options = [];
        this.selectedOptions = {};
        this.defaultOptions = {};
        this.optionsInfo = {};
        if (!(this.config instanceof Object)) {
            return;
        }
        for (let i in this.config) {
            let child = this.config[i];
            if (!(child.options instanceof Object)) {
                continue;
            }
            if (!child.options.length) {
                continue;
            }
            this.defaultOptions[child.key] = { ...child.options[0] };
            this.optionsInfo[child.key] = [];
            let childOptions = [];
            for (let j in child.options) {
                let childOption = child.options[j];
                if (!(childOption instanceof Object)) {
                    continue;
                }
                childOptions.push({
                    title: childOption.label,
                    id: childOption.key
                });
                this.optionsInfo[child.key].push(childOption.key);
            }
            this.options.push({
                name: child.label,
                key: child.key,
                options: childOptions
            })
        }
        this.selectedOptions = { ...this.defaultOptions };
    }

    setSelectedOptions(newOptions) {
        if (!(newOptions instanceof Object)) {
            return;
        }
        this.selectedOptions = this.selectedOptions ?? {};
        let optionsType = Object.keys(this.defaultOptions);
        for (let i in newOptions) {
            if (!optionsType.includes(i) 
             || !this.optionsInfo[i].includes(newOptions[i].key)) {
                continue;
            }
            this.selectedOptions[i] = { ...newOptions[i] };
        }
    }

    writeSelectedOptions = () => {
        if (!Env.isElectron) {
            return;
        }
        USER.board = USER.board ?? {};
        const { board } = USER;
        board[BOARD.boardType] = board[BOARD.boardType] ?? {};
        board[BOARD.boardType].key = this.key;
        board[BOARD.boardType].default = { ...this.selectedOptions };
        const { fs_extra, path } = Modules;
        try {
            fs_extra.outputJsonSync(path.resolve(Env.clientPath, 'setting/config.json'), USER, {
                spaces: '    '
            });
        } catch (error) {
            console.log(error);
        }
    }

    getCommandParam() {

    }
}

Mixly.BoardConfigItem = BoardConfigItem;

})();