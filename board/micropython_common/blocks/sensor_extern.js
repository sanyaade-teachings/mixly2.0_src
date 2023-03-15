'use strict';

goog.provide('Blockly.Blocks.sensor_extern');

goog.require('Blockly.Blocks');

Blockly.Msg['SENSOR_EXTERN_HUE'] = '#A58C5B'//'#9e77c9'//40;


Blockly.Blocks['sensor_mixgo_extern_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_IS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_ELECLEVEL);    
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_extern_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_WAS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_ELECLEVEL); 
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_extern_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
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

Blockly.Blocks.sensor_mixgo_extern_button_attachInterrupt = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
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


Blockly.Blocks.sensor_mpu9250_attachGestureInterrupt = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_shake, "shake"], [Blockly.MIXLY_UP, "up"], [Blockly.MIXLY_DOWN, "down"], [Blockly.MIXLY_LEFT, "left"], [Blockly.MIXLY_RIGHT, "right"], [Blockly.MIXLY_MICROBIT_face_up, "face up"], [Blockly.MIXLY_MICROBIT_face_down, "face down"], [Blockly.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
        .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
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
                'freefall':Blockly.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};


Blockly.Blocks['sensor_adxl345_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_ADXL345)
        .setCheck("var");
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



Blockly.Blocks['sensor_light_level'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SENSOR_LIGHT_LEVEL_TOOLTIP);
    }
};



Blockly.Blocks.sensor_dht11 = {
    init: function () {
        var WHAT = [[Blockly.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.MIXLY_GETHUMIDITY, 'humidity']];
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput("PIN", Number)
        .appendField(new Blockly.FieldDropdown([['DHT11', 'DHT11']
                , ['DHT22', 'DHT22']//, ['DHT21', '21'], ['DHT33', '33'], ['DHT44', '44']
                ]), 'TYPE')
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('WHAT');
            var TOOLTIPS = {
                'temperature': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM,
                'relative_humidity': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_HUM,
                'tempandhum': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM_HUM
            };
            return TOOLTIPS[op];
        });
    }
};


Blockly.Blocks['sensor_mixgo_extern_light'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_LIGHT);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);   
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);     
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

Blockly.Blocks['sensor_mixgo_extern_sound'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_SOUND);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);    
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};



Blockly.Blocks['sensor_mixgo_extern_pin_near'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
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

Blockly.Blocks['sensor_bmp'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("BMP280")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "get_BMP_temperature()"],
            [Blockly.MIXLY_GETPRESSURE, "get_BMP_pressure()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_BMP_temperature()":Blockly.MIXLY_MICROBIT_SENSOR_BMP_temperature_TOOLTIP,
                "get_BMP_pressure()":Blockly.MIXLY_MICROBIT_SENSOR_BMP_press_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks['sensor_sht'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("SHT20")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "get_SHT_temperature()"],
            [Blockly.MIXLY_GETHUMIDITY, "get_SHT_relative_humidity()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_SHT_temperature()":Blockly.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "get_SHT_relative_humidity()":Blockly.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks.sensor_ds18x20 = {
 init: function () {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendValueInput("PIN", Number)
    .appendField("DS18x20 "+Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_GETTEMPERATUE);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_MICROBIT_SENSOR_DS18X20_TOOLTIP);
}
};



Blockly.Blocks['sensor_lm35'] = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendDummyInput("")
    .appendField("LM35"+Blockly.MIXLY_TEMP);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_GETTEMPERATUE);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LM35);
  }
};


//pe
Blockly.Blocks.sensor_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                ["MPU9250", "MPU9250"],
            ["BMP280", "BMP280"],
            ["SHT20", "SHT20"],
            ["ADXL345","ADXL345"],
                ["LTR308", "LTR308"],
                ["HP203X", "HP203X"],
                ["SHTC3", "SHTC3"],                
                ["AHT21", "AHT21"],
                ["VL53L0X","VL53L0X"],
                ["QMC5883L","QMC5883L"],
                ["MAX30102","MAX30102"],
                ["APDS9960","APDS9960"],
                ["RFID", "RFID"]
                ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("LTR308","key");
    }
};

