goog.loadJs('common', () => {

goog.require('Mixly.Editor');
goog.require('Mixly.Config');
goog.provide('Mixly.Drag');

const { Editor, Config, Drag } = Mixly;

const { BOARD } = Config;

class MDrag {
    constructor(container, config) {
        const DEFAULT_CONFIG = {
            type: 'h', // 'h' - 水平拖拽，'v' - 垂直拖拽
            elem: null, // 由于拖拽而产生尺寸改变的元素
            min: null, // 元素由于拖拽产生尺寸改变时可以减小到的最小值,
            full: [true, true], // 允许元素拖拽直至占满整个容器
            ondragStart: null,
            ondragEnd: null,
            onfull: null,
            exitfull: null,
            sizeChanged: null
        }
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.$container = $('#' + container);
        if (!this.config.elem) {
            this.config.elem = [];
            const $children = this.$container.children();
            this.config.elem.push([ $($children.get(0)) ], [ $($children.get(1)) ]);
        }
        let $dragElem = $('<div></div>'), $dragElemContainer = $('<div></div>');
        const dragType = this.config.type === 'h'? 's' : 'w';
        this.$container.addClass('drag-' + dragType + '-container');
        $dragElemContainer.addClass('drag-' + dragType + '-elem-container');
        if (this.config.type === 'h') {
            $dragElemContainer.css({
                'height': 100 * this.config.elem[0][0].height() / this.$container.height() + '%',
            });
            $dragElem.addClass('drag-s-elem horizontal-line');
        } else {
            $dragElemContainer.css({
                'width': 100 * this.config.elem[0][0].width() / this.$container.width() + '%',
            });
            $dragElem = $('<div></div>');
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
        let movedElemList1 = elem[0], movedElemList2 = elem[1];
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
                if (type === 'h')
                    $('body').removeClass('drag-s-resize');
                else
                    $('body').removeClass('drag-w-resize');
                document.onmousemove = null;
                document.onmouseup = null;
            };
            if (_this.end)
            return false;
        };
    }

    changeSize(part) {
        const { type, elem, sizeChanged } = this.config,
        cssType = type === 'h'? 'height' : 'width';
        let elem1Size, elem2Size,
        [ elem1List, elem2List ] = elem;
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
            if (type === 'h')
                this.$dragElemContainer.css('height', '4px');
            else
                this.$dragElemContainer.css('width', '4px');
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
}

Drag.elems = {};

class HorizontalDrag extends MDrag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'h'
        });
    }
}

class VerticalDrag extends MDrag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'v'
        });
    }
}

Drag.HorizontalDrag = HorizontalDrag;/*(elem, config) => {
    Drag.elems[elem] = new MDrag(elem, {
        ...config,
        type: 'h'
    });
}*/

Drag.VerticalDrag = VerticalDrag;/*(elem, config) => {
    Drag.elems[elem] = new MDrag(elem, {
        ...config,
        type: 'v'
    });
}*/

Drag.init = () => {
    Drag.items = {
        vDrag: Drag.EditorBarInit(),
        hDrag: Drag.statusBarInit()
    };
    Editor.items = { ...Drag.items };
    Drag.addBtnClickEvent();
}

