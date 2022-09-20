(() => {

goog.require('layui');
goog.require('Mixly');
goog.provide('Mixly.LevelSelector');

const { LevelSelector } = Mixly;

const { form } = layui;

LevelSelector.nowLevel = -1;

LevelSelector.XML_STR = [
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_1">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_2">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_3">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_4">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_5">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_6">
        </block>
    </xml>`
];

LevelSelector.init = () => {
    $('#nav-right-btn-list').prepend(`
        <div
            id="level-selector"
            class="layui-form layer-extend"
            lay-filter="level-selector-filter"
            style="
                width: 90px;
                height: 28px;
                margin-right: 10px;
            "
        >
            <select id="level-type" spellcheck="false" lay-filter="level-type-filter"></select>
        </div>
    `);

    const $level = $('#level-type');
    $level.empty();
    for (let i = 1; i < 7; i++) {
        $level.append(`<option value="${i}">${indexText['关卡']} ${i}</option>`);
    }
    form.render('select', 'level-selector-filter');

    form.on('select(level-type-filter)', function (data) {
        if (LevelSelector.nowLevel !== data.value) {
            LevelSelector.nowLevel = data.value;
            LevelSelector.xmlToWorkspace(data.value);
        }
    });
}

LevelSelector.xmlToWorkspace = (level) => {
    if (level < 1 || level > 6) {
        return;
    }
    const xmlStr =  LevelSelector.XML_STR[--level];
    try {
        Blockly.mainWorkspace.clear();
        const xmlDom = Blockly.Xml.textToDom(xmlStr);
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
        Blockly.mainWorkspace.scrollCenter();
    } catch (e) {
        Blockly.mainWorkspace.clear();
        console.log(e);
    }
}

})();