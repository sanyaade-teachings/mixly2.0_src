goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Command');
goog.require('Mixly.XML');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Msg');
goog.provide('Mixly.Nav');

const {
    Env,
    Config,
    Command,
    Nav,
    XML,
    IdGenerator,
    Msg
} = Mixly;

const { BOARD, USER } = Config;

const { element, form } = layui;

Nav.DEFAULT_CONFIG = {
    "burn": false,
    "upload": false,
    "compile": false,
    "simulate": false,
    "run": false,
    "cancel": false,
    "webrun": false,
    "webcancel": false,
    "save": {
        "ino": false,
        "bin": false,
        "hex": false,
        "py": false,
        "img": false
    },
    "setting": {
        "thirdPartyLibrary": false,
        "wiki": false
    }
}

let codeEnv = 'c', workingEnv = 'electron', operatingEnv = 'electron';
Nav.CONFIG = {
    ...Nav.DEFAULT_CONFIG,
    ...BOARD?.nav ?? {}
};

codeEnv = Nav.CONFIG.compile ? 'c' : (Nav.CONFIG.run || Nav.CONFIG.webrun ? (Nav.CONFIG.run? 'py' : 'webpy') : 'mpy');

if (Env.hasSocketServer) workingEnv = 'websocket';
else if (Env.hasCompiler) workingEnv = 'webcompiler';
else if (goog.isElectron) workingEnv = 'electron';
else workingEnv = 'web';

if (goog.isElectron) operatingEnv = 'electron';
else operatingEnv = 'web';

Nav.codeEnv = codeEnv;
Nav.workingEnv = workingEnv;
Nav.operatingEnv = operatingEnv;

Nav.LEFT_BTN_CONFIG = [
    {
        // 网页版的【连接】按钮
        type: 'CONNECT',
        class: 'icon-link',
        id: 'connect-btn',
        title: '',
        href: '#',
        onclick: {
            web: 'Mixly.Web.BU.clickConnect()',
            webcompiler: 'Mixly.Web.BU.clickConnect()'
        }
    }, {
        // 【初始化固件】按钮
        type: 'BURN',
        class: 'icon-upload-1',
        id: 'burn-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                mpy: 'Mixly.Electron.BU.initBurn()',
                c: 'Mixly.Electron.ArduShell.burn()'
            }, 
            web: {
                mpy: 'Mixly.Web.BU.initBurn()'
            },
            websocket: {
                mpy: 'Mixly.WebSocket.BU.initBurn()'
            },
            webcompiler: {
                mpy: 'Mixly.Web.BU.initBurn()'
            }
        }
    }, {
        // 【编译】按钮
        type: 'COMPILE',
        class: 'icon-check',
        id: 'compile-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                c: 'Mixly.Electron.ArduShell.initCompile()'
            },
            websocket: {
                c: 'Mixly.WebSocket.ArduShell.initCompile()'
            },
            webcompiler: {
                c: 'Mixly.WebCompiler.Compiler.compile()'
            }
        }
    }, {
        // 【上传】按钮
        type: 'UPLOAD',
        class: 'icon-upload',
        id: 'upload-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                c: 'Mixly.Electron.ArduShell.initUpload()',
                mpy: 'Mixly.Electron.BU.initUpload()'
            },
            web: {
                mpy: 'Mixly.Web.BU.initUpload()'
            },
            webcompiler: {
                c: 'Mixly.WebCompiler.Compiler.upload()',
                mpy: 'Mixly.Web.BU.initUpload()'
            },
            websocket: {
                c: 'Mixly.WebSocket.ArduShell.initUpload()',
                mpy: 'Mixly.WebSocket.BU.initUpload()'
            }
        }
    }, {
        // 【运行】按钮
        type: 'RUN',
        class: 'icon-play-circled',
        id: 'run-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                py: 'Mixly.Electron.PythonShell.run()'
            }
        }
    }, {
        // 【停止】按钮
        type: 'STOP',
        class: 'icon-cancel',
        id: 'stop-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                py: 'Mixly.Electron.PythonShell.stop()'
            }
        }
    }, {
        // 网页版PY【分步运行】按钮
        type: 'WEBPY_SETP_RUN',
        class: 'icon-play-circled',
        id: 'step-run-btn',
        title: '',
        href: '#',
        onclick: 'pyengine.steprun()'
    }, {
        // 网页版PY【运行】按钮
        type: 'WEBPY_RUN',
        class: 'icon-play-circled',
        id: 'run-btn',
        title: '',
        href: '#',
        onclick: 'pyengine.run()'
    }, {
        // 网页版PY【停止】按钮
        type: 'WEBPY_STOP',
        class: 'icon-cancel',
        id: 'stop-btn',
        title: '',
        href: '#',
        onclick: 'pyengine.kill()'
    }, {
        //【串口】按钮
        type: 'SERIAL',
        class: 'icon-usb',
        id: 'serial-btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                mpy: 'Mixly.Electron.Serial.openTool()',
                c: 'Mixly.Electron.Serial.openTool()'
            },
            web: {
                mpy: 'Mixly.Web.Serial.openTool()'
            },
            webcompiler: {
                mpy: 'Mixly.Web.Serial.openTool()',
                c: 'Mixly.Web.Serial.openTool()'
            },
            websocket: {
                mpy: 'Mixly.WebSocket.Serial.openTool()',
                c: 'Mixly.WebSocket.Serial.openTool()'
            }
        }
    }
];

