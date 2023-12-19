goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const {
    Env,
    XML,
    IdGenerator,
    StatusBar
} = Mixly;

class StatusBarSerial extends StatusBar {
    static {
        this.TITLE = '<div>{{d.title}}<span class="layui-badge-dot layui-bg-orange"></span><div>';
        this.CONTENT = goog.get(path.join(Env.templatePath, 'statusbar/statusbar-serial-content.html'));
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
        let $title = $(XML.render(StatusBarSerial.TITLE, {
            title: config.title
        }));
        let mId = IdGenerator.generate();
        let $content = $(XML.render(StatusBarSerial.CONTENT, { mId }));
        $parentTitleContainer.append($title);
        $parentContentContainer.append($content);
        super({
            ...config,
            titleElement: $title[0],
            contentElement: $content.find('.serial')[0]
        });
        this.opened = true;
        this.$span = $title.children('span');
    }

    open() {
        if (this.isOpened()) {
            return;
        }
        this.$span.removeClass('layui-bg-blue').addClass('layui-bg-orange');
        this.opened = true;
    }

    close() {
        if (!this.isOpened()) {
            return;
        }
        this.$span.removeClass('layui-bg-orange').addClass('layui-bg-blue');
        this.opened = false;
    }

    isOpened() {
        return this.opened;
    }
}

Mixly.StatusBarSerial = StatusBarSerial;

});