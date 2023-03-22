'use strict';

goog.provide('Blockly.Blocks.Handbit');
goog.require('Blockly.Blocks');
Blockly.Msg['HANDBIT_HUE'] = 65;

Blockly.Blocks.handbit_button_is_pressed = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_BUTTON);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'btn');
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_SENOR_IS_PRESSED);
}
};

Blockly.Blocks.handbit_light = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
}
};

Blockly.Blocks.handbit_sound = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
}
};

Blockly.Blocks.inout_touchRead = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
     this.appendValueInput("PIN", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_TOUCH+Blockly.Msg.Lang.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput()
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_MACHINE_VALUE)
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
}
};

Blockly.Blocks.touchAttachInterrupt = {
  init: function () {
    this.setColour(Blockly.Msg['BASE_HUE']);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_TOUCHATTACHINTERRUPT_PIN)
    .setCheck(Number);
    this.appendValueInput("threshold", Number)
    .appendField(Blockly.Msg.Lang.MIXLY_ESP32_THRESHOLD)
    .setCheck(Number);
    this.appendDummyInput("");
    this.appendStatementInput('DO')
    .appendField(Blockly.Msg.Lang.MIXLY_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
}
};

var HANDBIT_MSA300_GETAB = [
[Blockly.Msg.Lang.MixGo_MPU9250_AX, "msa.getX()"],
[Blockly.Msg.Lang.MixGo_MPU9250_AY, "msa.getY()"],
[Blockly.Msg.Lang.MixGo_MPU9250_AZ, "msa.getZ()"],
];

var HANDBIT_MSA300_ACTION = [
[Blockly.Msg.Lang.HANDBIT_FORWARD, "msa.getX()>1500&&msa.getX()<2000&&msa.getZ()>-1000&&msa.getZ()<0"],
[Blockly.Msg.Lang.HANDBIT_BACKWARD, "msa.getX()>1500&&msa.getX()<2000&&msa.getZ()>0&&msa.getZ()<1500"],
[Blockly.Msg.Lang.HANDBIT_LEFT, "msa.getY()<1000&&msa.getY()>0"],
[Blockly.Msg.Lang.HANDBIT_RIGHT, "msa.getY()<0&&msa.getY()>-1000"],
[Blockly.Msg.Lang.HANDBIT_UP, "msa.getX()>-400&&msa.getX()<400&&msa.getY()>-400&&msa.getY()<400&&msa.getZ()>-1800&&msa.getZ()<-1400"],
[Blockly.Msg.Lang.HANDBIT_DOWN, "msa.getX()>-400&&msa.getX()<400&&msa.getY()>-400&&msa.getY()<400&&msa.getZ()>2000&&msa.getZ()<2400"],

];

//传感器_重力感应
Blockly.Blocks.handbit_MSA300 = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MixGo_MPU9250);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(HANDBIT_MSA300_GETAB), "HANDBIT_MSA300_GETAB");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("");
    this.setHelpUrl('');
}
};

Blockly.Blocks.handbit_MSA300_action = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.Handbit);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(HANDBIT_MSA300_ACTION), "HANDBIT_MSA300_ACTION");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("");
    this.setHelpUrl('');
}
};

Blockly.Blocks.handbit_rgb_rainbow1 = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendValueInput("WAIT")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RGBdisplay_rgb_rainbow1);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.handbit_rgb_rainbow3 = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
    this.appendValueInput("rainbow_color")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_display_rgb_rainbow3);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.handbit_rgb = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendValueInput("_LED_")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_NUM);
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

Blockly.Blocks.handbit_rgb2 = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_NUM+"1"+Blockly.Msg.Lang.HTML_COLOUR);
    this.appendValueInput("COLOR1", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_NUM+"2"+Blockly.Msg.Lang.HTML_COLOUR);
    this.appendValueInput("COLOR2", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_NUM+"3"+Blockly.Msg.Lang.HTML_COLOUR);
    this.appendValueInput("COLOR3", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.handbit_rgb_Brightness = {
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

Blockly.Blocks.handbit_rgb_show = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_SHOW)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.handbit_motor_move= {
  init: function() { 
  this.appendDummyInput()
      .appendField("掌控宝"+Blockly.Msg.Lang.MIXLY_MOTOR)
      .appendField(new Blockly.FieldDropdown([["M1","0x01"],["M2","0x10"]]), "type");
  this.appendValueInput("speed")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.Lang.MIXLY_SPEED+"(-100~100)");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(Blockly.Msg['ACTUATOR_HUE']);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.handbit_RGB_color_HSV = {
  init: function () {
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_RGB);
    this.appendValueInput("_LED_")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RGB_NUM);
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