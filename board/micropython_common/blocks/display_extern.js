'use strict';

goog.provide('Blockly.Blocks.display_extern');
goog.require('Blockly.Blocks');

Blockly.Blocks.display_extern.HUE = '5BA5A5';



Blockly.FieldColour.COLOURS = ['#f00', '#000'];
Blockly.FieldColour.COLUMNS = 7;

//var IMG = [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"],["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]];
var IMG = [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"]];





Blockly.Blocks.display_matrix_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                ["32x12 Matrix", "32x12 Matrix"],
                ["16x8 Matrix", "16x8 Matrix"]
                ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        
     
    }
};

Blockly.Blocks.display_matrix_extern_show_image = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image","List",'Tuple'])
        .appendField(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

 Blockly.Blocks.display_matrix_extern_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('SUB')
        .setCheck("var");
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

Blockly.Blocks.display_matrix_extern_scroll_string = {
   init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
     this.setColour(Blockly.Blocks.display_extern.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
   }
 };

Blockly.Blocks.display_matrix_extern_scroll_string_delay = {
   init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
     this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks.display_matrix_extern_show_frame_string = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.display_matrix_extern_show_frame_string_delay = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks['display_matrix_extern_shift'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_UP, 'shift_up'],
         [Blockly.MIXLY_DOWN, 'shift_down'],
         [Blockly.MIXLY_LEFT, 'shift_left'],
         [Blockly.MIXLY_RIGHT, 'shift_right'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks.display_matrix_extern_get_pixel = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks.display_matrix_extern_bright_point = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks.display_matrix_extern_get_screen_pixel = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.display_matrix_extern_bright_screen = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
  }
};

Blockly.Blocks.display_matrix_extern_clear = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_Clear_display);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }
};


Blockly.Blocks['display_matrix_extern_image_builtins'] = {
  init: function() {
    var OPERATORS =
         [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"]
         // ,["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]
          ];
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_Built_in_image1)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'image');
  this.setOutput(true, "esp32_image");
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }  
};


Blockly.Blocks['matrix_extern_image_arithmetic'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MICROBIT_DISPLAY_UNION, 'add'],
         [Blockly.MICROBIT_DISPLAY_MINUS, 'sub']];
    this.appendValueInput('SUB')
        .setCheck("var");     
    this.setColour(Blockly.Blocks.display_extern.HUE);
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

Blockly.Blocks.matrix_extern_image_invert = {
  init: function() {
    this.appendValueInput('SUB')
        .setCheck("var");
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('A')
        .setCheck("esp32_image")
        .appendField(Blockly.MIXLY_MICROBIT_Invert_image1);
    this.setInputsInline(true);
    this.setOutput(true, "esp32_image");
  }
};












//oled
Blockly.Blocks.display_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        // this.appendDummyInput("")
        //     .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + "OLED")
        //     .appendField(new Blockly.FieldDropdown([
        //         ["OLED 128¡Á64", "OLED 128¡Á64"]
        //         ]), "key");
        this.appendValueInput('row')
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + "OLED")
            .setCheck(Number);
        this.appendValueInput('column')
            .appendField("X")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};

Blockly.Blocks.display_draw_4strings = {
    init: function() {
        // this.appendDummyInput()
        //     .appendField(Blockly.OLED)
        // this.appendDummyInput("")        
            // .appendField(new Blockly.FieldTextInput('lcd'), 'VAR')  
            // .appendField(Blockly.Msg.OLEDDISPLAY);  
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
        this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
        this.appendValueInput("Text_line1" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.OLEDDISPLAY+Blockly.Msg.line1);    
        this.appendValueInput("Text_line2" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line2);      
        this.appendValueInput("Text_line3" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line3);      
        this.appendValueInput("Text_line4" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line4);      
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.setTooltip(Blockly.MIXLY_DF_LCD+Blockly.Msg.OLEDDISPLAY+Blockly.MIXLY_MICROBIT_TYPE_STRING);
    }
};

