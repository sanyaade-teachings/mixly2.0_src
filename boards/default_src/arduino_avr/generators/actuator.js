import { JSFuncs } from 'mixly';
import { Arduino } from '../../arduino_common/arduino_generator';
import Variables from '../../arduino_common/others/variables';

export const servo_move = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    var delay_time = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ATOMIC) || '0'
    Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
    return code;
};

export const servo_writeMicroseconds = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.writeMicroseconds(' + value_degree + ');\n';
    return code;
};

export const servo_read_degrees = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.read()';
    return [code, Arduino.ORDER_ATOMIC];
};

export const servo_move1 = function () {
    var mode = this.getFieldValue('mode');
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    var delay_time = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ATOMIC) || '0'
    if (mode == 0) {
        Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    }
    if (mode == 1) {
        Arduino.definitions_['include_Servo'] = '#include <Timer2ServoPwm.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Timer2Servo servo_' + dropdown_pin + ';';
    }
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
    return code;
};

export const servo_writeMicroseconds1 = function () {
    var mode = this.getFieldValue('mode');
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    if (mode == 0) {
        Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    }
    if (mode == 1) {
        Arduino.definitions_['include_Servo'] = '#include <Timer2ServoPwm.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Timer2Servo servo_' + dropdown_pin + ';';
    }
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.writeMicroseconds(' + value_degree + ');\n';
    return code;
};

export const servo_read_degrees1 = function () {
    var mode = this.getFieldValue('mode');
    var dropdown_pin = this.getFieldValue('PIN');
    if (mode == 0) {
        Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    }
    if (mode == 1) {
        Arduino.definitions_['include_Servo'] = '#include <Timer2ServoPwm.h>';
        Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Timer2Servo servo_' + dropdown_pin + ';';
    }
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.read()';
    return [code, Arduino.ORDER_ATOMIC];
};

export const tone_notes = function () {
    var code = this.getFieldValue('STAT');
    return [code, Arduino.ORDER_ATOMIC];
};

export const controls_tone = function () {
    /*var xmlDom = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText.indexOf("type=\"ir_recv\"") == -1 && xmlText.indexOf("type=\"ir_recv_enable\"") == -1 && xmlText.indexOf("type=\"ir_recv_raw\"") == -1) {
        this.setWarningText(null);
    }
    else {
        this.setWarningText(Blockly.Msg.IR_AND_TONE_WARNING);
    }*/

    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var fre = Arduino.valueToCode(this, 'FREQUENCY',
        Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    if (window.isNaN(dropdown_pin)) {
        code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
    } else {
        Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    }
    code += "tone(" + dropdown_pin + "," + fre + ");\n";
    return code;
};

export const controls_notone = function () {
    /*var xmlDom = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText.indexOf("type=\"ir_recv\"") == -1 && xmlText.indexOf("type=\"ir_recv_enable\"") == -1 && xmlText.indexOf("type=\"ir_recv_raw\"") == -1) {
        this.setWarningText(null);
    }
    else {
        this.setWarningText(Blockly.Msg.IR_AND_TONE_WARNING);
    }*/

    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var code = '';
    if (window.isNaN(dropdown_pin)) {
        code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
    } else {
        Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    }
    code += "noTone(" + dropdown_pin + ");\n";
    return code;
};
//执行器-蜂鸣器
export const controls_tone_noTimer = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var fre = Arduino.valueToCode(this, 'FREQUENCY', Arduino.ORDER_ASSIGNMENT) || '0';
    var dur = Arduino.valueToCode(this, 'DURATION', Arduino.ORDER_ASSIGNMENT) || '0';
    Arduino.definitions_['include_NewTone'] = '#include <NewTone.h>';
    Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "NewTone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
    return code;
};

//执行器-蜂鸣器结束声音
export const controls_notone_noTimer = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "NewNoTone(" + dropdown_pin + ");\n";
    return code;
};

