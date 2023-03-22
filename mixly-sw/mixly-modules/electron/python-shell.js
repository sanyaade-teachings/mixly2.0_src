(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.PythonShell');

const {
    Env,
    Modules,
    Electron
} = Mixly;

const { fs_extra, fs_extend } = Modules;

const { PythonShell } = Electron;

PythonShell.init = () => {
    if (!Env.isElectron)
        return;
    Modules.python_shell = require('python-shell');
    if (Env.currentPlatform !== 'win32' && fs_extend.isfile('/usr/local/bin/python3')) {
        Env.python3Path = '/usr/local/bin/python3';
    }
    PythonShell.OPTIONS = {
        pythonPath: Env.python3Path,
        pythonOptions: ['-u'],
        encoding: "binary",
        mode: 'utf-8'
    };
}

PythonShell.run = (indexPath, pyFilePath) => {
    const { python_shell } = Modules;
    indexPath = decodeURIComponent(indexPath);
    pyFilePath = decodeURIComponent(pyFilePath);
    if (!Env.isElectron)
        return;
    const shell = new python_shell.PythonShell(pyFilePath, {
        ...PythonShell.OPTIONS,
        args: [ Env.clientPath, indexPath ]
    });
}

})();