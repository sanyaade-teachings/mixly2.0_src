'use strict';

goog.provide('Blockly.Blocks.SCoop');

goog.require('Blockly.Blocks');

Blockly.Msg['SCOOP_HUE'] = 120;
Blockly.Blocks['SCoopTask'] = {
    init: function () {
        var _tasknum = [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]];
        this.appendDummyInput()
            .appendField("Scoop Task")
            .appendField(new Blockly.FieldDropdown(_tasknum), "_tasknum");
        this.appendStatementInput("setup")
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .setCheck(null);
        this.appendStatementInput("loop")
            .appendField(Blockly.Msg.MIXLY_CONTROL_SCoop_loop)
            .setCheck(null);
        this.setColour(Blockly.Msg['SCOOP_HUE']);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SCOOP);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#scoop-task");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '控制', 'SCoop Task']
            }
        };
    }
};

Blockly.Blocks['SCoop_yield'] = {
    init: function () {
        this.setColour(Blockly.Msg['SCOOP_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CONTROL_SCoop_yield);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SCOOP_YIELD);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#scoop-task");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '控制', 'SCoop Task']
            }
        };
    }
};
Blockly.Blocks['SCoop_sleep'] = {
    init: function () {
        this.setColour(Blockly.Msg['SCOOP_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CONTROL_SCoop_sleep);
        this.appendValueInput("sleeplength", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SCOOP_SLEEP);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#scoop-task");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '控制', 'SCoop Task']
            }
        };
    }
};