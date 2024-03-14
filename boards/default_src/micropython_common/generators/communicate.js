import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const communicate_i2c_onboard = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_i2c'] = 'from ' + version + ' import onboard_i2c';
    var code = 'onboard_i2c';
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_spi_onboard = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_i2c'] = 'from ' + version + ' import onboard_spi';
    var code = 'onboard_spi';
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_i2c_init = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin1 = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var dropdown_pin2 = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return "" + sub + " = machine.SoftI2C(scl = machine.Pin(" + dropdown_pin2 + "), sda = machine.Pin(" + dropdown_pin1 + "), freq = " + freq + ")\n";
};

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
    var mosi = Python.valueToCode(this, 'mosi', Python.ORDER_ATOMIC);
    var miso = Python.valueToCode(this, 'miso', Python.ORDER_ATOMIC);
    var sck = Python.valueToCode(this, 'sck', Python.ORDER_ATOMIC);
    return "" + name + " = machine.SoftSPI(baudrate=" + freq + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "))\n";
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

export const communicate_ir_recv_init = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var bit = this.getFieldValue('type');
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (sub == "" && bit == "RC5") {
        var code = "ir_rx = irremote.RC5_RX(" + pin + ")\n";
    }
    else if (sub == "") {
        var code = "ir_rx = irremote.NEC_RX(" + pin + "," + bit + ")\n";
    }
    else {
        var code = "ir_rx = irremote.NEC_RX(" + pin + "," + bit + "," + sub + ")\n";
    }
    return code;

};

export const internal_variable = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var index = this.getFieldValue('index');
    var code = "ir_rx.code[" + index + "]";
    return [code, Python.ORDER_ATOMIC];
};


export const recv_fun = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var en = this.getFieldValue('en');
    var code = "ir_rx.enable(" + en + ")\n";
    return code;
};

export const ir_whether_recv = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var code = "ir_rx.any()";
    return [code, Python.ORDER_ATOMIC];
};

export const ir_recv_timeout = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var time = Python.valueToCode(this, 'time', Python.ORDER_ATOMIC);
    var code = "ir_rx.timeout(" + time + ")\n";
    return code;
};

export const communicate_ir_send_init = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var sam = this.getFieldValue('type');
    var power = Python.valueToCode(this, 'power', Python.ORDER_ATOMIC);
    if (sam == "RC5") {
        var code = "ir_tx = irremote.RC5_TX(" + pin + "," + power + ")\n";
    }
    else {
        var code = "ir_tx = irremote.NEC_TX(" + pin + "," + sam + "," + power + ")\n";
    }
    return code;

};

export const ir_transmit_conventional_data = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var cmd = Python.valueToCode(this, 'cmd', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var toggle = Python.valueToCode(this, 'toggle', Python.ORDER_ATOMIC);
    var code = "ir_tx.transmit(" + cmd + "," + addr + "," + toggle + ")\n";
    return code;
};

export const ir_transmit_study_code = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var s_code = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = "ir_tx.transmit(pulses=" + s_code + ")\n";
    return code;
};

export const ir_transmit_busy = function () {
    Python.definitions_['import_irremote'] = 'import irremote';
    var code = "ir_tx.busy()";
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_bluetooth_central_init = function () {
    Python.definitions_['import_ble_central'] = 'import ble_central';
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + " = ble_central.BLESimpleCentral()\n";
    return code;
};

export const communicate_bluetooth_peripheral_init = function () {
    Python.definitions_['import_ble_peripheral'] = 'import ble_peripheral';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + " = ble_peripheral.BLESimplePeripheral(" + data + ")\n";
    return code;
};

export const communicate_bluetooth_scan = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + ".scan()";
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_bluetooth_connect = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = name + ".connect(" + mode + '=' + data + ")\n";
    return code;
};

export const communicate_bluetooth_disconnect = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + '.disconnect()\n';
    return code;
};

export const communicate_bluetooth_mac = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return [name + ".mac", Python.ORDER_ATOMIC];
}

export const communicate_bluetooth_is_connected = function () {
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + ".is_connected()";
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_bluetooth_send = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + ".send(" + data + ")\n";
    return code;
};

export const communicate_bluetooth_recv_only = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = v + '.recv()';
    return [code, Python.ORDER_ATOMIC];
};

export const communicate_bluetooth_recv = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var method = Python.valueToCode(this, 'METHOD', Python.ORDER_ATOMIC);
    var code = v + '.recv(' + method + ')\n';
    return code;
};

export const communicate_bluetooth_handle = function () {
    Python.definitions_['import_ble_handle'] = 'import ble_handle';
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var method = Python.valueToCode(this, 'METHOD', Python.ORDER_ATOMIC);
    var code = v + '=ble_handle.Handle()\n' + v + '.recv(' + method + ')\n';
    return code;
};

