'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
Blockly.Msg['SERIAL_HUE'] = 65;

Blockly.Blocks['serial_HardwareSerial'] = {
	init: function() {
		this.setColour(Blockly.Msg['SERIAL_HUE']);
		this.appendDummyInput("")
		.appendField(Blockly.Msg.Lang.MIXLY_SETUP+Blockly.Msg.Lang.Hardware_Serial)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_HardwareSelect), "serial_select");
		this.appendValueInput("RX", Number)
		.setCheck(Number)
		.appendField("RX#")
		.setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput("TX", Number)
		.appendField("TX#")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput("CONTENT", Number)
		.appendField(Blockly.Msg.Lang.MIXLY_SERIAL_BEGIN)
		.setCheck(Number);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_SOFTSERIAL.replace('%1',Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC))
			.replace('%2',Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC)));
	}
};

//USB串口打印
Blockly.Blocks['ESPS2_USB_Serial'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck(null)
        .appendField("USB Serial")
        .appendField(Blockly.Msg.Lang.MIXLY_SERIAL_PRINT)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.TEXT_PRINT_Huanhang_TOOLTIP,"1"], [Blockly.Msg.Lang.MIXLY_PRINT_INLINE,"2"]]), "mode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['SERIAL_HUE']);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//USB串口有数据可读
Blockly.Blocks['ESPS2_USB_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("USB Serial")
        .appendField(Blockly.Msg.Lang.MIXLY_AVAILABLE);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg['SERIAL_HUE']);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//USB串口读取字符串
Blockly.Blocks['ESPS2_USB_read_String'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("USB Serial")
        .appendField(Blockly.Msg.Lang.MIXLY_SERIAL_READSTR);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg['SERIAL_HUE']);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};