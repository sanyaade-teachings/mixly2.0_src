goog.loadJs('common', () => {

goog.provide('Mixly.Env');

const { Env } = Mixly;

/**
  * 检测是否启用node服务器
  * @type {Boolean}
  */
Env.hasSocketServer = false;

/**
  * 检测是否启用node编译服务器
  * @type {Boolean}
  */
Env.hasCompiler = false;

/**
  * 获取当前mixly2.0的路径
  * @type {String}
  */
Env.clientPath = null;

/**
  * 检测当前系统
  * @type {String} win32、darwin、linux
  */
Env.currentPlatform = null;

/**
  * 对于win系统，获取免安装python3的路径，对于mac与linux，则此变量值为python3
  * @type {String} 
  */
Env.python3Path = null;

/**
  * 获取mixly.py的路径
  * @type {String} 
  */
Env.pyFilePath = null;

/**
  * 获取板卡index或主页面index的路径
  * @type {String} 
  */
Env.indexDirPath = null;

/**
  * 资源文件夹所在路径
  * @type {String} 
  */
Env.srcDirPath = null;

/**
  * 获取板卡index或主页面index的缩放比例
  * @type {String} 
  */
Env.winSize = null;

/**
  * 获取板卡index默认xml
  * @type {String} 
  */
Env.defaultXML = null;

/**
  * 获取第三方库所用css
  * @type {Array} 
  */
Env.thirdPartyCSS = [];

/**
  * 获取第三方库所用js
  * @type {Array}
  */
Env.thirdPartyJS = [];

Env.templatePath = goog.normalizePath_(goog.basePath + '../template/');
Env.msgPath = goog.normalizePath_(goog.basePath + '../msg/');

Env.indexDirPath = __dirname;

});