//espnow
export const communicate_espnow_init = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var varName = Python.valueToCode(this, 'CHNL', Python.ORDER_ATOMIC);
    var code = "" + name + "=radio.ESPNow(channel=" + varName + ")\n";
    return code;
};

export const communicate_espnow_init_new = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var varName = Python.valueToCode(this, 'CHNL', Python.ORDER_ATOMIC);
    var varName2 = Python.valueToCode(this, 'DB', Python.ORDER_ATOMIC);
    var code = "" + name + "=radio.ESPNow(channel=" + varName + ',txpower=' + varName2 + ")\n";
    return code;
};

export const network_espnow_mac = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return [name + ".mac", Python.ORDER_ATOMIC];
}

export const network_espnow_info = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return [name + ".info()", Python.ORDER_ATOMIC];
}

export const network_espnow_recv = function () {
    Python.definitions_['import_radio'] = "import radio";
    var mode = this.getFieldValue('mode');
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + ".recv()" + mode;
    return [code, Python.ORDER_ATOMIC];
}

export const network_espnow_send = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var mac = Python.valueToCode(this, 'mac', Python.ORDER_ATOMIC);
    var content = Python.valueToCode(this, 'content', Python.ORDER_ATOMIC);
    var code = name + ".send(" + mac + "," + content + ")\n";
    return code;
}

export const network_espnow_recv_handle = function () {
    Python.definitions_['import_radio'] = "import radio";
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var method = Python.valueToCode(this, 'METHOD', Python.ORDER_ATOMIC);
    var code = name + ".recv_cb(" + method + ")\n";
    return code;
};

//radio
export const espnow_radio_channel = function () {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var varName = Python.valueToCode(this, 'CHNL', Python.ORDER_ATOMIC);
    var code = "ESPNow_radio.set_channel(" + varName + ")\n";
    return code;
};

export const espnow_radio_channel_new = function () {
    Python.definitions_['import_radio'] = "import radio";
    var varName2 = Python.valueToCode(this, 'DB', Python.ORDER_ATOMIC);
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1,txpower=" + varName2 + ")";
    var varName = Python.valueToCode(this, 'CHNL', Python.ORDER_ATOMIC);
    var code = "ESPNow_radio.set_channel(" + varName + ")\n";
    return code;
};

export const espnow_radio_on_off = function () {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var op = this.getFieldValue('on_off');
    var code = "ESPNow_radio.active(" + op + ")\n";
    return code;
};

export const espnow_radio_send = function () {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var varName = Python.valueToCode(this, 'send', Python.ORDER_ATOMIC);
    var code = 'ESPNow_radio.send("ffffffffffff",' + varName + ")\n";
    return code;
};

export const espnow_radio_rec = function () {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var code = "ESPNow_radio.recv()";
    return [code, Python.ORDER_ATOMIC];
}

export const espnow_radio_recv_msg = function () {
    var code = "ESPNow_radio_msg";
    return [code, Python.ORDER_ATOMIC];
}

export const espnow_radio_recv = function (block) {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['import_ubinascii'] = 'import ubinascii';
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var doCode = Python.statementToCode(block, 'DO') || Python.PASS;
    Python.definitions_['def_ESPNow_radio_recv'] = 'def ESPNow_radio_recv(mac,ESPNow_radio_msg):\n' + doCode;
    Python.definitions_['def_ESPNow_radio_recv_all'] = '_radio_msg_list = []\n' + 'def ESPNow_radio_recv_callback(mac,ESPNow_radio_msg):\n' + '    global _radio_msg_list\n' + '    try: ESPNow_radio_recv(mac,ESPNow_radio_msg)\n' + '    except: pass\n' + '    if str(ESPNow_radio_msg) in _radio_msg_list:\n' + "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(ESPNow_radio_msg)) + '()')\n";
    Python.definitions_['ESPNow_radio_recv_callback'] = "ESPNow_radio.recv_cb(ESPNow_radio_recv_callback)\n";

    return '';
}

var writeUTF = function (str, isGetBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back;
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    }
    return [byteSize >> 8, byteSize & 0xff].concat(back);
}

var toUTF8Hex = function (str) {
    var charBuf = writeUTF(str, true);
    var re = '';
    for (var i = 0; i < charBuf.length; i++) {
        var x = (charBuf[i] & 0xFF).toString(16);
        if (x.length === 1) {
            x = '0' + x;
        }
        re += x;
    }
    return re;
}

