import { Profile } from 'mixly';
import { Arduino } from '../../arduino_common/arduino_generator';

export const spi_transfer = function () {
    Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Arduino.setups_['setup_spi'] = 'SPI.begin();';
    var pin = Arduino.valueToCode(this, 'pin', Arduino.ORDER_ATOMIC);
    var value = Arduino.valueToCode(this, 'value', Arduino.ORDER_ATOMIC);
    Arduino.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
};

export const serialBT_Init = function () {
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || Profile.default.serial;
    Arduino.definitions_['include_BluetoothSerial'] = '#include "BluetoothSerial.h"';
    Arduino.definitions_['var_declare_BluetoothSerial'] = 'BluetoothSerial SerialBT;';
    Arduino.setups_['setup_serial_BT'] = 'SerialBT.begin(' + content + ');';
    Arduino.setups_['setup_serial_started'] = 'Serial.println("The device started, now you can pair it with bluetooth!");';
    return '';
};

export const serialBT_available = function () {
    var code = "SerialBT.available() > 0";
    return [code, Arduino.ORDER_ATOMIC];
};

export const serialBT_read = function () {
    var code = 'SerialBT.read()';
    return [code, Arduino.ORDER_ATOMIC];
};

export const serialBT_write = function () {
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC) || '""';
    var code = 'SerialBT.write(' + content + ');\n';
    return code;
};