goog.loadJs('common', () => {

goog.require('tippy');
goog.require('Mixly.ContextMenu');
goog.provide('Mixly.DropdownMenu');

const { ContextMenu } = Mixly;


class DropdownMenu {
    #contextMenu_ = null;
    #layer_ = null;
    constructor(selector, menu, config = {}) {
        this.#contextMenu_ = new ContextMenu(selector, {
            trigger: 'none',
            position: (opt) => {
                opt.$menu.css({
                    top: 0,
                    left: 0,
                    position: 'relative',
                    margin: 0
                });
            },
            events: {
                show: (opt) => {
                    opt.$menu.detach();
                    $('body > .mixly-drapdown-menu > .tippy-box > .tippy-content').empty().append(opt.$menu);
                    this.#layer_.setProps({});
                    this.#contextMenu_.shown = true;
                },
                hide: (opt) => {
                    this.#contextMenu_.shown = false;
                    if (this.#layer_.state.isShown) {
                        this.#layer_.hide();
                    }
                }
            }
        });
        
        this.#contextMenu_.register('menu', menu);
        this.#contextMenu_.bind('getMenu', () => 'menu');

        this.#layer_ = tippy($(selector)[0], {
            allowHTML: true,
            content: '',
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 0 ],
            appendTo: document.body,
            arrow: false,
            placement: 'bottom-start',
            delay: 0,
            duration: [ 0, 0 ],
            onCreate: (instance) => {
                $(instance.popper).addClass('mixly-drapdown-menu');
            },
            onMount: (instance) => {
                this.#contextMenu_.show();
            },
            onHide: () => {
                if (this.#contextMenu_.shown) {
                    this.#contextMenu_.hide();
                }
            }
        });
    }
}

Mixly.DropdownMenu = DropdownMenu;

});