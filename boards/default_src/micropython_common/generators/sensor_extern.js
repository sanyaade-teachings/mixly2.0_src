import Python from '../../python/python_generator';
import * as Mixly from 'mixly';

export const sensor_mixgo_extern_button_is_pressed = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').is_pressed(' + dropdown_stat + ')';
    return [code, Python.ORDER_ATOMIC];
};

//ok
export const sensor_mixgo_extern_button_was_pressed = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_stat = Python.valueToCode(this, 'STAT', Python.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').was_pressed(' + dropdown_stat + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_extern_button_get_presses = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var argument = Python.valueToCode(this, 'VAR', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'mixgo.Button(' + pin + ').get_presses(' + argument + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_extern_button_attachInterrupt = function () {
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Python.valueToCode(this, 'DO', Python.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

export const sensor_mpu9250_attachGestureInterrupt = function () {
    Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = Python.statementToCode(this, 'DO');
    var d = branch || Python.PASS;
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "mpu")
        Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if ' + v + '.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}




export const sensor_distance_hrsc04 = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    Python.setups_['class_hrsc04'] =
        'class HCSR04:\n' +
        '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n' +
        '        self.trigger_pin = tpin\n' +
        '        self.echo_pin = epin\n' +
        '        self.sclk_pin = spin\n' +
        '\n' +
        '    def distance_mm(self):\n' +
        '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n' +
        '                 mosi=self.trigger_pin, miso=self.echo_pin)\n' +
        '        pre = 0\n' +
        '        post = 0\n' +
        '        k = -1\n' +
        '        length = 500\n' +
        '        resp = bytearray(length)\n' +
        '        resp[0] = 0xFF\n' +
        '        spi.write_readinto(resp, resp)\n' +
        '        # find first non zero value\n' +
        '        try:\n' +
        '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n' +
        '        except StopIteration:\n' +
        '            i = -1\n' +
        '        if i > 0:\n' +
        '            pre = bin(value).count("1")\n' +
        '            # find first non full high value afterwards\n' +
        '            try:\n' +
        '                k, value = next((ind, v)\n' +
        '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n' +
        '                post = bin(value).count("1") if k else 0\n' +
        '                k = k + i\n' +
        '            except StopIteration:\n' +
        '                i = -1\n' +
        '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n' +
        '        return dist\n' +
        '\n' +
        'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', Python.ORDER_ATOMIC];
};


export const RTC_set_datetime = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Python.definitions_['import_' + version + 'rtc_clock'] = 'from ' + version + ' import rtc_clock';
    var year = Python.valueToCode(this, "year", Python.ORDER_ASSIGNMENT);
    var month = Python.valueToCode(this, "month", Python.ORDER_ASSIGNMENT);
    var day = Python.valueToCode(this, "day", Python.ORDER_ASSIGNMENT);
    var hour = Python.valueToCode(this, "hour", Python.ORDER_ASSIGNMENT);
    var minute = Python.valueToCode(this, "minute", Python.ORDER_ASSIGNMENT);
    var second = Python.valueToCode(this, "second", Python.ORDER_ASSIGNMENT);
    var week = Python.valueToCode(this, "weekday", Python.ORDER_ASSIGNMENT);
    var millisecond = Python.valueToCode(this, "millisecond", Python.ORDER_ASSIGNMENT);
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = v + '.datetime((' + year + ',' + month + ',' + day + ',' + week + ',' + hour + ',' + minute + ',' + second + ',' + millisecond + '))\n';
    return code;
};

export const RTC_set_time = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var hour = Python.valueToCode(this, "hour", Python.ORDER_ASSIGNMENT);
    var minute = Python.valueToCode(this, "minute", Python.ORDER_ASSIGNMENT);
    var second = Python.valueToCode(this, "second", Python.ORDER_ASSIGNMENT);
    Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;
    var code = 'str(ds.Hour(' + hour + '))+ str(ds.Minute(' + minute + ')) +str(ds.Second(' + second + '))\n';
    return code;
};

