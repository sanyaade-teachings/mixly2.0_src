goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.FooterLayerBoardConfig');
goog.require('Mixly.FooterLayerMessage');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    FooterLayer,
    FooterLayerExample,
    FooterLayerBoardConfig,
    FooterLayerMessage,
    FooterBar
} = Mixly;

FooterBar.init = () => {
    let messageLayer = new FooterLayerMessage('mixly-message');
    FooterBar.messageLayer = messageLayer;
}

FooterBar.add = () => {
    
}

});