'use strict';

goog.provide('Blockly.Python.algorithm');

goog.require('Blockly.Python');


// sub_algorithm_1

Blockly.Python.forBlock['algorithm_prepare'] = function() {
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'g = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,1,0,0,0,0,0,0], [0,0,0,1,0,0,1,0,0,0], [0,1,1,0,1,1,0,0,0,0], [0,0,0,1,0,0,0,1,0,0], [0,0,0,1,0,0,1,1,0,0], [0,0,1,0,0,1,0,1,0,0], [0,0,0,0,1,1,1,0,0,0]]\n';
  var line2 = 'mark = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]\n';
  var code = line1+line2+"vis = [0,1,0,0,0,0,0,0,0]\n";
  code += `position = [[0, 0], [200, 200], [250, 60], [320, 200], [280, 380], [470, 250], [670, 90], [650, 340]]
sprite.clearAllSprites()
sprite.createBackground('map_xuexiao')

house = [ sprite.Sprite('mark', 150, 380),
    sprite.Sprite('School', 115, 195),
    sprite.Sprite('House25', 264, 67),
    sprite.Sprite('House36', 320, 200),
    sprite.Sprite('House47', 290, 371),
    sprite.Sprite('House25', 479, 233),
    sprite.Sprite('House36', 674, 96),
    sprite.Sprite('House47', 642, 318)
]
for i in house:
    i.hide()\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_add_school'] = function() {
  // var code = "path = [1]\n"
  //          + "list1 = [0,1,2,3,4,5,6]\n"
  //          + "list2 = [3,1,0,4,5,6,2]\n";
  var code = "path = [1]\n"
			+ "car = sprite.Sprite('car', position[1][0], position[1][1])\nhouse[1].show()\n"
			+`car.nowPos = 1
def drive(n):
    if g[car.nowPos][n]==1:
        car.slideTo(position[n][0], position[n][1], 1)
        car.nowPos = n
    else:
        print('移动失败！程序有误！')
        exit()\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_find_path'] = function() {
  Blockly.Python.definitions_.import_random = "import random";
  // var line1 = 'if random.choice([0,1]) == 0:\n'
  //           + '    list = list1\n'
  //           + 'else:\n'
  //           + '    list = list2\n'
  //           + 'f = path[(len(path) - 1)]\n'
  //           + 'flag = 0\n'
  //           + 'for _my_variable in range(7):\n'
  //           + '    if vis[_my_variable+1] == 0 and g[f][_my_variable+1] == 1:\n'
  //           + '        if mark[f][_my_variable+1] == 0:\n'
  //           + '            flag = 1\n'
  //           + '            break\n';
  var line1 = 'f = path[(len(path) - 1)]\n'
            + 'flag = 0\n'
            + 'for _my_variable in [6,5,4,3,2,1,0]:\n'
            + '    if vis[_my_variable+1] == 0 and g[f][_my_variable+1] == 1:\n'
            + '        if mark[f][_my_variable+1] == 0:\n'
            + '            flag = 1\n'
            + '            break\n';
  var code = line1;
  return code;
};

Blockly.Python.forBlock['algorithm_new_path'] = function() {
  var code = "flag == 1";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_set_path'] = function() {   
  var code = "mark[f][_my_variable+1] = 1\nvis[_my_variable+1] = 1\n";
  return code;
};

Blockly.Python.forBlock['algorithm_add_path'] = function() {   
  var code = "path.append(_my_variable+1)\n";
  code += `drive(path[len(path) - 1])\nhouse[_my_variable+1].show()\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_del_path'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  var code = "del path[len(path) - 1]\n";
  code += `house[0].show()\ntime.sleep(0.5)\nhouse[0].hide()\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_return_path'] = function() {   
  var code = 'for i in range(7):\n'+'    mark[f][i+1] = 0\n'+'    vis[f] = 0\n';
  code = `house[f].hide()\ndrive(path[len(path) - 1])\n`+code;
  return code;
};

Blockly.Python.forBlock['algorithm_no_left'] = function() {
  var code = "len(path) == 7";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_print_path'] = function() {  
  var code = 'name = ["","学校","小智家","小欣家","小思家","小科家","贝贝家","乐乐家"]\nres = ""\nfor i in path:\n    res = res + name[i] + "-"\nprint(res[:-1])\n';
  return code;
};

// sub_algorithm_2

