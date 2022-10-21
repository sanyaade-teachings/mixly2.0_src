'use strict';

goog.provide('Blockly.Blocks.sensor_onboard');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensor_onboard.HUE = '#947C54'//'#9e77c9'//40;

Blockly.Blocks['sensor_mixgo_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)    
            .appendField(Blockly.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN+Blockly.MIXLY_BUTTON+Blockly.MIXLY_GET_PRESSES);
    }
};

Blockly.Blocks.sensor_mixgo_button_attachInterrupt = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendValueInput("btn")
    .appendField(Blockly.MIXLY_ESP32_INTERRUPT)
    .appendField(Blockly.MIXLY_BUTTON)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MODE)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
    this.appendValueInput('DO')
    .appendField(Blockly.MIXLY_DO)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
}
};

Blockly.Blocks['sensor_mixgocar42_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_BUTTON)
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgocar42_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_BUTTON)
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgocar42_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_BUTTON)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)    
            .appendField(Blockly.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN+Blockly.MIXLY_BUTTON+Blockly.MIXLY_GET_PRESSES);
    }
};

Blockly.Blocks.sensor_mixgocar42_button_attachInterrupt = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_INTERRUPT)
    .appendField(Blockly.MIXLY_BUTTON)
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MODE)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
    this.appendValueInput('DO')
    .appendField(Blockly.MIXLY_DO)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
}
};

Blockly.Blocks['sensor_mixgo_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput("button")
        .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

Blockly.Blocks['sensor_mixgoce_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput("button")
        .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

Blockly.Blocks['sensor_mpython_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendValueInput("button")
        .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};


Blockly.Blocks['sensor_distance_hrsc04'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_CHAOSHENGBO)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_CHAOSHENGBO);
    }
};


var RTC_TIME_TYPE = [
[Blockly.MIXLY_YEAR, "Year"],
[Blockly.MIXLY_MONTH, "Month"],
[Blockly.MIXLY_DAY, "Day"],
[Blockly.MIXLY_HOUR, "Hour"],
[Blockly.MIXLY_MINUTE, "Minute"],
[Blockly.MIXLY_SECOND, "Second"],
[Blockly.MIXLY_WEEK, "Week"],
[Blockly.MIXLY_MIX1, "Mix1"],
[Blockly.MIXLY_MIX2, "Mix2"],
];




Blockly.Blocks.RTC_set_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RTCSETTIME)
    .appendField('myRTC');
    this.appendValueInput("hour")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_HOUR);
    this.appendValueInput("minute")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_MINUTE);
    this.appendValueInput("second")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_SECOND);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip(Blockly.MIXLY_RTCSETTIME+Blockly.MIXLY_MIX2);
}
};

Blockly.Blocks.RTC_set_date = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RTCSETDATE)
    .appendField('myRTC');
    this.appendValueInput("year")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_YEAR);
    this.appendValueInput("month")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_MONTH);
    this.appendValueInput("day")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.MIXLY_DAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_RTCSETDATE+Blockly.MIXLY_MIX1);
}
};



Blockly.Blocks.HCSR04 = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_CHAOSHENGBO);
        this.appendValueInput("PIN1", Number)
        .appendField('Trig #')
        .setCheck(Number);
        this.appendValueInput("PIN2", Number)
        .appendField('Echo #')
        .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    }

};



Blockly.Blocks['sensor_mixgo_light'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

Blockly.Blocks['sensor_mixgo_sound'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};


Blockly.Blocks['number1'] = {
   init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([["1", "touch1"], ["2", "touch2"]]), 'op')
    this.setOutput(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
}
};

Blockly.Blocks['number2'] = {
   init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([["0", "4"], ["1", "5"],["2", "6"], ["3", "7"]]), 'op')
    this.setOutput(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
}
};

Blockly.Blocks['sensor_mixgo_pin_near'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_NEAR);       
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);     
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP+Blockly.MIXLY_ESP32_NEAR);
    }
};

Blockly.Blocks['sensor_mixgo_pin_near_double'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "left"], [Blockly.Msg.TEXT_TRIM_RIGHT, "right"]]), "direction")
        .appendField(Blockly.MIXLY_ESP32_NEAR);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left':Blockly.Msg.TEXT_TRIM_LEFT,
                'right':Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 +TOOLTIPS[mode] + mode1
        });
    }
};

