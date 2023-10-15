goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('$.contextMenu');
goog.require('Mixly.Config');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.EditorAce');
goog.provide('Mixly.EditorCode');

const {
    Config,
    IdGenerator,
    XML,
    Env,
    Msg,
    EditorAce
} = Mixly;
const { USER, BOARD } = Config;

class EditorCode extends EditorAce {
    static {
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-code.html'));
        this.MENU_TEMPLATE = goog.get(path.join(Env.templatePath, 'editor/editor-context-menu.html'));
    }

    constructor(dom, extname='.c') {
        const $parentContainer = $(dom);
        const id = IdGenerator.generate();
        const $content = $(XML.render(EditorCode.TEMPLATE, {
            mId: id
        }));
        const $editorContainer = $content.find('.editor');
        super($editorContainer[0]);
        this.id = id;
        this.extname = extname.toLowerCase();
        this.$content = $content;
        this.$loading = this.$content.find('.loading');
        this.$editorContainer = $editorContainer;
        $parentContainer.append(this.$content);
        this.defaultContextMenuItems = {
            cut: {
                isHtmlName: true,
                name: this.getItemName(Msg.Lang['剪切'], 'Ctrl+X'),
                callback: (key, opt) => this.cut()
            },
            copy: {
                isHtmlName: true,
                name: this.getItemName(Msg.Lang['复制'], 'Ctrl+C'),
                callback: (key, opt) => this.copy()
            },
            paste: {
                isHtmlName: true,
                name: this.getItemName(Msg.Lang['粘贴'], 'Ctrl+V'),
                callback: (key, opt) => this.paste()
            },
            sep1: '---------',
            togglecomment: {
                isHtmlName: true,
                name: this.getItemName(Msg.Lang['切换行注释'], 'Ctrl+/'),
                callback: (key, opt) => this.editor.execCommand('togglecomment')
            },
            toggleBlockComment: {
                isHtmlName: true,
                name: this.getItemName(Msg.Lang['切换块注释'], 'Ctrl+Shift+/'),
                callback: (key, opt) => this.editor.execCommand('toggleBlockComment')
            }
        };
    }

    init() {
        super.init();
        this.toCodeEditor();
        this.$loading.remove();
        $.contextMenu({
            selector: `div[m-id="${this.id}"] .editor`,
            build: ($trigger, e) => { 
                return { items: this.getContextMenuItems() }
            },
            animation: { duration: 0, show: 'show', hide: 'hide' }
        });
    }

    getContainer() {
        return this.$content;
    }

    toCodeEditor() {
        this.addCtrlBtns();
        this.editor.setShowPrintMargin(false);
        this.editor.setReadOnly(false);
        this.editor.setScrollSpeed(0.8);
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            autoScrollEditorIntoView: true,
            // customScrollbar: true,
        });
        this.setMode();
        this.setTheme();
    }

    setTheme() {
        if (USER.theme === "dark") {
            this.editor.setOption("theme", "ace/theme/twilight");
        } else {
            this.editor.setOption("theme", "ace/theme/xcode");
        }
    }

    setMode() {
        const session = this.editor.getSession();
        let mode = 'c_cpp';
        let tabSize = 4;
        switch(this.extname) {
        case '.py':
            tabSize = 4;
            mode = 'python';
            break;
        case '.c':
        case '.cpp':
        case '.h':
        case '.hpp':
            tabSize = 2;
            mode = 'c_cpp';
            break;
        case '.js':
            tabSize = 4;
            mode = 'javascript';
            break;
        case '.md':
            tabSize = 2;
            mode = 'markdown';
            break;
        default:
            tabSize = 4;
            mode = this.extname.substring(1);
        }
        session.setMode(`ace/mode/${mode}`);
        session.setTabSize(tabSize);
    }

    updateValue(data) {
        this.setValue(data);
        this.scrollToTop();
    }

    // 可覆盖
    getContextMenuItems() {
        return this.defaultContextMenuItems;
    }

    getItemName(name, hotKey) {
        return XML.render(EditorCode.MENU_TEMPLATE, { name, hotKey });
    }
}

Mixly.EditorCode = EditorCode;

});