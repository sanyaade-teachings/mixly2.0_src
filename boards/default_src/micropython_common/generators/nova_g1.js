import Python from '../../python/python_generator';

export const get_potential_num = function () {
    Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var code = 'ext_g1.varistor()';
    return [code, Python.ORDER_ATOMIC];
};

export const nova_g1_motor = function () {
    Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var wheel = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var v = this.getFieldValue('direction');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var code = "ext_g1.motor(" + wheel + ',"' + v + '",' + speed + ")\n";
    return code;
};

export const nova_g1_usb = function () {
    Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var p = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var percent = Python.valueToCode(this, 'percent', Python.ORDER_ATOMIC);
    var code = "ext_g1.usb_pwm(" + p + ',' + percent + ")\n";
    return code;
};

export const nova_g1_spk_en = function () {
    Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var state = this.getFieldValue('state');
    var code = "ext_g1.spk_en(" + state + ")\n";
    return code;
};