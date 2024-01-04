goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.PageBase');
goog.require('Mixly.Electron.FileTree');
goog.require('Mixly.Web.FileTree');
goog.provide('Mixly.SideBarLocalStorage');

const {
    IdGenerator,
    XML,
    Env,
    PageBase,
    Electron = {},
    Web = {}
} = Mixly;

const { FileTree } = goog.isElectron? Electron : Web;


class SideBarLocalStorage extends PageBase {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'sidebar/sidebar-local-storage.html'));
    }

    constructor(element) {
        const $parentContainer = $(element);
        const id = IdGenerator.generate();
        const $content = $(XML.render(SideBarLocalStorage.TEMPLATE, {
            mId: id
        }));
        super();
        this.id = id;
        this.$content = $content;
        $parentContainer.append(this.$content);
        this.$folder = this.$content.find('button.folder');
        this.$iconTriangle = this.$folder.children('.triangle');
        this.$iconFolder = this.$folder.children('.folder');
        this.$name = this.$folder.children('.name');
        this.$children = this.$content.find('.children');
        this.fileTree = new FileTree(this.$children[0]);
        this.folderOpened = false;
        this.hasFolder = false;
        this.addEventsListener();
    }

    init() {
        super.init();
        const $coseBtn = this.getTab().find('.chrome-tab-close');
        $coseBtn.css('display', 'none');
    }

    addEventsListener() {
        this.$folder.click(() => {
            if (!this.hasFolder) {
                return;
            }
            if (this.folderOpened) {
                this.$iconTriangle.removeClass('codicon-chevron-down');
                this.$iconTriangle.addClass('codicon-chevron-right');
                this.$iconFolder.removeClass('opened');
                this.$children.hide();
            } else {
                this.$iconTriangle.removeClass('codicon-chevron-right');
                this.$iconTriangle.addClass('codicon-chevron-down');
                this.$iconFolder.addClass('opened');
                this.$children.show();
            }
            this.folderOpened = !this.folderOpened;
        });
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
        this.hasFolder = true;
    }
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});