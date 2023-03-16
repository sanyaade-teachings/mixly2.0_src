'use strict';

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');

Blockly.Python.display_matrix_use_i2c_init = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key=='32x12 Matrix') {
      if(version=='mixgo_ce'){
      Blockly.Python.definitions_['import_matrix32x12'] = 'import matrix32x12';
      code = v + ' = matrix32x12.Matrix(' + iv+ ',font_address=0x3A0000)\n';
      }
      else{
      Blockly.Python.definitions_['import_matrix32x12'] = 'import matrix32x12';
      code = v + ' = matrix32x12.Matrix(' + iv+ ',font_address=0x700000)\n';  
      }
    }else if (key=='16x8 Matrix') {
      Blockly.Python.definitions_['import_matrix16x8'] = 'import matrix16x8';
      code = v + ' = matrix16x8.Matrix(' + iv+ ')\n';
    }
    return code;
};

Blockly.Python.display_matrix_extern_show_image = function() {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".shows(" + data + ")\n";
    return code;
}

Blockly.Python.display_matrix_extern_show_image_or_string_delay = function() {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v+".shows(" + data + ',space = ' + space + ',center = ' + op  + ")\n";
    return code;
}

Blockly.Python.display_matrix_extern_show_frame_string = function() {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".frame(" + data + ")\n";
    return code;
}

Blockly.Python.display_matrix_extern_show_frame_string_delay = function() {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".frame(" + data + ',delay = ' + time + ")\n";
    return code;
}

Blockly.Python.display_matrix_extern_scroll_string = function() {
     var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var code = v+".scroll("+ data +")\n";
     return code;
}


Blockly.Python.display_matrix_extern_scroll_string_delay = function() {  
     var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
     var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
     var code = v+".scroll("+ data + ',speed =' + time  + ',space = '+ space + ")\n";
     return code;
}

Blockly.Python['display_matrix_extern_clear'] = function(block) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v+'.fill(0)\n'+v+'.show()\n';
  return code;
};

Blockly.Python['display_matrix_extern_shift'] = function(a) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.' + op + '(' + value + ')\n';
  return code;
};

Blockly.Python['display_matrix_extern_get_pixel'] = function(block) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_matrix_extern_bright_point= function() {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =v+'.pixel(int(' + x + '), int(' + y + '), '+ dropdown_stat + ")\n"+v+'.show()\n';
    return code;
}

Blockly.Python['display_matrix_extern_get_screen_pixel'] = function() {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code =v+ '.get_brightness()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_matrix_extern_bright_screen= function() {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+'.set_brightness(' + x + ')\n';
    return code;
};

Blockly.Python['display_matrix_extern_image_builtins'] = function(block) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_image = block.getFieldValue('image');
  var code = v+'.' + dropdown_image;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['matrix_extern_image_arithmetic'] = function(a) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_ATOMIC);
  var imgb = Blockly.Python.valueToCode(a, 'B', Blockly.Python.ORDER_ATOMIC); 
  var code = v+'.map_' +  op + '(' + imga + ',' + imgb +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['matrix_extern_image_invert'] = function(a) {
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_ATOMIC);
  var code = v+ '.map_invert(' + imga +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};




Blockly.Python.display_onoff = function () {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


//oled
Blockly.Python.display_use_i2c_init = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var i2csub =Blockly.Python.valueToCode(this, 'I2CSUB',Blockly.Python.ORDER_ATOMIC);
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var row =Blockly.Python.valueToCode(this, 'row',Blockly.Python.ORDER_ATOMIC);
  var column = Blockly.Python.valueToCode(this, 'column', Blockly.Python.ORDER_ATOMIC);
  var code = sub+" = ssd1306.SSD1306_I2C("+row+","+column+","+i2csub+")\n";
  return code;  
};

