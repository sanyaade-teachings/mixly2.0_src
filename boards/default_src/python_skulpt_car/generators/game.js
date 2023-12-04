import Python from '../../python/python_generator';

export const game_init = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = Python.statementToCode(block, "DO0") + 'blocklygame.initMap(\'block_id=' + block.id + '\');\n'

    var code_piece = [];
    code_piece = code.split("\n");
    for (var i = 0; i < code_piece.length; i++) {
        if ((code_piece[i].indexOf("    ") >= 0)) {
            code_piece[i] = code_piece[i].replace("    ", "");
        }
    }
    code = ""
    for (var i = 0; i < code_piece.length; i++) {
        code += code_piece[i] + '\n'
    }
    return code;
};

// export const move_direction = function(block) {
//     Python.definitions_.import_blocklygame = "import blocklygame";
//     var Direction = this.getFieldValue('direction');
//     return 'actor.moveDirection('+Direction+',\'block_id=' + block.id + '\');\n';
//   };

export const move_direction_steps = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var times = Python.valueToCode(this, 'times', Python.ORDER_ATOMIC);
    var Direction = this.getFieldValue('direction');
    var d = 'actor.moveDirection(' + Direction + ',\'block_id=' + block.id + '\');\n',
        d = Python.addLoopTrap(d, block.id) || Python.PASS;
    return 'for _my_variable in range(' + times + '):\n\t' + d;
};

export const initSettedMap_1 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(0,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};

export const initSettedMap_2 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(1,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};

export const initSettedMap_3 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(2,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};

export const initSettedMap_4 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(3,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n' + 'actor.randomOil(\'block_id=' + block.id + '\');\n';
};

export const initSettedMap_5 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(4,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};

export const initSettedMap_6 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(5,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};

export const initSettedMap_7 = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(6,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
};
// export const move_forward = function(block) {
//   Python.definitions_.import_blocklygame = "import blocklygame";
//   return 'actor.moveForward(\'block_id=' + block.id + '\');\n';
// };

// export const move_backward = function(block) {
//   Python.definitions_.import_blocklygame = "import blocklygame";
//   var code = 'actor.moveBackward(\'block_id=' + block.id + '\');\n';
//   return code;
// };

export const Turn = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('Direction');
    var code = 'actor.turn(\'' + dropdown_Direction + "','block_id=" + block.id + '\');\n';
    return code;
};

export const isDone = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isDone(\'block_id=' + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const isPath = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('Direction');
    var code = 'actor.isPath(\'' + dropdown_Direction + "','block_id=" + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

//从这里开始是新的块
export const get_actor_point = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.getPoint(\'block_id=' + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const game_get_local_img = function () {
    var dropdown_type = this.getFieldValue('type');
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};

export const set_map = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var value_x = Python.valueToCode(this, 'x', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(this, 'y', Python.ORDER_ATOMIC);
    var startPos = Python.valueToCode(this, 'startPos', Python.ORDER_ATOMIC);
    var endPos = Python.valueToCode(this, 'endPos', Python.ORDER_ATOMIC);
    var bg_pic = Python.valueToCode(this, 'background', Python.ORDER_ATOMIC);

    return 'blocklygame.setMap(' + value_x + ',' + value_y + ',' + startPos + ',' + endPos + ',' + bg_pic + ",'block_id=" + block.id + '\');\n';
};

export const game_get_character_img = function () {
    var dropdown_type = this.getFieldValue('type');
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};



export const initialize = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    // var value_character = this.getFieldValue('character');
    var value_direction = this.getFieldValue('direction');
    var value_character = Python.valueToCode(this, 'character', Python.ORDER_ATOMIC);
    return 'actor=blocklygame.Actor(' + value_character + ',' + value_direction + ",'block_id=" + block.id + '\');\n';
};



export const place_item = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var value_posx = Python.valueToCode(this, 'posx', Python.ORDER_ATOMIC);
    var value_posy = Python.valueToCode(this, 'posy', Python.ORDER_ATOMIC);
    var value_item = this.getFieldValue('item');
    return 'blocklygame.placeItem(' + value_posx + ',' + value_posy + ',' + value_item + ",'block_id=" + block.id + '\');\n';
};

export const game_get_path_img = function () {
    var dropdown_type = this.getFieldValue('type');
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};


export const set_pathtype = function (block) {
    Python.definitions_['import_blocklygame'] = 'import blocklygame';
    var path_type = Python.valueToCode(this, 'pathtype', Python.ORDER_ATOMIC);
    return 'blocklygame.setPathType(' + path_type + ",'block_id=" + block.id + '\');\n';
    // return 'actor.getPoint();\n';
};

export const isBarrier = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('direction');
    var code = 'actor.isBarrier(' + dropdown_Direction + ",'block_id=" + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const randomOil = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    return 'actor.randomOil(\'block_id=' + block.id + '\');\n';
};

export const isOilFull = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isOilFull(\'block_id=' + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const isLightGreen = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isLightGreen(\'block_id=' + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const isLightRed = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'not actor.isLightGreen(\'block_id=' + block.id + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const addOil = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.addOil(\'block_id=' + block.id + '\');\n';
    return code;
};

export const isCirculationRight = function (block) {
    Python.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isCirculationRight(\'block_id=' + block.id + '\');\n';
    return code;
};