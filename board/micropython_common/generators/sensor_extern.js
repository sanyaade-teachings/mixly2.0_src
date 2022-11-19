'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python.sensor_mixgo_extern_button_is_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.Button('+pin + ').is_pressed(' + dropdown_stat + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgo_extern_button_was_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.Button('+pin + ').was_pressed(' + dropdown_stat + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_button_get_presses = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =  'mixgo.Button('+pin + ').get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.Button('+pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

Blockly.Python.sensor_mpu9250_attachGestureInterrupt = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if '+v+'.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}




Blockly.Python.sensor_distance_hrsc04= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    Blockly.Python.setups_['class_hrsc04'] =
    'class HCSR04:\n'+
    '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n'+
    '        self.trigger_pin = tpin\n'+
    '        self.echo_pin = epin\n'+
    '        self.sclk_pin = spin\n'+
    '\n'+
    '    def distance_mm(self):\n'+
    '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n'+
    '                 mosi=self.trigger_pin, miso=self.echo_pin)\n'+
    '        pre = 0\n'+
    '        post = 0\n'+
    '        k = -1\n'+
    '        length = 500\n'+
    '        resp = bytearray(length)\n'+
    '        resp[0] = 0xFF\n'+
    '        spi.write_readinto(resp, resp)\n'+
    '        # find first non zero value\n'+
    '        try:\n'+
    '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n'+
    '        except StopIteration:\n'+
    '            i = -1\n'+
    '        if i > 0:\n'+
    '            pre = bin(value).count("1")\n'+
    '            # find first non full high value afterwards\n'+
    '            try:\n'+
    '                k, value = next((ind, v)\n'+
    '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n'+
    '                post = bin(value).count("1") if k else 0\n'+
    '                k = k + i\n'+
    '            except StopIteration:\n'+
    '                i = -1\n'+
    '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n'+
    '        return dist\n'+
    '\n'+
    'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.RTC_set_datetime= function () {
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
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);  
  var code = v+'.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.RTC_get_time = function () {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  if (v == "rtc")
    Blockly.Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';  
  var code = v+'.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.RTC_set_time = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute", Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second", Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Hour('+hour+'))+ str(ds.Minute('+minute+')) +str(ds.Second('+second+'))\n';
  return code;
};

Blockly.Python.RTC_set_date = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Year('+year+'))+ str(ds.Month('+month+')) +str(ds.Day('+day+'))\n';
  return code;
};



Blockly.Python.sensor_mixgo_extern_light= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.get_brightness(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_sound= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.get_soundlevel(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_mixgo_extern_pin_near = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.'+'infrared_'+ direction +'.near()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_rtc_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
};

Blockly.Python.sensor_bmp=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sht=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};


//pe
Blockly.Python.sensor_use_i2c_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key=='MPU9250') {
      Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
       code = v + ' = mpu9250.' + key + "("+ iv+ ')\n';
    }else if (key=='BMP280') {
      Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
      code = v + ' = bmp280.' + key + "("+ iv+ ')\n';
    }else if (key=='SHT20') {
      Blockly.Python.definitions_['import_sht20'] = 'import sht20';
      code = v + ' = sht20.' + key + "("+ iv+ ')\n';
    }else if (key=='ADXL345') {
      Blockly.Python.definitions_['import_adxl345'] = 'import adxl345';
      code = v + ' = adxl345.' + key + "("+ iv+ ')\n';
    }
    else if (key=='LTR308') {
      Blockly.Python.definitions_['import_ltr308al'] = 'import ltr308al';
       code = v + ' = ltr308al.LTR_308ALS('+ iv+ ')\n';
    }else if (key=='HP203X') {
      Blockly.Python.definitions_['import_hp203x'] = 'import hp203x';
      code = v + ' = hp203x.HP203X('+ iv+ ')\n';
    }else if (key=='SHTC3') {
      Blockly.Python.definitions_['import_shtc3'] = 'import shtc3';
      code = v + ' = shtc3.' + key + "("+ iv+ ')\n';
    }else if (key=='AHT21') {
      Blockly.Python.definitions_['import_ahtx0'] = 'import ahtx0';
      code = v + ' = ahtx0.AHTx0('+ iv+ ')\n';
    }
    else if (key=='VL53L0X') {
      Blockly.Python.definitions_['import_vl53l0x'] = 'import vl53l0x';
      code = v + ' = vl53l0x.' + key + "("+ iv+ ')\n';
    }
    else if (key=='QMC5883L') {
      Blockly.Python.definitions_['import_qmc5883l'] = 'import qmc5883l';
      code = v + ' = qmc5883l.Compass('+ iv+ ')\n';
    }
    else if (key=='MAX30102') {
      Blockly.Python.definitions_['import_max30102'] = 'import max30102';
      code = v + ' = max30102.MAX30102('+ iv+ ')\n';
    }
    else if (key=='APDS9960') {
      Blockly.Python.definitions_['import_apds9960'] = 'import apds9960';
      code = v + ' = apds9960.APDS9960('+ iv+ ')\n';
    }
    return code;
};

