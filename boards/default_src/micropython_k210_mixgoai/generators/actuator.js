import Python from '../../python/python_generator';

export const actuator_Servo_init = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['from machine import PWM'] = 'from machine import PWM';
    Python.definitions_['from machine import Timer'] = 'from machine import Timer';
    var key = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ATOMIC);
    var Timer = time % 3
    var CHANNEL = parseInt(time / 3)
    var code1 = 'tim' + time + ' = Timer(Timer.TIMER' + Timer + ',Timer.CHANNEL' + CHANNEL + ', mode=Timer.MODE_PWM)\n';
    var code2 = 'pse' + key + '=PWM(tim' + time + ', freq=50, duty=2.5, pin=' + key + ')\n';
    return code1 + code2;
};


export const actuator_Servo = function () {
    Python.definitions_['from machine import PWM'] = 'from machine import PWM';
    var key = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var range = Python.valueToCode(this, 'range', Python.ORDER_ATOMIC);
    var code = "pse" + key + ".duty(" + range + "/18.0+2.5)\n";
    return code;
};


export const actuator_PAC9685_init = function () {
    Python.definitions_['from servo import Servos'] = 'from servo import Servos';
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = 'servos=Servos(' + sub + ',address=' + address + ')\n';
    return code;
};

export const actuator_PAC9685_Servo = function () {
    Python.definitions_['from servo import Servos'] = 'from servo import Servos';
    var index = Python.valueToCode(this, 'index', Python.ORDER_ATOMIC);
    var range = Python.valueToCode(this, 'range', Python.ORDER_ATOMIC);
    // var index=index-1;
    var code = "servos.position((" + index + "-1)," + range + ")\n";
    return code;
};


export const actuator_rgb_init = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['from modules import ws2812'] = 'from modules import ws2812';
    var SUB = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'num', Python.ORDER_ATOMIC);
    var code = '' + SUB + '=ws2812(' + key + ',' + num + ')\n';
    return code;
};


export const actuator_rgb_set = function () {
    var SUB = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var R = Python.valueToCode(this, 'R', Python.ORDER_ATOMIC);
    var G = Python.valueToCode(this, 'G', Python.ORDER_ATOMIC);
    var B = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'num', Python.ORDER_ATOMIC);
    var code = '' + SUB + '.set_led(' + num + ',(' + G + ',' + R + ',' + B + '))\n';
    return code;
};

export const actuator_rgb_display = function () {
    var SUB = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = '' + SUB + '.display()\n';
    return code;
};


export const actuator_ms32006_init = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var address = this.getFieldValue('mode')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sub1 = Python.valueToCode(this, 'SUB1', Python.ORDER_ATOMIC);
    var code = '' + sub + '=ms32006.MS32006(' + sub1 + ',addr=' + address + ')\n';
    return code;
};

export const actuator_ms32006_dcmotor = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var direction = this.getFieldValue('direction')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var code = '' + sub + '.dc_motor(' + direction + ',' + speed + ')\n';
    return code;
};

export const actuator_ms32006_stepper = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var mode = this.getFieldValue('mode')
    var direction = this.getFieldValue('direction')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var steps = Python.valueToCode(this, 'steps', Python.ORDER_ATOMIC);
    var code = '' + sub + '.move(' + mode + ',' + direction + ',' + speed + ',' + steps + ')\n';
    return code;
};

//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_init = function () {
    Python.definitions_['import pid'] = 'import pid';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var P = Python.valueToCode(this, 'P', Python.ORDER_ATOMIC);
    var I = Python.valueToCode(this, 'I', Python.ORDER_ATOMIC);
    var D = Python.valueToCode(this, 'D', Python.ORDER_ATOMIC);
    var code = "" + sub + "=pid.PID(" + P + "," + I + "," + D + ")\n";
    return code;
};
//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_get_pid = function () {
    Python.definitions_['import pid'] = 'import pid';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var error = Python.valueToCode(this, 'error', Python.ORDER_ATOMIC);
    var scaler = Python.valueToCode(this, 'scaler', Python.ORDER_ATOMIC);
    var code = "" + sub + ".get_pid(" + error + "," + scaler + ")";
    return [code, Python.ORDER_ATOMIC];
}