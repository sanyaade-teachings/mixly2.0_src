(() => {

'use strict';
goog.provide('Blockly.Blocks.ethernet');
goog.require('Blockly.Blocks');

Blockly.Msg['ETHERNET_HUE'] = 0;
//esp_now
Blockly.Blocks['esp_now_send'] = {
  init: function() {
     this.appendDummyInput()
        .appendField("ESP NOW"+Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_SEND);
    this.appendValueInput("mac")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MIXLY_ETHERNET_MAC_ADDRESS);
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MIXLY_SD_DATA);
    this.appendStatementInput("success")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_SEND+Blockly.Msg.Lang.MIXLY_SUCCESS);
    this.appendStatementInput("failure")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_SEND+Blockly.Msg.Lang.MIXLY_FAILED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['ETHERNET_HUE']);
 this.setTooltip("");
 this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
  }
};

//esp_now
Blockly.Blocks['esp_now_receive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP NOW"+Blockly.Msg.Lang.MQTT_subscribe2+Blockly.Msg.Lang.MIXLY_SD_DATA);
    this.appendStatementInput("receive_data")
        .setCheck(null);
    this.setColour(Blockly.Msg['ETHERNET_HUE']);
 this.setTooltip("");
 this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
  }
};

})();
