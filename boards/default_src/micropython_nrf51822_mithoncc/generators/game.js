import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const game_create_sprite = function(){
    var x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var code = 'game.createSprite(' + x + ', ' + y + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const game_move_by = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.move(' + data + ');\n';
    return code;
};

export const game_delete_var = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.delete();\n';
    Blockly.isDefiniedItem = 1;
    return code;
};

export const game_turn_by_direction = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var dir = this.getFieldValue('dir');
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.turn(' + dir + ', ' +  data + ');\n';
    return code;
};

export const game_change_by = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.change(' + change_key + ', ' +  data + ');\n';
    return code;
};

export const game_set_xy = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.set(' + change_key + ', ' +  data + ');\n';
    return code;
};

export const game_get_xy = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var code = item + '.get(' + change_key +  ')';
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Python.ORDER_ATOMIC] ;
};

export const game_touch_another = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var another = Python.valueToCode(this, 'another', Python.ORDER_ATOMIC) || 'null';
    var code = item + '.isTouching(' + another +  ')';
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Python.ORDER_ATOMIC] ;
};

export const game_touch_edge = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var code = item + '.isTouchingEdge()';
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Python.ORDER_ATOMIC];
};

export const game_on_edge_and_bounce = function(){
    var item = Python.valueToCode(this, 'var', Python.ORDER_ATOMIC);
    var code = item + '.ifOnEdgeBounce();\n';
    Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return code;
};

export const game_change_score = function(){
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = 'game.addScore('  + data +  ');\n';
    return code;
};

export const game_set_score = function(){
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = 'game.setScore('  + data +  ');\n';
    return code;
};

export const game_start_countdown = function(){
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = 'game.startCountdown(' + data + ');\n';
    return code;
};

export const game_get_score = function() {
    return ["game.score()", Python.ORDER_ATOMIC];
}

export const game_over = function() {
    return "game.gameOver();\n";
}

export const game_resume = function() {
    return "game.resume();\n";
}

export const game_pause = function() {
    return "game.pause();\n";
}