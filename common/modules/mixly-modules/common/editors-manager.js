goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.EditorMix');
goog.require('Mixly.EditorCode');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorUnknown');
goog.require('Mixly.EditorsTabs');
goog.provide('Mixly.EditorsManager');

const {
    IdGenerator,
    XML,
    Env,
    EditorMix,
    EditorCode,
    EditorBlockly,
    EditorUnknown,
    EditorsTabs
} = Mixly;

class EditorsManager {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-manager.html'));
        this.WELCOME_PAGE = goog.get(path.join(Env.templatePath, 'editor/welcome-page.html'));
        /**
         * {
         *      "ext": Array | String
         *      "editor": Class
         * }
         **/
        this.config = {};

        this.register = function(config) {
            if (config.ext instanceof Array) {
                for (let i of config.ext) {
                    this.config[i] = config.editor;
                }
            } else {
                this.config[config.ext] = config.editor;
            }
        }
    }

    constructor(dom) {
        const $parentContainer = $(dom);
        this.id = IdGenerator.generate();
        this.$content = $(XML.render(EditorsManager.TEMPLATE, {
            mId: this.id
        }));
        this.$welcomePage = $(XML.render(EditorsManager.WELCOME_PAGE, {
            mId: IdGenerator.generate()
        }));
        this.$container = this.$content.children('div');
        this.editorTabs = new EditorsTabs(this.$container[0]);
        this.$editorContainer = $('<div style="width: 100%; height: 100%;"></div>');
        this.$container.append(this.$editorContainer);
        $parentContainer.empty();
        $parentContainer.append(this.$content);
        this.$container.replaceWith(this.$welcomePage);
        this.page = 'welcome';
        this.#addEvents_();
        this.editors = {};
        this.shownEditorName = null;
        /*this.editorTabs.addTab({
            name: '测试1.mix',
            favicon: false,
            title: 'D:/测试1.mix'
        });
        this.editorTabs.addTab({
            name: '测试2.mix',
            favicon: false,
            title: 'D:/测试2.mix'
        });
        this.editorTabs.addTab({
            name: '测试3.mix',
            favicon: false,
            title: 'D:/测试3.mix'
        });
        this.editorTabs.addTab({
            name: '未知文件.txt',
            favicon: false,
            title: 'D:/测试1.txt'
        }, { background: true });
        this.editorTabs.addTab({
            name: '未知文件.test',
            favicon: false,
            title: 'D:/测试1.test'
        }, { background: true });*/
    }

    #addEvents_() {
        this.editorTabs.activeTabChange = this.activeTabChange.bind(this);
        this.editorTabs.tabAdd = this.tabAdd.bind(this);
        this.editorTabs.tabRemove = this.tabRemove.bind(this);
    }

    activeTabChange(event) {
        const { tabEl } = event.detail;
        const tabId = $(tabEl).attr('data-tab-id');
        const editor = this.editors[tabId];
        this.shownEditorName = tabId;
        this.$editorContainer.empty();
        this.$editorContainer.append(editor.getContainer());
        if (this.editors[tabId].inited) {
            editor.onMount && editor.onMount();
        }
    }

    tabAdd(event) {
        const { tabEl } = event.detail;
        const tabId = $(tabEl).attr('data-tab-id');
        const extname = path.extname(tabId);
        let editor = EditorsManager.config[extname];
        if (!editor) {
            editor = EditorUnknown;
        }
        this.editors[tabId] = new editor(this.$editorContainer[0]);
        if (Object.keys(this.editors).length && this.page === 'welcome') {
            this.$welcomePage.replaceWith(this.$container);
            this.page = 'editor';
        }
        setTimeout(() => {
            this.editors[tabId].init();
            this.editors[tabId].inited = true;
        }, 500);
    }

    tabRemove(event) {
        const { tabEl } = event.detail;
        const tabId = $(tabEl).attr('data-tab-id');
        if (!this.editors[tabId]) {
            return;
        }
        this.editors[tabId].dispose();
        delete this.editors[tabId];
        delete this.editorTabs.tabs[tabId];
        if (!Object.keys(this.editors).length && this.page !== 'welcome') {
            this.$container.replaceWith(this.$welcomePage);
            this.page = 'welcome';
        }
    }

    resize() {
        const editor = this.getCurrentEditor();
        editor && editor.resize();
    }

    getCurrentEditor() {
        if (!this.shownEditorName) {
            return null;
        }
        return this.editors[this.shownEditorName];
    }
}

EditorsManager.register({
    ext: ['.mix', '.mil'],
    editor: EditorMix
});

EditorsManager.register({
    ext: ['.test'],
    editor: EditorBlockly
});

EditorsManager.register({
    ext: ['.xml', '.txt', '.ino', '.json'],
    editor: EditorCode
});

Mixly.EditorsManager = EditorsManager;

});