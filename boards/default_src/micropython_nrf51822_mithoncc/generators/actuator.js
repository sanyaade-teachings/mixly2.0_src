import Python from '../../python/python_generator';

export const microbit_music_play_built_in = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
};

export const microbit_music_play_built_in_easy = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin + ')\n';
    return code;
};

export const microbit_music_pitch_delay = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    Python.definitions_['import_math'] = 'import math';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    var number_duration = Python.valueToCode(block, 'duration', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var code = 'music.pitch(round(' + number_pitch + '), round(' + number_duration + '), pin' + pin + ', wait = ' + checkbox_wait + ')\n';
    return code;
};

export const microbit_music_pitch = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    Python.definitions_['import_math'] = 'import math';
    var number_pitch = Python.valueToCode(block, 'pitch', Python.ORDER_ATOMIC);
    // var number_duration = Python.valueToCode(block, 'duration', Python.ORDER_ATOMIC);
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.pitch(round(' + number_pitch + '), pin=pin' + pin + ')\n';
    return code;
};

export const microbit_music_play_list_of_notes = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var value_notes = Python.valueToCode(block, 'notes', Python.ORDER_ATOMIC) || '[]';
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(' + value_notes + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
};



export const microbit_music_reset = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var code = 'music.reset()\n';
    return code;
};

export const microbit_music_stop = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var pin = Python.valueToCode(block, 'PIN', Python.ORDER_ATOMIC);
    var code = 'music.stop(pin' + pin + ')\n';
    return code;
};

export const microbit_music_get_tempo = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_music'] = 'import music';
    var code = 'music.get_tempo()';
    return [code, Python.ORDER_ATOMIC];
};

export const tone_set_tempo = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var bpm = Python.valueToCode(this, 'BPM', Python.ORDER_ASSIGNMENT);
    var ticks = Python.valueToCode(this, 'TICKS', Python.ORDER_ASSIGNMENT);
    var code = "music.set_tempo(ticks=" + ticks + ", bpm=" + bpm + ")\n";
    return code;
};

export const speech_translate = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_speech'] = 'import speech';
    var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = ["speech.translate(" + text + ")", Python.ORDER_ATOMIC];
    return code
};

export const speech_say = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_speech'] = 'import speech';
    var mode = this.getFieldValue("MODE");
    var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var pitch = Python.valueToCode(this, 'pitch', Python.ORDER_ATOMIC);
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var mouth = Python.valueToCode(this, 'mouth', Python.ORDER_ATOMIC);
    var throat = Python.valueToCode(this, 'throat', Python.ORDER_ATOMIC);
    var code = "speech." + mode + "(" + text + ", pitch=" + pitch + ", speed=" + speed + ", mouth=" + mouth + ", throat=" + throat + ")\n";
    return code
};

// export const speech_sing = function(){
//   Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Python.definitions_['import_speech'] = 'import speech';
//   var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
//   var pitch = Python.valueToCode(this, 'pitch', Python.ORDER_ATOMIC);
//   var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
//   var mouth = Python.valueToCode(this, 'mouth', Python.ORDER_ATOMIC);
//   var throat = Python.valueToCode(this, 'throat', Python.ORDER_ATOMIC);
//   var code = "speech.sing("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };


// export const speech_prenounce = function(){
//   Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Python.definitions_['import_speech'] = 'import speech';
//   var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
//   var pitch = Python.valueToCode(this, 'pitch', Python.ORDER_ATOMIC);
//   var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
//   var mouth = Python.valueToCode(this, 'mouth', Python.ORDER_ATOMIC);
//   var throat = Python.valueToCode(this, 'throat', Python.ORDER_ATOMIC);
//   var code = "speech.pronounce("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };

export const speech_say_easy = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_speech'] = 'import speech';
    var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "speech.say(" + text + ")\n";
    return code
};

export const speech_sing_easy = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_speech'] = 'import speech';
    var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "speech.sing(" + text + ")\n";
    return code
};


export const speech_pronounce_easy = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_speech'] = 'import speech';
    var text = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "speech.pronounce(" + text + ")\n";
    return code
};

export const servo_move = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_Servolib'] = 'import Servo';
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_degree = Python.valueToCode(this, 'DEGREE', Python.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin)))
        var code = 'Servo.angle(pin' + dropdown_pin + ', ' + value_degree + ')\n';
    else
        var code = 'Servo.angle(' + dropdown_pin + ', ' + value_degree + ')\n';
    return code;
};

export const bit_motor_control = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_motor_control'] = 'import motor_control';

    var Motor = this.getFieldValue('Motor');
    var mode = this.getFieldValue('mode');
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);

    var code = 'motor_control.MotorRun(' + Motor + ', ' + mode + '' + speed + ')\n';
    return code;
};

export const display_rgb_init = function () {
    var dropdown_rgbpin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var value_ledcount = Python.valueToCode(this, 'LEDCOUNT', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    // Python.definitions_['include_display'] = '#include "Mixly.h"';
    Python.setups_['var_rgb_display' + dropdown_rgbpin] = 'np = neopixel.NeoPixel(pin' + dropdown_rgbpin + ', ' + value_ledcount + ')\n';
    // Python.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    // Python.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
export const display_rgb = function () {

    var value_led = Python.valueToCode(this, '_LED_', Python.ORDER_ATOMIC);
    var value_rvalue = Python.valueToCode(this, 'RVALUE', Python.ORDER_ATOMIC);
    var value_gvalue = Python.valueToCode(this, 'GVALUE', Python.ORDER_ATOMIC);
    var value_bvalue = Python.valueToCode(this, 'BVALUE', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
};

export const display_rgb2 = function () {
    var value_led = Python.valueToCode(this, '_LED_', Python.ORDER_ATOMIC);
    var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
    var color = colour_rgb_led_color;
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np[' + value_led + '] = (' + color + ')\n';
    code += 'np.show()\n';
    return code;
};

export const display_rgb_show = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np.show()\n';
    return code;
};

export const MP3_INIT = function () {
    var dropdown_pin1 = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var dropdown_pin2 = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + ' = ' + 'QJ00X_MP3(mp3_rx=' + dropdown_pin1 + ', mp3_tx=' + dropdown_pin2 + ')\n';
    return code;
};

//mp3 控制播放
export const MP3_CONTROL = function () {
    var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.' + CONTROL_TYPE + '()\n';
    return code;
};

//mp3 循环模式
export const MP3_LOOP_MODE = function () {
    var LOOP_MODE = this.getFieldValue('LOOP_MODE');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_loop(' + LOOP_MODE + ')\n';
    return code;
};

//mp3 EQ模式
export const MP3_EQ_MODE = function () {
    var EQ_MODE = this.getFieldValue('EQ_MODE');
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_eq(' + EQ_MODE + ')\n';
    return code;
};

//mp3 设置音量
export const MP3_VOL = function () {
    var vol = Python.valueToCode(this, 'vol', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_vol(' + vol + ')\n';
    return code;
};

//mp3 播放第N首
export const MP3_PLAY_NUM = function () {
    var NUM = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.playFileByIndexNumber(' + NUM + ')\n';
    return code;
};

export const MP3_PLAY_FOLDER = function () {
    var FOLDER = Python.valueToCode(this, 'FOLDER', Python.ORDER_ATOMIC);
    var NUM = Python.valueToCode(this, 'NUM', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_folder(' + FOLDER + ', ' + NUM + ')\n';
    return code;
};