import Python from '../../python/python_generator';
import { Profile } from 'mixly';

export const system_run_in_background = function() {
    var branch = Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};

export const system_reset = function() {
    return 'control.reset()\n';
}

export const system_wait = function() {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.waitMicros('  + data +  ')\n';
}

export const system_raise_event = function() {
    var source = Python.valueToCode(this, 'system_event_bus_source', Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Python.valueToCode(this, 'system_event_bus_value', Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ')\n';
}

export const system_on_event = function() {
    var source = Python.valueToCode(this, 'system_event_bus_source', Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Python.valueToCode(this, 'system_event_bus_value', Python.ORDER_ATOMIC) || Profile.default.serial;
    var branch = Python.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ')\n';
}

export const system_timestamp = function() {
    return ['control.eventTimestamp()', Python.ORDER_ATOMIC];
}

export const system_value = function() {
    return ['control.eventValue()', Python.ORDER_ATOMIC];
}

export const system_event_bus_source = function() {
    return [this.getFieldValue('key'), Python.ORDER_ATOMIC];
}

export const system_event_bus_value = function() {
    return [this.getFieldValue('key'), Python.ORDER_ATOMIC];
}

export const system_device_name = function() {
    return ['control.deviceName()', Python.ORDER_ATOMIC];
}

export const system_device_serial_number = function() {
    return ['control.deviceSerialNumber()', Python.ORDER_ATOMIC];
}

//ok
export const base_delay = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var delay_time = Python.valueToCode(this, 'DELAY_TIME', Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};

//ok
export const Panic_with_status_code = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var status_code = Python.valueToCode(this, 'STATUS_CODE', Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};

//ok
export const controls_millis = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'running_time()';
    return [code, Python.ORDER_ATOMIC];
};

//ok
export const controls_end_program = function () {
    return 'while True:\n    pass\n';
};

//ok
export const reset = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'reset()\n';
};

export const controls_uname = function () {
    Python.definitions_['import_os'] = 'import os';
    return ['os.uname()', Python.ORDER_ATOMIC];
};