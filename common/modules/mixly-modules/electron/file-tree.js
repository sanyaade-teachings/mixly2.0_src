goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.Debug');
goog.require('Mixly.Electron.FS');
goog.provide('Mixly.Electron.FileTree');

const {
    FileTree,
    Events,
    Registry,
    Debug,
    Electron
} = Mixly;
const { FS } = Electron;

const chokidar = Mixly.require('chokidar');

class FileTreeExt extends FileTree {
    static {
        this.worker = new Worker('../common/modules/mixly-modules/workers/node-file-watcher.js', {
            name: 'nodeFileWatcher'
        });
        this.watcherEventsRegistry = new Registry();
        this.worker.addEventListener('message', (event) => {
            const { data } = event;
            const events = this.watcherEventsRegistry.getItem(data.watcher);
            if (!events) {
                return;
            }
            events.run('change', data);
        });
        this.worker.addEventListener('error', (event) => {
            Debug.error(event);
        });

        this.addEventListener = function(folderPath, func) {
            FileTreeExt.watch(folderPath);
            let events = this.watcherEventsRegistry.getItem(folderPath);
            if (!events) {
                events = new Events(['change']);
                this.watcherEventsRegistry.register(folderPath, events);
            }
            return events.bind('change', func);
        }

        this.removeEventListener = function(folderPath, eventId) {
            let events = this.watcherEventsRegistry.getItem(folderPath);
            if (!events) {
                return;
            }
            if (!events.length('change')) {
                this.watcherEventsRegistry.unregister(folderPath);
                this.unwatch(folderPath);
            }
        }

        this.watch = function(folderPath) {
            FileTreeExt.worker.postMessage({
                func: 'watch',
                args: [folderPath]
            });
        }

        this.unwatch = function(folderPath) {
            FileTreeExt.worker.postMessage({
                func: 'unwatch',
                args: [folderPath]
            });
        }
    }

    constructor(element, mprogress) {
        super(element, mprogress, FS);
        this.watcher = null;
        this.watcherEventsListenerIdRegistry = new Registry();
    }

    async getContent(inPath) {
        let output = [];
        const status = await FS.isDirectory(inPath);
        if (!status) {
            return output;
        }
        const children = await FS.readDirectory(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (await FS.isDirectory(dataPath)) {
                const isDirEmtpy = await FS.isDirectoryEmpty(dataPath);
                output.push({
                    type: 'folder',
                    id: dataPath,
                    children: !isDirEmtpy
                });
                if (isDirEmtpy) {
                    this.watchEmptyFolder(dataPath);
                }
            } else {
                output.push({
                    type: 'file',
                    id: dataPath,
                    children: false
                });
            }
        }
        return output;
    }

    watchFolder(folderPath) {
        super.watchFolder(folderPath);
        let id = this.watcherEventsListenerIdRegistry.getItem(folderPath);
        if (id) {
            return;
        }
        id = FileTreeExt.addEventListener(folderPath, (data) => {
            if (data.event === 'unlinkDir') {
                this.unwatchFolder(path.join(data.path));
            }
            const watcherPath = path.join(data.watcher);
            if (this.isWatched(watcherPath)) {
                this.refreshFolder(watcherPath);
            }
        });
        this.watcherEventsListenerIdRegistry.register(folderPath, id);
    }

    watchEmptyFolder(folderPath) {
        super.watchFolder(folderPath);
        let id = this.watcherEventsListenerIdRegistry.getItem(folderPath);
        if (id) {
            return;
        }
        id = FileTreeExt.addEventListener(folderPath, (data) => {
            const watcherPath = path.join(data.watcher);
            if (this.isWatched(watcherPath)) {
                this.refreshFolder(watcherPath);
            }
            if (this.isClosed(watcherPath)) {
                this.unwatchFolder(watcherPath);
            }
        });
        this.watcherEventsListenerIdRegistry.register(folderPath, id);
    }

    unwatchFolder(folderPath) {
        const keys = this.watchRegistry.keys();
        for (let key of keys) {
            if (key.indexOf(folderPath) === -1) {
                continue;
            }
            const type = this.watchRegistry.getItem(key);
            if (type === 'file') {
                this.unwatchFile(key);
            }
            const id = this.watcherEventsListenerIdRegistry.getItem(key);
            if (!id) {
                continue;
            }
            FileTreeExt.removeEventListener(key, id);
            this.watcherEventsListenerIdRegistry.unregister(key);
        }
        super.unwatchFolder(folderPath);
    }
}

Electron.FileTree = FileTreeExt;

});