export const RTC_set_date = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var year = Python.valueToCode(this, "year", Python.ORDER_ASSIGNMENT);
    var month = Python.valueToCode(this, "month", Python.ORDER_ASSIGNMENT);
    var day = Python.valueToCode(this, "day", Python.ORDER_ASSIGNMENT);
    Python.setups_['class_DS1307'] = Python.CLASS_DS1307_INIT;
    var code = 'str(ds.Year(' + year + '))+ str(ds.Month(' + month + ')) +str(ds.Day(' + day + '))\n';
    return code;
};



export const sensor_mixgo_extern_light = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'mixgo.get_brightness(' + pin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgo_extern_sound = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var code = 'mixgo.get_soundlevel(' + pin + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const sensor_mixgo_extern_pin_near = function () {
    Python.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.' + 'infrared_' + direction + '.near()';
    return [code, Python.ORDER_ATOMIC];
};


export const sensor_rtc_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
};

export const sensor_bmp = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_sht = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_machine'] = 'import machine';
    Python.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};


//pe
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
    else if (key == 'LTR308') {
        Python.definitions_['import_ltr308al'] = 'import ltr308al';
        code = v + ' = ltr308al.LTR_308ALS(' + iv + ')\n';
    } else if (key == 'LTR381RGB') {
        Python.definitions_['import_ltr381rgb'] = 'import ltr381rgb';
        code = v + ' = ltr381rgb.LTR_381RGB(' + iv + ')\n';
    } else if (key == 'HP203X') {
        Python.definitions_['import_hp203x'] = 'import hp203x';
        code = v + ' = hp203x.HP203X(' + iv + ')\n';
    } else if (key == 'SHTC3') {
        Python.definitions_['import_shtc3'] = 'import shtc3';
        code = v + ' = shtc3.' + key + "(" + iv + ')\n';
    } else if (key == 'AHT21') {
        Python.definitions_['import_ahtx0'] = 'import ahtx0';
        code = v + ' = ahtx0.AHTx0(' + iv + ')\n';
    }
    else if (key == 'VL53L0X') {
        Python.definitions_['import_vl53l0x'] = 'import vl53l0x';
        code = v + ' = vl53l0x.' + key + "(" + iv + ')\n';
    }
    else if (key == 'QMC5883L') {
        Python.definitions_['import_qmc5883l'] = 'import qmc5883l';
        code = v + ' = qmc5883l.Compass(' + iv + ')\n';
    }
    else if (key == 'MAX30102') {
        Python.definitions_['import_max30102'] = 'import max30102';
        code = v + ' = max30102.MAX30102(' + iv + ')\n';
    }
    else if (key == 'APDS9960') {
        Python.definitions_['import_apds9960'] = 'import apds9960';
        code = v + ' = apds9960.APDS9960(' + iv + ')\n';
    }
    else if (key == 'RFID') {
        Python.definitions_['import_rc522'] = 'import rc522';
        code = v + ' = rc522.RC522(' + iv + ')\n';
    }
    return code;
};

export const sensor_MAX30102_extern = function () {
    Python.definitions_['import_max30102'] = 'import max30102';
    var key = this.getFieldValue('key');
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = sub + '.heartrate()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_APDS9960_extern = function () {
    Python.definitions_['import_apds9960'] = 'import apds9960';
    var key = this.getFieldValue('key');
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_LTR308_extern = function () {
    Python.definitions_['import_ltr308al'] = 'import ltr308al';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = sub + '.getdata()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_hp203_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_hp203x'] = 'import hp203x';
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_ltr381_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_ltr381rgb'] = 'import ltr381rgb';
    var code = sub + '.getdata()' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_QMC5883L_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_qmc5883l'] = 'import qmc5883l';
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_shtc3_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_shtc3'] = 'import shtc3';
    var code = '';
    if (key == 'ALL') {
        code = sub + '.measurements';
    } else {
        code = sub + '.' + key;
    }
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_aht11_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_ahtx0'] = 'import ahtx0';
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_VL530LX_extern = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_vl53l0x'] = 'import vl53l0x';
    var code = sub + '.read()';
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_use_spi_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sv = Python.valueToCode(this, 'SPISUB', Python.ORDER_ATOMIC);
    var pv = Python.valueToCode(this, 'PINSUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key == 'RFID') {
        Python.definitions_['import_rc522'] = 'import rc522';
        code = v + ' = rc522.RC522(' + sv + ',' + pv + ')\n';
    } else if (key == 'Weather') {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        Python.definitions_['import_' + version] = 'import ' + version;
        Python.definitions_['import_ws_lora'] = 'import ws_lora';
        if (version == 'mixgo_pe') {
            code = v + ' = ws_lora.Weather(' + sv + ',' + pv + ')\n';
        }
        else {
            code = v + ' = ws_lora.Weather(' + sv + ',' + pv + ',' + version + '.onboard_i2c' + ')\n';
        }
    }
    return code;
};

