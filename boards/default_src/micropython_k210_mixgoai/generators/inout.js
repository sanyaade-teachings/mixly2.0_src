import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const PGA_SELET = function () {
    var code = this.getFieldValue('PGA');
    return [code, Python.ORDER_ATOMIC];
};

export const inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Python.ORDER_ATOMIC];
};
// ok

export const inout_digital_init = function () {
    Python.definitions_['import board'] = 'import board';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    var varName = (pin_obj == 'pin#') ? 'pin' + dropdown_pin : Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = board.pin(' + dropdown_pin + ', board.' + dropdown_mode + ')\n';
    return code;
};

export const inout_digital_write = function () {
    Python.definitions_['import board'] = 'import board';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.value(' + dropdown_stat + ')\n'
    return code;
};

export const inout_digital_read = function () {
    Python.definitions_['import board'] = 'import board';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.value()';
    return [code, Python.ORDER_ATOMIC];
};

export const inout_pwm_init = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['from machine import PWM'] = 'from machine import PWM';
    Python.definitions_['from machine import Timer'] = 'from machine import Timer';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'pin#') ? 'pin' + dropdown_pin : Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var Timer = sub % 3
    var CHANNEL = parseInt(sub / 3)
    var code1 = 'tim' + sub + ' = Timer(Timer.TIMER' + Timer + ',Timer.CHANNEL' + CHANNEL + ', mode=Timer.MODE_PWM)\n';
    var code2 = varName + ' = PWM(tim' + sub + ',freq=' + freq + ',duty=0, pin=' + dropdown_pin + ')\n';

    return code1 + code2;
};

export const inout_pwm_write = function () {
    Python.definitions_['from machine import PWM'] = 'from machine import PWM';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'pwm', Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.duty(' + dropdown_stat + ')\n'
    return code;
};

export const inout_adc_init = function () {
    Python.definitions_['import board'] = 'import board';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = 'board.adc_init(' + key + ')\n';
    return code;
};


export const inout_adc_read = function () {
    Python.definitions_['import board'] = 'import board';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'board.adc_read(' + pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const inout_adc_Vread = function () {
    Python.definitions_['import board'] = 'import board';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'board.adc_vread(' + pin + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const inout_pin_attachInterrupt = function () {
    Python.definitions_['import board'] = 'import board';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Python.valueToCode(this, 'DO', Python.ORDER_ATOMIC);
    var code1 = 'key' + dropdown_pin + '=board.pin(' + dropdown_pin + ', board.GPIO.IN, board.GPIO.PULL_NONE)\n'
    var code2 = 'key' + dropdown_pin + '.irq(' + atta + ',board.' + dropdown_mode + ',board.GPIO.WAKEUP_NOT_SUPPORT, 7)\n'

    return code1 + code2;
};

export const inout_pin_disirq = function () {
    Python.definitions_['import board'] = 'import board';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'key' + dropdown_pin + '.disirq()\n'
    return code;
};
/////////////////////////////////////////////

