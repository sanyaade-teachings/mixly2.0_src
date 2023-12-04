import Python from '../../python/python_generator';

export const esp32_music_pitch = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.pitch(' + pin + ', ' + number_pitch + ')\n';
    return code;
};

export const esp32_music_pitch_with_time = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var number_time = Python.valueToCode(block, 'time', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.pitch_time(' + pin + ', ' + number_pitch + ', ' + number_time + ')\n';
    return code;
};

export const esp32_music_stop = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.stop(' + pin + ')\n';
    return code;
};

export const esp32_music_set_tempo = function () {
    Python.definitions_['import_music'] = 'import music';
    var bpm = Python.valueToCode(this, 'BPM', Python.ORDER_ASSIGNMENT);
    var ticks = Python.valueToCode(this, 'TICKS', Python.ORDER_ASSIGNMENT);
    var code = "music.set_tempo(" + ticks + ", " + bpm + ")\n";
    return code;
};

export const esp32_music_get_tempo = function () {
    Python.definitions_['import_music'] = 'import music';
    var code = "music.get_tempo()";
    return [code, Python.ORDER_ATOMIC];
};

export const esp32_onboard_music_pitch = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var code = 'music.pitch(' + number_pitch + ')\n';
    return code;
};

export const esp32_onboard_music_pitch_with_time = function (block) {
    Python.definitions_['import_music'] = 'import music';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var number_time = Python.valueToCode(block, 'time', Python.ORDER_ATOMIC);
    var code = 'music.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    return code;
};

export const esp32_onboard_music_stop = function () {
    Python.definitions_['import_music'] = 'import music';
    var code = 'music.stop(' + ')\n';
    return code;
};

export const esp32_onboard_music_play_list = function () {
    Python.definitions_['import_music'] = 'import music';
    var lst = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT);
    var code = "music.play(" + lst + ")\n";
    return code;
};

export const esp32_music_play_list = function () {
    Python.definitions_['import_music'] = 'import music';
    var lst = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT);
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ASSIGNMENT);
    var code = "music.play(" + lst + ", " + pin + ")\n";
    return code;
};

export const esp32_mixgo_music_play_list_show = function () {
    Python.definitions_['import_music'] = 'import music';
    Python.definitions_['import_matrix'] = 'import matrix';
    var lst = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT);
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ASSIGNMENT);
    // var display = Python.valueToCode(this, 'DISPLAY', Python.ORDER_ASSIGNMENT);
    var code = "music.play_show(" + lst + ", " + pin + ")\n";
    return code;
};

export const esp32_music_reset = function () {
    Python.definitions_['import_music'] = 'import music';
    return "music.reset()\n";
};

export const servo_move = function () {
    Python.definitions_['import_servo'] = 'import servo';
    Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_degree = Python.valueToCode(this, 'DEGREE', Python.ORDER_ATOMIC);
    var code = 'servo.servo_write_angle(' + dropdown_pin + ',' + value_degree + ')\n';
    return code;
};

export const number = function () {
    var code = this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const ledswitch = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_extern_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var bright = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.led(" + pin + ").setonoff(" + bright + ")\n";
    return code;
};

export const actuator_extern_get_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = "mixgo.led(" + pin + ").getonoff(" + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_extern_led_brightness = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var flag = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = 'mixgo.led(' + pin + ').setbrightness(' + flag + ')\n';
    return code;
};

export const actuator_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    var bright = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.led" + op + ".setonoff(" + bright + ")\n";
    return code;
};

export const actuator_get_led_bright = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    var code = "mixgo.led" + op + ".getonoff(" + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const actuator_led_brightness = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    var flag = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = 'mixgo.led' + op + '.setbrightness(' + flag + ')\n';
    return code;
};


export const actuator_neopixel_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_ledcount = Python.valueToCode(this, 'LEDCOUNT', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin(' + dropdown_rgbpin + '), ' + value_ledcount + ', timing = True)\n';
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


export const actuator_onboard_neopixel_write = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var code = 'mixgo.rgb.write()\n';
    return code;
};

export const actuator_onboard_neopixel_rgb = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var value_led = Python.valueToCode(this, '_LED_', Python.ORDER_ATOMIC);
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    var code = 'mixgo.rgb[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
};

export const actuator_onboard_neopixel_rgb_all = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    var code = 'mixgo.rgb.fill((' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + '))\n';
    return code;
};

export const led_light = actuator_led_bright;
export const get_led_bright = actuator_get_led_bright;
export const led_brightness = actuator_led_brightness;