Blockly.Blocks['sensor_MAX30102_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_MAX30102+" MAX30102");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");  
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_ESP32_MAX30102_IR, "[0]"],
            [Blockly.MIXLY_ESP32_MAX30102_RED, "[1]"],
            [Blockly.MIXLY_ESP32_MAX30102_IR+','+Blockly.MIXLY_ESP32_MAX30102_RED, ""],
            ]), "key")     
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_APDS9960_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_APDS9960+" APDS9960");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");  
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_ESP32_APDS9960_COLOR, "color"],
            [Blockly.MIXLY_ESP32_APDS9960_GESTURE, "gesture"],
            [Blockly.MIXLY_ESP32_APDS9960_APPROACH, "proximity"],
            ]), "key")     
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_LTR308_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_LIGHT+" LTR308");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");  
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_LIGHT_INTENSITY);     
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_VL530LX_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_LASER_RANGE+" VL53L0X");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");  
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_DISTANCE+'(mm)');     
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_shtc3_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_TEM_HUM+" SHTC3")
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "temperature"],
            [Blockly.MIXLY_GETHUMIDITY, "relative_humidity"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature":Blockly.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "relative_humidity":Blockly.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP,
                "ALL":Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM_HUM
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks['sensor_aht11_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_TEM_HUM+" AHT21")
            .setCheck("var");
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

Blockly.Blocks['sensor_hp203_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_Altitude+MSG.catSensor+" HP203X")
            .setCheck("var");
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

Blockly.Blocks['sensor_QMC5883L_extern'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MIXGOPE_FIELD+MSG.catSensor+" QMC5883L")
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_MICROBIT_JS_BY_ANGLE, "get_bearing()"],
            [Blockly.MIXLY_TEMPERATURE, "get_temp()"],            
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.sensor_mpu9250_gesture = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_shake, "shake"], [Blockly.MIXLY_UP, "up"], [Blockly.MIXLY_DOWN, "down"], [Blockly.MIXLY_LEFT, "left"], [Blockly.MIXLY_RIGHT, "right"], [Blockly.MIXLY_MICROBIT_face_up, "face up"], [Blockly.MIXLY_MICROBIT_face_down, "face down"]]), "gesture");
        this.setOutput(true);
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

Blockly.Blocks['sensor_mpu9250_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
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

Blockly.Blocks['sensor_mpu9250_get_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
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

Blockly.Blocks['sensor_mpu9250_get_gyro'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
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

Blockly.Blocks['sensor_mpu9250_calibrate_compass'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


Blockly.Blocks['sensor_mpu9250_temperature'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.MIXLY_GETTEMPERATUE);
    }
};


Blockly.Blocks['sensor_mpu9250_field_strength'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
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

Blockly.Blocks['sensor_compass_reset'] = {
  init: function(){
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendValueInput('SUB')
    .appendField("MPU9250")
    .setCheck("var");
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_Reset_COMPASS)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Reset_COMPASS);
}
};

Blockly.Blocks.sensor_use_spi_init = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"SPI")
            .setCheck("var");
        this.appendValueInput('PINSUB')
            .appendField("CS")
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                ["RFID", "RFID"],
                ["WS-LoRa", "Weather"]
                ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("RFID","key");
    }
};

Blockly.Blocks['extern_rfid_read'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");    
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_RFID_READ_CARD_UID, "id"],
                [Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL, "content"],
                [Blockly.MIXLY_ALL, "ALL"]
                ]), "key");   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['extern_rfid_readid'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");    
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RFID_READ_CARD_UID);   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['extern_rfid_readcontent'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");    
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL);   
        this.setOutput(true, 'Tuple');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['extern_rfid_write'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SUB')
            .setCheck("var")
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.MIXLY_COMMUNICATION_WRITE_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['extern_rfid_status'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField("RFID");
        this.appendValueInput('SUB')
            .setCheck("var");    
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_RFID_SCAN_OK, "0"],
                [Blockly.MIXLY_RFID_SCAN_NOTAGERR, "1"],
                [Blockly.MIXLY_RFID_SCAN_ERROR, "2"]
                ]), "key");   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

