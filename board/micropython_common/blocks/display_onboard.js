'use strict';

goog.provide('Blockly.Blocks.display_onboard');
goog.require('Blockly.Blocks');

Blockly.Blocks.display_onboard.HUE = '#569A98';

// Blockly.FieldColour.COLOURS = ['#f00', '#000'];
// Blockly.FieldColour.COLUMNS = 2;

Blockly.Blocks.display_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image","List",'Tuple'])
        .appendField(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

 Blockly.Blocks.display_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.OLED_DRAWSTR);
    this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);   
    this.appendDummyInput("")
      .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')     
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
  }
};

Blockly.Blocks.display_scroll_string = {
   init: function() {
     this.setColour(Blockly.Blocks.display_onboard.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
   }
 };

Blockly.Blocks.display_scroll_string_delay = {
   init: function() {
     this.setColour(Blockly.Blocks.display_onboard.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);       
     this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);    
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
     this.setTooltip(Blockly.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
   }
 };

Blockly.Blocks.display_show_frame_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.display_show_frame_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['display_image_create']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 12; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 32; j++) {
        dummyInputObj.appendField(new Blockly.FieldColour("#000000"), i + '-' + j);
      }
    }
    this.setOutput(true);
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
  }
};

Blockly.Blocks['display_image_builtins'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display_onboard.HUE,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"]
         // ,["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]
          ],
          "type" : "field_dropdown"
        }
      ],
      "output" : ["esp32_image", "List"],
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
      "tooltip" : Blockly.MIXLY_MICROBIT_Built_in_image1,
      "message0" : Blockly.MIXLY_MICROBIT_Built_in_image
    });
  }
};

Blockly.Blocks['display_image_builtins_all'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display_onboard.HUE,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"]
          ,["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]
          ],
          "type" : "field_dropdown"
        }
      ],
      "output" : ["esp32_image", "List"],
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
      "tooltip" : Blockly.MIXLY_MICROBIT_Built_in_image1,
      "message0" : Blockly.MIXLY_MICROBIT_Built_in_image
    });
  }
};

Blockly.Blocks['image_arithmetic'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MICROBIT_DISPLAY_UNION, 'add'],
         [Blockly.MICROBIT_DISPLAY_MINUS, 'sub']];
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.setOutput(true, "esp32_image");
    this.appendValueInput('A')
        // .setCheck(["esp32_image", "List", String])
        .appendField(Blockly.MICROBIT_DISPLAY_MERGE_SHAPE);
    this.appendValueInput('B')
        // .setCheck(["esp32_image", "List", String])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var TOOLTIPS = {
        '+':Blockly.MIXLY_MICROBIT_image_add,
        '-':Blockly.MIXLY_MICROBIT_image_reduce
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks.image_invert = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('A')
        .setCheck("esp32_image")
        .appendField(Blockly.MIXLY_MICROBIT_Invert_image1);
    this.setInputsInline(true);
    this.setOutput(true, "esp32_image");
  }
};

Blockly.Blocks['display_shift'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_UP, 'shift_up'],
         [Blockly.MIXLY_DOWN, 'shift_down'],
         [Blockly.MIXLY_LEFT, 'shift_left'],
         [Blockly.MIXLY_RIGHT, 'shift_right'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    // this.setOutput(true);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('val')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
        var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
        var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
        var TOOLTIPS = {
        'up': Blockly.MIXLY_UP,
        'down':Blockly.MIXLY_DOWN,
        'left':Blockly.MIXLY_LEFT,
        'right':Blockly.MIXLY_RIGHT
      };
      return mode0 + mode1 +TOOLTIPS[mode]+mode2;
    });
  }
};

Blockly.Blocks.display_get_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
      this.appendValueInput('x')
        .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
      this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_POINT);
    this.setInputsInline(true);
      this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
  }
};

Blockly.Blocks.display_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
    this.appendValueInput('y')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendValueInput("STAT")        
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_DISPLAY_SETPIXEL);
  }
};

