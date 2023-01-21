/**
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
 (() => {
'use strict';

/**
 * Create a namespace for the application.
 */
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.Modules');
goog.require('Mixly.Config');
goog.require('Mixly.ScriptLoader');
goog.provide('Code');

const {
    Env,
    Modules,
    Config,
    ScriptLoader
} = Mixly;
const { fs } = Modules;
const { BOARD, USER } = Config;

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
    'zh-hans': '简体中文',
    'zh-hant': '繁體中文',
    'en': 'English',
    'spa': 'Español',
    // 'ja': '日本語',
    // 'ru':'русский',
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function (name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function () {
    var lang = Code.getStringParamFromUrl('lang', '');
    if (Code.LANGUAGE_NAME[lang] === undefined) {
        // Default to zh-hans.
        lang = 'zh-hans';
    }
    return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function () {
    return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function (defaultXml) {
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        var loadOnce = null;
    }
    if ('BlocklyStorage' in window && window.location.hash.length > 1) {
        // An href with #key trigers an AJAX call to retrieve saved blocks.
        BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else if (loadOnce) {
        // Language switching stores the blocks during the reload.
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if ('BlocklyStorage' in window) {
        // Restore saved blocks in a separate thread so that subsequent
        // initialization is not affected from a failed load.
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

Code.changeEditorTheme = function () {
    var themeMenu = document.getElementById('aceTheme');
    var theme = themeMenu.options[themeMenu.selectedIndex].value;
    if (editor != null) {
        editor.setOption("theme", theme);
    }
    if (editor_side_code != null) {
        editor_side_code.setOption("theme", theme);
    }
}

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    if (el) {
        el.addEventListener('click', func, true);
        el.addEventListener('touchend', func, true);
    }
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function () {
    //<link rel="stylesheet" href="../prettify.css">
    //<script src="../prettify.js"></script>
    //var link = document.createElement('link');
    //link.setAttribute('rel', 'stylesheet');
    //link.setAttribute('href', '../prettify.css');
    //document.head.appendChild(link);
    //var script = document.createElement('script');
    //script.setAttribute('src', '../prettify.js');
    //document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function (element) {
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'arduino', 'xml'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function (clickedName) {
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').className == 'tabon') {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlText = xmlTextarea.value;
        var xmlDom = null;
        try {
            xmlDom = Blockly.Xml.textToDom(xmlText);
        } catch (e) {
            var q =
                window.confirm(MSG['badXml'].replace('%1', e));
            if (!q) {
                // Leave the user on the XML tab.
                return;
            }
        }
        if (xmlDom) {
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
        }
    }

    if (document.getElementById('tab_blocks').className == 'tabon') {
        Code.workspace.setVisible(false);
    }
    // Deselect all tabs and hide all panes.
    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        document.getElementById('tab_' + name).className = 'taboff';
        document.getElementById('content_' + name).style.visibility = 'hidden';
    }

    // Select the active tab.
    Code.selected = clickedName;
    document.getElementById('tab_' + clickedName).className = 'tabon';
    // Show the selected pane.
    document.getElementById('content_' + clickedName).style.visibility =
        'visible';
    Code.renderContent();
    if (clickedName == 'blocks') {
        Code.workspace.setVisible(true);
    }
    Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function () {
    var content = document.getElementById('content_' + Code.selected);
    // Initialize the pane.
    if (content.id == 'content_xml') {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        xmlTextarea.value = xmlText;
        xmlTextarea.focus();
    } else if (content.id == 'content_javascript') {
        Code.attemptCodeGeneration(Blockly.JavaScript);
    } else if (content.id == 'content_python') {
        Code.attemptCodeGeneration(Blockly.Python);
    } else if (content.id == 'content_php') {
        Code.attemptCodeGeneration(Blockly.PHP);
    } else if (content.id == 'content_dart') {
        Code.attemptCodeGeneration(Blockly.Dart);
    } else if (content.id == 'content_lua') {
        Code.attemptCodeGeneration(Blockly.Lua);
    }
    if (typeof PR == 'object') {
        PR.prettyPrint();
    }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.attemptCodeGeneration = function (generator) {
    var content = document.getElementById('content_' + Code.selected);
    content.textContent = '';
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
        var code = generator.workspaceToCode(Code.workspace);
        content.textContent = code;
        // Remove the 'prettyprinted' class, so that Prettify will recalculate.
        content.className = content.className.replace('prettyprinted', '');
    }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
    var blocks = Code.workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
        var blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) == -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    var valid = missingBlockGenerators.length == 0;
    if (!valid) {
        var msg = 'The generator code for the following blocks not specified for ' +
            generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function () {
    Code.initLanguage(true);
    if (document.getElementById('aceTheme')) {
        document.getElementById('aceTheme')
            .addEventListener('change', Code.changeEditorTheme, true);
    }
    var rtl = Code.isRtl();
    /*var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = Code.getBBox_(container);
        for (var i = 0; i < Code.TABS_.length; i++) {
            var el = document.getElementById('content_' + Code.TABS_[i]);
            el.style.top = bBox.y + 'px';
            el.style.left = bBox.x + 'px';
            // Height and width need to be set, read back, then set again to
            // compensate for scrollbars.
            el.style.height = bBox.height + 'px';
            el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
            el.style.width = bBox.width + 'px';
            el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
        }
        // Make the 'Blocks' tab line up with the toolbox.
        if (Code.workspace && Code.workspace.getToolbox().width) {
            document.getElementById('tab_blocks').style.minWidth =
                (Code.workspace.getToolbox().width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }
    };
    onresize();
    window.addEventListener('resize', onresize, false);*/

    // The toolbox XML specifies each category name using Blockly's messaging
    // format (eg. `<category name="%{BKY_CATLOGIC}">`).
    // These message keys need to be defined in `Blockly.Msg` in order to
    // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
    // been defined for each language to import each category name message
    // into `Blockly.Msg`.
    // TODO: Clean up the message files so this is done explicitly instead of
    // through this for-loop.
    /*for (var messageKey in MSG) {
        if (messageKey.indexOf('cat') == 0) {
            Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
        }
    }*/
    /*
    var toolbox = document.getElementById('toolbox');
    Code.workspace = Blockly.inject('content_blocks',
      {grid:
        {spacing: 0,
         length: 3,
         colour: '#ccc',
         snap: true},
         media: '../common/media/',
         rtl: rtl,
         toolbox: toolbox,
         zoom:
         {controls: false,
          wheel: true}
        });
  
    //Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
  
    Code.workspace.addChangeListener(rightCodeEvent);
    function rightCodeEvent(masterEvent) {
     if (masterEvent.type == Blockly.Events.UI) {
      return;  // Don't update UI events.
   }
      //更新
      //var arduinoTextarea = document.getElementById('side_code');
      var code = Blockly.Arduino? (Blockly.Arduino.workspaceToCode(Code.workspace) || '') : (Blockly.Python.workspaceToCode(Code.workspace) || '');
      var chinese_code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
      editor_side_code.setValue(chinese_code, -1);
    }
    // Add to reserved word list: Local variables in execution environment (runJS)
    // and the infinite loop detection function.
    
    Code.loadBlocks('');
  
    if ('BlocklyStorage' in window) {
      // Hook a save function onto unload.
      BlocklyStorage.backupOnUnload(Code.workspace);
    }
  
    Code.tabClick(Code.selected);
  
    Code.bindClick('trashButton',
      function() {Code.discard(); Code.renderContent();});
    Code.bindClick('runButton', Code.runJS);
    // Disable the link button if page isn't backed by App Engine storage.
    var linkButton = document.getElementById('linkButton');
    if ('BlocklyStorage' in window) {
      BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
      BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
      BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
      BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
      Code.bindClick(linkButton,
        function() {BlocklyStorage.link(Code.workspace);});
    } else if (linkButton) {
      linkButton.className = 'disabled';
    }
  
    for (var i = 0; i < Code.TABS_.length; i++) {
      var name = Code.TABS_[i];
      Code.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
    }
    Code.bindClick('tab_code', function(e) {
      if (e.target !== document.getElementById('tab_code')) {
        // Prevent clicks on child codeMenu from triggering a tab click.
        return;
      }
      Code.changeCodingLanguage();
    });
  
    onresize();
    Blockly.svgResize(Code.workspace);
  
    // Lazy-load the syntax-highlighting.
    window.setTimeout(Code.importPrettify, 1);
    */
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function (addToolboxitemid = false) {
    // Set the HTML's language and direction.
    var rtl = Code.isRtl();
    document.dir = rtl ? 'rtl' : 'ltr';

    Code.LANG = USER.language ?? 'zh-hans';

    document.head.parentElement.setAttribute('lang', Code.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in Code.LANGUAGE_NAME) {
        languages.push([Code.LANGUAGE_NAME[lang], lang]);
    }
    var comp = function (a, b) {
        // Sort based on first argument ('English', 'Русский', '简体字', etc).
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
    };
    languages.sort(comp);
    // Populate the language selection menu.
    /*var languageMenu = document.getElementById('languageMenu');
    languageMenu.options.length = 0;
    for (var i = 0; i < languages.length; i++) {
        var tuple = languages[i];
        var lang = tuple[tuple.length - 1];
        var option = new Option(tuple[0], lang);
        if (lang == Code.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', Code.changeLanguage, true);*/
    
    // 获取id为toolbox下的所有category标签
    var catObjArr = document.getElementById("toolbox").getElementsByTagName("category");
    for (var i = 0; i < catObjArr.length; i++) {
        if (MSG[catObjArr[i].id]) {
            catObjArr[i].setAttribute('name', MSG[catObjArr[i].id]);
            if (addToolboxitemid) {
                if (catObjArr[i].hasAttribute('toolboxitemid')) continue;
                catObjArr[i].setAttribute('toolboxitemid', catObjArr[i].id);
                catObjArr[i].setAttribute('name', MSG[catObjArr[i].id]);
            } else {
                if (document.getElementById(catObjArr[i].id + ".label"))
                    document.getElementById(catObjArr[i].id + ".label").innerText = MSG[catObjArr[i].id];
            }
        }
    }
    document.getElementById('copyright').textContent = MSG['copyright'];

    var textVars = document.getElementsByClassName('textVar');

    for (var i = 0, textVar; textVar = textVars[i]; i++) {
        textVar.textContent = MSG['textVariable'];
    }
    var listVars = document.getElementsByClassName('listVar');
    for (var i = 0, listVar; listVar = listVars[i]; i++) {
        listVar.textContent = MSG['listVariable'];
    }
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function () {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function () {
        if (timeouts++ > 1000000) {
            throw MSG['timeout'];
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(MSG['badCode'].replace('%1', e));
    }
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function () {
    var count = Code.workspace.getAllBlocks().length;
    if (count < 2 ||
        window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
        Code.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

Code.LANG = USER.language ?? 'zh-hans';

// Load the Code demo's language strings.
//document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="' + Config.pathPrefix + 'common/msg/' + Code.LANG + '.js"></script>\n');
document.write('<script src="' + Config.pathPrefix + 'common/js/conf/theme.js?t=' + new Date().getTime() + '"></script>\n');


// 动态加载用户配置的语言文件夹
if (BOARD?.langFileDir) {
    if (typeof BOARD.langFileDir === "object") {
        for (let i = 0, len = BOARD.langFileDir.length; i < len; i++) {
            ScriptLoader.loadScript(BOARD.langFileDir[i] + '/' + Code.LANG + '.js');
        }
    } else {
        ScriptLoader.loadScript(BOARD.langFileDir + '/' + Code.LANG + '.js');
    }
}

Code.loadThirdPartyLanJs = () => {
    if (!Env.isElectron) return;

    //动态加载板卡目录msg
    //if (fs.existsSync(Env.indexPath + "/language/" + Code.LANG + ".js")) {
    //    ScriptLoader.loadScript('language/' + Code.LANG + '.js');
    //}

    //动态加载第三方库语言文件
    try {
        var rootPath = Env.indexPath;
        //console.log(rootPath);
        if (fs.existsSync(rootPath + "/libraries/ThirdParty/")) {
            var libDir = fs.readdirSync(rootPath + "/libraries/ThirdParty/");
            for (var i = 0; i < libDir.length; i++) {
                if (fs.existsSync(rootPath + "/libraries/ThirdParty/" + libDir[i] + "/")) {
                    try {
                        if (fs.existsSync(rootPath + "/libraries/ThirdParty/" + libDir[i] + "/language/" + Code.LANG + ".js")) {
                            ScriptLoader.loadScript('libraries/ThirdParty/' + libDir[i] + '/language/' + Code.LANG + '.js');
                            Env.thirdPartyJS.push('libraries/ThirdParty/' + libDir[i] + '/language/' + Code.LANG + '.js');
                        }
                        if (fs.existsSync(rootPath + "/libraries/ThirdParty/" + libDir[i] + "/language/")) {
                            var langDir = fs.readdirSync(rootPath + "/libraries/ThirdParty/" + libDir[i] + "/language/");
                            for (var j = 0; j < langDir.length; j++) {
                                if (fs.existsSync(rootPath + "/libraries/ThirdParty/" + libDir[i] + "/language/" + langDir[j] + "/" + Code.LANG + ".js")) {
                                    ScriptLoader.loadScript('libraries/ThirdParty/' + libDir[i] + '/language/' + langDir[j] + '/' + Code.LANG + '.js');
                                    Env.thirdPartyJS.push('libraries/ThirdParty/' + libDir[i] + '/language/' + langDir[j] + '/' + Code.LANG + '.js');
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

Code.loadThirdPartyLanJs();

//window.addEventListener('load', Code.init);
})();