//--------------------待写气象数据
Blockly.Blocks['weather_data'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField("无线气象站"+" WS-LoRa")
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown([
            ["全部（元组）", "data()[0]"],
            ["全部（json）", "data()[1]"],
            ["全部（json,附带位置信息）", "data()[2]"],
            ["编号", "data()[0][0]"],
            ["电量", "data()[0][1]"],
            ["风速", "data()[0][2]"],
            ["阵风", "data()[0][3]"],
            ["风向", "data()[0][4]"],
            ["雨量", "data()[0][5]"],
            ["温度", "data()[0][6]"],
            ["湿度", "data()[0][7]"],
            ["光照", "data()[0][8]"],
            ["紫外线", "data()[0][9]"],
            ["大气压", "data()[0][10]"],
            ["信号强度", "data()[0][11]"],
            ["信噪比", "data()[0][12]"],            
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip("返回气象数据元组 data= (设备id,电池状态,风速m/s,阵风m/s,风向°,雨量mm,温度℃,湿度%,光照Lux,UVI,大气压Pa,信号强度dB,信噪比dB)");
    }
};

Blockly.Blocks['weather_have_data'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField("无线气象站"+" WS-LoRa")
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERIAL_AVAILABLE)        
        this.setOutput(true, Number);
        this.setInputsInline(true);        
    }
};

Blockly.Blocks['weather_uart_mixio'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField("无线气象站"+" WS-LoRa")
            .setCheck("var");
        this.appendValueInput('BASE')
            .appendField("以主题")
        this.appendDummyInput("")
            .appendField("串口发送至MixIO")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['weather_set_label'] = {
  
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendValueInput('SUB')
            .appendField("无线气象站"+" WS-LoRa")
            .setCheck("var");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['weather_set_label_item']));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip();
  },
  
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },

  decompose: function(workspace) {
    var containerBlock =
    workspace.newBlock('weather_set_label_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('weather_set_label_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
      connections[i] = itemBlock.valueConnection_;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i)
        .connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
  },

  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
      .appendField(Blockly.MIXLY_SETTING+Blockly.MIXLY_GPS_LOCATION+Blockly.mixpy_PYLAB_TICKS_TAG+'(id,long,lat)');
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.MIXLY_SETTING+Blockly.MIXLY_GPS_LOCATION+Blockly.mixpy_PYLAB_TICKS_TAG+'(id,long,lat)');
        }
      }
    }
  }
};
Blockly.Blocks['weather_set_label_container'] = {  
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING+Blockly.MIXLY_GPS_LOCATION+Blockly.mixpy_PYLAB_TICKS_TAG);
        this.appendStatementInput('STACK');    
    this.contextMenu = false;
  }
};

Blockly.Blocks['weather_set_label_item'] = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    this.appendDummyInput()
    .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);    
    this.contextMenu = false;
  }
};

Blockly.Blocks['sensor_mixgoce_hot_wheel_is_touched'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_HOT_WHEEL)
            .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_UP, "4"],
                [Blockly.MIXLY_DOWN, "2"],
                [Blockly.MIXLY_LEFT, "3"],
                [Blockly.MIXLY_RIGHT, "1"],
                ["OK", "0"]
                ]), "key");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_DATA, "value"],
                [Blockly.MIXLY_PULSEIN_STAT, "is_touched()"]
                ]), "stat");
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

Blockly.Blocks['sensor_mixgoce_hot_wheel_degrees'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_HOT_WHEEL)
            .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
            .appendField(Blockly.MIXLY_MICROBIT_JS_GET + Blockly.MIXLY_MICROBIT_JS_BY_ANGLE + '(-180°~180°)');
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

Blockly.Blocks.esp32_s2_weather_init =  {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SETUP+Blockly.ForecastType+MSG.catSensor);
        this.appendValueInput('wd')
            .setCheck(Number)
            .appendField('wd');
        this.appendValueInput('ws')
            .setCheck(Number)
            .appendField('ws');
        this.appendValueInput('rain')
            .setCheck(Number)
            .appendField('rain');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['esp32_s2_weather_wd'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.ForecastType+MSG.catSensor)
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.ForecastFx)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['esp32_s2_weather_rain'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('rain')
            .appendField(Blockly.ForecastType+MSG.catSensor)
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_RAIN_TIME+Blockly.MIXLY_RAIN)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['esp32_s2_weather_ws'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.ForecastType+MSG.catSensor)
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.blynk_IOT_IR_FAN, "0"],
                [Blockly.MIXLY_WIND_RATING, "1"],
                [Blockly.blynk_IOT_IR_FAN+Blockly.MIXLY_WIND_RATING, "ALL"]
                ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.HCSR04 = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
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

