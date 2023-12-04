import Python from '../../python/python_generator';

export const WEATHER_NOW = function () {
    Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const WEATHER_DAILY = function () {
    Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var day = Python.valueToCode(this, 'day', Python.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ',' + day + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const WEATHER_HOUR = function () {
    Python.definitions_['import_seniverse_api'] = "import seniverse_api";
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var hour = Python.valueToCode(this, 'hour', Python.ORDER_ATOMIC);
    var code = 'seniverse_api.weather_hourly(' + key + ',' + addr + ',' + hour + ')';
    return [code, Python.ORDER_ATOMIC];
};