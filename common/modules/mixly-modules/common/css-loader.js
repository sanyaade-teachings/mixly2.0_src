goog.provide('Mixly.CssLoader');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
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
    // "common/css/root.css",
    "common/ui/bootstrap/css/bootstrap.min.css",
    "common/ui/layui/css/layui.css",
    "common/ui/layui/css/layui-theme-dark.css",
    "common/css/interface.css",
    "common/css/fontello.css",
    "common/css/nav.css",
    "common/css/library.css",
    "common/css/drag.css",
    "common/css/button.css",
    "common/css/xscrollbar.css",
    "common/css/tippy-ext.css",
    "common/css/scrollbar.css",
    "common/css/select2.min.css",
    "common/css/select2-ext.css",
    "common/css/xterm.css",
    "common/css/footer-layer.css",
    "common/css/progress.css",
    "common/css/blockly.css",
    "common/css/chrome-tabs.css",
    "common/css/jstree/default/style.css",
    "common/css/jstree/default-dark/style.css",
    "common/css/jstree/jstree-ext.css",
    "common/css/jquery.contextMenu.css",
    "common/css/markdown/github-markdown-light.css",
    "common/css/markdown/github-markdown-dark.css",
    "common/css/katex.min.css",
    "common/css/codicon.css",
    "common/css/files/files.css",
    "common/css/mprogress.min.css"
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

    if (goog.isElectron) {
        loadCssArr(Mixly.CssLoader.clientCss);
    } else {
        loadCssArr(Mixly.CssLoader.webCss);
    }
}

Mixly.CssLoader.load();