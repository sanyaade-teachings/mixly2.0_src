import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';
import { Profile } from 'mixly';

export const ir_recv = function () {
    var xmlDom = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText.indexOf("type=\"controls_tone\"") === -1 && xmlText.indexOf("type=\"controls_notone\"") === -1) {
        this.setWarningText(null);
    } else {
        this.setWarningText(Blockly.Msg.IR_AND_TONE_WARNING);
    }
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_declare_irProtocolList'] =
        `const String IR_PROTOCOL_TYPE[] = {
  "UNKNOWN",
  "PULSE_DISTANCE",
  "PULSE_WIDTH",
  "DENON",
  "DISH",
  "JVC",
  "LG",
  "LG2",
  "NEC",
  "PANASONIC",
  "KASEIKYO",
  "KASEIKYO_JVC",
  "KASEIKYO_DENON",
  "KASEIKYO_SHARP",
  "KASEIKYO_MITSUBISHI",
  "RC5",
  "RC6",
  "SAMSUNG",
  "SHARP",
  "SONY",
  "ONKYO",
  "APPLE",
  "BOSEWAVE",
  "LEGO_PF",
  "MAGIQUEST",
  "WHYNTER"
};`;
    Blockly.Arduino.definitions_['var_declare_irrecv_' + dropdown_pin] = `IRrecv irrecv_${dropdown_pin}(${dropdown_pin});\n`;
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = `irrecv_${dropdown_pin}.enableIRIn();`;
    var code =
        `if (irrecv_${dropdown_pin}.decode()) {
  struct IRData *pIrData = &irrecv_${dropdown_pin}.decodedIRData;
  long ir_item = pIrData->decodedRawData;
  String irProtocol = IR_PROTOCOL_TYPE[pIrData->protocol];
  Serial.print("IR TYPE:" + irProtocol + "\\tVALUE:");
  Serial.println(ir_item, HEX);
  irrecv_${dropdown_pin}.resume();
${branch}
} else {
${branch2}
}\n`;
    return code;
};


export const ir_recv_enable = function () {
    var xmlDom = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText.indexOf("type=\"controls_tone\"") == -1 && xmlText.indexOf("type=\"controls_notone\"") == -1) {
        this.setWarningText(null);
    }
    else {
        this.setWarningText(Blockly.Msg.IR_AND_TONE_WARNING);
    }

    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    return code;
}

export const ir_send_nec = function () {
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_declare_ir_send'] = 'IRsend irsend;\n';
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bits = Blockly.Arduino.valueToCode(this, 'bits', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = 'irsend.send' + type + '(' + data + ',' + bits + ');\n';
    /*
      for (var name in Blockly.Arduino.definitions_) {
          var def = Blockly.Arduino.definitions_[name];
          if (def.match(/^IRrecv irrecv_/)) {
              var tmp=def.substring(7,def.indexOf('('));
              code=code+tmp+'.enableIRIn();\n';
          }
      }*/
    return code;
}

export const ir_recv_raw = function () {
    var xmlDom = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText.indexOf("type=\"controls_tone\"") == -1 && xmlText.indexOf("type=\"controls_notone\"") == -1) {
        this.setWarningText(null);
    }
    else {
        this.setWarningText(Blockly.Msg.IR_AND_TONE_WARNING);
    }

    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_declare_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
    if (!Blockly.Arduino.setups_['setup_serial_Serial']) {
        Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(' + Profile.default.serial + ');';
    }
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
    code += '  ' + 'dumpRaw(&results_' + dropdown_pin + ');\n';
    code += '  irrecv_' + dropdown_pin + '.resume();\n'
    code += '}\n';
    var funcode = 'void dumpRaw(decode_results *results) {\n'
        + '  int count = results->rawlen;\n'
        + '  Serial.print("RawData (");\n'
        + '  Serial.print(count, DEC);\n'
        + '  Serial.print("): ");\n'
        + '  for (int i = 0; i < count; i++) {\n'
        + '    Serial.print(results->rawbuf[i]*MICROS_PER_TICK, DEC);\n'
        + '    if(i!=count-1){\n'
        + '      Serial.print(",");\n'
        + '    }\n'
        + '  }\n'
        + '  Serial.println("");\n'
        + '}\n';
    Blockly.Arduino.definitions_['dumpRaw'] = funcode;
    return code;
};

