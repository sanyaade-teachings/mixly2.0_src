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

    constructor(element) {
        const $parentContainer = $(element);
        const localStorageHTMLTemplate = HTMLTemplate.get('sidebar/sidebar-local-storage.html');
        const $folderContent = $(localStorageHTMLTemplate.render());
        const $openFolderContent = $(HTMLTemplate.get('sidebar/sidebar-local-storage-open-folder.html').render());
        super();
        this.id = localStorageHTMLTemplate.id;
        this.$openFolderContent = $openFolderContent;
        this.$folderContent = $folderContent;
        this.setContent($openFolderContent);
        $parentContainer.append($openFolderContent);
        this.$folder = $folderContent.find('.folder-title');
        this.$iconTriangle = this.$folder.find('.triangle');
        this.$iconFolder = this.$folder.find('.folder');
        this.$name = this.$folder.find('.name');
        this.$children = $folderContent.find('.children');
        this.mprogress = new Mprogress({
            template: 3,
            parent: `[m-id="${this.id}"] > .progress`
        });
        this.fileTree = new FileTree(this.$children[0], this.mprogress);
        this.folderOpened = false;
        this.contextMenu = null;
        this.folderPath = null;
        this.#addEventsListener_();
    }

    init() {
        super.init();
        this.#addContextMenu_();
        const $closeBtn = this.getTab().find('.chrome-tab-close');
        $closeBtn.css('display', 'none');
    }

    #addContextMenu_() {
        this.contextMenu = new ContextMenu(`div[m-id="${this.id}"] .jstree-node, div[m-id="${this.id}"] > button`, {
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
        
        this.contextMenu.bind('getMenu', () => 'menu');
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
                        this.fileTree.createRootChildNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.fileTree.createFolderNode(id);
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
                        this.fileTree.createRootChildFileNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.fileTree.createFileNode(id);
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
                    this.fileTree.cutNode(id);
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
                    this.fileTree.copyNode(id);
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
                    this.fileTree.pasteNode(id);
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
                        outPath = this.folderPath;
                    } else {
                        outPath = $trigger.attr('id');
                    }
                    navigator.clipboard.writeText(outPath)
                    .catch((error) => {
                        Debug.log(error);
                    });
                }
            }
        });
        menu.add({
            weight: 8,
            type: 'rename',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('重命名', ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    let id = $trigger.attr('id');
                    if (type === 'folder') {
                        this.fileTree.renameFolderNode(id);
                    } else {
                        this.fileTree.renameFileNode(id);
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
                        this.fileTree.deleteFolderNode(id);
                    } else {
                        this.fileTree.deleteFileNode(id);
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
        this.contextMenu.register('menu', menu);
    }

    #addEventsListener_() {
        this.$folder.click(() => {
            if (this.isFolderOpened()) {
                this.closeFolder();
            } else {
                this.openFolder();
            }
        });

        this.$openFolderContent.find('button').click(() => {
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
            this.$content.replaceWith(this.$folderContent);
            this.$openFolderContent.remove();
            this.$content = this.$folderContent;
        })
        .catch(Debug.log);
    }

    openFolder() {
        this.$iconTriangle.removeClass('codicon-chevron-right');
        this.$iconTriangle.addClass('codicon-chevron-down');
        this.$iconFolder.addClass('opened');
        this.$folder.addClass('opened');
        this.$children.show();
        this.folderOpened = true;
    }

    closeFolder() {
        this.$iconTriangle.removeClass('codicon-chevron-down');
        this.$iconTriangle.addClass('codicon-chevron-right');
        this.$iconFolder.removeClass('opened');
        this.$folder.removeClass('opened');
        this.$children.hide();
        this.fileTree.deselectAll();
        this.fileTree.reselect();
        this.folderOpened = false;
    }

    isFolderOpened() {
        return this.folderOpened;
    }

    getFileTree() {
        return this.fileTree;
    }

    resize() {
        super.resize();
        this.fileTree && this.fileTree.resize();
    }

    dispose() {
        this.fileTree.dispose();
    }

    setFolderPath(folderPath) {
        const rootNodeName = path.basename(folderPath).toUpperCase();
        this.$name.text(rootNodeName);
        this.fileTree.setFolderPath(folderPath);
        this.folderPath = this.fileTree.getFolderPath();
    }
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});