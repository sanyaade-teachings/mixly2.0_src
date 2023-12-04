import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const set_create_with = function () {
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);

    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    //Python.definitions_['var_declare'+varName] = varName+'= '+ '{' + code.join(', ') + '}\n';
    code = varName + '= ' + '{' + code.join(', ') + '}\n';
    if (this.itemCount_ == 0) { code = varName + ' = ' + 'set()\n' }
    return code;
};

export const set_length = function () {
    var varName = Python.valueToCode(this, 'SET', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'len(' + varName + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const set_pop = function () {
    var varName = Python.valueToCode(this, 'SET', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pop()';
    return [code, Python.ORDER_ATOMIC];
}

export const set_clear = function () {
    var varName = Python.valueToCode(this, 'SET', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
};

export const set_operate = function () {
    var vars1 = Python.valueToCode(this, 'SET1', Python.ORDER_ASSIGNMENT) || '0';
    var vars2 = Python.valueToCode(this, 'SET2', Python.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const set_operate_update = function () {
    var vars1 = Python.valueToCode(this, 'SET1', Python.ORDER_ASSIGNMENT) || '0';
    var vars2 = Python.valueToCode(this, 'SET2', Python.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')\n';
    return code;
};

export const set_add_discard = function () {
    var vars1 = Python.valueToCode(this, 'SET', Python.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = vars1 + "." + operate + "(" + argument + ')\n';
    return code;
};

export const set_sub = function () {
    var vars1 = Python.valueToCode(this, 'SET1', Python.ORDER_ASSIGNMENT) || '0';
    var vars2 = Python.valueToCode(this, 'SET2', Python.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const set_update = function () {

    var varName = Python.valueToCode(this, 'SET', Python.ORDER_ASSIGNMENT) || '0';
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    //var color = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'update' + '(' + color + ')\n';
    return code;
};

// export const set_change_to = function(){
//   var op = this.getFieldValue('OP');
//   var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
//   var code = op + '(' + varName + ')\n';
//   return [code, Python.ORDER_ATOMIC];
// }

export const set_create_with_text_return = function () {
    var text = this.getFieldValue('TEXT');
    var code = '{' + text + '}';
    return [code, Python.ORDER_ATOMIC];
};

export const set_toset = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['set(' + str + ')', Python.ORDER_ATOMIC];
};