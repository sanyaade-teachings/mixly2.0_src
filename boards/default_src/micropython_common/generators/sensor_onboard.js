import Python from '../../python/python_generator';
import * as Mixly from 'mixly';
import { sensor_dht11 } from './sensor_extern';

export const sensor_mixgo_button_is_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var code = version + '.' + btn + '.is_pressed()';
    return [code, Python.ORDER_ATOMIC];
};
//ok
export const sensor_mixgo_button_was_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var code = version + '.' + btn + '.was_pressed()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_button_get_presses = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = version + '.' + btn + '.get_presses(' + argument + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_button_attachInterrupt = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var dropdown_btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Python.valueToCode(this, 'DO', Python.ORDER_ATOMIC);
    var code = version + '.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};
//ok
export const sensor_mixgocar42_button_is_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var code = version + '.' + 'button.is_pressed()';
    return [code, Python.ORDER_ATOMIC];
};
//ok
export const sensor_mixgocar42_button_was_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var code = version + '.' + 'button.was_pressed()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgocar42_button_get_presses = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = version + '.' + 'button.get_presses(' + argument + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgocar42_button_attachInterrupt = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Python.valueToCode(this, 'DO', Python.ORDER_ATOMIC);
    var code = version + '.' + 'button.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

export const HCSR04 = function () {
    Python.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = Python.valueToCode(this, "PIN1", Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Python.valueToCode(this, "PIN2", Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Python.ORDER_ATOMIC];
}



export const sensor_mixgo_light = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo") {
        Python.definitions_['import_mixgo'] = 'import mixgo';
        return ['mixgo.get_brightness()', Python.ORDER_ATOMIC];
    }
    else if (version == "mixgo_ce") {
        Python.definitions_['import_mixgo_ce'] = 'import mixgo_ce';
        return ['mixgo_ce.get_brightness()', Python.ORDER_ATOMIC];
    }
    else if (version == "mpython") {
        Python.definitions_['import_mpython_onboard_light'] = 'from mpython import onboard_light';
        return ['onboard_light.brightness()', Python.ORDER_ATOMIC];
    }
    return ['', Python.ORDER_ATOMIC];
};

export const sensor_mixgo_sound = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo") {
        Python.definitions_['import_mixgo'] = 'import mixgo';
        return ['mixgo.get_soundlevel()', Python.ORDER_ATOMIC];
    }
    else if (version == "mpython") {
        Python.definitions_['import_mpython_onboard_sound'] = 'from mpython import onboard_sound';
        return ['onboard_sound.soundlevel()', Python.ORDER_ATOMIC];
    }
    return ['', Python.ORDER_ATOMIC];
};


export const number1 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const number2 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const number3 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const number4 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const number5 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const number6 = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_pin_near = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_ltr553als'] = "from " + version + " import onboard_ltr553als";
    var code = 'onboard_ltr553als.ps_nl()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_pin_near_double = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var direction = this.getFieldValue('direction');
    var code = version + '.' + 'infrared_' + direction + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_pin_near_triple = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var direction = this.getFieldValue('direction');
    Python.definitions_['import_' + version + '_' + direction] = 'from ' + version + ' import ' + direction;
    var code = direction + '.ps_nl()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_ds18x20 = function () {
    Python.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'ds18x20x.get_ds18x20_temperature(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_lm35 = function () {
    Python.definitions_['import_lm35'] = 'import lm35';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'lm35.get_LM35_temperature(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_LTR308 = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_ltr553als'] = "from " + version + " import onboard_ltr553als";
    var code = 'onboard_ltr553als.als_vis()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_sound = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2];
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_' + version + '_sound'] = 'from ' + version + ' import sound';
        code = 'sound.loudness()';
    }
    else {
        Python.definitions_['import_' + version + '_onboard_sound'] = 'from ' + version + ' import onboard_sound';
        code = 'onboard_sound.read()';
    }
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_hp203 = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    Python.definitions_['import_' + version + '_onboard_hp203x'] = "from " + version + " import onboard_hp203x";
    var code = 'onboard_hp203x.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_aht11 = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    Python.definitions_['import_' + version + '_onboard_ahtx0'] = "from " + version + " import onboard_ahtx0";
    var code = 'onboard_ahtx0.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const rfid_readid = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_rc522'] = "from " + version + " import onboard_rc522";
    var code = 'onboard_rc522.read_card(0, x="id")';
    return [code, Python.ORDER_ATOMIC];
};

export const rfid_readcontent = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    Python.definitions_['import_' + version + '_onboard_rc522'] = "from " + version + " import onboard_rc522";
    var code = 'onboard_rc522.read_card(' + sector + ', x="content")';
    return [code, Python.ORDER_ATOMIC];
};

export const rfid_write = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_' + version + '_onboard_rc522'] = "from " + version + " import onboard_rc522";
    var code = 'onboard_rc522.write_card(' + cnt + ',' + sector + ')\n';
    return code;
};