Nav.LEFT_BTN_ENV = {
    UNDO: true,
    REDO: true,
    CONNECT: !goog.isElectron && (codeEnv !== 'py' && codeEnv !== 'webpy'),
    BURN: Nav.CONFIG.burn && !(!goog.isElectron && BOARD?.boardType === "MixGo AI" && !Env.hasSocketServer),
    COMPILE: Nav.CONFIG.compile,
    UPLOAD: Nav.CONFIG.upload,
    SIMULATE: Nav.CONFIG.simulate,
    RUN: Nav.CONFIG.run,
    STOP: Nav.CONFIG.cancel,
    WEBPY_SETP_RUN: Nav.CONFIG.websteprun,
    WEBPY_RUN: Nav.CONFIG.webrun,
    WEBPY_STOP: Nav.CONFIG.webcancel,
    SERIAL: codeEnv !== 'py' && codeEnv !== 'webpy',
};

Nav.RIGHT_BTN_CONFIG = [
    {
        type: 'FILE',
        class: '',
        id: 'file-btn',
        title: '',
        href: 'javascript:;',
        onclick: '',
        children: [
            {
                //【新建】按钮
                type: 'NEW_FILE',
                class: 'icon-doc-new',
                id: 'new-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.newFile()',
                    web: 'Mixly.Web.File.new()',
                    webcompiler: 'Mixly.Web.File.new()',
                    websocket: 'Mixly.Web.File.new()'
                }
            }, {
                //【打开】按钮
                type: 'OPEN_FILE',
                class: 'icon-folder-open-empty',
                id: 'open-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.open()',
                    web: 'Mixly.Web.File.open()',
                    websocket: {
                        electron: 'Mixly.Electron.File.open()',
                        web: 'Mixly.Web.File.open()'
                    },
                    webcompiler: {
                        electron: 'Mixly.Electron.File.open()',
                        web: 'Mixly.Web.File.open()'
                    }
                }
            }, {
                //【从云端打开】按钮
                type: 'OPEN_FROM_CLOUD',
                class: 'icon-download-cloud-1',
                id: 'open-from-cloud-btn',
                title: '',
                href: '#',
                onclick: {
                    websocket: {
                        web: 'Mixly.WebSocket.File.openFromCloud()'
                    }
                }
            }, {
                //【保存到云端】按钮
                type: 'SAVE_TO_CLOUD',
                class: 'icon-upload-cloud-1',
                id: 'save-to-cloud-btn',
                title: '',
                href: '#',
                onclick: {
                    websocket: {
                        web: 'Mixly.WebSocket.File.saveToCloud()'
                    }
                }
            }, {
                //【保存】按钮
                type: 'SAVE_FILE',
                class: 'icon-floppy',
                id: 'save-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.save()',
                    websocket: {
                        electron: 'Mixly.Electron.File.save()',
                        web: 'Mixly.Web.File.save()'
                    },
                    webcompiler: {
                        electron: 'Mixly.Electron.File.save()',
                        web: 'Mixly.Web.File.save()'
                    },
                    web: 'Mixly.Web.File.save()'
                }
            }, {
                //【另存为】按钮
                type: 'SAVE_AS_FILE',
                class: 'icon-save-as',
                id: 'save-as-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.saveAs()',
                    websocket: {
                        electron: 'Mixly.Electron.File.saveAs()',
                        web: 'Mixly.Web.File.saveAs()'
                    },
                    webcompiler: {
                        electron: 'Mixly.Electron.File.saveAs()',
                        web: 'Mixly.Web.File.saveAs()'
                    },
                    web: 'Mixly.Web.File.saveAs()'
                }
            }, {
                //【保存xml】按钮
                type:'SAVE_XML',
                class: 'icon-floppy',
                id: 'save-xml-btn',
                title: '',
                href: '#',
                onclick: {
                    web: 'save()',
                    websocket: {
                        web: 'save()'
                    },
                    webcompiler: {
                        web: 'save()'
                    }
                }
            }, {
                //【保存py】按钮
                type: 'SAVE_PY',
                class: 'icon-file-code',
                id: 'save-py-btn',
                title: '',
                href: '#',
                onclick: {
                    web: 'mixlyjs.savePyFileAs()',
                    websocket: {
                        web: 'mixlyjs.savePyFileAs()'
                    },
                    webcompiler: {
                        web: 'mixlyjs.savePyFileAs()'
                    }
                }
            }, {
                //【保存ino】按钮
                type: 'SAVE_INO',
                class: 'icon-file-code',
                id: 'save-ino-btn',
                title: '',
                href: '#',
                onclick: {
                    web: 'mixlyjs.saveInoFileAs()',
                    websocket: {
                        web: 'mixlyjs.saveInoFileAs()'
                    },
                    webcompiler: {
                        web: 'mixlyjs.saveInoFileAs()'
                    }
                }
            }, {
                //【保存hex】按钮
                type: 'SAVE_HEX',
                class: 'icon-file-code',
                id: 'save-hex-btn',
                title: '',
                href: '#',
                onclick: {
                    web: 'mixlyjs.compileMicrobitPy()',
                    websocket: {
                        web: 'mixlyjs.compileMicrobitPy()'
                    },
                    webcompiler: {
                        web: 'mixlyjs.compileMicrobitPy()'
                    }
                }
            }, {
                //【导出库】按钮
                type: 'EXPORT_LIB',
                class: 'icon-export',
                id: 'export-libraries-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.exportLib()'
                }
            }
        ]
    }, {
        type: 'SETTING',
        class: '',
        id: 'setting-btn',
        title: '',
        href: 'javascript:;',
        onclick: '',
        children: [
           {
                //【管理库】按钮
                type: 'MANAGE_LIB',
                class: 'icon-menu',
                id: 'manage-libraries-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.LibManager.showManageDialog()'
                }
            }, {
                //【其它固件】按钮
                type: 'OTHER_BIN',
                class: 'icon-upload-1',
                id: 'other-burn-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.BU.burnWithSpecialBin()'
                }
            }, {
                // WebSocket版的【连接】按钮
                type: 'WS_CONNECT',
                class: 'icon-link',
                id: 'socket-connect-btn',
                title: '',
                href: '#',
                onclick: {
                    websocket: 'Mixly.WebSocket.Socket.clickConnect()'
                }
            }, {
                // 【文本转图形】按钮
                type: 'PYTHON_TO_BLOCKLY',
                class: 'toggle-off-1',
                id: 'python-to-blockly-btn',
                title: '',
                href: '#',
                onclick: 'Mixly.Editor.py2BlockEditorChangeStatus()'
            }, {
                // 【WIKI】按钮
                type: 'OPEN_WIKI',
                class: 'icon-book-open',
                id: 'wiki-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.WikiManager.openWiki()'
                }
            }, {
                // 【反馈】按钮
                type: 'FEED_BACK',
                class: 'icon-comment-1',
                id: 'feedback-btn',
                title: '',
                href: '#',
                onclick: 'Mixly.Interface.feedback()'
            }
        ]
    }
];