Blockly.Python.forBlock['algorithm_prepare2'] = function() {
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'g = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,1,0,0,0,0,0,0], [0,0,0,1,0,0,1,0,0,0], [0,1,1,0,1,0,0,0,0,0], [0,0,0,1,0,0,0,1,0,0], [0,0,0,1,0,0,0,1,0,0], [0,0,1,0,0,0,0,1,0,0], [0,0,0,0,1,1,1,0,0,0]]\n';
  var line2 = 'mark = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]\n';
  var code = line1+line2+"vis = [0,1,0,0,0,0,0,0,0]\n";
  code += `position = [[0, 0], [200, 200], [250, 60], [320, 200], [280, 380], [470, 250], [670, 90], [650, 340]]
sprite.clearAllSprites()
sprite.createBackground('map_xuexiao')

house = [ sprite.Sprite('mark', 150, 380),
    sprite.Sprite('School', 115, 195),
    sprite.Sprite('House25', 264, 67),
    sprite.Sprite('House36', 320, 200),
    sprite.Sprite('House47', 290, 371),
    sprite.Sprite('House25', 479, 233),
    sprite.Sprite('House36', 674, 96),
    sprite.Sprite('House47', 642, 318)
]
barricade = sprite.Sprite('barricade', 570, 170)
barricade.enlargeTo(100)
for i in house:
    i.hide()\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_current_school'] = function() {
  var code = "f == 1";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_no_path'] = function() {   
  var code = "print('没有符合条件的路线')\n";
  return code;
};

// sub_algorithm_3

Blockly.Python.forBlock['algorithm_prepare_2_1'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'g = [[10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[10000,10000,500,300,10000,10000,10000,10000,10000,10000,10000],[10000,500,10000,10000,100,10000,10000,10000,10000,10000,10000],[10000,300,10000,10000,400,300,10000,10000,10000,10000,10000],[10000,10000,100,400,10000,10000,200,10000,10000,10000,10000],[10000,10000,10000,300,10000,10000,100,200,10000,10000,10000],[10000,10000,10000,10000,200,100,10000,10000,100,10000,10000],[10000,10000,10000,10000,10000,200,10000,10000,100,10000,10000],[10000,10000,10000,10000,10000,10000,100,100,10000,10000,10000]]\n';
  var line2 = 'now=1\n';
  var code = line1+line2+"last=1\npath=[]\npath.append(1)\n";
  code += `name = ["","小思家","银行","邮局","餐厅","书店","医院","超市","小科家"]
position = [[0, 0], [60, 320], [510, 390], [240, 200], [750, 330], [410, 90], [540, 190], [550, 30], [720, 120]]
sprite.clearAllSprites()
sprite.createBackground('map_si_ke')
bear = sprite.Sprite('mixbear', 60, 320)
bear.enlargeTo(100)
time.sleep(1)\n
`
  return code;
};

Blockly.Python.forBlock['algorithm_prepare_2_2'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
var line1 = 'g =[[10000,10000,10000,10000,10000,10000,10000],[10000,10000,300,500,10000,10000,10000],[10000,300,10000,10000,300,700,10000],[10000,500,10000,10000,10000,100,10000],[10000,10000,300,10000,10000,10000,200],[10000,10000,700,100,10000,10000,100],[10000,10000,10000,10000,200,100,10000]]\n';
var line2 = 'now=1\n';
  var code = line1+line2+"last=1\npath=[]\npath.append(1)\n";
  code += `name = ["","小智家","邮局","银行","书店","餐厅","学校"]
position = [[0, 0], [70, 340], [70, 90], [550, 310], [420, 70], [730, 250], [650, 130]]
sprite.clearAllSprites()
sprite.createBackground('map_zhi_xue')
bear = sprite.Sprite('mixbear', 70, 340)
bear.enlargeTo(100)
time.sleep(1)\n
`
  return code;
};

Blockly.Python.forBlock['algorithm_move_recent'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'tmp=10000\nfor i in range(0, len(g), 1):\n'+'    if g[now][i]<tmp and i!=last:\n'+'        next=i\n'+'        tmp=g[now][i]\n'
  +'bear.slideTo(position[next][0], position[next][1], 1)\ntime.sleep(0.5)\n'
  +'path.append(next)\n'+'last=now\n'+'now=next\n'
  +'if len(path)>6:\n    print("路线错乱！程序有误！")\n    exit()\n';
  var code = line1;
  return code;
};

Blockly.Python.forBlock['algorithm_not_home'] = function() {
  var code = "name[now] != '小科家'";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_not_school'] = function() {
  var code = "name[now] != '学校'";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_print_path2'] = function() {  
  var code =`res = ""
for i in path:
    res = res + name[i] + "→"
print(res[:-1])\n`;
  
  return code;
};

// sub_algorithm_4 hanoi

Blockly.Python.forBlock['hanoi_init'] = function() {
//   Blockly.Python.definitions_.import_turtle = "import turtle";
//   Blockly.Python.definitions_.import_time = "import time";
//   Blockly.Python.definitions_.import_math = "import math";
//   function randomHexColor() {
//     //随机生成十六进制颜色 
//     var hex = Math.floor(Math.random() * 16777216).toString(16);
//     //生成ffffff以内16进制数 
//     while (hex.length < 6) {
//       //while循环判断hex位数，少于6位前面加0凑够6位
//       hex = '0' + hex;
//     }
//     return '#' + hex;  //返回‘#'开头16进制颜色
//   }
//   var num = this.getFieldValue('NUM');
//   let colorList = [];
//   let i = 0;
//   while (i < num) {
//     i++;
//     colorList.push('"' + randomHexColor() + '"');
//   }
//   Blockly.Python.setups_['init_Hanoi'] = `
// def init_Hanoi():
//     pen = turtle.Turtle()
//     pen.hideturtle()
//     pen.speed(0)
//     for i in range(0, 3, 1):
//         pen.penup()
//         pen.setheading(0)
//         pen.goto(150 * i - 200,-100)
//         pen.pendown()
//         pen.pensize(5)
//         pen.forward(100)
//         pen.goto(150 * i - 150,-100)
//         pen.setheading(90)
//         pen.forward(200)`;
//   Blockly.Python.setups_['begin'] = `
// def begin():    
//     s = turtle.Turtle()
//     s.hideturtle()
//     s.penup()
//     s.speed(0)
//     s.goto(0,-150)
//     s.write('3')
//     time.sleep(1)
//     s.clear()
//     s.write('2')
//     time.sleep(1)
//     s.clear()
//     s.write('1')
//     time.sleep(1)
//     s.clear()
//     s.write('Start!')
//     time.sleep(1)
//     s.clear()\n`;
//     Blockly.Python.setups_['move'] = `
// def move(x, y):
//     try:
//         t = tower[x].pop(-1)
//         a = tower_num[x].pop(-1)
//         if tower_num[y]!=[]:
//             b = tower_num[y][-1]
//             if a<b:
//                 print('非法移动，不能将大盘放置在小盘上')
//                 exit()        
//         t.goto(150 * y - 150,20 * len(tower[y]) - 90)
//         tower[y].append(t)
//         tower_num[y].append(a)
//     except IndexError:
//         print('非法移动，未找到可移动的圆盘')
//         exit()\n`;
//   var code = `num = ${num}
// tower = [[], [], []]
// tower_num = [[], [], []]
// A,B,C=0,1,2
// total_num=[0]
// color= (${colorList.join(', ')})
// init_Hanoi()
// for i in range(0, num, 1):
//     tina = turtle.Turtle()
//     tina.penup()
//     tina.shape('square')
//     tina.color("#000000",color[i])
//     tina.goto(-150,20 * i - 90)
//     tower[0].append(tina)
//     tower_num[0].append(i)
// count_turtle=turtle.Turtle()
// count_turtle.hideturtle()
// count_turtle.penup()
// count_turtle.goto(0,150)
// count_turtle.write('总步数：0')    
// begin()\n`;
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var num = this.getFieldValue('NUM');
  if (num >= 7) var code = `print('层数过高！不得高于6层！')\nexit()\n`;
  else {
	  var code = `sprite.clearAllSprites()
_Hanoicolor = ['blue', 'red', 'yellow', 'green', 'purple', 'black']
_Hanoi = [[], [], []]
A = 0
B = 1
C = 2
_n = `+num+`
_HanoiColumn = [
    sprite.Sprite('HanoiColumn', 200, 320),
    sprite.Sprite('HanoiColumn', 400, 320),
    sprite.Sprite('HanoiColumn', 600, 320)
]
_HanoiColumnNumber = [
    sprite.Text('A', 190, 120),
    sprite.Text('B', 390, 120),
    sprite.Text('C', 590, 120)
]
_HanoiBlock = []
for i in range(0, _n, 1):
    _HanoiBlock.append(sprite.Sprite(_Hanoicolor[i], 200, 400-(_n-i-1)*27))
    _HanoiBlock[i].setScale(25, 30*i+30)
    _Hanoi[0].insert(0, _HanoiBlock[i])
time.sleep(1)\n`
  }
  return code;
};

