'use strict';

goog.provide('Blockly.Python.algorithm');

goog.require('Blockly.Python');
// ok


Blockly.Python.algorithm_prepare = function() {  
  var line1 = 'g = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,1,0,0,0,0,0,0], [0,0,0,1,0,0,1,0,0,0], [0,1,1,0,1,1,0,0,0,0], [0,0,0,1,0,0,1,1,0,0], [0,0,0,1,0,0,1,1,0,0], [0,0,1,0,0,1,0,1,0,0], [0,0,0,0,1,1,1,0,0,0]]\n';
  var line2 = 'mark = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]\n';
  var code = line1+line2+"vis = [0,1,0,0,0,0,0,0,0]\n";
  return code;
};

Blockly.Python.algorithm_prepare2 = function() {  
  var line1 = 'g = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,1,0,0,0,0,0,0], [0,0,0,1,0,0,1,0,0,0], [0,1,1,0,1,1,0,0,0,0], [0,0,0,1,0,0,0,1,0,0], [0,0,0,1,0,0,0,1,0,0], [0,0,1,0,0,0,0,1,0,0], [0,0,0,0,1,1,1,0,0,0]]\n';
  var line2 = 'mark = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]\n';
  var code = line1+line2+"vis = [0,1,0,0,0,0,0,0,0]\n";
  return code;
};

Blockly.Python.algorithm_prepare3 = function() {  
  var line1 = 'g = [[10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[10000,10000,500,300,10000,10000,10000,10000,10000,10000,10000],[10000,500,10000,10000,100,10000,10000,10000,10000,10000,10000],[10000,300,10000,10000,400,300,10000,10000,10000,10000,10000],[10000,10000,100,400,10000,10000,200,10000,10000,10000,10000],[10000,10000,10000,300,10000,10000,100,200,10000,10000,10000],[10000,10000,10000,10000,200,100,10000,10000,100,10000,10000],[10000,10000,10000,10000,10000,200,10000,10000,100,10000,10000],[10000,10000,10000,10000,10000,10000,100,100,10000,10000,10000]]\n';
  var line2 = 'now=1\n';
  var code = line1+line2+"dist=0\nlast=1\n";
  return code;
};

Blockly.Python.algorithm_add_school = function() {  
  var code = "path = [1]\n";
  return code;
};

Blockly.Python.algorithm_get_current_location = function() {  
  var line1 = 'f = path[(len(path) - 1)]\n';
  var code = line1;
  return code;
};

Blockly.Python.algorithm_find_path = function() {  
  var line1 = 'f = path[(len(path) - 1)]\nflag = 0\n'+'for _my_variable in range(7):\n'+'    if vis[_my_variable+1] == 0 and g[f][_my_variable+1] == 1:\n'+'        if mark[f][_my_variable+1] == 0:\n'+'            flag = 1\n'+'            break\n';
  var code = line1;
  return code;
};

Blockly.Python.algorithm_move_recent = function() {  
  var line1 = 'tmp=10000\nfor i in range (9):\n'+'    if g[now][i]<tmp and i!=last:\n'+'        next=i\n'+'        tmp=g[now][i]\n'+'dist+=tmp\n'+'last=now\n'+'now=next\n';
  var code = line1;
  return code;
};

Blockly.Python.algorithm_not_home = function() {
  var code = "now != 8";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_current_school = function() {
  var code = "f == 1";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_new_path = function() {
  var code = "flag == 1";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_set_path = function() {   
  var code = "mark[f][_my_variable+1] = 1\nvis[_my_variable+1] = 1\n";
  return code;
};

Blockly.Python.algorithm_no_path = function() {   
  var code = "print('没有符合条件的路线')\n";
  return code;
};

Blockly.Python.algorithm_void_path = function() {
  var code = "len(path)==0";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_add_path = function() {   
  var code = "path.append(_my_variable+1)\n";
  return code;
};


Blockly.Python.algorithm_del_path = function() {   
  var code = "del path[len(path) - 1]\n";
  return code;
};

Blockly.Python.algorithm_return_path = function() {   
  var code = 'for i in range(7):\n'+'    mark[f][i+1] = 0\n'+'    vis[f] = 0\n';
  return code;
};

Blockly.Python.algorithm_no_left = function() {
  var code = "len(path) == 7";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_print_path = function() {  
  var code = "print(path)\n";
  return code;
};