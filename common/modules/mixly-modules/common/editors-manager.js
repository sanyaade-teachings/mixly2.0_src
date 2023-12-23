goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Nav');
goog.require('Mixly.EditorMix');
goog.require('Mixly.EditorCode');
goog.require('Mixly.EditorMd');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorUnknown');
goog.require('Mixly.EditorWelcome');
goog.require('Mixly.Registry');
goog.require('Mixly.PagesManager');
goog.provide('Mixly.EditorsManager');

const {
    IdGenerator,
    XML,
    Env,
    Nav,
    EditorMix,
    EditorCode,
    EditorMd,
    EditorBlockly,
    EditorUnknown,
    EditorWelcome,
    Registry,
    PagesManager
} = Mixly;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');

class EditorsManager extends PagesManager {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-manager.html'));
        this.TAB_TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-tab.html'));
        this.typesRegistry = new Registry();
        this.typesRegistry.register(['.mix', '.mil'], EditorMix);
        this.typesRegistry.register('.test', EditorBlockly);
        this.typesRegistry.register(['.xml', '.txt', '.ino', '.json'], EditorCode);
        this.typesRegistry.register('.md', EditorMd);
        this.typesRegistry.register('#default', EditorUnknown);
        this.typesRegistry.register('#welcome', EditorWelcome);
    }

    constructor(element) {
        const ids = IdGenerator.generate(['managerId', 'tabId']);
        const $manager = $(XML.render(EditorsManager.TEMPLATE, {
            mId: ids.managerId
        }));
        const $tab = $(XML.render(EditorsManager.TAB_TEMPLATE, {
            mId: ids.tabId
        }));
        super({
            parentElem: element,
            managerId: ids.managerId,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabId: ids.tabId,
            tabContentElem: $tab[0],
            typesRegistry: EditorsManager.typesRegistry
        });
        this.#addEventsListenerExt_();
    }

    #addEventsListenerExt_() {
        const editorTabs = this.getTabs();
        
        // active Tab被改变时触发
        editorTabs.bind('activeChange', (event) => {
            const $btnsContainer = Nav.getEditorBtnsContainer();
            $btnsContainer.children().detach();
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = this.pagesRegistry.getItem(id);
            const $btns = editor.getBtnsContainer();
            if ($btns && $btns.length) {
                $btnsContainer.append($btns);
            }
        });

        // 添加新Tab时触发
        editorTabs.bind('created', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = this.pagesRegistry.getItem(id);
            editor.events.bind('onAddDirty', ($tab) => {
                this.tabs.updateTab($tab[0], {
                    title: id + ' - 未保存'
                });
            });
            editor.events.bind('onRemoveDirty', ($tab) => {
                this.tabs.updateTab($tab[0], {
                    title: id
                });
            });
        });

        editorTabs.bind('checkDestroy', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = this.pagesRegistry.getItem(id);
            if (!editor) {
                return;
            }
            return !editor.dirty;
        });

        // 移除已有Tab时触发
        editorTabs.bind('destroyed', (event) => {
            if (!this.pagesRegistry.length()) {
                const $btnsContainer = Nav.getEditorBtnsContainer();
                $btnsContainer.children().detach();
            }
        });
    }
}

Mixly.EditorsManager = EditorsManager;

});