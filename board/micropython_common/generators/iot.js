'use strict';

goog.provide('Blockly.Python.iot');
goog.require('Blockly.Python');

Blockly.Python.iot_wifi_connect = function(block) {  
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";  
  var username =  Blockly.Python.valueToCode(this, 'WIFINAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ; 
  var code='mixiot.wlan_connect(' + username + ','  + password + ')\n';
  return code;
};

Blockly.Python.iot_onenet_connect = function(block) {
  Blockly.Python.definitions_['import_simple'] = "import simple";
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var client =  Blockly.Python.valueToCode(this, 'CLIENT', Blockly.Python.ORDER_ATOMIC) ;
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;
  var username =  Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ;
  var topic =  Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC) ;
  var subscribe = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code= v + ' = miot.init_MQTT_client(' + client + ', ' + server + ', '+ username + ', ' + password +', ' + topic+', ' + subscribe + ')\n';
  return code;
};

Blockly.Python.iot_onenet_disconnect = function(block) {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  Blockly.Python.definitions_['import_simple'] = "import simple"; 
  var code=v + '.do_disconnect()\n';  
  return code;
};

Blockly.Python.iot_onenet_publish_dict = function(block) {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var d = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ATOMIC) ;
  var check = this.getFieldValue("is_print") == 'TRUE' ? 'True' : 'False';
  Blockly.Python.definitions_['import_simple'] = "import simple"; 
  var code=v + '.publish('+d+', is_print = '+check+')\n';  
  return code;
};

Blockly.Python.iot_onenet_check = function(block) {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ; 
  Blockly.Python.definitions_['import_simple'] = "import simple"; 
  var code=v + '.check_msg()\n';  
  return code;
};

Blockly.Python.iot_onenet_publish = function() {
  // Create a list with any number of elements of any type.
  
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
 Blockly.Python.definitions_['import_miot'] = "import miot";  
  var ck = new Array(this.itemCount_);
  var cv = new Array(this.itemCount_);
  var ct = new Array(this.itemCount_);

  var default_value = '0';
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;

  for (var n = 0; n < this.itemCount_; n++) {
  var keyName = this.getFieldValue('KEY' + n);    
  ck[n] = keyName
  }
  for (var n = 0; n < this.itemCount_; n++) {     
  cv[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  var code=v + ".publish({";
  for (var n = 0; n < this.itemCount_; n++) {
    ct[n] = ck[n]+': '+cv[n]
  }
  //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Python.setups_['setup_lists'+varName] = code;
  code=code+ct.join(', ')+"})\n";
  return code;
};

Blockly.Python.iot_mixio_connect = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot";
  Blockly.Python.definitions_['import_machine'] = "import machine";
  Blockly.Python.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;
  var username =  Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ;
  var project =  Blockly.Python.valueToCode(this, 'PROJECT', Blockly.Python.ORDER_ATOMIC) ;
  //var subscribe = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var a = "'" + username.replace("'","").replace("'","") + "/" + project.replace("'","").replace("'","") + "/'"
  var code= 'MQTT_USR_PRJ = '+ a +'\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', '+ username + ', ' + password  + ', MQTT_USR_PRJ)\n';
  return code;
};

Blockly.Python.IOT_MIXIO_PUBLISH = function(block) {
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  var msg = Blockly.Python.valueToCode(this, 'MSG', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code = 'mqtt_client.publish(MQTT_USR_PRJ + ' + topic +', '+ msg +')\n';  
  return code;
};

Blockly.Python.IOT_MIXIO_SUBSCRIBE = function (block) {
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    var method = Blockly.Python.valueToCode(this, 'METHOD', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
    var code = 'mqtt_client.set_callback('+ topic + ',' + method + ', MQTT_USR_PRJ)\n';
    code += 'mqtt_client.subscribe(MQTT_USR_PRJ + ' + topic + ')\n';  
    return code;
};

Blockly.Python.iot_mixio_disconnect = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code= 'mqtt_client.disconnect(MQTT_USR_PRJ)\n';  
  return code;
};

Blockly.Python.iot_mixio_connect_only = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code= 'mqtt_client.connect()\n';  
  return code;
};

Blockly.Python.iot_mixio_check = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code='mqtt_client.check_msg()\n';  
  return code;
};

Blockly.Python.iot_mixio_format_topic = function(block) {
  var code='mqtt_client.decode("utf-8").split("/")[-1]';  
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.iot_mixio_format_msg = function(block) {
  var code='mqtt_client.decode("utf-8")';  
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.IOT_FORMATTING = function(block) {
  Blockly.Python.definitions_['import_mixpy'] = "import mixpy"; 
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixpy.format_content('+ v +', mqtt_client.client_id)';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.IOT_FORMAT_STRING = function(block) {
  Blockly.Python.definitions_['import_mixpy'] = "import mixpy"; 
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixpy.format_str('+ v +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE = function(block) {
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

Blockly.Python.iot_mixly_key = function() {
  var code =  this.getFieldValue('VISITOR_ID') ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE = function(block) {
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

Blockly.Python.IOT_EMQX_PING = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var code ='mqtt_client.pingSync()';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.IOT_MIXIO_NTP = function(block) {
  Blockly.Python.definitions_['import_mixiot'] = "import mixiot"; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var code ='mixiot.ntp(' + addr + ')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.iot_client_onboard = function(){    
    var code = 'mqtt_client';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.iot_http_client = function(block) {
  Blockly.Python.definitions_['import_urequests'] = "import urequests"; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var key = this.getFieldValue('key');
  var code ='HTTP_client = urequests.get(' + addr + ',debug='+key+')\n';  
  return code;
};

Blockly.Python.iot_http_data = function(){
    Blockly.Python.definitions_['import_urequests'] = "import urequests"; 
    var key = this.getFieldValue('key');
    var code='HTTP_client.'+key;    
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.iot_mqtt_client = function(block) {
  Blockly.Python.definitions_['import_urequests'] = "import urequests"; 
  var addr =  Blockly.Python.valueToCode(this, 'addr', Blockly.Python.ORDER_ATOMIC) ; 
  var key = this.getFieldValue('key2');
  var code ='mqtt_client = mixiot.init_MQTT_client(' + addr + ', "MixIO_public", "MixIO_public", "MixIO/3QBAGKRL/default/",debug='+key+')\n';
  code+='mqtt_client.subscribe("$SYS/hello")\n';  
  return code;
};

Blockly.Python.iot_mqtt_data = function(){
    Blockly.Python.definitions_['import_urequests'] = "import urequests"; 
    var key = this.getFieldValue('key');
    var code='mqtt_client.'+key;   
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Blocks['iot_wificonnect'] = Blockly.Blocks['iot_wifi_connect'];
Blockly.Blocks['iot_onenetconnect'] = Blockly.Blocks['iot_onenet_connect'];
Blockly.Blocks['iot_onenetdisconnect'] = Blockly.Blocks['iot_onenet_disconnect'];
Blockly.Blocks['iot_checkonenet'] = Blockly.Blocks['iot_onenet_check'];
Blockly.Blocks['iot_publish'] = Blockly.Blocks['iot_onenet_publish'];