Blockly.Python.display_draw_4strings = function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var value_text_line1 = Blockly.Python.valueToCode(this, 'Text_line1', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line2 = Blockly.Python.valueToCode(this, 'Text_line2', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line3 = Blockly.Python.valueToCode(this, 'Text_line3', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line4 = Blockly.Python.valueToCode(this, 'Text_line4', Blockly.Python.ORDER_ASSIGNMENT) || '\'\''; 
  var code = varName + '.show_str(' + value_text_line1 +',' +value_text_line2 +','+ value_text_line3 +','+ value_text_line4 + ')\n'
  return code;
};

Blockly.Python.display_line_arbitrarily=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var location_x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var location_y1= Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var location_x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var location_y2= Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  var code = varName + '.show_line('+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', 1)\n';
  return code;
};

Blockly.Python.display_rect=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(this, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(this, 'height', Blockly.Python.ORDER_ATOMIC);
  var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
  var size  = this.getFieldValue('OP');
  switch (checkbox_fill) {
    case "True":
       var code = varName + '.show_fill_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
  
       return code;
       break;
    case "False":
       var code = varName +'.show_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
 
       return code;
       break;
     }
};


Blockly.Python.display_line=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(this, 'length', Blockly.Python.ORDER_ATOMIC);
  var value_direction = this.getFieldValue("direction");
  var code = varName + '.show_'+value_direction+'('+location_x+', '+location_y+', '+value_length+', 1)\n';
  return code;
};

Blockly.Python.display_onoff = function () {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['image_shift'] = function(a) {
  Blockly.Python.definitions_['import_matrix'] = 'import matrix';
  var op = a.getFieldValue("OP");
  var image = Blockly.Python.valueToCode(a, 'img', Blockly.Python.ORDER_ATOMIC);
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code = image + '.shift_' + op + '(' + value + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_fill=function(){
  var varName =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var key = this.getFieldValue('key');
  var code = varName + '.show_fill('+key+')\n';
  return code;
};

Blockly.Python.switch = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_animate = function() {
  // Boolean values true and false.
  var name = this.getFieldValue("ANIMATION");
  var code = 'matrix.Image.' + name; 
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_circle=function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_r = Blockly.Python.valueToCode(this, 'r', Blockly.Python.ORDER_ATOMIC);
  var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
  var size  = this.getFieldValue('OP');
  switch (checkbox_fill) {
    case "True":
       var code = varName + '.show_fill_circle('+location_x+', '+location_y+', '+value_r+', '+ size+')\n';
  
       return code;
       break;
    case "False":
       var code = varName +'.show_circle('+location_x+', '+location_y+', '+value_r+', '+ size+')\n';
 
       return code;
       break;
     }
};

Blockly.Python.display_triangle=function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var location_x0 = Blockly.Python.valueToCode(this, 'x0', Blockly.Python.ORDER_ATOMIC);
  var location_y0 = Blockly.Python.valueToCode(this, 'y0', Blockly.Python.ORDER_ATOMIC);
  var location_x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var location_y1 = Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var location_x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var location_y2 = Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
  var size  = this.getFieldValue('OP');
  switch (checkbox_fill) {
    case "True":
       var code = varName + '.show_fill_triangle('+location_x0+', '+location_y0+', '+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', '+ size+')\n';
  
       return code;
       break;
    case "False":
       var code = varName +'.show_triangle('+location_x0+', '+location_y0+', '+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', '+ size+')\n';
 
       return code;
       break;
     }
};

Blockly.Python.display_oled_showBitmap=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var location_x = Blockly.Python.valueToCode(this, 'START_X', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'START_Y', Blockly.Python.ORDER_ATOMIC);
  var bmp = Blockly.Python.valueToCode(this, 'bitmap_name', Blockly.Python.ORDER_ATOMIC);
  var w = Blockly.Python.valueToCode(this, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
  var h = Blockly.Python.valueToCode(this, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = varName + '.show_bitmap('+location_x+', '+location_y+', '+bmp+','+w+','+h+')\n';
  return code;
};

Blockly.Python.display_oled_drawPixel=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_ssd1306'] = 'import ssd1306';
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  var location_x = Blockly.Python.valueToCode(this, 'POS_X', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'POS_Y', Blockly.Python.ORDER_ATOMIC);
  var code = varName + '.show_pixel('+location_x+', '+location_y+')\n';
  return code;
};


//tm1650
Blockly.Python.display_tm_use_i2c_init = function () {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key=='TM1650') {
      Blockly.Python.definitions_['import_tm1650'] = 'import tm1650';
      code = v + ' = tm1650.' + key + "("+ iv+ ')\n';
    }else if (key=='TM1637') {
      Blockly.Python.definitions_['import_tm1637'] = 'import tm1637';
      code = v + ' = tm1637.' + key + "("+ iv+ ')\n';
    }
    return code;
};

