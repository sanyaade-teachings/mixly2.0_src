goog.loadJs('common', () => {

goog.require('path');
goog.require('Mprogress');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarTerminal');

const {
    Env,
    XML,
    IdGenerator,
    StatusBar
} = Mixly;

class StatusBarTerminal extends StatusBar {
    static {
        this.TITLE = '<div>{{d.title}}</div>';
        this.CONTENT = goog.get(path.join(Env.templatePath, 'statusbar/statusbar-terminal-content.html'));
    }

    /**
     * config = {
     *      id: string,
     *      title: string,
     *      titleElement: Element,
     *      contentElement: Element
     * }
     **/
    constructor(config) {
        let $parentTitleContainer = $(config.titleElement);
        let $parentContentContainer = $(config.contentElement);
        let $title = $(XML.render(StatusBarTerminal.TITLE, {
            title: config.title
        }));
        let mId = IdGenerator.generate();
        let $content = $(XML.render(StatusBarTerminal.CONTENT, { mId }));
        $parentTitleContainer.html($title);
        $parentContentContainer.append($content);
        super({
            ...config,
            titleElement: $title[0],
            contentElement: $content.find('.terminal')[0]
        });
        /*var mprogress3 = new Mprogress({
            speed: 1000,
            template: 3,
            parent: `[m-id="${mId}"] > .progress`
        });
        mprogress3.start();*/
    }
}

Mixly.StatusBarTerminal = StatusBarTerminal;

});