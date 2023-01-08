'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Msg['ACTUATOR_HUE'] = 100


Blockly.Blocks.actuator_stepper_keep = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField("MixGo Car")
          .appendField(new Blockly.FieldDropdown([
            [Blockly.blockpy_forward, "F"],
            [Blockly.blockpy_backward, "B"],
            [Blockly.blockpy_left, "L"],
            [Blockly.blockpy_right, "R"]
            ]), "VAR");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput()
          .appendField('%')    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.actuator_stepper = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_HUE']);
      this.appendDummyInput()
          .appendField("MixGo Car")
          .appendField(new Blockly.FieldDropdown([
            [Blockly.blockpy_forward, "forward"],
            [Blockly.blockpy_backward, "back"],
            [Blockly.blockpy_left, "left"],
            [Blockly.blockpy_right, "right"]
            ]), "VAR");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
      this.appendValueInput('steps')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.actuator_stepper_stop = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField("MixGo Car")
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MOTOR_P, "P"],
            [Blockly.MOTOR_N, "N"]
            ]), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.actuator_stepper_readbusy = {
    init: function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput()
            .appendField("MixGo Car")
            .appendField(Blockly.MIXGO_CAR_READBUSY);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.actuator_stepper_wheel = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_STEPPER)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLYCAR_WHEEL_LEFT_UP, "_A_B"],
            [Blockly.MIXLYCAR_WHEEL_LEFT_DOWN, "_B_A"],
            [Blockly.MIXLYCAR_WHEEL_RIGHT_UP, "_A_A"],
            [Blockly.MIXLYCAR_WHEEL_RIGHT_DOWN, "_B_B"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
            [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
      this.appendValueInput('steps')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.actuator_stepper_wheel_stop = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_STEPPER)
            .appendField(new Blockly.FieldDropdown([
                            [Blockly.MIXLYCAR_WHEEL_LEFT_UP, "_A_B"],
                            [Blockly.MIXLYCAR_WHEEL_LEFT_DOWN, "_B_A"],
                            [Blockly.MIXLYCAR_WHEEL_RIGHT_UP, "_A_A"],
                            [Blockly.MIXLYCAR_WHEEL_RIGHT_DOWN, "_B_B"]
            ]), "wheel");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_STOP)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.actuator_stepper_wheel_readbusy = {
    init: function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_STEPPER)
            .appendField(new Blockly.FieldDropdown([
                            [Blockly.MIXLYCAR_WHEEL_LEFT_UP, "_A_B"],
                            [Blockly.MIXLYCAR_WHEEL_LEFT_DOWN, "_B_A"],
                            [Blockly.MIXLYCAR_WHEEL_RIGHT_UP, "_A_A"],
                            [Blockly.MIXLYCAR_WHEEL_RIGHT_DOWN, "_B_B"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.MIXGO_CAR_READBUSY);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.esp32_s2_mixgo_car_audio_init =  {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SETUP+Blockly.MIXGO_CE_SPEAKER);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_INIT_TOOLTIP);   
    }
};

Blockly.Blocks.esp32_s2_mixgo_car_audio_wave_play = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendValueInput('wav')
            .appendField(Blockly.MIXGO_WAVE)        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.esp32_s2_mixgo_car_audio_wave_is_playing = {
    init: function(){
        this.setColour(Blockly.Msg['ACTUATOR_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXGO_WAVE_IS_PLAYING);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.actuator_dc_motor = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLYCAR_WHEEL_LEFT, "L"],
            [Blockly.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, "CW"],
            [Blockly.Msg.ANTI_CLOCKWISE, "CCW"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput()
          .appendField('%')    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.actuator_dc_motor_stop = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLYCAR_WHEEL_LEFT, "L"],
            [Blockly.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_STOP)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.MOTOR_P, "P"],        
            [Blockly.MOTOR_N, "N"]            
            ]), "direction");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}