Blockly.Python.display_tm1650_power = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var stat = this.getFieldValue("STAT");
    var code = v + '.' + stat +"()\n";
    return code;
};

Blockly.Python.display_tm1650_show_num = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = v + ".shownum(" + val +")\n";
    return code;
};

Blockly.Python.display_tm1650_show_dot = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var n = Blockly.Python.valueToCode(this, 'NO', Blockly.Python.ORDER_ATOMIC);
    var stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.showDP(' + n +", "+stat+")\n";
    return code;
};

Blockly.Python.display_tm1650_set_brightness = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = v + ".intensity(" + val +")\n";
    return code;
};

Blockly.Python.tft_use_spi_init=function(){
    Blockly.Python.definitions_['import_st7789'] = 'import st7789';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[1]
    if(version=='esp32'){var addr = '0x700000'}
      else{var addr = '0x3A0000'}
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sv = Blockly.Python.valueToCode(this, 'SPISUB', Blockly.Python.ORDER_ATOMIC);
    var pv = Blockly.Python.valueToCode(this, 'PINCS', Blockly.Python.ORDER_ATOMIC);
    var dv = Blockly.Python.valueToCode(this, 'PINDC', Blockly.Python.ORDER_ATOMIC);
    var w = Blockly.Python.valueToCode(this, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
    var h = Blockly.Python.valueToCode(this, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);
    var op = this.getFieldValue('rotate');
    var code = v + ' = st7789.ST7789('+ sv+ ','+ w + ',' + h + ',dc_pin='+ dv + ',cs_pin=' + pv +',rotation='+op + ',font_address='+addr+')\n';    
    return code;
};

Blockly.Python.tft_show_image_xy = function() {    
    Blockly.Python.definitions_['import_st7789'] = 'import st7789';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
    var code = v+ ".image(" + data+  ',x = ' + x +',y = ' + y +',size = ' + size + ',color=' + color + ")\n";
    return code;
}

Blockly.Python.display_color_seclet = function() {
  var colour = this.getFieldValue('COLOR');
  var code = '0x' + colour.slice(1) +''
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tft_show_image_or_string_delay = function() {
    Blockly.Python.definitions_['import_st7789'] = 'import st7789';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
    var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
    var op = this.getFieldValue('center');
    var code = v+".shows(" + data + ',x = ' + x +',y = ' + y +',size = ' + size +',space = ' + space + ',center = ' + op  +',color=' + color +  ")\n";
    return code;
}


Blockly.Python.tft_show_frame_string_delay = function() {
    Blockly.Python.definitions_['import_st7789'] = 'import st7789';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
    var code = v+".frame(" + data +',size = ' + size + ',delay = ' + time +',color=' + color +  ")\n";
    return code;
}


Blockly.Python.tft_scroll_string_delay = function() {  
     Blockly.Python.definitions_['import_st7789'] = 'import st7789';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
     var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
     var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
     var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
     var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
     var code = v+".scroll("+ data +',y = ' + y +',size = ' + size+ ',speed =' + time  + ',space = '+ space + ',color=' + color + ")\n";
     return code;
}

Blockly.Python.tft_fill=function(){
  Blockly.Python.definitions_['import_st7789'] = 'import st7789';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = v + '.fill(st7789.'+key+')\n';
  return code;
};

Blockly.Python.tft_line_arbitrarily=function(){
  Blockly.Python.definitions_['import_st7789'] = 'import st7789';
  var varName =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var location_x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var location_y1= Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var location_x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var location_y2= Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code = varName + '.line('+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', color='+color+')\n';
  return code;
};

Blockly.Python.display_lcd_use_i2c_init = function () {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var code;    
    Blockly.Python.definitions_['import_i2clcd'] = 'import i2clcd';
    code = v + ' = i2clcd.LCD' + "("+ iv+',lcd_width=' + key + ',i2c_addr=' + addr + ')\n';
    
    return code;
};

Blockly.Python.lcd_show_image_or_string_delay = function() {
    Blockly.Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v+".shows(" + data + ',column = ' + x +',line = ' + y + ',center = ' + op +  ")\n";
    return code;
}

Blockly.Python.lcd_print_string = function() {
    Blockly.Python.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var delay = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v+".print(" + data + ',column = ' + x +',line = ' + y + ',delay='+delay+ ")\n";
    return code;
}

Blockly.Python.lcd_backlight=function(){
  Blockly.Python.definitions_['import_i2clcd'] = 'import i2clcd';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var key = this.getFieldValue('key');
  var code = v + '.backlight('+key+')\n';
  return code;
};

Blockly.Python['lcd_clear'] = function(block) {
  Blockly.Python.definitions_['import_i2clcd'] = 'import i2clcd';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v+'.clear()\n';
  return code;
};

Blockly.Python.display_oled_use_i2c_init = function () {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var font = '';
    if (['mpython','mixgope'].indexOf(version)>=0){
      font = '0x700000'
    }
    else {
      font = '0x3A0000'
    }
    var code;    
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    code = v + ' = oled128x64.OLED' + "("+ iv + ',address=' + addr + ',font_address='  + font + ')\n';
    
    return code;
};

Blockly.Python.extern_oled_show_image = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data + ")\n";
    return code;
}

Blockly.Python.extern_oled_show_image_xy = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data+  ',x = ' + x +',y = ' + y +',size = ' + size + ")\n";
    return code;
}

