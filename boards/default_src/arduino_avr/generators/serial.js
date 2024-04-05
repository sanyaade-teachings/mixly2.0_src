import { Profile } from 'mixly';
import { Arduino } from '../../arduino_common/arduino_generator';

export const serial_begin = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || Profile.default.serial;
    Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + content + ');';
    return '';
};

export const serial_write = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || '""'
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
};

export const serial_print = function () {
    var serial_select = this.getFieldValue('serial_select');
    var new_line = this.getFieldValue('new_line');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || '""'
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.' + new_line + '(' + content + ');\n';
    return code;
};

export const serial_println = serial_print;

export const serial_print_num = function () {
    var serial_select = this.getFieldValue('serial_select');
    var Decimal = this.getFieldValue('STAT');
    var new_line = this.getFieldValue('new_line');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || '0'
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.' + new_line + '(' + content + ',' + Decimal + ');\n';
    return code;
};

export const serial_print_hex = serial_print_num;

export const serial_available = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".available()";
    return [code, Arduino.ORDER_ATOMIC];
};

export const serial_readstr = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".readString()";
    return [code, Arduino.ORDER_ATOMIC];
};

export const serial_readstr_until = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC);
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".readStringUntil(" + content + ")";
    return [code, Arduino.ORDER_ATOMIC];
};

export const serial_parseInt_Float = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var dropdown_stat = this.getFieldValue('STAT');
    var code = serial_select + '.' + dropdown_stat + '()';
    return [code, Arduino.ORDER_ATOMIC];
};

export const serial_flush = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (!Arduino.setups_['setup_serial_' + serial_select]) {
        Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.flush();\n';
    return code;
};

export const serial_softserial = function () {
    var serial_select = this.getFieldValue('serial_select');
    var dropdown_pin1 = Arduino.valueToCode(this, 'RX', Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Arduino.valueToCode(this, 'TX', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    Arduino.definitions_['var_declare_' + serial_select] = 'SoftwareSerial ' + serial_select + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
    return '';
};
export const serial_event = function () {
    var serial_select = this.getFieldValue('serial_select');
    var funcName = 'attachPinInterrupt_fun_' + serial_select;
    var branch = Arduino.statementToCode(this, 'DO');
    var code2 = 'void ' + serial_select.replace('Serial', 'serialEvent') + '() {\n' + branch + '}\n';
    Arduino.definitions_[funcName] = code2;
    return "";
};