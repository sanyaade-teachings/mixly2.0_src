'use strict';

goog.provide('Blockly.Blocks.me_g1');
goog.require('Blockly.Blocks');

Blockly.Msg['MEG1_HUE'] = 40

Blockly.Blocks['me_g1_aht11'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);        
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TEM_HUM+" AHT11")
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

Blockly.Blocks['me_g1_hp203'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_Altitude+MSG.catSensor+" HP203X")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETPRESSURE, "pressure()"],
            [Blockly.MIXLY_GETTEMPERATUE, "temperature()"],
            [Blockly.MIXLY_GET_ALTITUDE, "altitude()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['me_g1_varistor'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_POTENTIOMETER);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['me_g1_rfid_readid'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
        this.appendDummyInput()
            .appendField("RFID"+Blockly.MIXLY_RFID_READ_CARD);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RFID_READ_CARD_UID);   
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['me_g1_rfid_readcontent'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
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

Blockly.Blocks['me_g1_rfid_write'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
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

Blockly.Blocks['me_g1_rfid_status'] = {
    init: function(){
        this.setColour(Blockly.Msg['MEG1_HUE']);
        this.appendDummyInput()
            .appendField("RFID");
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