goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.Electron.FS');
goog.provide('Mixly.Electron.FileTree');

const {
    FileTree,
    Events,
    Registry,
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
            console.log(event);
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
            events.unbind(eventId);
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

    constructor(element) {
        super(element);
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
                    type: 'dir',
                    id: dataPath,
                    children: !isDirEmtpy
                });
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
        let id = this.watcherEventsListenerIdRegistry.getItem(folderPath);
        if (id) {
            return;
        }
        id = FileTreeExt.addEventListener(folderPath, (data) => {
            this.refreshFolder(path.join(data.watcher));
        });
        this.watcherEventsListenerIdRegistry.register(folderPath, id);
    }

    unwatchFolder(folderPath) {
        const id = this.watcherEventsListenerIdRegistry.getItem(folderPath);
        if (!id) {
            return;
        }
        FileTreeExt.removeEventListener(folderPath, id);
        this.watcherEventsListenerIdRegistry.unregister(folderPath);
    }
}

Electron.FileTree = FileTreeExt;

});