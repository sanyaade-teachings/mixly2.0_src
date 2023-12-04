import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const requests_get_old = function () {
    Python.definitions_.import_requests = "import requests";
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var str = Python.valueToCode(this, 'DOMAIN', Python.ORDER_ATOMIC);
    var code = varName + '= ' + 'requests.get(' + str + ')\n';
    return code;
};

export const requests_get = function () {
    Python.definitions_.import_requests = "import requests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = Python.valueToCode(this, 'URL', Python.ORDER_ATOMIC);
    var code = 'requests.' + dropdown_type + '(' + str + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const requests_post = function () {
    Python.definitions_.import_requests = "import requests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = Python.valueToCode(this, 'URL', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = 'requests.' + dropdown_type + '(' + str + ',data=' + data + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const requests_attribute = function () {
    Python.definitions_.import_requests = "import requests";
    var varName = Python.valueToCode(this, 'VAL', Python.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, Python.ORDER_ATOMIC];
};


export const requests_method = function () {
    Python.definitions_.import_requests = "import requests";
    var method = this.getFieldValue('DIR');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "requests." + method + "(" + str + ')\n';
    return code;
};