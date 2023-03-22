'use strict';

goog.provide('Blockly.Blocks.PocketCard');
goog.require('Blockly.Blocks');

Blockly.Msg['ACTUATOR_HUE'] = 100;
profile["default"] = profile["PocketCard"];

Blockly.Blocks.mixgo_button_is_pressed = {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_BUTTON);
     this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_SENOR_IS_PRESSED);
  }
};


Blockly.Blocks.sensor_mixgo_light= {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
  }
};

Blockly.Blocks.sensor_mixgo_sound= {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
  }
};

Blockly.Blocks.mixgo_touch_pin= {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
     .appendField(Blockly.Msg.Lang.MIXLY_ESP32_TOUCH)
     .appendField(Blockly.Msg.Lang.MIXLY_PIN)
     .appendField(new Blockly.FieldDropdown(profile.default.touch), 'touch_pin');
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_IS_TOUCHED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_sensor_pin_pressed);
  }
};

Blockly.Blocks.sensor_mixgo_light = {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_LIGHT)
      .appendField(new Blockly.FieldDropdown([["A", "39"], ["B", "36"]]), "direction");
    this.setOutput(true, Number);
    this.setInputsInline(true);
  }
};

//NTC电阻
Blockly.Blocks.NTC_TEMP = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField("NTC")
    .appendField(Blockly.Msg.Lang.MIXLY_TEMP);
    
    this.setInputsInline(false);
    this.setOutput(true, Number);
    this.setTooltip();
  }
};
var MixGo_MPU9250_GETAB = [
[Blockly.Msg.Lang.MixGo_MPU9250_AX, "a"],
[Blockly.Msg.Lang.MixGo_MPU9250_AY, "b"],
[Blockly.Msg.Lang.MixGo_MPU9250_AZ, "c"],
[Blockly.Msg.Lang.MixGo_MPU9250_GX, "d"],
[Blockly.Msg.Lang.MixGo_MPU9250_GY, "e"],
[Blockly.Msg.Lang.MixGo_MPU9250_GZ, "f"],
[Blockly.Msg.Lang.MixGo_MPU9250_MX, "g"],
[Blockly.Msg.Lang.MixGo_MPU9250_MY, "h"],
[Blockly.Msg.Lang.MixGo_MPU9250_MZ, "i"],
[Blockly.Msg.Lang.MIXLY_MICROBIT_Compass_heading, "j"]
];

Blockly.Blocks.MPU9250_update= {
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_HUE']);
   this.appendDummyInput("")
   .appendField("MPU9250"+Blockly.Msg.Lang.MIXLY_update_data);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setInputsInline(true);
 }
};
Blockly.Blocks.Pocket_rgb = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
  
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.HTML_COLOUR);
    this.appendValueInput("COLOR", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};

Blockly.Blocks.Pocket_rgb2 = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.HTML_COLOUR);
    this.appendValueInput("COLOR1", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.Pocket_rgb_Brightness = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_BRIGHTNESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};
Blockly.Blocks.Pocket_rgb_show = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_SHOW)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.pocket_RGB_color_HSV = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendValueInput("H")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.HSV_H);
    this.appendValueInput("S")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.HSV_S);
    this.appendValueInput("V")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.HSV_V);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('色调范围0-65536;饱和度范围0-255;明度范围0-255');
  }
};