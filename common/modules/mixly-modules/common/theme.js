goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.StatusBarTab');
goog.require('Mixly.Editor');
goog.provide('Mixly.Theme');

const { Theme, StatusBarTab, Editor } = Mixly;

Theme.changeTo = function (type) {
    const { blockEditor, codeEditor } = Editor;
    let blockEditorTheme, codeEditorTheme, statusBarTheme;
    if (type === 'dark') {
        $("#nav").removeClass("layui-bg-green").addClass("layui-bg-cyan");
        $("body").removeClass("light").addClass("dark");
        blockEditorTheme = Blockly.Themes.Dark;
        codeEditorTheme = 'ace/theme/dracula';
        statusBarTheme = 'ace/theme/terminal';
    } else {
        $("#nav").removeClass("layui-bg-cyan").addClass("layui-bg-green");
        $("body").removeClass("dark").addClass("light");
        blockEditorTheme = Blockly.Themes.Classic;
        codeEditorTheme = "ace/theme/crimson_editor";
        if (Blockly.Arduino) {
            codeEditorTheme = "ace/theme/xcode";
        }
        statusBarTheme = 'ace/theme/xcode';
    }
    blockEditor.setTheme(blockEditorTheme);
    codeEditor.setOption("theme", codeEditorTheme);
    if (StatusBar.Ace) {
        StatusBar.Ace.setOption("theme", statusBarTheme);
    }
    if (StatusBarPort?.portsName) {
        for (let i = 0, length = StatusBarPort.portsName.length; i < length; i++) {
            StatusBarPort.portAce[StatusBarPort.portsName[i]].setOption("theme", statusBarTheme);
        }
    }
}

Theme.changeEditorTheme_dark = function () {
    $("#nav").removeClass("layui-nav layui-bg-green");
    $("#nav").addClass("layui-nav layui-bg-cyan");
    $("body").removeClass("light");
    $("body").addClass("dark");
    
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
        if (StatusBarPort?.portsName) {
            for (let i = 0, length = StatusBarPort.portsName.length; i < length; i++) {
                StatusBarPort.portAce[StatusBarPort.portsName[i]].setOption("theme", "ace/theme/terminal");
            }
        }
    } catch (e) {

    }
}

const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener(e => {
    if (e.matches) {
        Theme.changeTo('light');
    } else {
        Theme.changeTo('dark');
    }
});

});