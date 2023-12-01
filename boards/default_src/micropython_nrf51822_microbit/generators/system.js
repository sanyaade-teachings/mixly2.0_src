import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

export const system_run_in_background = function() {
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};
export const system_reset = function() {
    return 'control.reset()\n';
}

export const system_wait = function() {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.waitMicros('  + data +  ')\n';
}

export const system_raise_event = function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ')\n';
}

export const system_on_event = function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || Profile.default.serial;
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ')\n';
}

export const system_timestamp = function() {
    return ['control.eventTimestamp()', Blockly.Python.ORDER_ATOMIC];
}

export const system_value = function() {
    return ['control.eventValue()', Blockly.Python.ORDER_ATOMIC];
}

export const system_event_bus_source = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

export const system_event_bus_value = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

export const system_device_name = function() {
    return ['control.deviceName()', Blockly.Python.ORDER_ATOMIC];
}

export const system_device_serial_number = function() {
    return ['control.deviceSerialNumber()', Blockly.Python.ORDER_ATOMIC];
}

//ok
export const base_delay = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};
//ok
export const Panic_with_status_code = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var status_code = Blockly.Python.valueToCode(this, 'STATUS_CODE', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
export const controls_millis = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'running_time()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
export const controls_end_program = function () {
    return 'while True:\n    pass\n';
};
//ok
export const reset = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'reset()\n';
};
export const controls_uname = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    return ['os.uname()', Blockly.Python.ORDER_ATOMIC];
};