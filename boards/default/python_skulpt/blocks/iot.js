'use strict';

goog.provide('Blockly.Blocks.iot');
goog.require('Blockly.Blocks');

Blockly.Msg['IOT_HUE'] = '#526FC3';
//'#2FAD7A';

Blockly.Blocks['iot_mixio_connect'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_CREATE_MQTT_CLIENT_AND_CONNECT);
    this.appendValueInput('SERVER')
        .setCheck(String)
        .appendField(Blockly.Msg.MIXLY_EMQX_SERVER)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput('USERNAME')
        .setCheck(String)
        .appendField(Blockly.Msg.MIXLY_WIFI_USERNAME)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput('PASSWORD')
        .setCheck(String)
        .appendField(Blockly.Msg.MIXLY_IOT_PASSWORD)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput('PROJECT')
        .setCheck(String)
        .appendField(Blockly.Msg.MIXLY_EMQX_PROJECT)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks['IOT_MIXIO_PUBLISH'] = {
    init: function () {
        this.setColour(Blockly.Msg['IOT_HUE']);
        this.appendDummyInput()
            .appendField("MixIO")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_NEW)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('MSG')
            .appendField(Blockly.Msg.HTML_BODY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_PUBLISH_TOOLTIP);
    }
};

Blockly.Blocks["IOT_MIXIO_SUBSCRIBE"] = {
    init: function () {
        this.setColour(Blockly.Msg['IOT_HUE']);
        this.appendDummyInput()
            .appendField("MixIO")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MIXLY_EMQX_SUBSCRIBE+Blockly.Msg.MIXLY_MICROBIT_MSG)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('METHOD')
            .appendField(Blockly.Msg.MIXLY_EMQX_SET_METHOD);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

Blockly.Blocks["IOT_MIXIO_UNSUBSCRIBE"] = {
    init: function () {
        this.setColour(Blockly.Msg['IOT_HUE']);
        this.appendDummyInput()
            .appendField("MixIO")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MSG.stop + Blockly.Msg.MIXLY_EMQX_SUBSCRIBE)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

Blockly.Blocks['iot_mixio_disconnect'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField("MixIO")
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_ESP32_DISCONNECT_ONENET);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
}
};

Blockly.Blocks['iot_mixio_connect_only'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField("MixIO")
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_EMQX_CONNECT);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
}
};

Blockly.Blocks['iot_mixio_check'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField("MixIO")
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_ESP32_CHECK_ONENET);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_CHECK_TOOLTIP);
}
};

Blockly.Blocks['iot_mixio_format_topic'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_MICROPYTHON_FORMAT)
        .appendField(Blockly.MQTT_Topic);
    this.setInputsInline(true);
    this.setOutput(true);
}
};

Blockly.Blocks['iot_mixio_format_msg'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_MICROPYTHON_FORMAT)
        .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_MSG);
    this.setInputsInline(true);
    this.setOutput(true);
}
};

Blockly.Blocks['IOT_FORMATTING'] = {
  init: function () {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.MIXLY_ESP32_IOT_MAP_FORMATING);
    this.setOutput(true);
    // this.setTooltip();
  }
};

 Blockly.Blocks['IOT_FORMAT_STRING'] = {
  init: function () {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.MIXLY_MICROPYTHON_FORMAT+'(Json)');
    this.setOutput(true);
    // this.setTooltip();
  }
};

Blockly.Blocks['IOT_EMQX_PING']={
    init: function() {
        this.setColour(Blockly.Msg['IOT_HUE']);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MixIO")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_EMQX_PING);   
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_PING_TOOLTIP);
    }
};

Blockly.Blocks['IOT_MIXIO_NTP']={
    init: function() {
        this.setColour(Blockly.Msg['IOT_HUE']);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MixIO")
            .appendField(Blockly.Msg.MIXLY_GET_NTP)
        this.appendValueInput('addr')
            .appendField(Blockly.blynk_SERVER_ADD);     
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks['IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_CREATE_MQTT_CLIENT_AND_CONNECT);
    this.appendValueInput('SERVER')
        .appendField(Blockly.Msg.MIXLY_EMQX_SERVER)
        .setAlign(Blockly.ALIGN_RIGHT);   
    this.appendValueInput('KEY')     
        .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+Blockly.Msg.MIXLY_MIXIO_SHARE_KEY)
        .setAlign(Blockly.ALIGN_RIGHT);   
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};


Blockly.Blocks['IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE'] = {
   init: function() {
    this.setColour(Blockly.Msg['IOT_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_CREATE_MQTT_CLIENT_AND_CONNECT);
    this.appendValueInput('SERVER')
        .appendField(Blockly.Msg.MIXLY_EMQX_SERVER)
        .setAlign(Blockly.ALIGN_RIGHT);    
    this.appendValueInput('KEY')     
        .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"Mixly Key")
        .setAlign(Blockly.ALIGN_RIGHT);       
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};


Blockly.Blocks['iot_mixly_key'] = {
  init: function() {
    this.VISITOR_ID = Mixly.Config.BOARD.visitorId.str32.substring(0, 8).toUpperCase();
    this.setColour(Blockly.Msg['FACTORY_HUE']);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldTextInput(this.visitorId), 'VISITOR_ID');
    this.setOutput(true, null);
  },
  onchange: function() {
    const nowVisitorId = this.getFieldValue('VISITOR_ID');
    if (this.VISITOR_ID !== nowVisitorId)
      this.setFieldValue(this.VISITOR_ID, 'VISITOR_ID');
  }
};
