goog.provide('Mixly.CssLoader');
goog.require('Mixly.Config');
/**
 * 加载 link 文件
 * @param href
 */
Mixly.CssLoader.loadCss = function (href) {
    var addSign = true;
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            addSign = false;
        }
    }
    if (addSign) {
        var $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("type", "text/css");
        $link.setAttribute("href", href);
        document.getElementsByTagName("head").item(0).appendChild($link);
    }
}

/**
 * 删除 link 文件
 * @param href
 */
Mixly.CssLoader.removeCss = function (href) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}

/* 公共css */
Mixly.CssLoader.commonCss = [
    "common/css/root.css",
    "common/ui/layui/css/layui.css",
    "common/css/ACEfont.css",
    "common/css/fontello.css",
    "common/css/nav.css",
    "common/css/library.css",
    "common/css/drag.css",
    "common/css/button.css",
    "common/css/xscrollbar.css",
    "common/css/tippy-ext.css",
    "common/css/scrollbar.css"
];

/* 客户端css */
Mixly.CssLoader.clientCss = [

];

/* 网页端css */
Mixly.CssLoader.webCss = [

];

Mixly.CssLoader.load = function () {
    var filePath = Mixly.Config.pathPrefix;

    function loadCssArr(arr) {
        for (let i = 0; i < arr.length; i++) {
            Mixly.CssLoader.loadCss(filePath + arr[i]);
        }
    }

    loadCssArr(Mixly.CssLoader.commonCss);

    if (Mixly.Env.isElectron) {
        loadCssArr(Mixly.CssLoader.clientCss);
    } else {
        loadCssArr(Mixly.CssLoader.webCss);
    }
}

Mixly.CssLoader.load();