'use strict';

goog.provide('Blockly.Python.ndata');
goog.require('Blockly.Python');

Blockly.Python.web_data_seniverse_get_weather_now = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.weather_now('+key+', '+location+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_weather_daily = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var days = Blockly.Python.valueToCode(this, 'DAYS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.weather_daily('+key+', '+location+', '+days+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_weather_hours = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var hours = Blockly.Python.valueToCode(this, 'HOURS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.weather_hourly('+key+', '+location+', '+hours+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_weather_alarm = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.weather_alarm('+key+', '+location+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_life_suggestion = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var days = Blockly.Python.valueToCode(this, 'DAYS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.life_suggestion('+key+', '+location+', '+days+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_air_now = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.air_now('+key+', '+location+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_air_daily = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var days = Blockly.Python.valueToCode(this, 'DAYS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.air_daily('+key+', '+location+', '+days+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_tide_daily = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.tide_daily('+key+', '+location+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_geo_sun = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var days = Blockly.Python.valueToCode(this, 'DAYS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.geo_sun('+key+', '+location+', '+days+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.web_data_seniverse_get_geo_moon = function(){
    var key = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var location = Blockly.Python.valueToCode(this, 'LOCATION', Blockly.Python.ORDER_ATOMIC);
    var days = Blockly.Python.valueToCode(this, 'DAYS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_seniverse_api'] = 'import seniverse_api';
    var code = 'seniverse_api.geo_moon('+key+', '+location+', '+days+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};