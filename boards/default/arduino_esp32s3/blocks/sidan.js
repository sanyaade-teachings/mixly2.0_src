'use strict';

goog.provide('Blockly.Blocks.Handbit');
goog.require('Blockly.Blocks');
Blockly.Msg['HANDBIT_HUE'] = 65;

profile["default"] = profile["esp32_handbit"];

Blockly.Msg.Lang.TURN_OFF_BLUETOOTH_TO_CONNECT = "关闭蓝牙可连接";
Blockly.Msg.Lang.TURN_ON_BLUETOOTH_TO_CONNECT = "打开蓝牙可连接";
Blockly.Msg.Lang.RANGE_0 = "范围0-30";
Blockly.Msg.Lang.HSC025A_CONTROL_INSTRUCTION = "HSC025A控制指令";
Blockly.Msg.Lang.HSC025A_DESIGNATED_PLAYBACK = "HSC025A指定播放";
Blockly.Msg.Lang.HSC025A_DESIGNATED_PLAYBACK1 = "HSC025A指定播放歌曲名0000-0255";
Blockly.Msg.Lang.HSC025A_VOLUME_IS_SET_TO = "HSC025A音量设置为";
Blockly.Msg.Lang.BLUETOOTH_ON = "蓝牙开启";
Blockly.Msg.Lang.BLUETOOTH_OFF = "蓝牙关闭";
Blockly.Msg.Lang.MUTE = "静音";
Blockly.Msg.Lang.RESTORE_SOUND = "恢复声音";
Blockly.Msg.Lang.STANDBY = "待机";
Blockly.Msg.Lang.BOOT = "开机";
Blockly.Msg.Lang.PLAY_PAUSE = "播放/暂停";
Blockly.Msg.Lang.SHUTDOWN = "关机";
Blockly.Msg.Lang.SD_CARD_MODE = "SD卡模式";
Blockly.Msg.Lang.BLUETOOTH_MODE = "蓝牙模式";
Blockly.Msg.Lang.RESET = "恢复出厂设置";
Blockly.Msg.Lang.STOP_PLAYING = "放完停止";
Blockly.Msg.Lang.BLUETOOTH_CONNECT = "蓝牙回连";
Blockly.Msg.Lang.MATH_DEC_MODE = "方式";
Blockly.Msg.Lang.REQUEST_SUCCEEDED = "请求成功";
Blockly.Msg.Lang.MIXLY_FAILED = "请求失败";
Blockly.Msg.Lang.MODE_SWITCH = "模式切换";
//HSC025A 蓝牙MP3指令
var hsc025a_mode = [
[Blockly.Msg.Lang.MODE_SWITCH, "1"],
[Blockly.Msg.Lang.MIXLY_MP3_PLAY, "2"],
[Blockly.Msg.Lang.MIXLY_MP3_PAUSE, "3"],
[Blockly.Msg.Lang.MIXLY_MP3_NEXT, "4"],
[Blockly.Msg.Lang.MIXLY_MP3_PREV, "5"],
[Blockly.Msg.Lang.MIXLY_MP3_VOL_UP, "6"],
[Blockly.Msg.Lang.MIXLY_MP3_VOL_DOWN, "7"],
[Blockly.Msg.Lang.STANDBY, "8"],
[Blockly.Msg.Lang.BOOT, "9"],
[Blockly.Msg.Lang.PLAY_PAUSE, "10"],
[Blockly.Msg.Lang.MIXLY_MICROBIT_Stop_music, "11"],
[Blockly.Msg.Lang.SHUTDOWN, "12"],
[Blockly.Msg.Lang.SD_CARD_MODE, "13"],
[Blockly.Msg.Lang.BLUETOOTH_MODE, "14"],
[Blockly.Msg.Lang.RESET , "15"],
[Blockly.Msg.Lang.STOP_PLAYING, "16"],
[Blockly.Msg.Lang.BLUETOOTH_CONNECT, "17"],
[Blockly.Msg.Lang.TURN_OFF_BLUETOOTH_TO_CONNECT, "18"],
[Blockly.Msg.Lang.TURN_ON_BLUETOOTH_TO_CONNECT, "19"],
[Blockly.Msg.Lang.BLUETOOTH_ON, "20"],
[Blockly.Msg.Lang.BLUETOOTH_OFF, "21"],
[Blockly.Msg.Lang.MUTE, "22"],
[Blockly.Msg.Lang.RESTORE_SOUND , "23"]
];

Blockly.Blocks['hsc025a_instruction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Lang.HSC025A_CONTROL_INSTRUCTION )
        .appendField(new Blockly.FieldDropdown(hsc025a_mode), "instruction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//指定播放歌曲
Blockly.Blocks['hsc025a_play'] = {
  init: function() {
    this.appendValueInput("num")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.HSC025A_DESIGNATED_PLAYBACK);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
 this.setTooltip(Blockly.Msg.Lang.HSC025A_DESIGNATED_PLAYBACK1);
 this.setHelpUrl("");
  }
};

//音量设置
Blockly.Blocks['hsc025a_volume'] = {
  init: function() {
    this.appendValueInput("num")
        .setCheck(null)
        .appendField(Blockly.Msg.Lang.HSC025A_VOLUME_IS_SET_TO);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['ACTUATOR_HUE']);
 this.setTooltip(Blockly.Msg.Lang.RANGE_0);
 this.setHelpUrl("");
  }
};