import Python from '../../python/python_generator';

export const network_init = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var TX = Python.valueToCode(this, 'TX', Python.ORDER_ATOMIC);
    var RX = Python.valueToCode(this, 'RX', Python.ORDER_ATOMIC);
    return "ESP_AT = net_espat.wifi_init(" + RX + "," + TX + ")\n";
}

export const network_scan = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var code = "net_espat.scans(ESP_AT)";
    return [code, Python.ORDER_ATOMIC];
}

export const network_connect = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var account = Python.valueToCode(this, 'account', Python.ORDER_ATOMIC);
    var passwor = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
    var code = "ESP_AT.connect(" + account + "," + passwor + ")\n";
    return code;
};

export const network_ifconfig = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var mode = this.getFieldValue('mode');
    if (mode == "1")
        var code = "ESP_AT.ifconfig()";
    if (mode == "2")
        var code = "ESP_AT.isconnected()";
    return [code, Python.ORDER_ATOMIC];
}

export const network_disconnect = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var code = "ESP_AT.disconnect()\n";
    return code;
}

export const network_enable_ap = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var account = Python.valueToCode(this, 'account', Python.ORDER_ATOMIC);
    var passwor = Python.valueToCode(this, 'password', Python.ORDER_ATOMIC);
    var chl = Python.valueToCode(this, 'chl', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = "ESP_AT.enable_ap(" + account + "," + passwor + "," + chl + "," + varName + "." + mode + ")\n";
    return code;
};

export const network_disable_ap = function () {
    Python.definitions_['import net_espat'] = "import net_espat";
    var code = "ESP_AT.disable_ap()\n";
    return code;
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

//ok
export const network_socket_init = function () {
    Python.definitions_['import socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return "" + varName + " = socket.socket()\n";
}
//ok
export const network_socket_getaddrinfo = function () {
    Python.definitions_['import socket'] = "import socket";
    var addr = Python.valueToCode(this, 'addr', Python.ORDER_ATOMIC);
    var code = "socket.getaddrinfo(" + addr + ",80)[0][-1]";
    return [code, Python.ORDER_ATOMIC];
}

//ok
export const network_socket_connect = function () {
    Python.definitions_['import socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC);
    return "" + varName + ".connect(" + address + ")\n";
}

//ok
export const network_socket_settimeout = function () {
    Python.definitions_['import socket'] = "import socket";
    var time = Python.valueToCode(this, 'time', Python.ORDER_ATOMIC);
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    return "" + varName + ".settimeout(" + time + ")\n";
}


export const network_socket_receive = function () {
    Python.definitions_['import socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var code = "" + varName + ".recv(" + size + ")";
    return [code, Python.ORDER_ATOMIC];
}

export const network_socket_send = function () {
    Python.definitions_['import socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var content = Python.valueToCode(this, 'content', Python.ORDER_ATOMIC);
    var code = "" + varName + ".send(" + content + ")\n";
    return code;
}


export const network_socket_close = function () {
    Python.definitions_['import socket'] = "import socket";
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "" + varName + ".close()\n";
    return code;
}