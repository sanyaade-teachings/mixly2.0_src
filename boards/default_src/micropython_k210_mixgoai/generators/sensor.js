import Python from '../../python/python_generator';

export const KEY_SELET = function () {
    var code = this.getFieldValue('KEY');
    return [code, Python.ORDER_ATOMIC];
};


export const sensor_button_init = function () {
    Python.definitions_['import board'] = 'import board';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code1 = 'button' + key + '=board.pin(' + key + ',board.GPIO.IN,board.GPIO.PULL_UP)\n';
    return code1;
};

export const sensor_button_read = function () {
    Python.definitions_['import board'] = 'import board';
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = 'not button' + key + '.value()';
    return [code, Python.ORDER_ATOMIC];
};



export const sensor_dht11 = function () {
    Python.definitions_['import dht11'] = 'import dht11';
    var TYPE = this.getFieldValue('TYPE');
    var PIN = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    if (TYPE == "2")
        var code = 'dht11.read_data(' + PIN + ')';
    else
        var code = 'dht11.read_data(' + PIN + ')[' + TYPE + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const HCSR04 = function () {
    Python.definitions_['import_sonar'] = 'import hcr04';
    var dropdown_pin1 = Python.valueToCode(this, "PIN1", Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Python.valueToCode(this, "PIN2", Python.ORDER_ASSIGNMENT);
    var code = 'hcr04.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ')';
    return [code, Python.ORDER_ATOMIC];
}


export const sensor_mpu9250_attachGestureInterrupt = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var gesture = this.getFieldValue('gesture');
    var branch = Python.statementToCode(this, 'DO');
    var d = branch || Python.PASS;
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if ' + v + '.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}

export const sensor_mpu9250_gesture = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var gesture = this.getFieldValue('gesture');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_is_gesture("' + gesture + '")';
    return [code, Python.ORDER_ATOMIC];
}


export const sensor_mpu9250_get_acceleration = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_get_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_adxl345_get_acceleration = function () {
    Python.definitions_['import_adxl345'] = 'import adxl345';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code;
    if (key == 'x') {
        code = v + '.readX()';
    } else if (key == 'y') {
        code = v + '.readY()';
    } else if (key == 'z') {
        code = v + '.readZ()';
    } else if (key == 'values') {
        code = v + '.readXYZ()';
    }
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_get_magnetic = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_magnetic_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_get_gyro = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var key = this.getFieldValue('key');
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_gyro_' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mpu9250_calibrate_compass = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return '' + v + '.calibrate()\n';
};

export const sensor_mpu9250_temperature = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    return [v + '.mpu9250_get_temperature()', Python.ORDER_ATOMIC];
};
export const sensor_mpu9250_field_strength = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "compass")
        Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var compass = this.getFieldValue('compass');
    var a;
    if (compass == 'strength') {
        a = v + '.get_field_strength()';
    }
    else if (compass == 'heading') {
        a = v + '.heading()';
    }
    return [a, Python.ORDER_ATOMIC];
};


export const sensor_compass_reset = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    return '' + v + '.reset_calibrate()\n';
};


export const sensor_use_i2c_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var iv = Python.valueToCode(this, 'I2CSUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key == 'MPU9250') {
        Python.definitions_['import_mpu9250'] = 'import mpu9250';
        code = v + ' = mpu9250.' + key + "(" + iv + ')\n';
    } else if (key == 'BMP280') {
        Python.definitions_['import_bmp280'] = 'import bmp280';
        code = v + ' = bmp280.' + key + "(" + iv + ')\n';
    } else if (key == 'SHT20') {
        Python.definitions_['import_sht20'] = 'import sht20';
        code = v + ' = sht20.' + key + "(" + iv + ')\n';
    } else if (key == 'ADXL345') {
        Python.definitions_['import_adxl345'] = 'import adxl345';
        code = v + ' = adxl345.' + key + "(" + iv + ')\n';
    }
    return code;
};

export const sensor_bmp = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_sht = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};
