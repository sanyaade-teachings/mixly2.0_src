'use strict';

goog.provide('Blockly.Python.pe_g1');
goog.require('Blockly.Python');

Blockly.Python.pe_g1_use_i2c_init=function(){
    Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var code = v + ' = pe_g1.PE_G1('+ iv+ ')\n';
    return code;
};    

Blockly.Python.pe_g1_battery_left = function(){   
    Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var code =  v + '.read_bat()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pe_g1_dc_motor=function(){
    Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var wheel = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
    var v = this.getFieldValue('direction');    
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = s+".motor("+wheel+',"'+ v + '",' + speed+")\n";
    return code;
};

Blockly.Python.pe_g1_dc_motor_speed=function(){
    Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var wheel = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
    var v = 'NC';
    var code = s+".motor("+wheel+',"'+ v + '"' +")\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pe_g1_servo_set_angle = function() {
  Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.servo180('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.pe_g1_servo_set_speed = function() {
  Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);     
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
  var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.servo360('+dropdown_pin+','+num+')\n';
  return code;
};

Blockly.Python.pe_g1_servo_get_angle = function() {
  Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
  var code = v+'.servo180('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pe_g1_servo_get_speed = function() {
  Blockly.Python.definitions_['import_pe_g1'] = 'import pe_g1';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
  var code = v+'.servo360('+dropdown_pin+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
