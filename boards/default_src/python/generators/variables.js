import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const variables_get = function () {
    // Variable getter.
    var code = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Python.ORDER_ATOMIC];
};

// export const variables_declare = function() {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var argument0;
//   //TODO: settype to variable
//   argument0 = Python.valueToCode(this, 'VALUE',Python.ORDER_ASSIGNMENT) ||  'None';
//   var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);

//   if (dropdown_type === 'number')
//       Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = 0;';
//   else if(dropdown_type === 'string')
//       Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = \'\';';
//   else if(dropdown_type === 'boolean')
//       Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = true;';
//   else if(dropdown_type.startsWith('Array'))
//       Python.definitions_['var_declare' + varName] = 'let ' + varName + ':' + dropdown_type + ' = [];';


//   if(Python.setups_['var_declare' + varName] === undefined) {
//       Python.setups_['var_declare' + varName] =  varName + ' = ' + argument0 + '\n';
//   }else {
//   }
//   return '';
// };

export const variables_set = function () {
    // Variable setter.
    if (this.getFieldValue('VAR') == "") {
        return "  = None\n";
    }
    var argument0 = Python.valueToCode(this, 'VALUE',
        Python.ORDER_ASSIGNMENT) || 'None';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + argument0 + '\n';
};

export const variables_change = function () {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = Python.valueToCode(this, 'MYVALUE', Python.ORDER_ATOMIC) || 'None';
    if (operator == 'bytes') { var code = operator + '(' + varName + ',"UTF-8")'; }
    else { var code = operator + '(' + varName + ')'; }
    return [code, Python.ORDER_ATOMIC];
};

export const variables_global = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || 'None';
    var code = "global " + str + '\n';
    return code;
};


//ok
export const controls_type = function () {
    var data = Python.valueToCode(this, 'DATA', Python.ORDER_ATOMIC) || 'None'
    var code = 'type(' + data + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const controls_typeLists = function () {
    //Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var type = this.getFieldValue('type');
    // Python.definitions_['func_type' + type] = code;
    return [type, Python.ORDER_ATOMIC];
}