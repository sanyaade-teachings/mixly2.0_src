'use strict';

goog.provide('Blockly.Blocks.AI');

goog.require('Blockly.Blocks');

Blockly.Msg['AI_HUE'] = 205

Blockly.Blocks.AI_ChooseAndGet = {
    init: function () {
        this.setColour(Blockly.Msg['STORAGE_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Lang.MIXLY_CHOOSE_AND_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_CHOOSE_AND_GET_ONE_FILE_NAME, "getOneFile"], 
                                                     [Blockly.Msg.Lang.MIXLY_CHOOSE_AND_GET_MANY_FILE_NAMES, "getManyFiles"],
                                                     [Blockly.Msg.Lang.MIXLY_CHOOSE_AND_GET_DIR, "getDirectory"]
                                                    ]),'TYPE');       
        this.setInputsInline(true);
        this.setOutput(true);
    }
}

Blockly.Blocks.AI_client = {
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Lang.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipImageClassify, "AipImageClassify"], 
                                                     [Blockly.Msg.Lang.MIXLY_AipSpeech, "AipSpeech"],
                                                     [Blockly.Msg.Lang.MIXLY_AipImageCensor, "AipImageCensor"],
                                                     [Blockly.Msg.Lang.MIXLY_AipFace, "AipFace"],
                                                     [Blockly.Msg.Lang.MIXLY_AipOcr, "AipOcr"],
                                                     [Blockly.Msg.Lang.MIXLY_AipNlp, "AipNlp"]
                                                    ]),'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.appendValueInput('APP_ID')
            .appendField('APP_ID')
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

Blockly.Blocks.AI_Speech_synthesis = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipSpeech_synthesis)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.Lang.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipSpeech_synthesis_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipSpeech_asr)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.Msg.Lang.MIXLY_AipSpeech_File)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipSpeech_ASR_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_ImageClassify = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipImageClassify)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.Msg.Lang.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipImageClassify_advancedGeneral_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


Blockly.Blocks.AI_ImageClassify_Func = {
   init: function() {
    this.setColour(Blockly.Msg['AI_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipImageClassify_advancedGeneral, "advancedGeneral"], 
                                                 [Blockly.Msg.Lang.MIXLY_AipImageClassify_dishDetect, "dishDetect"],
                                                 [Blockly.Msg.Lang.MIXLY_AipImageClassify_carDetect, "carDetect"],
                                                 [Blockly.Msg.Lang.MIXLY_AipImageClassify_animalDetect, "animalDetect"],
                                                 [Blockly.Msg.Lang.MIXLY_AipImageClassify_plantDetect, "plantDetect"],
                                                 [Blockly.Msg.Lang.MIXLY_AipImageClassify_logoSearch, "logoSearch"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Face_match = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipFace_match)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.Lang.MIXLY_AipImageClassify_Image+'1'+Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VAR2')
            .appendField(Blockly.Msg.Lang.MIXLY_AipImageClassify_Image+'2'+Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.ALIGN_RIGHT);    
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipFace_match_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Ocr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipOcr)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.Msg.Lang.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipOcr_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


Blockly.Blocks.AI_Ocr_Func = {
   init: function() {
    this.setColour(Blockly.Msg['AI_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipOcr_basicGeneral, "basicGeneral"], 
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_webImage, "webImage"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_idcard, "idcard"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_bankcard, "bankcard"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_drivingLicense, "drivingLicense"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_vehicleLicense, "vehicleLicense"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_licensePlate, "licensePlate"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_businessLicense, "businessLicense"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_receipt, "receipt"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_trainTicket, "trainTicket"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_taxiReceipt, "taxiReceipt"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_form, "tableRecognition"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_vatInvoice, "vatInvoice"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_passport, "passport"],
                                                 [Blockly.Msg.Lang.MIXLY_AipOcr_handwriting, "handwriting"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.Lang.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipNlp_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_Sim = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_Sim)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.Msg.Lang.OLED_STRING + '1')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.Msg.Lang.OLED_STRING + '2')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipNlp_Sim_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_Func = {
   init: function() {
    this.setColour(Blockly.Msg['AI_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipNlp_lexer, "lexer"], 
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_depParser, "depParser"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_wordEmbedding, "wordEmbedding"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_dnnlm, "dnnlm"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_commentTag, "commentTag"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_sentimentClassify, "sentimentClassify"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_keyword, "keyword"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_topic, "topic"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_ecnet, "ecnet"],
                                                 [Blockly.Msg.Lang.MIXLY_AipNlp_emotion, "emotion"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp_Func_sim = {
   init: function() {
    this.setColour(Blockly.Msg['AI_HUE']);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipNlp_wordSimEmbedding, "wordSimEmbedding"],
                                                [Blockly.Msg.Lang.MIXLY_AipNlp_simnet, "simnet"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp_Topic = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_topic)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipNlp_Topic_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_newsSummary = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Msg['AI_HUE']);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_summary)
            .appendField(Blockly.Msg.Lang.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.Lang.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('LEN')
            .appendField(Blockly.Msg.Lang.MIXLY_LIST_LEN)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.Lang.MIXLY_AipNlp_Summary_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


// [Blockly.Msg.Lang.MIXLY_AipNlp_topic, "topic"]
// [Blockly.Msg.Lang.MIXLY_AipNlp_keyword, "keyword"]

 Blockly.Blocks['AI_audio'] = {
  init: function() {
    this.setColour(Blockly.Msg['STORAGE_HUE']);
    this.appendValueInput("VAR")
        .appendField(Blockly.Msg.Lang.MIXPY_AI_AUDIO);
    this.appendValueInput("TIME")
        .appendField(Blockly.Msg.Lang.MIXPY_AI_AUDIO_TIME);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXPY_AI_AUDIO_TOOLTIP);
  }
};

 Blockly.Blocks['AI_photo'] = {
  init: function() {
    this.setColour(Blockly.Msg['STORAGE_HUE']);
    this.appendValueInput("VAR")
        .appendField(Blockly.Msg.Lang.MIXPY_AI_PHOTO);
    this.appendValueInput("BUT")
        .appendField(Blockly.Msg.Lang.MIXPY_AI_PHOTO_BUTTON);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.MIXPY_AI_PHOTO_TOOLTIP);
  }
};

Blockly.Blocks['AI_result'] = {
  /**
   * Block for negation.
   * @this Blockly.Block
   */
  init: function() {
    
    this.setColour(Blockly.Msg['AI_HUE']);
            
    this.appendValueInput('AI')
        .appendField(Blockly.Msg.Lang.MIXPY_AI_RESULT)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.MIXLY_AipImageClassify, "Image"], 
                                                     [Blockly.Msg.Lang.MIXLY_AipSpeech_asr, "Speech"],
                                                     [Blockly.Msg.Lang.MIXLY_AipFace_match, "Face"],
                                                     [Blockly.Msg.Lang.MIXLY_AipOcr, "Ocr"],
                                                     [Blockly.Msg.Lang.MIXLY_AipNlp_simnet, "OcrSimilarity"],
                                                     [Blockly.Msg.Lang.MIXLY_AipNlp_sentimentClassify, "Emotion"],
                                                    ]),'CTYPE')
      
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.Lang.LOGIC_NEGATE_TOOLTIP);
  }
};
