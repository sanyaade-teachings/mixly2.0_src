import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

export const spi_transfer = function () {
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    var pin = Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
};

export const serialBT_Init = function () {
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || Profile.default.serial;
    Blockly.Arduino.definitions_['include_BluetoothSerial'] = '#include "BluetoothSerial.h"';
    Blockly.Arduino.definitions_['var_declare_BluetoothSerial'] = 'BluetoothSerial SerialBT;';
    Blockly.Arduino.setups_['setup_serial_BT'] = 'SerialBT.begin(' + content + ');';
    Blockly.Arduino.setups_['setup_serial_started'] = 'Serial.println("The device started, now you can pair it with bluetooth!");';
    return '';
};

export const serialBT_available = function () {
    var code = "SerialBT.available() > 0";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

export const serialBT_read = function () {
    var code = 'SerialBT.read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

export const serialBT_write = function () {
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var code = 'SerialBT.write(' + content + ');\n';
    return code;
};