Blockly.Blocks['display_image_size'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_HEIGHT, 'height'],
         [Blockly.MIXLY_WIDTH, 'width']
        ];
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_MICROBIT_IMAGE);
    this.appendValueInput('VAR')
        .setCheck("esp32_image")
        // .appendField(Blockly.blockpy_USE_LIST);   
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    this.setOutput(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
      var mode1 =Blockly.MIXLY_MICROBIT_IMAGE
      var TOOLTIPS = {
        'height': Blockly.MIXLY_HEIGHT,
        'width': Blockly.MIXLY_WIDTH,
      };
      return mode0+mode1+TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks.display_rect = {
    init: function () {
      var brightness_or_not =
        [[Blockly.MIXLY_4DIGITDISPLAY_ON, '1'],
         [Blockly.MIXLY_4DIGITDISPLAY_OFF, '0']
        ];
        this.setColour(Blockly.Blocks.display_extern.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
         this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RECT)   
            .appendField(new Blockly.FieldDropdown(brightness_or_not), 'OP')  
            
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_RECT,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "width"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "height"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox", 
          "name" : "fill"
          }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_OLED_RECT);
    }
};

Blockly.Blocks.display_line = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
          this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
         this.appendDummyInput()
         .appendField(Blockly.MIXLY_DISPLAY_DRAW)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_DISPLAY_RLINE, "hline"], [Blockly.MIXLY_DISPLAY_VLINE, "vline"]]), "direction");
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_LINE,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "length"
        }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_OLED_LINE);
    }
};

Blockly.Blocks.display_line_arbitrarily= {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
        this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_LINE_ARBITRARILY,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x1"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y1"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "x2"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "y2"
        },
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_OLED_LINE_ARBIT);
    }
}

Blockly.Blocks.display_get_screen_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MONITOR_GET_SCREEN_IMAGE);
    this.setInputsInline(true);
    this.setOutput(true, "esp32_image");
    this.setTooltip(Blockly.MIXLY_ESP32_MONITOR_GET_SCREEN_IMAGE_TOOLTIP);
  }
};

Blockly.Blocks.display_blink_rate = {
  init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE);
  }
};

Blockly.Blocks.display_rgb_color = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET+Blockly.MIXLY_MICROBIT_PY_STORAGE_AS)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RGB_NUM_R_G_B);
    }
};

Blockly.Blocks['display_onoff'] = {
   init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ESP32_ON, "ON"], [Blockly.MIXLY_ESP32_OFF, "OFF"]]), 'ONOFF')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};

Blockly.Blocks['switch'] = {
    init: function() {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_ESP32_ON, "1"],
                [Blockly.MIXLY_ESP32_OFF, "0"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks['display_fill'] = {
    init: function(){
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_LCD_STAT_CLEAR, "0"],
                [Blockly.MIXLY_HANDBIT_DISLPAY_OLED_FILL, "1"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('key');
        var TOOLTIPS = {
        '0': Blockly.MIXLY_LCD_STAT_CLEAR,
        '1': Blockly.MIXLY_HANDBIT_DISLPAY_OLED_FILL
       };
      return Blockly.MIXLY_DF_LCD+TOOLTIPS[mode];
    });
    }
};

Blockly.Blocks.display_tm_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                // ["MPU9250", "MPU9250"],
                // ["TM1637", "TM1637"],
                ["TM1650", "TM1650"]
                ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('key');
        var mode0 = Blockly.MIXLY_ESP32_SENSOR_USE_I2C_TOOLTIP;
        var mode1 = Blockly.MIXLY_ESP32_NEAR;
        var TOOLTIPS = {
        // "MPU9250": "MPU9250",
        // "TM1637": "TM1637",
        "TM1650": "TM1650"
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks.display_tm1650_power = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "_on"], [Blockly.MIXLY_OFF, "_off"], [Blockly.MIXLY_LCD_STAT_CLEAR, "_clear"]]), "STAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_power);
    }
};

Blockly.Blocks.display_tm1650_show_num = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendValueInput("VALUE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_NUMBER);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_displayString);
    }
};

Blockly.Blocks.display_tm1650_show_dot = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendValueInput("NO")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER1)
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.MIXLY_4DIGITDISPLAY_DOT)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_showDot);
    }
};

Blockly.Blocks['display_animate'] = {
  init: function() {
    var ANIMATE =
        [["ALL_CLOCKS", 'ALL_CLOCKS'],
         ["ALL_ARROWS", 'ALL_ARROWS']];
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.setOutput(true, 'Tuple');
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_DISPLAY_ANIMATE)
        .appendField(new Blockly.FieldDropdown(ANIMATE), 'ANIMATION')        
    //this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks.display_circle = {
    init: function () {
      var brightness_or_not =
        [[Blockly.MIXLY_4DIGITDISPLAY_ON, '1'],
         [Blockly.MIXLY_4DIGITDISPLAY_OFF, '0']
        ];
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MIXPY_TURTLE_DRAW_CIRCLE)   
            .appendField(new Blockly.FieldDropdown(brightness_or_not), 'OP')  
        this.jsonInit({
      "message0" : Blockly.MIXLY_HANBIT_SHOW_CIRCLE,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "r"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox", 
          "name" : "fill"
          }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_MIXPY_TURTLE_DRAW_CIRCLE);
    }
};

