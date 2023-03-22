'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Msg['BASE_HUE'] = 20//'#ae3838';//40;

Blockly.Blocks.ledcSetup = {
  init: function(){
    this.setColour(Blockly.Msg['BASE_HUE']);
    this.appendValueInput('CHANNEL')
    .setCheck(Number)
    .appendField("ledc"+Blockly.Msg.Lang.MIXLY_SETUP+Blockly.Msg.Lang.MIXLY_CHANNEL);
    this.appendValueInput("FREQ", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_FREQUENCY)
    .setCheck(Number);
    this.appendValueInput('PWM_RESOLUTION')
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_RESOLUTION);
    this.appendDummyInput("")
    .appendField("bit");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};

Blockly.Blocks.ledcAttachPin = {
  init: function(){
    this.setColour(Blockly.Msg['BASE_HUE']);
    this.appendValueInput("PIN", Number)
    .appendField("ledc"+Blockly.Msg.Lang.MIXLY_ATTATCH+Blockly.Msg.Lang.MIXLY_PIN)
    .setCheck(Number);
    this.appendValueInput('CHANNEL')
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};
Blockly.Blocks.ledcDetachPin = {
  init: function(){
    this.setColour(Blockly.Msg['BASE_HUE']);
    this.appendValueInput("PIN", Number)
    .appendField("ledc"+Blockly.Msg.Lang.MIXLY_DETACH+Blockly.Msg.Lang.MIXLY_PIN)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};
Blockly.Blocks.ledcWrite=Blockly.Blocks.inout_analog_write;

Blockly.Blocks.inout_touchRead = {
  init: function(){
   this.setColour(Blockly.Msg['BASE_HUE']);
   this.appendValueInput("PIN", Number)
   .appendField(Blockly.Msg.Lang.MIXLY_ESP32_TOUCH)
   .appendField(Blockly.Msg.Lang.MIXLY_PIN);
   this.appendDummyInput()
   .appendField(Blockly.Msg.Lang.MIXLY_ESP32_MACHINE_VALUE)
   this.setOutput(true, Number);
   this.setInputsInline(true);
   this.setTooltip(Blockly.Msg.Lang.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
 }
};

Blockly.Blocks.touchAttachInterrupt = {
  init: function() {
    this.setColour(Blockly.Msg['BASE_HUE']);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_TOUCHATTACHINTERRUPT_PIN)
    .setCheck(Number);
    this.appendValueInput("threshold", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_THRESHOLD)
    .setCheck(Number);
    this.appendDummyInput("");
    this.appendStatementInput('DO')
    .appendField(Blockly.Msg.Lang.MIXLY_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
  }
};
Blockly.Blocks['inout_esp32_dac'] = {
  init: function() {
    this.appendValueInput("value")
    .setCheck(null)
    .appendField(Blockly.Msg.Lang.inout_esp32_dac)
    .appendField(new Blockly.FieldDropdown(profile.default.dac), "PIN")
    .appendField(Blockly.Msg.Lang.MIXLY_VALUE2);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip(Blockly.Msg.Lang.inout_esp32_dac_HELP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_led_pwm'] = {
  init: function() {
    this.appendValueInput("PIN")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MICROBIT_ACTUATOR_ticks)
        .appendField(new Blockly.FieldTextInput("8"), "resolution")
        .appendField(Blockly.Msg.Lang.MIXLY_FREQUENCY)
        .appendField(new Blockly.FieldTextInput("5000"), "freq")
        .appendField(Blockly.Msg.Lang.MIXLY_CHANNEL)
        .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], ["13","13"], ["14","14"], ["15","15"]]), "ledChannel")
        .appendField(Blockly.Msg.Lang.MIXLY_ANALOGWRITE_PIN);
    this.appendValueInput("val")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.MIXLY_VALUE2);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};