Blockly.Blocks.display_get_screen_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.display_bright_screen = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
  }
};

Blockly.Blocks.display_clear = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_Clear_display);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }
};







//mixgo_me onboard_matrix below:



Blockly.Blocks['mixgome_display_image_create']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 5; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 8; j++) {
        dummyInputObj.appendField(new Blockly.FieldColour("#000000"), i + '-' + j);
      }
    }
    this.setOutput(true);
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
  }
};

Blockly.Blocks['mixgo_display_image_create_new']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 8; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 16; j++) {
        dummyInputObj.appendField(new Blockly.FieldColour("#000000"), i + '-' + j);
      }
    }
    this.setOutput(true);
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
  }
};



Blockly.Blocks['mixgome_display_font'] = {
  init: function() {
    var OPERATORS =
        [['4x5'+Blockly.MIXGO_ME_DISPLAY_HORIZONTAL, '1'],
         ['5x8'+Blockly.MIXGO_ME_DISPLAY_VERTICAL, '2']];
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendDummyInput()
        .appendField(Blockly.OLED_SET_FONT)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    
  }
};



//mpython

Blockly.Blocks.onboard_oled_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .appendField(Blockly.OLED_BITMAP);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

Blockly.Blocks.onboard_oled_show_image_xy = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .appendField(Blockly.OLED_BITMAP);
     this.appendValueInput("x")
        .setCheck(Number)
        .appendField('x');  
    this.appendValueInput("y")
        .setCheck(Number)
        .appendField('y');  
    this.appendValueInput("size")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_NUMBER);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

Blockly.Blocks.onboard_oled_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image","List",'Tuple'])
        .appendField(Blockly.OLED_DRAWSTR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

 Blockly.Blocks.onboard_oled_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.OLED_DRAWSTR);
    this.appendValueInput("x")
        .setCheck(Number)
        .appendField('x');  
    this.appendValueInput("y")
        .setCheck(Number)
        .appendField('y');  
    this.appendValueInput("size")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);              
    this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);   
    this.appendDummyInput("")
      .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')     
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
  }
};

Blockly.Blocks.onboard_oled_scroll_string = {
   init: function() {
     this.setColour(Blockly.Blocks.display_onboard.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
   }
 };

Blockly.Blocks.onboard_oled_scroll_string_delay = {
   init: function() {
     this.setColour(Blockly.Blocks.display_onboard.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.appendValueInput("y")
        .setCheck(Number)
        .appendField('y');  
    this.appendValueInput("size")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);    
     this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);       
     this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);    
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
     this.setTooltip(Blockly.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
   }
 };

Blockly.Blocks.onboard_oled_show_frame_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.onboard_oled_show_frame_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.appendValueInput("size")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);    
    this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['onboard_oled_shift'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_UP, 'shift_up'],
         [Blockly.MIXLY_DOWN, 'shift_down'],
         [Blockly.MIXLY_LEFT, 'shift_left'],
         [Blockly.MIXLY_RIGHT, 'shift_right'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    // this.setOutput(true);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('val')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
        var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
        var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
        var TOOLTIPS = {
        'up': Blockly.MIXLY_UP,
        'down':Blockly.MIXLY_DOWN,
        'left':Blockly.MIXLY_LEFT,
        'right':Blockly.MIXLY_RIGHT
      };
      return mode0 + mode1 +TOOLTIPS[mode]+mode2;
    });
  }
};

Blockly.Blocks.onboard_oled_get_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
      this.appendValueInput('x')
        .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
      this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_POINT);
    this.setInputsInline(true);
      this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
  }
};

Blockly.Blocks.onboard_oled_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
    this.appendValueInput('y')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendValueInput("STAT")        
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_DISPLAY_SETPIXEL);
  }
};



Blockly.Blocks.onboard_oled_clear = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_Clear_display);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }
};

