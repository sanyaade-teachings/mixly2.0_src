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
            elem: null, // 由于拖拽而产生尺寸改变的元素
            min: null, // 元素由于拖拽产生尺寸改变时可以减小到的最小值,
            full: [true, true], // 允许元素拖拽直至占满整个容器
            ondragStart: null,
            ondragEnd: null,
            onfull: null,
            exitfull: null,
            sizeChanged: null
        };
    }
    constructor(container, config) {
        this.config = { ...Drag.DEFAULT_CONFIG, ...config };
        this.$container = $(`#${container}`);
        if (!this.config.elem) {
            this.config.elem = [];
            const $children = this.$container.children();
            this.config.elem.push($($children.get(0)), $($children.get(1)));
        }
        let $dragElem = $('<div></div>'), $dragElemContainer = $('<div></div>');
        const dragType = this.config.type === 'h'? 's' : 'w';
        this.$container.addClass(`drag-${dragType}-container`);
        $dragElemContainer.addClass(`drag-${dragType}-elem-container`);
        if (this.config.type === 'h') {
            const height = 100 * this.config.elem[0].height() / this.$container.height();
            if (height) {
                $dragElemContainer.css({
                    'height': height + '%',
                });
            } else {
                $dragElemContainer.css({
                    'height': '4px',
                });
            }
            $dragElem.addClass('drag-s-elem horizontal-line');
        } else {
            const width = 100 * this.config.elem[0].width() / this.$container.width();
            if (width) {
                $dragElemContainer.css({
                    'width': width + '%',
                });
            } else {
                $dragElemContainer.css({
                    'width': '4px',
                });
            }
            $dragElem.addClass('drag-w-elem vertical-line');
        }
        $dragElemContainer.append($dragElem);
        this.$container.prepend($dragElemContainer);
        this.$dragElemContainer = $dragElemContainer;
        this.$dragElem = $dragElem;
        this.size = ['100%', '0%'];
        this.onfullMark = 'POSITIVE';
        this.prevSize = this.size;
        this.addEventListener();
    }

    addEventListener() {
        const dragElem = this.$dragElem[0],
        _this = this,
        container = this.$container[0],
        {
            type,
            min,
            elem,
            ondragStart,
            ondragEnd,
            full,
            onfull,
            exitfull
        } = this.config;
        dragElem.onmousedown = function (elemEvent) {
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

            document.onmousemove = function (docEvent) {
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
                    _this.changeSize('0%');
                    if (typeof onfull === 'function') {
                        onfull('NEGATIVE');
                    }
                    _this.onfullMark = 'NEGATIVE';
                } else if (full[1] && movement > 0 && iT > (maxT + minT * 0.8)) { // 向下移动或向右移动
                    _this.changeSize('100%');
                    if (typeof onfull === 'function') {
                        onfull('POSITIVE');
                    }
                    _this.onfullMark = 'POSITIVE';
                } else if (iT < maxT && iT > minT) { // 在minT和maxT间移动
                    switch (_this.onfullMark) {
                    case 'NEGATIVE':
                        if (typeof exitfull === 'function' && !exitfull('POSITIVE'))
                            return;
                        break;
                    case 'POSITIVE':
                        if (typeof exitfull === 'function' && !exitfull('NEGATIVE'))
                            return;
                        break;
                    }
                    _this.onfullMark = null;
                    _this.changeSize(iT);
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
            if (_this.end) {
                return false;
            }
        };
    }

    changeSize(part) {
        const { type, elem, sizeChanged } = this.config,
        cssType = type === 'h'? 'height' : 'width';
        let elem1Size,
        elem2Size,
        elem1List = [],
        elem2List = [];
        elem1List.push(elem[0]);
        elem2List.push(elem[1]);
        if (typeof part === 'string' && part.indexOf('%') !== -1) {
            elem1Size = part;
            elem2Size = (100 - parseFloat(elem1Size)) + '%';
        } else {
            let all;
            if (type === 'h') {
                all = this.$container.height();
            } else {
                all = this.$container.width();
            }
            elem1Size = (100 * parseFloat(part) / all) + '%';
            elem2Size = (100 * (1 - parseFloat(part) / all)) + '%';
        }
        this.prevSize = this.size;
        this.size = [elem1Size, elem2Size];
        if (!parseFloat(elem1Size)) {
            if (type === 'h') {
                this.$dragElemContainer.css('height', '4px');
            } else {
                this.$dragElemContainer.css('width', '4px');
            }
        } else {
            elem1List = [ this.$dragElemContainer, ...elem1List ];
        }
        for (let $elem1 of elem1List) {
            $elem1.css(cssType, elem1Size);
        }
        for (let $elem2 of elem2List) {
            $elem2.css(cssType, elem2Size);
        }
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