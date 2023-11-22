goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Command');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Msg');
goog.provide('Mixly.Nav');

const {
    Env,
    Config,
    Command,
    Nav,
    XML,
    IdGenerator,
    Msg
} = Mixly;

const { BOARD, USER } = Config;

const { element, form } = layui;

/**
  * nav容器html片段
  * @type {String}
  */
Nav.CONTAINER_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav.html'));

/**
  * nav按钮html片段
  * @type {String}
  */
Nav.BTN_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-btn.html'));

/**
  * nav子元素容器html片段
  * @type {String}
  */
Nav.ITEM_CONTAINER_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-item-container.html'));

/**
  * nav子元素html片段
  * @type {String}
  */
Nav.ITEM_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-item.html'));

/**
  * 板卡选择器html片段
  * @type {String}
  */
Nav.BOARD_SELECTOR_TEMPLATE = goog.get(path.join(Env.templatePath, 'board-selector-div.html'));

/**
  * 端口选择器html片段
  * @type {String}
  */
Nav.PORT_SELECTOR_TEMPLATE = goog.get(path.join(Env.templatePath, 'port-selector-div.html'));

Nav.Scope = {
    'LEFT': -1,
    'CENTER': 0,
    'RIGHT': 1,
    '-1': 'LEFT',
    '0': 'CENTER',
    '1': 'RIGHT'
};

Nav.$container = null;
Nav.$leftBtnContainer = null;
Nav.$leftBtnExtContainer = null;
Nav.$rightBtnContainer = null;
Nav.$dropdownContainer = null;
Nav.$rightMenuContainer = null;
Nav.btns = {};
Nav.weightsInfo = [];
Nav.registerQueue = [];

Nav.init_ = function() {
    this.$container = $(XML.render(this.CONTAINER_TEMPLATE, {
        msg: {
            copyright: Blockly.Msg.MSG['copyright']
        },
        mId: IdGenerator.generate()
    }));
    this.$leftBtnContainer = this.$container.find('.left-btn-container');
    this.$leftBtnExtContainer = this.$container.find('.left-btn-ext-container');
    this.$rightBtnContainer = this.$container.find('.right-btn-container');
    this.$dropdownContainer = this.$container.find('.dropdown-container');
    this.$rightMenuContainer = this.$container.find('.right-menu-container');
    this.$dropdownContainer.append(Nav.BOARD_SELECTOR_TEMPLATE);
    this.$dropdownContainer.append(XML.render(Nav.PORT_SELECTOR_TEMPLATE, {
        selectPort: Msg.Lang['选择串口'],
        noPort: Msg.Lang['无可用串口']
    }));
    $('#nav-container').append(this.$container);
    element.render('nav', 'nav-filter');
    form.render('select', 'boards-type-filter');
    form.render('select', 'ports-type-filter');
    Nav.addClickEvent();
    for (let options of this.registerQueue) {
        this.register(options);
    }
    /*for (let i = 0; i < 10; i++)
        Nav.register({
            icon: 'icon-ccw',
            title: '测试(Ctrl + A)',
            id: IdGenerator.generate(),
            displayText: '测试' + i,
            preconditionFn: () => {
                return goog.isElectron;
            },
            callback: (elem) => console.log(elem),
            scopeType: this.Scope.LEFT,
            weight: 10 - i
        });*/
    $(window).resize(() => {
        this.resize();
    });
}

/**
 * @function 注册函数
 * @param options 选项
 *  {
 *      icon: String,
 *      title: String,
 *      id: String | Array,
 *      displayText: String,
 *      preconditionFn: Function,
 *      callback: Function,
 *      scopeType: Nav.SCOPE_TYPE,
 *      weight: Number
 *  }
 * @return {void}
 **/
Nav.register = function(options) {
    const { scopeType = this.ScopeType.LEFT } = options;
    options = { ...options };
    const {
        id = '',
        title = '',
        icon = '',
        displayText = ''
    } = options;
    options.$btn = $(XML.render(Nav.BTN_TEMPLATE, {
        title,
        mId: id,
        icon,
        text: displayText
    }));
    switch (scopeType) {
    case this.Scope.LEFT:
        options.$moreBtn = $(XML.render(Nav.ITEM_TEMPLATE, {
            mId: id,
            icon,
            text: displayText
        }));
        break;
    case this.Scope.CENTER:
        break;
    case this.Scope.RIGHT:
        break;
    }
    if (!this.$container) {
        this.registerQueue.push(options);
        return options;
    }
    Nav.add_(options);
    return options;
}

