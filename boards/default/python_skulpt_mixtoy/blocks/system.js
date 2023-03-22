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
	    .appendField(Blockly.Msg.Lang.blockpy_time_time);
    this.setOutput(true, Number);
	this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_CONTROL_MILLIS);
  }
};

Blockly.Blocks['time_localtime'] = {
    init: function() {
        this.setColour(Blockly.Msg['SYSTEM_HUE']);        
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_ALL, "all"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_YEAR, "0"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_MONTH, "1"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_DATE, "2"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_HOUR, "3"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_MINUTE, "4"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_SECOND, "5"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_INWEEK, "6"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_INYEAR, "7"],
                [Blockly.Msg.Lang.MIXLY_SYSTEM_TIME_LOCALTIME_DST, "8"]                
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
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
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};

Blockly.Blocks.reset = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
      .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Reset_micro);
    this.setPreviousStatement(true);
    // this.setNextStatement(true);
  }
};



Blockly.Blocks.controls_mstimer2 = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
	this.appendValueInput('TIME')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField('MsTimer2')
        .appendField(Blockly.Msg.Lang.MIXLY_MSTIMER2_EVERY);
    this.appendDummyInput()
		.appendField('ms');
	this.appendStatementInput('DO')
        .appendField(Blockly.Msg.Lang.MIXLY_MSTIMER2_DO);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.controls_mstimer2_start = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.Msg.Lang.MIXLY_MSTIMER2_START);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.controls_mstimer2_stop = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.Msg.Lang.MIXLY_STOP);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.time_sleep = {
  init: function() {
    this.setColour(Blockly.Msg['SYSTEM_HUE']);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_DELAY)        
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_SECOND)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};