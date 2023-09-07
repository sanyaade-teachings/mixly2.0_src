'use strict';

goog.provide('Blockly.Python.network');
goog.require('Blockly.Python');

Blockly.Python.forBlock['network_init'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    return ""+varName+" = network.WLAN(network."+mode+"_IF);\n";
}

// Blockly.Python.forBlock['network_connect'] = function() {
//     Blockly.Python.definitions_['import_network'] = "import network";
//     // Blockly.Python.setups_['class_wlan'] ='wlan.active(True)\n';
//     var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
//     var id = Blockly.Python.valueToCode(this, 'id', Blockly.Python.ORDER_ATOMIC);
//     var password = Blockly.Python.valueToCode(this, 'password', Blockly.Python.ORDER_ATOMIC);
//     return "if not "+varName+".isconnected():\n"+
//            "  "+varName+".connect("+id+","+password+")\n"+
//            "  while not "+varName+".isconnected():\n"+
//            "    pass\n";
// }

Blockly.Python.forBlock['network_connect'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    // Blockly.Python.setups_['class_wlan'] ='wlan.active(True)\n';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'id', Blockly.Python.ORDER_ATOMIC);
    var password = Blockly.Python.valueToCode(this, 'password', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".connect("+id+","+password+")\n"
}

Blockly.Python.forBlock['network_wifi_connect'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".isconnected()\n"; 
}

Blockly.Python.forBlock['network_get_connect'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    var code=""+varName+".ifconfig()["+mode+"]";
    return [code, Blockly.Python.ORDER_ATOMIC]
}

Blockly.Python.forBlock['network_stop'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".disconnect()\n";
}

Blockly.Python.forBlock['network_open'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code=""+varName+".active("+op+")\n";
    return code;
}

Blockly.Python.forBlock['network_is_active'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code=""+varName+".active()";
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['network_wifi_connect'] = function(){
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ''+varName+'.isconnected()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['network_get_wifi'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code=""+varName+".config('"+op+"')";
    return [code, Blockly.Python.ORDER_ATOMIC]
}

Blockly.Python.forBlock['network_ap_connect'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    // Blockly.Python.setups_['class_wlan'] ='ap = network.WLAN(network.AP_IF)\n'+'ap.active(True)\n';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var essid = Blockly.Python.valueToCode(this, 'essid', Blockly.Python.ORDER_ATOMIC);
    var channel = Blockly.Python.valueToCode(this, 'channel', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".config(essid = "+essid+", channel = "+channel+")\n";
}

Blockly.Python.forBlock['network_scan'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);    
    var code=""+varName+".scan()";    
    return [code, Blockly.Python.ORDER_ATOMIC];       
 
}

Blockly.Python.forBlock['network_server'] = function() {
    Blockly.Python.definitions_['import_server_*'] = 'from server import *';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    // Blockly.Python.setups_['class_wlan'] ='SSID="ying"\n'+'PASSWORD="201411132040"\n';
    return 'if not '+varName+'.isconnected():\n'
    +'    connectWifi(SSID, PASSWORD)\n'
    +'ip='+varName+'.ifconfig()[0]\n'
    +'print(ip)\n'
    +'time.sleep(1)\n'
    +'DATA=listenData()\n'   
};

Blockly.Python.forBlock['network_socket_init'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    if (mode=='UDP'){
      mode = 'socket.SOCK_DGRAM'
    }
    else if (mode=='TCP'){
      mode = 'socket.SOCK_STREAM'
    }
    return ""+varName+" = socket.socket(socket.AF_INET,"+mode+")\n";
}

Blockly.Python.forBlock['network_socket_bind'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".bind("+address+")\n";
}

Blockly.Python.forBlock['network_socket_connect'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".connect(socket.getaddrinfo"+address+"[0][-1])\n";
}

Blockly.Python.forBlock['network_socket_listen'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var queue = Blockly.Python.valueToCode(this, 'queue', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".listen("+queue+")\n";
}

Blockly.Python.forBlock['network_socket_accept'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+varName+".accept()";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.forBlock['network_socket_receive'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".recv("+size+")";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.forBlock['network_socket_send'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var content = Blockly.Python.valueToCode(this, 'content', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".send("+content+")\n";
    return code;
}

Blockly.Python.forBlock['network_socket_receive_from'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".recvfrom("+size+")";
    return [code, Blockly.Python.ORDER_ASSIGNMENT];
}

Blockly.Python.forBlock['network_socket_send_to'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var content = Blockly.Python.valueToCode(this, 'content', Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var code =  ""+varName+".sendto("+content+","+address+")\n";
    return code;
}

Blockly.Python.forBlock['network_socket_close'] = function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.definitions_['import_socket'] = "import socket";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+varName+".close()\n";
    return code;
}

Blockly.Python.forBlock['requests_get'] = function() {
  Blockly.Python.definitions_.import_requests = "import requests";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var str =Blockly.Python.valueToCode(this, 'DOMAIN', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+'= '+ 'requests.get(' + str + ')\n';

  return code;
 
};


Blockly.Python.forBlock['requests_attribute'] = function() {
  Blockly.Python.definitions_.import_requests = "import requests";
  var varName = Blockly.Python.valueToCode(this, 'VAL', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var attr = this.getFieldValue('ATTR');
  var code=varName+"." + attr;
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['requests_method'] = function() {
  Blockly.Python.definitions_.import_requests = "import requests";    
    var method = this.getFieldValue('DIR');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code="requests." + method + "(" +  str  + ')\n';
  return code;
};

Blockly.Python.forBlock['ntptime_time'] = function() {
    Blockly.Python.definitions_['import_ntptime'] = "import ntptime";
    var str =Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC) ;
    var code= "ntptime.time(host="+str+")";
    return [code,Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['ntptime_address'] = function () {
    var code = "'"+this.getFieldValue('op')+"'";
    return [code, Blockly.Python.ORDER_ATOMIC];
};