//传感器-实时时钟块_获取时间
Blockly.Blocks.onboard_RTC_get_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);  
    this.appendDummyInput()
    .appendField("RTC")  
    this.appendDummyInput()
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RTCGETTIME);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_RTC_GET_TIME_TOOLTIP);
    // var thisBlock = this;
    //     this.setTooltip(function() {
    //     var mode = thisBlock.getFieldValue('TIME_TYPE');
    //     var mode0 = Blockly.MIXLY_RTCGETTIME;
    //     var TOOLTIPS = {
    //     'Year':Blockly.MIXLY_YEAR,
    //     'Month':Blockly.MIXLY_MONTH,
    //     'Day':Blockly.MIXLY_DAY,
    //     'Hour':Blockly.MIXLY_HOUR,
    //     'Minute':Blockly.MIXLY_MINUTE,
    //     'Second':Blockly.MIXLY_SECOND,
    //     'Week':Blockly.MIXLY_WEEK,
    //     'Mix1':Blockly.MIXLY_MIX1,
    //     'Mix2':Blockly.MIXLY_MIX2
    //   };
      // return mode0 +TOOLTIPS[mode];
    // });
}
};

Blockly.Blocks.onboard_RTC_set_datetime = {
 init: function() {    
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput()
    .appendField("RTC")
    this.appendValueInput('year')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_YEAR);
    this.appendValueInput('month')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_MONTH);   
    this.appendValueInput('day')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_DAY);   
    this.appendValueInput('weekday')
    .setCheck(Number)
    .appendField("         "+
        Blockly.MIXLY_WEEK2);   
    this.appendValueInput('hour')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_HOUR);                       
    this.appendValueInput('minute')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_MINUTE);
    this.appendValueInput('second')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_SECOND);
    this.appendValueInput('millisecond')
    .setCheck(Number)
    .appendField("         "+Blockly.MIXLY_MILLISECOND);
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_ESP32_RTC_SET_DATATIME_TOOLTIP);    
}
};

Blockly.Blocks.sensor_rtc_init = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("RTC")
        this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_SETUP)
        .setCheck("var");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_SENSOR_RTC_INT_TOOLTIP);
    }
};


Blockly.Blocks['sensor_LTR308'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_sound'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};


Blockly.Blocks['sensor_aht11'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_TEM_HUM+" ")            
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "temperature"],
            [Blockly.MIXLY_GETHUMIDITY, "humidity"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature":Blockly.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "relative_humidity":Blockly.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks['sensor_hp203'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_Altitude+MSG.catSensor+" ")
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETPRESSURE, "pressure()"],
            [Blockly.MIXLY_GETTEMPERATUE, "temperature()"],
            [Blockly.MIXLY_GET_ALTITUDE, "altitude()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['rfid_readid'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RFID_READ_CARD_UID);   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['rfid_readcontent'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);        
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL);   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['rfid_write'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_COMMUNICATION_RFID_WRITE);        
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.MIXLY_COMMUNICATION_WRITE_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['sensor_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};



Blockly.Blocks.sensor_onboard_mpu9250_gesture = {
    init: function() {
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_shake, "shake"], [Blockly.MIXLY_UP, "up"], [Blockly.MIXLY_DOWN, "down"], [Blockly.MIXLY_LEFT, "left"], [Blockly.MIXLY_RIGHT, "right"], [Blockly.MIXLY_MICROBIT_face_up, "face up"], [Blockly.MIXLY_MICROBIT_face_down, "face down"]]), "gesture");
        this.setOutput(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.MIXLY_MICROBIT_shake,
                'up': Blockly.MIXLY_UP,
                'down':Blockly.MIXLY_DOWN,
                'left':Blockly.MIXLY_LEFT,
                'right':Blockly.MIXLY_RIGHT,
                'face up': Blockly.MIXLY_MICROBIT_face_up,
                'face down': Blockly.MIXLY_MICROBIT_face_down,
        // 'freefall':Blockly.MIXLY_MICROBIT_freefall,
        // '3g': '3g',
        // '6g': '6g',
        // '8g': '8g'
    };
    return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
});
    }
};

Blockly.Blocks['sensor_onboard_mpu9250_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_onboard_mpu9250_get_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET+Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_onboard_mpu9250_get_gyro'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_ESP32_SENOR_GYRO)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_onboard_mpu9250_calibrate_compass'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


Blockly.Blocks['sensor_onboard_mpu9250_temperature'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.MIXLY_GETTEMPERATUE);
    }
};


Blockly.Blocks['sensor_onboard_mpu9250_field_strength'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
        .appendField("MPU9250")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET_COMPASS)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH,'strength'],[Blockly.MIXLY_MICROBIT_JS_BY_ANGLE,'heading']]),'compass');
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('compass');
            var mode0 = Blockly.MIXLY_MICROBIT_JS_GET_COMPASS;
            var TOOLTIPS = {
                'strength':Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH,
                'heading':Blockly.MIXLY_MICROBIT_JS_BY_ANGLE
            };
            return mode0 +TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['sensor_onboard_compass_reset'] = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor_onboard.HUE);
    this.appendDummyInput("")
    .appendField("MPU9250")
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_Reset_COMPASS)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Reset_COMPASS);
}
};

