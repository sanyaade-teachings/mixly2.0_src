(() => {

    goog.require('Blockly');
    goog.require('Mixly.Boards');

    const { Boards } = Mixly;

    /**
     * @name 模块名 Http GET请求 
     * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
     */
    Blockly.Arduino.forBlock['http_get'] = function () {
        const BOARD_TYPE = Boards.getType();
        const API = Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
        let branch = Blockly.Arduino.statementToCode(this, 'success') || '';
        branch = branch.replace(/(^\s*)|(\s*$)/g, "");
        let branch1 = Blockly.Arduino.statementToCode(this, 'failure') || '';
        branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
        let code = '';
        if (BOARD_TYPE == 'arduino_esp8266') {
            Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
            Blockly.Arduino.definitions_['include_ESP8266HTTPClient'] = '#include <ESP8266HTTPClient.h>';
            code
                = 'if (WiFi.status() == WL_CONNECTED) {\n'
                + '  WiFiClient client;\n'
                + '  HTTPClient http;\n'
                + '  http.begin(client, ' + API + ');\n'
                + '  int httpCode = http.GET();\n'
                + '  if (httpCode > 0) {\n'
                + '    String Request_result = http.getString();\n'
                + '    ' + branch + '\n'
                + '  } else {\n'
                + '    ' + branch1 + '\n'
                + '  }\n'
                + '  http.end();\n'
                + '}\n';
        } else {
            Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
            Blockly.Arduino.definitions_['include_HTTPClient'] = '#include <HTTPClient.h>';
            code
                = 'if (WiFi.status() == WL_CONNECTED) {\n'
                + '  HTTPClient http;\n'
                + '  http.begin(' + API + ');\n'
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
        }
        return code;
    };

    /**
     * @name 模块名 Http PATCH|POST|PUT请求
     * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
     */
    Blockly.Arduino.forBlock['http_post'] = function () {
        const BOARD_TYPE = Boards.getType();
        const FIELD_TYPE = this.getFieldValue("TYPE");
        const API = Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
        const DATA = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
        let branch = Blockly.Arduino.statementToCode(this, 'success') || '';
        branch = branch.replace(/(^\s*)|(\s*$)/g, "");
        let branch1 = Blockly.Arduino.statementToCode(this, 'failure') || '';
        branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
        let code = '';
        if (BOARD_TYPE == 'arduino_esp8266') {
            Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
            Blockly.Arduino.definitions_['include_ESP8266HTTPClient'] = '#include <ESP8266HTTPClient.h>';
            code
                = 'if (WiFi.status() == WL_CONNECTED) {\n'
                + '  HTTPClient http;\n'
                + '  WiFiClient client;\n'
                + '  http.begin(client, ' + API + ');\n'
                + '  http.addHeader("Content-Type", "application/json");\n'
                + '  int httpCode = http.' + FIELD_TYPE + '(' + DATA + ');\n'
                + '  if (httpCode > 0) {\n'
                + '    String Request_result = http.getString();\n'
                + '    ' + branch + '\n'
                + '  } else {\n'
                + '    ' + branch1 + '\n'
                + '  }\n'
                + '  http.end();\n'
                + '}\n';
        } else {
            Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
            Blockly.Arduino.definitions_['include_HTTPClient'] = '#include <HTTPClient.h>';
            code
                = 'if (WiFi.status() == WL_CONNECTED) {\n'
                + '  HTTPClient http;\n'
                + '  http.begin(' + API + ');\n'
                + '  http.addHeader("Content-Type", "application/json");\n'
                + '  int httpCode = http.' + FIELD_TYPE + '(' + DATA + ');\n'
                + '  if (httpCode > 0) {\n'
                + '    String Request_result = http.getString();\n'
                + '    ' + branch + '\n'
                + '  }\n'
                + '  else {\n'
                + '    ' + branch1 + '\n'
                + '  }\n'
                + '  http.end();\n'
                + '}\n';
        }
        return code;
    };

})();