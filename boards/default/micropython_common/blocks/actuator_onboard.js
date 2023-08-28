'use strict';

goog.provide('Blockly.Blocks.actuator_onboard');
goog.require('Blockly.Blocks');

Blockly.Msg['ACTUATOR_ONBOARD_HUE'] = '#6C9858'

//LED
Blockly.Blocks['number'] = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["L1", "1"],
                ["L2", "2"]
            ]), 'op')
        this.setOutput(true);
    }
};

Blockly.Blocks['ledswitch'] = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_ON, "1"],
                [Blockly.Msg.MIXLY_ESP32_OFF, "0"],
                [Blockly.Msg.MIXLY_ESP32_TOGGLE, "-1"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks.actuator_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.actuator_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_get_led_state = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_led_brightness = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
	this.appendDummyInput("")
	.appendField("%")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_SETTING+Blockly.Msg.MIXLY_BUILDIN_LED+Blockly.Msg.MIXLY_BRIGHTNESS+'(0-10)');
  }
};

Blockly.Blocks.mixgo_actuator_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.mixgo_actuator_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.mixgo_actuator_get_led_state = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.mixgo_actuator_led_brightness = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
    this.appendDummyInput("")
    .appendField("%")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_SETTING+Blockly.Msg.MIXLY_BUILDIN_LED+Blockly.Msg.MIXLY_BRIGHTNESS+'(0-10)');
  }
};

Blockly.Blocks.rm_actuator_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING)
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.rm_actuator_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
    
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.rm_actuator_get_led_state = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.rm_actuator_led_brightness = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING)
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
    this.appendDummyInput("")
    .appendField("%")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_SETTING+Blockly.Msg.MIXLY_BUILDIN_LED+Blockly.Msg.MIXLY_BRIGHTNESS+'(0-10)');
  }
};

Blockly.Blocks['cc_number'] = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["L1", "20"],
                ["L2", "21"]
            ]), 'op')
        this.setOutput(true);
    }
};


Blockly.Blocks.mixgo_cc_actuator_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.mixgo_cc_actuator_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.mixgo_cc_actuator_get_led_state = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.mixgo_cc_actuator_led_brightness = {
  init: function() {
    this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
    this.appendDummyInput("")
    .appendField("%")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXLY_SETTING+Blockly.Msg.MIXLY_BUILDIN_LED+Blockly.Msg.MIXLY_BRIGHTNESS+'(0-10)');
  }
};


Blockly.Blocks.actuator_onboard_neopixel_rgb = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        const { Boards } = Mixly;
        const boardKey = Boards.getSelectedBoardKey();
        switch (boardKey) {
            case 'micropython:esp32c3:mixgo_cc':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
                break;
            case 'micropython:esp32s2:mixgo_ce':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
                break;    
            case 'micropython:esp32c3:mixgo_me':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
                break;
            case 'micropython:esp32:mPython':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MPYTHON);
                break;    
            default:
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
        }
    }
};

Blockly.Blocks.actuator_onboard_neopixel_rgb_all = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_ALL_R_G_B_MIXGOCC);
    }
};

Blockly.Blocks.actuator_onboard_neopixel_rgb_show_all_rainbow = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RAINBOW);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};


Blockly.Blocks.actuator_onboard_neopixel_rgb_show_all_chase = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHASE);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.PYTHON_RANGE_STEP)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.actuator_onboard_neopixel_write = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_WRI);
    }
};


Blockly.Blocks.actuator_rm_onboard_neopixel_rgb = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        const { Boards } = Mixly;
        const boardKey = Boards.getSelectedBoardKey();
        switch (boardKey) {
            case 'micropython:esp32c3:mixgocc':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
                break;
            case 'micropython:esp32c3:mixgome':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
                break;
            case 'micropython:esp32:mPython':
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MPYTHON);
                break;    
            default:
                this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
        }
    }
};

Blockly.Blocks.actuator_rm_onboard_neopixel_rgb_all = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_ALL_R_G_B_MIXGOCC);
    }
};



Blockly.Blocks.actuator_rm_onboard_neopixel_rgb_show_all_chase = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHASE);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.PYTHON_RANGE_STEP)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};


Blockly.Blocks.esp32_music_set_tempo = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendValueInput('TICKS')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SET_TEMPO)
            .appendField(Blockly.Msg.MICROBIT_ACTUATOR_ticks);
        this.appendValueInput('BPM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_SET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_get_tempo = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Get_current_tempo)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_GET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_reset = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_music)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_RESET);
    }
}

Blockly.Blocks.esp32_onboard_music_pitch = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);  
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.esp32_onboard_music_pitch_with_time = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);    
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

