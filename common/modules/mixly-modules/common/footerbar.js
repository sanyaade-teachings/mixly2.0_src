goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.FooterLayerBoardConfig');
goog.require('Mixly.FooterLayerMessage');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    Config,
    FooterLayer,
    FooterLayerExample,
    FooterLayerBoardConfig,
    FooterLayerMessage,
    FooterBar
} = Mixly;

const { BOARD } = Config;

FooterBar.init = () => {
    $('#mixly-footer-codelang').html(BOARD.language ?? '未知');
    let messageLayer = new FooterLayerMessage('mixly-message');
    FooterBar.messageLayer = messageLayer;
}

FooterBar.add = () => {
    
}

});