export const ir_send_raw = function () {
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_declare_ir_send'] = 'IRsend irsend;\n';
    var length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var freq = Blockly.Arduino.valueToCode(this, 'freq', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var text = this.getFieldValue('TEXT');
    var code = 'unsigned int buf_raw[' + length + ']={' + text + '};\n'
    code = code + 'irsend.sendRaw(buf_raw,' + length + ',' + freq + ');\n';
    return code;
}

export const i2c_master_writer = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.beginTransmission(" + device + ");\n";
    code += "Wire.write(" + value + ");\n";
    code += "Wire.endTransmission();\n";
    return code;
};

export const i2c_master_reader2 = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    //Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
    var code = "Wire.read()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// YANG add slave write
export const i2c_slave_write = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.write(" + value + ");\n";
    return code;
};

export const RFID_init = function () {
    var sda = this.getFieldValue('SDA');
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.definitions_['include_RFID'] = '#include <RFID.h>';
    Blockly.Arduino.definitions_['var_declare_RFID'] = 'RFID rfid(' + sda + ',5);';
    Blockly.Arduino.definitions_['var_declare__i and tmp'] = 'unsigned char i,tmp;';
    Blockly.Arduino.definitions_['var_declare__status'] = 'unsigned char status;';
    Blockly.Arduino.definitions_['var_declare__strmax'] = 'unsigned char str[MAX_LEN];';
    Blockly.Arduino.definitions_['var_declare__RC_size'] = 'unsigned char RC_size;';
    Blockly.Arduino.definitions_['var_declare__blockAddr'] = 'unsigned char blockAddr;        //选择操作的块地址0～63';
    Blockly.Arduino.definitions_['define_1'] = '//4字节卡序列号，第5字节为校验字节';
    Blockly.Arduino.definitions_['define_2'] = 'unsigned char serNum[5];';
    Blockly.Arduino.definitions_['define_3'] = '//写卡数据';
    Blockly.Arduino.definitions_['define_5'] = '//原扇区A密码，16个扇区，每个扇区密码6Byte';
    Blockly.Arduino.definitions_['define_6'] = 'unsigned char sectorKeyA[16][16] = {';
    Blockly.Arduino.definitions_['define_7'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
    Blockly.Arduino.definitions_['define_8'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
    Blockly.Arduino.definitions_['define_9'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},};';

    Blockly.Arduino.definitions_['define_10'] = '//新扇区A密码，16个扇区，每个扇区密码6Byte';
    Blockly.Arduino.definitions_['define_11'] = 'unsigned char sectorNewKeyA[16][16] = {';
    Blockly.Arduino.definitions_['define_12'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
    Blockly.Arduino.definitions_['define_13'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xff,0x07,0x80,0x69, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
    Blockly.Arduino.definitions_['define_14'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xff,0x07,0x80,0x69, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},};';
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    Blockly.Arduino.setups_['setup_output_2'] = 'SPI.begin();';
    Blockly.Arduino.setups_['setup_output_3'] = 'rfid.init();';
    return "";
};

export const RFID_on = function () {
    // Do while/until loop.
    var branch = Blockly.Arduino.statementToCode(this, 'do_');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }

    return 'if(rfid.isCard()){\n' + branch + '}\n';
};

export const RFID_readcardnum = function () {
    var funcName = 'RFID_readcardnum';
    var code = 'String ' + funcName + '(){\n'
        + '  rfid.readCardSerial();\n'
        + '  String stringserNum = String(rfid.serNum[0], HEX)+String(rfid.serNum[1], HEX)+String(rfid.serNum[2], HEX)+String(rfid.serNum[3], HEX)+String(rfid.serNum[4], HEX);\n'
        + '  //选卡，返回卡容量（锁定卡片，防止多次读写）\n'
        + '  rfid.selectTag(rfid.serNum);\n'
        + '  return stringserNum;\n'//直接返回string
        + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};

/* export const RFID_serialprintcardnum = function() {
  var funcName='RFID_serialprintcardnum';
    var code='void'+ ' ' + funcName + '() {\n'
        +"\n"+' //找卡  '
        +"\n"+' //读取卡序列号 '
        +"\n"+' if (rfid.readCardSerial())  '
        +"\n"+'   {'
        +"\n"+'   Serial.print("The card\'s number is  : "); '
        +"\n"+'  Serial.print(rfid.serNum[0],HEX);  '
        +"\n"+'  Serial.print(rfid.serNum[1],HEX); '
        +"\n"+'   Serial.print(rfid.serNum[2],HEX); '
        +"\n"+'    Serial.print(rfid.serNum[3],HEX);  '
        +"\n"+'  Serial.print(rfid.serNum[4],HEX); '
        +"\n"+'   Serial.println(" "); '
        +"\n"+'    }'
        +"\n"+'      //选卡，返回卡容量（锁定卡片，防止多次读写）'
        +"\n"+'      rfid.selectTag(rfid.serNum);'
        + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return  funcName+'();\n';
}; */




export const RFID_writecarddata = function () {
    var address2 = Blockly.Arduino.valueToCode(this, 'address1', Blockly.Arduino.ORDER_ATOMIC);
    var data2 = this.getFieldValue('data1');
    var funcName = 'RFID_writecarddata';
    var code = 'void' + ' ' + funcName + '(int ad2){\n'
        + '  rfid.readCardSerial();\n'
        + '  //选卡，返回卡容量（锁定卡片，防止多次读写）\n'
        + '  rfid.selectTag(rfid.serNum);\n'
        + '  //写数据卡\n'
        + '  blockAddr = ad2;\n'
        + '  if(rfid.auth(PICC_AUTHENT1A, blockAddr, sectorKeyA[blockAddr/4], rfid.serNum) == MI_OK){\n'
        + '    //写数据\n'
        + '    status = rfid.write(blockAddr, sectorKeyA[blockAddr/4]);\n'
        + '    Serial.print("set the new card password, and can modify the data of the Sector: ");\n'
        + '    Serial.println(blockAddr/4,DEC);\n'
        + '    blockAddr=blockAddr-3;\n'
        + '    status=rfid.write(blockAddr,(unsigned char*)' + data2 + ');\n'
        + '    if(status == MI_OK){\n'
        + '      Serial.println("Write card OK!");\n'
        + '    }\n'
        + '  }\n'
        + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return funcName + '(' + address2 + ');\n';
}

export const RFID_readcarddata = function () {
    var address3 = Blockly.Arduino.valueToCode(this, 'address', Blockly.Arduino.ORDER_ATOMIC);
    var funcName = 'RFID_readcarddata'
    var code = 'String' + ' ' + funcName + '(int ad3){\n'
        + '  //读卡\n'
        + '  blockAddr =ad3;\n'
        + '  status = rfid.auth(PICC_AUTHENT1A, blockAddr, sectorNewKeyA[blockAddr/4], rfid.serNum);\n'
        + '	if(status == MI_OK){  //认证\n'
        + '    //读数据\n'
        + '    if(rfid.read(blockAddr, str) == MI_OK)\n'
        + '    {\n'
        + '      Serial.print("Read from the card ,the data is : ");\n'
        + '      Serial.println((char *)str);\n'
        + '    }\n'
        + '  }\n'
        + '  rfid.halt();\n'
        + '  String stringstr((char*)str);\n'//str是一个char数组，必须先转换成char*，才能继续转换成string
        + '  return stringstr;\n'
        + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '(' + address3 + ')', Blockly.Arduino.ORDER_ATOMIC];
};


