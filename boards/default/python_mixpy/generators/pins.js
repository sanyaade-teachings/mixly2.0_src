'use strict';
goog.provide('Blockly.Python.pins');
goog.require('Blockly.Python');

Blockly.Python.forBlock['pins_digital'] = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock.pins_digital_write=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_digital_read=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_analog_write=Blockly.Python.forBlock.pins_digital;
Blockly.Python.forBlock.pins_analog_read=Blockly.Python.forBlock.pins_digital;