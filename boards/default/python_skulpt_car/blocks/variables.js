'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


Blockly.Msg['VARIABLES_HUE'] = 330//'#af5180'//330;

// ************************************************************************
// THIS SECTION IS INSERTED INTO BLOCKLY BY BLOCKLYDUINO.
//  Blockly.Blocks['variables_declare'] = {
//  // Variable setter.
//   init: function() {
//     this.setColour(Blockly.Msg['VARIABLES_HUE']);
//     this.appendValueInput('VALUE', null)
//         .appendField(Blockly.Msg.Lang.MIXLY_DECLARE)
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
//         //.appendField(Blockly.Msg.Lang.MIXLY_AS)
//         //.appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_NUMBER, 'number'], [Blockly.Msg.Lang.LANG_MATH_STRING, 'string'], [Blockly.Msg.Lang.LANG_MATH_BOOLEAN, 'boolean']]), 'TYPE')
// 	    .appendField(Blockly.Msg.Lang.MIXLY_VALUE);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_VARIABLES_DECLARE);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setTitleValue(newName, 'VAR');
//     }
//   }
// };
// ************************************************************************

Blockly.Blocks['variables_get'] = {
  init: function() {
    this.setColour(Blockly.Msg['VARIABLES_HUE']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'VAR')
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.Lang.VARIABLES_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }/*,
  onchange: function() {
	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
		  this.setWarningText(null);
	  }else{
		  this.setWarningText(Blockly.Msg.Lang.MIXLY_WARNING_NOT_DECLARE);
	  }
  }*/
};

// Blockly.Blocks['variables_set'] = {
//   init: function() {
//     this.setColour(Blockly.Msg['VARIABLES_HUE']);
//     this.appendValueInput('VALUE')
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
// 		.appendField(Blockly.Msg.Lang.MIXLY_VALUE2);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg.Lang.VARIABLES_SET_TOOLTIP);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setFieldValue(newName, 'VAR');
//     }
//   }/*,
//   onchange: function() {
// 	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
// 	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
// 		  this.setWarningText(null);
// 	  }else{
// 		  this.setWarningText(Blockly.Msg.Lang.MIXLY_WARNING_NOT_DECLARE);
// 	  }
//   }*/
// };
Blockly.Blocks['variables_set'] = {
   init: function() {
    this.setColour(Blockly.Msg['VARIABLES_HUE']);
    this.appendValueInput('VALUE')
        .appendField(new Blockly.FieldTextInput(''), 'VAR')
		.appendField(Blockly.Msg.Lang.MIXLY_VALUE2);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    var varValue = this.getFieldValue('VAR');
    if(varValue == null){
      return [];
    }
    return varValue.split(",");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};
/**
  * Block for basic data type change.
  * @this Blockly.Block
  */
Blockly.Blocks['variables_change'] = {
    init: function () {
        this.setColour(Blockly.Msg['VARIABLES_HUE']);
        var DATATYPES =
         [
          [Blockly.Msg.Lang.LANG_MATH_INT, "int"],
          [Blockly.Msg.Lang.LANG_MATH_FLOAT, "float"],
          [Blockly.Msg.Lang.LANG_MATH_BOOLEAN, "bool"],
          // [Blockly.Msg.Lang.MIXLY_MICROPYTHON_TYPE_COMPLEX, "complex"],
          [Blockly.Msg.Lang.LANG_MATH_STRING, "str"],
          [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_LIST, "list"],
          [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
          [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_DICT,"dict"],
          [Blockly.Msg.Lang.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD,"set"]
          ];
        this.appendValueInput('MYVALUE')
            .appendField(new Blockly.FieldDropdown(DATATYPES), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        this.setOutput(true);
        // this.setInputsInline(true);
       
    }
};


Blockly.Blocks['variables_global'] = {
  init: function() {
    this.setColour(Blockly.Msg['VARIABLES_HUE']);
        this.appendValueInput("VAR")
        .appendField(Blockly.Msg.Lang.MIXLY_PYTHON_GLOBAL)
        .setCheck("var");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.Lang.TEXT_PRINT_TOOLTIP);
  }
};


Blockly.Blocks.controls_type = {
  init: function() {
    this.setColour(Blockly.Msg['VARIABLES_HUE']);
    this.appendValueInput("DATA")
        .appendField(Blockly.Msg.Lang.MICROBIT_PYTHON_TYPE);
    // this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.Lang.MICROBIT_PYTHON_TYPE);
  }
};


Blockly.Blocks.controls_typeLists = {
    init: function() {
        this.setColour(Blockly.Msg['VARIABLES_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_CONTORL_GET_TYPE)
            .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.Lang.LANG_MATH_INT, "int"],
              [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_FLOAT, "float"],
              [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_STRING, "str"],
              [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_LIST, "list"],
              [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
              [Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_DICT,"dict"],
              [Blockly.Msg.Lang.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD,"set"],
              // [Blockly.Msg.Lang.MIXLY_MICROBIT_IMAGE,"image"],
              [Blockly.Msg.Lang.LOGIC_NULL,"NoneType"]]), "type");
            //整数、浮点数、字符串、列表、元组、字典、集合、图像不太对, unfinished
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('type');
        var mode0 = Blockly.Msg.Lang.MICROBIT_controls_TypeLists;
        var TOOLTIPS = {
        'int': Blockly.Msg.Lang.LANG_MATH_INT,
        'float': Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_FLOAT,
        'str': Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_STRING,
        'list': Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_LIST,
        'tuple':Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_TUPLE,
        'dict': Blockly.Msg.Lang.MIXLY_MICROBIT_TYPE_DICT,
        'set': Blockly.Msg.Lang.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD,
        'image':Blockly.Msg.Lang.MIXLY_MICROBIT_IMAGE,
        'NoneType': Blockly.Msg.Lang.LOGIC_NULL
      };
      return mode0 + TOOLTIPS[mode];
    });
    }
};