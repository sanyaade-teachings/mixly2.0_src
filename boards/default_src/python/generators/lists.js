import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const lists_get_sublist = function () {
    // Get sublist.
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var at1 = Python.valueToCode(this, 'AT1', Python.ORDER_ADDITIVE);
    var at2 = Python.valueToCode(this, 'AT2', Python.ORDER_ADDITIVE);
    var code = list + '[' + at1 + ' : ' + at2 + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const lists_2d_get_data_with_col_row = function () {
    var value_LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC) || 'mylist';
    var value_row = Python.valueToCode(this, 'row', Python.ORDER_ATOMIC) || 0;
    var value_col = Python.valueToCode(this, 'col', Python.ORDER_ATOMIC) || 0;
    var code = value_LIST + '[' + value_row + ',' + value_col + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const lists_2d_get_col_row_data = function () {
    var value_LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC) || 'mylist';
    var value_row_start = Python.valueToCode(this, 'row_start', Python.ORDER_ATOMIC) || 0;
    var value_row_end = Python.valueToCode(this, 'row_end', Python.ORDER_ATOMIC) || 1;
    var value_col_start = Python.valueToCode(this, 'col_start', Python.ORDER_ATOMIC) || 0;
    var value_col_end = Python.valueToCode(this, 'col_end', Python.ORDER_ATOMIC) || 1;
    var code = value_LIST + '[' + value_row_start + ' : ' + value_row_end + ',' + value_col_start + ' : ' + value_col_end + ']';
    return [code, Python.ORDER_ATOMIC];
};



export const lists_create_with = function () {
    // Create a list with any number of elements of any type.
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    //Python.setups_['var_declare'+varName] = varName+' = '+ '[' + code.join(', ') + ']\n';
    var code = varName + ' = ' + '[' + code.join(', ') + ']\n';
    return code;
};
export const lists_create_with_text = function () {
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = this.getFieldValue('TEXT');
    // Python.setups_['var_declare'+varName] = varName+' = '+ '[' + text + ']\n';
    var code = varName + ' = ' + '[' + text + ']\n';
    return code;
};

export const lists_get_index = function () {
    // Indexing into a list is the same as indexing into a string.
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var argument0 = Python.valueToCode(this, 'AT', Python.ORDER_ADDITIVE) || 0;
    var code = list + '[' + argument0 + ']';
    return [code, Python.ORDER_ATOMIC];
};


export const lists_set_index = function () {
    // Set element at index.
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var argument0 = Python.valueToCode(this, 'AT',
        Python.ORDER_ADDITIVE) || '0';
    var argument2 = Python.valueToCode(this, 'TO',
        Python.ORDER_ASSIGNMENT) || '0';
    // Blockly uses one-based indicies.
    return varName + '[' + argument0 + '] = ' + argument2 + '\n';
};

export const lists_append_extend = function () {
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'DATA', Python.ORDER_ASSIGNMENT) || '0';
    var op = this.getFieldValue('OP');
    var code = varName + '.' + op + '(' + argument + ')\n';
    return code;
};

