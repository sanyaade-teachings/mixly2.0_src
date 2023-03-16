(() => {

goog.require('Mixly.Url');
goog.provide('Mixly.Config');

const { Url, Config } = Mixly;

/**
 * @function 获取对应路径下JSON数据
 * @param inPath {string} JSON文件的相对路径
 * @param defaultConfig {object} 默认的JSON配置信息
 * @return {object | null} 当对应路径下文件不存在时将返回null
 **/
Config.get = (path, defaultConfig = {}) => {
    let jsonStr = Mixly.get(path);
    try {
        // 去除JSON字符串中的注释
        jsonStr = jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
        return { ...defaultConfig, ...JSON.parse(jsonStr) };
    } catch (error) {
        console.log(error);
    }
    return defaultConfig;
}

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    const swDefaultConfig = {
        "version": "Mixly2.0",
        "board": {
            "url": "https://gitee.com/mixly2/cloud-libraries/raw/master/cloud-boards/boards.json"
        },
        "defaultPath": {
            "win32": {
                "arduinoCli": "None",
                "python3": "None"
            },
            "darwin": {
                "arduinoCli": "None",
                "python3": "None"
            },
            "linux": {
                "arduinoCli": "None",
                "python3": "None"
            }
        },
        "webSocket": {
            "enabled": false,
            "port": 8082,
            "protocol": "ws:"
        },
        "webCompiler": {
            "enabled": false,
            "port": 8082,
            "protocol": "http:"
        },
        "debug": false
    }
    Config.SOFTWARE = Mixly.getJSON('./sw-config.json', swDefaultConfig);
    console.log('Config.SOFTWARE:', Config.SOFTWARE);
    Config.BOARDS_INFO = Mixly.getJSON('./boards.json', {});
    console.log('Config.BOARDS_INFO:', Config.BOARDS_INFO);
    const boardPageConfig = Url.getConfig();
    Config.BOARD_PAGE = boardPageConfig ?? {};
    console.log('Config.BOARD_PAGE:', Config.BOARD_PAGE);
    document.title = Config.SOFTWARE.version ?? 'Mixly 2.0';
}

Config.init();

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true',
    boardIgnore: []
};

})();