goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Boards');
goog.provide('Mixly.NavEvents');

const { form } = layui;

const {
    LayerExt,
    NavEvents,
    Boards,
} = Mixly;

NavEvents.init = () => {
    form.on('select(boards-type)', function (data) {
        const boardName = Boards.getSelectedBoardName();
        if (Boards.selected !== boardName) {
            Boards.changeTo(boardName);
        }
        Boards.updateCategories(boardName);
    });

    form.on('select(ports-type)', function (data) {
        $('#mixly-footer-port-div').css('display', 'inline-flex');
        $('#mixly-footer-port').html(data.value);
    });
}
});