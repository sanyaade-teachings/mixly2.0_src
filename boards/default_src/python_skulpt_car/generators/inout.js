import Python from '../../python/python_generator';

export const inout_input = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', Python.ORDER_ATOMIC];
};

export const inout_print = function (block) {
    Python.definitions_.import_blocktool = "import blocktool";
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "blocktool.highlight('" + block.id + "')\n" + "print(" + str + ")\n";
    return code;
};

export const inout_print_inline = function (block) {
    Python.definitions_.import_blocktool = "import blocktool";
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var code = "blocktool.highlight('" + block.id + "')\n" + "print(" + str + ',end ="")\n';
    return code;
};

export const inout_print_end = function (block) {
    Python.definitions_.import_blocktool = "import blocktool";
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var end = Python.valueToCode(this, 'END', Python.ORDER_ATOMIC) || '""';
    var code = "blocktool.highlight('" + block.id + "')\n" + "print(" + str + ',end =' + end + ')\n';
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

export const inout_print_many = function (block) {
    Python.definitions_.import_blocktool = "import blocktool";
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    var code = "blocktool.highlight('" + block.id + "')\n" + 'print(' + code.join(', ') + ')\n';
    return code;
};