/* export const RFID_serialprintcarddata = function() {
    var address3 = Blockly.Arduino.valueToCode(this, 'address', Blockly.Arduino.ORDER_ATOMIC);
  var funcName='RFID_serialprintcarddata';
    var code='void'+ ' ' + funcName + '(int ad3) {\n'
    +"\n"+'//读卡 '
    +"\n"+'  blockAddr =ad3; '
    +"\n"+'  status = rfid.auth(PICC_AUTHENT1A, blockAddr, sectorNewKeyA[blockAddr/4], rfid.serNum);'
    +"\n"+'	 if (status == MI_OK)  //认证'
    +"\n"+'  {'
    +"\n"+'  //读数据'
    +"\n"+'  if( rfid.read(blockAddr, str) == MI_OK)'
    +"\n"+'  {'
    +"\n"+'  Serial.print("Read from the card ,the data is : ");'
    +"\n"+'  Serial.println((char *)str);'
    +"\n"+'  } '
    +"\n"+'   } '
    +"\n"+'  rfid.halt();'
    + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return  funcName+'('+address3+');\n';
}; */


export const RFID_off = function () {
    var funcName = 'RFID_off';
    var code = 'void' + ' ' + funcName + '() {\n'
        + "\n" + ' rfid.halt();   '
        + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return funcName + '();\n';
};

