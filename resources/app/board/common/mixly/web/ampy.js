//const sleep = async (sec) => new Promise((r) => setTimeout(r, sec * 1000));
goog.provide('Mixly.Web.Ampy');

class Port {
    async init(baudrate = 115200) {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        const serial = navigator.serial;
        //const filter = { usbVendorId: 6790 };
        //this.serialPort = await serial.requestPort({ filters: [filter] });
        this.serialPort = await serial.requestPort();
        const speed = baudrate * 1;
        await this.serialPort.open({
            baudRate: speed,
            bufferSize: 1 * 1024 * 5120,
        });
        this.textEncoder = new TextEncoder();
    }

    async initWithPort(port, reader, writer) {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        this.textEncoder = new TextEncoder();
        this.serialPort = port;
        this.reader = reader;
        this.writer = writer;
    }

    async changeBaud(speed) {
        await this.close();
        await this.serialPort.open({
            baudRate: speed,
            bufferSize: 1 * 1024 * 1024,
        });
        await this.openReader();
        await this.openWriter();
    }

    async close() {
        this.releaseReader();
        this.releaseWriter();
        await this.serialPort.close();
    }

    async openReader() {
        this.reader = await this.serialPort.readable.getReader();
        return this.reader;
    }

    async releaseReader() {
        this.reader.releaseLock();
    }

    async openWriter() {
        this.writer = await this.serialPort.writable.getWriter();
        return this.writer;
    }

    async releaseWriter() {
        this.writer.releaseLock();
    }

    async writeLine(data) {
        var uint8array = this.textEncoder.encode(data + "\r\n");
        await this.writer.write(uint8array);
    }

    async writeArr(arr) {
        var uint8array = new Uint8Array(arr).buffer;
        await this.writer.write(uint8array);
    }

    async restart() {
        await this.serialPort.setSignals({ dataTerminalReady: false });
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.serialPort.setSignals({ dataTerminalReady: true });
    }

    readLine(buf) {
        var text = "";
        var endWithLF = false;
        for (var i = 0; i < buf.length; i++) {
            text += String.fromCharCode(buf[i]);
            if (buf[i] === 0x0a) {
                if (i === buf.length - 1) {
                    endWithLF = true;
                }
                break;
            }
        }
        text = text.trim();
        buf = buf.subarray(i + 1);
        return { text, buf, endWithLF };
    }

    readChar(arr) {
        var readBuf = [];
        var buffLength = 0;
        var nowIndex = -1;
        var text = "";
        /*  UTF-8编码方式
        *   ------------------------------------------------------------
        *   |1字节 0xxxxxxx                                             |
        *   |2字节 110xxxxx 10xxxxxx                                    |
        *   |3字节 1110xxxx 10xxxxxx 10xxxxxx                           |
        *   |4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx                  |
        *   |5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx         |
        *   |6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx|
        *   ------------------------------------------------------------
        */
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i] & 0x80) == 0x00) {
                text = String.fromCharCode(arr[i]);
                nowIndex = i;
                break;
            } else if ((arr[i] & 0xc0) == 0x80) {
                readBuf.push(arr[i]);
                if (readBuf.length >= buffLength) {
                    text = this.decoder.decode(new Uint8Array(readBuf));
                    nowIndex = i;
                    break;
                }
            } else {
                let dataNum = arr[i] & 0xe0;
                switch (dataNum) {
                    case 0xfc:
                        buffLength = 6;
                        break;
                    case 0xf8:
                        buffLength = 5;
                        break;
                    case 0xf0:
                        buffLength = 4;
                        break;
                    case 0xe0:
                        buffLength = 3;
                        break;
                    case 0xc0:
                    default:
                        buffLength = 2;
                }
                readBuf.push(arr[i]);
            }
        }
        if (nowIndex == -1) {
            arr = arr.slice(0);
        } else {
            arr = arr.slice(nowIndex + 1);
        }
        return { text, arr };
    }

    readString(arr) {
        var readStr = "";
        do {
            var { text, arr } = this.readChar(arr);
            readStr += text;
        } while (text);

        return { text: readStr, arr };
    }

    monitorRead(timeout) {
        var self = this;
        setTimeout(function () {
            console.log("monitorRead --> readyToRead:", self.readyToRead);
            if (!self.readyToRead) {
                console.log("read failure !!");
                //self.serialPort.setSignals({ 'break': true });
            }
        }, timeout);
    }

    async readByteArray() {
        this.readyToRead = false;
        //this.monitorRead(timeout);
        //console.log("read len")
        var { value, done } = await this.reader.read();
        var { text, buf } = this.readLine(value);
        var bufSize = parseInt(text);
        var data = new Uint8Array(bufSize);
        //console.log("text:", text, " ,buf:", buf.length,",data:",buf)
        try {
            data.set(buf, 0);
        } catch (e) {
            throw "text:" + text + " ,buf:" + buf.length;
        }
        var readSize = buf.length;
        while (readSize < bufSize) {
            //console.log("try to read...")
            await new Promise((r) => setTimeout(r, 20));
            //this.monitorRead(timeout);
            var { value, done } = await this.reader.read();
            data.set(value, readSize);
            readSize += value.length;
            //console.log("progress:", readSize , '/', bufSize)
        }
        this.readyToRead = true;
        return data;
    }

    async setDTR(value) {
        await this.serialPort.setSignals({ dataTerminalReady: value });
    }

    async setRTS(value) {
        await this.serialPort.setSignals({ requestToSend: value });
    }
}

