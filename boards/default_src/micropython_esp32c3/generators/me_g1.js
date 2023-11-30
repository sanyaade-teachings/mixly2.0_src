import * as Blockly from 'blockly/core';

export const me_g1_aht11 = function () {
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_ahtx0.' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const me_g1_hp203 = function () {
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_hp203x.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const me_g1_varistor = function () {
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.varistor()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const me_g1_rfid_readid = function () {
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.read_card(0, x="id")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const me_g1_rfid_readcontent = function () {
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.read_card(' + sector + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

export const me_g1_rfid_write = function () {
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.write_card(' + cnt + ',' + sector + ')\n';
    return code;
};

export const me_g1_rfid_status = function () {
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.scan_card()==' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};