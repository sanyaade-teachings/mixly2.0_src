'use strict';

goog.provide('Blockly.Blocks.display_onboard');
goog.require('Blockly.Blocks');

Blockly.Blocks.display_onboard.HUE = '#78B5B4';

Blockly.FieldColour.COLOURS = ['#f00', '#000'];
Blockly.FieldColour.COLUMNS = 2;

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
            [Blockly.Msg.MPYTHON_FACE_1, '1.pbm'],
            [Blockly.Msg.MPYTHON_FACE_2, '2.pbm'],
            [Blockly.Msg.MPYTHON_FACE_3, '3.pbm'],
            [Blockly.Msg.MPYTHON_FACE_4, '4.pbm'],
            [Blockly.Msg.MPYTHON_FACE_5, '5.pbm'],
            [Blockly.Msg.MPYTHON_FACE_6, '6.pbm'],
            [Blockly.Msg.MPYTHON_FACE_7, '7.pbm'],
            [Blockly.Msg.MPYTHON_FACE_8, '8.pbm'],
            [Blockly.Msg.MPYTHON_FACE_9, '9.pbm'],
            [Blockly.Msg.MPYTHON_FACE_10, '10.pbm'],
            [Blockly.Msg.MPYTHON_FACE_11, '11.pbm'],
            [Blockly.Msg.MPYTHON_FACE_12, '12.pbm'],
            [Blockly.Msg.MPYTHON_FACE_ROCK, 'rock.pbm'],
            [Blockly.Msg.MPYTHON_FACE_ROCK_S, 'rock_s.pbm'],
            [Blockly.Msg.MPYTHON_FACE_PAPER, 'paper.pbm'],
            [Blockly.Msg.MPYTHON_FACE_PAPER_S, 'paper_s.pbm'],
            [Blockly.Msg.MPYTHON_FACE_SCISSORS, 'scissors.pbm'],
            [Blockly.Msg.MPYTHON_FACE_SCISSORS_S, 'scissors_s.pbm'],
            ['Big smile.pbm', 'Big smile.pbm'],
            ['Heart large.pbm', 'Heart large.pbm'],
            ['Heart small.pbm', 'Heart small.pbm'],
            ['Mouth 1 open.pbm', 'Mouth 1 open.pbm'],
            ['Mouth 1 shut.pbm', 'Mouth 1 shut.pbm'],
            ['Mouth 2 open.pbm', 'Mouth 2 open.pbm'],
            ['Mouth 2 shut.pbm', 'Mouth 2 shut.pbm'],
            ['Sad.pbm', 'Sad.pbm'],
            ['Sick.pbm', 'Sick.pbm'],
            ['Smile.pbm', 'Smile.pbm'],
            ['Swearing.pbm', 'Swearing.pbm'],
            ['Talking.pbm', 'Talking.pbm'],
            ['Wink.pbm', 'Wink.pbm'],
            ['ZZZ.pbm', 'ZZZ.pbm'],
            ['Angry.pbm', 'Angry.pbm'],
            ['Awake.pbm', 'Awake.pbm'],
            ['Black eye.pbm', 'Black eye.pbm'],
            ['Bottom left.pbm', 'Bottom left.pbm'],
            ['Bottom right.pbm', 'Bottom right.pbm'],
            ['Crazy 1.pbm', 'Crazy 1.pbm'],
            ['Crazy 2.pbm', 'Crazy 2.pbm'],
            ['Disappointed.pbm', 'Disappointed.pbm'],
            ['Dizzy.pbm', 'Dizzy.pbm'],
            ['Down.pbm', 'Down.pbm'],
            ['Evil.pbm', 'Evil.pbm'],
            ['Hurt.pbm', 'Hurt.pbm'],
            ['Knocked out.pbm', 'Knocked out.pbm'],
            ['Love.pbm', 'Love.pbm'],
            ['Middle left.pbm', 'Middle left.pbm'],
            ['Middle right.pbm', 'Middle right.pbm'],
            ['Neutral.pbm', 'Neutral.pbm'],
            ['Nuclear.pbm', 'Nuclear.pbm'],
            ['Pinch left.pbm', 'Pinch left.pbm'],
            ['Pinch middle.pbm', 'Pinch middle.pbm'],
            ['Pinch right.pbm', 'Pinch right.pbm'],
            ['Tear.pbm', 'Tear.pbm'],
            ['Tired left.pbm', 'Tired left.pbm'],
            ['Tired middle.pbm', 'Tired middle.pbm'],
            ['Tired right.pbm', 'Tired right.pbm'],
            ['Toxic.pbm', 'Toxic.pbm'],
            ['Up.pbm', 'Up.pbm'],
            ['Winking.pbm', 'Winking.pbm'],
            ['Accept.pbm', 'Accept.pbm'],
            ['Backward.pbm', 'Backward.pbm'],
            ['Decline.pbm', 'Decline.pbm'],
            ['Forward.pbm', 'Forward.pbm'],
            ['Left.pbm', 'Left.pbm'],
            ['No go.pbm', 'No go.pbm'],
            ['Question mark.pbm', 'Question mark.pbm'],
            ['Right.pbm', 'Right.pbm'],
            ['Stop 1.pbm', 'Stop 1.pbm'],
            ['Stop 2.pbm', 'Stop 2.pbm'],
            ['Thumbs down.pbm', 'Thumbs down.pbm'],
            ['Thumbs up.pbm', 'Thumbs up.pbm'],
            ['Warning.pbm', 'Warning.pbm'],
            ['Bomb.pbm', 'Bomb.pbm'],
            ['Boom.pbm', 'Boom.pbm'],
            ['Fire.pbm', 'Fire.pbm'],
            ['Flowers.pbm', 'Flowers.pbm'],
            ['Forest.pbm', 'Forest.pbm'],
            ['Light off.pbm', 'Light off.pbm'],
            ['Light on.pbm', 'Light on.pbm'],
            ['Lightning.pbm', 'Lightning.pbm'],
            ['Night.pbm', 'Night.pbm'],
            ['Pirate.pbm', 'Pirate.pbm'],
            ['Snow.pbm', 'Snow.pbm'],
            ['Target.pbm', 'Target.pbm'],
            ['Bar 0.pbm', 'Bar 0.pbm'],
            ['Bar 1.pbm', 'Bar 1.pbm'],
            ['Bar 2.pbm', 'Bar 2.pbm'],
            ['Bar 3.pbm', 'Bar 3.pbm'],
            ['Bar 4.pbm', 'Bar 4.pbm'],
            ['Dial 0.pbm', 'Dial 0.pbm'],
            ['Dial 1.pbm', 'Dial 1.pbm'],
            ['Dial 2.pbm', 'Dial 2.pbm'],
            ['Dial 3.pbm', 'Dial 3.pbm'],
            ['Dial 4.pbm', 'Dial 4.pbm'],
            ['Dots 0.pbm', 'Dots 0.pbm'],
            ['Dots 1.pbm', 'Dots 1.pbm'],
            ['Dots 2.pbm', 'Dots 2.pbm'],
            ['Dots 3.pbm', 'Dots 3.pbm'],
            ['Hourglass 0.pbm', 'Hourglass 0.pbm'],
            ['Hourglass 1.pbm', 'Hourglass 1.pbm'],
            ['Hourglass 2.pbm', 'Hourglass 2.pbm'],
            ['Timer 0.pbm', 'Timer 0.pbm'],
            ['Timer 1.pbm', 'Timer 1.pbm'],
            ['Timer 2.pbm', 'Timer 2.pbm'],
            ['Timer 3.pbm', 'Timer 3.pbm'],
            ['Timer 4.pbm', 'Timer 4.pbm'],
            ['Water level 0.pbm', 'Water level 0.pbm'],
            ['Water level 1.pbm', 'Water level 1.pbm'],
            ['Water level 2.pbm', 'Water level 2.pbm'],
            ['Water level 3.pbm', 'Water level 3.pbm'],
            ['Accept_1.pbm', 'Accept_1.pbm'],
            ['Accept_2.pbm', 'Accept_2.pbm'],
            ['Alert.pbm', 'Alert.pbm'],
            ['Box.pbm', 'Box.pbm'],
            ['Busy_0.pbm', 'Busy_0.pbm'],
            ['Busy_1.pbm', 'Busy_1.pbm'],
            ['Decline_1.pbm', 'Decline_1.pbm'],
            ['Decline_2.pbm', 'Decline_2.pbm'],
            ['Dot_empty.pbm', 'Dot_empty.pbm'],
            ['Dot_full.pbm', 'Dot_full.pbm'],
            ['Play.pbm', 'Play.pbm'],
            ['Slider_0.pbm', 'Slider_0.pbm'],
            ['Slider_1.pbm', 'Slider_1.pbm'],
            ['Slider_2.pbm', 'Slider_2.pbm'],
            ['Slider_3.pbm', 'Slider_3.pbm'],
            ['Slider_4.pbm', 'Slider_4.pbm'],
            ['Slider_5.pbm', 'Slider_5.pbm'],
            ['Slider_6.pbm', 'Slider_6.pbm'],
            ['Slider_7.pbm', 'Slider_7.pbm'],
            ['Slider_8.pbm', 'Slider_8.pbm']
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