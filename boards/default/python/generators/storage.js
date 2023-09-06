'use strict';

goog.provide('Blockly.Python.storage');

goog.require('Blockly.Python');

Blockly.Python.forBlock['storage_open_file_with_os'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var fn = Blockly.Python.valueToCode(this, 'fn', Blockly.Python.ORDER_ATOMIC);
    return "os.startfile(" + fn + ")\n";
}

Blockly.Python.forBlock['storage_fileopen'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var fn = Blockly.Python.valueToCode(this, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var code = variable0 + ' = open(' + fn + ', \'' + mode +'\')\n';
  return code;
};

Blockly.Python.forBlock['storage_fileopen_new'] = function(block) {  // For each loop.
  
  var fn = Blockly.Python.valueToCode(this, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var code = 'open(' + fn + ', \'' + mode +'\')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_fileopen_new_encoding'] = function(block) {  // For each loop.
  
  var fn = Blockly.Python.valueToCode(this, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var encode = this.getFieldValue('CODE');
  var code = 'open(' + fn + ', \'' + mode + '\', encoding="'+ encode  +'")';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['storage_file_write'] = function () {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    return file+".write(" + data + ")\n";
}

Blockly.Python.forBlock['storage_get_contents_without_para'] = function () {
    var mode = this.getFieldValue('MODE');
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+'.'+mode+'()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_get_contents'] = function () {
    var mode = this.getFieldValue('MODE');
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'SIZE', Blockly.Python.ORDER_ATOMIC);
    var code = file+'.'+mode+'(' + size + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_get_a_line'] = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'SIZE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".readline(" + size + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_can_write_ornot'] = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".writable()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_get_filename'] = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".name()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_close_file'] = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".close()\n";
    return code;
};

Blockly.Python.forBlock['storage_list_all_files'] = function() {
  Blockly.Python.definitions_['import_os'] = 'import os';
  var code = 'os.listdir()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['storage_delete_file'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os."+mode+"("+file+")\n";
    return code;
};

Blockly.Python.forBlock['storage_get_file_size'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os.path.getsize("+file+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_file_tell'] = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".tell()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['storage_file_seek'] = function () {
    var mode = this.getFieldValue('MODE');
    var mode_num = 0;
    if (mode == 'start'){
      mode_num = 0;}
    else if(mode == 'current'){
      mode_num = 1;
    }
    else{
      mode_num = 2;
    }
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'SIZE', Blockly.Python.ORDER_ATOMIC);
    var code = file+'.seek('+ size + ',' + mode_num + ')\n';
    return code;
};

Blockly.Python.forBlock['storage_change_dir'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os.chdir("+file+")\n";
    return code;
};

Blockly.Python.forBlock['storage_get_current_dir'] = function() {
  Blockly.Python.definitions_['import_os'] = 'import os';
  var code = 'os.getcwd()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.forBlock['storage_make_dir'] = function () {
  Blockly.Python.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var path = Blockly.Python.valueToCode(this, 'PATH', Blockly.Python.ORDER_ATOMIC);
    var code = 'os.'+mode+'(' + path + ')\n';
    return code;
};

Blockly.Python.forBlock['storage_rename'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var file1 = Blockly.Python.valueToCode(this, 'NEWFILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os.rename("+file+","+file1+")\n";
    return code;
};

Blockly.Python.forBlock['storage_is_file'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = "os."+ mode + "(" + file + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['sdcard_use_spi_init'] = function(){
    Blockly.Python.definitions_['import_os'] = 'import os';
    Blockly.Python.definitions_['import_sdcard'] = 'import sdcard';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var sv = Blockly.Python.valueToCode(this, 'SPISUB', Blockly.Python.ORDER_ATOMIC);
    var pv = Blockly.Python.valueToCode(this, 'PINSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + ' = sdcard.SDCard('+ sv + ','+ pv +')\n';     
    return code;
};

Blockly.Python.forBlock['sdcard_mount'] = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    Blockly.Python.definitions_['import_sdcard'] = 'import sdcard';
    var sd = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var dir = Blockly.Python.valueToCode(this, 'DIR', Blockly.Python.ORDER_ATOMIC);
    return "os.mount(" + sd+','+dir + ")\n";
}
