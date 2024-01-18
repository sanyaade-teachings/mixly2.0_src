goog.loadJs('common', () => {

goog.require('XScrollbar');
goog.require('path');
goog.require('$.jstree');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Registry');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Debug');
goog.provide('Mixly.FileTree');

const {
    Env,
    Config,
    Events,
    ContextMenu,
    Registry,
    IdGenerator,
    Debug
} = Mixly;

const { USER } = Config;

class FileTree {
    static {
        this.FILE_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/file-icons.json'));
        this.FOLDER_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/folder-icons.json'));
    }

    constructor(element, mprogress, fs) {
        this.mprogress = mprogress;
        this.fs = fs;
        this.folderPath = '';
        this.$content = $(element);
        this.scrollbar = new XScrollbar(element, {
            onlyHorizontal: false,
            thumbSize: '4px',
            thumbRadius: '1px',
            thumbBackground: USER.theme === 'dark'? '#b0b0b0' : '#5f5f5f'
        });
        this.$fileTree = $(this.scrollbar.$content);
        this.$fileTree.jstree({
            core: {
                strings: {
                    'Loading ...': '正在加载中...'
                },
                multiple: false,
                animation: false,
                worker: false,
                dblclick_toggle: false,
                check_callback: function(operation, node, parent, position, more) {
                    if(operation === 'copy_node' || operation === 'move_node') {
                        if(parent.id === '#') {
                            return false;
                        }
                    }
                    return true;
                },
                data: (node, cb) => {
                    if (!this.folderPath) {
                        cb([]);
                        return;
                    }
                    let folderPath = this.folderPath;
                    if(node.id !== '#') {
                        let $li = this.jstree.get_node(node, true);
                        let $i = $li.find('.jstree-anchor > .jstree-icon');
                        $i.addClass('layui-anim layui-anim-fadein layui-anim-fadeout layui-anim-loop');
                        folderPath = node.id;
                    }
                    this.#getChildren_(folderPath)
                    .then((data) => {
                        cb(data);
                    })
                    .catch(Debug.error);
                },
                themes: {
                    dots: true,
                    name: USER.theme === 'light'? 'default' : 'default-dark',
                    responsive: false,
                    ellipsis: true
                }
            },
            plugins: ['wholerow', 'unique']
        });
        this.jstree = this.$fileTree.jstree(true);
        this.events = new Events(['selectLeaf', 'afterOpenNode', 'afterCloseNode', 'afterRefreshNode']);
        this.selected = null;
        this.#addEventsListener_();
        this.nodeAliveRegistry = new Registry();
        this.delayRefreshRegistry = new Registry();
        this.watchRegistry = new Registry();
    }

    #addEventsListener_() {
        this.$fileTree
        .on('click.jstree', '.jstree-open>a', ({ target }) => {
            setTimeout(() => {
                $(target).parent().removeClass('jstree-leaf').addClass('jstree-opened');
                this.jstree.close_node(target);
            });
        })
        .on('click.jstree', '.jstree-closed>a', ({ target }) => {
            setTimeout(() => {
                $(target).parent().removeClass('jstree-leaf').addClass('jstree-closed');
                this.jstree.open_node(target);
            });
        })
        .on('open_node.jstree', (e, data) => {
            const { id } = data.node;
            let elem = document.getElementById(id);
            let $i = $(elem).children('.jstree-anchor').children('.jstree-icon');
            $i.addClass('opened');
        })
        .on('close_node.jstree', (e, data) => {
            const { id } = data.node;
            let elem = document.getElementById(id);
            let $i = $(elem).children('.jstree-anchor').children('.jstree-icon');
            $i.removeClass('opened');
        })
        .on('after_open.jstree', (e, data) => {
            const { id } = data.node;
            const eventId = this.nodeAliveRegistry.getItem(id);
            if (eventId) {
                clearTimeout(eventId);
                this.nodeAliveRegistry.unregister(id);
            } else {
                this.watchFolder(id);
            }
            this.runEvent('afterOpenNode', data);
            this.reselect();
        })
        .on('after_close.jstree', (e, data) => {
            const { id } = data.node;
            const eventId = setTimeout(() => {
                this.unwatchFolder(id);
            }, 60 * 1000);
            if (!this.nodeAliveRegistry.getItem(id)) {
                this.nodeAliveRegistry.register(id, eventId);
            }
            this.runEvent('afterCloseNode', data);
            this.reselect();
        })
        .on("changed.jstree", (e, data) => {
            const selected = data.instance.get_selected(true);
            if (!selected.length) {
                return;
            }
            if ((selected[0].icon || '').indexOf('foldericon') !== -1) {
                return;
            }
            this.selected = selected[0].id;
            this.events.run('selectLeaf', selected);
        });
    }

    setFolderPath(folderPath) {
        let newFolderPath = path.join(folderPath);
        if (newFolderPath === this.folderPath) {
            return;
        }
        if (this.folderPath) {
            this.unwatchFolder(this.folderPath);
        }
        this.folderPath = path.join(folderPath);
        this.nodeAliveRegistry.reset();
        this.jstree.refresh();
        this.watchFolder(this.folderPath);
    }

    getFolderPath() {
        return this.folderPath;
    }

    refreshFolder(folderPath) {
        // 延迟刷新节点，防止过于频繁的IO操作
        let eventId = this.delayRefreshRegistry.getItem(folderPath);
        if (eventId) {
            clearTimeout(eventId);
            this.delayRefreshRegistry.unregister(folderPath);
        }
        eventId = setTimeout(() => {
            if (folderPath === this.folderPath) {
                this.jstree.refresh();
                return;
            }
            const node = this.jstree.get_node(folderPath);
            const nodeIsOpened = node && !this.isClosed(folderPath);
            if (nodeIsOpened) {
                if (this.isWatched(folderPath)) {
                    this.clearFolderTemp(folderPath);
                    this.jstree.refresh_node(folderPath);
                }
            } else {
                this.unwatchFolder(folderPath);
            }
        }, 500);
        this.delayRefreshRegistry.register(folderPath, eventId);
    }

    clearFolderTemp(folderPath) {
        const node = this.jstree.get_node(folderPath);
        if (!node) {
            return;
        }
        node.state.loaded = false;
    }

    watchFolder(folderPath) {
        if (this.isWatched(folderPath)) {
            return;
        }
        this.watchRegistry.register(folderPath, 'folder');
    }

    unwatchFolder(folderPath) {
        if (!this.isWatched(folderPath)) {
            return;
        }
        this.clearFolderTemp(folderPath);
        const keys = this.nodeAliveRegistry.keys();
        for (let key of keys) {
            if (key.indexOf(folderPath) === -1) {
                continue;
            }
            const eventId = this.nodeAliveRegistry.getItem(key);
            if (eventId) {
                clearTimeout(eventId);
                this.nodeAliveRegistry.unregister(key);
            }
        }
        this.watchRegistry.unregister(folderPath);
    }

    watchFile(filePath) {}

    unwatchFile(filePath) {}

    isWatched(inPath) {
        return !!this.watchRegistry.getItem(inPath);
    }

    isClosed(inPath) {
        return this.jstree.is_closed(inPath);
    }

    select(inPath) {
        this.selected = inPath;
        let elem = document.getElementById(inPath);
        if (!elem) {
            return;
        }
        this.jstree.select_node(inPath, true, true);
        $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    reselect() {
        this.select(this.selected);
    }

    deselect(inPath) {
        let elem = document.getElementById(inPath);
        if (!elem) {
            return;
        }
        this.jstree.deselect_node(elem, true);
        $(elem).children('.jstree-wholerow').removeClass('jstree-wholerow-clicked');
    }

    deselectAll() {
        this.jstree.deselect_all();
    }

    #getChildren_(inPath) {
        return new Promise(async (resolve, reject) => {
            let output = [];
            const content = await this.getContent(inPath);
            for (let item of content) {
                const { type, id, children } = item;
                const text = path.basename(id);
                let icon = 'icon-doc';
                if (type === 'folder') {
                    icon = this.#getFolderIcon_(text);
                } else {
                    icon = this.#getFileIcon_(text);
                }
                output.push({
                    text,
                    id,
                    children,
                    li_attr: {
                        type,
                        name: text,
                        title: id
                    },
                    icon
                });
            }
            resolve(output);
        });
    }

    getContent(inPath) {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    #getFileIcon_(filename) {
        const prefix = 'fileicon-';
        if (FileTree.FILE_ICON_MAP[filename]) {
            return prefix + FileTree.FILE_ICON_MAP[filename];
        }
        const extname = path.extname(filename).toLowerCase();
        if (FileTree.FILE_ICON_MAP[extname]) {
            return prefix + FileTree.FILE_ICON_MAP[extname];
        }
        return prefix + FileTree.FILE_ICON_MAP['default'];
    }

    #getFolderIcon_(foldername) {
        const prefix = 'foldericon-';
        if (FileTree.FOLDER_ICON_MAP[foldername]) {
            return prefix + FileTree.FOLDER_ICON_MAP[foldername];
        }
        return prefix + FileTree.FOLDER_ICON_MAP['default'];
    }

    createRootChildNode(type) {
        this.mprogress.start();
        const node = this.jstree.get_node('#');
        const children = false;
        let icon = 'foldericon-default';
        if (type === 'file') {
            icon = 'fileicon-mix';
        }
        const folderPath = this.folderPath;
        this.jstree.create_node(node, { children, icon }, 'first', (childNode) => {
            this.jstree.edit(childNode, '', (newNode) => {
                const desPath = path.join(folderPath, newNode.text);
                this.jstree.delete_node(newNode);
                const oldNode = this.jstree.get_node(desPath);
                if (oldNode) {
                    this.mprogress.end();
                    return;
                }
                let createPromise = null;
                if (type === 'file') {
                    createPromise = this.fs.createFile(desPath);
                } else {
                    createPromise = this.fs.createDirectory(desPath);
                }
                createPromise
                .catch(Debug.error)
                .finally(() => {
                    this.mprogress.end();
                });
            });
        });
    }

    createRootChildFileNode() {
        this.createRootChildNode('file');
    }

    createRootChildFolderNode() {
        this.createNode('folder');
    }

    createNode(type, folderPath) {
        this.mprogress.start();
        const node = this.jstree.get_node(folderPath);
        const children = false;
        let icon = 'foldericon-default';
        if (type === 'file') {
            icon = 'fileicon-mix';
        }
        if (folderPath === '#') {
            folderPath = this.folderPath;
        }
        this.jstree.open_node(node, () => {
            this.jstree.create_node(node, { children, icon }, 'first', (childNode) => {
                this.jstree.edit(childNode, '', (newNode) => {
                    const desPath = path.join(folderPath, newNode.text);
                    this.jstree.delete_node(newNode);
                    const oldNode = this.jstree.get_node(desPath);
                    if (oldNode) {
                        this.mprogress.end();
                        return;
                    }
                    let createPromise = null;
                    if (type === 'file') {
                        createPromise = this.fs.createFile(desPath);
                    } else {
                        createPromise = this.fs.createDirectory(desPath);
                    }
                    createPromise
                    .catch(Debug.error)
                    .finally(() => {
                        this.mprogress.end();
                    });
                });
            });
        });
    }

    createFileNode(folderPath) {
        this.createNode('file', folderPath);
    }

    createFolderNode(folderPath) {
        this.createNode('folder', folderPath);
    }

    renameNode(type, inPath) {
        this.mprogress.start();
        const node = this.jstree.get_node(inPath);
        const oldNodeName = node.text;
        this.jstree.edit(node, oldNodeName, (newNode) => {
            const desPath = path.join(inPath, '../', newNode.text);
            this.jstree.close_node(newNode);
            this.jstree.rename_node(newNode, oldNodeName);
            const oldNode = this.jstree.get_node(desPath);
            if (oldNode) {
                this.mprogress.end();
                return;
            }
            let renamePromise = null;
            if (type === 'file') {
                renamePromise = this.fs.renameFile(inPath, desPath);
            } else {
                renamePromise = this.fs.renameDirectory(inPath, desPath);
            }
            renamePromise
            .catch(Debug.error)
            .finally(() => {
                this.mprogress.end();
            });
        });
    }

    renameFileNode(filePath) {
        this.renameNode('file', filePath);
    }

    renameFolderNode(folderPath) {
        this.renameNode('folder', folderPath);
    }

    deleteNode(type, inPath) {
        this.mprogress.start();
        let deletePromise = null;
        if (type === 'file') {
            deletePromise = this.fs.deleteFile(inPath);
        } else {
            deletePromise = this.fs.deleteDirectory(inPath);
        }
        deletePromise
        .catch(Debug.error)
        .finally(() => {
            this.mprogress.end();
        });
    }

    deleteFileNode(filePath) {
        this.deleteNode('file', filePath);
    }

    deleteFolderNode(folderPath) {
        this.deleteNode('folder', folderPath);
    }

    copyNode(inPath) {
        const node = this.jstree.get_node(inPath);
        this.jstree.copy(node);
    }

    cutNode(inPath) {
        const node = this.jstree.get_node(inPath);
        this.jstree.cut(node);
    }

    pasteNode(folderPath) {
        if (!this.jstree.can_paste()) {
            return;
        }
        this.mprogress.start();
        const oldNodes = this.jstree.get_buffer();
        const oldNode = oldNodes.node[0];
        const { mode } = oldNodes;
        const { type } = oldNode.li_attr;
        let pastePromise = null;
        let startPath = oldNode.id;
        let endPath = path.join(folderPath, oldNode.text);
        if (mode === 'move_node') {
            if (type === 'file') {
                pastePromise = this.fs.moveFile(startPath, endPath);
            } else {
                pastePromise = this.fs.createDirectory(endPath)
                    .then(() => {
                        return this.fs.moveDirectory(startPath, endPath);
                    })
                    .then(() => {
                        return this.fs.deleteDirectory(startPath);
                    });
            }
        } else if (mode === 'copy_node') {
            if (type === 'file') {
                pastePromise = this.fs.copyFile(startPath, endPath);
            } else {
                pastePromise = this.fs.createDirectory(endPath)
                    .then(() => {
                        return this.fs.copyDirectory(startPath, endPath);
                    });
            }
        }
        pastePromise
        .catch(Debug.error)
        .finally(() => {
            this.clearFolderTemp(folderPath);
            this.jstree.refresh_node(folderPath);
            this.openNode(folderPath);
            this.mprogress.end();
        });
    }

    openNode(folderPath) {
        const node = this.jstree.get_node(folderPath);
        if (!node) {
            return;
        }
        this.jstree.open_node(node);
    }

    resize() {
    }

    dispose() {
        this.jstree.destroy();
        this.scrollbar.destroy();
    }

    bind(type, func) {
        return this.events.bind(type, func);
    }

    unbind(id) {
        this.events.unbind(id);
    }

    addEventsType(eventsType) {
        this.events.addType(eventsType);
    }

    runEvent(eventsType) {
        this.events.run(eventsType);
    }

    offEvent(eventsType) {
        this.events.off(eventsType);
    }
}

Mixly.FileTree = FileTree;

});