(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Command');
goog.require('Mixly.XML');
goog.require('Code');
goog.require('layui');
goog.provide('Mixly.Nav');

const {
    Env,
    Config,
    Command,
    Nav,
    XML
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
else if (Env.isElectron) workingEnv = 'electron';
else workingEnv = 'web';

if (Env.isElectron) operatingEnv = 'electron';
else operatingEnv = 'web';

Nav.codeEnv = codeEnv;
Nav.workingEnv = workingEnv;
Nav.operatingEnv = operatingEnv;

Nav.LEFT_BTN_CONFIG = [
    {
        // 【撤销】按钮
        type: 'UNDO',
        class: 'icon-ccw',
        id: 'undo-btn',
        title: 'undo(ctrl+z)',
        href: '#',
        onclick: 'Mixly.Editor.undo()'
    }, {
        // 【重复】按钮
        type: 'REDO',
        class: 'icon-cw',
        id: 'redo-btn',
        title: 'redo(ctrl+y)',
        href: '#',
        onclick: 'Mixly.Editor.redo()'
    }, {
        // 网页版的【连接】按钮
        type: 'CONNECT',
        class: 'icon-link',
        id: 'connect-btn',
        title: '',
        href: '#',
        onclick: {
            web: 'Mixly.Web.BU.clickConnect()',
            webcompiler: {
                web: 'Mixly.Web.BU.clickConnect()'
            }
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
                mpy: 'Mixly.Web.BU.burn()'
            },
            websocket: {
                mpy: 'Mixly.WebSocket.BU.initBurn()'
            },
            webcompiler: {
                mpy: 'Mixly.Web.BU.burn()'
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
                mpy: 'Mixly.Web.BU.upload()'
            },
            webcompiler: {
                c: 'Mixly.WebCompiler.Compiler.upload()',
                mpy: 'Mixly.Web.BU.upload()'
            },
            websocket: {
                c: 'Mixly.WebSocket.ArduShell.initUpload()',
                mpy: 'Mixly.WebSocket.BU.initUpload()'
            }
        }
    }, {
        //【仿真】按钮
        type: 'SIMULATE',
        class: 'icon-play-circled',
        id: 'simulate_btn',
        title: '',
        href: '#',
        onclick: {
            electron: {
                c: 'Mixly.AvrSimulate.initSimulate()'
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
    }, {
        //【状态栏】按钮
        type: 'STATUS_BAR',
        class: 'icon-window',
        id: 'statusbar-btn',
        title: '',
        href: '#',
        onclick: 'Mixly.StatusBar.show(0)'
    }
];

Nav.LEFT_BTN_ENV = {
    UNDO: true,
    REDO: true,
    CONNECT: !Env.isElectron && (codeEnv !== 'py' && codeEnv !== 'webpy'),
    BURN: Nav.CONFIG.burn && !(!Env.isElectron && BOARD?.boardName === "MixGo AI" && !Env.hasSocketServer),
    COMPILE: Nav.CONFIG.compile,
    UPLOAD: Nav.CONFIG.upload,
    SIMULATE: Nav.CONFIG.simulate,
    RUN: Nav.CONFIG.run,
    STOP: Nav.CONFIG.cancel,
    WEBPY_SETP_RUN: Nav.CONFIG.websteprun,
    WEBPY_RUN: Nav.CONFIG.webrun,
    WEBPY_STOP: Nav.CONFIG.webcancel,
    SERIAL: codeEnv !== 'py' && codeEnv !== 'webpy',
    //STATUS_BAR: codeEnv !== 'webpy'
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
                    web: 'Mixly.NavEvents.onclickNewFile()',
                    webcompiler: 'Mixly.NavEvents.onclickNewFile()',
                    websocket: 'Mixly.NavEvents.onclickNewFile()'
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
                //【保存】按钮
                type: 'SAVE_FILE',
                class: 'icon-floppy',
                id: 'save-btn',
                title: '',
                href: '#',
                onclick: {
                    electron: 'Mixly.Electron.File.save()',
                    websocket: {
                        electron: 'Mixly.Electron.File.save()'
                    },
                    webcompiler: {
                        electron: 'Mixly.Electron.File.save()'
                    }
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
                        electron: 'Mixly.Electron.File.saveAs()'
                    },
                    webcompiler: {
                        electron: 'Mixly.Electron.File.saveAs()'
                    }
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
                //【保存img】按钮
                type: 'SAVE_IMG',
                class: 'icon-floppy',
                id: 'save-img-btn',
                title: '',
                href: '#',
                onclick: {
                    web: 'mixlyjs.saveBlockImg()',
                    websocket: {
                        web: 'mixlyjs.saveBlockImg()'
                    },
                    webcompiler: {
                        web: 'mixlyjs.saveBlockImg()'
                    }
                }
            }, {
                //【保存img】按钮
                type: 'SAVE_TO_CLOUD',
                class: 'icon-upload-cloud',
                id: 'save-to-cloud-btn',
                title: '',
                href: '#',
                onclick: {
                    websocket: {
                        web: 'Mixly.WebSocket.saveToCloud()'
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
    EXPORT_LIB: Env.isElectron && Nav.CONFIG.setting.thirdPartyLibrary,
    MANAGE_LIB: Env.isElectron && Nav.CONFIG.setting.thirdPartyLibrary,
    OTHER_BIN: Nav.CONFIG.burn && typeof BOARD?.burn?.special === 'object',
    WS_CONNECT: workingEnv === 'websocket',
    FILE: true,
    NEW_FILE: true,
    OPEN_FILE: true,
    SAVE_FILE: true,
    SAVE_AS_FILE: Env.isElectron,
    SAVE_XML: !Env.isElectron,
    SAVE_PY: !Env.isElectron && Nav.CONFIG.save.py,
    SAVE_INO: !Env.isElectron && Nav.CONFIG.save.ino,
    SAVE_HEX: !Env.isElectron && Nav.CONFIG.save.py && Nav.CONFIG.save.hex,
    SAVE_IMG: !Env.isElectron && Nav.CONFIG.save.img,
    SAVE_TO_CLOUD: !Env.isElectron && Env.hasSocketServer,
    PYTHON_TO_BLOCKLY: Nav.CONFIG?.setting?.pythonToBlockly && ['mpy', 'py', 'webpy'].includes(codeEnv),
    OPEN_WIKI: Env.isElectron && Nav.CONFIG.setting.wiki,
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
                                <dl class="layui-nav-child">`;
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
            <!--
            <img src="../common/media/mixly.png" width="20" height="20" style="padding: 0px 0px 4px 0px;">
            </img>
            -->
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
    'save-btn': 'save',
    'save-xml-btn': 'save_blocks',
    'save-ino-btn': 'save_ino',
    'save-img-btn': 'save_img',
    'save-py-btn': 'save_py',
    'save-hex-btn': 'save_hex',
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
}

function showTag() {
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
            pythonToBlocklyDom.html(MSG['disablePythonToBlockly'])
                              .attr('class', 'icon-toggle-on-1');
        } else {
            pythonToBlocklyDom.html(MSG['enablePythonToBlockly'])
                              .attr('class', 'icon-toggle-off-1');
        }
    }
    if (document.getElementById('boardSelector'))
        document.getElementById('boardSelector').placeholder = MSG['fn'];
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
            tagObject.innerHTML = MSG[msg] + '<i class="layui-icon layui-icon-down layui-nav-more"></i>';
        } else {
            document.getElementById(id).innerHTML = MSG[msg];
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

})();