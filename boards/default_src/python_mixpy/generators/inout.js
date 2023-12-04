import Python from '../../python/python_generator';

export const inout_input = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', Python.ORDER_ATOMIC];
};

export const inout_print = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
};

export const inout_print_inline = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
};

export const inout_print_end = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var end = Python.valueToCode(this, 'END', Python.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
};

export const inout_type_input = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var type = this.getFieldValue('DIR');
    if (type == 'str') { var code = 'input(' + str + ')' }
    else if (type == 'int') { var code = 'int(input(' + str + '))' }
    else if (type == 'float') { var code = 'float(input(' + str + '))' }
    //var code=varname+"." + type + "("   + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const pyinout_type_input = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var type = this.getFieldValue('DIR');
    Python.definitions_['import_pyinput'] = 'import pyinput';
    if (type == 'str') { var code = 'pyinput.input(' + str + ')' }
    else if (type == 'int') { var code = 'int(pyinput.input(' + str + '))' }
    else if (type == 'float') { var code = 'float(pyinput.input(' + str + '))' }
    //var code=varname+"." + type + "("   + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const inout_print_many = function () {


    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }

    var code = 'print(' + code.join(', ') + ')\n';
    return code;
};