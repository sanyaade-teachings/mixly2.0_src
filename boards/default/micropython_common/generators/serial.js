'use strict';

goog.provide('Blockly.Python.serial');
goog.require('Blockly.Python');

Blockly.Python.forBlock['serial_print'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart"+dropdown_uart+".write(str("+content+"))\n";
  return code;
};

Blockly.Python.forBlock['serial_print_byte'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart"+dropdown_uart+".write("+content+")\n";
  return code;
};

Blockly.Python.forBlock['serial_println'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart"+dropdown_uart+".write(str("+content+")+'\\r\\n')\n";
  return code;
};

Blockly.Python.forBlock['serial_print_hex'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var dropdown_stat = this.getFieldValue('STAT');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = "uart"+dropdown_uart+".write(str("+dropdown_stat+"("+content+"))+'\\r\\n')\n";
  return code;
};

Blockly.Python.forBlock['serial_any'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart"+dropdown_uart+".any()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_readstr'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart"+dropdown_uart+".read()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_readline'] = function() {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code ="uart"+dropdown_uart+".readline()";
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['serial_softserial'] = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
   var dropdown_uart = this.getFieldValue('mode')
  var baudrate = this.getFieldValue('baudrate');
  return "uart"+dropdown_uart+"=machine.UART("+dropdown_uart+", "+baudrate+")\n";
};

Blockly.Python.forBlock['serial_softserial_new'] = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var rx = Blockly.Python.valueToCode(this, 'RX', Blockly.Python.ORDER_ATOMIC);
  var tx = Blockly.Python.valueToCode(this, 'TX', Blockly.Python.ORDER_ATOMIC);
   var dropdown_uart = this.getFieldValue('mode')
  var baudrate = this.getFieldValue('baudrate');
  return "uart"+dropdown_uart+"=machine.UART("+dropdown_uart+", tx=" + tx  +", rx=" + rx +", baudrate=" +baudrate+")\n";
};

Blockly.Python.forBlock['system_input'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['input(' + str+')', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.forBlock['system_print'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+")\n";
  return code;
};

Blockly.Python.forBlock['system_print_inline'] = function() {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end ="")\n';
  return code;
};

Blockly.Python.forBlock['system_print_end'] = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var end = Blockly.Python.valueToCode(this, 'END', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end =' + end + ')\n';
  return code;
};

Blockly.Python.forBlock['system_print_many'] = function() {
  
  var dropdown_type = this.getFieldValue('TYPE');
  
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }

  var code = 'print(' + code.join(', ') + ')\n';
  return code;
};

Blockly.Python.forBlock['serial_send_to_ai'] = function() {
  Blockly.Python.definitions_['import_uart_com'] = 'import uart_com';
  var dropdown_uart = this.getFieldValue('mode');
  var dropdown_stat = this.getFieldValue('STAT');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = "uart_com.send(uart"+dropdown_uart+", "+content+", repeat="+dropdown_stat+")\n";
  return code;
};

Blockly.Python.forBlock['serial_read_from_ai'] = function() {
  Blockly.Python.definitions_['import_uart_com'] = 'import uart_com';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart_com.recv(uart"+dropdown_uart+")";
  return [code,Blockly.Python.ORDER_ATOMIC];
};