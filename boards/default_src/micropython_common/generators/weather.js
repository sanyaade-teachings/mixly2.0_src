import * as Blockly from 'blockly/core';

export const WEATHER_NOW = function () {
    Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const WEATHER_DAILY = function () {
    Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC);
    var day = Blockly.Python.valueToCode(this, 'day', Blockly.Python.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ',' + day + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const WEATHER_HOUR = function () {
    Blockly.Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC);
    var hour = Blockly.Python.valueToCode(this, 'hour', Blockly.Python.ORDER_ATOMIC);
    var code = 'seniverse_api.weather_hourly(' + key + ',' + addr + ',' + hour + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};