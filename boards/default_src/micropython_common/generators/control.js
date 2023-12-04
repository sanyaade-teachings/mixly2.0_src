import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';
import { controls_repeat_ext } from '../../python/generators/control';

export const base_setup = function () {
    var branch = Python.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n {4}/g, '\n');//去除两端空格
    if (branch) {
        if (branch.endsWith('\n')) {
            Python.setups_['setup_setup'] = branch;
        }
        else {
            Python.setups_['setup_setup'] = branch + '\n';
        }
    }
    return '';
};

//ok
export const controls_if = function (a) {
    var b = 0,
        c = "",
        d,
        e;
    do
        e = Python.valueToCode(a, "IF" + b, Python.ORDER_NONE) || "False", d = Python.statementToCode(a, "DO" + b) || Python.PASS, c += (0 == b ? "if " : "elif ") + e + ":\n" + d, ++b;
    while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = Python.statementToCode(a, "ELSE") || Python.PASS, c += "else:\n" + d);
    return c
};

//ok
export const controls_for = function (a) {
    var b = Python.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        //var b = Python.valueToCode(a, "VAR", Python.ORDER_MEMBER) || "''",
        c = Python.valueToCode(a, "FROM", Python.ORDER_NONE) || "0",
        d = Python.valueToCode(a, "TO", Python.ORDER_NONE) || "0",
        e = Python.valueToCode(a, "STEP", Python.ORDER_NONE) || "1",
        f = Python.addLoopTrap(Python.statementToCode(a, "DO"), a.id) || Python.PASS,
        g = "",
        h = function () {
            return Python.provideFunction_("upRange",
                ["def " + Python.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start <= stop:", "    yield start", "    start += abs(step)"])
        },
        k = function () {
            return Python.provideFunction_("downRange", ["def " + Python.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start >= stop:", "    yield start", "    start -= abs(step)"])
        };
    a = function (a, b, c) {
        return "(" + a + " <= " + b + ") and " + h() + "(" + a + ", " + b + ", " + c + ") or " + k() + "(" + a + ", " + b + ", " + c + ")"
    };
    if (Blockly.isNumber(c) && Blockly.isNumber(d) &&
        Blockly.isNumber(e))
        c = parseFloat(c), d = parseFloat(d), e = Math.abs(parseFloat(e)), 0 === c % 1 && 0 === d % 1 && 0 === e % 1 ? (c <= d ? (d++, a = 0 == c && 1 == e ? d : c + ", " + d, 1 != e && (a += ", " + e)) : (d--, a = c + ", " + d + ", -" + e), a = "range(" + a + ")") : (a = c < d ? h() : k(), a += "(" + c + ", " + d + ", " + e + ")");
    else {
        var l = function (a, c) {
            if (Blockly.isNumber(a))
                a = parseFloat(a);
            else {
                var d = Python.variableDB_.getDistinctName(b + c, Blockly.Variables.NAME_TYPE);
                g += d + " = " + a + "\n";
                a = d
            }
            return a
        };
        c = l(c, "_start");
        d = l(d, "_end");
        l(e, "_inc");
        a = "number" == typeof c && "number" == typeof d ? c < d ? h(c, d, e) : k(c, d, e) : a(c, d, e)
    }
    return g += "for " + b + " in " + a + ":\n" + f
};

//ok
export const controls_repeat = controls_repeat_ext;


export const controls_whileUntil = function (a) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
        c = Python.valueToCode(a, "BOOL", b ? Python.ORDER_LOGICAL_NOT : Python.ORDER_NONE) || "False",
        d = Python.addLoopTrap(Python.statementToCode(a, "DO"), a.id) || Python.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
};

//ok
export const controls_flow_statements = function (a) {
    switch (a.getFieldValue("FLOW")) {
    case "BREAK":
        return "break\n";
    case "CONTINUE":
        return "continue\n"
    }
    throw "Unknown flow statement.";
};

//ok



export const controls_forEach = function (block) {
    // For each loop.
    var variable0 = Python.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Python.valueToCode(block, 'LIST',
        Python.ORDER_RELATIONAL) || '[]';
    var branch = Python.statementToCode(block, 'DO');
    branch = Python.addLoopTrap(branch, block.id) ||
        Python.PASS;
    var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
    return code;
};

//ok
export const controls_type = function () {
    var data = Python.valueToCode(this, 'DATA', Python.ORDER_ATOMIC) || '1000'
    var code = 'type(' + data + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const controls_typeLists = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var type = this.getFieldValue('type');
    // Python.definitions_['func_type' + type] = code;
    return [type, Python.ORDER_ATOMIC];
}

