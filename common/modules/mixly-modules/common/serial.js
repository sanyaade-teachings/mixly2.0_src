goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.MArray');
goog.require('Mixly.Events');
goog.provide('Mixly.Serial');

const { form } = layui;
const {
    MArray,
    Events,
} = Mixly;

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

    static getMenu = (portsName) => {
        const { mainStatusBarTabs } = Mixly;
        let newPortsName = [];
        let tabsName = Object.keys(mainStatusBarTabs.statusBars);
        for (let portName of portsName) {
            if (tabsName.includes(portName)) {
                continue;
            }
            newPortsName.push(portName);
        }
        return newPortsName;
    }

    static addEventsListenerForStatusBarTabs() {
        const { mainStatusBarTabs } = Mixly;
        const { events } = mainStatusBarTabs;

        events.bind('onSelectMenu', (event) => {
            const port = $(event.currentTarget).attr('value');
            const serial = new this(port, {});
            serial.open();
        });

        events.bind('getMenu', (event) => {
            const ports = this.getMenu(this.uploadPortsName);
            let menu = { list: ports };
            if (!ports.length) {
                menu.empty = Msg.Lang['无可用串口'];
            }
            return menu;
        });
    }

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        this.receiveBuffer = [];
        this.events = new Events(['onOpened', 'onClosed', 'onData', 'onError']);
        Serial.addSerial(port, this);
    }

    // 可覆盖
    open(config) {
        this.onOpened(0);
    }

    // 可覆盖
    close(port) {
        this.onClosed(0);
    }

    onOpened(code) {
        StatusBarTabs.add('serial', this.port);
        this.statusBar = StatusBarTabs.getStatusBarById(this.port);
        this.statusBar.open();
        if (Serial.openedPortsName.indexOf(this.port) === -1) {
            Serial.openedPortsName.push(this.port);
        }
        this.isOpend = true;
    }

    onClosed(code) {
        this.statusBar.close();
        MArray.remove(Serial.openedPortsName, this.port);
        this.isOpend = false;
    }

    onData(data) {
        let lines = data.split('\n');

    }

    onError(error) {

    }

    // 可覆盖
    async setDTR(dtr) {
        this.status.dtr = dtr;
    }

    // 可覆盖
    async setRTS(rts) {
        this.status.rts = rts;
    }

    // 可覆盖
    async setDTRAndRTS(dtr, rts) {

    }

    async reset() {
        const { reset } = this.config;
        if (typeof reset !== 'object') return;
        let len = reset.length;
        for (let i = 0; i < len; i++) {
            let { dtr, rts, sleep } = reset[i];
            if (dtr !== undefined || rts !== undefined) {
                dtr = !!dtr;
                rts = !!rts;
                await this.setDTRAndRTS(dtr, rts);
            } else if (sleep) {
                let ms = parseInt(sleep) || 100;
                await Serial.sleep(ms);
            }
        }
    }

    writeStr() {

    }

    writeBuffer() {

    }

    writeCtrlC() {

    }

    writeCtrlD() {

    }


}

Mixly.Serial = Serial;

});