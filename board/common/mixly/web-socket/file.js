(() => {

goog.require('layui');
goog.require('Mixly.MFile');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.WebSocket.File');

const { MFile } = Mixly;
const { Socket, File } = Mixly.WebSocket;

File.saveToCloud = () => {
    layer.prompt({
        title: '保存到云端'
    }, function(value, index, elem) {
      layer.close(index);
    });
}

})();