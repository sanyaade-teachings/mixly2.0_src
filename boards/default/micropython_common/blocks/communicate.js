'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Msg['COMMUNICATE_HUE'] = 140

Blockly.Blocks['communicate_i2c_onboard'] = {
    init: function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LED_ON_BOARD+"I2C");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_spi_onboard'] = {
    init: function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LED_ON_BOARD+"SPI");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_i2c_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('SUB')
            .appendField("I2C " + Blockly.Msg.MIXLY_SETUP)
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
            .appendField(Blockly.Msg.MIXLY_FREQUENCY)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_I2C_INIT);
    }
};

Blockly.Blocks['communicate_i2c_read'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_RNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_BYTE);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['communicate_i2c_write'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_WNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_i2c_scan'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_I2C_SCAN1+Blockly.Msg.MIXLY_ESP32_I2C_SCAN2)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_I2C_SCAN);
    }
}

Blockly.Blocks['communicate_spi_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.Msg.MIXLY_ESP32_SPI_INIT);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN);        
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
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_INIT_TOOLTIP);   
    }
};

Blockly.Blocks['communicate_spi_set'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField("SPI")
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_SERIAL_BEGIN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_SET);
    }
};

Blockly.Blocks['communicate_spi_buffer'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_SET+Blockly.Msg.MIXLY_ESP32_SPI_BUFFER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_BUFFER_SET);
    }
};

Blockly.Blocks['communicate_spi_read'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.Msg.LANG_MATH_BYTE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_READ);
    }
}

Blockly.Blocks['communicate_spi_read_output'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.Msg.LANG_MATH_BYTE + ' ' + Blockly.Msg.MIXLY_ESP32_SPI_OUTPUT);
        this.appendValueInput('val')
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_READ_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_readinto'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ + Blockly.Msg.MIXLY_ESP32_SPI_BUFFER);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_READINTO);
    }
}

Blockly.Blocks['communicate_spi_readinto_output'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ + Blockly.Msg.MIXLY_ESP32_SPI_BUFFER);
        this.appendValueInput('val')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_SPI_OUTPUT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_READINTO_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_write'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_WRITE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_WRITE);
    }
};

Blockly.Blocks['communicate_spi_write_readinto'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_WRITE)
            // .appendField(new Blockly.FieldDropdown([
            //     [Blockly.Msg.LANG_MATH_BYTE, "byte"],
            //     [Blockly.Msg.MIXLY_ESP32_SPI_BUFFER, "buffer"]
            // ]), "op");
        this.appendValueInput('val')
            .setCheck('var')
            .appendField(Blockly.Msg.MIXLY_ESP32_BUFFER_READ);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SPI_WRITE_READINTO);
    }
};

Blockly.Blocks.communicate_i2c_master_read = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("I2C");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_READ);
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.communicate_i2c_available = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("I2C");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_READ + Blockly.Msg.MIXLY_ESP32_SUCCESS);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_I2C_AVAILABLE);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_ONRECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['communicate_ow_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire '+Blockly.Msg.MIXLY_SETUP);
        this.appendValueInput('BUS')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_INIT);
    }
};

Blockly.Blocks['communicate_ow_scan'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_ONEWIRE_SCAN);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_SCAN);
    }
};

Blockly.Blocks['communicate_ow_read'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_ONEWIRE_READ);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_READ);
    }
};

Blockly.Blocks['communicate_ow_write'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_WRITE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LANG_MATH_STRING, "write"],
                [Blockly.Msg.LANG_MATH_BYTE, "writebyte"]
            ]), "op");
        this.appendValueInput('byte')
            .setCheck([Number,String]);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_WRITE);
    }
};

Blockly.Blocks['communicate_ow_select'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
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
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_SELECT);
    }
};


Blockly.Blocks['communicate_ow_reset'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField('OneWire')
            .setCheck('var')
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_reset);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_OW_RESET);
    }
};

Blockly.Blocks['communicate_ir_recv_init'] = {
    init:function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('PIN')
            .appendField(Blockly.Msg.MIXLY_SETUP+Blockly.Msg.MIXLY_IR_RECEIVE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_IR_INPUT1,"8"],
                [Blockly.Msg.MIXLY_IR_INPUT2, "16"],
                [Blockly.Msg.MIXLY_IR_INPUT3,"0"],
                [Blockly.Msg.MIXLY_TR_SEND_RC,"RC5"]
            ]), "type");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO + Blockly.Msg.MIXLY_ESP32_ONENET_SUB);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['internal_variable'] = {
    init:function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXlY_RECV_FUN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_IR_CMD_CODE,"0"],
                [Blockly.Msg.MIXLY_IR_ADDR_CODE, "1"],
                [Blockly.Msg.MIXLY_IR_RAW_CODE,"2"],
                [Blockly.Msg.MIXLY_IR_PULSE,"3"]
            ]), "index");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['recv_fun'] = {
    init:function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXlY_RECV_FUN)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MILY_PAUSE,"True"],
                [Blockly.Msg.MIXLY_RECOVER, "False"]
            ]), "en");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);            
    }
}