export const RFID_in = function () {
    // Do while/until loop.
    var funcName = 'RFID_readcardnum';
    var code = 'String' + ' ' + funcName + '() {\n'
        + "\n" + ' rfid.readCardSerial();  '
        + "\n" + '  String stringserNum=String(rfid.serNum[0], HEX)+String(rfid.serNum[1], HEX)+String(rfid.serNum[2], HEX)+String(rfid.serNum[3], HEX)+String(rfid.serNum[4], HEX);'
        + "\n" + '      //选卡，返回卡容量（锁定卡片，防止多次读写）'
        + "\n" + '      rfid.selectTag(rfid.serNum);'
        + "\n" + '  return stringserNum; '//直接返回string
        + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    var argument0 = Blockly.Arduino.valueToCode(this, 'uid_',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'do_');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    /*
      fixed bug caused by parameter of strcmp() must be const char*
      author:zyc
      date:2018-12-7
      */
    if (argument0 != 'false') {
        if (argument0.indexOf('"') === 0)
            return 'if (' + 'strcmp(RFID_readcardnum().c_str(),' + argument0 + ')==0' + ') {\n' + branch + '}\n';
        return 'if (' + 'strcmp(RFID_readcardnum().c_str(),' + argument0 + '.c_str())==0' + ') {\n' + branch + '}\n';
    }
    return '';

};

