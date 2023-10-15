goog.loadJs('web', () => {

goog.require('Mixly.MString');
goog.require('Mixly.Msg');
goog.require('Mixly.Env');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.Ampy');

const {
    Web,
    MString,
    Msg,
    Env
} = Mixly;

const GET_FILES_INFO_COMMAND = goog.get(Env.templatePath + '/get-files-info.py');

class Ampy {
    constructor(operator, writeBuffer = true) {
        this.operator_ = operator;
        this.encoder_ = new TextEncoder();
        this.decoder_ = new TextDecoder();
        this.writeBuffer_ = writeBuffer;
    }

    async readUntil(str, keepStr = true, timeout, doFunc) {
        const startTime = Number(new Date());
        let nowTime = startTime;
        let readStr = '';
        while (nowTime - startTime < timeout) {
            const nowTime = Number(new Date());
            let len = this.operator_.output.length;
            if (len) {
                /*const lastData = this.operator_.output[len - 1];
                if (!lastData) {
                    len--;
                }*/
                for (let i = 0; i < len; i++) {
                    const data = this.operator_.output.shift();
                    const index = data.toLowerCase().indexOf(str);
                    if (index !== -1) {
                        this.operator_.output.unshift(data.substring(
                            keepStr? (index + str.length) : index
                        ));
                        readStr += data.substring(0,
                            keepStr? (index + str.length) : index
                        );
                        return readStr;
                    } else {
                        readStr += ((i === len - 1)? data : data + '\n');
                    }
                }
            }
            if (!((nowTime - startTime) % 500) && typeof doFunc === 'function') {
                await doFunc();
            }
            if (nowTime - startTime >= timeout) {
                console.log(str + '查找失败');
                return false;
            }
            await this.operator_.sleep(100);
        }
    }

    async getFilesInfo(timeout = 5000) {
        this.exec(GET_FILES_INFO_COMMAND);
        await this.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            return null;
        }
        let infoStr = await this.readUntil('>', false, timeout);
        let infoList = null, infoObj = {};
        try {
            infoStr = infoStr.replaceAll('\'', '\"');
            infoStr = infoStr.substring(0, infoStr.lastIndexOf(']') + 1);
            infoList = JSON.parse(infoStr);
            for (let data of infoList) {
                infoObj[data[0].substring(data[0].lastIndexOf('/') + 1)] = data[1];
            }
        } catch (error) {
            console.log(error);
        }
        return infoObj;
    }

    async interrupt(timeout = 5000) {
        await this.operator_.writeCtrlC();
        await this.sleep(100);
        if (await this.readUntil('>>>', true, timeout, this.operator_.writeCtrlC)) {
            return true;
        }
        return false;
    }

    async enterRawREPL(timeout = 5000) {
        await this.operator_.writeCtrlA();
        await this.sleep(100);
        if (await this.readUntil('raw repl; ctrl-b to exit', true, timeout, this.operator_.writeCtrlA)) {
            return true;
        }
        return false;
    }

    async exitRawREPL(timeout = 5000) {
        await this.operator_.writeCtrlB();
        await this.sleep(100);
        if (await this.readUntil('>>>', timeout, true, this.operator_.writeCtrlB)) {
            return true;
        }
        return false;
    }

    async exitREPL(timeout = 5000) {
        await this.operator_.writeCtrlD();
        await this.sleep(100);
        if (await this.readUntil('soft reboot', false, timeout, this.operator_.writeCtrlD)) {
            return true;
        }
        return false;
    }

    put(fileName, code, moduleInfo = null) {
        return new Promise(async (resolve, reject) => {
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            try {
                await this.operator_.writeCtrlB();
                if (!await this.interrupt()) {
                    reject(Msg.Lang['中断失败']);
                    return;
                }
                // console.log('中断成功')
                if (!await this.enterRawREPL()) {
                    reject(Msg.Lang['无法进入Raw REPL']);
                    return;
                }
                // console.log('进入Raw REPL')
                // console.log('写入code中...')
                if (moduleInfo) {
                    const fileInfo = await this.getFilesInfo();
                    for (let name in moduleInfo) {
                        const libCode = goog.get(moduleInfo[name]);
                        if (!libCode 
                         || new TextEncoder('utf8').encode(libCode).length === fileInfo[name + '.py']) {
                            statusBarTerminal.addValue('Skip ' + name + '.py\n');
                            continue;
                        }
                        await this.writeFile(name + '.py', libCode);
                    }
                }
                await this.writeFile(fileName, code);
                // console.log('写入code成功')
                if (!await this.exitRawREPL()) {
                    reject(Msg.Lang['无法退出Raw REPL']);
                    return;
                }
                if (this.operator_.name === 'bluetooth') {
                    await this.operator_.writeString('exec(open(\'main.py\').read())\r\n');
                } else {
                    if (! await this.exitREPL()) {
                        reject(Msg.Lang['无法退出REPL']);
                        return;
                    }
                }
                resolve();
            } catch (error) {
                reject(error.toString());
            }
        });
    }

    async writeFile(fileName, data) {
        // 判断字符是否为汉字，
        function isChinese(s){
            return /[\u4e00-\u9fa5]/.test(s);
        }

        // 中文unicode编码
        function ch2Unicode(str) {
            if(!str){
                return;
            }
            var unicode = '';
            for (var i = 0; i <  str.length; i++) {
                var temp = str.charAt(i);
                if(isChinese(temp)){
                    unicode += '\\u' +  temp.charCodeAt(0).toString(16);
                }
                else{
                    unicode += temp;
                }
            }
            return unicode;
        }
        const { mainStatusBarTabs } = Mixly;
        const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
        statusBarTerminal.addValue(`Writing ${fileName} `);
        let str = `file = open('${fileName}', 'w')\n`;
        const buffer = this.encoder_.encode(data);
        const len = Math.ceil(buffer.length / 500);
        for (let i = 0; i < len; i++) {
            const writeBuffer = buffer.slice(i * 500, Math.min((i + 1) * 500, buffer.length));
            let writeStr = '';
            for (let num of writeBuffer) {
                let numStr = num.toString(16);
                if (numStr.length === 1) {
                    numStr = '0' + numStr;
                }
                writeStr += '\\x' + numStr;
            }
            str += `file.write(b'${writeStr}')\n`;
        }
        str += `file.close()\n`;
        await this.exec(str);
        statusBarTerminal.addValue('Done!\n');
    }

    async exec(str) {
        if (this.writeBuffer_) {
            const buffer = this.encoder_.encode(str);
            const len = Math.ceil(buffer.length / 250);
            for (let i = 0; i < len; i++) {
                const writeBuffer = buffer.slice(i * 250, Math.min((i + 1) * 250, buffer.length));
                await this.operator_.writeByteArr(writeBuffer);
            }
        } else {
            for (let i = 0; i < str.length / 60; i++) {
                let newData = str.substring(i * 60, (i + 1) * 60);
                await this.operator_.writeString(newData);
                // console.log('写入', "file.write('''" + newData + "''')\r\n");
            }
        }
        await this.operator_.writeByteArr([4]);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

Web.Ampy = Ampy;

});
