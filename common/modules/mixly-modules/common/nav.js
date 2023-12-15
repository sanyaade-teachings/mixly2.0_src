goog.loadJs('common', () => {

goog.require('BrowserFS');
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
    this.$rightArea = this.$container.find('.right-area');
    this.$editorBtnsContainer = this.$container.find('.editor-btn-container');
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
    for (let config of this.registerQueue) {
        this.register(config);
    }
    Nav.register({
        id: 'file',
        displayText: '文件',
        preconditionFn: () => {
            return goog.isElectron;
        },
        scopeType: this.Scope.RIGHT,
        weight: 1
    });

    Nav.register({
        icon: 'icon-doc-new',
        id: ['file', 'new-file'],
        displayText: '新建文件',
        preconditionFn: () => {
            return goog.isElectron;
        },
        callback: (elem) => console.log(elem),
        scopeType: this.Scope.RIGHT,
        weight: 1
    });

    Nav.register({
        icon: 'icon-folder-open-empty',
        id: ['file', 'open-file'],
        displayText: '打开文件',
        preconditionFn: () => {
            return goog.isElectron;
        },
        callback: (elem) => console.log(elem),
        scopeType: this.Scope.RIGHT,
        weight: 2
    });

    Nav.register({
        id: ['file', 'hr'],
        scopeType: this.Scope.RIGHT,
        weight: 3
    });

    Nav.register({
        icon: 'icon-folder-open-empty',
        id: ['file', 'open-dir'],
        displayText: '打开文件夹',
        preconditionFn: () => {
            return goog.isElectron;
        },
        callback: (elem) => {
            window.showDirectoryPicker({
                mode: 'readwrite'
            })
            .then((filesystem) => {
                return Mixly.Web.FS.pool.exec('addFileSystemHandler', [filesystem]);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        scopeType: this.Scope.RIGHT,
        weight: 4
    });

    Nav.register({
        id: 'setting',
        displayText: '设置',
        preconditionFn: () => {
            return goog.isElectron;
        },
        scopeType: this.Scope.RIGHT,
        weight: 1
    });

    Nav.register({
        icon: 'icon-comment-1',
        id: ['setting', 'feedback'],
        displayText: '反馈',
        preconditionFn: () => {
            return goog.isElectron;
        },
        callback: (elem) => console.log(elem),
        scopeType: this.Scope.RIGHT,
        weight: 1
    });
    
    $(window).resize(() => {
        this.resize();
    });
}

Nav.getEditorBtnsContainer = function() {
    return this.$editorBtnsContainer;
}

/**
 * @function 注册函数
 * @param config 选项
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
Nav.register = function(config) {
    const { scopeType = this.ScopeType.LEFT } = config;
    config = { ...config };
    const {
        id = '',
        title = '',
        icon = '',
        displayText = ''
    } = config;
    switch (scopeType) {
    case this.Scope.LEFT:
        config.$moreBtn = $(XML.render(this.ITEM_TEMPLATE, {
            mId: id,
            icon,
            text: displayText
        }));
    case this.Scope.CENTER:
        config.$btn = $(XML.render(this.BTN_TEMPLATE, {
            title,
            mId: id,
            icon,
            text: displayText
        }));
        break;
    case this.Scope.RIGHT:
        if (typeof id === 'string') {
            config.$btn = $(XML.render(this.ITEM_CONTAINER_TEMPLATE, {
                mId: id,
                text: displayText
            }));
        } else {
            if (displayText) {
                config.$btn = $(XML.render(this.ITEM_TEMPLATE, {
                    mId: id[1],
                    icon,
                    text: displayText
                }));
            } else {
                config.$btn = $('<hr>');
            }
        }
        break;
    }
    if (!this.$container) {
        this.registerQueue.push(config);
        return config;
    }
    this.add_(config);
    return config;
}

Nav.add_ = function(config) {
    const {
        scopeType = this.ScopeType.LEFT,
        id = ''
    } = config;
    switch (scopeType) {
    case this.Scope.LEFT:
        if (id === 'home-btn') {
            this.btns[config.id] = config;
        } else {
            this.addLeftBtn_(config);
        }
        break;
    case this.Scope.CENTER:
        this.addCenterBtn_(config);
        break;
    case this.Scope.RIGHT:
        if (typeof id === 'string') {
            this.addRightMenu_(config);
        } else {
            this.addRightMenuItem_(config);
        }
        break;
    }
    element.render('nav', 'nav-filter');
}

/**
 * @function 取消注册函数
 * @param config 选项
 *  {
 *      id: String | Array,
 *      scopeType: Nav.SCOPE_TYPE
 *  }
 * @return {void}
 **/
Nav.unregister = function(config) {

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

Nav.addLeftBtn_ = function(config) {
    const { id = '', weight = 0 } = config;
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
        $btn.before(config.$btn);
        $moreBtn.before(config.$moreBtn);
    } else {
        this.$leftBtnContainer.append(config.$btn);
        this.$leftBtnExtContainer.append(config.$moreBtn);
    }
    config.width = this.getElemWidth(config.$btn);
    this.btns[id] = config;
    this.resize();
}

Nav.removeLeftBtn_ = function(config) {

}

Nav.addCenterBtn_ = function(config) {
    const { id = '', weight = 0 } = config;
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
        $btn.before(config.$btn);
    } else {
        this.$rightBtnContainer.append(config.$btn);
    }
    config.width = this.getElemWidth(config.$btn);
    this.btns[id] = config;
    this.resize();
}

Nav.removeCenterBtn_ = function(config) {

}

Nav.addRightMenu_ = function(config) {
    const { id = '', weight = 0 } = config;
    const $btns = this.$rightMenuContainer.children('li');
    let $btn = null;
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
        $btn.before(config.$btn);
    } else {
        this.$rightMenuContainer.append(config.$btn);
    }
    config.width = this.getElemWidth(config.$btn);
    this.btns[id] = config;
    this.resize();
}

Nav.removeRightMenu_ = function(config) {

}

Nav.addRightMenuItem_ = function(config) {
    const { id = [], weight = 0 } = config;
    const $li = this.$rightMenuContainer.children(`[m-id="${id[0]}"]`);
    let $btn = null;
    if (!$li.length) {
        return;
    }
    const $container = $li.find('.layui-nav-child');
    const $btns = $container.find('dd');
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
        $btn.before(config.$btn);
    } else {
        $container.append(config.$btn);
    }
    config.width = this.getElemWidth(config.$btn);
    this.btns[id[1]] = config;
}

Nav.removeRightMenuItem_ = function(config) {

}

Nav.resize = function() {
    const navRightWidth = this.getElemWidth(this.$rightArea);
    const navWidth = this.getElemWidth(this.$container);
    const $btns = this.$leftBtnContainer.children('button');
    let nowWidth = navRightWidth;
    let showMoreBtnContainer = false;
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (mId === 'home-btn') {
            continue;
        }
        const config = this.btns[mId];
        let newWidth = nowWidth;
        if (config) {
            const { preconditionFn } = config;
            if (!preconditionFn()) {
                config.$btn.css('display', 'none');
                config.$moreBtn.css('display', 'none');
                continue;
            }
            newWidth += config.width;
        } else {
            newWidth += this.getElemWidth($($btns[i]));
            continue;
        }
        if (navWidth < newWidth + this.$editorBtnsContainer.outerWidth(true) + 130) {
            config.$btn.css('display', 'none');
            config.$moreBtn.css('display', 'block');
            showMoreBtnContainer = true;
        } else {
            config.$btn.css('display', 'block');
            config.$moreBtn.css('display', 'none');
            nowWidth = newWidth;
        }
    }
    if (navWidth < nowWidth + this.$editorBtnsContainer.outerWidth(true) + 130) {
        showMoreBtnContainer = false;
    }
    const parent = this.$leftBtnExtContainer.parent();
    parent.css('display', showMoreBtnContainer? 'block' : 'none');
}

});