export const rfid_write_return = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_' + version + '_onboard_rc522'] = "from " + version + " import onboard_rc522";
    var code = 'onboard_rc522.write_card(' + cnt + ',' + sector + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_get_acceleration = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    var code = '';
    if (key == 'strength') {
        if (version == 'mixbot') {
            Python.definitions_['import_' + version + '_acc_gyr'] = 'from ' + version + ' import acc_gyr';
            code = 'acc_gyr.strength()';
        }
        else {
            Python.definitions_['import_' + version + '_onboard_mxc6655xa'] = "from " + version + " import onboard_mxc6655xa";
            code = 'onboard_mxc6655xa.strength()';
        }
        return [code, Python.ORDER_ATOMIC];
    }
    if (version == 'mixbot') {
        Python.definitions_['import_' + version + '_acc_gyr'] = 'from ' + version + ' import acc_gyr';
        code = 'acc_gyr.accelerometer()' + key;
    }
    else {
        Python.definitions_['import_' + version + '_onboard_mxc6655xa'] = "from " + version + " import onboard_mxc6655xa";
        code = 'onboard_mxc6655xa.acceleration()' + key;
    }
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_eulerangles = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_mxc6655xa'] = "from " + version + " import onboard_mxc6655xa";
    var angle = this.getFieldValue('angle');
    var code = 'onboard_mxc6655xa.eulerangles()' + angle;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_gesture = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_is_gesture("' + gesture + '")';
    return [code, Python.ORDER_ATOMIC];
}


//ok
export const sensor_mpu9250_get_acceleration = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_get_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgoce_pin_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var pin = Python.valueToCode(this, 'button', Python.ORDER_ATOMIC);
    var code = version + '.touched(' + pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_touch_slide = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var code = version + '.touch_slide(3,4)';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_pin_pressed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version] = 'import ' + version;
    var pin = Python.valueToCode(this, 'button', Python.ORDER_ATOMIC);
    var code = version + '.' + pin + '.is_touched()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpython_pin_pressed = function () {
    Python.definitions_['import_mpython'] = 'import mpython';
    var pin = Python.valueToCode(this, 'button', Python.ORDER_ATOMIC);
    var code = 'mpython.touch_' + pin + '.is_touched()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_adxl345_get_acceleration = function () {
    Python.definitions_['import_adxl345'] = 'import adxl345';
    // Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code;
    if (key == 'x') {
        code = v + '.readX()';
    } else if (key == 'y') {
        code = v + '.readY()';
    } else if (key == 'z') {
        code = v + '.readZ()';
    } else if (key == 'values') {
        code = v + '.readXYZ()';
    }
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_get_magnetic = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_magnetic_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_get_gyro = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_gyro_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_calibrate_compass = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return '' + v + '.calibrate()\n';
};

export const sensor_mpu9250_temperature = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    return [v + '.mpu9250_get_temperature()', Python.ORDER_ATOMIC];
};
export const sensor_mpu9250_field_strength = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "compass")
        Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var compass = this.getFieldValue('compass');
    var a;
    if (compass == 'strength') {
        a = v + '.get_field_strength()';
    }
    else if (compass == 'heading') {
        a = v + '.heading()';
    }
    return [a, Python.ORDER_ATOMIC];
};

export const sensor_compass_reset = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return '' + v + '.reset_calibrate()\n';
};

export const sensor_onboard_mpu9250_gesture = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_is_gesture("' + gesture + '")';
    return [code, Python.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_get_acceleration = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_get_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_onboard_mpu9250_get_magnetic = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_magnetic_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_onboard_mpu9250_get_gyro = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_gyro_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_onboard_mpu9250_calibrate_compass = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    return '' + 'onboard_compass.calibrate()\n';
};

export const sensor_onboard_mpu9250_temperature = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    return ['onboard_mpu.mpu9250_get_temperature()', Python.ORDER_ATOMIC];
};
export const sensor_onboard_mpu9250_field_strength = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    var compass = this.getFieldValue('compass');
    var a;
    if (compass == 'strength') {
        a = 'onboard_compass.get_field_strength()';
    }
    else if (compass == 'heading') {
        a = 'onboard_compass.heading()';
    }
    return [a, Python.ORDER_ATOMIC];
};

export const sensor_onboard_compass_reset = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    return '' + 'onboard_compass.reset_calibrate()\n';
};


export const onboard_RTC_set_datetime = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + 'rtc_clock'] = 'from ' + version + ' import rtc_clock';
    var year = Python.valueToCode(this, "year", Python.ORDER_ASSIGNMENT);
    var month = Python.valueToCode(this, "month", Python.ORDER_ASSIGNMENT);
    var day = Python.valueToCode(this, "day", Python.ORDER_ASSIGNMENT);
    var hour = Python.valueToCode(this, "hour", Python.ORDER_ASSIGNMENT);
    var minute = Python.valueToCode(this, "minute", Python.ORDER_ASSIGNMENT);
    var second = Python.valueToCode(this, "second", Python.ORDER_ASSIGNMENT);
    var week = Python.valueToCode(this, "weekday", Python.ORDER_ASSIGNMENT);
    var millisecond = Python.valueToCode(this, "millisecond", Python.ORDER_ASSIGNMENT);
    var code = 'rtc_clock.datetime((' + year + ',' + month + ',' + day + ',' + week + ',' + hour + ',' + minute + ',' + second + ',' + millisecond + '))\n';
    return code;
};

