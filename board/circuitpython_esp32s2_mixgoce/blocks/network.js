'use strict';

goog.provide('Blockly.Blocks.network');

goog.require('Blockly.Blocks');

Blockly.Blocks.network.HUE=225

Blockly.Blocks['iot_wifi_connect'] = {
   init: function() {
    this.setColour(225);
    this.appendDummyInput()
    	.appendField(Blockly.MIXLY_ESP32_IOT_CONNECT_WIFI);
    this.appendValueInput('WIFINAME')
    	.setCheck(String)
    	.appendField(Blockly.Msg.HTML_NAME);
    this.appendValueInput('PASSWORD')
    	.setCheck(String)
    	.appendField(Blockly.Msg.HTML_PASSWORD);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_ESP32_IOT_WIFI_CONNECT_TOOLTIP);
}
};

Blockly.Blocks['radio_ons'] = {
    init: function() {
        this.setColour(225);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON,'True'],[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF,'False']]), "type")
            .appendField(Blockly.MIXLY_MIXGOCE_NRF);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('type');
        var mode0 =Blockly.MIXLY_MIXGOCE_NRF;
        var TOOLTIPS = {
        'on':Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON,
        'off':Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF
      };
      return TOOLTIPS[mode]+mode0;
    });
    }
};

Blockly.Blocks['microbit_radio_config'] = {
  init : function () {
    this.jsonInit({
      "colour" : 225,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.config",
      "tooltip" : Blockly.MIXLY_MIXGOCE_SET_NRF1,
      "message0" : Blockly.MIXLY_MIXGOCE_SET_NRF,
      "args0" : [{
          "type" : "input_dummy"
        }, {
          "min" : 0,
          "value" : 76,
          "type" : "input_value",
          "max" : 125,
          "name" : "channel"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "power",         
          "type" : "input_value"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "address",
          "type" : "input_value"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "data_rate",
          "type" : "input_value"
        }
      ]
    });
  }
};

Blockly.Blocks['radio_init'] = {
    init:function(){
        this.setColour(225);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGOCE_NRF_INIT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_send_string'] = {
    init:function(){
        this.setColour(225);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGOCE_NRF_SEND);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
              [Blockly.MIXLY_MICROBIT_MSG,'send']]), "type")
        this.appendValueInput('data')
            // .setCheck(String)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_receive_string'] = {
    init:function(){
        this.setColour(225);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGOCE_NRF_RECEIVE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
              [Blockly.MIXLY_MICROBIT_MSG,'receive']]), "type")
        this.setOutput(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['network_socket_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_INIT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                ['TCP', "TCP"],
                ['UDP', "UDP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('mode');
        var mode0 = Blockly.MIXLY_ESP32_NETWORK_SOCKET_INIT_TOOLTIP
        var TOOLTIPS = {
        'TCP':'TCP',
        'UDP':'UDP',
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks['network_socket_bind'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_LET_SOCKET)
        this.appendValueInput('address')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_BIND_TO_ADDRESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_BIND_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_LET_SOCKET)
        this.appendValueInput('address')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_CONNECT_TO_ADDRESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_CONNECT_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_listen'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendValueInput('queue')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_LISTEN)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_QUEUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_LISTEN_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_accept'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_ACCEPT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_ACCEPT_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_receive'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
            // .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('content')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_SEND_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_receive_from'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_FROM_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_send_to'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
            // .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('content')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.appendValueInput('address')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_TO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_SEND_TO_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_close'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_CLOSE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_CLOSE_TOOLTIP);
    }
};

Blockly.Blocks['time_ntptime'] = {
    init: function() {
        this.setColour(Blockly.Blocks.network.HUE);        
        this.appendDummyInput("")
            .appendField(Blockly.NTP_server_get_time)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_ALL, "all"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_YEAR, "0"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_MONTH, "1"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_DATE, "2"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_HOUR, "3"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_MINUTE, "4"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_SECOND, "5"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_INWEEK, "6"]                
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};