'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.esp32_music_set_tempo=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_music.set_tempo("+ ticks +", "+ bpm +")\n";
    return code;
};

Blockly.Python.esp32_music_get_tempo=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    var code =  "onboard_music.get_tempo()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_onboard_music_pitch = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_music.pitch(' + number_pitch + ')\n';
  return code;
};

Blockly.Python.esp32_onboard_music_pitch_with_time = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_music.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
  return code;
};

Blockly.Python.esp32_onboard_music_stop = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
  var code = 'onboard_music.stop('+')\n';
  return code;
};

Blockly.Python.esp32_onboard_music_play_list=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_music.play("+ lst +")\n";
    return code;
};


Blockly.Python.esp32_music_reset=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    return "onboard_music.reset()\n";
};

Blockly.Python.number = function () {
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ledswitch = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "onboard_led.setonoff(" + op + ","+ bright+")\n";
    return code;
};

Blockly.Python.actuator_get_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var code = "onboard_led.getbrightness(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.actuator_get_led_state = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var code = "onboard_led.getonoff(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.actuator_led_brightness = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "onboard_led.setbrightness(" + op + ","+ flag+")\n";
    return code;
};

Blockly.Python.mixgo_actuator_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'+op] = 'from '+version+' import led'+op;
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "led"+op+".setonoff("+ bright+")\n";
    return code;
};

Blockly.Python.mixgo_actuator_get_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'+op] = 'from '+version+' import led'+op;
    var code = "led"+op+".getbrightness()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.mixgo_actuator_get_led_state = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'+op] = 'from '+version+' import led'+op;
    var code = "led" +op +".getonoff()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.mixgo_actuator_led_brightness = function() {    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'+op] = 'from '+version+' import led'+op;
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "led" + op + ".setbrightness("+ flag+")\n";
    return code;
};

Blockly.Python.rm_actuator_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = op+"led.setonoff(" + bright+")\n";
    return code;
};

Blockly.Python.rm_actuator_get_led_bright = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var code = op+"led.getbrightness()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.rm_actuator_get_led_state = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var code = op+"led.getonoff()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.rm_actuator_led_brightness = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = op+"led.setbrightness("+ flag+")\n";
    return code;
};

Blockly.Python.actuator_onboard_neopixel_write=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var code= 'onboard_rgb.write()\n';   
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb['+value_led+'] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_all=function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.fill(('+value_rvalue+', '+value_gvalue+', '+value_bvalue+'))\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_all_chase = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.color_chase('+value_rvalue+', '+value_gvalue+', '+value_bvalue+', '+number_time+')\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_all_rainbow = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.rainbow_cycle('+number_time+')\n';
  return code;
};



Blockly.Python.rm_motor=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_rm_e1_motor'+wheel] = 'from rm_e1 import motor'+wheel;
    var v = this.getFieldValue('direction');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "motor"+wheel+'.motion("'+ v + '",' + speed+")\n";
    return code;
};
