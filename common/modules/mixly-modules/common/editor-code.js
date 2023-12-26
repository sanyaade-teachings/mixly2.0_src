goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.Config');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.EditorMonaco');
goog.provide('Mixly.EditorCode');

const {
    Config,
    IdGenerator,
    XML,
    Env,
    Msg,
    ContextMenu,
    EditorMonaco
} = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorMonaco {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-code.html'));
    }

    constructor(element) {
        const $parentContainer = $(element);
        const id = IdGenerator.generate();
        const $content = $(XML.render(EditorCode.TEMPLATE, {
            mId: id
        }));
        const $editorContainer = $content.find('.editor');
        super($editorContainer[0]);
        this.id = id;
        this.$content = $content;
        this.$loading = this.$content.find('.loading');
        this.$editorContainer = $editorContainer;
        $parentContainer.append(this.$content);
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
        this.$loading.remove();
        this.contextMenu = new ContextMenu(`div[m-id="${this.id}"] .editor`);
        const { events } = this.contextMenu;
        events.bind('getMenu', () => {
            return this.defaultContextMenu;
        });
        this.setTheme(USER.theme);
    }

    setValue(data, ext) {
        super.setValue(data);
    }

    dispose() {
        super.dispose();
        this.contextMenu.dispose();
    }
}

Mixly.EditorCode = EditorCode;

});