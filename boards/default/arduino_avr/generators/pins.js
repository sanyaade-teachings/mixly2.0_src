'use strict';
goog.provide('Blockly.Arduino.pins');
goog.require('Blockly.Arduino');

Blockly.Arduino.forBlock['pins_digital'] = function () {
    var code = this.getFieldValue('PIN');
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.forBlock['pins_analog'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_pwm'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_interrupt'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_MOSI'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_MISO'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_SCK'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_SCL'] = Blockly.Arduino.forBlock['pins_digital'];
Blockly.Arduino.forBlock['pins_SDA'] = Blockly.Arduino.forBlock['pins_digital'];