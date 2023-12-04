import Python from '../../python/python_generator';

export const ce_go_light_number = function () {
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var code = 'car.' + this.getFieldValue('op');
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_led_bright = function () {
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var bright = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = "car.setonoff(" + op + "," + bright + ")\n";
    return code;
};

export const ce_go_get_led_bright = function () {
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var code = "car.getrightness(" + op + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_get_led_state = function () {
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var code = "car.getonoff(" + op + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_led_brightness = function () {
    var op = Python.valueToCode(this, 'led', Python.ORDER_ATOMIC);
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var flag = Python.valueToCode(this, 'bright', Python.ORDER_ATOMIC);
    var code = "car.setbrightness(" + op + "," + flag + ")\n";
    return code;
};

export const ce_go_stepper_keep = function () {
    var v = this.getFieldValue('VAR');
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ASSIGNMENT);
    var code = 'car.move("' + v + '",' + speed + ")\n";
    return code;
};

export const ce_go_stepper_stop = function () {
    var v = this.getFieldValue('VAR');
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var code = 'car.move("' + v + '")\n';
    return code;
};

export const ce_go_dc_motor = function () {
    var wheel = this.getFieldValue('wheel');
    Python.definitions_['import_ce_go_car'] = 'from ce_go import car';
    var v = this.getFieldValue('direction');
    if (wheel == 0) {
        if (v == 'CW') { v = 'CCW' }
        else if (v == 'CCW') { v = 'CW' }
    }
    var speed = Python.valueToCode(this, 'speed', Python.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO[" + wheel + '],"' + v + '",' + speed + ")\n";
    return code;
};

export const ce_go_hall_attachInterrupt = function () {
    var dropdown_mode = this.getFieldValue('mode');
    Python.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;

    var atta = Python.valueToCode(this, 'DO', Python.ORDER_ATOMIC);
    var code = 'hall_' + dropdown_mode + '.irq_cb(' + atta + ')\n'
    return code;
};

export const ce_go_hall_initialize = function () {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    Python.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;
    var num = Python.valueToCode(this, 'num', Python.ORDER_ATOMIC);
    if (args == 'all') {
        var code = 'hall_' + dropdown_mode + '.initial(' + 'turns' + '=' + num + ',distance=' + num + ')\n'
        return code;
    }
    var code = 'hall_' + dropdown_mode + '.initial(' + args + '=' + num + ')\n'
    return code;
};

export const ce_go_hall_data = function () {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    Python.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;
    var code = 'hall_' + dropdown_mode + '.' + args + '';
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_pin_near_line = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    var code = 'car.patrol()' + key + '';
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_pin_near = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    var code = 'car.obstacle()' + key + '';
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_pin_near_state_change = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';

    var code = 'car.ir_mode(car.' + key + ')\n';

    return code;
};


export const sensor_mixgome_eulerangles = function () {
    Python.definitions_['import_mixgo_ce_onboard_mxc6655xa'] = "from mixgo_ce import onboard_mxc6655xa";
    var angle = this.getFieldValue('angle');
    var code = 'onboard_mxc6655xa.eulerangles(upright=True)' + angle;
    return [code, Python.ORDER_ATOMIC];
};

export const ce_go_pin_light = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    var code = 'car.light()' + key + '';
    return [code, Python.ORDER_ATOMIC];
};