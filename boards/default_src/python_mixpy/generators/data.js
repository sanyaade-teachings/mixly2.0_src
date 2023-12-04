import * as Blockly from 'blockly/core';
import Python from '../../python/python_generator';

export const series_create = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName1 = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.Series(' + varName1 + ')\n';
    return code;
};

export const series_create_from_index = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName1 = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var varName2 = Python.valueToCode(this, 'INDEX', Python.ORDER_ATOMIC) || '\'\'';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.Series(' + varName1 + ',' + 'index=' + varName2 + ')\n';
    return code;
};

export const dataframe_create = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName1 = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ')\n';
    return code;

};

export const dataframe_create_from_index = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName1 = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var varName2 = Python.valueToCode(this, 'INDEX_COLUMN', Python.ORDER_ATOMIC) || '\'\'';
    var varName3 = Python.valueToCode(this, 'INDEX_RAW', Python.ORDER_ATOMIC) || '\'\'';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ',' + 'columns=' + varName2 + ',index=' + varName3 + ')\n';
    return code;

};

export const dataframe_create_from_one_index = function () {
    Python.definitions_.import_pandas = "import pandas";
    var name = this.getFieldValue('COLUMN_RAW');
    var varName1 = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var varName2 = Python.valueToCode(this, 'INDEX', Python.ORDER_ATOMIC) || '\'\'';
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ',' + name + '=' + varName2 + ')\n';
    return code;

};

export const series_create_from_text = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName = Python.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);

    var text = this.getFieldValue('TEXT');
    var code = varName + ' = ' + 'pandas.Series([' + text + '])\n';
    return code;
};

export const series_index_value = function () {
    Python.definitions_.import_pandas = "import pandas";
    var varName = Python.valueToCode(this, 'SERIES', Python.ORDER_ASSIGNMENT) || '0';
    var name = this.getFieldValue('INDEX_VALUE');
    var code = varName + '.' + name;
    return [code, Python.ORDER_ATOMIC];
};

export const series_get_num = function () {
    // Indexing into a list is the same as indexing into a string.
    var varName = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var argument0 = Python.valueToCode(this, 'AT',
        Python.ORDER_ADDITIVE) || '1';

    var code = varName + '[' + argument0 + ']';
    return [code, Python.ORDER_ATOMIC];
};


export const pl_show = function () {
    Python.definitions_.import_pylab = "import pylab";
    var code = 'pylab.show()\n';
    return code;
};

export const pl_axes = function () {
    Python.definitions_.import_pylab = "import pylab";
    var code = 'pylab.axes(aspect=1)\n';
    return code;
};

export const pl_plot_easy = function () {
    Python.definitions_.import_pylab = "import pylab";
    var varName = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'pylab.plot(' + varName + ")\n";
    return code;
};

export const pl_plot = function () {
    Python.definitions_.import_pylab = "import pylab";
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var varName = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'pylab.plot(' + varName + ",'" + dot + line + color + "')\n";
    return code;
};

export const pl_legend = function () {
    Python.definitions_.import_pylab = "import pylab";
    Python.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
    var code = 'pylab.legend(' + 'prop=matplotlib.font_manager.FontProperties("' + "STSong" + '")' + ')\n';
    return code;
};

export const pl_title = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'TITLE', Python.ORDER_ATOMIC);
    var code = 'pylab.title(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
};

export const pl_label = function () {
    Python.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'LABEL', Python.ORDER_ATOMIC);
    var code = 'pylab.' + direction + 'label(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
};


export const array_create = function () {
    Python.definitions_.import_numpy = "import numpy";
    var from = Python.valueToCode(this, "FROM", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "TO", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "STEP", Python.ORDER_NONE) || "1";
    var code = "numpy.arange(" + from + ", " + end + ", " + step + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const pl_plot_bar = function () {
    Python.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.' + direction + '(' + a + ',' + b + ")\n";
    return code;
};

export const pl_plot_scatter = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var s = Python.valueToCode(this, 'S', Python.ORDER_ATOMIC) || '\'\'';
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.scatter(' + a + ',' + b + ",s=" + s + ",c='" + color + "',marker='" + dot + "',label=" + tag + ")\n";
    return code;
};

export const pl_plot_xy = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.plot(' + a + ',' + b + ",'" + dot + line + color + "'" + ',label=' + tag + ")\n";
    return code;
};

export const pl_bar = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var width = Python.valueToCode(this, 'WIDTH', Python.ORDER_RELATIONAL) || '0';
    var color = this.getFieldValue('COLOR')
    var align = this.getFieldValue('ALIGN');
    var code = 'pylab.bar(' + a + ',' + b + ',align="' + align + '",color="' + color + '",width=' + width + ',label=' + tag + ")\n";
    return code;
};

export const pl_pie = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var explode = Python.valueToCode(this, 'EXPLODE', Python.ORDER_ATOMIC) || '\'\'';
    var shadow = this.getFieldValue('SHADOW');
    var autopct = this.getFieldValue('autopct');
    if (autopct != 'None') { autopct = "'" + autopct + "'" }
    var code = 'pylab.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct + ',shadow=' + shadow + ")\n";
    return code;
};

