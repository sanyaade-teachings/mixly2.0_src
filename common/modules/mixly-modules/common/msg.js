goog.loadJs('common', () => {

goog.require('Mixly.MJSON');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Blockly');
goog.require('Blockly.Lang.ZhHans');
goog.require('Blockly.Lang.ZhHant');
goog.require('Blockly.Lang.En');
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
} = Blockly.Lang;

Msg.PATH = {
    "zh-hans": Env.msgPath + "./mixly/zh-hans.json",
    "zh-hant": Env.msgPath + "./mixly/zh-hant.json",
    "en": Env.msgPath + "./mixly/en.json"
}

Msg.LANG = {
    "zh-hans": MJSON.get(Msg.PATH["zh-hans"]),
    "zh-hant": MJSON.get(Msg.PATH["zh-hant"]),
    "en": MJSON.get(Msg.PATH["en"])
}

Msg.nowLang = USER.language ?? 'zh-hans';

Msg.getLang = (str) => {
    return Msg.LANG[Msg.nowLang][str];
}

Msg.changeTo = (lang) => {
    Mixly.Msg.Lang = Msg.LANG[lang ?? 'zh-hans'];
    let newMsg;
    switch (lang) {
    case 'zh-hant':
        newMsg = ZhHant;
        break;
    case 'en':
        newMsg = En;
        break;
    default:
        newMsg = ZhHans;
    }
    for (let key in newMsg) {
        Blockly.Msg[key] = newMsg[key];
    }
}

Msg.changeTo(Msg.nowLang);
console.log('Msg.LANG', Msg.LANG);

});