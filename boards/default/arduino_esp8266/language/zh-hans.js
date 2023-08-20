(() => {

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

goog.require('Mixly.FooterBar');
goog.require('Mixly.Storage');

const { FooterBar, Storage } = Mixly;
const BASE64_PIC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA'+
    '1VJREFUeF7tmz1y2kAUx3clxiQV4JkkZSh8D2YMZwixCygU41OEwjmF7VBAYRufwXhG90iBy6QI4CYGS/sym'+
    '6B4hrG03yvhrOr9er/973v78YQRQj76jz/sAOSggMrFp4bvex3AqIEA7jDC0zgmo8Xh19C2GK0qoHLarXvVn'+
    'QHCuPGsoQAhma+CxfFwaguEVQC18dEk1fgni6dktmzZgmANQPXqqI893OeZWSBwMv94fsJTVrWMNQC1614kM'+
    'lgyW+7ZUIEVACKzn0CiKoDFamQagjEA1OH51fJnwKgrMvObZTGgYTxffjEFwgiA6mXQxb4/UDF8sy7EcQD3U'+
    'agbhHYAnJ5ejo2BMKkNADPGy5n8XC2tYVILgD/G18rf9NnIbEkbBC0AjMo+nYUWCMoAdse9gaqnZ853SgEdG'+
    'yYlAPRQ45W8iawBOuqpbpiUANSue3Td13UYotCG0lKQBiCzu1MwMrMq3SPMDwZDmfalARRk9v/aDBDO2udNa'+
    'wByCHtM22R9gZQCiiT/f4cnyWUgBSCnuJ+pAnpo+tk+C5hS2SggB0DwbC86KNnysw9nJdG6LwqAjB8QBlBEB'+
    '5jMugMgcY0mroACbH/T1jmJSFP0bcEBEH0aK8IByCkghYBbAs4HOCfoooALg4I5Bm4f4PYBgikybiPkzgL5v'+
    'wXkuhUu4n2gyr0gdxRYG94pwENI9q0XQAiEjHhzCbgAFPESlHn3x5lLwASwlcY/0WE+m2UCKPJ6ZypgXYD1g'+
    'pwKoMiXn7zG81yWpgMocLwXBpBxT5AK4CXInyc8pgMwkOomOnO6ymc9n2c6QeoHdA0iz3aycguZYTDPgdvo2'+
    'wiAXxf7jbLvcWWG8xoZETTaObiRygLJ6sMIgMerZr/EmRrPC4AADP32RPj5m9X+1gB4jFGwNQr4frpff1vzt'+
    'GaO/piRvXfHt9p/pTGiACo7Mm5NMP0pSsNnSv50aMYAUEf4SlMS5UNEmq8Pb438UWYMAKWrwxmanH2jCqCNU'+
    '1/wpuoNZJcCAAq99o1U/h/vyjOqgATCbgV3RMOi6ZlPABkHkHS0umx1Sx7qsNUA04cIAlNrflMZ1gAkHVPnW'+
    'PJww1//PYoxvAfAdzFAGBEIbRluXQG8a9J2OesKsG0gq7/f1Pn8EOxwSVgAAAAASUVORK5CYII=';

window.addEventListener('load', () => {
    const { messageLayer } = FooterBar;
    const STATUS = Storage.user('third/key1');
    !STATUS && messageLayer.append({
        type: 1,
        style: 'success',
        src: BASE64_PIC,
        name: '通知',
        message: 'message支持html文本<br/><a href="https://gitee.com/mixly2/mixly2.0_src" target="_blank">一段测试链接</a>',
        btns: [
            {
                style: 'secondary',
                text: '确定',
                onclick: (event, container, checked) => {
                    container.remove();
                    Storage.user('third/key1', checked);
                }
            }
        ],
        checkbox: {
            checked: false,
            show: true,
            title: '不再显示'
        }
    })
});

})();