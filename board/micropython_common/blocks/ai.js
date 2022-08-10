'use strict';

goog.provide('Blockly.Blocks.AI');

goog.require('Blockly.Blocks');

Blockly.Blocks.AI.HUE = 205



Blockly.Blocks.MICROPYTHON_AI_client = {
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipSpeech_asr, "ASR"],
                                                     [Blockly.MIXLY_AI_UNIT, "UNIT"]
                                                    ]),'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);       
        this.appendValueInput('API_KEY')
            .appendField('API_KEY')
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.appendValueInput('SECRET_KEY')
            .appendField('SECRET_KEY')
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.MICROPYTHON_AI_Speech_unit = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AI_UNIT)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ID')
            .appendField('ID')
            .setAlign(Blockly.ALIGN_RIGHT);    
        this.appendValueInput('STR')
            .appendField(Blockly.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks.MICROPYTHON_AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipSpeech_asr)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.Msg.MIXPY_AI_AUDIO_TIME)
            .setAlign(Blockly.ALIGN_RIGHT);  
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_LANGUAGE)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AI_LANGUAGE_CHINESE, "1537"],
                                                     [Blockly.MIXLY_AI_LANGUAGE_ENGLISH, "1737"],
                                                     [Blockly.MIXLY_AI_LANGUAGE_CANTONESE, "1637"]
                                                    ]),'LANGUAGE')       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

