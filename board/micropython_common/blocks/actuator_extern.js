'use strict';

goog.provide('Blockly.Blocks.actuator_extern');
goog.require('Blockly.Blocks');

Blockly.Msg['ACTUATOR_EXTERN_HUE'] = '#74A55B'

//music
Blockly.Blocks.esp32_music_pitch_init = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN )
            .setCheck(Number);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
    this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setTooltip(Blockly.MIXLY_RGB_NUM_R_G_B_MP);
    }
};

Blockly.Blocks.actuator_neopixel_rgb_all = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
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

Blockly.Blocks.actuator_use_uart_init = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"uart")
            .appendField(new Blockly.FieldDropdown([
                ["uart1", "uart1"],         
                ["uart2","uart2"]
                ]), "key");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + 'SYN6288' + Blockly.MIXLY_AipSpeech_synthesis)
            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("LTR308","key");
    }
};

Blockly.Blocks.syn6288_set_voice = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField('SYN6288')
        this.appendValueInput('VOICE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SET_VOLUME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SET_VOLUME_TOOLTIP);
    }
}

Blockly.Blocks.syn6288_get_voice = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField('SYN6288')
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_VOLUME)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SET_VOLUME_TOOLTIP);
    }
}

Blockly.Blocks.syn6288_builtin_voice = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField('SYN6288')
        this.appendValueInput('VOICE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_PLAY_HINTS);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_PROGRAM_BLOCK)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True'], [Blockly.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False']]), 'mode');      
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_PLAY_HINTS_TOOLTIP);
    }
}

Blockly.Blocks.syn6288_tts_play = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField('SYN6288')
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_AipSpeech_synthesis);
        this.appendValueInput('VOICE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_BACKGROUND_MUSIC);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_PROGRAM_BLOCK)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True'], [Blockly.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False']]), 'mode');      
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_PLAY_TTS_TOOLTIP);
    }
}

//mixbot extern
Blockly.Blocks['mixbot_addr_extern'] = {
   init: function() {
    this.setColour(Blockly.Msg['MATH_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.extern_addr), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mixbot_motor_extern = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_MOTOR)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);       
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_SPEED);   
      this.appendDummyInput()
          .appendField('%')       
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_MIXBOT_MOTOR_EXTERN_TOOLTIP);
    }
}

Blockly.Blocks.mixbot_motor_extern_get_speed = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_MOTOR)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_GET+Blockly.MIXLY_SPEED);   
      this.setOutput(true,Number);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_traffic_light_extern = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_TRAFFIC_LIGHT)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);   
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.LISTS_SET_INDEX_SET)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MICROBIT_Turn_off_display, '0'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_RED_ON, '1'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_RED_BLINK, '2'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_YELLOW_ON, '3'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_YELLOW_BLINK, '4'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_GREEN_ON, '5'],
            [Blockly.MIXLY_TRAFFIC_LIGHT_GREEN_BLINK, '6']
            ]), "light");  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);      
    }
}

Blockly.Blocks.mixbot_led_extern = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.COLOUR_RGB_WHITE, 'W'],
            [Blockly.Msg.COLOUR_RGB_RED, 'R'],
            [Blockly.Msg.COLOUR_RGB_YELLOW, 'Y'],
            [Blockly.Msg.COLOUR_RGB_GREEN, 'G'],
            [Blockly.Msg.COLOUR_RGB_BLUE, 'B']
            ]), "color")
          .appendField("LED")
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);
      this.appendValueInput('value')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.BRIGHTNESS);   
      this.appendDummyInput()
          .appendField('%')       
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_led_extern_get_value = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.COLOUR_RGB_WHITE, 'W'],
            [Blockly.Msg.COLOUR_RGB_RED, 'R'],
            [Blockly.Msg.COLOUR_RGB_YELLOW, 'Y'],
            [Blockly.Msg.COLOUR_RGB_GREEN, 'G'],
            [Blockly.Msg.COLOUR_RGB_BLUE, 'B']
            ]), "color")
          .appendField("LED")
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING); 
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_GET+Blockly.Msg.BRIGHTNESS)       
      this.setOutput(true,Number);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_servo_extern_get_status = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_GET)   
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MICROBIT_JS_BLE_POWER, '[0]'],
            [Blockly.MIXLY_SPEED, '[1]'],
            [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE, '[2]'],
            [Blockly.MIXLY_RELATIVE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE, '[3]'],
            [Blockly.MIXLY_MIXBOT_SERVO_BLOCK_OR_NOT, '[4]'],
            [Blockly.MIXLY_MIXBOT_SERVO_FINISH_OR_NOT, '[5]'],
            [Blockly.MIXLY_ALL, '']
            ]), "status");   
      this.setOutput(true,Number);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_servo_extern_stop_mode = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_SERVO_SET_STOP_MODE)   
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MIXBOT_SERVO_STOP_MODE_KEEP, '0'],
            [Blockly.MIXLY_MIXBOT_SERVO_STOP_MODE_COAST, '1'],
            [Blockly.MIXLY_MIXBOT_SERVO_STOP_MODE_BRAKE, '2']            
            ]), "status");   
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_servo_extern_stop = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_STOP)          
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_servo_extern_absolute_run = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
          .appendField(Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE+MSG.run)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MODE)  
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_SPEED+Blockly.MIXLY_MODE, '0'],
            [Blockly.MIXLY_MICROBIT_JS_BLE_POWER+Blockly.MIXLY_MODE, '1']            
            ]), "status");   
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_PARAMS);    
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('%')     
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_SERVO_TURN_DIRECTION)  
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, '0'],
            [Blockly.MIXLY_MIXBOT_SERVO_NEAREST_PATH, '1'],
            [Blockly.Msg.ANTI_CLOCKWISE, '2']            
            ]), "direction");    
      this.appendValueInput('angle')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ROTATE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);         
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_MIXBOT_SERVO_ABSOLUTE_ANGLE_TOOLTIP);
    }
}

