'use strict';

goog.provide('Blockly.Blocks.sensor');

goog.require('Blockly.Blocks');

Blockly.Msg['SENSOR_HUE'] = 40//'#9e77c9'//40;

Blockly.Blocks['sensor_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendValueInput('btn')
        .appendField(Blockly.Msg.Lang.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendValueInput('btn')
        .appendField(Blockly.Msg.Lang.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendValueInput('btn')
        .appendField(Blockly.Msg.Lang.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_GET_PRESSES);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.PROCEDURES_DEFRETURN_RETURN+Blockly.Msg.Lang.MIXLY_BUTTON+Blockly.Msg.Lang.MIXLY_GET_PRESSES);
    }
};

Blockly.Blocks.sensor_current_gesture1 = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Current_gesture)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.Lang.MIXLY_UP, "up"], [Blockly.Msg.Lang.MIXLY_DOWN, "down"], [Blockly.Msg.Lang.MIXLY_LEFT, "left"], [Blockly.Msg.Lang.MIXLY_RIGHT, "right"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.Lang.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.Lang.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.Lang.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.Lang.MIXLY_UP,
                'down':Blockly.Msg.Lang.MIXLY_DOWN,
                'left':Blockly.Msg.Lang.MIXLY_LEFT,
                'right':Blockly.Msg.Lang.MIXLY_RIGHT,
                'face up': Blockly.Msg.Lang.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.Lang.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.Msg.Lang.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};

Blockly.Blocks.sensor_current_gesture2 = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_WAS_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.Lang.MIXLY_UP, "up"], [Blockly.Msg.Lang.MIXLY_DOWN, "down"], [Blockly.Msg.Lang.MIXLY_LEFT, "left"], [Blockly.Msg.Lang.MIXLY_RIGHT, "right"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.Lang.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.Lang.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.Lang.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.Lang.MIXLY_UP,
                'down':Blockly.Msg.Lang.MIXLY_DOWN,
                'left':Blockly.Msg.Lang.MIXLY_LEFT,
                'right':Blockly.Msg.Lang.MIXLY_RIGHT,
                'face up': Blockly.Msg.Lang.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.Lang.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.Msg.Lang.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};

Blockly.Blocks.controls_attachGestureInterrupt = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.Lang.MIXLY_UP, "up"], [Blockly.Msg.Lang.MIXLY_DOWN, "down"], [Blockly.Msg.Lang.MIXLY_LEFT, "left"], [Blockly.Msg.Lang.MIXLY_RIGHT, "right"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.Lang.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
        .appendField(Blockly.Msg.Lang.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.Lang.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.Lang.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.Lang.MIXLY_UP,
                'down':Blockly.Msg.Lang.MIXLY_DOWN,
                'left':Blockly.Msg.Lang.MIXLY_LEFT,
                'right':Blockly.Msg.Lang.MIXLY_RIGHT,
                'face up': Blockly.Msg.Lang.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.Lang.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.Msg.Lang.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};

Blockly.Blocks.controls_GestureLists = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.Lang.MIXLY_UP, "up"], [Blockly.Msg.Lang.MIXLY_DOWN, "down"], [Blockly.Msg.Lang.MIXLY_LEFT, "left"], [Blockly.Msg.Lang.MIXLY_RIGHT, "right"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.Lang.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var TOOLTIPS = {
                'shake': Blockly.Msg.Lang.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.Lang.MIXLY_UP,
                'down':Blockly.Msg.Lang.MIXLY_DOWN,
                'left':Blockly.Msg.Lang.MIXLY_LEFT,
                'right':Blockly.Msg.Lang.MIXLY_RIGHT,
                'face up': Blockly.Msg.Lang.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.Lang.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.Msg.Lang.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks.controls_attachGestureInterrupt2 = {
    init: function() {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_WAS_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.Lang.MIXLY_UP, "up"], [Blockly.Msg.Lang.MIXLY_DOWN, "down"], [Blockly.Msg.Lang.MIXLY_LEFT, "left"], [Blockly.Msg.Lang.MIXLY_RIGHT, "right"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.Lang.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.Lang.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
        .appendField(Blockly.Msg.Lang.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.Lang.CONTROLS_IF_MSG_IF;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_WAS_GESTURE;
            var mode3 = Blockly.Msg.Lang.MIXLY_MICROBIT_PERFORMANCE;
            var TOOLTIPS = {
                'shake': Blockly.Msg.Lang.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.Lang.MIXLY_UP,
                'down':Blockly.Msg.Lang.MIXLY_DOWN,
                'left':Blockly.Msg.Lang.MIXLY_LEFT,
                'right':Blockly.Msg.Lang.MIXLY_RIGHT,
                'face up': Blockly.Msg.Lang.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.Lang.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.Msg.Lang.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};

Blockly.Blocks['sensor_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.Lang.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.Msg.Lang.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

Blockly.Blocks['sensor_set_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_SET_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["1g", "AcceleratorRange.OneG"],
            ["2g", "AcceleratorRange.TwoG"],
            ["4g", "AcceleratorRange.FourG"],
            ["8g", "AcceleratorRange.EightG"]
            ]), "key");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_SET_ACCELERATION);
    }
};

Blockly.Blocks['sensor_get_gestures'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET_GESTURE,'all'],
            [Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT_GESTURE,'current']
            ]),'GES')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GESTURE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('GES');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET;
            var mode1 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GESTURE;
            var TOOLTIPS = {
                'all': Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET_GESTURE,
                'current':Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT_GESTURE
            };
            return mode0 +TOOLTIPS[mode]+mode1;
        });
    }
};

