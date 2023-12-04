import Python from '../python_generator';

export const storage_open_file_with_os = function () {
    Python.definitions_['import_os'] = 'import os';
    var fn = Python.valueToCode(this, 'fn', Python.ORDER_ATOMIC);
    return "os.startfile(" + fn + ")\n";
}

export const storage_fileopen = function () {
    // For each loop.
    var variable0 = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var fn = Python.valueToCode(this, 'FILENAME', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = variable0 + ' = open(' + fn + ', \'' + mode + '\')\n';
    return code;
};

export const storage_fileopen_new = function () {  // For each loop.

    var fn = Python.valueToCode(this, 'FILENAME', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = 'open(' + fn + ', \'' + mode + '\')';
    return [code, Python.ORDER_ATOMIC];
};

export const storage_fileopen_new_encoding = function () {  // For each loop.

    var fn = Python.valueToCode(this, 'FILENAME', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var encode = this.getFieldValue('CODE');
    var code = 'open(' + fn + ', \'' + mode + '\', encoding="' + encode + '")';
    return [code, Python.ORDER_ATOMIC];
};


export const storage_file_write = function () {
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    return file + ".write(" + data + ")\n";
}

export const storage_get_contents_without_para = function () {
    var mode = this.getFieldValue('MODE');
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = file + '.' + mode + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const storage_get_contents = function () {
    var mode = this.getFieldValue('MODE');
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'SIZE', Python.ORDER_ATOMIC);
    var code = file + '.' + mode + '(' + size + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const storage_get_a_line = function () {
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'SIZE', Python.ORDER_ATOMIC);
    var code = file + ".readline(" + size + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const storage_can_write_ornot = function () {
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = file + ".writable()";
    return [code, Python.ORDER_ATOMIC];
};

export const storage_get_filename = function () {
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = file + ".name()";
    return [code, Python.ORDER_ATOMIC];
};

export const storage_close_file = function () {
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = file + ".close()\n";
    return code;
};

export const storage_list_all_files = function () {
    Python.definitions_['import_os'] = 'import os';
    var code = 'os.listdir()';
    return [code, Python.ORDER_ATOMIC];
}

export const storage_delete_file = function () {
    Python.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "os." + mode + "(" + file + ")\n";
    return code;
};

export const storage_get_file_size = function () {
    Python.definitions_['import_os'] = 'import os';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "os.path.getsize(" + file + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const storage_file_tell = function () {
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = file + ".tell()";
    return [code, Python.ORDER_ATOMIC];
};

export const storage_file_seek = function () {
    var mode = this.getFieldValue('MODE');
    var mode_num = 0;
    if (mode == 'start') {
        mode_num = 0;
    }
    else if (mode == 'current') {
        mode_num = 1;
    }
    else {
        mode_num = 2;
    }
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'SIZE', Python.ORDER_ATOMIC);
    var code = file + '.seek(' + size + ',' + mode_num + ')\n';
    return code;
};

export const storage_change_dir = function () {
    Python.definitions_['import_os'] = 'import os';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "os.chdir(" + file + ")\n";
    return code;
};

export const storage_get_current_dir = function () {
    Python.definitions_['import_os'] = 'import os';
    var code = 'os.getcwd()';
    return [code, Python.ORDER_ATOMIC];
}

export const storage_make_dir = function () {
    Python.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var path = Python.valueToCode(this, 'PATH', Python.ORDER_ATOMIC);
    var code = 'os.' + mode + '(' + path + ')\n';
    return code;
};

export const storage_rename = function () {
    Python.definitions_['import_os'] = 'import os';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var file1 = Python.valueToCode(this, 'NEWFILE', Python.ORDER_ATOMIC);
    var code = "os.rename(" + file + "," + file1 + ")\n";
    return code;
};

export const storage_is_file = function () {
    Python.definitions_['import_os'] = 'import os';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = "os." + mode + "(" + file + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const sdcard_use_spi_init = function () {
    Python.definitions_['import_os'] = 'import os';
    Python.definitions_['import_sdcard'] = 'import sdcard';
    var v = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var sv = Python.valueToCode(this, 'SPISUB', Python.ORDER_ATOMIC);
    var pv = Python.valueToCode(this, 'PINSUB', Python.ORDER_ATOMIC);
    var code = v + ' = sdcard.SDCard(' + sv + ',' + pv + ')\n';
    return code;
};

export const sdcard_mount = function () {
    Python.definitions_['import_os'] = 'import os';
    Python.definitions_['import_sdcard'] = 'import sdcard';
    var sd = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var dir = Python.valueToCode(this, 'DIR', Python.ORDER_ATOMIC);
    return "os.mount(" + sd + ',' + dir + ")\n";
}
