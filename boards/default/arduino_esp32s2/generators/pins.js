'use strict';
goog.provide('Blockly.Arduino.pins');
goog.require('Blockly.Arduino');
Blockly.Arduino.forBlock['pins_digital'] = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.forBlock.pins_button=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_analog=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_pwm=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_dac = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_touch = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_interrupt=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_serial=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_builtinimg=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_imglist=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_playlist=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_axis=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_exlcdh = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_exlcdv = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_brightness=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_tone_notes = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_radio_power = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_radio_datarate = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_one_more = Blockly.Arduino.forBlock.pins_digital;
//Blockly.Arduino.serial_select = Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_MOSI=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_MISO=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_SCK=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_scl=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_sda=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.brightness=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_tx=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.CHANNEL=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.PWM_RESOLUTION=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.OCTAVE=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.TONE_NOTE=Blockly.Arduino.forBlock.pins_digital;
Blockly.Arduino.forBlock.pins_digitalWrite=Blockly.Arduino.forBlock.pins_digital;