Nav.RIGHT_BTN_ENV = {
    SETTING: true,
    EXPORT_LIB: goog.isElectron && Nav.CONFIG.setting.thirdPartyLibrary,
    MANAGE_LIB: goog.isElectron && Nav.CONFIG.setting.thirdPartyLibrary,
    OTHER_BIN: Nav.CONFIG.burn && typeof BOARD?.burn?.special === 'object',
    WS_CONNECT: workingEnv === 'websocket',
    FILE: true,
    NEW_FILE: true,
    OPEN_FILE: true,
    OPEN_FROM_CLOUD: !goog.isElectron && Env.hasSocketServer,
    SAVE_FILE: true,
    SAVE_AS_FILE: true,
    // SAVE_FILE: goog.isElectron /*!(!goog.isElectron && location.protocol !== 'https:')*/,
    // SAVE_AS_FILE: goog.isElectron /*!(!goog.isElectron && location.protocol !== 'https:')*/,
    // SAVE_XML: !goog.isElectron /*&& location.protocol !== 'https:'*/,
    // SAVE_PY: !goog.isElectron /*&& location.protocol !== 'https:'*/ && Nav.CONFIG.save.py,
    // SAVE_INO: !goog.isElectron /*&& location.protocol !== 'https:'*/ && Nav.CONFIG.save.ino,
    // SAVE_HEX: !goog.isElectron /*&& location.protocol !== 'https:'*/ && Nav.CONFIG.save.py && Nav.CONFIG.save.hex,
    // SAVE_IMG: !goog.isElectron /*&& location.protocol !== 'https:'*/ && Nav.CONFIG.save.img,
    SAVE_TO_CLOUD: !goog.isElectron && Env.hasSocketServer,
    PYTHON_TO_BLOCKLY: Nav.CONFIG?.setting?.pythonToBlockly && ['mpy', 'py', 'webpy'].includes(codeEnv),
    OPEN_WIKI: goog.isElectron && Nav.CONFIG.setting.wiki,
    FEED_BACK: true
};

