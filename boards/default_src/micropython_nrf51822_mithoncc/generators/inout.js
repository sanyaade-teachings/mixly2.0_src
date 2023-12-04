import Python from '../../python/python_generator';

// ok
export const inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Python.ORDER_ATOMIC];
};

// ok
export const inout_digital_write = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    code += 'pin' + dropdown_pin + '.write_digital(' + dropdown_stat + ')\n'
    return code;
};

// ok
export const inout_digital_read = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.read_digital()';
    return [code, Python.ORDER_ATOMIC];
};

//ok
export const inout_analog_write = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    //Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'pin' + dropdown_pin + '.write_analog(' + value_num + ')\n';
    return code;
};

//ok
export const inout_analog_write_set = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = 'pin' + dropdown_pin + '.set_analog_' + key + '(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};

//ok
export const inout_analog_read = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    //Python.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'pin' + dropdown_pin + '.read_analog()';
    return [code, Python.ORDER_ATOMIC];
};

//ok
export const sensor_pin_pressed = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var pin = Python.valueToCode(this, 'pin', Python.ORDER_ATOMIC);
    var code = 'pin' + pin + '.is_touched()';
    return [code, Python.ORDER_ATOMIC];
};