Nav.add_ = function(options) {
    const { scopeType = this.ScopeType.LEFT } = options;
    switch (scopeType) {
    case this.Scope.LEFT:
        if (options.id === 'home-btn') {
            this.btns[options.id] = options;
        } else {
            this.addLeftBtn_(options);
        }
        break;
    case this.Scope.CENTER:
        this.addRightBtn_(options);
        break;
    case this.Scope.RIGHT:
        break;
    }
    element.render('nav', 'nav-filter');
}

/**
 * @function 取消注册函数
 * @param options 选项
 *  {
 *      id: String | Array,
 *      scopeType: Nav.SCOPE_TYPE
 *  }
 * @return {void}
 **/
Nav.unregister = function(options) {

}

Nav.getElemWidth = function(elem) {
    const display = elem.css('display');
    if (display !== 'none') {
        return elem.outerWidth(true);
    }
    const visibility = elem.css('visibility');
    const position = elem.css('position');
    elem.css({
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    const width = elem.outerWidth(true);
    elem.css({ display, visibility, position });
    return width;
}

Nav.addClickEvent = function() {
    $(document).off('click', '.mixly-nav')
    .on('click', '.mixly-nav', function() {
        const $this = $(this);
        const mId = $this.attr('m-id');
        if (Nav.btns[mId]
            && typeof Nav.btns[mId].callback === 'function') {
            Nav.btns[mId].callback(this);
        }
    });
}

Nav.addLeftBtn_ = function(options) {
    const { id = '', weight = 0 } = options;
    if (Object.keys(this.btns).includes(id)) {
        this.btns[id].$btn.remove();
        this.btns[id].$moreBtn.remove();
        delete this.btns[id];
    }
    let $btn = null;
    let $moreBtn = null;
    const $btns = this.$leftBtnContainer.children('button');
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (!this.btns[mId]) {
            continue;
        }
        if (weight < this.btns[mId].weight) {
            $btn = this.btns[mId].$btn;
            $moreBtn = this.btns[mId].$moreBtn;
            break;
        }
    }
    if ($btn) {
        $btn.before(options.$btn);
        $moreBtn.before(options.$moreBtn);
    } else {
        this.$leftBtnContainer.append(options.$btn);
        this.$leftBtnExtContainer.append(options.$moreBtn);
    }
    options.width = this.getElemWidth(options.$btn);
    this.btns[id] = options;
    this.resize();
}

Nav.removeLeftBtn_ = function(str) {

}

Nav.addRightBtn_ = function(options) {
    const { id = '', weight = 0 } = options;
    let $btn = null;
    const $btns = this.$rightBtnContainer.children('button');
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (!this.btns[mId]) {
            continue;
        }
        if (weight < this.btns[mId].weight) {
            $btn = this.btns[mId].$btn;
            break;
        }
    }
    if ($btn) {
        $btn.before(options.$btn);
    } else {
        this.$rightBtnContainer.append(options.$btn);
    }
    options.width = this.getElemWidth(options.$btn);
    this.btns[id] = options;
    this.resize();
}

Nav.removeRightBtn_ = function(str) {

}

Nav.resize = function() {
    const navRightWidth = this.getElemWidth($('#nav-right-area'));
    const navWidth = this.getElemWidth($('#nav'));
    const $btns = this.$leftBtnContainer.children('button');
    let nowWidth = navRightWidth;
    let showMoreBtnContainer = false;
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (mId === 'home-btn') {
            continue;
        }
        const config = this.btns[mId];
        if (config) {
            const { preconditionFn } = config;
            if (!preconditionFn()) {
                config.$btn.css('display', 'none');
                config.$moreBtn.css('display', 'none');
                continue;
            }
            nowWidth += config.width;
        } else {
            nowWidth += this.getElemWidth($($btns[i]));
            continue;
        }
        if (navWidth < nowWidth + 200) {
            config.$btn.css('display', 'none');
            config.$moreBtn.css('display', 'block');
            showMoreBtnContainer = true;
        } else {
            config.$btn.css('display', 'block');
            config.$moreBtn.css('display', 'none');
        }
    }
    const parent = this.$leftBtnExtContainer.parent();
    parent.css('display', showMoreBtnContainer? 'block' : 'none');
}

});