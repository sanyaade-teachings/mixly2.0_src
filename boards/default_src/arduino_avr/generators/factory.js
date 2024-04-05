import { Arduino } from '../../arduino_common/arduino_generator';

export const factory_include = function () {
    var INCLUDE = this.getFieldValue('INCLUDE');
    Arduino.definitions_['include_' + INCLUDE] = '#include <' + INCLUDE + '.h>';
    return '';
};

export const factory_function_noreturn = function () {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return NAME + '(' + code.join(', ') + ');\n';
};

export const factory_function_return = function () {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return [NAME + '(' + code.join(', ') + ')', Arduino.ORDER_ATOMIC];
};

export const factory_declare = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    Arduino.definitions_['var_' + TYPE + '_' + NAME] = TYPE + ' ' + NAME + ';';
    return '';
};
export const factory_declare2 = function () {
    var VALUE = this.getFieldValue('VALUE');
    Arduino.definitions_['var_' + VALUE] = VALUE;
    return '';
};
export const factory_define = function () {
    var TYPE = this.getFieldValue('TYPE');
    if (TYPE.substr(0, 1) == '#')
        TYPE = TYPE.substr(1);
    var NAME = this.getFieldValue('NAME');
    Arduino.definitions_["define_" + TYPE + '_' + NAME] = '#' + TYPE + ' ' + NAME;
    return '';
};
export const factory_static_method_noreturn = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return TYPE + '::' + NAME + '(' + code.join(', ') + ');\n';
};

export const factory_static_method_return = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return [TYPE + '::' + NAME + '(' + code.join(', ') + ')', Arduino.ORDER_ATOMIC];
};

export const factory_callMethod_noreturn = function () {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return NAME + '.' + METHOD + '(' + code.join(', ') + ');\n';
};

export const factory_callMethod_return = function () {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || 'NULL';
    }
    return [NAME + '.' + METHOD + '(' + code.join(', ') + ')', Arduino.ORDER_ATOMIC];
};

export const factory_block = function () {
    var VALUE = this.getFieldValue('VALUE');
    //if(!(VALUE.charAt(VALUE.length-1)==";")){
    //VALUE=VALUE+';';
    //}
    return VALUE + '\n';
};

export const factory_block_return = function () {
    var VALUE = this.getFieldValue('VALUE');
    return [VALUE, Arduino.ORDER_ATOMIC];
};

export const factory_block_with_textarea = function () {
    var VALUE = this.getFieldValue('VALUE');
    //if(!(VALUE.charAt(VALUE.length-1)==";")){
    //VALUE=VALUE+';';
    //}
    return VALUE + '\n';
};

export const factory_block_return_with_textarea = function () {
    var VALUE = this.getFieldValue('VALUE');
    return [VALUE, Arduino.ORDER_ATOMIC];
};