Nav.generateBtnConfig = (btnConfig, defaultOnclick = null) => {
    const DEFAULT_ENV1 = ['electron', 'web'],
    DEFAULT_ENV2 = ['websocket', 'webcompiler'],
    newBtnConfig = {
        class: btnConfig.class,
        id: btnConfig.id,
        title: btnConfig.title,
        href: btnConfig.href
    };
    const { onclick } = btnConfig;
    if (typeof onclick === 'string') {
        // onclick: String
        newBtnConfig.onclick = onclick;
    } else if (typeof onclick === 'object') {
        const onclick1 = onclick[workingEnv];
        if (typeof onclick1 === 'string') {
            // onclick: { electron: String }
            newBtnConfig.onclick = onclick1;
        } else if (typeof onclick1 === 'object') {
            if (DEFAULT_ENV1.includes(workingEnv)) {
                const onclick2 = onclick1[codeEnv];
                if (typeof onclick2 === 'string')
                    // onclick: { electron: { c: String } }
                    newBtnConfig.onclick = onclick2;
                else
                    if (defaultOnclick)
                        newBtnConfig.onclick = defaultOnclick;
                    else
                        return null;
            } else if (DEFAULT_ENV2.includes(workingEnv)) {
                const onclick2 = onclick1[codeEnv];
                const onclick3 = onclick1[operatingEnv];
                if (typeof onclick2 === 'string')
                    // onclick: { websocket: { c: String } }
                    newBtnConfig.onclick = onclick2;
                else if (typeof onclick3 === 'string')
                    newBtnConfig.onclick = onclick3;
                else if (typeof onclick3 === 'object') {
                    const onclick4 = onclick3[codeEnv];
                    if (typeof onclick4 === 'string')
                        newBtnConfig.onclick = onclick4;
                    else
                        if (defaultOnclick)
                            newBtnConfig.onclick = defaultOnclick;
                        else
                            return null;
                } else {
                    if (defaultOnclick)
                        newBtnConfig.onclick = defaultOnclick;
                    else
                    return null;
                }
            } else {
                if (defaultOnclick)
                    newBtnConfig.onclick = defaultOnclick;
                else
                    return null;
            }
        } else {
            if (defaultOnclick)
                newBtnConfig.onclick = defaultOnclick;
            else
                return null;
        }
    }
    return newBtnConfig;
}

const DEFAULT_BTN_CONFIG = {
    type: null,
    class: '',
    id: 'id',
    title: '',
    href: '#',
    onclick: '',
    children: null
}

let leftBtnList = [];

for (let btnObj of Nav.LEFT_BTN_CONFIG) {
    btnObj = {
        ...DEFAULT_BTN_CONFIG,
        ...btnObj
    };
    const { type } = btnObj;
    if (Nav.LEFT_BTN_ENV[type]) {
        const newBtnConfig = Nav.generateBtnConfig(btnObj);
        if (newBtnConfig)
           leftBtnList.push(newBtnConfig);
    } else {
        continue;
    }
}

let rightBtnList = [];

for (let btnObj of Nav.RIGHT_BTN_CONFIG) {
    btnObj = {
        ...DEFAULT_BTN_CONFIG,
        ...btnObj
    };
    const { type, children } = btnObj;
    if (Nav.RIGHT_BTN_ENV[type] && typeof children === 'object') {
        let { children } = btnObj;
        const newBtnConfig = Nav.generateBtnConfig(btnObj, '');
        newBtnConfig.children = [];
        for (let childBtnObj of children) {
            const childType = childBtnObj.type;
            if (Nav.RIGHT_BTN_ENV[childType]) {
                const newChildBtnConfig = Nav.generateBtnConfig(childBtnObj);
                if (newChildBtnConfig)
                    newBtnConfig.children.push(newChildBtnConfig);
            }
        }
        rightBtnList.push(newBtnConfig);
    } else {
        continue;
    }
}

console.log(leftBtnList);
console.log(rightBtnList);

Nav.LEFT_BTN_DOM_STR = ['', ''];

