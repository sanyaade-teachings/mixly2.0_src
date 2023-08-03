goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Boards');
goog.require('Mixly.Editor');
goog.provide('Mixly.NavEvents');

const { form } = layui;

const {
    LayerExt,
    NavEvents,
    Boards,
    Editor
} = Mixly;

NavEvents.init = () => {
    form.on('select(boards-type)', function (data) {
        const boardName = Boards.getSelectedBoardName();
        if (Boards.selected !== boardName) {
            Boards.changeTo(boardName);
            try {
                var xmlDom = Blockly.Xml.workspaceToDom(Editor.blockEditor);
                Editor.blockEditor.clear();
                Blockly.Xml.domToWorkspace(xmlDom, Editor.blockEditor);
                const { blockEditor, selected } = Editor.mainEditor;
                if (selected === 'BLOCK') {
                    blockEditor.updateCode();
                }
            } catch (error) {
                console.log(error);
            }
        }
        Boards.updateCategories(boardName);
    });

    form.on('select(ports-type)', function (data) {
        $('#mixly-footer-port-div').css('display', 'inline-flex');
        $('#mixly-footer-port').html(data.value);
    });
}
});