export const onboard_RTC_settime_string = function () {
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_ntptime'] = "import ntptime";
    var code = 'ntptime.settime(' + cnt + ')\n';
    return code;
};

export const onboard_RTC_get_time = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + 'rtc_clock'] = 'from ' + version + ' import rtc_clock';
    var code = 'rtc_clock.datetime()';
    return [code, Python.ORDER_ATOMIC];
};

//mixgo_cc onboard_sensor generators:

export const sensor_mixgo_cc_mmc5603_get_magnetic = function () {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_mmc5603'] = "from " + version + " import onboard_mmc5603";
    if (key == 'all') {
        var code = 'onboard_mmc5603.getstrength()';
        return [code, Python.ORDER_ATOMIC];
    }

    var code = 'onboard_mmc5603.getdata()' + key;
    return [code, Python.ORDER_ATOMIC];

};

export const sensor_mixgo_cc_mmc5603_get_angle = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_mmc5603'] = "from " + version + " import onboard_mmc5603";
    var code = 'onboard_mmc5603.getangle()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_cc_mmc5603_calibrate_compass = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_mmc5603'] = "from " + version + " import onboard_mmc5603";
    var code = 'onboard_mmc5603.calibrate()\n';
    return code;
};
//mixgo_me onboard_sensor generators:




export const sensor_mixgome_temperature = function () {
    Python.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    var code = 'onboard_mxc6655xa.temperature()';
    return [code, Python.ORDER_ATOMIC];
};

//mixgo_ce onboard_sensor generators:
export const sensor_mixgoce_temperature = function () {
    Python.definitions_['import_mixgo_ce'] = "import mixgo_ce";
    var code = 'mixgo_ce.get_temperature()';
    return [code, Python.ORDER_ATOMIC];
};

//mpython onboard_sensor:
export const sensor_mpython_qmi8658_get_acceleration = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.accelerometer()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpython_mmc5603_get_magnetic = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getdata()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpython_qmi8658_get_gyro = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.gyroscope()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpython_qmi8658_temperature = function () {
    Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    return ['motion.temperature()', Python.ORDER_ATOMIC];
};

export const sensor_mpython_mmc5603_get_angle = function () {
    Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getangle()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_rm_pin_near_double = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var direction = this.getFieldValue('direction');
    Python.definitions_['import_' + version + '_adc' + direction] = 'from ' + version + ' import adc' + direction;
    var code = 'adc' + direction + '.read()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_rm_battery_left = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_baize') {
        Python.definitions_['import_mixgo_baize_onboard_bot51'] = 'from mixgo_baize import onboard_bot51';
        var code = 'onboard_bot51.read_bat()';
        return [code, Python.ORDER_ATOMIC];
    }

    Python.definitions_['import_' + version + '_battery'] = 'from ' + version + ' import battery';
    var code = 'battery.voltage()';
    return [code, Python.ORDER_ATOMIC];

};

export const sensor_rm_acc = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_rm_e1_gyro'] = 'from rm_e1 import gyro';
    var code = 'gyro.acceleration()' + key;
    return [code, Python.ORDER_ATOMIC];
};

//car4.2
export const sensor_mixgocar_pin_near_line = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.patrol()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgocar_pin_near = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.obstacle()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgocar_pin_near_state_change = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.ir_mode(onboard_info.' + key + ')\n';
    return code;
};

export const sensor_mixgocar_battery_left = function () {
    Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.read_bat()';
    return [code, Python.ORDER_ATOMIC];
};

//mixbot onboard_sensor below:


export const sensor_mixbot_patrol_calibrate = function () {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_patrol'] = 'from ' + version + ' import patrol';
    var code = 'patrol.correct(patrol.CORRECTING_' + key + ')\n';
    return code;
};

export const sensor_mixbot_patrol_value = function () {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_patrol'] = 'from ' + version + ' import patrol';
    var code = 'patrol.getdata()' + key + '';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixbot_temperature = function () {
    Python.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.temperature()';
    return [code, Python.ORDER_ATOMIC];
};


export const sensor_mixbot_get_gyro = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.gyroscope()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_bitbot_LTR308 = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_ltr553als'] = "from " + version + " import onboard_ltr553als";
    var code = 'onboard_ltr553als.als_vis()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_bitbot_ALS = function () {
    Python.definitions_['import_mixgo_baize_onboard_bot51'] = 'from mixgo_baize import onboard_bot51';
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var code = 'onboard_bot51.' + 'read_als(' + mode + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const bitbot_als_num = function () {
    var code = this.getFieldValue('PIN');
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_button_is_pressed = sensor_mixgo_button_is_pressed;
export const sensor_button_was_pressed = sensor_mixgo_button_was_pressed;
export const sensor_button_get_presses = sensor_mixgo_button_get_presses;
export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_light = sensor_mixgo_light;
//export const sensor_sound = sensor_mixgo_sound;
//export const sensor_get_acceleration = sensor_mixgo_get_acceleration;
export const dht11 = sensor_dht11;
