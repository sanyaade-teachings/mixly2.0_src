import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const turtle_create = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    //Python.definitions_['var_declare'+varName] = varName+'= '+ 'turtle.Turtle()\n';
    var code = varName + ' = ' + 'turtle.Turtle()\n';
    return code;
    // return '';
};

export const turtle_done = function () {
    Python.definitions_.import_turtle = "import turtle";
    var code = 'turtle.done()\n';
    return code;
};

export const turtle_exitonclick = function () {
    Python.definitions_.import_turtle = "import turtle";
    var code = 'turtle.exitonclick()\n';
    return code;
};

export const turtle_move = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + direction + "(" + num + ')\n';
    return code;
};

export const turtle_rotate = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + direction + "(" + num + ')\n';
    return code;
};

export const turtle_setheading = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.setheading(' + argument + ')\n';
    return code;
};

export const turtle_screen_delay = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.screen.delay(' + argument + ')\n';
    return code;
};

export const turtle_goto = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var xnum = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var ynum = Python.valueToCode(this, 'val', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.goto(' + xnum + ',' + ynum + ')\n';
    return code;
};


export const turtle_pos_shape = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var get = this.getFieldValue('DIR');
    var code = varName + '.' + get + '()';
    return [code, Python.ORDER_ATOMIC];
};


export const turtle_clear = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var clear = this.getFieldValue('DIR');
    var code = varName + "." + clear + "(" + ')\n';
    return code;
};

export const turtle_penup = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var penup = this.getFieldValue('DIR');
    var code = varName + "." + penup + "(" + ')\n';
    return code;
};

export const turtle_fill = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var penup = this.getFieldValue('DIR');
    var code = varName + "." + penup + "_fill(" + ')\n';
    return code;
};

export const turtle_size_speed = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = this.getFieldValue('TUR');
    var size = this.getFieldValue('DIR');
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + size + "(" + num + ')\n';
    return code;
};

export const turtle_size = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pensize(' + argument + ')\n';
    return code;
};


export const turtle_speed = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.speed(' + argument + ')\n';
    return code;
};

export const turtle_circle = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var circle = this.getFieldValue('DIR');
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + circle + "(" + num + ')\n';
    return code;
};

export const turtle_setxy = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var xy = this.getFieldValue('DIR');
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + ".set" + xy + "(" + num + ')\n';
    return code;
};

export const turtle_circle_advanced = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var num = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + ".circle (" + num + ',' + argument + ')\n';
    return code;
};


export const turtle_visible = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var visible = this.getFieldValue('DIR');
    var code = varName + "." + visible + "(" + ')\n';
    return code;
};

export const turtle_bgcolor = function () {
    Python.definitions_.import_turtle = "import turtle";
    var color = this.getFieldValue('FIELDNAME');
    var code = "turtle." + 'bgcolor' + '("' + color + '")\n';
    return code;
};

export const turtle_pencolor = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = this.getFieldValue('FIELDNAME');
    var code = varName + "." + 'pencolor' + '("' + color + '")\n';
    return code;
};

export const turtle_fillcolor = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = this.getFieldValue('FIELDNAME');
    var code = varName + "." + 'fillcolor' + '("' + color + '")\n';
    return code;
};


export const turtle_clone = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clone()';
    return [code, Python.ORDER_ATOMIC];
};

export const turtle_bgcolor_hex = function () {
    Python.definitions_.import_turtle = "import turtle";
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "turtle." + 'bgcolor' + '(' + color + ')\n';
    return code;
};

export const turtle_pencolor_hex = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    //var color = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'pencolor' + '(' + color + ')\n';
    return code;
};

export const turtle_fillcolor_hex = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + 'fillcolor' + '(' + color + ')\n';
    return code;
};

export const turtle_bgcolor_hex_new = function () {
    Python.definitions_.import_turtle = "import turtle";
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = "turtle." + 'bgcolor' + '(' + color + ')\n';
    return code;
};

export const turtle_pencolor_hex_new = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    //var color = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'pencolor' + '(' + color + ')\n';
    return code;
};

export const turtle_fillcolor_hex_new = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + 'fillcolor' + '(' + color + ')\n';
    return code;
};

export const turtle_color_hex = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var color2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var code = varName + "." + 'color' + '(' + color1 + ',' + color2 + ')\n';
    return code;
};

