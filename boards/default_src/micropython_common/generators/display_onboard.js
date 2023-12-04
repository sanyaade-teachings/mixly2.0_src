import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const display_show_image = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.shows(" + data + ")\n";
    return code;
}

export const display_show_image_or_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = "onboard_matrix.shows(" + data + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const display_show_frame_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.frame(" + data + ")\n";
    return code;
}

export const display_show_frame_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.frame(" + data + ',delay = ' + time + ")\n";
    return code;
}

export const display_scroll_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.scroll(" + data + ")\n";
    return code;
}


export const display_scroll_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.scroll(" + data + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const display_image_builtins = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var dropdown_image = block.getFieldValue('image');
    var code = 'onboard_matrix.' + dropdown_image;
    return [code, Python.ORDER_ATOMIC];
};

export const display_image_builtins_all = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var dropdown_image = block.getFieldValue('image');
    var code = 'onboard_matrix.' + dropdown_image;
    return [code, Python.ORDER_ATOMIC];
};



export const display_image_create = function (block) {
    var colours = {
        "#000000": "0",
        //"#440000": "1",
        //"#660000": "2",
        //"#880000": "3",
        //"#aa0000": "4",
        //"#bb0000": "5",
        //"#cc0000": "6",
        //"#dd0000": "7",
        //"#ee0000": "8",
        "#ff0000": "1"
    }
    function pad(num) {
        let newNum = '';
        if (num.length % 2 === 1) {
            num = '0' + num;
        }
        if (num.length < 8) {
            let k = 8 - num.length
            for (let i = 1; i <= k; i++) {
                num = '0' + num;
            }
        }

        for (let i = 1; i <= num.length; i++)
            if (i % 2 === 0 && i !== num.length)
                newNum = newNum + num[i - 1] + ',0x';
            else
                newNum += num[i - 1];
        return '0x' + newNum;
    }
    let colorList = [];
    for (let i = 0; i < 12; i++) {
        let colorRow = '';
        let colorNum = 0;
        let correct = 0;

        for (let j = 0; j < 32; j++) {
            if (j < 8) {
                correct = 7 - j
            }
            else if (j < 16) {
                correct = 23 - j
            }
            else if (j < 24) {
                correct = 39 - j
            }
            else if (j < 32) {
                correct = 55 - j
            }
            colorNum += Number(colours[block.getFieldValue(i + '-' + j)]) * Math.pow(2, 31 - correct);

        }
        colorRow += pad(colorNum.toString(16));
        colorList.unshift(colorRow);
    }
    let codelist = [];
    for (let i = 0; i < colorList.length; i++) {
        codelist[i] = colorList[colorList.length - 1 - i];
    }
    //var code = "bytearray(b'" + colorList.join('') + "')";
    var code = '[' + codelist + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const display_clear = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var code = 'onboard_matrix.fill(0)\n' + 'onboard_matrix.show()\n';
    return code;
};


export const image_arithmetic = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var op = a.getFieldValue("OP");
    var imga = Python.valueToCode(a, 'A', Python.ORDER_ATOMIC);
    var imgb = Python.valueToCode(a, 'B', Python.ORDER_ATOMIC);
    var code = 'onboard_matrix.map_' + op + '(' + imga + ',' + imgb + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_invert = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var imga = Python.valueToCode(a, 'A', Python.ORDER_ATOMIC);
    var code = 'onboard_matrix.map_invert(' + imga + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const display_shift = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var op = a.getFieldValue("OP");
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = 'onboard_matrix.' + op + '(' + value + ')\n';
    return code;
};

export const display_get_pixel = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = 'onboard_matrix.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, Python.ORDER_ATOMIC];
};

export const display_bright_point = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = 'onboard_matrix.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + 'onboard_matrix.show()\n';
    return code;
}

export const display_get_screen_pixel = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var code = 'onboard_matrix.get_brightness()';
    return [code, Python.ORDER_ATOMIC];
};



export const display_bright_screen = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var code = 'onboard_matrix.set_brightness(' + x + ')\n';
    return code;
};



//mixgo_me onboard_matrix below:




export const mixgome_display_image_create = function (block) {
    var colours = {
        "#000000": "0",
        "#ff0000": "1"
    }
    function pad(num) {
        let newNum = '';
        if (num.length % 2 === 1) {
            num = '0' + num;
        }

        for (let i = 1; i <= num.length; i++)
            if (i % 2 === 0 && i !== num.length)
                newNum = newNum + num[i - 1] + '\\x';
            else
                newNum += num[i - 1];
        return '\\x' + newNum;
    }
    let colorList = [];
    for (let i = 0; i < 5; i++) {
        let colorRow = '';
        let colorNum = 0;
        for (let j = 0; j < 8; j++) {
            colorNum += Number(colours[block.getFieldValue((4 - i) + '-' + j)]) * Math.pow(2, j);
        }
        colorRow += pad(colorNum.toString(16));
        colorList.unshift(colorRow);
    }

    var code = "bytearray(b'" + colorList.join('') + "')";
    return [code, Python.ORDER_ATOMIC];
};