Blockly.Python.forBlock['hanoi_move'] = function() {
  var fromNum = Blockly.Python.valueToCode(this, 'FROM_NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  var toNum = Blockly.Python.valueToCode(this, 'TO_NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  // var code = `move(${fromNum}, ${toNum})\ntotal_num[0]+=1\ncount_turtle.clear()\ncount_turtle.write('总步数：'+str(total_num[0]))\n`;
  var code = `if len(_Hanoi[${fromNum}])>0 :
    _HanoiBlockMoved = _Hanoi[${fromNum}].pop()
    if len(_Hanoi[${toNum}]) > 0 :
        _HanoiBlockSuppressed = _Hanoi[${toNum}].pop()
        if _HanoiBlock.index(_HanoiBlockMoved) > _HanoiBlock.index(_HanoiBlockSuppressed):
            print('非法移动！程序有误！')
            exit()
        else:
            _Hanoi[${toNum}].append(_HanoiBlockSuppressed)
    _HanoiBlockMoved.slideTo(${fromNum}*200+200, 180, 0.2)
    _HanoiBlockMoved.slideTo(${toNum}*200+200, 180, 0.5)
    _HanoiBlockMoved.slideTo(${toNum}*200+200, 400-len(_Hanoi[${toNum}])*27, 0.2)
    _Hanoi[${toNum}].append(_HanoiBlockMoved)
else :
    print('非法移动！程序有误！')
    exit()
`
  return code;
};

// sub_algorithm_5

Blockly.Python.forBlock['algorithm_all_books_sequence'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = 'ring=[0,0,0,0,0,0,0,0,0,0]\nn=6\nring[6]=1\n';
  code += `sprite.clearAllSprites()
Books = [0]
for i in range(1, 11, 1):
    Books.append(sprite.Sprite('books/book'+str(i), (130*i-650) if i>5 else 130*i, 320 if i>5 else 120))
time.sleep(1)\n`
  return code;
};

Blockly.Python.forBlock['algorithm_all_books'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'ring=[0,0,0,0,0,0,0,0,0,0]\nn=6\nring[6]=1\n';
  var code = line1+"left=1\n"+"right=10\n";
  code += `sprite.clearAllSprites()
Books = [0]
for i in range(1, 11, 1):
    Books.append(sprite.Sprite('books/book'+str(i), (130*i-650) if i>5 else 130*i, 320 if i>5 else 120))
time.sleep(1)\n`
  return code;
};

Blockly.Python.forBlock['algorithm_first_book'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'res=1\n';
  var code = line1+"flag=ring[res]\n";
  code += `Books[res].filterBrighter()\ntime.sleep(0.1)\nBooks[res].filterOrigin()\n`;
  return code;
};

// Blockly.Python.forBlock['algorithm_no_ring'] = function() {
//   var code = "ring[i]==0";
//   return [code, Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.forBlock['algorithm_no_ring2'] = function() {
  var code = "flag==0";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_next_book'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "res+=1\nflag=ring[res]\n";
  code += `Books[res].filterBrighter()\ntime.sleep(0.1)\nBooks[res].filterOrigin()\n`;
  code = `Books[res].filterGray()\ntime.sleep(0.3)\n` + code;
  return code;
};

