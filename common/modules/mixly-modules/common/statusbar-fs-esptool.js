goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.PageBase');
goog.require('Mixly.HTMLTemplate');
goog.provide('Mixly.StatusBarFSEsptool');

const {
    Env,
    PageBase,
    HTMLTemplate
} = Mixly;


class StatusBarFSEsptool extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool.html')))
        );

        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool-panel.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool-panel.html')))
        );
    }

    #$btn_ = null;

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$btn_ = $content.find('.manage-btn');
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#$btn_.click(() => {
            this.addPanel();
        });
    }

    addPanel() {
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool-panel.html');
        const $content = $(template.render());
        this.#$btn_.parent().before($content);
        $content.find('.close-btn').click(() => {
            $content.remove();
        });
    }
}

Mixly.StatusBarFSEsptool = StatusBarFSEsptool;

});