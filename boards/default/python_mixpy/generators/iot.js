'use strict';

goog.provide('Blockly.Python.iot');
goog.require('Blockly.Python');

Blockly.Python.forBlock['iot_mixio_connect'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;
  var username =  Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ;
  var project =  Blockly.Python.valueToCode(this, 'PROJECT', Blockly.Python.ORDER_ATOMIC) ;
  var timestamp = Math.round(new Date()).toString();
  //var subscribe = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var a = "f'python-mqtt-" + username.replace("'","").replace("'","") + timestamp.replace("'","").replace("'","") + "'"; 
  var code= 'mixio_client_id = '+ a +'\n' + 'mqtt_client = mixiot.MixIO(' + server + ', 1883 ,'+ username + ', ' + password+', '+ project  + ', mixio_client_id)\nmqtt_client.connect()\n';
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
    var code = 'mqtt_client.subscribe_and_set_callback(' + topic + ','+method+ ')\n';  
    return code;
};

Blockly.Python.IOT_MIXIO_UNSUBSCRIBE = function (block) {
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
    var code = 'mqtt_client.unsubscribe(' + topic + ')\n';  
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

Blockly.Python.forBlock['IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE'] = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  var server = Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC);
  var share_code = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
  var timestamp = Math.round(new Date()).toString();
  var a = "f'python-mqtt-" + share_code.replace("'","").replace("'","") + timestamp.replace("'","").replace("'","")+ "'"; 
  var code= 'mixio_client_id = '+ a +'\n' + 'mqtt_client = mixiot.MixIO.from_mixly_key(' + server + ', 1883 ,"'+ share_code  + '", mixio_client_id)\nmqtt_client.connect()\n';
  return code;
};

Blockly.Python.forBlock['iot_mixly_key'] = function() {
  var code =  this.getFieldValue('VISITOR_ID') ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE'] = function(block) {  
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ; 
  var mixly_code = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ATOMIC);
  var timestamp = Math.round(new Date()).toString();
  var a = "f'python-mqtt-" + mixly_code.replace("'","").replace("'","") + timestamp.replace("'","").replace("'","")+ "'"; 
  var code= 'mixio_client_id = '+ a +'\n' + 'mqtt_client = mixiot.MixIO.from_share_key(' + server + ', 1883 ,"'+ mixly_code  + '", mixio_client_id)\nmqtt_client.connect()\n';
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