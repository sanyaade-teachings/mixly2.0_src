'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
Blockly.Msg['SERIAL_HUE'] = 65;

Blockly.Blocks['serial_HardwareSerial'] = {
	init: function() {
		this.setColour(Blockly.Msg['SERIAL_HUE']);
		this.appendDummyInput("")
		.appendField(Blockly.Msg.MIXLY_SETUP+Blockly.Msg.Hardware_Serial)
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
		.appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN)
		.setCheck(Number);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SOFTSERIAL.replace('%1',Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC))
			.replace('%2',Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC)));
	}
};