//初始化RFID
export const MFRC522_init = function () {
    var text_rfid_name = this.getFieldValue('rfid_name');
    var value_PIN_SDA = Blockly.Arduino.valueToCode(this, 'PIN_SDA', Blockly.Arduino.ORDER_ATOMIC);
    var value_PIN_RST = Blockly.Arduino.valueToCode(this, 'PIN_RST', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.definitions_['include_MFRC522'] = '#include <MFRC522.h>';
    Blockly.Arduino.definitions_['var_declare_' + text_rfid_name] = 'MFRC522 ' + text_rfid_name + '(' + value_PIN_SDA + ', ' + value_PIN_RST + ');';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    Blockly.Arduino.setups_['setup_mfc522_' + text_rfid_name] = text_rfid_name + '.PCD_Init();';
    var code = '';
    return code;
};

//RFID侦测到信号
export const MFRC522_IsNewCard = function () {
    var text_rfid_name = this.getFieldValue('rfid_name');
    var statements_DO = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.definitions_['function_MFRC522_IsNewCard'] = 'boolean MFRC522_IsNewCard(MFRC522 *_name){\n'
        + '  if(!_name->PICC_IsNewCardPresent())\n'
        + '    return false;\n'
        + '  if(!_name->PICC_ReadCardSerial())\n'
        + '    return false;\n'
        + '  return true;\n'
        + '}\n';
    var code = 'if(MFRC522_IsNewCard(&' + text_rfid_name + ')){\n'
        + (statements_DO != '' ? statements_DO : '')
        + '  ' + text_rfid_name + '.PICC_HaltA();\n'
        + '  ' + text_rfid_name + '.PCD_StopCrypto1();\n'
        + '}\n';
    return code;
};

//RFID读取卡号
export const MFRC522_ReadCardUID = function () {
    var text_rfid_name = this.getFieldValue('rfid_name');
    Blockly.Arduino.definitions_['function_MFRC522_ReadCardUID'] = 'String MFRC522_ReadCardUID(MFRC522 *_name){\n'
        + '  String _CardUID = "";\n'
        + '  for (byte _i = 0; _i < _name->uid.size; _i++){\n'
        + '    if(_name->uid.uidByte[_i] < 0x10)\n'
        + '      _CardUID += "0";\n'
        + '    _CardUID += String(_name->uid.uidByte[_i], HEX);\n'
        + '  }\n'
        + '  return _CardUID;\n'
        + '}\n';
    var code = 'MFRC522_ReadCardUID(&' + text_rfid_name + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//RFID写卡
export const MFRC522_WriteCard = function () {
    var text_rfid_name = this.getFieldValue('rfid_name');
    var value_block = Blockly.Arduino.valueToCode(this, 'block', Blockly.Arduino.ORDER_ATOMIC);
    var value_buffer = Blockly.Arduino.valueToCode(this, 'buffer', Blockly.Arduino.ORDER_ATOMIC);
    var value_length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['function_MFRC522_WriteCard'] = 'boolean MFRC522_WriteCard(MFRC522 *_name, byte _block, byte *_buffer, byte _length){\n'
        + '  MFRC522::MIFARE_Key _key;\n'
        + '  for(byte i = 0; i < 6; i++)\n'
        + '    _key.keyByte[i] = 0xFF;\n'
        + '  MFRC522::StatusCode _status;\n'
        + '  _status = _name->PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, _block, &_key, &(_name->uid));\n'
        + '  if(_status != MFRC522::STATUS_OK){\n'
        + '    Serial.print(F("PCD_Authenticate() failed: "));\n'
        + '    Serial.println(_name->GetStatusCodeName(_status));\n'
        + '    return false;\n'
        + '  }\n'
        + '  else{\n'
        + '    Serial.println(F("PCD_Authenticate() success;"));\n'
        + '  }\n'
        + '  _status = _name->MIFARE_Write(_block, _buffer, _length);\n'
        + '  if(_status != MFRC522::STATUS_OK){\n'
        + '    Serial.print(F("MIFARE_Write() failed: "));\n'
        + '    Serial.println(_name->GetStatusCodeName(_status));\n'
        + '    return false;\n'
        + '  }\n'
        + '  else{\n'
        + '    Serial.println(F("MIFARE_Write() success;"));\n'
        + '  }\n'
        + '  return true;\n'
        + '}\n'
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    var code = 'MFRC522_WriteCard(&' + text_rfid_name + ', ' + value_block + ', ' + value_buffer + ', ' + value_length + ');\n';
    return code;
};

//RFID读卡
export const MFRC522_ReadCard = function () {
    var text_rfid_name = this.getFieldValue('rfid_name');
    var value_block = Blockly.Arduino.valueToCode(this, 'block', Blockly.Arduino.ORDER_ATOMIC);
    var value_buffer = Blockly.Arduino.valueToCode(this, 'buffer', Blockly.Arduino.ORDER_ATOMIC);
    var value_length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['function_MFRC522_ReadCard'] = 'boolean MFRC522_ReadCard(MFRC522 *_name, byte _block, byte *_buffer, byte _length){\n'
        + '  MFRC522::MIFARE_Key _key;\n'
        + '  for(byte i = 0; i < 6; i++)\n'
        + '    _key.keyByte[i] = 0xFF;\n'
        + '  MFRC522::StatusCode _status;\n'
        + '  _status = _name->PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, _block, &_key, &(_name->uid));\n'
        + '  if(_status != MFRC522::STATUS_OK){\n'
        + '    Serial.print(F("PCD_Authenticate() failed: "));\n'
        + '    Serial.println(_name->GetStatusCodeName(_status));\n'
        + '    return false;\n'
        + '  }\n'
        + '  else{\n'
        + '    Serial.println(F("PCD_Authenticate() success;"));\n'
        + '  }\n'
        + '  if(_length < 18){\n'
        + '    byte _Read_buffer[18];\n'
        + '    byte _Read_buffer_length = 18;\n'
        + '    _status = _name->MIFARE_Read(_block, _Read_buffer, &_Read_buffer_length);\n'
        + '    if(_status != MFRC522::STATUS_OK){\n'
        + '      Serial.print(F("MIFARE_Read() failed: "));\n'
        + '      Serial.println(_name->GetStatusCodeName(_status));\n'
        + '      return false;\n'
        + '    }\n'
        + '    else{\n'
        + '      Serial.println(F("MIFARE_Read() success;"));\n'
        + '    }\n'
        + '    for(byte _i = 0; _i < _length; _i++)\n'
        + '      _buffer[_i] = _Read_buffer[_i];\n'
        + '  }\n'
        + '  else{\n'
        + '    _status = _name->MIFARE_Read(_block, _buffer, &_length);\n'
        + '    if(_status != MFRC522::STATUS_OK){\n'
        + '      Serial.print(F("MIFARE_Read() failed: "));\n'
        + '      Serial.println(_name->GetStatusCodeName(_status));\n'
        + '      return false;\n'
        + '    }\n'
        + '    else{\n'
        + '      Serial.println(F("MIFARE_Read() success;"));\n'
        + '    }\n'
        + '  }\n'
        + '  return true;\n'
        + '}\n'
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    var code = 'MFRC522_ReadCard(&' + text_rfid_name + ', ' + value_block + ', ' + value_buffer + ', ' + value_length + ');\n';
    return code;
};

//IIC主机初始化
export const i2c_master_Init = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var code = '';
    return code;
};

//IIC从机初始化
export const i2c_slave_Init = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    var value_i2c_address = Blockly.Arduino.valueToCode(this, 'i2c_address', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin(' + value_i2c_address + ');';
    var code = '';
    return code;
};

//IIC发送数据
export const i2c_begin_end_transmission = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    var value_i2c_address = Blockly.Arduino.valueToCode(this, 'i2c_address', Blockly.Arduino.ORDER_ATOMIC);
    var statements_transmission_data = Blockly.Arduino.statementToCode(this, 'transmission_data');
    var code = 'Wire.beginTransmission(' + value_i2c_address + ');\n'
        + statements_transmission_data
        + 'Wire.endTransmission();\n';
    return code;
};

