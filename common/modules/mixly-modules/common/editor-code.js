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
const { USER } = Config;

class EditorCode extends EditorMonaco {
    #contextMenu_ = null;
    #contextMenuId_ = null;

    constructor() {
        super();
        this.#contextMenuId_ = IdGenerator.generate();
        this.getContent().attr('content-menu-id', this.#contextMenuId_);
    }

    init() {
        super.init();
        this.setLanguage('text');
        this.setTabSize(4);
        this.#addContextMenu_();
        this.setTheme(USER.theme);
    }

    onMounted() {
        super.onMounted();
        this.#addChangeEventListenerExt_();
    }

    #addContextMenu_() {
        this.#contextMenu_ = new ContextMenu(`div[content-menu-id="${this.#contextMenuId_}"]`);
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
        this.#contextMenu_.register('code', menu);
        this.#contextMenu_.bind('getMenu', () => 'code');
    }

    getContextMenu() {
        return this.#contextMenu_;
    }

    setValue(data, ext) {
        this.disableChangeEvent();
        super.setValue(data, ext);
        this.setLanguage(this.getLanguageByExt(ext));
        this.enableChangeEvent();
    }

    getLanguageByExt(ext) {
        let language = 'text';
        switch(ext) {
        case '.json':
            language = 'json';
            break;
        case '.c':
        case '.cpp':
        case '.h':
        case '.hpp':
        case '.ino':
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
            break;
        default:
            language = 'text';
        }
        return language;
    }

    #addChangeEventListenerExt_() {
        this.offEvent('change');
        this.bind('change', () => this.addDirty());
    }

    dispose() {
        this.#contextMenu_.dispose();
        this.#contextMenu_ = null;
        super.dispose();
    }
}

Mixly.EditorCode = EditorCode;

});