//PS2
Blockly.Blocks.PS2_init={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendDummyInput("")
   .appendField(Blockly.MIXLY_SETUP+Blockly.PS2);
   this.appendDummyInput("")  
   .appendField('CLK#')
   .appendField(new Blockly.FieldDropdown(profile.default.output_pin), "PS2_CLK")
   .appendField('DOU#')
   .appendField(new Blockly.FieldDropdown(profile.default.output_pin), "PS2_DOU")
   .appendField('DIN#')
   .appendField(new Blockly.FieldDropdown(profile.default.output_pin), "PS2_DIN")
   .appendField('CS#')
   .appendField(new Blockly.FieldDropdown(profile.default.output_pin), "PS2_CS");
   // this.appendDummyInput("")
   // .appendField(Blockly.PS2_setRumble)
   // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON,"true"],[Blockly.MIXLY_OFF,"false"]]), "rumble");
   this.setInputsInline(true);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setTooltip('');
 }
};


var PSBUTTON =[
[Blockly.PS2_TRIANGLE,"PSB_GREEN"],
[Blockly.PS2_CIRCLE,"PSB_RED"],
[Blockly.PS2_CROSS,"PSB_BLUE"],
[Blockly.PS2_SQUARE,"PSB_PINK"],
[Blockly.PS2_L1,"PSB_L1"],
[Blockly.PS2_L2,"PSB_L2"],
// ["PSB_L3","PSB_L3"],
[Blockly.PS2_R1,"PSB_R1"],
[Blockly.PS2_R2,"PSB_R2"],
// ["PSB_R3","PSB_R3"],
[Blockly.PS2_UP,"PSB_PAD_UP"],
[Blockly.PS2_RIGHT,"PSB_PAD_RIGHT"],
[Blockly.PS2_DOWN,"PSB_PAD_DOWN"],
[Blockly.PS2_LEFT,"PSB_PAD_LEFT"],
[Blockly.PS2_SELECT,"PSB_SELECT"],
[Blockly.PS2_START,"PSB_START"]
];

//
Blockly.Blocks.PS2_vibration={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendDummyInput("")
   .appendField(Blockly.PS2+Blockly.PS2_setRumble)
   .appendField(Blockly.MIXLY_STM32_OLED_SMALL+MSG.catActuator_motor)
   .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "0"],
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "1"],   
                ]), "smotorstate")            
   .appendField(Blockly.MIXLY_STM32_OLED_BIG+MSG.catActuator_motor+Blockly.MIXLY_MIXGOPE_AMPLITUDE)
   this.appendValueInput("AMP", Number)   
   this.setTooltip(Blockly.MIXLY_STM32_OLED_BIG+MSG.catActuator_motor+Blockly.MIXLY_MIXGOPE_AMPLITUDE+"0-100");
   this.setInputsInline(true);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
 }
};

//
Blockly.Blocks.PS2_Button={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendDummyInput("")
   .appendField(Blockly.PS2_BUTTON)
   .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
   .appendField(Blockly.MIXLY_PULSEIN_STAT)
   .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_BUTTON_HOLD ,"Button"]
    // ,[Blockly.MIXLY_BUTTON_PRESSED, "ButtonPressed"]
    // ,[Blockly.MIXLY_BUTTON_RELEASED,"ButtonReleased"]
    // ,[Blockly.MIXLY_CHANGE,"NewButtonState"]
    ]), "btstate");
   this.setOutput(true, Boolean);
   this.setTooltip('');
 }
};

//
Blockly.Blocks.PS2_State={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendDummyInput("")
   .appendField(Blockly.MIXLY_GET+Blockly.PS2_BUTTON)
   .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_PULSEIN_STAT ,"0"]
    ,[Blockly.MIXLY_MICROBIT_JS_I2C_VALUE, "1"]
    // ,[Blockly.MIXLY_BUTTON_RELEASED,"ButtonReleased"]
    // ,[Blockly.MIXLY_CHANGE,"NewButtonState"]
    ]), "btstate");
   this.setOutput(true, Boolean);
   this.setTooltip('');
 }
};

