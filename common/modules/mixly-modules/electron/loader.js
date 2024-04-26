goog.loadJs('electron', () => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.Loader');

const {
    Url,
    Config,
    Env,
    Electron
} = Mixly;

const { BOARD } = Config;

const { Serial, Loader, File } = Electron;


Loader.onbeforeunload = function(reload = false) {
    const pageReload = (href) => {
        if (!reload) {
            window.location.replace(href);
        } else {
            window.location.reload(true);
        }
    }
    let href = Config.pathPrefix + 'index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType ?? 'None' });
    let portsClosePromise = [];
    const { mainStatusBarTabs } = Mixly;
    Serial.getCurrentPorts().map((port) => {
        const statusBarSerial = mainStatusBarTabs.getStatusBarById(port.name);
        if (statusBarSerial) {
            portsClosePromise.push(statusBarSerial.getSerial().close());
        }
    });
    Promise.all(portsClosePromise)
    .finally(() => {
        pageReload(href);
    });
};

Loader.closePort = (serialport) => {
    return new Promise((resolve, reject) => {
        serialport.close(() => {
            resolve();
        });
    })
}

Loader.reload = () => {
    Loader.onbeforeunload(true);
}

});