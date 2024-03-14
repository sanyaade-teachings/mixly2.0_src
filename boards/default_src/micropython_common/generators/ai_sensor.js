import Python from '../../python/python_generator';

export const ai_sensor_use_uart_init = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=mixgo_ai.AI(' + key + ',quick=1)\n';
    return code;
};

export const ai_sensor_qrcode_lite = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var code = sub + '.find_' + type + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_config = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var rx = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    var tx = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var dropdown_uart = this.getFieldValue('mode');
    var code = v + '.configure(' + tx + ',' + rx + ',restart=' + dropdown_uart + ')\n';
    return code;
};

export const ai_sensor_rgb = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var led1 = Python.valueToCode(this, 'led1', Python.ORDER_ATOMIC);
    var led2 = Python.valueToCode(this, 'led2', Python.ORDER_ATOMIC);
    var code = v + '.led_rgb(' + led1 + ',' + led2 + ')\n';
    return code;
};

export const ai_sensor_qrcode = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_qrcodes = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_qrcodes()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_barcode = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_barcodes = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_barcodes()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_tag = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_tags = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_apriltags()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_line = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_lines = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v3 = Python.valueToCode(this, 'VAR3', Python.ORDER_ATOMIC);
    var code = v + '.find_lines(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_circle = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_circles = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v3 = Python.valueToCode(this, 'VAR3', Python.ORDER_ATOMIC);
    var code = v + '.find_circles(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_rect = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_rects = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var code = v + '.find_rects(' + v1 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_color = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_colors = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_colors()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_color_chases_result = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_color_chases = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v3 = Python.valueToCode(this, 'VAR3', Python.ORDER_ATOMIC);
    var code = v + '.color_track(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_ailocal_train = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v3 = Python.valueToCode(this, 'VAR3', Python.ORDER_ATOMIC);
    var v4 = Python.valueToCode(this, 'VAR4', Python.ORDER_ATOMIC);
    var code = v + '.ailocal_train(' + v1 + ',' + v2 + ',' + v3 + ',' + v4 + ')\n';
    return code;
};

export const ai_sensor_ailocal_class = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v4 = Python.valueToCode(this, 'VAR4', Python.ORDER_ATOMIC);
    var code = v + '.ailocal_class(' + v1 + ',' + v2 + ',' + v4 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_ailocal_class_result = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_audio_record = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var code = v + '.audio_record(path=' + v1 + ',times=' + v2 + ')\n';
    return code;
};

export const ai_sensor_audio_play = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var code = v + '.audio_play(path=' + v1 + ',volume=' + v2 + ')\n';
    return code;
};

export const ai_sensor_yolo_recognize = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var v4 = Python.valueToCode(this, 'VAR4', Python.ORDER_ATOMIC);
    var code = v + '.yolo_recognize(' + v1 + ',' + v2 + ',' + v4 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_yolo_recognize_result = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_asr_recognize = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var v1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var v2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var code = v + '.asr_recognize(' + v1 + ',threshold=' + v2 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_licenseplate = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_licenseplates = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_licenseplate()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_face = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_classifier_faces = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.face_detect()';
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_20object = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const ai_sensor_find_20objects = function () {
    Python.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.find_20object()';
    return [code, Python.ORDER_ATOMIC];
};