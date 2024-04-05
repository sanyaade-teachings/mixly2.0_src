import { Arduino } from '../../arduino_common/arduino_generator';
import Variables from '../../arduino_common/others/variables';
import Procedures from '../../arduino_common/others/procedures';

export const procedures_defreturn = function () {
    // Define a procedure with a return value.
    var funcName = Arduino.variableDB_.getName(this.getFieldValue('NAME'),
        Procedures.NAME_TYPE);
    var branch = Arduino.statementToCode(this, 'STACK');
    if (Arduino.INFINITE_LOOP_TRAP) {
        branch = Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var returnValue = Arduino.valueToCode(this, 'RETURN',
        Arduino.ORDER_NONE) || '';
    var type = this.getFieldValue('TYPE');
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    var returnType = type ? type : 'void';
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = this.argumentstype_[x] + ' ' + Arduino.variableDB_.getName(this.arguments_[x],
            Variables.NAME_TYPE);
    }
    var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}\n';
    code = Arduino.scrub_(this, code);
    Arduino.definitions_[funcName] = code;
    return null;
};

export const procedures_defnoreturn = procedures_defreturn;

export const procedures_callreturn = function () {
    // Call a procedure with a return value.
    var funcName = Arduino.variableDB_.getName(this.getFieldValue('NAME'),
        Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Arduino.valueToCode(this, 'ARG' + x,
            Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Arduino.ORDER_UNARY_POSTFIX];
};

export const procedures_callnoreturn = function () {
    // Call a procedure with no return value.
    var funcName = Arduino.variableDB_.getName(this.getFieldValue('NAME'),
        Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Arduino.valueToCode(this, 'ARG' + x,
            Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};

export const procedures_ifreturn = function () {
    // Conditionally return value from a procedure.
    var condition = Arduino.valueToCode(this, 'CONDITION',
        Arduino.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (this.hasReturnValue_) {
        var value = Arduino.valueToCode(this, 'VALUE',
            Arduino.ORDER_NONE) || '';
        code += '  return ' + value + ';\n';
    } else {
        code += '  return;\n';
    }
    code += '}\n';
    return code;
};

export const procedures_return = function () {
    // Conditionally return value from a procedure.
    var code = ""
    if (this.hasReturnValue_) {
        var value = Arduino.valueToCode(this, 'VALUE',
            Arduino.ORDER_NONE) || 'None';
        code += 'return ' + value + ';\n';
    } else {
        code += 'return;\n';
    }
    code += '\n';
    return code;
};