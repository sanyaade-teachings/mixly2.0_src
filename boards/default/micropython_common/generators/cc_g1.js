'use strict';

goog.provide('Blockly.Python.cc_g1');
goog.require('Blockly.Python');

Blockly.Python.forBlock['cc_g1_read_bat'] = function(){
	var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_bat()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cc_g1_read_joystick'] = function(){
	var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_joystick()'+v+'';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cc_g1_read_key'] = function(){
	var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_key('+v+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cc_g1_turnoff'] = function(){
	var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.shutdown()';
    return code;
};