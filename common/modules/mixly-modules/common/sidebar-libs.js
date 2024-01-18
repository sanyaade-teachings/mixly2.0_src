goog.loadJs('common', () => {

goog.require('XScrollbar');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.require('Mixly.PageBase');
goog.provide('Mixly.SideBarLibs');

const {
    Env,
    Config,
    HTMLTemplate,
    Debug,
    PageBase
} = Mixly;

const { USER } = Config;


class SideBarLibs extends PageBase {
    static {
        HTMLTemplate.add(
            'sidebar/sidebar-libs.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'sidebar/sidebar-libs.html')))
        );
    }

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('sidebar/sidebar-libs.html').render());
        this.scrollbar = new XScrollbar($content[0], {
            onlyHorizontal: false,
            thumbSize: '4px',
            thumbRadius: '1px',
            thumbBackground: USER.theme === 'dark'? '#b0b0b0' : '#5f5f5f'
        });
        this.setContent($content);
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.SideBarLibs = SideBarLibs;

});