export const extern_rfid_read = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(' + sector + ',"' + key + '")';
    return [code, Python.ORDER_ATOMIC];
};

export const extern_rfid_readid = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(0, x="id")';
    return [code, Python.ORDER_ATOMIC];
};

export const extern_rfid_readcontent = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(' + sector + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const extern_rfid_write = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.write_card(' + cnt + ',' + sector + ')\n';
    return code;
};

export const extern_rfid_write_return = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.write_card(' + cnt + ',' + sector + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const extern_rfid_status = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.scan_card()==' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const weather_data = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const weather_have_data = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.any()';
    return [code, Python.ORDER_ATOMIC];
};

export const weather_uart_mixio = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var base = Python.valueToCode(this, 'BASE', Python.ORDER_ATOMIC);
    Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.uart_mixio(topic=' + base + ')\n';
    return code;
};

export const weather_set_label = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Python.valueToCode(this, 'ADD' + n,
            Python.ORDER_NONE) || default_value;
    }
    code = sub + '.label(' + code.join(', ') + ')\n';
    return code;
};

export const sensor_mixgoce_hot_wheel_is_touched = function () {
    var key = this.getFieldValue('key');
    var stat = this.getFieldValue('stat');
    Python.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.TouchPadWheels(' + key + ').' + stat;
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_mixgoce_hot_wheel_degrees = function () {
    Python.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.hot_wheels_degree()';
    return [code, Python.ORDER_ATOMIC];
};

export const esp32_s2_weather_init = function () {
    Python.definitions_['import_weather'] = 'import weather';
    Python.definitions_['import_board_*'] = 'from board import *';
    var wd = Python.valueToCode(this, 'wd', Python.ORDER_ATOMIC);
    var ws = Python.valueToCode(this, 'ws', Python.ORDER_ATOMIC);
    var rain = Python.valueToCode(this, 'rain', Python.ORDER_ATOMIC);
    var code = "wd = weather.Weather_wd(" + wd + ")\n"
    code += "ws = weather.Weather_ws(" + ws + ")\n"
    code += "rain = weather.Weather_rain(" + rain + ")\n"
    return code;
};

export const esp32_s2_weather_wd = function () {
    Python.definitions_['import_weather'] = 'import weather';
    var code = 'wd.wind_direction()';
    return [code, Python.ORDER_ATOMIC];
};

export const esp32_s2_weather_rain = function () {
    Python.definitions_['import_weather'] = 'import weather';
    var rain = Python.valueToCode(this, 'rain', Python.ORDER_ATOMIC);
    var code = 'rain.rain_count(time_Hour=' + rain + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const esp32_s2_weather_ws = function () {
    Python.definitions_['import_weather'] = 'import weather';
    var key = this.getFieldValue('key');
    var code = '';
    if (key == 'ALL') {
        code = 'ws.wind_speed()';
    }
    else {
        code = 'ws.wind_speed()[' + key + ']';
    }
    return [code, Python.ORDER_ATOMIC];
};

export const HCSR04 = function () {
    Python.definitions_['import_sonar'] = 'import sonar';

    var dropdown_pin1 = Python.valueToCode(this, "PIN1", Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Python.valueToCode(this, "PIN2", Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ',' + dropdown_pin2 + ').checkdist()';
    return [code, Python.ORDER_ATOMIC];
}

export const PS2_init = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    //Python.definitions_['import_board'] = 'import board';
    var PS2_CLK = this.getFieldValue('PS2_CLK');
    var PS2_DOU = this.getFieldValue('PS2_DOU');
    var PS2_DIN = this.getFieldValue('PS2_DIN');
    var PS2_CS = this.getFieldValue('PS2_CS');

    var code = 'mixgope_ps = ps2.PS2Controller(' + PS2_CLK + ',' + PS2_DOU + ',' + PS2_DIN + ',' + PS2_CS + ')\n';
    return code;
};

export const PS2_vibration = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var ss = this.getFieldValue('smotorstate');
    var amp = Python.valueToCode(this, 'AMP', Python.ORDER_ATOMIC);
    var code = "mixgope_ps.PS2_vibration(" + ss + ',' + amp + ")\n";
    return code;
};

export const PS2_Button = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('psbt');
    var code = "mixgope_ps.PS2_keydata()[0] & (ps2." + bt + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const PS2_Buttons = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('psbt');
    var code = "ps2." + bt;
    return [code, Python.ORDER_ATOMIC];
};

export const PS2_State = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('btstate');
    var code = "mixgope_ps.PS2_keydata()[" + bt + "]";
    return [code, Python.ORDER_ATOMIC];
};

