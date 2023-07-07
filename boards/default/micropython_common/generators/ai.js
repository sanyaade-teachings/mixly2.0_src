'use strict';

goog.provide('Blockly.Python.AI');

goog.require('Blockly.Python');



Blockly.Python.forBlock['MICROPYTHON_AI_client'] = function(){
    var ctype = this.getFieldValue('CTYPE');
    Blockly.Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var api_key = Blockly.Python.valueToCode(this, 'API_KEY', Blockly.Python.ORDER_ATOMIC);
    var sound = '';
    if (ctype=="ASR"){
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_sound'] = "from "+version+" import onboard_sound";
    sound+='onboard_sound.adc'+','
    }
    var secret_key = Blockly.Python.valueToCode(this, 'SECRET_KEY', Blockly.Python.ORDER_ATOMIC);
    var code =  v + ' = ' + 'baidu_speech.' +ctype + '(' +sound + api_key + ', ' + secret_key + ')\n';   
    return code;
};

Blockly.Python.forBlock['MICROPYTHON_AI_Speech_unit'] = function(){
    Blockly.Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);   
    var code = v + '.chatbot(' + id+','+s +  ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['MICROPYTHON_AI_Speech_asr'] = function(){
    var language = this.getFieldValue('LANGUAGE');
    Blockly.Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var fn = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC) || '""';    
    var code = v + '.recognize(record_time=' + fn + ',dev_pid=' + language + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

