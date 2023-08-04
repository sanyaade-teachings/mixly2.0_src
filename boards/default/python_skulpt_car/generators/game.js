'use strict';

goog.provide('Blockly.Blocks.game');

goog.require('Blockly.Python');

Blockly.Python.forBlock['game_init'] = function(block) {
    Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
    var code=Blockly.Python.statementToCode(block, "DO0" )+'blocklygame.initMap(\'block_id=' + block.id + '\');\n'

    var code_piece=[];
        code_piece=code.split("\n");
        for(var i=0;i<code_piece.length;i++){
          if((code_piece[i].indexOf("    ") >= 0)){  
              code_piece[i]=code_piece[i].replace("    ","");
          }
        }   
        code=""
        for(var i=0;i<code_piece.length;i++){
          code+=code_piece[i]+'\n'
        }
    return code;
  };

// Blockly.Python.forBlock['move_direction'] = function(block) {
//     Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
//     var Direction = this.getFieldValue('direction');
//     return 'actor.moveDirection('+Direction+',\'block_id=' + block.id + '\');\n';
//   };

Blockly.Python.forBlock['move_direction_steps'] = function (block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var times = Blockly.Python.valueToCode(this, 'times', Blockly.Python.ORDER_ATOMIC);
  var Direction = this.getFieldValue('direction');
  var d = 'actor.moveDirection('+Direction+',\'block_id=' + block.id + '\');\n',
      d = Blockly.Python.addLoopTrap(d, block.id) || Blockly.Python.PASS;
  return 'for _my_variable in range(' + times + '):\n\t' + d;
};

Blockly.Python.forBlock['initSettedMap_1'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(0,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};

Blockly.Python.forBlock['initSettedMap_2'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(1,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};

Blockly.Python.forBlock['initSettedMap_3'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(2,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};

Blockly.Python.forBlock['initSettedMap_4'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(3,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n'+'actor.randomOil(\'block_id=' + block.id + '\');\n';
};

Blockly.Python.forBlock['initSettedMap_5'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(4,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};

Blockly.Python.forBlock['initSettedMap_6'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(5,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};

Blockly.Python.forBlock['initSettedMap_7'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'blocklygame.settedMap(6,\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};
// Blockly.Python.forBlock.move_forward = function(block) {
//   Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
//   return 'actor.moveForward(\'block_id=' + block.id + '\');\n';
// };

// Blockly.Python.forBlock['move_backward'] = function(block) {
//   Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
//   var code = 'actor.moveBackward(\'block_id=' + block.id + '\');\n';
//   return code;
// };

Blockly.Python.forBlock['Turn'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var dropdown_Direction = this.getFieldValue('Direction');
  var code = 'actor.turn(\'' + dropdown_Direction +"\',\'block_id="+ block.id + '\');\n';
  return code;
};

Blockly.Python.forBlock['isDone'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'actor.isDone(\'block_id=' + block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['isPath'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var dropdown_Direction = this.getFieldValue('Direction');
  var code = 'actor.isPath(\'' + dropdown_Direction +"\',\'block_id="+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//从这里开始是新的块
Blockly.Python.forBlock['get_actor_point'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
   var code = 'actor.getPoint(\'block_id='+block.id+'\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
 };

Blockly.Python.forBlock['game_get_local_img'] = function() {
  	var dropdown_type = this.getFieldValue('type');
    Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  	var code = dropdown_type;
  	return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['set_map'] = function(block) {
	Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
	var value_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var startPos = Blockly.Python.valueToCode(this, 'startPos', Blockly.Python.ORDER_ATOMIC); 
  var endPos = Blockly.Python.valueToCode(this, 'endPos', Blockly.Python.ORDER_ATOMIC); 
  var bg_pic = Blockly.Python.valueToCode(this, 'background', Blockly.Python.ORDER_ATOMIC);

	return 'blocklygame.setMap('+value_x+','+value_y+','+startPos+','+endPos+','+bg_pic+",\'block_id="+ block.id + '\');\n';
};

Blockly.Python.forBlock['game_get_character_img'] = function() {
  	var dropdown_type = this.getFieldValue('type');
    Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  	var code = dropdown_type;
  	return [code, Blockly.Python.ORDER_ATOMIC];
};



Blockly.Python.forBlock['initialize'] = function(block) {
	Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
	// var value_character = this.getFieldValue('character');
	var value_direction = this.getFieldValue('direction');
	var value_character = Blockly.Python.valueToCode(this, 'character', Blockly.Python.ORDER_ATOMIC);
	return 'actor=blocklygame.Actor('+value_character+','+value_direction+",\'block_id="+ block.id + '\');\n';
};



Blockly.Python.forBlock['place_item'] = function(block) {
	Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
	var value_posx = Blockly.Python.valueToCode(this, 'posx', Blockly.Python.ORDER_ATOMIC);
    var value_posy = Blockly.Python.valueToCode(this, 'posy', Blockly.Python.ORDER_ATOMIC);
	var value_item = this.getFieldValue('item');
	return 'blocklygame.placeItem('+value_posx+','+value_posy+','+value_item+",\'block_id="+ block.id + '\');\n';
};

Blockly.Python.forBlock['game_get_path_img'] = function() {
  	var dropdown_type = this.getFieldValue('type');
    Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  	var code = dropdown_type;
  	return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['set_pathtype'] = function(block) {
	Blockly.Python.definitions_['import_blocklygame'] = 'import blocklygame';
    var path_type = Blockly.Python.valueToCode(this, 'pathtype', Blockly.Python.ORDER_ATOMIC);
	return 'blocklygame.setPathType('+path_type+",\'block_id="+ block.id + '\');\n';
	// return 'actor.getPoint();\n';
};

Blockly.Python.forBlock['isBarrier'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var dropdown_Direction = this.getFieldValue('direction');
  var code = 'actor.isBarrier('+dropdown_Direction+",\'block_id="+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['randomOil'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  return 'actor.randomOil(\'block_id=' + block.id + '\');\n';
};

Blockly.Python.forBlock['isOilFull'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'actor.isOilFull(\'block_id='+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['isLightGreen'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'actor.isLightGreen(\'block_id='+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['isLightRed'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'not actor.isLightGreen(\'block_id='+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['addOil'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'actor.addOil(\'block_id='+ block.id + '\');\n';
  return code;
};

Blockly.Python.forBlock['isCirculationRight'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var code = 'actor.isCirculationRight(\'block_id='+ block.id + '\');\n';
  return code;
};