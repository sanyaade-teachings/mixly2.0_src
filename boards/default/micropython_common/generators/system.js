'use strict';

goog.provide('Blockly.Python.system');

goog.require('Blockly.Python');

Blockly.Python.forBlock['system_run_in_background'] = function() {
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};
Blockly.Python.forBlock['system_reset'] = function() {
    return 'control.reset()\n';
}

Blockly.Python.forBlock['system_wait'] = function() {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    return 'control.waitMicros('  + data +  ')\n';
}

Blockly.Python.forBlock['system_raise_event'] = function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ')\n';
}

Blockly.Python.forBlock['system_on_event'] = function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ')\n';
}

Blockly.Python.forBlock['system_timestamp'] = function() {
    return ['control.eventTimestamp()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['system_value'] = function() {
    return ['control.eventValue()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['system_event_bus_source'] = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['system_event_bus_value'] = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['system_device_name'] = function() {
    return ['control.deviceName()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['system_device_serial_number'] = function() {
    return ['control.deviceSerialNumber()', Blockly.Python.ORDER_ATOMIC];
}

//ok
Blockly.Python.forBlock['Panic_with_status_code'] = function () {
    var status_code = Blockly.Python.valueToCode(this, 'STATUS_CODE', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
Blockly.Python.forBlock['controls_millis'] = function () {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
    case "ms":
       var code ='time.ticks_ms()';
       return [code, Blockly.Python.ORDER_ATOMIC];
       break;
    case "us":
       var code ='time.ticks_us()';
       return [code, Blockly.Python.ORDER_ATOMIC];
       break;
  }
};
//ok
Blockly.Python.forBlock['controls_end_program'] = function () {
    return 'while True:\n    pass\n';
};
//ok
Blockly.Python.forBlock['reset'] = function () {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return 'reset()\n';
};
Blockly.Python.forBlock['controls_uname'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    return 'os.uname()';
};
Blockly.Python.forBlock['controls_delay'] = function () {
    // Blockly.Python.definitions_.import_time = "import time";
    Blockly.Python.definitions_['import_time'] = 'import time';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
    case "s":
       var code = 'time.sleep(' + delay_time + ')\n';
       return code;
       break;
    case "ms":
       var code ='time.sleep_ms(' + delay_time + ')\n';
       return code;
       break;
    case "us":
       var code ='time.sleep_us(' + delay_time + ')\n';
       return code;
       break;
  }
};

Blockly.Python.forBlock['controls_delay_new'] = function () {
    // Blockly.Python.definitions_.import_time = "import time";
    Blockly.Python.definitions_['import_time'] = 'import time';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
    case "s":
       var code = 'time.sleep(' + delay_time + ')\n';
       return code;
       break;
    case "ms":
       var code ='time.sleep_ms(' + delay_time + ')\n';
       return code;
       break;
    case "us":
       var code ='time.sleep_us(' + delay_time + ')\n';
       return code;
       break;
  }
};

Blockly.Python.forBlock['timer'] = function () {
   Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var v = Blockly.Python.valueToCode(this, "VAR", Blockly.Python.ORDER_NONE) || "None";
    var period = Blockly.Python.valueToCode(this, "period", Blockly.Python.ORDER_NONE) || "0";
    var mode = Blockly.Python.valueToCode(this, "mode", Blockly.Python.ORDER_NONE) || "None";
    var callback=Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    // var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    var code = v + ".init(period = " + period + ", mode = Timer." + mode + ", callback = " + callback + ")\n";
    return code;
};

Blockly.Python.forBlock['system_timer'] = function () {
   Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, "VAR", Blockly.Python.ORDER_NONE) || "None";
    var period = Blockly.Python.valueToCode(this, "period", Blockly.Python.ORDER_NONE) || "0";
    var mode = this.getFieldValue('mode');
    //var branch = Blockly.Python.statementToCode(this, 'callback') || Blockly.Python.PASS;
    var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    //var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + v + "_callback_func)\n";
    //Blockly.Python.setups_['timer_callback_func'] = 'def ' + v + '_callback_func(t):\n' + branch + '\n';
    var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + callback +")\n";
    return code;
};


Blockly.Python.forBlock['system_ticks_diff'] = function () {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var end = Blockly.Python.valueToCode(this, "END", Blockly.Python.ORDER_NONE) || "0";
    var start = Blockly.Python.valueToCode(this, "START", Blockly.Python.ORDER_NONE) || "0";
    var code = "time.ticks_diff(" + end + ", " + start + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['system_timer_init']=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    if(version=='mixgo_feiyi'){
      var code = v + ' = machine.Timer(0)\n';
    }
    else{
    var code = v + ' = machine.Timer(-1)\n';
  }
    return code;
};

Blockly.Python.forBlock['c3_system_timer_init']=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.Timer(0)\n';
    return code;
};

Blockly.Python.forBlock['system_wdt_init']=function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var period = Blockly.Python.valueToCode(this, "period", Blockly.Python.ORDER_NONE) || "0";
    var code ='wdt = machine.WDT(timeout= '+ period +')\n';
    return code;
};

Blockly.Python.forBlock['system_wdt_feed']=function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code ='wdt.feed()\n';
    return code;
};

Blockly.Python.forBlock['system_machine_reset']=function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code ='machine.reset()\n';
    return code;
};

Blockly.Python.forBlock['system_bitbot_shutdown']=function(){
    Blockly.Python.definitions_['import_bitbot_onboard_bot51'] = 'from bitbot import onboard_bot51';
    var code ='onboard_bot51.shutdown()\n';
    return code;
};

Blockly.Python.forBlock['Timer_init']=Blockly.Python.forBlock['system_timer_init'];
Blockly.Python.forBlock['timer2']=Blockly.Python.forBlock['system_timer'];
Blockly.Python.forBlock['time_ticks_diff']=Blockly.Python.forBlock['system_ticks_diff'];
Blockly.Python.forBlock['base_delay']=Blockly.Python.forBlock['controls_delay'];