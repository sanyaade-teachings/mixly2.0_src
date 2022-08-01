'use strict';

goog.provide('Blockly.Blocks.cv');

goog.require('Blockly.Blocks');

Blockly.Blocks.cv.HUE = "f0a559";

 Blockly.Blocks['cv_read_image'] = {
   init: function() {
     this.setColour(Blockly.Blocks.cv.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_CV_IMREAD);
     this.setInputsInline(true);
     this.setPreviousStatement(false); 
     this.setNextStatement(false);
     this.setOutput(true);
   }
 };

Blockly.Blocks['cv_show_image'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.OLED_BITMAP);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_AipNlp_Topic_Title);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['cv_write_image'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.MIXLY_CV_IMWRITE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['cv_waitkey'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_DELAY);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MILLIS+Blockly.MIXLY_CV_OR_PRESS)    
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_CV_WAITKEY_TOOLTIP)
    }
}

Blockly.Blocks['cv_destroy_all'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_CV_DESTROY_ALL)    
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['cv_line_rect'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.MIXLY_MICROBIT_IMAGE);
        var line_rect =
        [[Blockly.MIXLY_CV_RECT, 'rectangle'],[Blockly.MIXLY_CV_LINE, 'line']];  

        this.appendValueInput('x1')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_DISPLAY_DRAW)
            .appendField(new Blockly.FieldDropdown(line_rect), 'DIR')
            .appendField(Blockly.MIXLY_CV_DRAWLINE_BEGIN+'(x1')
        this.appendValueInput('y1')
            .setCheck(Number)
            .appendField(',y1');
        this.appendValueInput('x2')
            .setCheck(Number)
            .appendField(') '+ Blockly.MIXLY_CV_DRAWLINE_END +'(x2');
        this.appendValueInput('y2')
            .setCheck(Number)
            .appendField(',y2');   
        this.appendDummyInput()
            .appendField(') ' + Blockly.MIXLY_CV_DRAWLINE_COLOR)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');             
        this.appendValueInput('thick')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_CV_DRAWLINE_THICKNESS);  
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_CV_DRAWLINE_RECT_TOOLTIP)
    }
}

Blockly.Blocks['cv_text'] = {
    init:function(){
        this.setColour(Blockly.Blocks.cv.HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.MIXLY_MICROBIT_IMAGE);
        var font =
        [['SIMPLEX', 'SIMPLEX'],['PLAIN', 'PLAIN'],['DUPLEX', 'DUPLEX'],['COMPLEX', 'COMPLEX'],['COMPLEX_SMALL', 'COMPLEX_SMALL'],['TRIPLEX', 'TRIPLEX'],['SCRIPT_SIMPLEX', 'SCRIPT_SIMPLEX'],['SCRIPT_COMPLEX', 'SCRIPT_COMPLEX'],];  
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_CV_DRAWTEXT);
        this.appendValueInput('x1')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_CV_DRAWLINE_BEGIN+'(x1')
        this.appendValueInput('y1')
            .setCheck(Number)
            .appendField(',y1');
        this.appendDummyInput()
            .appendField(') '+ Blockly.MIXLY_TURTLE_WRITE_FONT_NAME)
            .appendField(new Blockly.FieldDropdown(font), 'font');
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);   
        this.appendDummyInput()
            .appendField(') ' + Blockly.MIXLY_CV_DRAWLINE_COLOR)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');             
        this.appendValueInput('thick')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_CV_DRAWLINE_THICKNESS);  
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_CV_DRAWLINE_RECT_TOOLTIP)
    }
}

Blockly.Blocks['cv_face_classifier'] = {
   init: function() {
     this.setColour(Blockly.Blocks.cv.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_CV_FACE_CLASSIFIER);
     this.setInputsInline(true);
     this.setPreviousStatement(false); 
     this.setNextStatement(false);
     this.setOutput(true);
   }
 };

Blockly.Blocks['cv_face_detect'] = {
   init: function() {
     this.setColour(Blockly.Blocks.cv.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_IMAGE);
     this.appendValueInput("FACE")
         .appendField(Blockly.MIXLY_CV_FACE_DETECT);    
     this.appendValueInput('SCALE')
         .setCheck(Number)
         .appendField(Blockly.MIXLY_CV_FACE_DETECT_SCALE)
     this.appendValueInput('NEIGHBOR')
         .setCheck(Number)
         .appendField(Blockly.MIXLY_CV_FACE_DETECT_NEIGHBOR)              
     this.setInputsInline(true);
     this.setPreviousStatement(false); 
     this.setNextStatement(false);
     this.setOutput(true);
   }
 };

 Blockly.Blocks['cv_face_detect_all'] = {
   init: function() {
     this.setColour(Blockly.Blocks.cv.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_IMAGE);
     this.appendValueInput("FACE")
         .appendField(Blockly.MIXLY_CV_FACE_DETECT);    
     this.appendValueInput('SCALE')
         .setCheck(Number)
         .appendField(Blockly.MIXLY_CV_FACE_DETECT_SCALE)
     this.appendValueInput('NEIGHBOR')
         .setCheck(Number)
         .appendField(Blockly.MIXLY_CV_FACE_DETECT_NEIGHBOR)
     this.appendValueInput('x1')
         .setCheck(Number)
         .appendField(Blockly.MIXLY_CV_FACE_DETECT_RANGE)
         .appendField(Blockly.blockpy_TUPLE_MIN)
     this.appendValueInput('y1')
         .setCheck(Number)
         .appendField('×')
     this.appendValueInput('x2')
         .setCheck(Number)
         .appendField(Blockly.blockpy_TUPLE_MAX)
     this.appendValueInput('y2')
         .setCheck(Number)
         .appendField('×')                         
     this.setInputsInline(true);
     this.setPreviousStatement(false); 
     this.setNextStatement(false);
     this.setOutput(true);
   }
 };