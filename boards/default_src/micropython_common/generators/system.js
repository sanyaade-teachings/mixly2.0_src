import Python from '../../python/python_generator';
import * as Mixly from 'mixly';
import { Profile } from 'mixly';

export const system_run_in_background = function () {
    var branch = Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};
export const system_reset = function () {
    return 'control.reset()\n';
}

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

export const controls_delay_new = function () {
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

export const timer = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var v = Python.valueToCode(this, "VAR", Python.ORDER_NONE) || "None";
    var period = Python.valueToCode(this, "period", Python.ORDER_NONE) || "0";
    var mode = Python.valueToCode(this, "mode", Python.ORDER_NONE) || "None";
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    // var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    var code = v + ".init(period = " + period + ", mode = Timer." + mode + ", callback = " + callback + ")\n";
    return code;
};

export const system_timer = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var v = Python.valueToCode(this, "VAR", Python.ORDER_NONE) || "None";
    var period = Python.valueToCode(this, "period", Python.ORDER_NONE) || "0";
    var mode = this.getFieldValue('mode');
    //var branch = Python.statementToCode(this, 'callback') || Python.PASS;
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    //var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + v + "_callback_func)\n";
    //Python.setups_['timer_callback_func'] = 'def ' + v + '_callback_func(t):\n' + branch + '\n';
    var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + callback + ")\n";
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
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2];
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    var code = '';
    if(version === 'feiyi') {
        code = v + ' = machine.Timer(0)\n';
    } else{
        code = v + ' = machine.Timer(-1)\n';
    }
    return code;
};

export const c3_system_timer_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.Timer(0)\n';
    return code;
};

export const system_wdt_init = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var period = Python.valueToCode(this, "period", Python.ORDER_NONE) || "0";
    var code = 'wdt = machine.WDT(timeout= ' + period + ')\n';
    return code;
};

export const system_wdt_feed = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var code = 'wdt.feed()\n';
    return code;
};

export const system_machine_reset = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var code = 'machine.reset()\n';
    return code;
};

export const system_bitbot_shutdown = function () {
    Python.definitions_['import_bitbot_onboard_bot51'] = 'from bitbot import onboard_bot51';
    var code = 'onboard_bot51.shutdown()\n';
    return code;
};

export const Timer_init = system_timer_init;
export const timer2 = system_timer;
export const time_ticks_diff = system_ticks_diff;
export const base_delay = controls_delay;