import { Arduino } from '../../arduino_common/arduino_generator';

export const text = function () {
    // Text value.
    //var code = 'String('+Arduino.quote_(this.getFieldValue('TEXT'))+')';
    var code = Arduino.quote_(this.getFieldValue('TEXT'));
    return [code, Arduino.ORDER_ATOMIC];
};

export const text_char = function () {
    var code = '\'' + this.getFieldValue('TEXT') + '\'';
    return [code, Arduino.ORDER_ATOMIC];
};

export const text_join = function () {
    // Text value.
    var a = 'String(' + Arduino.valueToCode(this, 'A', Arduino.ORDER_ATOMIC) + ')';
    var b = 'String(' + Arduino.valueToCode(this, 'B', Arduino.ORDER_ATOMIC) + ')';
    return [a + ' + ' + b, Arduino.ORDER_ATOMIC];
};

export const text_to_number = function () {
    var towhat = this.getFieldValue('TOWHAT');
    var str = 'String(' + Arduino.valueToCode(this, 'VAR', Arduino.ORDER_ATOMIC) + ')';
    return [str + '.' + towhat + '()', Arduino.ORDER_ATOMIC];
};

export const ascii_to_char = function () {
    var asciivalue = Arduino.valueToCode(this, 'VAR', Arduino.ORDER_ATOMIC) || '0'
    return ['char(' + asciivalue + ')', Arduino.ORDER_ATOMIC];
};

export const char_to_ascii = function () {
    var charvalue = '\'' + this.getFieldValue('TEXT') + '\'';
    return ['toascii(' + charvalue + ')', Arduino.ORDER_ATOMIC];
};

export const number_to_text = function () {
    var towhat = this.getFieldValue('TOWHAT');
    var str = Arduino.valueToCode(this, 'VAR', Arduino.ORDER_ATOMIC) || '0'
    return ['String(' + str + ", " + towhat + ")", Arduino.ORDER_ATOMIC];
};

export const text_length = function () {
    var str = Arduino.valueToCode(this, 'VAR', Arduino.ORDER_ATOMIC) || '""';
    return ['String(' + str + ')' + '.length()', Arduino.ORDER_ATOMIC];
};

export const text_char_at = function () {
    var str = Arduino.valueToCode(this, 'VAR', Arduino.ORDER_ATOMIC) || '""';
    var at = Arduino.valueToCode(this, 'AT', Arduino.ORDER_ATOMIC) || '0';
    return ['String(' + str + ')' + '.charAt(' + at + ')', Arduino.ORDER_ATOMIC];
};

export const text_equals_starts_ends = function () {
    var str1 = 'String(' + (Arduino.valueToCode(this, 'STR1', Arduino.ORDER_ATOMIC) || '""') + ')';
    var str2 = 'String(' + (Arduino.valueToCode(this, 'STR2', Arduino.ORDER_ATOMIC) || '""') + ')';
    var dowhat = this.getFieldValue('DOWHAT');
    return [str1 + '.' + dowhat + '(' + str2 + ')', Arduino.ORDER_ATOMIC];
};

export const text_compareTo = function () {
    var str1 = 'String(' + (Arduino.valueToCode(this, 'STR1', Arduino.ORDER_ATOMIC) || '""') + ')';
    var str2 = 'String(' + (Arduino.valueToCode(this, 'STR2', Arduino.ORDER_ATOMIC) || '""') + ')';
    return [str1 + '.compareTo(' + str2 + ')', Arduino.ORDER_ATOMIC];
};
//小数获取有效位
export const decimal_places = function () {
    var numeral = Arduino.valueToCode(this, 'numeral', Arduino.ORDER_ATOMIC);
    var decimal_places = Arduino.valueToCode(this, 'decimal_places', Arduino.ORDER_ATOMIC);
    var code = 'String(' + numeral + ', ' + decimal_places + ')';
    return [code, Arduino.ORDER_ATOMIC];
};
//截取字符串
export const substring = function () {
    var name = Arduino.valueToCode(this, 'name', Arduino.ORDER_ATOMIC);
    var Start = Arduino.valueToCode(this, 'Start', Arduino.ORDER_ATOMIC);
    var end = Arduino.valueToCode(this, 'end', Arduino.ORDER_ATOMIC);
    var code = 'String(' + name + ').substring(' + Start + ',' + end + ')';
    return [code, Arduino.ORDER_ATOMIC];
};
//字符串转化为大小写
export const letter_conversion = function () {
    var type = this.getFieldValue('type');
    var String = Arduino.valueToCode(this, 'String', Arduino.ORDER_ATOMIC);
    var code = '' + String + '' + type + ';\n';
    return code;
};

//字符串变量替换
export const data_replacement = function () {
    var String = Arduino.valueToCode(this, 'String', Arduino.ORDER_ATOMIC);
    var replace = Arduino.valueToCode(this, 'replace', Arduino.ORDER_ATOMIC);
    var source_data = Arduino.valueToCode(this, 'source_data', Arduino.ORDER_ATOMIC);
    var code = '' + String + '.replace(' + source_data + ', ' + replace + ');\n';
    return code;
};

//消除非可视字符
export const eliminate = function () {
    var String = Arduino.valueToCode(this, 'String', Arduino.ORDER_ATOMIC);
    var code = '' + String + '.trim();\n';
    return code;
};

//检测是否以特定字符串开头或结尾
export const first_and_last = function () {
    var type = this.getFieldValue('type');
    var String = Arduino.valueToCode(this, 'String', Arduino.ORDER_ATOMIC);
    var String1 = Arduino.valueToCode(this, 'String1', Arduino.ORDER_ATOMIC);
    var code = 'String(' + String + ')' + type + '(' + String1 + ')';
    return [code, Arduino.ORDER_ATOMIC];
};

//数据类型转换
export const type_conversion = function () {
    var variable = Arduino.valueToCode(this, 'variable', Arduino.ORDER_ATOMIC);
    var type = this.getFieldValue('type');
    var code = '' + type + '(' + variable + ')';
    return [code, Arduino.ORDER_ATOMIC];
};
export const String_indexOf = function () {
    var str1 = Arduino.valueToCode(this, 'str1', Arduino.ORDER_ATOMIC);
    var str2 = Arduino.valueToCode(this, 'str2', Arduino.ORDER_ATOMIC);
    var code = 'String(' + str1 + ').indexOf(String(' + str2 + '))';
    return [code, Arduino.ORDER_ATOMIC];
};
export const text_join2 = function () {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Arduino.valueToCode(this, 'ADD' + n,
            Arduino.ORDER_NONE) || '0';
    }
    var code1 = '';
    for (var n = 0; n < this.itemCount_; n++) {
        code1 = code1 + ' + ' + 'String(' + code[n] + ')';
    }
    code1 = code1.substring(3);
    return [code1, Arduino.ORDER_ATOMIC];
};

//字符串转长整数
export const String_to_Long_Integer = function() {
    var data= Arduino.valueToCode(this, 'data', Arduino.ORDER_ATOMIC);
    var type= this.getFieldValue('type');
    var code = 'strtol(String(' +data+ ').c_str(), NULL, ' +type+ ')';
    return [code, Arduino.ORDER_ATOMIC];
};