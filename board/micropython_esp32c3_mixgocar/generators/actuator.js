'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');




Blockly.Python.actuator_stepper_keep=function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'car.motor_move("'+v+'",'+ speed +")\n";
    return code;
};

Blockly.Python.actuator_stepper=function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixgocar_'+ v] = 'from mixgocar import '+ v;
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var steps = Blockly.Python.valueToCode(this, 'steps', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+"("+ speed +", "+ steps +")\n";
    return code;
};

Blockly.Python.actuator_stepper_stop=function(){
    var v = this.getFieldValue('VAR');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var code = 'car.motor_move("'+v+'"' +")\n";
    return code;
};

Blockly.Python.actuator_stepper_readbusy=function(){
    Blockly.Python.definitions_['import_mixgocar_readbusy'] = 'from mixgocar import readbusy';
    var code = "readwork()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_stepper_wheel=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_step'+ wheel.slice(0,2)] = 'from mixgocar import step'+ wheel.slice(0,2);
    Blockly.Python.definitions_['import_ms32006'] = 'import ms32006';
    var direction = this.getFieldValue('direction');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var steps = Blockly.Python.valueToCode(this, 'steps', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "step" + wheel.slice(0,2) + ".move(ms32006.MOT"+ wheel.slice(-2) +", "+ direction +", "+ speed +", "+ steps +")\n";
    return code;
};

Blockly.Python.actuator_stepper_wheel_stop=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_step'+ wheel.slice(0,2)] = 'from mixgocar import step'+ wheel.slice(0,2);
    Blockly.Python.definitions_['import_ms32006'] = 'import ms32006';
    var code = "step" + wheel.slice(0,2) + ".stop(ms32006.MOT"+ wheel.slice(-2) +")\n";
    return code;
};

Blockly.Python.actuator_stepper_wheel_readbusy=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_step'+ wheel.slice(0,2)] = 'from mixgocar import step'+ wheel.slice(0,2);
    Blockly.Python.definitions_['import_ms32006'] = 'import ms32006';
    var code = "step" + wheel.slice(0,2) + ".readwork(ms32006.MOT"+ wheel.slice(-2) +")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_s2_mixgo_car_audio_init= function() {
    Blockly.Python.definitions_['import_audiobusio'] = 'import audiobusio';   
    Blockly.Python.definitions_['import_board'] = 'import board';   
    return "audio = audiobusio.I2SOut(board.IO34, board.IO35, board.IO33)\n";
};

Blockly.Python.esp32_s2_mixgo_car_audio_wave_play=function(){
    Blockly.Python.definitions_['import_audiocore'] = 'import audiocore';
    var wav = Blockly.Python.valueToCode(this, 'wav', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "audio.play(audiocore.WaveFile(" + wav +"))\n";
    return code;
};

Blockly.Python.esp32_s2_mixgo_car_audio_wave_is_playing=function(){
    var code = "audio.playing";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_dc_motor=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO_"+wheel+',"'+v+'",'+speed+")\n";
    return code;
};

Blockly.Python.actuator_dc_motor_stop=function(){
    var wheel = this.getFieldValue('wheel');
    Blockly.Python.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var code = "car.motor(car.MOTO_"+wheel+',"'+v+'"'+")\n";
    return code;
};