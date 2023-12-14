import Python from '../../python/python_generator';

export const factory_from_import = function () {
    var path = this.getFieldValue('path');
    var module = this.getFieldValue('module');
    Python.definitions_['import_' + path + '_' + module] = 'from ' + path + ' import ' + module;
    return '';
};

export const factory_import = function () {
    var module = this.getFieldValue('module');
    Python.definitions_['import_' + module] = 'import ' + module;
    return '';
};

export const factory_function_noreturn = function () {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || '';
    }
    return NAME + '(' + code.join(', ') + ')\n';
};

export const factory_function_return = function () {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || '';
    }
    return [NAME + '(' + code.join(', ') + ')', Python.ORDER_ATOMIC];
};

export const factory_declare = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    return NAME + ' = ' + TYPE + '()\n';

};

export const factory_callMethod_noreturn = function () {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || '';
    }
    return NAME + '.' + METHOD + '(' + code.join(', ') + ')\n';
};

export const factory_callMethod_return = function () {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || '';
    }
    return [NAME + '.' + METHOD + '(' + code.join(', ') + ')', Python.ORDER_ATOMIC];
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
    return [VALUE, Python.ORDER_ATOMIC];
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
    return [VALUE, Python.ORDER_ATOMIC];
};

export const factory_block_notes = function () {
    var VALUE = this.getFieldValue('VALUE');
    return '#' + VALUE + '\n';
};