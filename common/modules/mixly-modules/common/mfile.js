goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Base64');
goog.require('Mixly.Config');
goog.require('Mixly.MArray');
goog.require('Mixly.Boards');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExt');
goog.require('Mixly.MicrobitFs');
goog.require('Mixly.Editor');
goog.require('Mixly.Drag');
goog.require('Mixly.Msg');
goog.provide('Mixly.MFile');

const { form, util } = layui;

const {
    Config,
    MArray,
    Boards,
    XML,
    LayerExt,
    MicrobitFs,
    Editor,
    Drag,
    Msg,
    MFile
} = Mixly;

const { BOARD, SOFTWARE } = Config;

MFile.SAVE_FILTER_TYPE = {
    mix: { name: Msg.Lang['Mixly文件'], extensions: ['mix'] },
    py: { name: Msg.Lang['Python文件'], extensions: ['py'] },
    ino: { name: Msg.Lang['Arduino文件'], extensions: ['ino'] },
    hex: { name: Msg.Lang['Hex文件'], extensions: ['hex'] },
    bin: { name: Msg.Lang['Bin文件'], extensions: ['bin'] },
    png: { name: Msg.Lang['图像文件'], extensions: ['png'] },
    mil: { name: Msg.Lang['Mixly库文件'], extensions: ['mil'] }
};

MFile.saveFilters = [ MFile.SAVE_FILTER_TYPE.mix ];

MFile.OPEN_FILTER_TYPE = ['mix','xml', 'py', 'ino', 'hex', 'bin'];

MFile.openFilters = ['mix'];

/**
 * @function 更新保存文件时可用的后缀
 * @param config { array }
 * config = ["py", "ino", "hex", "bin", "png"]
 * 注：mix后缀为默认添加，列表后缀名顺序即为保存时自上而下显示的顺序
 * @param priority { string }，配置需要优先显示的后缀名，没有此项可不填
 * @return void
 **/
MFile.updateSaveFilters = (config, priority = null) => {
    if (typeof config !== 'object')
        config = [];
    MFile.saveFilters = [ MFile.SAVE_FILTER_TYPE.mix ];
    let saveFilterType = ['mix'];
    for (let i of config)
        if (MFile.SAVE_FILTER_TYPE[i] && !saveFilterType.includes(i)) {
            saveFilterType.push(i);
            if (i === priority)
                MFile.saveFilters.unshift(MFile.SAVE_FILTER_TYPE[i]);
            else
                MFile.saveFilters.push(MFile.SAVE_FILTER_TYPE[i]);
        }
}

/**
 * @function 更新打开文件时的可用后缀
 * @param config { array }
 * config = ["py", "ino", "hex", "bin"]
 * @return void
 **/
MFile.updateOpenFilters = (config, priority) => {
    if (typeof config !== 'object')
        config = [];
    MFile.openFilters = ['mix', 'xml'];
    for (let i of config)
        if (MFile.OPEN_FILTER_TYPE.includes(i) && !MFile.openFilters.includes(i))
            MFile.openFilters.push(i);
}

MFile.init = () => {
    const saveConfig = BOARD?.nav?.save ?? {};
    let saveFilters = [], openFilters = [];
    for (let i in saveConfig)
        if (saveConfig[i]) {
            if (i !== 'img') {
                saveFilters.push(i);
                openFilters.push(i);
            } else {
                saveFilters.push('png');
            }
        }
    if (BOARD?.nav?.setting?.thirdPartyLibrary)
        saveFilters.push('mil');
    MFile.updateOpenFilters(openFilters);
    MFile.updateSaveFilters(saveFilters);
}

MFile.init();

MFile.getCode = (type) => {
    let blocklyGenerator;
    if (type) {
        blocklyGenerator = (type === 'py' ? Blockly.Python : Blockly.Arduino);
    } else {
        blocklyGenerator = Blockly?.Python ?? Blockly.Arduino;
    }
    if (Editor.selected === 'CODE')
        return Editor.codeEditor.getValue();
    else {
        let code = blocklyGenerator.workspaceToCode(Editor.blockEditor) || '';
        /*try {
            code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                return decodeURIComponent(s.replace(/_/g, '%'));
            });
        } catch (error) {
            console.log(error);
        }*/
        return code;
    }
}

