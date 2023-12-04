import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const display_matrix_use_i2c_init = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key == '32x12 Matrix') {
        if (version == 'mixgo_ce') {
            Python.definitions_['import_matrix32x12'] = 'import matrix32x12';
            code = v + ' = matrix32x12.Matrix(' + iv + ',font_address=0x3A0000)\n';
        }
        else {
            Python.definitions_['import_matrix32x12'] = 'import matrix32x12';
            code = v + ' = matrix32x12.Matrix(' + iv + ',font_address=0x700000)\n';
        }
    } else if (key == '16x8 Matrix') {
        Python.definitions_['import_matrix16x8'] = 'import matrix16x8';
        code = v + ' = matrix16x8.Matrix(' + iv + ')\n';
    }
    return code;
};

export const display_matrix_extern_show_image = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".shows(" + data + ")\n";
    return code;
}

export const display_matrix_extern_show_image_or_string_delay = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const display_matrix_extern_show_frame_string = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ")\n";
    return code;
}

export const display_matrix_extern_show_frame_string_delay = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ',delay = ' + time + ")\n";
    return code;
}

export const display_matrix_extern_scroll_string = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ")\n";
    return code;
}


export const display_matrix_extern_scroll_string_delay = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const display_matrix_extern_clear = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.fill(0)\n' + v + '.show()\n';
    return code;
};

export const display_matrix_extern_shift = function (a) {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = v + '.' + op + '(' + value + ')\n';
    return code;
};

export const display_matrix_extern_get_pixel = function (block) {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, Python.ORDER_ATOMIC];
};

export const display_matrix_extern_bright_point = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + v + '.show()\n';
    return code;
}

export const display_matrix_extern_get_screen_pixel = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.get_brightness()';
    return [code, Python.ORDER_ATOMIC];
};

export const display_matrix_extern_bright_screen = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var code = v + '.set_brightness(' + x + ')\n';
    return code;
};

export const display_matrix_extern_image_builtins = function (block) {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var dropdown_image = block.getFieldValue('image');
    var code = v + '.' + dropdown_image;
    return [code, Python.ORDER_ATOMIC];
};

export const matrix_extern_image_arithmetic = function (a) {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var imga = Python.valueToCode(a, 'A', Python.ORDER_ATOMIC);
    var imgb = Python.valueToCode(a, 'B', Python.ORDER_ATOMIC);
    var code = v + '.map_' + op + '(' + imga + ',' + imgb + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const matrix_extern_image_invert = function (a) {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var imga = Python.valueToCode(a, 'A', Python.ORDER_ATOMIC);
    var code = v + '.map_invert(' + imga + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const display_onoff = function () {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, Python.ORDER_ATOMIC];
};

//oled
export const display_use_i2c_init = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var i2csub = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var row = Python.valueToCode(this, 'row', Python.ORDER_ATOMIC);
    var column = Python.valueToCode(this, 'column', Python.ORDER_ATOMIC);
    var code = sub + " = ssd1306.SSD1306_I2C(" + row + "," + column + "," + i2csub + ")\n";
    return code;
};

export const display_draw_4strings = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var value_text_line1 = Python.valueToCode(this, 'Text_line1', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line2 = Python.valueToCode(this, 'Text_line2', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line3 = Python.valueToCode(this, 'Text_line3', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line4 = Python.valueToCode(this, 'Text_line4', Python.ORDER_ASSIGNMENT) || '\'\'';
    var code = varName + '.show_str(' + value_text_line1 + ',' + value_text_line2 + ',' + value_text_line3 + ',' + value_text_line4 + ')\n'
    return code;
};

export const display_line_arbitrarily = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var location_x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var location_y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var location_x2 = Python.valueToCode(this, 'x2', Python.ORDER_ATOMIC);
    var location_y2 = Python.valueToCode(this, 'y2', Python.ORDER_ATOMIC);
    var code = varName + '.show_line(' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', 1)\n';
    return code;
};

export const display_rect = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var location_x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var location_y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var value_width = Python.valueToCode(this, 'width', Python.ORDER_ATOMIC);
    var value_height = Python.valueToCode(this, 'height', Python.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    var code = '';
    switch (checkbox_fill) {
    case "True":
        code = varName + '.show_fill_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
        break;
    case "False":
        code = varName + '.show_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
        break;
    }
    return code;
};


export const display_line = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var location_x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var location_y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var value_length = Python.valueToCode(this, 'length', Python.ORDER_ATOMIC);
    var value_direction = this.getFieldValue("direction");
    var code = varName + '.show_' + value_direction + '(' + location_x + ', ' + location_y + ', ' + value_length + ', 1)\n';
    return code;
};

