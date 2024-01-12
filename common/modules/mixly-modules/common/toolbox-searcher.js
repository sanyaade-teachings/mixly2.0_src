goog.loadJs('common', () => {

goog.require('path');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate');
goog.provide('Mixly.ToolboxSearcher');

const {
    Env,
    XML,
    Msg,
    HTMLTemplate
} = Mixly;

class ToolboxSearcher {
    static {
        this.searchHtmlTemplate = new HTMLTemplate(
            goog.get(path.join(Env.templatePath, 'search-div.html'))
        );
    }

    constructor(mainWorkspace) {
        this.mainWorkspace = mainWorkspace;
        this.searchWorkspace = new Blockly.Workspace(new Blockly.Options({
            toolbox: ''
        }));
        this.mainToolbox = this.mainWorkspace.getToolbox();
        this.$search = $(ToolboxSearcher.searchHtmlTemplate.render({
            search: Msg.Lang['查找']
        }));
        this.$btn = this.$search.find('button');
        this.$input = this.$search.find('input');
        this.preKeyText = '';
        $(this.mainToolbox.HtmlDiv).append(this.$search);
        this.addEventsListener();
    }

    addEventsListener() {
        this.$btn.click(() => {
            this.startSearch();
        });

        this.$input.change((event) => {
            this.startSearch();
        });

        this.$input.bind('input propertychange', (event) => {
            const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
            const keyText = event.target.value;
            if (!keyText.replaceAll(' ', '')) {
                searchCategory.hide();
                this.$btn.addClass('layui-btn-disabled');
                return;
            } else {
                searchCategory.show();
            }
            this.scrollTop();
            if (keyText === this.preKeyText) {
                this.$btn.addClass('layui-btn-disabled');
            } else {
                this.$btn.removeClass('layui-btn-disabled');
            }
        });
    }

    scrollTop() {
        const { HtmlDiv } = this.mainToolbox;
        $(HtmlDiv).scrollTop(HtmlDiv.scrollHeight);
    }

    searchBlocks(keyList) {
        return new Promise((resolve, reject) => {
            const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
            let outputXML = [];
            const categories = this.mainToolbox.getToolboxItems();
            for (let j = 0; categories[j]; j++) {
                const category = categories[j];
                if (category.id_ === 'catSearch') continue;
                if (typeof category.getContents !== 'function') continue;
                const blocksList = category.getContents();
                let addLabel = true;
                for (let blockDef of blocksList) {
                    const { type, kind, blockxml } = blockDef;
                    if (kind !== 'BLOCK') {
                        continue;
                    }
                    this.searchWorkspace.clear();
                    try {
                        Blockly.Xml.domToBlock(blockxml, this.searchWorkspace);
                    } catch (error) {
                        console.log(error);
                        continue;
                    }
                    const blocks = this.searchWorkspace.getAllBlocks(true);
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

            this.searchWorkspace.clear();

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
                    text: Msg.Lang['共搜索到图形块'] + ': ' + (hideNum + showNum) + ', ' + Msg.Lang['显示'] + ': ' + showNum + ', ' + Msg.Lang['请添加关键词以显示全部。例如：管脚 数字']
                });
            }
            
            searchCategory.updateFlyoutContents(
                outputXML.length ? 
                outputXML : [{
                    kind: 'LABEL',
                    text: Msg.Lang['无数据']
                }]
            );
            this.mainToolbox.refreshSelection();
            this.mainToolbox.setSelectedItem(searchCategory);
            const { selectedItem_ } = this.mainToolbox;
            if (selectedItem_ && selectedItem_.isCollapsible()) {
                selectedItem_.setExpanded(true);
            }
            this.scrollTop();
            resolve();
        });
    }

    getCategoryPath(category) {
        let categoryPath = '';
        for (; category; category = category.getParent()) {
            categoryPath = category.toolboxItemDef_.name + (categoryPath && (' > ' + categoryPath));
        }
        return categoryPath;
    }

    startSearch() {
        if (this.$btn.hasClass('layui-btn-disabled')) {
            return
        };
        let keyText = this.$input.val();
        this.preKeyText = keyText;
        this.$btn.addClass('layui-btn-disabled');
        try {
            if (!keyText.replaceAll(' ', '')) {
                return;
            }
        } catch(error) {
            console.log(error);
        }
        this.$input.attr('disabled', true);
        const $i = this.$btn.children('i');
        $i.removeClass('layui-icon-search');
        $i.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
        setTimeout(() => {
            let rawkeyList = keyText.split(' ');
            let keyList = [];
            for (let i in rawkeyList)
                rawkeyList[i] && keyList.push(rawkeyList[i].toLowerCase());
            this.searchBlocks(keyList)
            .catch(console.log)
            .finally(() => {
                $i.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                $i.addClass('layui-icon-search');
                this.$input.removeAttr('disabled');
            });
        }, 100);
    }

    restart() {
        this.preKeyText = '';
        const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
        this.$input.val('');
        searchCategory.hide();
    }
}

Mixly.ToolboxSearcher =ToolboxSearcher;

});