Blockly.Blocks.PS2_Buttons={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendDummyInput("")
   .appendField(Blockly.PS2_BUTTON)
   .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
   this.setOutput(true, Boolean);
   this.setTooltip('');
 }
};

Blockly.Blocks.PS2_stk={
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    var PSSTK =[
    [Blockly.PS2_RX,"0"],
    [Blockly.PS2_RY,"1"],
    [Blockly.PS2_LX,"2"],
    [Blockly.PS2_LY,"3"],
    ];
    this.appendDummyInput("")
    .appendField(Blockly.PS2_stick)
    .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.PS2_init_new={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendValueInput('SUB')
   .appendField(Blockly.MIXLY_SETUP+Blockly.PS2);
   this.appendValueInput('CLK')
   .appendField('CLK#');
   this.appendValueInput('DOU')
   .appendField('DOU#');
   this.appendValueInput('DIN')
   .appendField('DIN#');
   this.appendValueInput('CS')
   .appendField('CS#');
   this.setInputsInline(true);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setTooltip('');
 }
};

Blockly.Blocks.PS2_vibration_new={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendValueInput('SUB')
   .appendField(Blockly.PS2);
   this.appendDummyInput("")
   .appendField(Blockly.PS2_setRumble)
   .appendField(Blockly.MIXLY_STM32_OLED_SMALL+MSG.catActuator_motor)
   .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "0"],
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "1"],   
                ]), "smotorstate")            
   .appendField(Blockly.MIXLY_STM32_OLED_BIG+MSG.catActuator_motor+Blockly.MIXLY_MIXGOPE_AMPLITUDE)
   this.appendValueInput("AMP", Number)   
   this.setTooltip(Blockly.MIXLY_STM32_OLED_BIG+MSG.catActuator_motor+Blockly.MIXLY_MIXGOPE_AMPLITUDE+"0-100");
   this.setInputsInline(true);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
 }
};

Blockly.Blocks.PS2_Buttons_new={
  init: function() {
   this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
   this.appendValueInput('SUB')
   .appendField(Blockly.PS2);
   this.appendDummyInput("")
   .appendField(Blockly.PS2_BUTTON.slice(3))
   .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
   .appendField(Blockly.MIXLY_WAS_PRESSED)
   this.setOutput(true, Boolean);
   this.setTooltip('');
 }
};

Blockly.Blocks.PS2_stk_new={
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
    var PSSTK =[
    [Blockly.PS2_RX,"RX"],
    [Blockly.PS2_RY,"RY"],
    [Blockly.PS2_LX,"LX"],
    [Blockly.PS2_LY,"LY"],
    ];
    this.appendValueInput('SUB')
   .appendField(Blockly.PS2);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_JOYSTICK)
    .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.sensor_use_uart_init = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
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
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_PM25_SENSOR, "PM"],         
                [Blockly.MIXLY_GNSS_SENSOR,"GNSS"]
                ]), "sensor");
            
            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.pm25_get_data = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField('PM2.5' + MSG.catSensor)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['PM2.5', "[0]"],
                ['PM10', "[1]"],
                ['(PM2.5, PM10)', ""],   
                ]), "pm")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_CONCENTRATION)    
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_PM_CONCENTRATION_TOOLTIP);
    }
}

Blockly.Blocks['gnss_have_data'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_GNSS_SENSOR)
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERIAL_AVAILABLE)        
        this.setOutput(true, Number);
        this.setInputsInline(true);        
    }
};

Blockly.Blocks['gnss_get_data'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_EXTERN_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_GNSS_SENSOR)
            .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GPS_TIME, "time"],
            [Blockly.MIXLY_GPS_LOCATION, "locate"],  
            [Blockly.MIXLY_PULSEIN_STAT, "status"]          
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                'time':Blockly.MIXLY_GNSS_SENSOR_GET_TIME_TOOLTIP,
                'locate':Blockly.MIXLY_GNSS_SENSOR_GET_LOCATE_TOOLTIP,
                'status':Blockly.MIXLY_GNSS_SENSOR_GET_STATUS_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};