'use strict';

goog.provide('Blockly.Blocks.communicate');

goog.require('Blockly.Blocks');

profile["default"] = profile["arduino_esp32"];
Blockly.Msg['COMMUNICATE_HUE'] = 140;


Blockly.Blocks['serialBT_Init'] = {
  init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendValueInput("CONTENT", String)
    .appendField(Blockly.Msg.MIXLY_SERIALBT_INIT)
    .setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIAL_BEGIN);
  }
};
Blockly.Blocks['serialBT_available'] = {
  init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SERIALBT_AVAILABLE);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
  }
};

Blockly.Blocks['serialBT_read'] = {
  init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SERIALBT_READ);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
    
  }
};
Blockly.Blocks['serialBT_write'] = {
  init: function () {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendValueInput("CONTENT", String)
    .appendField(Blockly.Msg.MIXLY_SERIALBT_WRITE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_WRITE_TOOLTIP);
  }
};

