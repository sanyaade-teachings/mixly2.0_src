goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    FooterLayer,
    FooterBar
} = Mixly;

FooterBar.init = () => {
    let template = goog.get(Env.templatePath + '/footer-layer.html');
    let messageLayer = new FooterLayer('mixly-message', {
        onMount: function(instance) {
            const xmlStr = XML.render(template, {
                close: Msg.Lang['关闭窗口'],
                list: [
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'primary'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'secondary'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'success'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'danger'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'warning'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'info'
                    },
                    {
                        type: 1,
                        src: '../../../common/media/mixly.png',
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'light'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'primary'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'secondary'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'success'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'danger'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'warning'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'info'
                    },
                    {
                        message: '一段测试文本<br/>测试换行功能',
                        style: 'light'
                    }
                ]
            });
            instance.setContent(xmlStr);
            instance.setProps({});
        }
    });
}

FooterBar.add = () => {
    
}

});