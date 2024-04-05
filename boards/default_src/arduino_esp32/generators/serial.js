import { Arduino } from '../../arduino_common/arduino_generator';

export const serial_HardwareSerial = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Arduino.valueToCode(this, 'CONTENT', Arduino.ORDER_ATOMIC);
    //var serial_no=serial_select.charAt(serial_select.length – 1);
    Arduino.definitions_['include_HardwareSerial'] = '#include <HardwareSerial.h>';
    var RX = Arduino.valueToCode(this, 'RX', Arduino.ORDER_ATOMIC);
    var TX = Arduino.valueToCode(this, 'TX', Arduino.ORDER_ATOMIC);
    Arduino.setups_['setup_serial_' + serial_select] = '' + serial_select + '.begin(' + content + ',SERIAL_8N1,' + RX + ',' + TX + ');';
    return '';
};
