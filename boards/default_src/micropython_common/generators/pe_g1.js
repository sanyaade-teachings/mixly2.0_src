import Python from '../../python/python_generator';

export const pe_g1_use_i2c_init = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var code = v + ' = pe_g1.PE_G1(' + iv + ')\n';
    return code;
};

export const pe_g1_battery_left = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.read_bat()';
    return [code, Python.ORDER_ATOMIC];
};

export const pe_g1_dc_motor = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var wheel = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var v = this.getFieldValue('direction');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var code = s + ".motor(" + wheel + ',"' + v + '",' + speed + ")\n";
    return code;
};

export const pe_g1_dc_motor_speed = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var wheel = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var v = 'NC';
    var code = s + ".motor(" + wheel + ',"' + v + '"' + ")\n";
    return [code, Python.ORDER_ATOMIC];
};

export const pe_g1_servo_set_angle = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var code = v + '.servo180(' + dropdown_pin + ',' + num + ')\n';
    return code;
};

export const pe_g1_servo_set_speed = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var code = v + '.servo360(' + dropdown_pin + ',' + num + ')\n';
    return code;
};

export const pe_g1_servo_get_angle = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = v + '.servo180(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const pe_g1_servo_get_speed = function () {
    Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = v + '.servo360(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};
