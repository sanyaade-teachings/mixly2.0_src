import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const servo_init = function () {
    Python.definitions_['import_servo'] = 'import servo';
    Python.definitions_['import_board'] = 'import board';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = v + ' = servo.Servo(board.' + dropdown_pin + ')\n';
    return code;
};

export const servo_speed_360 = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'SPEED', Python.ORDER_ATOMIC);
    var code = v + '.set_speed(' + speed + ')\n';
    return code;
};

export const servo_set_angle = function () {
    Python.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var code = 'servo.servo180_angle(' + dropdown_pin + ',' + num + ')\n';
    return code;
};

export const servo_set_speed = function () {
    Python.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var num = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    var code = 'servo.servo360_speed(' + dropdown_pin + ',' + num + ')\n';
    return code;
};

export const servo_get_angle = function () {
    Python.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'servo.servo180_angle(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const servo_get_speed = function () {
    Python.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'servo.servo360_speed(' + dropdown_pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_ms32006_init = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var address = this.getFieldValue('mode')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sub1 = Python.valueToCode(this, 'SUB1', Python.ORDER_ATOMIC);
    var code = sub + '=ms32006.MS32006(' + sub1 + ',addr=' + address + ')\n';
    return code;
};

export const actuator_ms32006_dcmotor = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var direction = this.getFieldValue('direction')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var code = sub + '.dc_motor(' + direction + ',' + speed + ')\n';
    return code;
};

export const actuator_ms32006_stepper = function () {
    Python.definitions_['import ms32006'] = 'import ms32006';
    var mode = this.getFieldValue('mode')
    var direction = this.getFieldValue('direction')
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var steps = Python.valueToCode(this, 'steps', Python.ORDER_ATOMIC);
    var code = sub + '.move(' + mode + ',' + direction + ',' + speed + ',' + steps + ')\n';
    return code;
};

export const esp32_music_pitch_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    Python.definitions_['import_music'] = 'import music';
    var code = v + ' = music.MIDI(' + dropdown_rgbpin + ')\n';
    return code;
};

export const esp32_music_pitch = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var code = v + '.pitch(' + number_pitch + ')\n';
    return code;
};

export const esp32_music_pitch_with_time = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var number_time = Python.valueToCode(block, 'time', Python.ORDER_ATOMIC);
    var code = v + '.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    return code;
};

export const esp32_music_stop = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.stop(' + ')\n';
    return code;
};

export const esp32_music_set_tempo_extern = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var bpm = Python.valueToCode(this, 'BPM', Python.ORDER_ASSIGNMENT);
    var ticks = Python.valueToCode(this, 'TICKS', Python.ORDER_ASSIGNMENT);
    var code = v + ".set_tempo(" + ticks + ", " + bpm + ")\n";
    return code;
};

export const esp32_music_get_tempo_extern = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + ".get_tempo()";
    return [code, Python.ORDER_ATOMIC];
};

export const esp32_music_play_list = function () {
    Python.definitions_['import_music'] = 'import music';
    var lst = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT);
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + ".play(" + v + '.' + lst + ")\n";
    return code;
};

export const esp32_music_reset_extern = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return v + ".reset()\n";
};

export const servo_move = function () {
    Python.definitions_['import_servo'] = 'import servo';
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_degree = Python.valueToCode(this, 'DEGREE', Python.ORDER_ATOMIC);
    var code = 'servo.servo_write_angle(' + dropdown_pin + ',' + value_degree + ')\n';
    return code;
};

export const actuator_extern_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var bright = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.LED(" + pin + ").setonoff(" + bright + ")\n";
    return code;
};

export const actuator_extern_get_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin + ").getbrightness(" + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_extern_get_led_state = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin + ").getonoff(" + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_extern_led_brightness = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var flag = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = 'mixgo.LED(' + pin + ').setbrightness(' + flag + ')\n';
    return code;
};

export const actuator_neopixel_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_ledcount = Python.valueToCode(this, 'LEDCOUNT', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin(' + dropdown_rgbpin + '), ' + value_ledcount + ')\n';
    return code;
};

export const actuator_neopixel_rgb_all = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    var code = v + '.fill((' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + '))\n';
    return code;
};

export const actuator_neopixel_write = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.write()\n';
    return code;
};
export const actuator_neopixel_rgb = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var value_led = Python.valueToCode(this, '_LED_', Python.ORDER_ATOMIC);
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    var code = v + '[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
};

export const actuator_use_uart_init = function () {
    Python.definitions_['import_syn6288'] = 'import syn6288';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=syn6288.SYN6288(' + key + ')\n';
    return code;
};

export const syn6288_set_voice = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var voice = Python.valueToCode(this, 'VOICE', Python.ORDER_ASSIGNMENT);
    var code = v + ".volume(" + voice + ")\n";
    return code;
};

export const syn6288_get_voice = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + ".volume()";
    return [code, Python.ORDER_ATOMIC];
};

export const syn6288_builtin_voice = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = Python.valueToCode(this, 'VOICE', Python.ORDER_ASSIGNMENT);
    var code = v + ".hint_tones(" + voice + ',blocking=' + mode + ")\n";
    return code;
};

export const syn6288_tts_play = function () {
    Python.definitions_['import_music'] = 'import music';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = Python.valueToCode(this, 'VOICE', Python.ORDER_ASSIGNMENT);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".synthesis(" + data + ',music=' + voice + ',blocking=' + mode + ")\n";
    return code;
};

//mixbot extern below:
export const mixbot_addr_extern = function () {
    var code = this.getFieldValue('PIN');
    return [code, Python.ORDER_ATOMIC];
};

