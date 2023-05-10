goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.XML');
goog.require('Mixly.Editor');
goog.require('Mixly.Msg');
goog.provide('Mixly.ToolboxSearcher');

const {
    XML,
    Editor,
    Msg,
    ToolboxSearcher
} = Mixly;

ToolboxSearcher.init = function () {
    this.workspace = new Blockly.Workspace(new Blockly.Options({
        toolbox: ''
    }));

    const serachDom = XML.TEMPLATE_DOM['SEARCH_DIV'];
    $('.blocklyToolboxDiv').append(serachDom);
    this.btnDom = serachDom.find('button');
    this.inputDom = serachDom.find('input');
    this.preKeyText = '';
    
    this.btnDom.click(() => {
        this.startSearch();
    });
    this.inputDom.change((event) => {
        this.startSearch();
    });
    this.inputDom.bind('input propertychange', (event) => {
        const mainToolbox = Editor.blockEditor.getToolbox();
        const searchCategory = mainToolbox.getToolboxItemById('catSearch');
        const keyText = event.target.value;
        try {
            if (!keyText.replaceAll(' ', '')) {
                searchCategory.hide();
                this.btnDom.addClass('layui-btn-disabled');
                return;
            } else {
                searchCategory.show();
            }
            $(mainToolbox.HtmlDiv).scrollTop(mainToolbox.HtmlDiv.scrollHeight);
        } catch(error) {
            console.log(error);
        }
        if (keyText === this.preKeyText)
            this.btnDom.addClass('layui-btn-disabled');
        else
            this.btnDom.removeClass('layui-btn-disabled');
    });
}

ToolboxSearcher.getCategoryPath = (category) => {
    let categoryPath = '';
    for (; category; category = category.getParent()) {
        categoryPath = category.toolboxItemDef_.name + (categoryPath && (' > ' + categoryPath));
    }
    return categoryPath;
}

ToolboxSearcher.searchBlocks = function (keyList) {
    return new Promise((resolve, reject) => {
        const mainToolbox = Editor.blockEditor.getToolbox();
        const searchCategory = mainToolbox.getToolboxItemById('catSearch');
        let outputXML = [];
        const categories = mainToolbox.getToolboxItems();
        for (let j = 0; categories[j]; j++) {
            const category = categories[j];
            if (category.id_ === 'catSearch') continue;
            if (typeof category.getContents !== 'function') continue;
            const blocksList = category.getContents();
            let addLabel = true;
            for (let blockDef of blocksList) {
                const { type, kind, blockxml } = blockDef;
                if (kind === 'BLOCK') {
                    this.workspace.clear();
                    try {
                        Blockly.Xml.domToBlock(blockxml, this.workspace);
                    } catch (error) {
                        console.log(error);
                        continue;
                    }
                    const blocks = this.workspace.getAllBlocks(true);
                    let select = false;
                    for (let block of blocks) {
                        let searchKeyList = [ ...keyList ];
                        const { inputList } = block;
                        for (let input of inputList) {
                            const { fieldRow } = input;
                            for (let field of fieldRow) {
                                const fieldText = field.getText().toLowerCase();
                                for (let key = 0; key < searchKeyList.length; key++) {
                                    if (fieldText.indexOf(searchKeyList[key]) === -1) {
                                        continue;
                                    }
                                    searchKeyList.splice(key, 1);
                                    key--;
                                    if (searchKeyList.length) {
                                        continue;
                                    }
                                    if (addLabel) {
                                        const categoryPath = this.getCategoryPath(category);
                                        outputXML.push({
                                            kind: 'LABEL',
                                            text: categoryPath
                                        });
                                        addLabel = false;
                                    }
                                    outputXML.push(blockDef);
                                    select = true;
                                    break;
                                }
                                if (select) break;
                            }
                            if (select) break;
                        }
                        if (select) break;
                    }
                }
            }
        }

        this.workspace.clear();

        if (outputXML.length > 30) {
            let hideNum = 0;
            while (!(outputXML.length <= 30 && outputXML[outputXML.length - 1].kind === 'LABEL')) {
                if (outputXML[outputXML.length - 1].kind === 'BLOCK')
                    hideNum++;
                outputXML.pop();
            }
            outputXML.pop();
            let showNum = 0;
            for (let elem of outputXML)
                if (elem.kind === 'BLOCK')
                    showNum++;
            outputXML.unshift({
                kind: 'LABEL',
                text: Msg.Lang['共搜索到图形块'] + ': ' + (hideNum + showNum) + '，' + Msg.Lang['显示'] + ': ' + showNum + '，' + Msg.Lang['请添加关键词以显示全部。例如：管脚 数字']
            });
        }
        
        searchCategory.updateFlyoutContents(
            outputXML.length ? 
            outputXML : [{
                kind: 'LABEL',
                text: Msg.Lang['无数据']
            }]
        );
        mainToolbox.refreshSelection();
        if (!$(searchCategory.getDiv()).children().first().hasClass('blocklyTreeSelected'))
            searchCategory.getClickTarget().click();
        // mainToolbox.getFlyout().scrollToStart();
        $(mainToolbox.HtmlDiv).scrollTop(mainToolbox.HtmlDiv.scrollHeight);
        resolve();
    });
}

ToolboxSearcher.startSearch = function () {
    if (this.btnDom.hasClass('layui-btn-disabled')) return;
    let keyText = this.inputDom.val();
    this.preKeyText = keyText;
    this.btnDom.addClass('layui-btn-disabled');
    try {
        if (!keyText.replaceAll(' ', '')) {
            return;
        }
    } catch(error) {
        console.log(error);
    }
    this.inputDom.attr('disabled', true);
    const iDom = this.btnDom.children('i');
    iDom.removeClass('layui-icon-search');
    iDom.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
    window.setTimeout(() => {
        let rawkeyList = keyText.split(' ');
        let keyList = [];
        for (let i in rawkeyList)
            rawkeyList[i] && keyList.push(rawkeyList[i].toLowerCase());
        this.searchBlocks(keyList)
        .then(() => {

        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            iDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
            iDom.addClass('layui-icon-search');
            this.inputDom.removeAttr('disabled');
        });
    }, 100);
}

ToolboxSearcher.restart = function () {
    this.preKeyText = '';
    const mainToolbox = Editor.blockEditor.getToolbox();
    const searchCategory = mainToolbox.getToolboxItemById('catSearch');
    this.inputDom.val('');
    searchCategory.hide();
}

});