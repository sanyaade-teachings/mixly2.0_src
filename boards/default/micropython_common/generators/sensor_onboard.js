'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python.forBlock['sensor_mixgo_button_is_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.forBlock['sensor_mixgo_button_was_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_button_get_presses'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =   version + '.'+btn + '.get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_button_attachInterrupt'] = function () {
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
Blockly.Python.forBlock['sensor_mixgocar42_button_is_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code =  version + '.' + 'button.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.forBlock['sensor_mixgocar42_button_was_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code =  version + '.'+ 'button.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgocar42_button_get_presses'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =   version + '.' + 'button.get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgocar42_button_attachInterrupt'] = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'  + 'button.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

Blockly.Python.forBlock['HCSR04'] = function () {
    Blockly.Python.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}



Blockly.Python.forBlock['sensor_mixgo_light'] = function(){
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

Blockly.Python.forBlock['sensor_mixgo_sound'] = function(){
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


Blockly.Python.forBlock['number1'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number2'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number3'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number4'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number5'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number6'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['number7'] = function(){
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_pin_near_single'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_als'] = "from "+version+" import onboard_als";
    var code = 'onboard_als.ps_nl()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_pin_near_double'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var direction = this.getFieldValue('direction');
    var code = version+'.'+'infrared_'+ direction +'()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_nova_pin_near'] =Blockly.Python.forBlock['sensor_mixgo_pin_near'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var direction = this.getFieldValue('direction');
    Blockly.Python.definitions_['import_'+version+'_'+direction] = 'from '+version+' import onboard_als_'+direction;
    var code = 'onboard_als_'+direction +'.ps_nl()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_nova_LTR308'] =Blockly.Python.forBlock['sensor_mixgo_LTR308'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var direction = this.getFieldValue('direction');
    Blockly.Python.definitions_['import_'+version+'_'+direction] = 'from '+version+' import onboard_als_'+direction;
    var code = 'onboard_als_'+direction +'.als_vis()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_ds18x20'] = function(){
    Blockly.Python.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code ='ds18x20x.get_ds18x20_temperature('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_lm35'] = function() {
  Blockly.Python.definitions_['import_lm35'] = 'import lm35';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'lm35.get_LM35_temperature(' + dropdown_pin + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_LTR308'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_als'] = "from "+version+" import onboard_als";
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_als.als_vis()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_sound'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version=='mixbot'){
    Blockly.Python.definitions_['import_'+version+'_sound'] = 'from '+version+' import sound';
    var code =  'sound.loudness()';
    }
    else{
    Blockly.Python.definitions_['import_'+version+'_onboard_sound'] = 'from '+version+' import onboard_sound';
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_sound.read()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_hp203'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_' + version + '_onboard_bps'] = "from " + version + " import onboard_bps";
    var code = 'onboard_bps.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_aht11'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    if (version == 'mixgo_nova' || version == 'mixgo_zero') {
        Blockly.Python.definitions_['import_' + version + '_onboard_ths'] = "from " + version + " import onboard_ths";
        var code = 'onboard_ths.' + key + '()';
    } else{
        Blockly.Python.definitions_['import_'+version+'_onboard_ths'] = "from "+version+" import onboard_ths";
        var code = 'onboard_ths.' + key + '()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_get_temperature'] = function(){
    Blockly.Python.definitions_['import_feiyi_onboard_acc'] = 'from feiyi import _onboard_acc';
    return ['onboard_acc.temperature()', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['rfid_readid'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
	var code = 'onboard_rfid.read_card(0, x="id")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['rfid_readcontent'] = function(){    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.read_card(' + sector + ', x="content")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['rfid_write'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.write_card(' + cnt + ',' + sector + ')\n';
    return code;
};

Blockly.Python.forBlock['rfid_write_return'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.write_card(' + cnt + ',' + sector + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_get_acceleration'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    if (key=='strength'){
        if (version=='mixbot'){
        Blockly.Python.definitions_['import_'+version+'_acc_gyr'] = 'from '+version+' import acc_gyr';
        var code = 'acc_gyr.strength()';
    }
    else{
        Blockly.Python.definitions_['import_'+version+'_onboard_acc'] = "from "+version+" import onboard_acc";
        var code = 'onboard_acc.strength()';
    }  
    return [code, Blockly.Python.ORDER_ATOMIC];     
    }
    else{
    if (version=='mixbot'){
        Blockly.Python.definitions_['import_'+version+'_acc_gyr'] = 'from '+version+' import acc_gyr';
        var code = 'acc_gyr.accelerometer()' + key ;
    }
    else { 
        Blockly.Python.definitions_['import_' + version + '_onboard_acc'] = "from " + version + " import onboard_acc";
        var code = 'onboard_acc.acceleration()' + key;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['sensor_eulerangles'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_acc'] = "from "+version+" import onboard_acc";
    var angle = this.getFieldValue('angle');
    var code = 'onboard_acc.eulerangles()'+angle;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpu9250_gesture'] = function(){
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
Blockly.Python.forBlock['sensor_mpu9250_get_acceleration'] = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgoce_pin_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = version+'.touched('+pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_touch_slide'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var code = version+'.touch_slide(3,4)';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_pin_pressed'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = version+'.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpython_pin_pressed'] = function(){
    Blockly.Python.definitions_['import_mpython'] = 'import mpython';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'mpython.touch_'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_adxl345_get_acceleration'] = function(){
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

Blockly.Python.forBlock['sensor_mpu9250_get_magnetic'] = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_magnetic_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpu9250_get_gyro'] = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    var code = v+'.mpu9250_gyro_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpu9250_calibrate_compass'] = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    return ''+v+'.calibrate()\n';
};

Blockly.Python.forBlock['sensor_mpu9250_temperature'] = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    return [v+'.mpu9250_get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.forBlock['sensor_mpu9250_field_strength'] = function(){
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

Blockly.Python.forBlock['sensor_compass_reset'] = function(block) {
  Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  return ''+v+'.reset_calibrate()\n';
};

Blockly.Python.forBlock['sensor_onboard_mpu9250_gesture'] = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');    
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';    
    var code = 'onboard_mpu.mpu9250_is_gesture("' + gesture + '")';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['sensor_onboard_mpu9250_get_acceleration'] = function(){    
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_onboard_mpu9250_get_magnetic'] = function(){    
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu'; 
    var code = 'onboard_mpu.mpu9250_magnetic_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_onboard_mpu9250_get_gyro'] = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_gyro_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_onboard_mpu9250_calibrate_compass'] = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';    
    return ''+'onboard_compass.calibrate()\n';
};

Blockly.Python.forBlock['sensor_onboard_mpu9250_temperature'] = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    return ['onboard_mpu.mpu9250_get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.forBlock['sensor_onboard_mpu9250_field_strength'] = function(){
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

Blockly.Python.forBlock['sensor_onboard_compass_reset'] = function(block) {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
  return ''+'onboard_compass.reset_calibrate()\n';
};


Blockly.Python.forBlock['onboard_RTC_set_datetime'] = function () {
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

Blockly.Python.forBlock['onboard_RTC_settime_string'] = function(){
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_ntptime'] = "import ntptime";
    var code = 'ntptime.settime('+cnt+')\n';
    return code;
};

Blockly.Python.forBlock['onboard_RTC_get_time'] = function () {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'rtc_clock'] = 'from '+version + ' import rtc_clock';  
  var code = 'rtc_clock.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['onboard_RTC_get_timestamp'] = function(){
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'rtc_clock'] = 'from '+version + ' import rtc_clock';  
    Blockly.Python.definitions_['import_time'] = 'import time';  
    var time = Blockly.Python.valueToCode(this, 'LIST',Blockly.Python.ORDER_ATOMIC);
    var code = 'time.mktime(' + time + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['onboard_RTC_timestamp_totuple'] = function () {
   var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'rtc_clock'] = 'from '+version + ' import rtc_clock';  
    Blockly.Python.definitions_['import_time'] = 'import time';
    var ts = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = 'time.localtime(' + ts + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixgo_cc onboard_sensor generators:

Blockly.Python.forBlock['sensor_mixgo_cc_mmc5603_get_magnetic'] = function(){   
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(key == 'all'){
        Blockly.Python.definitions_['import_'+version+'onboard_mgs'] = "from "+version+" import onboard_mgs";
        var code = 'onboard_mgs.getstrength()';
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else{
        Blockly.Python.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
        var code = 'onboard_mgs.getdata()' + key;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['sensor_mixgo_cc_mmc5603_get_angle'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
    var code = 'onboard_mgs.getangle()'; 
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_cc_mmc5603_calibrate_compass'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
    var code = 'onboard_mgs.calibrate()\n';
    return code;
};
//mixgo_me onboard_sensor generators:




Blockly.Python.forBlock['sensor_mixgome_temperature'] = function(){
    Blockly.Python.definitions_['import_mixgo_me_onboard_acc'] = "from mixgo_me import onboard_acc";
    var code = 'onboard_acc.temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixgo_ce onboard_sensor generators:
Blockly.Python.forBlock['sensor_mixgoce_temperature'] = function(){
    Blockly.Python.definitions_['import_mixgo_ce'] = "import mixgo_ce";
    var code = 'mixgo_ce.get_temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mpython onboard_sensor:
Blockly.Python.forBlock['sensor_mpython_qmi8658_get_acceleration'] = function(){    
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.accelerometer()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpython_mmc5603_get_magnetic'] = function(){   
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getdata()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpython_qmi8658_get_gyro'] = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.gyroscope()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpython_qmi8658_temperature'] = function(){
    Blockly.Python.definitions_['import_mpython_motion'] = 'from mpython import motion';
    return ['motion.temperature()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mpython_mmc5603_get_angle'] = function(){
    Blockly.Python.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
    var code = 'magnetic.getangle()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_rm_pin_near_double'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        var direction = this.getFieldValue('direction');
    Blockly.Python.definitions_['import_'+version+'_adc'+direction] = 'from '+version+' import adc'+direction;    
    var code = 'adc'+ direction+'.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_rm_battery_left'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version=='feiyi'){
        Blockly.Python.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
        var code =  'onboard_bot51.read_bat()';
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    else{
        Blockly.Python.definitions_['import_'+version+'_battery'] = 'from '+version+' import battery';
    var code =  'battery.voltage()';
    return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.forBlock['sensor_rm_acc'] = function(){    
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rm_e1_gyro'] = 'from rm_e1 import gyro';
    var code = 'gyro.acceleration()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//car4.2
Blockly.Python.forBlock['sensor_mixgocar_pin_near_line'] = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.patrol()'+key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgocar_pin_near'] = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.obstacle()'+key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgocar_pin_near_state_change'] = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.ir_mode(onboard_info.'+key+')\n';    
    return code;
};

Blockly.Python.forBlock['sensor_mixgocar_battery_left'] = function(){
    Blockly.Python.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code =  'onboard_info.read_bat()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixbot onboard_sensor below:


Blockly.Python.forBlock['sensor_mixbot_patrol_calibrate'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version+'_patrol'] = 'from '+version+' import patrol';
    var code = 'patrol.correct(patrol.CORRECTING_' + key + ')\n';    
    return code;
};

Blockly.Python.forBlock['sensor_mixbot_patrol_value'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Blockly.Python.definitions_['import_'+version+'_patrol'] = 'from '+version+' import patrol';
    var code = 'patrol.getdata()'+key+'';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixbot_temperature'] = function(){
    Blockly.Python.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['sensor_mixbot_get_gyro'] = function(){
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.gyroscope()' + key ;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_bitbot_LTR308'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_als'] = "from "+version+" import onboard_als";
    var code = 'onboard_als.als_vis()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_bitbot_ALS'] = function(){
    Blockly.Python.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var mode = Blockly.Python.valueToCode(this, 'mode', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_bot51.'+'read_als('+mode+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['bitbot_als_num'] = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sensor_mixgo_nova_sound'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        Blockly.Python.definitions_['import_mixgo_zero_voice_sound_level'] = "from mixgo_zero_voice import sound_level";
    } 
    else {
        Blockly.Python.definitions_['import_mixgo_nova_voice_sound_level'] = "from mixgo_nova_voice import sound_level";
    }
    var code = 'sound_level()';
    return [code, Blockly.Python.ORDER_ATOMIC];  
};

Blockly.Python.forBlock.sensor_button_is_pressed=Blockly.Python.forBlock.sensor_mixgo_button_is_pressed;
Blockly.Python.forBlock.sensor_button_was_pressed=Blockly.Python.forBlock.sensor_mixgo_button_was_pressed;
Blockly.Python.forBlock.sensor_button_get_presses=Blockly.Python.forBlock.sensor_mixgo_button_get_presses;
Blockly.Python.forBlock.sensor_pin_pressed=Blockly.Python.forBlock.sensor_mixgo_pin_pressed;
Blockly.Python.forBlock.sensor_pin_near=Blockly.Python.forBlock.sensor_mixgo_pin_near;
Blockly.Python.forBlock.sensor_light=Blockly.Python.forBlock.sensor_mixgo_light;
//Blockly.Python.forBlock.sensor_sound=Blockly.Python.forBlock.sensor_mixgo_sound;
//Blockly.Python.forBlock.sensor_get_acceleration=Blockly.Python.forBlock.sensor_mixgo_get_acceleration;
Blockly.Python.forBlock.dht11=Blockly.Python.forBlock.sensor_dht11
