'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');
Blockly.Arduino.forBlock['WIFI_info'] = function () {
    var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
    var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin(' + SSID + ', ' + PWD + ');\n'
        + '  while (WiFi.status() != WL_CONNECTED) {\n'
        + '    delay(500);\n'
        + '    Serial.print(".");\n'
        + '  }\n'
        + '  Serial.println("Local IP:");\n'
        + '  Serial.print(WiFi.localIP());\n'
    return "";
};

//esp_now发送数据
Blockly.Arduino.forBlock['esp_now_send'] = function () {
    var mac = Blockly.Arduino.valueToCode(this, 'mac', Blockly.Arduino.ORDER_ATOMIC);
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'success');
    //branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
    //branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    mac = mac.replaceAll('"', '');
    mac = mac.toUpperCase();
    const macList = mac.split(':');
    mac = macList.join(', 0x');
    mac = '0x' + mac;
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.definitions_['include_WifiEspNow'] = '#include <WifiEspNow.h>';
    const macName = macList.join('');
    Blockly.Arduino.definitions_['var_declare_PEER_' + macName] = 'uint8_t PEER_' + macName + '[] = {' + mac + '};\n';
    Blockly.Arduino.definitions_['function_sendMessage'] = 'bool sendMessage(uint8_t *macAddress, String _data) {\n'
        + '  bool ok = WifiEspNow.addPeer(macAddress, 0, nullptr, WIFI_IF_STA);\n'
        + '  if (!ok) return false;\n'
        + '  uint16_t length = _data.length();\n'
        + '  char _msg[length];\n'
        + '  strcpy(_msg, _data.c_str());\n'
        + '  return WifiEspNow.send(macAddress, reinterpret_cast<const uint8_t*>(_msg), length);\n'
        + '}\n';
    Blockly.Arduino.setups_['setup_esp_now'] = `
  WiFi.mode(WIFI_STA);

  Serial.print("当前设备MAC:");
  Serial.println(WiFi.macAddress());

  bool ok = WifiEspNow.begin();
  if (!ok) {
    Serial.println("WifiEspNow初始化失败");
    ESP.restart();
  }`;
    var code = `if (sendMessage(PEER_${macName}, ${data})) {\n`
        + branch
        + '} else {\n'
        + branch1
        + '}\n';
    return code;
};

//esp_now接收数据
Blockly.Arduino.forBlock['esp_now_receive'] = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'receive_data');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.definitions_['include_WifiEspNow'] = '#include <WifiEspNow.h>';
    Blockly.Arduino.definitions_['function_onMessageRecv'] = 'void OnMessageRecv(const uint8_t _mac[WIFIESPNOW_ALEN], const uint8_t* _buf, size_t _count, void* arg) {\n'
        + '  // Serial.printf("从MAC:%02X:%02X:%02X:%02X:%02X:%02X处收到数据\\n", _mac[0], _mac[1], _mac[2], _mac[3], _mac[4], _mac[5]);\n'
        + '  String myData = "";\n'
        + '  for (int i = 0; i < static_cast<int>(_count); i++) {\n'
        + '    myData += String(static_cast<char>(_buf[i]));\n'
        + '  }\n'
        + '  ' + branch + '\n'
        + '}\n';

    Blockly.Arduino.setups_['setup_esp_now_message_receive_cb'] = 'WifiEspNow.onReceive(OnMessageRecv, nullptr);';
    Blockly.Arduino.setups_['setup_esp_now'] = `
  WiFi.mode(WIFI_STA);

  Serial.print("当前设备MAC:");
  Serial.println(WiFi.macAddress());

  bool ok = WifiEspNow.begin();
  if (!ok) {
    Serial.println("WifiEspNow初始化失败");
    ESP.restart();
  }`;
    var code = '';
    return code;
};

Blockly.Arduino.forBlock['esp32_wifi_connection_event'] = function () {
    var type= this.getFieldValue('type');
    var branch = Blockly.Arduino.statementToCode(this, 'event');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    if(type==1)
  {
    Blockly.Arduino.definitions_['function_WiFiStationConnected'] = 'void WiFiStationConnected(WiFiEvent_t event, WiFiEventInfo_t info){\n'
        + '  ' + branch + '\n'
        + '}\n';

    Blockly.Arduino.setups_['esp32_wifi_WiFiStationConnected'] = 'WiFi.onEvent(WiFiStationConnected, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_CONNECTED);';
  }
    if(type==2)
  {
    Blockly.Arduino.definitions_['function_WiFiGotIP'] = 'void WiFiGotIP(WiFiEvent_t event, WiFiEventInfo_t info){\n'
        + '  ' + branch + '\n'
        + '}\n';

    Blockly.Arduino.setups_['esp32_wifi_WiFiGotIP'] = 'WiFi.onEvent(WiFiGotIP, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_GOT_IP);';
  }
    if(type==3)
  {
    Blockly.Arduino.definitions_['function_WiFiStationDisconnected'] = 'void WiFiStationDisconnected(WiFiEvent_t event, WiFiEventInfo_t info){\n'
        + '  ' + branch + '\n'
        + '}\n';

    Blockly.Arduino.setups_['esp32_wifi_WiFiStationDisconnected'] = 'WiFi.onEvent(WiFiStationDisconnected, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_DISCONNECTED);';
  }  

    var code = '';
    return code;
};
