'use strict';

goog.provide('Blockly.Blocks.pe_g1');
goog.require('Blockly.Blocks');

Blockly.Msg['PEG1_HUE'] = 100

Blockly.Blocks.pe_g1_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.Lang.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Lang.MIXLY_SETUP + Blockly.Msg.Lang.LISTS_SET_INDEX_INPUT_TO)
            .appendField('PE G1');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['pe_g1_battery_left'] = {
    init: function(){
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MIXGO_CAR_BATTERY_LEFT);
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.pe_g1_dc_motor = {
    init: function () {
      this.setColour(Blockly.Msg['PEG1_HUE']);
      this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
      this.appendValueInput('PIN')
          .appendField(Blockly.Msg.Lang.MOTOR_DC)
          .appendField(Blockly.Msg.Lang.LCD_NUMBERING)   
      this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.Lang.CLOCKWISE, "CW"],
            [Blockly.Msg.Lang.ANTI_CLOCKWISE, "CCW"],
            [Blockly.Msg.Lang.MOTOR_P, "P"],
            [Blockly.Msg.Lang.MOTOR_N, "N"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.Lang.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput("")
          .appendField("%")    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.pe_g1_dc_motor_speed = {
    init: function () {
      this.setColour(Blockly.Msg['PEG1_HUE']);
      this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
      this.appendValueInput('PIN')
          .appendField(Blockly.Msg.Lang.MOTOR_DC)
          .appendField(Blockly.Msg.Lang.LCD_NUMBERING)          
          
      this.appendDummyInput()          
          .appendField(Blockly.Msg.Lang.MIXLY_STEPPER_GET_SPEED);
      this.setOutput(true,Number);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.pe_g1_servo_set_angle = {
    init: function() {
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
        this.appendValueInput('PIN')
            .appendField('180°'+Blockly.Msg.Lang.MIXLY_SERVO)
            .appendField(Blockly.Msg.Lang.LCD_NUMBERING)          
          
        this.appendValueInput("NUM", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_BY_ANGLE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_ESP32_SERVO_MOVE);
    }
};

Blockly.Blocks.pe_g1_servo_set_speed = {
    init: function() {
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
        this.appendValueInput('PIN')
            .appendField('360°'+Blockly.Msg.Lang.MIXLY_SERVO)
            .appendField(Blockly.Msg.Lang.LCD_NUMBERING)          
          
        this.appendValueInput("NUM", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.Lang.MIXLY_SPEED);
        this.appendDummyInput()
            .appendField('%');    
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_ESP32_SERVO_SPEED_TOOLIPS);
    }
};

Blockly.Blocks.pe_g1_servo_get_angle = {
    init: function() {
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
        this.appendValueInput('PIN')
            .appendField('180°'+Blockly.Msg.Lang.MIXLY_SERVO)
            
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.MIXLY_GET+Blockly.Msg.Lang.MIXLY_MICROBIT_JS_BY_ANGLE);      
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.pe_g1_servo_get_speed = {
    init: function() {
        this.setColour(Blockly.Msg['PEG1_HUE']);
        this.appendValueInput('SUB')
            .appendField("PE G1")
            .setCheck("var");
        this.appendValueInput('PIN')
            .appendField('360°'+Blockly.Msg.Lang.MIXLY_SERVO)
            .appendField(Blockly.Msg.Lang.LCD_NUMBERING)
            
        this.appendDummyInput()
            .appendField(Blockly.Msg.Lang.MIXLY_GET+Blockly.Msg.Lang.MIXLY_SPEED);    
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};