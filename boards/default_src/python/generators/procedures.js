import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const procedures_defreturn = function () {
    // Define a procedure with a return value.
    var funcName = Python.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var branch = Python.statementToCode(this, 'STACK') || '    pass\n';
    if (Python.INFINITE_LOOP_TRAP) {
        branch = Python.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var returnValue = Python.valueToCode(this, 'RETURN',
        Python.ORDER_NONE) || '';
    //var type=this.getFieldValue('TYPE');
    if (returnValue) {
        returnValue = '    return ' + returnValue + '\n';
    }
    //var returnType = returnValue ? type : 'void';
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        var varName = Python.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
        args[x] = varName;
    }
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + returnValue + '\n';
    code = Python.scrub_(this, code);
    Python.setups_[funcName] = code;
    return null;
};

export const procedures_defnoreturn = procedures_defreturn;

export const procedures_callreturn = function () {
    // Call a procedure with a return value.
    var funcName = Python.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Python.valueToCode(this, 'ARG' + x,
            Python.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Python.ORDER_UNARY_POSTFIX];
};

export const procedures_callnoreturn = function () {
    // Call a procedure with no return value.
    var funcName = Python.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Python.valueToCode(this, 'ARG' + x,
            Python.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')\n';
    return code;
};

export const procedures_ifreturn = function () {
    // Conditionally return value from a procedure.
    var condition = Python.valueToCode(this, 'CONDITION',
        Python.ORDER_NONE) || 'False';
    var code = 'if (' + condition + ') :\n';
    if (this.hasReturnValue_) {
        var value = Python.valueToCode(this, 'VALUE',
            Python.ORDER_NONE) || 'None';
        code += '    return ' + value;
    } else {
        code += '    return None';
    }
    code += '\n';
    return code;
};

export const procedures_return = function () {
    // Conditionally return value from a procedure.
    var code = ""
    if (this.hasReturnValue_) {
        var value = Python.valueToCode(this, 'VALUE',
            Python.ORDER_NONE) || 'None';
        code += 'return ' + value;
    } else {
        code += 'return None';
    }
    code += '\n';
    return code;
};