goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('DisableTopBlocks');
goog.require('Mixly.Editor');
goog.provide('Mixly.WorkspaceManager');

const {
    Editor
} = Mixly;

class WorkspaceManager {
    constructor(mainWorkspace) {
        this.MAIN = 'main';
        this.workspaceId = this.MAIN;
        this.mainWorkspace = mainWorkspace;
        this.mainWorkspace.addChangeListener(Blockly.Events.disableOrphans);
        this.disableTopBlocksPlugin = new DisableTopBlocks();
        this.isWorkspaceFunc = false;
        this.workspaces = {};
        const workspace = new Blockly.Workspace(new Blockly.Options({
            toolbox: ''
        }));
        workspace.type = 'MainWorkspace';
        workspace.mId = this.MAIN;
        this.workspaces[this.MAIN] = workspace;
        this.workspacesDom = {};
        this.workspacesCode = {};
        this.procedures = {};
        Blockly.Procedures.allProcedures = (root) => {
            this.allProcedures(root);
        }
    }

    exists(id) {
        return this.workspaces[id] ? true : false;
    }

    add(id) {
        this.remove(id);
        const workspace = new Blockly.Workspace(new Blockly.Options({
            toolbox: ''
        }));
        workspace.type = 'FuncWorkspace';
        workspace.mId = id;
        workspace.addChangeListener(Blockly.Events.disableOrphans);
        const disableTopBlocksPlugin = new DisableTopBlocks();
        disableTopBlocksPlugin.init();
        this.workspaces[id] = workspace;
    }

    remove(id) {
        if (!this.exists(id)) {
            return;
        }
        this.workspaces[id].dispose();
        delete this.workspaces[id];
    }

    saveDom(id) {
        if (!this.exists(id)) {
            return;
        }
        const blocksDom = Blockly.Xml.workspaceToDom(this.mainWorkspace);
        Blockly.Xml.domToWorkspace(blocksDom, this.workspaces[id]);
        this.workspacesDom[id] = blocksdom;
    }

    loadDom(id) {
        if (!this.exists(id)) {
            this.mainWorkspace.clear();
            return;
        }
        Blockly.Xml.domToWorkspace(this.workspacesDom[id] ?? '', this.mainWorkspace);
    }

    changeTo(id) {
        if (this.workspaceId === id) {
            return;
        }
        this.saveDom(this.workspaceId);
        if (id === this.MAIN) {
            this.exitWorkspaceFunc();
        } else {
            this.toWorkspaceFunc();
        }
        this.loadDom(id);
        this.workspaceId = id;
    }

    toWorkspaceFunc() {
        if (this.isWorkspaceFunc) {
            return;
        }
        this.disableTopBlocksPlugin.init();

        this.isWorkspaceFunc = true;
    }

    exitWorkspaceFunc() {
        if (!this.isWorkspaceFunc) {
            return;
        }
        this.disableTopBlocksPlugin.dispose();
        this.isWorkspaceFunc = false;
    }

    allProcedures(workspace) {
        var blocks = workspace.getAllBlocks(false);
        var proceduresReturn = [];
        var proceduresNoReturn = [];
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].getProcedureDef) {
                var tuple = blocks[i].getProcedureDef();
                if (tuple) {
                    if (tuple[2]) {
                        proceduresReturn.push(tuple);
                    } else {
                        proceduresNoReturn.push(tuple);
                    }
                }
            }
        }
        this.procedures[workspace.mId] = {
            noReturn: proceduresNoReturn,
            return: proceduresReturn
        };
        for (let id in this.procedures) {
            if (!this.procedures[id]) {
                continue;
            }
            proceduresNoReturn = [ ...proceduresNoReturn, ...this.procedures[id].noReturn];
            proceduresReturn = [ ...proceduresReturn, ...this.procedures[id].return];
        }
        proceduresNoReturn.sort(Blockly.Procedures.procTupleComparator_);
        proceduresReturn.sort(Blockly.Procedures.procTupleComparator_);
        return [proceduresNoReturn, proceduresReturn];
    }
}

Mixly.WorkspaceManager = WorkspaceManager;

});