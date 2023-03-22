'use strict';

goog.provide('Blockly.Blocks.data');

goog.require('Blockly.Blocks');


Blockly.Msg['DATA_HUE'] = 170//'#5ec73d'//195;


Blockly.Blocks['series_create'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
  this.appendDummyInput("")
  
      .appendField(Blockly.Msg.Lang.blockpy_series_create)
      .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.Msg.Lang.blockpy_series_via)              
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_series_create_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['series_create_from_index'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput("")
  
      .appendField(Blockly.Msg.Lang.blockpy_series_create)
      .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.Msg.Lang.blockpy_series_via)   
    this.appendValueInput('INDEX')
        .setCheck([String,'List'])
        .appendField(Blockly.Msg.Lang.blockpy_series_set_index)  
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_series_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
  this.appendDummyInput("")
  
      .appendField(Blockly.Msg.Lang.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.Msg.Lang.blockpy_series_via)              
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_dataframe_create_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create_from_one_index'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var column_raw =
        [[Blockly.Msg.Lang.DATAFRAME_RAW, 'index'],[Blockly.Msg.Lang.DATAFRAME_COLUMN, 'columns']];
    this.appendDummyInput("")  
      .appendField(Blockly.Msg.Lang.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.Msg.Lang.blockpy_series_via)  
    this.appendDummyInput("")    
        .appendField(new Blockly.FieldDropdown(column_raw), 'COLUMN_RAW')  
    this.appendValueInput('INDEX')
        .setCheck([String,'List'])
        .appendField(Blockly.Msg.Lang.blockpy_series_set_index)          
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_dataframe_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create_from_index'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput("")
  
      .appendField(Blockly.Msg.Lang.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.Msg.Lang.blockpy_series_via)   
    this.appendValueInput('INDEX_COLUMN')
        .setCheck([String,'List'])
        .appendField(Blockly.Msg.Lang.blockpy_dataframe_set_index_column)
    this.appendValueInput('INDEX_RAW')
        .setCheck([String,'List'])
        .appendField(Blockly.Msg.Lang.blockpy_dataframe_set_index_raw)      
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.Lang.blockpy_dataframe_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}



Blockly.Blocks['series_create_from_text'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput("")
  
        .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
        
        .appendField(' = [')
        .appendField(new Blockly.FieldTextInput('1,2,3'), 'TEXT')
        .appendField(']');
        
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_TOOLTIP_SERIES_CREATE_FROM_TEXT);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
  
}


Blockly.Blocks['series_index_value'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var index_value =
        [[Blockly.Msg.Lang.SERIES_INDEX, 'index'],[Blockly.Msg.Lang.HTML_VALUE, 'value']];
    this.appendValueInput('SERIES')
        .setCheck('Series')
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.SERIES_INDEX_VALUE)  
        .appendField(new Blockly.FieldDropdown(index_value), 'INDEX_VALUE')      
     
    this.setOutput(true, 'List');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('INDEX_VALUE');
      var TOOLTIPS = {
        'index': Blockly.Msg.Lang.SERIES_INDEX_TOOLTIP,
        'value': Blockly.Msg.Lang.HTML_VALUE_TOOLTIP
      };
      return TOOLTIPS[mode];
    });

  }
};

Blockly.Blocks.series_get_num = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    //this.setOutput(true, Number);
    this.setOutput(true);
    this.appendValueInput('SER')
        .setCheck('Series')
    this.appendValueInput('AT')
        .setCheck(Number)    
        .appendField(Blockly.Msg.Lang.LANG_LISTS_GET_INDEX1);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.LANG_LISTS_GET_INDEX2);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.TUPLE_GET_INDEX_TOOLTIP);
  }
};


Blockly.Blocks['pl_plot_easy'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    this.appendValueInput('SER')
        .setCheck('Series')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_MAKE);   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT);               
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_plot'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];        

    this.appendValueInput('SER')
        .setCheck('Series')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_MAKE);   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT); 
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE)  
        .appendField(new Blockly.FieldDropdown(line_type), 'LINE')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')              
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_show'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.blockpy_PYLAB_SHOW);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_axes'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.mixpy_PL_AXES);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['pl_legend'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.blockpy_PYLAB_LEGEND);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_title'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);    
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_TITLE);
    this.appendValueInput('TITLE')
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_label'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    var xylabel =
        [[Blockly.Msg.Lang.PYLAB_LABEL_X, 'x'],[Blockly.Msg.Lang.PYLAB_LABEL_Y, 'y']];   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_SET_LABEL)
        .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
    this.appendValueInput('LABEL')
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_LABEL)
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // var thisBlock = this;
    // this.setTooltip(function() {
    //   var mode = thisBlock.getFieldValue('DIR');
    //   var TOOLTIPS = {
    //     'x': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_FORWARD,
    //     'y': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_BACKWARD
    //   };
    //   return TOOLTIPS[mode];
    // });
  }
};


