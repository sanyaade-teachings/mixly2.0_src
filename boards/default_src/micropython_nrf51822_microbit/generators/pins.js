import * as Blockly from 'blockly/core';

export const pins_digital = function () {
    var code = this.getFieldValue('PIN');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const pins_analog = pins_digital;
export const pins_button = pins_digital;
export const pins_pwm = pins_digital;
export const pins_interrupt = pins_digital;
export const pins_serial = pins_digital;
export const pins_builtinimg = pins_digital;
export const pins_imglist = pins_digital;
export const pins_axis = pins_digital;
export const pins_brightness = pins_digital;
export const pins_tone_notes = pins_digital;
export const pins_radio_power = pins_digital;
export const pins_radio_datarate = pins_digital;
