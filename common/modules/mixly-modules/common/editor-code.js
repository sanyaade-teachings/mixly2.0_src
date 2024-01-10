goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorMonaco');
goog.provide('Mixly.EditorCode');

const {
    Config,
    XML,
    Env,
    Msg,
    ContextMenu,
    HTMLTemplate,
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
    }

    init() {
        super.init();
        let language = 'cpp';
        let tabSize = 4;
        let type = (BOARD.language || '').toLowerCase();
        switch(type) {
        case 'python':
        case 'micropython':
        case 'circuitpython':
            tabSize = 4;
            language = 'python';
            break;
        case 'c/c++':
            tabSize = 2;
            language = 'cpp';
            break;
        case 'javascript':
            tabSize = 4;
            language = 'javascript';
            break;
        case 'markdown':
            tabSize = 2;
            language = 'markdown';
            break;
        default:
            tabSize = 4;
            language = 'text';
        }
        this.setTabSize(tabSize);
        this.setLanguage(language);
        this.contextMenu = new ContextMenu(`div[m-id="${this.id}"]`);
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