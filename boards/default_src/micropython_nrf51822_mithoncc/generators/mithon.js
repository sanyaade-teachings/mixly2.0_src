import Python from '../../python/python_generator';

export const microbit_image_create = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var colours = {
        "#000000": "0",
        "#004400": "1",
        "#006600": "2",
        "#008800": "3",
        "#00aa00": "4",
        "#00bb00": "5",
        "#00cc00": "6",
        "#00dd00": "7",
        "#00ee00": "8",
        "#00ff00": "9"
    }
    var colour_00 = colours[block.getFieldValue('00')];
    var colour_01 = colours[block.getFieldValue('01')];
    var colour_02 = colours[block.getFieldValue('02')];
    var colour_03 = colours[block.getFieldValue('03')];
    var colour_04 = colours[block.getFieldValue('04')];
    var colour_10 = colours[block.getFieldValue('10')];
    var colour_11 = colours[block.getFieldValue('11')];
    var colour_12 = colours[block.getFieldValue('12')];
    var colour_13 = colours[block.getFieldValue('13')];
    var colour_14 = colours[block.getFieldValue('14')];
    var colour_20 = colours[block.getFieldValue('20')];
    var colour_21 = colours[block.getFieldValue('21')];
    var colour_22 = colours[block.getFieldValue('22')];
    var colour_23 = colours[block.getFieldValue('23')];
    var colour_24 = colours[block.getFieldValue('24')];
    var colour_30 = colours[block.getFieldValue('30')];
    var colour_31 = colours[block.getFieldValue('31')];
    var colour_32 = colours[block.getFieldValue('32')];
    var colour_33 = colours[block.getFieldValue('33')];
    var colour_34 = colours[block.getFieldValue('34')];
    var colour_40 = colours[block.getFieldValue('40')];
    var colour_41 = colours[block.getFieldValue('41')];
    var colour_42 = colours[block.getFieldValue('42')];
    var colour_43 = colours[block.getFieldValue('43')];
    var colour_44 = colours[block.getFieldValue('44')];
    var code = 'Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + '")';
    return [code, Python.ORDER_ATOMIC];
};


export const base_loop = function (a) {
    //var b = "UNTIL" == a.getFieldValue("MODE"),
    //var c = Python.valueToCode(a, "BOOL", b ? Python.ORDER_LOGICAL_NOT : Python.ORDER_NONE) || "False",
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    Python.loops_['base_loop'] = d;
    return "";
};

export const actuator_rgb_color = function () {
    var value_led = this.getFieldValue('LED');
    var values = this.getFieldValue('COLOR').split(",");
    var value_rvalue = values[0];
    var value_gvalue = values[1];
    var value_bvalue = values[2];
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    Python.definitions_['import_rgb_show'] = 'import rgb_show';
    //Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        //Python.setups_['mixly_rgb_show'] = Python.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'rgb_show.mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    else {
        //Python.setups_['mixly_rgb_show_all'] = Python.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'rgb_show.mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
};

export const actuator_rgb_off = function () {
    var value_led = this.getFieldValue('LED');
    var value_rvalue = 0;
    var value_gvalue = 0;
    var value_bvalue = 0;
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    Python.definitions_['import_rgb_show'] = 'import rgb_show';
    //Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        //Python.setups_['mixly_rgb_show'] = Python.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'rgb_show.mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    } else {
        //Python.setups_['mixly_rgb_show_all'] = Python.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'rgb_show.mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
};

export const actuator_rgb = function () {
    var value_led = Python.valueToCode(this, '_LED_', Python.ORDER_ATOMIC);
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    Python.definitions_['import_rgb_show'] = 'import rgb_show';
    //Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    //Python.setups_['mixly_rgb_show'] = Python.FUNCTION_MIXLY_RGB_SHOW;
    var code = 'rgb_show.mixly_rgb_show(' + value_led + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
};