MFile.getHex = () => {
    const code = MFile.getCode();
    return MicrobitFs.getHex(code);
}

MFile.loadHex = (hexStr) => {
    MicrobitFs.loadHex('main.py', hexStr);
}

MFile.getMix = () => {
    const mixDom = $(Blockly.Xml.workspaceToDom(Editor.blockEditor)),
    version = SOFTWARE?.version ?? 'Mixly 2.0',
    boardName = Boards.getSelectedBoardName(),
    board = BOARD?.boardType ?? 'default',
    config = Boards.getSelectedBoardConfig();
    mixDom.removeAttr('xmlns')
          .attr('version', version)
          .attr('board', board + '@' + boardName);
    let xmlStr = mixDom[0].outerHTML;
    let code = MFile.getCode();
    if (config) {
        try {
            xmlStr += `<config>${JSON.stringify(config)}</config>`;
        } catch (error) {
            console.log(error);
        }
    }
    if (BOARD.saveMixWithCode) {
        code = Base64.encode(code);
        xmlStr += `<code>${code}</code>`;
    }
    return xmlStr;
}

MFile.getMil = () => {
    const mixDom = $(MFile.getMix());
    let xmlDom, configDom, codeDom;
    for (let i = 0; mixDom[i]; i++) {
        switch (mixDom[i].nodeName) {
            case 'XML':
                xmlDom = $(mixDom[i]);
                break;
            case 'CONFIG':
                configDom = $(mixDom[i]);
                break;
            case 'CODE':
                codeDom = $(mixDom[i]);
                break;
        }
    }
    if (!xmlDom) return '';
    configDom && configDom.remove();
    codeDom && codeDom.remove();
    xmlDom.attr('type', 'lib');
    xmlDom.find('block,shadow').removeAttr('id varid x y');
    const blocksDom = xmlDom.children('block');
    let blockXmlList = [];
    for (let i = 0; blocksDom[i]; i++) {
        const outerHTML = blocksDom[i].outerHTML;
        if (!blockXmlList.includes(outerHTML))
            blockXmlList.push(outerHTML);
        else
            blocksDom[i].remove();
    }
    return xmlDom[0].outerHTML;
}