export const image_shift = function (a) {
    Python.definitions_['import_matrix'] = 'import matrix';
    var op = a.getFieldValue("OP");
    var image = Python.valueToCode(a, 'img', Python.ORDER_ATOMIC);
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = image + '.shift_' + op + '(' + value + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const display_fill = function () {
    var varName = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var code = varName + '.show_fill(' + key + ')\n';
    return code;
};

// export const switch = function () {
//     var code = this.getFieldValue('flag');
//     return [code, Python.ORDER_ATOMIC];
// };

export const display_animate = function () {
    // Boolean values true and false.
    var name = this.getFieldValue("ANIMATION");
    var code = 'matrix.Image.' + name;
    return [code, Python.ORDER_ATOMIC];
};

export const display_circle = function () {
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var location_x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var location_y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var value_r = Python.valueToCode(this, 'r', Python.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    var code = '';
    switch (checkbox_fill) {
    case "True":
        code = varName + '.show_fill_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
        break;
    case "False":
        code = varName + '.show_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
        break;
    }
    return code;
};

export const display_triangle = function () {
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var location_x0 = Python.valueToCode(this, 'x0', Python.ORDER_ATOMIC);
    var location_y0 = Python.valueToCode(this, 'y0', Python.ORDER_ATOMIC);
    var location_x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var location_y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var location_x2 = Python.valueToCode(this, 'x2', Python.ORDER_ATOMIC);
    var location_y2 = Python.valueToCode(this, 'y2', Python.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    var code = '';
    switch (checkbox_fill) {
    case "True":
        code = varName + '.show_fill_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
        break;
    case "False":
        code = varName + '.show_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
        break;
    }
    return code;
};

export const display_oled_showBitmap = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var location_x = Python.valueToCode(this, 'START_X', Python.ORDER_ATOMIC);
    var location_y = Python.valueToCode(this, 'START_Y', Python.ORDER_ATOMIC);
    var bmp = Python.valueToCode(this, 'bitmap_name', Python.ORDER_ATOMIC);
    var w = Python.valueToCode(this, 'WIDTH', Python.ORDER_ATOMIC);
    var h = Python.valueToCode(this, 'HEIGHT', Python.ORDER_ATOMIC);
    var code = varName + '.show_bitmap(' + location_x + ', ' + location_y + ', ' + bmp + ',' + w + ',' + h + ')\n';
    return code;
};

export const display_oled_drawPixel = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var location_x = Python.valueToCode(this, 'POS_X', Python.ORDER_ATOMIC);
    var location_y = Python.valueToCode(this, 'POS_Y', Python.ORDER_ATOMIC);
    var code = varName + '.show_pixel(' + location_x + ', ' + location_y + ')\n';
    return code;
};


//tm1650
export const display_tm_use_i2c_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key == 'TM1650') {
        Python.definitions_['import_tm1650'] = 'import tm1650';
        code = v + ' = tm1650.' + key + "(" + iv + ')\n';
    } else if (key == 'TM1637') {
        Python.definitions_['import_tm1637'] = 'import tm1637';
        code = v + ' = tm1637.' + key + "(" + iv + ')\n';
    }
    return code;
};

export const display_tm1650_power = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var stat = this.getFieldValue("STAT");
    var code = v + '.' + stat + "()\n";
    return code;
};

export const display_tm1650_show_num = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var val = Python.valueToCode(this, 'VALUE', Python.ORDER_ATOMIC);
    var code = v + ".shownum(" + val + ")\n";
    return code;
};

export const display_tm1650_show_dot = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var n = Python.valueToCode(this, 'NO', Python.ORDER_ATOMIC);
    var stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = v + '.showDP(' + n + ", " + stat + ")\n";
    return code;
};

export const display_tm1650_set_brightness = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var val = Python.valueToCode(this, 'VALUE', Python.ORDER_ATOMIC);
    var code = v + ".intensity(" + val + ")\n";
    return code;
};

export const tft_use_spi_init = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[1];
    var addr = '';
    if (version == 'esp32') {
        addr = '0x700000';
    } else {
        addr = '0x3A0000';
    }
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sv = Python.valueToCode(this, 'SPISUB', Python.ORDER_ATOMIC);
    var pv = Python.valueToCode(this, 'PINCS', Python.ORDER_ATOMIC);
    var dv = Python.valueToCode(this, 'PINDC', Python.ORDER_ATOMIC);
    var w = Python.valueToCode(this, 'WIDTH', Python.ORDER_ATOMIC);
    var h = Python.valueToCode(this, 'HEIGHT', Python.ORDER_ATOMIC);
    var op = this.getFieldValue('rotate');
    var code = v + ' = st7789.ST7789(' + sv + ',' + w + ',' + h + ',dc_pin=' + dv + ',cs_pin=' + pv + ',rotation=' + op + ',font_address=' + addr + ')\n';
    return code;
};

