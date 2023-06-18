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

//GET请求
Blockly.Arduino.forBlock['http_get'] = function () {
    var api = Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'success');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
    Blockly.Arduino.definitions_['include_HTTPClient'] = '#include <HTTPClient.h>';
    var code = 'if (WiFi.status() == WL_CONNECTED) {\n'
        + '  HTTPClient http;\n'
        + '  http.begin(' + api + ');\n'
        + '  int httpCode = http.GET();\n'
        + '  if (httpCode > 0) {\n'
        + '    String Request_result = http.getString();\n'
        + '    ' + branch + '\n'
        + '  }\n'
        + '  else {\n'
        + '    ' + branch1 + '\n'
        + '  }\n'
        + '  http.end();\n'
        + '}\n';
    return code;
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
    Blockly.Arduino.definitions_['function_sendMessage'] = 'bool sendMessage(String _data) {\n'
        + '  char _msg[100];\n'
        + '  uint8_t _len = snprintf(_msg, 100, "%s", _data);\n'
        + '  return WifiEspNow.send(PEER_' + macName + ', reinterpret_cast<const uint8_t*>(_msg), _len);\n'
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
    Blockly.Arduino.setups_['setup_esp_now_send_' + macName] = `
  ok = WifiEspNow.addPeer(PEER_${macName}, 0, nullptr, WIFI_IF_STA);
  if (!ok) {
    Serial.println("WifiEspNow.addPeer() failed");
    ESP.restart();
  }`;
    var code = 'if (sendMessage(' + data + ')) {\n'
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