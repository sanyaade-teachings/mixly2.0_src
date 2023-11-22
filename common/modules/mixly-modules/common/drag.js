goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.provide('Mixly.Drag');
goog.provide('Mixly.DragH');
goog.provide('Mixly.DragV');

const { Config, Events } = Mixly;

const { BOARD } = Config;

class Drag {
    static {
        this.DEFAULT_CONFIG = {
            type: 'h',  // 'h' - 水平拖拽，'v' - 垂直拖拽
            min: '100px',  // 元素由于拖拽产生尺寸改变时可以减小到的最小值,
            full: [true, true],  // 允许元素拖拽直至占满整个容器
            startSize: '100%'
        };

        this.Extend = {
            POSITIVE: 1,  // 左或上
            NEGATIVE: 2,  // 右或下
            BOTH: 3  // 左+右或上+下
        };
    }

    constructor(dom, config) {
        this.config = { ...Drag.DEFAULT_CONFIG, ...config };
        this.$container = $(dom);
        const $children = this.$container.children();
        this.$first = $($children[0]);
        this.$last = $($children[1]);
        this.config.elem = [ this.$first, this.$last ];
        this.$dragElem = $('<div></div>');
        const dragType = this.config.type === 'h'? 's' : 'w';
        this.$container.addClass(`drag-${dragType}-container`);
        this.$dragElem.addClass('drag-elem');
        this.shown = Drag.Extend.POSITIVE;
        let dragCssType;
        if (this.config.type === 'h') {
            this.$dragElem.addClass('drag-s-elem horizontal-line');
            dragCssType = 'top';
        } else {
            this.$dragElem.addClass('drag-w-elem vertical-line');
            dragCssType = 'left';
        }
        let size = parseFloat(this.config.startSize);
        if (size >= 100) {
            this.$dragElem.css(dragCssType, 'calc(100% - 4px)');
            size = 100;
            this.shown = Drag.Extend.POSITIVE;
        } else if (size > 0) {
            this.$dragElem.css(dragCssType, `calc(${size}% - 2px)`);
            this.shown = Drag.Extend.BOTH;
        } else {
            this.$dragElem.css(dragCssType, '0px');
            size = 0;
            this.shown = Drag.Extend.NEGATIVE;
        }
        this.$container.prepend(this.$dragElem);
        this.size = [`${size}%`, `${100 - size}%`];
        this.prevSize = this.size;
        this.firstDisplay = this.$first.css('display');
        this.lastDisplay = this.$last.css('display');
        this.events = new Events(['ondragStart', 'ondragEnd', 'onfull', 'exitfull', 'sizeChanged']);
        this.addEventListener();
    }

    addEventListener() {
        const dragElem = this.$dragElem[0];
        const container = this.$container[0];
        const { type, min, elem, full } = this.config;
        dragElem.onmousedown = (elemEvent) => {
            let dis;
            if (type === 'h') {
                dis = elemEvent.clientY;
                dragElem.top = dragElem.offsetTop;
                $('body').addClass('drag-s-resize');
            } else {
                dis = elemEvent.clientX;
                dragElem.left = dragElem.offsetLeft;
                $('body').addClass('drag-w-resize');
            }

            document.onmousemove = (docEvent) => {
                this.events.run('ondragStart');
                let iT, maxT, minT = parseInt(min), movement;
                if (type === 'h') {
                    iT = dragElem.top + (docEvent.clientY - dis);
                    maxT = container.clientHeight - minT;
                    movement = docEvent.movementY;
                } else {
                    iT = dragElem.left + (docEvent.clientX - dis);
                    maxT = container.clientWidth - minT;
                    movement = docEvent.movementX;
                }
                iT += 4;
                if (full[0] && movement < 0 && iT < (minT - minT * 0.6)) { // 向上移动或向左移动
                    this.changeTo('0%');
                    this.events.run('onfull', Drag.Extend.NEGATIVE);
                } else if (full[1] && movement > 0 && iT > (maxT + minT * 0.8)) { // 向下移动或向右移动
                    this.changeTo('100%');
                    this.events.run('onfull', Drag.Extend.POSITIVE);
                } else if (iT < maxT && iT > minT) { // 在minT和maxT间移动
                    if (this.shown !== Drag.Extend.BOTH) {
                        this.events.run('exitfull', this.shown);
                    }
                    this.changeTo(iT);
                }
                this.events.run('ondragEnd');
                return false;
            };
            document.onmouseup = function () {
                if (type === 'h') {
                    $('body').removeClass('drag-s-resize');
                } else {
                    $('body').removeClass('drag-w-resize');
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    changeTo(part) {
        const { type, elem } = this.config;
        const elemCssType = type === 'h'? 'height' : 'width';
        const dragCssType = type === 'h'? 'top' : 'left';
        let elem1Size, elem2Size, precent;
        if (typeof part === 'string' && part.indexOf('%') !== -1) {
            precent = parseFloat(part);
        } else {
            let all;
            if (type === 'h') {
                all = this.$container.height();
            } else {
                all = this.$container.width();
            }
            precent = 100 * parseFloat(part) / all;
        }
        elem1Size = `${precent}%`;
        elem2Size = `${(100 - precent)}%`;
        if (this.size[0] === elem1Size && this.size[1] === elem2Size) {
            return;
        }
        this.prevSize = this.size;
        this.size = [elem1Size, elem2Size];
        if (!precent) {
            this.$dragElem.css(dragCssType, '0px');
            this.shown = Drag.Extend.NEGATIVE;
            this.$first.css('display', 'none');
            this.$last.css('display', this.lastDisplay);
        } else if (precent >= 100) {
            this.$dragElem.css(dragCssType, 'calc(100% - 4px)');
            this.shown = Drag.Extend.POSITIVE;
            this.$first.css('display', this.firstDisplay);
            this.$last.css('display', 'none');
        } else {
            this.$dragElem.css(dragCssType, `calc(${elem1Size} - 2px)`);
            this.shown = Drag.Extend.BOTH;
            this.$first.css('display', this.firstDisplay);
            this.$last.css('display', this.lastDisplay);
        }
        elem[0].css(elemCssType, elem1Size);
        elem[1].css(elemCssType, elem2Size);
        this.events.run('sizeChanged');
    }

    full(type) {
        if ([this.shown, Drag.Extend.BOTH].includes(type)) {
            return;
        }
        if (this.shown !== Drag.Extend.BOTH) {
            this.events.run('exitfull', this.shown);
        }
        switch(type) {
        case Drag.Extend.NEGATIVE:
            this.changeTo('0%');
            break;
        case Drag.Extend.POSITIVE:
            this.changeTo('100%');
        }
        this.events.run('onfull', type);
    }

    exitfull() {
        if (this.shown === Drag.Extend.BOTH) {
            return;
        }
        this.events.run('exitfull', this.shown);
        let prevSize = this.prevSize[0];
        if (prevSize === '100%') {
            prevSize = '85%';
        } else if (prevSize === '0%') {
            prevSize = '15%';
        }
        this.changeTo(prevSize);
    }

    show(type) {
        if ([Drag.Extend.BOTH, this.shown].includes(type)) {
            return;
        }
        this.exitfull();
    }

    hide(type) {
        switch (type) {
        case Drag.Extend.NEGATIVE:
            this.full('POSITIVE');
            break;
        case Drag.Extend.POSITIVE:
            this.full('NEGATIVE');
            break;
        }
    }
}


Drag.elems = {};

class DragH extends Drag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'h'
        });
    }
}

class DragV extends Drag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'v'
        });
    }
}

Mixly.DragH = DragH;
Mixly.DragV = DragV;
Mixly.Drag = Drag;

});