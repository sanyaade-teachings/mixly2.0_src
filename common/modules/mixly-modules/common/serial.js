goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.MArray');
goog.require('Mixly.StatusBarTab');
goog.provide('Mixly.Serial');

const { form } = layui;
const { MArray, StatusBarTab } = Mixly;

class Serial {
    // {array} 已打开的串口号
    static openedPortsName = [];

    // {null|string} 上一次使用的烧录串口号
    static prevUsedBurnPortName = null;

    // {null|string} 上一次使用的上传串口号
    static prevUsedUploadPortName = null;

    static obj = {};

    static getSerial(portName) {
        return obj[portName] ?? null;
    }

    static addSerial(portName, obj) {
        obj[portName] = obj;
    }

    /**
     * @function 重新渲染串口下拉框
     * @param {array} 当前可用的所有串口
     * @return {void}
     **/
    static renderSelectBox(portsName) {
        const $select = $('#ports-type');
        const selectedPort = $select.val();
        $select.empty();
        portsName.map(portName => {
            let $option = $(`<option value="${portName}">${portName}</option>`);
            if (selectedPort === name) {
                $option.attr('selected', true);
            }
            $select.append($option);
        });
        form.render('select', 'ports-type-filter');
        let footerStatus = portsName.length ? 'inline-flex' : 'none';
        $('#mixly-footer-port-div').css('display', footerStatus);
        $('#mixly-footer-port').html(selectedPort);
    }

    static getSelectedPortName() {
        const $select = $('#ports-type');
        const selectedPort = $select.val();
        return selectedPort;
    }

    static getBurnPortsName() {

    }

    static getUploadPortsName() {

    }

    getMenu = (portsName) => {
        const { mainStatusBarTab } = Mixly;
        let newPortsName = [];
        let tabsName = Object.keys(mainStatusBarTab.statusBars);
        for (let portName of portsName) {
            if (tabsName.includes(portName)) {
                continue;
            }
            newPortsName.push(portName);
        }
        return newPortsName;
    }

    static addStatusbarTabExtFunc() {
        const { mainStatusBarTab } = Mixly;
        mainStatusBarTab.addCtrlBtn();
        mainStatusBarTab.menuOptionOnclick = (event) => {
            const port = $(event.currentTarget).attr('value');
            const serialObj = new this(port, {});
            serialObj.open();
        }

        mainStatusBarTab.getMenuOptions = () => {
            const ports = this.getMenu(this.uploadPortsName);
            let menu = { list: ports };
            if (!ports.length) {
                menu.empty = Msg.Lang['无可用串口'];
            }
            return menu;
        }
    }

    /**
     * 
     * 
     **/
    constructor(port, config) {
        this.port = port;
        this.config = config;
        this.isOpend = false;
        this.statusBar = null;
        this.status = {
            dtr: false,
            rts: false
        };
        Serial.addSerial(port, this);
    }

    // 可覆盖
    open(config) {
        this.onOpen();
    }

    // 可覆盖
    close(port) {
        this.onClose();
    }

    onOpen() {
        StatusBarTab.add('serial', this.port);
        this.statusBar = StatusBarTab.getStatusBarById(this.port);
        this.statusBar.open();
        if (Serial.openedPortsName.indexOf(this.port) === -1) {
            Serial.openedPortsName.push(this.port);
        }
        this.isOpend = true;
    }

    onClose() {
        this.statusBar.close();
        MArray.remove(Serial.openedPortsName, this.port);
        this.isOpend = false;
    }

    // 可覆盖
    async setDtr(dtr) {
        this.status.dtr = dtr;
    }

    // 可覆盖
    async setRts(rts) {
        this.status.rts = rts;
    }

    // 可覆盖
    async setDtrAndRts(dtr, rts) {

    }

    async reset() {
        const { reset } = this.config;
        if (typeof reset !== 'object') return;
        let len = reset.length;
        for (let i = 0; i < len; i++) {
            if (reset[i].dtr !== undefined
                || reset[i].rts !== undefined) {
                let dtr = !!reset[i].dtr;
                let rts = !!reset[i].rts;
                await this.setDtrAndRts(port, dtr, rts);
            } else if (reset[i].sleep) {
                let ms = parseInt(reset[i].sleep) || 100;
                await Serial.sleep(ms);
            }
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

Mixly.Serial = Serial;

});