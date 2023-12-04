import Python from '../../python/python_generator';
import { Profile } from 'mixly';

export const TIM_SELET = function () {
    var code = this.getFieldValue('TIM');
    return [code, Python.ORDER_ATOMIC];
};

export const system_run_in_background = function () {
    var branch = Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};

export const system_wait = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.waitMicros(' + data + ')\n';
}

export const system_raise_event = function () {
    var source = Python.valueToCode(this, 'system_event_bus_source', Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Python.valueToCode(this, 'system_event_bus_value', Python.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.raiseEvent(' + source + ', ' + value + ')\n';
}

export const system_on_event = function () {
    var source = Python.valueToCode(this, 'system_event_bus_source', Python.ORDER_ATOMIC) || Profile.default.serial;
    var value = Python.valueToCode(this, 'system_event_bus_value', Python.ORDER_ATOMIC) || Profile.default.serial;
    var branch = Python.statementToCode(this, 'do');
    return 'control.onEvent(' + source + ', ' + value + ', () => {\n' + branch + ')\n';
}

export const system_timestamp = function () {
    return ['control.eventTimestamp()', Python.ORDER_ATOMIC];
}

export const system_value = function () {
    return ['control.eventValue()', Python.ORDER_ATOMIC];
}

export const system_event_bus_source = function () {
    return [this.getFieldValue('key'), Python.ORDER_ATOMIC];
}

export const system_event_bus_value = function () {
    return [this.getFieldValue('key'), Python.ORDER_ATOMIC];
}

export const system_device_name = function () {
    return ['control.deviceName()', Python.ORDER_ATOMIC];
}

export const system_device_serial_number = function () {
    return ['control.deviceSerialNumber()', Python.ORDER_ATOMIC];
}

//ok
export const Panic_with_status_code = function () {
    var status_code = Python.valueToCode(this, 'STATUS_CODE', Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
export const controls_millis = function () {
    Python.definitions_['import_time'] = 'import time';
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
    case "ms":
        var code = 'time.ticks_ms()';
        return [code, Python.ORDER_ATOMIC];
    case "us":
        var code = 'time.ticks_us()';
        return [code, Python.ORDER_ATOMIC];
    }
};
//ok
export const controls_end_program = function () {
    return 'while True:\n    pass\n';
};
//ok
export const reset = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    return 'reset()\n';
};

export const system_reset = function () {
    Python.definitions_['import machine'] = 'import machine';
    var code = "machine.reset()\n";
    return code;
};

export const system_gc_collect = function () {
    Python.definitions_['import gc'] = 'import gc';
    var dropdown_gc = this.getFieldValue('gc');
    var code = '' + dropdown_gc + '\n';
    return code;
};


export const controls_uname = function () {
    Python.definitions_['import_os'] = 'import os';
    return 'os.uname()';
};
export const controls_delay = function () {
    // Python.definitions_.import_time = "import time";
    Python.definitions_['import_time'] = 'import time';
    var delay_time = Python.valueToCode(this, 'DELAY_TIME', Python.ORDER_ATOMIC) || '1000'
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
    case "s":
        var code = 'time.sleep(' + delay_time + ')\n';
        return code;
    case "ms":
        var code = 'time.sleep_ms(' + delay_time + ')\n';
        return code;
    case "us":
        var code = 'time.sleep_us(' + delay_time + ')\n';
        return code;
    }
};


//-------------------------------------/
export const system_timer = function () {
    Python.definitions_['from machine import Timer'] = 'from machine import Timer';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var Timer = v % 3
    var CHANNEL = parseInt(v / 3)
    var period = Python.valueToCode(this, "period", Python.ORDER_NONE);
    var mode = this.getFieldValue('mode');
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    var code = "tim" + v + " =Timer(Timer.TIMER" + Timer + ",Timer.CHANNEL" + CHANNEL + ",mode=Timer.MODE_" + mode + ",period = " + period + ", callback = " + callback + ")\n";
    return code;
};


export const system_ticks_diff = function () {
    Python.definitions_['import_time'] = 'import time';
    var end = Python.valueToCode(this, "END", Python.ORDER_NONE) || "0";
    var start = Python.valueToCode(this, "START", Python.ORDER_NONE) || "0";
    var code = "time.ticks_diff(" + end + ", " + start + ")";
    return [code, Python.ORDER_ATOMIC];
};




export const system_timer_init = function () {
    Python.definitions_['from machine import Timer'] = 'from machine import Timer';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var Timer = v % 3
    var CHANNEL = parseInt(v / 3)
    var code = 'tim' + v + ' = Timer(Timer.TIMER' + Timer + ',Timer.CHANNEL' + CHANNEL + ', mode=Timer.MODE_PWM)\n';
    return code;
};

export const Timer_init = system_timer_init;
export const timer2 = system_timer;
export const time_ticks_diff = system_ticks_diff;
export const base_delay = controls_delay;