Blockly.Python.sensor_MAX30102_extern = function(){
    Blockly.Python.definitions_['import_max30102'] = 'import max30102';
    var key = this.getFieldValue('key');
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = sub + '.heartrate()'+key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_APDS9960_extern = function(){
    Blockly.Python.definitions_['import_apds9960'] = 'import apds9960';
    var key = this.getFieldValue('key');
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = sub + '.'+key+'()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_LTR308_extern = function(){
    Blockly.Python.definitions_['import_ltr308al'] = 'import ltr308al';
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = sub + '.getdata()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_hp203_extern=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_hp203x'] = 'import hp203x';
    var code = sub + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_QMC5883L_extern=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_qmc5883l'] = 'import qmc5883l';
    var code = sub + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_shtc3_extern=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_shtc3'] = 'import shtc3';
    if (key == 'ALL'){
        var code = sub + '.measurements';
    }
    else{
        var code = sub + '.' + key;   
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_aht11_extern=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_ahtx0'] = 'import ahtx0';
    var code = sub + '.' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_VL530LX_extern=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_vl53l0x'] = 'import vl53l0x';
    var code = sub + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_use_spi_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sv = Blockly.Python.valueToCode(this, 'SPISUB', Blockly.Python.ORDER_ATOMIC);
    var pv = Blockly.Python.valueToCode(this, 'PINSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key=='RFID') {
      Blockly.Python.definitions_['import_rc522'] = 'import rc522';
      var code = v + ' = rc522.RC522('+ sv + ','+ pv + ')\n';
    }else if (key=='Weather') {
      var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
      Blockly.Python.definitions_['import_'+version] = 'import '+version;    
      Blockly.Python.definitions_['import_ws_lora'] = 'import ws_lora';
      var code = v + ' = ws_lora.Weather('+ sv + ','+ pv + ',' + version+'.onboard_i2c'+')\n';
    }
    return code;
};

Blockly.Python.extern_rfid_read=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card('+sector+',"' + key +'")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.extern_rfid_readid=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(0, x="id")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.extern_rfid_readcontent=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card('+sector+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.extern_rfid_write=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.write_card('+cnt+','+sector+')\n';
    return code;
};

Blockly.Python.extern_rfid_status=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.scan_card()==' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.weather_data=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.weather_have_data=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.any()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.weather_uart_mixio=function(){
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var base = Blockly.Python.valueToCode(this, 'BASE', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.uart_mixio(topic=' + base +')\n';
    return code;
};

Blockly.Python.sensor_mixgoce_hot_wheel_is_touched=function(){
    var key = this.getFieldValue('key');
    var stat = this.getFieldValue('stat');
    Blockly.Python.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.TouchPadWheels('+ key +').' + stat;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgoce_hot_wheel_degrees=function(){
    Blockly.Python.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.hot_wheels_degree()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_s2_weather_init= function(block) {
    Blockly.Python.definitions_['import_weather'] = 'import weather';   
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var wd = Blockly.Python.valueToCode(this, 'wd', Blockly.Python.ORDER_ATOMIC);
    var ws = Blockly.Python.valueToCode(this, 'ws', Blockly.Python.ORDER_ATOMIC);
    var rain = Blockly.Python.valueToCode(this, 'rain', Blockly.Python.ORDER_ATOMIC);
    var code = "wd = weather.Weather_wd(" + wd + ")\n"
    code += "ws = weather.Weather_ws(" + ws + ")\n"
    code += "rain = weather.Weather_rain(" + rain + ")\n"
    return code;
};

Blockly.Python.esp32_s2_weather_wd=function(){
    Blockly.Python.definitions_['import_weather'] = 'import weather'; 
    var code = 'wd.wind_direction()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_s2_weather_rain=function(){
    Blockly.Python.definitions_['import_weather'] = 'import weather';
    var rain = Blockly.Python.valueToCode(this, 'rain', Blockly.Python.ORDER_ATOMIC); 
    var code = 'rain.rain_count(time_Hour='+rain+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_s2_weather_ws=function(){
    Blockly.Python.definitions_['import_weather'] = 'import weather'; 
    var key = this.getFieldValue('key');
    if (key == 'ALL'){
        var code = 'ws.wind_speed()';
    }
    else{
        var code = 'ws.wind_speed()[' + key + ']';   
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.HCSR04 = function () {
    Blockly.Python.definitions_['import_sonar'] = 'import sonar';
    
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ',' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.PS2_init = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';   
  //Blockly.Python.definitions_['import_board'] = 'import board';  
  var PS2_CLK = this.getFieldValue('PS2_CLK');
  var PS2_DOU = this.getFieldValue('PS2_DOU');
  var PS2_DIN = this.getFieldValue('PS2_DIN');
  var PS2_CS = this.getFieldValue('PS2_CS');
   
  var code = 'mixgope_ps = ps2.PS2Controller('+PS2_CLK+','+PS2_DOU+','+PS2_DIN+','+PS2_CS+')\n';  
  return code;
};

Blockly.Python.PS2_vibration = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2'; 
  var ss=this.getFieldValue('smotorstate');  
  var amp = Blockly.Python.valueToCode(this, 'AMP', Blockly.Python.ORDER_ATOMIC);
  var code= "mixgope_ps.PS2_vibration(" + ss + ',' + amp +")\n";
  return code;
};

Blockly.Python.PS2_Button = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';     
  var bt=this.getFieldValue('psbt');
  var code= "mixgope_ps.PS2_keydata()[0] & (ps2."+bt+")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.PS2_Buttons = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';     
  var bt=this.getFieldValue('psbt');
  var code= "ps2."+bt;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.PS2_State = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';     
  var bt=this.getFieldValue('btstate');
  var code= "mixgope_ps.PS2_keydata()["+bt+"]";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.PS2_stk = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';     
  var stk=this.getFieldValue('psstk');
  var code= "mixgope_ps.PS2_keydata()[1]["+stk+"]";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_datetime= function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute",Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second",Blockly.Python.ORDER_ASSIGNMENT);
  var week = Blockly.Python.valueToCode(this, "weekday", Blockly.Python.ORDER_ASSIGNMENT);
  var millisecond = Blockly.Python.valueToCode(this, "millisecond",Blockly.Python.ORDER_ASSIGNMENT);
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  if (v == "rtc")
    Blockly.Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';  
  var code = v+'.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.RTC_get_time = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  if (v == "rtc")
    Blockly.Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';  
  var code = v+'.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_dht11 = function () {
    Blockly.Python.definitions_['import_dhtx'] = 'import dhtx';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code ='dhtx.'+sensor_type+"(machine.Pin("+dropdown_pin+')).'+what+'()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.PS2_init_new = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';   
  //Blockly.Python.definitions_['import_board'] = 'import board';  
  var PS2_CLK = Blockly.Python.valueToCode(this, 'CLK', Blockly.Python.ORDER_ATOMIC);
  var PS2_DOU = Blockly.Python.valueToCode(this, 'DOU', Blockly.Python.ORDER_ATOMIC);
  var PS2_DIN = Blockly.Python.valueToCode(this, 'DIN', Blockly.Python.ORDER_ATOMIC);
  var PS2_CS = Blockly.Python.valueToCode(this, 'CS', Blockly.Python.ORDER_ATOMIC);
  var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = sub + ' = ps2.PS2Controller('+PS2_CLK+','+PS2_DOU+','+PS2_DIN+','+PS2_CS+')\n';  
  return code;
};

Blockly.Python.PS2_vibration_new = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2'; 
  var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var ss=this.getFieldValue('smotorstate');  
  var amp = Blockly.Python.valueToCode(this, 'AMP', Blockly.Python.ORDER_ATOMIC);
  var code= sub + ".vibration(" + ss + ',' + amp +")\n";
  return code;
};

Blockly.Python.PS2_Buttons_new = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2'; 
  var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
  var bt=this.getFieldValue('psbt');
  var code=sub + '.button(ps2.'+bt+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.PS2_stk_new = function() {
  Blockly.Python.definitions_['import_ps2'] = 'import ps2';   
  var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);  
  var stk=this.getFieldValue('psstk');
  var code= sub + ".analog(ps2.PSS_"+stk+")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_use_uart_init=function(){
  Blockly.Python.definitions_['import_pm2_5'] = 'import pm2_5';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=pm2_5.PM2_5(' + key +')\n';    
    return code;
};

Blockly.Python.pm25_get_data=function(){
    Blockly.Python.definitions_['import_pm2_5'] = 'import pm2_5';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var pm=this.getFieldValue('pm');
    var code =  v+".concentration()"+pm;
    return [code, Blockly.Python.ORDER_ATOMIC];
};