(() => {

goog.require('Mixly.Url');
goog.require('Mixly.Modules');
goog.provide('Mixly.Electron');

const {
    Url,
    Modules,
    Env,
    Electron
} = Mixly;

const {
    electron_remote,
    path
} = Modules;

const {
    Menu,
    BrowserWindow
} = electron_remote;

Electron.newBrowserWindow = (indexPath, config = {}) => {
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        ...{
            show: false,
            minHeight: 400,
            minWidth: 700,
            width: 0,
            height: 0,
            icon: path.resolve(Env.indexDirPath, '../../../files/mixly.ico'),
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
                spellcheck: false
            }
        },
        ...(config.window ?? {})
    });

    win.loadFile(indexPath);

    win.once('ready-to-show', () => {
        win.maximize();
        win.show();
    });

    return win;
}

})();