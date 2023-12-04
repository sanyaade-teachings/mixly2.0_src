import Python from '../../python/python_generator';

export const mode = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const size = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const camera_init = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key1 = Python.valueToCode(this, 'key1', Python.ORDER_ATOMIC);
    var key2 = Python.valueToCode(this, 'key2', Python.ORDER_ATOMIC);
    var key3 = Python.valueToCode(this, 'key3', Python.ORDER_ATOMIC);
    var key4 = Python.valueToCode(this, 'key4', Python.ORDER_ATOMIC);
    var code1 = "sensor.reset()\n";
    var code2 = "sensor.set_pixformat(" + key1 + ")\n";
    var code3 = "sensor.set_framesize(" + key2 + ")\n";
    var code4 = "sensor.run(" + key3 + ")\n";
    var code5 = "sensor.skip_frames(" + key4 + ")\n";
    var code = code1 + code2 + code3 + code4 + code5;
    return code;
};

export const camera_reset = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var code = "sensor.reset()\n";
    return code;
};

export const camera_set_pixformat = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.set_pixformat(" + key + ")\n";
    return code;
};

export const camera_set_framesize = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.set_framesize(" + key + ")\n";
    return code;
};

export const camera_run = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.run(" + key + ")\n";
    return code;
};

export const camera_skip_frames = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var frame = Python.valueToCode(this, 'frame', Python.ORDER_ATOMIC);
    var code = "sensor.skip_frames(n=" + frame + ")\n";
    return code;
};

export const camera_snapshot = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var code = 'sensor.snapshot()';
    return [code, Python.ORDER_ATOMIC];
};

export const camera_shutdown = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.shutdown(" + key + ")\n";
    return code;
};

export const camera_set_hmirror = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.set_hmirror(" + key + ")\n";
    return code;
};

export const camera_set_vflip = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.set_vflip(" + key + ")\n";
    return code;
};

export const camera_set_colorbar = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "sensor.set_colorbar(" + key + ")\n";
    return code;
};



export const camera_getinfo = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = this.getFieldValue('key');
    var code = "sensor." + key + "()";
    return [code, Python.ORDER_ATOMIC];
};

export const camera_setmun = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var key = this.getFieldValue('key');
    var num = Python.valueToCode(this, 'num', Python.ORDER_ATOMIC);
    var code = "sensor." + key + "(" + num + ")\n";
    return code;
};

export const camera_set_windowing = function () {
    Python.definitions_['import_sensor'] = 'import sensor';
    var numa = Python.valueToCode(this, 'numa', Python.ORDER_ATOMIC);
    var numb = Python.valueToCode(this, 'numb', Python.ORDER_ATOMIC);
    var code = "sensor.set_windowing((" + numa + "," + numb + "))\n";
    return code;
};





