import * as Blockly from 'blockly/core';

export const text_base64_url_codec = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField(new Blockly.FieldDropdown([
                ["Base64", "BASE64"],
                ["URL", "URL"]
            ]), "TYPE")
            .appendField(new Blockly.FieldDropdown([
                ["编码", "ENCODE"],
                ["解码", "DECODE"]
            ]), "OPTION");
        this.setOutput(true, null);
        this.setColour(Blockly.Msg['TEXTS_HUE']);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};