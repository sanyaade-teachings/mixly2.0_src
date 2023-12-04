import Python from '../../python/python_generator';

export const radio_ons = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = 'radio.' + type + '()\n';
    return code;
};

export const microbit_radio_on = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var code = 'radio.on()\n';
    return code;
};

export const microbit_radio_off = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var code = 'radio.off()\n';
    return code;
};

export const microbit_radio_config = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    //var number_length = block.getFieldValue('length');
    var number_length = Python.valueToCode(this, "length", Python.ORDER_ATOMIC);
    var number_queue = Python.valueToCode(this, "queue", Python.ORDER_ATOMIC);
    var number_channel = Python.valueToCode(this, "channel", Python.ORDER_ATOMIC);
    var number_power = Python.valueToCode(this, "power", Python.ORDER_ATOMIC);
    var number_address = Python.valueToCode(this, "address", Python.ORDER_ATOMIC);
    var number_group = Python.valueToCode(this, "group", Python.ORDER_ATOMIC);
    var dropdown_data_rate = Python.valueToCode(this, "data_rate", Python.ORDER_ATOMIC);
    var code = 'radio.config(length=' + number_length + ', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', address=' + number_address + ', group=' + number_group + ', data_rate=radio.' + dropdown_data_rate + ')\n';
    return code;
};

export const microbit_radio_reset = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var code = 'radio.reset()\n';
    return code;
};

export const radio_send_string = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var number = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return "radio." + type + "(" + number + ")\n";
}

export const radio_receive_string = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = "radio." + type + "()";
    return [code, Python.ORDER_ATOMIC];
}

export const microbit_radio_receive = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_radio'] = 'import radio';
    var code = 'radio.receive()';
    return [code, Python.ORDER_ATOMIC];
};

export const i2c_init = function () {
    var dropdown_pin1 = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var dropdown_pin2 = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    return "i2c.init(sda=" + dropdown_pin1 + ", scl=" + dropdown_pin2 + ", freq=" + freq + ")\n";
};

export const i2c_read = function () {
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0, 1).toUpperCase() + is_repeated.substring(1).toLowerCase();
    return ["i2c.read(" + address + ", " + data + ", " + is_repeated + ")", Python.ORDER_ATOMIC];
};
export const i2c_write = function () {
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0, 1).toUpperCase() + is_repeated.substring(1).toLowerCase();
    return "i2c.write(" + address + ", " + data + ", " + is_repeated + ")\n";
};

export const spi_init = function (block) {
    var freq = block.getFieldValue('freq');
    var bits = block.getFieldValue('bits');
    var mode = block.getFieldValue('mode');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');
    var sck = block.getFieldValue('sck');
    return "spi.init(baudrate=" + freq + ", bits=" + bits + ", mode=" + mode + ", mosi=" + mosi + ", miso= " + miso + ", sclk=" + sck + ");\n";
}

export const spi_write = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return ["spi.write(" + data + ")", Python.ORDER_ATOMIC];
}
