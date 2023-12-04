import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const tuple_anchor = function () {
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    var code = varName + '= ' + '(' + text + ')\n';
    return code;
};

export const tuple_calss = function () {
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    var code = varName + '= ' + '[' + text + ']\n';
    return code;
};

export const KPU_load = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = sub + " = kpu.load(" + path + ")\n";
    return code;
};

export const KPU_load1 = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = sub + " = kpu.load(" + path + ")\n";
    return code;
};

export const KPU_init_yolo2 = function () {
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var th = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var nm = Python.valueToCode(this, 'nms_value', Python.ORDER_ATOMIC);
    var an = Python.valueToCode(this, 'anchor_num', Python.ORDER_ATOMIC);
    var anchor = Python.valueToCode(this, 'anchor', Python.ORDER_ATOMIC);
    var code = "kpu.init_yolo2(" + sub + "," + th + "," + nm + "," + an + "," + anchor + ")\n";
    return code;
};

export const KPU_run_yolo2 = function () {
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var img = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "kpu.run_yolo2(" + sub + "," + img + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const KPU_forward = function () {
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var img = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "kpu.forward(" + sub + "," + img + ")[:]";
    return [code, Python.ORDER_ATOMIC];
};

export const KPU_analysis = function () {
    Python.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const aionenet_nic_init = function () {
    Python.definitions_['import aionenet'] = 'import aionenet';
    var account = Python.valueToCode(this, 'account', Python.ORDER_ATOMIC);
    var passwor = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
    var code = "aionenet.nic_init(" + account + "," + passwor + ")\n";
    return code;
};

export const aionenet_token = function () {
    Python.definitions_['import aionenet'] = 'import aionenet';
    var account = Python.valueToCode(this, 'account', Python.ORDER_ATOMIC);
    var passwor = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
    var code = "aionenet.token(" + account + "," + passwor + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const aionenet_API = function () {
    Python.definitions_['import aionenet'] = 'import aionenet';
    var img = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var token = Python.valueToCode(this, 'token', Python.ORDER_ATOMIC);
    var api = this.getFieldValue('api');
    var code = 'aionenet.post_ai(' + img + ',"' + api + '",' + token + ')';
    return [code, Python.ORDER_ATOMIC];
};

///---------------------------------------------------------------
export const ailocal_training = function () {
    Python.definitions_['import ailocal'] = 'import ailocal';
    var calss = Python.valueToCode(this, 'calss', Python.ORDER_ATOMIC);
    var sample = Python.valueToCode(this, 'sample', Python.ORDER_ATOMIC);
    var save = Python.valueToCode(this, 'save', Python.ORDER_ATOMIC);
    var code = "ailocal.training(" + calss + "," + sample + "," + save + ")\n";
    return code;
};

export const ailocal_loading = function () {
    Python.definitions_['import ailocal'] = 'import ailocal';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = "ailocal.loading(" + path + ")\n";
    return code;
};

export const ailocal_predict = function () {
    Python.definitions_['import ailocal'] = 'import ailocal';
    var calss = Python.valueToCode(this, 'calss', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "ailocal.predict(" + sub + "," + calss + ")";
    return [code, Python.ORDER_ATOMIC];
};

//---开始------------新增---20210302---------------------------------------------------

export const ai_face_init = function () {
    Python.definitions_['import ai_face'] = 'import ai_face';
    var FD = Python.valueToCode(this, 'FD', Python.ORDER_ATOMIC);
    var LD = Python.valueToCode(this, 'LD', Python.ORDER_ATOMIC);
    var FE = Python.valueToCode(this, 'FE', Python.ORDER_ATOMIC);
    var code = "ai_face.init(" + FD + "," + LD + "," + FE + ")\n";
    return code;
};


export const ai_face_train = function () {
    Python.definitions_['import ai_face'] = 'import ai_face';
    var img = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var names = Python.valueToCode(this, 'names', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var code = 'ai_face.train(' + img + ',' + names + ',' + threshold + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_face_info = function () {
    Python.definitions_['import ai_face'] = 'import ai_face';
    var key = this.getFieldValue('key');
    var code = 'ai_face.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

//---开始------------新增---20210302---------------------------------------------------