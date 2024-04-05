import { Arduino } from '../../arduino_common/arduino_generator';

export const logic_compare = function () {
    // Comparison operator.
    var mode = this.getFieldValue('OP');
    var operator = logic_compare.OPERATORS[mode];
    var order = (operator == '==' || operator == '!=') ?
        Arduino.ORDER_EQUALITY : Arduino.ORDER_RELATIONAL;
    var argument0 = Arduino.valueToCode(this, 'A', order) || '0';
    var argument1 = Arduino.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

logic_compare.OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
};

export const logic_operation = function () {
    // Operations 'and', 'or'.
    var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Arduino.ORDER_LOGICAL_AND :
        Arduino.ORDER_LOGICAL_OR;
    var argument0 = Arduino.valueToCode(this, 'A', order) || 'false';
    var argument1 = Arduino.valueToCode(this, 'B', order) || 'false';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

export const logic_negate = function () {
    // Negation.
    var order = Arduino.ORDER_UNARY_PREFIX;
    var argument0 = Arduino.valueToCode(this, 'BOOL', order) || 'false';
    var code = '!' + argument0;
    return [code, order];
};

export const logic_boolean = function () {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, Arduino.ORDER_ATOMIC];
};

export const logic_null = function () {
    var code = 'NULL';
    return [code, Arduino.ORDER_ATOMIC];
};

export const logic_true_or_false = function () {
    var a = Arduino.valueToCode(this, 'A', Arduino.ORDER_ATOMIC) || 'false';
    var b = Arduino.valueToCode(this, 'B', Arduino.ORDER_ATOMIC) || 'false';
    var c = Arduino.valueToCode(this, 'C', Arduino.ORDER_ATOMIC) || 'false';
    var code = '(' + a + '?' + b + ':' + c + ')';
    return [code, Arduino.ORDER_ATOMIC];
};

