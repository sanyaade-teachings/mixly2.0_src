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
  var code = line1+line2+"last=1\npath=[]\npath.append(1)\n";
  return code;
};

Blockly.Python.algorithm_add_school = function() {
  var code = "path = [1]\n"
           + "list1 = [0,1,2,3,4,5,6]\n"
           + "list2 = [3,1,0,4,5,6,2]\n";
  return code;
};

Blockly.Python.algorithm_get_current_location = function() {
  var line1 = 'f = path[(len(path) - 1)]\n';
  var code = line1;
  return code;
};

Blockly.Python.algorithm_find_path = function() {
  Blockly.Python.definitions_.import_random = "import random";
  var line1 = 'if random.choice([0,1]) == 0:\n'
            + '    list = list1\n'
            + 'else:\n'
            + '    list = list2\n'
            + 'f = path[(len(path) - 1)]\n'
            + 'flag = 0\n'
            + 'for _my_variable in range(7):\n'
            + '    if vis[_my_variable+1] == 0 and g[f][_my_variable+1] == 1:\n'
            + '        if mark[f][_my_variable+1] == 0:\n'
            + '            flag = 1\n'
            + '            break\n';
  var code = line1;
  return code;
};

Blockly.Python.algorithm_move_recent = function() {  
  var line1 = 'tmp=10000\nfor i in range (9):\n'+'    if g[now][i]<tmp and i!=last:\n'+'        next=i\n'+'        tmp=g[now][i]\n'+'path.append(next)\n'+'last=now\n'+'now=next\n';
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
  var code = 'name = ["","学校","小智家","小欣家","小思家","小科家","贝贝家","乐乐家"]\nres = ""\nfor i in path:\n    res = res + name[i] + "-"\nprint(res[:-1])\n';
  return code;
};

Blockly.Python.algorithm_print_path2 = function() {  
  Blockly.Python.setups_['print_path2'] = `
def printpath(path):
    for i in path:
        if i == 1:
            print('小思家→',end ='')
        if i == 2:
            print('银行→',end ='')
        if i == 3:
            print('邮局→',end ='')
        if i == 4:
            print('餐厅→',end ='')
        if i == 5:
            print('便利店→',end ='')
        if i == 6:
            print('礼品店→',end ='')
        if i == 7:
            print('银行→',end ='')
        if i == 8:
            print('小科家')`;
  var code = 'printpath(path)\n';
  return code;
};

Blockly.Python.algorithm_first_book = function() {  
  var line1 = '';
  var code = line1+"i=1\n";
  return code;
};

