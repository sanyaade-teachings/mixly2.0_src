import * as Blockly from 'blockly/core';
import * as profile from 'profile';

Blockly.Msg['PINS_HUE'] = 230;

export const pins_dac = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.dac), 'PIN');
        this.setOutput(true);
    }
};

export const pins_button = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_sda = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.SDA), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tx = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.tx), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_scl = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.SCL), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_touch = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.touch), 'PIN');
        this.setOutput(true);
    }
};

export const pins_serial = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.serial_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_playlist = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.playlist), 'PIN');
        this.setOutput(true);
    }
};

export const pins_exlcdh = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.exlcdh), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_exlcdv = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.exlcdv), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_axis = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.axis), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_brightness = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.brightness), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tone_notes = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.tone_notes), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_radio_power = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.radio_power), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_radio_datarate = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.radio_datarate), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_one_more = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.one_more), 'PIN');
        this.setOutput(true);
    }
};

export const serial_select = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.serial_select), 'PIN');
        this.setOutput(true);
    }
};

export const serial_HardwareSelect = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.serial_HardwareSelect), 'PIN');
        this.setOutput(true);
    }
};

export const brightness = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.brightness), 'PIN');
        this.setOutput(true);
    }
};


export const CHANNEL = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.CHANNEL), 'PIN');
        this.setOutput(true);
    }
};

export const PWM_RESOLUTION = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.PWM_RESOLUTION), 'PIN');
        this.setOutput(true);
    }
};

export const OCTAVE = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.OCTAVE), 'PIN');
        this.setOutput(true);
    }
};

export const TONE_NOTE = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.TONE_NOTE), 'PIN');
        this.setOutput(true);
    }
};

export const pins_digitalWrite = {
    init: function () {
        this.setColour(Blockly.Msg['PINS_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.digitalWrite), 'PIN');
        this.setOutput(true, Number);
    }
};
