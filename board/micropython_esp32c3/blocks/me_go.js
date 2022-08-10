'use strict';

goog.provide('Blockly.Blocks.me_go');
goog.require('Blockly.Blocks');

Blockly.Blocks.me_go.HUE = 100

//LED
Blockly.Blocks['me_go_light_number'] = {
    init: function() {
        this.setColour(Blockly.Blocks.me_go.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXGO_LEFT_FRONT+Blockly.Msg.COLOUR_RGB_GREEN+Blockly.MIXLY_EXTERN_LED, "GLED[0]"],
                [Blockly.MIXGO_RIGHT_FRONT+Blockly.Msg.COLOUR_RGB_GREEN+Blockly.MIXLY_EXTERN_LED, "GLED[1]"],
                [Blockly.MIXGO_LEFT_BACK+Blockly.Msg.COLOUR_RGB_GREEN+Blockly.MIXLY_EXTERN_LED, "GLED[3]"],
                [Blockly.MIXGO_RIGHT_BACK+Blockly.Msg.COLOUR_RGB_GREEN+Blockly.MIXLY_EXTERN_LED, "GLED[2]"],
                [Blockly.MIXGO_LEFT_FRONT+Blockly.Msg.COLOUR_RGB_RED+Blockly.MIXLY_EXTERN_LED, "RLED[0]"],
                [Blockly.MIXGO_RIGHT_FRONT+Blockly.Msg.COLOUR_RGB_RED+Blockly.MIXLY_EXTERN_LED, "RLED[1]"],
                [Blockly.MIXGO_LEFT_BACK+Blockly.Msg.COLOUR_RGB_RED+Blockly.MIXLY_EXTERN_LED, "RLED[3]"],
                [Blockly.MIXGO_RIGHT_BACK+Blockly.Msg.COLOUR_RGB_RED+Blockly.MIXLY_EXTERN_LED, "RLED[2]"],
                [Blockly.ME_GO_LIGHT_HEADLIGHT, "WLED"]
            ]), 'op')
        this.setOutput(true);
    }
};

Blockly.Blocks.me_go_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField('ME GO')
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.me_go_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField('ME GO')
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.me_go_get_led_state = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField('ME GO')
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.me_go_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField('ME GO')
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_BRIGHTNESS)
    this.appendDummyInput("")
    .appendField("%")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SETTING+Blockly.MIXLY_BUILDIN_LED+Blockly.MIXLY_BRIGHTNESS+'(0-10)');
  }
};


Blockly.Blocks.me_go_stepper_keep = {
    init: function () {
      this.setColour(Blockly.Blocks.me_go.HUE);
      this.appendDummyInput()
          .appendField("ME GO")
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
      this.appendDummyInput("")
          .appendField("%")    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.me_go_stepper_stop = {
    init: function () {
      this.setColour(Blockly.Blocks.me_go.HUE);
      this.appendDummyInput()
          .appendField("ME GO")
          .appendField(new Blockly.FieldDropdown([           
            [Blockly.MOTOR_P, "P"],
            [Blockly.MOTOR_N, "N"]
            ]), "VAR");      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.me_go_dc_motor = {
    init: function () {
      this.setColour(Blockly.Blocks.me_go.HUE);
      this.appendDummyInput()
          .appendField("ME GO")
          .appendField(Blockly.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLYCAR_WHEEL_LEFT, "0"],
            [Blockly.MIXLYCAR_WHEEL_RIGHT, "1"],
            [Blockly.ME_GO_MOTOR_EXTERN, "2"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.ROTATION_FORWARD, "CW"],
            [Blockly.Msg.ROTATION_BACKWARD, "CCW"],
            [Blockly.MOTOR_P, "P"],
            [Blockly.MOTOR_N, "N"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput("")
          .appendField("%")    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.me_go_hall_attachInterrupt = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_INTERRUPT)
    .appendField(Blockly.ME_GO_HALL_SENSOR)
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "A"], [Blockly.Msg.TEXT_TRIM_RIGHT, "B"]]), "mode");
    this.appendValueInput('DO')
        .appendField(Blockly.MIXLY_DO)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
}
};

Blockly.Blocks.me_go_hall_initialize = {
  init: function() {
    this.setColour(Blockly.Blocks.me_go.HUE);
    this.appendDummyInput("")    
    .appendField(Blockly.ME_GO_HALL_SENSOR)    
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "A"], [Blockly.Msg.TEXT_TRIM_RIGHT, "B"]]), "mode");
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SETUP)
    this.appendDummyInput("")
      .appendField(new Blockly.FieldDropdown([['turns', "turns"], ['distance', "distance"],['turns,distance','all']]), "args");    
    this.appendValueInput('num')
          .setCheck(Number)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
}
};

Blockly.Blocks['me_go_pin_near_line'] = {
    init: function(){
        this.setColour(Blockly.Blocks.me_go.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "[0]"], 
                [Blockly.MIXGO_LEFT_MID, "[1]"],
                [Blockly.MIXGO_RIGHT_MID, "[2]"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "[3]"],
                [Blockly.MIXLY_ALL, ""]
                ]), "key")
            .appendField(Blockly.MIXGO_LINE_SENSOR_VAL);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

Blockly.Blocks['me_go_pin_near'] = {
    init: function(){
        this.setColour(Blockly.Blocks.me_go.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXGO_LEFT_FRONT, "[0]"], 
                [Blockly.MIXGO_RIGHT_FRONT, "[1]"],
                [Blockly.MIXGO_LEFT_BACK, "[3]"],
                [Blockly.MIXGO_RIGHT_BACK, "[2]"],
                [Blockly.MIXLY_ALL, ""]
                ]), "key")
            .appendField(Blockly.MIXGO_PROXIMITY_SENSOR);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

Blockly.Blocks['me_go_pin_near_state_change'] = {
    init: function(){
        this.setColour(Blockly.Blocks.me_go.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGO_CAR_SENSOR_ONBOARD_CHANGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_MIXGO_CAR_SENSOR_ONBOARD_AUTO_CHANGE, "AS"],
                [Blockly.MIXLY_MIXGO_CAR_USE_LINE_ONLY, "LP"], 
                [Blockly.MIXLY_MIXGO_CAR_USE_PROXIMITY_ONLY, "OA"],
                [Blockly.ME_GO_SENSOR_MODE_OFF, "CL"]
                ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};
