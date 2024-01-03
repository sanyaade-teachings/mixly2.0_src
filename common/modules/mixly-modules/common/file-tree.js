goog.loadJs('common', () => {

goog.require('XScrollbar');
goog.require('path');
goog.require('$.jstree');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.ContextMenu');
goog.provide('Mixly.FileTree');

const {
    Env,
    Config,
    Events,
    ContextMenu
} = Mixly;

const { USER } = Config;

class FileTree {
    static {
        this.FILE_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/file-icons.json'));
        this.FOLDER_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/folder-icons.json'));
    }

    constructor(element) {
        this.dirPath = '';
        this.$content = $(element);
        let trackBackground, thumbBackground;
        if (USER.theme === 'dark') {
            trackBackground = '#222';
            thumbBackground = '#b0b0b0';
        } else {
            trackBackground = '#ddd';
            thumbBackground = '#5f5f5f';
        }
        this.scrollbar = new XScrollbar(element, {
            onlyHorizontal: false,
            thumbSize: 3,
            thumbRadius: 1,
            trackBackground,
            thumbBackground
        });
        this.$fileTree = $(this.scrollbar.$content);
        this.$fileTree.jstree({
            core: {
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
                    if(node.id === "#") {
                        cb(this.#getRoot_());
                    } else {
                        let $li = this.$fileTree.jstree(true).get_node(node, true);
                        let $i = $li.find('.jstree-anchor > .jstree-icon');
                        $i.addClass('layui-anim layui-anim-fadein layui-anim-fadeout layui-anim-loop');
                        this.#getChildren_(node.id)
                        .then((data) => {
                            cb(data);
                        })
                        .catch(console.log);
                    }
                },
                themes: {
                    dots: false,
                    name: USER.theme === 'light'? 'default' : 'default-dark',
                    responsive: false,
                    ellipsis: true
                }
            },
            plugins: ['wholerow', 'dnd', 'sort', 'unique']
        });
        this.jstree = this.$fileTree.jstree(true);
        this.events = new Events(['selectLeaf']);
        this.selected = null;
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.$fileTree
        .on('click.jstree', '.jstree-open>a', ({ target }) => {
            setTimeout(() => this.jstree.close_node(target));
        })
        .on('click.jstree', '.jstree-closed>a', ({ target }) => {
            setTimeout(() => this.jstree.open_node(target));
        })
        .on('open_node.jstree', (e, data) => {
            const { id } = data.node;
            let node = document.getElementById(id);
            let $i = $(node).children('.jstree-anchor').children('.jstree-icon');
            $i.addClass('opened');
        })
        .on('close_node.jstree', (e, data) => {
            const { id } = data.node;
            let node = document.getElementById(id);
            let $i = $(node).children('.jstree-anchor').children('.jstree-icon');
            $i.removeClass('opened');
        })
        .on('after_open.jstree', (e, data) => {
            let node = document.getElementById(this.selected);
            if (!node) {
                return;
            }
            $(node).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
        })
        .on('after_close.jstree', (e, data) => {
            let node = document.getElementById(this.selected);
            if (!node) {
                return;
            }
            $(node).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
        })
        .on("changed.jstree", (e, data) => {
            const selected = data.instance.get_selected(true);
            if (!selected.length) {
                return;
            }
            if (selected[0].icon.indexOf('foldericon') !== -1) {
                return;
            }
            this.selected = selected[0].id;
            this.events.run('selectLeaf', selected);
        });
    }

    setDirPath(dirPath) {
        this.dirPath = dirPath;
        this.jstree.refresh();
    }

    select(inPath) {
        this.selected = inPath;
        this.jstree.deselect_all();
        let node = document.getElementById(inPath);
        if (!node) {
            return;
        }
        this.jstree.select_node(node, true, true);
        $(node).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    deselect(inPath) {
        let node = document.getElementById(inPath);
        if (!node) {
            return;
        }
        this.jstree.deselect_node(node, true);
        $(node).children('.jstree-wholerow').removeClass('jstree-wholerow-clicked');
    }

    #getRoot_() {
        const rootNodeName = path.basename(this.dirPath).toUpperCase();
        return [{
            text: `<div style="font-weight:bold;display:unset;">${rootNodeName}</div>`,
            id: this.dirPath,
            children: true,
            li_attr: {
                title: this.dirPath
            },
            icon: 'foldericon-root-default'
        }];
    }

    #getChildren_(inPath) {
        return new Promise(async (resolve, reject) => {
            let output = [];
            const content = await this.getContent(inPath);
            for (let item of content) {
                const { type, id, children } = item;
                const text = path.basename(id);
                let icon = 'icon-doc';
                if (type === 'dir') {
                    icon = this.#getFolderIcon_(text);
                } else {
                    icon = this.#getFileIcon_(text);
                }
                output.push({
                    text,
                    id,
                    children,
                    li_attr: {
                        title: id
                    },
                    icon
                });
            }
            resolve(output);
        });
    }

    // 可覆盖
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

    resize() {
    }

    dispose() {
        this.jstree.destroy();
        this.scrollbar.destroy();
    }
}

Mixly.FileTree = FileTree;

});