Blockly.Python.forBlock['algorithm_two_left'] = function() {
  var code = "right - left >= 1";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_divide_books'] = function() {  
  var code = "res = int((left + right) / 2)\n";
  return code;
};

Blockly.Python.forBlock['algorithm_get_half_books'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "flag = sum(ring[left:res+1])\n";
  code += `for i in range(left, res+1, 1):
    Books[i].filterBrighter()\n
time.sleep(0.3)
for i in range(left, res+1, 1):
    Books[i].filterOrigin()\n`;
  return code;
};

// Blockly.Python.forBlock['algorithm_check_half_books'] = function() {  
//   var code = "while ring[i]==0:\n    if i==mid:\n        flag=0\n        break\n    i+=1\n";
//   return code;
// };

Blockly.Python.forBlock['algorithm_delete_books'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "left = res+1\n";
  code += `for i in range(1, left, 1):
    Books[i].filterGray()
time.sleep(0.5)
res = left\n`
  return code;
};

Blockly.Python.forBlock['algorithm_delete_books2'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "right=res\n";
  code += `for i in range(right+1, len(ring)+1, 1):
    Books[i].filterGray()
time.sleep(0.5)
res = right\n`
  return code;
};

// Blockly.Python.forBlock['algorithm_print_book'] = function() {  
//   var code = "print(i)\n";
//   return code;
// };