export const PS2_stk = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var stk = this.getFieldValue('psstk');
    var code = "mixgope_ps.PS2_keydata()[1][" + stk + "]";
    return [code, Python.ORDER_ATOMIC];
};

export const RTC_get_time = function () {
    Python.definitions_['import_machine'] = 'import machine';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    if (v == "rtc")
        Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';
    var code = v + '.datetime()';
    return [code, Python.ORDER_ATOMIC];
};


export const sensor_dht11 = function () {
    Python.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Python.valueToCode(this, 'PIN', Python.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code = 'dhtx.' + sensor_type + "(" + dropdown_pin + ').' + what + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const PS2_init_new = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    //Python.definitions_['import_board'] = 'import board';
    var PS2_CLK = Python.valueToCode(this, 'CLK', Python.ORDER_ATOMIC);
    var PS2_DOU = Python.valueToCode(this, 'DOU', Python.ORDER_ATOMIC);
    var PS2_DIN = Python.valueToCode(this, 'DIN', Python.ORDER_ATOMIC);
    var PS2_CS = Python.valueToCode(this, 'CS', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = sub + ' = ps2.PS2Controller(' + PS2_CLK + ',' + PS2_DOU + ',' + PS2_DIN + ',' + PS2_CS + ')\n';
    return code;
};

export const PS2_vibration_new = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var ss = this.getFieldValue('smotorstate');
    var amp = Python.valueToCode(this, 'AMP', Python.ORDER_ATOMIC);
    var code = sub + ".vibration(" + ss + ',' + amp + ")\n";
    return code;
};

export const PS2_Buttons_new = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var bt = this.getFieldValue('psbt');
    var code = sub + '.button(ps2.' + bt + ')';
    return [code, Python.ORDER_ATOMIC];
};
export const PS2_stk_new = function () {
    Python.definitions_['import_ps2'] = 'import ps2';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var stk = this.getFieldValue('psstk');
    var code = sub + ".analog(ps2.PSS_" + stk + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const sensor_use_uart_init = function () {
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var s = this.getFieldValue('sensor');
    var code = ''
    if (s == 'PM') {
        Python.definitions_['import_pm2_5'] = 'import pm2_5';
        code = v + '=pm2_5.PM2_5(' + key + ')\n';
    }
    else if (s == 'GNSS') {
        Python.definitions_['import_gnss'] = 'import gnss';
        code = v + '=gnss.NMEA0183(' + key + ')\n';
    }
    return code;
};

export const pm25_get_data = function () {
    Python.definitions_['import_pm2_5'] = 'import pm2_5';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var pm = this.getFieldValue('pm');
    var code = v + ".concentration()" + pm;
    return [code, Python.ORDER_ATOMIC];
};

export const gnss_get_data = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Python.definitions_['import_gnss'] = 'import gnss';
    var code = sub + '.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const gnss_have_data = function () {
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    Python.definitions_['import_gnss'] = 'import gnss';
    var code = sub + '.any()';
    return [code, Python.ORDER_ATOMIC];
};

