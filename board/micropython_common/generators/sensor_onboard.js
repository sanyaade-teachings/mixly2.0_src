'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python.sensor_mixgo_button_is_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgo_button_was_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_get_presses = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =   version + '.'+btn + '.get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var dropdown_btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};
//ok
Blockly.Python.sensor_mixgocar42_button_is_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code =  version + '.' + 'button.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgocar42_button_was_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code =  version + '.'+ 'button.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgocar42_button_get_presses = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =   version + '.' + 'button.get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgocar42_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'  + 'button.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

Blockly.Python.HCSR04 = function () {
    Blockly.Python.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}



Blockly.Python.sensor_mixgo_light= function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo"){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.get_brightness()', Blockly.Python.ORDER_ATOMIC];
    }
    else if (version == "mixgo_ce"){
    Blockly.Python.definitions_['import_mixgo_ce'] = 'import mixgo_ce';
    return ['mixgo_ce.get_brightness()', Blockly.Python.ORDER_ATOMIC];
    }
    else if(version == "mpython"){
    Blockly.Python.definitions_['import_mpython_onboard_light'] = 'from mpython import onboard_light';
    return ['onboard_light.brightness()', Blockly.Python.ORDER_ATOMIC];
    }
    else{return ['', Blockly.Python.ORDER_ATOMIC];}
    
};

Blockly.Python.sensor_mixgo_sound= function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo"){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.get_soundlevel()', Blockly.Python.ORDER_ATOMIC];
    }
    else if(version == "mpython"){
    Blockly.Python.definitions_['import_mpython_onboard_sound'] = 'from mpython import onboard_sound';
    return ['onboard_sound.soundlevel()', Blockly.Python.ORDER_ATOMIC];
    }
    else{return ['', Blockly.Python.ORDER_ATOMIC];}
};


Blockly.Python.number1 = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.number2 = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_near = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_ltr553als'] = "from "+version+" import onboard_ltr553als";
    var code = 'onboard_ltr553als.ps_nl()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_near_double = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var direction = this.getFieldValue('direction');
    var code = version+'.'+'infrared_'+ direction +'()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_ds18x20=function(){
    Blockly.Python.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code ='ds18x20x.get_ds18x20_temperature('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_lm35 = function() {
  Blockly.Python.definitions_['import_lm35'] = 'import lm35';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'lm35.get_LM35_temperature(' + dropdown_pin + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_LTR308 = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_ltr553als'] = "from "+version+" import onboard_ltr553als";
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_ltr553als.als_vis()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sound = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_sound'] = 'from '+version+' import onboard_sound';
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_sound.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_hp203=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_hp203x'] = "from "+version+" import onboard_hp203x";
    var code = 'onboard_hp203x.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_aht11=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_ahtx0'] = "from "+version+" import onboard_ahtx0";
    var code = 'onboard_ahtx0.' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_readid=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code = 'onboard_rc522.read_card(0, x="id")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_readcontent=function(){    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code =  'onboard_rc522.read_card('+sector+', x="content")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_write=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code = 'onboard_rc522.write_card('+cnt+','+sector+')\n';
    return code;
};

Blockly.Python.sensor_get_acceleration = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_mxc6655xa'] = "from "+version+" import onboard_mxc6655xa";
    var key = this.getFieldValue('key');
    var code;
    if (key=='x') {
        code = 'onboard_mxc6655xa.acceleration()[0]';
    }else if (key=='y') {
        code = 'onboard_mxc6655xa.acceleration()[1]';
    }else if (key=='z') {
        code = 'onboard_mxc6655xa.acceleration()[2]';
    }else if (key=='values') {
        code = 'onboard_mxc6655xa.acceleration()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_gesture = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_is_gesture("' + gesture + '")';
    return [code, Blockly.Python.ORDER_ATOMIC];
}


