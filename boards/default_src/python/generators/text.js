import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const text = function () {
    // Text value.
    //var code = 'String('+Python.quote_(this.getFieldValue('TEXT'))+')';
    var code = Python.quote_(this.getFieldValue('TEXT'));
    return [code, Python.ORDER_ATOMIC];
};

export const text_textarea = function () {
    // Text value.
    //var code = 'String('+Python.quote_(this.getFieldValue('TEXT'))+')';
    var code = '"""' + (this.getFieldValue('VALUE')) + '"""';
    return [code, Python.ORDER_ATOMIC];
};

export const text_char = function () {
    var code = '\'' + this.getFieldValue('TEXT') + '\'';
    return [code, Python.ORDER_ATOMIC];
};

export const text_join = function () {
    // Text value.
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC);
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC);
    return [a + ' + ' + b, Python.ORDER_ADDITIVE];
};

export const text_to_number = function () {
    var towhat = this.getFieldValue('TOWHAT');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    if (towhat == 'b') return ['' + str + '.encode("utf-8")', Python.ORDER_ATOMIC];
    return [towhat + "(" + str + ')', Python.ORDER_ATOMIC];
};

export const text_to_number_skulpt = function () {
    var towhat = this.getFieldValue('TOWHAT');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    if (towhat == 'b') return ['' + str + '.encode("utf-8")', Python.ORDER_ATOMIC];
    return [towhat + "(" + str + ')', Python.ORDER_ATOMIC];
};

export const ascii_to_char = function () {
    var asciivalue = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['chr(' + asciivalue + ')', Python.ORDER_ATOMIC];
};

export const char_to_ascii = function () {
    var charvalue = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || 'a';
    return ['ord(' + charvalue + ')', Python.ORDER_ATOMIC];
};

export const number_to_text = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['str(' + str + ')', Python.ORDER_ATOMIC];
};

export const text_length = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['len(' + str + ')', Python.ORDER_ATOMIC];
};

export const text_char_at2 = function (a) {
    var c = a.getFieldValue("WHERE") || "FROM_START",
        str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    switch (c) {
    case "FROM_START":
        a = Python.getAdjustedInt(a, "AT");
        return [str + "[" + a + "]", Python.ORDER_ATOMIC];
    case "FROM_END":
        a = Python.getAdjustedInt(a, "AT", 1, !0);
        return [str + "[" + a + "]", Python.ORDER_ATOMIC];
    case "RANDOM":
        Python.definitions_.import_random = "import random";
        return ["random.choice(" + str + ")", Python.ORDER_FUNCTION_CALL];
    }
    throw "Unhandled combination (lists_getIndex).";
};

export const text_char_at = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var at = Python.valueToCode(this, 'AT', Python.ORDER_ATOMIC) || 0;
    return [str + "[" + at + "]", Python.ORDER_ATOMIC];
}

export const text_random_char = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    Python.definitions_.import_random = "import random";
    return ["random.choice(" + str + ")", Python.ORDER_FUNCTION_CALL];
}

export const text_equals_starts_ends = function () {
    var str1 = (Python.valueToCode(this, 'STR1', Python.ORDER_ATOMIC) || '""');
    var str2 = (Python.valueToCode(this, 'STR2', Python.ORDER_ATOMIC) || '""');
    var dowhat = this.getFieldValue('DOWHAT');
    if (dowhat === '===')
        return [str1 + ' == ' + str2, Python.ORDER_ATOMIC];
    return [str1 + '.' + dowhat + '(' + str2 + ')', Python.ORDER_ATOMIC];
};

export const text_compare_to = function () {
    var str1 = (Python.valueToCode(this, 'STR1', Python.ORDER_ATOMIC) || '""');
    var str2 = (Python.valueToCode(this, 'STR2', Python.ORDER_ATOMIC) || '""');
    return ['cmp(' + str1 + ',' + str2 + ')', Python.ORDER_ATOMIC];
};