export const espnow_radio_recv_certain_msg = function (block) {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['import_ubinascii'] = 'import ubinascii';
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    var doCode = Python.statementToCode(block, 'DO') || Python.PASS;
    Python.definitions_['def_ESPNow_radio_recv_all'] = '_radio_msg_list = []\n' + 'def ESPNow_radio_recv_callback(mac,ESPNow_radio_msg):\n' + '    global _radio_msg_list\n' + '    try: ESPNow_radio_recv(mac,ESPNow_radio_msg)\n' + '    except: pass\n' + '    if str(ESPNow_radio_msg) in _radio_msg_list:\n' + "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(ESPNow_radio_msg)) + '()')\n";
    Python.definitions_['ESPNow_radio_recv_callback'] = "ESPNow_radio.recv_cb(ESPNow_radio_recv_callback)\n";
    var message = block.getFieldValue('msg');
    var message_utf8 = toUTF8Hex(message);
    Python.definitions_['def_radio_recv_' + message_utf8] =
        '_radio_msg_list.append(\'' + message + '\')\n' +
        'def radio_recv_' + message_utf8 + '():\n' + doCode;
    return '';
}

export const espnow_radio_recv_new = function (block) {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    Python.definitions_['ESPNow_radio_handlelist'] = "handle_list=[]";
    var doCode = Python.statementToCode(block, 'DO') || Python.PASS;
    Python.definitions_['def_ESPNow_radio_recv'] = 'def ESPNow_radio_recv(mac,ESPNow_radio_msg):\n' + doCode;
    Python.definitions_['ESPNow_radio_handlelist_append'] = 'if not ESPNow_radio_recv in handle_list:\n    handle_list.append(ESPNow_radio_recv)';
    Python.definitions_['ESPNow_radio_recv_callback'] = "ESPNow_radio.recv_cb(handle_list)\n";

    return '';
}

export const espnow_radio_recv_certain_msg_new = function (block) {
    Python.definitions_['import_radio'] = "import radio";
    Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=1)";
    Python.definitions_['ESPNow_radio_handlelist'] = "handle_list=[]";
    var doCode = Python.statementToCode(block, 'DO') || Python.PASS;
    var message = block.getFieldValue('msg');
    Python.definitions_['def_ESPNow_radio_recv__' + message] = 'def ESPNow_radio_recv__' + message + '(mac,ESPNow_radio_msg):\n' + doCode;
    Python.definitions_['ESPNow_radio_handlelist_append__' + message] = 'if not ESPNow_radio_recv__' + message + ' in handle_list:\n    handle_list.append(ESPNow_radio_recv__' + message + ')';
    Python.definitions_['ESPNow_radio_recv_callback__' + message] = "ESPNow_radio.recv_cb(handle_list)\n";

    return '';
}

export const lora_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sv = Python.valueToCode(this, 'SPISUB', Python.ORDER_ATOMIC);
    var pv = Python.valueToCode(this, 'PINSUB', Python.ORDER_ATOMIC);
    var fr = Python.valueToCode(this, 'frequency', Python.ORDER_ATOMIC);
    var r = Python.valueToCode(this, 'rate', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'factor', Python.ORDER_ATOMIC);
    var p = Python.valueToCode(this, 'power', Python.ORDER_ATOMIC);
    var bandwidth = this.getFieldValue('bandwidth');
    var code;
    Python.definitions_['import_rfm98'] = 'import rfm98';
    var code = v + ' = rfm98.RFM98(' + sv + ',cs_pin=' + pv + ',frequency_mhz=' + fr + ',signal_bandwidth=' + bandwidth + ',coding_rate=' + r + ',spreading_factor=' + f + ',tx_power=' + p + ')\n';
    return code;
};

export const lora_packet = function () {
    Python.definitions_['import_rfm98'] = 'import rfm98';
    var key = this.getFieldValue('key');
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return [name + "." + key + '()', Python.ORDER_ATOMIC];
}

export const lora_send = function () {
    Python.definitions_['import_rfm98'] = 'import rfm98';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = name + ".send(" + data + ")\n";
    return code;
};

export const lora_recv = function () {
    Python.definitions_['import_rfm98'] = 'import rfm98';
    var name = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return [name + '.recv()', Python.ORDER_ATOMIC];
}

export const urequests_get = function () {
    Python.definitions_.import_requests = "import urequests";
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var str = Python.valueToCode(this, 'DOMAIN', Python.ORDER_ATOMIC);
    var code = varName + '= ' + 'urequests.get(' + str + ')\n';
    return code;
};

export const urequests_attribute = function () {
    Python.definitions_.import_requests = "import urequests";
    var varName = Python.valueToCode(this, 'VAL', Python.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, Python.ORDER_ATOMIC];
};

export const urequests_method = function () {
    Python.definitions_.import_requests = "import urequests";
    var method = this.getFieldValue('DIR');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "urequests." + method + "(" + str + ')';
    return [code, Python.ORDER_ATOMIC];
};

Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
export const i2c_master_reader2= communicate_i2c_master_read;
export const i2c_available= communicate_i2c_available;