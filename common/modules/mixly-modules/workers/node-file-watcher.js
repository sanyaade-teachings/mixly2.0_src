const chokidar = require('chokidar');
const path = require('path');

let watchedPath = {};

const watch = function(inPath) {
    if (watchedPath[watchedPath]) {
        return;
    }
    watchedPath[inPath] = chokidar.watch(inPath, {
        persistent: true,
        depth: 0,
        ignoreInitial: true
    });

    watchedPath[inPath].on('add', (path, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'add',
            path,
            stats
        });
    });

    watchedPath[inPath].on('addDir', (path, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'addDir',
            path,
            stats
        });
    });

    watchedPath[inPath].on('unlink', (path, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'unlink',
            path,
            stats
        });
    });

    watchedPath[inPath].on('unlinkDir', (path, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'unlinkDir',
            path,
            stats
        });
    });
}

const unwatch = function(inPath) {
    if (!watchedPath[inPath]) {
        return;
    }
    watchedPath[inPath].close();
    delete watchedPath[inPath];
}

self.addEventListener('message', function(event) {
    if (event.data.func === 'watch') {
        watch(...event.data.args);
    } else if (event.data.func === 'unwatch') {
        unwatch(...event.data.args);
    }
});