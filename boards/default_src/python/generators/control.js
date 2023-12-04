import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const controls_main = function (a) {
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    return "if __name__ == '__main__':\n" + d;
};

export const base_setup = function () {
    var branch = Python.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n {4}/g, '\n');//去除两端空格
    if (branch.endsWith('\n')) {
        Python.setups_['setup_setup'] = branch;
    }
    else {
        Python.setups_['setup_setup'] = branch + '\n';
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

export const controls_try_finally = function () {
    var n = 0;
    var argument = Python.valueToCode(this, 'IF' + n,
        Python.ORDER_NONE) || 'null';
    var branch = '';
    var t = Python.statementToCode(this, 'try') || '    pass\n';
    var code = 'try:\n' + t;
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Python.valueToCode(this, 'IF' + n,
            Python.ORDER_NONE) || '';
        if (argument !== '')
            argument = ' ' + argument
        branch = Python.statementToCode(this, 'DO' + n) || '    pass\n';
        code += 'except' + argument + ': \n' + branch;
    }
    if (this.elseCount_) {
        branch = Python.statementToCode(this, 'ELSE') || '    pass\n';
        code += 'finally:\n' + branch;
    }
    // code += '}';
    return code;
};

//ok
export const controls_for = function (a) {
    var b = Python.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        //var b = Python.valueToCode(a, "VAR", Python.ORDER_MEMBER) || "''",
        c = Python.valueToCode(a, "FROM", Python.ORDER_NONE) || "0",
        d = Python.valueToCode(a, "TO", Python.ORDER_NONE) || "0",
        e = Python.valueToCode(a, "STEP", Python.ORDER_NONE) || "1",
        f = Python.statementToCode(a, "DO"),
        f = Python.addLoopTrap(f, a.id) || Python.PASS,
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
            },
            c = l(c, "_start"),
            d = l(d, "_end");
        l(e, "_inc");
        a = "number" == typeof c && "number" == typeof d ? c < d ? h(c, d, e) : k(c, d, e) : a(c, d, e)
    }
    return g += "for " + b + " in " + a + ":\n" + f
};

export const controls_for_range = function (block) {
    var iter = Python.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        from = Python.valueToCode(block, "FROM", Python.ORDER_NONE) || "0",
        end = Python.valueToCode(block, "TO", Python.ORDER_NONE) || "0",
        step = Python.valueToCode(block, "STEP", Python.ORDER_NONE) || "1",
        dostatement = Python.statementToCode(block, "DO"),
        pass = Python.addLoopTrap(dostatement, block.id) || Python.PASS;
    Python.setups_["mixly_range"] = "def mixly_range(start, stop, step):\n" +
        "    for i in range(start, stop + 1, step):\n" +
        "        yield i\n\n";
    return "for " + iter + " in mixly_range(" + from + ", " + end + ", " + step + "):\n" + pass;
};

export const controls_whileUntil = function (a) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
        c = Python.valueToCode(a, "BOOL", Python.ORDER_NONE) || "False",
        d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
};

// export const controls_flow_statements = function () {
//     // Flow statements: continue, break.
//     switch (this.getFieldValue('FLOW')) {
//         case 'BREAK':
//             return 'break;\n';
//         case 'CONTINUE':
//             return 'continue;\n';
//     }
//     throw 'Unknown flow statement.';
// };

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
export const controls_delay = function () {
    var delay_time = Python.valueToCode(this, 'DELAY_TIME', Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};
//ok
export const Panic_with_status_code = function () {
    var status_code = Python.valueToCode(this, 'STATUS_CODE', Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
export const controls_millis = function () {
    Python.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, Python.ORDER_ATOMIC];
};

//ok
export const reset = function () {
    Python.definitions_['import_microbit'] = 'from microbit import *'
    return 'reset()\n';
};
export const controls_interrupts = function () {
    return 'interrupts();\n';
};

export const controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};


export const controls_forEach = function (block) {
    // For each loop.
    var variable0 = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '\'\'';
    var argument0 = Python.valueToCode(block, 'LIST',
        Python.ORDER_RELATIONAL) || '[]';
    var branch = Python.statementToCode(block, 'DO');
    branch = Python.addLoopTrap(branch, block.id) ||
        Python.PASS;
    var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
    return code;
};


export const controls_range = function () {
    var from = Python.valueToCode(this, "FROM", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "TO", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "STEP", Python.ORDER_NONE) || "1";
    var code = "range(" + from + ", " + end + ", " + step + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const controls_lambda = function (a) {
    var c = Python.valueToCode(a, "BOOL", Python.ORDER_NONE) || "None",
        d = Python.statementToCode(a, "DO") || "pass";
    var code = "lambda " + c + ": " + d;
    code = code.replace('\n', '').replace('    ', '')
    return [code, Python.ORDER_ATOMIC];
};

export const time_sleep = function () {
    Python.definitions_['import_time'] = 'import time';
    var delay_time = Python.valueToCode(this, 'DELAY_TIME', Python.ORDER_ATOMIC) || '1000'
    var code = 'time.sleep(' + delay_time + ')\n';
    return code;
};

export const controls_pass = function () {
    return 'pass\n';
};

export const controls_thread = function () {
    Python.definitions_['import__thread'] = 'import _thread';
    var v = Python.valueToCode(this, "VAR", Python.ORDER_NONE) || "None";
    var callback = Python.variableDB_.getName(
        Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None",
        Blockly.Procedures.NAME_TYPE
    );
    var code = "_thread.start_new_thread(" + callback + ", " + v + ")\n";
    return code;
};

//do-while循环
export const do_while = function () {
    var value_select_data = Python.valueToCode(this, 'select_data', Python.ORDER_NONE) || "False";
    var statements_input_data = Python.statementToCode(this, 'input_data')
    var dropdown_type = this.getFieldValue('type');
    if (dropdown_type == 'true') {
        statements_input_data = statements_input_data + '    if (' + value_select_data + '):\n' + '        break\n';
    }
    else {
        statements_input_data = statements_input_data + '    if not (' + value_select_data + '):\n' + '        break\n';
    }
    statements_input_data = Python.addLoopTrap(statements_input_data, this.id) || Python.PASS;
    //var dropdown_type = this.getFieldValue('type');
    var code = 'while True:\n' + statements_input_data;
    return code;
};

// export const base_type = controls_type;
// export const controls_TypeLists = controls_typeLists;

export const controls_repeat_ext = function (a) {
    var times = Python.valueToCode(this, 'TIMES', Python.ORDER_ATOMIC);
    var d = Python.statementToCode(a, "DO"),
        d = Python.addLoopTrap(d, a.id) || Python.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
};

//ok
export const controls_repeat = controls_repeat_ext;