class Pyboard {
    constructor(message, baudrate = 115200, rawdelay = 0, user = 'micro', password = 'python') {
        this._rawdelay = rawdelay;
        this.debug = message;
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        //this.init(baudrate, filename, code, user, password);
    }

    async init(baudrate, filename, code, user, password) {
        this.port = new Port();
        try {
            await this.port.init(baudrate);
            await this.port.openReader();
            await this.port.openWriter();
            this.debug("已连接串口！");
            //var pyFiles = new Files(this);
            this.put(filename, code);
            //this.read_until(0, "test");
        } catch (e) {
            this.debug("未连接串口！");
        }
    }

    async initWithPort(port, reader, writer) {
        this.port = new Port();
        await this.port.initWithPort(port, reader, writer);
    }

    async put(filename, data) {
        await this.enter_raw_repl();
        await this.exec_("f = open('" + filename + "', 'wb')");
        var size = data.length;
        for (let i = 0; i < size; i += 32) {
            let chunkSize = Math.min(32, size - i);
            let chunk = "b\'" + data.substring(i, chunkSize) + "\'";
            await this.exec_("f.write(" + chunk + ")");
        }
        await this.exec_("f.close()");
        await this.exit_raw_repl();
        console.log("ok")
    }

    close() {
        this.port.close();
    }

    async read_until(min_num_bytes, ending, timeout = 1) {
        var data = await this.port.reader.read();
        var timeCount = 0;
        console.log(this.decoder.decode(data.value).toLowerCase());

        while (true) {
            if (this.decoder.decode(data.value).toLowerCase().indexOf(ending.toLowerCase()) != -1) {
                break;
            } else {
                timeCount++;
                if (timeCount > 10 * timeout) {
                    break;
                } else {
                    await sleep(0.1);
                    if (!data.done) {
                        data = await this.port.reader.read();
                    } else {
                        break;
                    }
                }
            }
        }
        return this.decoder.decode(data.value);
    }

    async enter_raw_repl() {

        // Brief delay before sending RAW MODE char if requests
        if (this._rawdelay > 0) {
            await sleep(this._rawdelay);
        }

        // ctrl-C twice: interrupt any running program
        await this.port.writeArr([3, 13, 10]);
        await sleep(0.1);
        await this.port.writeArr([3]);
        await sleep(0.1);
        await this.port.writeLine("f = open(\'main.py\', \'w\')");
        await sleep(0.1);
        await this.port.writeLine("f.write(\'\')");
        await sleep(0.1);
        this.debug("Empty ./main.py done!\n");

        await this.port.setDTR(false);
        await this.port.setRTS(false);
        await sleep(0.1);
        await this.port.setDTR(true);
        await this.port.setRTS(true);
        await sleep(0.1);

        // Brief delay before sending RAW MODE char if requests
        if (this._rawdelay > 0) {
            await sleep(this._rawdelay);
        }

        await this.port.writeArr([3, 13, 10]);
        await sleep(0.1);
        await this.port.writeArr([3]);
        await sleep(0.1);

        for (var retry = 0; retry < 2; retry++) {
            await this.port.writeArr([13, 1]);
            let data = await this.read_until(1, "raw REPL; CTRL-B to exit\r\n>");
            if (data.indexOf("raw REPL; CTRL-B to exit\r\n>") != -1) {
                break;
            } else {
                if (retry >= 2) {
                    this.debug("could not enter raw repl\n");
                    throw ("could not enter raw repl\n");
                }
                sleep(0.2);
            }
        }

        this.debug("enter raw repl\n");
        /*
        await this.port.writeArr([3, 4]);
        let data = await this.read_until(1, "soft reboot\r\n");
        if (data.toLowerCase().indexOf("soft reboot\r\n") == -1) {
            this.debug("could not enter raw repl\n");
            await this.port.writeArr([3, 4]);
            throw ("could not enter raw repl\n");
        }

        this.debug("enter raw repl\n");
        */
        // By splitting this into 2 reads, it allows boot.py to print stuff,
        // which will show up after the soft reboot and before the raw REPL.
        // Modification from original pyboard.py below:
        //   Add a small delay and send Ctrl-C twice after soft reboot to ensure
        //   any main program loop in main.py is interrupted.
        /*
        await sleep(0.5);
        await this.port.writeArr([3, 13]);
        await sleep(0.1);
        await this.port.writeArr([3, 13]);
        await sleep(1);
        data = await this.read_until(1, "raw REPL; CTRL-B to exit\r\n");
        if (data.toLowerCase().indexOf("raw REPL; CTRL-B to exit\r\n") == -1) {
          this.debug("could not enter raw repl\n");
          throw("could not enter raw repl\n");
        }
    
        this.debug("enter raw repl\n");
        */
    }

