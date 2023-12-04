import * as Blockly from 'blockly/core';
import Python from '../python_generator';

//物联网-wifi信息
export const blynk_server = function () {
    var wifi_ssid = Python.valueToCode(this, 'wifi_ssid', Python.ORDER_ATOMIC);
    var wifi_pass = Python.valueToCode(this, 'wifi_pass', Python.ORDER_ATOMIC);
    Python.definitions_.import_time = "import network,time,BlynkLib";
    var code;
    code = "wlan = network.WLAN(network.STA_IF)\n";
    code += "wlan.active(True)\n";
    code += "if not wlan.isconnected():\n";
    code += "  print('connecting to network...')\n";
    code += "  wlan.connect(" + wifi_ssid + "," + wifi_pass + ")\n";
    code += "  while not wlan.isconnected():\n";
    code += "    pass\n";
    code += "print('network config:', wlan.ifconfig())\n";
    code += "BLYNK_AUTH='" + "auth_key" + "'\n";
    code += "blynk = BlynkLib.Blynk(BLYNK_AUTH)\n"
    code += "while True:\n"
    code += "  blynk.run()\n"
    code += "  pass\n"
    return code;
};

//物联网-wifi信息
export const blynk_iot_get_data = function () {
    var Vpin = this.getFieldValue('Vpin');
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Python.valueToCode(this, 'ARG' + x, Python.ORDER_NONE) || 'null';
    }
    var code = '(a' + args.join(', ') + ');\n';
    var branch = Python.statementToCode(this, 'STACK');
    if (Python.INFINITE_LOOP_TRAP) {
        branch = Python.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = this.argumentstype_[x] + ' ' + Python.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
    }
    var GetDataCode = "";
    if (this.arguments_.length == 1) {
        GetDataCode = Python.variableDB_.getName(this.arguments_[0], Blockly.Variables.NAME_TYPE);
        if (this.argumentstype_[0] == "int")
            GetDataCode += "= param.asInt();\n"
        else if (this.argumentstype_[0] == "String")
            GetDataCode += "= param.asStr();\n"
        else if (this.argumentstype_[0] == "long")
            GetDataCode += "= param.asDouble();\n"
        else if (this.argumentstype_[0] == "float")
            GetDataCode += "= param.asFloat();\n"
        else if (this.argumentstype_[0] == "boolean")
            GetDataCode += "= param.asInt();\n"
        else if (this.argumentstype_[0] == "byte")
            GetDataCode += "= param.asStr();\n"
        else if (this.argumentstype_[0] == "char")
            GetDataCode += "= param.asStr();\n"
    }
    else {
        for (var x = 0; x < this.arguments_.length; x++) {
            args[x] = this.argumentstype_[x] + ' ' + Python.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);

            GetDataCode += Python.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
            if (this.argumentstype_[x] == "int")
                GetDataCode += "= param[" + x + "].asInt();\n"
            else if (this.argumentstype_[x] == "String")
                GetDataCode += "= param[" + x + "].asStr();\n"
            else if (this.argumentstype_[x] == "long")
                GetDataCode += "= param[" + x + "].asDouble();\n"
            else if (this.argumentstype_[x] == "float")
                GetDataCode += "= param[" + x + "].asFloat();\n"
            else if (this.argumentstype_[x] == "boolean")
                GetDataCode += "= param[" + x + "].asInt();\n"
            else if (this.argumentstype_[x] == "byte")
                GetDataCode += "= param[" + x + "].asStr();\n"
            else if (this.argumentstype_[x] == "char")
                GetDataCode += "= param[" + x + "].asStr();\n"
        }
    }

    if (this.arguments_.length > 0)
        Python.definitions_[args] = args.join(';\n') + ";";
    var code = ' BLYNK_WRITE(' + Vpin + ') {\n' + GetDataCode +
        branch + '}\n';
    // var code =  'BLYNK_WRITE(' + Vpin+ ') {\n'+variable+" = param.as"+datatype+"();\n"+branch+'}\n';
    code = Python.scrub_(this, code);
    Python.definitions_[Vpin] = code;
    return null;
};

