'use strict';

goog.provide('Blockly.Blocks.ndata');
goog.require('Blockly.Blocks');

goog.require('Mixly.Config');

Blockly.Blocks.ndata.HUE = '#8D7BC5'

Blockly.Blocks['web_data_seniverse_get_weather_now'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_weather_daily'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('DAYS')
            .appendField(Blockly.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_weather_hours'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_HOURS)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('HOURS')
            .appendField(Blockly.MIXLY_WEB_HOURS);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_weather_alarm'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_life_suggestion'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('DAYS')
            .appendField(Blockly.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_air_now'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_air_daily'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('DAYS')
            .appendField(Blockly.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_tide_daily'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_geo_sun'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('DAYS')
            .appendField(Blockly.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['web_data_seniverse_get_geo_moon'] = {
    init: function(){
        this.setColour(Blockly.Blocks.ndata.HUE);
        this.appendValueInput('KEY')  
            .appendField(Blockly.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON)
            .appendField(Blockly.MIXLY_WEB_KEY);
        this.appendValueInput('LOCATION')
            .appendField(Blockly.MIXLY_WEB_PLACE);       
        this.appendValueInput('DAYS')
            .appendField(Blockly.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};