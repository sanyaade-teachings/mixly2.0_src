(() => {

goog.require('Mixly.StatusBar');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.Ampy');

const { Web, StatusBar } = Mixly;

class Ampy {
    constructor(operator) {
        this.operator_ = operator;
    }

    async find(str, timeout, doFunc) {
        const startTime = Number(new Date());
        let nowTime = startTime;
        while (nowTime - startTime < timeout) {
            const nowTime = Number(new Date());
            let len = this.operator_.output.length;
            if (len) {
                const lastData = this.operator_.output[len - 1];
                if (!lastData) {
                    len--;
                }
                for (let i = 0; i < len; i++) {
                    const data = this.operator_.output.shift();
                    if (data.indexOf(str) !== -1) {
                        this.operator_.output = [];
                        return true;
                    }
                }
            }
            if (!((nowTime - startTime) % 500)) {
                await doFunc();
            }
            if (nowTime - startTime >= timeout) {
                console.log(str + '查找失败');
                return false;
            }
            await this.operator_.sleep(100);
        }
    }

    async interrupt(timeout = 5000) {
        await this.operator_.writeCtrlC();
        await this.sleep(100);
        if (await this.find('>>>', timeout, this.operator_.writeCtrlC)) {
            return true;
        }
        return false;
    }

    async enterRawREPL(timeout = 5000) {
        await this.operator_.writeCtrlA();
        await this.sleep(100);
        if (await this.find('raw REPL; CTRL-B to exit', timeout, this.operator_.writeCtrlA)) {
            return true;
        }
        return false;
    }

    async exitRawREPL(timeout = 5000) {
        await this.operator_.writeCtrlB();
        await this.sleep(100);
        if (await this.find('>>>', timeout, this.operator_.writeCtrlB)) {
            return true;
        }
        return false;
    }

    put(fileName, code) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!await this.interrupt()) {
                    reject('中断失败');
                    return;
                }
                console.log('中断成功')
                if (!await this.enterRawREPL()) {
                    reject('无法进入Raw REPL');
                    return;
                }
                console.log('进入Raw REPL')
                console.log('写入code中...')
                await this.writeCodeString(fileName, code);
                console.log('写入code成功')
                await this.operator_.writeByteArr([4]);
                if (!await this.exitRawREPL()) {
                    reject('无法退出Raw REPL');
                    return;
                }
                await this.operator_.writeCtrlD();
                resolve();
            } catch (error) {
                reject(error.toString());
            }
        });
    }

    async writeCodeString(fileName, code) {
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
        StatusBar.addValue(`Writing ${fileName} `);
        await this.operator_.writeString(`file = open('${fileName}', 'w')\r\n`);
        console.log(`file = open('${fileName}', 'w')\r\n`)
        code = ch2Unicode(code) ?? '';
        for (let i = 0; i < code.length / 30; i++) {
            let newData = code.substring(i * 30, (i + 1) * 30);
            newData = newData.replaceAll('\'', '\\\'');
            newData = newData.replaceAll('\\x', '\\\\x');
            newData = newData.replaceAll('\\u', '\\\\u');
            await this.operator_.writeString(`file.write('''${newData}''')\r\n`);
            // console.log('写入', "file.write('''" + newData + "''')\r\n");
        }
        await this.operator_.writeString("file.close()\r\n");
        StatusBar.addValue('Done!\n');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

Web.Ampy = Ampy;

})();