Blockly.Python.forBlock['algorithm_print_book2'] = function() {  
  var code = "print('书号为：'+str(res))\n";
  code += `if res!=n:
    print('答案错误！请检查程序！')\n`
  return code;
};

// sub_algorithm_6

Blockly.Python.forBlock['algorithm_number_zero'] = function() {  
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "cnt=0\n";
  code += `cntText = sprite.Text('计数器：0', 30, 200)\n`
  return code;
};

Blockly.Python.forBlock['algorithm_number_add'] = function() {
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = "cnt+=1\n";
  code += `cntText.changeText('计数器：'+str(cnt))\n`
  return code;
};

Blockly.Python.forBlock['algorithm_print_number'] = function() {  
  var code = "print('计数器大小：'+str(cnt))\n";
  return code;
};

Blockly.Python.forBlock['algorithm_use_divide'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'ring=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]\n';
  var code = line1+`n=23\nleft=1\nright=len(ring)\nring[n]=1\n`;
  code += `sprite.clearAllSprites()
Books=[0]
for i in range(1, len(ring)+1, 1):
    Books.append(sprite.Sprite('books/book'+str(i%10 if i%10!=0 else 10), (20*i+60-660) if i>33 else 20*i+60, 320 if i>33 else 120))
time.sleep(1)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_use_sequence'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var line1 = 'ring=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]\n';
  var code = line1+"n=23\nring[n]=1\n";
  code += `sprite.clearAllSprites()
Books=[0]
for i in range(1, len(ring)+1, 1):
    Books.append(sprite.Sprite('books/book'+str(i%10 if i%10!=0 else 10), (20*i+60-660) if i>33 else 20*i+60, 320 if i>33 else 120))
time.sleep(1)\n`;
  return code;
};

// Blockly.Python.forBlock['algorithm_get_book_num'] = function() {  
//   var code = 'n='+this.getFieldValue('NUM')+'\n';
//   return code;
// };

// Blockly.Python.forBlock['algorithm_print_sequence'] = function() {  
//   var code = 'print("顺序法查找次数为：",cnt)';
//   return code;
// };

// Blockly.Python.forBlock['algorithm_print_divide'] = function() {  
//   var code = 'print("二分法查找次数为：",cnt)';
//   return code;
// };

// sub_algorithm_7

Blockly.Python.forBlock['algorithm_init_jttl'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `sprite.clearAllSprites()
_head = 10
_foot = 32
_footText = sprite.Text('脚的数量：', 20, 10)
_sprite = []\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_rabbit_zero'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `_rabbit = 0\n`;
  // code += `_sprite.append(sprite.Sprite('jttl/rabbit', len(_sprite)*130+130 if len(_sprite)<5 else len(_sprite)*130+130-650, 120 if len(_sprite)<5 else 320))\n`;
  code += `time.sleep(1)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_rabbit_number_in_range'] = function() {
  var code = `_rabbit < _head`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_chick_calculate'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `_chick = _head - _rabbit\n`;
  code += `for i in range(0, _chick, 1):
    _sprite.append(sprite.Sprite('jttl/chick', len(_sprite)*130+130 if len(_sprite)<5 else len(_sprite)*130+130-650, 120 if len(_sprite)<5 else 320))\n
time.sleep(0.5)
_footText.changeText('脚的数量：'+str(_rabbit*4 + _chick*2))
time.sleep(1)\n`
  return code;
};

Blockly.Python.forBlock['algorithm_check_feet'] = function() {
  var code = `_rabbit*4 + _chick*2 == _foot`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_print_jttl_answer'] = function() {
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `print('鸡的数量：'+str(_chick)+'只；\\n兔的数量：'+str(_rabbit)+'只。')\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_rabbit_add'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `_rabbit += 1\n`;
  code += `sprite.clearAllSprites()
_sprite = []
_footText = sprite.Text('脚的数量：', 20, 10)
for i in range(0, _rabbit, 1):
    _sprite.append(sprite.Sprite('jttl/rabbit', len(_sprite)*130+130 if len(_sprite)<5 else len(_sprite)*130+130-650, 120 if len(_sprite)<5 else 320))\n`
  code += `time.sleep(0.5)\n`;
  return code;
};

