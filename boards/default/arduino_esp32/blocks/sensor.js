'use strict';

goog.provide('Blockly.Blocks.sensor');
goog.require('Blockly.Blocks');
Blockly.Msg['SENSOR_HUE'] = 40;
//ESP32片内霍尔传感器值
profile["default"] = profile["esp32_handbit"];
Blockly.Blocks['ESP32_hallRead'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(Blockly.Msg.ESP32_HALL);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.setTooltip();
    this.setHelpUrl("");
}
};

//ESP32片内温度传感器值
Blockly.Blocks['ESP32_temprature'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(Blockly.Msg.ESP32_TEMP);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.setTooltip();
    this.setHelpUrl("");
}
};

Blockly.Blocks.OneButton = {
  init: function() {
    this.setColour(Blockly.Msg['BASE_HUE']);
     this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.appendDummyInput("")
    .appendField(Blockly.Msg.MIXLY_BUTTON)
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_CLICK, "attachClick"], [Blockly.Msg.MIXLY_DOUBLE_CLICK, "attachDoubleClick"], [Blockly.Msg.MIXLY_LONG_PRESS_START, "attachLongPressStart"], [Blockly.Msg.MIXLY_DURING_LONG_PRESS, "attachDuringLongPress"], [Blockly.Msg.MIXLY_LONG_PRESS_END, "attachLongPressStop"]]), "mode");
    this.appendStatementInput('DO')
    .appendField(Blockly.Msg.MIXLY_DO);
    this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    this.setInputsInline(true);
    this.setHelpUrl();
}
};

Blockly.Blocks.ESP_TCS34725_Get_RGB = {
  init: function() {
    const TCS34725_COLOR = [
      [Blockly.Msg.COLOUR_RGB_RED, "r"],
      [Blockly.Msg.COLOUR_RGB_GREEN, "g"],
      [Blockly.Msg.COLOUR_RGB_BLUE, "b"],
    ];
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.TCS34725_Get_RGB)
    .appendField(new Blockly.FieldDropdown(TCS34725_COLOR), "TCS34725_COLOR");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};