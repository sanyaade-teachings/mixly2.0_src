'use strict';
goog.provide('Blockly.Python.pins');
goog.require('Blockly.Python');

Blockly.Python.forBlock['pins_digital'] = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.forBlock.pins_analog=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_button=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_pwm=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_interrupt=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_serial=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_builtinimg=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_imglist=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_axis=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_brightness=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_tone_notes = Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_radio_power = Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_radio_datarate = Blockly.Python.forBlock.pins_digital;