    async exit_raw_repl() {
        await this.port.writeArr([13, 2]); // ctrl-B: enter friendly REPL
        this.close();
    }

    async follow(timeout) {
        // wait for normal output
        var data = await this.read_until(1, String.fromCharCode(4), timeout);
        if (data.indexOf(String.fromCharCode(4)) == -1) {
            this.debug("timeout waiting for first EOF reception\n");
            throw ("timeout waiting for first EOF reception");
        }

        // wait for error output
        var dataErr = await this.read_until(1, String.fromCharCode(4), timeout);
        if (dataErr.indexOf(String.fromCharCode(4)) == -1) {
            this.debug("timeout waiting for second EOF reception\n");
            throw ("timeout waiting for second EOF reception");
        }

        // return normal and error output
        return [data, dataErr];
    }

    async exec_raw_no_follow(command) {
        // check we have a prompt
        /*
        var data = await this.read_until(1, ">");
        if (data.indexOf(">") == -1) {
          this.debug("could not enter raw repl\n");
          throw("could not enter raw repl");
        }
        */
        var commandBytes;
        if (typeof command == "object") {
            commandBytes = command;
        } else {
            commandBytes = this.encoder.encode(command);
        }

        for (let i = 0; i < commandBytes.length; i += 256) {
            await this.port.writeArr(commandBytes.slice(i, Math.min(i + 256, commandBytes.length)));
            await sleep(0.01);
        }
        await this.port.writeArr([4]);

        // check if we could exec command
        /*
        var data = await this.read_until(1, "OK");
        if (data.indexOf("OK") == -1 || data.indexOf("ra") != -1) {
          this.debug("could not exec command\n");
          throw("could not exec command");
        }
        */
    }

    async exec_raw(command, timeout = 10) {
        await this.exec_raw_no_follow(command);
        //return await this.follow(timeout);
    }

    async exec_(command) {
        await this.exec_raw(command);
        /*
        [ret, retErr] = await this.exec_raw(command);
        if (retErr) {
          this.debug("exception" + ret + retErr + "\n");
          throw("exception" + ret + retErr);
        }
        return ret;
        */
    }
    /*
    async read_until(min_num_bytes, ending, timeout = 1) {
      var rtnInfo = "";
      var readData = "";
      var timeoutCount = 0;
      //var readArr = [];
      //var length = 0;
      do {
        //await sleep(0.1);
        var { value, done } = await this.port.reader.read();
        //if (typeof buf != "undefined" && buf.length != 0) {
        //  for (var i = 0;i < value.length; i++) {
        //    buf.push(value[i]);
        //  }
        //} else {
          if (typeof arr != "undefined") {
            var arr = [...arr, ...value];
          } else {
            var arr = [...value];
          }
          //length += buf.length;
          //console.log(length)
          //readArr = [...readArr, ...buf];
        //}
        //readData += this.decoder.decode(buf);
        //console.log(readData);
        do {
          var { text, arr } = this.port.readString(arr);
          rtnInfo += text;
          if (text) {
            this.debug("%c" + rtnInfo, "color:red;");
          }
          //var { text, buf, endWithLF } = this.port.readLine(buf);
          //rtnInfo += text + (endWithLF?"\r\n" : "");
          //if (endWithLF) {
          //  rtnInfo += text + "\r\n";
          //}
          //this.debug(rtnInfo);
        //} while (buf.length > 0);
        } while (text);
      } while (rtnInfo.indexOf(ending) == -1);
    }
    */
}

class Files {
    constructor(pyboard) {
        this._pyboard = pyboard;
        //this.put("main.py", "print(\"Hello World! 2021-08-13\")");
    }

    async put(filename, data) {
        await this._pyboard.enter_raw_repl();
        await this._pyboard.exec_("f = open('" + filename + "', 'wb')");
        var size = data.length;
        for (let i = 0; i < size; i += 32) {
            let chunkSize = Math.min(32, size - i);
            let chunk = "b\'" + data.substring(i, chunkSize) + "\'";
            await this._pyboard.exec_("f.write(" + chunk + ")");
        }
        await this._pyboard.exec_("f.close()");
        await this._pyboard.exit_raw_repl();
        console.log("ok")
    }
}
