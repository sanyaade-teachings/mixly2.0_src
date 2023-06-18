'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');

goog.require('Mixly.JSFuncs');

Blockly.Arduino.forBlock['ethernet_init_begin'] = function () {
    var Ethernet = this.getFieldValue('Ethernet');
    Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
    Blockly.Arduino.definitions_['include_' + Ethernet] = '#include <' + Ethernet + '.h>';
    Blockly.Arduino.definitions_['var_declare_EthernetClient'] = 'EthernetClient client;';
    var mac = Blockly.Arduino.valueToCode(this, 'MAC', Blockly.Arduino.ORDER_ATOMIC);
    var code = "Ethernet.begin(" + mac + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_mac_address'] = function () {
    var VAR1 = this.getFieldValue('VAR1');
    var VAR2 = this.getFieldValue('VAR2');
    var VAR3 = this.getFieldValue('VAR3');
    var VAR4 = this.getFieldValue('VAR4');
    var VAR5 = this.getFieldValue('VAR5');
    var VAR6 = this.getFieldValue('VAR6');
    Blockly.Arduino.definitions_['var_declare_byte_mac'] = 'byte mac[] = {0x' + VAR1 + ', 0x' + VAR2 + ', 0x' + VAR3 + ', 0x' + VAR4 + ', 0x' + VAR5 + ', 0x' + VAR6 + '};';
    var code = "mac";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_init_local_ip'] = function () {
    var code = "Ethernet.localIP()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_client_connect_server'] = function () {
    var PORT = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC);
    var SERVER = Blockly.Arduino.quote_(this.getFieldValue('SERVER'));
    var code = 'client.connect(' + SERVER + ',' + PORT + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_client_stop'] = function () {
    var code = "client.stop();\n";
    return code;
};
Blockly.Arduino.forBlock['ethernet_client_connected'] = function () {
    var code = "client.connected()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.forBlock['ethernet_client_available'] = function () {
    var code = "client.available()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_client_print'] = function () {
    var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    var code = 'client.print(' + TEXT + ');\n';
    return code;
};
Blockly.Arduino.forBlock['ethernet_client_println'] = function () {
    var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    var code = 'client.println(' + TEXT + ');\n';
    return code;
};
Blockly.Arduino.forBlock['ethernet_client_read'] = function () {
    var code = "(char)client.read()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['ethernet_client_get_request'] = function () {
    var URL = this.getFieldValue('URL');
    var SERVER = this.getFieldValue('SERVER');
    var code = 'client.println("GET ' + URL + ' HTTP/1.1");\n'
        + 'client.println(F("Host: ' + SERVER + '"));\n'
        + 'client.println(F("Connection: close"));\n'
        + 'client.println();\n';
    return code;
};

Blockly.Arduino.forBlock['WIFI_info'] = function () {
    var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
    var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin(' + SSID + ', ' + PWD + ');\n'
        + '  while (WiFi.status() != WL_CONNECTED) {\n'
        + '    delay(500);\n'
        + '    Serial.print(".");\n'
        + '  }\n'
        + '  Serial.println("Local IP:");\n'
        + '  Serial.print(WiFi.localIP());\n'
    return "";
};

