import Python from '../../python/python_generator';

export const microbit_display_clear = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'display.clear()\n';
    return code;
};

export const monitor_get_pixel = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = 'display.get_pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, Python.ORDER_ATOMIC];
};

export const microbit_display_set_pixel = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var value_value = Python.valueToCode(block, 'value', Python.ORDER_ATOMIC);
    var code = 'display.set_pixel(int(' + value_x + '), int(' + value_y + '), ' + value_value + ')\n';
    return code;
};
export const monitor_bright_point = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var brightness = Python.valueToCode(this, 'brightness', Python.ORDER_ASSIGNMENT);
    var code = 'display.set_pixel(int(' + x + '), int(' + y + '), ' + brightness + ")\n";
    return code;
}
export const monitor_show_image_or_string = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "display.show(" + data + ")\n";
    return code;
}

export const monitor_scroll_string = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "display.scroll(" + data + ")\n";
    return code;
}

export const monitor_scroll_string_with_delay = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var delay = Python.valueToCode(this, 'delay', Python.ORDER_ASSIGNMENT);
    var code = "display.scroll(" + data + ", delay=" + delay + ")\n";
    return code;
}

export const microbit_display_show_image = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_image = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'display.show(' + value_image + ')\n';
    return code;
}

export const microbit_display_show_default_image = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_image = block.getFieldValue('image');
    var value_image = 'Image.' + dropdown_image;
    var code = 'display.show(' + value_image + ')\n';
    return code;
};

export const microbit_display_show_animation = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_images = Python.valueToCode(block, 'images', Python.ORDER_ATOMIC);
    var number_delay = Python.valueToCode(block, 'delay', Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
    var code = 'display.show(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
    return code;
};
export const microbit_display_scroll = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_message = Python.valueToCode(block, 'message', Python.ORDER_ATOMIC);
    var code = 'display.scroll(' + value_message + ')\n';
    return code;
};
export const microbit_display_on = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var mode = block.getFieldValue('on_off');
    var code = 'display.' + mode + '()\n';
    return code;
};

// export const microbit_display_off = function(block) {
//   Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   var code = 'display.off()\n';
//   return code;
// };
export const microbit_display_is_on = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'display.is_on()';
    return [code, Python.ORDER_ATOMIC];
};
export const microbit_image_builtins = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_image = block.getFieldValue('image');
    var code = 'Image.' + dropdown_image;
    return [code, Python.ORDER_ATOMIC];
};

export const microbit_image_copy = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_image = Python.valueToCode(block, 'image', Python.ORDER_ATOMIC);
    var code = value_image + '.copy()';
    return [code, Python.ORDER_ATOMIC];
};

export const microbit_image_invert = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_image = Python.valueToCode(block, 'image', Python.ORDER_ATOMIC);
    var code = value_image + '.invert()';
    return [code, Python.ORDER_ATOMIC];
};

export const microbit_image_create = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var colours = {
        "#000000": "0",
        "#440000": "1",
        "#660000": "2",
        "#880000": "3",
        "#aa0000": "4",
        "#bb0000": "5",
        "#cc0000": "6",
        "#dd0000": "7",
        "#ee0000": "8",
        "#ff0000": "9"
    }
    var colour_00 = colours[block.getFieldValue('00')];
    var colour_01 = colours[block.getFieldValue('01')];
    var colour_02 = colours[block.getFieldValue('02')];
    var colour_03 = colours[block.getFieldValue('03')];
    var colour_04 = colours[block.getFieldValue('04')];
    var colour_10 = colours[block.getFieldValue('10')];
    var colour_11 = colours[block.getFieldValue('11')];
    var colour_12 = colours[block.getFieldValue('12')];
    var colour_13 = colours[block.getFieldValue('13')];
    var colour_14 = colours[block.getFieldValue('14')];
    var colour_20 = colours[block.getFieldValue('20')];
    var colour_21 = colours[block.getFieldValue('21')];
    var colour_22 = colours[block.getFieldValue('22')];
    var colour_23 = colours[block.getFieldValue('23')];
    var colour_24 = colours[block.getFieldValue('24')];
    var colour_30 = colours[block.getFieldValue('30')];
    var colour_31 = colours[block.getFieldValue('31')];
    var colour_32 = colours[block.getFieldValue('32')];
    var colour_33 = colours[block.getFieldValue('33')];
    var colour_34 = colours[block.getFieldValue('34')];
    var colour_40 = colours[block.getFieldValue('40')];
    var colour_41 = colours[block.getFieldValue('41')];
    var colour_42 = colours[block.getFieldValue('42')];
    var colour_43 = colours[block.getFieldValue('43')];
    var colour_44 = colours[block.getFieldValue('44')];
    var code = 'Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + '")';
    return [code, Python.ORDER_ATOMIC];
};


