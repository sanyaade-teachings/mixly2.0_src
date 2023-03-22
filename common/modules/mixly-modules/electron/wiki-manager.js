(() => {

goog.require('Code');
goog.require('Mixly.Modules');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.WikiManager');

const {
    Modules,
    Config,
    Env,
    Msg,
    Electron
} = Mixly;

const { WikiManager } = Electron;

const { BOARD } = Config;

const {
    path,
    fs,
    fs_extra,
    fs_extend,
    json2md,
    electron_remote
} = Modules;

const { ipcMain } = electron_remote;


const electronLocalshortcut = require('electron-localshortcut');

class WikiPage {
    constructor(indexPath, gotoInfo = null) {
        this.gotoInfo = gotoInfo;
        this.updateContentFile();
        this.win = Electron.newBrowserWindow(indexPath);
        this.isDestroyed = false;
        this.addReceiveCommandEvent();
        this.addLocalShortcutEvent();
        this.win.on('close', () => {
            this.isDestroyed = true;
        });
        $(window).unload(() => {
            if (!this.isDestroyed)
                this.win.close();
        });
    }

    addLocalShortcutEvent() {
        //打开或关闭开发者工具
        electronLocalshortcut.register(this.win, 'CmdOrCtrl+Shift+I', () => {
            if (!this.isDestroyed)
                this.win.webContents.toggleDevTools();
        });

        //重载页面
        electronLocalshortcut.register(this.win, 'CmdOrCtrl+R', () => {
            this.reload();
        });
    }
    
    addReceiveCommandEvent() {
        ipcMain.on('command', (event, command) => {
            if (typeof command !== 'object') return;

            switch (command.func) {
            case 'getPath':
                this.updateWiki();
                break;
            }
        });
    }

    sendCommand(command) {
        if (this.isDestroyed || typeof command !== 'object') return;
        this.win.webContents.send('command', command);
    }

    reload() {
        if (!this.isDestroyed) {
            this.updateContentFile();
            this.win.reload();
        }
    }

    getPagePath(contentPath, contentList) {
        if (typeof contentList !== 'object' || !contentPath.length) return null;
        if (contentPath.length === 1) {
            for (let key in contentList) {
                const child = contentList[key];
                if (child?.link?.title !== contentPath[0]) {
                    continue;
                }
                const { title, source } = child.link;
                if (title !== contentPath[0] || typeof source !== 'string') {
                    return null;
                }
                try {
                    const filePath = source.match(/(?<=(\?file=))[^\s]*/g);
                    if (filePath?.length) {
                        return filePath[0];
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
            return null;
        } else {
            for (let key in contentList) {
                const child = contentList[key];
                if (child
                 && child.length === 2
                 && child[0].h5 === contentPath[0]) {
                    let childPath = [ ...contentPath ];
                    childPath.shift();
                    return this.getPagePath(childPath, child[1].ul);
                }
            }
        }
    }

    goto(pageList, scrollPos) {
        const args = [];
        const pagePath = this.getPagePath(pageList, this.contentList);
        if (!pageList) return;
        args.push(pagePath);
        scrollPos && args.push(scrollPos);
        this.sendCommand({
            func: 'goto',
            args
        });
        this.win.focus();
    }

    updateContentFile() {
        const wikiContentPath = path.resolve(Env.indexDirPath, './wiki/content.md');
        const defaultWikiPath = path.resolve(Env.indexDirPath, './wiki/wiki-libs/' + Code.LANG);
        const wikiHomePagePath = path.resolve(defaultWikiPath, './home');
        const thirdPartyLibsPath = path.resolve(Env.indexDirPath, './libraries/ThirdParty/');
        const changelogPath = path.resolve(Env.clientPath, './CHANGELOG');
        const wikiList = [];
        if (fs_extend.isfile(wikiHomePagePath + '.md'))
            wikiList.push({ h4: { link: { title: Msg.Lang['首页'], source: '?file=' + encodeURIComponent(wikiHomePagePath) } } });
        if (fs_extend.isdir(defaultWikiPath)) {
            const childContentList = this.getContentJson(defaultWikiPath, BOARD.boardType);
            if (childContentList)
                wikiList.push(childContentList);
        }
        if (fs_extend.isdir(thirdPartyLibsPath)) {
            const libsName = fs.readdirSync(thirdPartyLibsPath);
            for (let name of libsName) {
                const libWikiPath = path.resolve(thirdPartyLibsPath, './' + name + '/wiki/' + Code.LANG);
                if (fs_extend.isdir(libWikiPath)) {
                    const childContentList = this.getContentJson(libWikiPath, name);
                    if (childContentList) {
                        wikiList.push(childContentList);
                    }
                }
            }
        }
        this.contentList = wikiList;
        try {
            const md = json2md(wikiList);
            const lineList = md.split('\n');
            for (let i = 0; i < lineList.length; i++) {
                if (!lineList[i].replaceAll(' ', '')) {
                    lineList.splice(i, 1);
                    i--;
                } else {
                    if (!lineList[i].indexOf('#####'))
                        lineList[i] = '\n' + lineList[i];
                }
            }
            fs_extra.outputFile(wikiContentPath, lineList.join('\n'));
        } catch (error) {
            console.log(error);
        }
    }

    updateWiki() {
        const args = [
            {
                default: path.resolve(Env.indexDirPath, './wiki/wiki-libs/'),
                thirdParty: path.resolve(Env.indexDirPath, './libraries/ThirdParty/'),
                content: path.resolve(Env.indexDirPath, './wiki/content.md')
            }
        ];
        if (this.gotoInfo) {
            const { page, scrollPos } = this.gotoInfo;
            const pagePath = this.getPagePath(this.gotoInfo.page, this.contentList);
            if (pagePath) {
                const goto = [];
                goto.push(pagePath);
                scrollPos && goto.push(scrollPos);
                args[0].goto = goto;
            }
            this.gotoInfo = null;
        }
        this.sendCommand({
            func: 'setPath',
            args
        });
    }

    getContentJson(dirPath, title = null) {
        const dirNameList = path.basename(dirPath).split('-');
        if (dirNameList.length !== 2 && !title) return null;
        const contentList = [];
        contentList.push({ h5: title ?? dirNameList[1] });
        contentList.push({ ul: [] });
        const { ul } = contentList[1];
        const keyList = fs.readdirSync(dirPath);
        for (let key of keyList) {
            const nowPath = path.resolve(dirPath, './' + key);
            if (fs_extend.isdir(nowPath)) {
                const childContentList = this.getContentJson(nowPath);
                if (childContentList && childContentList[1].ul.length)
                    ul.push(childContentList);
            } else {
                const extname = path.extname(key);
                if (extname !== '.md') continue;
                const fileNameList = path.basename(key, '.md').split('-');
                if (fileNameList.length !== 2) continue;
                const newPath = path.resolve(path.dirname(nowPath), './' + path.basename(key, '.md'));
                ul.push({ link: { title: fileNameList[1], source: '?file=' + encodeURIComponent(newPath) + ' \"' + fileNameList[1] + '\"' } });
            }
        }
        return contentList;
    }
}

WikiManager.WikiPage = WikiPage;

WikiManager.openWiki = (gotoInfo) => {
    const goto = (gotoInfo && typeof gotoInfo === 'object') ? gotoInfo[Code.LANG] : null;
    if (!WikiManager.wiki || WikiManager.wiki.isDestroyed) {
        const wikiPath = path.resolve(Env.indexDirPath, '../../../common/wiki/index.html');
        if (fs_extend.isfile(wikiPath)) {
            WikiManager.wiki = new WikiPage(wikiPath, goto);
        } else {
            layer.msg(Msg.Lang['未找到Wiki页'], { time: 1000 });
        }
    } else {
        const { win } = WikiManager.wiki;
        win && win.focus();
        if (goto) {
            const { page, scrollPos } = goto;
            WikiManager.wiki.goto(page, scrollPos);
        }
    }
}

WikiManager.registerContextMenu = () => {
    const openWikiPage = {
        displayText: Msg.Lang['打开Wiki'],
        preconditionFn: function(scope) {
            const { wiki } =  scope.block;
            if (typeof wiki === 'object') {
                if (typeof wiki[Code.LANG] === 'object'
                 && typeof wiki[Code.LANG].page === 'object') {
                    return 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(scope) {
            const { wiki } =  scope.block;
            WikiManager.openWiki(wiki);
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        id: 'wiki_open',
        weight: 200
    };
    Blockly.ContextMenuRegistry.registry.register(openWikiPage);
}

})();