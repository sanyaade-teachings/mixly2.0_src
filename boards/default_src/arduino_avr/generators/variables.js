import { Arduino } from '../../arduino_common/arduino_generator';
import Variables from '../../arduino_common/others/variables';

export const variables_get = function () {
    // Variable getter.
    var code = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    return [code, Arduino.ORDER_ATOMIC];
};

export const variables_declare = function () {
    var dropdown_type = this.getFieldValue('TYPE');
    var dropdown_variables_type = this.getFieldValue('variables_type');
    var argument0;
    var code = '';
    //TODO: settype to variable
    if (dropdown_variables_type == 'global_variate') {
        if (dropdown_type == 'String') {
            argument0 = Arduino.valueToCode(this, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '""';
        } else {
            argument0 = Arduino.valueToCode(this, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '0';
        }
        var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
            Variables.NAME_TYPE);
        if (dropdown_type == 'String' || dropdown_type == 'char*')
            Arduino.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + ';';
        else
            Arduino.definitions_['var_declare' + varName] = 'volatile ' + dropdown_type + ' ' + varName + ';';

        Arduino.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';';
    }
    else {
        if (dropdown_type == 'String') {
            argument0 = Arduino.valueToCode(this, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '""';
        } else {
            argument0 = Arduino.valueToCode(this, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '0';
        }
        var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
            Variables.NAME_TYPE);
        code = dropdown_type + ' ' + varName + ' = ' + argument0 + ';\n';
    }
    //Arduino.variableTypes_[varName] = dropdown_type;//处理变量类型
    return code;
};

export const variables_set = function () {
    // Variable setter.
    var argument0 = Arduino.valueToCode(this, 'VALUE',
        Arduino.ORDER_ASSIGNMENT) || '0';
    var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    return varName + ' = ' + argument0 + ';\n';
};
export const variables_change = function () {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = Arduino.valueToCode(this, 'MYVALUE', Arduino.ORDER_ASSIGNMENT);
    //修复强制类型转换不正确的bug
    var code = '((' + operator + ')(' + varName + '))';
    return [code, Arduino.ORDER_ATOMIC];
};