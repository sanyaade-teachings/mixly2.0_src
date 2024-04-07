'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.forBlock['esp32_music_set_tempo'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_music.set_tempo("+ ticks +", "+ bpm +")\n";
    return code;
};

Blockly.Python.forBlock['esp32_music_get_tempo'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    var code =  "onboard_music.get_tempo()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['esp32_onboard_music_pitch'] = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_music.pitch(' + number_pitch + ')\n';
  return code;
};

Blockly.Python.forBlock['esp32_onboard_music_pitch_with_time'] = function(block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
    var number_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_spk_midi'] = "from mixgo_zero_voice import spk_midi";   
        var code = 'spk_midi.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    }
    else if (version == 'mixgo_nova') {
        Blockly.Python.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
        var code = 'spk_midi.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    }
    else{
        Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
        var code = 'onboard_music.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    }
  return code;
};

Blockly.Python.forBlock['esp32_onboard_music_stop'] = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
  var code = 'onboard_music.stop('+')\n';
  return code;
};

Blockly.Python.forBlock['esp32_onboard_music_play_list'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_spk_midi'] = "from mixgo_zero_voice import spk_midi";   
        var code = "spk_midi.play("+ lst +")\n";
    }
    else if(version == 'mixgo_nova'){
        Blockly.Python.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
        var code = "spk_midi.play("+ lst +")\n";
    }
    else{
        Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
        var code = "onboard_music.play("+ lst +")\n";
    }
    return code;
};

Blockly.Python.forBlock['esp32_music_reset'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_music'] = 'from '+version+' import onboard_music';
    return "onboard_music.reset()\n";
};

Blockly.Python.forBlock['number'] = function () {
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ledswitch'] = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['actuator_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "onboard_led.setonoff(" + op + ","+ bright+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_get_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var code = "onboard_led.getbrightness(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['actuator_get_led_state'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var code = "onboard_led.getonoff(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['actuator_led_brightness'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_led'] = 'from '+version+' import onboard_led';
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "onboard_led.setbrightness(" + op + ","+ flag+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_zero_led_color'] = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var op = Blockly.Python.valueToCode(this, 'led', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var color = this.getFieldValue('colorvalue');
    var code = "onboard_led.setcolor(" + op + "," + color + ")\n";
    return code;
};

Blockly.Python.forBlock['cc_number'] = function () {
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['rm_actuator_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = op+"led.setonoff(" + bright+")\n";
    return code;
};

Blockly.Python.forBlock['rm_actuator_get_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var code = op+"led.getbrightness()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['rm_actuator_get_led_state'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var code = op+"led.getonoff()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['rm_actuator_led_brightness'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var op = this.getFieldValue('color');
    Blockly.Python.definitions_['import_'+version+'_'+op+'led'] = 'from '+version+' import '+op+'led';
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = op+"led.setbrightness("+ flag+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_onboard_neopixel_write'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var code= 'onboard_rgb.write()\n';   
  return code;
};

Blockly.Python.forBlock['actuator_onboard_neopixel_rgb'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb['+value_led+'] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};

Blockly.Python.forBlock['actuator_onboard_neopixel_rgb_all'] = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.fill(('+value_rvalue+', '+value_gvalue+', '+value_bvalue+'))\n';
  return code;
};

Blockly.Python.forBlock['actuator_onboard_neopixel_rgb_show_all_chase'] = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.color_chase('+value_rvalue+', '+value_gvalue+', '+value_bvalue+', '+number_time+')\n';
  return code;
};

Blockly.Python.forBlock['actuator_onboard_neopixel_rgb_show_all_rainbow'] = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version+'_onboard_rgb'] = 'from '+version+' import onboard_rgb';
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'onboard_rgb.rainbow_cycle('+number_time+')\n';
  return code;
};



Blockly.Python.forBlock['rm_motor'] = function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_rm_e1_motor'+wheel] = 'from rm_e1 import motor'+wheel;
    var v = this.getFieldValue('direction');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "motor"+wheel+'.motion("'+ v + '",' + speed+")\n";
    return code;
};

