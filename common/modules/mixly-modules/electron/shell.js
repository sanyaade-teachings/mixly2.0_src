goog.loadJs('electron', () => {

goog.require('Mixly.Env');
goog.require('Mixly.MString');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Shell');

const {
    Env,
    MString,
    Electron
} = Mixly;

const child_process = Mixly.require('child_process');
const iconv_lite = Mixly.require('iconv-lite');

class Shell {
    static {
        this.ENCODING = Env.currentPlatform == 'win32' ? 'cp936' : 'utf-8';
    }

    constructor() {
        this.shell = null;
    }

    #addEventsListener_() {
        const { mainStatusBarTabs } = Mixly;
        const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
        const { stdout, stderr } = this.shell;
        stdout.on('data', (data) => {
            if (data.length > 1000) {
                return;
            }
            data = iconv_lite.decode(Buffer.from(data, 'binary'), 'utf-8');
            statusBarTerminal.addValue(data);
        });
        stderr.on('data', (data) => {
            let lines = data.split('\n');
            for (let i in lines) {
                let encoding = 'utf-8';
                if (lines[i].indexOf('can\'t open device') !== -1) {
                    encoding = Shell.ENCODING;
                }
                lines[i] = iconv_lite.decode(Buffer.from(lines[i], 'binary'), encoding);
            }
            data = lines.join('\n');
            data = MString.decode(data);
            statusBarTerminal.addValue(data);
        });
    }

    exec(command) {
        return new Promise((resolve, reject) => {
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            const startTime = Number(new Date());
            this.shell = child_process.exec(command, {
                maxBuffer: 4096 * 1000000,
                encoding: 'binary'
            });
            this.#addEventsListener_();
            this.shell.on('close', (code) => {
                const endTime = Number(new Date());
                let timeDiff, second, minute;
                timeDiff = parseInt((endTime - startTime) / 1000);
                minute = parseInt(timeDiff / 60);
                second = timeDiff % 60;
                const time = `${(minute ? `${minute}` : '')}${second}s`;
                const info = { code, time };
                resolve(info);
            });
        });
    }

    kill() {
        this.shell.stdin.end();
        this.shell.stdout.end();
        if (Env.currentPlatform === 'win32') {
            child_process.exec(`taskkill /pid ${this.shell.pid} /f /t`);
        } else {
            this.shell.kill('SIGTERM');
        }
    }
}

Mixly.Electron.Shell = Shell;

});