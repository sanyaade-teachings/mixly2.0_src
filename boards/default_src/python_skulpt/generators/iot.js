import Python from '../../python/python_generator';

export const iot_mixio_connect = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var username = Python.valueToCode(this, 'USERNAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var project = Python.valueToCode(this, 'PROJECT', Python.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    //var subscribe = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT) || '0';
    var a = "f'python-mqtt-" + username.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO(' + server + ', 8084 ,' + username + ', ' + password + ', ' + project + ',' + a + ')\n';
    return code;
};

export const IOT_MIXIO_PUBLISH = function () {
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var msg = Python.valueToCode(this, 'MSG', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.publish(' + topic + ', ' + msg + ')\n';
    return code;
};

export const IOT_MIXIO_SUBSCRIBE = function () {
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var method = Python.valueToCode(this, 'METHOD', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.subscribe(' + topic + ',' + method + ')\n';
    return code;
};

Python.IOT_MIXIO_UNSUBSCRIBE = function () {
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.unsubscribe(' + topic + ')\n';
    return code;
};

export const iot_mixio_disconnect = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.disconnect()\n';
    return code;
};

export const iot_mixio_connect_only = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.connect()\n';
    return code;
};

export const iot_mixio_check = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.check_msg()\n';
    return code;
};

export const iot_mixio_format_topic = function () {
    var code = 'mqtt_client.decode("utf-8").split("/")[-1]';
    return [code, Python.ORDER_ATOMIC];
};

export const iot_mixio_format_msg = function () {
    var code = 'mqtt_client.decode("utf-8")';
    return [code, Python.ORDER_ATOMIC];
};

export const IOT_FORMATTING = function () {
    Python.definitions_['import_mixpy'] = "import mixpy";
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = 'mixpy.format_content(' + v + ', mqtt_client.client_id)';
    return [code, Python.ORDER_ATOMIC];
};

export const IOT_FORMAT_STRING = function () {
    Python.definitions_['import_mixpy'] = "import mixpy";
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = 'mixpy.format_str(' + v + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var share_code = Python.valueToCode(this, 'KEY', Python.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    var a = "f'python-mqtt-" + share_code.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO_init_by_mixly_key(' + server + ', 8084 ,' + share_code + ',' + a + ')\n';
    return code;
};

export const iot_mixly_key = function () {
    var code = this.getFieldValue('VISITOR_ID');
    return [code, Python.ORDER_ATOMIC];
};

export const IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    Python.definitions_['import_time'] = 'import time';
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var mixly_code = Python.valueToCode(this, 'KEY', Python.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    var a = "f'python-mqtt-" + mixly_code.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO_init_by_share_key(' + server + ', 8084 ,' + mixly_code + ',' + a + ')\ntime.sleep(2)\n';
    return code;
};

export const IOT_EMQX_PING = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.pingSync()';
    return [code, Python.ORDER_ATOMIC];
};

export const iot_mixly_key_py = function () {
    var code = this.getFieldValue('VISITOR_ID');
    return ["'" + code + "'", Python.ORDER_ATOMIC];
};