MFile.getBlocksPng =  () => {
    return new Promise((resolve, reject) => {
        //this value you can render a much higher resolution image, which looks better on high density displays
        var scaleFactor = 2;

        //Any modifications are executed on a deep copy of the element
        var cp = Editor.blockEditor.svgBlockCanvas_.cloneNode(true);
        cp.removeAttribute("width");
        cp.removeAttribute("height");
        cp.removeAttribute("transform");

        //It is important to create this element in the SVG namespace rather than the XHTML namespace
        var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
        //I've manually pasted codethemicrobit.com's CSS for blocks in here, but that can be removed as necessary
        //styleElem.textContent = Blockly.Css.CONTENT.join('') + ".blocklyToolboxDiv {background: rgba(0, 0, 0, 0.05);}.blocklyMainBackground {stroke:none !important;}.blocklyTreeLabel, .blocklyText, .blocklyHtmlInput {font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;}.blocklyText { font-size:1rem !important;}.rtl .blocklyText {text-align:right;} .blocklyTreeLabel { font-size:1.25rem !important;} .blocklyCheckbox {fill: #ff3030 !important;text-shadow: 0px 0px 6px #f00;font-size: 17pt !important;}";
        Blockly.Css.CONTENT = [
            ".blocklySvg {", "background-color: #fff;", "outline: none;", "overflow: hidden;", "position: absolute;", "display: block;", "}", ".blocklyWidgetDiv {", "display: none;", "position: absolute;", "z-index: 99999;", "}", ".injectionDiv {", "height: 100%;", "position: relative;", "overflow: hidden;", "}", ".blocklyNonSelectable {", "user-select: none;", "-moz-user-select: none;", "-webkit-user-select: none;", "-ms-user-select: none;", "}", ".blocklyWsDragSurface {", "display: none;", "position: absolute;",
            "overflow: visible;", "top: 0;", "left: 0;", "}", ".blocklyBlockDragSurface {", "display: none;", "position: absolute;", "top: 0;", "left: 0;", "right: 0;", "bottom: 0;", "overflow: visible !important;", "z-index: 50;", "}", ".blocklyTooltipDiv {", "background-color: #ffffc7;", "border: 1px solid #ddc;", "box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);", "color: #000;", "display: none;", "font-family: PingFang SC, sans-serif;", "font-size: 9pt;", "opacity: 0.9;", "padding: 2px;", "position: absolute;", "z-index: 100000;", "}", ".blocklyResizeSE {",
            "cursor: se-resize;", "fill: #aaa;", "}", ".blocklyResizeSW {", "cursor: sw-resize;", "fill: #aaa;", "}", ".blocklyResizeLine {", "stroke: #888;", "stroke-width: 1;", "}", ".blocklyHighlightedConnectionPath {", "fill: none;", "stroke: #fc3;", "stroke-width: 4px;", "}", ".blocklyPathLight {", "fill: none;", "stroke-linecap: round;", "stroke-width: 1;", "}", ".blocklySelected>.blocklyPath {", "stroke: #fc3;", "stroke-width: 3px;", "}", ".blocklySelected>.blocklyPathLight {", "display: none;", "}", ".blocklyDraggable {", 'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
            "cursor: grab;", "cursor: -webkit-grab;", "cursor: -moz-grab;", "}", ".blocklyDragging {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "cursor: -moz-grabbing;", "}", ".blocklyDraggable:active {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "cursor: -moz-grabbing;", "}", ".blocklyBlockDragSurface .blocklyDraggable {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;",
            "cursor: -moz-grabbing;", "}", ".blocklyDragging.blocklyDraggingDelete {", 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;', "}", ".blocklyToolboxDelete {", 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;', "}", ".blocklyDragging>.blocklyPath,", ".blocklyDragging>.blocklyPathLight {", "fill-opacity: .8;", "stroke-opacity: .8;", "}", ".blocklyDragging>.blocklyPathDark {", "display: none;", "}", ".blocklyDisabled>.blocklyPath {", "fill-opacity: .5;", "stroke-opacity: .5;", "}", ".blocklyDisabled>.blocklyPathLight,",
            ".blocklyDisabled>.blocklyPathDark {", "display: none;", "}", ".blocklyText {", "cursor: default;", "fill: #fff;", "font-family: PingFang SC, sans-serif;", "font-size: 11pt;", "}", ".blocklyNonEditableText>text {", "pointer-events: none;", "}", ".blocklyNonEditableText>rect,", ".blocklyEditableText>rect {", "fill: #fff;", "fill-opacity: .6;", "}", ".blocklyNonEditableText>text,", ".blocklyEditableText>text {", "fill: #000;", "}", ".blocklyEditableText:hover>rect {", "stroke: #fff;", "stroke-width: 2;", "}", ".blocklyBubbleText {", "fill: #000;",
            "}", ".blocklyFlyout {", "position: absolute;", "z-index: 20;", "}", ".blocklyFlyoutButton {", "fill: #888;", "cursor: default;", "}", ".blocklyFlyoutButtonShadow {", "fill: #666;", "}", ".blocklyFlyoutButton:hover {", "fill: #aaa;", "}", ".blocklyFlyoutLabel {", "cursor: default;", "}", ".blocklyFlyoutLabelBackground {", "opacity: 0;", "}", ".blocklyFlyoutLabelText {", "fill: #000;", "}", ".blocklySvg text, .blocklyBlockDragSurface text {", "user-select: none;", "-moz-user-select: none;", "-webkit-user-select: none;", "cursor: inherit;",
            "}", ".blocklyHidden {", "display: none;", "}", ".blocklyFieldDropdown:not(.blocklyHidden) {", "display: block;", "}", ".blocklyIconGroup {", "cursor: default;", "}", ".blocklyIconGroup:not(:hover),", ".blocklyIconGroupReadonly {", "opacity: .6;", "}", ".blocklyIconShape {", "fill: #00f;", "stroke: #fff;", "stroke-width: 1px;", "}", ".blocklyIconSymbol {", "fill: #fff;", "}", ".blocklyMinimalBody {", "margin: 0;", "padding: 0;", "}", ".blocklyCommentTextarea {", "background-color: #ffc;", "border: 0;", "margin: 0;", "padding: 2px;",
            "resize: none;", "}", ".blocklyHtmlInput {", "border: none;", "border-radius: 4px;", "font-family: PingFang SC, sans-serif;", "height: 100%;", "margin: 0;", "outline: none;", "padding: 0 1px;", "width: 100%", "}", ".blocklyMainBackground {", "stroke-width: 1;", "stroke: #c6c6c6;", "}", ".blocklyMutatorBackground {", "fill: #fff;", "stroke: #ddd;", "stroke-width: 1;", "}", ".blocklyFlyoutBackground {", "fill: #666;", "fill-opacity: .8;", "}", ".blocklyMainWorkspaceScrollbar {", "z-index: 20;", "}", ".blocklyFlyoutScrollbar {", "z-index: 30;",
            "}", ".blocklyScrollbarHorizontal, .blocklyScrollbarVertical {", "position: absolute;", "outline: none;", "}", ".blocklyScrollbarBackground {", "opacity: 0;", "}", ".blocklyScrollbarHandle {", "fill: #ccc;", "}", ".blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyScrollbarHandle:hover {", "fill: #bbb;", "}", ".blocklyZoom>image {", "opacity: .4;", "}", ".blocklyZoom>image:hover {", "opacity: .6;", "}", ".blocklyZoom>image:active {", "opacity: .8;", "}", ".blocklyFlyout .blocklyScrollbarHandle {", "fill: #bbb;",
            "}", ".blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyFlyout .blocklyScrollbarHandle:hover {", "fill: #aaa;", "}", ".blocklyInvalidInput {", "background: #faa;", "}", ".blocklyAngleCircle {", "stroke: #444;", "stroke-width: 1;", "fill: #ddd;", "fill-opacity: .8;", "}", ".blocklyAngleMarks {", "stroke: #444;", "stroke-width: 1;", "}", ".blocklyAngleGauge {", "fill: #f88;", "fill-opacity: .8;", "}", ".blocklyAngleLine {", "stroke: #f00;", "stroke-width: 2;", "stroke-linecap: round;", "pointer-events: none;",
            "}", ".blocklyContextMenu {", "border-radius: 4px;", "}", ".blocklyDropdownMenu {", "padding: 0 !important;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;", "}", ".blocklyToolboxDiv {", "background-color: #272727;", "overflow-x: visible;", "overflow-y: auto;", "position: absolute;", "z-index: 70;", "}", ".blocklyTreeRoot {", "padding: 4px 0;", "}", ".blocklyTreeRoot:focus {",
            "outline: none;", "}", ".blocklyTreeRow {", "height: 36px;", "line-height: 32px;", "margin-bottom: 6px;", "padding-right: 8px;", "border-radius: 4px;", "white-space: nowrap;", "}", ".blocklyHorizontalTree {", "float: left;", "margin: 1px 5px 8px 0;", "}", ".blocklyHorizontalTreeRtl {", "float: right;", "margin: 1px 0 8px 5px;", "}", '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {', "margin-left: 8px;", "}", ".blocklyTreeRow:not(.blocklyTreeSelected):hover {", "background-color: #ccc;", "}", ".blocklyTreeSeparator {", "border-bottom: solid #e5e5e5 1px;",
            "height: 0;", "margin: 5px 0;", "}", ".blocklyTreeSeparatorHorizontal {", "border-right: solid #e5e5e5 1px;", "width: 0;", "padding: 5px 0;", "margin: 0 5px;", "}", ".blocklyTreeIcon {", "background-image: url(<<<PATH>>>/sprites.png);", "height: 16px;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyTreeIconClosedLtr {", "background-position: -32px -1px;", "}", ".blocklyTreeIconClosedRtl {", "background-position: 0px -1px;", "}", ".blocklyTreeIconOpen {", "background-position: -16px -1px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedLtr {",
            "background-position: -32px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedRtl {", "background-position: 0px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconOpen {", "background-position: -16px -17px;", "}", ".blocklyTreeIconNone,", ".blocklyTreeSelected>.blocklyTreeIconNone {", "background-position: -48px -1px;", "}", ".blocklyTreeLabel {", "cursor: default;", "font-family: PingFang SC, sans-serif;", "font-size: 16px;", "padding: 0 8px;", "vertical-align: middle;", "}", ".blocklyTreeSelected .blocklyTreeLabel {",
            "color: #fff;", "}", ".blocklyWidgetDiv .goog-palette {", "outline: none;", "cursor: default;", "}", ".blocklyWidgetDiv .goog-palette-table {", "border: 1px solid #666;", "border-collapse: collapse;", "}", ".blocklyWidgetDiv .goog-palette-cell {", "height: 13px;", "width: 15px;", "margin: 0;", "border: 0;", "text-align: center;", "vertical-align: middle;", "border-right: 1px solid #666;", "font-size: 1px;", "}", ".blocklyWidgetDiv .goog-palette-colorswatch {", "position: relative;", "height: 13px;", "width: 15px;", "border: 1px solid #666;",
            "}", ".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {", "border: 1px solid #FFF;", "}", ".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {", "border: 1px solid #000;", "color: #fff;", "}", ".blocklyWidgetDiv .goog-menu {", "background: #fff;", "border-color: #ccc #666 #666 #ccc;", "border-style: solid;", "border-width: 1px;", "cursor: default;", "font: normal 13px Arial, sans-serif;", "margin: 0;", "outline: none;", "padding: 4px 0;", "position: absolute;", "overflow-y: auto;",
            "overflow-x: hidden;", "max-height: 100%;", "z-index: 20000;", "}", ".blocklyWidgetDiv .goog-menuitem {", "color: #000;", "font: normal 13px Arial, sans-serif;", "list-style: none;", "margin: 0;", "padding: 4px 7em 4px 28px;", "white-space: nowrap;", "}", ".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {", "padding-left: 7em;", "padding-right: 28px;", "}", ".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,", ".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {", "padding-left: 12px;", "}", ".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {",
            "padding-right: 20px;", "}", ".blocklyWidgetDiv .goog-menuitem-content {", "color: #000;", "font: normal 13px Arial, sans-serif;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {", "color: #ccc !important;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {", "opacity: 0.3;", "-moz-opacity: 0.3;", "filter: alpha(opacity=30);", "}", ".blocklyWidgetDiv .goog-menuitem-highlight,", ".blocklyWidgetDiv .goog-menuitem-hover {",
            "background-color: #d6e9f8;", "border-color: #d6e9f8;", "border-style: dotted;", "border-width: 1px 0;", "padding-bottom: 3px;", "padding-top: 3px;", "}", ".blocklyWidgetDiv .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-icon {", "background-repeat: no-repeat;", "height: 16px;", "left: 6px;", "position: absolute;", "right: auto;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {",
            "left: auto;", "right: 6px;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;", "}", ".blocklyWidgetDiv .goog-menuitem-accel {", "color: #999;", "direction: ltr;", "left: auto;", "padding: 0 6px;", "position: absolute;", "right: 0;", "text-align: right;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {", "left: 0;", "right: auto;",
            "text-align: left;", "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {", "text-decoration: underline;", "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {", "color: #999;", "font-size: 12px;", "padding-left: 4px;", "}", ".blocklyWidgetDiv .goog-menuseparator {", "border-top: 1px solid #ccc;", "margin: 4px 0;", "padding: 0;", "}", ""];
        styleElem.textContent = Blockly.Css.CONTENT.join('');
        // console.log(Blockly.Css.CONTENT);
        cp.insertBefore(styleElem, cp.firstChild);

        //Creates a complete SVG document with the correct bounds (it is necessary to get the viewbox right, in the case of negative offsets)
        var bbox = Editor.blockEditor.svgBlockCanvas_.getBBox();
        var xml = new XMLSerializer().serializeToString(cp);
        xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" style="fill-opacity:0"></rect>' + xml + '</svg>';
        //If you just want the SVG then do console.log(xml)
        //Otherwise we render as an image and export to PNG
        var svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
        //var img = document.createElement('img');
        var img = new Image();
        img.src = svgBase64;

        var canvas = document.createElement("canvas");
        canvas.width = Math.ceil(bbox.width) * scaleFactor;
        canvas.height = Math.ceil(bbox.height) * scaleFactor;
        var ctx = canvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const getData = Base64.toUint8Array(canvas.toDataURL("image/png").replace("data:image/png;base64,", ""));
            resolve(getData);
        }
    });
}

