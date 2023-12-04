import Python from '../../python/python_generator';

export const AI_ChooseAndGet = function () {
    var type = this.getFieldValue('TYPE');
    Python.definitions_['import_FileDialog'] = 'import FileDialog';
    var code = 'FileDialog.' + type + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_client = function () {
    var ctype = this.getFieldValue('CTYPE');
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_' + ctype] = 'from aip import '+ ctype;
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var api_key = Python.valueToCode(this, 'API_KEY', Python.ORDER_ATOMIC);
    var secret_key = Python.valueToCode(this, 'SECRET_KEY', Python.ORDER_ATOMIC);
    var code = v + ' = ' + 'aip.' + ctype + '(' + api_key + ', ' + secret_key + ')\n';
    return code;
};

export const AI_Speech_synthesis = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'STR', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.synthesis(' + s + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Speech_asr = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    //var f = Python.valueToCode(this, 'FUNC', Python.ORDER_ATOMIC);
    var fn = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC) || '""';
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    //var code = v + '.'+ f +'(' + fn + ', options=' + attr + ')';
    var code = v + '.asr(' + fn + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_ImageClassify = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_AipImageClassify'] = 'from aip import AipImageClassify';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'ADDR', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'FUNC', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + addr + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Face_match = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var s2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.match(' + s + ',' + s2 + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Ocr = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_Ocr'] = 'from aip import Ocr';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'ADDR', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'FUNC', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + addr + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'STR', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'FUNC', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + s + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp_Sim = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s1 = Python.valueToCode(this, 'STR1', Python.ORDER_ATOMIC);
    var s2 = Python.valueToCode(this, 'STR2', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'FUNC', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + s1 + ',' + s2 + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp_Topic = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s1 = Python.valueToCode(this, 'STR1', Python.ORDER_ATOMIC);
    var s2 = Python.valueToCode(this, 'STR2', Python.ORDER_ATOMIC);
    var code = v + '.topic(' + s1 + ',' + s2 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp_newsSummary = function () {
    Python.definitions_['import_aip'] = 'import aip';
    //Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'STR', Python.ORDER_ATOMIC);
    var n = Python.valueToCode(this, 'LEN', Python.ORDER_ATOMIC);
    var attr = Python.valueToCode(this, 'ATTR', Python.ORDER_ATOMIC) || '{}';
    var code = v + '.newsSummary(' + s + ',' + n + ', options=' + attr + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const AI_ImageClassify_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Ocr_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Python.ORDER_ATOMIC];
};

export const AI_Nlp_Func_sim = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Python.ORDER_ATOMIC];
};

export const AI_audio = function () {
    Python.definitions_['import_audio'] = 'import audio';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var num = Python.valueToCode(this, 'TIME', Python.ORDER_ATOMIC) || '0';
    var code = "audio.audio_record(" + str + ',' + num + ")\n";
    return code;
};

export const AI_photo = function () {
    Python.definitions_['import_audio'] = 'import cam';
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '""';
    var button = Python.valueToCode(this, 'BUT', Python.ORDER_ATOMIC) || '""';
    var code = "cam.photo_capture(" + str + ',' + button + ")\n";
    return code;
};

export const AI_result = function () {
    var varName = Python.valueToCode(this, 'AI', Python.ORDER_ASSIGNMENT) || '0';
    var ctype = this.getFieldValue('CTYPE');
    if (ctype == 'Image') { var code = varName + '["result"][0]["keyword"]' }
    if (ctype == 'Speech') { var code = varName + '["result"][0]' }
    if (ctype == 'Face' || ctype == 'OcrSimilarity') { var code = varName + '["score"]' }
    if (ctype == 'Ocr') { var code = varName + '["words_result"]' }

    return [code, Python.ORDER_ATOMIC];
};