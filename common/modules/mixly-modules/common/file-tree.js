goog.loadJs('common', () => {

goog.require('path');
goog.require('$.jstree');
goog.require('XScrollbar');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.provide('Mixly.FileTree');

const {
    Env,
    Config,
    Events
} = Mixly;

const { USER } = Config;

class FileTree {
    static {
        this.FILE_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/file-icons.json'));
    }

    constructor(dom) {
        this.dirPath = '';
        this.$content = $(dom);
        let trackBackground, thumbBackground;
        if (USER.theme === 'dark') {
            trackBackground = '#222';
            thumbBackground = '#b0b0b0';
        } else {
            trackBackground = '#ddd';
            thumbBackground = '#5f5f5f';
        }
        this.scrollbar = new XScrollbar(dom, {
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
                animation: 0,
                worker: false,
                data: (node, cb) => {
                    if(node.id === "#") {
                        cb(this.#getRoot_());
                    } else {
                        cb(this.#getChildren_(node.id));
                    }
                },
                themes: {
                    dots: false,
                    name: USER.theme === 'light'? 'default' : 'default-dark',
                    responsive: false,
                    ellipsis: true
                }
            },
            // plugins: ['wholerow', 'search', 'truncate', 'state'],
            plugins: ['wholerow']
        });
        this.events = new Events(['selectLeaf']);
        this.selected = null;
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.$fileTree
        .on('click.jstree', '.jstree-open>a', ({ target }) => {
            setTimeout(() => this.$fileTree.jstree(true).close_node(target));
        })
        .on('click.jstree', '.jstree-closed>a', ({ target }) => {
            setTimeout(() => this.$fileTree.jstree(true).open_node(target));
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
            if (['icon-folder', 'icon-folder-empty'].includes(selected[0].icon)) {
                return;
            }
            this.selected = selected[0].id;
            this.events.run('selectLeaf', selected);
        });
    }

    setDirPath(dirPath) {
        this.dirPath = dirPath;
        this.$fileTree.jstree(true).refresh();
    }

    select(inPath) {
        this.selected = inPath;
        this.$fileTree.jstree(true).deselect_all();
        let node = document.getElementById(inPath);
        if (!node) {
            return;
        }
        this.$fileTree.jstree(true).select_node(node, true, true);
        $(node).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    deselect(inPath) {
        let node = document.getElementById(inPath);
        if (!node) {
            return;
        }
        this.$fileTree.jstree(true).deselect_node(node, true);
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
            icon: 'icon-folder'
        }];
    }

    #getChildren_(inPath) {
        let output = [];
        for (let item of this.getContent(inPath)) {
            const { type, id, children } = item;
            const text = path.basename(id);
            let icon = 'icon-doc';
            if (type === 'dir') {
                icon = children? 'icon-folder' : 'icon-folder-empty';
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
        return output;
    }

    // 可覆盖
    getContent(inPath) {

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
}

Mixly.FileTree = FileTree;

});