Blockly.Blocks.display_triangle = {
    init: function () {
      var brightness_or_not =
        [[Blockly.MIXLY_4DIGITDISPLAY_ON, '1'],
         [Blockly.MIXLY_4DIGITDISPLAY_OFF, '0']
        ];
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.OLED)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_DISPLAY_DRAW+Blockly.MIXLY_HANBIT_DRAW_TRIANGLE)   
            .appendField(new Blockly.FieldDropdown(brightness_or_not), 'OP')  
        this.jsonInit({
      "message0" : Blockly.MIXLY_HANBIT_SHOW_triangle,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x0"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y0"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "x1"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y1"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "x2"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y2"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox", 
          "name" : "fill"
          }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_DISPLAY_DRAW+Blockly.MIXLY_HANBIT_DRAW_TRIANGLE);
    }
};

Blockly.Blocks.display_help = {
  init: function () {
    this.setColour('#555555');
    this.appendDummyInput("")
      .appendField(Blockly.MIXGO_ONBOARDDISPLAY_HELP);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

//显示-OLED-显示图像
Blockly.Blocks.display_oled_showBitmap = {
  init: function () {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('VAR')
        .appendField(Blockly.OLED)
        .setCheck("var");
    this.appendDummyInput("")
      .appendField(Blockly.OLED_BITMAP);
    this.appendValueInput("START_X", Number)
      .appendField(Blockly.OLED_START_X)
      .setCheck(Number);
    this.appendValueInput("START_Y", Number)
      .appendField(Blockly.OLED_START_Y)
      .setCheck(Number);
    this.appendValueInput("bitmap_name", String)
      .appendField(Blockly.OLED_BITMAP_NAME);
    this.appendValueInput("WIDTH", Number)
      .appendField(Blockly.MIXLY_WIDTH)
      .setCheck(Number);
    this.appendValueInput("HEIGHT", Number)
      .appendField(Blockly.MIXLY_HEIGHT)
      .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_SHOW_BMP_TOOLTIP);
  }
};

//显示-OLED-画点
Blockly.Blocks.display_oled_drawPixel = {
  init: function () {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('VAR')
        .appendField(Blockly.OLED)
    this.appendDummyInput("")
      .appendField(Blockly.OLED_DRAWPIXEL);
    this.appendValueInput("POS_X")
      .appendField(Blockly.OLED_POSX)
    this.appendValueInput("POS_Y")
      .appendField(Blockly.OLED_POSY)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_DRAW_PIXE_TOOLTIP);
  }
};

Blockly.Blocks.display_tm_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                // ["MPU9250", "MPU9250"],
                // ["TM1637", "TM1637"],
                ["TM1650", "TM1650"]
                ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('key');
        var mode0 = Blockly.MIXLY_ESP32_SENSOR_USE_I2C_TOOLTIP;
        var mode1 = Blockly.MIXLY_ESP32_NEAR;
        var TOOLTIPS = {
        // "MPU9250": "MPU9250",
        // "TM1637": "TM1637",
        "TM1650": "TM1650"
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks.display_tm1650_power = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "on"], [Blockly.MIXLY_OFF, "off"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]]), "STAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_power);
    }
};

Blockly.Blocks.display_tm1650_show_num = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendValueInput("VALUE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_NUMBER);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_displayString);
    }
};

Blockly.Blocks.display_tm1650_show_dot = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendValueInput("NO")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER1)
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.MIXLY_4DIGITDISPLAY_DOT)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_showDot);
    }
};

Blockly.Blocks.display_tm1650_set_brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_4DIGITDISPLAY)
            .appendField(new Blockly.FieldDropdown([["TM1650", "tm1650"]]), "TYPE");
        this.appendValueInput("VAR")
        this.appendValueInput("VALUE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SET_BRIGHTNESS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
    }
};