export const mixgome_display_font = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var op = a.getFieldValue("OP");
    var code = 'onboard_matrix.font(' + op + ')\n';
    return code;
};

export const mixgo_display_image_create_new = function (block) {
    var colours = {
        "#000000": "0",
        "#ff0000": "1"
    }
    function pad(num) {
        let newNum = '';
        if (num.length % 2 === 1) {
            num = '0' + num;
        }
        while (num.length < 4) {
            num = '0' + num;
        }
        for (let i = 1; i <= num.length; i++)
            if (i % 2 === 0 && i !== num.length)
                newNum = newNum + num[i - 1] + '\\x';
            else
                newNum += num[i - 1];
        return '\\x' + newNum;
    }
    let colorList = [];
    for (let i = 0; i < 8; i++) {
        let colorRow = '';
        let colorNum = 0;
        for (let j = 0; j < 16; j++) {
            var c = (j + 8) % 16
            colorNum += Number(colours[block.getFieldValue((7 - i) + '-' + c)]) * Math.pow(2, j);
        }
        colorRow += pad(colorNum.toString(16));
        colorList.unshift(colorRow);
    }

    var code = "bytearray(b'" + colorList.join('') + "')";
    return [code, Python.ORDER_ATOMIC];
};


//mpython

export const mpython_pbm_image = function (block) {
    var code = block.getFieldValue('path');
    var sort = ['expression_picture', 'eye_picture', 'informatio_picture', 'object_picture', 'progres_picture']
    var img = [["Angry", "Bored", "Confused", "Happy", "Heart", "Paper", "Rock", "Sad", "Scissors", "Silly", "Sleep", "Small_heart", "Small_paper", "Small_rock", "Small_scissors", "Smile", "Surprise", "Wonderful"], ["Eyes_Angry", "Awake", "Black_eye", "Bottom_left", "Bottom_right", "Crazy_1", "Crazy_2", "Disappointed", "Dizzy", "Down", "Hurt", "Evil", "Knocked_out", "Love", "Middle_left", "Middle_right", "Neutral", "Nuclear", "Pinch_left", "Pinch_middle", "Pinch_right", "Tear", "Tired_middle", "Tired_left", "Tired_right", "Toxic", "Up", "Winking"], ["Accept", "Backward", "Decline", "Forward", "Left", "No_go", "Question_mark", "Right", "Stop_1", "Stop_2", "Thumbs_down", "Thumbs_up", "Warning"], ["Bomb", "Boom", "Fire", "Flowers", "Forest", "Lightning", "Light_off", "Light_on", "Night", "Pirate", "Snow", "Target"], ["Bar_0", "Bar_1", "Bar_2", "Bar_3", "Bar_4", "Dial_0", "Dial_1", "Dial_2", "Dial_3", "Dial_4", "Dots_0", "Dots_1", "Dots_2", "Dots_3", "Hourglass_0", "Hourglass_1", "Hourglass_2", "Timer_0", "Timer_1", "Timer_2", "Timer_3", "Timer_4", "Water_level_0", "Water_level_1", "Water_level_2", "Water_level_3"]]
    for (var i = 0; i < 5; i++) {
        if (img[i].indexOf(code) != -1) {
            var tag = i;
            break;
        }
    }
    Python.definitions_['import_' + sort[tag] + '_' + code] = "from " + sort[tag] + " import " + code;
    return [code, Python.ORDER_ATOMIC];
}


export const onboard_oled_show_image = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.image(" + data + ")\n";
    return code;
}

export const onboard_oled_show_image_xy = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ")\n";
    return code;
}

export const onboard_oled_show_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.shows(" + data + ")\n";
    return code;
}

export const onboard_oled_show_image_or_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = "onboard_oled.shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const onboard_oled_show_frame_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.frame(" + data + ")\n";
    return code;
}

export const onboard_oled_show_frame_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.frame(" + data + ',size = ' + size + ',delay = ' + time + ")\n";
    return code;
}

export const onboard_oled_scroll_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.scroll(" + data + ")\n";
    return code;
}


export const onboard_oled_scroll_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var code = "onboard_oled.scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const onboard_oled_clear = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var code = 'onboard_oled.fill(0)\n' + 'onboard_oled.show()\n';
    return code;
};

export const onboard_oled_shift = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var op = a.getFieldValue("OP");
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = 'onboard_oled.' + op + '(' + value + ')\n';
    return code;
};