export const pl_hist = function () {
    Python.definitions_.import_pylab = "import pylab";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.hist(' + a + ',' + b + ")\n";
    return code;
};


export const pl_ticks = function () {
    Python.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.' + direction + 'ticks(' + a + ',' + b + ",fontproperties = '" + "STSong" + "')\n";
    return code;
};

export const numpy_trig = function () {
    Python.definitions_.import_numpy = "import numpy";
    var argument0 = Python.valueToCode(this, 'NUM', Python.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = "";

    code = "numpy." + operator + '(' + argument0 + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const pl_subplot = function () {
    Python.definitions_.import_numpy = "import numpy";
    var from = Python.valueToCode(this, "VET", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "HOR", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "NUM", Python.ORDER_NONE) || "0";
    var code = "pylab.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
};

export const pandas_readcsv = function () {
    // For each loop.
    Python.definitions_.import_pandas = "import pandas";
    var fn = Python.valueToCode(this, 'FILENAME', Python.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = 'pandas.read_csv(' + fn + ', header=' + mode + ')\n';
    return [code, Python.ORDER_ATOMIC];
};

export const dataframe_get = function () {
    var mode = this.getFieldValue('MODE');
    var varName = Python.valueToCode(this, 'DICT', Python.ORDER_ASSIGNMENT) || '0';
    var text = Python.valueToCode(this, 'KEY', Python.ORDER_ASSIGNMENT);
    if (mode == "column") {
        var code = varName + "[" + text + "]";
    }
    else if (mode == 'raw') {
        var code = varName + ".loc[" + text + "]";
    }
    return [code, Python.ORDER_ATOMIC];
};

export const pl_savefig = function () {
    Python.definitions_.import_pylab = "import pylab";
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "pylab.savefig(" + file + ")\n";
    return code;
};

export const pl_text = function () {
    Python.definitions_.import_numpy = "import numpy";
    var from = Python.valueToCode(this, "VET", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "HOR", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "NUM", Python.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = Python.valueToCode(this, 'FONTNUM', Python.ORDER_ASSIGNMENT) || '0';
    var code = "pylab.text(" + from + ", " + end + ", " + step + ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum + ")\n";
    return code
};

export const array_toarray = function () {
    var str = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC) || '0';
    Python.definitions_['import_numpy'] = 'import numpy';
    var code = 'numpy.array(' + str + ')';
    return [code, Python.ORDER_ATOMIC];
};






export const plot_show = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = 'matplotlib.pyplot.show()\n';
    return code;
};

export const plot_axes = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = 'matplotlib.pyplot.axes(aspect=1)\n';
    return code;
};

export const plot_plot_easy = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var varName = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'matplotlib.pyplot.plot(' + varName + ")\n";
    return code;
};

export const plot_plot = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var varName = Python.valueToCode(this, 'SER', Python.ORDER_ASSIGNMENT) || '0';
    var code = 'matplotlib.pyplot.plot(' + varName + ",'" + dot + line + color + "')\n";
    return code;
};

export const plot_legend = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    Python.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
    var code = 'matplotlib.pyplot.legend(' + 'prop=matplotlib.font_manager.FontProperties("' + "STSong" + '")' + ')\n';
    return code;
};

export const plot_title = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'TITLE', Python.ORDER_ATOMIC);
    var code = 'matplotlib.pyplot.title(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
};

export const plot_label = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'LABEL', Python.ORDER_ATOMIC);
    var code = 'matplotlib.pyplot.' + direction + 'label(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
};

export const plot_plot_bar = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.' + direction + '(' + a + ',' + b + ")\n";
    return code;
};

export const plot_plot_scatter = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var s = Python.valueToCode(this, 'S', Python.ORDER_ATOMIC) || '\'\'';
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.scatter(' + a + ',' + b + ",s=" + s + ",c='" + color + "',marker='" + dot + "',label=" + tag + ")\n";
    return code;
};

export const plot_plot_xy = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.plot(' + a + ',' + b + ",'" + dot + line + color + "'" + ',label=' + tag + ")\n";
    return code;
};

export const plot_bar = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var tag = Python.valueToCode(this, 'TAG', Python.ORDER_ATOMIC) || '\'\'';
    var width = Python.valueToCode(this, 'WIDTH', Python.ORDER_RELATIONAL) || '0';
    var color = this.getFieldValue('COLOR')
    var align = this.getFieldValue('ALIGN');
    var code = 'matplotlib.pyplot.bar(' + a + ',' + b + ',align="' + align + '",color="' + color + '",width=' + width + ',label=' + tag + ")\n";
    return code;
};

export const plot_pie = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var explode = Python.valueToCode(this, 'EXPLODE', Python.ORDER_ATOMIC) || '\'\'';
    var shadow = this.getFieldValue('SHADOW');
    var autopct = this.getFieldValue('autopct');
    if (autopct != 'None') { autopct = "'" + autopct + "'" }
    var code = 'matplotlib.pyplot.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct + ',shadow=' + shadow + ")\n";
    return code;
};

export const plot_hist = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.hist(' + a + ',' + b + ")\n";
    return code;
};


export const plot_ticks = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = Python.valueToCode(this, 'A', Python.ORDER_ATOMIC) || '\'\'';
    var b = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.' + direction + 'ticks(' + a + ',' + b + ",fontproperties = '" + "STSong" + "')\n";
    return code;
};

export const plot_subplot = function () {
    Python.definitions_.import_numpy = "import numpy";
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = Python.valueToCode(this, "VET", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "HOR", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "NUM", Python.ORDER_NONE) || "0";
    var code = "matplotlib.pyplot.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
};

export const plot_savefig = function () {
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = "matplotlib.pyplot.savefig('1.png')\n";
    return code;
};

export const plot_text = function () {
    Python.definitions_.import_numpy = "import numpy";
    Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = Python.valueToCode(this, "VET", Python.ORDER_NONE) || "0";
    var end = Python.valueToCode(this, "HOR", Python.ORDER_NONE) || "0";
    var step = Python.valueToCode(this, "NUM", Python.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = Python.valueToCode(this, 'FONTNUM', Python.ORDER_ASSIGNMENT) || '0';
    var code = "matplotlib.pyplot.text(" + from + ", " + end + ", " + step + ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum + ")\n";
    return code
};
