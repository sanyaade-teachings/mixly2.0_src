import Python from '../../python/python_generator';

export const communicate_ir_recv = function () {
    Python.definitions_['import irremote'] = 'import irremote';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    return ["irremote.read_id(" + pin + ")", Python.ORDER_ATOMIC];
};


export const communicate_i2c_init = function () {
    Python.definitions_['from machine import I2C'] = 'from machine import I2C';
    var mode = this.getFieldValue('mode');
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sda = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var scl = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    return "" + sub + " = I2C(I2C." + mode + ", freq=" + freq + ", scl=" + scl + ", sda=" + sda + ")\n";
};

export const communicate_i2s_init = function () {
    Python.definitions_['import player'] = 'import player';
    var mode = this.getFieldValue('mode');
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var BCK = Python.valueToCode(this, 'BCK', Python.ORDER_ATOMIC);
    var WS = Python.valueToCode(this, 'WS', Python.ORDER_ATOMIC);
    var DAT = Python.valueToCode(this, 'DAT', Python.ORDER_ATOMIC);
    var sample = Python.valueToCode(this, 'sample', Python.ORDER_ATOMIC);
    var code = "" + sub + "=player." + mode + "_init(" + BCK + "," + WS + "," + DAT + "," + sample + ")\n";
    return code;
};
//--------新增-------------------------------------------------------



export const communicate_i2c_read = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return ["" + name + ".readfrom(" + address + ", " + data + ")", Python.ORDER_ATOMIC];
};

export const communicate_i2c_write = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return "" + name + ".writeto(" + address + ", " + data + ")\n";
};

export const communicate_i2c_scan = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return ["" + name + ".scan()", Python.ORDER_ATOMIC];
};
export const communicate_i2c_master_read = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".read()";
    return [code, Python.ORDER_ATOMIC];
};
export const communicate_i2c_available = function () {

    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".available()";
    return [code, Python.ORDER_ATOMIC];
};


export const i2c_slave_onreceive = function () {
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    Python.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Python.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Python.definitions_[funcName] = code2;
    return '';
}
export const communicate_spi_init = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    var polarity = Python.valueToCode(this, 'polarity', Python.ORDER_ATOMIC);
    var phase = Python.valueToCode(this, 'phase', Python.ORDER_ATOMIC);
    var mosi = Python.valueToCode(this, 'mosi', Python.ORDER_ATOMIC);
    var miso = Python.valueToCode(this, 'miso', Python.ORDER_ATOMIC);
    var sck = Python.valueToCode(this, 'sck', Python.ORDER_ATOMIC);
    return "" + name + " = machine.SPI(baudrate=" + freq + ", polarity=" + polarity + ", phase=" + phase + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "));\n";
}

export const communicate_spi_set = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return "spi.init(baudrate=" + data + ")\n";
}

export const communicate_spi_buffer = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return "" + varname + "=bytearray(" + data + ")\n";
}

export const communicate_spi_read = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + ")", Python.ORDER_ATOMIC];
}

export const communicate_spi_read_output = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var val = Python.valueToCode(this, 'val', Python.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + "," + val + ")", Python.ORDER_ATOMIC];
}

export const communicate_spi_readinto = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + ")", Python.ORDER_ATOMIC];
}

export const communicate_spi_readinto_output = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var val = Python.valueToCode(this, 'val', Python.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + "," + val + ")", Python.ORDER_ATOMIC];
}

export const communicate_spi_write = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    return ["" + varname + ".write(" + data + ".encode('utf-8'))", Python.ORDER_ATOMIC];
}

export const communicate_spi_write_readinto = function () {
    var varname = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var val = Python.valueToCode(this, 'val', Python.ORDER_ATOMIC);
    // var op=this.getFieldValue('op');
    // if(op=="byte"){
    return ["" + varname + ".write_readinto(" + data + ".encode('utf-8')," + val + ")", Python.ORDER_ATOMIC];
    // }else{
    //   return [""+varname+".write_readinto(" + data + ","+val+")", Python.ORDER_ATOMIC];
    // }
}

export const communicate_ow_init = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_onewire'] = "import onewire";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var varName = Python.valueToCode(this, 'BUS', Python.ORDER_ATOMIC);
    var code = "" + name + "=onewire.OneWire(machine.Pin(" + varName + "))\n";
    return code;
};

export const communicate_ow_scan = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".scan()";
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_ow_reset = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".reset()\n";
    return code;
};

export const communicate_ow_read = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".readbyte()";
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_ow_write = function () {
    var varName = Python.valueToCode(this, 'byte', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + name + "." + op + "(" + varName + ")\n";
    return code;
};

export const communicate_ow_select = function () {
    var varName = Python.valueToCode(this, 'byte', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + name + ".select_rom(" + varName + ".encode('utf-8'))\n";
    return code;
};

// Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
// Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
// Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
// Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
// Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
// Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
// Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
// Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
// Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
// Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
// Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
// Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
// Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
// export const i2c_master_reader2= communicate_i2c_master_read;
// export const i2c_available= communicate_i2c_available;