for (let i = 0; i < leftBtnList.length; i++) {
    if (typeof leftBtnList[i] !== 'object') {
        continue;
    }
    let _config = leftBtnList[i];
    Nav.LEFT_BTN_DOM_STR[0] += '<dd lay-unselect>'
        + `<a href="${_config.href}" class="${_config.class}" id="operate-${_config.id}" onclick="${_config.onclick}"></a>`
        + '</dd>';
    Nav.LEFT_BTN_DOM_STR[1] +=   `<button 
                                    type="button"
                                    id="li_${_config.id}"
                                    class="layui-btn layui-btn-xs layui-btn-primary"
                                    title="${_config.title}"
                                    onclick="${_config.onclick}"
                                >
                                    <a id="${_config.id}" class="${_config.class}"></a>
                                </button>`;
    /*Nav.LEFT_BTN_DOM_STR[1] += `<li class="layui-nav-item" id="li_${_config.id}" lay-unselect>
                                    <a href="${_config.href}" class="${_config.class}" id="${_config.id}" title="${_config.title}" onclick="${_config.onclick}"></a>
                                </li>`*/
}

Nav.RIFHT_BTN_DOM_STR = '';

for (let i = 0; i < rightBtnList.length; i++) {
    Nav.RIFHT_BTN_DOM_STR += `<li class="layui-nav-item" style="float:right" lay-unselect>
                                <a href="javascript:;" id="${rightBtnList[i].id}" style="white-space: nowrap;"></a>
                                <dl class="layui-nav-child layui-nav-child-r">`;
    for (let j = 0; j < rightBtnList[i].children.length; j++) {
        let {
            id,
            title,
            href,
            onclick
        } = rightBtnList[i].children[j];
        let labelClass = rightBtnList[i].children[j].class;
        Nav.RIFHT_BTN_DOM_STR += `<dd lay-unselect>
                                    <a href='${href}' id='${id}' class='${labelClass}' title='${title}' onclick='${onclick}'></a>
                                </dd>`;
    }
    Nav.RIFHT_BTN_DOM_STR += '</dl></li>';
}

Nav.DOM_STR = `
<ul
    id="nav"
    class="layui-nav ${USER.theme === 'light'? 'layui-bg-green' : 'layui-bg-cyan'}"
    lay-filter="nav-filter"
    style="width: 100vw;display: flex;flex-direction: row;justify-content: space-between;"
>
    <div
        id="nav-left-btn-list"
        style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;"
    >
        <button
            type="button"
            id="mixly-path"
            class="layui-btn layui-btn-xs layui-btn-primary"
            style="cursor:pointer;"
            onclick="Mixly.${workingEnv === 'electron'? 'Electron.Loader' : 'Interface'}.onbeforeunload()"
        >
            Mixly
        </button>
        <li class="layui-nav-item" id="li_operate" style="display:none;" lay-unselect>
            <a href="javascript:;" id="operate-btn" style="white-space: nowrap;">
                <span class="layui-nav-more"></span>
            </a>
            <dl class="layui-nav-child">
                <!-- 二级菜单 -->
                ${Nav.LEFT_BTN_DOM_STR[0]}
            </dl>
        </li>
        ${Nav.LEFT_BTN_DOM_STR[1]}
    </div>
    <div style="display: inline-flex;flex-direction: row;align-items: center;">
        <a id="copyright"></a>
    </div>
    <div
        id="nav-right-btn-list"
        style="display: inline-flex;flex-direction: row;justify-content: flex-end;align-items: center;"
    >
        <button
            title='状态栏'
            m-id="h-bar"
            class="layui-btn layui-btn-xs layui-btn-primary"
            style="padding: 0 2px;"
        >
            <a
                href="javascript:;"
                class="icon-show-bar-s"
            ></a>
        </button>
        <button
            m-id="v-bar"
            title='侧边栏'
            class="layui-btn layui-btn-xs layui-btn-primary"
            style="padding: 0 2px;"
        >
            <a
                href="javascript:;"
                class="icon-show-bar-e"
            ></a>
        </button>
        <button
            m-id="code-area"
            title='模式切换'
            class="layui-btn layui-btn-xs layui-btn-primary"
            style="padding: 0 2px;"
        >
            <a
                href="javascript:;"
                class="icon-code-1"
                style="font-size: 16px;"
            ></a>
        </button>
        ${XML.TEMPLATE_STR_RENDER['BOARD_SELECTOR'] ?? ''}
        ${XML.TEMPLATE_STR_RENDER['PORT_SELECTOR'] ?? ''}
        ${Nav.RIFHT_BTN_DOM_STR}
    </div>
</ul>
`;

Nav.LEFT_BTN_LIST = leftBtnList;
Nav.RIGHT_BTN_LIST = rightBtnList;

