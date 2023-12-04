import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';
import { JSFuncs } from 'mixly';

export const serial_open = function () {
    Python.definitions_['import_serial'] = 'import serial';
    var time = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    var varName = Python.variableDB_.getName(this.getFieldValue('SER'),
        Blockly.Variables.NAME_TYPE);
    var bps = this.getFieldValue('BPS');
    // var code= v + '.start()\n';
    var code = varName + ' = serial.Serial("' + JSFuncs.getCom() + '", ' + bps + ', timeout=' + time + ')\n';
    return code;
};

export const serial_write = function () {
    Python.definitions_['import_serial'] = 'import serial';
    var ser = Python.valueToCode(this, 'SER', Python.ORDER_ADDITIVE) || 'ser';
    var str = (Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""');
    // var code= v + '.start()\n';
    var code = ser + '.write(' + str + ')\n';
    return code;
};

export const serial_read_b = function () {
    Python.definitions_['import_serial'] = 'import serial';
    var ser = Python.valueToCode(this, 'SER', Python.ORDER_ADDITIVE) || 'ser';
    var len = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    var code = ser + '.read(' + len + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const serial_close = function () {
    Python.definitions_['import_serial'] = 'import serial';
    var ser = Python.valueToCode(this, 'SER', Python.ORDER_ADDITIVE) || 'ser';
    var code = ser + '.close()\n';
    return code;
};