'use strict';

goog.provide('Blockly.Python.nova_g1');
goog.require('Blockly.Python');

Blockly.Python.forBlock['get_potential_num'] = function(){ 
    Blockly.Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var code = 'ext_g1.varistor()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['nova_g1_motor'] = function(){
    Blockly.Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var wheel = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC); 
    var v = this.getFieldValue('direction');    
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "ext_g1.motor("+wheel+',"'+ v + '",' + speed+")\n";
    return code;
};

Blockly.Python.forBlock['nova_g1_usb'] = function(){
    Blockly.Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var p = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);   
    var percent = Blockly.Python.valueToCode(this, 'percent', Blockly.Python.ORDER_ATOMIC);
    var code = "ext_g1.usb_pwm("+p+ ',' + percent+")\n";
    return code;
};

Blockly.Python.forBlock['nova_g1_spk_en'] = function(){
    Blockly.Python.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var state = this.getFieldValue('state');
    var code = "ext_g1.spk_en("+state+")\n";
    return code;
};