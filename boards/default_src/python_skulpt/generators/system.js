import Python from '../../python/python_generator';

export const controls_millis = function () {
    Python.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, Python.ORDER_ATOMIC];
};

export const controls_end_program = function () {
    return 'exit()\n';
};

export const time_localtime = function () {
    Python.definitions_.import_time = "import time";
    var op = this.getFieldValue('op');
    var code = "time.localtime()[" + op + "]";
    switch (op) {
    case "all":
        var code1 = "time.localtime()";
        return [code1, Python.ORDER_ASSIGNMENT];
    default:
        return [code, Python.ORDER_ASSIGNMENT];
    }
}