//mixgo_cc onboard_sensor blocks:
Blockly.Blocks['sensor_mixgo_cc_mmc5603_get_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET+Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
        .appendField(new Blockly.FieldDropdown([
            ["x", "[0]"],
            ["y", "[1]"],
            ["z", "[2]"],
            ["(x,y,z)", ""],
            [Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH_ALL, "all"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};
Blockly.Blocks['sensor_mixgo_cc_mmc5603_get_angle'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET_COMPASS+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};

Blockly.Blocks['sensor_mixgo_cc_mmc5603_calibrate_compass'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


//mixgo_me onboard_sensor blocks:


Blockly.Blocks['sensor_mixgome_temperature'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_GETTEMPERATUE)            
        this.appendDummyInput("")        
        this.setOutput(true, Number);
        this.setInputsInline(true);
        
    }
};

//mixgo_ce onboard_sensor blocks:


Blockly.Blocks['sensor_mixgoce_temperature'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_GETTEMPERATUE)            
        this.appendDummyInput("")        
        this.setOutput(true, Number);
        this.setInputsInline(true);
        
    }
};
//mpython onboard_sensor:
Blockly.Blocks['sensor_mpython_qmi8658_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "[0]"],
            ["y", "[1]"],
            ["z", "[2]"],
            ["(x,y,z)", ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_mpython_mmc5603_get_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET+Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
        .appendField(new Blockly.FieldDropdown([
            ["x", "[0]"],
            ["y", "[1]"],
            ["z", "[2]"],
            ["(x,y,z)", ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_mpython_qmi8658_get_gyro'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_ESP32_SENOR_GYRO)
        .appendField(new Blockly.FieldDropdown([
            ["x", "[0]"],
            ["y", "[1]"],
            ["z", "[2]"],
            ["(x,y,z)", ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_mpython_qmi8658_temperature'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.MIXLY_GETTEMPERATUE);
    }
};

Blockly.Blocks['sensor_mpython_mmc5603_get_angle'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET_COMPASS+Blockly.MIXLY_MICROBIT_JS_BY_ANGLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};

Blockly.Blocks['sensor_rm_pin_near_double'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "1"], [Blockly.Msg.TEXT_TRIM_RIGHT, "2"]]), "direction")
        .appendField(Blockly.MIXLY_ESP32_NEAR);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left':Blockly.Msg.TEXT_TRIM_LEFT,
                'right':Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 +TOOLTIPS[mode] + mode1
        });
    }
};

Blockly.Blocks['sensor_rm_battery_left'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MIXGO_CAR_BATTERY_LEFT);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_rm_acc'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor_onboard.HUE);
        this.appendDummyInput()
        .appendField("acc"+Blockly.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_ADXL345_XA, "[0]"],
            [Blockly.MIXLY_ADXL345_YA, "[1]"],
            [Blockly.MIXLY_ACC_SHAKE, "[2]"],
            [Blockly.MIXLY_ADXL345_XA+','+Blockly.MIXLY_ADXL345_YA+','+Blockly.MIXLY_ACC_SHAKE, ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        
    }
};

Blockly.Blocks['sensor_button_is_pressed']=Blockly.Blocks['sensor_mixgo_button_is_pressed'];
Blockly.Blocks['sensor_button_was_pressed']=Blockly.Blocks['sensor_mixgo_button_was_pressed'];
Blockly.Blocks['sensor_button_get_presses']=Blockly.Blocks['sensor_mixgo_button_get_presses'];
Blockly.Blocks['sensor_pin_pressed']=Blockly.Blocks['sensor_mixgo_pin_pressed'];
Blockly.Blocks['sensor_pin_near']=Blockly.Blocks['sensor_mixgo_pin_near'];
Blockly.Blocks['sensor_light']=Blockly.Blocks['sensor_mixgo_light'];
//Blockly.Blocks['sensor_sound']=Blockly.Blocks['sensor_mixgo_sound'];
//Blockly.Blocks['sensor_get_acceleration']=Blockly.Blocks['sensor_mpu9250_get_acceleration'];
Blockly.Blocks['dht11']=Blockly.Blocks['sensor_dht11'];
Blockly.Blocks['sensor_field_strength']=Blockly.Blocks['sensor_mpu9250_field_strength'];
Blockly.Blocks['sensor_temperature']=Blockly.Blocks['sensor_mpu9250_temperature']