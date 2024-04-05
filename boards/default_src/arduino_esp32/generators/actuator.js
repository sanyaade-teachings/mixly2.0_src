import { Arduino } from '../../arduino_common/arduino_generator';

export const display_rgb_show = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n'
    // +'rgb_display_' + dropdown_rgbpin + '.show();\n'
    //+"delay(1);"
    return code;
};

export const servo_move = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    var delay_time = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ATOMIC) || '0'
    Arduino.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ',500,2500);';
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
    return code;
};

export const servo_writeMicroseconds = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Arduino.valueToCode(this, 'DEGREE', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.writeMicroseconds(' + value_degree + ');\n';
    return code;
};

export const servo_read_degrees = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    Arduino.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.read()';
    return [code, Arduino.ORDER_ATOMIC];
};

export const controls_tone = function () {
    Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var fre = Arduino.valueToCode(this, 'FREQUENCY', Arduino.ORDER_ASSIGNMENT) || '0';
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    var DELAY_TIME = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " tone(" + dropdown_pin + ", " + fre + ", " + DELAY_TIME + ", " + channel + ");\n";
    return code;
};

export const controls_notone = function () {
    var dropdown_pin = Arduino.valueToCode(this, 'PIN', Arduino.ORDER_ATOMIC);
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " noTone(" + dropdown_pin + ", " + channel + ");\n";
    return code;
};
export const onboard_tone = function () {
    Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
    var fre = Arduino.valueToCode(this, 'FREQUENCY', Arduino.ORDER_ASSIGNMENT) || '0';
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    var DELAY_TIME = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " tone(BUZZER, " + fre + ", " + DELAY_TIME + ", " + channel + ");\n";
    return code;
};

export const onboard_notone = function () {
    var channel = Arduino.valueToCode(this, 'CHANNEL', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " noTone(BUZZER, " + channel + ");\n";
    return code;
};
//执行器-电机转动
export const Mixly_motor = function () {
    var SPEED_PIN = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var DIR_PIN = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ASSIGNMENT) || '0';
    var code = 'setMotor(' + SPEED_PIN + ', ' + DIR_PIN + ', ' + speed + ');\n';
    Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>';
    Arduino.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_S'] = 'pinMode(' + SPEED_PIN + ', OUTPUT);';
    Arduino.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_D'] = 'pinMode(' + DIR_PIN + ', OUTPUT);';
    Arduino.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_S_W'] = 'digitalWrite(' + SPEED_PIN + ', LOW);';
    Arduino.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_D_W'] = 'digitalWrite(' + DIR_PIN + ', LOW);';
    var funcName = 'setMotor';
    var code2 = 'void ' + funcName + '(int speedpin,int dirpin, int speed)\n '
        + '{\n'
        + '  if (speed == 0)\n'
        + '  {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, 0);\n'
        + '  } \n'
        + '  else if (speed > 0)\n'
        + '  {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, speed);\n'
        + '  }\n'
        + '  else\n'
        + '  {\n'
        + '    if(speed < -255)\n'
        + '      speed = -255;\n'
        + '    digitalWrite(dirpin, HIGH);\n'
        + '    analogWrite(speedpin, 255 + speed);\n'
        + '  }\n'
        + '}\n';
    Arduino.definitions_[funcName] = code2;
    return code;
};

export const motor_id = function () {
    var code = this.getFieldValue('CHANNEL');
    return [code, Arduino.ORDER_ATOMIC];
};

export const HR8833_Motor_Setup = function () {
    var motor_id = Arduino.valueToCode(this, 'MOTOR_ID', Arduino.ORDER_ATOMIC);
    var pin1 = Arduino.valueToCode(this, 'PIN1', Arduino.ORDER_ATOMIC);
    var pin2 = Arduino.valueToCode(this, 'PIN2', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['HR8833_Motor_Setup_fun'] = 'void HR8833_Motor_Setup(int motorID,int pin1,int pin2){//电机初始化 ID=1~4 定义四组电机\n'
        + '  ledcSetup(motorID*2-2, 5000, 8);\n'
        + '  ledcAttachPin(pin1, motorID*2-2);\n'
        + '  ledcSetup(motorID*2-1, 5000, 8);\n'
        + '  ledcAttachPin(pin2, motorID*2-1);\n'
        + '}';
    Arduino.setups_['motorID_' + motor_id] = 'HR8833_Motor_Setup(' + motor_id + ',' + pin1 + ',' + pin2 + ');';
    var code = '';
    return code;
};

export const HR8833_Motor_Speed = function () {
    var motor_id = Arduino.valueToCode(this, 'MOTOR_ID', Arduino.ORDER_ATOMIC);
    var speed = Arduino.valueToCode(this, 'SPEED', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['HR8833_Motor_Speed_fun'] = 'void HR8833_Motor_Speed(int motorID,int speed){//电机速度设置 ID=1~4,speed=-255~255\n'
        + '  if (speed == 0){  \n'
        + '    ledcWrite(motorID*2-2, 0);\n'
        + '    ledcWrite(motorID*2-1, 0);\n'
        + '  }\n'
        + '  else if (speed > 0){\n'
        + '    ledcWrite(motorID*2-2, speed);\n'
        + '    ledcWrite(motorID*2-1, 0);\n'
        + '  }\n'
        + '  else{\n'
        + '    ledcWrite(motorID*2-2, 0);\n'
        + '    ledcWrite(motorID*2-1, -speed);\n'
        + '  }\n'
        + '}\n';
    var code = 'HR8833_Motor_Speed(' + motor_id + ',' + speed + ');\n';
    return code;
};

export const handbit_motor_move = function () {
    var dropdown_type = this.getFieldValue('type');
    var value_speed = Arduino.valueToCode(this, 'speed', Arduino.ORDER_ATOMIC);
    Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Arduino.setups_['setup_i2c_23_22'] = 'Wire.begin(23, 22);';
    Arduino.definitions_['HandBit_Motor_Speed_fun'] = 'void HandBit_Motor_Speed(int pin, int speed){//电机速度设置 pin=1~2,speed=--100~100\n'
        + '  Wire.beginTransmission(0x10);\n'
        + '  Wire.write(pin);\n'
        + '  Wire.write(speed);\n'
        + '  Wire.endTransmission();\n'
        + '}';
    var code = 'HandBit_Motor_Speed(' + dropdown_type + ', ' + value_speed + ');\n';
    return code;
};