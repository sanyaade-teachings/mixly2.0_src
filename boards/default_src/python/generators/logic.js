import Python from '../python_generator';

export const logic_compare = function () {
    // Comparison operator.
    var mode = this.getFieldValue('OP');
    var operator = logic_compare.OPERATORS[mode];
    var order = (operator == '==' || operator == '!=') ?
        Python.ORDER_EQUALITY : Python.ORDER_RELATIONAL;
    var argument0 = Python.valueToCode(this, 'A', order) || '0';
    var argument1 = Python.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

export const logic_compare_continous = function () {
    // Comparison operator.
    var mode1 = this.getFieldValue('OP1');
    var operator1 = logic_compare.OPERATORS[mode1];
    var mode2 = this.getFieldValue('OP2');
    var operator2 = logic_compare.OPERATORS[mode2];
    var argument0 = Python.valueToCode(this, 'A', Python.ORDER_RELATIONAL) || '0';
    var argument1 = Python.valueToCode(this, 'B', Python.ORDER_RELATIONAL) || '0';
    var argument2 = Python.valueToCode(this, 'C', Python.ORDER_RELATIONAL) || '0';
    var code = argument0 + ' ' + operator1 + ' ' + argument1 + ' ' + operator2 + ' ' + argument2;
    return [code, Python.ORDER_RELATIONAL];
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
    var operator = this.getFieldValue('OP');
    var order = (operator == '&&') ? Python.ORDER_LOGICAL_AND :
        Python.ORDER_LOGICAL_OR;
    var argument0 = Python.valueToCode(this, 'A', order) || 'False';
    var argument1 = Python.valueToCode(this, 'B', order) || 'False';
    if (operator == 'AND') {
        var code = argument0 + ' and ' + argument1;
    } else if (operator == 'OR') {
        var code = argument0 + ' or ' + argument1;
    } else if (operator == 'NOR') {
        // var code = '('+argument0+' and '+argument1+' ) or ((not '+argument0+') and (not '+argument1+'))';
        var code = 'not(' + argument0 + '^' + argument1 + ')';
    } else {
        // var code = '((not '+argument0+') and '+argument1+' ) or ( '+argument0+' and (not '+argument1+'))';
        var code = argument0 + '^' + argument1;
    }
    return [code, order];
};

export const logic_negate = function () {
    // Negation.
    var order = Python.ORDER_UNARY_PREFIX;
    var argument0 = Python.valueToCode(this, 'BOOL', order) || 'False';
    var code = 'not ' + argument0;
    return [code, order];
};

export const logic_boolean = function () {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
    return [code, Python.ORDER_ATOMIC];
};

export const logic_null = function () {
    var code = 'None';
    return [code, Python.ORDER_ATOMIC];
};

export const logic_true_or_false = function () {
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || 'False';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || 'False';
    var c = Python.valueToCode(this, 'C', Python.ORDER_ATOMIC) || 'False';
    var code = '(' + b + ' if ' + a + ' else ' + c + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const logic_is_in = function () {
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var bool = this.getFieldValue('BOOL');
    var code = a + ' ' + bool + ' ' + b;
    return [code, Python.ORDER_ATOMIC];
};

export const logic_is = function () {
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var bool = this.getFieldValue('BOOL');
    var code = a + ' ' + bool + ' ' + b;
    return [code, Python.ORDER_ATOMIC];
};

export const logic_tobool = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['bool(' + str + ')', Python.ORDER_ATOMIC];
};