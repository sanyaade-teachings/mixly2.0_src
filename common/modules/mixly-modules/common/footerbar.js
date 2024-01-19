goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.FooterLayerBoardConfig');
goog.require('Mixly.FooterLayerMessage');
goog.require('Mixly.Electron.FooterLayerExample');
goog.require('Mixly.Web.FooterLayerExample');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    Config,
    FooterLayer,
    FooterLayerBoardConfig,
    FooterLayerMessage,
    FooterBar,
    Electron = {},
    Web = {}
} = Mixly;

const { FooterLayerExample } = goog.isElectron? Electron : Web;

const { BOARD } = Config;

FooterBar.init = () => {
    $('#mixly-footer-codelang').html(BOARD.language ?? '未知');
    let messageLayer = new FooterLayerMessage('mixly-message');
    FooterBar.messageLayer = messageLayer;
    if (FooterLayerExample instanceof Object) {
        FooterBar.exampleLayer = new FooterLayerExample('mixly-example-menu');
    }
}

FooterBar.add = () => {
    
}

});