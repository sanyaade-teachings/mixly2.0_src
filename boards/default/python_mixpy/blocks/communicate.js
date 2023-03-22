'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Msg['COMMUNICATE_HUE'] = 0//'#3288dd';

Blockly.Blocks['requests_get'] = {
  init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendValueInput("DOMAIN")
      .appendField(Blockly.Msg.Lang.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  this.appendDummyInput("")
  
      .appendField(Blockly.Msg.Lang.blockpy_REQUESTS_GET)
      .appendField(new Blockly.FieldTextInput('response'), 'VAR')
                       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_REQUESTS_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}


Blockly.Blocks['requests_attribute'] = {
  init: function() {
     this.appendValueInput('VAL')

  var attr =
        [[Blockly.Msg.Lang.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'],[Blockly.Msg.Lang.blockpy_REQUESTS_GET_ATTR_TEXT, 'text']
        ,[Blockly.Msg.Lang.blockpy_REQUESTS_GET_ATTR_COOKIES, 'cookies'],[Blockly.Msg.Lang.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content']];
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown(attr), 'ATTR')
        

  this.setInputsInline(true);
   this.setOutput(true, String);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'clear': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_CLEAR,
        'reset': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_RESET,
        'home': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_HOME
      };
      return TOOLTIPS[mode];
    });
  }
};



Blockly.Blocks['requests_method'] = {
  init: function() {
    this.appendValueInput("VAR")
      .appendField(Blockly.Msg.Lang.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  var method =
        [['post', 'post'],['put', 'put'],
        ['delete', 'delete'],['head', 'head'],
        ['option', 'option']];
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.blockpy_CONDUCT)
        .appendField(new Blockly.FieldDropdown(method), 'DIR')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.blockpy_REQUESTS)    
        

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'forward': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_FORWARD,
        'backward': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_BACKWARD
      };
      return TOOLTIPS[mode];
    });
  }
};