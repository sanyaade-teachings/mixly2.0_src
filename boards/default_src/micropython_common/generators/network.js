import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const network_init = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    return "" + varName + " = network.WLAN(network." + mode + "_IF);\n";
}

// export const network_connect = function() {
//     Python.definitions_['import_network'] = "import network";
//     // Python.setups_['class_wlan'] ='wlan.active(True)\n';
//     var varName =Python.valueToCode(this, 'VAR',Python.ORDER_ATOMIC);
//     var id = Python.valueToCode(this, 'id', Python.ORDER_ATOMIC);
//     var password = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
//     return "if not "+varName+".isconnected():\n"+
//            "  "+varName+".connect("+id+","+password+")\n"+
//            "  while not "+varName+".isconnected():\n"+
//            "    pass\n";
// }

export const network_connect = function () {
    Python.definitions_['import_network'] = "import network";
    // Python.setups_['class_wlan'] ='wlan.active(True)\n';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var id = Python.valueToCode(this, 'id', Python.ORDER_ATOMIC);
    var password = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
    return "" + varName + ".connect(" + id + "," + password + ")\n"
}

export const network_wifi_connect = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return "" + varName + ".isconnected()\n";
}

export const network_get_connect = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = "" + varName + ".ifconfig()[" + mode + "]";
    return [code, Python.ORDER_ATOMIC]
}

export const network_stop = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return "" + varName + ".disconnect()\n";
}

export const network_open = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + varName + ".active(" + op + ")\n";
    return code;
}

export const network_is_active = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + varName + ".active()";
    return [code, Python.ORDER_ATOMIC];
}

export const network_get_wifi = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + varName + ".config('" + op + "')";
    return [code, Python.ORDER_ATOMIC]
}

export const network_ap_connect = function () {
    Python.definitions_['import_network'] = "import network";
    // Python.setups_['class_wlan'] ='ap = network.WLAN(network.AP_IF)\n'+'ap.active(True)\n';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var essid = Python.valueToCode(this, 'essid', Python.ORDER_ATOMIC);
    var channel = Python.valueToCode(this, 'channel', Python.ORDER_ATOMIC);
    return "" + varName + ".config(essid = " + essid + ", channel = " + channel + ")\n";
}

export const network_scan = function () {
    Python.definitions_['import_network'] = "import network";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + varName + ".scan()";
    return [code, Python.ORDER_ATOMIC];

}

export const network_server = function () {
    Python.definitions_['import_server_*'] = 'from server import *';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    // Python.setups_['class_wlan'] ='SSID="ying"\n'+'PASSWORD="201411132040"\n';
    return 'if not ' + varName + '.isconnected():\n'
        + '    connectWifi(SSID, PASSWORD)\n'
        + 'ip=' + varName + '.ifconfig()[0]\n'
        + 'print(ip)\n'
        + 'time.sleep(1)\n'
        + 'DATA=listenData()\n'
};

export const network_socket_init = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    if (mode == 'UDP') {
        mode = 'socket.SOCK_DGRAM'
    }
    else if (mode == 'TCP') {
        mode = 'socket.SOCK_STREAM'
    }
    return "" + varName + " = socket.socket(socket.AF_INET," + mode + ")\n";
}

export const network_socket_bind = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    return "" + varName + ".bind(" + address + ")\n";
}

export const network_socket_connect = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    return "" + varName + ".connect(socket.getaddrinfo" + address + "[0][-1])\n";
}

export const network_socket_listen = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var queue = Python.valueToCode(this, 'queue', Python.ORDER_ATOMIC);
    return "" + varName + ".listen(" + queue + ")\n";
}

export const network_socket_accept = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + varName + ".accept()";
    return [code, Python.ORDER_ASSIGNMENT];
}

export const network_socket_receive = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var code = "" + varName + ".recv(" + size + ")";
    return [code, Python.ORDER_ASSIGNMENT];
}

export const network_socket_send = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var content = Python.valueToCode(this, 'content', Python.ORDER_ATOMIC);
    var code = "" + varName + ".send(" + content + ")\n";
    return code;
}

export const network_socket_receive_from = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var code = "" + varName + ".recvfrom(" + size + ")";
    return [code, Python.ORDER_ASSIGNMENT];
}

export const network_socket_send_to = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var content = Python.valueToCode(this, 'content', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    var code = "" + varName + ".sendto(" + content + "," + address + ")\n";
    return code;
}

export const network_socket_close = function () {
    Python.definitions_['import_network'] = "import network";
    Python.definitions_['import_socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + varName + ".close()\n";
    return code;
}

export const requests_get = function () {
    Python.definitions_.import_requests = "import requests";
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var str = Python.valueToCode(this, 'DOMAIN', Python.ORDER_ATOMIC);
    var code = varName + '= ' + 'requests.get(' + str + ')\n';

    return code;
};


export const requests_attribute = function () {
    Python.definitions_.import_requests = "import requests";
    var varName = Python.valueToCode(this, 'VAL', Python.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, Python.ORDER_ATOMIC];
};


export const requests_method = function () {
    Python.definitions_.import_requests = "import requests";
    var method = this.getFieldValue('DIR');
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "requests." + method + "(" + str + ')\n';
    return code;
};

export const ntptime_time = function () {
    Python.definitions_['import_ntptime'] = "import ntptime";
    var str = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = "ntptime.time(host=" + str + ")";
    return [code, Python.ORDER_ATOMIC];
}

export const ntptime_address = function () {
    var code = "'" + this.getFieldValue('op') + "'";
    return [code, Python.ORDER_ATOMIC];
};