export const onboard_oled_get_pixel = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = 'onboard_oled.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, Python.ORDER_ATOMIC];
};

export const onboard_oled_bright_point = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = 'onboard_oled.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + 'onboard_oled.show()\n';
    return code;
}



export const mpython_display_shape_rect = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var w = Python.valueToCode(block, 'w', Python.ORDER_ATOMIC);
    var h = Python.valueToCode(block, 'h', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var shape = block.getFieldValue('shape');
    var code = 'onboard_oled.' + shape + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + state + ')\n' + 'onboard_oled.show()\n';
    return code;
};

export const mpython_display_hvline = function (block) { //水平线
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var var_length = Python.valueToCode(block, 'length', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var hv = block.getFieldValue('dir_h_v');
    var code = 'onboard_oled.' + (('0' == hv) ? 'v' : 'h') + 'line(' + x + ', ' + y + ', ' + var_length + ', ' + state + ')\n' + 'onboard_oled.show()\n';
    return code;
};

export const mpython_display_line = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_oled";
    var x1 = Python.valueToCode(block, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(block, 'y1', Python.ORDER_ATOMIC);
    var x2 = Python.valueToCode(block, 'x2', Python.ORDER_ATOMIC);
    var y2 = Python.valueToCode(block, 'y2', Python.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var code = 'onboard_oled.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + state + ')\n' + 'onboard_oled.show()\n';
    return code;
};

//mixbot onboard_matrix below:




export const mixbot_display_image_create = function (block) {
    var colours = {
        "#000000": "0",
        "#ff0000": "1"
    }
    function pad(num) {
        let newNum = '';
        if (num.length % 2 === 1) {
            num = '0' + num;
        }

        for (let i = 1; i <= num.length; i++)
            if (i % 2 === 0 && i !== num.length)
                newNum = newNum + num[i - 1] + '\\x';
            else
                newNum += num[i - 1];
        return '\\x' + newNum;
    }
    let colorList = [];
    for (let i = 0; i < 5; i++) {
        let colorRow = '';
        let colorNum = 0;
        for (let j = 0; j < 5; j++) {
            colorNum += Number(colours[block.getFieldValue((4 - i) + '-' + j)]) * Math.pow(2, j);
        }
        colorRow += pad(colorNum.toString(16));
        colorList.unshift(colorRow);
    }

    var code = "b'" + colorList.join('') + "'";
    return [code, Python.ORDER_ATOMIC];
};

export const mixbot_display_get_screen_pixel = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var code = 'onboard_matrix.screenbright()';
    return [code, Python.ORDER_ATOMIC];
};

export const mixbot_display_get_ambientbright = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var code = 'onboard_matrix.ambientbright()';
    return [code, Python.ORDER_ATOMIC];
};

export const mixbot_display_bright_screen = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var code = 'onboard_matrix.screenbright(' + x + ')\n';
    return code;
};

export const mixbot_display_rotate = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_matrix'] = "from " + version + " import onboard_matrix";
    var op = a.getFieldValue("OP");
    var code = 'onboard_matrix.direction(' + op + ')\n';
    return code;
};

export const bitbot_display_image_create = function (block) {
    var colours = {
        "#000000": "0",
        "#ff0000": "1"
    }
    function pad(num) {

        if (num.length == 1) {
            return '\\x0' + num + '\\x00';
        }
        if (num.length == 2) {
            return '\\x' + num + '\\x00';
        }
        if (num.length == 3) {
            return '\\x' + num[1] + num[2] + '\\x0' + num[0];
        }
    }
    let colorList = [];
    for (let i = 0; i < 12; i++) {
        let colorRow = '';
        let colorNum = 0;
        for (let j = 0; j < 12; j++) {
            colorNum += Number(colours[block.getFieldValue((11 - i) + '-' + j)]) * Math.pow(2, j);
        }
        colorRow += pad(colorNum.toString(16));
        colorList.unshift(colorRow);
    }

    var code = "b'" + colorList.join('') + "'";
    return [code, Python.ORDER_ATOMIC];
};

//mixgo_zi onboard tft below:
export const onboard_tft_show_image = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_tft.image(" + data + ",color=0xffff)\n";
    return code;
}

export const onboard_tft_show_image_xy = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "onboard_tft.image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',color=' + color + ")\n";
    return code;
}

export const onboard_tft_show_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_tft.shows(" + data + ",color=0xffff)\n";
    return code;
}

export const onboard_tft_show_image_or_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "onboard_tft.shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ',color=' + color + ")\n";
    return code;
}

export const onboard_tft_show_frame_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_tft.frame(" + data + ",color=0xffff)\n";
    return code;
}

export const onboard_tft_show_frame_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "onboard_tft.frame(" + data + ',size = ' + size + ',delay = ' + time + ',color=' + color + ")\n";
    return code;
}

