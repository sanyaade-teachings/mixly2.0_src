'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

goog.require('Mixly.JSFuncs');

Blockly.Arduino.forBlock['base_setup'] = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    if (branch) {
        Blockly.Arduino.setups_['setup_setup'] = branch;
    }
    return '';
};

Blockly.Arduino.forBlock['controls_if'] = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '\n}';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
        code += ' else if (' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
        branch = Blockly.Arduino.statementToCode(this, 'ELSE');
        code += ' else {\n' + branch + '\n}';
    }
    return code + '\n';
};

Blockly.Arduino.forBlock['controls_switch_case'] = function () {
    var n = 0;
    var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'NULL';
    var branch = '';
    var code = 'switch (' + argument + ') {\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'NULL';
        branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
        code += ' case ' + argument + ': \n' + branch + '  break;\n';
    }
    if (this.elseCount_) {
        branch = Blockly.Arduino.statementToCode(this, 'ELSE');
        code += ' default:\n' + branch + '  break;\n';
    }
    code += '}';
    return code + '\n';
};

Blockly.Arduino.forBlock['controls_for'] = function () {
    // For loop.
    var variable0 = Blockly.Arduino.variableDB_.getName(
        this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var step = Blockly.Arduino.valueToCode(this, 'STEP',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '1';;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var code;
    var down = 0;
    if (argument0.match(/^-?\d+(\.\d+)?$/) &&
        argument1.match(/^-?\d+(\.\d+)?$/)) {
        //起止数是常量
        down = (argument1 - argument0 < 0);
        code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
            variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
            branch + '}\n';
    } else {
        //起止数有变量
        if (step.match(/^-?\d+(\.\d+)?$/)) {
            //步长是常量
            down = step < 0;
            code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
                variable0 + (down ? ' >= ' : ' <= ') + '(' + argument1 + '); ' +
                variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
                branch + '}\n';
        } else {
            //步长是变量
            code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
                '(' + argument1 + '>=' + argument0 + ')?(' + variable0 + '<=' + argument1 + '):(' + variable0 + '>=' + argument1 + '); ' +
                variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
                branch + '}\n';
        }

    }
    return code;
};

Blockly.Arduino.forBlock['controls_whileUntil'] = function () {
    // Do while/until loop.
    var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    if (this.getFieldValue('MODE') == 'UNTIL') {
        if (!argument0.match(/^\w+$/)) {
            argument0 = '(' + argument0 + ')';
        }
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Arduino.forBlock['controls_flow_statements'] = function () {
    // Flow statements: continue, break.
    switch (this.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw 'Unknown flow statement.';
};

Blockly.Arduino.forBlock['controls_delay'] = function () {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
    var unit = this.getFieldValue('UNIT');
    var code = unit + '(' + delay_time + ');\n';
    return code;
};

Blockly.Arduino.forBlock['controls_millis'] = function () {
    var unit = this.getFieldValue('UNIT');
    var code = unit + "()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['controls_mstimer2'] = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

Blockly.Arduino.forBlock['controls_mstimer2_start'] = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

Blockly.Arduino.forBlock['controls_mstimer2_stop'] = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};

Blockly.Arduino.forBlock['controls_end_program'] = function () {
    var board_type = Mixly.JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/)))
        return 'while(true) delay(1000);\n';
    else
        return 'while(true);\n';
};
Blockly.Arduino.forBlock['controls_soft_reset'] = function () {
    var funcName = 'resetFunc';
    var code = 'void(* resetFunc) (void) = 0;\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return 'resetFunc();\n';
};
Blockly.Arduino.forBlock['controls_interrupts'] = function () {
    return 'interrupts();\n';
};

Blockly.Arduino.forBlock['controls_nointerrupts'] = function () {
    return 'noInterrupts();\n';
};
Blockly.Arduino.forBlock['base_delay'] = Blockly.Arduino.forBlock['controls_delay'];
//简单定时器
Blockly.Arduino.forBlock['simple_timer'] = function () {
    var NO = this.getFieldValue('NO');
    var timein = Blockly.Arduino.valueToCode(this, 'timein', Blockly.Arduino.ORDER_ATOMIC);
    var funcName = 'Simple_timer_' + NO;
    var branch = Blockly.Arduino.statementToCode(this, 'zxhs');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    Blockly.Arduino.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    Blockly.Arduino.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    Blockly.Arduino.setups_[funcName] = 'timer.setInterval(' + timein + 'L, ' + funcName + ');\n';
    return 'timer.run();\n';
};

//do-while循环
Blockly.Arduino.forBlock['do_while'] = function () {
    var statements_input_data = Blockly.Arduino.statementToCode(this, 'input_data');
    var value_select_data = Blockly.Arduino.valueToCode(this, 'select_data', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_type = this.getFieldValue('type');
    if (dropdown_type == 'false') {
        var code = 'do{\n'
            + statements_input_data
            + '}while(!(' + value_select_data + '));\n';
    }
    else {
        var code = 'do{\n'
            + statements_input_data
            + '}while(' + value_select_data + ');\n';
    }
    return code;
};

//注册超级延时函数
Blockly.Arduino.forBlock['super_delay_function1'] = function () {
    var number = this.getFieldValue('number');
    var timein = Blockly.Arduino.valueToCode(this, 'timein', Blockly.Arduino.ORDER_ATOMIC);
    var funcName = 'super_delay_function' + number;
    var branch = Blockly.Arduino.statementToCode(this, 'delay_function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    Blockly.Arduino.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    Blockly.Arduino.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    return 'timer.run();\n';
};

//执行超级延时函数
Blockly.Arduino.forBlock['execute_super_delay_function1'] = function () {
    var number = this.getFieldValue('number');
    var time_interval = Blockly.Arduino.valueToCode(this, 'time_interval', Blockly.Arduino.ORDER_ATOMIC);
    var frequency = Blockly.Arduino.valueToCode(this, 'frequency', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'timer.setTimer(' + time_interval + ', super_delay_function' + number + ', ' + frequency + ');\n';
    return code;
};