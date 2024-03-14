import Python from '../../python/python_generator';

export const cc_g1_read_bat = function () {
    Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_bat()';
    return [code, Python.ORDER_ATOMIC];
};

export const cc_g1_read_joystick = function () {
    var v = this.getFieldValue('VAR');
    Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_joystick()' + v + '';
    return [code, Python.ORDER_ATOMIC];
};

export const cc_g1_read_key = function () {
    var v = this.getFieldValue('VAR');
    Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_key(' + v + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const cc_g1_turnoff = function () {
    Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.shutdown()';
    return code;
};