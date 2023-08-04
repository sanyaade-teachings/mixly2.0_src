'use strict';
goog.provide('Blockly.Blocks.game');
goog.require('Blockly.Blocks');

// Blockly.Blocks['game_init'] = {
//     init: function() {
//     this.appendDummyInput()
//     .appendField(Blockly.Msg.MIXLY_GAME_INIT);
//     this.setPreviousStatement(true); 
//     this.setNextStatement(true);
//     this.setColour(290);
//     this.setTooltip('');
//   } 
// };
//初始化地图为第1关
Blockly.Blocks['initSettedMap_1'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第一关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第2关
Blockly.Blocks['initSettedMap_2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第二关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第3关
Blockly.Blocks['initSettedMap_3'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第三关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第4关
Blockly.Blocks['initSettedMap_4'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第四关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第5关
Blockly.Blocks['initSettedMap_5'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第五关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第6关
Blockly.Blocks['initSettedMap_6'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第六关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

//初始化地图为第7关
Blockly.Blocks['initSettedMap_7'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("初始化地图为第七关")
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

Blockly.Blocks['game_init'] = {
  init: function () {
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
    this.appendStatementInput('DO0')
      .appendField(Blockly.Msg.MIXLY_GAME_INIT);
  }
};


Blockly.Blocks['move_direction_steps'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("向")
      .appendField(new Blockly.FieldDropdown([["东", '1'], ["南", '2'], ["西", '3'], ["北", '0']]), "direction");
    this.appendDummyInput()
      .appendField("移动");
    this.appendValueInput("times")
      .setCheck(Number)
    this.appendDummyInput()
      .appendField("步");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};
// Blockly.Blocks['move_direction'] = {
//       init: function() {
//       this.appendDummyInput()
//         .appendField("向")
//         .appendField(new Blockly.FieldDropdown([["东",'1'],["南",'2'],["西",'3'],["北",'0']]), "direction");
//       this.appendDummyInput()
//               .appendField("移动");
//       this.setInputsInline(true);
//       this.setPreviousStatement(true);
//       this.setNextStatement(true);
//       this.setColour(290);
//       this.setTooltip('');
//     }
//   };
// Blockly.Blocks['move_forward'] = {
//   init: function() {
//   this.appendDummyInput()
//       .appendField("向前移动");
//   this.setPreviousStatement(true);
//   this.setNextStatement(true);
//   this.setColour(290);
//   this.setTooltip('');
// }
// };


// Blockly.Blocks.move_backward= {
//   init: function() {
//     this.appendDummyInput()
//           .appendField(Blockly.Msg.MIXLY_GAME_MOVE_BACKWARD);
//   this.setPreviousStatement(true, null);
//   this.setNextStatement(true, null);
//   this.setColour(290);
//   this.setTooltip('');
//   this.setHelpUrl('');
//   }
// };

Blockly.Blocks.Turn = {
  init: function () {
    var Directions =
      [[Blockly.Msg.MIXLY_GAME_Turn_LEFT, 'left'],
      [Blockly.Msg.MIXLY_GAME_Turn_RIGHT, 'right']];
    this.appendDummyInput()
      .appendField(Blockly.Msg.MIXLY_GAME_TURN1)
      .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
      .appendField(Blockly.Msg.MIXLY_GAME_TURN2);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.isDone = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MIXLY_GAME_ISDONE);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.isPath = {
  init: function () {
    var Directions =
      [[Blockly.Msg.MIXLY_GAME_ISPATH_LEFT, 'left'],
      [Blockly.Msg.MIXLY_GAME_ISPATH_RIGHT, 'right']];
    this.appendDummyInput()
      .appendField(Blockly.Msg.MIXLY_GAME_ISPATH1)
      .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
      .appendField(Blockly.Msg.MIXLY_GAME_ISPATH2);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

//最新块
Blockly.Blocks.set_map = {
  init: function () {
    // this.appendDummyInput()
    //     .appendField("设置地图：长");
    this.appendValueInput("x")
      .setCheck(Number)
      .appendField("设置地图,长为:");
    this.appendValueInput("y")
      .setCheck(Number)
      .appendField("宽为:");
    this.appendValueInput("startPos")
      .setCheck(null)
      .appendField("，起点坐标");
    this.appendValueInput("endPos")
      .setCheck(null)
      .appendField("终点坐标");
    this.appendValueInput("background")
      .setCheck(null)
      .appendField("背景");
    // this.appendDummyInput()
    //     .appendField("，背景")
    //     .appendField(new Blockly.FieldDropdown([["背景1","3"],["背景2","4"]]), "bg");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.game_get_local_img = {
  init: function () {
    this.imgArr = this.getLocalImg();
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function () {
    let typeValue = this.getFieldValue("type");
    //let newImgArr = this.getLocalImg();
    let newImgArr = this.imgArr;
    if (this.haveNewSrc(this.imgArr, newImgArr)) {
      this.imgArr = newImgArr;
      var typeField = this.getField("type");
      typeField.menuGenerator_ = this.imgArr;
      if (this.checkSrc(typeValue, this.imgArr)) {
        this.setFieldValue(typeValue, "type");
      } else {
        this.setFieldValue(this.imgArr[0][1], "type");
      }
    }
  },
  haveNewSrc: function (oldArr, newArr) {
    if (oldArr.length !== newArr.length) return true;
    for (var i = 0; i < oldArr.length; i++) {
      if (oldArr[i][0].src !== newArr[i][0].src) {
        return true;
      }
    }
    return false;
  },
  checkSrc: function (newSrc, srcArr) {
    for (var i = 0; i < srcArr.length; i++) {
      if (srcArr[i][0].src == newSrc) {
        return true;
      }
    }
    return false;
  },
  getLocalImg: function () {
    let imgArr = [];
    try {
      // let imgDirPath = MixlyEnv.clientPath + "/mixpyBuild/maps/";///改图片路径
      // if (nodeFs.existsSync(imgDirPath)) {
      //   let imgDirArr = nodeFs.readdirSync(imgDirPath);
      //   for (let i = 0; i < imgDirArr.length; i++) {
      //     let imgPathToLowerCase = imgDirArr[i].toLowerCase();
      //     if (imgPathToLowerCase.indexOf(".png") != -1 
      //      || imgPathToLowerCase.indexOf(".jpg") != -1
      //      || imgPathToLowerCase.indexOf(".ico") != -1) {
      //       let dropdownItem = {};
      //       dropdownItem.src = MixlyEnv.clientPath + "/mixpyBuild/maps/" + imgDirArr[i];
      //       let dimensions = imagesize("mixpyBuild/maps/" + imgDirArr[i]);
      //       dropdownItem.width = 40;
      //       dropdownItem.height = dimensions.height*40/dimensions.width;
      //       dropdownItem.alt = "*";
      //       let dropdownArr = [];
      //       dropdownArr.push(dropdownItem);
      //       let dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
      //       dropdownData = '\'' + dropdownData + '\'';
      //       dropdownArr.push(dropdownData);
      //       imgArr.push(dropdownArr);
      //     }
      //   }
      // }
      var imgDirArr = ["bg_default.png", "bg_astro.png", "bg_panda.jpg"]
      for (var i = 0; i < imgDirArr.length; i++) {
        var dropdownItem = {};
        dropdownItem.src = "./media/mixpyBuild/maps/" + imgDirArr[i];
        dropdownItem.width = 40;
        dropdownItem.height = 45;
        if (imgDirArr[i] == "") {
          dropdownItem.alt = "无";
        } else {
          dropdownItem.alt = "*";
        }
        var dropdownArr = [];
        dropdownArr.push(dropdownItem);
        var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
        dropdownData = '\'' + dropdownData + '\'';
        dropdownArr.push(dropdownData);
        imgArr.push(dropdownArr);
      }
    } catch (e) {
      console.log(e);
      imgArr = [["'无可用地图'", "'无可用地图'"]];
    }
    if (imgArr.length > 0) {
      return imgArr;
    } else {
      return [["'无可用地图'", "'无可用地图'"]];
    }
  }
};


Blockly.Blocks.set_pathtype = {
  init: function () {
    this.appendValueInput("pathtype")
      .setCheck(null)
      .appendField("设置路径样式为");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.game_get_path_img = {
  init: function () {
    this.imgArr = this.getLocalImg();
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function () {
    let typeValue = this.getFieldValue("type");
    //let newImgArr = this.getLocalImg();
    let newImgArr = this.imgArr;
    if (this.haveNewSrc(this.imgArr, newImgArr)) {
      this.imgArr = newImgArr;
      var typeField = this.getField("type");
      typeField.menuGenerator_ = this.imgArr;
      if (this.checkSrc(typeValue, this.imgArr)) {
        this.setFieldValue(typeValue, "type");
      } else {
        this.setFieldValue(this.imgArr[0][1], "type");
      }
    }
  },
  haveNewSrc: function (oldArr, newArr) {
    if (oldArr.length !== newArr.length) return true;
    for (var i = 0; i < oldArr.length; i++) {
      if (oldArr[i][0].src !== newArr[i][0].src) {
        return true;
      }
    }
    return false;
  },
  checkSrc: function (newSrc, srcArr) {
    for (var i = 0; i < srcArr.length; i++) {
      if (srcArr[i][0].src == newSrc) {
        return true;
      }
    }
    return false;
  },
  getLocalImg: function () {
    let imgArr = [];
    try {
      // let imgDirPath = MixlyEnv.clientPath + "/mixpyBuild/path/";///改图片路径
      // if (nodeFs.existsSync(imgDirPath)) {
      //   let imgDirArr = nodeFs.readdirSync(imgDirPath);
      //   for (let i = 0; i < imgDirArr.length; i++) {
      //     let imgPathToLowerCase = imgDirArr[i].toLowerCase();
      //     if (imgPathToLowerCase.indexOf(".png") != -1 
      //      || imgPathToLowerCase.indexOf(".jpg") != -1
      //      || imgPathToLowerCase.indexOf(".ico") != -1) {
      //       let dropdownItem = {};
      //       dropdownItem.src = MixlyEnv.clientPath + "/mixpyBuild/path/" + imgDirArr[i];
      //       let dimensions = imagesize("mixpyBuild/path/" + imgDirArr[i]);
      //       dropdownItem.width = 40;
      //       dropdownItem.height = dimensions.height*40/dimensions.width;
      //       dropdownItem.alt = "*";
      //       let dropdownArr = [];
      //       dropdownArr.push(dropdownItem);
      //       let dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
      //       dropdownData = '\'' + dropdownData + '\'';
      //       dropdownArr.push(dropdownData);
      //       imgArr.push(dropdownArr);
      //     }
      //   }
      // }
      var imgDirArr = ["default.png", "bamboo.png", "pipeline.png"]
      for (var i = 0; i < imgDirArr.length; i++) {
        var dropdownItem = {};
        dropdownItem.src = "./media/mixpyBuild/path/" + imgDirArr[i];
        dropdownItem.width = 40;
        dropdownItem.height = 45;
        dropdownItem.alt = "*";
        var dropdownArr = [];
        dropdownArr.push(dropdownItem);
        var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
        dropdownData = '\'' + dropdownData + '\'';
        dropdownArr.push(dropdownData);
        imgArr.push(dropdownArr);
      }
    } catch (e) {
      console.log(e);
      imgArr = [["'无可用路径'", "'无可用路径'"]];
    }
    if (imgArr.length > 0) {
      return imgArr;
    } else {
      return [["'无可用路径'", "'无可用路径'"]];
    }
  }
};

Blockly.Blocks.place_item = {
  init: function () {
    this.setColour(290);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("posx")
      .setCheck(null)
      .appendField("在(");
    this.appendDummyInput()
      .appendField(',');
    this.appendValueInput("posy")
      .setCheck(null)
      .appendField("");
    this.appendDummyInput()
      .appendField(')放置')
      .appendField(new Blockly.FieldDropdown([["障碍", "'wall'"], ["金币", "'coin'"]]), "item");
    this.setTooltip('');
  }
};

Blockly.Blocks.game_get_character_img = {
  init: function () {
    this.imgArr = this.getLocalImg();
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function () {
    let typeValue = this.getFieldValue("type");
    //let newImgArr = this.getLocalImg();
    let newImgArr = this.imgArr;
    if (this.haveNewSrc(this.imgArr, newImgArr)) {
      this.imgArr = newImgArr;
      var typeField = this.getField("type");
      typeField.menuGenerator_ = this.imgArr;
      if (this.checkSrc(typeValue, this.imgArr)) {
        this.setFieldValue(typeValue, "type");
      } else {
        this.setFieldValue(this.imgArr[0][1], "type");
      }
    }
  },
  haveNewSrc: function (oldArr, newArr) {
    if (oldArr.length !== newArr.length) return true;
    for (var i = 0; i < oldArr.length; i++) {
      if (oldArr[i][0].src !== newArr[i][0].src) {
        return true;
      }
    }
    return false;
  },
  checkSrc: function (newSrc, srcArr) {
    for (var i = 0; i < srcArr.length; i++) {
      if (srcArr[i][0].src == newSrc) {
        return true;
      }
    }
    return false;
  },
  getLocalImg: function () {
    let imgArr = [];
    try {
      // let imgDirPath = MixlyEnv.clientPath + "/mixpyBuild/characters/";///改图片路径
      // let imgDirPath = "../media/mixpyBuild/characters/";///改图片路径
      // console.log(imgDirPath)
      // if (nodeFs.existsSync(imgDirPath)) {
      //   let imgDirArr = nodeFs.readdirSync(imgDirPath);
      //   for (let i = 0; i < imgDirArr.length; i++) {
      //     let imgPathToLowerCase = imgDirArr[i].toLowerCase();
      //     if (imgPathToLowerCase.indexOf(".png") != -1 
      //      || imgPathToLowerCase.indexOf(".jpg") != -1
      //      || imgPathToLowerCase.indexOf(".ico") != -1) {
      //       let dropdownItem = {};
      //       // dropdownItem.src = MixlyEnv.clientPath + "/mixpyBuild/characters/" + imgDirArr[i];
      //       dropdownItem.src = "../media/mixpyBuild/characters/" + imgDirArr[i];
      //       let dimensions = imagesize("mixpyBuild/characters/" + imgDirArr[i]);
      //       dropdownItem.width = 40;
      //       dropdownItem.height = dimensions.height*40/dimensions.width;
      //       dropdownItem.alt = "*";
      //       let dropdownArr = [];
      //       dropdownArr.push(dropdownItem);
      //       let dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
      //       dropdownData = '\'' + dropdownData + '\'';
      //       dropdownArr.push(dropdownData);
      //       imgArr.push(dropdownArr);
      //     }
      //   }
      // }
      var imgDirArr = ["pegman.png", "astro.png", "panda.png", "robot.png"]
      for (var i = 0; i < imgDirArr.length; i++) {
        var dropdownItem = {};
        dropdownItem.src = "./media/mixpyBuild/characters/" + imgDirArr[i];
        dropdownItem.width = 40;
        dropdownItem.height = 45;
        dropdownItem.alt = "*";
        var dropdownArr = [];
        dropdownArr.push(dropdownItem);
        var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
        dropdownData = '\'' + dropdownData + '\'';
        dropdownArr.push(dropdownData);
        imgArr.push(dropdownArr);
      }


    } catch (e) {
      console.log(e);
      imgArr = [["'无可用角色'", "'无可用角色'"]];
    }
    if (imgArr.length > 0) {
      return imgArr;
    } else {
      return [["'无可用角色'", "'无可用角色'"]];
    }
  }
};


Blockly.Blocks.initialize = {
  init: function () {
    this.setColour(290);
    this.appendValueInput("character")
      .setCheck(null)
      .appendField("初始化角色为");
    this.appendDummyInput()
      // .appendField('初始化角色为')
      // .appendField(new Blockly.FieldDropdown([["默认⼩⼈","0"],["熊猫","1"],["宇航员","2"],["机器⼈","3"]]), "character")
      .appendField('面朝')
      .appendField(new Blockly.FieldDropdown([["北", "0"], ["南", "2"], ["西", "3"], ["东", "1"]]), "direction");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.get_actor_point = {
  init: function () {
    this.setColour(290);
    this.appendDummyInput()
      .appendField('获取⻆⾊所获分数');
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.isBarrier = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["北", "0"], ["南", "2"], ["西", "3"], ["东", "1"]]), "direction");
    this.appendDummyInput()
      .appendField('侧有障碍');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['randomOil'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("随机生成小车油量");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

Blockly.Blocks.isOilFull = {
  init: function () {
    this.appendDummyInput()
      .appendField('需要加油');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.isLightGreen = {
  init: function () {
    this.appendDummyInput()
      .appendField('信号灯为绿灯');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks.isLightRed = {
  init: function () {
    this.appendDummyInput()
      .appendField('信号灯为红灯');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['addOil'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("进加油站加油");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

Blockly.Blocks['isCirculationRight'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("检查程序循环数目是否正确");
    this.setPreviousStatement(true);
    this.setColour(290);
    this.setTooltip('');
  }
};

(() => {
  const blockList = [
    {
      // name: 'game_block0',
      data: 'B'
    }, {
      data: 'B1'
    }, {
      data: 'B2'
    }, {
      data: '取下一本书'
    }, {
      data: '输出书号'
    }, {
      data: '二分'
    }, {
      data: '取出前一堆书'
    }, {
      data: '删除前一堆书'
    }, {
      data: '删除后一堆书'
    }, {
      data: '输出计数器大小'
    }, {
      data: '显示路线'
    }, {
      data: '将当前位置设置为学校'
    }, {
      data: '将路线增加当前位置'
    }, {
      data: '将路线减少当前位置'
    }, {
      data: '将当前位置设置为这条通向同学家的路'
    }, {
      data: '回退到上一个位置'
    }, {
      data: '将当前位置加入路线'
    }, {
      data: '将当前位置移出路线'
    }, {
      data: '移动到距离当前位置最近的岔路口'
    }, {
      data: '输出没有符合条件的路线'
    }, {
      data: '将当前位置加入路线'
    }, {
      data: '将当前位置移出路线'
    }
  ];


  blockList.forEach((value, index) => {
    const blockName = 'game_block' + index;
    Blockly.Blocks[blockName] = {
      init: function () {
        this.appendDummyInput()
            .appendField(value.data);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    Blockly.Python.forBlock['blockName]'] = function () {
      var code = '';
      return code;
    };
  });
})();