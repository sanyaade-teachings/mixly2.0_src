'use strict';

goog.provide('Blockly.Blocks.html');

goog.require('Blockly.Blocks');


Blockly.Msg['HTML_HUE'] = '#1ec1e4';

Blockly.Blocks.html_document = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_DOCUMENT);
    this.appendStatementInput('HEAD')
        .appendField(Blockly.Msg.Lang.HTML_HEAD);
    this.appendStatementInput('BODY')
        .appendField(Blockly.Msg.Lang.HTML_BODY);
    this.setOutput(true);
  }
};

Blockly.Blocks.html_title = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_LEVEL)
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"]]), 'LEVEL');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_head_body = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.HTML_HEAD,"head"],
                                                [Blockly.Msg.Lang.HTML_BODY,"body"]]), 'LEVEL');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_content = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.HTML_P,"p"],
                                                [Blockly.Msg.Lang.HTML_SPAN,"span"],
                                                [Blockly.Msg.Lang.HTML_FORM,"form"],
                                                [Blockly.Msg.Lang.HTML_TABLE,"table"],
                                                [Blockly.Msg.Lang.HTML_LINE,"tr"],
                                                [Blockly.Msg.Lang.HTML_CELL,"td"],
                                                [Blockly.Msg.Lang.HTML_OL,"ol"],
                                                [Blockly.Msg.Lang.HTML_UL,"ul"],
                                                [Blockly.Msg.Lang.HTML_LI,"li"]]), 'LEVEL')
    // this.appendValueInput('style')
    //     .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)
    //     .setAlign(Blockly.ALIGN_RIGHT);            
    this.appendStatementInput('DO')
        .appendField('');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_content_more = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField('<')
        .appendField(new Blockly.FieldTextInput('tag'),"LEVEL")
        .appendField('>')
    this.appendValueInput('style')
        .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)
        .setAlign(Blockly.ALIGN_RIGHT);            
    this.appendStatementInput('DO')
        .appendField('');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_STYLE)
    this.appendStatementInput('STYLE');
    this.setOutput(true);
  }
};

Blockly.Blocks.html_form = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_FORM_CONTENT)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Lang.HTML_TEXT,"text"],
                                                [Blockly.Msg.Lang.HTML_EMAIL,"email"],
                                                [Blockly.Msg.Lang.HTML_NUMBER,"number"],
                                                [Blockly.Msg.Lang.HTML_PASSWORD,"password"],
                                                [Blockly.Msg.Lang.HTML_CHECKBOX,"checkbox"],
                                                [Blockly.Msg.Lang.HTML_RADIOBUTTON,"radiobutton"],
                                                [Blockly.Msg.Lang.HTML_BUTTON,"button"],
                                                [Blockly.Msg.Lang.HTML_COLOUR,"colour"],
                                                [Blockly.Msg.Lang.HTML_DATE,"date"],
                                                [Blockly.Msg.Lang.HTML_LOCALTIME,"local time"],
                                                [Blockly.Msg.Lang.HTML_FILE,"file"],
                                                [Blockly.Msg.Lang.HTML_HIDDEN,"hidden"],
                                                [Blockly.Msg.Lang.HTML_IMAGE,"image"],
                                                [Blockly.Msg.Lang.HTML_MONTH,"month"],
                                                [Blockly.Msg.Lang.HTML_RANGE,"range"],
                                                [Blockly.Msg.Lang.HTML_RESET,"reset"],
                                                [Blockly.Msg.Lang.HTML_SEARCH,"search"],
                                                [Blockly.Msg.Lang.HTML_SUBMIT,"submit"],
                                                [Blockly.Msg.Lang.HTML_TELEPHONENUMBER,"telephone number"],
                                                [Blockly.Msg.Lang.HTML_TIME,"time"],
                                                [Blockly.Msg.Lang.HTML_URL,"url"],
                                                [Blockly.Msg.Lang.HTML_WEEK,"week"]]), 'LEVEL')
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_NAME)
        .appendField(new Blockly.FieldTextInput('car'),"NAME")
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_VALUE)
        .appendField(new Blockly.FieldTextInput('go'),"VALUE")
    this.appendValueInput('style')
        .appendField(Blockly.Msg.Lang.MIXLY_AIP_ATTR)
        .setAlign(Blockly.ALIGN_RIGHT);            
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style_content = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('property'),"KEY")
        .appendField(':')
        .appendField(new Blockly.FieldTextInput('value'),"VALUE")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style_color = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('property'),"KEY")
        .appendField(':')
        .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_text = {
  init: function() {
    this.setColour(Blockly.Msg['HTML_HUE']);
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HTML_TEXT)
        .appendField(new Blockly.FieldTextInput('text'),"TEXT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};