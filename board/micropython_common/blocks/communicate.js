'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140

Blockly.Blocks['communicate_i2c_onboard'] = {
    init: function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_LED_ON_BOARD+"I2C");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_i2c_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('SUB')
            .appendField("I2C " + Blockly.MIXLY_SETUP)
            .setCheck("var");
        
        this.appendValueInput("TX", Number)
            .appendField("SCL")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("RX", Number)
            .appendField("SDA")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT);    
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_FREQUENCY)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_INIT);
    }
};

Blockly.Blocks['communicate_i2c_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_RNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.LANG_MATH_BYTE);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['communicate_i2c_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_WNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_i2c_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_I2C_SCAN1+Blockly.MIXLY_ESP32_I2C_SCAN2)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_SCAN);
    }
}

Blockly.Blocks['communicate_spi_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_SPI_INIT);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_BEGIN);        
        this.appendValueInput('sck')
            .setCheck(Number)
            .appendField('SCK');
        this.appendValueInput('mosi')
            .setCheck(Number)
            .appendField('MOSI');
        this.appendValueInput('miso')
            .setCheck(Number)
            .appendField('MISO');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_INIT_TOOLTIP);   
    }
};

Blockly.Blocks['communicate_spi_set'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField("SPI")
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SETTING + Blockly.MIXLY_SERIAL_BEGIN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_SET);
    }
};

Blockly.Blocks['communicate_spi_buffer'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_SET+Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_BUFFER_SET);
    }
};

Blockly.Blocks['communicate_spi_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.LANG_MATH_BYTE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READ);
    }
}

Blockly.Blocks['communicate_spi_read_output'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.LANG_MATH_BYTE + ' ' + Blockly.MIXLY_ESP32_SPI_OUTPUT);
        this.appendValueInput('val')
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READ_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_readinto'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.MIXLY_SERIAL_READ + Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READINTO);
    }
}

Blockly.Blocks['communicate_spi_readinto_output'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.MIXLY_SERIAL_READ + Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.appendValueInput('val')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_SPI_OUTPUT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READINTO_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_WRITE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_WRITE);
    }
};

Blockly.Blocks['communicate_spi_write_readinto'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_WRITE)
            // .appendField(new Blockly.FieldDropdown([
            //     [Blockly.LANG_MATH_BYTE, "byte"],
            //     [Blockly.MIXLY_ESP32_SPI_BUFFER, "buffer"]
            // ]), "op");
        this.appendValueInput('val')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_BUFFER_READ);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_WRITE_READINTO);
    }
};

Blockly.Blocks.communicate_i2c_master_read = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("I2C");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_READ);
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.communicate_i2c_available = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("I2C");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_READ + Blockly.MIXLY_ESP32_SUCCESS);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_AVAILABLE);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_I2C_SLAVE_ONRECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['communicate_ow_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire '+Blockly.MIXLY_SETUP);
        this.appendValueInput('BUS')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_PIN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_INIT);
    }
};

Blockly.Blocks['communicate_ow_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_SCAN);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.MIXLY_ESP32_OW_SCAN);
    }
};

Blockly.Blocks['communicate_ow_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_READ);
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_READ);
    }
};

Blockly.Blocks['communicate_ow_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_WRITE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.LANG_MATH_STRING, "write"],
                [Blockly.LANG_MATH_BYTE, "writebyte"]
            ]), "op");
        this.appendValueInput('byte')
            .setCheck([Number,String]);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_WRITE);
    }
};

Blockly.Blocks['communicate_ow_select'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField('OneWire')
            .setCheck('var')
        this.appendValueInput('byte')
            .setCheck(String)
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET)
            .appendField("ROM");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_SELECT);
    }
};


Blockly.Blocks['communicate_ow_reset'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField('OneWire')
            .setCheck('var')
        this.appendDummyInput()
            .appendField(Blockly.blockpy_turtle_reset);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_RESET);
    }
};

Blockly.Blocks['communicate_ir_recv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('PIN')
            .appendField(Blockly.MIXLY_IR_RECEIVE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_ir_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('PIN')
            .appendField(Blockly.blynk_IOT_IR_SEND);
        this.appendValueInput('ADDR')
            .appendField(Blockly.MQTT_SERVER_ADD);    
        this.appendValueInput('SUB')
            .appendField(Blockly.OLED_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.blynk_IOT_IR_SEND_TOOLTIP);
    }
};