Drag.EditorBarInit = () => {
    const { blockEditor, codeEditor } = Editor;
    const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
    const $codeArea = $('#nav').find('button[m-id="code-area"]').children('a');
    const vDrag = new Drag.VerticalDrag('v-container', {
        min: '200px',
        full: [true, true],
        sizeChanged: function() {
            // 重新调整编辑器尺寸
            $(blockEditor.getParentSvg()).attr({
                width: $('#' + Editor.DIV_NAME.BLOCK).width(),
                height: $('#' + Editor.DIV_NAME.BLOCK).height()
            });

            codeEditor.resize();
            Blockly.fireUiEvent(window, 'resize');
        },
        onfull: function(type) {
            switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 完全显示块编辑器
                    $vBar.removeClass('icon-hide-bar-e').addClass('icon-show-bar-e');
                    codeEditor.setReadOnly(true);
                    Editor.codeEditorHideBtn();
                    Editor.selected = 'BLOCK';
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 完全显示代码编辑器
                    $codeArea.removeClass('icon-code-1').addClass('icon-block');
                    $codeArea.parent().attr('m-id', 'block-area');
                    codeEditor.setReadOnly(false);
                    Editor.codeEditorShowBtn();
                    Editor.selected = 'CODE';
                    const { py2BlockEditor } = Editor;
                    if (py2BlockEditor && BOARD.pythonToBlockly) {
                        py2BlockEditor.fromCode = true;
                    }
                    break;
            }
            Editor.codeEditorMenuRender();
        },
        exitfull: function(type) {
            codeEditor.setReadOnly(true);
            Editor.selected = 'BLOCK';
            Editor.codeEditorMenuRender();
            Editor.codeEditorHideBtn();
            switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：左→右 退出代码编辑器，进入块编辑器
                    $codeArea.removeClass('icon-block').addClass('icon-code-1');
                    $codeArea.parent().attr('m-id', 'code-area');
                    const { py2BlockEditor } = Editor;
                    if (py2BlockEditor 
                        && BOARD.pythonToBlockly 
                        && typeof py2BlockEditor.updateBlock === 'function') {
                        py2BlockEditor.updateBlock();
                    }
                    Editor.blockEditorUpdateCode();
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：右→左 侧边代码栏开始显示
                    $vBar.removeClass('icon-show-bar-e').addClass('icon-hide-bar-e');
                    break;
            }
            return true;
        }
    });
    return vDrag;
}

Drag.statusBarInit = () => {
    const { blockEditor, codeEditor } = Editor;
    const $hBar = $('#nav').find('button[m-id="h-bar"]').children('a');
    const hDrag = new Drag.HorizontalDrag('h-container', {
        min: '50px',
        sizeChanged: function() {
            // 重新调整编辑器尺寸
            $(blockEditor.getParentSvg()).attr({
                width: $('#' + Editor.DIV_NAME.BLOCK).width(),
                height: $('#' + Editor.DIV_NAME.BLOCK).height()
            });

            codeEditor.resize();
            Blockly.fireUiEvent(window, 'resize');
        },
        onfull: function(type) {
            switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：上→下
                    $hBar.removeClass('icon-hide-bar-s').addClass('icon-show-bar-s');
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：下→上
                    break;
            }
        },
        exitfull: function(type) {
            switch(type) {
                case 'POSITIVE': // 拖拽元素移动方向：上→下
                    break;
                case 'NEGATIVE': // 拖拽元素移动方向：下→上
                    $hBar.removeClass('icon-show-bar-s').addClass('icon-hide-bar-s');
                    break;
            }
            return true;
        }
    });
    return hDrag;
}

Drag.addBtnClickEvent = () => {
    const { vDrag, hDrag } = Drag.items;
    const $vBar = $('#nav').find('button[m-id="v-bar"]').children('a');
    const $buttons = $('#nav').find('button');
    for (let i = 0; $buttons[i]; i++) {
        const $button = $($buttons[i]);
        $button.click(function() {
            const $a = $button.children('a');
            const mId = $button.attr('m-id');
            switch($button.attr('m-id')) {
                case 'h-bar':
                    if ($a.hasClass('icon-hide-bar-s')) {
                        $a.removeClass('icon-hide-bar-s');
                        $a.addClass('icon-show-bar-s');
                        hDrag.full('POSITIVE');
                    } else {
                        $a.removeClass('icon-show-bar-s');
                        $a.addClass('icon-hide-bar-s');
                        hDrag.show();
                    }
                    break;
                case 'v-bar':
                    if ($a.hasClass('icon-hide-bar-e')) {
                        $a.removeClass('icon-hide-bar-e');
                        $a.addClass('icon-show-bar-e');
                        vDrag.full('POSITIVE');
                    } else {
                        $a.removeClass('icon-show-bar-e');
                        $a.addClass('icon-hide-bar-e');
                        vDrag.show();
                    }
                    break;
                case 'code-area':
                    $button.attr('m-id', 'block-area');
                    $a.removeClass('icon-code-1').addClass('icon-block');
                    $vBar.removeClass('icon-show-bar-e').addClass('icon-hide-bar-e');
                    vDrag.full('NEGATIVE');
                    break;
                case 'block-area':
                    $button.attr('m-id', 'code-area');
                    $a.removeClass('icon-block').addClass('icon-code-1');
                    $vBar.removeClass('icon-hide-bar-e').addClass('icon-show-bar-e');
                    vDrag.full('POSITIVE');
                    break;
            }
        });
    }
}

});