(() => {

    goog.require('Blockly');

    /**
     * @name 模块名 Http GET请求
     * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
     */
    Blockly.Blocks.http_get = {
        init: function () {
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_GET_REQUEST);
            this.appendValueInput("api")
                .setCheck(null)
                .appendField(Blockly.Msg.blynk_SERVER_ADD);
            this.appendStatementInput("success")
                .setCheck(null)
                .appendField(Blockly.Msg.MIXLY_SUCCESS);
            this.appendStatementInput("failure")
                .setCheck(null)
                .appendField(Blockly.Msg.MIXLY_FAILED);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(Blockly.Msg['ETHERNET_HUE']);
            this.setTooltip("");
        }
    };

    /**
     * @name 模块名 Http PATCH|POST|PUT请求
     * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
     */
    Blockly.Blocks.http_post = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["POST", "POST"],
                    ["PATCH", "PATCH"],
                    ["PUT", "PUT"]
                ]), "TYPE")
                .appendField(Blockly.Msg.blockpy_REQUESTS);
            this.appendValueInput("api")
                .setCheck(null)
                .appendField(Blockly.Msg.blynk_SERVER_ADD);
            this.appendValueInput("data")
                .setCheck(null)
                .appendField(Blockly.Msg.MIXLY_SD_DATA);
            this.appendStatementInput("success")
                .setCheck(null)
                .appendField(Blockly.Msg.MIXLY_SUCCESS);
            this.appendStatementInput("failure")
                .setCheck(null)
                .appendField(Blockly.Msg.MIXLY_FAILED);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(Blockly.Msg['ETHERNET_HUE']);
            this.setTooltip("");
        }
    };

})();