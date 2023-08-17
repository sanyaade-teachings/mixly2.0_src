goog.loadJs('electron', () => {

goog.require('Mixly.MFile');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.MString');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.PythonShell');

const {
    Electron,
    MFile,
    Env,
    Msg,
    MString
} = Mixly;

const { PythonShell } = Electron;

const fs = Mixly.require('fs');
const iconv_lite = Mixly.require('iconv-lite');
const python_shell = Mixly.require('python-shell');

var input_prompt_message = "";
var input_prompt_message_line = -1;
var input_prompt_position_row = -1;
var input_prompt_position_column = -1;
//python-shell输出中文数据有乱码，现在编码为iso-8859-1，原来编码为GBK
var options = {
    pythonPath: Env.python3Path,
    pythonOptions: ['-u'],
    encoding: "binary",
    mode: 'utf-8'
};

let shell = null;

PythonShell.ERROR_ENCODING = Env.currentPlatform == 'win32' ? 'cp936' : 'utf-8';

/**
* @function 运行python
* @description 运行当前画布上的python程序
* @return void
*/
PythonShell.run = function () {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    const cursorCallback = PythonShell.addEvent();
    mainStatusBarTab.show();
    statusBarTerminal.setValue(Msg.Lang["程序正在运行"] + "...\n");
    var code = MFile.getCode();
    code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
    try {
        var inputArr = code.match(/(?<![\w+])input\(/g);
        if (inputArr) {
            code = "import pyinput\n" + code;
            code = code.replace(/(?<![\w+])input\(/g, "pyinput.input(");
        }
    } catch (e) {
        console.log(e);
    }
    if (code.indexOf("import turtle") != -1) code += "\nturtle.done()\n";
    if (shell)
        shell.terminate('SIGKILL');
    fs.writeFile(Env.pyFilePath, code, 'utf8', function (error) {
        if (error) {
            layer.msg(Msg.Lang['写文件出错了，错误是：'] + error, {
                time: 1000
            });
            statusBarTerminal.setValue(Msg.Lang['写文件出错了，错误是：'] + error + '\n');
            mainStatusBarTab.show();
        } else {
            shell = new python_shell.PythonShell(Env.pyFilePath, options);
            var startTime = Number(new Date());
            //程序运行完成时执行
            shell.childProcess.on('exit', (code) => {
                statusBarTerminal.editor.getSession().selection.removeEventListener('changeCursor', cursorCallback);
                //var timeCost = parseInt((Number(new Date()) - startTime) / 1000);
                var timeCost = Number(new Date()) - startTime;
                var timeCostSecond = timeCost % 60;
                var timeCostMinute = parseInt(timeCost / 60);
                //var timeCostStr = (timeCostMinute ? timeCostMinute + "m" : "") + timeCostSecond + "s";
                var timeCostStr = timeCost + "ms";
                //if (code == 0) {
                if (statusBarTerminal.getValue().lastIndexOf("\n") == statusBarTerminal.getValue().length - 1)
                    statusBarTerminal.addValue("==" + Msg.Lang["程序运行完成"]  + "(" + Msg.Lang["用时"] + " " + timeCostStr + ")==\n");
                else
                    statusBarTerminal.addValue("\n==" + Msg.Lang["程序运行完成"]  + "(" + Msg.Lang["用时"] + " " + timeCostStr + ")==\n");
                statusBarTerminal.scrollToBottom();
                shell = null;
                //}
            });

            //有数据输出时执行
            shell.stdout.setEncoding('binary');
            shell.stdout.on('data', function (data) {
                 data = iconv_lite.decode(Buffer.from(data, 'binary'), PythonShell.ERROR_ENCODING);
                 data = MString.decode(data);
                 data = data.replace(/(?<![\w+])pyinput.input\(/g, "input(");
                statusBarTerminal.addValue(data);

                if (data.lastIndexOf(">>>") != -1 && shell) {
                    input_prompt_message = data.substring(data.lastIndexOf(">>>"));
                    input_prompt_message_line = statusBarTerminal.editor.session.getLength();
                    statusBarTerminal.editor.selection.moveCursorLineEnd();
                    input_prompt_position_row = statusBarTerminal.editor.selection.getCursor().row;
                    input_prompt_position_column = statusBarTerminal.editor.selection.getCursor().column;
                }
            });

            //程序运行出错时执行
            shell.stderr.setEncoding('binary');
            shell.stderr.on('data', function (err) {
                console.log('stderr: ' + err);
                err = iconv_lite.decode(Buffer.from(err.message, 'binary'), PythonShell.ERROR_ENCODING);
                err = MString.decode(err);
                err = err.replace(/(?<![\w+])pyinput.input\(/g, "input(");
                statusBarTerminal.addValue(err);
                statusBarTerminal.scrollToBottom();
                shell = null;
            });
        }

    })
}

/**
* @function 停止py
* @description 停止当前正在运行的python程序
* @return void
*/
PythonShell.stop = function () {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    mainStatusBarTab.show();
    if (shell) {
        shell.terminate('SIGKILL');
        //shell.stdout.end();
        //shell.stdin.end();
        shell = null;
    } else {
        statusBarTerminal.addValue("\n==" + Msg.Lang["无程序在运行"] + "==\n");
    }
    statusBarTerminal.scrollToBottom();
}

/**
* @function 清空状态栏
* @description 清空当前状态栏内的所有数据
* @return void
*/
PythonShell.clearOutput = function () {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    statusBarTerminal.setValue("");
}

PythonShell.addEvent = () => {
    const { mainStatusBarTab } = Mixly;
    const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
    return statusBarTerminal.editor.getSession().selection.on('changeCursor', function (e) {
        if (shell && input_prompt_message_line != -1) {
            if (statusBarTerminal.editor.selection.getCursor().row < input_prompt_position_row) {
                statusBarTerminal.editor.selection.moveCursorTo(input_prompt_position_row, input_prompt_position_column, true);
            }
            else if (statusBarTerminal.editor.selection.getCursor().row <= input_prompt_position_row
                && statusBarTerminal.editor.selection.getCursor().column <= input_prompt_position_column) {
                statusBarTerminal.editor.selection.moveCursorTo(input_prompt_position_row, input_prompt_position_column, true);
            }
            last_row_data = statusBarTerminal.editor.session.getLine(input_prompt_message_line - 1);
            if (last_row_data.indexOf(">>>") != -1
                && statusBarTerminal.editor.selection.getCursor().row == input_prompt_message_line
                && statusBarTerminal.editor.selection.getCursor().column == 0) {
                //shell.stdin.setEncoding('utf-8'); 
                if (last_row_data.indexOf(input_prompt_message) == -1) {
                    last_row_data = last_row_data.replace(">>> ", "");
                    last_row_data = last_row_data.replace(">>>", "");
                    shell.stdin.write(escape(last_row_data.replace(">>>", "")) + "\n");
                } else {
                    shell.stdin.write(escape(last_row_data.replace(input_prompt_message, "")) + "\n");
                }
                input_prompt_message_line = -1;
                last_row_data = "";
            }
        }

    });
}

});