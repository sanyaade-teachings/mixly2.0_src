'use strict';

goog.provide('Blockly.Python.serial');
goog.require('Blockly.Python');

Blockly.Python.forBlock['serial_print'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart.write(str("+content+"))\n";
  return code;
};

Blockly.Python.forBlock['serial_println'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart.write(str("+content+")+'\\r\\n')\n";
  return code;
};

Blockly.Python.forBlock['serial_print_hex'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = "uart.write(str(hex("+content+")) + '\\r\\n')\n";
  return code;
};

Blockly.Python.forBlock['serial_receive_data_event'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var char_marker = Blockly.Python.valueToCode(this, 'char_marker', Blockly.Python.ORDER_ATOMIC) || ';';
  var branch = Blockly.Python.statementToCode(this, 'DO');

  Blockly.Python.definitions_['func_serial_receive_data_event_'  + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "}\n";
};

Blockly.Python.forBlock['serial_any'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var code ="uart.any()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_readstr'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var code ="uart.read()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_readline'] = function() {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code ="uart.readline()";
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_readstr_until'] = function() {
   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
   var char_marker = this.getFieldValue('char_marker');
   var code ="serial.readUntil("+char_marker + ")";
   return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_softserial'] = function () {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  if (!isNaN(parseInt(dropdown_pin1)))
    dropdown_pin1 = "pin" + dropdown_pin1;
  if (!isNaN(parseInt(dropdown_pin2)))
    dropdown_pin2 = "pin" + dropdown_pin2;
  var baudrate = this.getFieldValue('baudrate');
  return "uart.init(rx=" + dropdown_pin1 + ", tx=" + dropdown_pin2 + ", baudrate=" + baudrate + ")\n";
};

Blockly.Python.forBlock['serial_begin'] = function () {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var baudrate = this.getFieldValue('baudrate');
  return "uart.init(baudrate=" + baudrate + ")\n";
};


Blockly.Python.forBlock['IO_input'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['input(' + str+')', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['IO_print'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+")\n";
  return code;
};

Blockly.Python.forBlock['IO_print_inline'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end ="")\n';
  return code;
};