Blockly.Blocks.array_create = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput('FROM')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.Lang.MIXLY_SPLITBYDOU)
        .appendField(Blockly.Msg.Lang.MIXPY_DATA_ARRAY_CREATE_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.Lang.MIXPY_DATA_ARRAY_CREATE_TO);
    this.appendValueInput('STEP')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.Lang.MIXLY_STEP);
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
  }
};

Blockly.Blocks['pl_plot_bar'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var plot_bar =
        [[Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_PLOT, 'plot'],[Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_BAR, 'bar']];  
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_DISPLAY_DRAW)
        .appendField(new Blockly.FieldDropdown(plot_bar), 'DIR');      
    this.appendValueInput('A')        
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'plot': Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP,
        'bar': Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_EASY_TOOLTIP
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['pl_plot_scatter'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_SCATTER)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);   
    this.appendValueInput('S')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_NUMBER);  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT');
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR');   
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);  
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

Blockly.Blocks['pl_plot_xy'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);    
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE)  
        .appendField(new Blockly.FieldDropdown(line_type), 'LINE')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')      
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);     
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};

Blockly.Blocks['pl_bar'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var align =
        [[Blockly.Msg.Lang.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'],[Blockly.Msg.Lang.AILGN_EDGE, 'edge']];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_BAR)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);       
    this.appendValueInput('WIDTH')
        .setCheck(Number)    
        .appendField(Blockly.Msg.Lang.MIXLY_WIDTH); 
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_BAR_ALIGN)  
        .appendField(new Blockly.FieldDropdown(align), 'ALIGN')  
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)
        .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');       
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);     
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};

Blockly.Blocks['pl_pie'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var shadow =
        [[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_N, 'False'],[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_Y, 'True']]; 
    var autopct =
        [[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_N, 'None'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_Z, '%.0f%%'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_O, '%.1f%%'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_T, '%.2f%%']];        
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE)
        .appendField(Blockly.Msg.Lang.COLOUR_BLEND_RATIO);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG); 
    this.appendValueInput('EXPLODE')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_EXPLODE);  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT)  
        .appendField(new Blockly.FieldDropdown(autopct), 'autopct')    
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_SHADOW)  
        .appendField(new Blockly.FieldDropdown(shadow), 'SHADOW')           
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};


Blockly.Blocks['pl_hist'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);      
    this.appendValueInput('A')        
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_HIST)
        .appendField(Blockly.Msg.Lang.MIXLY_SD_DATA);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['pl_ticks'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var xylabel =
        [[Blockly.Msg.Lang.PYLAB_LABEL_X, 'x'],[Blockly.Msg.Lang.PYLAB_LABEL_Y, 'y']]; 
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_SETTING)
        .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS)
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_I2C_VALUE)
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TOOLTIP);
  }
};


