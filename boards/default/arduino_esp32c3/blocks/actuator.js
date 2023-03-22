'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Msg['ACTUATOR_HUE'] = 100;
Blockly.Blocks.controls_tone={
    init:function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_TONE);
        this.appendValueInput("PIN")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL);
        this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_FREQUENCY);
        this.appendValueInput('DELAY_TIME')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_DELAY);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.controls_notone={
    init:function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_NOTONE);
        this.appendValueInput("PIN")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};

Blockly.Blocks.onboard_tone={
    init:function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_TONE);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL);
        this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_FREQUENCY);
        this.appendValueInput('DELAY_TIME')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_DELAY);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.onboard_notone={
    init:function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_NOTONE);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};

Blockly.Arduino.motor_id = function() {
  var code = this.getFieldValue('CHANNEL');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Blocks['motor_id'] = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
           ["1","1"],["2","2"],["3","3"],["4","4"]
           ]), "CHANNEL");
        this.setOutput(true);
   // this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_HIGHLOW);
}
};


Blockly.Blocks.HR8833_Motor_Setup= {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MOTOR_HR8833+Blockly.Msg.Lang.MIXLY_SETUP);
    this.appendValueInput('MOTOR_ID')
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MOTOR_HR8833_TEAM_NO);
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_PIN+"1");
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_PIN+"2");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks.HR8833_Motor_Speed= {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MOTOR_HR8833+Blockly.Msg.Lang.MIXLY_SETTING);
    this.appendValueInput('MOTOR_ID')
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MOTOR_HR8833_TEAM_NO);
    this.appendValueInput('SPEED')
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks.handbit_motor_move= {
  init: function() { 
  this.appendDummyInput()
      .appendField(Blockly.Msg.Lang.MIXLY_MOTOR)
      .appendField(new Blockly.FieldDropdown([["M1","0x01"],["M2","0x10"]]), "type");
  this.appendValueInput("speed")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.Lang.MIXLY_SPEED+"(-100~100)");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(100);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};