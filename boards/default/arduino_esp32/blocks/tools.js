(() => {

goog.require('Blockly.Blocks');
goog.require('Blockly.Arduino');
goog.provide('Blockly.Blocks.tools');
goog.provide('Blockly.Arduino.tools');

const BOARDS_PIN_DEF = {
    esp32_pin: {
        path: "../../../common/media/board_pin/ESP32.png"
    },
    handbit_A: {
        path: "../../../common/media/board_pin/handbit_A.jpg"
    },
    handbit_B: {
        path: "../../../common/media/board_pin/handbit_B.jpg"
    },
    handbit_pin_A: {
        path: "../../../common/media/board_pin/handbit_pin_A.jpg"
    },
    handbit_pin_B: {
        path: "../../../common/media/board_pin/handbit_pin_B.jpg"
    },
    mixgo_pin_A: {
        path: "../../../common/media/board_pin/MixGo_pin_A.png"
    },
    mixgo_pin_B: {
        path: "../../../common/media/board_pin/MixGo_pin_B.png"
    },
    PocketCard_A: {
        path: "../../../common/media/board_pin/PocketCard_A.jpg"
    },
    PocketCard_B: {
        path: "../../../common/media/board_pin/PocketCard_B.jpg"
    },
    PocketCard_pin: {
        path: "../../../common/media/board_pin/PocketCard_pin.png"
    },
    esp32_cam_pin: {
        path: "../../../common/media/board_pin/ESP32_CAM_pin.png",
        height: 270
    },
    esp32_pico_kit_1_pin: {
        path: "../../../common/media/board_pin/ESP32_pico_kit_1.png",
        height: 230
    },
    nodemcu_32s_pin: {
        path: "../../../common/media/board_pin/nodemcu_32s_pin.png",
        width: 380
    }
}

for (let i in BOARDS_PIN_DEF) {
    const defaultDef = {
        path: '../../../common/media/board_pin/ESP32.jpg',
        height: 376,
        width: 525,
        tooltip: '',
        helpUrl: ''
    };
    const pinDef = {
        ...defaultDef,
        ...(BOARDS_PIN_DEF[i] ?? {})
    };

    Blockly.Blocks[i] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(pinDef.path, pinDef.width, pinDef.height, "*"));
            this.setColour(Blockly.Msg['TOOLS_HUE']);
            this.setTooltip(pinDef.tooltip);
            this.setHelpUrl(pinDef.helpUrl);
        }
    };

    Blockly.Arduino.forBlock[i] = function() {
        return "";
    };
}

})();