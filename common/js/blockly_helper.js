
'use strict'

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
    const { Storage, MFile, Title } = Mixly;
    const mix = MFile.getMix();
    Storage.board('mix', mix);
    Storage.board('path', Title.getFilePath());
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
    const { Electron = {}, Title, LocalStorage, Storage, MFile } = Mixly;
    const filePath = LocalStorage.get(`${LocalStorage.PATH['USER']}/filePath`);
    const mix = Storage.board('mix');
    const openedPath = Storage.board('path');
    if (filePath) {
        LocalStorage.set(`${LocalStorage.PATH['USER']}/filePath`, '');
    }
    if (filePath) {
        if (!goog.isElectron) {
            return;
        }
        const { File } = Electron;
        File.openFile(filePath);
    } else if (mix) {
        MFile.parseMix($(mix));
        if (openedPath && goog.isElectron) {
            const { File } = Electron;
            File.openedFilePath = openedPath;
            File.workingPath = path.dirname(openedPath);
            Title.updeteFilePath(File.openedFilePath);
        }
    }
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
    window.setTimeout(restore_blocks, 200);
    bindEvent(window, 'unload', backup_blocks);
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
    if (element.addEventListener) {  // W3C
        element.addEventListener(name, func, false);
    } else if (element.attachEvent) {  // IE
        element.attachEvent('on' + name, func);
    }
}