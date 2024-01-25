goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Menu');
goog.require('Mixly.EditorMonaco');
goog.provide('Mixly.EditorCode');

const {
    Config,
    XML,
    Env,
    Msg,
    ContextMenu,
    IdGenerator,
    Menu,
    EditorMonaco
} = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorMonaco {
    constructor() {
        super();
        this.contextMenuId = IdGenerator.generate();
        this.getContent().attr('content-menu-id', this.contextMenuId);
        this.tabSize = null;
        this.language = null;
        this.contextMenu = null;
    }

    init() {
        super.init();
        this.language = this.getDefaultLanguage();
        this.tabSize = this.getDefaultTabSize();
        this.setLanguage(this.language);
        this.setTabSize(this.tabSize);
        this.#addContextMenu_();
        this.setTheme(USER.theme);
    }

    onMounted() {
        super.onMounted();
        this.#addChangeEventListenerExt_();
    }

    #addContextMenu_() {
        this.contextMenu = new ContextMenu(`div[content-menu-id="${this.contextMenuId}"]`);
        let menu = new Menu();
        menu.add({
            weight: 0,
            type: 'cut',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['剪切'], 'Ctrl+X'),
                callback: (key, opt) => this.cut()
            }
        });
        menu.add({
            weight: 1,
            type: 'copy',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['复制'], 'Ctrl+C'),
                callback: (key, opt) => this.copy()
            }
        });
        menu.add({
            weight: 2,
            type: 'paste',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['粘贴'], 'Ctrl+V'),
                callback: (key, opt) => this.paste()
            }
        });
        menu.add({
            weight: 3,
            type: 'sep1',
            data: '---------'
        });
        menu.add({
            weight: 3,
            type: 'togglecomment',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['切换行注释'], 'Ctrl+/'),
                callback: (key, opt) => this.commentLine()
            }
        });
        menu.add({
            weight: 3,
            type: 'toggleBlockComment',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['切换块注释'], 'Shift+Alt+A'),
                callback: (key, opt) => this.blockComment()
            }
        });
        this.contextMenu.register('code', menu);
        this.contextMenu.bind('getMenu', () => 'code');
    }

    getContextMenu() {
        return this.contextMenu;
    }

    setValue(data, ext) {
        this.disableChangeEvent();
        super.setValue(data);
        this.language = this.getLanguageByExt(ext);
        this.setLanguage(this.language);
        this.enableChangeEvent();
    }

    getLanguageByExt(ext) {
        let language = this.getDefaultLanguage();
        switch(ext) {
        case '.json':
            language = 'json';
            break;
        case '.c':
        case '.cpp':
        case '.h':
        case '.hpp':
            language = 'cpp';
            break;
        case '.js':
            language = 'javascript';
            break;
        case '.py':
            language = 'python';
            break;
        case '.md':
        case '.mdx':
            language = 'markdown';
        }
        return language;
    }

    getDefaultLanguage() {
        let language = 'javascript';
        let type = (BOARD.language || '').toLowerCase();
        switch(type) {
        case 'python':
        case 'micropython':
        case 'circuitpython':
            language = 'python';
            break;
        case 'c/c++':
            language = 'cpp';
            break;
        case 'javascript':
            language = 'javascript';
            break;
        case 'markdown':
            language = 'markdown';
            break;
        default:
            language = 'text';
        }
        return language;
    }

    getDefaultTabSize() {
        let tabSize = 4;
        let type = (BOARD.language || '').toLowerCase();
        switch(type) {
        case 'python':
        case 'micropython':
        case 'circuitpython':
            tabSize = 4;
            break;
        case 'c/c++':
            tabSize = 2;
            break;
        case 'javascript':
            tabSize = 4;
            break;
        case 'markdown':
            tabSize = 2;
            break;
        default:
            tabSize = 4;
        }
        return tabSize;
    }

    #addChangeEventListenerExt_() {
        this.offEvent('change');
        this.bind('change', () => this.addDirty());
    }

    dispose() {
        this.contextMenu.dispose();
        this.contextMenu = null;
        this.defaultContextMenu = null;
        super.dispose();
    }
}

Mixly.EditorCode = EditorCode;

});