(() => {

goog.require('Mixly.Config');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.provide('Mixly.DomOperator');

const {
    DomOperator,
    Config,
    XML,
    Env
} = Mixly;

const { BOARD, USER } = Config;

DomOperator.SerialDom = {
    times: 0,
    getTimes: () => {
        this.times = typeof this.times !== 'undefined' ? this.times + 1 : 0;
        if (this.times > 10) this.times = 0;
        return this.times;
    }
}

const {SerialDom} = DomOperator;

// 串口工具
class SerialDomGenerator {
    constructor(serialConfig, shade, lang, type = 1) {
        this.mark = SerialDom.getTimes();
        this.type = type;
        this.id = this.getId();
        this.filter = this.getFilter();
        this.lang = lang;
        this.shade = shade;
        this.config = this.getConfig(serialConfig);
        this.htmlStr = this.getHtmlStr();
        this.generateDom();
        this.destroyed = false;
        this.width = null;
        this.height = null;
        this.prevPort = null;
        this.nowPort = null;
    }

    getConfig(config) {
        let _defaultConfig = {
            "baudRates": 9600,
            "ctrlCBtn": false,
            "ctrlDBtn": false,
            "receiveStr": true,
            "scroll": true,
            "sendStr": true,
            "sendWith": "\\r\\n",
            "dtr": true,
            "rts": true,
            "pointNum": 100,
            "yMax": 100,
            "yMin": 0
        };
        /*
        let _config = {};
        for (let key in _defaultConfig) {
            _config[key] = config[key] ?? _defaultConfig[key];
        }
        */
        return DomOperator.getConfig(config, _defaultConfig);
    }

    getHtmlStr() {
        let {
            formId,
            setDtrId,
            setRtsId,
            selectPortId,
            selectBaudId,
            connectBtnId,
            sendTypeId,
            sendId,
            sendWithId,
            sendBtnId,
            receiveTypeId,
            scrollId,
            receiveId,
            clearBtnId,
            ctrlCBtnId,
            ctrlDBtnId,
            yMinId,
            yMaxId,
            pointNumId,
            chartSendTypeId,
            chartSendId,
            chartSendWithId,
            chartSendBtnId,
            dataDrawId,
            moveId
        } = this.id;

        let {
            formFilter,
            setDtrFilter,
            setRtsFilter,
            selectPortFilter,
            selectBaudFilter,
            sendTypeFilter,
            sendWithFilter,
            chartSendTypeFilter,
            tabFilter,
            receiveTypeFilter,
            scrollFilter,
            selectPointNumFilter,
            connectBtnFilter
        } = this.filter;

        /* 串口监视器 */
        //串口选择div
        let selectPortDivStr = `
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label" style="height: 44px;padding-top: 1px;padding-bottom: 1px;">
                <p style="display:inline;">${indexText['串口']}</p>
                <input style="display:none;">
                <input id="${setDtrId}" type="checkbox" title="DTR" lay-filter="${setDtrFilter}" lay-skin="primary" ${this.config.dtr ? "checked" : ""}>
                <input id="${setRtsId}" type="checkbox" title="RTS" lay-filter="${setRtsFilter}" lay-skin="primary" ${this.config.rts ? "checked" : ""}>
            </label>
            <div style="position: relative; height: 38px;">
                <div style="position: absolute; left: 0px; right: 64px;">
                    <div class="layui-input-inline" style="width:50%;clear:none;">
                        <select id="${selectPortId}" lay-verify="required" lay-filter="${selectPortFilter}"></select>
                    </div>
                    <div class="layui-input-inline" style="width:50%;clear:none;">
                        <select id="${selectBaudId}" lay-filter="${selectBaudFilter}">
                            <option value="9600" ${this.config.baudRates == 9600 ? "selected" : ""}>9600</option>
                            <option value="19200" ${this.config.baudRates == 19200 ? "selected" : ""}>19200</option>
                            <option value="28800" ${this.config.baudRates == 28800 ? "selected" : ""}>28800</option>
                            <option value="38400" ${this.config.baudRates == 38400 ? "selected" : ""}>38400</option>
                            <option value="57600" ${this.config.baudRates == 57600 ? "selected" : ""}>57600</option>
                            <option value="115200" ${this.config.baudRates == 115200 ? "selected" : ""}>115200</option>
                        </select>
                    </div>
                </div>
                <button id="${connectBtnId}" class="layui-btn layui-btn-normal" style="position: absolute; right: 0px; width: 64px;" lay-filter="${connectBtnFilter}">${indexText['打开']}</button>
            </div>
        </div>`;

        //串口发送数据div
        let sendDivStr = `
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label" style="height: 44px;padding-top: 1px;padding-bottom: 1px;">
                <p style="display:inline;">${indexText['发送数据']}</p>
                <input style="display:none;">
                <input id="${sendTypeId}" type="checkbox" title="${indexText['字符串']}" lay-filter="${sendTypeFilter}" lay-skin="primary" checked>
            </label>
            <div style="position: relative; height: 38px;">
                <div class="layui-input-inline" style="position: absolute; right: 128px; left: 0px;clear: none;">
                    <input id="${sendId}" type="text" name="title" placeholder="${indexText['请输入内容']}" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-input-inline" style="position: absolute; right: 64px; width: 64px;clear: none;">
                  <select id="${sendWithId}" lay-filter="${sendWithFilter}">
                    <option value="no">no</option>
                    <option value="\\n">\\n</option>
                    <option value="\\r">\\r</option>
                    <option value="\\r\\n" selected>\\r\\n</option>
                  </select>
                </div>
                <button id="${sendBtnId}" class="layui-btn layui-btn-normal" style="position: absolute; right: 0px; width: 64px;">${indexText['发送']}</button>
            </div>
        </div>`;

        //串口接收数据div
        let receiveDivStr = `
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label" style="height: 44px;padding-top: 1px;padding-bottom: 1px;">
                <p style="display:inline;">${indexText['接收数据']}</p>
                <input style="display:none;">
                <input id="${receiveTypeId}" type="checkbox" title="${indexText['字符串']}" lay-filter="${receiveTypeFilter}" lay-skin="primary" checked>
                <input id="${scrollId}" type="checkbox" title="${indexText['滚屏']}" lay-filter="${scrollFilter}" lay-skin="primary" checked>
            </label>
            <div class="layui-input-block">
                <textarea
                    readonly
                    id="${receiveId}"
                    name="desc"
                    wrap="off"
                    spellcheck="false"
                    placeholder="${indexText['串口输出']}"
                    class="layui-textarea"
                    style="height:${this.type || Env.hasSocketServer ? '220px' : '320px'}"
                ></textarea>
            </div>
        </div>`;

        //串口控制按钮div
        let ctrlBtnDivStr = `
        <div class="layui-form-item layui-form-text">
            <div style="text-align: center;"> 
                <button id="${clearBtnId}" class="layui-btn layui-btn-danger">${indexText['清空']}</button>
                ${this.config.ctrlCBtn ? `<button id="${ctrlCBtnId}" class="layui-btn layui-btn-danger">${indexText['中断']}</button>` : ''}
                ${this.config.ctrlDBtn ? `<button id="${ctrlDBtnId}" class="layui-btn layui-btn-danger">${indexText['复位']}</button>` : ''}
            </div>
        </div>`;

        /* 串口绘图器 */
        //串口绘图设置div
        let drawSettingDivStr = `
        <div class="layui-form-item layui-form-text">
            <div class="layui-input-inline" style="width:15%;clear:none;">
                <label class="layui-form-label">${indexText['最小']}</label>
                <input id="${yMinId}" type="text" name="title" autocomplete="off" class="layui-input" value="${this.config.yMin}">
            </div>
            <div class="layui-input-inline" style="width:15%;clear:none;">
                <label class="layui-form-label">${indexText['最大']}</label>
                <input id="${yMaxId}" type="text" name="title" autocomplete="off" class="layui-input" value="${this.config.yMax}">
            </div>
            <div class="layui-input-inline" style="width:15%;clear:none;">
                <label class="layui-form-label">${indexText['点数']}</label>
                <select id="${pointNumId}" lay-filter="${selectPointNumFilter}">
                    <option value="50" ${this.config.pointNum == "50" ? "selected" : ""}>50</option>
                    <option value="100" ${this.config.pointNum == "100" ? "selected" : ""}>100</option>
                    <option value="150" ${this.config.pointNum == "150" ? "selected" : ""}>150</option>
                    <option value="200" ${this.config.pointNum == "200" ? "selected" : ""}>200</option>
                    <option value="250" ${this.config.pointNum == "250" ? "selected" : ""}>250</option>
                    <option value="300" ${this.config.pointNum == "300" ? "selected" : ""}>300</option>
                </select>
            </div>
            <div class="layui-input-inline" style="width:55%;clear:none;">
                <!--
                <label class="layui-form-label" style="height: 44px;padding-top: 1px;padding-bottom: 1px;">
                    <p style="display:inline;">${indexText['发送数据']}</p>
                    <input style="display:none;">
                    <input id="${chartSendTypeId}" type="checkbox" title="${indexText['字符串']}" lay-filter="${chartSendTypeFilter}" lay-skin="primary" checked>
                </label>
                -->
                <label class="layui-form-label">${indexText["发送数据"]}</label>
                <div style="position: relative;width: 100%;height: 38px;">
                    <div class="layui-input-inline" style="position: absolute;left: 0px;right: 128px;clear: none;bottom: 0px;top: 0px;">
                        <input id="${chartSendId}" type="text" name="title" placeholder="${indexText['请输入内容']}" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="position: absolute;right: 64px;width: 64px;clear: none;bottom: 0px;top: 0px;">
                        <select id="${chartSendWithId}">
                            <option value="no">no</option>
                            <option value="\\n">\\n</option>
                            <option value="\\r">\\r</option>
                            <option value="\\r\\n" selected>\\r\\n</option>
                        </select>
                    </div>
                    <button id="${chartSendBtnId}" class="layui-btn layui-btn-normal" style="position: absolute;right: 0px;width: 64px;">${indexText['发送']}</button>
                </div>
            </div>
        </div>`;

        //串口绘图div
        let drawChartsDivStr = `
        <div class="layui-form-item layui-form-text" style="padding-top: 25px;">
            <div id="${dataDrawId}" style="width: 100%;overflow-x: auto;">
            </div>
        </div>`;

        let innerHtmlStr = `
        <div id="${moveId}" style="height: 10px;width: 100%;"></div>
        <div class="layui-tab" lay-filter="${tabFilter}" style="width: 100%;height: 100%;margin-top: 0px;margin-bottom: 0px;position: relative;">
            <ul class="layui-tab-title" style="position: absolute;left: 0px;top: 0px;height: 40px;right: 0px;">
                <li class="layui-this" lay-id="0">${indexText['串口监视器']}</li>
                <li lay-id="1">${indexText['串口可视化']}</li>
            </ul>
            <div class="layui-tab-content" style="position: absolute;left: 0px;top: 40px;bottom: 10px;right: 0px;overflow: auto;padding-bottom: 0px;">
                <div class="layui-tab-item layui-show">
                    ${this.type || Env.hasSocketServer ? selectPortDivStr : ""}
                    ${sendDivStr}
                    ${receiveDivStr}
                    ${ctrlBtnDivStr}
                </div>
                <div class="layui-tab-item">
                    ${drawSettingDivStr}
                    ${drawChartsDivStr}
                </div>
            </div>
        </div>`;

        //串口监视器&绘图器div
        let formStr = `
        <div class="layui-form layui-form-pane" id="${formId}" lay-filter="${formFilter}">
            ${innerHtmlStr}
        </div>`;

        return [formStr, innerHtmlStr];
    }


    generateDom() {
        let { formId } = this.id;
        let { formFilter } = this.filter;
        let serialDom = this;
        layui.use(['layer', 'form'], function () {
            let form = layui.form;
            let _divObj = document.createElement("div");
            _divObj.innerHTML = serialDom.htmlStr[1];
            _divObj.className = "layui-form layui-form-pane";
            _divObj.id = formId;
            _divObj.style.display = "none";
            _divObj.setAttribute("lay-filter", formFilter);
            document.body.appendChild(_divObj);
            form.render(null, formFilter);
        });
    }

    updateDom() {
        let { formId } = this.id;
        let { formFilter } = this.filter;
        let serialDom = this;
        layui.use(['layer', 'form'], function () {
            let form = layui.form;
            let _divObj = document.getElementById(formId);
            serialDom.htmlStr = serialDom.getHtmlStr();
            _divObj.innerHTML = serialDom.htmlStr[1];
            form.render(null, formFilter);
        });
    }

    getId() {
        let _id = {
            "pageId": `serial-page-${this.mark}`,
            "formId": `serial-${this.mark}`,
            "setDtrId": `serial-set-dtr-${this.mark}`,
            "setRtsId": `serial-set-rts-${this.mark}`,
            "selectPortId": `serial-selectport-${this.mark}`,
            "selectBaudId": `serial-selectbaud-${this.mark}`,
            "connectBtnId": `serial-connectbtn-${this.mark}`,
            "sendTypeId": `serial-sendtype-${this.mark}`,
            "sendId": `serial-send-${this.mark}`,
            "sendWithId": `serial-sendwith-${this.mark}`,
            "sendBtnId": `serial-sendbtn-${this.mark}`,
            "receiveTypeId": `serial-receivetype-${this.mark}`,
            "scrollId": `serial-scroll-${this.mark}`,
            "receiveId": `serial-receive-${this.mark}`,
            "clearBtnId": `serial-clearbtn-${this.mark}`,
            "ctrlCBtnId": `serial-interruptbtn-${this.mark}`,
            "ctrlDBtnId": `serial-resetbtn-${this.mark}`,
            "yMinId": `serial-ymin-${this.mark}`,
            "yMaxId": `serial-ymax-${this.mark}`,
            "pointNumId": `serial-pointnum-${this.mark}`,
            "chartSendTypeId": `serial-chartsendType-${this.mark}`,
            "chartSendId": `serial-chartsend-${this.mark}`,
            "chartSendWithId": `serial-chartsendWith-${this.mark}`,
            "chartSendBtnId": `serial-chartsendBtn-${this.mark}`,
            "dataDrawId": `serial-datadraw-${this.mark}`,
            "moveId": `serial-move-${this.mark}`
        }

        return _id;
    }

    getFilter() {
        let _filter = {
            "formFilter": `serial-filter-${this.mark}`,
            "setDtrFilter": `serial-set-dtr-filter-${this.mark}`,
            "setRtsFilter": `serial-set-rts-filter-${this.mark}`,
            "selectPortFilter": `serial-select-port-filter-${this.mark}`,
            "selectBaudFilter": `serial-select-baud-filter-${this.mark}`,
            "sendTypeFilter": `serial-send-type-filter-${this.mark}`,
            "sendWithFilter": `serial-send-with-filter-${this.mark}`,
            "chartSendTypeFilter": `serial-chart-send-type-filter-${this.mark}`,
            "tabFilter": `serial-tab-filter-${this.mark}`,
            "receiveTypeFilter": `serial-set-receive-type-filter-${this.mark}`,
            "scrollFilter": `serial-scroll-filter-${this.mark}`,
            "selectPointNumFilter": `serial-select-point-num-filter-${this.mark}`,
            "connectBtnFilter": `serial-connect-btn-filter-${this.mark}`
        }

        return _filter;
    }

    adjustSerialTool(layero, index) {
        const { pageId, moveId } = this.id;
        if (USER.theme === 'dark')
            $('#' + moveId).css('background-color', '#6c6969');
        layero.css({
            minWidth: '350px',
            minHeight: '200px',
            maxWidth: '710px',
            maxHeight: '600px',
            borderRadius: '5px'
        });
        const nowHeight = $(window).height(),
        nowWidth = $(window).width();
        layero.css({
            left: (nowWidth - layero.width()) / 2 + "px",
            top: (nowHeight - layero.height()) / 2 + "px"
        });

        const serialPageDom = $('#' + pageId);
        serialPageDom.css({
            height: '100%',
            overflow: 'hidden',
            maxWidth: '710px',
            maxHeight: '600px',
            minWidth: '350px',
            minHeight: '200px',
            borderRadius: '8px'
        });
    }

    open(sucFunc = () => {}, endFunc = () => {}) {
        let serialDom = this;
        let nowHeight = $(window).height();
        let nowWidth = $(window).width();
        let pageArea = ["90%", "95%"];
        if (this.height && nowHeight > this.height && 100*this.height/nowHeight < 95)
            pageArea[1] = 100*this.height/nowHeight + '%';
        if (this.width && nowWidth > this.width && 100*this.width/nowWidth < 90)
            pageArea[0] = 100*this.width/nowWidth + '%';

        layui.use(['layer', 'form'], () => {
            let layer = layui.layer;
            let form = layui.form;
            let { selectPortId, formId, moveId, pageId, receiveId } = serialDom.id;
            let { formFilter } = serialDom.filter;
            let receiveDom = $('#' + receiveId);
            serialDom.tool = layer.open({
                type: 1,
                id: pageId,
                title: false,
                area: pageArea,
                shade: this.shade,
                closeBtn: 1,
                anim: 0,
                resize: true,
                fixed: true,
                move: $('#' + moveId),
                //content: this.getHtmlStr()[0],
                content: $('#' + formId),
                success: (layero, index) => {
                    receiveDom.val("");
                    form.render(null, formFilter);
                    serialDom.adjustSerialTool(layero, index);
                    sucFunc(serialDom);
                },
                end: () => {
                    $(".layui-layer-shade").remove();
                    endFunc(this.nowPort);
                },
                resizing: (layero) => {
                    let nowHeight = $(window).height();
                    let nowWidth = $(window).width();
                    layero.css({
                        width: layero.width()/nowWidth*100 + "%",
                        height: layero.height()/nowHeight*100 + "%"
                    });
                    $('#' + pageId).css('height', '100%');
                    this.width = layero[0].clientWidth;
                    this.height = layero[0].clientHeight;
                }
            });
        });
    }

    close() {
        layer.close(this.tool);
    }

    updateTool(serialConfig) {
        this.config = this.getConfig(serialConfig);
        const {
            setDtrId,
            setRtsId,
            selectPortId,
            selectBaudId,
            sendTypeId,
            sendWithId,
            receiveTypeId,
            scrollId,
            yMinId,
            yMaxId,
            pointNumId
        } = this.id;
        const { form } = layui;
        const setDtrDom = $('#' + setDtrId),
              setRtsDom = $('#' + setRtsId),
              selectPortDom = $('#' + selectPortId),
              selectBaudDom = $('#' + selectBaudId),
              sendTypeDom = $('#' + sendTypeId),
              sendWithDom = $('#' + sendWithId),
              receiveTypeDom = $('#' + receiveTypeId),
              scrollDom = $('#' + scrollId),
              yMinDom = $('#' + yMinId),
              yMaxDom = $('#' + yMaxId),
              pointNumDom = $('#' + pointNumId);
        const checkboxObj = {
            'dtr': setDtrDom,
            'rts': setRtsDom,
            'sendStr': sendTypeDom,
            'receiveStr': receiveTypeDom,
            'scroll': scrollDom
        };
        const selectObj = {
            'port': selectPortDom,
            'baudRates': selectBaudDom,
            'sendWith': sendWithDom,
            'yMin': yMinDom,
            'yMax': yMaxDom,
            'pointNum': pointNumDom
        };
        for (let i in checkboxObj) {
            if (typeof this.config[i] !== 'undefined') {
                const nowDom = checkboxObj[i];
                nowDom.prop('checked', this.config[i]);
            }
        }
        for (let i in selectObj) {
            if (typeof this.config[i] !== 'undefined') {
                const nowDom = selectObj[i];
                $(nowDom).val(this.config[i]);
            }
        }
        form.render();
    }

    formOnClick(type, filter, doFunc) {
        layui.use(['layer', 'form'], () => {
            let form = layui.form;
            form.on(type + "(" + filter + ")", (elem) => {
                const { selectPortFilter } = this.filter;
                if (filter === selectPortFilter) {
                    if (elem.value === this.nowPort) return;
                    this.prevPort = this.nowPort;
                    this.nowPort = elem.value;
                    doFunc(this.prevPort, this.nowPort, elem);
                } else {
                    doFunc(this.nowPort, elem);
                }
            });
        });
    }

    elementOnClick(type, filter, doFunc) {
        layui.use(['layer', 'element'], () => {
            let element = layui.element;
            element.on(type + "(" + filter + ")", (elem) => {
                doFunc(this.nowPort, elem);
            });
        });
    }

    btnOnClick(id, doFunc) {
        $('#' + id).off("click").click(() => {
            doFunc(this.nowPort);
        });
    }

    onClickSetDtr(doFunc) {
        let { setDtrFilter } = this.filter;
        this.formOnClick("checkbox", setDtrFilter, doFunc);
    }

    onClickSetRts(doFunc) {
        let { setRtsFilter } = this.filter;
        this.formOnClick("checkbox", setRtsFilter, doFunc);
    }

    onClickSendType(doFunc) {
        let { sendTypeFilter } = this.filter;
        this.formOnClick("checkbox", sendTypeFilter, doFunc);
    }

    onClickReceiveType(doFunc) {
        let { receiveTypeFilter } = this.filter;
        this.formOnClick("checkbox", receiveTypeFilter, doFunc);
    }

    onClickScroll(doFunc) {
        let { scrollFilter } = this.filter;
        this.formOnClick("checkbox", scrollFilter, doFunc);
    }

    onClickSelectPort(doFunc) {
        let { selectPortFilter } = this.filter;
        this.formOnClick("select", selectPortFilter, doFunc);
    }

    onClickSelectBaud(doFunc) {
        let { selectBaudFilter } = this.filter;
        this.formOnClick("select", selectBaudFilter, doFunc);
    }

    onClickSelectPointNum(doFunc) {
        let { selectPointNumFilter } = this.filter;
        this.formOnClick("select", selectPointNumFilter, doFunc);
    }

    onClickSelectSendWith(doFunc) {
        let { sendWithFilter } = this.filter;
        this.formOnClick("select", sendWithFilter, doFunc);
    }

    onClickTab(doFunc) {
        let { tabFilter } = this.filter;
        this.elementOnClick("tab", tabFilter, doFunc);
    }

    onClickConnectBtn(doFunc) {
        let { connectBtnId } =this.id;
        this.btnOnClick(connectBtnId, doFunc);
    }

    onClickSendBtn(doFunc) {
        let { sendBtnId } =this.id;
        this.btnOnClick(sendBtnId, doFunc);
    }

    onClickChartSendBtn(doFunc) {
        let { chartSendBtnId } =this.id;
        this.btnOnClick(chartSendBtnId, doFunc);
    }

    onClickCtrlCBtn(doFunc) {
        let { ctrlCBtnId } =this.id;
        if (!ctrlCBtnId) return;
        this.btnOnClick(ctrlCBtnId, doFunc);
    }

    onClickCtrlDBtn(doFunc) {
        let { ctrlDBtnId } =this.id;
        if (!ctrlDBtnId) return;
        this.btnOnClick(ctrlDBtnId, doFunc);
    }

    onClickClearBtn(doFunc) {
        let { clearBtnId } =this.id;
        this.btnOnClick(clearBtnId, doFunc);
    }

    destroy() {
        if (this.tool)
            layer.close(this.tool);
        let { formId } = this.id;
        $('#' + formId).remove();
        this.destroyed = true;
    }
}

SerialDom.generate = SerialDomGenerator;

DomOperator.LoaderDomGenerator = (mark, config) => {

}

class LoaderDomGenerator {
    constructor(mark, config) {
        this.mark = mark;
        this.config = this.getConfig(config);
    }

    getConfig(config) {
        let _defaultConfig = {
            title: '',
            cancel: function () {}
        };

        return DomOperator.getConfig(config, _defaultConfig);
    }

    btnOnClick(id, doFunc) {
        $(document).on('click', '#' + id, function() {
            doFunc();
        });
    }

    onClickCancel(doFunc) {

    }

    chanageTitle(title) {

    }

    destroy() {

    }
}

DomOperator.getConfig = (inConfig, defaultConfig) => {
    let _config = {};

    for (let key in defaultConfig) {
        if (typeof defaultConfig[key] === "object") {
            if (inConfig[key] === undefined) {
                _config[key] = defaultConfig[key];
            } else {
                _config[key] = {};
                for (let childKey in defaultConfig[key]) {
                    _config[key][childKey] = inConfig[key][childKey] ?? defaultConfig[key][childKey];
                }
            }
        } else {
            _config[key] = inConfig[key] ?? defaultConfig[key];
        }
    }

    return _config;
}

})();