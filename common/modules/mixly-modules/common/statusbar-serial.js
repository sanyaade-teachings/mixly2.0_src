goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarSerial');

const { XML, StatusBar } = Mixly;

class StatusBarSerial extends StatusBar {
    static CONTENT = '<pre class="tab-ace" align="center"></pre>';
    static TITLE = '<div>{{d.title}}<span class="layui-badge-dot layui-bg-orange"></span><div>';

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
        let $content = $(StatusBarSerial.CONTENT);
        $parentTitleContainer.append($title);
        $parentContentContainer.append($content);
        super({
            ...config,
            titleElement: $title[0],
            contentElement: $content[0]
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