'use strict';

goog.provide('Blockly.Blocks.AI');

goog.require('Blockly.Blocks');

Blockly.Msg['AI_HUE'] = 205



Blockly.Blocks.MICROPYTHON_AI_client = {
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_AipSpeech_asr, "ASR"],
                                                     [Blockly.Msg.MIXLY_AI_UNIT, "UNIT"]
                                                    ]),'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_Client)
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
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AI_UNIT)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ID')
            .appendField('ID')
            .setAlign(Blockly.ALIGN_RIGHT);    
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks.MICROPYTHON_AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.Msg.MIXPY_AI_AUDIO_TIME)
            .setAlign(Blockly.ALIGN_RIGHT);  
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_LANGUAGE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_AI_LANGUAGE_CHINESE, "1537"],
                                                     [Blockly.Msg.MIXLY_AI_LANGUAGE_ENGLISH, "1737"],
                                                     [Blockly.Msg.MIXLY_AI_LANGUAGE_CANTONESE, "1637"]
                                                    ]),'LANGUAGE')       
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

