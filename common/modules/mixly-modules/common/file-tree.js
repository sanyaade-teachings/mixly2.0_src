goog.loadJs('common', () => {

goog.require('XScrollbar');
goog.require('path');
goog.require('$.jstree');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Registry');
goog.provide('Mixly.FileTree');

const {
    Env,
    Config,
    Events,
    ContextMenu,
    Registry
} = Mixly;

const { USER } = Config;

class FileTree {
    static {
        this.FILE_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/file-icons.json'));
        this.FOLDER_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/folder-icons.json'));
    }

    constructor(element) {
        this.folderPath = '';
        this.$content = $(element);
        let thumbBackground;
        if (USER.theme === 'dark') {
            thumbBackground = '#b0b0b0';
        } else {
            thumbBackground = '#5f5f5f';
        }
        this.scrollbar = new XScrollbar(element, {
            onlyHorizontal: false,
            thumbSize: '4px',
            thumbRadius: 0,
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
                    let folderPath = '';
                    if(node.id === '#') {
                        folderPath = this.folderPath;
                    } else {
                        let $li = this.$fileTree.jstree(true).get_node(node, true);
                        let $i = $li.find('.jstree-anchor > .jstree-icon');
                        $i.addClass('layui-anim layui-anim-fadein layui-anim-fadeout layui-anim-loop');
                        folderPath = node.id;
                    }
                    this.#getChildren_(folderPath)
                    .then((data) => {
                        cb(data);
                    })
                    .catch(console.log);
                },
                themes: {
                    dots: true,
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
        this.nodeAliveRegistry = new Registry();
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
            if (!this.nodeAliveRegistry.getItem(id)) {
                this.nodeAliveRegistry.register(id, Date.now());
            }
            let elem = document.getElementById(this.selected);
            if (!elem) {
                return;
            }
            $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
        })
        .on('after_close.jstree', (e, data) => {
            let elem = document.getElementById(this.selected);
            if (!elem) {
                return;
            }
            $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
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

    setFolderPath(folderPath) {
        this.folderPath = folderPath;
        this.nodeAliveRegistry.reset();
        this.jstree.refresh();
    }

    getFolderPath() {
        return this.folderPath;
    }

    select(inPath) {
        this.selected = inPath;
        this.jstree.deselect_all();
        let elem = document.getElementById(inPath);
        if (!elem) {
            return;
        }
        this.jstree.select_node(elem, true, true);
        $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    deselect(inPath) {
        let elem = document.getElementById(inPath);
        if (!elem) {
            return;
        }
        this.jstree.deselect_node(elem, true);
        $(elem).children('.jstree-wholerow').removeClass('jstree-wholerow-clicked');
    }

    #getRoot_() {
        const rootNodeName = path.basename(this.folderPath).toUpperCase();
        return [{
            text: `<div style="font-weight:bold;display:unset;">${rootNodeName}</div>`,
            id: this.folderPath,
            children: true,
            li_attr: {
                title: this.folderPath
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