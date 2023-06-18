'use strict';

goog.provide('Blockly.Python.iotweather');
goog.require('Blockly.Python');

Blockly.Python.forBlock['WEATHER_NOW'] = function(block) {
  Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api"; 
  var dropdown_mode = this.getFieldValue('mode');
  var key =  Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC) ; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var code ='seniverse_api.'+dropdown_mode+'(' + key + ',' + addr + ')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['WEATHER_DAILY'] = function(block) {
  Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api"; 
  var dropdown_mode = this.getFieldValue('mode');
  var key =  Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC) ; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var day =  Blockly.Python.valueToCode(this, 'day', Blockly.Python.ORDER_ATOMIC) ; 
  var code ='seniverse_api.'+dropdown_mode+'(' + key + ',' + addr + ',' + day + ')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['WEATHER_HOUR'] = function(block) {
  Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api"; 
  var key =  Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC) ; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var hour =  Blockly.Python.valueToCode(this, 'hour', Blockly.Python.ORDER_ATOMIC) ; 
  var code ='seniverse_api.weather_hourly(' + key + ',' + addr + ',' + hour + ')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};