export const onboard_tft_scroll_string = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_oled'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var code = "onboard_tft.scroll(" + data + ",color=0xffff)\n";
    return code;
}


export const onboard_tft_scroll_string_delay = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var data = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ASSIGNMENT);
    var space = Python.valueToCode(this, 'space', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "onboard_tft.scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ',color=' + color + ")\n";
    return code;
}

export const onboard_tft_display_shape_rect = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var w = Python.valueToCode(block, 'w', Python.ORDER_ATOMIC);
    var h = Python.valueToCode(block, 'h', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var shape = block.getFieldValue('shape');
    var code = 'onboard_tft.' + shape + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + color + ')\n' + 'onboard_tft.show()\n';
    return code;
};

export const onboard_tft_display_hvline = function (block) { //水平线
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var var_length = Python.valueToCode(block, 'length', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var hv = block.getFieldValue('dir_h_v');
    var code = 'onboard_tft.' + (('0' == hv) ? 'v' : 'h') + 'line(' + x + ', ' + y + ', ' + var_length + ', ' + color + ')\n' + 'onboard_tft.show()\n';
    return code;
};

export const onboard_tft_display_line = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x1 = Python.valueToCode(block, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(block, 'y1', Python.ORDER_ATOMIC);
    var x2 = Python.valueToCode(block, 'x2', Python.ORDER_ATOMIC);
    var y2 = Python.valueToCode(block, 'y2', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = 'onboard_tft.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + color + ')\n' + 'onboard_tft.show()\n';
    return code;
};

export const onboard_tft_clear = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var code = 'onboard_tft.fill(0)\n' + 'onboard_tft.show()\n';
    return code;
};

export const onboard_tft_shift = function (a) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var op = a.getFieldValue("OP");
    var value = Python.valueToCode(a, 'val', Python.ORDER_ATOMIC);
    var code = 'onboard_tft.' + op + '(' + value + ')\n';
    return code;
};

export const onboard_tft_get_pixel = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var value_x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var code = 'hex(onboard_tft.pixel(int(' + value_x + '), int(' + value_y + ')))';
    return [code, Python.ORDER_ATOMIC];
};

export const onboard_tft_bright_point = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = 'onboard_tft.pixel(int(' + x + '), int(' + y + '), ' + color + ")\n" + 'onboard_tft.show()\n';
    return code;
}

export const onboard_tft_get_screen_pixel = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var code = 'onboard_tft.get_brightness()';
    return [code, Python.ORDER_ATOMIC];
};



export const onboard_tft_bright_screen = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var code = 'onboard_tft.set_brightness(' + x + ')\n';
    return code;
};

export const onboard_tft_fill = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT);
    var code = 'onboard_tft.fill(' + color + ')\nonboard_tft.show()\n';
    return code;
};

export const onboard_tft_clock_init = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_Clock'] = "from " + version + " import Clock";
    var x = Python.valueToCode(this, 'x', Python.ORDER_ASSIGNMENT);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ASSIGNMENT);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ASSIGNMENT);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = sub + "=Clock(" + x + ',' + y + ',' + size + ',' + color + ")\n";
    return code;
}

export const onboard_tft_clock_get_rtctime = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_Clock'] = "from " + version + " import Clock";
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT);
    var code = sub + ".set_rtctime()\n";
    return code;
}

export const onboard_tft_clock_set_time = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_Clock'] = "from " + version + " import Clock";
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT);
    var h = Python.valueToCode(this, 'h', Python.ORDER_ASSIGNMENT);
    var m = Python.valueToCode(this, 'm', Python.ORDER_ASSIGNMENT);
    var s = Python.valueToCode(this, 's', Python.ORDER_ASSIGNMENT);
    var code = sub + ".set_time(" + h + ',' + m + ',' + s + ")\n";
    return code;
}

export const onboard_tft_clock_draw = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_Clock'] = "from " + version + " import Clock";
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT);
    var code = sub + ".draw_clock()\n";
    return code;
}

export const onboard_tft_clock_clear = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_Clock'] = "from " + version + " import Clock";
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ASSIGNMENT);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = sub + ".clear(" + color + ")\n";
    return code;
}

export const onboard_tft_display_shape_circle = function (block) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + '_onboard_tft'] = "from " + version + " import onboard_tft";
    var x = Python.valueToCode(block, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'y', Python.ORDER_ATOMIC);
    var r = Python.valueToCode(block, 'r', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var shape = block.getFieldValue('shape');
    var code = 'onboard_tft.ellipse(' + x + ', ' + y + ', ' + r + ', ' + r + ', ' + color + ',' + shape + ')\n' + 'onboard_tft.show()\n';
    return code;
};
