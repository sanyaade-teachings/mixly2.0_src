'use strict';

goog.provide('Blockly.Blocks.hardware');

goog.require('Blockly.Blocks');

Blockly.Msg['HARDWARE_HUE'] = 40

Blockly.Blocks.hardware_arduino_start = {
    init: function () {
        this.setColour(Blockly.Msg['HARDWARE_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE)
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE_START)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(Blockly.Msg['HARDWARE_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_HIGH, "HIGH"], [Blockly.Msg.Lang.MIXLY_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};

Blockly.Blocks.hardware_arduino_digital_write = {
  init: function() {
    this.setColour(Blockly.Msg['HARDWARE_HUE']);
    this.appendValueInput('SUB')
        .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.Msg.Lang.MIXLY_Digital_PINMODEOUT)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.Msg.Lang.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.hardware_arduino_digital_read = {
  init: function() {
    this.setColour(Blockly.Msg['HARDWARE_HUE']);
    this.appendValueInput('SUB')
        .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_Digital_PINMODEIN)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_ESP32_MACHINE_VALUE)
    this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
  }
};

Blockly.Blocks.hardware_arduino_analog_write = {
  init: function() {
    this.setColour(Blockly.Msg['HARDWARE_HUE']);
    this.appendValueInput('SUB')
        .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.Msg.Lang.MIXLY_Analog_PINMODEOUT)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_VALUE2)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
  }
};

Blockly.Blocks.hardware_arduino_analog_read = {
  init: function() {
    this.setColour(Blockly.Msg['HARDWARE_HUE']);
    this.appendValueInput('SUB')
        .appendField(Blockly.Msg.Lang.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.Msg.Lang.MIXLY_Analog_PINMODEIN)
        .appendField(Blockly.Msg.Lang.MIXLY_PIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_ESP32_MACHINE_VALUE)
    this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
  }
};