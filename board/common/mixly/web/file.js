(() => {

goog.require('Mixly.MFile');
goog.require('Mixly.Editor');
goog.require('Mixly.Drag');
goog.provide('Mixly.Web.File');

const { MFile, Editor, Drag, Web } = Mixly;
const { File } = Web;

File.open = () => {
	const filters = '.' + MFile.openFilters.join(',.');
	MFile.openFile(filters, 'text', (fileObj) => {
		let { data, filename } = fileObj;
		const filesuffix = filename.substring(filename.lastIndexOf('.'), filename.length);
		switch (filesuffix) {
        case '.mix':
        case '.xml':
            try {
                data = data.replace(/\\(u[0-9a-fA-F]{4})/g, function (s) {
                    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/g, '%$1'));
                });
            } catch (error) {
                console.log(error);
            }
            MFile.parseMix($(data), false, false, (message) => {
                if (message) {
                    switch (message) {
                        case 'USE_CODE':
                            // console.log('已从code标签中读取代码');
                            break;
                        case 'USE_INCOMPLETE_BLOCKS':
                            // console.log('一些块已被忽略');
                            break;
                    }
                    Blockly.mainWorkspace.scrollCenter();
                    Blockly.hideChaff();
                }
            });
            break;
        case '.ino':
        case '.py':
            Drag.items.vDrag.full('NEGATIVE'); // 完全显示代码编辑器
            Editor.codeEditor.setValue(data, -1);
            break;
        case '.bin':
        case '.hex':
            MFile.loadHex(data);
            break;
        default:
            layer.msg(indexText['文件后缀错误'], { time: 1000 });
        }
	});
}

File.saveAs = () => {

}

File.saveCode = () => {

}

File.saveMix = () => {

}

File.saveImg = () => {

}

File.saveHex = () => {

}

})();