goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.EditorMonaco');
goog.provide('Mixly.EditorCode');

const {
    Config,
    XML,
    Env,
    Msg,
    ContextMenu,
    HTMLTemplate,
    IdGenerator,
    EditorMonaco
} = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorMonaco {
    static {
        HTMLTemplate.add(
            'editor/editor-code.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'editor/editor-code.html')))
        );
    }

    constructor(element) {
        const $parentContainer = $(element);
        const editorHTMLTemplate = HTMLTemplate.get('editor/editor-code.html');
        const $content = $(editorHTMLTemplate.render());
        super($content[0]);
        this.contextMenuId = IdGenerator.generate();
        $content.attr('content-menu-id', this.contextMenuId);
        this.id = editorHTMLTemplate.id;
        this.setContent($content);
        $parentContainer.append(this.getContent());
        this.defaultContextMenu = {
            cut: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['剪切'], 'Ctrl+X'),
                callback: (key, opt) => this.cut()
            },
            copy: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['复制'], 'Ctrl+C'),
                callback: (key, opt) => this.copy()
            },
            paste: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['粘贴'], 'Ctrl+V'),
                callback: (key, opt) => this.paste()
            },
            sep1: '---------',
            togglecomment: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['切换行注释'], 'Ctrl+/'),
                callback: (key, opt) => this.commentLine()
            },
            toggleBlockComment: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['切换块注释'], 'Shift+Alt+A'),
                callback: (key, opt) => this.blockComment()
            }
        };
        this.tabSize = null;
        this.language = null;
    }

    init() {
        super.init();
        this.language = this.getDefaultLanguage();
        this.tabSize = this.getDefaultTabSize();
        this.setLanguage(this.language);
        this.setTabSize(this.tabSize);
        this.contextMenu = new ContextMenu(`div[content-menu-id="${this.contextMenuId}"]`);
        const { events } = this.contextMenu;
        events.bind('getMenu', () => {
            return this.defaultContextMenu;
        });
        this.setTheme(USER.theme);
    }

    setContextMenu(menu) {
        this.defaultContextMenu = menu;
    }

    setValue(data, ext) {
        super.setValue(data);
        this.language = this.getLanguageByExt(ext);
        this.setLanguage(this.language);
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

    dispose() {
        this.contextMenu.dispose();
        this.events.reset();
        this.contextMenu = null;
        this.defaultContextMenu = null;
        super.dispose();
    }
}

Mixly.EditorCode = EditorCode;

});