Blockly.Blocks['sensor_current_gesture'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_light_level'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_calibrate_compass'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};
Blockly.Blocks['sensor_is_compass_calibrated'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_IS_COMPASS_CALIBRATED)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_IS_COMPASS_CALIBRATED1);
    }
};
Blockly.Blocks['sensor_compass_heading'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_BY_ANGLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_temperature'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_Board_temperature)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_Board_temperature);
    }
};


Blockly.Blocks['sensor_field_strength'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET_COMPASS)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_FIELD_STRENGTH,'get_field_strength'],
            [Blockly.Msg.Lang.MIXLY_MICROBIT_JS_BY_ANGLE,'heading'],
            ["x", "get_x"],
            ["y", "get_y"],
            ["z", "get_z"],
            ]),'compass');
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('compass');
            var mode0 = Blockly.Msg.Lang.MIXLY_MICROBIT_JS_GET_COMPASS;
            var TOOLTIPS = {
                'strength':Blockly.Msg.Lang.MIXLY_MICROBIT_JS_FIELD_STRENGTH,
                'heading':Blockly.Msg.Lang.MIXLY_MICROBIT_JS_BY_ANGLE
            };
            return mode0 +TOOLTIPS[mode];
        });
    }
};


Blockly.Blocks['sensor_rotation'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_ROTATION)
        .appendField(new Blockly.FieldDropdown([
            ["pitch", "Rotation.Pitch"],
            ["roll", "Rotation.Roll"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_MAGETIC_FORCE)
        .appendField(new Blockly.FieldDropdown([
            ["x", "Dimension.X"],
            ["y", "Dimension.Y"],
            ["z", "Dimension.Z"],
            ["strength", "Dimension.Strength"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_distance_hrsc04'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_CHAOSHENGBO)
        .appendField("Trig")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Trig")
        .appendField("Echo")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Echo");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['sensor_distance_hrsc04_'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_CHAOSHENGBO)
        .appendField("Trig")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Trig")
        .appendField("Echo")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Echo");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

Blockly.Blocks.DS1307_init = {
    init: function () {
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.MIXLY_RTCINIT);
        //this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(RTCTypeList), 'RTCType');
        this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('myRTC');
        this.appendValueInput("SDA")
        .appendField("SDA#")
        .setCheck(Number);
        this.appendValueInput("SCL")
        .appendField("SCL#")
        .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_RTCINIT);
    },
    //mutation有问题，暂时弃用
    /*mutationToDom: function() {
        var container = document.createElement('mutation');
        var RTCType = (this.getFieldValue('RTCType') == 'DS1302');
        console.log('======change in mutationToDom==========')
        console.log(RTCType);
        container.setAttribute('RTCType', RTCType);
        return container;
    },
    domToMutation: function(xmlElement) {
        var type = (xmlElement.getAttribute('RTCType') == 'true');
        console.log('======change in domToMutation==========')
        console.log(type);
        this.updateShape_(type);
    },
    updateShape_: function(type) {
    // Add or remove reset pin.
    console.log('======change in updateShape_==========')
    console.log(type);
    if (type) {
        console.log('why not me?')
        this.appendValueInput("RST")
            .appendField("RST#")
            .setCheck(Number);
    } else{
      /*if (this.childBlocks_.length > 0) {
         if (this.childBlocks_[length-1].type == 'Number') {
            this.childBlocks_[length-1].unplug();
            break;
          }
      }
      this.removeInput('RST');
    }
}*/

};

var RTC_TIME_TYPE = [
[Blockly.Msg.Lang.MIXLY_YEAR, "Year"],
[Blockly.Msg.Lang.MIXLY_MONTH, "Month"],
[Blockly.Msg.Lang.MIXLY_DAY, "Day"],
[Blockly.Msg.Lang.MIXLY_HOUR, "Hour"],
[Blockly.Msg.Lang.MIXLY_MINUTE, "Minute"],
[Blockly.Msg.Lang.MIXLY_SECOND, "Second"],
[Blockly.Msg.Lang.MIXLY_WEEK, "Week"],
[Blockly.Msg.Lang.MIXLY_MIX1, "Mix1"],
[Blockly.Msg.Lang.MIXLY_MIX2, "Mix2"],
];


//传感器-实时时钟块_获取时间
Blockly.Blocks.RTC_get_time = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RTCGETTIME);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('myRTC');
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(RTC_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    var thisBlock = this;
    this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('TIME_TYPE');
        var mode0 = Blockly.Msg.Lang.MIXLY_RTCGETTIME;
        var TOOLTIPS = {
            'Year':Blockly.Msg.Lang.MIXLY_YEAR,
            'Month':Blockly.Msg.Lang.MIXLY_MONTH,
            'Day':Blockly.Msg.Lang.MIXLY_DAY,
            'Hour':Blockly.Msg.Lang.MIXLY_HOUR,
            'Minute':Blockly.Msg.Lang.MIXLY_MINUTE,
            'Second':Blockly.Msg.Lang.MIXLY_SECOND,
            'Week':Blockly.Msg.Lang.MIXLY_WEEK,
            'Mix1':Blockly.Msg.Lang.MIXLY_MIX1,
            'Mix2':Blockly.Msg.Lang.MIXLY_MIX2
        };
        return mode0 +TOOLTIPS[mode];
    });
}
};

Blockly.Blocks.RTC_set_time = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RTCSETTIME)
    .appendField('myRTC');
    this.appendValueInput("hour")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_HOUR);
    this.appendValueInput("minute")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_MINUTE);
    this.appendValueInput("second")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_SECOND);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_RTCSETTIME+Blockly.Msg.Lang.MIXLY_MIX2);
}
};

