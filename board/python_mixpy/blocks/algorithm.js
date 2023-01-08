'use strict';

goog.provide('Blockly.Blocks.algorithm');

goog.require('Blockly.Blocks');

Blockly.Blocks.algorithm.HUE = '#526FC3';




Blockly.Blocks['algorithm_prepare'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PREPARE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_prepare2'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PREPARE2);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_prepare3'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PREPARE3);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_add_school'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ADD_SCHOOL);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_get_current_location'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_GET_CURRENT_LOCATION);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_find_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_FIND_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_move_recent'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_MOVE_RECENT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_not_home']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NOT_HOME);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_current_school']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_CURRENT_SCHOOL);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_new_path']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NEW_PATH);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_set_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_SET_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_no_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NO_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_void_path']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_VOID_PATH);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_add_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ADD_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_del_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_DEL_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_return_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_RETURN_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_no_left']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NO_LEFT);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_print_path'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_PATH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_first_book'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_FIRST_BOOK);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_no_ring']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NO_RING);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_next_book'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NEXT_BOOK);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_print_book'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_BOOK);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_number_zero'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NUMBER_ZERO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_number_add'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NUMBER_ADD);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_print_number'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_NUMBER);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_all_books'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ALL_BOOKS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_all_books_sequence'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_ALL_BOOKS2);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_two_left']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_TWO_LEFT);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_divide_books'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_DIVIDE_BOOKS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_get_half_books'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_GET_HALF_BOOKS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_check_half_books'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_CHECK_HALF_BOOKS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_no_ring2']={
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_NO_RING);
    this.setOutput(true);
  }
}

Blockly.Blocks['algorithm_delete_books'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_DELETE_BOOKS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_delete_books2'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_DELETE_BOOKS2);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_print_book2'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_BOOK);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_get_book_num'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField('n'+Blockly.MIXLY_VALUE2)
    .appendField(new Blockly.FieldTextInput('50'), 'NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_use_sequence'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_USE_SEQUENCE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_print_sequence'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_SEQUENCE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_use_divide'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_USE_DIVIDE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};

Blockly.Blocks['algorithm_print_divide'] = {
  init: function() {
    this.setColour(Blockly.Blocks.algorithm.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MIXPY_ALGORITHM_PRINT_DIVIDE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
  }
};