export const lists_get_random_item = function () {
    Python.definitions_['import_random'] = 'import random';
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var code = 'random.choice(' + varName + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const lists_get_random_sublist = function () {
    Python.definitions_['import_random'] = 'import random';
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var VALUE = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'random.sample(' + varName + ',' + VALUE + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const lists_insert_value = function () {
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT) || '0';
    var at = Python.valueToCode(this, 'AT', Python.ORDER_ADDITIVE) || '0';
    var VALUE = Python.valueToCode(this, 'VALUE', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.insert(' + at + ', ' + VALUE + ')\n';
    return code;
};


export const lists_reverse = function () {
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.reverse()\n';
    return code;
}
export const lists_clear = function () {
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
}

export const lists_find = function () {
    var op = this.getFieldValue('OP');
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    if (op == 'INDEX')
        var code = varName + '.index(' + argument + ')';
    else if (op == 'COUNT')
        var code = varName + '.count(' + argument + ')';
    return [code, Python.ORDER_ATOMIC];
}

export const lists_remove_at = function () {
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'DATA', Python.ORDER_ASSIGNMENT) || '0';
    var op = this.getFieldValue('OP');
    var code = "";
    if (op == "del") {
        code = 'del ' + varName + '[' + argument + ']\n';
    } else {
        code = varName + '.remove' + '(' + argument + ')\n';
    }
    return code;
};

export const lists_pop = function () {
    var varName = Python.valueToCode(this, 'LIST', Python.ORDER_ADDITIVE) || 'mylist';
    var argument = Python.valueToCode(this, 'VALUE', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pop(' + argument + ')';
    return [code, Python.ORDER_ATOMIC];
}

export const list_trig = function (a) {
    var b = a.getFieldValue("OP"), c;
    Python.definitions_['import_math'] = "import math";
    a = Python.valueToCode(a, 'data', Python.ORDER_NONE)
    switch (b) {
    case "LEN":
        c = "len(" + a + ")";
        break;
    case "SUM":
        c = "sum(" + a + ")";
        break;
    case "MIN":
        c = "min(" + a + ")";
        break;
    case "MAX":
        c = "max(" + a + ")";
        break;
    case 'AVERAGE':
        Python.definitions_['import_mixpy_math_mean'] = "from mixpy import math_mean";
        c = 'math_mean(' + a + ')';
        break;
    case 'MEDIAN':
        Python.definitions_['import_mixpy_math_median'] = "from mixpy import math_median";
        c = 'math_median(' + a + ')';
        break;
    case 'MODE':
        Python.definitions_['import_mixpy_math_modes'] = "from mixpy import math_modes";
        c = 'math_modes(' + a + ')';
        break;
    case 'STD_DEV':
        Python.definitions_['import_mixpy_math_standard_deviation'] = "from mixpy import math_standard_deviation";
        c = 'math_standard_deviation(' + a + ')';
        break;
    default:
        throw 'Unknown operator: ' + b;
    }
    if (c)
        return [c, Python.ORDER_ATOMIC];

};


export const lists_sort = function (block) {
    // Block for sorting a list.
    Python.definitions_['import_mixpy_lists_sort'] = "from mixpy import lists_sort";
    var list = (Python.valueToCode(block, 'LIST',
        Python.ORDER_NONE) || '[]');
    var type = block.getFieldValue('TYPE');
    var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';


    var code = 'lists_sort(' + list + ', "' + type + '", ' + reverse + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const lists_change_to = function () {
    var op = this.getFieldValue('OP');
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = '';
    if (op == 'array') {
        Python.definitions_['import_numpy'] = 'import numpy';
        code = 'numpy.array(' + varName + ')';
    }
    else {
        code = op + '(' + varName + ')';
    }
    return [code, Python.ORDER_ATOMIC];
}


export const list_many_input = function () {
    var text = this.getFieldValue('CONTENT');
    var code = '[' + text + ']'
    return [code, Python.ORDER_ATOMIC];
};

export const lists_create_with_noreturn = function () {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    var code = '[' + code.join(', ') + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const lists_change_to_general = lists_change_to;

export const lists_del_general = function () {
    var varName = Python.valueToCode(this, 'TUP', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'del ' + varName + '\n';
    return code;
};



export const lists_create_with2 = lists_create_with
export const lists_create_with_text2 = lists_create_with_text
export const lists_getIndex3 = lists_get_index
export const lists_getSublist3 = lists_get_sublist
export const lists_setIndex3 = lists_set_index
export const lists_insert_value2 = lists_insert_value
export const lists_remove_at2 = lists_remove_at

export const lists_zip = function () {
    var code = new Array(this.itemCount_);
    var default_value = '[]';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    var code = 'zip(' + code.join(', ') + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const list_tolist = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['list(' + str + ')', Python.ORDER_ATOMIC];
};

export const list_tolist2 = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return [str + '.tolist()', Python.ORDER_ATOMIC];
};