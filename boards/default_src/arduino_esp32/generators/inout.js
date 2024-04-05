import { Profile } from 'mixly';
import { Arduino } from '../../arduino_common/arduino_generator';

export const inout_touchRead = function () {
    var pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var code = 'touchRead(' + pin + ')';
    return [code, Arduino.ORDER_ATOMIC];
};

export const ledcSetup = function () {
    var FREQ = Arduino.valueToCode(this, 'FREQ', Arduino.ORDER_ATOMIC);
    var RESOLUTION = Arduino.valueToCode(this, 'PWM_RESOLUTION', Arduino.ORDER_ATOMIC) || '8';
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    Arduino.setups_['ledcSetup' + channel + FREQ + RESOLUTION] = 'ledcSetup(' + channel + ', ' + FREQ + ', ' + RESOLUTION + ');\n';
    return "";
};

export const ledcAttachPin = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = 'ledcAttachPin(' + dropdown_pin + ', ' + channel + ');\n';
    return code;
};

export const ledcDetachPin = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var code = 'ledcDetachPin(' + dropdown_pin + ');\n';
    return code;
};

export const ledcWrite = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var value_num = Arduino.valueToCode(this, 'NUM', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>';
    const { analog } = Profile.default;
    if (typeof analog === 'object') {
        for (let i of analog)
            if (dropdown_pin === i[1]) {
                Arduino.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
                break;
            }
    }
    var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
};

export const inout_pwm_analog_write = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var FREQ = Arduino.valueToCode(this, 'FREQ', Arduino.ORDER_ATOMIC);
    var value_num = Arduino.valueToCode(this, 'NUM', Arduino.ORDER_ATOMIC);
    var RESOLUTION = this.getFieldValue('RESOLUTION');
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    Arduino.setups_['ledcSetup' + channel + FREQ + RESOLUTION] = 'ledcSetup(' + channel + ', ' + FREQ + ', ' + RESOLUTION + ');\n';
    Arduino.setups_['ledcAttachPin' + dropdown_pin + channel] = 'ledcAttachPin(' + dropdown_pin + ', ' + channel + ');\n   ';
    var code = 'ledcWrite(' + channel + ', ' + value_num + ');\n';
    return code;
};

export const controls_attachInterrupt = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    // Arduino.definitions_['pin_interrupt'] = '#include <Arduino.h>';
    Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    var code = 'attachInterrupt' + '(' + dropdown_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Arduino.definitions_[funcName] = code2;
    return code;
};

export const controls_detachInterrupt = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
};

export const touchAttachInterrupt = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var threshold = Arduino.valueToCode(this, 'threshold', Arduino.ORDER_ATOMIC);
    Arduino.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin + ',gotTouch' + dropdown_pin + ', ' + threshold + ');';
    var code = '';
    var funcName = 'gotTouch' + dropdown_pin;
    var branch = Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Arduino.definitions_[funcName] = code2;
    return code;
};

export const inout_esp32_dac = function () {
    var PIN = this.getFieldValue('PIN');
    var value = Arduino.valueToCode(this, 'value', Arduino.ORDER_ATOMIC);
    var code = 'dacWrite(' + PIN + ', ' + value + ');\n';
    return code;
};

export const esp32_led_pwm = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var val = Arduino.valueToCode(this, 'val', Arduino.ORDER_ATOMIC);
    var resolution = this.getFieldValue('resolution');
    var freq = this.getFieldValue('freq');
    var ledChannel = this.getFieldValue('ledChannel');
    Arduino.setups_['ledChannel' + ledChannel] = 'ledcSetup(' + ledChannel + ', ' + freq + ', ' + resolution + ');';
    Arduino.setups_['ledChannel' + dropdown_pin] = 'ledcAttachPin(' + dropdown_pin + ', ' + ledChannel + ');';
    var code = 'ledcWrite(' + ledChannel + ', ' + val + ');\n';
    return code;
};
