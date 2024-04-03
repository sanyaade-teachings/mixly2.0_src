goog.loadJs('electron', () => {

goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.WikiGenerator');

const {
    Env,
    XML,
    IdGenerator,
    Electron
} = Mixly;
const fs_extra = Mixly.require('fs-extra');
const path = Mixly.require('path');
const request = Mixly.require('request');
const fs = Mixly.require('fs');

class WikiGenerator {
    static {
        this.WIKI_PAGE = goog.get(path.join(Env.templatePath, 'markdown/wiki-page.md'));
    }

    #$xml_ = null;
    #desPath_ = '';
    #tree_ = [];
    constructor($xml, desPath) {
        this.#$xml_ = $xml;
        this.#desPath_ = desPath;
        this.workspace = Mixly.Workspace.getMain().getEditorsManager().getActive().getPage('block').getEditor();
    }

    buildTree($nodes) {
        let output = [];
        for (let i = 0; i < $nodes.length; i++) {
            let child = {};
            child.id = $nodes[i].getAttribute('id') ?? IdGenerator.generate();
            if ($nodes[i].nodeName == 'CATEGORY') {
                child.children = this.buildTree($($nodes[i]).children());
            } else if ($nodes[i].nodeName == 'BLOCK') {
                child.children = false;
                child.xml = $nodes[i].outerHTML;
            }
            output.push(child);
        }
        return output;
    }

    async walkTree(rootPath, nodes) {
        for (let node of nodes) {
            if (node.children) {
                let desPath = path.resolve(rootPath, node.id);
                fs_extra.ensureDirSync(desPath);
                await this.walkTree(desPath, node.children);
            } else {
                await this.generateImage(node.xml, path.resolve(rootPath, node.id + '.png'));
            }
        }
    }

    async generate() {
        let output = this.buildTree(this.#$xml_.children());
        this.walkTree('./outputBlock/assets/', output);
    }

    generateImage(xml, desPath) {
        return new Promise((resolve, reject) => {
            this.workspace.clear();
            let xmlNode = Blockly.utils.xml.textToDom(`<xml>${xml}</xml>`);
            Blockly.Xml.domToWorkspace(xmlNode, this.workspace)
            Blockly.Screenshot.workspaceToSvg_(this.workspace, (datauri) => {
                const base64 = datauri.replace(/^data:image\/\w+;base64,/, '');
                const dataBuffer = new Buffer(base64, 'base64');
                fs_extra.outputFile(desPath, dataBuffer, (error) => {
                    resolve(error);
                });
            });
        });
    }

    generateWikiPage(rootPath, parentInfo, nodes) {
        if (!nodes.length) {
            return;
        }
        let config = {
            title: parentInfo.title,
            order: 
        };
        for (let i in nodes) {
            if (nodes[i].children) {
                let desPath = path.resolve(rootPath, node.id);
                let wiki = XML.render(WikiGenerator.WIKI_PAGE, {
                    title: nodes[i].id,
                    order: i,
                    index: false,
                    blocks: []
                });
                fs_extra.ensureDirSync(desPath);
                fs_extra.outputFileSync(path.resolve(desPath, 'README.md'), wiki);
                this.generateWikiPage(desPath, nodes[i], nodes[i].children);
            } else {

            }
        }
    }
}

Electron.WikiGenerator = WikiGenerator;

});