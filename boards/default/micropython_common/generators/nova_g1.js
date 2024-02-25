'use strict';

goog.provide('Blockly.Python.nova_g1');
goog.require('Blockly.Python');

Blockly.Python.forBlock['get_potential_num'] = function(){ 
    Blockly.Python.definitions_['import_nova_g1'] = 'import nova_g1';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var code = v+ '.ext_g1.varistor()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['nova_g1_motor'] = function(){
    Blockly.Python.definitions_['import_nova_g1'] = 'import nova_g1';
    var s = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var wheel = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
    var v = this.getFieldValue('direction');    
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = s+".motor("+wheel+',"'+ v + '",' + speed+")\n";
    return code;
};

Blockly.Python.forBlock['nova_g1_usb'] = function(){
    Blockly.Python.definitions_['import_nova_g1'] = 'import nova_g1';
    var s = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC); 
    var p = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);   
    var percent = Blockly.Python.valueToCode(this, 'percent', Blockly.Python.ORDER_ATOMIC);
    var code = s+".usb_pwm("+p+ ',' + percent+")\n";
    return code;
};

Blockly.Python.forBlock['nova_g1_spk_en'] = function(){
    Blockly.Python.definitions_['import_nova_g1'] = 'import nova_g1';
    var s = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
    // var state = Blockly.Python.valueToCode(this, 'state', Blockly.Python.ORDER_ATOMIC);
    var state = this.getFieldValue('state');
    var code = s+".spk_en("+state+")\n";
    return code;
};