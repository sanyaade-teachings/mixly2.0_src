'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');
Blockly.Msg['BASE_HUE'] = 20;//'#ae3838';//40;

Blockly.Blocks['inout_highlow'] = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_HIGH, "HIGH"], [Blockly.Msg.MIXLY_LOW, "LOW"]]), 'BOOL')
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks['inout_pinMode'] = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PINMODE)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PINMODEIN, "INPUT"], [Blockly.Msg.MIXLY_PINMODEOUT, "OUTPUT"], [Blockly.Msg.MIXLY_PINMODEPULLUP, "INPUT_PULLUP"]]), "MODE")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_pinMode);
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '管脚模式']
            }
        };
    }
};


Blockly.Blocks.inout_digital_write2 = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DIGITALWRITE_PIN)
            .setCheck(Number);
        this.appendValueInput("STAT")
            .appendField(Blockly.Msg.MIXLY_STAT)
            .setCheck([Number, Boolean]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id2");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '数字输出']
            }
        };
    }
};

Blockly.Blocks.inout_digital_read = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_DIGITALREAD_PIN)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, [Boolean, Number]);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id7");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '数字输入']
            }
        };
    }
};

Blockly.Blocks.inout_digital_read2 = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DIGITALREAD_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, [Boolean, Number]);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id19");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '数字输入']
            }
        };
    }
};

Blockly.Blocks.inout_analog_write = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_VALUE2)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id13");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '模拟输出']
            }
        };
    }
};

Blockly.Blocks.inout_analog_read = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ANALOGREAD_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id13");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '模拟输入']
            }
        };
    }
};

Blockly.Blocks.inout_buildin_led = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ON, "HIGH"], [Blockly.Msg.MIXLY_OFF, "LOW"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('light or off the build-in LED');
    }
};

Blockly.Blocks.OneButton_interrupt = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.ONEBUTTON + " " + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_CLICK, "attachClick"], [Blockly.Msg.MIXLY_DOUBLE_CLICK, "attachDoubleClick"], [Blockly.Msg.MIXLY_LONG_PRESS_START, "attachLongPressStart"], [Blockly.Msg.MIXLY_DURING_LONG_PRESS, "attachDuringLongPress"], [Blockly.Msg.MIXLY_LONG_PRESS_END, "attachLongPressStop"]]), "mode");
        this.appendValueInput("STAT")
            .appendField(Blockly.Msg.MIXLY_ELECLEVEL);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
        this.setHelpUrl();
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '多功能按键']
            }
        };
    }
};

Blockly.Blocks.controls_attachInterrupt = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ATTACHINTERRUPT_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "RISING"], [Blockly.Msg.MIXLY_FALLING, "FALLING"], [Blockly.Msg.MIXLY_CHANGE, "CHANGE"]]), "mode");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id25");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '硬件中断'],
                scrollPos: '硬件中断'
            }
        };
    }
};

Blockly.Blocks.controls_detachInterrupt = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DETACHINTERRUPT_PIN)
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_DETACHINTERRUPT);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id30");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '硬件中断'],
                scrollPos: '取消硬件中断'
            }
        };
    }
};

Blockly.Blocks.controls_attachPinInterrupt = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ATTACHPININTERRUPT_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "RISING"], [Blockly.Msg.MIXLY_FALLING, "FALLING"], [Blockly.Msg.MIXLY_CHANGE, "CHANGE"]]), "mode");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '软件中断'],
                scrollPos: '软件中断'
            }
        };
    }
};

Blockly.Blocks.controls_detachPinInterrupt = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DETACHPININTERRUPT_PIN)
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_DETACHINTERRUPT);
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '软件中断'],
                scrollPos: '取消软件中断'
            }
        };
    }
};

Blockly.Blocks.inout_pulseIn = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PULSEIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_HIGH, "HIGH"], [Blockly.Msg.MIXLY_LOW, "LOW"]]), "STAT");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_pulseIn);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id33");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '脉冲长度']
            }
        };
    }
};

