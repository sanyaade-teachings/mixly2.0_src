import Python from '../../python/python_generator';

export const me_g1_aht11 = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_ahtx0.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const me_g1_hp203 = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_hp203x.' + key;
    return [code, Python.ORDER_ATOMIC];
};

export const me_g1_varistor = function () {
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.varistor()';
    return [code, Python.ORDER_ATOMIC];
};

export const me_g1_rfid_readid = function () {
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.read_card(0, x="id")';
    return [code, Python.ORDER_ATOMIC];
};

export const me_g1_rfid_readcontent = function () {
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.read_card(' + sector + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const me_g1_rfid_write = function () {
    var sector = Python.valueToCode(this, 'SECTOR', Python.ORDER_ATOMIC);
    var cnt = Python.valueToCode(this, 'CONTENT', Python.ORDER_ATOMIC);
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.write_card(' + cnt + ',' + sector + ')\n';
    return code;
};

export const me_g1_rfid_status = function () {
    var key = this.getFieldValue('key');
    Python.definitions_['import_me_g1'] = 'import me_g1';
    var code = 'me_g1.ext_rc522.scan_card()==' + key;
    return [code, Python.ORDER_ATOMIC];
};