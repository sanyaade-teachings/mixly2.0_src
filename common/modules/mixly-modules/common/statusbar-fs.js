goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.PageBase');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.require('Mixly.Component');
goog.require('Mixly.Registry');
goog.require('Mixly.Serial');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Electron.BoardFS');
goog.provide('Mixly.StatusBarFS');

const {
    Env,
    PageBase,
    HTMLTemplate,
    Debug,
    Component,
    Registry,
    Serial,
    Electron = {}
} = Mixly;

const { FS, BoardFS } = Electron;

const { layer } = layui;


class Panel extends Component {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool-panel.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool-panel.html')))
        );
    }

    #$folderInput_ = null;
    #$closeBtn_ = null;
    #$selectFolderBtn_ = null;
    #$downloadBtn_ = null;
    #$uploadBtn_ = null;
    #$fsSelect_ = null;
    #folderPath_ = '';
    #fs_ = 'auto';

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool-panel.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$folderInput_ = $content.find('.folder-input');
        this.#$closeBtn_ = $content.find('.close-btn');
        this.#$selectFolderBtn_ = $content.find('.folder-btn');
        this.#$downloadBtn_ = $content.find('.download-btn');
        this.#$uploadBtn_ = $content.find('.upload-btn');
        this.#$fsSelect_ = $content.find('.fs-type');
        this.addEventsType(['download', 'upload']);
        this.#addEventsListener_();
        this.#$fsSelect_.select2({
            width: '100%',
            minimumResultsForSearch: 50,
            dropdownCssClass: 'mixly-scrollbar'
        });
    }

    #addEventsListener_() {
        this.#$fsSelect_.on('select2:select', (event) => {
            const { data } = event.params;
            this.#fs_ = data.id;
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
            this.#checkFolder_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.runEvent('download', {
                    folderPath: this.#folderPath_,
                    fs: this.#fs_
                });
            })
            .catch(Debug.error);
        });

        this.#$uploadBtn_.click(() => {
            this.#checkFolder_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.runEvent('upload', {
                    folderPath: this.#folderPath_,
                    fs: this.#fs_
                });
            })
            .catch(Debug.error);
        });
    }

    #checkFolder_() {
        return new Promise((resolve, reject) => {
            if (!this.#folderPath_) {
                layer.msg('本地映射目录不存在', { time: 1000 });
                resolve(false);
                return;
            }
            FS.isDirectory(this.#folderPath_)
            .then((status) => {
                if (status) {
                    resolve(true);
                } else {
                    layer.msg('本地映射目录不存在', { time: 1000 });
                    resolve(false);
                }
            })
            .catch(reject);
        });
    }

    dispose() {
        this.#$fsSelect_.select2('destroy');
        super.dispose();
    }
}


class StatusBarFS extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-fs-esptool.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-fs-esptool.html')))
        );
    }

    #$btn_ = null;
    #fsEsptool_ = null;
    #$close_ = null;
    #registry_ = new Registry();

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-fs-esptool.html');
        const $content = $(template.render());
        this.setContent($content);
        this.#$btn_ = $content.find('.manage-btn');
        this.#fsEsptool_ = new BoardFS();
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#$btn_.click(() => {
            this.addPanel();
        });
    }

    init() {
        this.addDirty();
        const $tab = this.getTab();
        this.#$close_ = $tab.find('.chrome-tab-close');
        this.#$close_.addClass('layui-badge-dot layui-bg-blue');
    }

    addPanel() {
        const panel = new Panel();
        this.#$btn_.parent().before(panel.getContent());
        this.#registry_.register(panel.getId(), panel);
        panel.bind('download', (config) => {
            this.#ensureSerial_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.#fsEsptool_.download(config.folderPath);
            })
            .catch(Debug.error);
        });

        panel.bind('upload', (config) => {
            this.#ensureSerial_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.#fsEsptool_.upload(config.folderPath);
            })
            .catch(Debug.error);
        });

        panel.bind('destroyed', () => {
            this.#registry_.unregister(panel.getId());
        });
    }

    #ensureSerial_() {
        return new Promise((resolve, reject) => {
            const port = Serial.getSelectedPortName();
            if (!port) {
                layer.msg('无可用设备', { time: 1000 });
                resolve(false);
                return;
            }
            const { mainStatusBarTabs } = Mixly;
            const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
            let closePromise = Promise.resolve();
            if (statusBarSerial) {
                closePromise = statusBarSerial.getSerial().close();
            }
            closePromise.then(() => {
                resolve(true);
            }).catch(reject);
        });
    }

    dispose() {
        for (let id of this.#registry_.keys()) {
            this.#registry_.getItem(id).dispose();
        }
        this.#registry_.reset();
        super.dispose();
    }
}

Mixly.StatusBarFS = StatusBarFS;

});