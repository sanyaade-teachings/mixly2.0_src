goog.loadJs('common', () => {

goog.require('path');
goog.require('Mprogress');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Debug');
goog.require('Mixly.Menu');
goog.require('Mixly.PageBase');
goog.require('Mixly.Electron.FileTree');
goog.require('Mixly.Web.FileTree');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.SideBarLocalStorage');

const {
    IdGenerator,
    XML,
    Env,
    HTMLTemplate,
    ContextMenu,
    Debug,
    Menu,
    PageBase,
    Electron = {},
    Web = {}
} = Mixly;

const {
    FileTree,
    FS
} = goog.isElectron? Electron : Web;

class SideBarLocalStorage extends PageBase {
    static {
        HTMLTemplate.add(
            'sidebar/sidebar-local-storage.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/sidebar-local-storage.html')))
        );

        HTMLTemplate.add(
            'sidebar/sidebar-local-storage-open-folder.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/sidebar-local-storage-open-folder.html')))
        );
    }

    #$openFolderContent_ = null;
    #$folderContent_ = null;
    #$folder_ = null;
    #$iconTriangle_ = null;
    #$iconFolder_ = null;
    #$name_ = null;
    #$children_ = null;
    #mprogress_ = null;
    #fileTree_ = null;
    #folderOpened_ = false;
    #contextMenu_ = null;
    #folderPath_ = null;

    constructor() {
        super();
        const localStorageHTMLTemplate = HTMLTemplate.get('sidebar/sidebar-local-storage.html');
        const $folderContent = $(localStorageHTMLTemplate.render());
        const $openFolderContent = $(HTMLTemplate.get('sidebar/sidebar-local-storage-open-folder.html').render());
        this.id = localStorageHTMLTemplate.id;
        this.#$openFolderContent_ = $openFolderContent;
        this.#$folderContent_ = $folderContent;
        this.setContent($openFolderContent);
        this.#$folder_ = $folderContent.find('.folder-title');
        this.#$iconTriangle_ = this.#$folder_.find('.triangle');
        this.#$iconFolder_ = this.#$folder_.find('.folder');
        this.#$name_ = this.#$folder_.find('.name');
        this.#$children_ = $folderContent.find('.children');
        this.#mprogress_ = new Mprogress({
            template: 3,
            parent: `[m-id="${this.id}"] > .progress`
        });
        this.#fileTree_ = new FileTree(this.#$children_[0], this.#mprogress_);
        this.#addEventsListener_();
    }

    init() {
        super.init();
        this.#addContextMenu_();
        this.hideCloseBtn();
    }

    #addContextMenu_() {
        this.#contextMenu_ = new ContextMenu(`div[m-id="${this.id}"] .jstree-node, div[m-id="${this.id}"] > button`, {
            events: {
                hide: ({ $trigger }) => {
                    $trigger.removeClass('active');
                },
                activated: ({ $trigger }) => {
                    $trigger.addClass('active');
                }
            }
        });
        this.#addFileContextMenuItems_();
        this.#contextMenu_.bind('getMenu', () => 'menu');
    }

    #addFileContextMenuItems_() {
        let menu = new Menu();
        menu.add({
            weight: 0,
            type: 'new_folder',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件夹', ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        this.openFolder();
                        this.#fileTree_.createRootChildNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.#fileTree_.createFolderNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 1,
            type: 'new_file',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件', ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        this.openFolder();
                        this.#fileTree_.createRootChildFileNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.#fileTree_.createFileNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 2,
            type: 'sep1',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['folder'].includes(type);
            },
            data: '---------'
        });
        menu.add({
            weight: 3,
            type: 'cut',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('剪切', ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.#fileTree_.cutNode(id);
                }
            }
        });
        menu.add({
            weight: 4,
            type: 'copy',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制', ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.#fileTree_.copyNode(id);
                }
            }
        });
        menu.add({
            weight: 5,
            type: 'paste',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('粘贴', ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.#fileTree_.pasteNode(id);
                }
            }
        });
        menu.add({
            weight: 6,
            type: 'sep2',
            data: '---------'
        });
        menu.add({
            weight: 7,
            type: 'copy_path',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制路径', ''),
                callback: (_, { $trigger }) => {
                    let outPath = null;
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        outPath = this.#folderPath_;
                    } else {
                        outPath = $trigger.attr('id');
                    }
                    navigator.clipboard.writeText(outPath)
                    .catch(Debug.error);
                }
            }
        });
        menu.add({
            weight: 8,
            type: 'rename',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                if (goog.isElectron) {
                    return ['file', 'folder'].includes(type);
                } else {
                    return ['file'].includes(type);
                }
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('重命名', ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    let id = $trigger.attr('id');
                    if (type === 'folder') {
                        this.#fileTree_.renameFolderNode(id);
                    } else {
                        this.#fileTree_.renameFileNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 9,
            type: 'del',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('删除', ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    let id = $trigger.attr('id');
                    if (type === 'folder') {
                        this.#fileTree_.deleteFolderNode(id);
                    } else {
                        this.#fileTree_.deleteFileNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 10,
            type: 'open_new_folder',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开新文件夹', ''),
                callback: () => {
                    this.showDirectoryPicker();
                }
            }
        });
        this.#contextMenu_.register('menu', menu);
    }

    #addEventsListener_() {
        this.#$folder_.click(() => {
            if (this.isFolderOpened()) {
                this.closeFolder();
            } else {
                this.openFolder();
            }
        });

        this.#$openFolderContent_.find('button').click(() => {
            this.showDirectoryPicker();
        });
    }

    showDirectoryPicker() {
        FS.showDirectoryPicker()
        .then((folderPath) => {
            if (!folderPath) {
                return;
            }
            this.setFolderPath(folderPath);
            this.setContent(this.#$folderContent_);
            this.#$openFolderContent_.remove();
        })
        .catch(Debug.error);
    }

    openFolder() {
        if (this.isFolderOpened()) {
            return;
        }
        this.#$iconTriangle_.removeClass('codicon-chevron-right');
        this.#$iconTriangle_.addClass('codicon-chevron-down');
        this.#$iconFolder_.addClass('opened');
        this.#$folder_.addClass('opened');
        this.#$children_.css('display', 'block');
        this.#folderOpened_ = true;
    }

    closeFolder() {
        if (!this.isFolderOpened()) {
            return;
        }
        this.#$iconTriangle_.removeClass('codicon-chevron-down');
        this.#$iconTriangle_.addClass('codicon-chevron-right');
        this.#$iconFolder_.removeClass('opened');
        this.#$folder_.removeClass('opened');
        this.#$children_.css('display', 'none');
        this.#fileTree_.deselectAll();
        this.#fileTree_.reselect();
        this.#folderOpened_ = false;
    }

    isFolderOpened() {
        return this.#folderOpened_;
    }

    getFileTree() {
        return this.#fileTree_;
    }

    resize() {
        super.resize();
        this.#fileTree_ && this.#fileTree_.resize();
    }

    dispose() {
        this.#fileTree_.dispose();
    }

    setFolderPath(folderPath) {
        const rootNodeName = path.basename(folderPath).toUpperCase();
        this.#$name_.text(rootNodeName);
        if (goog.isElectron) {
            this.#fileTree_.setFolderPath(folderPath);
        } else {
            this.#fileTree_.setFolderPath('/');
        }
        this.#folderPath_ = this.#fileTree_.getFolderPath();
        this.#$folder_.attr('title', this.#folderPath_);
        this.openFolder();
    }
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});