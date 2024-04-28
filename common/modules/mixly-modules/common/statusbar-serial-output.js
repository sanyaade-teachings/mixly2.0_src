goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.PageBase');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Menu');
goog.require('Mixly.Msg');
goog.provide('Mixly.StatusBarSerialOutput');

const {
    PageBase,
    StatusBar,
    Env,
    HTMLTemplate,
    IdGenerator,
    ContextMenu,
    Menu,
    Msg
} = Mixly;


class StatusBarSerialOutput extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-serial-output.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'statusbar/statusbar-serial-output.html')))
        );
    }

    #$scroll_ = null;
    #$timestamp_ = null;
    #$hex_ = null;
    #scroll_ = true;
    #timestamp_ = false;
    #hex_ = false;
    #contextMenuId_ = IdGenerator.generate();
    #contextMenu_ = null;

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-serial-output.html');
        const $content = $(template.render());
        $content.attr('content-menu-id', this.#contextMenuId_);
        this.setContent($content);
        this.#$scroll_ = $content.find('.scroll');
        this.#$timestamp_ = $content.find('.timestamp');
        this.#$hex_ = $content.find('.hex');
        this.addPage($content.find('.body'), 'editor', new StatusBar());
        this.#addEventsListener_();
        this.#addContextMenu_();
    }

    #addContextMenu_() {
        this.#contextMenu_ = new ContextMenu(`div[content-menu-id="${this.#contextMenuId_}"]`);
        let menu = new Menu();
        menu.add({
            weight: 0,
            type: 'copy',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['复制'], 'Ctrl+C'),
                callback: (key, opt) => this.getPage('editor').copy()
            }
        });
        this.#contextMenu_.register('code', menu);
        this.#contextMenu_.bind('getMenu', () => 'code');
    }

    #addEventsListener_() {
        this.#$scroll_.change((event) => {
            let scroll = false;
            if (this.#$scroll_.prop('checked')) {
                scroll = true;
            }
            this.#scroll_ = scroll;
        });

        this.#$timestamp_.change((event) => {
            let timestamp = false;
            if (this.#$timestamp_.prop('checked')) {
                timestamp = true;
            }
            this.#timestamp_ = timestamp;
        });

        this.#$hex_.change((event) => {
            let hex = false;
            if (this.#$hex_.prop('checked')) {
                hex = true;
            }
            this.#hex_ = hex;
        });
    }

    init() {
        super.init();
        this.hideCloseBtn();
        this.#$scroll_.prop('checked', this.#scroll_);
        this.#$timestamp_.prop('checked', this.#timestamp_);
        this.#$hex_.prop('checked', this.#hex_);
    }

    getValue() {
        return this.getPage('editor').getValue();
    }

    setValue(data, scroll) {
        this.getPage('editor').setValue(data, scroll);
    }

    addValue(data, scroll) {
        this.getPage('editor').addValue(data, scroll);
    }

    getPageAce() {
        return this.getPage('editor');
    }

    getEditor() {
        return this.getPage('editor').getEditor();
    }

    getContextMenuId() {
        return this.#contextMenuId_;
    }

    getContextMenu() {
        return this.#contextMenu_;
    }
    
    scrollChecked() {
        return this.#scroll_;
    }

    timestampChecked() {
        return this.#timestamp_;
    }

    hexChecked() {
        return this.#hex_;
    }

    dispose() {
        this.#contextMenu_.dispose();
        this.#contextMenu_ = null;
        super.dispose();
    }
}

Mixly.StatusBarSerialOutput = StatusBarSerialOutput;

});