//IIC写入数据
export const i2c_write = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    var value_i2c_write_data = Blockly.Arduino.valueToCode(this, 'i2c_write_data', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'Wire.write(' + value_i2c_write_data + ');\n';
    return code;
};

export const i2c_slave_write_array = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var array = Blockly.Arduino.valueToCode(this, 'array', Blockly.Arduino.ORDER_ATOMIC);
    var length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC) || '1';
    var code = "Wire.write(" + array + "," + length + ");\n";
    return code;
};

export const i2c_available = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    var workspace = this.workspace;
    var blocks = workspace.getAllBlocks();
    var y = 0;
    for (y = 0; y < blocks.length; y++) {
        if (blocks[y].type == 'i2c_slave_Init')
            break;
    }
    if (y == blocks.length)
        Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var code = "Wire.available()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//从机接收字节数
export const i2c_howmany = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var code = "howMany";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//IIC读取数据
export const i2c_read = function () {
    var code = "Wire.read()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//SPI
export const spi_transfer = function () {
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    var pin = Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
};

//SPI 初始化从机
export const spi_begin_slave = function () {
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'pinMode(12, OUTPUT);'
        + '\n  SPCR |= _BV(SPE);';
    var code = '';
    return code;
};

//寄存器读写
export const i2c_master_writerReg = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var regadd = Blockly.Arduino.valueToCode(this, 'regadd', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.beginTransmission(" + device + ");\n";
    code += "Wire.write(" + regadd + ");\n";
    code += "Wire.write(" + value + ");\n";
    code += "Wire.endTransmission();\n";
    return code;
};

export const i2c_master_readerReg = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var regadd = Blockly.Arduino.valueToCode(this, 'regadd', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.beginTransmission(" + device + ");\n";
    code += "Wire.write(" + regadd + ");\n";
    code += "Wire.requestFrom(" + device + ", " + bytes + ");\n";
    code += "Wire.endTransmission();\n";
    return code;
};

export const i2c_slave_onreceive = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    var value_onReceive_length = Blockly.Arduino.valueToCode(this, 'onReceive_length', Blockly.Arduino.ORDER_ATOMIC);
    var statements_i2c_onReceive_data = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.definitions_['function_receiveEvent'] = 'void receiveEvent(int ' + value_onReceive_length + ')'
        + '\n{'
        + '  ' + statements_i2c_onReceive_data
        + '\n}\n'
    Blockly.Arduino.setups_['setup_i2c_receiveEvent'] = 'Wire.onReceive(receiveEvent);';
    var code = '';
    return code;
}