Blockly.Blocks['communicate_ir_send_init'] = {
    init:function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('PIN')
            .appendField(Blockly.Msg.MIXLY_SETUP+Blockly.Msg.MIXLY_IR_SEND)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_IR_SEND_samsung1,"False"],
                [Blockly.Msg.MIXLY_IR_SEND_samsung2, "True"],
                [Blockly.Msg.MIXLY_TR_SEND_RC,"RC5"]
            ]), "type")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER);
        this.appendValueInput('power');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MATH_QUYU_SYMBOL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};


Blockly.Blocks['ir_transmit_conventional_data'] = {
    init:function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IR_SEND);
        this.appendValueInput('cmd')
            .appendField(Blockly.Msg.MIXLY_IR_CMD_CODE);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_IR_ADDR_CODE);
        this.appendValueInput('toggle')
            .appendField(Blockly.Msg.MIXLY_CONTROL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TRANSMIT_CONVEN_DATA);
    }
};

Blockly.Blocks['ir_transmit_study_code'] = {
    init:function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IR_SEND);     
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_IR_PULSE)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};




Blockly.Blocks['ir_transmit_busy'] = {
    init:function(){
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IR_TRANSMIT_DONE);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_ir_send'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('PIN')
            .appendField(Blockly.Msg.blynk_IOT_IR_SEND);
        this.appendValueInput('ADDR')
            .appendField(Blockly.Msg.MQTT_SERVER_ADD);    
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.OLED_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blynk_IOT_IR_SEND_TOOLTIP);
    }
};

Blockly.Blocks['communicate_bluetooth_central_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MSG.catBLE)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catEthernet_init + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_AS+Blockly.Msg.MSG.catBLE_UART);        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_peripheral_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MSG.catBLE)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catEthernet_init + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_AS+Blockly.Msg.MSG.catBLE_HID);  
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);                
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_scan'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_ONEWIRE_SCAN+Blockly.Msg.MSG.catBLE);
        this.setOutput(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['communicate_bluetooth_mac'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_MAC);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_bluetooth_connect'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var");
            this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TEXT_JOIN + Blockly.Msg.MSG.catBLE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.HTML_NAME,"name"],
                [Blockly.Msg.MIXLY_ETHERNET_MAC_ADDRESS, "mac"]
            ]), "mode");   

        this.appendValueInput('data')
            .setCheck(String);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_disconnect'] = {
   init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendValueInput('VAR')
        .setCheck("var");
    this.appendDummyInput()
        .appendField(Blockly.Msg.MIXLY_ESP32_DISCONNECT_ONENET);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks['communicate_bluetooth_send'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catBLE+Blockly.Msg.MIXLY_SEND_DATA);   
        this.appendValueInput('data')
            .appendField(Blockly.Msg.HTML_BODY);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_bluetooth_is_connected'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catBLE+Blockly.Msg.MIXLY_EMQX_IS_CONNECT);
        this.setOutput(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks["communicate_bluetooth_recv"] = {
    init: function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")   
        this.appendValueInput('METHOD')
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO+Blockly.Msg.MIXLY_ESP32_ONENET_SUB);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

Blockly.Blocks["communicate_bluetooth_recv_only"] = {
    init: function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV)                  
        this.setOutput(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

Blockly.Blocks["communicate_bluetooth_handle"] = {
    init: function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")   
            .appendField(Blockly.Msg.MIXLY_BLE_HANDLE)
        this.appendValueInput('METHOD')
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO+Blockly.Msg.MIXLY_ESP32_ONENET_SUB);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_SUBSCRIBE_TOOLTIP);
    }
};

//espnow
Blockly.Blocks['communicate_espnow_init'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow '+Blockly.Msg.MIXLY_SETUP);
        this.appendValueInput('CHNL')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_CHANNEL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_espnow_init_new'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow '+Blockly.Msg.MIXLY_SETUP);
        this.appendValueInput('CHNL')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_CHANNEL);
        this.appendValueInput('DB')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER);    
        this.appendDummyInput()
            .appendField('db');    
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MP_ESPNOW_INIT_TOOLTIP);
    }
};

