'use strict';

goog.provide('Blockly.Blocks.weather');
goog.require('Blockly.Blocks');

Blockly.Msg['WEATHER_HUE'] = '#27b6ac';

Blockly.Blocks['WEATHER_NOW']={
    init: function() {
        this.setColour(Blockly.Msg['WEATHER_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.Blockly.Msg.Lang.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW, "weather_now"], 
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM, "weather_alarm"], 
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW, "air_now"],
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY, "tide_daily"],
                [Blockly.Msg.Lang.MIXLY_WEB_PLACE+Blockly.Msg.Lang.HTML_SEARCH, "location_search"]
                ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.Lang.MIXLY_API_PRIVATE_KEY);   
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.Lang.MIXLY_GEOGRAPHIC_LOCATION);        
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['WEATHER_DAILY']={
    init: function() {
        this.setColour(Blockly.Msg['WEATHER_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.Blockly.Msg.Lang.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY, "weather_daily"], 
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION, "life_suggestion"], 
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY, "air_daily"],
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN, "geo_sun"],
                [Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON, "geo_moon"]
                ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.Lang.MIXLY_API_PRIVATE_KEY);   
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.Lang.MIXLY_GEOGRAPHIC_LOCATION);     
        this.appendValueInput('day')
            .appendField(Blockly.Msg.Lang.MIXLY_WEB_DAILY);            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['WEATHER_HOUR']={
    init: function() {
        this.setColour(Blockly.Msg['WEATHER_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.Blockly.Msg.Lang.MSG.catweather)
            .appendField(Blockly.Msg.Lang.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_HOURS);
        this.appendValueInput('key')
            .appendField(Blockly.Msg.Lang.MIXLY_API_PRIVATE_KEY);   
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.Lang.MIXLY_GEOGRAPHIC_LOCATION);     
        this.appendValueInput('hour')
            .appendField(Blockly.Msg.Lang.MIXLY_WEB_HOURS);            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};