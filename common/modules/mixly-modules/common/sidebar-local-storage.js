goog.loadJs('common', () => {

goog.require('path');
goog.require('Mprogress');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Debug');
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
        this.triggerId = null;
        this.folderPath = null;
        this.rootFolderContextMenu = {
            new_folder: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件夹', ''),
                callback: () => {
                    this.openFolder();
                    this.fileTree.createRootChildNode();
                }
            },
            new_file: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件', ''),
                callback: () => {
                    this.openFolder();
                    this.fileTree.createRootChildFileNode();
                }
            },
            sep1: '---------',
            copy_path: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制路径', ''),
                callback: () => {
                    navigator.clipboard.writeText(this.folderPath)
                    .catch((error) => {
                        Debug.log(error);
                    });
                }
            },
            sep2: '---------',
            open_new_folder: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开新文件夹', ''),
                callback: () => {
                    this.showDirectoryPicker();
                }
            }
        };
        this.folderContextMenu = {
            new_folder: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件夹', ''),
                callback: () => {
                    this.fileTree.createFolderNode(this.triggerId);
                }
            },
            new_file: {
                isHtmlName: true,
                name: ContextMenu.getItem('新建文件', ''),
                callback: () => {
                    this.fileTree.createFileNode(this.triggerId);
                }
            },
            sep1: '---------',
            cut: {
                isHtmlName: true,
                name: ContextMenu.getItem('剪切', ''),
                callback: (key, opt) => {
                    this.fileTree.cutNode(this.triggerId);
                }
            },
            copy: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制', ''),
                callback: (key, opt) => {
                    this.fileTree.copyNode(this.triggerId);
                }
            },
            paste: {
                isHtmlName: true,
                name: ContextMenu.getItem('粘贴', ''),
                callback: (key, opt) => {
                    this.fileTree.pasteNode(this.triggerId);
                }
            },
            sep2: '---------',
            copy_path: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制路径', ''),
                callback: () => {
                    navigator.clipboard.writeText(this.triggerId)
                    .catch((error) => {
                        Debug.log(error);
                    });
                }
            },
            rename: {
                isHtmlName: true,
                name: ContextMenu.getItem('重命名', ''),
                callback: () => {
                    this.fileTree.renameFolderNode(this.triggerId);
                }
            },
            del: {
                isHtmlName: true,
                name: ContextMenu.getItem('删除', ''),
                callback: () => {
                    this.fileTree.deleteFolderNode(this.triggerId);
                }
            }
        };
        this.fileContextMenu = {
            cut: {
                isHtmlName: true,
                name: ContextMenu.getItem('剪切', ''),
                callback: () => {
                    this.fileTree.cutNode(this.triggerId);
                }
            },
            copy: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制', ''),
                callback: () => {
                    this.fileTree.copyNode(this.triggerId);
                }
            },
            sep2: '---------',
            copy_path: {
                isHtmlName: true,
                name: ContextMenu.getItem('复制路径', ''),
                callback: () => {
                    navigator.clipboard.writeText(this.triggerId)
                    .catch((error) => {
                        Debug.log(error);
                    });
                }
            },
            rename: {
                isHtmlName: true,
                name: ContextMenu.getItem('重命名', ''),
                callback: () => {
                    this.fileTree.renameFileNode(this.triggerId);
                }
            },
            del: {
                isHtmlName: true,
                name: ContextMenu.getItem('删除', ''),
                callback: () => {
                    this.fileTree.deleteFileNode(this.triggerId);
                }
            }
        };
        this.#addContextMenu_();
        this.#addEventsListener_();
    }

    init() {
        super.init();
        const $closeBtn = this.getTab().find('.chrome-tab-close');
        $closeBtn.css('display', 'none');
    }

    #addContextMenu_() {
        this.contextMenu = new ContextMenu(`div[m-id="${this.id}"] .jstree-node`, {
            events: {
                hide: (options) => {
                    const { $trigger } = options;
                    $trigger.children('.jstree-wholerow').css('border', 'unset');
                    this.triggerId = null;
                },
                activated: (options) => {
                    const { $trigger } = options;
                    $trigger.children('.jstree-wholerow').css('border', '1px solid');
                    this.triggerId = $trigger.attr('id') || '#';
                }
            }
        });
        this.contextMenu.bind('getMenu', ($trigger) => {
            if ($trigger.attr('type') === 'file') {
                return this.fileContextMenu;
            }
            return this.folderContextMenu;
        });
        this.rootContextMenu = new ContextMenu(`div[m-id="${this.id}"] > button`, {
            events: {
                hide: (options) => {
                    const { $trigger } = options;
                    $trigger.removeClass('active');
                },
                activated: (options) => {
                    const { $trigger } = options;
                    $trigger.addClass('active');
                }
            }
        });
        this.rootContextMenu.bind('getMenu', ($trigger) => {
            return this.rootFolderContextMenu;
        });
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