//c3 motor onboard
Blockly.Python.forBlock['actuator_stepper_keep'] = function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'car.motor_move("'+v+'",'+ speed +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_stepper_stop'] = function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var code = 'car.motor_move("'+v+'"' +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_dc_motor'] = function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO_"+wheel+',"'+v+'",'+speed+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_dc_motor_stop'] = function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var code = "car.motor(car.MOTO_"+wheel+',"'+v+'"'+")\n";
    return code;
};

//mixbot onboard_motor below:

Blockly.Python.forBlock['mixbot_motor_status'] = function(){
    Blockly.Python.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var code =  'motor.status()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['mixbot_move'] = function(){
    var v = this.getFieldValue('VAR');
    var mode = this.getFieldValue('mode');
    Blockly.Python.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'motor.move("'+ v + '",motor.' + mode + '_MODE,' + speed +")\n";
    return code;
};

Blockly.Python.forBlock['mixbot_stop'] = function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    if(v=='N'){
        var code = 'motor.move("N",motor.STOP_MODE)\n'
    }
    if(v=='P'){
        var code = 'motor.move("P",motor.BRAKE_MODE)\n'
    }
    return code;
};

Blockly.Python.forBlock['mixbot_motor'] = function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var mode = this.getFieldValue('mode');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = 'motor.run('+ wheel + ',motor.' + mode + '_MODE,' + speed +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixbot_buzzer_on_off'] = function () {var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version+'_spk_en'] = 'from '+version+' import spk_en';
    var op = this.getFieldValue('on_off');
    var code = "spk_en.value("+op+")\n";
    return code;
};

//bitbot onboard_motor below:
Blockly.Python.forBlock['bitbot_move'] = function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'onboard_bot51.move("'+ v +'",' + speed +")\n";
    return code;
};

Blockly.Python.forBlock['bitbot_stop'] = function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var code = 'onboard_bot51.move("'+ v +'"'+")\n";
    return code;
};

Blockly.Python.forBlock['bitbot_motor'] = function(){
    var wheel = this.getFieldValue('wheel');
    var direction = this.getFieldValue('direction');
    Blockly.Python.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_bot51.motor('+ wheel + ',"' + direction + '",' + speed +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_mic_set'] = function() {    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }
    
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "ob_code.mic_volume(" + bright+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_mic_get'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    } 
    var code = "ob_code.mic_volume()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['actuator_mixgo_nova_voice_set'] = function() {    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "ob_code.voice_volume(" + bright+")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_voice_get'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }   
    var code = "ob_code.voice_volume()";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['actuator_mixgo_nova_record_audio'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_record_audio'] = "from mixgo_zero_voice import record_audio";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_record_audio'] = "from mixgo_nova_voice import record_audio";
    }
    var path = Blockly.Python.valueToCode(this, 'PATH', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'TIME', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "record_audio("+ path +", "+ time +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_play_audio'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_play_audio'] = "from mixgo_zero_voice import play_audio";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_play_audio'] = "from mixgo_nova_voice import play_audio";
    }
    var path = Blockly.Python.valueToCode(this, 'PATH', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "play_audio("+ path +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_play_online_audio'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='mixgo_zero'){
        Blockly.Python.definitions_['import_mixgo_zero_voice_play_audio_url'] = "from mixgo_zero_voice import play_audio_url";   
    }
    else{
        Blockly.Python.definitions_['import_mixgo_nova_voice_play_audio_url'] = "from mixgo_nova_voice import play_audio_url";
    }
    var path = Blockly.Python.valueToCode(this, 'PATH', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "play_audio_url("+ path +")\n";
    return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_onboard_music_pitch'] = function(block) {
  Blockly.Python.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = 'spk_midi.pitch(' + number_pitch + ')\n';
  return code;
};

Blockly.Python.forBlock['actuator_mixgo_nova_onboard_music_stop'] = function(block) {
  Blockly.Python.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
  var code = 'spk_midi.stop('+')\n';
  return code;
};
