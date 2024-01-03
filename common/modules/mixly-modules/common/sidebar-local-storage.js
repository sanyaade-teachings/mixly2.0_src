goog.loadJs('common', () => {

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
        this.fileTree = new FileTree(this.$content.children('div')[0]);
        this.fileTree.setDirPath('D:/gitee');
    }

    init() {
        super.init();
        const $coseBtn = this.getTab().find('.chrome-tab-close');
        $coseBtn.css('display', 'none');
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
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});