Blockly.Blocks.inout_pulseIn2 = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PULSEIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_HIGH, "HIGH"], [Blockly.Msg.MIXLY_LOW, "LOW"]]), "STAT");
        this.appendValueInput("TIMEOUT", Number)
            .appendField(Blockly.Msg.MIXLY_PULSEIN_TIMEOUT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_pulseIn2);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#id33");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', '脉冲长度']
            }
        };
    }
};

Blockly.Blocks.inout_shiftout = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("")
            .appendField("ShiftOut");
        this.appendValueInput("PIN1", Number)
            .appendField(Blockly.Msg.MIXLY_DATAPIN)
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .appendField(Blockly.Msg.MIXLY_CLOCKPIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_BITORDER)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MSBFIRST, "MSBFIRST"], [Blockly.Msg.MIXLY_LSBFIRST, "LSBFIRST"]]), "ORDER");
        this.appendValueInput("DATA", Number)
            .appendField(Blockly.Msg.MIXLY_DATA)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_shiftout);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/02.Input-Output.html#shiftout");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '输入输出', 'ShiftOut']
            }
        };
    }
};


Blockly.Blocks.ESP32touchButton = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField("ESP32" + Blockly.Msg.MIXLY_ESP32_TOUCH + Blockly.Msg.ONEBUTTON + " " + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_CLICK, "attachClick"], [Blockly.Msg.MIXLY_DOUBLE_CLICK, "attachDoubleClick"], [Blockly.Msg.MIXLY_LONG_PRESS_START, "attachLongPressStart"], [Blockly.Msg.MIXLY_DURING_LONG_PRESS, "attachDuringLongPress"], [Blockly.Msg.MIXLY_LONG_PRESS_END, "attachLongPressStop"]]), "mode");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setTooltip();
        this.setHelpUrl();
    }
};

Blockly.Blocks.inout_soft_analog_write = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_SOFT_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_VALUE2)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks.inout_cancel_soft_analog_write = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_CANCEL_SOFT_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CANCEL_SOFT_ANALOGWRITE_PIN);
        this.setHelpUrl("");
    }
};

//ADS1015模拟数字转换模块-获取数据
var ADS1015_setGain = [
    ["±6.144V 3mv/bit", "GAIN_TWOTHIRDS"],
    ["±4.096V 2mv/bit", "GAIN_ONE"],
    ["±2.048V 1mv/bit", "GAIN_TWO"],
    ["±1.024V 0.5mv/bit", "GAIN_FOUR"],
    ["±0.512V 0.25mv/bit", "GAIN_EIGHT"],
    ["±0.256V 0.125mv/bit", "GAIN_SIXTEEN"],
];

//ADS1015模拟数字转换模块-增益设置
Blockly.Blocks.ADS1015_setGain = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("").appendField(Blockly.Msg.MIXLY_SETTING).appendField(Blockly.Msg.ADS1015_setGain);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ADS1015_setGain), "ADS1015_setGain");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};

//ADS1015模拟数字转换模块 数值获取
Blockly.Blocks.ADS1015_Get_Value = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("").appendField("ADS1015" + Blockly.Msg.ADS1015_Get_Value);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([["AIN0", "ads.readADC_SingleEnded(0)"], ["AIN1", "ads.readADC_SingleEnded(1)"], ["AIN2", "ads.readADC_SingleEnded(2)"], ["AIN3", "ads.readADC_SingleEnded(3)"]]), "ADS1015_AIN");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};
//PCF8591T模拟数字转换模块 数值获取
Blockly.Blocks.PCF8591T = {
    init: function () {
        this.setColour(Blockly.Msg['BASE_HUE']);
        this.appendDummyInput("").appendField("PCF8591T" + Blockly.Msg.ADS1015_Get_Value);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([["AIN0", "pcf8591.analogRead(AIN0)"], ["AIN1", "pcf8591.analogRead(AIN1)"], ["AIN2", "pcf8591.analogRead(AIN2)"], ["AIN3", "pcf8591.analogRead(AIN3)"]]), "PCF8591T_AIN");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};