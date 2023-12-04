import Python from '../../python/python_generator';

export const serial_print = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + "))\n";
    return code;
};

export const serial_print_byte = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(" + content + ")\n";
    return code;
};

export const serial_println = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + ")+'\\r\\n')\n";
    return code;
};

export const serial_print_hex = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '0';
    var code = "uart" + dropdown_uart + ".write(str(" + dropdown_stat + "(" + content + "))+'\\r\\n')\n";
    return code;
};

export const serial_any = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".any()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readstr = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".read()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readline = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".readline()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_softserial = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode')
    var baudrate = this.getFieldValue('baudrate');
    return "uart" + dropdown_uart + "=machine.UART(" + dropdown_uart + ", " + baudrate + ")\n";
};

export const serial_softserial_new = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var rx = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var tx = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var dropdown_uart = this.getFieldValue('mode')
    var baudrate = this.getFieldValue('baudrate');
    return "uart" + dropdown_uart + "=machine.UART(" + dropdown_uart + ", tx=" + tx + ", rx=" + rx + ", baudrate=" + baudrate + ")\n";
};

export const system_input = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', Python.ORDER_ATOMIC];
};


export const system_print = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
};

export const system_print_inline = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
};

export const system_print_end = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var end = Python.valueToCode(this, 'END', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
};

export const system_print_many = function () {
    var code = new Array(this.itemCount_);
    var default_value = '0';

    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }

    var code = 'print(' + code.join(', ') + ')\n';
    return code;
};

export const serial_send_to_ai = function () {
    Python.definitions_['import_uart_com'] = 'import uart_com';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '0';
    var code = "uart_com.send(uart" + dropdown_uart + ", " + content + ", repeat=" + dropdown_stat + ")\n";
    return code;
};

export const serial_read_from_ai = function () {
    Python.definitions_['import_uart_com'] = 'import uart_com';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart_com.recv(uart" + dropdown_uart + ")";
    return [code, Python.ORDER_ATOMIC];
};