export const group_stepper_setup = function () {
    var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var dropdown_pin1 = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    var steps = Arduino.valueToCode(this, 'steps', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
    Arduino.definitions_['var_declare_stepper' + varName] = 'Stepper ' + varName + '(' + steps + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
    Arduino.setups_['setup_stepper' + varName] = varName + '.setSpeed(' + speed + ');';
    return '';
};

export const group_stepper_setup2 = function () {
    var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var dropdown_pin1 = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    var dropdown_pin3 = Arduino.valueToCode(this, 'PIN3', Arduino.ORDER_ATOMIC);
    var dropdown_pin4 = Arduino.valueToCode(this, 'PIN4', Arduino.ORDER_ATOMIC);
    var steps = Arduino.valueToCode(this, 'steps', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
    Arduino.definitions_['var_declare_stepper' + varName] = 'Stepper ' + varName + '(' + steps + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ');';
    Arduino.setups_['setup_stepper' + varName] = varName + '.setSpeed(' + speed + ');';
    return '';
};

export const group_stepper_move = function () {
    var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var step = Arduino.valueToCode(this, 'step', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
    return varName + '.step(' + step + ');\n';
};

export const RGB_color_seclet = function () {
    var colour = this.getFieldValue('COLOR');
    colour = '0x' + colour.substring(1, colour.length);
    return [colour, Arduino.ORDER_NONE];
};

export const RGB_color_rgb = function () {
    var R = Arduino.valueToCode(this, 'R', Arduino.ORDER_ATOMIC);
    var G = Arduino.valueToCode(this, 'G', Arduino.ORDER_ATOMIC);
    var B = Arduino.valueToCode(this, 'B', Arduino.ORDER_ATOMIC);
    var colour = "((" + R + " & 0xffffff) << 16) | ((" + G + " & 0xffffff) << 8) | " + B;
    return [colour, Arduino.ORDER_NONE];
};

export const display_rgb_init = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var type = this.getFieldValue('TYPE');
    var value_ledcount = Arduino.valueToCode(this, 'LEDCOUNT', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel rgb_display_' + dropdown_rgbpin + ' = Adafruit_NeoPixel(' + value_ledcount + ',' + dropdown_rgbpin + ',' + type + ' + NEO_KHZ800);';
    Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    return '';
};

export const display_rgb_Brightness = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var Brightness = Arduino.valueToCode(this, 'Brightness', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    var code = 'rgb_display_' + dropdown_rgbpin + '.setBrightness(' + Brightness + ');\n';
    return code;
};

export const display_rgb = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var value_led = Arduino.valueToCode(this, '_LED_', Arduino.ORDER_ATOMIC);
    var COLOR = Arduino.valueToCode(this, 'COLOR', Arduino.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor((' + value_led + ')-1, ' + COLOR + ');\n';
    return code;
};

export const RGB_color_HSV = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var value_led = Arduino.valueToCode(this, '_LED_', Arduino.ORDER_ATOMIC);
    var H = Arduino.valueToCode(this, 'H', Arduino.ORDER_ATOMIC);
    var S = Arduino.valueToCode(this, 'S', Arduino.ORDER_ATOMIC);
    var V = Arduino.valueToCode(this, 'V', Arduino.ORDER_ATOMIC);
    var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor((' + value_led + ')-1, ' + 'rgb_display_' + dropdown_rgbpin + '.ColorHSV(' + H + ',' + S + ',' + V + '));\n';
    return code;
};

export const display_rgb_show = function () {
    var board_type = JSFuncs.getPlatform();
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n';
    if (board_type.match(RegExp(/ESP32/))) {
        code += 'rgb_display_' + dropdown_rgbpin + '.show();\n';
    }
    return code;
};

export const display_rgb_rainbow1 = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var wait_time = Arduino.valueToCode(this, 'WAIT', Arduino.ORDER_ATOMIC);
    Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos){\n'
        + '  if(WheelPos < 85){\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
        + '  }\n'
        + '  else if(WheelPos < 170){\n'
        + '    WheelPos -= 85;\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
        + '  }\n '
        + '  else{\n'
        + '    WheelPos -= 170;\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3 = 'void rainbow(uint8_t wait){\n'
        + '  uint16_t i, j;\n'
        + '  for(j=0; j<256; j++){\n'
        + '    for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
        + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n'
        + '    }\n'
        + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
        + '    delay(wait);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName3] = code3;
    var code = 'rainbow(' + wait_time + ');\n'
    return code;
};

export const display_rgb_rainbow2 = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var wait_time = Arduino.valueToCode(this, 'WAIT', Arduino.ORDER_ATOMIC);
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos){\n'
        + '  if(WheelPos < 85){\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
        + '  }\n'
        + '  else if(WheelPos < 170){\n'
        + '    WheelPos -= 85;\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
        + '  }\n'
        + '  else{\n'
        + '    WheelPos -= 170;\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3 = 'void rainbow(uint8_t wait){\n'
        + '  uint16_t i, j;\n'
        + '  for(j=0; j<256; j++){\n'
        + '    for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
        + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n'
        + '    }\n'
        + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
        + '    delay(wait);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName3] = code3;
    var funcName4 = 'rainbowCycle';
    var code4 = 'void rainbowCycle(uint8_t wait){\n'
        + '  uint16_t i, j;\n'
        + '  for(j=0; j<256*5; j++){\n'
        + '    for(i=0; i< rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
        + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + j) & 255));\n'
        + '    }\n'
        + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
        + '    delay(wait);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName4] = code4;
    var code = 'rainbowCycle(' + wait_time + ');\n'
    return code;
};

