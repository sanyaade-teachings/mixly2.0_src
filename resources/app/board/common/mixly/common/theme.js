(() => {

goog.require('Blockly');
goog.require('Mixly.StatusBar');
goog.require('Mixly.StatusBarPort');
goog.provide('Mixly.Theme');

const { Theme, StatusBar, StatusBarPort } = Mixly;

Theme.changeEditorTheme_light = function () {
    $("#nav").removeClass("layui-nav layui-bg-cyan");
    $("#nav").addClass("layui-nav layui-bg-green");
    $("body").removeClass("dark");
    $("body").addClass("light");
    Blockly.mainWorkspace.setTheme(Blockly.Themes.Classic);
    var theme = "ace/theme/crimson_editor";
    if (Blockly.Arduino) {
        theme = "ace/theme/xcode";
    }
    if (editor != null) {
        editor.setOption("theme", theme);
        $("#content_arduino").css("background-color", "#fff");
    }
    try {
        if (editor_side_code != null) {
            editor_side_code.setOption("theme", theme);
        }
        if (StatusBar.Ace != null) {
            StatusBar.Ace.setOption("theme", "ace/theme/xcode");
        }
        if (StatusBarPort?.portNames) {
            for (let i = 0, length = StatusBarPort.portNames.length; i < length; i++) {
                StatusBarPort.portAce[StatusBarPort.portNames[i]].setOption("theme", "ace/theme/xcode");
            }
        }
    } catch (e) {

    }
}

Theme.changeEditorTheme_dark = function () {
    $("#nav").removeClass("layui-nav layui-bg-green");
    $("#nav").addClass("layui-nav layui-bg-cyan");
    $("body").removeClass("light");
    $("body").addClass("dark");
    Blockly.mainWorkspace.setTheme(Blockly.Themes.Dark);
    var theme = "ace/theme/dracula";
    if (editor != null) {
        editor.setOption("theme", theme);
        $("#content_arduino").css("background-color", "#282a36");
    }
    try {
        if (editor_side_code != null) {
            editor_side_code.setOption("theme", theme);
        }
        if (StatusBar.Ace != null) {
            StatusBar.Ace.setOption("theme", "ace/theme/terminal");
        }
        if (StatusBarPort?.portNames) {
            for (let i = 0, length = StatusBarPort.portNames.length; i < length; i++) {
                StatusBarPort.portAce[StatusBarPort.portNames[i]].setOption("theme", "ace/theme/terminal");
            }
        }
    } catch (e) {

    }
}

})();