export const turtle_color = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var color1 = this.getFieldValue('FIELDNAME');
    var color2 = this.getFieldValue('FIELDNAME2');
    var code = varName + "." + 'color' + '("' + color1 + '","' + color2 + '")\n';
    return code;
};

export const turtle_shape = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');

    var code = varName + ".shape('" + direction + "')\n";
    return code;
};

export const turtle_shapesize = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var argument1 = Python.valueToCode(this, 'WID', Python.ORDER_ASSIGNMENT) || '0';
    var argument2 = Python.valueToCode(this, 'LEN', Python.ORDER_ASSIGNMENT) || '0';
    var argument3 = Python.valueToCode(this, 'OUTLINE', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + ".shapesize(" + argument1 + ',' + argument2 + ',' + argument3 + ')\n';
    return code;
};

export const turtle_textinput = function () {
    Python.definitions_.import_turtle = "import turtle";
    var title = Python.valueToCode(this, 'TITLE', Python.ORDER_ATOMIC);
    var prompt = Python.valueToCode(this, 'PROMPT', Python.ORDER_ATOMIC);
    var code = "turtle.textinput" + '(' + title + ',' + prompt + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const turtle_numinput = function () {
    Python.definitions_.import_turtle = "import turtle";
    var title = Python.valueToCode(this, 'TITLE', Python.ORDER_ATOMIC);
    var prompt = Python.valueToCode(this, 'PROMPT', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'DEFAULT', Python.ORDER_ATOMIC);
    var min = Python.valueToCode(this, 'MIN', Python.ORDER_ATOMIC);
    var max = Python.valueToCode(this, 'MAX', Python.ORDER_ATOMIC);
    var code = "turtle.numinput" + '(' + title + ',' + prompt + "," + data + ',minval = ' + min + ',maxval = ' + max + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const turtle_write = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var write = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    //var color = Python.valueToCode(this, 'data', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'write' + '(' + write + ')\n';
    return code;
};

export const turtle_write_format = function () {
    Python.definitions_.import_turtle = "import turtle";
    var move = this.getFieldValue('MOVE');
    var align = this.getFieldValue('ALIGN');
    var fontname = Python.valueToCode(this, 'FONTNAME', Python.ORDER_ATOMIC);
    var fontnum = Python.valueToCode(this, 'FONTNUM', Python.ORDER_ASSIGNMENT) || '0';
    var fonttype = this.getFieldValue('FONTTYPE');
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var write = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
    return code;
};

export const turtle_write_format_skulpt = function () {
    Python.definitions_.import_turtle = "import turtle";
    var move = this.getFieldValue('MOVE');
    var align = this.getFieldValue('ALIGN');
    var fontname = Python.valueToCode(this, 'FONTNAME', Python.ORDER_ATOMIC);
    var fontnum = Python.valueToCode(this, 'FONTNUM', Python.ORDER_ASSIGNMENT) || '0';
    var fonttype = this.getFieldValue('FONTTYPE');
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var write = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = varName + "." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
    return code;
};


export const turtle_color_seclet = function () {
    var colour = this.getFieldValue('COLOR');
    var code = '"' + colour + '"'
    return [code, Python.ORDER_ATOMIC];
};

export const turtle_getscreen = function () {
    Python.definitions_.import_turtle = "import turtle";
    var turName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + turName + '.getscreen()\n';
    return code;
};

export const turtle_onkey = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var v = Python.valueToCode(this, "VAR", Python.ORDER_NONE) || "None";
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    var code = varName + ".onkey(" + callback + ", " + v + ")\n";
    return code;
};

export const turtle_onclick = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    var code = varName + ".onclick(" + callback + ")\n";
    return code;
};

export const turtle_ontimer = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var v = Python.valueToCode(this, "VAR", Python.ORDER_NONE) || "None";
    var callback = Python.valueToCode(this, "callback", Python.ORDER_NONE) || "None";
    var code = varName + ".ontimer(" + callback + ", " + v + ")\n";
    return code;
};

export const turtle_listen = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.listen()\n';
    return code;
};

export const turtle_screen_savefig = function () {
    Python.definitions_.import_turtle = "import turtle";
    var varName = Python.valueToCode(this, 'TUR', Python.ORDER_ASSIGNMENT) || '0';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = varName + ".getcanvas().postscript(file=" + file + ")\n";
    return code;
};
