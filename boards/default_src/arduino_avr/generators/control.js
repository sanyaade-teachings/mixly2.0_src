import { JSFuncs } from 'mixly';
import { Arduino } from '../../arduino_common/arduino_generator';
import Variables from '../../arduino_common/others/variables';

export const base_setup = function () {
    var branch = Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    if (branch) {
        Arduino.setups_['setup_setup'] = branch;
    }
    return '';
};

export const controls_if = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Arduino.valueToCode(this, 'IF' + n,
        Arduino.ORDER_NONE) || 'false';
    var branch = Arduino.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '\n}';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Arduino.valueToCode(this, 'IF' + n,
            Arduino.ORDER_NONE) || 'false';
        branch = Arduino.statementToCode(this, 'DO' + n);
        code += ' else if (' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
        branch = Arduino.statementToCode(this, 'ELSE');
        code += ' else {\n' + branch + '\n}';
    }
    return code + '\n';
};

export const controls_switch_case = function () {
    var n = 0;
    var argument = Arduino.valueToCode(this, 'IF' + n,
        Arduino.ORDER_NONE) || 'NULL';
    var branch = '';
    var code = 'switch (' + argument + ') {\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Arduino.valueToCode(this, 'IF' + n,
            Arduino.ORDER_NONE) || 'NULL';
        branch = Arduino.statementToCode(this, 'DO' + n);
        code += ' case ' + argument + ': \n' + branch + '  break;\n';
    }
    if (this.elseCount_) {
        branch = Arduino.statementToCode(this, 'ELSE');
        code += ' default:\n' + branch + '  break;\n';
    }
    code += '}';
    return code + '\n';
};

export const controls_for = function () {
    // For loop.
    var variable0 = Arduino.variableDB_.getName(
        this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var argument0 = Arduino.valueToCode(this, 'FROM',
        Arduino.ORDER_ASSIGNMENT) || '0';
    var argument1 = Arduino.valueToCode(this, 'TO',
        Arduino.ORDER_ASSIGNMENT) || '0';
    var step = Arduino.valueToCode(this, 'STEP',
        Arduino.ORDER_ASSIGNMENT) || '1';
    var branch = Arduino.statementToCode(this, 'DO');
    if (Arduino.INFINITE_LOOP_TRAP) {
        branch = Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
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

export const controls_whileUntil = function () {
    // Do while/until loop.
    var argument0 = Arduino.valueToCode(this, 'BOOL',
        Arduino.ORDER_NONE) || 'false';
    var branch = Arduino.statementToCode(this, 'DO');
    if (Arduino.INFINITE_LOOP_TRAP) {
        branch = Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
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

export const controls_flow_statements = function () {
    // Flow statements: continue, break.
    switch (this.getFieldValue('FLOW')) {
    case 'BREAK':
        return 'break;\n';
    case 'CONTINUE':
        return 'continue;\n';
    }
    throw 'Unknown flow statement.';
};

export const controls_delay = function () {
    var delay_time = Arduino.valueToCode(this, 'DELAY_TIME', Arduino.ORDER_ATOMIC) || '1000'
    var unit = this.getFieldValue('UNIT');
    var code = unit + '(' + delay_time + ');\n';
    return code;
};

export const controls_millis = function () {
    var unit = this.getFieldValue('UNIT');
    var code = unit + "()";
    return [code, Arduino.ORDER_ATOMIC];
};

export const controls_mstimer2 = function () {
    Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    var time = Arduino.valueToCode(this, 'TIME', Arduino.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = Arduino.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Arduino.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

export const controls_mstimer2_start = function () {
    Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

export const controls_mstimer2_stop = function () {
    Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};

export const controls_end_program = function () {
    var board_type = JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/)))
        return 'while(true) delay(1000);\n';
    return 'while(true);\n';
};
export const controls_soft_reset = function () {
    var funcName = 'resetFunc';
    var code = 'void(* resetFunc) (void) = 0;\n';
    Arduino.definitions_[funcName] = code;
    return 'resetFunc();\n';
};
export const controls_interrupts = function () {
    return 'interrupts();\n';
};

export const controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};
export const base_delay = controls_delay;
//简单定时器
export const simple_timer = function () {
    var NO = this.getFieldValue('NO');
    var timein = Arduino.valueToCode(this, 'timein', Arduino.ORDER_ATOMIC);
    var funcName = 'Simple_timer_' + NO;
    var branch = Arduino.statementToCode(this, 'zxhs');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    Arduino.definitions_[funcName] = code;
    Arduino.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    Arduino.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    Arduino.setups_[funcName] = 'timer.setInterval(' + timein + 'L, ' + funcName + ');\n';
    return 'timer.run();\n';
};

//do-while循环
export const do_while = function () {
    var statements_input_data = Arduino.statementToCode(this, 'input_data');
    var value_select_data = Arduino.valueToCode(this, 'select_data', Arduino.ORDER_ATOMIC);
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
export const super_delay_function1 = function () {
    var number = this.getFieldValue('number');
    var funcName = 'super_delay_function' + number;
    var branch = Arduino.statementToCode(this, 'delay_function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    Arduino.definitions_[funcName] = code;
    Arduino.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    Arduino.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    return 'timer.run();\n';
};

//执行超级延时函数
export const execute_super_delay_function1 = function () {
    var number = this.getFieldValue('number');
    var time_interval = Arduino.valueToCode(this, 'time_interval', Arduino.ORDER_ATOMIC);
    var frequency = Arduino.valueToCode(this, 'frequency', Arduino.ORDER_ATOMIC);
    var code = 'timer.setTimer(' + time_interval + ', super_delay_function' + number + ', ' + frequency + ');\n';
    return code;
};