Blockly.Blocks.mixbot_servo_extern_relative_origin = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
          .appendField(Blockly.MIXLY_RELATIVE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE+MSG.run)
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_SERVO_RELATIVE_ORIGIN_PATH)          
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_servo_extern_relative_run = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
          .appendField(Blockly.MIXLY_RELATIVE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE+MSG.run)
          .appendField("("+Blockly.MIXLY_MIXBOT_SERVO_LIKE_ENCODING_MOTOR+")")
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MODE)  
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_SPEED+Blockly.MIXLY_MODE, '0'],
            [Blockly.MIXLY_MICROBIT_JS_BLE_POWER+Blockly.MIXLY_MODE, '1']            
            ]), "status");   
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_PARAMS);    
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('%')           
      this.appendValueInput('angle')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ROTATE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);             
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_MIXBOT_SERVO_RELATIVE_ANGLE_TOOLTIP);
    }
}

Blockly.Blocks.mixbot_servo_extern_relative_continue = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN+Blockly.MIXLY_SERVO_MOTOR)
          .appendField(Blockly.MIXLY_RELATIVE+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE+MSG.run)
          .appendField("("+Blockly.MIXLY_MIXBOT_SERVO_LIKE_ORDINARY_MOTOR+")")
      this.appendValueInput('mode')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.LCD_NUMBERING);    
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MODE)  
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_SPEED+Blockly.MIXLY_MODE, '0'],
            [Blockly.MIXLY_MICROBIT_JS_BLE_POWER+Blockly.MIXLY_MODE, '1']            
            ]), "status");   
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_PARAMS);    
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('%')           
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_SERVO_TURN_DIRECTION)  
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, '0'],
            [Blockly.Msg.ANTI_CLOCKWISE, '2']            
            ]), "direction");         
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_actuator_extern_get_addr = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MOTOR, 'ext_motor'],
            [Blockly.MIXLY_TRAFFIC_LIGHT, 'ext_traffic'],
            [Blockly.Msg.COLOUR_RGB_WHITE+"LED", 'W_LED'],
            [Blockly.Msg.COLOUR_RGB_RED+"LED", 'R_LED'],
            [Blockly.Msg.COLOUR_RGB_YELLOW+"LED", 'Y_LED'],
            [Blockly.Msg.COLOUR_RGB_GREEN+"LED", 'G_LED'],
            [Blockly.Msg.COLOUR_RGB_BLUE+"LED", 'B_LED'],
            [Blockly.MIXLY_SERVO_MOTOR, 'ext_servo']
            ]), "name")       
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_EXTERN_GET_ADDR)       
      this.setOutput(true);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_actuator_extern_set_addr = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField("Mixbot")
          .appendField(Blockly.ME_GO_MOTOR_EXTERN)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MOTOR, 'ext_motor'],
            [Blockly.MIXLY_TRAFFIC_LIGHT, 'ext_traffic'],
            [Blockly.Msg.COLOUR_RGB_WHITE+"LED", 'W_LED'],
            [Blockly.Msg.COLOUR_RGB_RED+"LED", 'R_LED'],
            [Blockly.Msg.COLOUR_RGB_YELLOW+"LED", 'Y_LED'],
            [Blockly.Msg.COLOUR_RGB_GREEN+"LED", 'G_LED'],
            [Blockly.Msg.COLOUR_RGB_BLUE+"LED", 'B_LED'],
            [Blockly.MIXLY_SERVO_MOTOR, 'ext_servo']
            ]), "name")       
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MIXBOT_EXTERN_SET_ADDR)    
      this.appendValueInput('old')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT_GESTURE);
      this.appendValueInput('new')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_UPDATE);           
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}