Blockly.Python.extern_oled_show_string = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v + ".shows(" + data + ")\n";
    return code;
}

Blockly.Python.extern_oled_show_image_or_string_delay = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',x = ' + x +',y = ' + y +',size = ' + size +',space = ' + space + ',center = ' + op  + ")\n";
    return code;
}

Blockly.Python.extern_oled_show_frame_string = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ")\n";
    return code;
}

Blockly.Python.extern_oled_show_frame_string_delay = function() {
    Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data +',size = ' + size + ',delay = ' + time + ")\n";
    return code;
}

Blockly.Python.extern_oled_scroll_string = function() {
     Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var code = v + ".scroll("+ data +")\n";
     return code;
}


Blockly.Python.extern_oled_scroll_string_delay = function() {  
     Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
     var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ASSIGNMENT);
     var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
     var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
     var code = v + ".scroll("+ data +',y = ' + y +',size = ' + size+ ',speed =' + time  + ',space = '+ space + ")\n";
     return code;
}

Blockly.Python['extern_oled_clear'] = function(block) {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.fill(0)\n' +v+'.show()\n';
  return code;
};

Blockly.Python['extern_oled_shift'] = function(a) {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code =  v + '.' + op + '(' + value + ')\n';
  return code;
};

Blockly.Python['extern_oled_get_pixel'] = function(block) {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = v + '.pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.extern_oled_bright_point= function() {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =v + '.pixel(int(' + x + '), int(' + y + '), '+ dropdown_stat + ")\n"+v+'.show()\n';
    return code;
}

Blockly.Python['extern_oled_shape_rect'] = function (block) {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_ATOMIC);
  var h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_ATOMIC);
  var state = block.getFieldValue('state');
  var shape = block.getFieldValue('shape');
  var code = v + '.' + shape + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + state + ')\n'+v+'.show()\n';
  return code;
};

Blockly.Python['extern_oled_hvline'] = function (block) { //水平线
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var var_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
  var state = block.getFieldValue('state');
  var hv = block.getFieldValue('dir_h_v');
  var code = v+'.' + (('0' == hv) ? 'v': 'h') + 'line(' + x + ', ' + y + ', ' + var_length + ', ' + state + ')\n'+v+'.show()\n';
  return code;
};

Blockly.Python['extern_oled_line'] = function (block) {
  Blockly.Python.definitions_['import_oled128x64'] = 'import oled128x64';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
  var y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
  var x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_ATOMIC);
  var y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_ATOMIC);
  var state = block.getFieldValue('state');
  var code = v+'.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + state + ')\n'+v+'.show()\n';
  return code;
};