Blockly.Blocks['mpython_display_shape_rect'] = {
  init: function () {
    this.jsonInit({
      "colour": Blockly.Blocks.display_onboard.HUE,
      "args0": [
        {
          "name": "state",
          "options": [
          [Blockly.Msg.MPYTHON_DISPLAY_MODE_1, '1'],
          [Blockly.Msg.MPYTHON_DISPLAY_MODE_0, '0']
          ],
          "type": "field_dropdown"
        },
        {
          "name": "shape",
          "options": [
            [Blockly.Msg.MPYTHON_DISPLAY_HOLLOW, 'rect'],
            [Blockly.Msg.MPYTHON_DISPLAY_SOLID, 'fill_rect']
          ],
          "type": "field_dropdown"
        },
        {
          "type": "input_dummy"
        },
        {
          "name": "x",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "y",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "w",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "h",
          "type": "input_value",
          //"check": "Number"
        }

      ],
      "inputsInline": true,
      "helpUrl": Blockly.Msg.mpython_HELPURL,
      "tooltip": Blockly.Msg.MPYTHON_DISPLAY_SHAPE_RECT_TOOLTIP,
      "message0": Blockly.Msg.MPYTHON_DISPLAY_SHAPE_RECT_MESSAGE0,
      "nextStatement": null,
      "previousStatement": null
    });
  }
};

Blockly.Blocks['mpython_display_hvline'] = {
  init: function () {
    this.jsonInit({
      "colour": Blockly.Blocks.display_onboard.HUE,
      "args0": [
        {
          "name": "state",
          "options": [
          [Blockly.Msg.MPYTHON_DISPLAY_MODE_1, '1'],
          [Blockly.Msg.MPYTHON_DISPLAY_MODE_0, '0']
          ],
          "type": "field_dropdown"
        },
        {
          "name": "dir_h_v",
          "options": [
            [Blockly.Msg.mpython_vertical, '0'],
            [Blockly.Msg.mpython_horizontal, '1']
          ],
          "type": "field_dropdown"
        },
        {
          "type": "input_dummy"
        },
        {
          "name": "x",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "y",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "length",
          "type": "input_value",
          //"check": "Number"
        }

      ],
      "inputsInline": true,
      "helpUrl": Blockly.Msg.mpython_HELPURL,
      "tooltip": Blockly.Msg.MPYTHON_DISPLAY_HVLINE_TOOLTIP,
      "message0": Blockly.Msg.MPYTHON_DISPLAY_HVLINE_MESSAGE0,
      "nextStatement": null,
      "previousStatement": null
    });
  }
};

Blockly.Blocks['mpython_display_line'] = {
  init: function () {
    this.jsonInit({
      "colour": Blockly.Blocks.display_onboard.HUE,
      "args0": [
        {
          "name": "state",
          "options": [[Blockly.Msg.mpython_display_hline_1, '1'], [Blockly.Msg.mpython_display_hline_0, '0']],
          "type": "field_dropdown"
        },
        {
          "type": "input_dummy"
        }, {
          "name": "x1",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "y1",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "x2",
          "type": "input_value",
          //"check": "Number"
        },
        {
          "name": "y2",
          "type": "input_value",
          //"check": "Number"
        }

      ],
      "inputsInline": true,
      "helpUrl": Blockly.Msg.mpython_HELPURL,
      "tooltip": Blockly.Msg.mpython_display_line_TOOLTIP,
      "message0": Blockly.Msg.mpython_display_line_MESSAGE0,
      "nextStatement": null,
      "previousStatement": null
    });
  }
};