Blockly.Blocks['numpy_trig'] = {
  /**
   * Block for trigonometry operators.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [['sin', 'sin'],
         ['cos', 'cos'],
         ['tan', 'tan'],
         ['arcsin', 'arcsin'],
         ['arccos', 'arccos'],
         ['arctan', 'arctan'],
         [Blockly.Msg.Lang.LANG_MATH_TO_ROUND, 'round'],
         [Blockly.Msg.Lang.LANG_MATH_TO_CEIL, 'ceil'],
         [Blockly.Msg.Lang.LANG_MATH_TO_FLOOR, 'floor']
        ];
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.setOutput(true);
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.mixpy_NUMPY_TRIG)
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setTooltip(Blockly.Msg.Lang.mixpy_NUMPY_TRIG_TOOLTIP);    
    
  }
};

Blockly.Blocks.pl_subplot = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput('VET')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_VERTICLE);
    this.appendValueInput('HOR')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_HORIZEN);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_NUM);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
  }
};

Blockly.Blocks.pandas_readcsv = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput("FILENAME")
        .appendField(Blockly.Msg.Lang.MIXPY_PANDAS_READ_CSV);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.mixpy_PANDAS_READCSV_HEADER_Y, '0'],[Blockly.Msg.Lang.mixpy_PANDAS_READCSV_HEADER_N, 'None']]), 'MODE');
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.mixpy_PANDAS_READCSV_TITLE);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PANDAS_READCSV_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['dataframe_get'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput('DICT')
    .setCheck('Dict')    
    this.appendValueInput('KEY')
    .appendField(Blockly.Msg.Lang.mixpy_DATAFRAME_GET)
    this.appendDummyInput("")   
        .appendField(Blockly.Msg.Lang.mixpy_DATAFRAME_GET_INDEX)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.DATAFRAME_COLUMN, 'column'],[Blockly.Msg.Lang.DATAFRAME_RAW, 'raw']]), 'MODE')
        
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.Lang.mixpy_DATAFRAME_GET_TOOLTIP);
      }
    };

 Blockly.Blocks['pl_savefig'] = {
   init: function() {
     this.setColour(Blockly.Msg['DATA_HUE']);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.Msg.Lang.mixpy_PL_SAVEFIG);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.Msg.Lang.mixpy_PL_SAVEFIG_TOOLTIP);
   }
 };

 Blockly.Blocks.pl_text = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var halign =
        [[Blockly.Msg.Lang.TEXT_TRIM_LEFT, 'right'],[Blockly.Msg.Lang.mixpy_PL_TEXT_CENTER, 'center'],[Blockly.Msg.Lang.TEXT_TRIM_RIGHT, 'left']];    
    var valign =
        [[Blockly.Msg.Lang.mixpy_PL_TEXT_TOP, 'bottom'],[Blockly.Msg.Lang.mixpy_PL_TEXT_CENTER, 'center'],[Blockly.Msg.Lang.mixpy_PL_TEXT_BOTTOM, 'top']];    
    this.appendValueInput('VET')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_SETTING)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_X);
    this.appendValueInput('HOR')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_Y);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_TAG);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_HOR)
        .appendField(new Blockly.FieldDropdown(halign), 'HALIGN'); 
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_VER)
        .appendField(new Blockly.FieldDropdown(valign), 'VALIGN');   
    this.appendValueInput('FONTNUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_TURTLE_WRITE_FONT_NUM);         
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PL_TEXT_TOOLTIP);
  }
};

Blockly.Blocks['array_toarray'] = {
  init: function () {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput('VAR')
    .appendField(Blockly.Msg.Lang.MIXLY_TOARRAY);
    this.setOutput(true, 'List');
    this.setTooltip(Blockly.Msg.Lang.MIXLY_PYTHON_TOOLTIP_TOARRAY);
  }
};







Blockly.Blocks['plot_plot_easy'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    this.appendValueInput('SER')
        .setCheck('Series')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_MAKE);   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT);               
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['plot_plot'] = {//将XX绘制为折线图，删去尚不支持的点型
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];        

    this.appendValueInput('SER')
        .setCheck('Series')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROPYTHON_SOCKET_MAKE);   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT); 
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE)  
        .appendField(new Blockly.FieldDropdown(line_type), 'LINE')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')              
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['plot_show'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.blockpy_PYLAB_SHOW);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['plot_axes'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.mixpy_PL_AXES);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['plot_legend'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendDummyInput()
          .appendField(Blockly.Msg.Lang.blockpy_PYLAB_LEGEND);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['plot_title'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);    
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_TITLE);
    this.appendValueInput('TITLE')
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['plot_label'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']); 
    var xylabel =
        [[Blockly.Msg.Lang.PYLAB_LABEL_X, 'x'],[Blockly.Msg.Lang.PYLAB_LABEL_Y, 'y']];   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_SET_LABEL)
        .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
    this.appendValueInput('LABEL')
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_LABEL)
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // var thisBlock = this;
    // this.setTooltip(function() {
    //   var mode = thisBlock.getFieldValue('DIR');
    //   var TOOLTIPS = {
    //     'x': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_FORWARD,
    //     'y': Blockly.Msg.Lang.MIXLY_TOOLTIP_TURTEL_BACKWARD
    //   };
    //   return TOOLTIPS[mode];
    // });
  }
};

Blockly.Blocks['plot_plot_bar'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var plot_bar =
        [[Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_PLOT, 'plot'],[Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_BAR, 'bar']];  
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_DISPLAY_DRAW)
        .appendField(new Blockly.FieldDropdown(plot_bar), 'DIR');      
    this.appendValueInput('A')        
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'plot': Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP,
        'bar': Blockly.Msg.Lang.mixpy_PYLAB_PLOT_BAR_EASY_TOOLTIP
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['plot_plot_scatter'] = {//散点图，删去尚不支持的点型;修改了颜色的选择方式
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_SCATTER)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);   
    this.appendValueInput('S')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_NUMBER);  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT');
    // this.appendDummyInput("")                
    //     .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
    //     .appendField(new Blockly.FieldDropdown(color_type), 'COLOR');   
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)
        .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);  
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

Blockly.Blocks['plot_plot_xy'] = {//折线图，删去尚不支持的点型
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var line_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
        ,[Blockly.Msg.Lang.MIXLY_MICROBIT_JS_INOUT_PULL_NONE,""]];
    var color_type =
        [[Blockly.Msg.Lang.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.Lang.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.Lang.COLOUR_RGB_RED, 'r'],[Blockly.Msg.Lang.COLOUR_CYAN, 'c'],
        [Blockly.Msg.Lang.COLOUR_MAGENTA, 'm'],[Blockly.Msg.Lang.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.Lang.COLOUR_BLACK, 'k'],[Blockly.Msg.Lang.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        // [Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);    
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.blockpy_PYLAB_PLOT_LINE)  
        .appendField(new Blockly.FieldDropdown(line_type), 'LINE')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')      
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);     
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};

Blockly.Blocks['plot_bar'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var align =
        [[Blockly.Msg.Lang.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'],[Blockly.Msg.Lang.AILGN_EDGE, 'edge']];    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_BAR)
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_X);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_Y);       
    this.appendValueInput('WIDTH')
        .setCheck(Number)    
        .appendField(Blockly.Msg.Lang.MIXLY_WIDTH); 
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_BAR_ALIGN)  
        .appendField(new Blockly.FieldDropdown(align), 'ALIGN')  
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_COLOUR)
        .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');       
    this.appendValueInput('TAG')
        .setCheck(String)    
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);     
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};

Blockly.Blocks['plot_pie'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var shadow =
        [[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_N, 'False'],[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_Y, 'True']]; 
    var autopct =
        [[Blockly.Msg.Lang.mixpy_PL_PIE_SHADOW_N, 'None'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_Z, '%.0f%%'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_O, '%.1f%%'],[Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT_T, '%.2f%%']];        
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE)
        .appendField(Blockly.Msg.Lang.COLOUR_BLEND_RATIO);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG); 
    this.appendValueInput('EXPLODE')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_EXPLODE);  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_AUTOPCT)  
        .appendField(new Blockly.FieldDropdown(autopct), 'autopct')    
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_PIE_SHADOW)  
        .appendField(new Blockly.FieldDropdown(shadow), 'SHADOW')           
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_PLOT_XY_TOOLTIP);
  }
};


Blockly.Blocks['plot_hist'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);      
    this.appendValueInput('A')        
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_HIST)
        .appendField(Blockly.Msg.Lang.MIXLY_SD_DATA);
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['plot_ticks'] = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var xylabel =
        [[Blockly.Msg.Lang.PYLAB_LABEL_X, 'x'],[Blockly.Msg.Lang.PYLAB_LABEL_Y, 'y']]; 
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.MIXLY_SETTING)
        .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');    
    this.appendValueInput('A')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS)
        .appendField(Blockly.Msg.Lang.MIXLY_MICROBIT_JS_I2C_VALUE)
    this.appendValueInput('B')
        .appendField(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TAG);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PYLAB_TICKS_TOOLTIP);
  }
};

Blockly.Blocks.plot_subplot = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    this.appendValueInput('VET')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_VERTICLE);
    this.appendValueInput('HOR')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_HORIZEN);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_SUBPLOT_NUM);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
  }
};

Blockly.Blocks['plot_savefig'] = {
   init: function() {
     this.setColour(Blockly.Msg['DATA_HUE']);
     this.appendDummyInput("")
         .appendField(Blockly.Msg.Lang.mixpy_PL_SAVEFIG);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.Msg.Lang.mixpy_PL_SAVEFIG_TOOLTIP);
   }
 };

 Blockly.Blocks.plot_text = {
  init: function() {
    this.setColour(Blockly.Msg['DATA_HUE']);
    var halign =
        [[Blockly.Msg.Lang.TEXT_TRIM_LEFT, 'right'],[Blockly.Msg.Lang.mixpy_PL_TEXT_CENTER, 'center'],[Blockly.Msg.Lang.TEXT_TRIM_RIGHT, 'left']];    
    var valign =
        [[Blockly.Msg.Lang.mixpy_PL_TEXT_TOP, 'bottom'],[Blockly.Msg.Lang.mixpy_PL_TEXT_CENTER, 'center'],[Blockly.Msg.Lang.mixpy_PL_TEXT_BOTTOM, 'top']];    
    this.appendValueInput('VET')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_SETTING)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_X);
    this.appendValueInput('HOR')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_Y);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_TAG);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_HOR)
        .appendField(new Blockly.FieldDropdown(halign), 'HALIGN'); 
    this.appendDummyInput("")
        .appendField(Blockly.Msg.Lang.mixpy_PL_TEXT_VER)
        .appendField(new Blockly.FieldDropdown(valign), 'VALIGN');   
    this.appendValueInput('FONTNUM')
        .setCheck(Number)
        .appendField(Blockly.Msg.Lang.MIXLY_TURTLE_WRITE_FONT_NUM);         
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.Lang.mixpy_PL_TEXT_TOOLTIP);
  }
};