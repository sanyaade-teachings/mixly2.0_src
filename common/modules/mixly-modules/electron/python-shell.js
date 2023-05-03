(() => {

goog.require('Mixly.Modules');
goog.require('Mixly.MFile');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.PythonShell');

const {
    Electron,
    Modules,
    MFile,
    StatusBar,
    Env,
    Msg
} = Mixly;

const { PythonShell } = Electron;

Modules.iconvLite = require('iconv-lite');
Modules.PythonShell = require('python-shell').PythonShell;
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

function message_decode(s) {
    if (s) {
        try {
            return unescape(s.replace(/_([0-9a-fA-F]{3})/gm, '%$1'));
        } catch (e) {
            return s;
        }
    }
    return s;
}

/**
* @function 运行python
* @description 运行当前画布上的python程序
* @return void
*/
PythonShell.run = function () {
    const cursorCallback = PythonShell.addEvent();
    StatusBar.show(1);
    StatusBar.setValue(Msg.Lang["程序正在运行"] + "...\n");
    var code = Mixly.MFile.getCode();
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
    Modules.fs.writeFile(Env.pyFilePath, code, 'utf8', function (err) {
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        err = message_decode(err);
        if (err) {
            layer.msg(Msg.Lang['写文件出错了，错误是：'] + err, {
                time: 1000
            });
            StatusBar.setValue(Msg.Lang['写文件出错了，错误是：'] + err + '\n');
            StatusBar.show(1);
        } else {
            shell = new Modules.PythonShell(Env.pyFilePath, options);
            let iconv = Modules.iconvLite;
            var startTime = Number(new Date());
            //程序运行完成时执行
            shell.childProcess.on('exit', (code) => {
                StatusBar.Ace.getSession().selection.removeEventListener('changeCursor', cursorCallback);
                //var timeCost = parseInt((Number(new Date()) - startTime) / 1000);
                var timeCost = Number(new Date()) - startTime;
                var timeCostSecond = timeCost % 60;
                var timeCostMinute = parseInt(timeCost / 60);
                //var timeCostStr = (timeCostMinute ? timeCostMinute + "m" : "") + timeCostSecond + "s";
                var timeCostStr = timeCost + "ms";
                //if (code == 0) {
                if (StatusBar.getValue().lastIndexOf("\n") == StatusBar.getValue().length - 1)
                    StatusBar.addValue("==" + Msg.Lang["程序运行完成"]  + "(" + Msg.Lang["用时"] + " " + timeCostStr + ")==\n");
                else
                    StatusBar.addValue("\n==" + Msg.Lang["程序运行完成"]  + "(" + Msg.Lang["用时"] + " " + timeCostStr + ")==\n");
                StatusBar.scrollToTheBottom();
                shell = null;
                //}
            });

            //有数据输出时执行
            shell.stdout.setEncoding('binary');
            shell.stdout.on('data', function (data) {
                try {
                    if (Env.currentPlatform === 'darwin') {
                        data = decode(iconv.decode(iconv.encode(data, "iso-8859-1"), 'utf-8'));
                    } else {
                        data = decode(iconv.decode(iconv.encode(data, "iso-8859-1"), 'gbk'));
                    }
                    data = message_decode(data);
                    data = data.replace(/(?<![\w+])pyinput.input\(/g, "input(");
                } catch (e) {
                    console.log(e);
                }
                StatusBar.addValue(data);

                if (data.lastIndexOf(">>>") != -1 && shell) {
                    input_prompt_message = data.substring(data.lastIndexOf(">>>"));
                    input_prompt_message_line = StatusBar.Ace.session.getLength();
                    StatusBar.Ace.selection.moveCursorLineEnd();
                    input_prompt_position_row = StatusBar.Ace.selection.getCursor().row;
                    input_prompt_position_column = StatusBar.Ace.selection.getCursor().column;
                }
            });

            //程序运行出错时执行
            shell.stderr.setEncoding('binary');
            shell.stderr.on('data', function (err) {
                console.log('stderr: ' + err);
                try {
                    err = err.replace(/(?<![\w+])pyinput.input\(/g, "input(");
                } catch (e) {
                    console.log(e);
                }
                try {
                    if (Env.currentPlatform === 'darwin') {
                        StatusBar.addValue(iconv.decode(iconv.encode(err, "iso-8859-1"), 'utf-8'));
                    } else {
                        StatusBar.addValue(iconv.decode(iconv.encode(err, "iso-8859-1"), 'gbk'));
                    }
                    err = message_decode(err);
                } catch (e) {
                    err = message_decode(err);
                    StatusBar.addValue(err);
                }
                StatusBar.scrollToTheBottom();
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
    StatusBar.show(1);
    if (shell) {
        shell.terminate('SIGKILL');
        //shell.stdout.end();
        //shell.stdin.end();
        //StatusBar.addValue("\n==" + Msg.Lang["程序运行完成"] + "==\n", false);
        shell = null;
    } else {
        StatusBar.addValue("\n==" + Msg.Lang["无程序在运行"] + "==\n");
    }
    StatusBar.scrollToTheBottom();
}

/**
* @function 清空状态栏
* @description 清空当前状态栏内的所有数据
* @return void
*/
PythonShell.clearOutput = function () {
    StatusBar.setValue("");
}

PythonShell.addEvent = () => {
    return StatusBar.Ace.getSession().selection.on('changeCursor', function (e) {
        if (shell && input_prompt_message_line != -1) {
            if (StatusBar.Ace.selection.getCursor().row < input_prompt_position_row) {
                StatusBar.Ace.selection.moveCursorTo(input_prompt_position_row, input_prompt_position_column, true);
            }
            else if (StatusBar.Ace.selection.getCursor().row <= input_prompt_position_row
                && StatusBar.Ace.selection.getCursor().column <= input_prompt_position_column) {
                StatusBar.Ace.selection.moveCursorTo(input_prompt_position_row, input_prompt_position_column, true);
            }
            last_row_data = StatusBar.Ace.session.getLine(input_prompt_message_line - 1);
            if (last_row_data.indexOf(">>>") != -1
                && StatusBar.Ace.selection.getCursor().row == input_prompt_message_line
                && StatusBar.Ace.selection.getCursor().column == 0) {
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

})();