import * as Blockly from 'blockly/core';

export const pins_digital = function () {
    var code = this.getFieldValue('PIN');
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
export const pins_analog = pins_digital;
export const pins_pwm = pins_digital;
export const pins_interrupt = pins_digital;
export const pins_MOSI = pins_digital;
export const pins_MISO = pins_digital;
export const pins_SCK = pins_digital;
export const pins_SCL = pins_digital;
export const pins_SDA = pins_digital;