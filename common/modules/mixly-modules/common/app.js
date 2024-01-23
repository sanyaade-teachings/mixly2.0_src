goog.loadJs('common', () => {

goog.require('Mixly.Msg');
goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Drag');
goog.require('Mixly.Nav');
goog.require('Mixly.NavEvents');
goog.require('Mixly.Workspace');
goog.require('Mixly.FooterBar');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Electron.Loader');
goog.require('Mixly.Component');
goog.provide('Mixly.App');

const {
    Msg,
    Url,
    Config,
    Env,
    Drag,
    Nav,
    NavEvents,
    Workspace,
    FooterBar,
    HTMLTemplate,
    Electron = {},
    Component
} = Mixly;
const { Loader } = Electron;
const { BOARD } = Config;


class App extends Component {
    static {
        HTMLTemplate.add(
            'app.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'app.html')))
        );
    }

    #resizeObserver_ = null;
    #workspace_ = null;
    #nav_ = null;
    #footerbar_ = null;

    constructor(element) {
        super();
        const $content = $(HTMLTemplate.get('app.html').render({
            outputAceName: Msg.Lang['输出'],
            row: Msg.Lang['行'],
            column: Msg.Lang['列'],
            unknown: Msg.Lang['未知'],
            config: Msg.Lang['配置板卡'],
            selected: Msg.Lang['已选择'],
            on: Msg.Lang['在'],
            message: Msg.Lang['消息'],
            example: Msg.Lang['例程']
        }));
        this.setContent($content);
        this.mountOn($(element));
        Nav.init($content.find('.mixly-nav')[0]);
        this.#workspace_ = new Workspace($content.find('.mixly-workspace')[0]);
        NavEvents.init();
        FooterBar.init();
        this.#addEventsListenerForNav_();
        this.#addEventsListenerForWorkspace_();
        this.#addObserver_();
        Mixly.mainStatusBarTabs = this.getWorkspace().statusBarTabs;
    }

    #addEventsListenerForNav_() {
        const { editorManager } = this.#workspace_;
        Nav.register({
            id: 'home-btn',
            preconditionFn: () => {
                return true;
            },
            callback: () => {
                this.#onbeforeunload_();
            },
            scopeType: Nav.Scope.LEFT,
            weight: -1
        });
        Nav.register({
            icon: 'icon-ccw',
            title: 'undo(ctrl+z)',
            id: 'undo-btn',
            displayText: '撤销',
            preconditionFn: () => {
                return !!editorManager.getActive();
            },
            callback: () => editorManager.getActive().undo(),
            scopeType: Nav.Scope.LEFT,
            weight: 0
        });
        Nav.register({
            icon: 'icon-cw',
            title: 'redo(ctrl+y)',
            id: 'redo-btn',
            displayText: '重做',
            preconditionFn: () => {
                return !!editorManager.getActive();
            },
            callback: () => editorManager.getActive().redo(),
            scopeType: Nav.Scope.LEFT,
            weight: 1
        });

        const leftSideBarOption = Nav.register({
            icon: 'codicon-layout-sidebar-left-off',
            title: '操作左侧边栏',
            id: 'left-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragVLeft;
                if (drag.shown === Drag.Extend.NEGATIVE) {
                    drag.exitfull(Drag.Extend.NEGATIVE);
                } else {
                    drag.full(Drag.Extend.NEGATIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 1
        });

        const leftSideBarEvents = this.#workspace_.dragVLeft;
        leftSideBarEvents.bind('onfull', (type) => {
            const { $btn } = leftSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.NEGATIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-left');
            $a.addClass('codicon-layout-sidebar-left-off');
        });

        leftSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = leftSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.NEGATIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-left-off');
            $a.addClass('codicon-layout-sidebar-left');
        });

        const rightSideBarOption = Nav.register({
            icon: 'codicon-layout-sidebar-right-off',
            title: '操作右侧边栏',
            id: 'right-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragVRight;
                if (drag.shown === Drag.Extend.POSITIVE) {
                    drag.exitfull(Drag.Extend.POSITIVE);
                } else {
                    drag.full(Drag.Extend.POSITIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 3
        });

        const rightSideBarEvents = this.#workspace_.dragVRight;
        rightSideBarEvents.bind('onfull', (type) => {
            const { $btn } = rightSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-right');
            $a.addClass('codicon-layout-sidebar-right-off');
        });

        rightSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = rightSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-right-off');
            $a.addClass('codicon-layout-sidebar-right');
        });

        const bottomSideBarOption = Nav.register({
            icon: 'codicon-layout-panel-off',
            title: '操作状态栏',
            id: 'bottom-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragH;
                if (drag.shown === Drag.Extend.POSITIVE) {
                    drag.exitfull(Drag.Extend.POSITIVE);
                } else {
                    drag.full(Drag.Extend.POSITIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 2
        });

        const bottomSideBarEvents = this.#workspace_.dragH;
        bottomSideBarEvents.bind('onfull', (type) => {
            const { $btn } = bottomSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-panel');
            $a.addClass('codicon-layout-panel-off');
        });

        bottomSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = bottomSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-panel-off');
            $a.addClass('codicon-layout-panel');
        });
    }

    #addEventsListenerForWorkspace_() {
        const { editorManager } = this.#workspace_;
        const { tabs } = editorManager;
        tabs.addTab({
            name: 'Untitled-1.mix',
            title: 'Untitled-1.mix',
            type: '.mix',
            favicon: 'fileicon-mix'
        });
    }

    #addObserver_() {
        this.#resizeObserver_ = new ResizeObserver((entries) => {
            let contentRect = entries[0].contentRect;
            if (!(contentRect.width || contentRect.height)) return;
            this.resize();
        });
        this.#resizeObserver_.observe(this.getContent()[0]);
    }

    #onbeforeunload_() {
        if (goog.isElectron) {
            Loader.onbeforeunload();
        } else {
            let href = Config.pathPrefix + 'index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType });
            window.location.replace(href);
        }
    }

    getNav() {
        return this.#nav_;
    }

    getWorkspace() {
        return this.#workspace_;
    }

    getFooterBar() {
        return this.#footerbar_;
    }

    resize() {
        Nav.resize();
        this.#workspace_.resize();
    }

    onMounted() {
        super.onMounted();
        $('.loading').addClass('skeleton-fadeout');
        setTimeout(() => {
            $('.loading').remove();
        }, 500);
    }

    dispose() {
        this.#resizeObserver_.disconnect();
        this.#workspace_.dispose();
        super.dispose();
    }
}

Mixly.App = App;

});