export const text_substring2 = function (block) {
    // Get sublist.
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var where1 = block.getFieldValue('WHERE1');
    var where2 = block.getFieldValue('WHERE2');
    switch (where1) {
    case 'FROM_START':
        var at1 = Python.getAdjustedInt(block, 'AT1');
        if (at1 == '0') {
            at1 = '';
        }
        break;
    case 'FROM_END':
        var at1 = Python.getAdjustedInt(block, 'AT1', 0, true);
        break;
    case 'FIRST':
        var at1 = '0';
        break;
    default:
        throw 'Unhandled option (lists_getSublist)';
    }
    switch (where2) {
    case 'FROM_START':
        var at2 = Python.getAdjustedInt(block, 'AT2');
        break;
    case 'FROM_END':
        var at2 = Python.getAdjustedInt(block, 'AT2', 0, true);
        // Ensure that if the result calculated is 0 that sub-sequence will
        // include all elements as expected.
        if (!Blockly.isNumber(String(at2))) {
            Python.definitions_['import_sys'] = 'import sys';
            at2 += ' or sys.maxsize';
        } else if (at2 == '0') {
            at2 = '';
        }
        break;
    case 'LAST':
        var at2 = '-1';
        break;
    default:
        throw 'Unhandled option (lists_getSublist)';
    }
    var code = str + '[' + at1 + ' : ' + at2 + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const text_substring = function () {
    // Get sublist.
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var at1 = Python.valueToCode(this, 'AT1', Python.ORDER_ATOMIC);
    var at2 = Python.valueToCode(this, 'AT2', Python.ORDER_ATOMIC);
    var code = str + '[' + at1 + ' : ' + at2 + ']';
    return [code, Python.ORDER_ATOMIC];
}

export const text_capital = function () {
    var capital = this.getFieldValue('CAPITAL');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return ['' + str + '.' + capital + '()', Python.ORDER_ATOMIC];
};

export const text_center = function () {
    var center = this.getFieldValue('CENTER');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var width = Python.valueToCode(this, 'WID', Python.ORDER_ATOMIC);
    var symbol = Python.valueToCode(this, 'Symbol', Python.ORDER_ATOMIC);
    return ['' + str + '.' + center + '(' + width + ',' + symbol + ')', Python.ORDER_ATOMIC];
};

export const text_find = function () {
    var sentence = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var str = Python.valueToCode(this, 'STR', Python.ORDER_ATOMIC);
    return ['' + sentence + '.find(' + str + ')', Python.ORDER_ATOMIC];
};

export const text_join_seq = function () {
    var sentence = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT) || '0';
    return [sentence + '.join(' + varName + ')', Python.ORDER_ATOMIC];
};

export const text_replace = function () {
    var sentence = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var str1 = Python.valueToCode(this, 'STR1', Python.ORDER_ATOMIC);
    var str2 = Python.valueToCode(this, 'STR2', Python.ORDER_ATOMIC);
    return ['' + sentence + '.replace(' + str1 + ',' + str2 + ')', Python.ORDER_ATOMIC];
};


export const text_split = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var argument = Python.valueToCode(this, 'VAL', Python.ORDER_ATOMIC) || '""';
    var code = str + ".split(" + argument + ")";
    return [code, Python.ORDER_ATOMIC];
};



export const text_strip = function () {
    var towhat = this.getFieldValue('TOWHAT');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = str + "." + towhat + "()";
    return [code, Python.ORDER_ATOMIC];
};

export const text_format = function () {
    // Create a list with any number of elements of any type.
    var s = this.getFieldValue('VAR');
    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }

    var code = s + '.format(' + code.join(', ') + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const text_format_noreturn = function () {
    // Create a list with any number of elements of any type.
    var s = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }

    var code = s + '.format(' + code.join(', ') + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const text_substring3 = text_substring
export const text_compareTo = text_compare_to
export const text_char_at3 = text_char_at

export const text_encode = function () {
    var code = this.getFieldValue('DIR');
    var varName = this.getFieldValue('CODE')
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return [str + '.' + code + '("' + varName + '")', Python.ORDER_ATOMIC];
};

export const text_eval = function () {
    var codestr = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "eval" + '(' + codestr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const os_system = function () {
    Python.definitions_['import_os'] = 'import os';
    var codestr = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "os.system" + '(' + codestr + ')\n';
    return code;
};