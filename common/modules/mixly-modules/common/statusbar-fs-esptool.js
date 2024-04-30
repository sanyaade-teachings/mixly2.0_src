goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.PageBase');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.require('Mixly.Component');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Electron.FSEsptool');
goog.provide('Mixly.StatusBarFSEsptool');

const {
    Env,
    PageBase,
    HTMLTemplate,
    Debug,
    Component,
    Electron = {}
} = Mixly;

const { FS, FSEsptool } = Electron;

const { layer } = layui;


class Panel extends Component {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool-panel.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool-panel.html')))
        );
    }

    #$select_ = null;
    #$folderInput_ = null;
    #$closeBtn_ = null;
    #$selectFolderBtn_ = null;
    #$downloadBtn_ = null;
    #$uploadBtn_ = null;
    #$fsType_ = null;
    #folderPath_ = '';
    #fs_ = 'auto';

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool-panel.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$folderInput_ = $content.find('.folder-input');
        this.#$select_ = $content.find('select');
        this.#$closeBtn_ = $content.find('.close-btn');
        this.#$selectFolderBtn_ = $content.find('.folder-btn');
        this.#$downloadBtn_ = $content.find('.download-btn');
        this.#$uploadBtn_ = $content.find('.upload-btn');
        this.#$fsType_ = $content.find('.fs-type');
        this.addEventsType(['download', 'upload']);
        this.#addEventsListener_();
        // this.#$select_.select2({
        //     width: '100%',
        //     minimumResultsForSearch: 50,
        //     dropdownCssClass: 'mixly-scrollbar'
        // });
    }

    #addEventsListener_() {
        this.#$fsType_.change((event) => {
            this.#fs_ = this.#$fsType_.val();
        });

        this.#$closeBtn_.click(() => {
            this.dispose();
        });

        this.#$selectFolderBtn_.click(() => {
            FS.showDirectoryPicker()
            .then((folderPath) => {
                if (!folderPath) {
                    return;
                }
                this.#folderPath_ = path.join(folderPath);
                this.#$folderInput_.val(this.#folderPath_);
            })
            .catch(Debug.error);
        });

        this.#$downloadBtn_.click(() => {
            this.#checkFolder_(() => {
                
            })
            .catch(reject);
        });

        this.#$uploadBtn_.click(() => {
            
        });
    }

    #checkFolder_() {
        return new Promise((resolve, reject) => {
            if (!this.#folderPath_) {
                layer.msg('本地映射目录不存在', { time: 1000 });
                reject('本地映射目录不存在');
                return;
            }
            FS.isDirectory()
            .then((status) => {
                if (status) {
                    resolve();
                } else {
                    layer.msg('本地映射目录不存在', { time: 1000 });
                    reject('本地映射目录不存在');
                }
            })
            .catch(reject);
        });
    }

    dispose() {
        // this.#$select_.select2('destroy');
        super.dispose();
    }
}


class StatusBarFSEsptool extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool.html')))
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
        const panel = new Panel();
        this.#$btn_.parent().before(panel.getContent());
        panel.bind('download', (config) => {
            this.#fsEsptool_.download(config.folderPath);
        });

        panel.bind('upload', (config) => {
            this.#fsEsptool_.upload(config.folderPath);
        });
        /*$content.find('.close-btn').click(() => {
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
        });*/
    }

    dispose() {
        this.getContent().find('select').select2('destroy');
        super.dispose();
    }
}

Mixly.StatusBarFSEsptool = StatusBarFSEsptool;

});