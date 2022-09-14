(() => {

goog.require('Mixly.Url');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Config');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Url');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.Web.BU');
goog.provide('Mixly.WebCompiler.Compiler');

const {
    WebCompiler,
    Url,
    Boards,
    MFile,
    StatusBar,
    Config,
    LayerExt,
    Web
} = Mixly;
const { SOFTWARE, BOARD } = Config;
const { Compiler } = WebCompiler;
const { BU } = Web;

const DEFAULT_CONFIG = {
    "enabled": true,
    "port": 8082,
    "protocol": "http:",
    "ip": "localhost"
}
Compiler.CONFIG = { ...DEFAULT_CONFIG, ...(SOFTWARE?.webCompiler ?? {}) };
const { CONFIG } = Compiler;
Compiler.URL = CONFIG.protocol + '//' + CONFIG.ip + ':' + CONFIG.port + '/';

Compiler.compile = () => {
    StatusBar.show(1);
    StatusBar.setValue('');
    Compiler.generateCommand('compile', (error, data, layerNum) => {
        layer.close(layerNum);
        if (error) {
            layer.msg('编译失败', { time: 1000 });
        } else {
            layer.msg('编译成功', { time: 1000 });
        }
    });
}

Compiler.upload = async () => {
    StatusBar.show(1);
    StatusBar.setValue('');
    BU.burning = true;
    BU.uploading = false;
    const board = Boards.getSelectedBoardKey();
    const boardParam = board.split(':');
    if (boardParam[1] === 'avr') {
        let boardUpload;
        switch (boardParam[2]) {
            case 'uno':
                boardUpload = 'uno';
                break;
            case 'nano':
                if (boardParam.length > 3 && boardParam[3] === 'cpu=atmega328old') {
                    boardUpload = 'nanoOldBootloader';
                } else {
                    boardUpload = 'nano';
                }
                break;
            case 'pro':
                boardUpload = 'proMini';
                break;
        }
        try {
            await AvrUploader.connect(boardUpload, {});
            Compiler.generateCommand('upload', BU.uploadWithAvrUploader);
        } catch (error) {
            StatusBar.addValue(error.toString() + '\n');
        }
    } else {
        try {
            await BU.justConnect();
        } catch (e) {
            console.log(e);
            StatusBar.addValue("已取消上传\n");
            BU.burning = false;
            BU.uploading = false;
            return;
        }
        Compiler.generateCommand('upload', BU.uploadWithEsptool);
    }
}

Compiler.generateCommand = (operate, endFunc = (errorMessage, data, layerNum) => {}) => {
    const code = MFile.getCode();
    let type;
    const boardType = Boards.getSelectedBoardCommandParam();
    let command = {
        board: encodeURIComponent(boardType),
        code: encodeURIComponent(code),
        visitorId: BOARD.visitorId.str32CRC32b,
        operate
    };
    let commandStr = Compiler.URL + '/?' + Url.jsonToUrl(command);
    StatusBar.setValue('send -> ' + commandStr + '\n');
    console.log('send -> ', commandStr);
    const compileLayer = layer.open({
        type: 1,
        title: indexText["编译中"] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        closeBtn: 0,
        success: function () {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(compileLayer);
                layer.msg('已取消编译', { time: 1000 });
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $(".layui-layer-shade").remove();
        }
    });
    Compiler.sendCommand(compileLayer, commandStr, endFunc);
}

Compiler.sendCommand = (layerType, command, endFunc = (errorMessage, data, layerNum) => {}) => {
    /*
    fetch(command).then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.blob();
        }
        throw new Error('Network response was not ok.');
    }).then(function(myBlob) { 
        var objectURL = URL.createObjectURL(myBlob); 
        console.log(objectURL);
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
    */
    let req = new Request(command);
    fetch(req, {
        credentials: 'omit', // 设置不传递cookie
        mode: 'cors', // 设置请求不允许跨域
    }).then(res => {
        console.log(res)
        return res.text();
    }).then((data) => {
        const dataObj = JSON.parse(data);
        console.log(dataObj);
        if (dataObj.error) {
            StatusBar.addValue(decodeURIComponent(dataObj.error));
            endFunc(true, null, layerType);
        } else {
            StatusBar.addValue(decodeURIComponent(dataObj.compileMessage));
            endFunc(false, dataObj.data, layerType);
        } 
    })
    .catch((error) => {
        endFunc(true, error.toString(), layerType);
    });
}

})();