// sub_algorithm_8

Blockly.Python.forBlock['algorithm_init_fzsf'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = ``;
  code += `sprite.clearAllSprites()
sprite.createBackground('/fzsf/map_ck_xxjsjs')
_S1 = sprite.Sprite('/fzsf/S1',400,225,'S1')
_S2 = sprite.Sprite('/fzsf/S2',400,225,'S2')
_S3 = sprite.Sprite('/fzsf/S3',400,225,'S3')
_S4 = sprite.Sprite('/fzsf/S4',400,225,'S4')
_S1.hide()
_S2.hide()
_S3.hide()
_S4.hide()
_text_1 = sprite.Text('S1：',0,0,'text')
_text_2 = sprite.Text('S2：',0,30,'text2')
_text_3 = sprite.Text('S3：',0,60,'text3')
_text_4 = sprite.Text('S4：',0,90,'text4')
_position = [[60, 270], [240, 50], [260, 380], [440, 190], [730, 60], [700, 400]]
_Llen = [0, 170, 230, 100, 150, 10, 30, 50]
_Slen = [0, 0, 0, 0, 0]
_tag = [0, [0, 1, 3], [0, 2, 3], [3, 4, 5], [3, 5]]
bear = sprite.Sprite('mixbear',60,270,'bear')
bear.enlargeTo(80)
_pos = 0
time.sleep(1)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_fz_calc'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_PATHNAME = this.getFieldValue("PATHNAME");
  const calc = [0, [1, 3], [2, 4], [5, 7], [6]]
  const len = [0, 270, 380, 60, 30];
  var code = ``;
  code += `_S${FIELD_PATHNAME}.show()
time.sleep(1)\n`;
  if(FIELD_PATHNAME!=4) {
	code += `_Slen[${FIELD_PATHNAME}] = _Llen[${calc[FIELD_PATHNAME][0]}] + _Llen[${calc[FIELD_PATHNAME][1]}]
_text_${FIELD_PATHNAME}.changeText('S${FIELD_PATHNAME}：'+str(_Slen[${FIELD_PATHNAME}])+'m')
time.sleep(1)
_S${FIELD_PATHNAME}.hide()
time.sleep(1)\n`;
  } else {
	code += `_Slen[4] = _Llen[6]
_text_4.changeText('S4：'+str(_Slen[4])+'m')
time.sleep(1)
_S4.hide()
time.sleep(1)\n`;
  }
  return code;
};

Blockly.Python.forBlock['algorithm_fz_compare'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_PATHNAME = this.getFieldValue("PATHNAME");
  var FIELD_PATHNAME2 = this.getFieldValue("PATHNAME2");
  const len = [0, 270, 380, 60, 30];
  var code = ``;
  code += `_Slen[${FIELD_PATHNAME}] < _Slen[${FIELD_PATHNAME2}]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
// `if(_Slen[${FIELD_PATHNAME}]==0 or _Slen[${FIELD_PATHNAME2}]==0):
//     print('请先计算出长度再比较！程序有误！')
//     exit()
// _S${FIELD_PATHNAME}.show()
// time.sleep(0.5)
// _S${FIELD_PATHNAME}.hide()
// time.sleep(0.5)
// _S${FIELD_PATHNAME}.show()
// time.sleep(0.5)
// _S${FIELD_PATHNAME2}.show()
// time.sleep(0.5)
// _S${FIELD_PATHNAME2}.hide()
// time.sleep(0.5)
// _S${FIELD_PATHNAME2}.show()
// time.sleep(0.5)
// if(_Slen[${FIELD_PATHNAME}] < _Slen[${FIELD_PATHNAME2}]):
//     _S${FIELD_PATHNAME2}.hide()
//     _S${FIELD_PATHNAME}.show()
// else :
//     _S${FIELD_PATHNAME}.hide()
//     _S${FIELD_PATHNAME2}.show()
// time.sleep(1)
// _S${FIELD_PATHNAME}.hide()
// _S${FIELD_PATHNAME2}.hide()\n`;
  // return code;
};

