'use strict';

goog.provide('Blockly.Python.iot');
goog.require('Blockly.Python');

Blockly.Python.forBlock['iot_mixio_connect'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;
  var username =  Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ;
  var project =  Blockly.Python.valueToCode(this, 'PROJECT', Blockly.Python.ORDER_ATOMIC) ;
  //var subscribe = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var a = "f'python-mqtt-" + username.replace("'","").replace("'","") + "'"; 
  var code= 'mixio_client_id = '+ a +'\n' + 'mqtt_client = mixiot.MixIO(' + server + ', 1883 ,'+ username + ', ' + password+', '+ project  + ', mixio_client_id)\n';
  return code;
};

Blockly.Python.forBlock['IOT_MIXIO_PUBLISH'] = function(block) {
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  var msg = Blockly.Python.valueToCode(this, 'MSG', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code = 'mqtt_client.publish(' + topic +', '+ msg +')\n';  
  return code;
};

Blockly.Python.forBlock['IOT_MIXIO_SUBSCRIBE'] = function (block) {
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    var method = Blockly.Python.valueToCode(this, 'METHOD', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
    var code = 'mqtt_client.client.on_message = ' +method + '\n';
    code += 'mqtt_client.subscribe(' + topic + ')\n';  
    return code;
};

Blockly.Python.forBlock['iot_mixio_disconnect'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code= 'mqtt_client.disconnect(MQTT_USR_PRJ)\n';  
  return code;
};

Blockly.Python.forBlock['iot_mixio_connect_only'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code= 'mqtt_client.connect()\n';  
  return code;
};

Blockly.Python.forBlock['iot_mixio_check'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code='mqtt_client.check_msg()\n';  
  return code;
};

Blockly.Python.forBlock['iot_mixio_format_topic'] = function(block) {
  var code='mqtt_client.decode("utf-8").split("/")[-1]';  
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['iot_mixio_format_msg'] = function(block) {
  var code='mqtt_client.decode("utf-8")';  
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['IOT_FORMATTING'] = function(block) {
  Blockly.Python.definitions_['import_mixpy'] = "import mixpy"; 
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixpy.format_content('+ v +', mqtt_client.client_id)';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['IOT_FORMAT_STRING'] = function(block) {
  Blockly.Python.definitions_['import_mixpy'] = "import mixpy"; 
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixpy.format_str('+ v +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE'] = function(block) {
  var server = Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC);
  var port = '1883';
  var share_code = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  Blockly.Python.definitions_['import_machine'] = "import machine";
  Blockly.Python.definitions_['import_urequests'] = "import urequests";
  Blockly.Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
  Blockly.Python.definitions_['import_mixpy_analyse_sharekey'] = "from mixpy import analyse_sharekey";  
  var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
  var socket_pool = 'socketpool.SocketPool(wifi.radio)'
  var ssl_context = 'ssl.create_default_context()'
  var code = 'sk = analyse_sharekey(\'http://mixio.mixly.cn/mixio-php/sharekey.php?sk=' + share_code + '\')\n'+
             'MQTT_USR_PRJ = sk[0]+\'/\'+sk[1]+\'/\'\n'+
              'mqtt_client = mixiot.init_MQTT_client(' + server + ', sk[0], sk[2]' + ', MQTT_USR_PRJ)\n';
  return code;
};

Blockly.Python.forBlock['iot_mixly_key'] = function() {
  var code =  this.getFieldValue('VISITOR_ID') ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  Blockly.Python.definitions_['import_machine'] = "import machine";
  Blockly.Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;  
  var port = '1883';
  var username = '"MixIO_public"';
  var password = '"MixIO_public"';
  var mixly_code = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
  var a = '"MixIO/' + mixly_code + '/default/"'
  var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
  var socket_pool = 'socketpool.SocketPool(wifi.radio)'
  var ssl_context = 'ssl.create_default_context()'
  var code= 'MQTT_USR_PRJ = '+ a +'\n'+ 'mqtt_client = mixiot.init_MQTT_client(' + server + ', '+ username + ', ' + password   + ', MQTT_USR_PRJ)\n';
  return code;
};

Blockly.Python.forBlock['IOT_EMQX_PING'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code ='mqtt_client.pingSync()';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['IOT_MIXIO_NTP'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var code ='mixiot.ntp(' + addr + ')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};




Blockly.Blocks['iot_wificonnect'] = Blockly.Blocks['iot_wifi_connect'];
Blockly.Blocks['iot_onenetconnect'] = Blockly.Blocks['iot_onenet_connect'];
Blockly.Blocks['iot_onenetdisconnect'] = Blockly.Blocks['iot_onenet_disconnect'];
Blockly.Blocks['iot_checkonenet'] = Blockly.Blocks['iot_onenet_check'];
Blockly.Blocks['iot_publish'] = Blockly.Blocks['iot_onenet_publish'];