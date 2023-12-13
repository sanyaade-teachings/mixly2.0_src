goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.MFile');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.require('Mixly.LocalStorage');
goog.provide('Mixly.UserEvents');

const {
    MFile,
    Config,
    Boards,
    LocalStorage
} = Mixly;

const { USER } = Config;

class UserEvents {
    constructor(workspace) {
        this.workspace = workspace;
        this.actionArrayRecord = [];
        this.addBlocklyEventListener();
        this.prevCode = '';
        setInterval(() => this.send(), 10000);
    }

    addBlocklyEventListener() {
        this.blocklyEventListener = this.workspace.addChangeListener((event) => {
            if (![
                    Blockly.Events.BLOCK_MOVE,
                    Blockly.Events.BLOCK_DELETE,
                    Blockly.Events.BLOCK_CREATE
                ].includes(event.type)) {
                return;
            }
            const currentCode = MFile.getCode();
            if (Blockly.Events.BLOCK_MOVE ===event.type && this.prevCode === currentCode) {
                return;
            }
            this.prevCode = currentCode;
            const recordLine = {};
            recordLine.type = Boards.getSelectedBoardName();
            recordLine.uid = USER.visitorId.str32CRC32b;
            recordLine.blockId = event.blockId;
            recordLine.currentCode = currentCode;
            recordLine.file_name = LocalStorage.get('file_name') ?? '';
            recordLine.mid = LocalStorage.get('module_id') ?? '';
            recordLine.time = (new Date()).toISOString();
            let actionType = 1;
            switch (event.type) {
            case Blockly.Events.BLOCK_MOVE:
                recordLine.blockType = this.workspace.getBlockById(event.blockId);
                actionType = 3;
                break;
            case Blockly.Events.BLOCK_DELETE:
                recordLine.blockType = event.oldJson.type;
                actionType = 2;
                break;
            case Blockly.Events.BLOCK_CREATE:
                recordLine.blockType = event.json.type;
                actionType = 1;
                break;
            }
            recordLine.actionType = actionType;
            this.actionArrayRecord.push(recordLine);
        });
    }

    send() {
        for (;this.actionArrayRecord.length;) {
            const record = this.actionArrayRecord.shift();
            $.post('https://edu.mixly.org?r=sitecontroller/behaviorrecord', record, function (result) {
                // console.log(result);
            });
        }
    }
}

Mixly.UserEvents = UserEvents;

});