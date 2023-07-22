(() => {
// goog.require('Mixly.FooterBar');
// goog.require('Mixly.Config');
// goog.require('Mixly.LocalStorage');
// const { BOARD } = Config;

/*window.addEventListener('load', () => {
    const { messageLayer } = FooterBar;
    if (LocalStorage.get(`mixly/${BOARD.boardType}/default/messageNeverShow`)) {
        return;
    }
    messageLayer.append({
        type: 1,
        style: 'success',
        message: 'Mixly是一款面向初学者、硬件编程爱好者的图形化编程工具。<br/>它完美地支持了Arduino、MicroPython，Python等语言的图形化编程。<br/>提供了图形化界面和代码界面对比显示的支持。<br/>Mixly还支持自定义第三方扩展库，可以拓展出丰富的功能。',
        name: 'Mixly介绍',
        onCreate: (obj) => {
            console.log('已创建');
        },
        onDestroy: () => {
            console.log('已销毁');
        },
        checkbox: {
            checked: true,
            title: '不再显示'
        },
        btns: [
            {
                text: '关闭',
                style: 'primary',
                onclick: (event, container, checked) => {
                    LocalStorage.set(`mixly/${BOARD.boardType}/default/messageNeverShow`, checked);
                    container.remove();
                }
            }
        ]
    });
});*/

goog.require('Blockly.Lang.ZhHans');
goog.require('Mixly.XML');
goog.require('path');
    
const templateDirPath = path.join(document.currentScript.src, '../../template/');

const { XML } = Mixly;
const { ZhHans } = Blockly.Lang;

ZhHans.ESP8266_CONFIG_TEMPLATE = goog.get(path.join(templateDirPath, 'board-config-message.html'));

ZhHans.ESP8266_CONFIG_INTRODUCE = '详细介绍请参考';

ZhHans.ESP8266_CONFIG_MESSAGE_XTAL = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'CPU时钟频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#cpu-frequency',
    name: 'CPU Frequency'
});

ZhHans.ESP8266_CONFIG_MESSAGE_VT = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'VTable location',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#vtable-location',
    name: 'VTable'
});

ZhHans.ESP8266_CONFIG_MESSAGE_EXCEPTION = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'C++异常',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#c-exceptions',
    name: 'C++ Exceptions'
});

ZhHans.ESP8266_CONFIG_MESSAGE_STACKSMASH = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '堆栈保护',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#stack-protection',
    name: 'Stack Protection'
});

ZhHans.ESP8266_CONFIG_MESSAGE_SSL = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'SSL支持',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#ssl-support',
    name: 'SSL Support'
});

ZhHans.ESP8266_CONFIG_MESSAGE_MMU = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '内存管理单元',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#mmu-memory-management-unit',
    name: 'MMU'
});

ZhHans.ESP8266_CONFIG_MESSAGE_NON32XFER = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '非32位访问',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#non-32-bit-access',
    name: 'Non-32-Bit Access'
});

ZhHans.ESP8266_CONFIG_MESSAGE_RESET_METHOD = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '复位方式',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#reset-method',
    name: 'Reset Method'
});

ZhHans.ESP8266_CONFIG_MESSAGE_CRYSTAL_FREQ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '晶振频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#crystal-frequency',
    name: 'Crystal Frequency'
});

ZhHans.ESP8266_CONFIG_MESSAGE_FLASH_FREQ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '闪存频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP8266_CONFIG_MESSAGE_FLASH_MODE = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '烧录方式',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-mode',
    name: 'Flash Mode'
});

ZhHans.ESP8266_CONFIG_MESSAGE_EESZ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '闪存大小',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-size',
    name: 'Flash Size'
});

ZhHans.ESP8266_CONFIG_MESSAGE_LED = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '内置LED',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP8266_CONFIG_MESSAGE_SDK = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'NonOS SDK版本',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#nonos-sdk-version',
    name: 'NONOS SDK Version'
});

ZhHans.ESP8266_CONFIG_MESSAGE_IP = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'lwIP变体',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#lwip-variant',
    name: 'lwIP Variant'
});

ZhHans.ESP8266_CONFIG_MESSAGE_DBG = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '调试端口',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#debug-port',
    name: 'Debug port'
});

ZhHans.ESP8266_CONFIG_MESSAGE_WIPE = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '擦除Flash',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#erase-flash',
    name: 'Erase Flash'
});

ZhHans.ESP8266_CONFIG_MESSAGE_BAUD = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '上传速度',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

})();