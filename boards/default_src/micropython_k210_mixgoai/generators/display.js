import Python from '../../python/python_generator';

export const angle = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const lcd_color = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const on_off = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const lcd_init = function () {
    Python.definitions_['import board'] = 'import board';
    Python.definitions_['import_lcd'] = 'import lcd';
    var freq = Python.valueToCode(this, 'freq', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var code = "lcd.init(freq=" + freq + ",color=" + color + ")\n";
    return code;
};

export const lcd_colour = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "" + key + "";
    return [code, Python.ORDER_ATOMIC];
};

export const lcd_width = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var key = this.getFieldValue('key');
    var code = 'lcd.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const lcd_display = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var img = Python.valueToCode(this, 'img', Python.ORDER_ATOMIC);
    var code = "lcd.display(" + img + ")\n";
    return code;
};

export const lcd_clear = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var code = "lcd.clear(" + color + ")\n";
    return code;
};

export const lcd_rotation = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "lcd.rotation(" + key + ")\n";
    return code;
};

export const lcd_mirror = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = "lcd.mirror(" + key + ")\n";
    return code;
};

export const lcd_draw_string = function () {
    Python.definitions_['import_lcd'] = 'import lcd';
    var x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var tex = Python.valueToCode(this, 'text', Python.ORDER_ATOMIC);
    var color_T = Python.valueToCode(this, 'color_T', Python.ORDER_ATOMIC);
    var color_S = Python.valueToCode(this, 'color_S', Python.ORDER_ATOMIC);
    var code = "lcd.draw_string(" + x + "," + y + "," + tex + "," + color_T + "," + color_S + ")\n";
    return code;
};

export const touch_init = function () {
    Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var I2C = Python.valueToCode(this, 'I2C', Python.ORDER_ATOMIC);
    var code = "ts.init(" + I2C + ")\n";
    return code;
};

export const touch_calibrate = function () {
    Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var code = "ts.calibrate()\n";
    return code;
}

export const touch_read = function () {
    Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = 'ts.read()' + key + '';
    return [code, Python.ORDER_ATOMIC];
};

export const touch_info = function () {
    Python.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = '' + key + '';
    return [code, Python.ORDER_ATOMIC];
};









/**/