Blockly.Blocks['mpython_pbm_image'] = {
  init: function () {
    this.jsonInit({
      "colour": Blockly.Blocks.display_onboard.HUE,
      "args0": [
        {
          "type": "field_label",
          "name": "size_image",
          "text": Blockly.MIXLY_MICROBIT_Built_in_image1
        },
       
        {
          "name": "path",
          "options": [
            ["Angry","Angry"],
            ["Bored","Bored"],
            ["Confused","Confused"],
            ["Happy","Happy"],
            ["Heart","Heart"],
            ["Paper","Paper"],
            ["Rock","Rock"],
            ["Sad","Sad"],
            ["Scissors","Scissors"],
            ["Silly","Silly"],
            ["Sleep","Sleep"],
            ["Small_heart","Small_heart"],
            ["Small_paper","Small_paper"],
            ["Small_rock","Small_rock"],
            ["Small_scissors","Small_scissors"],
            ["Smile","Smile"],
            ["Surprise","Surprise"],
            ["Wonderful","Wonderful"],
            ["Eyes_Angry","Eyes_Angry"],
            ["Awake","Awake"],
            ["Black_eye","Black_eye"],
            ["Bottom_left","Bottom_left"],
            ["Bottom_right","Bottom_right"],
            ["Crazy_1","Crazy_1"],
            ["Crazy_2","Crazy_2"],
            ["Disappointed","Disappointed"],
            ["Dizzy","Dizzy"],
            ["Down","Down"],
            ["Evil","Evil"],
            ["Hurt","Hurt"],
            ["Knocked_out","Knocked_out"],
            ["Love","Love"],
            ["Middle_left","Middle_left"],
            ["Middle_right","Middle_right"],
            ["Neutral","Neutral"],
            ["Nuclear","Nuclear"],
            ["Pinch_left","Pinch_left"],
            ["Pinch_middle","Pinch_middle"],
            ["Pinch_right","Pinch_right"],
            ["Tear","Tear"],
            ["Tired_left","Tired_left"],
            ["Tired_middle","Tired_middle"],
            ["Tired_right","Tired_right"],
            ["Toxic","Toxic"],
            ["Up","Up"],
            ["Winking","Winking"],
            ["Accept","Accept"],
            ["Backward","Backward"],
            ["Decline","Decline"],
            ["Forward","Forward"],
            ["Left","Left"],
            ["No_go","No_go"],
            ["Question_mark","Question_mark"],
            ["Right","Right"],
            ["Stop_1","Stop_1"],
            ["Stop_2","Stop_2"],
            ["Thumbs_down","Thumbs_down"],
            ["Thumbs_up","Thumbs_up"],
            ["Warning","Warning"],
            ["Bomb","Bomb"],
            ["Boom","Boom"],
            ["Fire","Fire"],
            ["Flowers","Flowers"],
            ["Forest","Forest"],
            ["Lightning","Lightning"],
            ["Light_off","Light_off"],
            ["Light_on","Light_on"],
            ["Night","Night"],
            ["Pirate","Pirate"],
            ["Snow","Snow"],
            ["Target","Target"],
            ["Bar_0","Bar_0"],
            ["Bar_1","Bar_1"],
            ["Bar_2","Bar_2"],
            ["Bar_3","Bar_3"],
            ["Bar_4","Bar_4"],
            ["Dial_0","Dial_0"],
            ["Dial_1","Dial_1"],
            ["Dial_2","Dial_2"],
            ["Dial_3","Dial_3"],
            ["Dial_4","Dial_4"],
            ["Dots_0","Dots_0"],
            ["Dots_1","Dots_1"],
            ["Dots_2","Dots_2"],
            ["Dots_3","Dots_3"],
            ["Hourglass_0","Hourglass_0"],
            ["Hourglass_1","Hourglass_1"],
            ["Hourglass_2","Hourglass_2"],
            ["Timer_0","Timer_0"],
            ["Timer_1","Timer_1"],
            ["Timer_2","Timer_2"],
            ["Timer_3","Timer_3"],
            ["Timer_4","Timer_4"],
            ["Water_level_0","Water_level_0"],
            ["Water_level_1","Water_level_1"],
            ["Water_level_2","Water_level_2"],
            ["Water_level_3","Water_level_3"],


          ],
          "type": "field_dropdown"
        }
      ],
      "output": "String",
      "helpUrl": '',
      "tooltip": '',
      "message0": '%1 %2'
    });
  }
};