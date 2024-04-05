import { Arduino } from '../../arduino_common/arduino_generator';

export const pins_digital = function () {
    var code = this.getFieldValue('PIN');
    return [code, Arduino.ORDER_ATOMIC];
};

export const pins_button = pins_digital;
export const pins_analog = pins_digital;
export const pins_pwm = pins_digital;
export const pins_dac = pins_digital;
export const pins_touch = pins_digital;
export const pins_interrupt = pins_digital;
export const pins_serial = pins_digital;
export const pins_builtinimg = pins_digital;
export const pins_imglist = pins_digital;
export const pins_playlist = pins_digital;
export const pins_axis = pins_digital;
export const pins_exlcdh = pins_digital;
export const pins_exlcdv = pins_digital;
export const pins_brightness = pins_digital;
export const pins_tone_notes = pins_digital;
export const pins_radio_power = pins_digital;
export const pins_radio_datarate = pins_digital;
export const pins_one_more = pins_digital;
//export const serial_select = pins_digital;
export const pins_MOSI = pins_digital;
export const pins_MISO = pins_digital;
export const pins_SCK = pins_digital;
export const pins_scl = pins_digital;
export const pins_sda = pins_digital;
export const brightness = pins_digital;
export const pins_tx = pins_digital;
export const CHANNEL = pins_digital;
export const PWM_RESOLUTION = pins_digital;
export const OCTAVE = pins_digital;
export const TONE_NOTE = pins_digital;
export const pins_digitalWrite = pins_digital;