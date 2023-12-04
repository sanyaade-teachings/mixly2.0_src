import Python from '../../python/python_generator';

export const serial_print = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart.write(str(" + content + "))\n";
    return code;
};

export const serial_println = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart.write(str(" + content + ")+'\\r\\n')\n";
    return code;
};

export const serial_print_hex = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '0';
    var code = "uart.write(str(hex(" + content + ")) + '\\r\\n')\n";
    return code;
};

export const serial_receive_data_event = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var char_marker = Python.valueToCode(this, 'char_marker', Python.ORDER_ATOMIC) || ';';
    var branch = Python.statementToCode(this, 'DO');

    Python.definitions_['func_serial_receive_data_event_' + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "}\n";
};

export const serial_any = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.any()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readstr = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.read()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readline = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.readline()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readstr_until = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var char_marker = this.getFieldValue('char_marker');
    var code = "serial.readUntil(" + char_marker + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_softserial = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin1 = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var dropdown_pin2 = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    var baudrate = this.getFieldValue('baudrate');
    return "uart.init(rx=" + dropdown_pin1 + ", tx=" + dropdown_pin2 + ", baudrate=" + baudrate + ")\n";
};

export const serial_begin = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var baudrate = this.getFieldValue('baudrate');
    return "uart.init(baudrate=" + baudrate + ")\n";
};


export const IO_input = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', Python.ORDER_ATOMIC];
};


export const IO_print = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
};

export const IO_print_inline = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
};