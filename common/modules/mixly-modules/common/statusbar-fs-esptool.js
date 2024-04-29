goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.PageBase');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Electron.FSEsptool');
goog.provide('Mixly.StatusBarFSEsptool');

const {
    Env,
    PageBase,
    HTMLTemplate,
    Debug,
    Electron = {}
} = Mixly;

const { FS, FSEsptool } = Electron;


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
    #fsEsptool_ = null;

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$btn_ = $content.find('.manage-btn');
        this.#fsEsptool_ = new FSEsptool();
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

        $content.find('.folder-btn').click(() => {
            FS.showDirectoryPicker()
            .then((folderPath) => {
                if (!folderPath) {
                    return;
                }
                $content.find('.folder-input').val(path.join(folderPath));
            })
            .catch(Debug.error);
        });

        $content.find('.download-btn').click(() => {
            this.#fsEsptool_.download($content.find('.folder-input').val());
        });

        $content.find('.upload-btn').click(() => {
            this.#fsEsptool_.upload($content.find('.folder-input').val());
        });
    }
}

Mixly.StatusBarFSEsptool = StatusBarFSEsptool;

});