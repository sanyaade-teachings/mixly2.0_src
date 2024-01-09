goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
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
        const $folderContent = $(HTMLTemplate.get('sidebar/sidebar-local-storage.html').render());
        const $openFolderContent = $(HTMLTemplate.get('sidebar/sidebar-local-storage-open-folder.html').render());
        super();
        this.$openFolderContent = $openFolderContent;
        this.$folderContent = $folderContent;
        this.setContent($openFolderContent);
        $parentContainer.append($openFolderContent);
        this.$folder = $folderContent.find('.folder-title');
        this.$iconTriangle = this.$folder.find('.triangle');
        this.$iconFolder = this.$folder.find('.folder');
        this.$name = this.$folder.find('.name');
        this.$children = $folderContent.find('.children');
        this.fileTree = new FileTree(this.$children[0]);
        this.folderOpened = false;
        this.addEventsListener();
    }

    init() {
        super.init();
        const $closeBtn = this.getTab().find('.chrome-tab-close');
        $closeBtn.css('display', 'none');
    }

    addEventsListener() {
        this.$folder.click(() => {
            if (this.folderOpened) {
                this.$iconTriangle.removeClass('codicon-chevron-down');
                this.$iconTriangle.addClass('codicon-chevron-right');
                this.$iconFolder.removeClass('opened');
                this.$folder.removeClass('opened');
                this.$children.hide();
                this.fileTree.deselectAll();
                this.fileTree.reselect();
            } else {
                this.$iconTriangle.removeClass('codicon-chevron-right');
                this.$iconTriangle.addClass('codicon-chevron-down');
                this.$iconFolder.addClass('opened');
                this.$folder.addClass('opened');
                this.$children.show();
            }
            this.folderOpened = !this.folderOpened;
        });

        this.$openFolderContent.find('button').click(() => {
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
            .catch(console.log);
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
    }
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});