export const display_rgb_rainbow3 = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var rainbow_color = Arduino.valueToCode(this, 'rainbow_color', Arduino.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos){\n'
        + '  if(WheelPos < 85){\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
        + '  }\n'
        + '  else if(WheelPos < 170){\n'
        + '    WheelPos -= 85;\n'
        + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
        + '  }\n'
        + '  else{\n'
        + '    WheelPos -= 170;return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName2] = code2;
    if (type == "normal")
        var code3 = 'for(int RGB_RAINBOW_i = 0; RGB_RAINBOW_i < rgb_display_' + dropdown_rgbpin + '.numPixels(); RGB_RAINBOW_i++){\n'
            + '  rgb_display_' + dropdown_rgbpin + '.setPixelColor(RGB_RAINBOW_i, Wheel(' + rainbow_color + ' & 255));\n'
            + '}\n'
            + 'rgb_display_' + dropdown_rgbpin + '.show();\n';
    else
        var code3 = 'for(int RGB_RAINBOW_i = 0; RGB_RAINBOW_i < rgb_display_' + dropdown_rgbpin + '.numPixels(); RGB_RAINBOW_i++){\n'
            + '  rgb_display_' + dropdown_rgbpin + '.setPixelColor(RGB_RAINBOW_i, Wheel(((RGB_RAINBOW_i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + ' + rainbow_color + ') & 255));\n'
            + '}\n'
            + 'rgb_display_' + dropdown_rgbpin + '.show();\n';
    return code3;
};
//执行器-电机转动
export const Mixly_motor = function () {
    var PIN1 = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var PIN2 = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    var PIN_EN = Arduino.valueToCode(this, 'PIN_EN', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = 'setMotor(' + PIN1 + ', ' + PIN2 + ', ' + PIN_EN + ', ' + speed + ');\n';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
    var funcName = 'setMotor';
    var code2 = 'void ' + funcName + '(int dirpin1, int dirpin2, int speedpin, int speed) {\n'
        + '  digitalWrite(dirpin2,!digitalRead(dirpin1));\n'
        + '  if (speed == 0) {\n'
        + '    digitalWrite(dirpin1, LOW);\n'
        + '    analogWrite(speedpin, 0);\n'
        + '  } else if (speed > 0) {\n'
        + '    digitalWrite(dirpin1, LOW);\n'
        + '    analogWrite(speedpin, speed);\n'
        + '  } else {\n'
        + '    digitalWrite(dirpin1, HIGH);\n'
        + '    analogWrite(speedpin, -speed);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName] = code2;
    return code;

};
export const Motor_8833 = function () {
    var PIN1 = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var PIN2 = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = 'setMotor8833(' + PIN1 + ', ' + PIN2 + ', ' + speed + ');\n';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
    Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
    var funcName = 'setMotor8833';
    var code2 = 'void ' + funcName + '(int speedpin, int dirpin, int speed) {\n'
        + '  if (speed == 0) {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, 0);\n'
        + '  } else if (speed > 0) {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, speed);\n'
        + '  } else {\n'
        + '    digitalWrite(dirpin, HIGH);\n'
        + '    analogWrite(speedpin, 255 + speed);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName] = code2;
    return code;
};
//语音模块（68段日常用语）
export const voice_module = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var dropdown_voice = this.getFieldValue('VOICE');
    var wait_time = Arduino.valueToCode(this, 'WAIT', Arduino.ORDER_ASSIGNMENT) || '0';
    Arduino.setups_['setup_output_sda'] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'send_data(' + dropdown_voice + '); //volume control 0xE0-E7;\n';
    code += 'delay(' + wait_time + ');\n'
    var code2 = 'void send_data(int addr) {\n'
        + '  int i;\n'
        + '  digitalWrite(' + dropdown_pin + ', LOW);\n'
        + '  delay(3); //>2ms\n'
        + '  for (i = 0; i < 8; i++) {\n'
        + '    digitalWrite(' + dropdown_pin + ', HIGH);\n'
        + '    if (addr & 1) {\n'
        + '      delayMicroseconds(2400); //>2400us\n'
        + '      digitalWrite(' + dropdown_pin + ', LOW);\n'
        + '      delayMicroseconds(800);\n'
        + '    } //>800us\n'
        + '    else {\n'
        + '      delayMicroseconds(800); //>800us\n'
        + '      digitalWrite(' + dropdown_pin + ', LOW);\n'
        + '      delayMicroseconds(2400);\n'
        + '    } //>2400us\n'
        + '    addr >>= 1;\n'
        + '  }\n'
        + '  digitalWrite(' + dropdown_pin + ', HIGH);\n'
        + '}\n';
    Arduino.definitions_['funcName'] = code2;
    return code;
};