export const actuator_motor_on = function () {
    var n = this.getFieldValue('NUMBER');
    var v = Python.valueToCode(this, 'SPEED', Python.ORDER_ATOMIC);
    var d = this.getFieldValue('DIRECTION');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_motor_control'] = 'import motor_control';
    if (n == 0) {
        //Python.setups_['mixly_motor1'] = Python.FUNCTION_MIXLY_MOTOR1;
        //Python.setups_['mixly_motor2'] = Python.FUNCTION_MIXLY_MOTOR2;
        //Python.setups_['mixly_motor3'] = Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor1(' + v + ', ' + d + ')\nmotor_control.motor2(' + v + ', ' + d + ')\nmotor_control.motor3(' + v + ', ' + d + ')\n';
    }
    else if (n == 1) {
        //Python.setups_['mixly_motor1'] = Python.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor_control.motor1(' + v + ', ' + d + ')\n';
    }
    else if (n == 2) {
        //Python.setups_['mixly_motor2'] = Python.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor_control.motor2(' + v + ', ' + d + ')\n';
    }
    else if (n == 3) {
        //Python.setups_['mixly_motor3'] = Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor3(' + v + ', ' + d + ')\n';
    }
    return code;
};

export const actuator_motor_off = function () {
    var n = this.getFieldValue('NUMBER');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_motor_control'] = 'import motor_control';
    if (n == 0) {
        //Python.setups_['mixly_motor1'] = Python.FUNCTION_MIXLY_MOTOR1;
        //Python.setups_['mixly_motor2'] = Python.FUNCTION_MIXLY_MOTOR2;
        //Python.setups_['mixly_motor3'] = Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor1(0)\nmotor_control.motor2(0)\nmotor_control.motor3(0)\n';
    }
    else if (n == 1) {
        //Python.setups_['mixly_motor1'] = Python.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor_control.motor1(0)\n';
    }
    else if (n == 2) {
        //Python.setups_['mixly_motor2'] = Python.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor_control.motor2(0)\n';
    }
    else if (n == 3) {
        //Python.setups_['mixly_motor3'] = Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor3(0)\n';
    }
    return code;
};

export const sensor_pin_near = function () {
    var number = this.getFieldValue('NUMBER');
    var code = 'pin' + number + '.read_analog()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_while_btn_pressed = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = Python.valueToCode(this, 'btn', Python.ORDER_ATOMIC);
    Python.setups_['on_' + btn] = 'def on_' + btn + '():\n' +
        '    while True:\n' +
        '        if ' + btn + '.was_pressed():\n' +
        '            yield callback_' + btn + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_' + btn + ' = on_' + btn + '()\n'
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    Python.loops_[btn + '_loop'] = '    next(func_' + btn + ')\n';
    return "def callback_" + btn + "():\n" + d;
};

export const sensor_while_is_gesture = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    Python.setups_['on_' + gesture] = 'def on_gesture_' + gesture + '():\n' +
        '    while True:\n' +
        '        if accelerometer.is_gesture("' + gesture + '"):\n' +
        '            yield callback_gesture_' + gesture + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_gesture_' + gesture + ' = on_gesture_' + gesture + '()\n'
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    Python.loops_[gesture + '_loop'] = '    next(func_gesture_' + gesture + ')\n';
    return "def callback_gesture_" + gesture + '():\n' + d;
};

export const sensor_while_is_near = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var near = this.getFieldValue('near');
    Python.setups_['on_' + near] = 'def on_near_' + near + '():\n' +
        '    while True:\n' +
        '        if not pin' + near + '.read_digital():\n' +
        '            yield callback_near_' + near + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_near_' + near + ' = on_near_' + near + '()\n'
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    Python.loops_[near + '_loop'] = '    next(func_near_' + near + ')\n';
    return "def callback_near_" + near + '():\n' + d;
};

export const controls_repeat_ext = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var times = Python.valueToCode(this, 'TIMES', Python.ORDER_ATOMIC);
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
};