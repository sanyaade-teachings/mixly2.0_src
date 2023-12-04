import Python from '../python_generator';

// export const math_number = function() {
//   // Numeric value.
//   var code = (this.getFieldValue('NUM'));
//   // -4.abs() returns -4 in Dart due to strange order of operation choices.
//   // -4 is actually an operator and a number.  Reflect this in the order.
//   var order = code < 0 ?
//       Python.ORDER_UNARY_PREFIX : Python.ORDER_ATOMIC;
//   return [code, order];
// };

Python.math = {};
Python.addReservedWords("math,random,Number");

export const math_number = function () {
    // a = parseFloat(a.getFieldValue("NUM"));
    // var b;
    // Infinity == a ? (a = 'float("inf")', b = Python.ORDER_FUNCTION_CALL) : -Infinity == a ? (a = '-float("inf")', b = Python.ORDER_UNARY_SIGN) : b = 0 > a ? Python.ORDER_UNARY_SIGN : Python.ORDER_ATOMIC;
    // return [a, b]

    var code = this.getFieldValue('NUM');
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        Python.ORDER_UNARY_PREFIX : Python.ORDER_ATOMIC;
    return [code, order];
};

export const math_constant = function () {
    Python.definitions_.import_math = "import math";
    var name = this.getFieldValue('CONSTANT');
    var code = 'math.' + name;
    return [code, Python.ORDER_ATOMIC];
};

export const math_constant_mp = function () {
    Python.definitions_.import_math = "import math";
    var name = this.getFieldValue('CONSTANT');
    var code = 'math.' + name;
    return [code, Python.ORDER_ATOMIC];
};


export const math_bit = function () {
    var operator = this.getFieldValue('OP');
    var order = Python.ORDER_ATOMIC;
    var argument0 = Python.valueToCode(this, 'A', order) || '0';
    var argument1 = Python.valueToCode(this, 'B', order) || '0';
    var code = '(' + argument0 + operator + argument1 + ')';
    return [code, order];
};


export const math_arithmetic = function (a) {
    var b = {
            ADD: [" + ", Python.ORDER_ADDITIVE],
            MINUS: [" - ", Python.ORDER_ADDITIVE],
            MULTIPLY: [" * ", Python.ORDER_MULTIPLICATIVE],
            DIVIDE: [" / ", Python.ORDER_MULTIPLICATIVE],
            QUYU: [' % ', Python.ORDER_MULTIPLICATIVE],//增加取余操作
            ZHENGCHU: [' // ', Python.ORDER_MULTIPLICATIVE],//增加整除操作
            POWER: [" ** ", Python.ORDER_EXPONENTIATION]
        }[a.getFieldValue("OP")],
        c = b[0],
        b = b[1],
        d = Python.valueToCode(a, "A", b) || "0";
    a = Python.valueToCode(a, "B", b) || "0";
    return [d + c + a, b]
};

export const math_selfcalcu = function () {
    var argument0 = Python.valueToCode(this, 'A', Python.ORDER_RELATIONAL) || '0';
    var argument1 = Python.valueToCode(this, 'B', Python.ORDER_RELATIONAL) || '0';
    var operator = this.getFieldValue('OP');
    switch (operator) {
    case 'ADD': var op = '+='; break;
    case 'MINUS': var op = '-='; break;
    case 'MULTIPLY': var op = '*='; break;
    case 'DIVIDE': var op = '/='; break;
    case 'QUYU': var op = '%='; break;
    case 'ZHENGCHU': var op = '//='; break;
    case 'POWER': var op = '**='; break;
    }
    var code = argument0 + ' ' + op + ' ' + argument1 + '\n';
    return code;
};



export const math_single = function (a) {
    var b = a.getFieldValue("OP"),
        c;
    if ("NEG" == b)
        return c = Python.valueToCode(a, "NUM", Python.ORDER_UNARY_SIGN) || "0", ["-" + c, Python.ORDER_UNARY_SIGN];
    Python.definitions_['import_math'] = "import math";
    a = "SIN" == b || "COS" == b || "TAN" == b ? Python.valueToCode(a, "NUM", Python.ORDER_MULTIPLICATIVE) || "0" : Python.valueToCode(a, "NUM", Python.ORDER_NONE) || "0";
    switch (b) {
    case "ABS":
        c = "math.fabs(" + a + ")";
        break;
    case "ROOT":
        c = "math.sqrt(" +
                a + ")";
        break;
    case "LN":
        c = "math.log(" + a + ")";
        break;
    case "LOG10":
        c = "math.log10(" + a + ")";
        break;
    case "EXP":
        c = "math.exp(" + a + ")";
        break;
    case "POW10":
        c = "math.pow(10," + a + ")";
        break;
    case "ROUND":
        c = "round(" + a + ")";
        break;
    case "ROUNDUP":
        c = "math.ceil(" + a + ")";
        break;
    case "ROUNDDOWN":
        c = "math.floor(" + a + ")";
        break;
    case "SIN":
        c = "math.sin(" + a + ")";
        break;
    case "COS":
        c = "math.cos(" + a + ")";
        break;
    case "TAN":
        c = "math.tan(" + a + ")";
        break;
    case "++":
        c = "++(" + a + ")";
        break;
    case "--":
        c = "--(" + a + ")";
        break;
    case "-":
        c = "-(" + a + ")";
        break;
    default:
    }
    if (c)
        return [c, Python.ORDER_EXPONENTIATION];
    switch (b) {
    case "ASIN":
        c = "math.degrees(math.asin(" + a + "))";
        break;
    case "ACOS":
        c = "math.degrees(math.acos(" + a + "))";
        break;
    case "ATAN":
        c = "math.degrees(math.atan(" + a + "))";
        break;
    }
    return [c, Python.ORDER_MULTIPLICATIVE]
};


