import Python from '../../python/python_generator';
import { JSFuncs } from 'mixly';

export const hardware_arduino_start = function () {
    Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    // var code= v + '.start()\n';
    var code = v + ' = s4alib.s4a_start("' + JSFuncs.getCom() + '")\n';
    return code;
};

export const inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Python.ORDER_ATOMIC];
};

export const hardware_arduino_digital_write = function () {
    Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = "";
    code += '' + v + '.digital_write(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    return code;
};

export const hardware_arduino_digital_read = function () {
    Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "";
    code = '' + v + '.digital_read(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const hardware_arduino_analog_read = function () {
    Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "";
    code = '' + v + '.analog_read(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const hardware_arduino_analog_write = function () {
    Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var code = "";
    code += '' + v + '.analog_write(' + dropdown_pin + ',' + value_num + ')\n'
    return code;
};