Mixly.Nav.MsgById = {
    'undo-btn': 'undo',
    'redo-btn': 'redo',
    'connect-btn': 'connect',
    'burn-btn': 'burn',
    'compile-btn': 'compile',
    'upload-btn': 'upload',
    'step-run-btn': 'step_run',
    'run-btn': 'run',
    'stop-btn': 'stop',
    'serial-btn': 'catSerialPort',
    'statusbar-btn': 'statusbar',
    'file-btn': 'file',
    'new-btn': 'new',
    'open-btn': 'open',
    'open-from-cloud-btn': 'open_from_cloud',
    'save-btn': 'save',
    'save-xml-btn': 'save_blocks',
    'save-ino-btn': 'save_ino',
    'save-img-btn': 'save_img',
    'save-py-btn': 'save_py',
    'save-hex-btn': 'save_hex',
    'save-to-cloud-btn': 'save_ser',
    'save-as-btn': 'save_as',
    'setting-btn': 'setting',
    'language-btn': 'language',
    'theme-btn': 'theme',
    'import-libraries-btn': 'import_libraries',
    'export-libraries-btn': 'export_libraries',
    'manage-libraries-btn': 'manage_libraries',
    'windows-size-btn': 'windowSize',
    'socket-connect-btn': 'connect',
    'other-burn-btn': 'other_firmware',
    'wiki-btn': 'wiki',
    'feedback-btn': 'feedback'
};

function showTag() {
    tagSelect('copyright', 'copyright');
    tagSelect('tab_blocks', 'tab_blocks');
    tagSelect('tab_arduino', 'tab_arduino');
    if ($('#changemod-btn').attr('value') === '1') {
        tagSelect('changemod-btn', 'tab_blocks');
    } else {
        tagSelect('changemod-btn', 'tab_arduino');
    }
    if (Nav.RIGHT_BTN_ENV.PYTHON_TO_BLOCKLY) {
        const pythonToBlocklyDom = $('#python-to-blockly-btn');
        const status = BOARD?.pythonToBlockly ?? false;
        if (status) {
            pythonToBlocklyDom.html(Blockly.Msg.MSG['disablePythonToBlockly'])
                              .attr('class', 'icon-toggle-on-1');
        } else {
            pythonToBlocklyDom.html(Blockly.Msg.MSG['enablePythonToBlockly'])
                              .attr('class', 'icon-toggle-off-1');
        }
    }
    if (document.getElementById('boardSelector'))
        document.getElementById('boardSelector').placeholder = Blockly.Msg.MSG['fn'];
    tagSelect('operate-btn', 'operate');
    tagSelect('operate_save_ser_btn', 'save_ser');
    tagSelect('change_board_btn', 'change_board');
    tagSelect('view_btn', 'view_btn');
    tagSelect('save_ser_btn', 'save_ser');
    tagSelect('view_file', 'view_file');

    if (typeof Mixly.Nav.navBtnConfig.leftBtn === "object") {
        let len = Mixly.Nav.navBtnConfig.leftBtn.length;
        for (let i = 0; i < len; i++) {
            let id = Mixly.Nav.navBtnConfig.leftBtn[i].id;
            let msg = Mixly.Nav.MsgById[id];
            if (msg) {
                tagSelect(id, msg);
                tagSelect('operate-' + id, msg);
            }
        }
    }

    if (typeof Mixly.Nav.navBtnConfig.rightBtn === "object") {
        let { rightBtn } = Mixly.Nav.navBtnConfig;
        let len = rightBtn.length;
        for (let i = 0; i < len; i++) {
            let parentId = rightBtn[i].id;
            let parentMsg = Mixly.Nav.MsgById[parentId];
            if (parentMsg)
                tagSelect(parentId, parentMsg);
            let { children } = Mixly.Nav.navBtnConfig.rightBtn[i];
            if (typeof children !== "object") continue;
            let childrenLen = children.length;
            for (let j = 0; j < childrenLen; j++) {
                let childId = children[j].id;
                let childMsg = Mixly.Nav.MsgById[childId];
                if (childMsg)
                    tagSelect(childId, childMsg);
            }
        }
    }
}

function tagSelect(id, msg) {
    var tagObject = document.getElementById(id);
    if (tagObject) {
        if (tagObject.tagName == "A" && tagObject.parentNode.innerHTML.indexOf("<dl") != -1) {
            tagObject.innerHTML = Blockly.Msg.MSG[msg] + '<i class="layui-icon layui-icon-down layui-nav-more"></i>';
        } else {
            document.getElementById(id).innerHTML = Blockly.Msg.MSG[msg];
        }
    }
}

