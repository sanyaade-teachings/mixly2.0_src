import Python from '../../python/python_generator';

export const sensor_button_is_pressed = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var code = btn + '.is_pressed()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_button_was_pressed = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var code = btn + '.was_pressed()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_button_get_presses = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var code = btn + '.get_presses()';
    return [code, Python.ORDER_ATOMIC];
};

export const controls_GestureLists = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    // Python.definitions_['func_gesture' + gesture] = code;
    return ['"' + gesture + '"', Python.ORDER_ATOMIC];
}

export const controls_attachGestureInterrupt = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Python.statementToCode(this, 'DO');
    var d = branch || Python.PASS;
    var code = 'if accelerometer.is_gesture("' + gesture + '"):\n' + d;
    // Python.definitions_['func_gesture' + gesture] = code;
    return code;
}

export const sensor_current_gesture1 = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var code = 'accelerometer.is_gesture("' + gesture + '")';
    return [code, Python.ORDER_ATOMIC];
}

export const sensor_current_gesture2 = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var code = 'accelerometer.was_gesture("' + gesture + '")';
    return [code, Python.ORDER_ATOMIC];
}

export const controls_attachGestureInterrupt2 = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Python.statementToCode(this, 'DO');
    var d = branch || Python.PASS;
    var code = 'if accelerometer.was_gesture("' + gesture + '"):\n' + d;
    // Python.definitions_['func_gesture' + gesture] = code;
    return code;
}

export const sensor_get_gestures = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('GES');
    var a;
    if (gesture == 'all') {
        a = 'accelerometer.get_gestures()';
    }
    else if (gesture == 'current') {
        a = 'accelerometer.current_gesture()';
    }
    return [a, Python.ORDER_ATOMIC];
};

export const sensor_current_gesture = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['accelerometer.current_gesture()', Python.ORDER_ATOMIC];
};

export const sensor_get_acceleration = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var key = this.getFieldValue('key')
    var code = 'accelerometer.get_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_set_acceleration = function () {
    var key = this.getFieldValue('key')
    var code = 'input.setAccelerometerRange(' + key + ')\n';
    return code;
};
//undefined?!?!?!?!
export const sensor_light_level = function () {
    return ['input.lightLevel()', Python.ORDER_ATOMIC];
};

export const sensor_calibrate_compass = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'compass.calibrate()\n';
};

export const sensor_is_compass_calibrated = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.is_calibrated()', Python.ORDER_ATOMIC];
};

export const sensor_compass_heading = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.heading()', Python.ORDER_ATOMIC];
};

export const sensor_temperature = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['temperature()', Python.ORDER_ATOMIC];
};
export const sensor_field_strength = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var compass = this.getFieldValue('compass');
    var code = 'compass.' + compass + '()'
    return [code, Python.ORDER_ATOMIC];
};
export const sensor_rotation = function () {
    var key = this.getFieldValue('key')
    var code = 'input.rotation(' + key + ')';
    return [code, Python.ORDER_ATOMIC];
};
export const sensor_magnetic = function () {
    var key = this.getFieldValue('key')
    var code = 'input.magneticForce(' + key + ')';
    return [code, Python.ORDER_ATOMIC];
};
export const sensor_distance_hrsc04 = function () {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_ultrasonic'] = 'import ultrasonic';
    return ['ultrasonic.distance_cm(t_pin=pin' + Trig + ', e_pin=pin' + Echo + ')', Python.ORDER_ATOMIC];
};

export const sensor_distance_hrsc04_ = function () {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.setups_['class_hrsc04_'] =
        'class HCSR04:\n' +
        '    def __init__(self, tpin=pin' + Trig + ', epin=pin' + Echo + ', spin=pin13):\n' +
        '        self.trigger_pin = tpin\n' +
        '        self.echo_pin = epin\n' +
        '        self.sclk_pin = spin\n' +
        '\n' +
        '    def distance_mm(self):\n' +
        '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n' +
        '                 mosi=self.trigger_pin, miso=self.echo_pin)\n' +
        '        pre = 0\n' +
        '        post = 0\n' +
        '        k = -1\n' +
        '        length = 500\n' +
        '        resp = bytearray(length)\n' +
        '        resp[0] = 0xFF\n' +
        '        spi.write_readinto(resp, resp)\n' +
        '        # find first non zero value\n' +
        '        try:\n' +
        '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n' +
        '        except StopIteration:\n' +
        '            i = -1\n' +
        '        if i > 0:\n' +
        '            pre = bin(value).count("1")\n' +
        '            # find first non full high value afterwards\n' +
        '            try:\n' +
        '                k, value = next((ind, v)\n' +
        '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n' +
        '                post = bin(value).count("1") if k else 0\n' +
        '                k = k + i\n' +
        '            except StopIteration:\n' +
        '                i = -1\n' +
        '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n' +
        '        return dist\n' +
        '\n' +
        '    def distance_cm(self):\n' +
        '        return self.distance_mm() / 10.0\n' +
        '\n' +
        'sonar=HCSR04()\n' +
        '\n'
    return ['sonar.distance_cm()', Python.ORDER_ATOMIC];
};

export const DS1307_init = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    //Python.definitions_['include_Mixly'] = '#include "Mixly.h"';
    //Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;
    //Python.definitions_['DS1307'+RTCName] = 'DS1307 ' + RTCName + '('+SDA+','+SCL+');';
    //return 'DS1307' + '('+SDA+','+SCL+')\n';
};

export const RTC_get_time = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var timeType = this.getFieldValue('TIME_TYPE');
    //Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;

    switch (timeType) {
    //
    case "Year":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Month":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Day":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Hour":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Minute":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Second":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Week":
        var code = 'ds.' + timeType + '()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Mix1":
        var code = 'ds.get_date()';
        return [code, Python.ORDER_ASSIGNMENT];
    case "Mix2":
        var code = 'ds.get_time()';
        return [code, Python.ORDER_ASSIGNMENT];
    }

};

export const RTC_set_time = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var hour = Python.valueToCode(this, "hour", Python.ORDER_ASSIGNMENT);
    var minute = Python.valueToCode(this, "minute", Python.ORDER_ASSIGNMENT);
    var second = Python.valueToCode(this, "second", Python.ORDER_ASSIGNMENT);
    //Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;

    var code = 'ds.set_time(' + hour + ', ' + minute + ', ' + second + ')\n';
    return code;
};

export const RTC_set_date = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var year = Python.valueToCode(this, "year", Python.ORDER_ASSIGNMENT);
    var month = Python.valueToCode(this, "month", Python.ORDER_ASSIGNMENT);
    var day = Python.valueToCode(this, "day", Python.ORDER_ASSIGNMENT);
    //Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;
    var code = 'ds.set_date(' + year + ', ' + month + ', ' + day + ')\n';
    return code;
};

export const sensor_compass_reset = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'compass.clear_calibration()\n';
};


export const sensor_light = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['display.read_light_level()', Python.ORDER_ATOMIC];
};

export const sensor_hrsc04_init = function () {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_ultrasonic'] = 'from ultrasonic import *';
    return "sonar = HCSR04(tpin=pin" + Trig + ", epin=pin" + Echo + ")\n"
};

export const TCS34725_Get_RGB = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_TCS'] = 'from TCS import *';

    var RGB = this.getFieldValue('TCS34725_COLOR');
    return ["tcs.getRawRGBData(" + RGB + ")", Python.ORDER_ATOMIC];
};