//ok
Blockly.Python.sensor_mpu9250_get_acceleration = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgoce_pin_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = version+'.touched('+pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = version+'.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpython_pin_pressed = function(){
    Blockly.Python.definitions_['import_mpython'] = 'import mpython';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'mpython.touch_'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_adxl345_get_acceleration = function(){
    Blockly.Python.definitions_['import_adxl345'] = 'import adxl345';
    // Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code;
    if (key=='x') {
        code = v + '.readX()';
    }else if (key=='y') {
        code = v + '.readY()';
    }else if (key=='z') {
        code = v + '.readZ()';
    }else if (key=='values') {
        code = v + '.readXYZ()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_get_magnetic = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_magnetic_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_get_gyro = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_gyro_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_calibrate_compass= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    return ''+v+'.calibrate()\n';
};

Blockly.Python.sensor_mpu9250_temperature = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    return [v+'.mpu9250_get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_mpu9250_field_strength= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "compass")
        Blockly.Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';    
    var compass = this.getFieldValue('compass');
    var a;
    if(compass =='strength'){
        a = v+'.get_field_strength()';
    }
    else if(compass =='heading'){
        a = v+'.heading()';
    }
    return [a, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_compass_reset = function(block) {
  Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  return ''+v+'.reset_calibrate()\n';
};

Blockly.Python.sensor_onboard_mpu9250_gesture = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');    
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';    
    var code = 'onboard_mpu.mpu9250_is_gesture("' + gesture + '")';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.sensor_onboard_mpu9250_get_acceleration = function(){    
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_onboard_mpu9250_get_magnetic = function(){    
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu'; 
    var code = 'onboard_mpu.mpu9250_magnetic_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_onboard_mpu9250_get_gyro = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_gyro_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_onboard_mpu9250_calibrate_compass= function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';    
    return ''+'onboard_compass.calibrate()\n';
};

Blockly.Python.sensor_onboard_mpu9250_temperature = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    return ['onboard_mpu.mpu9250_get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_onboard_mpu9250_field_strength= function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';     
    var compass = this.getFieldValue('compass');
    var a;
    if(compass =='strength'){
        a = 'onboard_compass.get_field_strength()';
    }
    else if(compass =='heading'){
        a = 'onboard_compass.heading()';
    }
    return [a, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_onboard_compass_reset = function(block) {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
  return ''+'onboard_compass.reset_calibrate()\n';
};


Blockly.Python.onboard_RTC_set_datetime= function () {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'rtc_clock'] = 'from '+version + ' import rtc_clock';  
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute",Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second",Blockly.Python.ORDER_ASSIGNMENT);
  var week = Blockly.Python.valueToCode(this, "weekday", Blockly.Python.ORDER_ASSIGNMENT);
  var millisecond = Blockly.Python.valueToCode(this, "millisecond",Blockly.Python.ORDER_ASSIGNMENT);
  var code = 'rtc_clock.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.onboard_RTC_get_time = function () {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'rtc_clock'] = 'from '+version + ' import rtc_clock';  
  var code = 'rtc_clock.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixgo_cc onboard_sensor generators:

Blockly.Python.sensor_mixgo_cc_mmc5603_get_magnetic = function(){   
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_mmc5603'] = "from "+version+" import onboard_mmc5603";
    if(key == 'all'){
        var code = 'onboard_mmc5603.getstrength()';
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else{
    var code = 'onboard_mmc5603.getdata()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensor_mixgo_cc_mmc5603_get_angle = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_mmc5603'] = "from "+version+" import onboard_mmc5603";
    var code = 'onboard_mmc5603.getangle()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_cc_mmc5603_calibrate_compass= function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_mmc5603'] = "from "+version+" import onboard_mmc5603";
    var code = 'onboard_mmc5603.calibrate()\n';
    return code;
};
//mixgo_me onboard_sensor generators:




Blockly.Python.sensor_mixgome_temperature=function(){
    Blockly.Python.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    var code = 'onboard_mxc6655xa.temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixgo_ce onboard_sensor generators:
Blockly.Python.sensor_mixgoce_temperature=function(){
    Blockly.Python.definitions_['import_mixgo_ce'] = "import mixgo_ce";
    var code = 'mixgo_ce.get_temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mpython onboard_sensor:
Blockly.Python.sensor_mpython_qmi8658_get_acceleration = function(){    
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.accelerometer()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpython_mmc5603_get_magnetic = function(){   
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getdata()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpython_qmi8658_get_gyro = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.gyroscope()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpython_qmi8658_temperature = function(){
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    return ['motion.temperature()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpython_mmc5603_get_angle = function(){
    Blockly.Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getangle()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_rm_pin_near_double = function(){
    var direction = this.getFieldValue('direction');
    Blockly.Python.definitions_['import_rm_e1_adc'+direction] = 'from rm_e1 import adc'+direction;    
    var code = 'adc'+ direction+'.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_rm_battery_left = function(){
    Blockly.Python.definitions_['import_rm_e1_battery'] = 'from rm_e1 import battery';
    var code =  'battery.voltage()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_rm_acc = function(){    
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rm_e1_gyro'] = 'from rm_e1 import gyro';
    var code = 'gyro.acceleration()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//car4.2
Blockly.Python.sensor_mixgocar_pin_near_line = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.patrol()'+key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgocar_pin_near = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.obstacle()'+key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgocar_pin_near_state_change = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.ir_mode(onboard_info.'+key+')\n';    
    return code;
};

Blockly.Python.sensor_mixgocar_battery_left = function(){
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code =  'onboard_info.read_bat()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_button_is_pressed=Blockly.Python.sensor_mixgo_button_is_pressed;
Blockly.Python.sensor_button_was_pressed=Blockly.Python.sensor_mixgo_button_was_pressed;
Blockly.Python.sensor_button_get_presses=Blockly.Python.sensor_mixgo_button_get_presses;
Blockly.Python.sensor_pin_pressed=Blockly.Python.sensor_mixgo_pin_pressed;
Blockly.Python.sensor_pin_near=Blockly.Python.sensor_mixgo_pin_near;
Blockly.Python.sensor_light=Blockly.Python.sensor_mixgo_light;
//Blockly.Python.sensor_sound=Blockly.Python.sensor_mixgo_sound;
//Blockly.Python.sensor_get_acceleration=Blockly.Python.sensor_mixgo_get_acceleration;
Blockly.Python.dht11=Blockly.Python.sensor_dht11
