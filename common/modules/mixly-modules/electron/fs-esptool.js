goog.loadJs('electron', () => {

goog.require('layui');
goog.require('path');
goog.require('Mustache');
goog.require('Mixly.Env');
goog.require('Mixly.FSEsptool');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Debug');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron.Shell');
goog.provide('Mixly.Electron.FSEsptool');

const {
    Env,
    FSEsptool,
    LayerExt,
    Debug,
    Msg,
    Electron = {}
} = Mixly;

const { Shell } = Electron;

const fs_extra = Mixly.require('fs-extra');

const { layer } = layui;


class FSEsptoolExt extends FSEsptool {
    static {
        this.UPLOAD_TEMPLATE = '"{{&fsTool}}" -c "{{&usrFolder}}" -b 4096 -p 256 -s {{&size}} "{{&target}}"'
            + ' && '
            + '"{{&python3}}" "{{&esptool}}" --port {{&port}} --baud 921600 --after no_reset write_flash -z {{&offset}} "{{&target}}"';
        this.DOWNLOAD_TEMPLATE = '"{{&python3}}" "{{&esptool}}" --port {{&port}} --baud 921600 --after no_reset read_flash {{&offset}} {{&size}} "{{&target}}"'
            + ' && '
            + '"{{&fsTool}}" -u "{{&usrFolder}}" -b 4096 -p 256 -s {{&size}} "{{&target}}"';
    }

    #shell_ = null;

    constructor() {
        super();
        this.#shell_ = new Shell();
    }

    download(usrFolder) {
        super.download(usrFolder);
        const layerNum = layer.open({
            type: 1,
            title: "下载中...",
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: () => {
                $(".layui-layer-page").css("z-index", "198910151");
                $("#mixly-loader-btn").off("click").click(() => {
                    $("#mixly-loader-btn").css('display', 'none');
                    layer.title('下载终止中...', layerNum);
                    this.cancel();
                });
                const { mainStatusBarTabs } = Mixly;
                const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                statusBarTerminal.setValue('');
                mainStatusBarTabs.changeTo('output');
                const command = this.#renderTemplate_(FSEsptoolExt.DOWNLOAD_TEMPLATE);
                this.#shell_.exec(command)
                .then((info) => {
                    if (info.code) {
                        statusBarTerminal.addValue("\n==下载失败==\n");
                    } else {
                        statusBarTerminal.addValue(`\n==下载成功(${Msg.Lang["用时"]} ${info.time})==\n`);
                    }
                })
                .catch(Debug.error)
                .finally(() => {
                    layer.close(layerNum);
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
                $("#mixly-loader-btn").css('display', 'inline-block');
            }
        });
    }

    upload(usrFolder) {
        super.upload(usrFolder);
        const layerNum = layer.open({
            type: 1,
            title: "上传中...",
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: () => {
                $(".layui-layer-page").css("z-index", "198910151");
                $("#mixly-loader-btn").off("click").click(() => {
                    $("#mixly-loader-btn").css('display', 'none');
                    layer.title('上传终止中...', layerNum);
                    this.cancel();
                });
                const { mainStatusBarTabs } = Mixly;
                const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                statusBarTerminal.setValue('');
                mainStatusBarTabs.changeTo('output');
                const command = this.#renderTemplate_(FSEsptoolExt.UPLOAD_TEMPLATE);
                this.#shell_.exec(command)
                .then((info) => {
                    if (info.code) {
                        statusBarTerminal.addValue("\n==上传失败==\n");
                    } else {
                        statusBarTerminal.addValue(`\n==上传成功(${Msg.Lang["用时"]} ${info.time})==\n`);
                    }
                })
                .catch(Debug.error)
                .finally(() => {
                    layer.close(layerNum);
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
                $("#mixly-loader-btn").css('display', 'inline-block');
            }
        });
    }

    #renderTemplate_(template) {
        const config = this.getConfig();
        const targetFolder = path.join(Env.boardDirPath, 'build/esptool/');
        return Mustache.render(template, {
            port: config.port,
            size: config.size,
            offset: config.offset,
            target: path.join(targetFolder, 'script.img'),
            fsTool: path.join(targetFolder, 'mkspiffs'),
            usrFolder: config.usrFolder,
            python3: Env.python3Path,
            esptool: path.join(Env.srcDirPath, 'pyTools/esptool/__init__.py')
        })
    }

    cancel() {
        this.#shell_ && this.#shell_.kill();
    }
}

Electron.FSEsptool = FSEsptoolExt;

});