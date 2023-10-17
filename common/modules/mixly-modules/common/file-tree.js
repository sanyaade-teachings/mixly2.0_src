goog.loadJs('common', () => {

goog.require('path');
goog.require('$.jstree');
goog.require('XScrollbar');
goog.require('Mixly.Config');
goog.provide('Mixly.FileTree');

const {
    Config
} = Mixly;

const { USER } = Config;

class FileTree {
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
            this.onClickLeaf(selected);
        });
    }

    setDirPath(dirPath) {
        this.dirPath = dirPath;
        this.$fileTree.jstree(true).refresh();
    }

    select(inPath) {
        this.$fileTree.jstree(true).deselect_all();
        let node = document.getElementById(inPath);
        if (!node) {
            return;
        }
        this.$fileTree.jstree(true).select_node(node, true, true);
        $(node).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
        this.selected = inPath;
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
                icon = this.#getFileIcon_(path.extname(id).substring(1));
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

    // 可覆盖
    onClickLeaf() {
        
    }

    #getFileType_(suffix) {
        if (!suffix) return 'other'; // fileName无后缀返回false
        suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
        // 匹配图片
        const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'ico', 'icns']; // 图片格式
        let result = imgList.find(item => item === suffix);
        if (result) return 'image';
        // 匹配txt
        const txtList = ['txt'];
        result = txtList.find(item => item === suffix);
        if (result) return 'txt';
        // 匹配excel
        const excelList = ['xls', 'xlsx'];
        result = excelList.find(item => item === suffix);
        if (result) return 'excel';
        // 匹配word
        const wordList = ['doc', 'docx'];
        result = wordList.find(item => item === suffix);
        if (result) return 'word';
        // 匹配pdf
        const pdfList = ['pdf'];
        result = pdfList.find(item => item === suffix);
        if (result) return 'pdf';
        // 匹配ppt
        const pptList = ['ppt', 'pptx'];
        result = pptList.find(item => item === suffix);
        if (result) return 'ppt';
        // 匹配zip
        const zipList = ['rar', 'zip', '7z'];
        result = zipList.find(item => item === suffix);
        if (result) return 'zip';
        // 匹配视频
        const videoList = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
        result = videoList.find(item => item === suffix);
        if (result) return 'video';
        // 匹配音频
        const radioList = ['mp3', 'wav', 'wmv'];
        result = radioList.find(item => item === suffix);
        if (result) return 'radio';
        // 匹配代码
        const codeList = ['py', 'js', 'ts', 'css', 'less', 'html', 'xml', 'json', 'c', 'cpp', 'h', 'hpp', 'mix', 'mil'];
        result = codeList.find(item => item === suffix);
        if (result) return 'code';
        // 其他文件类型
        return 'other';
    }

    #getFileIcon_(suffix) {
        const fileType = this.#getFileType_(suffix);
        let icon = 'icon-doc';
        switch (fileType) {
        case 'image':
            icon = 'icon-file-image';
            break;
        case 'txt':
            icon = 'icon-doc-text-inv';
            break;
        case 'excel':
            icon = 'icon-file-excel';
            break;
        case 'word':
            icon = 'icon-file-word';
            break;
        case 'pdf':
            icon = 'icon-file-pdf';
            break;
        case 'ppt':
            icon = 'icon-file-powerpoint';
            break;
        case 'zip':
            icon = 'icon-file-archive';
            break;
        case 'video':
            icon = 'icon-file-video';
            break;
        case 'radio':
            icon = 'icon-file-audio';
            break;
        case 'code':
            icon = 'icon-file-code-1';
            break;
        case 'other':
        default:
            icon = 'icon-doc';
        }
        return icon;
    }
}

Mixly.FileTree = FileTree;

});