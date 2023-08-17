goog.loadJs('electron', () => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.Loader');

const {
    Url,
    Config,
    Electron,
    Env
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
    Serial?.refreshPortsTimer && clearInterval(Serial?.refreshPortsTimer);
    const portsObj = Serial?.portsOperator ?? null;
    if (goog.isElectron && portsObj && typeof portsObj === 'object') {
        if (Object.keys(portsObj).length) {
            let portsClosePromise = [];
            for (let i in portsObj) {
                const { serialport } = portsObj[i];
                if (serialport && (serialport.isOpen || serialport.opening))
                    portsClosePromise.push(Loader.closePort(serialport));
            }
            Promise.all(portsClosePromise)
            .then(() => {
            })
            .catch((error) => {
            })
            .finally(() => {
                pageReload(href);
            });
            return;
        }
    }
    pageReload(href);
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