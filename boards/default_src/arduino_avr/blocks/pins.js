import * as Blockly from 'blockly/core';
import * as profile from 'profile';

Blockly.Msg['PINS_HUE'] = 230;

export const pins_digital = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_analog = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_pwm = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_interrupt = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.interrupt), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_MOSI = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.MOSI), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_MISO = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.MISO), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SCK = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.SCK), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SCL = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.SCL), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SDA = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.SDA), 'PIN');
        this.setOutput(true, Number);
    }
};