MFile.parseMix = (xml, useCode = false, useIncompleteBlocks = false, endFunc = (message) => {}) => {
    const mixDom = xml;
    let xmlDom, configDom, codeDom;
    for (let i = 0; mixDom[i]; i++) {
        switch (mixDom[i].nodeName) {
            case 'XML':
                xmlDom = $(mixDom[i]);
                break;
            case 'CONFIG':
                configDom = $(mixDom[i]);
                break;
            case 'CODE':
                codeDom = $(mixDom[i]);
                break;
        }
    }
    if (!xmlDom && !codeDom) {
        layer.msg(Msg.Lang['未找到有效数据'], { time: 1000 });
        return;
    }
    for (let i of ['version', 'id', 'type', 'varid', 'name', 'x', 'y', 'items']) {
        const nowDom = xmlDom.find('*[' + i + ']');
        if (nowDom.length) {
            for (let j = 0; nowDom[j]; j++) {
                let attr = $(nowDom[j]).attr(i);
                try {
                    attr = attr.replaceAll('\\\"', '');
                } catch (error) {
                    console.log(error);
                }
                $(nowDom[j]).attr(i, attr);
            }
        }
    }
    let config, configStr = configDom && configDom.html();
    try {
        if (configStr)
            config = JSON.parse(configStr);
    } catch (error) {
        console.log(error);
    }
    let boardName = xmlDom.attr('board') ?? '';
    Boards.setSelectedBoard(boardName, config);
    let code = codeDom ? codeDom.html() : '';
    if (Base64.isValid(code)) {
        code = Base64.decode(code);
    } else {
        try {
            code = util.unescape(code);
            code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                try {
                    return decodeURIComponent(s.replace(/_/g, '%'));
                } catch (error) {
                    return s;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (useCode) {
        if (!codeDom) {
            layer.msg(Msg.Lang['未找到有效数据'], { time: 1000 });
            return;
        }
        Drag.items.vDrag.full('NEGATIVE'); // 完全显示代码编辑器
        Editor.codeEditor.setValue(code, -1);
        Editor.blockEditor.clear();
        endFunc('USE_CODE');
        return;
    }
    const blockDom = mixDom.find('block');
    const shadowDom = mixDom.find('shadow');
    blockDom.removeAttr('id varid');
    shadowDom.removeAttr('id varid');
    let blocks = [];
    let undefinedBlocks = [];
    for (let i = 0; blockDom[i]; i++) {
        const blockType = $(blockDom[i]).attr('type');
        if (blockType && !blocks.includes(blockType))
            blocks.push(blockType);
    }
    for (let i = 0; shadowDom[i]; i++) {
        const shadowType = $(shadowDom[i]).attr('type');
        if (shadowType && !blocks.includes(shadowType))
            blocks.push(shadowType);
    }
    const blocklyGenerator = Blockly?.Python ?? Blockly.Arduino;
    for (let i of blocks)
        if (!Blockly.Blocks[i] || !blocklyGenerator[i])
            undefinedBlocks.push(i);
    if (undefinedBlocks.length) {
        MFile.showParseMixErrorDialog(mixDom, undefinedBlocks, endFunc);
        return;
    }
    Editor.blockEditor.clear();
    Blockly.Xml.domToWorkspace(Editor.blockEditor, xmlDom[0]);
    Editor.blockEditor.scrollCenter();
    Blockly.hideChaff();
    if (!useIncompleteBlocks && codeDom) {
        const workspaceCode = MFile.getCode();
        if (workspaceCode !== code) {
            Drag.items.vDrag.full('NEGATIVE'); // 完全显示代码编辑器
            Editor.codeEditor.setValue(code, -1);
        }
        endFunc();
        return;
    }
    Drag.items.vDrag.full('POSITIVE'); // 完全显示块编辑器
    if (useIncompleteBlocks)
        endFunc('USE_INCOMPLETE_BLOCKS');
    else
        endFunc();
}

MFile.removeUndefinedBlocks = (xml, undefinedBlocks) => {
    for (let i of undefinedBlocks) {
        xml.find('*[type='+i+']').remove();
    }
}

MFile.showParseMixErrorDialog = (xml, undefinedBlocks, endFunc = () => {}) => {
    const { PARSE_MIX_ERROR_DIV } = XML.TEMPLATE_STR;
    const renderStr = XML.render(PARSE_MIX_ERROR_DIV, {
        text: undefinedBlocks.join('<br/>'),
        btn1Name: Msg.Lang['取消'],
        btn2Name: Msg.Lang['忽略未定义块'],
        btn3Name: Msg.Lang['读取代码']
    })
    LayerExt.open({
        title: Msg.Lang['一些图形化模块尚未定义'],
        id: 'parse-mix-error-layer',
        area: ['50%', '250px'],
        max: ['500px', '250px'],
        min: ['350px', '100px'],
        shade: LayerExt.SHADE_ALL,
        content: renderStr,
        borderRadius: '5px',
        success: (layero, index) => {
            $('#parse-mix-error-layer').css('overflow', 'hidden');
            form.render(null, 'parse-mix-error-filter');
            layero.find('button').click((event) => {
                layer.close(index);
                const mId = $(event.currentTarget).attr('m-id');
                switch (mId) {
                case '0':
                    break;
                case '1':
                    for (let i of undefinedBlocks) {
                        xml.find('*[type='+i+']').remove();
                    }
                    MFile.parseMix(xml, false, true, endFunc);
                    break;
                case '2':
                    MFile.parseMix(xml, true, false, endFunc);
                    break;
                }
            });
        }
    });
}

MFile.openFile = (filters, readType = 'text', sucFunc = () => {}) => {
    const loadFileDom = $('<input></input>');
    loadFileDom.attr({
        id: 'web-open-file',
        type: 'file',
        name: 'web-open-file',
        accept: filters
    });
    loadFileDom.change(function(event) {
        MFile.onclickOpenFile(this, readType, (data) => {
            sucFunc(data);
        });
    });
    loadFileDom.css('display', 'none');
    $('#web-open-file').remove();
    $('body').append(loadFileDom);
    loadFileDom.click();
}

MFile.onclickOpenFile = (input, readType, endFunc) => {
    const files = input.files;
    //限制上传文件的 大小,此处为10M
    if (files[0].size > 5 * 1024 * 1024) {
        layer.msg('所选择文件大小必须在5MB内', { time: 1000 });
        $('#web-open-file').remove();
        endFunc(null);
        return false;
    }
    const resultFile = input.files[0];
    // 如果文件存在
    if (resultFile) {
        const filename = resultFile.name;
        const reader = new FileReader();
        switch (readType) {
        case 'text':
            reader.readAsText(resultFile);
            break;
        case 'bin':
            reader.readAsBinaryString(resultFile);
            break;
        case 'url':
            reader.readAsDataURL(resultFile);
            break;
        default:
            reader.readAsArrayBuffer(resultFile);
        }
        reader.onload = function (e) {
            const data = e.target.result;
            $('#web-open-file').remove();
            endFunc({ data, filename });
        };
    } else {
        endFunc(null);
    }
}

});