export const robot_motor_extern = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_motor'] = 'from mixbot_ext import ext_motor';
        var code = 'ext_motor.run(' + mode + ',' + speed + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_motor'] = 'ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
            var code = 'ext_motor_left.run(0,' + speed + ')\n';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_motor'] = 'ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
            var code = 'ext_motor_right.run(0,' + speed + ')\n';
        }
        return code;
    }
};

export const robot_motor_extern_get_speed = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        var code = 'ext_motor.run(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_motor'] = 'ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
            var code = 'ext_motor_left.run()';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_motor'] = 'ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
            var code = 'ext_motor_right.run()';
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_traffic_light_extern = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var light = this.getFieldValue('light');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_traffic'] = 'from mixbot_ext import ext_traffic';
        var mode = this.getFieldValue('mode');
        var light = this.getFieldValue('light');
        var code = 'ext_traffic.led(' + mode + ',';
        if (light == '0' || light == '1' || light == '2') { code += '0' + ',' }
        else if (light == '3' || light == '4') { code += '1' + ',' }
        else if (light == '5' || light == '6') { code += '2' + ',' }
        if (light == '0') { code += '0' }
        else if (light == '1' || light == '3' || light == '5') { code += '1' }
        else if (light == '2' || light == '4' || light == '6') { code += '-1' }
        code += ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_traffic'] = 'ext_traffic_left = i2cdevice.Traffic_LED(ext_i2c_left)';
            var code = 'ext_traffic_left.led(0,';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_traffic'] = 'ext_traffic_right = i2cdevice.Traffic_LED(ext_i2c_right)';
            var code = 'ext_traffic_right.led(0,';
        }
        if (light == '0' || light == '1' || light == '2') { code += '0' + ',' }
        else if (light == '3' || light == '4') { code += '1' + ',' }
        else if (light == '5' || light == '6') { code += '2' + ',' }
        if (light == '0') { code += '0' }
        else if (light == '1' || light == '3' || light == '5') { code += '1' }
        else if (light == '2' || light == '4' || light == '6') { code += '-1' }
        code += ")\n";
        return code;
    }
};

export const robot_led_extern = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');
    var value = Python.valueToCode(this, 'value', Python.ORDER_ATOMIC);
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_' + color + '_LED'] = 'from mixbot_ext import ' + color + '_LED';
        var code = color + '_LED.brightness(' + mode + ',' + value + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_' + color + '_LED'] = 'ext_' + color + '_LED_left = i2cdevice.' + color + '_LED(ext_i2c_left)';
            var code = 'ext_' + color + '_LED_left.brightness(' + '0,' + value + ")\n";
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_' + color + '_LED'] = 'ext_' + color + '_LED_right = i2cdevice.' + color + '_LED(ext_i2c_right)';
            var code = 'ext_' + color + '_LED_right.brightness(' + '0,' + value + ")\n";
        }
        return code;
    }
};

export const robot_led_extern_get_value = function () {
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_' + color + '_LED'] = 'from mixbot_ext import ' + color + '_LED';
        var code = color + '_LED.brightness(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_' + color + '_LED'] = 'ext_' + color + '_LED_left = i2cdevice.' + color + '_LED(ext_i2c_left)';
            var code = 'ext_' + color + '_LED_left.brightness(0)';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_' + color + '_LED'] = 'ext_' + color + '_LED_right = i2cdevice.' + color + '_LED(ext_i2c_right)';
            var code = 'ext_' + color + '_LED_right.brightness(0)';
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_servo_extern_get_status = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.state(' + mode + ")" + status;
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.state(0)' + status;
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.state(0)' + status;
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_servo_extern_stop_mode = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.stop_mode(' + mode + "," + status + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.stop_mode(' + "0," + status + ")\n";
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.stop_mode(' + "0," + status + ")\n";
        }
        return code;
    }
};

export const robot_servo_extern_stop = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.stop(' + mode + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.stop(0)\n';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.stop(0)\n';
        }
        return code;
    }
};

export const robot_servo_extern_absolute_run = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    var angle = Python.valueToCode(this, 'angle', Python.ORDER_ATOMIC);
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.absolute_run(' + mode + "," + status + "," + speed + "," + direction + "," + angle + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.absolute_run(' + "0," + status + "," + speed + "," + direction + "," + angle + ")\n";
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.absolute_run(' + "0," + status + "," + speed + "," + direction + "," + angle + ")\n";
        }
        return code;
    }

};

export const robot_servo_extern_relative_origin = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_origin(' + mode + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_origin(0)\n';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_origin(0)\n';
        }
        return code;
    }
};

export const robot_servo_extern_relative_run = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var angle = Python.valueToCode(this, 'angle', Python.ORDER_ATOMIC);
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_run(' + mode + "," + status + "," + speed + "," + angle + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_run(' + "0," + status + "," + speed + "," + angle + ")\n";
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_run(' + "0," + status + "," + speed + "," + angle + ")\n";
        }
        return code;
    }
};

export const robot_servo_extern_relative_continue = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_continue(' + mode + "," + status + "," + speed + "," + direction + ")\n";
        return code;
    }
    else if (version == 'feiyi') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_continue(' + "0," + status + "," + speed + "," + direction + ")\n";
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_continue(' + "0," + status + "," + speed + "," + direction + ")\n";
        }
        return code;
    }
};

export const mixbot_actuator_extern_get_addr = function () {
    var name = this.getFieldValue('name');
    Python.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var code = name + '.addr_get()';
    return [code, Python.ORDER_ATOMIC];
};

export const mixbot_actuator_extern_set_addr = function () {
    var name = this.getFieldValue('name');
    Python.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var oldaddr = Python.valueToCode(this, 'old', Python.ORDER_ATOMIC);
    var newaddr = Python.valueToCode(this, 'new', Python.ORDER_ATOMIC);
    var code = name + '.addr_set(' + oldaddr + ',' + newaddr + ')\n';
    return code;
};