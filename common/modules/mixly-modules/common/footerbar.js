goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.FooterLayerBoardConfig');
goog.require('Mixly.FooterLayerMessage');
goog.require('Mixly.Component');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Electron.FooterLayerExample');
goog.require('Mixly.Web.FooterLayerExample');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    Config,
    Boards,
    FooterLayer,
    FooterLayerBoardConfig,
    FooterLayerMessage,
    Component,
    HTMLTemplate,
    Electron = {},
    Web = {}
} = Mixly;

const { FooterLayerExample } = goog.isElectron? Electron : Web;

const { BOARD } = Config;


class FooterBar extends Component {
    static {
        HTMLTemplate.add(
            'footerbar.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'footerbar.html')))
        );
    }

    constructor() {
        super();
        let content = $(HTMLTemplate.get('footerbar.html').render({
            outputAceName: Msg.Lang['输出'],
            row: Msg.Lang['行'],
            column: Msg.Lang['列'],
            unknown: Msg.Lang['未知'],
            config: Msg.Lang['配置板卡'],
            selected: Msg.Lang['已选择'],
            on: Msg.Lang['在'],
            message: Msg.Lang['消息'],
            example: Msg.Lang['例程']
        }));
        Boards.init();
        this.setContent(content);
        content.find('.code-lang').html(BOARD.language ?? '未知');
        this.exampleLayer = new FooterLayerExample(content.find('.example')[0]);
        this.messageLayer = new FooterLayerMessage(content.find('.message')[0]);
        this.boardConfigLayer = new FooterLayerBoardConfig(content.find('.board-config')[0], Boards.dict);
        Boards.addLayer(this.boardConfigLayer);
    }

    resize() {
        super.resize();
        this.exampleLayer.resize();
        this.messageLayer.resize();
        this.boardConfigLayer.resize();
    }
}

Mixly.FooterBar = FooterBar;

});