Nav.init = () => {
    $('body').append(Nav.DOM_STR);
    Nav.navBtnConfig = {
        leftBtn: Nav.LEFT_BTN_LIST,
        rightBtn: Nav.RIGHT_BTN_LIST
    };
    showTag();
    element.init();
    form.render('select', 'boards-type-filter');
    XML.TEMPLATE_ENV.PORT_SELECTOR && form.render('select', 'ports-type-filter');
    Nav.navItemId = [];
    if (typeof Nav.LEFT_BTN_LIST === "object") {
        let len = Nav.LEFT_BTN_LIST.length;
        for (let i = 0; i < len; i++) {
            let id = Nav.LEFT_BTN_LIST[i].id;
            Nav.navItemId.push('li_' + id);
        }
    }
    const $nav = $('#nav');
    const $navLeftBtnList = $('#nav-left-btn-list');
    const $liOperate = $('#li_operate');
    Nav.leftWidth = $navLeftBtnList.offset().left + $navLeftBtnList.width();
    if ($nav[0].scrollWidth > $nav[0].offsetWidth) {
        for (let i = 0; i < Nav.navItemId.length; i++) {
            const $navItem = $('#' + Nav.navItemId[i]);
            $navItem.css('display', 'none');
        }
        $liOperate.css('display', '-webkit-box');
    }
}

Nav.CONTAINER_IDS = IdGenerator.generate([
    'LEFT_BTN_CONTAINER',
    'MORE_LEFT_BTN_CONTAINER',
    'DROPDOWN_CONTAINER',
    'RIGHT_BTN_CONTAINER'
]);

/**
  * nav容器html片段
  * @type {String}
  */
Nav.CONTAINER_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav.html'));

/**
  * nav按钮html片段
  * @type {String}
  */
Nav.BTN_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-btn.html'));

/**
  * nav子元素容器html片段
  * @type {String}
  */
Nav.ITEM_CONTAINER_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-item-container.html'));

/**
  * nav子元素html片段
  * @type {String}
  */
Nav.ITEM_TEMPLATE = goog.get(path.join(Env.templatePath, 'nav-item.html'));

/**
  * 板卡选择器html片段
  * @type {String}
  */
Nav.BOARD_SELECTOR_TEMPLATE = goog.get(path.join(Env.templatePath, 'board-selector-div.html'));

/**
  * 端口选择器html片段
  * @type {String}
  */
Nav.PORT_SELECTOR_TEMPLATE = goog.get(path.join(Env.templatePath, 'port-selector-div.html'));

Nav.Scope = {
    'LEFT': -1,
    'CENTER': 0,
    'RIGHT': 1,
    '-1': 'LEFT',
    '0': 'CENTER',
    '1': 'RIGHT'
};

Nav.$container = null;
Nav.$leftBtnContainer = null;
Nav.$moreLeftBtnContainer = null;
Nav.$dropdownContainer = null;
Nav.$rightBtnContainer = null;
Nav.btns = {};
Nav.weightsInfo = [];
Nav.registerQueue = [];

Nav.init_ = function() {
    this.$container = $(XML.render(this.CONTAINER_TEMPLATE, {
        theme: USER.theme,
        msg: {
            copyright: Blockly.Msg.MSG['copyright']
        },
        id: {
            leftBtnContainer: this.CONTAINER_IDS.LEFT_BTN_CONTAINER,
            moreLeftBtnContainer: this.CONTAINER_IDS.MORE_LEFT_BTN_CONTAINER,
            dropdownContainer: this.CONTAINER_IDS.DROPDOWN_CONTAINER,
            rightBtnContainer: this.CONTAINER_IDS.RIGHT_BTN_CONTAINER
        }
    }));
    this.$leftBtnContainer = this.$container.find(
        `[m-id=${this.CONTAINER_IDS.LEFT_BTN_CONTAINER}]`
    );
    this.$moreLeftBtnContainer = this.$container.find(
        `[m-id=${this.CONTAINER_IDS.MORE_LEFT_BTN_CONTAINER}]`
    );
    console.log(this.$moreLeftBtnContainer)
    this.$dropdownContainer = this.$container.find(
        `[m-id=${this.CONTAINER_IDS.DROPDOWN_CONTAINER}]`
    );
    this.$rightBtnContainer = this.$container.find(
        `[m-id=${this.CONTAINER_IDS.RIGHT_BTN_CONTAINER}]`
    );
    this.$dropdownContainer.append(Nav.BOARD_SELECTOR_TEMPLATE);
    this.$dropdownContainer.append(XML.render(Nav.PORT_SELECTOR_TEMPLATE, {
        selectPort: Msg.Lang['选择串口'],
        noPort: Msg.Lang['无可用串口']
    }));
    $('#nav-container').append(this.$container);
    element.render('nav', 'nav-filter');
    form.render('select', 'boards-type-filter');
    form.render('select', 'ports-type-filter');
    Nav.addClickEvent();
    for (let options of this.registerQueue) {
        this.register(options);
    }
    /*for (let i = 0; i < 10; i++)
        Nav.register({
            icon: 'icon-ccw',
            title: '测试(Ctrl + A)',
            id: IdGenerator.generate(),
            displayText: '测试' + i,
            preconditionFn: () => {
                return goog.isElectron;
            },
            callback: (elem) => console.log(elem),
            scopeType: this.Scope.LEFT,
            weight: 10 - i
        });*/
    $(window).resize(() => {
        this.resize();
    });
}

