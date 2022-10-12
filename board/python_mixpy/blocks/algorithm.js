'use strict';

goog.provide('Blockly.Blocks.algorithm');

goog.require('Blockly.Blocks');

Blockly.Blocks.algorithm.HUE = '#526FC3';




Blockly.Blocks['algorithm_prepare'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PREPARE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_add_school'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ADD_SCHOOL);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_get_current_location'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_GET_CURRENT_LOCATION);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_find_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_FIND_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};



Blockly.Blocks['algorithm_new_path']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NEW_PATH);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_set_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_SET_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_add_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ADD_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_del_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_DEL_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_return_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_RETURN_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_no_left']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NO_LEFT);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_print_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};