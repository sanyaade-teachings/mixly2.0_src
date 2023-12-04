import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const MICROPYTHON_AI_client = function () {
    var ctype = this.getFieldValue('CTYPE');
    Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var api_key = Python.valueToCode(this, 'API_KEY', Python.ORDER_ATOMIC);
    var sound = '';
    if (ctype == "ASR") {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2];
        Python.definitions_['import_' + version + '_onboard_sound'] = "from " + version + " import onboard_sound";
        sound += 'onboard_sound.adc' + ',';
    }
    var secret_key = Python.valueToCode(this, 'SECRET_KEY', Python.ORDER_ATOMIC);
    var code = v + ' = ' + 'baidu_speech.' + ctype + '(' + sound + api_key + ', ' + secret_key + ')\n';
    return code;
};

export const MICROPYTHON_AI_Speech_unit = function () {
    Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var id = Python.valueToCode(this, 'ID', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'STR', Python.ORDER_ATOMIC);
    var code = v + '.chatbot(' + id + ',' + s + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const MICROPYTHON_AI_Speech_asr = function () {
    var language = this.getFieldValue('LANGUAGE');
    Python.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var fn = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC) || '""';
    var code = v + '.recognize(record_time=' + fn + ',dev_pid=' + language + ')';
    return [code, Python.ORDER_ATOMIC];
};