//mixbot/baize extern below:
export const robot_button_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var num = this.getFieldValue('num');
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_button'] = 'from mixbot_ext import ext_button';
        code = 'ext_button.value(' + mode + ")" + num;
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_button'] = 'ext_button_left = i2cdevice.Buttonx5(ext_i2c_left)';
            code = 'ext_button_left.value()' + num;
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_button'] = 'ext_button_right = i2cdevice.Buttonx5(ext_i2c_right)';
            code = 'ext_button_right.value()' + num;
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_touch_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_collision'] = 'from mixbot_ext import ext_collision';
        code = 'ext_collision.value(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_collision'] = 'ext_collision_left = i2cdevice.Button(ext_i2c_left)';
            code = 'ext_collision_left.value()';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_collision'] = 'ext_collision_right = i2cdevice.Button(ext_i2c_right)';
            code = 'ext_collision_right.value()';
        }
        return [code, Python.ORDER_ATOMIC];
    }

};

export const robot_infrared_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2];
    var mode = '';
    var code = '';
    if (version == 'mixbot') {
        mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
        Python.definitions_['import_mixbot_ext_ext_infrared'] = 'from mixbot_ext import ext_infrared';
        code = 'ext_infrared.value(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
        Python.definitions_['import_mixgo_baize_onboard_bot51'] = 'from mixgo_baize import onboard_bot51';
        code = 'onboard_bot51.read_ps(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_potentiometer_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_potentiometer'] = 'from mixbot_ext import ext_potentiometer';
        code = 'ext_potentiometer.value(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_potentiometer'] = 'ext_potentiometer_left = i2cdevice.Dimmer(ext_i2c_left)';
            code = 'ext_potentiometer_left.value()';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_potentiometer'] = 'ext_potentiometer_right = i2cdevice.Dimmer(ext_i2c_right)';
            code = 'ext_potentiometer_right.value()';
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_color_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var color = this.getFieldValue('color');
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_color'] = 'from mixbot_ext import ext_color';
        code = 'ext_color.recognition(' + mode + ")" + color;
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_color'] = 'ext_color_left = i2cdevice.Color_ID(ext_i2c_left)';
            code = 'ext_color_left.recognition()' + color;
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_color'] = 'ext_color_right = i2cdevice.Color_ID(ext_i2c_right)';
            code = 'ext_color_right.recognition()' + color;
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_sonar_extern_get_value = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_sonar'] = 'from mixbot_ext import ext_sonar';
        code = 'ext_sonar.value(' + mode + ")";
        return [code, Python.ORDER_ATOMIC];
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_sonar'] = 'ext_sonar_left = i2cdevice.Sonar(ext_i2c_left)';
            code = 'ext_sonar_left.value()';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_sonar'] = 'ext_sonar_right = i2cdevice.Sonar(ext_i2c_right)';
            code = 'ext_sonar_right.value()';
        }
        return [code, Python.ORDER_ATOMIC];
    }
};

export const robot_sonar_extern_led = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var mode = Python.valueToCode(this, 'mode', Python.ORDER_ATOMIC);
    var light = Python.valueToCode(this, 'light', Python.ORDER_ATOMIC);
    var op = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = '';
    if (version == 'mixbot') {
        Python.definitions_['import_mixbot_ext_ext_sonar'] = 'from mixbot_ext import ext_sonar';
        code = 'ext_sonar.led(' + mode + ',' + light + ',' + op + ")\n";
        return code;
    }
    else if (version == 'mixgo_baize') {
        Python.definitions_['import_machine'] = 'import machine';
        Python.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            Python.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            Python.definitions_['import_left_sonar'] = 'ext_sonar_left = i2cdevice.Sonar(ext_i2c_left)';
            code = 'ext_sonar_left.led(0,' + light + ',' + op + ')\n';
        }
        else if (mode == "1") {
            Python.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            Python.definitions_['import_right_sonar'] = 'ext_sonar_right = i2cdevice.Sonar(ext_i2c_right)';
            code = 'ext_sonar_right.led(0,' + light + ',' + op + ')\n';
        }
        return code;
    }
};

export const mixbot_sensor_extern_get_addr = function () {
    var name = this.getFieldValue('name');
    Python.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var code = name + '.addr_get()';
    return [code, Python.ORDER_ATOMIC];
};

export const mixbot_sensor_extern_set_addr = function () {
    var name = this.getFieldValue('name');
    Python.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var oldaddr = Python.valueToCode(this, 'old', Python.ORDER_ATOMIC);
    var newaddr = Python.valueToCode(this, 'new', Python.ORDER_ATOMIC);
    var code = name + '.addr_set(' + oldaddr + ',' + newaddr + ')\n';
    return code;
};
