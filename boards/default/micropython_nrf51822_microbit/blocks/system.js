'use strict';

goog.provide('Blockly.Blocks.system');

goog.require('Blockly.Blocks');


Blockly.Msg['SYSTEM_HUE'] = 120;

Blockly.Blocks.base_delay = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_DELAY + '(' + Blockly.Msg.Lang.MIXLY_MILLIS + ')')
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};


Blockly.Blocks.controls_millis = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
	      .appendField(Blockly.Msg.Lang.MIXLY_RUNTIME + "(" + Blockly.Msg.Lang.MIXLY_MILLIS + ")");
    this.setOutput(true, Number);
	  this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_CONTROL_MILLIS);
  }
};


Blockly.Blocks.Panic_with_status_code = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendValueInput("STATUS_CODE", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Panic_with_status_code)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_Panic_with_status_code);
  }
};


Blockly.Blocks.reset = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
      .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Reset_micro);
    this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_Reset_micro);
  }
};


Blockly.Blocks.controls_uname = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_CONTORL_UNAME);

    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.Lang.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.Lang.MIXLY_MICROBIT_PY_CONTORL_UNAME);
  }
};