Blockly.Arduino.forBlock['network_wifi_connect'] = function () {
    return ["WiFi.status()", Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.forBlock['network_get_connect'] = function () {
    var board_type = Mixly.JSFuncs.getPlatform();
    var mode = this.getFieldValue('mode');
    if (board_type.match(RegExp(/ESP8266/))) {
        Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    }
    else if (board_type.match(RegExp(/ESP32/))) {
        Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    }
    if (mode == 'IP') {
        return ["WiFi.localIP()", Blockly.Arduino.ORDER_ATOMIC];
    }
    else
        return ["WiFi.macAddress()", Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.forBlock['NTP_server'] = function () {
    var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
    var timeZone = Blockly.Arduino.valueToCode(this, 'timeZone', Blockly.Arduino.ORDER_ATOMIC);
    var Interval = Blockly.Arduino.valueToCode(this, 'Interval', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_TimeLib'] = '#include <TimeLib.h>';
    Blockly.Arduino.definitions_['include_NtpClientLib'] = '#include <NtpClientLib.h>';
    Blockly.Arduino.definitions_['var_declare_timeZone'] = 'int8_t timeZone = ' + timeZone + ';';
    Blockly.Arduino.definitions_['var_declare_ntpServer'] = 'const PROGMEM char *ntpServer = ' + server_add + ';';
    Blockly.Arduino.setups_['setup_NTP.setInterval'] = 'NTP.setInterval (' + Interval + ');';
    Blockly.Arduino.setups_['setup_NTP.setNTPTimeout'] = 'NTP.setNTPTimeout (1500);';
    Blockly.Arduino.setups_['setup_NTP.begin'] = 'NTP.begin (ntpServer, timeZone, false);';
    return "";
};
Blockly.Arduino.forBlock['NTP_server_get_time'] = function () {
    var timeType = this.getFieldValue('TIME_TYPE');
    var code = timeType;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
var Client_ID;
Blockly.Arduino.forBlock['MQTT_server'] = function () {
    var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
    var server_port = Blockly.Arduino.valueToCode(this, 'server_port', Blockly.Arduino.ORDER_ATOMIC);
    var IOT_ID = Blockly.Arduino.valueToCode(this, 'IOT_ID', Blockly.Arduino.ORDER_ATOMIC);
    var IOT_PWD = Blockly.Arduino.valueToCode(this, 'IOT_PWD', Blockly.Arduino.ORDER_ATOMIC);
    Client_ID = Blockly.Arduino.valueToCode(this, 'Client_ID', Blockly.Arduino.ORDER_ATOMIC);
    if (Client_ID.length > 2) {
        Client_ID += '/';
    }
    Client_ID = Client_ID.replace(/\"/g, "");
    Blockly.Arduino.definitions_['include_Adafruit_MQTT'] = '#include "Adafruit_MQTT.h"';
    Blockly.Arduino.definitions_['include_Adafruit_MQTT_Client'] = '#include "Adafruit_MQTT_Client.h"';
    Blockly.Arduino.definitions_['include__WiFiClient'] = 'WiFiClient client;';
    Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Client'] = 'Adafruit_MQTT_Client mqtt(&client, ' + server_add + ', ' + server_port + ', ' + IOT_ID + ', ' + IOT_PWD + ');';
    var board_type = Mixly.JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/))) {
        Blockly.Arduino.definitions_['var_declare_ MQTT_connect();'] = 'void MQTT_connect();';
    }
    var funcName = 'MQTT_connect';
    var code = 'void' + ' ' + funcName + '() {\n'
        + '  int8_t ret;\n'
        + '  if (mqtt.connected()) {\n'
        + '    return;\n'
        + '  }\n'
        + '  Serial.print("Connecting to MQTT... ");\n'
        + '  uint8_t retries = 3;\n'
        + '  while ((ret = mqtt.connect()) != 0) {\n'
        + '    Serial.println(mqtt.connectErrorString(ret));\n'
        + '    Serial.println("Retrying MQTT connection in 5 seconds...");\n'
        + '    mqtt.disconnect();\n'
        + '    delay(5000);\n'
        + '    retries--;\n'
        + '    if (retries == 0) {\n'
        + '      while (1);\n'
        + '    }\n'
        + '  }\n'
        + '  Serial.println("MQTT Connected!");\n'
        + '}\n';
    Blockly.Arduino.definitions_['var_declare_' + funcName] = code;
    return funcName + '();\n';
};

Blockly.Arduino.forBlock['MQTT_connect'] = function () {
    var funcName = 'MQTT_connect';
    var code = 'void' + ' ' + funcName + '() {\n'
        + '  int8_t ret;\n'
        + '  if (mqtt.connected()) {\n'
        + '  return;\n'
        + '  }\n'
        + '  Serial.print("Connecting to MQTT... ");\n'
        + '  uint8_t retries = 3;\n'
        + '  while ((ret = mqtt.connect()) != 0) {\n'
        + '    Serial.println(mqtt.connectErrorString(ret));\n'
        + '    Serial.println("Retrying MQTT connection in 5 seconds...");\n'
        + '    mqtt.disconnect();\n'
        + '    delay(5000);\n'
        + '    retries--;\n'
        + '    if (retries == 0) {\n'
        + '      while (1);\n'
        + '    }\n'
        + '  }\n'
        + '  Serial.println("MQTT Connected!");\n'
        + '}\n';
    return funcName + '();\n';
}

//物联网-发送数据到app
Blockly.Arduino.forBlock['MQTT_publish'] = function () {
    var Topic = this.getFieldValue('Topic');
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
    var Topic_var = "MQTT_Topic_" + Topic;
    Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Publish' + Topic_var] = 'Adafruit_MQTT_Publish ' + Topic_var + ' = Adafruit_MQTT_Publish(&mqtt, "' + Client_ID + Topic + '");';
    var code = Topic_var + '.publish(' + data + ');\n ';
    return code;
};

Blockly.Arduino.forBlock['MQTT_subscribe_value'] = function () {
    var Topic = this.getFieldValue('Topic_0');
    if (Topic)
        Topic = Topic.replace(/\"/g, "");
    var Topic_var = "MQTT_Topic_" + Topic;
    var code = '(char *)' + Topic_var + '.lastread';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['MQTT_subscribe'] = function () {
    var n = 0;
    var Topic = this.getFieldValue('Topic_0');
    if (Topic)
        Topic = Topic.replace(/\"/g, "");
    var Topic_var = "MQTT_Topic_" + Topic;
    var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    var code = 'if (subscription ==&' + Topic_var + ') {\n  ' + branch.replace(new RegExp(/\n/g), "\n  ") + '\n  }';
    Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe' + Client_ID + '/' + Topic] = 'Adafruit_MQTT_Subscribe ' + Topic_var + ' = Adafruit_MQTT_Subscribe(&mqtt,"' + Client_ID + Topic + '");';
    Blockly.Arduino.setups_['setup_mqtt.subscribe' + Topic] = 'mqtt.subscribe(&' + Topic_var + ');';
    for (n = 1; n <= this.elseifCount_; n++) {
        var Topic = this.getFieldValue('Topic_' + n);
        if (Topic)
            Topic = Topic.replace(/\"/g, "");
        Topic_var = "MQTT_Topic_" + Topic;
        branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
        Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe' + Client_ID + Topic] = 'Adafruit_MQTT_Subscribe ' + Topic_var + ' = Adafruit_MQTT_Subscribe(&mqtt,"' + Client_ID + Topic + '");';
        Blockly.Arduino.setups_['setup_mqtt.subscribe' + Topic] = 'mqtt.subscribe(&' + Topic_var + ');';
        code += ' else if (subscription == &' + Topic_var + ') {\n  ' + branch.replace(new RegExp(/\n/g), "\n  ") + '\n  }';
    }
    if (this.elseCount_) {
        branch = Blockly.Arduino.statementToCode(this, 'ELSE');
        code += ' else {\n  ' + branch + '\n  }';
    }
    return 'Adafruit_MQTT_Subscribe *subscription;\nwhile ((subscription = mqtt.readSubscription(5000))) {\n  ' + code + '\n}\n';
};

//ESP8266 GET请求
Blockly.Arduino.forBlock['http_get'] = function () {
    var api = Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'success');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    Blockly.Arduino.definitions_['include_ESP8266HTTPClient'] = '#include <ESP8266HTTPClient.h>';
    var code = 'if (WiFi.status() == WL_CONNECTED) {\nHTTPClient http;\nhttp.begin(' + api + ');\nint httpCode = http.GET();\nif (httpCode > 0) {\nString Request_result = http.getString();\n' + branch + '\n}\nelse {\n' + branch1 + '\n} \nhttp.end();\n}\n';
    return code;
};

Blockly.Arduino.forBlock['WIFI_smartConfig'] = function () {
    var MODE = this.getFieldValue('MODE');
    // var board_type = Mixly.JSFuncs.getPlatform();
    var board_type = "ESP8266";
    if (MODE == 'SmartConfig') {
        Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
        Blockly.Arduino.definitions_['include_ESP8266WiFiMulti'] = '#include <ESP8266WiFiMulti.h>';
        Blockly.Arduino.definitions_['var_declare_ESP8266WiFiMulti'] = ' ESP8266WiFiMulti wifiMulti;';
        Blockly.Arduino.setups_['setup_WiFi_Smartconfig'] = 'Serial.println("Wait for Smartconfig");\n'
            + 'wifiMulti.run();\n'
            + 'WiFi.setAutoConnect(true);\n'
            + 'if (WiFi.status() == WL_CONNECTED) {\n'
            + 'Serial.println("WiFi connected");\n'
            + 'Serial.println("IP address: ");\n'
            + 'Serial.println(WiFi.localIP());\n'
            + ' }\n'
            + 'else{\n'
            + ' WiFi.mode(WIFI_STA);\n'
            + ' WiFi.beginSmartConfig();\n'
            + ' while(!WiFi.smartConfigDone()){\n'
            + 'Serial.print(".");\n'
            + 'delay(500);\n'
            + '}\n'
            + 'Serial.println("SmartConfig Success");\n'
            + 'Serial.printf("SSID:%s", WiFi.SSID().c_str());\n'
            + 'Serial.printf("PSW:%s", WiFi.psk().c_str());\n'
            + 'wifiMulti.addAP(WiFi.SSID().c_str(),WiFi.psk().c_str());\n'

            + '}\n'
        return "";
    }
    else {
        Blockly.Arduino.definitions_['include_WiFiManager'] = '#include <WiFiManager.h>';
        Blockly.Arduino.definitions_['var_declare_WiFiServer'] = 'WiFiServer server(80);';
        Blockly.Arduino.setups_['setup_WiFi_mode'] = 'WiFi.mode(WIFI_STA);';
        Blockly.Arduino.setups_['setup_WiFiManager'] = 'WiFiManager wm;';
        Blockly.Arduino.setups_['setup_bool_res'] = 'bool res;';
        Blockly.Arduino.setups_['setup_wifiManagerautoConnect'] = 'res=wm.autoConnect();';
        return "";
    }
};

Blockly.Arduino.forBlock['WIFI_ap_or_sta'] = function () {
    var dropdown_mode = this.getFieldValue('mode');
    var value_SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
    var value_PSK = Blockly.Arduino.valueToCode(this, 'PSK', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP1 = Blockly.Arduino.valueToCode(this, 'IP1', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP2 = Blockly.Arduino.valueToCode(this, 'IP2', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC);
    var value_duankou = Blockly.Arduino.valueToCode(this, 'duankou', Blockly.Arduino.ORDER_ATOMIC);
    value_IP1 = value_IP1.replace(new RegExp(/\./g), ",");
    value_IP2 = value_IP2.replace(new RegExp(/\./g), ",");
    value_IP = value_IP.replace(new RegExp(/\./g), ",");
    var board_type = Mixly.JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/)) != null)
        Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    else
        Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    if (dropdown_mode == 'STA') {
        Blockly.Arduino.definitions_['include_WiFiUdp'] = '#include <WiFiUdp.h>';
        Blockly.Arduino.definitions_['define_STASSID'] = '#define STASSID ' + value_SSID + '';
        Blockly.Arduino.definitions_['define_STAPSK'] = '#define STAPSK ' + value_PSK + '';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1(' + value_IP1 + ');';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2(' + value_IP2 + ');';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip(' + value_IP + ');';
        Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = ' + value_duankou + ';';
        Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = ' + value_duankou + ';';
        Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
        Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
        Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
        Blockly.Arduino.setups_['setup_wifi_sta'] = 'WiFi.mode(WIFI_STA);\n'
            + '  WiFi.begin(STASSID, STAPSK);\n'
            + '  while(WiFi.status() != WL_CONNECTED){\n'
            + '    Serial.print(".");\n'
            + '    delay(500);\n'
            + '  }\n'
            + '  delay(500);\n'
            + '  Serial.print("Connected! IP address: ");\n'
            + '  Serial.println(WiFi.localIP());\n'
            + '  Serial.printf("UDP server on port  ", localPort);\n'
            + '  Udp.begin(localPort);';
    }
    else {
        Blockly.Arduino.definitions_['include_WiFiUDP'] = '#include <WiFiUDP.h>';
        Blockly.Arduino.definitions_['var_declare_AP_NameChar'] = 'const char AP_NameChar[] = ' + value_SSID + ';';
        Blockly.Arduino.definitions_['var_declare_WiFiAPPSK'] = 'const char WiFiAPPSK[] = ' + value_PSK + ';';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1(' + value_IP1 + ');';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2(' + value_IP2 + ');';
        Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip(' + value_IP + ');';
        Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = ' + value_duankou + ';';
        Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = ' + value_duankou + ';';
        Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
        Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
        Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
        Blockly.Arduino.setups_['setup_wifi_ap'] = 'WiFi.mode(WIFI_AP);\n'
            + '  WiFi.softAP(AP_NameChar, WiFiAPPSK);\n'
            + '  Udp.begin(localPort);\n'
            + '  Serial.println();\n'
            + '  Serial.println("Started ap. Local ip: " + WiFi.localIP().toString());';
    }
    var code = '';
    return code;
};

Blockly.Arduino.forBlock['WIFI_ap_and_sta'] = function () {
    var value_SSID1 = Blockly.Arduino.valueToCode(this, 'SSID1', Blockly.Arduino.ORDER_ATOMIC);
    var value_SSID2 = Blockly.Arduino.valueToCode(this, 'SSID2', Blockly.Arduino.ORDER_ATOMIC);
    var value_PSK1 = Blockly.Arduino.valueToCode(this, 'PSK1', Blockly.Arduino.ORDER_ATOMIC);
    var value_PSK2 = Blockly.Arduino.valueToCode(this, 'PSK2', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP1 = Blockly.Arduino.valueToCode(this, 'IP1', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP2 = Blockly.Arduino.valueToCode(this, 'IP2', Blockly.Arduino.ORDER_ATOMIC);
    var value_IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC);
    var value_duankou = Blockly.Arduino.valueToCode(this, 'duankou', Blockly.Arduino.ORDER_ATOMIC);
    value_IP1 = value_IP1.replace(new RegExp(/\./g), ",");
    value_IP2 = value_IP2.replace(new RegExp(/\./g), ",");
    value_IP = value_IP.replace(new RegExp(/\./g), ",");
    Blockly.Arduino.definitions_['define_STASSID'] = '#define STASSID ' + value_SSID1;
    Blockly.Arduino.definitions_['define_STAPSK'] = '#define STAPSK ' + value_PSK1;
    var board_type = Mixly.JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/)) != null)
        Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    else
        Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.definitions_['include_WiFiUDP'] = '#include <WiFiUDP.h>';
    Blockly.Arduino.definitions_['var_declare_AP_NameChar'] = 'const char AP_NameChar[] = ' + value_SSID2 + ';';
    Blockly.Arduino.definitions_['var_declare_WiFiAPPSK'] = 'const char WiFiAPPSK[] = ' + value_PSK2 + ';';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1(' + value_IP1 + ');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2(' + value_IP2 + ');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip(' + value_IP + ');';
    Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = ' + value_duankou + ';';
    Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = ' + value_duankou + ';';
    Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
    Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
    Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    Blockly.Arduino.setups_['setup_wifi_ap_and_sta'] = 'WiFi.mode(WIFI_AP_STA);\n'
        + '  WiFi.softAP(AP_NameChar, WiFiAPPSK);\n'
        + '  WiFi.begin(STASSID, STAPSK);\n'
        + '  Udp.begin(localPort);\n'
        + '  Serial.println();\n'
        + '  Serial.println("Started ap. Local ip: " + WiFi.localIP().toString());';
    var code = '';
    return code;
};

Blockly.Arduino.forBlock['WIFI_incomingPacket'] = function () {
    var value_input_data = Blockly.Arduino.valueToCode(this, 'input_data', Blockly.Arduino.ORDER_ATOMIC) || 'COM';
    var statements_do = Blockly.Arduino.statementToCode(this, 'do');
    statements_do = statements_do.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    var code = 'int packetSize = Udp.parsePacket();\n'
        + 'if (packetSize) {\n'
        + '  Serial.printf("Received %d bytes from %s, port %d\\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());\n'
        + '  int len = Udp.read(incomingPacket, 536);\n'
        + '  if (len > 0) {\n'
        + '    incomingPacket[len] = 0;\n'
        + '    Serial.printf("UDP packet contents: %s\\n", incomingPacket);\n'
        + '    String ' + value_input_data + ' = incomingPacket;\n'
        + (statements_do != '' ? ('    ' + statements_do.replace(new RegExp(/\n/g), "\n  ") + '\n') : '')
        + '  }\n'
        + '}\n';
    return code;
};

Blockly.Arduino.forBlock['WIFI_send_data'] = function () {
    var value_data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'Udp.beginPacket(Udp.remoteIP(),Udp.remotePort());\n'
        + 'Udp.write(' + value_data + ');\n'
        + 'Udp.endPacket();\n';
    return code;
};

var WeatherCity = {
    "北京": "101010100",
    "海淀": "101010200",
    "朝阳": "101010300",
    "顺义": "101010400",
    "怀柔": "101010500",
    "通州": "101010600",
    "昌平": "101010700",
    "延庆": "101010800",
    "丰台": "101010900",
    "石景山": "101011000",
    "大兴": "101011100",
    "房山": "101011200",
    "密云": "101011300",
    "门头沟": "101011400",
    "平谷": "101011500",
    "八达岭": "101011600",
    "佛爷顶": "101011700",
    "汤河口": "101011800",
    "密云上甸子": "101011900",
    "斋堂": "101012000",
    "霞云岭": "101012100",
    "上海": "101020100",
    "闵行": "101020200",
    "宝山": "101020300",
    "川沙": "101020400",
    "嘉定": "101020500",
    "南汇": "101020600",
    "金山": "101020700",
    "青浦": "101020800",
    "松江": "101020900",
    "奉贤": "101021000",
    "崇明": "101021100",
    "陈家镇": "101021101",
    "引水船": "101021102",
    "徐家汇": "101021200",
    "浦东": "101021300",
    "天津": "101030100",
    "武清": "101030200",
    "宝坻": "101030300",
    "东丽": "101030400",
    "西青": "101030500",
    "北辰": "101030600",
    "宁河": "101030700",
    "汉沽": "101030800",
    "静海": "101030900",
    "津南": "101031000",
    "塘沽": "101031100",
    "大港": "101031200",
    "平台": "101031300",
    "蓟县": "101031400",
    "重庆": "101040100",
    "永川": "101040200",
    "合川": "101040300",
    "南川": "101040400",
    "江津": "101040500",
    "万盛": "101040600",
    "渝北": "101040700",
    "北碚": "101040800",
    "巴南": "101040900",
    "长寿": "101041000",
    "黔江": "101041100",
    "万州天城": "101041200",
    "万州龙宝": "101041300",
    "涪陵": "101041400",
    "开县": "101041500",
    "城口": "101041600",
    "云阳": "101041700",
    "巫溪": "101041800",
    "奉节": "101041900",
    "巫山": "101042000",
    "潼南": "101042100",
    "垫江": "101042200",
    "梁平": "101042300",
    "忠县": "101042400",
    "石柱": "101042500",
    "大足": "101042600",
    "荣昌": "101042700",
    "铜梁": "101042800",
    "璧山": "101042900",
    "丰都": "101043000",
    "武隆": "101043100",
    "彭水": "101043200",
    "綦江": "101043300",
    "酉阳": "101043400",
    "金佛山": "101043500",
    "秀山": "101043600",
    "沙坪坝": "101043700",
    "哈尔滨": "101050101",
    "双城": "101050102",
    "呼兰": "101050103",
    "阿城": "101050104",
    "宾县": "101050105",
    "依兰": "101050106",
    "巴彦": "101050107",
    "通河": "101050108",
    "方正": "101050109",
    "延寿": "101050110",
    "尚志": "101050111",
    "五常": "101050112",
    "木兰": "101050113",
    "齐齐哈尔": "101050201",
    "讷河": "101050202",
    "龙江": "101050203",
    "甘南": "101050204",
    "富裕": "101050205",
    "依安": "101050206",
    "拜泉": "101050207",
    "克山": "101050208",
    "克东": "101050209",
    "泰来": "101050210",
    "牡丹江": "101050301",
    "海林": "101050302",
    "穆棱": "101050303",
    "林口": "101050304",
    "绥芬河": "101050305",
    "宁安": "101050306",
    "东宁": "101050307",
    "佳木斯": "101050401",
    "汤原": "101050402",
    "抚远": "101050403",
    "桦川": "101050404",
    "桦南": "101050405",
    "同江": "101050406",
    "富锦": "101050407",
    "绥化": "101050501",
    "肇东": "101050502",
    "安达": "101050503",
    "海伦": "101050504",
    "明水": "101050505",
    "望奎": "101050506",
    "兰西": "101050507",
    "青冈": "101050508",
    "庆安": "101050509",
    "绥棱": "101050510",
    "黑河": "101050601",
    "嫩江": "101050602",
    "孙吴": "101050603",
    "逊克": "101050604",
    "五大连池": "101050605",
    "北安": "101050606",
    "大兴安岭": "101050701",
    "塔河": "101050702",
    "漠河": "101050703",
    "呼玛": "101050704",
    "呼中": "101050705",
    "新林": "101050706",
    "阿木尔": "101050707",
    "加格达奇": "101050708",
    "伊春": "101050801",
    "乌伊岭": "101050802",
    "五营": "101050803",
    "铁力": "101050804",
    "嘉荫": "101050805",
    "大庆": "101050901",
    "林甸": "101050902",
    "肇州": "101050903",
    "肇源": "101050904",
    "杜蒙": "101050905",
    "七台河": "101051002",
    "勃利": "101051003",
    "鸡西": "101051101",
    "虎林": "101051102",
    "密山": "101051103",
    "鸡东": "101051104",
    "鹤岗": "101051201",
    "绥滨": "101051202",
    "萝北": "101051203",
    "双鸭山": "101051301",
    "集贤": "101051302",
    "宝清": "101051303",
    "饶河": "101051304",
    "长春": "101060101",
    "农安": "101060102",
    "德惠": "101060103",
    "九台": "101060104",
    "榆树": "101060105",
    "双阳": "101060106",
    "吉林": "101060201",
    "舒兰": "101060202",
    "永吉": "101060203",
    "蛟河": "101060204",
    "磐石": "101060205",
    "桦甸": "101060206",
    "烟筒山": "101060207",
    "延吉": "101060301",
    "敦化": "101060302",
    "安图": "101060303",
    "汪清": "101060304",
    "和龙": "101060305",
    "天池": "101060306",
    "龙井": "101060307",
    "珲春": "101060308",
    "图们": "101060309",
    "松江": "101060310",
    "罗子沟": "101060311",
    "延边": "101060312",
    "四平": "101060401",
    "双辽": "101060402",
    "梨树": "101060403",
    "公主岭": "101060404",
    "伊通": "101060405",
    "孤家子": "101060406",
    "通化": "101060501",
    "梅河口": "101060502",
    "柳河": "101060503",
    "辉南": "101060504",
    "集安": "101060505",
    "通化县": "101060506",
    "白城": "101060601",
    "洮南": "101060602",
    "大安": "101060603",
    "镇赉": "101060604",
    "通榆": "101060605",
    "辽源": "101060701",
    "东丰": "101060702",
    "松原": "101060801",
    "乾安": "101060802",
    "前郭": "101060803",
    "长岭": "101060804",
    "扶余": "101060805",
    "白山": "101060901",
    "靖宇": "101060902",
    "临江": "101060903",
    "东岗": "101060904",
    "长白": "101060905",
    "沈阳": "101070101",
    "苏家屯": "101070102",
    "辽中": "101070103",
    "康平": "101070104",
    "法库": "101070105",
    "新民": "101070106",
    "于洪": "101070107",
    "新城子": "101070108",
    "大连": "101070201",
    "瓦房店": "101070202",
    "金州": "101070203",
    "普兰店": "101070204",
    "旅顺": "101070205",
    "长海": "101070206",
    "庄河": "101070207",
    "皮口": "101070208",
    "海洋岛": "101070209",
    "鞍山": "101070301",
    "台安": "101070302",
    "岫岩": "101070303",
    "海城": "101070304",
    "抚顺": "101070401",
    "清原": "101070403",
    "章党": "101070404",
    "本溪": "101070501",
    "本溪县": "101070502",
    "草河口": "101070503",
    "桓仁": "101070504",
    "丹东": "101070601",
    "凤城": "101070602",
    "宽甸": "101070603",
    "东港": "101070604",
    "东沟": "101070605",
    "锦州": "101070701",
    "凌海": "101070702",
    "北宁": "101070703",
    "义县": "101070704",
    "黑山": "101070705",
    "北镇": "101070706",
    "营口": "101070801",
    "大石桥": "101070802",
    "盖州": "101070803",
    "阜新": "101070901",
    "彰武": "101070902",
    "辽阳": "101071001",
    "辽阳县": "101071002",
    "灯塔": "101071003",
    "铁岭": "101071101",
    "开原": "101071102",
    "昌图": "101071103",
    "西丰": "101071104",
    "朝阳": "101071201",
    "建平": "101071202",
    "凌源": "101071203",
    "喀左": "101071204",
    "北票": "101071205",
    "羊山": "101071206",
    "建平县": "101071207",
    "盘锦": "101071301",
    "大洼": "101071302",
    "盘山": "101071303",
    "葫芦岛": "101071401",
    "建昌": "101071402",
    "绥中": "101071403",
    "兴城": "101071404",
    "呼和浩特": "101080101",
    "土默特左旗": "101080102",
    "托克托": "101080103",
    "和林格尔": "101080104",
    "清水河": "101080105",
    "呼和浩特市郊区": "101080106",
    "武川": "101080107",
    "包头": "101080201",
    "白云鄂博": "101080202",
    "满都拉": "101080203",
    "土默特右旗": "101080204",
    "固阳": "101080205",
    "达尔罕茂明安联合旗": "101080206",
    "石拐": "101080207",
    "乌海": "101080301",
    "集宁": "101080401",
    "卓资": "101080402",
    "化德": "101080403",
    "商都": "101080404",
    "希拉穆仁": "101080405",
    "兴和": "101080406",
    "凉城": "101080407",
    "察哈尔右翼前旗": "101080408",
    "察哈尔右翼中旗": "101080409",
    "察哈尔右翼后旗": "101080410",
    "四子王旗": "101080411",
    "丰镇": "101080412",
    "通辽": "101080501",
    "舍伯吐": "101080502",
    "科尔沁左翼中旗": "101080503",
    "科尔沁左翼后旗": "101080504",
    "青龙山": "101080505",
    "开鲁": "101080506",
    "库伦旗": "101080507",
    "奈曼旗": "101080508",
    "扎鲁特旗": "101080509",
    "高力板": "101080510",
    "巴雅尔吐胡硕": "101080511",
    "通辽钱家店": "101080512",
    "赤峰": "101080601",
    "赤峰郊区站": "101080602",
    "阿鲁科尔沁旗": "101080603",
    "浩尔吐": "101080604",
    "巴林左旗": "101080605",
    "巴林右旗": "101080606",
    "林西": "101080607",
    "克什克腾旗": "101080608",
    "翁牛特旗": "101080609",
    "岗子": "101080610",
    "喀喇沁旗": "101080611",
    "八里罕": "101080612",
    "宁城": "101080613",
    "敖汉旗": "101080614",
    "宝过图": "101080615",
    "鄂尔多斯": "101080701",
    "达拉特旗": "101080703",
    "准格尔旗": "101080704",
    "鄂托克前旗": "101080705",
    "河南": "101080706",
    "伊克乌素": "101080707",
    "鄂托克旗": "101080708",
    "杭锦旗": "101080709",
    "乌审旗": "101080710",
    "伊金霍洛旗": "101080711",
    "乌审召": "101080712",
    "东胜": "101080713",
    "临河": "101080801",
    "五原": "101080802",
    "磴口": "101080803",
    "乌拉特前旗": "101080804",
    "大佘太": "101080805",
    "乌拉特中旗": "101080806",
    "乌拉特后旗": "101080807",
    "海力素": "101080808",
    "那仁宝力格": "101080809",
    "杭锦后旗": "101080810",
    "巴盟农试站": "101080811",
    "锡林浩特": "101080901",
    "朝克乌拉": "101080902",
    "二连浩特": "101080903",
    "阿巴嘎旗": "101080904",
    "伊和郭勒": "101080905",
    "苏尼特左旗": "101080906",
    "苏尼特右旗": "101080907",
    "朱日和": "101080908",
    "东乌珠穆沁旗": "101080909",
    "西乌珠穆沁旗": "101080910",
    "太仆寺旗": "101080911",
    "镶黄旗": "101080912",
    "正镶白旗": "101080913",
    "正兰旗": "101080914",
    "多伦": "101080915",
    "博克图": "101080916",
    "乌拉盖": "101080917",
    "白日乌拉": "101080918",
    "那日图": "101080919",
    "呼伦贝尔": "101081000",
    "海拉尔": "101081001",
    "小二沟": "101081002",
    "阿荣旗": "101081003",
    "莫力达瓦旗": "101081004",
    "鄂伦春旗": "101081005",
    "鄂温克旗": "101081006",
    "陈巴尔虎旗": "101081007",
    "新巴尔虎左旗": "101081008",
    "新巴尔虎右旗": "101081009",
    "满洲里": "101081010",
    "牙克石": "101081011",
    "扎兰屯": "101081012",
    "额尔古纳": "101081014",
    "根河": "101081015",
    "图里河": "101081016",
    "乌兰浩特": "101081101",
    "阿尔山": "101081102",
    "科尔沁右翼中旗": "101081103",
    "胡尔勒": "101081104",
    "扎赉特旗": "101081105",
    "索伦": "101081106",
    "突泉": "101081107",
    "霍林郭勒": "101081108",
    "阿拉善左旗": "101081201",
    "阿拉善右旗": "101081202",
    "额济纳旗": "101081203",
    "拐子湖": "101081204",
    "吉兰太": "101081205",
    "锡林高勒": "101081206",
    "头道湖": "101081207",
    "中泉子": "101081208",
    "巴彦诺尔贡": "101081209",
    "雅布赖": "101081210",
    "乌斯太": "101081211",
    "孪井滩": "101081212",
    "石家庄": "101090101",
    "井陉": "101090102",
    "正定": "101090103",
    "栾城": "101090104",
    "行唐": "101090105",
    "灵寿": "101090106",
    "高邑": "101090107",
    "深泽": "101090108",
    "赞皇": "101090109",
    "无极": "101090110",
    "平山": "101090111",
    "元氏": "101090112",
    "赵县": "101090113",
    "辛集": "101090114",
    "藁城": "101090115",
    "晋洲": "101090116",
    "新乐": "101090117",
    "保定": "101090201",
    "满城": "101090202",
    "阜平": "101090203",
    "徐水": "101090204",
    "唐县": "101090205",
    "高阳": "101090206",
    "容城": "101090207",
    "紫荆关": "101090208",
    "涞源": "101090209",
    "望都": "101090210",
    "安新": "101090211",
    "易县": "101090212",
    "涞水": "101090213",
    "曲阳": "101090214",
    "蠡县": "101090215",
    "顺平": "101090216",
    "雄县": "101090217",
    "涿州": "101090218",
    "定州": "101090219",
    "安国": "101090220",
    "高碑店": "101090221",
    "张家口": "101090301",
    "宣化": "101090302",
    "张北": "101090303",
    "康保": "101090304",
    "沽源": "101090305",
    "尚义": "101090306",
    "蔚县": "101090307",
    "阳原": "101090308",
    "怀安": "101090309",
    "万全": "101090310",
    "怀来": "101090311",
    "涿鹿": "101090312",
    "赤城": "101090313",
    "崇礼": "101090314",
    "承德": "101090402",
    "承德县": "101090403",
    "兴隆": "101090404",
    "平泉": "101090405",
    "滦平": "101090406",
    "隆化": "101090407",
    "丰宁": "101090408",
    "宽城": "101090409",
    "围场": "101090410",
    "塞罕坎": "101090411",
    "唐山": "101090501",
    "丰南": "101090502",
    "丰润": "101090503",
    "滦县": "101090504",
    "滦南": "101090505",
    "乐亭": "101090506",
    "迁西": "101090507",
    "玉田": "101090508",
    "唐海": "101090509",
    "遵化": "101090510",
    "迁安": "101090511",
    "廊坊": "101090601",
    "固安": "101090602",
    "永清": "101090603",
    "香河": "101090604",
    "大城": "101090605",
    "文安": "101090606",
    "大厂": "101090607",
    "霸州": "101090608",
    "三河": "101090609",
    "沧州": "101090701",
    "青县": "101090702",
    "东光": "101090703",
    "海兴": "101090704",
    "盐山": "101090705",
    "肃宁": "101090706",
    "南皮": "101090707",
    "吴桥": "101090708",
    "献县": "101090709",
    "孟村": "101090710",
    "泊头": "101090711",
    "任丘": "101090712",
    "黄骅": "101090713",
    "河间": "101090714",
    "曹妃甸": "101090715",
    "衡水": "101090801",
    "枣强": "101090802",
    "武邑": "101090803",
    "武强": "101090804",
    "饶阳": "101090805",
    "安平": "101090806",
    "故城": "101090807",
    "景县": "101090808",
    "阜城": "101090809",
    "冀州": "101090810",
    "深州": "101090811",
    "邢台": "101090901",
    "临城": "101090902",
    "邢台县浆水": "101090903",
    "内邱": "101090904",
    "柏乡": "101090905",
    "隆尧": "101090906",
    "南和": "101090907",
    "宁晋": "101090908",
    "巨鹿": "101090909",
    "新河": "101090910",
    "广宗": "101090911",
    "平乡": "101090912",
    "威县": "101090913",
    "清河": "101090914",
    "临西": "101090915",
    "南宫": "101090916",
    "沙河": "101090917",
    "任县": "101090918",
    "邯郸": "101091001",
    "峰峰": "101091002",
    "临漳": "101091003",
    "成安": "101091004",
    "大名": "101091005",
    "涉县": "101091006",
    "磁县": "101091007",
    "肥乡": "101091008",
    "永年": "101091009",
    "邱县": "101091010",
    "鸡泽": "101091011",
    "广平": "101091012",
    "馆陶": "101091013",
    "魏县": "101091014",
    "曲周": "101091015",
    "武安": "101091016",
    "秦皇岛": "101091101",
    "青龙": "101091102",
    "昌黎": "101091103",
    "抚宁": "101091104",
    "卢龙": "101091105",
    "北戴河": "101091106",
    "太原": "101100101",
    "清徐": "101100102",
    "阳曲": "101100103",
    "娄烦": "101100104",
    "太原古交区": "101100105",
    "太原北郊": "101100106",
    "太原南郊": "101100107",
    "大同": "101100201",
    "阳高": "101100202",
    "大同县": "101100203",
    "天镇": "101100204",
    "广灵": "101100205",
    "灵邱": "101100206",
    "浑源": "101100207",
    "左云": "101100208",
    "阳泉": "101100301",
    "盂县": "101100302",
    "平定": "101100303",
    "晋中": "101100401",
    "榆次": "101100402",
    "榆社": "101100403",
    "左权": "101100404",
    "和顺": "101100405",
    "昔阳": "101100406",
    "寿阳": "101100407",
    "太谷": "101100408",
    "祁县": "101100409",
    "平遥": "101100410",
    "灵石": "101100411",
    "介休": "101100412",
    "长治": "101100501",
    "黎城": "101100502",
    "屯留": "101100503",
    "潞城": "101100504",
    "襄垣": "101100505",
    "平顺": "101100506",
    "武乡": "101100507",
    "沁县": "101100508",
    "长子": "101100509",
    "沁源": "101100510",
    "壶关": "101100511",
    "晋城": "101100601",
    "沁水": "101100602",
    "阳城": "101100603",
    "陵川": "101100604",
    "高平": "101100605",
    "临汾": "101100701",
    "曲沃": "101100702",
    "永和": "101100703",
    "隰县": "101100704",
    "大宁": "101100705",
    "吉县": "101100706",
    "襄汾": "101100707",
    "蒲县": "101100708",
    "汾西": "101100709",
    "洪洞": "101100710",
    "霍州": "101100711",
    "乡宁": "101100712",
    "翼城": "101100713",
    "侯马": "101100714",
    "浮山": "101100715",
    "安泽": "101100716",
    "古县": "101100717",
    "运城": "101100801",
    "临猗": "101100802",
    "稷山": "101100803",
    "万荣": "101100804",
    "河津": "101100805",
    "新绛": "101100806",
    "绛县": "101100807",
    "闻喜": "101100808",
    "垣曲": "101100809",
    "永济": "101100810",
    "芮城": "101100811",
    "夏县": "101100812",
    "平陆": "101100813",
    "朔州": "101100901",
    "平鲁": "101100902",
    "山阴": "101100903",
    "右玉": "101100904",
    "应县": "101100905",
    "怀仁": "101100906",
    "忻州": "101101001",
    "定襄": "101101002",
    "五台县豆村": "101101003",
    "河曲": "101101004",
    "偏关": "101101005",
    "神池": "101101006",
    "宁武": "101101007",
    "代县": "101101008",
    "繁峙": "101101009",
    "五台山": "101101010",
    "保德": "101101011",
    "静乐": "101101012",
    "岢岚": "101101013",
    "五寨": "101101014",
    "原平": "101101015",
    "吕梁": "101101100",
    "离石": "101101101",
    "临县": "101101102",
    "兴县": "101101103",
    "岚县": "101101104",
    "柳林": "101101105",
    "石楼": "101101106",
    "方山": "101101107",
    "交口": "101101108",
    "中阳": "101101109",
    "孝义": "101101110",
    "汾阳": "101101111",
    "文水": "101101112",
    "交城": "101101113",
    "西安": "101110101",
    "长安": "101110102",
    "临潼": "101110103",
    "蓝田": "101110104",
    "周至": "101110105",
    "户县": "101110106",
    "高陵": "101110107",
    "杨凌": "101110108",
    "咸阳": "101110200",
    "三原": "101110201",
    "礼泉": "101110202",
    "永寿": "101110203",
    "淳化": "101110204",
    "泾阳": "101110205",
    "武功": "101110206",
    "乾县": "101110207",
    "彬县": "101110208",
    "长武": "101110209",
    "旬邑": "101110210",
    "兴平": "101110211",
    "延安": "101110300",
    "延长": "101110301",
    "延川": "101110302",
    "子长": "101110303",
    "宜川": "101110304",
    "富县": "101110305",
    "志丹": "101110306",
    "安塞": "101110307",
    "甘泉": "101110308",
    "洛川": "101110309",
    "黄陵": "101110310",
    "黄龙": "101110311",
    "吴起": "101110312",
    "榆林": "101110401",
    "府谷": "101110402",
    "神木": "101110403",
    "佳县": "101110404",
    "定边": "101110405",
    "靖边": "101110406",
    "横山": "101110407",
    "米脂": "101110408",
    "子洲": "101110409",
    "绥德": "101110410",
    "吴堡": "101110411",
    "清涧": "101110412",
    "渭南": "101110501",
    "华县": "101110502",
    "潼关": "101110503",
    "大荔": "101110504",
    "白水": "101110505",
    "富平": "101110506",
    "蒲城": "101110507",
    "澄城": "101110508",
    "合阳": "101110509",
    "韩城": "101110510",
    "华阴": "101110511",
    "华山": "101110512",
    "商洛": "101110601",
    "洛南": "101110602",
    "柞水": "101110603",
    "镇安": "101110605",
    "丹凤": "101110606",
    "商南": "101110607",
    "山阳": "101110608",
    "安康": "101110701",
    "紫阳": "101110702",
    "石泉": "101110703",
    "汉阴": "101110704",
    "旬阳": "101110705",
    "岚皋": "101110706",
    "平利": "101110707",
    "白河": "101110708",
    "镇坪": "101110709",
    "宁陕": "101110710",
    "汉中": "101110801",
    "略阳": "101110802",
    "勉县": "101110803",
    "留坝": "101110804",
    "洋县": "101110805",
    "城固": "101110806",
    "西乡": "101110807",
    "佛坪": "101110808",
    "宁强": "101110809",
    "南郑": "101110810",
    "镇巴": "101110811",
    "宝鸡": "101110901",
    "宝鸡县": "101110902",
    "千阳": "101110903",
    "麟游": "101110904",
    "岐山": "101110905",
    "凤翔": "101110906",
    "扶风": "101110907",
    "眉县": "101110908",
    "太白": "101110909",
    "凤县": "101110910",
    "陇县": "101110911",
    "铜川": "101111001",
    "耀县": "101111002",
    "宜君": "101111003",
    "济南": "101120101",
    "长清": "101120102",
    "商河": "101120103",
    "章丘": "101120104",
    "平阴": "101120105",
    "济阳": "101120106",
    "青岛": "101120201",
    "崂山": "101120202",
    "潮连岛": "101120203",
    "即墨": "101120204",
    "胶州": "101120205",
    "胶南": "101120206",
    "莱西": "101120207",
    "平度": "101120208",
    "淄博": "101120301",
    "淄川": "101120302",
    "博山": "101120303",
    "高青": "101120304",
    "周村": "101120305",
    "沂源": "101120306",
    "桓台": "101120307",
    "临淄": "101120308",
    "德州": "101120401",
    "武城": "101120402",
    "临邑": "101120403",
    "陵县": "101120404",
    "齐河": "101120405",
    "乐陵": "101120406",
    "庆云": "101120407",
    "平原": "101120408",
    "宁津": "101120409",
    "夏津": "101120410",
    "禹城": "101120411",
    "烟台": "101120501",
    "莱州": "101120502",
    "长岛": "101120503",
    "蓬莱": "101120504",
    "龙口": "101120505",
    "招远": "101120506",
    "栖霞": "101120507",
    "福山": "101120508",
    "牟平": "101120509",
    "莱阳": "101120510",
    "海阳": "101120511",
    "千里岩": "101120512",
    "潍坊": "101120601",
    "青州": "101120602",
    "寿光": "101120603",
    "临朐": "101120604",
    "昌乐": "101120605",
    "昌邑": "101120606",
    "安丘": "101120607",
    "高密": "101120608",
    "诸城": "101120609",
    "济宁": "101120701",
    "嘉祥": "101120702",
    "微山": "101120703",
    "鱼台": "101120704",
    "兖州": "101120705",
    "金乡": "101120706",
    "汶上": "101120707",
    "泗水": "101120708",
    "梁山": "101120709",
    "曲阜": "101120710",
    "邹城": "101120711",
    "泰安": "101120801",
    "新泰": "101120802",
    "泰山": "101120803",
    "肥城": "101120804",
    "东平": "101120805",
    "宁阳": "101120806",
    "临沂": "101120901",
    "莒南": "101120902",
    "沂南": "101120903",
    "苍山": "101120904",
    "临沭": "101120905",
    "郯城": "101120906",
    "蒙阴": "101120907",
    "平邑": "101120908",
    "费县": "101120909",
    "沂水": "101120910",
    "马站": "101120911",
    "菏泽": "101121001",
    "鄄城": "101121002",
    "郓城": "101121003",
    "东明": "101121004",
    "定陶": "101121005",
    "巨野": "101121006",
    "曹县": "101121007",
    "成武": "101121008",
    "单县": "101121009",
    "滨州": "101121101",
    "博兴": "101121102",
    "无棣": "101121103",
    "阳信": "101121104",
    "惠民": "101121105",
    "沾化": "101121106",
    "邹平": "101121107",
    "东营": "101121201",
    "河口": "101121202",
    "垦利": "101121203",
    "利津": "101121204",
    "广饶": "101121205",
    "威海": "101121301",
    "文登": "101121302",
    "荣成": "101121303",
    "乳山": "101121304",
    "成山头": "101121305",
    "石岛": "101121306",
    "枣庄": "101121401",
    "薛城": "101121402",
    "峄城": "101121403",
    "台儿庄": "101121404",
    "滕州": "101121405",
    "日照": "101121501",
    "五莲": "101121502",
    "莒县": "101121503",
    "莱芜": "101121601",
    "聊城": "101121701",
    "冠县": "101121702",
    "阳谷": "101121703",
    "高唐": "101121704",
    "茌平": "101121705",
    "东阿": "101121706",
    "临清": "101121707",
    "朝城": "101121708",
    "莘县": "101121709",
    "乌鲁木齐": "101130101",
    "蔡家湖": "101130102",
    "小渠子": "101130103",
    "巴仑台": "101130104",
    "达坂城": "101130105",
    "十三间房气象站": "101130106",
    "天山大西沟": "101130107",
    "乌鲁木齐牧试站": "101130108",
    "天池": "101130109",
    "白杨沟": "101130110",
    "克拉玛依": "101130201",
    "石河子": "101130301",
    "炮台": "101130302",
    "莫索湾": "101130303",
    "乌兰乌苏": "101130304",
    "昌吉": "101130401",
    "呼图壁": "101130402",
    "米泉": "101130403",
    "阜康": "101130404",
    "吉木萨尔": "101130405",
    "奇台": "101130406",
    "玛纳斯": "101130407",
    "木垒": "101130408",
    "北塔山": "101130409",
    "吐鲁番": "101130501",
    "托克逊": "101130502",
    "吐鲁番东坎": "101130503",
    "鄯善": "101130504",
    "红柳河": "101130505",
    "库尔勒": "101130601",
    "轮台": "101130602",
    "尉犁": "101130603",
    "若羌": "101130604",
    "且末": "101130605",
    "和静": "101130606",
    "焉耆": "101130607",
    "和硕": "101130608",
    "库米什": "101130609",
    "巴音布鲁克": "101130610",
    "铁干里克": "101130611",
    "博湖": "101130612",
    "塔中": "101130613",
    "阿拉尔": "101130701",
    "阿克苏": "101130801",
    "乌什": "101130802",
    "温宿": "101130803",
    "拜城": "101130804",
    "新和": "101130805",
    "沙雅": "101130806",
    "库车": "101130807",
    "柯坪": "101130808",
    "阿瓦提": "101130809",
    "喀什": "101130901",
    "英吉沙": "101130902",
    "塔什库尔干": "101130903",
    "麦盖提": "101130904",
    "莎车": "101130905",
    "叶城": "101130906",
    "泽普": "101130907",
    "巴楚": "101130908",
    "岳普湖": "101130909",
    "伽师": "101130910",
    "伊宁": "101131001",
    "察布查尔": "101131002",
    "尼勒克": "101131003",
    "伊宁县": "101131004",
    "巩留": "101131005",
    "新源": "101131006",
    "昭苏": "101131007",
    "特克斯": "101131008",
    "霍城": "101131009",
    "霍尔果斯": "101131010",
    "塔城": "101131101",
    "裕民": "101131102",
    "额敏": "101131103",
    "和布克赛尔": "101131104",
    "托里": "101131105",
    "乌苏": "101131106",
    "沙湾": "101131107",
    "和丰": "101131108",
    "哈密": "101131201",
    "沁城": "101131202",
    "巴里坤": "101131203",
    "伊吾": "101131204",
    "淖毛湖": "101131205",
    "和田": "101131301",
    "皮山": "101131302",
    "策勒": "101131303",
    "墨玉": "101131304",
    "洛浦": "101131305",
    "民丰": "101131306",
    "于田": "101131307",
    "阿勒泰": "101131401",
    "哈巴河": "101131402",
    "一八五团": "101131403",
    "黑山头": "101131404",
    "吉木乃": "101131405",
    "布尔津": "101131406",
    "福海": "101131407",
    "富蕴": "101131408",
    "青河": "101131409",
    "安德河": "101131410",
    "阿图什": "101131501",
    "乌恰": "101131502",
    "阿克陶": "101131503",
    "阿合奇": "101131504",
    "吐尔尕特": "101131505",
    "博乐": "101131601",
    "温泉": "101131602",
    "精河": "101131603",
    "阿拉山口": "101131606",
    "拉萨": "101140101",
    "当雄": "101140102",
    "尼木": "101140103",
    "墨竹贡卡": "101140104",
    "日喀则": "101140201",
    "拉孜": "101140202",
    "南木林": "101140203",
    "聂拉木": "101140204",
    "定日": "101140205",
    "江孜": "101140206",
    "帕里": "101140207",
    "山南": "101140301",
    "贡嘎": "101140302",
    "琼结": "101140303",
    "加查": "101140304",
    "浪卡子": "101140305",
    "错那": "101140306",
    "隆子": "101140307",
    "泽当": "101140308",
    "林芝": "101140401",
    "波密": "101140402",
    "米林": "101140403",
    "察隅": "101140404",
    "昌都": "101140501",
    "丁青": "101140502",
    "类乌齐": "101140503",
    "洛隆": "101140504",
    "左贡": "101140505",
    "芒康": "101140506",
    "八宿": "101140507",
    "那曲": "101140601",
    "嘉黎": "101140603",
    "班戈": "101140604",
    "安多": "101140605",
    "索县": "101140606",
    "比如": "101140607",
    "阿里": "101140701",
    "改则": "101140702",
    "申扎": "101140703",
    "狮泉河": "101140704",
    "普兰": "101140705",
    "西宁": "101150101",
    "大通": "101150102",
    "湟源": "101150103",
    "湟中": "101150104",
    "铁卜加": "101150105",
    "铁卜加寺": "101150106",
    "中心站": "101150107",
    "海东": "101150201",
    "乐都": "101150202",
    "民和": "101150203",
    "互助": "101150204",
    "化隆": "101150205",
    "循化": "101150206",
    "冷湖": "101150207",
    "平安": "101150208",
    "黄南": "101150301",
    "尖扎": "101150302",
    "泽库": "101150303",
    "河南": "101150304",
    "海南": "101150401",
    "江西沟": "101150402",
    "贵德": "101150404",
    "河卡": "101150405",
    "兴海": "101150406",
    "贵南": "101150407",
    "同德": "101150408",
    "共和": "101150409",
    "果洛": "101150501",
    "班玛": "101150502",
    "甘德": "101150503",
    "达日": "101150504",
    "久治": "101150505",
    "玛多": "101150506",
    "清水河": "101150507",
    "玛沁": "101150508",
    "玉树": "101150601",
    "托托河": "101150602",
    "治多": "101150603",
    "杂多": "101150604",
    "囊谦": "101150605",
    "曲麻莱": "101150606",
    "海西": "101150701",
    "格尔木": "101150702",
    "察尔汉": "101150703",
    "野牛沟": "101150704",
    "五道梁": "101150705",
    "小灶火": "101150706",
    "天峻": "101150708",
    "乌兰": "101150709",
    "都兰": "101150710",
    "诺木洪": "101150711",
    "茫崖": "101150712",
    "大柴旦": "101150713",
    "茶卡": "101150714",
    "香日德": "101150715",
    "德令哈": "101150716",
    "海北": "101150801",
    "门源": "101150802",
    "祁连": "101150803",
    "海晏": "101150804",
    "托勒": "101150805",
    "刚察": "101150806",
    "兰州": "101160101",
    "皋兰": "101160102",
    "永登": "101160103",
    "榆中": "101160104",
    "定西": "101160201",
    "通渭": "101160202",
    "陇西": "101160203",
    "渭源": "101160204",
    "临洮": "101160205",
    "漳县": "101160206",
    "岷县": "101160207",
    "安定": "101160208",
    "平凉": "101160301",
    "泾川": "101160302",
    "灵台": "101160303",
    "崇信": "101160304",
    "华亭": "101160305",
    "庄浪": "101160306",
    "静宁": "101160307",
    "崆峒": "101160308",
    "庆阳": "101160401",
    "西峰": "101160402",
    "环县": "101160403",
    "华池": "101160404",
    "合水": "101160405",
    "正宁": "101160406",
    "宁县": "101160407",
    "镇原": "101160408",
    "庆城": "101160409",
    "武威": "101160501",
    "民勤": "101160502",
    "古浪": "101160503",
    "乌鞘岭": "101160504",
    "天祝": "101160505",
    "金昌": "101160601",
    "永昌": "101160602",
    "张掖": "101160701",
    "肃南": "101160702",
    "民乐": "101160703",
    "临泽": "101160704",
    "高台": "101160705",
    "山丹": "101160706",
    "酒泉": "101160801",
    "鼎新": "101160802",
    "金塔": "101160803",
    "马鬃山": "101160804",
    "瓜州": "101160805",
    "肃北": "101160806",
    "玉门镇": "101160807",
    "敦煌": "101160808",
    "天水": "101160901",
    "北道区": "101160902",
    "清水": "101160903",
    "秦安": "101160904",
    "甘谷": "101160905",
    "武山": "101160906",
    "张家川": "101160907",
    "麦积": "101160908",
    "武都": "101161001",
    "成县": "101161002",
    "文县": "101161003",
    "宕昌": "101161004",
    "康县": "101161005",
    "西和": "101161006",
    "礼县": "101161007",
    "徽县": "101161008",
    "两当": "101161009",
    "临夏": "101161101",
    "康乐": "101161102",
    "永靖": "101161103",
    "广河": "101161104",
    "和政": "101161105",
    "东乡": "101161106",
    "合作": "101161201",
    "临潭": "101161202",
    "卓尼": "101161203",
    "舟曲": "101161204",
    "迭部": "101161205",
    "玛曲": "101161206",
    "碌曲": "101161207",
    "夏河": "101161208",
    "白银": "101161301",
    "靖远": "101161302",
    "会宁": "101161303",
    "华家岭": "101161304",
    "景泰": "101161305",
    "银川": "101170101",
    "永宁": "101170102",
    "灵武": "101170103",
    "贺兰": "101170104",
    "石嘴山": "101170201",
    "惠农": "101170202",
    "平罗": "101170203",
    "陶乐": "101170204",
    "石炭井": "101170205",
    "大武口": "101170206",
    "吴忠": "101170301",
    "同心": "101170302",
    "盐池": "101170303",
    "韦州": "101170304",
    "麻黄山": "101170305",
    "青铜峡": "101170306",
    "固原": "101170401",
    "西吉": "101170402",
    "隆德": "101170403",
    "泾源": "101170404",
    "六盘山": "101170405",
    "彭阳": "101170406",
    "中卫": "101170501",
    "中宁": "101170502",
    "兴仁堡": "101170503",
    "海原": "101170504",
    "郑州": "101180101",
    "巩义": "101180102",
    "荥阳": "101180103",
    "登封": "101180104",
    "新密": "101180105",
    "新郑": "101180106",
    "中牟": "101180107",
    "郑州农试站": "101180108",
    "安阳": "101180201",
    "汤阴": "101180202",
    "滑县": "101180203",
    "内黄": "101180204",
    "林州": "101180205",
    "新乡": "101180301",
    "获嘉": "101180302",
    "原阳": "101180303",
    "辉县": "101180304",
    "卫辉": "101180305",
    "延津": "101180306",
    "封丘": "101180307",
    "长垣": "101180308",
    "许昌": "101180401",
    "鄢陵": "101180402",
    "襄城": "101180403",
    "长葛": "101180404",
    "禹州": "101180405",
    "平顶山": "101180501",
    "郏县": "101180502",
    "宝丰": "101180503",
    "汝州": "101180504",
    "叶县": "101180505",
    "舞钢": "101180506",
    "鲁山": "101180507",
    "信阳": "101180601",
    "息县": "101180602",
    "罗山": "101180603",
    "光山": "101180604",
    "新县": "101180605",
    "淮滨": "101180606",
    "潢川": "101180607",
    "固始": "101180608",
    "商城": "101180609",
    "鸡公山": "101180610",
    "信阳地区农试站": "101180611",
    "南阳": "101180701",
    "南召": "101180702",
    "方城": "101180703",
    "社旗": "101180704",
    "西峡": "101180705",
    "内乡": "101180706",
    "镇平": "101180707",
    "淅川": "101180708",
    "新野": "101180709",
    "唐河": "101180710",
    "邓州": "101180711",
    "桐柏": "101180712",
    "开封": "101180801",
    "杞县": "101180802",
    "尉氏": "101180803",
    "通许": "101180804",
    "兰考": "101180805",
    "洛阳": "101180901",
    "新安": "101180902",
    "孟津": "101180903",
    "宜阳": "101180904",
    "洛宁": "101180905",
    "伊川": "101180906",
    "嵩县": "101180907",
    "偃师": "101180908",
    "栾川": "101180909",
    "汝阳": "101180910",
    "商丘": "101181001",
    "睢阳区": "101181002",
    "睢县": "101181003",
    "民权": "101181004",
    "虞城": "101181005",
    "柘城": "101181006",
    "宁陵": "101181007",
    "夏邑": "101181008",
    "永城": "101181009",
    "焦作": "101181101",
    "修武": "101181102",
    "武陟": "101181103",
    "沁阳": "101181104",
    "博爱": "101181106",
    "温县": "101181107",
    "孟州": "101181108",
    "鹤壁": "101181201",
    "浚县": "101181202",
    "淇县": "101181203",
    "濮阳": "101181301",
    "台前": "101181302",
    "南乐": "101181303",
    "清丰": "101181304",
    "范县": "101181305",
    "周口": "101181401",
    "扶沟": "101181402",
    "太康": "101181403",
    "淮阳": "101181404",
    "西华": "101181405",
    "商水": "101181406",
    "项城": "101181407",
    "郸城": "101181408",
    "鹿邑": "101181409",
    "沈丘": "101181410",
    "黄泛区": "101181411",
    "漯河": "101181501",
    "临颍": "101181502",
    "舞阳": "101181503",
    "驻马店": "101181601",
    "西平": "101181602",
    "遂平": "101181603",
    "上蔡": "101181604",
    "汝南": "101181605",
    "泌阳": "101181606",
    "平舆": "101181607",
    "新蔡": "101181608",
    "确山": "101181609",
    "正阳": "101181610",
    "三门峡": "101181701",
    "灵宝": "101181702",
    "渑池": "101181703",
    "卢氏": "101181704",
    "济源": "101181801",
    "南京": "101190101",
    "溧水": "101190102",
    "高淳": "101190103",
    "江宁": "101190104",
    "六合": "101190105",
    "江浦": "101190106",
    "浦口": "101190107",
    "无锡": "101190201",
    "江阴": "101190202",
    "宜兴": "101190203",
    "镇江": "101190301",
    "丹阳": "101190302",
    "扬中": "101190303",
    "句容": "101190304",
    "丹徒": "101190305",
    "苏州": "101190401",
    "常熟": "101190402",
    "张家港": "101190403",
    "昆山": "101190404",
    "吴县东山": "101190405",
    "吴县": "101190406",
    "吴江": "101190407",
    "太仓": "101190408",
    "南通": "101190501",
    "海安": "101190502",
    "如皋": "101190503",
    "如东": "101190504",
    "吕泗": "101190505",
    "吕泗渔场": "101190506",
    "启东": "101190507",
    "海门": "101190508",
    "通州": "101190509",
    "扬州": "101190601",
    "宝应": "101190602",
    "仪征": "101190603",
    "高邮": "101190604",
    "江都": "101190605",
    "邗江": "101190606",
    "盐城": "101190701",
    "响水": "101190702",
    "滨海": "101190703",
    "阜宁": "101190704",
    "射阳": "101190705",
    "建湖": "101190706",
    "东台": "101190707",
    "大丰": "101190708",
    "盐都": "101190709",
    "徐州": "101190801",
    "徐州农试站": "101190802",
    "丰县": "101190803",
    "沛县": "101190804",
    "邳州": "101190805",
    "睢宁": "101190806",
    "新沂": "101190807",
    "淮安": "101190901",
    "金湖": "101190902",
    "盱眙": "101190903",
    "洪泽": "101190904",
    "涟水": "101190905",
    "淮阴县": "101190906",
    "淮阴": "101190907",
    "楚州": "101190908",
    "连云港": "101191001",
    "东海": "101191002",
    "赣榆": "101191003",
    "灌云": "101191004",
    "灌南": "101191005",
    "西连岛": "101191006",
    "燕尾港": "101191007",
    "常州": "101191101",
    "溧阳": "101191102",
    "金坛": "101191103",
    "泰州": "101191201",
    "兴化": "101191202",
    "泰兴": "101191203",
    "姜堰": "101191204",
    "靖江": "101191205",
    "宿迁": "101191301",
    "沭阳": "101191302",
    "泗阳": "101191303",
    "泗洪": "101191304",
    "武汉": "101200101",
    "蔡甸": "101200102",
    "黄陂": "101200103",
    "新洲": "101200104",
    "江夏": "101200105",
    "襄樊": "101200201",
    "襄阳": "101200202",
    "保康": "101200203",
    "南漳": "101200204",
    "宜城": "101200205",
    "老河口": "101200206",
    "谷城": "101200207",
    "枣阳": "101200208",
    "鄂州": "101200301",
    "孝感": "101200401",
    "安陆": "101200402",
    "云梦": "101200403",
    "大悟": "101200404",
    "应城": "101200405",
    "汉川": "101200406",
    "黄冈": "101200501",
    "红安": "101200502",
    "麻城": "101200503",
    "罗田": "101200504",
    "英山": "101200505",
    "浠水": "101200506",
    "蕲春": "101200507",
    "黄梅": "101200508",
    "武穴": "101200509",
    "黄石": "101200601",
    "大冶": "101200602",
    "阳新": "101200603",
    "咸宁": "101200701",
    "赤壁": "101200702",
    "嘉鱼": "101200703",
    "崇阳": "101200704",
    "通城": "101200705",
    "通山": "101200706",
    "荆州": "101200801",
    "江陵": "101200802",
    "公安": "101200803",
    "石首": "101200804",
    "监利": "101200805",
    "洪湖": "101200806",
    "松滋": "101200807",
    "宜昌": "101200901",
    "远安": "101200902",
    "秭归": "101200903",
    "兴山": "101200904",
    "宜昌县": "101200905",
    "五峰": "101200906",
    "当阳": "101200907",
    "长阳": "101200908",
    "宜都": "101200909",
    "枝江": "101200910",
    "三峡": "101200911",
    "夷陵": "101200912",
    "恩施": "101201001",
    "利川": "101201002",
    "建始": "101201003",
    "咸丰": "101201004",
    "宣恩": "101201005",
    "鹤峰": "101201006",
    "来凤": "101201007",
    "巴东": "101201008",
    "绿葱坡": "101201009",
    "十堰": "101201101",
    "竹溪": "101201102",
    "郧西": "101201103",
    "郧县": "101201104",
    "竹山": "101201105",
    "房县": "101201106",
    "丹江口": "101201107",
    "神农架": "101201201",
    "随州": "101201301",
    "广水": "101201302",
    "荆门": "101201401",
    "钟祥": "101201402",
    "京山": "101201403",
    "天门": "101201501",
    "仙桃": "101201601",
    "潜江": "101201701",
    "杭州": "101210101",
    "萧山": "101210102",
    "桐庐": "101210103",
    "淳安": "101210104",
    "建德": "101210105",
    "余杭": "101210106",
    "临安": "101210107",
    "富阳": "101210108",
    "湖州": "101210201",
    "长兴": "101210202",
    "安吉": "101210203",
    "德清": "101210204",
    "嘉兴": "101210301",
    "嘉善": "101210302",
    "海宁": "101210303",
    "桐乡": "101210304",
    "平湖": "101210305",
    "海盐": "101210306",
    "宁波": "101210401",
    "慈溪": "101210403",
    "余姚": "101210404",
    "奉化": "101210405",
    "象山": "101210406",
    "石浦": "101210407",
    "宁海": "101210408",
    "鄞县": "101210409",
    "北仑": "101210410",
    "鄞州": "101210411",
    "镇海": "101210412",
    "绍兴": "101210501",
    "诸暨": "101210502",
    "上虞": "101210503",
    "新昌": "101210504",
    "嵊州": "101210505",
    "台州": "101210601",
    "括苍山": "101210602",
    "玉环": "101210603",
    "三门": "101210604",
    "天台": "101210605",
    "仙居": "101210606",
    "温岭": "101210607",
    "大陈": "101210608",
    "洪家": "101210609",
    "温州": "101210701",
    "泰顺": "101210702",
    "文成": "101210703",
    "平阳": "101210704",
    "瑞安": "101210705",
    "洞头": "101210706",
    "乐清": "101210707",
    "永嘉": "101210708",
    "苍南": "101210709",
    "丽水": "101210801",
    "遂昌": "101210802",
    "龙泉": "101210803",
    "缙云": "101210804",
    "青田": "101210805",
    "云和": "101210806",
    "庆元": "101210807",
    "金华": "101210901",
    "浦江": "101210902",
    "兰溪": "101210903",
    "义乌": "101210904",
    "东阳": "101210905",
    "武义": "101210906",
    "永康": "101210907",
    "磐安": "101210908",
    "衢州": "101211001",
    "常山": "101211002",
    "开化": "101211003",
    "龙游": "101211004",
    "江山": "101211005",
    "舟山": "101211101",
    "嵊泗": "101211102",
    "嵊山": "101211103",
    "岱山": "101211104",
    "普陀": "101211105",
    "定海": "101211106",
    "合肥": "101220101",
    "长丰": "101220102",
    "肥东": "101220103",
    "肥西": "101220104",
    "蚌埠": "101220201",
    "怀远": "101220202",
    "固镇": "101220203",
    "五河": "101220204",
    "芜湖": "101220301",
    "繁昌": "101220302",
    "芜湖县": "101220303",
    "南陵": "101220304",
    "淮南": "101220401",
    "凤台": "101220402",
    "马鞍山": "101220501",
    "当涂": "101220502",
    "安庆": "101220601",
    "枞阳": "101220602",
    "太湖": "101220603",
    "潜山": "101220604",
    "怀宁": "101220605",
    "宿松": "101220606",
    "望江": "101220607",
    "岳西": "101220608",
    "桐城": "101220609",
    "宿州": "101220701",
    "砀山": "101220702",
    "灵璧": "101220703",
    "泗县": "101220704",
    "萧县": "101220705",
    "阜阳": "101220801",
    "阜南": "101220802",
    "颍上": "101220803",
    "临泉": "101220804",
    "界首": "101220805",
    "太和": "101220806",
    "亳州": "101220901",
    "涡阳": "101220902",
    "利辛": "101220903",
    "蒙城": "101220904",
    "黄山站": "101221001",
    "黄山区": "101221002",
    "屯溪": "101221003",
    "祁门": "101221004",
    "黟县": "101221005",
    "歙县": "101221006",
    "休宁": "101221007",
    "黄山市": "101221008",
    "滁州": "101221101",
    "凤阳": "101221102",
    "明光": "101221103",
    "定远": "101221104",
    "全椒": "101221105",
    "来安": "101221106",
    "天长": "101221107",
    "淮北": "101221201",
    "濉溪": "101221202",
    "铜陵": "101221301",
    "宣城": "101221401",
    "泾县": "101221402",
    "旌德": "101221403",
    "宁国": "101221404",
    "绩溪": "101221405",
    "广德": "101221406",
    "郎溪": "101221407",
    "六安": "101221501",
    "霍邱": "101221502",
    "寿县": "101221503",
    "南溪": "101221504",
    "金寨": "101221505",
    "霍山": "101221506",
    "舒城": "101221507",
    "巢湖": "101221601",
    "庐江": "101221602",
    "无为": "101221603",
    "含山": "101221604",
    "和县": "101221605",
    "池州": "101221701",
    "东至": "101221702",
    "青阳": "101221703",
    "九华山": "101221704",
    "石台": "101221705",
    "福州": "101230101",
    "闽清": "101230102",
    "闽侯": "101230103",
    "罗源": "101230104",
    "连江": "101230105",
    "马祖": "101230106",
    "永泰": "101230107",
    "平潭": "101230108",
    "福州郊区": "101230109",
    "长乐": "101230110",
    "福清": "101230111",
    "平潭海峡大桥": "101230112",
    "厦门": "101230201",
    "同安": "101230202",
    "宁德": "101230301",
    "古田": "101230302",
    "霞浦": "101230303",
    "寿宁": "101230304",
    "周宁": "101230305",
    "福安": "101230306",
    "柘荣": "101230307",
    "福鼎": "101230308",
    "屏南": "101230309",
    "莆田": "101230401",
    "仙游": "101230402",
    "秀屿港": "101230403",
    "泉州": "101230501",
    "安溪": "101230502",
    "九仙山": "101230503",
    "永春": "101230504",
    "德化": "101230505",
    "南安": "101230506",
    "崇武": "101230507",
    "金山": "101230508",
    "晋江": "101230509",
    "漳州": "101230601",
    "长泰": "101230602",
    "南靖": "101230603",
    "平和": "101230604",
    "龙海": "101230605",
    "漳浦": "101230606",
    "诏安": "101230607",
    "东山": "101230608",
    "云霄": "101230609",
    "华安": "101230610",
    "龙岩": "101230701",
    "长汀": "101230702",
    "连城": "101230703",
    "武平": "101230704",
    "上杭": "101230705",
    "永定": "101230706",
    "漳平": "101230707",
    "三明": "101230801",
    "宁化": "101230802",
    "清流": "101230803",
    "泰宁": "101230804",
    "将乐": "101230805",
    "建宁": "101230806",
    "明溪": "101230807",
    "沙县": "101230808",
    "尤溪": "101230809",
    "永安": "101230810",
    "大田": "101230811",
    "南平": "101230901",
    "顺昌": "101230902",
    "光泽": "101230903",
    "邵武": "101230904",
    "武夷山": "101230905",
    "浦城": "101230906",
    "建阳": "101230907",
    "松溪": "101230908",
    "政和": "101230909",
    "建瓯": "101230910",
    "南昌": "101240101",
    "新建": "101240102",
    "南昌县": "101240103",
    "安义": "101240104",
    "进贤": "101240105",
    "莲塘": "101240106",
    "九江": "101240201",
    "瑞昌": "101240202",
    "庐山": "101240203",
    "武宁": "101240204",
    "德安": "101240205",
    "永修": "101240206",
    "湖口": "101240207",
    "彭泽": "101240208",
    "星子": "101240209",
    "都昌": "101240210",
    "棠荫": "101240211",
    "修水": "101240212",
    "上饶": "101240301",
    "鄱阳": "101240302",
    "婺源": "101240303",
    "康山": "101240304",
    "余干": "101240305",
    "万年": "101240306",
    "德兴": "101240307",
    "上饶县": "101240308",
    "弋阳": "101240309",
    "横峰": "101240310",
    "铅山": "101240311",
    "玉山": "101240312",
    "广丰": "101240313",
    "波阳": "101240314",
    "抚州": "101240401",
    "广昌": "101240402",
    "乐安": "101240403",
    "崇仁": "101240404",
    "金溪": "101240405",
    "资溪": "101240406",
    "宜黄": "101240407",
    "南城": "101240408",
    "南丰": "101240409",
    "黎川": "101240410",
    "东乡": "101240411",
    "宜春": "101240501",
    "铜鼓": "101240502",
    "宜丰": "101240503",
    "万载": "101240504",
    "上高": "101240505",
    "靖安": "101240506",
    "奉新": "101240507",
    "高安": "101240508",
    "樟树": "101240509",
    "丰城": "101240510",
    "吉安": "101240601",
    "吉安县": "101240602",
    "吉水": "101240603",
    "新干": "101240604",
    "峡江": "101240605",
    "永丰": "101240606",
    "永新": "101240607",
    "井冈山": "101240608",
    "万安": "101240609",
    "遂川": "101240610",
    "泰和": "101240611",
    "安福": "101240612",
    "宁冈": "101240613",
    "赣州": "101240701",
    "崇义": "101240702",
    "上犹": "101240703",
    "南康": "101240704",
    "大余": "101240705",
    "信丰": "101240706",
    "宁都": "101240707",
    "石城": "101240708",
    "瑞金": "101240709",
    "于都": "101240710",
    "会昌": "101240711",
    "安远": "101240712",
    "全南": "101240713",
    "龙南": "101240714",
    "定南": "101240715",
    "寻乌": "101240716",
    "兴国": "101240717",
    "景德镇": "101240801",
    "乐平": "101240802",
    "萍乡": "101240901",
    "莲花": "101240902",
    "新余": "101241001",
    "分宜": "101241002",
    "鹰潭": "101241101",
    "余江": "101241102",
    "贵溪": "101241103",
    "长沙": "101250101",
    "宁乡": "101250102",
    "浏阳": "101250103",
    "马坡岭": "101250104",
    "湘潭": "101250201",
    "韶山": "101250202",
    "湘乡": "101250203",
    "株洲": "101250301",
    "攸县": "101250302",
    "醴陵": "101250303",
    "株洲县": "101250304",
    "茶陵": "101250305",
    "炎陵": "101250306",
    "衡阳": "101250401",
    "衡山": "101250402",
    "衡东": "101250403",
    "祁东": "101250404",
    "衡阳县": "101250405",
    "常宁": "101250406",
    "衡南": "101250407",
    "耒阳": "101250408",
    "南岳": "101250409",
    "郴州": "101250501",
    "桂阳": "101250502",
    "嘉禾": "101250503",
    "宜章": "101250504",
    "临武": "101250505",
    "桥口": "101250506",
    "资兴": "101250507",
    "汝城": "101250508",
    "安仁": "101250509",
    "永兴": "101250510",
    "桂东": "101250511",
    "常德": "101250601",
    "安乡": "101250602",
    "桃源": "101250603",
    "汉寿": "101250604",
    "澧县": "101250605",
    "临澧": "101250606",
    "石门": "101250607",
    "益阳": "101250700",
    "赫山区": "101250701",
    "南县": "101250702",
    "桃江": "101250703",
    "安化": "101250704",
    "沅江": "101250705",
    "娄底": "101250801",
    "双峰": "101250802",
    "冷水江": "101250803",
    "冷水滩": "101250804",
    "新化": "101250805",
    "涟源": "101250806",
    "邵阳": "101250901",
    "隆回": "101250902",
    "洞口": "101250903",
    "新邵": "101250904",
    "邵东": "101250905",
    "绥宁": "101250906",
    "新宁": "101250907",
    "武冈": "101250908",
    "城步": "101250909",
    "邵阳县": "101250910",
    "岳阳": "101251001",
    "华容": "101251002",
    "湘阴": "101251003",
    "汨罗": "101251004",
    "平江": "101251005",
    "临湘": "101251006",
    "张家界": "101251101",
    "桑植": "101251102",
    "慈利": "101251103",
    "怀化": "101251201",
    "鹤城区": "101251202",
    "沅陵": "101251203",
    "辰溪": "101251204",
    "靖州": "101251205",
    "会同": "101251206",
    "通道": "101251207",
    "麻阳": "101251208",
    "新晃": "101251209",
    "芷江": "101251210",
    "溆浦": "101251211",
    "黔阳": "101251301",
    "洪江": "101251302",
    "永州": "101251401",
    "祁阳": "101251402",
    "东安": "101251403",
    "双牌": "101251404",
    "道县": "101251405",
    "宁远": "101251406",
    "江永": "101251407",
    "蓝山": "101251408",
    "新田": "101251409",
    "江华": "101251410",
    "吉首": "101251501",
    "保靖": "101251502",
    "永顺": "101251503",
    "古丈": "101251504",
    "凤凰": "101251505",
    "泸溪": "101251506",
    "龙山": "101251507",
    "花垣": "101251508",
    "贵阳": "101260101",
    "白云": "101260102",
    "花溪": "101260103",
    "乌当": "101260104",
    "息烽": "101260105",
    "开阳": "101260106",
    "修文": "101260107",
    "清镇": "101260108",
    "遵义": "101260201",
    "遵义县": "101260202",
    "仁怀": "101260203",
    "绥阳": "101260204",
    "湄潭": "101260205",
    "凤冈": "101260206",
    "桐梓": "101260207",
    "赤水": "101260208",
    "习水": "101260209",
    "道真": "101260210",
    "正安": "101260211",
    "务川": "101260212",
    "余庆": "101260213",
    "汇川": "101260214",
    "安顺": "101260301",
    "普定": "101260302",
    "镇宁": "101260303",
    "平坝": "101260304",
    "紫云": "101260305",
    "关岭": "101260306",
    "都匀": "101260401",
    "贵定": "101260402",
    "瓮安": "101260403",
    "长顺": "101260404",
    "福泉": "101260405",
    "惠水": "101260406",
    "龙里": "101260407",
    "罗甸": "101260408",
    "平塘": "101260409",
    "独山": "101260410",
    "三都": "101260411",
    "荔波": "101260412",
    "凯里": "101260501",
    "岑巩": "101260502",
    "施秉": "101260503",
    "镇远": "101260504",
    "黄平": "101260505",
    "黄平旧洲": "101260506",
    "麻江": "101260507",
    "丹寨": "101260508",
    "三穗": "101260509",
    "台江": "101260510",
    "剑河": "101260511",
    "雷山": "101260512",
    "黎平": "101260513",
    "天柱": "101260514",
    "锦屏": "101260515",
    "榕江": "101260516",
    "从江": "101260517",
    "炉山": "101260518",
    "铜仁": "101260601",
    "江口": "101260602",
    "玉屏": "101260603",
    "万山": "101260604",
    "思南": "101260605",
    "塘头": "101260606",
    "印江": "101260607",
    "石阡": "101260608",
    "沿河": "101260609",
    "德江": "101260610",
    "松桃": "101260611",
    "毕节": "101260701",
    "赫章": "101260702",
    "金沙": "101260703",
    "威宁": "101260704",
    "大方": "101260705",
    "纳雍": "101260706",
    "织金": "101260707",
    "六盘水": "101260801",
    "六枝": "101260802",
    "水城": "101260803",
    "盘县": "101260804",
    "黔西": "101260901",
    "晴隆": "101260902",
    "兴仁": "101260903",
    "贞丰": "101260904",
    "望谟": "101260905",
    "兴义": "101260906",
    "安龙": "101260907",
    "册亨": "101260908",
    "普安": "101260909",
    "成都": "101270101",
    "龙泉驿": "101270102",
    "新都": "101270103",
    "温江": "101270104",
    "金堂": "101270105",
    "双流": "101270106",
    "郫县": "101270107",
    "大邑": "101270108",
    "蒲江": "101270109",
    "新津": "101270110",
    "都江堰": "101270111",
    "彭州": "101270112",
    "邛崃": "101270113",
    "崇州": "101270114",
    "崇庆": "101270115",
    "彭县": "101270116",
    "攀枝花": "101270201",
    "仁和": "101270202",
    "米易": "101270203",
    "盐边": "101270204",
    "自贡": "101270301",
    "富顺": "101270302",
    "荣县": "101270303",
    "绵阳": "101270401",
    "三台": "101270402",
    "盐亭": "101270403",
    "安县": "101270404",
    "梓潼": "101270405",
    "北川": "101270406",
    "平武": "101270407",
    "江油": "101270408",
    "南充": "101270501",
    "南部": "101270502",
    "营山": "101270503",
    "蓬安": "101270504",
    "仪陇": "101270505",
    "西充": "101270506",
    "阆中": "101270507",
    "达州": "101270601",
    "宣汉": "101270602",
    "开江": "101270603",
    "大竹": "101270604",
    "渠县": "101270605",
    "万源": "101270606",
    "达川": "101270607",
    "遂宁": "101270701",
    "蓬溪": "101270702",
    "射洪": "101270703",
    "广安": "101270801",
    "岳池": "101270802",
    "武胜": "101270803",
    "邻水": "101270804",
    "华蓥山": "101270805",
    "巴中": "101270901",
    "通江": "101270902",
    "南江": "101270903",
    "平昌": "101270904",
    "泸州": "101271001",
    "泸县": "101271003",
    "合江": "101271004",
    "叙永": "101271005",
    "古蔺": "101271006",
    "纳溪": "101271007",
    "宜宾": "101271101",
    "宜宾农试站": "101271102",
    "宜宾县": "101271103",
    "南溪": "101271104",
    "江安": "101271105",
    "长宁": "101271106",
    "高县": "101271107",
    "珙县": "101271108",
    "筠连": "101271109",
    "兴文": "101271110",
    "屏山": "101271111",
    "内江": "101271201",
    "东兴": "101271202",
    "威远": "101271203",
    "资中": "101271204",
    "隆昌": "101271205",
    "资阳": "101271301",
    "安岳": "101271302",
    "乐至": "101271303",
    "简阳": "101271304",
    "乐山": "101271401",
    "犍为": "101271402",
    "井研": "101271403",
    "夹江": "101271404",
    "沐川": "101271405",
    "峨边": "101271406",
    "马边": "101271407",
    "峨眉": "101271408",
    "峨眉山": "101271409",
    "眉山": "101271501",
    "仁寿": "101271502",
    "彭山": "101271503",
    "洪雅": "101271504",
    "丹棱": "101271505",
    "青神": "101271506",
    "凉山": "101271601",
    "木里": "101271603",
    "盐源": "101271604",
    "德昌": "101271605",
    "会理": "101271606",
    "会东": "101271607",
    "宁南": "101271608",
    "普格": "101271609",
    "西昌": "101271610",
    "金阳": "101271611",
    "昭觉": "101271612",
    "喜德": "101271613",
    "冕宁": "101271614",
    "越西": "101271615",
    "甘洛": "101271616",
    "雷波": "101271617",
    "美姑": "101271618",
    "布拖": "101271619",
    "雅安": "101271701",
    "名山": "101271702",
    "荣经": "101271703",
    "汉源": "101271704",
    "石棉": "101271705",
    "天全": "101271706",
    "芦山": "101271707",
    "宝兴": "101271708",
    "甘孜": "101271801",
    "康定": "101271802",
    "泸定": "101271803",
    "丹巴": "101271804",
    "九龙": "101271805",
    "雅江": "101271806",
    "道孚": "101271807",
    "炉霍": "101271808",
    "新龙": "101271809",
    "德格": "101271810",
    "白玉": "101271811",
    "石渠": "101271812",
    "色达": "101271813",
    "理塘": "101271814",
    "巴塘": "101271815",
    "乡城": "101271816",
    "稻城": "101271817",
    "得荣": "101271818",
    "阿坝": "101271901",
    "汶川": "101271902",
    "理县": "101271903",
    "茂县": "101271904",
    "松潘": "101271905",
    "九寨沟": "101271906",
    "金川": "101271907",
    "小金": "101271908",
    "黑水": "101271909",
    "马尔康": "101271910",
    "壤塘": "101271911",
    "若尔盖": "101271912",
    "红原": "101271913",
    "南坪": "101271914",
    "德阳": "101272001",
    "中江": "101272002",
    "广汉": "101272003",
    "什邡": "101272004",
    "绵竹": "101272005",
    "罗江": "101272006",
    "广元": "101272101",
    "旺苍": "101272102",
    "青川": "101272103",
    "剑阁": "101272104",
    "苍溪": "101272105",
    "广州": "101280101",
    "番禺": "101280102",
    "从化": "101280103",
    "增城": "101280104",
    "花都": "101280105",
    "天河": "101280106",
    "韶关": "101280201",
    "乳源": "101280202",
    "始兴": "101280203",
    "翁源": "101280204",
    "乐昌": "101280205",
    "仁化": "101280206",
    "南雄": "101280207",
    "新丰": "101280208",
    "曲江": "101280209",
    "惠州": "101280301",
    "博罗": "101280302",
    "惠阳": "101280303",
    "惠东": "101280304",
    "龙门": "101280305",
    "梅州": "101280401",
    "兴宁": "101280402",
    "蕉岭": "101280403",
    "大埔": "101280404",
    "丰顺": "101280406",
    "平远": "101280407",
    "五华": "101280408",
    "梅县": "101280409",
    "汕头": "101280501",
    "潮阳": "101280502",
    "澄海": "101280503",
    "南澳": "101280504",
    "云澳": "101280505",
    "南澎岛": "101280506",
    "深圳": "101280601",
    "珠海": "101280701",
    "斗门": "101280702",
    "黄茅洲": "101280703",
    "佛山": "101280800",
    "顺德": "101280801",
    "三水": "101280802",
    "南海": "101280803",
    "肇庆": "101280901",
    "广宁": "101280902",
    "四会": "101280903",
    "德庆": "101280905",
    "怀集": "101280906",
    "封开": "101280907",
    "高要": "101280908",
    "湛江": "101281001",
    "吴川": "101281002",
    "雷州": "101281003",
    "徐闻": "101281004",
    "廉江": "101281005",
    "硇洲": "101281006",
    "遂溪": "101281007",
    "江门": "101281101",
    "开平": "101281103",
    "新会": "101281104",
    "恩平": "101281105",
    "台山": "101281106",
    "上川岛": "101281107",
    "鹤山": "101281108",
    "河源": "101281201",
    "紫金": "101281202",
    "连平": "101281203",
    "和平": "101281204",
    "龙川": "101281205",
    "清远": "101281301",
    "连南": "101281302",
    "连州": "101281303",
    "连山": "101281304",
    "阳山": "101281305",
    "佛冈": "101281306",
    "英德": "101281307",
    "云浮": "101281401",
    "罗定": "101281402",
    "新兴": "101281403",
    "郁南": "101281404",
    "潮州": "101281501",
    "饶平": "101281502",
    "东莞": "101281601",
    "中山": "101281701",
    "阳江": "101281801",
    "阳春": "101281802",
    "揭阳": "101281901",
    "揭西": "101281902",
    "普宁": "101281903",
    "惠来": "101281904",
    "茂名": "101282001",
    "高州": "101282002",
    "化州": "101282003",
    "电白": "101282004",
    "信宜": "101282005",
    "汕尾": "101282101",
    "海丰": "101282102",
    "陆丰": "101282103",
    "遮浪": "101282104",
    "东沙岛": "101282105",
    "昆明": "101290101",
    "昆明农试站": "101290102",
    "东川": "101290103",
    "寻甸": "101290104",
    "晋宁": "101290105",
    "宜良": "101290106",
    "石林": "101290107",
    "呈贡": "101290108",
    "富民": "101290109",
    "嵩明": "101290110",
    "禄劝": "101290111",
    "安宁": "101290112",
    "太华山": "101290113",
    "河口": "101290114",
    "大理": "101290201",
    "云龙": "101290202",
    "漾鼻": "101290203",
    "永平": "101290204",
    "宾川": "101290205",
    "弥渡": "101290206",
    "祥云": "101290207",
    "魏山": "101290208",
    "剑川": "101290209",
    "洱源": "101290210",
    "鹤庆": "101290211",
    "南涧": "101290212",
    "红河": "101290301",
    "石屏": "101290302",
    "建水": "101290303",
    "弥勒": "101290304",
    "元阳": "101290305",
    "绿春": "101290306",
    "开远": "101290307",
    "个旧": "101290308",
    "蒙自": "101290309",
    "屏边": "101290310",
    "泸西": "101290311",
    "金平": "101290312",
    "曲靖": "101290401",
    "沾益": "101290402",
    "陆良": "101290403",
    "富源": "101290404",
    "马龙": "101290405",
    "师宗": "101290406",
    "罗平": "101290407",
    "会泽": "101290408",
    "宣威": "101290409",
    "保山": "101290501",
    "富宁": "101290502",
    "龙陵": "101290503",
    "施甸": "101290504",
    "昌宁": "101290505",
    "腾冲": "101290506",
    "文山": "101290601",
    "西畴": "101290602",
    "马关": "101290603",
    "麻栗坡": "101290604",
    "砚山": "101290605",
    "邱北": "101290606",
    "广南": "101290607",
    "玉溪": "101290701",
    "澄江": "101290702",
    "江川": "101290703",
    "通海": "101290704",
    "华宁": "101290705",
    "新平": "101290706",
    "易门": "101290707",
    "峨山": "101290708",
    "元江": "101290709",
    "楚雄": "101290801",
    "大姚": "101290802",
    "元谋": "101290803",
    "姚安": "101290804",
    "牟定": "101290805",
    "南华": "101290806",
    "武定": "101290807",
    "禄丰": "101290808",
    "双柏": "101290809",
    "永仁": "101290810",
    "普洱": "101290901",
    "景谷": "101290902",
    "景东": "101290903",
    "澜沧": "101290904",
    "普洱": "101290905",
    "墨江": "101290906",
    "江城": "101290907",
    "孟连": "101290908",
    "西盟": "101290909",
    "镇源": "101290910",
    "镇沅": "101290911",
    "宁洱": "101290912",
    "昭通": "101291001",
    "鲁甸": "101291002",
    "彝良": "101291003",
    "镇雄": "101291004",
    "威信": "101291005",
    "巧家": "101291006",
    "绥江": "101291007",
    "永善": "101291008",
    "盐津": "101291009",
    "大关": "101291010",
    "临沧": "101291101",
    "沧源": "101291102",
    "耿马": "101291103",
    "双江": "101291104",
    "凤庆": "101291105",
    "永德": "101291106",
    "云县": "101291107",
    "镇康": "101291108",
    "怒江": "101291201",
    "福贡": "101291203",
    "兰坪": "101291204",
    "泸水": "101291205",
    "六库": "101291206",
    "贡山": "101291207",
    "香格里拉": "101291301",
    "德钦": "101291302",
    "维西": "101291303",
    "中甸": "101291304",
    "丽江": "101291401",
    "永胜": "101291402",
    "华坪": "101291403",
    "宁蒗": "101291404",
    "德宏": "101291501",
    "潞江坝": "101291502",
    "陇川": "101291503",
    "盈江": "101291504",
    "畹町镇": "101291505",
    "瑞丽": "101291506",
    "梁河": "101291507",
    "潞西": "101291508",
    "景洪": "101291601",
    "大勐龙": "101291602",
    "勐海": "101291603",
    "景洪电站": "101291604",
    "勐腊": "101291605",
    "南宁": "101300101",
    "南宁城区": "101300102",
    "邕宁": "101300103",
    "横县": "101300104",
    "隆安": "101300105",
    "马山": "101300106",
    "上林": "101300107",
    "武鸣": "101300108",
    "宾阳": "101300109",
    "硕龙": "101300110",
    "崇左": "101300201",
    "天等": "101300202",
    "龙州": "101300203",
    "凭祥": "101300204",
    "大新": "101300205",
    "扶绥": "101300206",
    "宁明": "101300207",
    "海渊": "101300208",
    "柳州": "101300301",
    "柳城": "101300302",
    "沙塘": "101300303",
    "鹿寨": "101300304",
    "柳江": "101300305",
    "融安": "101300306",
    "融水": "101300307",
    "三江": "101300308",
    "来宾": "101300401",
    "忻城": "101300402",
    "金秀": "101300403",
    "象州": "101300404",
    "武宣": "101300405",
    "桂林": "101300501",
    "桂林农试站": "101300502",
    "龙胜": "101300503",
    "永福": "101300504",
    "临桂": "101300505",
    "兴安": "101300506",
    "灵川": "101300507",
    "全州": "101300508",
    "灌阳": "101300509",
    "阳朔": "101300510",
    "恭城": "101300511",
    "平乐": "101300512",
    "荔浦": "101300513",
    "资源": "101300514",
    "梧州": "101300601",
    "藤县": "101300602",
    "太平": "101300603",
    "苍梧": "101300604",
    "蒙山": "101300605",
    "岑溪": "101300606",
    "贺州": "101300701",
    "昭平": "101300702",
    "富川": "101300703",
    "钟山": "101300704",
    "信都": "101300705",
    "贵港": "101300801",
    "桂平": "101300802",
    "平南": "101300803",
    "玉林": "101300901",
    "博白": "101300902",
    "北流": "101300903",
    "容县": "101300904",
    "陆川": "101300905",
    "百色": "101301001",
    "那坡": "101301002",
    "田阳": "101301003",
    "德保": "101301004",
    "靖西": "101301005",
    "田东": "101301006",
    "平果": "101301007",
    "隆林": "101301008",
    "西林": "101301009",
    "乐业": "101301010",
    "凌云": "101301011",
    "田林": "101301012",
    "钦州": "101301101",
    "浦北": "101301102",
    "灵山": "101301103",
    "河池": "101301201",
    "天峨": "101301202",
    "东兰": "101301203",
    "巴马": "101301204",
    "环江": "101301205",
    "罗城": "101301206",
    "宜州": "101301207",
    "凤山": "101301208",
    "南丹": "101301209",
    "都安": "101301210",
    "北海": "101301301",
    "合浦": "101301302",
    "涠洲岛": "101301303",
    "防城港": "101301401",
    "上思": "101301402",
    "东兴": "101301403",
    "板栏": "101301404",
    "防城": "101301405",
    "海口": "101310101",
    "琼山": "101310102",
    "三亚": "101310201",
    "东方": "101310202",
    "临高": "101310203",
    "澄迈": "101310204",
    "儋州": "101310205",
    "昌江": "101310206",
    "白沙": "101310207",
    "琼中": "101310208",
    "定安": "101310209",
    "屯昌": "101310210",
    "琼海": "101310211",
    "文昌": "101310212",
    "清兰": "101310213",
    "保亭": "101310214",
    "万宁": "101310215",
    "陵水": "101310216",
    "西沙": "101310217",
    "珊瑚岛": "101310218",
    "永署礁": "101310219",
    "南沙岛": "101310220",
    "乐东": "101310221",
    "五指山": "101310222",
    "通什": "101310223",
    "香港": "101320101",
    "九龙": "101320102",
    "新界": "101320103",
    "中环": "101320104",
    "铜锣湾": "101320105",
    "澳门": "101330101",
    "台北县": "101340101",
    "台北市": "101340102",
    "高雄": "101340201",
    "东港": "101340202",
    "大武": "101340203",
    "恒春": "101340204",
    "兰屿": "101340205",
    "台南": "101340301",
    "台中": "101340401",
    "桃园": "101340501",
    "新竹县": "101340601",
    "新竹市": "101340602",
    "公馆": "101340603",
    "宜兰": "101340701",
    "马公": "101340801",
    "东吉屿": "101340802",
    "嘉义": "101340901",
    "阿里山": "101340902",
    "玉山": "101340903",
    "新港": "101340904"
};
//天气GET
Blockly.Arduino.forBlock['WeatherGet'] = function () {
    var data = this.getFieldValue('data');
    var CityCode = WeatherCity[data];
    Blockly.Arduino.definitions_['include_Weather_Forcast'] = '#include <Weather_Forcast.h>';
    Blockly.Arduino.definitions_['var_declare_Weather_Forcast'] = 'Weather_Forcast Weather;';
    if (CityCode) {
        this.setFieldValue('ok', "check");
    } else {
        CityCode = 'error';
        this.setFieldValue('error', "check");
    }

    var code = "Weather.RefreshData(\"" + CityCode + "\")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//获取当天天气
Blockly.Arduino.forBlock['WeatherGetToday'] = function () {
    var type = this.getFieldValue('type');
    var code = "Weather.getToday(" + type + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//获取预报天气
Blockly.Arduino.forBlock['WeatherGetForecast'] = function () {
    var type = this.getFieldValue('type');
    var date = Blockly.Arduino.valueToCode(this, 'date', Blockly.Arduino.ORDER_ATOMIC);
    var code = "Weather.get" + type + "(" + date + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

const CITYS_DATA = {
    "本地": {
        "-": {
            "pinyin": "ip"
        }
    },
    "北京": {
        "-": {
            "pinyin": "beijing"
        }
    },
    "天津": {
        "-": {
            "pinyin": "tianjin"
        }
    },
    "河北": {
        "石家庄": {
            "pinyin": "shijiazhuang"
        },
        "邯郸": {
            "pinyin": "handan"
        },
        "邢台": {
            "pinyin": "xingtai"
        },
        "衡水": {
            "pinyin": "hengshui"
        },
        "保定": {
            "pinyin": "baoding"
        },
        "沧州": {
            "pinyin": "cangzhou"
        },
        "张家口": {
            "pinyin": "zhangjiakou"
        },
        "廊坊": {
            "pinyin": "langfang"
        },
        "承德": {
            "pinyin": "chengde"
        },
        "唐山": {
            "pinyin": "tangshan"
        },
        "秦皇岛": {
            "pinyin": "qinhuangdao"
        }
    },
    "山西": {
        "太原": {
            "pinyin": "taiyuan"
        },
        "运城": {
            "pinyin": "yuncheng"
        },
        "临汾": {
            "pinyin": "linfen"
        },
        "吕梁": {
            "pinyin": "lvliang"
        },
        "朔州": {
            "pinyin": "shuozhou"
        },
        "晋城": {
            "pinyin": "jincheng"
        },
        "长治": {
            "pinyin": "changzhi"
        },
        "晋中": {
            "pinyin": "jinzhong"
        },
        "阳泉": {
            "pinyin": "yangquan"
        },
        "忻州": {
            "pinyin": "xinzhou"
        },
        "大同": {
            "pinyin": "datong"
        }
    },
    "内蒙古": {
        "呼和浩特": {
            "pinyin": "huhehaote"
        },
        "阿左旗": {
            "pinyin": "azuoqi"
        },
        "乌海": {
            "pinyin": "wuhai"
        },
        "临河": {
            "pinyin": "linhe"
        },
        "鄂尔多斯": {
            "pinyin": "eerduosi"
        },
        "包头": {
            "pinyin": "baotou"
        },
        "集宁": {
            "pinyin": "jining"
        },
        "锡林浩特": {
            "pinyin": "xilinhaote"
        },
        "赤峰": {
            "pinyin": "chifeng"
        },
        "通辽": {
            "pinyin": "tongliao"
        },
        "乌兰浩特": {
            "pinyin": "wulanhaote"
        },
        "海拉尔": {
            "pinyin": "hailaer"
        }
    },
    "辽宁": {
        "沈阳": {
            "pinyin": "shenyang"
        },
        "大连": {
            "pinyin": "dalian"
        },
        "葫芦岛": {
            "pinyin": "huludao"
        },
        "朝阳": {
            "pinyin": "chaoyang"
        },
        "营口": {
            "pinyin": "yingkou"
        },
        "锦州": {
            "pinyin": "jinzhou"
        },
        "盘锦": {
            "pinyin": "panjin"
        },
        "阜新": {
            "pinyin": "fuxin"
        },
        "鞍山": {
            "pinyin": "anshan"
        },
        "辽阳": {
            "pinyin": "liaoyang"
        },
        "丹东": {
            "pinyin": "dandong"
        },
        "本溪": {
            "pinyin": "benxi"
        },
        "抚顺": {
            "pinyin": "fushun"
        },
        "铁岭": {
            "pinyin": "tieling"
        }
    },
    "吉林": {
        "长春": {
            "pinyin": "changchun"
        },
        "通化": {
            "pinyin": "tonghua"
        },
        "白山": {
            "pinyin": "baishan"
        },
        "辽源": {
            "pinyin": "liaoyuan"
        },
        "四平": {
            "pinyin": "siping"
        },
        "吉林": {
            "pinyin": "jilin"
        },
        "延吉": {
            "pinyin": "yanji"
        },
        "白城": {
            "pinyin": "baicheng"
        },
        "松原": {
            "pinyin": "songyuan"
        }
    },
    "黑龙江": {
        "哈尔滨": {
            "pinyin": "haerbin"
        },
        "牡丹江": {
            "pinyin": "mudanjiang"
        },
        "大庆": {
            "pinyin": "daqing"
        },
        "齐齐哈尔": {
            "pinyin": "qiqihaer"
        },
        "绥化": {
            "pinyin": "suihua"
        },
        "伊春": {
            "pinyin": "yichun"
        },
        "大兴安岭": {
            "pinyin": "daxinganling"
        },
        "黑河": {
            "pinyin": "heihe"
        },
        "鸡西": {
            "pinyin": "jixi"
        },
        "七台河": {
            "pinyin": "qitaihe"
        },
        "佳木斯": {
            "pinyin": "jiamusi"
        },
        "鹤岗": {
            "pinyin": "hegang"
        },
        "双鸭山": {
            "pinyin": "shuangyashan"
        }
    },
    "上海": {
        "-": {
            "pinyin": "shanghai"
        }
    },
    "江苏": {
        "南京": {
            "pinyin": "nanjing"
        },
        "镇江": {
            "pinyin": "zhenjiang"
        },
        "苏州": {
            "pinyin": "suzhou"
        },
        "无锡": {
            "pinyin": "wuxi"
        },
        "常州": {
            "pinyin": "changzhou"
        },
        "南通": {
            "pinyin": "nantong"
        },
        "扬州": {
            "pinyin": "yangzhou"
        },
        "淮安": {
            "pinyin": "huaian"
        },
        "泰州": {
            "pinyin": "taizhou"
        },
        "盐城": {
            "pinyin": "yancheng"
        },
        "徐州": {
            "pinyin": "xuzhou"
        },
        "宿迁": {
            "pinyin": "suqian"
        },
        "连云港": {
            "pinyin": "lianyungang"
        }
    },
    "浙江": {
        "杭州": {
            "pinyin": "hangzhou"
        },
        "温州": {
            "pinyin": "wenzhou"
        },
        "衢州": {
            "pinyin": "quzhou"
        },
        "丽水": {
            "pinyin": "lishui"
        },
        "金华": {
            "pinyin": "jinhua"
        },
        "绍兴": {
            "pinyin": "shaoxing"
        },
        "湖州": {
            "pinyin": "huzhou"
        },
        "嘉兴": {
            "pinyin": "jiaxing"
        },
        "台州": {
            "pinyin": "taizhou"
        },
        "宁波": {
            "pinyin": "ningbo"
        },
        "舟山": {
            "pinyin": "zhoushan"
        }
    },
    "安徽": {
        "合肥": {
            "pinyin": "hefei"
        },
        "安庆": {
            "pinyin": "anqing"
        },
        "池州": {
            "pinyin": "chizhou"
        },
        "铜陵": {
            "pinyin": "tongling"
        },
        "六安": {
            "pinyin": "luan"
        },
        "阜阳": {
            "pinyin": "fuyang"
        },
        "淮南": {
            "pinyin": "huainan"
        },
        "蚌埠": {
            "pinyin": "bengbu"
        },
        "宿州": {
            "pinyin": "suzhou"
        },
        "黄山": {
            "pinyin": "huangshan"
        },
        "宣城": {
            "pinyin": "xuancheng"
        },
        "芜湖": {
            "pinyin": "wuhu"
        },
        "马鞍山": {
            "pinyin": "maanshan"
        },
        "滁州": {
            "pinyin": "chuzhou"
        },
        "亳州": {
            "pinyin": "bozhou"
        },
        "淮北": {
            "pinyin": "huaibei"
        }
    },
    "福建": {
        "福州": {
            "pinyin": "fuzhou"
        },
        "漳州": {
            "pinyin": "zhangzhou"
        },
        "厦门": {
            "pinyin": "xiamen"
        },
        "龙岩": {
            "pinyin": "longyan"
        },
        "三明": {
            "pinyin": "sanming"
        },
        "泉州": {
            "pinyin": "quanzhou"
        },
        "莆田": {
            "pinyin": "putian"
        },
        "南平": {
            "pinyin": "nanping"
        },
        "宁德": {
            "pinyin": "ningde"
        }
    },
    "江西": {
        "南昌": {
            "pinyin": "nanchang"
        },
        "赣州": {
            "pinyin": "ganzhou"
        },
        "萍乡": {
            "pinyin": "pingxiang"
        },
        "吉安": {
            "pinyin": "jian"
        },
        "宜春": {
            "pinyin": "yichun"
        },
        "新余": {
            "pinyin": "xinyu"
        },
        "抚州": {
            "pinyin": "fuzhou"
        },
        "鹰潭": {
            "pinyin": "yingtan"
        },
        "上饶": {
            "pinyin": "shangrao"
        },
        "景德镇": {
            "pinyin": "jingdezhen"
        },
        "九江": {
            "pinyin": "jiujiang"
        }
    },
    "山东": {
        "济南": {
            "pinyin": "jinan"
        },
        "枣庄": {
            "pinyin": "zaozhuang"
        },
        "菏泽": {
            "pinyin": "heze"
        },
        "济宁": {
            "pinyin": "jining"
        },
        "聊城": {
            "pinyin": "liaocheng"
        },
        "泰安": {
            "pinyin": "taian"
        },
        "莱芜": {
            "pinyin": "laiwu"
        },
        "德州": {
            "pinyin": "dezhou"
        },
        "淄博": {
            "pinyin": "zibo"
        },
        "滨州": {
            "pinyin": "binzhou"
        },
        "临沂": {
            "pinyin": "linyi"
        },
        "日照": {
            "pinyin": "rizhao"
        },
        "青岛": {
            "pinyin": "qingdao"
        },
        "潍坊": {
            "pinyin": "weifang"
        },
        "东营": {
            "pinyin": "dongying"
        },
        "烟台": {
            "pinyin": "yantai"
        },
        "威海": {
            "pinyin": "weihai"
        }
    },
    "河南": {
        "郑州": {
            "pinyin": "zhengzhou"
        },
        "三门峡": {
            "pinyin": "sanmenxia"
        },
        "洛阳": {
            "pinyin": "luoyang"
        },
        "信阳": {
            "pinyin": "xinyang"
        },
        "南阳": {
            "pinyin": "nanyang"
        },
        "驻马店": {
            "pinyin": "zhumadian"
        },
        "漯河": {
            "pinyin": "luohe"
        },
        "周口": {
            "pinyin": "zhoukou"
        },
        "平顶山": {
            "pinyin": "pingdingshan"
        },
        "许昌": {
            "pinyin": "xuchang"
        },
        "济源": {
            "pinyin": "jiyuan"
        },
        "开封": {
            "pinyin": "kaifeng"
        },
        "焦作": {
            "pinyin": "jiaozuo"
        },
        "新乡": {
            "pinyin": "xinxiang"
        },
        "鹤壁": {
            "pinyin": "hebi"
        },
        "濮阳": {
            "pinyin": "puyang"
        },
        "安阳": {
            "pinyin": "anyang"
        },
        "商丘": {
            "pinyin": "shangqiu"
        }
    },
    "湖北": {
        "武汉": {
            "pinyin": "wuhan"
        },
        "恩施": {
            "pinyin": "enshi"
        },
        "宜昌": {
            "pinyin": "yichang"
        },
        "荆州": {
            "pinyin": "jingzhou"
        },
        "神农架": {
            "pinyin": "shennongjia"
        },
        "荆门": {
            "pinyin": "jingmen"
        },
        "襄阳": {
            "pinyin": "xiangyang"
        },
        "十堰": {
            "pinyin": "shiyan"
        },
        "潜江": {
            "pinyin": "qianjiang"
        },
        "天门": {
            "pinyin": "tianmen"
        },
        "仙桃": {
            "pinyin": "xiantao"
        },
        "咸宁": {
            "pinyin": "xianning"
        },
        "黄石": {
            "pinyin": "huangshi"
        },
        "孝感": {
            "pinyin": "xiaogan"
        },
        "鄂州": {
            "pinyin": "ezhou"
        },
        "黄冈": {
            "pinyin": "huanggang"
        },
        "随州": {
            "pinyin": "suizhou"
        }
    },
    "湖南": {
        "长沙": {
            "pinyin": "changsha"
        },
        "永州": {
            "pinyin": "yongzhou"
        },
        "怀化": {
            "pinyin": "huaihua"
        },
        "邵阳": {
            "pinyin": "shaoyang"
        },
        "娄底": {
            "pinyin": "loudi"
        },
        "吉首": {
            "pinyin": "jishou"
        },
        "张家界": {
            "pinyin": "zhangjiajie"
        },
        "益阳": {
            "pinyin": "yiyang"
        },
        "常德": {
            "pinyin": "changde"
        },
        "郴州": {
            "pinyin": "chenzhou"
        },
        "衡阳": {
            "pinyin": "hengyang"
        },
        "湘潭": {
            "pinyin": "xiangtan"
        },
        "株洲": {
            "pinyin": "zhuzhou"
        },
        "岳阳": {
            "pinyin": "yueyang"
        }
    },
    "广东": {
        "广州": {
            "pinyin": "guangzhou"
        },
        "湛江": {
            "pinyin": "zhanjiang"
        },
        "茂名": {
            "pinyin": "maoming"
        },
        "阳江": {
            "pinyin": "yangjiang"
        },
        "珠海": {
            "pinyin": "zhuhai"
        },
        "云浮": {
            "pinyin": "yunfu"
        },
        "肇庆": {
            "pinyin": "zhaoqing"
        },
        "江门": {
            "pinyin": "jiangmen"
        },
        "佛山": {
            "pinyin": "foshan"
        },
        "中山": {
            "pinyin": "zhongshan"
        },
        "东莞": {
            "pinyin": "dongguan"
        },
        "清远": {
            "pinyin": "qingyuan"
        },
        "深圳": {
            "pinyin": "shenzhen"
        },
        "惠州": {
            "pinyin": "huizhou"
        },
        "河源": {
            "pinyin": "heyuan"
        },
        "韶关": {
            "pinyin": "shaoguan"
        },
        "汕尾": {
            "pinyin": "shanwei"
        },
        "汕头": {
            "pinyin": "shantou"
        },
        "揭阳": {
            "pinyin": "jieyang"
        },
        "潮州": {
            "pinyin": "chaozhou"
        },
        "梅州": {
            "pinyin": "meizhou"
        }
    },
    "广西": {
        "南宁": {
            "pinyin": "nanning"
        },
        "崇左": {
            "pinyin": "chongzuo"
        },
        "防城港": {
            "pinyin": "fangchenggang"
        },
        "北海": {
            "pinyin": "beihai"
        },
        "钦州": {
            "pinyin": "qinzhou"
        },
        "百色": {
            "pinyin": "baise"
        },
        "贵港": {
            "pinyin": "guigang"
        },
        "来宾": {
            "pinyin": "laibin"
        },
        "河池": {
            "pinyin": "hechi"
        },
        "柳州": {
            "pinyin": "liuzhou"
        },
        "玉林": {
            "pinyin": "yulin"
        },
        "梧州": {
            "pinyin": "wuzhou"
        },
        "桂林": {
            "pinyin": "guilin"
        },
        "贺州": {
            "pinyin": "hezhou"
        }
    },
    "海南": {
        "海口": {
            "pinyin": "haikou"
        },
        "西沙": {
            "pinyin": "xisha"
        },
        "三亚": {
            "pinyin": "sanya"
        },
        "乐东": {
            "pinyin": "ledong"
        },
        "五指山": {
            "pinyin": "wuzhishan"
        },
        "东方": {
            "pinyin": "dongfang"
        },
        "昌江": {
            "pinyin": "changjiang"
        },
        "白沙": {
            "pinyin": "baisha"
        },
        "儋州": {
            "pinyin": "danzhou"
        },
        "保亭": {
            "pinyin": "baoting"
        },
        "陵水": {
            "pinyin": "lingshui"
        },
        "万宁": {
            "pinyin": "wanning"
        },
        "琼中": {
            "pinyin": "qiongzhong"
        },
        "屯昌": {
            "pinyin": "tunchang"
        },
        "琼海": {
            "pinyin": "qionghai"
        },
        "文昌": {
            "pinyin": "wenchang"
        },
        "临高": {
            "pinyin": "lingao"
        },
        "澄迈": {
            "pinyin": "chengmai"
        },
        "定安": {
            "pinyin": "dingan"
        },
        "南沙": {
            "pinyin": "nansha"
        },
        "中沙": {
            "pinyin": "wuzhishan"
        }
    },
    "重庆": {
        "-": {
            "pinyin": "chongqing"
        }
    },
    "四川": {
        "成都": {
            "pinyin": "chengdu"
        },
        "甘孜": {
            "pinyin": "ganzi"
        },
        "攀枝花": {
            "pinyin": "panzhihua"
        },
        "凉山": {
            "pinyin": "liangshan"
        },
        "雅安": {
            "pinyin": "yaan"
        },
        "乐山": {
            "pinyin": "leshan"
        },
        "眉山": {
            "pinyin": "meishan"
        },
        "宜宾": {
            "pinyin": "yibin"
        },
        "泸州": {
            "pinyin": "luzhou"
        },
        "自贡": {
            "pinyin": "zigong"
        },
        "资阳": {
            "pinyin": "ziyang"
        },
        "内江": {
            "pinyin": "neijiang"
        },
        "遂宁": {
            "pinyin": "suining"
        },
        "南充": {
            "pinyin": "nanchong"
        },
        "广安": {
            "pinyin": "guangan"
        },
        "阿坝": {
            "pinyin": "aba"
        },
        "德阳": {
            "pinyin": "deyang"
        },
        "绵阳": {
            "pinyin": "mianyang"
        },
        "巴中": {
            "pinyin": "bazhong"
        },
        "广元": {
            "pinyin": "guangyuan"
        },
        "达州": {
            "pinyin": "dazhou"
        }
    },
    "贵州": {
        "贵阳": {
            "pinyin": "guiyang"
        },
        "兴义": {
            "pinyin": "xingyi"
        },
        "水城": {
            "pinyin": "shuicheng"
        },
        "安顺": {
            "pinyin": "anshun"
        },
        "毕节": {
            "pinyin": "bijie"
        },
        "都匀": {
            "pinyin": "duyun"
        },
        "凯里": {
            "pinyin": "kaili"
        },
        "遵义": {
            "pinyin": "zunyi"
        },
        "铜仁": {
            "pinyin": "tongren"
        }
    },
    "云南": {
        "昆明": {
            "pinyin": "kunming"
        },
        "景洪": {
            "pinyin": "jinghong"
        },
        "普洱": {
            "pinyin": "puer"
        },
        "临沧": {
            "pinyin": "lincang"
        },
        "德宏": {
            "pinyin": "dehong"
        },
        "保山": {
            "pinyin": "baoshan"
        },
        "怒江": {
            "pinyin": "nujiang"
        },
        "大理": {
            "pinyin": "dali"
        },
        "香格里拉": {
            "pinyin": "xianggelila"
        },
        "丽江": {
            "pinyin": "lijiang"
        },
        "红河": {
            "pinyin": "honghe"
        },
        "玉溪": {
            "pinyin": "yuxi"
        },
        "楚雄": {
            "pinyin": "chuxiong"
        },
        "文山": {
            "pinyin": "wenshan"
        },
        "曲靖": {
            "pinyin": "qujing"
        },
        "昭通": {
            "pinyin": "zhaotong"
        }
    },
    "西藏": {
        "拉萨": {
            "pinyin": "lasa"
        },
        "阿里": {
            "pinyin": "ali"
        },
        "日喀则": {
            "pinyin": "rikaze"
        },
        "山南": {
            "pinyin": "shannan"
        },
        "林芝": {
            "pinyin": "linzhi"
        },
        "那曲": {
            "pinyin": "naqu"
        },
        "昌都": {
            "pinyin": "changdu"
        }
    },
    "陕西": {
        "西安": {
            "pinyin": "xian"
        },
        "汉中": {
            "pinyin": "hanzhong"
        },
        "安康": {
            "pinyin": "ankang"
        },
        "宝鸡": {
            "pinyin": "baoji"
        },
        "杨凌": {
            "pinyin": "yangling"
        },
        "咸阳": {
            "pinyin": "xianyang"
        },
        "铜川": {
            "pinyin": "tongchuan"
        },
        "渭南": {
            "pinyin": "weinan"
        },
        "商洛": {
            "pinyin": "shangluo"
        },
        "延安": {
            "pinyin": "yanan"
        },
        "榆林": {
            "pinyin": "yulin"
        }
    },
    "甘肃": {
        "兰州": {
            "pinyin": "lanzhou"
        },
        "武都": {
            "pinyin": "wudu"
        },
        "张掖": {
            "pinyin": "zhangye"
        },
        "嘉峪关": {
            "pinyin": "jiayuguan"
        },
        "酒泉": {
            "pinyin": "jiuquan"
        },
        "合作": {
            "pinyin": "hezuo"
        },
        "临夏": {
            "pinyin": "linxia"
        },
        "天水": {
            "pinyin": "tianshui"
        },
        "定西": {
            "pinyin": "dingxi"
        },
        "白银": {
            "pinyin": "baiyin"
        },
        "平凉": {
            "pinyin": "pingliang"
        },
        "武威": {
            "pinyin": "wuwei"
        },
        "金昌": {
            "pinyin": "jinchang"
        },
        "庆阳": {
            "pinyin": "qingyang"
        }
    },
    "青海": {
        "西宁": {
            "pinyin": "xining"
        },
        "玉树": {
            "pinyin": "yushu"
        },
        "格尔木": {
            "pinyin": "geermu"
        },
        "果洛": {
            "pinyin": "guoluo"
        },
        "海南": {
            "pinyin": "hainan"
        },
        "海西": {
            "pinyin": "haixi"
        },
        "海北": {
            "pinyin": "haibei"
        },
        "黄南": {
            "pinyin": "huangnan"
        },
        "海东": {
            "pinyin": "haidong"
        }
    },
    "宁夏": {
        "银川": {
            "pinyin": "yinchuan"
        },
        "固原": {
            "pinyin": "guyuan"
        },
        "中卫": {
            "pinyin": "zhongwei"
        },
        "吴忠": {
            "pinyin": "wuzhong"
        },
        "石嘴山": {
            "pinyin": "shizuishan"
        }
    },
    "新疆": {
        "乌鲁木齐": {
            "pinyin": "wulumuqi"
        },
        "喀什": {
            "pinyin": "kashi"
        },
        "阿图什": {
            "pinyin": "atushi"
        },
        "和田": {
            "pinyin": "hetian"
        },
        "阿拉尔": {
            "pinyin": "alaer"
        },
        "阿克苏": {
            "pinyin": "akesu"
        },
        "伊宁": {
            "pinyin": "yining"
        },
        "博乐": {
            "pinyin": "bole"
        },
        "库尔勒": {
            "pinyin": "kuerle"
        },
        "石河子": {
            "pinyin": "shihezi"
        },
        "吐鲁番": {
            "pinyin": "tulufan"
        },
        "昌吉": {
            "pinyin": "changji"
        },
        "五家渠": {
            "pinyin": "wujiaqu"
        },
        "塔城": {
            "pinyin": "tacheng"
        },
        "克拉玛依": {
            "pinyin": "kelamayi"
        },
        "阿勒泰": {
            "pinyin": "aletai"
        },
        "哈密": {
            "pinyin": "hami"
        }
    },
    "香港": {
        "-": {
            "pinyin": "hong kong"
        }
    },
    "澳门": {
        "-": {
            "pinyin": "macao"
        }
    },
    "台湾": {
        "台北": {
            "pinyin": "taipei"
        },
        "高雄": {
            "pinyin": "gaoxiong"
        },
        "台中": {
            "pinyin": "taizhong"
        }
    }
};

//网络天气
Blockly.Arduino.forBlock['china_city'] = function () {
    var a = this.getFieldValue("province");
    var b = this.getFieldValue("city");
    var code = "";
    try {
        code = '"' + CITYS_DATA[a][b].pinyin + '"';
    } catch (e) {
        console.log(e);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['weather_private_key'] = function () {
    var a = this.getFieldValue("key");
    var code = '"' + a + '"';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['weather_seniverse_city_weather'] = function () {
    var api = this.getFieldValue("api");
    var location = Blockly.Arduino.valueToCode(this, "location", Blockly.Arduino.ORDER_ATOMIC);
    var private_key = Blockly.Arduino.valueToCode(this, "private_key", Blockly.Arduino.ORDER_ATOMIC);
    //private_key = private_key.replace(/\"/g, "")
    var language = this.getFieldValue("language");
    var unit = this.getFieldValue("unit");

    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    Blockly.Arduino.definitions_['include_ESP8266_Seniverse'] = '#include <ESP8266_Seniverse.h>';

    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';

    switch (api) {
        case 'weather/now':
            Blockly.Arduino.definitions_['var_declare_weatherNow'] = 'WeatherNow weatherNow;';
            Blockly.Arduino.setups_['setup_seniverse_weatherNow'] = 'weatherNow.config(' + private_key + ', ' + location + ', "' + unit + '", "' + language + '");';
            break;
        case 'weather/daily':
            Blockly.Arduino.definitions_['var_declare_forecast'] = 'Forecast forecast;';
            Blockly.Arduino.setups_['setup_seniverse_forecast'] = 'forecast.config(' + private_key + ', ' + location + ', "' + unit + '", "' + language + '");';
            break;
        case 'life/suggestion':
        default:
            Blockly.Arduino.definitions_['var_declare_lifeInfo'] = 'LifeInfo lifeInfo;';
            Blockly.Arduino.setups_['setup_seniverse_lifeInfo'] = 'lifeInfo.config(' + private_key + ', ' + location + ', "' + unit + '", "' + language + '");';
    }
    var code = '';

    return code;
};

Blockly.Arduino.forBlock['weather_get_seniverse_weather_info'] = function () {
    var api = this.getFieldValue("api");
    var type = this.getFieldValue("type");
    var code = '';
    switch (api) {
        case 'weather/now':
            code = 'weatherNow.' + type + '()';
            break;
        case 'weather/daily':
            code = 'forecast.' + type + '()';
            break;
        case 'life/suggestion':
        default:
            code = 'lifeInfo.' + type + '()';
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['weather_get_seniverse_weather_info1'] = function () {
    var type = this.getFieldValue("type");
    var code = 'weatherNow.' + type + '()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['weather_get_seniverse_weather_info2'] = function () {
    var date = this.getFieldValue("date");
    var type = this.getFieldValue("type");
    var code = 'forecast.' + type + '(' + date + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['weather_get_seniverse_weather_info3'] = function () {
    var type = this.getFieldValue("type");
    var code = 'lifeInfo.' + type + '()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['mixio_mqtt_subscribe'] = function () {
    var server = Blockly.Arduino.valueToCode(this, 'server', Blockly.Arduino.ORDER_ATOMIC);
    var port = Blockly.Arduino.valueToCode(this, 'port', Blockly.Arduino.ORDER_ATOMIC);
    var mqtt_username = Blockly.Arduino.valueToCode(this, 'mqtt_username', Blockly.Arduino.ORDER_ATOMIC);
    var mqtt_password = Blockly.Arduino.valueToCode(this, 'mqtt_password', Blockly.Arduino.ORDER_ATOMIC);
    var project = Blockly.Arduino.valueToCode(this, 'project', Blockly.Arduino.ORDER_ATOMIC);
    port = port.replace(/\"/g, "")
    Blockly.Arduino.definitions_['include_PubSubClient'] = '#include <PubSubClient.h>\n';
    Blockly.Arduino.definitions_['var_declare_PubSubClient'] = 'const char *mqtt_broker = ' + server + ';\n'
        + 'const char *mqtt_username = ' + mqtt_username + ';\n'
        + 'const char *mqtt_password = ' + mqtt_password + ';\n'
        + 'const int mqtt_port = ' + port + ';\n'
        + 'String mqtt_topic = "";\n'
        + 'String mqtt_data = "";\n'
        + 'boolean mqtt_status = false;\n'
        + 'String project = ' + project + ';\n\n'

        + 'WiFiClient espClient;\n'
        + 'PubSubClient client(espClient);\n'

        + 'void callback(char *topic, byte *payload, unsigned int length) {\n'
        + '  String data = "";\n'
        + '  for (int i = 0; i < length; i++) {\n'
        + '    data = String(data) + String((char) payload[i]);\n'
        + '  }\n'
        + '  mqtt_topic = String(topic);\n'
        + '  mqtt_data = data;\n'
        + '  mqtt_status = true;\n'
        + '}\n';
    Blockly.Arduino.setups_['setups_PubSubClient'] = 'client.setServer(mqtt_broker, mqtt_port);\n'
        + 'client.setCallback(callback);\n'
        + 'while (!client.connected()) {\n'
        + '  String client_id = "esp-client-";\n'
        + '  client_id += String(WiFi.macAddress());\n'
        + '  Serial.printf("The client %s connects to the public mqtt broker\\n", client_id.c_str());\n'
        + '  if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {\n'
        + '    Serial.println("Public emqx mqtt broker connected");\n'
        + '    client.publish(String(String(mqtt_username) +"/"+ String(project) +"/"+ String("b640a0ce465fa2a4150c36b305c1c11b")).c_str(),String(client_id).c_str());\n'
        + '  } else {\n'
        + '    Serial.print("failed with state ");\n'
        + '    Serial.print(client.state());\n'
        + '    delay(2000);\n'
        + '  }\n'
        + '}\n';
    var code = 'client.loop();\n';
    return code;
};

Blockly.Arduino.forBlock['mixio_mqtt_subscribe_key'] = function () {
    var key = this.getFieldValue('key');
    var server = this.getFieldValue('server');
    Blockly.Arduino.definitions_['include_PubSubClient'] = '#include <PubSubClient.h>\n';
    Blockly.Arduino.definitions_['var_declare_PubSubClient'] = 'const char *mqtt_broker = "' + server + '";\n'
        + 'const char *mqtt_username = "MixIO_public";\n'
        + 'const char *mqtt_password = "MixIO_public";\n'
        + 'const int mqtt_port = 1883;\n'
        + 'String mqtt_topic = "";\n'
        + 'String mqtt_data = "";\n'
        + 'boolean mqtt_status = false;\n'
        + 'String project = "' + key + '";\n\n'

        + 'WiFiClient espClient;\n'
        + 'PubSubClient client(espClient);\n'

        + 'void callback(char *topic, byte *payload, unsigned int length) {\n'
        + '  String data = "";\n'
        + '  for (int i = 0; i < length; i++) {\n'
        + '    data = String(data) + String((char) payload[i]);\n'
        + '  }\n'
        + '  mqtt_topic = String(topic);\n'
        + '  mqtt_data = data;\n'
        + '  mqtt_status = true;\n'
        + '}\n';
    Blockly.Arduino.setups_['setups_PubSubClient'] = 'client.setServer(mqtt_broker, mqtt_port);\n'
        + 'client.setCallback(callback);\n'
        + 'while (!client.connected()) {\n'
        + '  String client_id = "esp-client-";\n'
        + '  client_id += String(WiFi.macAddress());\n'
        + '  Serial.printf("The client %s connects to the public mqtt broker\\n", client_id.c_str());\n'
        + '  if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {\n'
        + '    Serial.println("Public emqx mqtt broker connected");\n'
        + '    client.publish(String(String(mqtt_username) +"/"+ String(project) +"/"+ String("b640a0ce465fa2a4150c36b305c1c11b")).c_str(),String(client_id).c_str());\n'
        + '  } else {\n'
        + '    Serial.print("failed with state ");\n'
        + '    Serial.print(client.state());\n'
        + '    delay(2000);\n'
        + '  }\n'
        + '}\n';
    var code = 'client.loop();\n';
    return code;
};

Blockly.Arduino.forBlock['mixio_mqtt_publish'] = function () {
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
    var topic = Blockly.Arduino.valueToCode(this, 'topic', Blockly.Arduino.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    if (mode == 1) {
        var code = 'client.publish(String(String(mqtt_username) +"/"+ String(project) +"/"+ String(' + topic + ')).c_str(),String(' + data + ').c_str());\n';
    }
    if (mode == 2) {
        var code = 'client.publish(String("MixIO/"+ String(project) +"/default/"+ String(' + topic + ')).c_str(),String(' + data + ').c_str());\n';
    }
    return code;
};

Blockly.Arduino.forBlock['mixio_mqtt_received_the_news'] = function () {
    var mode = this.getFieldValue('mode');
    var topic = Blockly.Arduino.valueToCode(this, 'topic', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    if (mode == 1) {
        Blockly.Arduino.setups_['setups_topic_' + topic + ''] = 'client.subscribe(String(String(mqtt_username) +"/"+ String(project) +"/"+ String(' + topic + ')).c_str());'
        var code = 'if (mqtt_status) {\n'
            + '  if (String(mqtt_topic).equals(String(String(mqtt_username) +"/"+ String(project) +"/"+ String(' + topic + ')))) {\n'
            + '  ' + branch + '\n'
            + '  mqtt_status = false;\n'
            + '  }\n'
            + '}\n'
    }
    if (mode == 2) {
        Blockly.Arduino.setups_['setups_topic_' + topic + ''] = 'client.subscribe(String("MixIO/"+ String(project) +"/default/"+ String(' + topic + ')).c_str());'
        var code = 'if (mqtt_status) {\n'
            + '  if (String(mqtt_topic).equals(String("MixIO/"+ String(project) +"/default/"+ String(' + topic + ')).c_str())) {\n'
            + '  ' + branch + '\n'
            + '  mqtt_status = false;\n'
            + '  }\n'
            + '}\n'
    }
    return code;
};

Blockly.Arduino.forBlock['asyncelegantota'] = function () {
    var board_type = Mixly.JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/))) {
        Blockly.Arduino.definitions_['include_ESPAsyncTCP'] = '#include <ESPAsyncTCP.h>';
    } else {
        Blockly.Arduino.definitions_['include_AsyncTCP'] = '#include <AsyncTCP.h>';
    }
    Blockly.Arduino.definitions_['include_ESPAsyncWebServer'] = '#include <ESPAsyncWebServer.h>';
    Blockly.Arduino.definitions_['include_AsyncElegantOTA'] = '#include <AsyncElegantOTA.h>\n';
    Blockly.Arduino.definitions_['var_AsyncWebServer'] = 'AsyncWebServer server(80);\n';
    Blockly.Arduino.setups_['setups_AsyncWebServer'] = 'AsyncElegantOTA.begin(&server);\n'
        + 'server.begin();\n';
    var code = '';
    return code;
}; 22