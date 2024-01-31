'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.forBlock['servo_init'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_board'] = 'import board';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = v+' = servo.Servo(board.'+dropdown_pin+')\n';
  return code;
};

Blockly.Python.forBlock['servo_move'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo_write_angle('+dropdown_pin+','+value_degree+')\n';
  return code;
};


Blockly.Python.forBlock['servo_speed_360'] = function() {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(this, 'SPEED', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.set_speed('+speed+')\n';
  return code;
};

Blockly.Python.forBlock['servo_set_angle'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo180_angle('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.forBlock['servo_set_speed'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo360_speed('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.forBlock['servo_get_angle'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo180_angle('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['servo_get_speed'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo360_speed('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['actuator_ms32006_init'] = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var address =this.getFieldValue('mode')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var sub1 =Blockly.Python.valueToCode(this, 'SUB1',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'=ms32006.MS32006('+ sub1+',addr='+ address +')\n';
    return code;
};

Blockly.Python.forBlock['actuator_ms32006_dcmotor'] = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.dc_motor('+ direction+','+ speed +')\n';
    return code;
};

Blockly.Python.forBlock['actuator_ms32006_stepper'] = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var mode =this.getFieldValue('mode')
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var steps =Blockly.Python.valueToCode(this, 'steps',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.move('+ mode+','+ direction+','+ speed +','+ steps +')\n';
    return code;
};

Blockly.Python.forBlock['esp32_music_pitch_init'] = function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_music'] = 'import music';
    var code = v + ' = music.MIDI('+dropdown_rgbpin+')\n';
    return code;
};

Blockly.Python.forBlock['esp32_music_pitch'] = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.pitch('  + number_pitch + ')\n';
  return code;
};

Blockly.Python.forBlock['esp32_music_pitch_with_time'] = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.pitch_time(' +   number_pitch+ ', ' + number_time + ')\n';
  return code;
};

Blockly.Python.forBlock['esp32_music_stop'] = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.stop('+')\n';
  return code;
};

Blockly.Python.forBlock['esp32_music_set_tempo_extern'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".set_tempo("+ ticks +", "+ bpm +")\n";
    return code;
};

Blockly.Python.forBlock['esp32_music_get_tempo_extern'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code =  v+".get_tempo()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['esp32_music_play_list'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v+".play("+ v+'.'+lst +")\n";
    return code;
};

Blockly.Python.forBlock['esp32_music_reset_extern'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    return v+".reset()\n";
};

Blockly.Python.forBlock['servo_move'] = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo_write_angle('+dropdown_pin+','+value_degree+')\n';
  return code;
};

Blockly.Python.forBlock['actuator_extern_led_bright'] = function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);    
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.LED(" + pin + ").setonoff("+bright+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_extern_get_led_bright'] = function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin +").getbrightness("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['actuator_extern_get_led_state'] = function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin +").getonoff("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['actuator_extern_led_brightness'] = function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.LED(' + pin +').setbrightness('+flag+')\n';
    return code;
};

Blockly.Python.forBlock['actuator_neopixel_init'] = function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
   Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin('+dropdown_rgbpin+'), '+value_ledcount+')\n';
    return code;
};

Blockly.Python.forBlock['actuator_neopixel_rgb_all'] = function(){
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= v+'.fill(('+value_rvalue+', '+value_gvalue+', '+value_bvalue+'))\n';
  return code;
};

Blockly.Python.forBlock['actuator_neopixel_write'] = function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code= v + '.write()\n';   
  return code;
};
Blockly.Python.forBlock['actuator_neopixel_rgb'] = function(){
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

Blockly.Python.forBlock['actuator_use_uart_init'] = function(){
  Blockly.Python.definitions_['import_syn6288'] = 'import syn6288';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=syn6288.SYN6288(' + key +')\n';    
    return code;
};

Blockly.Python.forBlock['syn6288_set_voice'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var voice = Blockly.Python.valueToCode(this, 'VOICE', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".volume("+ voice +")\n";
    return code;
};

Blockly.Python.forBlock['syn6288_get_voice'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code =  v+".volume()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['syn6288_builtin_voice'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = Blockly.Python.valueToCode(this, 'VOICE', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".hint_tones("+ voice +',blocking='+ mode +")\n";
    return code;
};

Blockly.Python.forBlock['syn6288_tts_play'] = function(){
    Blockly.Python.definitions_['import_music'] = 'import music';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = Blockly.Python.valueToCode(this, 'VOICE', Blockly.Python.ORDER_ASSIGNMENT);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".synthesis("+ data + ',music='+ voice +',blocking='+ mode +")\n";
    return code;
};

//mixbot extern below:
Blockly.Python.forBlock['mixbot_addr_extern'] = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['robot_motor_extern'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_motor'] = 'from mixbot_ext import ext_motor';    
    var code = 'ext_motor.run('+ mode + ',' + speed +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_motor']='ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
    var code = 'ext_motor_left.run(0,'+ speed +')\n';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_motor']='ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
    var code = 'ext_motor_right.run(0,'+ speed +')\n';
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_motor_extern_get_speed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version=='mixbot'){
    var code = 'ext_motor.run('+ mode +")";
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_motor']='ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
    var code = 'ext_motor_left.run()';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_motor']='ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
    var code = 'ext_motor_right.run()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['robot_traffic_light_extern'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var light = this.getFieldValue('light');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_traffic'] = 'from mixbot_ext import ext_traffic';
    var mode = this.getFieldValue('mode');
    var light = this.getFieldValue('light');
    var code = 'ext_traffic.led('+ mode + ',';
    if (light=='0' || light=='1' || light=='2'){code+='0'+ ','} 
    else if (light=='3' || light=='4'){code+='1'+ ','} 
    else if (light=='5' || light=='6'){code+='2'+ ','} 
    if (light =='0'){code+='0'}   
    else if (light=='1' || light=='3' || light=='5'){code+='1'} 
    else if (light=='2' || light=='4' || light=='6'){code+='-1'} 
    code+=")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_traffic']='ext_traffic_left = i2cdevice.Traffic_LED(ext_i2c_left)';
    var code = 'ext_traffic_left.led(0,';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_traffic']='ext_traffic_right = i2cdevice.Traffic_LED(ext_i2c_right)';
    var code = 'ext_traffic_right.led(0,';
    }
    if (light=='0' || light=='1' || light=='2'){code+='0'+ ','} 
    else if (light=='3' || light=='4'){code+='1'+ ','} 
    else if (light=='5' || light=='6'){code+='2'+ ','} 
    if (light =='0'){code+='0'}   
    else if (light=='1' || light=='3' || light=='5'){code+='1'} 
    else if (light=='2' || light=='4' || light=='6'){code+='-1'} 
    code+=")\n";
    return code;
    }
};