//gd5800 mp3 控制播放
export const GD5800_MP3_CONTROL = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.' + CONTROL_TYPE + '\n';
    return code;
};

export const GD5800_MP3_Set_Device = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var DEVICEID = this.getFieldValue('DEVICEID');
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.setDevice(' + DEVICEID + ');\n';
    return code;

};


//gd5800 mp3 循环模式
export const GD5800_MP3_LOOP_MODE = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var LOOP_MODE = this.getFieldValue('LOOP_MODE');
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.setLoopMode(' + LOOP_MODE + ');\n';
    return code;
};

//gd5800 mp3 EQ模式
export const GD5800_MP3_EQ_MODE = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var EQ_MODE = this.getFieldValue('EQ_MODE');
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.setEqualizer(' + EQ_MODE + ');\n';
    return code;
};

//gd5800 mp3 设置音量
export const GD5800_MP3_VOL = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var vol = Arduino.valueToCode(this, 'vol', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.setVolume(' + vol + ');\n';
    return code;
};

//gd5800 mp3 播放第N首
export const GD5800_MP3_PLAY_NUM = function () {
    var rxpin = Arduino.valueToCode(this, 'RXPIN', Arduino.ORDER_ATOMIC);
    var txpin = Arduino.valueToCode(this, 'TXPIN', Arduino.ORDER_ATOMIC);
    var NUM = Arduino.valueToCode(this, 'NUM', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
    Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
    Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
    var code = 'mp3' + rxpin + txpin + '.playFileByIndexNumber(' + NUM + ');\n';
    return code;
};

export const AFMotorRun = function () {
    Arduino.definitions_['include_AFMotor'] = '#include <AFMotor.h>';
    var motorNO = this.getFieldValue('motor');
    var direction = this.getFieldValue('direction');
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ATOMIC);
    var code = "";
    Arduino.definitions_['var_declare_motor_' + motorNO] = "AF_DCMotor" + ' motor' + motorNO + '(' + motorNO + ');';
    code = ' motor' + motorNO + ".setSpeed(" + speed + ");\n" + ' motor' + motorNO + ".run(" + direction + ");\n";
    return code;
};

export const AFMotorStop = function () {
    Arduino.definitions_['include_AFMotor'] = '#include <AFMotor.h>';
    var motorNO = this.getFieldValue('motor');
    var code = "";
    Arduino.definitions_['var_declare_motor_' + motorNO] = "AF_DCMotor" + ' motor' + motorNO + '(' + motorNO + ');';
    code = ' motor' + motorNO + ".setSpeed(0);\n" + ' motor' + motorNO + ".run(RELEASE);\n";
    return code;
};

