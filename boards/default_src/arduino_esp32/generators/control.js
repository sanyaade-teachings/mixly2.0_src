import { Arduino } from '../../arduino_common/arduino_generator';
import { controls_delay } from '../../arduino_avr/generators/control';

export const controls_runnig_core = function () {
    var task = this.getFieldValue('task');
    var core = this.getFieldValue('core');
    var value_length = Arduino.valueToCode(this, 'length', Arduino.ORDER_ATOMIC);
    var branch = Arduino.statementToCode(this, 'setup');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Arduino.statementToCode(this, 'loop');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    Arduino.definitions_['esp32_task_' + task] = 'void task_' + task + '( void * pvParameters ){\nfor(;;){\n  ' + branch1 + '\n  vTaskDelay(1);\n}\n}\n';
    Arduino.setups_['setups_esp32_task_' + task] = '' + branch + '\n  xTaskCreatePinnedToCore(task_' + task + ', "task_' + task + '", ' + value_length + ', NULL, 2, NULL, ' + core + ');\n';
    return 'vTaskDelay(1);\n';
};

export const control_core_delay = function () {
    var value_sleeplength = Arduino.valueToCode(this, 'sleeplength', Arduino.ORDER_ATOMIC);
    var code = 'vTaskDelay(' + value_sleeplength + ');\n'
    return code;
};

export const controls_hw_timer = function () {
    var time = Arduino.valueToCode(this, 'TIME', Arduino.ORDER_ATOMIC);
    var TIMER_NUM = this.getFieldValue('TIMER_NUM');
    var mode = this.getFieldValue('mode');
    Arduino.definitions_['hw_timer_t' + TIMER_NUM] = 'hw_timer_t * timer' + TIMER_NUM + ' =NULL;';
    var funcName = 'IRAM_ATTR onTimer' + TIMER_NUM;
    var branch = Arduino.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    if (!isNaN(parseInt(time))) {
        Arduino.setups_begin_['setup_hw_timer' + funcName] = 'timer' + TIMER_NUM + '=timerBegin(' + TIMER_NUM + ', 80, true);\n  timerAttachInterrupt(timer' + TIMER_NUM + ', &onTimer' + TIMER_NUM + ', true);\n  timerAlarmWrite(timer' + TIMER_NUM + ', ' + time * 1000 + ', ' + mode + ');';
    } else {
        Arduino.setups_begin_['setup_hw_timer' + funcName] = 'timer' + TIMER_NUM + '=timerBegin(' + TIMER_NUM + ', 80, true);\n  timerAttachInterrupt(timer' + TIMER_NUM + ', &onTimer' + TIMER_NUM + ', true);\n  timerAlarmWrite(timer' + TIMER_NUM + ', ' + time + ', ' + mode + ');';
    }
    Arduino.definitions_[funcName] = code;
    return '';
};

export const controls_hw_timer_start = function () {
    var TIMER_NUM = this.getFieldValue('TIMER_NUM');
    return 'timerAlarmEnable(timer' + TIMER_NUM + ');\n';
};

export const controls_hw_timer_stop = function () {
    var TIMER_NUM = this.getFieldValue('TIMER_NUM');
    return 'timerEnd(timer' + TIMER_NUM + ');\n';
};

export const controls_end_program = function () {
    return 'while(true);\n';
};
export const controls_interrupts = function () {
    return 'interrupts();\n';
};

export const controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};

export const esp32_deep_sleep = function () {
    var time = this.getFieldValue('time');
    var code = 'esp_sleep_enable_timer_wakeup(' + time + ' * 1000000);\nesp_deep_sleep_start();\n';
    return code;
};
export const base_delay = controls_delay;