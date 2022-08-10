'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.servo_init = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_board'] = 'import board';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = v+' = servo.Servo(board.'+dropdown_pin+')\n';
  return code;
};

Blockly.Python.servo_move = function() {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.write_angle('+value_degree+')\n';
  return code;
};

Blockly.Python.servo_speed_360 = function() {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(this, 'SPEED', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.set_speed('+speed+')\n';
  return code;
};

Blockly.Python.servo_set_angle = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo180_angle('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.servo_set_speed = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo360_speed('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.servo_get_angle = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo180_angle('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.servo_get_speed = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo360_speed('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_ms32006_init = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var address =this.getFieldValue('mode')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var sub1 =Blockly.Python.valueToCode(this, 'SUB1',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'=ms32006.MS32006('+ sub1+',addr='+ address +')\n';
    return code;
};

Blockly.Python.actuator_ms32006_dcmotor = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.dc_motor('+ direction+','+ speed +')\n';
    return code;
};

Blockly.Python.actuator_ms32006_stepper = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var mode =this.getFieldValue('mode')
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var steps =Blockly.Python.valueToCode(this, 'steps',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.move('+ mode+','+ direction+','+ speed +','+ steps +')\n';
    return code;
};

Blockly.Python.esp32_music_pitch_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_music'] = 'import music';
    var code = v + ' = music.MIDI('+dropdown_rgbpin+')\n';
    return code;
};

Blockly.Python.esp32_music_pitch = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.pitch('  + number_pitch + ')\n';
  return code;
};

Blockly.Python.esp32_music_pitch_with_time = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.pitch_time(' +   number_pitch+ ', ' + number_time + ')\n';
  return code;
};

Blockly.Python.esp32_music_stop = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.stop('+')\n';
  return code;
};

Blockly.Python.esp32_music_set_tempo_extern=function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".set_tempo("+ ticks +", "+ bpm +")\n";
    return code;
};

Blockly.Python.esp32_music_get_tempo_extern=function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code =  v+".get_tempo()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_music_play_list=function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v+".play("+ v+'.'+lst +")\n";
    return code;
};

Blockly.Python.esp32_music_reset_extern=function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    return v+".reset()\n";
};

Blockly.Python.servo_move = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo_write_angle('+dropdown_pin+','+value_degree+')\n';
  return code;
};

Blockly.Python.actuator_extern_led_bright= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);    
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.LED(" + pin + ").setonoff("+bright+")\n";
    return code;
};

Blockly.Python.actuator_extern_get_led_bright= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin +").getbrightness("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_extern_get_led_state= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin +").getonoff("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_extern_led_brightness= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.LED(' + pin +').setbrightness('+flag+')\n';
    return code;
};

Blockly.Python.actuator_neopixel_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
   Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin('+dropdown_rgbpin+'), '+value_ledcount+')\n';
    return code;
};

Blockly.Python.actuator_neopixel_rgb_all=function(){
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= v+'.fill(('+value_rvalue+', '+value_gvalue+', '+value_bvalue+'))\n';
  return code;
};

Blockly.Python.actuator_neopixel_write=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code= v + '.write()\n';   
  return code;
};
Blockly.Python.actuator_neopixel_rgb=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= v + '['+value_led+'] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};