//初始化DFPlayer Mini
export const arduino_dfplayer_mini_begin = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_dfplayer_pin = Arduino.valueToCode(this, 'dfplayer_pin', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Arduino'] = '#include "Arduino.h"';
    Arduino.definitions_['include_DFRobotDFPlayerMini'] = '#include "DFRobotDFPlayerMini.h"';
    Arduino.definitions_['var_declare_DFPlayerMini_' + text_dfplayer_name] = 'DFRobotDFPlayerMini ' + text_dfplayer_name + ';';
    Arduino.setups_['setup_DFPlayerMini_' + text_dfplayer_name] = '' + text_dfplayer_name + '.begin(' + value_dfplayer_pin + ');';
    var code = '';
    return code;
};

//定义DFPlayer Mini 所使用的串口类型
export const arduino_dfplayer_mini_pin = function () {
    var dropdown_pin_type = this.getFieldValue('pin_type');
    Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    var code = dropdown_pin_type;
    return [code, Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 设置串口通信的超时时间
export const arduino_dfplayer_mini_setTimeOut = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_timeout_data = Arduino.valueToCode(this, 'timeout_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.setTimeOut(' + value_timeout_data + ');\n';
    return code;
};

//DFPlayer Mini 设置音量
export const arduino_dfplayer_mini_volume = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_volume_data = Arduino.valueToCode(this, 'volume_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.volume(' + value_volume_data + ');\n';
    return code;
};

//DFPlayer Mini 音量+|-
export const arduino_dfplayer_mini_volume_up_down = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var dropdown_volume_type = this.getFieldValue('volume_type');
    var code = '' + text_dfplayer_name + '.' + dropdown_volume_type + '();\n';
    return code;
};

//DFPlayer Mini 设置音效
export const arduino_dfplayer_mini_EQ = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_eq_data = Arduino.valueToCode(this, 'eq_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.EQ(' + value_eq_data + ');\n';
    return code;
};

//DFPlayer Mini 定义音效类型
export const arduino_dfplayer_mini_EQ_type = function () {
    var dropdown_eq_type = this.getFieldValue('eq_type');
    var code = dropdown_eq_type;
    return [code, Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 指定播放设备
export const arduino_dfplayer_mini_outputDevice = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_outputdevice_data = Arduino.valueToCode(this, 'outputdevice_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.outputDevice(' + value_outputdevice_data + ');\n';
    return code;
};

//DFPlayer Mini 定义播放设备类型
export const arduino_dfplayer_mini_outputDevice_type = function () {
    var dropdown_outputdevice_type = this.getFieldValue('outputdevice_type');
    var code = dropdown_outputdevice_type;
    return [code, Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 设置-1
export const arduino_dfplayer_set_1 = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var dropdown_set_data = this.getFieldValue('set_data');
    var code = '' + text_dfplayer_name + '.' + dropdown_set_data + '();\n';
    return code;
};

//DFPlayer Mini 播放和循环指定曲目
export const arduino_dfplayer_play_loop = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_play_data = Arduino.valueToCode(this, 'play_data', Arduino.ORDER_ATOMIC);
    var dropdown_play_type = this.getFieldValue('play_type');
    var code = '' + text_dfplayer_name + '.' + dropdown_play_type + '(' + value_play_data + ');\n';
    return code;
};

//DFPlayer Mini 播放指定文件夹下的曲目
export const arduino_dfplayer_playFolder = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_fold_data = Arduino.valueToCode(this, 'fold_data', Arduino.ORDER_ATOMIC);
    var dropdown_fold_type = this.getFieldValue('fold_type');
    var value_play_data = Arduino.valueToCode(this, 'play_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.' + dropdown_fold_type + '(' + value_fold_data + ', ' + value_play_data + ');\n';
    return code;
};

//DFPlayer Mini 循环播放指定文件夹下的曲目
export const arduino_dfplayer_loopFolder = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_fold_data = Arduino.valueToCode(this, 'fold_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.loopFolder(' + value_fold_data + ');\n';
    return code;
};

//DFPlayer Mini 获取当前信息
export const arduino_dfplayer_read_now = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var dropdown_read_type = this.getFieldValue('read_type');
    var code = '' + text_dfplayer_name + '.' + dropdown_read_type + '()';
    return [code, Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 获取U盘|SD卡|FLASH的总文件数
export const arduino_dfplayer_readFileCounts = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_device_type = Arduino.valueToCode(this, 'device_type', Arduino.ORDER_ATOMIC);
    var dropdown_play_data = this.getFieldValue('play_data');
    var code = '' + text_dfplayer_name + '.' + dropdown_play_data + '(' + value_device_type + ')';
    return [code, Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 获取指定文件夹下的文件数
export const arduino_dfplayer_readFileCountsInFolder = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var value_folder_data = Arduino.valueToCode(this, 'folder_data', Arduino.ORDER_ATOMIC);
    var code = '' + text_dfplayer_name + '.readFileCountsInFolder(' + value_folder_data + ')';
    return [code, Arduino.ORDER_ATOMIC];
};

export const arduino_dfplayer_available = function () {
    var text_dfplayer_name = this.getFieldValue('dfplayer_name');
    var dropdown_type = this.getFieldValue('type');
    var code = '' + text_dfplayer_name + '.' + dropdown_type + '()';
    return [code, Arduino.ORDER_ATOMIC];
};
export const I2Cmotor = function () {
    var motorNO = this.getFieldValue('motor');
    var speed = Arduino.valueToCode(this, 'SPEED', Arduino.ORDER_ASSIGNMENT) || '0';
    Arduino.definitions_['include_Wire'] = '#include <Wire.h> ';
    Arduino.definitions_['include_Adafruit_PWMServoDriver'] = '#include <Adafruit_PWMServoDriver.h>';
    Arduino.definitions_['var_declare_Adafruit_PWMServoDriver'] = 'Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();';
    Arduino.setups_['setup_pwm_begin'] = 'pwm.begin();\n'
        + 'pwm.setOscillatorFrequency(27000000);\n'
        + 'pwm.setPWMFreq(400);\n'
        + 'Wire.setClock(400000);';
    var code2;
    code2 = 'void motor(int ID,int SPEED){  //0-7\n'
        + '    if(SPEED>0){pwm.setPin(ID*2, 0 );pwm.setPin(ID*2+1, (SPEED+1)*16-1);}\n'
        + '    else if(SPEED==0){pwm.setPin(ID*2, 4095 );pwm.setPin(ID*2+1, 4095);}\n'
        + '    else if(SPEED<0){pwm.setPin(ID*2, 1-(SPEED+1)*16);pwm.setPin(ID*2+1, 0);}\n'
        + '    }\n';
    Arduino.definitions_['motor'] = code2;
    var code = 'motor(' + motorNO + ',' + speed + ');\n';
    return code;
};
//M9101X mp3 单线控制播放
export const M9101X_S_MP3_CONTROL = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
    Arduino.definitions_['include_N910X'] = '#include <RL_N910X.h>';
    Arduino.definitions_['var_declare_N910X_ mp3' + dropdown_pin] = 'N910X mp3_' + dropdown_pin + '(' + dropdown_pin + ');';
    Arduino.setups_['setup_ mp3' + dropdown_pin] = 'mp3_' + dropdown_pin + '.begin();';
    var code = 'mp3_' + dropdown_pin + '.' + CONTROL_TYPE + '\n';
    return code;
};

//M9101X mp3 单线音量控制
export const M9101X_S_MP3_VOL_CONTROL = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var vol = Arduino.valueToCode(this, 'NUM', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_N910X'] = '#include <RL_N910X.h>';
    Arduino.definitions_['var_declare_N910X_ mp3' + dropdown_pin] = 'N910X mp3_' + dropdown_pin + '(' + dropdown_pin + ');';
    Arduino.setups_['setup_ mp3' + dropdown_pin] = ' mp3_' + dropdown_pin + '.begin();';
    var code = 'mp3_' + dropdown_pin + '.set_volume(' + vol + ');\n';
    return code;
};
//M9101X mp3 单线播放第N首
export const M9101X_S_MP3_PLAY_NUM = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var num = Arduino.valueToCode(this, 'NUM', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_N910X'] = '#include <RL_N910X.h>';
    Arduino.definitions_['var_declare_N910X_ mp3' + dropdown_pin] = 'N910X mp3_' + dropdown_pin + '(' + dropdown_pin + ');';
    Arduino.setups_['setup_ mp3' + dropdown_pin] = ' mp3_' + dropdown_pin + '.begin();';
    var code = 'mp3_' + dropdown_pin + '.set_play_number(' + num + ');\n';
    return code;
};