Blockly.Blocks.esp32_onboard_music_stop = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_NOTONE); 
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks.esp32_onboard_music_play_list = {
    init: function () {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS)        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

Blockly.Blocks.rm_motor = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_EXTERN_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            ['1', "1"],
            ["2", "2"],
            ["3", "3"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, "CW"],
            [Blockly.Msg.ANTI_CLOCKWISE, "CCW"],
            [Blockly.Msg.MOTOR_P, "P"],
            [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput("")
          .appendField("%")    
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

//c3 motor onboard

Blockly.Blocks.actuator_stepper_keep = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField("MixGo Car")
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.blockpy_forward, "F"],
            [Blockly.Msg.blockpy_backward, "B"],
            [Blockly.Msg.blockpy_left, "L"],
            [Blockly.Msg.blockpy_right, "R"]
            ]), "VAR");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
      this.appendDummyInput()
          .appendField('%')    
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
            [Blockly.Msg.MOTOR_P, "P"],
            [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.actuator_dc_motor = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MIXLYCAR_WHEEL_LEFT, "L"],
            [Blockly.Msg.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, "CW"],
            [Blockly.Msg.ANTI_CLOCKWISE, "CCW"]
            ]), "direction");
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
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
          .appendField(Blockly.Msg.MOTOR_DC)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MIXLYCAR_WHEEL_LEFT, "L"],
            [Blockly.Msg.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_STOP)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_P, "P"],        
            [Blockly.Msg.MOTOR_N, "N"]            
            ]), "direction");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

//mixbot onboard_motor below:

Blockly.Blocks['mixbot_motor_status'] = {
    init: function(){
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_MIXBOT_MOTOR_STATUS);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOTOR_STATUS_TOOLTIP);
    }
};

Blockly.Blocks.mixbot_move = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXBOT)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.blockpy_forward, "F"],
            [Blockly.Msg.blockpy_backward, "B"],
            [Blockly.Msg.blockpy_left, "L"],
            [Blockly.Msg.blockpy_right, "R"]            
            ]), "VAR");
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER, "PWR"],
            [Blockly.Msg.MIXLY_SPEED, "SPEED"],
            [Blockly.Msg.MIXLY_MIXBOT_MOTOR_TURNS, "TURNS"]
            ]), "mode");    
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_PARAMS);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOVE_TOOLTIP);
    }
}

Blockly.Blocks.mixbot_stop = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXBOT)
          .appendField(new Blockly.FieldDropdown([           
            [Blockly.Msg.MOTOR_P, "P"],
            [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.mixbot_motor = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXBOT)
          .appendField(Blockly.Msg.MIXLY_MOTOR)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.TEXT_TRIM_LEFT, "1"],
            [Blockly.Msg.TEXT_TRIM_RIGHT, "2"],
            [Blockly.Msg.TEXT_TRIM_BOTH, "0"]
            ]), "wheel");
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER, "PWR"],
            [Blockly.Msg.MIXLY_SPEED, "SPEED"],
            [Blockly.Msg.MIXLY_MIXBOT_MOTOR_TURNS, "TURNS"]
            ]), "mode");    
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_PARAMS);      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOVE_TOOLTIP);
    }
}

Blockly.Blocks['actuator_mixbot_buzzer_on_off'] = {
    init: function() {
        this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_BUZZER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "0"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "1"]
            ]), 'on_off')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

//bitbot onboard_motor below:
Blockly.Blocks.bitbot_move = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.BITBOT)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.blockpy_forward, "F"],
            [Blockly.Msg.blockpy_backward, "B"],
            [Blockly.Msg.blockpy_left, "L"],
            [Blockly.Msg.blockpy_right, "R"]            
            ]), "VAR");         
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_SPEED);
      this.appendDummyInput("")
    .appendField("%")         
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.bitbot_stop = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.BITBOT)
          .appendField(new Blockly.FieldDropdown([           
            [Blockly.Msg.MOTOR_P, "P"],
            [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}

Blockly.Blocks.bitbot_motor = {
    init: function () {
      this.setColour(Blockly.Msg['ACTUATOR_ONBOARD_HUE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg.BITBOT)
          .appendField(Blockly.Msg.MIXLY_MOTOR)
          .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.TEXT_TRIM_LEFT, "0"],
            [Blockly.Msg.TEXT_TRIM_RIGHT, "1"]
            ]), "wheel");   
      this.appendDummyInput()
          .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
                  .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.CLOCKWISE, "CW"],
            [Blockly.Msg.ANTI_CLOCKWISE, "CCW"],
            [Blockly.Msg.MOTOR_P, "P"],
            [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");  
      this.appendValueInput('speed')
          .setCheck(Number)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MIXLY_SPEED);    
      this.appendDummyInput("")
    .appendField("%")       
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
    }
}