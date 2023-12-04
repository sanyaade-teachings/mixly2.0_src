/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for dictionary blocks.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
import * as Blockly from 'blockly/core';
import Python from '../python_generator';

export const dicts_create_with = function () {
    // Create a list with any number of elements of any type.
    //var dropdown_type = this.getFieldValue('TYPE');
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        code[n] = keyName + ":" + (Python.valueToCode(this, 'ADD' + n, Python.ORDER_NONE) || default_value);
    }
    var code = varName + '= ' + '{' + code.join(', ') + '}\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
    //Python.setups_['setup_lists'+varName] = code;
    return code;
};



export const dicts_keys = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.keys()';
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_get = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var code = varName + "[" + text + "]";
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_get_default = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    // var text=this.getFieldValue('KEY');
    var code = varName + ".get(" + text + ',' + argument + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_add_or_change = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || 'mydict';
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + "[" + text + "] = " + argument + '\n';
    return code;
};

export const dicts_delete = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || 'mydict';
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var code = "del " + varName + "[" + text + "]\n";
    return code;
};

export const dicts_update = function () {
    var varName2 = Python.valueToCode(this, 'DICT2', Python.ORDER_ASSIGNMENT) || '0';
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.update(' + varName2 + ')\n';
    return code;
};

export const dicts_clear = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
};

export const dicts_items = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.items()';
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_values = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.values()';
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_length = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'len(' + varName + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const dicts_deldict = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'del ' + varName + '\n';
    return code;
};

export const dicts_add_change_del = function (block) {
    var dict = Python.valueToCode(block, 'DICT',
        Python.ORDER_MEMBER) || '[]';
    var mode = block.getFieldValue('WHERE');
    var KEY = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');

    switch (mode) {
    case 'INSERT':
        //var at2 = block.getFieldValue('AT2');
        var at2 = Python.valueToCode(this, 'AT2', Python.ORDER_ASSIGNMENT) || '0';
        var code = dict + "[" + KEY + "] = " + at2 + '\n'
        break;

    case 'DELETE':
        var code = 'del ' + dict + "[" + KEY + "]\n"
        break;
    default:
        throw 'Unhandled option (lists_setIndex2)';
    }
    return code;
};

export const dicts_pop = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var code = varName + ".pop(" + text + ")";
    return [code, Python.ORDER_ATOMIC];
}


export const dicts_setdefault = function () {
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || 'mydict';
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + ".setdefault" + "(" + text + "," + argument + ")\n";
    return code;
};

export const dicts_create_with_noreturn = function () {
    // Create a list with any number of elements of any type.
    // var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
    //  Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';

    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        code[n] = keyName + ":" + (Python.valueToCode(this, 'ADD' + n, Python.ORDER_NONE) || default_value);
    }
    // if (this.itemCount_!=1){
    //  Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
    // else {
    // Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
    if (this.itemCount_ != 1) {
        var code = '{' + code.join(', ') + '}';
    }
    else {
        var code = '{' + code.join(', ') + ',}';
    }

    return [code, Python.ORDER_ATOMIC];
};

export const dicts_todict = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0'
    return ['dict(' + str + ')', Python.ORDER_ATOMIC];
};