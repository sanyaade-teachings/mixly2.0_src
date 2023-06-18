'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

goog.require('Mixly.JSFuncs');
var pin_cs;
Blockly.Arduino.forBlock['store_sd_init'] = function () {
    var board_type = Mixly.JSFuncs.getPlatform();
    pin_cs = Blockly.Arduino.valueToCode(this, 'PIN_CS', Blockly.Arduino.ORDER_ATOMIC);
    if (board_type.match(RegExp(/ESP32/))) {
        Blockly.Arduino.definitions_['include_mySD'] = '#include <mySD.h>';
    }
    else {
        Blockly.Arduino.definitions_['include_SD'] = '#include <SD.h>';
    }
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_sd_write_begin'] = 'SD.begin(' + pin_cs + ');';
    var code = '';
    return code;
};

Blockly.Arduino.forBlock['store_sd_write'] = function () {
    var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    //file=file.replace(/String/,"");
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    //data=data.replace(/String/,"");
    var newline = Blockly.Arduino.valueToCode(this, 'NEWLINE', Blockly.Arduino.ORDER_ATOMIC) || 'false';
    Blockly.Arduino.definitions_['var_declare_File_datafile'] = 'File datafile;';
    var code = 'datafile = SD.open(' + file + ', FILE_WRITE);\n';
    code += 'if(datafile){\n';
    code += '	datafile.print(' + data + ');\n';
    if (newline == 'true') {
        code += '	datafile.println("");\n';
    }
    code += '	datafile.close();\n';
    code += '}\n';
    return code;
}

Blockly.Arduino.forBlock['sd_card_type'] = function () {
    Blockly.Arduino.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    Blockly.Arduino.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    var code = 'card.type()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['sd_card_root_files'] = function () {
    Blockly.Arduino.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    Blockly.Arduino.definitions_['var_declare_SdFile'] = 'SdFile root;';
    Blockly.Arduino.definitions_['var_declare_SdVolume'] = 'SdVolume volume;';
    Blockly.Arduino.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    Blockly.Arduino.setups_['setup_volume_init'] = 'volume.init(card);';
    var code = 'root.openRoot(volume);\nroot.ls(LS_R | LS_DATE | LS_SIZE);';
    return code;
};