Blockly.Python.forBlock['robot_led_extern'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');  
    var value = Blockly.Python.valueToCode(this, 'value', Blockly.Python.ORDER_ATOMIC);
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_'+color+'_LED'] = 'from mixbot_ext import '+color+'_LED';    
    var code = color+'_LED.brightness('+ mode + ',' + value +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_'+ color +'_LED']='ext_'+color+'_LED_left = i2cdevice.'+color+'_LED(ext_i2c_left)';
    var code = 'ext_'+color+'_LED_left.brightness('+  '0,' + value +")\n";
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_'+color+'_LED']='ext_'+color+'_LED_right = i2cdevice.'+color+'_LED(ext_i2c_right)';
    var code = 'ext_'+color+'_LED_right.brightness('+  '0,' + value +")\n";
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_led_extern_get_value'] = function(){
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_'+color+'_LED'] = 'from mixbot_ext import '+color+'_LED';
    var code = color+'_LED.brightness('+ mode +")";
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_'+ color +'_LED']='ext_'+color+'_LED_left = i2cdevice.'+color+'_LED(ext_i2c_left)';
    var code = 'ext_'+color+'_LED_left.brightness(0)';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_'+color+'_LED']='ext_'+color+'_LED_right = i2cdevice.'+color+'_LED(ext_i2c_right)';
    var code = 'ext_'+color+'_LED_right.brightness(0)';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['robot_servo_extern_get_status'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
    var code = 'ext_servo.state('+ mode +")"+status;
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.state(0)'+status;
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.state(0)'+status;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['robot_servo_extern_stop_mode'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';    
    var code = 'ext_servo.stop_mode('+ mode+ "," + status +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.stop_mode('+ "0," + status +")\n";
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.stop_mode('+ "0," + status +")\n";
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_servo_extern_stop'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';    
    var code = 'ext_servo.stop('+ mode +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.stop(0)\n';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.stop(0)\n';
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_servo_extern_absolute_run'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]    
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    var angle = Blockly.Python.valueToCode(this, 'angle', Blockly.Python.ORDER_ATOMIC);
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
    var code = 'ext_servo.absolute_run('+ mode+ "," + status+ ","+ speed + "," + direction + "," +angle +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.absolute_run('+ "0," + status+ ","+ speed + "," + direction + "," +angle +")\n";
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.absolute_run('+ "0," + status+ ","+ speed + "," + direction + "," +angle +")\n";
    }
    return code;
    }

};

Blockly.Python.forBlock['robot_servo_extern_relative_origin'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';    
    var code = 'ext_servo.relative_origin('+ mode +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.relative_origin(0)\n';
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.relative_origin(0)\n';
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_servo_extern_relative_run'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]    
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var angle = Blockly.Python.valueToCode(this, 'angle', Blockly.Python.ORDER_ATOMIC);
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
    var code = 'ext_servo.relative_run('+ mode+ "," + status+ ","+ speed + ","  +angle +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.relative_run('+ "0," + status+ ","+ speed + ","  +angle +")\n";
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.relative_run('+ "0," + status+ ","+ speed + ","  +angle +")\n";
    }
    return code;
    }
};

Blockly.Python.forBlock['robot_servo_extern_relative_continue'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]    
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
    var code = 'ext_servo.relative_continue('+ mode+ "," + status+ ","+ speed + ","  +direction +")\n";
    return code;
    }
    else if (version=='feiyi'){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
    if(mode=="0"){
    Blockly.Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
    Blockly.Python.definitions_['import_left_servo']='ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
    var code = 'ext_servo_left.relative_continue('+ "0," + status+ ","+ speed + ","  +direction +")\n";
    }
    else if(mode=="1"){
    Blockly.Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
    Blockly.Python.definitions_['import_right_servo']='ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
    var code = 'ext_servo_right.relative_continue('+ "0," + status+ ","+ speed + ","  +direction +")\n";
    }
    return code;
    }
};

Blockly.Python.forBlock['mixbot_actuator_extern_get_addr'] = function(){
    var name = this.getFieldValue('name');    
    Blockly.Python.definitions_['import_mixbot_ext_'+name] = 'from mixbot_ext import '+name;
    var code = name+'.addr_get()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['mixbot_actuator_extern_set_addr'] = function(){
    var name = this.getFieldValue('name');    
    Blockly.Python.definitions_['import_mixbot_ext_'+name] = 'from mixbot_ext import '+name;
    var oldaddr = Blockly.Python.valueToCode(this, 'old', Blockly.Python.ORDER_ATOMIC);
    var newaddr = Blockly.Python.valueToCode(this, 'new', Blockly.Python.ORDER_ATOMIC);
    var code = name+'.addr_set('+oldaddr+','+newaddr+')\n';
    return code;
};