Blockly.Python.algorithm_no_ring = function() {
  var code = "ring[i]==0";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_next_book = function() {    
  var code = "i+=1\n";
  return code;
};

Blockly.Python.algorithm_print_book = function() {  
  var code = "print(i)\n";
  return code;
};

Blockly.Python.algorithm_number_zero = function() {  
  var code = "cnt=0\n";
  return code;
};

Blockly.Python.algorithm_number_add = function() {  
  var code = "cnt+=1\n";
  return code;
};

Blockly.Python.algorithm_print_number = function() {  
  var code = "print(cnt)\n";
  return code;
};

Blockly.Python.algorithm_all_books_sequence = function() {  
  var line1 = 'ring=[0,0,0,0,0,0,1,0,0,0,0]\n';
  var code = line1+"left=1\n"+"right=10\n";
  return code;
};

Blockly.Python.algorithm_all_books = function() {  
  var line1 = 'ring=[0,0,0,0,0,0,1,0,0,0,0]\n';
  var code = line1+"left=1\n"+"right=10\n";
  return code;
};

Blockly.Python.algorithm_two_left = function() {
  var code = "left<right";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_divide_books = function() {  
  var code = "mid = int((left + right) / 2)\n";
  return code;
};

Blockly.Python.algorithm_get_half_books = function() {  
  var code = "i=left\nflag=1\n";
  return code;
};

Blockly.Python.algorithm_check_half_books = function() {  
  var code = "while ring[i]==0:\n    if i==mid:\n        flag=0\n        break\n    i+=1\n";
  return code;
};

Blockly.Python.algorithm_no_ring2 = function() {
  var code = "flag==0";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.algorithm_delete_books = function() {  
  var code = "left = mid + 1\n";
  return code;
};

Blockly.Python.algorithm_delete_books2 = function() {  
  var code = "right=mid\n";
  return code;
};

Blockly.Python.algorithm_print_book2 = function() {  
  var code = "print(left)\n";
  return code;
};

Blockly.Python.algorithm_get_book_num = function() {  
  var code = 'n='+this.getFieldValue('NUM')+'\n';
  return code;
};

Blockly.Python.algorithm_use_sequence = function() {  
  var line1 = 'ring=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]\n';
  var code = line1+"ring[n]=1\n";
  return code;
};

Blockly.Python.algorithm_print_sequence = function() {  
  var code = 'print("顺序法查找次数为：",cnt)';
  return code;
};

Blockly.Python.algorithm_use_divide = function() {  
  var line1 = 'ring=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]\n';
  var code = line1+"left=1\n"+'right=n\n';
  return code;
};

Blockly.Python.algorithm_print_divide = function() {  
  var code = 'print("二分法查找次数为：",cnt)';
  return code;
};

Blockly.Python.hanoi_init = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_math = "import math";
  function randomHexColor() {
    //随机生成十六进制颜色 
    var hex = Math.floor(Math.random() * 16777216).toString(16);
    //生成ffffff以内16进制数 
    while (hex.length < 6) {
      //while循环判断hex位数，少于6位前面加0凑够6位
      hex = '0' + hex;
    }
    return '#' + hex;  //返回‘#'开头16进制颜色
  }
  var num = this.getFieldValue('NUM');
  let colorList = [];
  let i = 0;
  while (i < num) {
    i++;
    colorList.push('"' + randomHexColor() + '"');
  }
  Blockly.Python.setups_['init_Hanoi'] = `
def init_Hanoi():
    pen = turtle.Turtle()
    pen.hideturtle()
    pen.speed(0)
    for i in range(0, 3, 1):
        pen.penup()
        pen.setheading(0)
        pen.goto(150 * i - 200,-100)
        pen.pendown()
        pen.pensize(5)
        pen.forward(100)
        pen.goto(150 * i - 150,-100)
        pen.setheading(90)
        pen.forward(200)`;
  Blockly.Python.setups_['begin'] = `
def begin():    
    s = turtle.Turtle()
    s.hideturtle()
    s.penup()
    s.speed(0)
    s.goto(0,-150)
    s.write('3')
    time.sleep(1)
    s.clear()
    s.write('2')
    time.sleep(1)
    s.clear()
    s.write('1')
    time.sleep(1)
    s.clear()
    s.write('Start!')
    time.sleep(1)
    s.clear()\n`;
    Blockly.Python.setups_['move'] = `
def move(x, y):
    try:
        t = tower[x].pop(-1)
        a = tower_num[x].pop(-1)
        if tower_num[y]!=[]:
            b = tower_num[y][-1]
            if a<b:
                print('非法移动，不能将大盘放置在小盘上')
                exit()        
        t.goto(150 * y - 150,20 * len(tower[y]) - 90)
        tower[y].append(t)
        tower_num[y].append(a)
    except IndexError:
        print('非法移动，未找到可移动的圆盘')
        exit()\n`;
  var code = `num = ${num}
tower = [[], [], []]
tower_num = [[], [], []]
A,B,C=0,1,2
total_num=[0]
color= (${colorList.join(', ')})
init_Hanoi()
for i in range(0, num, 1):
    tina = turtle.Turtle()
    tina.penup()
    tina.shape('square')
    tina.color("#000000",color[i])
    tina.goto(-150,20 * i - 90)
    tower[0].append(tina)
    tower_num[0].append(i)
count_turtle=turtle.Turtle()
count_turtle.hideturtle()
count_turtle.penup()
count_turtle.goto(0,150)
count_turtle.write('总步数：0')    
begin()\n`;
  return code;
};

Blockly.Python.hanoi_init_offline = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_math = "import math";
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var num = this.getFieldValue('NUM');
  Blockly.Python.setups_['init_Hanoi'] = `
def init_Hanoi():
    pen = turtle.Turtle()
    pen.hideturtle()
    pen.speed(0)
    for i in range(0, 3, 1):
        pen.penup()
        pen.setheading(0)
        pen.goto(150 * i - 200,-100)
        pen.pendown()
        pen.pensize(5)
        pen.forward(100)
        pen.goto(150 * i - 150,-100)
        pen.setheading(90)
        pen.forward(200)`;
  Blockly.Python.setups_['begin'] = `
def begin():    
    s = turtle.Turtle()
    s.hideturtle()
    s.penup()
    s.speed(0)
    s.goto(0,-150)
    s.write('3')
    time.sleep(1)
    s.clear()
    s.write('2')
    time.sleep(1)
    s.clear()
    s.write('1')
    time.sleep(1)
    s.clear()
    s.write('Start!')
    time.sleep(1)
    s.clear()\n`;
    Blockly.Python.setups_['move'] = `
def move(x, y):
    try:
        t = tower[x].pop(-1)
        a = tower_num[x].pop(-1)
        if tower_num[y]!=[]:
            b = tower_num[y][-1]
            if a<b:
                print('非法移动，不能将大盘放置在小盘上')
                exit()        
        t.goto(150 * y - 150,20 * len(tower[y]) - 90)
        tower[y].append(t)
        tower_num[y].append(a)
    except IndexError:
        print('非法移动，未找到可移动的圆盘')
        exit()\n`;
  var code = `num = ${num}
tower = [[], [], []]
tower_num = [[], [], []]
A,B,C=0,1,2
total_num=[0]
color= (${color})
init_Hanoi()
for i in range(0, num, 1):
    tina = turtle.Turtle()
    tina.penup()
    tina.shape('square')
    if num == 1:
        tina.shapesize(1,7,1)
    else:
        tina.shapesize(1,7 - (6 / (num - 1)) * i,1)
    tina.color("#000000",color)
    tina.speed(3)
    tina.goto(-150,20 * i - 90)
    tower[0].append(tina)
    tower_num[0].append(i)
count_turtle=turtle.Turtle()
count_turtle.hideturtle()
count_turtle.penup()
count_turtle.goto(0,150)
count_turtle.write('总步数：0')    
begin()\n`;
  return code;
};


Blockly.Python.hanoi_move = function() {
  var fromNum = Blockly.Python.valueToCode(this, 'FROM_NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  var toNum = Blockly.Python.valueToCode(this, 'TO_NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = `move(${fromNum}, ${toNum})\ntotal_num[0]+=1\ncount_turtle.clear()\ncount_turtle.write('总步数：'+str(total_num[0]))\n`;
  return code;
};

Blockly.Python.algorithm_color_seclet = function() {
  var colour = this.getFieldValue('COLOR');
  var code = '"' + colour +'"'
  return [code, Blockly.Python.ORDER_ATOMIC];
};