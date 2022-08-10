'use strict';

goog.provide('Blockly.Blocks.actuator_extern');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator_extern.HUE = '#74A55B'

//music
Blockly.Blocks.esp32_music_pitch_init = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MIDI)
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_RGB_PIN_COUNT);
    }
};

Blockly.Blocks.esp32_music_pitch = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_TONE)
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.esp32_music_pitch_with_time = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_TONE)
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

Blockly.Blocks.esp32_music_play_list = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendValueInput('LIST')
            .appendField(Blockly.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

Blockly.Blocks.esp32_music_set_tempo_extern = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendValueInput('TICKS')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_TEMPO)
            .appendField(Blockly.MICROBIT_ACTUATOR_ticks);
        this.appendValueInput('BPM')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_SET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_get_tempo_extern = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_Get_current_tempo)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_GET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_reset_extern = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_Reset_music)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_RESET);
    }
}

Blockly.Blocks.esp32_music_stop = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NOTONE)
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks.actuator_extern_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SETTING)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_SETONOFF);
  }
};

Blockly.Blocks.actuator_extern_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_extern_get_led_state = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_extern_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SETTING)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_BRIGHTNESS)
    this.appendDummyInput()
        .appendField('%')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_SETBRIGHT);
  }
};

//Servo
Blockly.Blocks.servo_init = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.MIXLY_SETUP+Blockly.MIXLY_SERVO)
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN )
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.servo_move = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.MIXLY_SERVO)
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DEGREE_0_180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_MOVE);
    }
};

Blockly.Blocks.servo_speed_360 = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("VAR")
            .appendField("360°"+Blockly.MIXLY_SERVO)
        this.appendValueInput("SPEED", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_SETTING+Blockly.blockpy_turtle_rotate+Blockly.MIXLY_SPEED+" (-10~10)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_360_TOOLTIP);
    }
};

//Servo
Blockly.Blocks.servo_set_angle = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("PIN", Number)
            .appendField('180°'+Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN )
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_MOVE);
    }
};

Blockly.Blocks.servo_set_speed = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("PIN", Number)
            .appendField('360°'+Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN )
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_SPEED);
        this.appendDummyInput()
            .appendField('%');    
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_SPEED_TOOLIPS);
    }
};

Blockly.Blocks.servo_get_angle = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("PIN", Number)
            .appendField('180°'+Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN )
            .setCheck(Number);  
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);      
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.servo_get_speed = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput("PIN", Number)
            .appendField('360°'+Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN )
            .setCheck(Number);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET+Blockly.MIXLY_SPEED);    
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.actuator_ms32006_init = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendValueInput('SUB')
            .appendField("初始化")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("电机驱动");           
        this.appendDummyInput()
            .appendField("地址")
            .appendField(new Blockly.FieldDropdown([['A', 'ms32006.ADDRESS_A'], ['B', 'ms32006.ADDRESS_B']]), 'mode');          
        this.appendValueInput('SUB1')
            .setCheck("var")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("通信");             
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("初始化MS32006电机驱动，使用I2C通信");
    }
};

Blockly.Blocks.actuator_ms32006_dcmotor = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendValueInput('SUB')
        .appendField("直流电机")
        .setCheck("var");
  this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Direction)
              .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
        [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"],
        [Blockly.MOTOR_N, "ms32006.MOT_N"],
        [Blockly.MOTOR_P, "ms32006.MOT_P"]
        ]), "direction");
  this.appendValueInput('speed')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("设置直流电机的状态及转速(0-100)");
  }
};



Blockly.Blocks.actuator_ms32006_stepper = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator_extern.HUE);
    this.appendValueInput('SUB')
        .appendField("步进电机")
        .setCheck("var");
    this.appendDummyInput()
        .appendField("选择")
        .appendField(new Blockly.FieldDropdown([['A', 'ms32006.MOT_A'], ['B', 'ms32006.MOT_B']]), 'mode');      
  this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Direction)
              .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
        [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"]
        ]), "direction");
  this.appendValueInput('speed')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("转速");
  this.appendValueInput('steps')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("步数");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("设置步进电机的状态、转速、步数(0-2047)");
  }
};

//rgb
Blockly.Blocks.actuator_neopixel_init = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_RGB_PIN_COUNT);
    }
};

Blockly.Blocks.actuator_neopixel_rgb = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput('SUB')
            .setCheck("var");
            // .appendField(Blockly.MIXLY_SETUP)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RGB_NUM_R_G_B);
    }
};

Blockly.Blocks.actuator_neopixel_rgb_all = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RGB_ALL_R_G_B_MIXGOCC);
    }
};

Blockly.Blocks.actuator_neopixel_write = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_WRI);
    }
};