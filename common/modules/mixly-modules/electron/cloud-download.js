goog.loadJs('electron', () => {

goog.require('Mixly.Modules');
goog.require('Mixly.Env');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.CloudDownload');

const {
    Modules,
    Env,
    Electron
} = Mixly;

const { CloudDownload } = Electron;

const {
    fs_extra,
    fs_extend,
    node_downloader_helper,
    path
} = Modules;

CloudDownload.getJson = (url, downloadDir, endFunc) => {
    if (url) {
        CloudDownload.download(url, downloadDir)
        .then((message) => {
            if (message[0])
                throw message[0];
            else
                return fs_extra.readJson(message[1]);
        })
        .then((configObj) => {
            endFunc([null, configObj]);
        })
        .catch((error) => {
            endFunc([error, null]);
        });
    } else {
        endFunc(['url读取出错！', null]);
    }
}

CloudDownload.download = (url, downloadDir, options = {}) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_OPTIONS = {
            progress: null,
            end: null,
            error: null
        }
        if (typeof options !== 'object')
            options = DEFAULT_OPTIONS;
        else
            options = { ...DEFAULT_OPTIONS, ...options };
        try {
            fs_extra.ensureDirSync(downloadDir);
            const fileName = path.basename(url);
            const filePath = path.resolve(downloadDir, './' + fileName);
            if (fs_extend.isfile(filePath))
                fs_extra.removeSync(filePath);
        } catch (error) {
            resolve([error, url]);
            return;
        }
        const { DownloaderHelper } = node_downloader_helper;
        const dl = new DownloaderHelper(url, downloadDir, {
            override: true,
            timeout: 15000,
            retry: false
        });
        dl.on('progress', (stats) => {
            if (typeof options.progress === 'function') {
                options.progress(stats);
            }
        });
        dl.on('end', (downloadInfo) => {
            if (typeof options.end === 'function') {
                options.end(downloadInfo);
            }
            resolve([null, downloadInfo.filePath]);
        });
        dl.on('error', (error) => {
            console.log('Download Failed', error);
            if (typeof options.error === 'function') {
                options.error(error);
            }
            resolve([error, url]);
        });
        dl.on('timeout', () => {
            console.log('Download Timeout');
            if (typeof options.timeout === 'function') {
                options.timeout('Download Timeout');
            }
            resolve(['Download Timeout', url]);
        });
        dl.start().catch((error) => {
            console.log('Download Failed', error);
            if (typeof options.error === 'function') {
                options.error(error);
            }
            resolve([error, url]);
        });
    });
}

});