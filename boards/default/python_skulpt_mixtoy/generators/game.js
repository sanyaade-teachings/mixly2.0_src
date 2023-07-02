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


Blockly.Python.forBlock['move_related_to_spirite'] = function (block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var times = Blockly.Python.valueToCode(this, 'times', Blockly.Python.ORDER_ATOMIC);
  var Direction = this.getFieldValue('Direction');
  if(Direction=='f'){
    Direction=0;
  }else{
    Direction=2
  }
  var d = 'dire=(actor.direction+'+Direction+")%4\n\t"+'actor.moveDirection(dire,\'block_id=' + block.id + '\');\n',
      d = Blockly.Python.addLoopTrap(d, block.id) || Blockly.Python.PASS;
  return 'for _my_variable in range(' + times + '):\n\t' + d;
};


Blockly.Python.forBlock['initSettedMap'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var level = this.getFieldValue('level');
  return 'blocklygame.settedMap('+level+',\'block_id=' + block.id + '\');\n'+'actor=blocklygame.Actor(\'car\',2);\n';;
};
// Blockly.Python.forBlock['move_forward'] = function(block) {
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
  var code = 'actor.isPath(' + dropdown_Direction +",\'block_id="+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['is_Related_Path'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var dropdown_Direction = this.getFieldValue('Direction');
  switch (dropdown_Direction){
    case 'f':
      dropdown_Direction=0;
      break;
    case "b":
      dropdown_Direction=2;
      break;
    case "r":
      dropdown_Direction=1;
      break;
    case "l":
      dropdown_Direction=3;
      break;
  }
  var code = 'actor.isPath('+"(actor.direction+"+dropdown_Direction+")%4"+",\'block_id="+ block.id + '\')';
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
  var startPos_x = Blockly.Python.valueToCode(this, 'startPos_x', Blockly.Python.ORDER_ATOMIC); 
  var startPos_y = Blockly.Python.valueToCode(this, 'startPos_y', Blockly.Python.ORDER_ATOMIC); 
  var endPos_x = Blockly.Python.valueToCode(this, 'endPos_x', Blockly.Python.ORDER_ATOMIC); 
  var endPos_y = Blockly.Python.valueToCode(this, 'endPos_y', Blockly.Python.ORDER_ATOMIC); 
  
  return 'blocklygame.setMap('+value_x+','+value_y+','+startPos_x+','+startPos_y+','+endPos_x+','+endPos_y+",\'block_id="+ block.id + '\');\n';
};


Blockly.Python.forBlock['set_map_bg'] = function(block) {
  Blockly.Python.definitions_['import_blocklygame'] = 'import blocklygame';
  var bg_pic = Blockly.Python.valueToCode(this, 'background', Blockly.Python.ORDER_ATOMIC);
  return 'blocklygame.set_map_bg('+bg_pic+",\'block_id="+ block.id + '\');\n';
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
  var value_direction = "1"
  // this.getFieldValue('direction');
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

Blockly.Python.forBlock['is_Related_Barrier'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var dropdown_Direction = this.getFieldValue('direction');
  switch (dropdown_Direction){
    case 'f':
      dropdown_Direction=0;
      break;
    case "b":
      dropdown_Direction=2;
      break;
    case "r":
      dropdown_Direction=1;
      break;
    case "l":
      dropdown_Direction=3;
      break;
  }

  var code = 'actor.isBarrier('+"(actor.direction+"+dropdown_Direction+")%4"+",\'block_id="+ block.id + '\')';
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

Blockly.Python.forBlock['checkMarker'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var marker = this.getFieldValue('marker');
  var code = 'actor.checkMarker('+marker+',\'block_id='+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['getMarkerNum'] = function(block) {
  Blockly.Python.definitions_['import_blocklygame'] = 'import blocklygame';
  var marker = this.getFieldValue('marker');
  var code = 'actor.getMarkerNum('+marker+',\'block_id='+ block.id + '\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['randomPlaceBarrier'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var value_posx = Blockly.Python.valueToCode(this, 'posx', Blockly.Python.ORDER_ATOMIC);
  var value_posy = Blockly.Python.valueToCode(this, 'posy', Blockly.Python.ORDER_ATOMIC);
  return 'blocklygame.randomPlaceBarrier('+value_posx+','+value_posy+",\'block_id="+ block.id + '\');\n';
};

Blockly.Python.forBlock['settedSimpleMap'] = function(block) {
  Blockly.Python.definitions_.import_blocklygame = "import blocklygame";
  var level = this.getFieldValue('level');
  return 'blocklygame.settedSimpleMap('+level+',\'block_id=' + block.id + '\');\n';
};

Blockly.Python.forBlock['find_books_by_dichotomy'] = function () {
  var VALUE_INPUT_N = Blockly.Python.valueToCode(this, "N", Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setups_["find_books_by_dichotomy"] = `
def find_books_by_dichotomy(N):
    counter = 0
    left = 0
    right = N
    key = N
    i = (left + right) / 2
    while i != key:
        counter = counter + 1
        if i > key:
            right = i
        else:
            left = i
        i = ((left + right) + 1) / 2
    print(counter,end ="")\n`;
  return `find_books_by_dichotomy(${VALUE_INPUT_N})\n`;
};

Blockly.Python.forBlock['find_books_by_sequence'] = function () {
    var VALUE_INPUT_N = Blockly.Python.valueToCode(this, "N", Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_["find_books_by_sequence"] = `
def find_books_by_sequence(N):
    counter = 1
    key = N
    i = 1
    while i != key:
        counter = counter + 1
        i = i + 1
    print(counter,end ="")\n`;
    return `find_books_by_sequence(${VALUE_INPUT_N})\n`;
};