Blockly.Blocks['network_espnow_mac'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_MAC);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_info'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_INFO);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_recv'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["("+Blockly.Msg.MIXLY_ETHERNET_MAC_ADDRESS+", "+Blockly.Msg.OLED_STRING+")",""],
                [Blockly.Msg.MIXLY_ETHERNET_MAC_ADDRESS, "[0]"],
                [Blockly.Msg.OLED_STRING, "[1]"]
            ]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_espnow_send'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendValueInput('mac')
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_SEND_MAC);
        this.appendValueInput('content')
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_SEND);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXGO_ESPNOW_SEND_TOOLTIP);
    }
};

Blockly.Blocks["network_espnow_recv_handle"] = {
    init: function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('ESPnow ');
        this.appendValueInput('METHOD')
            .appendField(Blockly.Msg.MIXLY_EMQX_SET_METHOD);    
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

//radio
Blockly.Blocks['espnow_radio_channel'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_INIT);
        this.appendValueInput('CHNL')
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_channel_new'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_INIT);
        this.appendValueInput('CHNL')
            .setCheck(Number);
        this.appendValueInput('DB')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER);    
        this.appendDummyInput()
            .appendField('db');    
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_INIT_TOOLTIP);
    }
};

Blockly.Blocks['espnow_radio_on_off'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "True"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "False"]
            ]), 'on_off')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_send'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.appendValueInput('send')
            .setCheck(String);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXGO_ESPNOW_SEND_TOOLTIP);
    }
};

Blockly.Blocks['espnow_radio_rec'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO)
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV);        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_recv_msg'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_RECEIVED_MSG);        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['espnow_radio_recv'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED);  
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['espnow_radio_recv_certain_msg'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED_CERTAIN)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput('on'), 'msg') 
            .appendField('"')
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['espnow_radio_recv_new'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED);  
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['espnow_radio_recv_certain_msg_new'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MP_ESPNOW_RADIO_MSG_RECEIVED_CERTAIN)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput('on'), 'msg') 
            .appendField('"')
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);          
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks.lora_init = {
    init: function () {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('SUB')
            .appendField('Lora'+Blockly.Msg.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"SPI")
            .setCheck("var");
        this.appendValueInput('PINSUB')
            .appendField("CS")
        this.appendValueInput('frequency')
            .appendField(Blockly.Msg.MIXLY_FREQUENCY)    
        this.appendValueInput('rate')
            .appendField(Blockly.Msg.MIXLY_CODE_RATE)
        this.appendValueInput('factor')
            .appendField(Blockly.Msg.MIXLY_SPREADING_FACTOR)
        this.appendValueInput('power')
            .appendField(Blockly.Msg.MIXLY_TX_POWER)    
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SIGNAL_BANDWIDTH)
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
        this.setFieldValue("125000","bandwidth");      
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_LORA_INIT_TOOLTIP);
    }
};

Blockly.Blocks['lora_packet'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('Lora ');        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET+Blockly.Msg.MIXLY_PACKAGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_SIGNAL_STRENGTH,'packet_rssi'],
                [Blockly.Msg.MIXLY_SIGNAL_NOISE_RATE,'packet_snr']               
            ]), 'key')        
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['lora_send'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField('Lora ');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SEND_DATA);   
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);                 
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        //this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['lora_recv'] = {
    init: function() {
        this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('Lora ');        
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_ESPNOW_RECV)
        this.setOutput(true,String);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['urequests_get'] = {
  init: function() {
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendValueInput("DOMAIN")
      .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  this.appendDummyInput("")
  
      .appendField(Blockly.Msg.blockpy_REQUESTS_GET)
      .appendField(new Blockly.FieldTextInput('response'), 'VAR')
                       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.Msg.blockpy_REQUESTS_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}


Blockly.Blocks['urequests_attribute'] = {
  init: function() {
     this.appendValueInput('VAL')

  var attr =
        [[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_HEADER, 'headers'],[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'],[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_TEXT, 'text']
        ,[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_COOKIES, 'cookies'],[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content']];
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
        .appendField(new Blockly.FieldDropdown(attr), 'ATTR')
        

  this.setInputsInline(true);
   this.setOutput(true, String);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'clear': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_CLEAR,
        'reset': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_RESET,
        'home': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_HOME
      };
      return TOOLTIPS[mode];
    });
  }
};



Blockly.Blocks['urequests_method'] = {
  init: function() {
    this.appendValueInput("VAR")
      .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  var method =
        [['get', 'get'],['post', 'post'],['put', 'put'],
        ['delete', 'delete'],['head', 'head'],
        ['option', 'option']];
    this.setColour(Blockly.Msg['COMMUNICATE_HUE']);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.blockpy_CONDUCT)
        .appendField(new Blockly.FieldDropdown(method), 'DIR')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.blockpy_REQUESTS)  
    this.setOutput(true);
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