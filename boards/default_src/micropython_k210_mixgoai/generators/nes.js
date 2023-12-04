import Python from '../../python/python_generator';

export const nes_joystick_init = function () {
    Python.definitions_['import nes_no'] = 'import nes_no';
    var cs_pin = Python.valueToCode(this, 'cs_pin', Python.ORDER_ATOMIC);
    var clk_pin = Python.valueToCode(this, 'clk_pin', Python.ORDER_ATOMIC);
    var mosi_pin = Python.valueToCode(this, 'mosi_pin', Python.ORDER_ATOMIC);
    var miso_pin = Python.valueToCode(this, 'miso_pin', Python.ORDER_ATOMIC);
    var vol = Python.valueToCode(this, 'vol', Python.ORDER_ATOMIC);
    var code = "nes_no.joystick_init(" + cs_pin + "," + clk_pin + "," + mosi_pin + "," + miso_pin + "," + vol + ")\n";
    return code;
};

export const nes_keyboard_init = function () {
    Python.definitions_['import nes_no'] = 'import nes_no';
    var vol = Python.valueToCode(this, 'vol', Python.ORDER_ATOMIC);
    var code = "nes_no.keyboard_init(" + vol + ")\n";
    return code;
};

export const nes_run = function () {
    Python.definitions_['import nes_no'] = 'import nes_no';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = "nes_no.run(" + path + ")\n";
    return code;
};