/**
 * @function 注册函数
 * @param options 选项
 *  {
 *      icon: String,
 *      title: String,
 *      id: String | Array,
 *      displayText: String,
 *      preconditionFn: Function,
 *      callback: Function,
 *      scopeType: Nav.SCOPE_TYPE,
 *      weight: Number
 *  }
 * @return {void}
 **/
Nav.register = function(options) {
    if (!this.$container) {
        this.registerQueue.push(options);
        return;
    }
    const { scopeType = this.ScopeType.LEFT } = options;
    const newOptions = { ...options };
    switch (scopeType) {
    case this.Scope.LEFT:
        if (newOptions.id === 'home-btn') {
            this.btns[newOptions.id] = newOptions;
        } else {
            this.addLeftBtn_(newOptions);
        }
        break;
    }
    element.render('nav', 'nav-filter');
}

/**
 * @function 取消注册函数
 * @param options 选项
 *  {
 *      id: String | Array,
 *      scopeType: Nav.SCOPE_TYPE
 *  }
 * @return {void}
 **/
Nav.unregister = function(options) {

}

Nav.getElemWidth = function(elem) {
    const display = elem.css('display');
    if (display !== 'none') {
        return elem.outerWidth(true);
    }
    const visibility = elem.css('visibility');
    const position = elem.css('position');
    elem.css({
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    const width = elem.outerWidth(true);
    elem.css({ display, visibility, position });
    return width;
}

Nav.addClickEvent = function() {
    $(document).off('click', '.mixly-nav')
    .on('click', '.mixly-nav', function() {
        const $this = $(this);
        const mId = $this.attr('m-id');
        if (Nav.btns[mId]
            && typeof Nav.btns[mId].callback === 'function') {
            Nav.btns[mId].callback(this);
        }
    });
}

Nav.addLeftBtn_ = function(options) {
    const {
        id = '',
        title = '',
        icon = '',
        displayText = '',
        weight = 0
    } = options;
    options.$btn = $(XML.render(Nav.BTN_TEMPLATE, {
        title,
        mId: id,
        icon,
        text: displayText
    }));
    options.$moreBtn = $(XML.render(Nav.ITEM_TEMPLATE, {
        mId: id,
        icon,
        text: displayText
    }));
    if (Object.keys(this.btns).includes(id)) {
        this.btns[id].$btn.remove();
        this.btns[id].$moreBtn.remove();
        delete this.btns[id];
    }
    let $btn = null;
    let $moreBtn = null;
    const $btns = this.$leftBtnContainer.children('button');
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (!this.btns[mId]) {
            continue;
        }
        if (weight < this.btns[mId].weight) {
            $btn = this.btns[mId].$btn;
            $moreBtn = this.btns[mId].$moreBtn;
            break;
        }
    }
    if ($btn) {
        $btn.before(options.$btn);
        $moreBtn.before(options.$moreBtn);
    } else {
        this.$leftBtnContainer.append(options.$btn);
        this.$moreLeftBtnContainer.append(options.$moreBtn);
    }
    options.width = this.getElemWidth(options.$btn);
    this.btns[id] = options;
    this.resize();
}

Nav.removeLeftBtn_ = function(str) {

}

Nav.addRightBtn_ = function(str) {

}

Nav.removeRightBtn_ = function(str) {

}

Nav.resize = function() {
    const navRightWidth = this.getElemWidth($('#nav-right-area'));
    const navWidth = this.getElemWidth($('#nav'));
    const $btns = this.$leftBtnContainer.children('button');
    let nowWidth = navRightWidth;
    let showMoreBtnContainer = false;
    for (let i = 0; $btns[i]; i++) {
        const mId = $($btns[i]).attr('m-id');
        if (mId === 'home-btn') {
            continue;
        }
        const config = this.btns[mId];
        let width = 0;
        if (config) {
            const { preconditionFn } = config;
            if (!preconditionFn()) {
                config.$btn.css('display', 'none');
                config.$moreBtn.css('display', 'none');
                continue;
            }
            width = config.width;
        } else {
            width = this.getElemWidth($($btns[i]));
        }
        nowWidth += width;
        if (!config) {
            continue;
        }
        if (navWidth < nowWidth + 150) {
            config.$btn.css('display', 'none');
            config.$moreBtn.css('display', 'block');
            showMoreBtnContainer = true;
        } else {
            config.$btn.css('display', 'block');
            config.$moreBtn.css('display', 'none');
        }
    }
    if (showMoreBtnContainer) {
        this.$moreLeftBtnContainer.parent().css('display', 'block');
    } else {
        this.$moreLeftBtnContainer.parent().css('display', 'none');
    }
}

});