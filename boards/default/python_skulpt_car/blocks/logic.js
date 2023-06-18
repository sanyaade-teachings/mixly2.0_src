'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Msg');

Blockly.Msg["LOGIC_HUE"] = 210;

(() => {
    const blockList = [
        {
            // name: 'logic_block0',
            data: 'A'
        }, {
            data: 'A1'
        }, {
            data: 'A2'
        }, {
            data: '门铃没响?'
        }, {
            data: '书架上剩余两本及以上'
        }, {
            data: '所有同学都被送回家啦'
        }, {
            data: '从当前位置有路直接通向未送走的同学家'
        }, {
            data: '这条路之前未尝试过'
        }, {
            data: '路线为空'
        }, {
            data: '没到小技家'
        }, {
            data: '当前位置是学校'
        }
    ];


    blockList.forEach((value, index) => {
        const blockName = 'logic_block' + index;
        Blockly.Blocks[blockName] = {
            init: function () {
                this.appendDummyInput()
                    .appendField(value.data);
                this.setOutput(true, null);
                this.setColour(Blockly.Msg["LOGIC_HUE"]);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        };
        Blockly.Python.forBlock[blockName] = function () {
            var code = '';
            return [code, Blockly.Python.ORDER_ATOMIC];
        };
    });
})();