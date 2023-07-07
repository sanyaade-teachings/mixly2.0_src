goog.loadJs('electron', () => {

goog.require('Mixly.Command');
goog.require('Mixly.Modules');
goog.require('Mixly.Config');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Events');

const { Command, Modules, Config, Electron } = Mixly;
const { Events } = Electron;
const { SOFTWARE } = Config;

Modules.ipcRenderer = require('electron').ipcRenderer;

Modules.ipcRenderer.on('command', (event, message) => {
    if (SOFTWARE.debug)
        console.log('receive -> ', message);
    const commandObj = Command.parse(message);
    Command.run(commandObj);
});

});