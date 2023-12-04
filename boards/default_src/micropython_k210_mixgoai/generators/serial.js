import Python from '../../python/python_generator';

export const UART_SELET = function () {
    var code = this.getFieldValue('UART');
    return [code, Python.ORDER_ATOMIC];
};

export const serial_print = function () {
    Python.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + "))\n";
    return code;
};

export const serial_println = function () {
    Python.definitions_['from machine import UART'] = 'from machine import UART';
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
    Python.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".any()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readstr = function () {
    Python.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".read()";
    return [code, Python.ORDER_ATOMIC];
};

export const serial_readline = function () {
    Python.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".readline()";
    return [code, Python.ORDER_ATOMIC];
};


export const serial_softserial1 = function () {
    Python.definitions_['from machine import UART'] = 'from machine import UART';
    Python.definitions_['import board'] = 'import board';
    var dropdown_uart = this.getFieldValue('mode');
    var baudrate = this.getFieldValue('baudrate');
    var TX = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var RX = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var code1 = "board.register(" + TX + ",board.FPIOA.UART" + dropdown_uart + "_TX)\n";
    var code2 = "board.register(" + RX + ",board.FPIOA.UART" + dropdown_uart + "_RX)\n";
    var code3 = "uart" + dropdown_uart + "=UART(UART.UART" + dropdown_uart + ", " + baudrate + ", timeout=1000, read_buf_len=4096)\n";
    var code = code1 + code2 + code3;
    return code;
};


export const system_input = function () {
    // Python.definitions_['import machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', Python.ORDER_ATOMIC];
};


export const system_print = function () {
    // Python.definitions_['import machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
};

export const system_print_inline = function () {
    // Python.definitions_['import machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
};

export const system_print_end = function () {
    // Python.definitions_['import machine'] = 'import machine';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var end = Python.valueToCode(this, 'END', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
};

export const system_print_many = function () {
    // Python.definitions_['import machine'] = 'import machine';
    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }

    var code = 'print(' + code.join(', ') + ')\n';
    return code;
};

export const serial_send_to_mixgoce = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ce_com'] = 'import ce_com';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC) || '0';
    var code = "ce_com.uart_tx(uart" + dropdown_uart + ", " + content + ", repeat=" + dropdown_stat + ")\n";
    return code;
};

export const serial_read_from_mixgoce = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ce_com'] = 'import ce_com';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "ce_com.uart_rx(uart" + dropdown_uart + ")";
    return [code, Python.ORDER_ATOMIC];
};