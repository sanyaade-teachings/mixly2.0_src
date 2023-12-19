(() => {

'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');
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
  Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  Blockly.Arduino.definitions_['include_WifiEspNow'] = '#include <WifiEspNow.h>';
  const macName = macList.join('');
  Blockly.Arduino.definitions_['var_declare_PEER_' + macName] = 'uint8_t PEER_' + macName + '[] = {' + mac + '};\n';
  Blockly.Arduino.definitions_['function_sendMessage'] = 'bool sendMessage(uint8_t *macAddress, String _data) {\n'
    + '  bool ok = WifiEspNow.addPeer(macAddress);\n'
    + '  if (!ok) return false;\n'
    + '  uint16_t length = _data.length();\n'
    + '  char _msg[length];\n'
    + '  strcpy(_msg, _data.c_str());\n'
    + '  return WifiEspNow.send(macAddress, reinterpret_cast<const uint8_t*>(_msg), length);\n'
    + '}\n';
  Blockly.Arduino.setups_['setup_esp_now'] = `
  WiFi.persistent(false);
  WiFi.mode(WIFI_AP);
  WiFi.disconnect();
  WiFi.softAP("ESPNOW", nullptr, 3);
  WiFi.softAPdisconnect(false);

  Serial.print("当前设备MAC:");
  Serial.println(WiFi.softAPmacAddress());

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
  Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  Blockly.Arduino.definitions_['include_WifiEspNow'] = '#include <WifiEspNow.h>';
  Blockly.Arduino.definitions_['function_onMessageRecv'] = 'void OnMessageRecv(const uint8_t _mac[WIFIESPNOW_ALEN], const uint8_t* _buf, size_t _count, void* arg) {\n'
    + '  // Serial.printf("从MAC:%02X:%02X:%02X:%02X:%02X:%02X处收到数据\\n", _mac[0], _mac[1], _mac[2], _mac[3], _mac[4], _mac[5]);\n'
    + '  String message = "";\n'
    + '  for (int i = 0; i < static_cast<int>(_count); i++) {\n'
    + '    message += String(static_cast<char>(_buf[i]));\n'
    + '  }\n'
    + '  ' + branch + '\n'
    + '}\n';

  Blockly.Arduino.setups_['setup_esp_now_message_receive_cb'] = 'WifiEspNow.onReceive(OnMessageRecv, nullptr);';
  Blockly.Arduino.setups_['setup_esp_now'] = `
  WiFi.persistent(false);
  WiFi.mode(WIFI_AP);
  WiFi.disconnect();
  WiFi.softAP("ESPNOW", nullptr, 3);
  WiFi.softAPdisconnect(false);

  Serial.print("当前设备MAC:");
  Serial.println(WiFi.softAPmacAddress());

  bool ok = WifiEspNow.begin();
  if (!ok) {
    Serial.println("WifiEspNow初始化失败");
    ESP.restart();
  }`;
  var code = '';
  return code;
};

})();