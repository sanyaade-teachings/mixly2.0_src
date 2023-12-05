import Python from '../../python/python_generator';

export const iot_wifi_connect = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var username = Python.valueToCode(this, 'WIFINAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var code = 'mixiot.wlan_connect(' + username + ',' + password + ')\n';
    return code;
};

export const iot_onenet_connect = function () {
    Python.definitions_['import_onenet'] = "import onenet";
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var client = Python.valueToCode(this, 'CLIENT', Python.ORDER_ATOMIC);
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var username = Python.valueToCode(this, 'USERNAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var subscribe = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT) || 'None';
    var code = v + ' = onenet.init_MQTT_client(' + client + ', ' + server + ', ' + username + ', ' + password + ', ' + topic + ', ' + subscribe + ')\n';
    return code;
};

export const iot_onenet_disconnect = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_onenet'] = "import onenet";
    var code = v + '.do_disconnect()\n';
    return code;
};

export const iot_onenet_publish_dict = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var d = Python.valueToCode(this, 'DICT', Python.ORDER_ATOMIC);
    var check = this.getFieldValue("is_print") == 'TRUE' ? 'True' : 'False';
    Python.definitions_['import_onenet'] = "import onenet";
    var code = v + '.publish(' + d + ', is_print = ' + check + ')\n';
    return code;
};

export const iot_onenet_check = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_onenet'] = "import onenet";
    var code = v + '.check_msg()\n';
    return code;
};

export const iot_onenet_publish = function () {
    // Create a list with any number of elements of any type.

    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    Python.definitions_['import_onenet'] = "import onenet";
    var ck = new Array(this.itemCount_);
    var cv = new Array(this.itemCount_);
    var ct = new Array(this.itemCount_);

    var default_value = '0';
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);

    for (let n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        ck[n] = keyName;
    }
    for (let n = 0; n < this.itemCount_; n++) {
        cv[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    var code = v + ".publish({";
    for (let n = 0; n < this.itemCount_; n++) {
        ct[n] = ck[n] + ': ' + cv[n];
    }
    //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
    //Python.setups_['setup_lists'+varName] = code;
    code = code + ct.join(', ') + "})\n";
    return code;
};

export const iot_mixio_connect = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    Python.definitions_['import_machine'] = "import machine";
    Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var username = Python.valueToCode(this, 'USERNAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var project = Python.valueToCode(this, 'PROJECT', Python.ORDER_ATOMIC);
    //var subscribe = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT) || '0';
    var a = "'" + username.replace("'", "").replace("'", "") + "/" + project.replace("'", "").replace("'", "") + "/'"
    var code = 'MQTT_USR_PRJ = ' + a + '\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', ' + username + ', ' + password + ', MQTT_USR_PRJ)\n';
    return code;
};

export const IOT_MIXIO_PUBLISH = function () {
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var msg = Python.valueToCode(this, 'MSG', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.publish(MQTT_USR_PRJ + ' + topic + ', ' + msg + ')\n';
    return code;
};

export const IOT_MIXIO_SUBSCRIBE = function () {
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var method = Python.valueToCode(this, 'METHOD', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.set_callback(' + topic + ',' + method + ', MQTT_USR_PRJ)\n';
    code += 'mqtt_client.subscribe(MQTT_USR_PRJ + ' + topic + ')\n';
    return code;
};

export const iot_mixio_disconnect = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.disconnect(MQTT_USR_PRJ)\n';
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


export const IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE = function () {
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    // var port = '1883';
    var share_code = Python.valueToCode(this, 'KEY', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixiot'] = "import mixiot";
    Python.definitions_['import_machine'] = "import machine";
    Python.definitions_['import_urequests'] = "import urequests";
    Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    Python.definitions_['import_mixpy_analyse_sharekey'] = "from mixpy import analyse_sharekey";
    // var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
    // var socket_pool = 'socketpool.SocketPool(wifi.radio)'
    // var ssl_context = 'ssl.create_default_context()'
    var code = 'sk = analyse_sharekey(\'http://'+server.substring(1, server.length-1)+'/mixio-php/sharekey.php?sk=' + share_code + '\')\n'+
        'MQTT_USR_PRJ = sk[0]+\'/\'+sk[1]+\'/\'\n' +
        'mqtt_client = mixiot.init_MQTT_client(' + server + ', sk[0], sk[2]' + ', MQTT_USR_PRJ)\n';
    return code;
};

export const iot_mixly_key = function () {
    var code = this.getFieldValue('VISITOR_ID');
    return [code, Python.ORDER_ATOMIC];
};


export const IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    Python.definitions_['import_machine'] = "import machine";
    Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    // var port = '1883';
    var username = '"MixIO_public"';
    var password = '"MixIO_public"';
    var mixly_code = Python.valueToCode(this, 'KEY', Python.ORDER_ATOMIC);
    var a = '"MixIO/' + mixly_code + '/default/"'
    // var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
    // var socket_pool = 'socketpool.SocketPool(wifi.radio)'
    // var ssl_context = 'ssl.create_default_context()'
    var code = 'MQTT_USR_PRJ = ' + a + '\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', ' + username + ', ' + password + ', MQTT_USR_PRJ)\n';
    return code;
};

export const IOT_EMQX_PING = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.pingSync()';
    return [code, Python.ORDER_ATOMIC];
};

export const IOT_MIXIO_NTP = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var code = 'mixiot.ntp(' + addr + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const iot_client_onboard = function () {
    var code = 'mqtt_client';
    return [code, Python.ORDER_ATOMIC];
};

export const iot_http_client = function () {
    Python.definitions_['import_debugnet'] = "import debugnet";
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = 'HTTP_client = debugnet.request("GET",' + addr + ',debug=' + key + ')\n';
    return code;
};

export const iot_http_data = function () {
    Python.definitions_['import_debugnet'] = "import debugnet";
    var key = this.getFieldValue('key');
    var code = 'HTTP_client.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const iot_mqtt_client = function () {
    Python.definitions_['import_debugnet'] = "import debugnet";
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key2');
    var code = 'mqtt_client = debugnet.init_MQTT_client(' + addr + ', "MixIO_public", "MixIO_public", "MixIO/3QBAGKRL/default/",debug=' + key + ')\n';
    code += 'mqtt_client.subscribe("$SYS/hello")\n';
    return code;
};

export const iot_mqtt_data = function () {
    Python.definitions_['import_mixiot'] = "import mixiot";
    var key = this.getFieldValue('key');
    var code = 'mqtt_client.' + key;
    return [code, Python.ORDER_ATOMIC];
};