Blockly.Blocks.tft_use_spi_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"SPI")
            .setCheck("var");
        this.appendValueInput('PINDC')
            .appendField("DC")    
        this.appendValueInput('PINCS')
            .appendField("CS")            
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + MSG.catTFT)  
        this.appendValueInput("WIDTH")
            .appendField(Blockly.MIXLY_WIDTH)
            .setCheck(Number);
        this.appendValueInput("HEIGHT")
            .appendField(Blockly.MIXLY_HEIGHT)
            .setCheck(Number);      
        this.appendDummyInput("")
            .appendField(Blockly.blockpy_turtle_rotate)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MICROPYTHON_DISPLAY_NO, "0"],
                [Blockly.Msg.ANTI_CLOCKWISE+'90°', "1"],
                [Blockly.Msg.ANTI_CLOCKWISE+'180°', "2"],
                [Blockly.Msg.ANTI_CLOCKWISE+'270°', "3"]
            ]), 'rotate')                
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.tft_show_image_xy = {
  init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    this.appendValueInput('SUB')
        .appendField(MSG.catTFT);  
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
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.HTML_COLOUR);       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

Blockly.Blocks.display_color_seclet = {
  init: function() {
    this.setColour(Blockly.Blocks.display_extern.HUE);
    let fieldColorObj = new Blockly.FieldColour('#f00');
    fieldColorObj.setColours([
  // grays
  '#ffffff', '#cccccc', '#c0c0c0', '#999999', '#666666', '#333333', '#000000',
  // reds
  '#ffcccc', '#ff6666', '#ff0000', '#cc0000', '#990000', '#660000', '#330000',
  // oranges
  '#ffcc99', '#ff9966', '#ff9900', '#ff6600', '#cc6600', '#993300', '#663300',
  // yellows
  '#ffff99', '#ffff66', '#ffcc66', '#ffcc33', '#cc9933', '#996633', '#663333',
  // olives
  '#ffffcc', '#ffff33', '#ffff00', '#ffcc00', '#999900', '#666600', '#333300',
  // greens
  '#99ff99', '#66ff99', '#33ff33', '#33cc00', '#009900', '#006600', '#003300',
  // turquoises
  '#99ffff', '#33ffff', '#66cccc', '#00cccc', '#339999', '#336666', '#003333',
  // blues
  '#ccffff', '#66ffff', '#33ccff', '#3366ff', '#3333ff', '#000099', '#000066',
  // purples
  '#ccccff', '#9999ff', '#6666cc', '#6633ff', '#6600cc', '#333399', '#330099',
  // violets
  '#ffccff', '#ff99ff', '#cc66cc', '#cc33cc', '#993399', '#663366', '#330033'
]);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(fieldColorObj, "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, String);
}
};

Blockly.Blocks.tft_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('SUB')
        .appendField(MSG.catTFT);  
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
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.HTML_COLOUR);          
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
  }
};


Blockly.Blocks.tft_scroll_string_delay = {
   init: function() {
     this.setColour(Blockly.Blocks.display_onboard.HUE);
     this.appendValueInput('SUB')
         .appendField(MSG.catTFT);  
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
     this.appendValueInput('VAR')
        .appendField(Blockly.Msg.HTML_COLOUR);  
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
     this.setTooltip(Blockly.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
   }
 };

Blockly.Blocks.tft_show_frame_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display_onboard.HUE);
    this.appendValueInput('SUB')
        .appendField(MSG.catTFT);  
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.appendValueInput("size")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);    
    this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);        
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.HTML_COLOUR);  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};



Blockly.Blocks['tft_fill'] = {
    init: function(){
        this.setColour(Blockly.Blocks.display_extern.HUE);
        this.appendValueInput('SUB')
            .setCheck("var")
            .appendField(MSG.catTFT);  
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_LCD_STAT_CLEAR, "BLACK"],
                [Blockly.MIXLY_HANDBIT_DISLPAY_OLED_FILL, "WHITE"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('key');
        var TOOLTIPS = {
        '0': Blockly.MIXLY_LCD_STAT_CLEAR,
        '1': Blockly.MIXLY_HANDBIT_DISLPAY_OLED_FILL
       };
      return Blockly.MIXLY_DF_LCD+TOOLTIPS[mode];
    });
    }
};

Blockly.Blocks.tft_line_arbitrarily= {
    init: function () {
        this.setColour(Blockly.Blocks.display_extern.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
        this.appendValueInput('SUB')
            .appendField(MSG.catTFT)
            .setCheck("var");
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_LINE_ARBITRARILY,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x1"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y1"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "x2"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "y2"
        },
        ]
      });
        this.appendValueInput('VAR')
        .appendField(Blockly.Msg.HTML_COLOUR);  
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_OLED_LINE_ARBIT);
    }
}