Blockly.Blocks['communicate_bluetooth_central_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField(MSG.catBLE)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(MSG.catEthernet_init + Blockly.MIXLY_MICROBIT_PY_STORAGE_AS+MSG.catBLE_UART);        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_peripheral_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField(MSG.catBLE)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(MSG.catEthernet_init + Blockly.MIXLY_MICROBIT_PY_STORAGE_AS+MSG.catBLE_HID);  
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);                
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_SCAN+MSG.catBLE);
        this.setOutput(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['communicate_bluetooth_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
            this.appendDummyInput()
            .appendField(Blockly.MIXLY_TEXT_JOIN + MSG.catBLE);   
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(MSG.catBLE+Blockly.MIXLY_SEND_DATA);   
        this.appendValueInput('data')
            .appendField(Blockly.Msg.HTML_BODY);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_is_connected'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(MSG.catBLE+Blockly.MIXLY_EMQX_IS_CONNECT);
        this.setOutput(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks["communicate_bluetooth_recv"] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")   
        this.appendValueInput('METHOD')
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_RECV)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO+Blockly.MIXLY_ESP32_ONENET_SUB);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

Blockly.Blocks["communicate_bluetooth_handle"] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")   
            .appendField(Blockly.MIXLY_BLE_HANDLE)
        this.appendValueInput('METHOD')
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_RECV)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO+Blockly.MIXLY_ESP32_ONENET_SUB);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

//espnow
Blockly.Blocks['communicate_espnow_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow '+Blockly.MIXLY_SETUP);
        this.appendValueInput('CHNL')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MP_ESPNOW_CHANNEL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MP_ESPNOW_INIT_TOOLTIP);
    }
};

Blockly.Blocks['network_espnow_mac'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_MAC);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_info'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_INFO);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_recv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_RECV);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["("+Blockly.MIXLY_ETHERNET_MAC_ADDRESS+", "+Blockly.OLED_STRING+")",""],
                [Blockly.MIXLY_ETHERNET_MAC_ADDRESS, "[0]"],
                [Blockly.OLED_STRING, "[1]"]
            ]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendValueInput('mac')
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_SEND_MAC);
        this.appendValueInput('content')
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_SEND);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MIXGO_ESPNOW_SEND_TOOLTIP);
    }
};

Blockly.Blocks["network_espnow_recv_handle"] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendValueInput('METHOD')
            .appendField(Blockly.MIXLY_EMQX_SET_METHOD);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

//radio
Blockly.Blocks['espnow_radio_channel'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO_INIT);
        this.appendValueInput('CHNL')
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MP_ESPNOW_RADIO_INIT_TOOLTIP);
    }
};

Blockly.Blocks['espnow_radio_on_off'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "True"],
                [Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "False"]
            ]), 'on_off')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.appendValueInput('send')
            .setCheck(String);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MIXGO_ESPNOW_SEND_TOOLTIP);
    }
};

Blockly.Blocks['espnow_radio_rec'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO)
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_RECV);        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_recv_msg'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO_RECEIVED_MSG);        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_recv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED);  
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['espnow_radio_recv_certain_msg'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED_CERTAIN)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput('on'), 'msg') 
            .appendField('"')
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks.lora_init = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('SUB')
            .appendField('Lora'+Blockly.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"SPI")
            .setCheck("var");
        this.appendValueInput('PINSUB')
            .appendField("CS")
        this.appendValueInput('frequency')
            .appendField(Blockly.MIXLY_FREQUENCY)    
        this.appendValueInput('rate')
            .appendField(Blockly.MIXLY_CODE_RATE)
        this.appendValueInput('factor')
            .appendField(Blockly.MIXLY_SPREADING_FACTOR)
        this.appendValueInput('power')
            .appendField(Blockly.MIXLY_TX_POWER)    
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SIGNAL_BANDWIDTH)
            .appendField(new Blockly.FieldDropdown([
                ['7800','7800'],
                ['10400','10400'],
                ['15600','15600'],
                ['20800','20800'],
                ['31250','31250'],
                ['41700','41700'],
                ['62500','62500'],
                ['125000','125000'],
                ['250000','250000'],
                ['500000','500000']
            ]), 'bandwidth')    
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_LORA_INIT_TOOLTIP);
    }
};

Blockly.Blocks['lora_packet'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('Lora ');        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET+Blockly.MIXLY_PACKAGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_SIGNAL_STRENGTH,'packet_rssi'],
                [Blockly.MIXLY_SIGNAL_NOISE_RATE,'packet_snr']               
            ]), 'key')        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['lora_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField('Lora ');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SEND_DATA);   
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['lora_recv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('Lora ');        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MIXGO_ESPNOW_RECV)
        this.setOutput(true,String);
        this.setInputsInline(true);
    }
};



Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
Blockly.Blocks.i2c_master_reader2 = Blockly.Blocks.communicate_i2c_master_read;
Blockly.Blocks.i2c_available = Blockly.Blocks.communicate_i2c_available;