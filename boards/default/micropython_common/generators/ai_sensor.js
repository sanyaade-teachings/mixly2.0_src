'use strict';

goog.provide('Blockly.Python.ai_sensor');

goog.require('Blockly.Python');

Blockly.Python.ai_sensor_use_uart_init=function(){
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=mixgo_ai.AI(' + key +',quick=1)\n';    
    return code;
};

Blockly.Python.forBlock['ai_sensor_qrcode'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_qrcode_lite'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var code = sub+'.find_'+type+'()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_qrcodes'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_qrcodes()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_config'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var rx = Blockly.Python.valueToCode(this, 'RX', Blockly.Python.ORDER_ATOMIC);
  var tx = Blockly.Python.valueToCode(this, 'TX', Blockly.Python.ORDER_ATOMIC);
  var dropdown_uart = this.getFieldValue('mode');
  var code = v+'.configure('+tx+','+rx+',restart='+dropdown_uart+')\n';
  return code;
};

Blockly.Python.forBlock['ai_sensor_rgb'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var led1 = Blockly.Python.valueToCode(this, 'led1', Blockly.Python.ORDER_ATOMIC);
  var led2 = Blockly.Python.valueToCode(this, 'led2', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.led_rgb('+led1+','+led2+')\n';
  return code;
};

Blockly.Python.forBlock['ai_sensor_qrcode'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_qrcodes'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_qrcodes()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_barcode'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_barcodes'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_barcodes()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_tag'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_tags'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_apriltags()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_line'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_lines'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);
  var v3 = Blockly.Python.valueToCode(this, 'VAR3', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_lines('+v1+','+v2+','+v3+')';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_circle'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_circles'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);
  var v3 = Blockly.Python.valueToCode(this, 'VAR3', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_circles('+v1+','+v2+','+v3+')';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_rect'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_rects'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_rects('+v1+')';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_color'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_find_colors'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.find_colors()';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_color_chases_result'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_color_chases'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);
  var v3 = Blockly.Python.valueToCode(this, 'VAR3', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.color_track('+v1+','+v2+','+v3+')';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_ailocal_train'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);
  var v3 = Blockly.Python.valueToCode(this, 'VAR3', Blockly.Python.ORDER_ATOMIC);
  var v4 = Blockly.Python.valueToCode(this, 'VAR4', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.ailocal_train('+v1+','+v2+','+v3+','+v4+')\n';
  return code; 
};

Blockly.Python.forBlock['ai_sensor_ailocal_class'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);  
  var v4 = Blockly.Python.valueToCode(this, 'VAR4', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.ailocal_class('+v1+','+v2+','+v4+')';
  return [code, Blockly.Python.ORDER_ATOMIC];  
};

Blockly.Python.forBlock['ai_sensor_ailocal_class_result'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_audio_record'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);  
  var code = v+'.audio_record(path='+v1+',times='+v2+')\n';
  return code; 
};

Blockly.Python.forBlock['ai_sensor_audio_play'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);  
  var code = v+'.audio_play(path='+v1+',volume='+v2+')\n';
  return code; 
};

Blockly.Python.forBlock['ai_sensor_yolo_recognize'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);  
  var v4 = Blockly.Python.valueToCode(this, 'VAR4', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.yolo_recognize('+v1+','+v2+','+v4+')';
  return [code, Blockly.Python.ORDER_ATOMIC];  
};

Blockly.Python.forBlock['ai_sensor_yolo_recognize_result'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var sub =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = sub+'.'+key;
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};

Blockly.Python.forBlock['ai_sensor_asr_recognize'] = function () {
  Blockly.Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var v1 = Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC);
  var v2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);  
  var code = v+'.asr_recognize('+v1+',threshold='+v2+')';
  return [code, Blockly.Python.ORDER_ATOMIC]; 
};