Blockly.Arduino.forBlock['sd_volume'] = function () {
    Blockly.Arduino.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    Blockly.Arduino.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    Blockly.Arduino.definitions_['var_declare_SdVolume'] = 'SdVolume volume;';
    Blockly.Arduino.setups_['setup_volume_init'] = 'volume.init(card);';
    var volume_TYPE = this.getFieldValue('volume_TYPE');
    var code = volume_TYPE;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['sd_exist'] = function () {
    var text_FileName = Blockly.Arduino.valueToCode(this, 'FileName', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SD.exists(' + text_FileName + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['sd_read'] = function () {
    var text_FileName = Blockly.Arduino.valueToCode(this, 'FileName', Blockly.Arduino.ORDER_ATOMIC);
    const serial_select = 'Serial';
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || profile.default.serial;
    Blockly.Arduino.definitions_['var_declare_File_datafile'] = 'File datafile;';
    Blockly.Arduino.definitions_['var_declare_File_datafile_SD_card_reading'] = 'String SD_card_reading(String path) {\n'
        + 'datafile = SD.open(path.c_str());\n'
        + ' String sd_data = "";\n'
        + ' while (datafile.available()) {\n'
        + '  sd_data = String(sd_data) + String(char(datafile.read()));\n'
        + ' }\n'
        + '  return sd_data;\n'
        + '}';
    var code = 'SD_card_reading(' + text_FileName + ')'
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['sd_DelFile'] = function () {
    var text_FileName = Blockly.Arduino.valueToCode(this, 'FileName', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SD.remove(' + text_FileName + ');';
    return code;
};

Blockly.Arduino.forBlock['store_eeprom_write_long'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    var funcName = 'eepromWriteLong';
    var code2 = 'void ' + funcName + '(int address, unsigned long value){\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.ULtime=value;\n'
        + '  EEPROM.write(address, time.b[0]);\n'
        + '  EEPROM.write(address+1, time.b[1]);\n'
        + '  if(time.b[2] != EEPROM.read(address+2))\n'
        + '    EEPROM.write(address+2, time.b[2]);\n'
        + '  if(time.b[3] != EEPROM.read(address+3))\n'
        + '    EEPROM.write(address+3, time.b[3]);\n'
        + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return 'eepromWriteLong(' + address + ', ' + data + ');\n';
}

Blockly.Arduino.forBlock['store_eeprom_read_long'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    var code = 'eepromReadLong(' + address + ')';
    var funcName = 'eepromReadLong';
    var code2 = 'unsigned long ' + funcName + '(int address) {\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.b[0] = EEPROM.read(address);\n'
        + '  time.b[1] = EEPROM.read(address+1);\n'
        + '  time.b[2] = EEPROM.read(address+2);\n'
        + '  time.b[3] = EEPROM.read(address+3);\n'
        + '  return time.ULtime;\n'
        + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.forBlock['store_eeprom_write_byte'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.write(' + address + ', ' + data + ');\n';
}

Blockly.Arduino.forBlock['store_eeprom_read_byte'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    var code = 'EEPROM.read(' + address + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.forBlock['store_eeprom_put'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\n';
}

Blockly.Arduino.forBlock['store_eeprom_get'] = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}

//ESP32简化SPIFFS
Blockly.Arduino.forBlock['simple_spiffs_store_spiffs_write'] = function () {
    var MODE= this.getFieldValue('MODE');
    var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    //file=file.replace(/String/,"");
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
    //data=data.replace(/String/,"");
    var newline = Blockly.Arduino.valueToCode(this, 'NEWLINE', Blockly.Arduino.ORDER_ATOMIC) || 'false';
    Blockly.Arduino.definitions_['include_ESP_FS'] = '#include "FS.h"';
    Blockly.Arduino.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';

  if(MODE==1)
  {
    Blockly.Arduino.definitions_['var_simple_spiffs_store_spiffs_write'+MODE] = 'void writeFile(fs::FS &fs, const char * path, const char * message) {\n'
        + '  File file = fs.open(path, FILE_WRITE);\n'
        + '  if (!file) {\n'
        + '    Serial.println("- failed to open file for writing");\n'
        + '    return;\n'
        + '  }\n'
        + '  if (file.print(message)) {\n'
        + '    Serial.println("- file written");\n'
        + '  } else {\n'
        + '    Serial.println("- write failed");\n'
        + '  }\n'
        + '  file.close();\n'
        + '}';
    if (newline == 'true') {
        var code = 'writeFile(SPIFFS, ' + file + ', String(String(' + data + ') + String("\\r\\n")).c_str());\n';
    }else {
        var code = 'writeFile(SPIFFS, ' + file + ', String(' + data + ').c_str());\n';
    }
  }
    if(MODE==2)
  {
    Blockly.Arduino.definitions_['var_simple_spiffs_store_spiffs_write'+MODE] = 'void appendFile(fs::FS &fs, const char * path, const char * message) {\n'
        + '  File file = fs.open(path, FILE_APPEND);\n'
        + '  if (!file) {\n'
        + '    Serial.println("- failed to open file for appending");\n'
        + '    return;\n'
        + '  }\n'
        + '  if (file.print(message)) {\n'
        + '    Serial.println("- message appended");\n'
        + '  } else {\n'
        + '    Serial.println("- append failed");\n'
        + '  }\n'
        + '  file.close();\n'
        + '}';
    if (newline == 'true') {
        var code = 'appendFile(SPIFFS, ' + file + ', String(String(' + data + ') + String("\\r\\n")).c_str());\n';
    }else {
        var code = 'appendFile(SPIFFS, ' + file + ', String(' + data + ').c_str());\n';
    }
  }    
    return code;
}

Blockly.Arduino.forBlock['simple_spiffs_read'] = function () {
    var text_FileName = Blockly.Arduino.valueToCode(this, 'FileName', Blockly.Arduino.ORDER_ATOMIC);
    const serial_select = 'Serial';
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || profile.default.serial;
    Blockly.Arduino.definitions_['include_ESP_FS'] = '#include "FS.h"';
    Blockly.Arduino.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';
    Blockly.Arduino.definitions_['var_simple_spiffs_read'] = 'String readFile(fs::FS &fs, const char * path) {\n'
        + '  File file = fs.open(path);\n'
        + '  if (!file || file.isDirectory()) {\n'
        + '    Serial.println("- failed to open file for reading");\n'
        + '    file.close();\n'
        + '    return "SPIFFS_error";\n'
        + '  } else {\n'
        + '    Serial.println("- read from file:");\n'
        + '    String SPIFFS_data = "";\n'
        + '    while (file.available()) {\n'
        + '     SPIFFS_data = String(SPIFFS_data) + String(char(file.read()));\n'
        + '   }\n'
        + '   file.close();\n'
        + '   return SPIFFS_data;\n'
        + ' }\n'
        + '}';
    Blockly.Arduino.setups_['setup_ESP_SPIFFS'] = '  if (!SPIFFS.begin(true)) {\n'
        + '    Serial.println("SPIFFS Mount Failed");\n'
        + '   return;\n'
        + ' }';
    var code = 'readFile(SPIFFS, ' + text_FileName + ')'
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['simple_spiffs_DelFile'] = function () {
    Blockly.Arduino.definitions_['include_ESP_FS'] = '#include "FS.h"';
    Blockly.Arduino.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';
    Blockly.Arduino.definitions_['var_simple_spiffs_DelFile'] = 'void deleteFile(fs::FS &fs, const char * path) {\n'
        + '  if (fs.remove(path)) {\n'
        + '    Serial.println("- file deleted");\n'
        + '  } else {\n'
        + '    Serial.println("- delete failed");\n'
        + '  }\n'
        + '}';
    Blockly.Arduino.setups_['setup_ESP_SPIFFS'] = '  if (!SPIFFS.begin(true)) {\n'
        + '    Serial.println("SPIFFS Mount Failed");\n'
        + '   return;\n'
        + ' }';
    var text_FileName = Blockly.Arduino.valueToCode(this, 'FileName', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'deleteFile(SPIFFS, ' + text_FileName + ');\n';
    return code;
};