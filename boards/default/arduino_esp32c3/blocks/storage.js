'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Msg['STORAGE_HUE'] = 0;
//初始化SPIFFS
Blockly.Blocks['initialize_spiffs'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_SETUP+"SPIFFS");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
var OPEN_MODE =[
[Blockly.Msg.Lang.MIXLY_READONLY, 'FILE_READ'],
[Blockly.Msg.Lang.TEXT_WRITE_TEXT, 'FILE_WRITE'],
[Blockly.Msg.Lang.TEXT_APPEND_APPENDTEXT, 'FILE_APPEND']]

//打开文件并向其中写入数据
Blockly.Blocks['spiffs_open_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_FILE_PATH);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("/fileName.txt"), "file_path");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MODE);
		this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(OPEN_MODE), 'MODE');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//打开文件并向其中写入数据
Blockly.Blocks['spiffs_close_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setInputsInline(true);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
//将数据追加到文件
Blockly.Blocks['spiffs_write_data'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_WRITE);
		this.appendValueInput("data")
		.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
//文件可读
Blockly.Blocks['spiffs_read_available'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.HTML_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_AVAILABLE);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setTooltip("");
		this.setHelpUrl("");
	}
}; 

//读取文件内容
Blockly.Blocks['spiffs_read_data'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.OLED_STRING);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//检查文件大小
Blockly.Blocks['spiffs_file_size'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.HTML_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_SIZE);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//删除文件
Blockly.Blocks['spiffs_delete_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("/fileName.txt"), "file_path");
		this.appendDummyInput();
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['STORAGE_HUE']);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