Blockly.Blocks.RTC_set_date = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.Lang.MIXLY_RTCSETDATE)
    .appendField('myRTC');
    this.appendValueInput("year")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_YEAR);
    this.appendValueInput("month")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_MONTH);
    this.appendValueInput("day")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("  "+Blockly.Msg.Lang.MIXLY_DAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_RTCSETDATE+Blockly.Msg.Lang.MIXLY_MIX1);
}
};

Blockly.Blocks['sensor_compass_reset'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Msg['SENSOR_HUE'],
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/music.html#music.reset",
      "message0" : Blockly.Msg.Lang.MIXLY_MICROBIT_Reset_COMPASS
  });
    this.setTooltip(Blockly.Msg.Lang.MIXLY_MICROBIT_Reset_COMPASS);
}
};

Blockly.Blocks['sensor_light'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.Lang.MICROBIT_SENSOR_LIGHT_TOOLTIP);
    }
};

Blockly.Blocks['sensor_hrsc04_init'] = {
    init: function(){
        this.setColour(Blockly.Msg['SENSOR_HUE']);
        this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_HCSR04_INIT)
        //.appendField("sonar")
        .appendField("Trig")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Trig")
        .appendField("Echo")
        .appendField(new Blockly.FieldDropdown([["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]]), "Echo");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

var TCS34725_GETRGB = [
[Blockly.Msg.Lang.COLOUR_RGB_RED, "0"],
[Blockly.Msg.Lang.COLOUR_RGB_GREEN, "1"],
[Blockly.Msg.Lang.COLOUR_RGB_BLUE, "2"]
];

Blockly.Blocks.TCS34725_Get_RGB = {
  init: function() {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.TCS34725_Get_RGB)
    .appendField(new Blockly.FieldDropdown(TCS34725_GETRGB), "TCS34725_COLOR");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

//NTC电阻
Blockly.Blocks.NTC_TEMP = {
  init: function () {
    this.setColour(Blockly.Msg['SENSOR_HUE']);
    this.appendDummyInput("")
    .appendField("NTC")
    .appendField(Blockly.Msg.Lang.MIXLY_TEMP);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.Lang.MIXLY_PIN)
    .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.appendValueInput("NominalResistance")
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_NominalResistance);
    this.appendValueInput("betaCoefficient")
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_betaCoefficient);
    this.appendValueInput("seriesResistor")
    .setCheck(Number)
    .appendField(Blockly.Msg.Lang.MIXLY_seriesResistor);
    this.setInputsInline(false);
    this.setOutput(true, Number);
    this.setTooltip();
  }
};