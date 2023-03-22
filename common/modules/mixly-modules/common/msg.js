(() => {

goog.require('Mixly.MJSON');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Blockly.Msg.ZhHans');
goog.require('Blockly.Msg.ZhHant');
goog.require('Blockly.Msg.En');
goog.provide('Mixly.Msg');

const {
    Msg,
    MJSON,
    Config,
    Env
} = Mixly;

const { USER } = Config;

const {
    ZhHans,
    ZhHant,
    En
} = Blockly.Msg;

Msg.LANG_PATH = {
    "zh-hans": Env.msgPath + "./mixly/zh-hans.json",
    "zh-hant": Env.msgPath + "./mixly/zh-hant.json",
    "en": Env.msgPath + "./mixly/en.json"
}

Msg.LANG = {
    "zh-hans": MJSON.get(Msg.LANG_PATH["zh-hans"]),
    "zh-hant": MJSON.get(Msg.LANG_PATH["zh-hant"]),
    "en": MJSON.get(Msg.LANG_PATH["en"])
}

Msg.nowLang = USER.language ?? 'zh-hans';

Msg.getLang = (str) => {
    return Msg.LANG[Msg.nowLang][str];
}

Msg.changeTo = (lang) => {
    Mixly.Msg.Lang = Msg.LANG[lang ?? 'zh-hans'];
    switch (lang) {
    case 'zh-hant':
        Blockly.Msg.Lang = ZhHant;
        break;
    case 'en':
        Blockly.Msg.Lang = En;
        break;
    default:
        Blockly.Msg.Lang = ZhHans;
    }
}

Msg.changeTo(Msg.nowLang);
console.log('Msg.LANG', Msg.LANG);

})();