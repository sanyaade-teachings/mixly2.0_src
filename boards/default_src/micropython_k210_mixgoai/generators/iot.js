import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const iot_wifi_connect = function () {
    // Python.definitions_['import_simple'] = "import simple";
    Python.definitions_['import_miot'] = "import miot_no";
    var username = Python.valueToCode(this, 'WIFINAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var code = 'miot_no.do_connect(' + username + ',' + password + ')\n';
    return code;
};

export const iot_onenet_connect = function () {
    Python.definitions_['import_miot'] = "import miot_no";
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var client = Python.valueToCode(this, 'CLIENT', Python.ORDER_ATOMIC);
    var server = Python.valueToCode(this, 'SERVER', Python.ORDER_ATOMIC);
    var username = Python.valueToCode(this, 'USERNAME', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'PASSWORD', Python.ORDER_ATOMIC);
    var topic = Python.valueToCode(this, 'TOPIC', Python.ORDER_ATOMIC);
    var subscribe = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT) || '0';
    var code = v + ' = miot_no.init_MQTT_client(' + client + ', ' + server + ', ' + username + ', ' + password + ', ' + topic + ', ' + subscribe + ')\n';
    return code;
};

export const iot_onenet_disconnect = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_simple'] = "import simple";
    var code = v + '.do_disconnect()\n';
    return code;
};

export const iot_onenet_publish_dict = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var d = Python.valueToCode(this, 'DICT', Python.ORDER_ATOMIC);
    var check = this.getFieldValue("is_print") == 'TRUE' ? 'True' : 'False';
    Python.definitions_['import_simple'] = "import simple";
    var code = v + '.publish(' + d + ', is_print = ' + check + ')\n';
    return code;
};

export const iot_onenet_check = function () {
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_simple'] = "import simple";
    var code = v + '.check_msg()\n';
    return code;
};

export const iot_onenet_publish = function () {
    // Create a list with any number of elements of any type.

    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    Python.definitions_['import_miot'] = "import miot_no";
    var ck = new Array(this.itemCount_);
    var cv = new Array(this.itemCount_);
    var ct = new Array(this.itemCount_);

    var default_value = '0';
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);

    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        ck[n] = keyName
    }
    for (var n = 0; n < this.itemCount_; n++) {
        cv[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    var code = v + ".publish({";
    for (var n = 0; n < this.itemCount_; n++) {
        ct[n] = ck[n] + ': ' + cv[n]
    }
    //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
    //Python.setups_['setup_lists'+varName] = code;
    code = code + ct.join(', ') + "})\n";
    return code;
};

Blockly.Blocks['iot_wificonnect'] = Blockly.Blocks['iot_wifi_connect'];
Blockly.Blocks['iot_onenetconnect'] = Blockly.Blocks['iot_onenet_connect'];
Blockly.Blocks['iot_onenetdisconnect'] = Blockly.Blocks['iot_onenet_disconnect'];
Blockly.Blocks['iot_checkonenet'] = Blockly.Blocks['iot_onenet_check'];
Blockly.Blocks['iot_publish'] = Blockly.Blocks['iot_onenet_publish'];