export const math_trig = math_single;

export const math_dec = function () {
    var argument0 = Python.valueToCode(this, 'NUM', Python.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + argument0 + ')';
    return [code, Python.ORDER_ATOMIC];

};

export const math_to_int = function () {
    var argument0 = Python.valueToCode(this, 'A', Python.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = "";
    if (operator === "round") {
        code = operator + '(' + argument0 + ')';
    } else {
        code = "math." + operator + '(' + argument0 + ')';
        Python.definitions_.import_math = "import math";
    }
    return [code, Python.ORDER_ATOMIC];
};

export const math_max_min = function () {
    var a = Python.valueToCode(this, 'A', Python.ORDER_NONE) || '0';
    var b = Python.valueToCode(this, 'B', Python.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + a + ', ' + b + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const math_random = function () {
    Python.definitions_.import_random = "import random";
    // Random integer between [X] and [Y].
    var type = this.getFieldValue('TYPE');
    var argument0 = Python.valueToCode(this, 'FROM',
        Python.ORDER_NONE) || '0';
    var argument1 = Python.valueToCode(this, 'TO',
        Python.ORDER_NONE) || '0';
    if (type == 'int') {
        var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
    } else if (type == 'float') {
        var code = 'random.uniform(' + argument0 + ', ' + argument1 + ')';
    }
    return [code, Python.ORDER_UNARY_POSTFIX];
};


export const math_map = function () {
    var value_num = Python.valueToCode(this, 'NUM', Python.ORDER_NONE);
    var value_fl = Python.valueToCode(this, 'fromLow', Python.ORDER_ATOMIC);
    var value_fh = Python.valueToCode(this, 'fromHigh', Python.ORDER_ATOMIC);
    var value_tl = Python.valueToCode(this, 'toLow', Python.ORDER_ATOMIC);
    var value_th = Python.valueToCode(this, 'toHigh', Python.ORDER_ATOMIC);
    Python.definitions_['import_mixpy_math_map'] = "from mixpy import math_map";
    var code = 'math_map(' + value_num + ', ' + value_fl + ', ' + value_fh + ', ' + value_tl + ', ' + value_th + ')';
    return [code, Python.ORDER_NONE];
};

export const math_constrain = function () {
    // Constrain a number between two limits.
    var argument0 = Python.valueToCode(this, 'VALUE',
        Python.ORDER_NONE) || '0';
    var argument1 = Python.valueToCode(this, 'LOW',
        Python.ORDER_NONE) || '0';
    var argument2 = Python.valueToCode(this, 'HIGH',
        Python.ORDER_NONE) || '0';
    var code = 'min(max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
    return [code, Python.ORDER_UNARY_POSTFIX];
};



export const math_number_base_conversion = function (a) {
    var c1 = a.getFieldValue("OP");
    var d = Python.valueToCode(this, 'NUM', Python.ORDER_NONE) || '0';
    var c2 = a.getFieldValue("OP2");
    Python.definitions_['import_math'] = "import math";
    var param1 = "";
    var param2 = "10";
    if (c1 == "two") {
        param2 = '2';
    } else if (c1 == "eight") {
        param2 = '8'
    } else if (c1 == "ten") {
        param2 = '10'
    } else if (c1 == "sixteen") {
        param2 = '16'
    }

    if (c2 == "two") {
        param1 = 'bin';
    } else if (c2 == "eight") {
        param1 = 'oct'
    } else if (c2 == "ten") {
        param1 = ''
    } else if (c2 == "sixteen") {
        param1 = 'hex'
    }
    if (param1 == "") {
        var code = "int(str(" + d + "), " + param2 + ")";
    } else {
        var code = param1 + "(int(str(" + d + "), " + param2 + "))";

    }
    return [code, Python.ORDER_ATOMIC];
};

export const math_random_seed = function () {
    // Random integer between [X] and [Y].
    Python.definitions_.import_random = "import random";
    var a = Python.valueToCode(this, 'NUM', Python.ORDER_NONE) || '0';
    var code = 'random.seed(' + a + ');' + '\n';
    return code;
};

export const math_indexer_number = function () {
    var code = this.getFieldValue('NUM');
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        Python.ORDER_UNARY_PREFIX : Python.ORDER_ATOMIC;
    return [code, order];
}

export const math_round = function () {
    var argument0 = Python.valueToCode(this, 'VALUE',
        Python.ORDER_NONE) || '0';
    var argument1 = Python.valueToCode(this, 'VAR',
        Python.ORDER_NONE) || '0';

    var code = 'round(' + argument0 + ', ' + argument1 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const base_map = math_map