Blockly.Python.forBlock['algorithm_fz_set_min'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_PATHNAME = this.getFieldValue("PATHNAME");
  var code = ``;
  code += `
_S1.hide()
_S2.hide()
_S3.hide()
_S4.hide()
_Smin = ${FIELD_PATHNAME}
_S${FIELD_PATHNAME}.show()
time.sleep(0.5)
_S${FIELD_PATHNAME}.hide()
time.sleep(0.5)
_S${FIELD_PATHNAME}.show()
time.sleep(1)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_fz_move'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = ``;
  code += `if(_pos == _tag[_Smin][0]):
    for i in range(1, len(_tag[_Smin]), 1):
        bear.slideTo(_position[_tag[_Smin][i]][0], _position[_tag[_Smin][i]][1], 1)
    _pos = _tag[_Smin][len(_tag[_Smin])-1]
else:
    print('移动错误！程序有误！')
    exit()
_S1.hide()
_S2.hide()
_S3.hide()
_S4.hide()
if(_pos == 5):
    print('成功抵达信息科技教室！')\n`;
  return code;
};

// sub_algorithm_9

Blockly.Python.forBlock['algorithm_init_hxdb'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = ``;
  code += `sprite.clearAllSprites()
sprite.createBackground('/hxdb/hxdbbg')
_soldier = []
_num = sprite.Text('目前士兵数量：0',0,0,'num')
_last = sprite.Text('剩余：0',500,0,'last')
_line = 3\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_hxdb_init_soldier'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_NUM = this.getFieldValue("NUM");
  var code = ``;
  code += `for i in range(0, ${FIELD_NUM}, 1):
    _soldier.append(sprite.Sprite('/hxdb/soldier', 30 + (len(_soldier)%_line)*50 + (len(_soldier)//(4*_line))*(_line+1)*50 +(len(_soldier)%3-2), 80+(len(_soldier)//_line)*100-(len(_soldier)//(4*_line))*4*100+(len(_soldier)%2)))
_num.changeText('目前士兵数量：'+str(len(_soldier)))\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_hxdb_stand_in_line'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_NAME = this.getFieldValue("NUM");
  var code = `for i in range(0, len(_soldier), 1):
    _soldier[i].slideTo(30 + (i%${FIELD_NAME})*50 + (i//(4*${FIELD_NAME}))*(${FIELD_NAME}+1)*50 +(i%3-2), 80+(i//${FIELD_NAME})*100-(i//(4*${FIELD_NAME}))*4*100+(i%2), 0.05)
_line = ${FIELD_NAME}
_last.changeText('剩余：'+str(len(_soldier)%_line))
time.sleep(2)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_hxdb_last_line'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var FIELD_NAME = this.getFieldValue("NUM");
  var code = `len(_soldier)%_line == ${FIELD_NAME}`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_hxdb_add'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `_num.changeText('目前士兵数量：'+str(len(_soldier)+1))
_last.changeText('剩余：')
time.sleep(0.5)
_soldier.append(sprite.Sprite('/hxdb/soldier', 30 + (len(_soldier)%_line)*50 + (len(_soldier)//(4*_line))*(_line+1)*50 +(len(_soldier)%3-2), 80+(len(_soldier)//_line)*100-(len(_soldier)//(4*_line))*4*100+(len(_soldier)%2)))
time.sleep(1)\n`;
  return code;
};

Blockly.Python.forBlock['algorithm_hxdb_result'] = function() {
  Blockly.Python.definitions_.import_time = "import time";
  Blockly.Python.definitions_.import_sprite = "import sprite";
  var code = `print('符合要求的士兵数量为：'+str(len(_soldier)))\n`;
  return code;
};

// others

Blockly.Python.forBlock['hanoi_init_offline'] = function() {
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

Blockly.Python.forBlock['algorithm_get_current_location'] = function() {
  var line1 = 'f = path[(len(path) - 1)]\n';
  var code = line1;
  return code;
};

Blockly.Python.forBlock['algorithm_void_path'] = function() {
  var code = "len(path)==0";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['algorithm_color_seclet'] = function() {
  var colour = this.getFieldValue('COLOR');
  var code = '"' + colour +'"'
  return [code, Blockly.Python.ORDER_ATOMIC];
};

