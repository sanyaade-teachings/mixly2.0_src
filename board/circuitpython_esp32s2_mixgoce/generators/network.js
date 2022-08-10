'use strict';

goog.provide('Blockly.Python.network');
goog.require('Blockly.Python');

Blockly.Python.iot_wifi_connect = function(block) {
  Blockly.Python.definitions_['import_mixgoce_do_connect'] = "from mixgoce import do_connect";  
  var username =  Blockly.Python.valueToCode(this, 'WIFINAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ; 
  var code='do_connect(' + username + ','  + password + ')\n';
  return code;
};

Blockly.Python['radio_init'] = function(){
    Blockly.Python.definitions_['import_nrf'] = 'import nrf';
    var type = this.getFieldValue('type');
    var code = 'nrf = nrf.NRF()\n';
    return code;
};

Blockly.Python['radio_ons'] = function(){
    Blockly.Python.definitions_['import_nrf'] = 'import nrf';
    var type = this.getFieldValue('type');
    var code = 'nrf.power('+type+')\n';
    return code;
};
Blockly.Python['microbit_radio_config'] = function(block) {
  Blockly.Python.definitions_['import_nrf'] = 'import nrf';
  //var number_length = block.getFieldValue('length');
  var number_channel = Blockly.Python.valueToCode(this, "channel", Blockly.Python.ORDER_ATOMIC);
  var number_power = Blockly.Python.valueToCode(this, "power", Blockly.Python.ORDER_ATOMIC);
  var address = Blockly.Python.valueToCode(this, "address", Blockly.Python.ORDER_ATOMIC);
  var dropdown_data_rate = Blockly.Python.valueToCode(this, "data_rate", Blockly.Python.ORDER_ATOMIC);
  var code = 'nrf.config(channel=' + number_channel + ', power=' + number_power + ', address=b' + address + ', data_rate=' + dropdown_data_rate + ')\n';
  return code;
};
Blockly.Python.radio_send_string = function () {
  Blockly.Python.definitions_['import_nrf'] = 'import nrf';
  var type = this.getFieldValue('type');
    var number = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "nrf."+type+"(" + number + ")\n";
}

Blockly.Python.radio_receive_string = function () {
  Blockly.Python.definitions_['import_nrf'] = 'import nrf';
  var type = this.getFieldValue('type');
  var code = "nrf."+type+"()";
  return [code, Blockly.Python.ORDER_ATOMIC];
}


Blockly.Python.network_socket_init= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    if (mode=='UDP'){
      mode = 'socketpool.SOCK_DGRAM'
    }
    else if (mode=='TCP'){
      mode = 'socketpool.SOCK_STREAM'
    }
    return ""+varName+" = socketpool.Socket("+mode+")\n";
}

Blockly.Python.network_socket_bind= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".bind("+address+")\n";
}

Blockly.Python.network_socket_connect= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".connect("+address+")\n";
}

Blockly.Python.network_socket_listen= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var queue = Blockly.Python.valueToCode(this, 'queue', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".listen("+queue+")\n";
}

Blockly.Python.network_socket_accept= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+varName+".accept()";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.network_socket_receive= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".recv_into("+size+")";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.network_socket_send= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var content = Blockly.Python.valueToCode(this, 'content', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".send("+content+")\n";
    return code;
}

Blockly.Python.network_socket_receive_from= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".recvfrom_into("+size+")";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.network_socket_send_to= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var content = Blockly.Python.valueToCode(this, 'content', Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".sendto("+content+","+address+")\n";
    return code;
}

Blockly.Python.network_socket_close= function() {
    Blockly.Python.definitions_['import_socketpool'] = "import socketpool";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+varName+".close()\n";
    return code;
}

Blockly.Python.time_ntptime= function() {
    Blockly.Python.definitions_.import_mixgoce = "import mixgoce";    
    var op=this.getFieldValue('op');
    var code="mixgoce.ntp()["+op+"]";
    switch (op) {    
    case "all":
       var code1 = "mixgoce.ntp()";
       return [code1, Blockly.Python.ORDER_ATOMIC];
       break;
    default:
      return [code, Blockly.Python.ORDER_ATOMIC];
      break;       
  }
}