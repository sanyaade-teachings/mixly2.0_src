import Python from '../../python/python_generator';

export const spk_init = function () {
    Python.definitions_['import player'] = 'import player';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var BCK = Python.valueToCode(this, 'BCK', Python.ORDER_ATOMIC);
    var WS = Python.valueToCode(this, 'WS', Python.ORDER_ATOMIC);
    var DAT = Python.valueToCode(this, 'DAT', Python.ORDER_ATOMIC);
    var code = "" + sub + "=player.spk_init(" + BCK + "," + WS + "," + DAT + ")\n";
    return code;
};

export const mic_init = function () {
    Python.definitions_['import player'] = 'import player';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    // var BCK = Python.valueToCode(this, 'BCK',Python.ORDER_ATOMIC);
    // var WS = Python.valueToCode(this, 'WS',Python.ORDER_ATOMIC);
    // var DAT = Python.valueToCode(this, 'DAT',Python.ORDER_ATOMIC);
    var code = "" + sub + "=player.mic_init()\n";
    return code;
};


export const audio_play = function () {
    Python.definitions_['import player'] = 'import player';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var volume = Python.valueToCode(this, 'volume', Python.ORDER_ATOMIC);
    var code = "player.audio_play(" + sub + "," + path + "," + volume + ")\n";
    return code;
};

export const audio_record = function () {
    Python.definitions_['import player'] = 'import player';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = "player.audio_record(" + sub + "," + path + "," + time + ")\n";
    return code;
};


export const video_play = function () {
    Python.definitions_['import player'] = 'import player';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var volume = Python.valueToCode(this, 'volume', Python.ORDER_ATOMIC);
    var code = "player.video_play(" + sub + "," + path + "," + volume + ")\n";
    return code;
};


export const video_record = function () {
    Python.definitions_['import player'] = 'import player';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var time = Python.valueToCode(this, 'time', Python.ORDER_ATOMIC);
    var code = "player.video_record(" + sub + "," + path + "," + time + ")\n";
    return code;
};