export const image_shift = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var op = a.getFieldValue("OP");
    var image = Python.valueToCode(a, 'img', Python.ORDER_ATOMIC);
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = image + '.shift_' + op + '(' + value + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_arithmetic = function (a) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var op = a.getFieldValue("OP");
    var imga = Python.valueToCode(a, 'A', Python.ORDER_ATOMIC);
    var imgb = Python.valueToCode(a, 'B', Python.ORDER_ATOMIC);
    if (op == 'INTERSECTION') {
        var code = imga + '-(' + imga + '-' + imgb + ')';
    }
    else {
        var code = imga + op + imgb;
    }
    return [code, Python.ORDER_ATOMIC];
};

export const microbit_display_scroll_string_animation = function (block) {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var value_images = Python.valueToCode(block, 'images', Python.ORDER_ATOMIC) || 'hello';
    var number_delay = Python.valueToCode(block, 'delay', Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
    var code = 'display.scroll' + '(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
    return code;
};

// export const microbit_display_scroll_string = function(block) {
//   Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   var value_images = Python.valueToCode(block, 'images', Python.ORDER_MEMBER) || 'hello';
//   var number_delay = Python.valueToCode(block, 'delay', Python.ORDER_ATOMIC);
//   var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
//   var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
//   var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
//   var code = 'display.show(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
//   return code;
// };

export const group_lcd_print = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_lcd1602'] = 'import lcd1602';
    var str1 = Python.valueToCode(this, 'TEXT', Python.ORDER_ASSIGNMENT);
    var str2 = Python.valueToCode(this, 'TEXT2', Python.ORDER_ASSIGNMENT);
    //Python.setups_['class_LCD1602'] = Python.CLASS_LCD1602_INIT;//python.js
    var code = 'mylcd.mixly_puts_two_lines(' + str1 + ', ' + str2 + ')\n';
    return code;
};

export const group_lcd_init = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_lcd1602'] = 'import lcd1602';
    var device = Python.valueToCode(this, 'device', Python.ORDER_ASSIGNMENT) || '0x27';
    //Python.setups_['class_LCD1602'] = Python.CLASS_LCD1602_INIT;//python.js
    return 'mylcd = lcd1602.LCD1602(' + device + ')\n';
};

export const group_lcd_print2 = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_lcd1602'] = 'import lcd1602';
    var str = Python.valueToCode(this, 'TEXT', Python.ORDER_ASSIGNMENT) || 'String("")';
    var row = Python.valueToCode(this, 'row', Python.ORDER_ASSIGNMENT) || '1';
    var column = Python.valueToCode(this, 'column', Python.ORDER_ASSIGNMENT) || '1';
    //Python.setups_['class_LCD1602'] = Python.CLASS_LCD1602_INIT;//python.js
    var code = 'mylcd.mixly_puts(' + str + ', ' + column + ', ' + row + ')\n'
    return code;
};

export const group_lcd_power = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_lcd1602'] = 'import lcd1602';
    var dropdown_stat = this.getFieldValue('STAT');
    var code = 'mylcd.' + dropdown_stat + '\n';
    return code;
};

export const lp2i_u8g_draw_4strings = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_oled'] = 'import oled';
    var value_text_line1 = Python.valueToCode(this, 'Text_line1', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line2 = Python.valueToCode(this, 'Text_line2', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line3 = Python.valueToCode(this, 'Text_line3', Python.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line4 = Python.valueToCode(this, 'Text_line4', Python.ORDER_ASSIGNMENT) || '\'\'';
    //Python.setups_["class_OLED12864_I2C"] = Python.CLASS_OLED12864_I2C_INIT;
    return 'mixly_oled_text(' + value_text_line1 + ', ' + value_text_line2 + ', ' + value_text_line3 + ', ' + value_text_line4 + ')\n';
};

export const display_image_size = function () {
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var data = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = this.getFieldValue('OP');
    var code = ["Image." + size + "(" + data + ")", Python.ORDER_ATOMIC];
    return code;
};

export const display_fill = function () {
    var varName = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Python.definitions_['import_oled'] = 'import oled';
    var key = this.getFieldValue('key');
    var code = varName + '.show_fill(' + key + ')\n';
    return code;
};