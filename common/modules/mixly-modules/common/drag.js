goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.provide('Mixly.Drag');
goog.provide('Mixly.DragH');
goog.provide('Mixly.DragV');

const { Config } = Mixly;

const { BOARD } = Config;

class Drag {
    static {
        this.DEFAULT_CONFIG = {
            type: 'h', // 'h' - 水平拖拽，'v' - 垂直拖拽
            min: null, // 元素由于拖拽产生尺寸改变时可以减小到的最小值,
            full: [true, true], // 允许元素拖拽直至占满整个容器
            ondragStart: null,
            ondragEnd: null,
            onfull: null,
            exitfull: null,
            sizeChanged: null,
            startSize: '100%'
        };
    }
    constructor(dom, config) {
        this.config = { ...Drag.DEFAULT_CONFIG, ...config };
        this.$container = $(dom);
        const $children = this.$container.children();
        this.$first = $($children[0]);
        this.$last = $($children[1]);
        this.config.elem = [ this.$first, this.$last ];
        this.firstDisplay = this.$first.css('display');
        this.lastDisplay = this.$last.css('display');
        let $dragElem = $('<div></div>');
        const dragType = this.config.type === 'h'? 's' : 'w';
        this.$container.addClass(`drag-${dragType}-container`);
        $dragElem.addClass('drag-elem');
        let dragCssType;
        if (this.config.type === 'h') {
            $dragElem.addClass('drag-s-elem horizontal-line');
            dragCssType = 'top';
        } else {
            $dragElem.addClass('drag-w-elem vertical-line');
            dragCssType = 'left';
        }
        const size = parseFloat(this.config.startSize);
        if (size >= 100) {
            $dragElem.css(dragCssType, 'calc(100% - 4px)');
        } else if (size > 0) {
            $dragElem.css(dragCssType, `calc(${size}% - 2px)`);
        } else {
            $dragElem.css(dragCssType, '0px');
        }
        this.$container.prepend($dragElem);
        this.$dragElem = $dragElem;
        this.size = ['100%', '0%'];
        this.onfullMark = 'POSITIVE';
        this.prevSize = this.size;
        this.addEventListener();
    }

    addEventListener() {
        const dragElem = this.$dragElem[0];
        const container = this.$container[0];
        const {
            type,
            min,
            elem,
            ondragStart,
            ondragEnd,
            full,
            onfull,
            exitfull
        } = this.config;
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
                if (typeof ondragStart === 'function') {
                    ondragStart();
                }
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
                    this.changeSize('0%');
                    this.$first.css('display', 'none');
                    this.$last.css('display', this.lastDisplay);
                    if (typeof onfull === 'function') {
                        onfull('NEGATIVE');
                    }
                    this.onfullMark = 'NEGATIVE';
                } else if (full[1] && movement > 0 && iT > (maxT + minT * 0.8)) { // 向下移动或向右移动
                    this.changeSize('100%');
                    this.$first.css('display', this.firstDisplay);
                    this.$last.css('display', 'none');
                    if (typeof onfull === 'function') {
                        onfull('POSITIVE');
                    }
                    this.onfullMark = 'POSITIVE';
                } else if (iT < maxT && iT > minT) { // 在minT和maxT间移动
                    if (['NEGATIVE', 'POSITIVE'].includes(this.onfullMark)
                        && typeof exitfull === 'function'
                        && !exitfull(this.onfullMark)) {
                        return;
                    }
                    if (this.onfullMark) {
                        this.$first.css('display', this.firstDisplay);
                        this.$last.css('display', this.lastDisplay);
                    }
                    this.onfullMark = null;
                    this.changeSize(iT);
                }
                if (typeof ondragEnd === 'function') {
                    ondragEnd();
                }
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
            if (this.end) {
                return false;
            }
        };
    }

    changeSize(part) {
        const { type, elem, sizeChanged } = this.config;
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
        this.prevSize = this.size;
        this.size = [elem1Size, elem2Size];
        if (!precent) {
            this.$dragElem.css(dragCssType, '0px');
        } else if (precent >= 100) {
            this.$dragElem.css(dragCssType, 'calc(100% - 4px)');
        } else {
            this.$dragElem.css(dragCssType, `calc(${elem1Size} - 2px)`);
        }
        elem[0].css(elemCssType, elem1Size);
        elem[1].css(elemCssType, elem2Size);
        if (typeof sizeChanged === 'function') {
            sizeChanged();
        }
    }

    full(direction) {
        const { exitfull, onfull } = this.config;
        if (typeof exitfull === 'function') {
            switch(this.onfullMark) {
            case 'NEGATIVE':
                exitfull('POSITIVE');
                break;
            case 'POSITIVE':
                exitfull('NEGATIVE');
                break;
            }
        }
        switch(direction) {
        case 'NEGATIVE':
            this.onfullMark = 'NEGATIVE';
            this.changeSize('0%');
            break;
        case 'POSITIVE':
        default:
            this.onfullMark = 'POSITIVE';
            this.changeSize('100%');
        }
        onfull(direction);
    }

    exitfull() {
        if (!this.onfullMark) return;
        const { exitfull } = this.config;
        if (typeof exitfull === 'function') {
            switch(this.onfullMark) {
            case 'NEGATIVE':
                exitfull('POSITIVE');
                break;
            case 'POSITIVE':
                exitfull('NEGATIVE');
                break;
            }
        }
        this.onfullMark = null;
        this.changeSize(this.prevSize[0]);
    }

    show() {
        const { exitfull } = this.config;
        if (typeof exitfull === 'function') {
            switch(this.onfullMark) {
            case 'NEGATIVE':
                exitfull('POSITIVE');
                break;
            case 'POSITIVE':
                exitfull('NEGATIVE');
                break;
            }
        }
        this.onfullMark = null;
        if (this.prevSize && parseInt(this.prevSize[0]) < 100 && parseInt(this.prevSize[0]) > 0)
            this.changeSize(this.prevSize[0]);
        else
            this.changeSize('70%');
    }

    hide() {
        this.full('POSITIVE');
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