export const tft_show_image_xy = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = v + ".image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',color=' + color + ")\n";
    return code;
}

export const display_color_seclet = function () {
    var colour = this.getFieldValue('COLOR');
    var code = '0x' + colour.slice(1) + ''
    var rgb565 = (code & 0xf80000) >> 8 | (code & 0xfc00) >> 5 | (code & 0xff) >> 3
    return ['0x' + rgb565.toString(16), Python.ORDER_ATOMIC];
};

export const tft_show_image_or_string_delay = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ',color=' + color + ")\n";
    return code;
}


export const tft_show_frame_string_delay = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = v + ".frame(" + data + ',size = ' + size + ',delay = ' + time + ',color=' + color + ")\n";
    return code;
}


export const tft_scroll_string_delay = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = v + ".scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ',color=' + color + ")\n";
    return code;
}

export const tft_fill = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.fill(st7789.' + key + ')\n';
    return code;
};

export const tft_line_arbitrarily = function () {
    Python.definitions_['import_st7789'] = 'import st7789';
    var varName = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var location_x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var location_y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var location_x2 = Python.valueToCode(this, 'x2', Python.ORDER_ATOMIC);
    var location_y2 = Python.valueToCode(this, 'y2', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + '.line(' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', color=' + color + ')\n';
    return code;
};

export const display_lcd_use_i2c_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var addr = Python.valueToCode(this, 'ADDR', Python.ORDER_ATOMIC);
    var code;
    Python.definitions_['import_i2clcd'] = 'import i2clcd';
    code = v + ' = i2clcd.LCD' + "(" + iv + ',lcd_width=' + key + ',i2c_addr=' + addr + ')\n';

    return code;
};

export const lcd_show_image_or_string_delay = function () {
    Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',column = ' + x + ',line = ' + y + ',center = ' + op + ")\n";
    return code;
}

export const lcd_print_string = function () {
    Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var delay = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var code = v + ".print(" + data + ',column = ' + x + ',line = ' + y + ',delay=' + delay + ")\n";
    return code;
}

export const lcd_backlight = function () {
    Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.backlight(' + key + ')\n';
    return code;
};

export const lcd_clear = function () {
    Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.clear()\n';
    return code;
};

export const display_oled_use_i2c_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var addr = Python.valueToCode(this, 'ADDR', Python.ORDER_ATOMIC);
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var font = '';
    if (['mpython', 'mixgope'].indexOf(version) >= 0) {
        font = '0x700000'
    }
    else {
        font = '0x3A0000'
    }
    var code;
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    code = v + ' = oled128x64.OLED' + "(" + iv + ',address=' + addr + ',font_address=' + font + ')\n';

    return code;
};

export const extern_oled_show_image = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data + ")\n";
    return code;
}

export const extern_oled_show_image_xy = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ")\n";
    return code;
}

export const extern_oled_show_string = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".shows(" + data + ")\n";
    return code;
}

export const extern_oled_show_image_or_string_delay = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const extern_oled_show_frame_string = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ")\n";
    return code;
}

export const extern_oled_show_frame_string_delay = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ',size = ' + size + ',delay = ' + time + ")\n";
    return code;
}

export const extern_oled_scroll_string = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ")\n";
    return code;
}


export const extern_oled_scroll_string_delay = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const extern_oled_clear = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.fill(0)\n' + v + '.show()\n';
    return code;
};

export const extern_oled_shift = function (a) {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = v + '.' + op + '(' + value + ')\n';
    return code;
};

export const extern_oled_get_pixel = function (block) {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, Python.ORDER_ATOMIC];
};

export const extern_oled_bright_point = function () {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + v + '.show()\n';
    return code;
}

export const extern_oled_shape_rect = function (block) {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var w = Python.valueToCode(block, 'w', Python.ORDER_ATOMIC);
    var h = Python.valueToCode(block, 'h', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var shape = block.getFieldValue('shape');
    var code = v + '.' + shape + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + state + ')\n' + v + '.show()\n';
    return code;
};

export const extern_oled_hvline = function (block) { //水平线
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var var_length = Python.valueToCode(block, 'length', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var hv = block.getFieldValue('dir_h_v');
    var code = v + '.' + (('0' == hv) ? 'v' : 'h') + 'line(' + x + ', ' + y + ', ' + var_length + ', ' + state + ')\n' + v + '.show()\n';
    return code;
};

export const extern_oled_line = function (block) {
    Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var x1 = Python.valueToCode(block, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(block, 'y1', Python.ORDER_ATOMIC);
    var x2 = Python.valueToCode(block, 'x2', Python.ORDER_ATOMIC);
    var y2 = Python.valueToCode(block, 'y2', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var code = v + '.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + state + ')\n' + v + '.show()\n';
    return code;
};