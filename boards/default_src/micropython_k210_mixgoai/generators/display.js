import * as Blockly from 'blockly/core';

export const angle = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const lcd_color = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const on_off = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};


export const lcd_init = function () {
    Blockly.Python.definitions_['import board'] = 'import board';
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(this, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.init(freq=" + freq + ",color=" + color + ")\n";
    return code;
};

export const lcd_colour = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var code = "" + key + "";
    return [code, Blockly.Python.ORDER_ATOMIC];
};



export const lcd_width = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var key = this.getFieldValue('key');
    var code = 'lcd.' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


export const lcd_display = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var img = Blockly.Python.valueToCode(this, 'img', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.display(" + img + ")\n";
    return code;
};
//ok


export const lcd_clear = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var color = Blockly.Python.valueToCode(this, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.clear(" + color + ")\n";
    return code;
};

export const lcd_rotation = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.rotation(" + key + ")\n";
    return code;
};

export const lcd_mirror = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var key = Blockly.Python.valueToCode(this, 'key', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.mirror(" + key + ")\n";
    return code;
};

export const lcd_draw_string = function () {
    Blockly.Python.definitions_['import_lcd'] = 'import lcd';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
    var tex = Blockly.Python.valueToCode(this, 'text', Blockly.Python.ORDER_ATOMIC);
    var color_T = Blockly.Python.valueToCode(this, 'color_T', Blockly.Python.ORDER_ATOMIC);
    var color_S = Blockly.Python.valueToCode(this, 'color_S', Blockly.Python.ORDER_ATOMIC);
    var code = "lcd.draw_string(" + x + "," + y + "," + tex + "," + color_T + "," + color_S + ")\n";
    return code;
};

export const touch_init = function () {
    Blockly.Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var I2C = Blockly.Python.valueToCode(this, 'I2C', Blockly.Python.ORDER_ATOMIC);
    var code = "ts.init(" + I2C + ")\n";
    return code;
};

export const touch_calibrate = function () {
    Blockly.Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var code = "ts.calibrate()\n";
    return code;
}

export const touch_read = function () {
    Blockly.Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = 'ts.read()' + key + '';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const touch_info = function () {
    Blockly.Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = '' + key + '';
    return [code, Blockly.Python.ORDER_ATOMIC];
};









/**/