export const i2c_slave_onrequest = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c_slave'] = 'Wire.setClock(400000);';
    Blockly.Arduino.setups_['setup_i2c_onRequest'] = 'Wire.onRequest(i2cRequestEvent);';
    var funcName = 'i2cRequestEvent';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return '';
}

export const i2c_master_reader = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.requestFrom(" + device + ", " + bytes + ");\n";
    return code;
};

export const spi_begin_master = function () {
    var value_spi_slave_pin = Blockly.Arduino.valueToCode(this, 'spi_slave_pin', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    Blockly.Arduino.setups_['setup_spi_divider'] = 'SPI.setClockDivider(SPI_CLOCK_DIV8);';
    Blockly.Arduino.setups_['setup_spi_pin_' + value_spi_slave_pin] = 'digitalWrite(' + value_spi_slave_pin + ', HIGH);';
    var code = '';
    return code;
};

export const spi_transfer_Init = function () {
    var value_slave_pin = Blockly.Arduino.valueToCode(this, 'slave_pin', Blockly.Arduino.ORDER_ATOMIC);
    var statements_transfer_data = Blockly.Arduino.statementToCode(this, 'transfer_data');
    var code = 'digitalWrite(' + value_slave_pin + ', LOW);\n'
        + statements_transfer_data
        + 'digitalWrite(' + value_slave_pin + ', HIGH);\n';
    return code;
};

export const spi_transfer_1 = function () {
    var value_transfer_data = Blockly.Arduino.valueToCode(this, 'transfer_data', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SPI.transfer(' + value_transfer_data + ');\n';
    return code;
};

export const spi_transfer_2 = function () {
    var value_transfer_data = Blockly.Arduino.valueToCode(this, 'transfer_data', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SPI.transfer(' + value_transfer_data + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

export const spi_slave_interrupt = function () {
    var statements_slave_interrupt_data = Blockly.Arduino.statementToCode(this, 'slave_interrupt_data');
    Blockly.Arduino.definitions_['function_ISR'] = 'ISR(SPI_STC_vect)'
        + '\n{'
        + '\n' + statements_slave_interrupt_data
        + '\n}\n'
    Blockly.Arduino.setups_['setup_spi_interrupt'] = 'SPI.attachInterrupt();';
    var code = '';
    return code;
};

export const spi_slave_receive = function () {
    Blockly.Arduino.definitions_['function_SPI_SlaveReceive'] = 'char SPI_SlaveReceive()'
        + '\n{'
        + '\n  while(!(SPSR&(1<<SPIF)));'
        + '\n  return SPDR;'
        + '\n}\n'
    var code = 'SPI_SlaveReceive()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
