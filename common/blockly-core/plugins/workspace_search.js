/*! For license information please see index.js.LICENSE.txt */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("blockly/core"));else if("function"==typeof define&&define.amd)define(["blockly/core"],t);else{var i="object"==typeof exports?t(require("blockly/core")):t(e.Blockly);for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(this,(e=>(()=>{"use strict";var t={573:t=>{t.exports=e}},i={};function n(e){var o=i[e];if(void 0!==o)return o.exports;var r=i[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{n.r(o),n.d(o,{WorkspaceSearch:()=>a});var e,t=["path.blocklyPath.blockly-ws-search-highlight {","fill: #414141;","}","path.blocklyPath.blockly-ws-search-highlight.blockly-ws-search-current {","fill: black;","}",".blockly-ws-search {","background: white;","border: solid lightgrey .5px;","justify-content: center;","padding: .25em;","position: absolute;","z-index: 70;","}",".dark .blockly-ws-search {","background: #443e3e;","border: solid #1e1e1e .5px;","justify-content: center;","padding: .25em;","position: absolute;","z-index: 70;","}",".blockly-ws-search-input input {","border: none;","}",".blockly-ws-search button {","border: none;","}",".blockly-ws-search-actions {","display: flex;","flex-direction: row;","align-items: center;","padding: 0 2px;","}",".blockly-ws-search-container {","display: flex;","flex-direction: row;","align-items: center;","}",".blockly-ws-search-content {","display: flex;","flex-direction: row;","align-items: center;","}",".blockly-ws-search-actions .blockly-ws-search-next-btn {","margin-left: 2px !important;","}"],i=(e=!1,function(){if(!e){e=!0;var i=t.join("\n"),n=document.createElement("style");n.id="blockly-ws-search-style";var o=document.createTextNode(i);n.appendChild(o),document.head.insertBefore(n,document.head.firstChild)}}),r=n(573);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function c(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==s(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.workspace_=t,this.id="workspaceSearch",this.htmlDiv_=null,this.actionDiv_=null,this.inputElement_=null,this.textInputPlaceholder_=r.Msg.SEARCH,this.blocks_=[],this.currentBlockIndex_=-1,this.searchText_="",this.searchOnInput=!0,this.caseSensitive=!1,this.preserveSelected=!0,this.boundEvents_=[]}var t,n;return t=e,(n=[{key:"init",value:function(){this.workspace_.getComponentManager().addComponent({component:this,weight:0,capabilities:[r.ComponentManager.Capability.POSITIONABLE]}),i(),this.createDom_(),this.setVisible_(!1),this.workspace_.resize()}},{key:"dispose",value:function(){var e,t=function(e,t){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=function(e,t){if(e){if("string"==typeof e)return l(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?l(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,c=!1;return{s:function(){i=i.call(e)},n:function(){var e=i.next();return s=e.done,e},e:function(e){c=!0,r=e},f:function(){try{s||null==i.return||i.return()}finally{if(c)throw r}}}}(this.boundEvents_);try{for(t.s();!(e=t.n()).done;){var i=e.value;r.unbindEvent_(i)}}catch(e){t.e(e)}finally{t.f()}this.boundEvents_=null,this.htmlDiv_&&(this.htmlDiv_.remove(),this.htmlDiv_=null),this.actionDiv_=null,this.inputElement_=null}},{key:"createDom_",value:function(){var e=this,t=this.workspace_.getInjectionDiv();this.addEvent_(t,"keydown",this,(function(t){return e.onWorkspaceKeyDown_(t)})),this.htmlDiv_=document.createElement("div"),r.utils.dom.addClass(this.htmlDiv_,"blockly-ws-search");var i=document.createElement("div");r.utils.dom.addClass(i,"blockly-ws-search-container");var n=document.createElement("div");r.utils.dom.addClass(n,"blockly-ws-search-content"),i.appendChild(n);var o=document.createElement("div");r.utils.dom.addClass(o,"blockly-ws-search-input"),this.inputElement_=this.createTextInput_(),this.addEvent_(this.inputElement_,"keydown",this,(function(t){return e.onKeyDown_(t)})),this.addEvent_(this.inputElement_,"input",this,(function(){return e.onInput_()})),this.addEvent_(this.inputElement_,"click",this,(function(){return e.searchAndHighlight(e.searchText_,e.preserveSelected)})),o.appendChild(this.inputElement_),n.appendChild(o),this.actionDiv_=document.createElement("div"),r.utils.dom.addClass(this.actionDiv_,"blockly-ws-search-actions"),n.appendChild(this.actionDiv_);var s=this.createPreviousBtn_();s&&this.addActionBtn(s,(function(){return e.previous()}));var l=this.createNextBtn_();l&&this.addActionBtn(l,(function(){return e.next()}));var c=this.createCloseBtn_();c&&(this.addBtnListener_(c,(function(){return e.close()})),i.appendChild(c)),this.htmlDiv_.appendChild(i),t.insertBefore(this.htmlDiv_,this.workspace_.getParentSvg())}},{key:"addEvent_",value:function(e,t,i,n){var o=r.browserEvents.conditionalBind(e,t,i,n);this.boundEvents_.push(o)}},{key:"addActionBtn",value:function(e,t){this.addBtnListener_(e,t),this.actionDiv_.appendChild(e)}},{key:"createTextInput_",value:function(){var e=document.createElement("input");return e.type="text",e.setAttribute("placeholder",this.textInputPlaceholder_),e}},{key:"createNextBtn_",value:function(){return this.createBtn_("blockly-ws-search-next-btn","Find next","layui-icon-down")}},{key:"createPreviousBtn_",value:function(){return this.createBtn_("blockly-ws-search-previous-btn","Find previous","layui-icon-up")}},{key:"createCloseBtn_",value:function(){return this.createBtn_("blockly-ws-search-close-btn layui-btn-normal","Close search bar","layui-icon-close")}},{key:"createBtn_",value:function(e,t,i){var n=document.createElement("button");r.utils.dom.addClass(n,e),r.utils.dom.addClass(n,"layui-btn layui-btn-xs"),n.setAttribute("aria-label",t);var o=document.createElement("i");return r.utils.dom.addClass(o,"layui-icon layui-font-12 ".concat(i)),n.appendChild(o),n}},{key:"addBtnListener_",value:function(e,t){var i=this;this.addEvent_(e,"click",this,t),this.addEvent_(e,"keydown",this,(function(e){e.keyCode===r.utils.KeyCodes.ENTER?(t(e),e.preventDefault()):e.keyCode===r.utils.KeyCodes.ESC&&i.close(),e.stopPropagation()}))}},{key:"getBoundingRectangle",value:function(){return null}},{key:"position",value:function(e,t){this.workspace_.RTL?this.htmlDiv_.style.left=e.absoluteMetrics.left+"px":e.toolboxMetrics.position===r.TOOLBOX_AT_RIGHT?this.htmlDiv_.style.right=e.toolboxMetrics.width+"px":this.htmlDiv_.style.right="0",this.htmlDiv_.style.top=e.absoluteMetrics.top+"px"}},{key:"onInput_",value:function(){if(this.searchOnInput){var e=this.inputElement_.value.trim();e!==this.searchText_&&this.searchAndHighlight(e,this.preserveSelected)}}},{key:"onKeyDown_",value:function(e){if(e.keyCode===r.utils.KeyCodes.ESC)this.close();else if(e.keyCode===r.utils.KeyCodes.ENTER)if(this.searchOnInput)this.next();else{var t=this.inputElement_.value.trim();t!==this.searchText_&&this.searchAndHighlight(t,this.preserveSelected)}}},{key:"onWorkspaceKeyDown_",value:function(e){(e.ctrlKey||e.metaKey)&&e.keyCode===r.utils.KeyCodes.F&&(this.open(),e.preventDefault(),e.stopPropagation())}},{key:"previous",value:function(){this.setCurrentBlock_(this.currentBlockIndex_-1)}},{key:"next",value:function(){this.setCurrentBlock_(this.currentBlockIndex_+1)}},{key:"setSearchPlaceholder",value:function(e){this.textInputPlaceholder_=e,this.inputElement_&&this.inputElement_.setAttribute("placeholder",this.textInputPlaceholder_)}},{key:"setCurrentBlock_",value:function(e){if(this.blocks_.length){var t=this.blocks_[this.currentBlockIndex_];t&&this.unhighlightCurrentSelection_(t),this.currentBlockIndex_=(e%this.blocks_.length+this.blocks_.length)%this.blocks_.length,t=this.blocks_[this.currentBlockIndex_],this.highlightCurrentSelection_(t),this.scrollToVisible_(t)}}},{key:"open",value:function(){this.setVisible_(!0),this.inputElement_.focus(),this.searchText_&&this.searchAndHighlight(this.searchText_)}},{key:"close",value:function(){this.setVisible_(!1),this.workspace_.markFocused(),this.clearBlocks()}},{key:"setVisible_",value:function(e){this.htmlDiv_.style.display=e?"flex":"none"}},{key:"searchAndHighlight",value:function(e,t){var i=this.blocks_[this.currentBlockIndex_];this.searchText_=e.trim(),this.clearBlocks(),this.blocks_=this.getMatchingBlocks_(this.workspace_,this.searchText_,this.caseSensitive),this.highlightSearchGroup_(this.blocks_);var n=0;t&&(n=(n=this.blocks_.indexOf(i))>-1?n:0),this.setCurrentBlock_(n)}},{key:"getSearchPool_",value:function(e){return e.getAllBlocks(!0).filter((function(e){var t=e.getSurroundParent();return!t||!t.isCollapsed()}))}},{key:"isBlockMatch_",value:function(e,t,i){var n="";if(e.isCollapsed())n=e.toString();else{var o=[];e.inputList.forEach((function(e){e.fieldRow.forEach((function(e){o.push(e.getText())}))})),n=o.join(" ").trim()}return i||(n=n.toLowerCase()),n.indexOf(t)>-1}},{key:"getMatchingBlocks_",value:function(e,t,i){var n=this;return t?(this.caseSensitive||(t=t.toLowerCase()),this.getSearchPool_(e).filter((function(e){return n.isBlockMatch_(e,t,i)}))):[]}},{key:"clearBlocks",value:function(){this.unhighlightSearchGroup_(this.blocks_);var e=this.blocks_[this.currentBlockIndex_];e&&this.unhighlightCurrentSelection_(e),this.currentBlockIndex_=-1,this.blocks_=[]}},{key:"highlightCurrentSelection_",value:function(e){var t=e.pathObject.svgPath;r.utils.dom.addClass(t,"blockly-ws-search-current")}},{key:"unhighlightCurrentSelection_",value:function(e){var t=e.pathObject.svgPath;r.utils.dom.removeClass(t,"blockly-ws-search-current")}},{key:"highlightSearchGroup_",value:function(e){e.forEach((function(e){var t=e.pathObject.svgPath;r.utils.dom.addClass(t,"blockly-ws-search-highlight")}))}},{key:"unhighlightSearchGroup_",value:function(e){e.forEach((function(e){var t=e.pathObject.svgPath;r.utils.dom.removeClass(t,"blockly-ws-search-highlight")}))}},{key:"scrollToVisible_",value:function(e){if(this.workspace_.isMovable()){var t=e.getRelativeToSurfaceXY(),i=this.workspace_.scale,n=e.width*i,o=e.height*i,r=t.y*i,s=(t.y+e.height)*i,l=this.workspace_.RTL?t.x*i-n:t.x*i,c=this.workspace_.RTL?t.x*i:t.x*i+n,a=this.workspace_.getMetrics(),h=a.viewLeft,u=l<a.viewLeft,d=c>a.viewLeft+a.viewWidth,v=n>a.viewWidth;!v&&u||v&&!this.workspace_.RTL?h=l:(!v&&d||v&&this.workspace_.RTL)&&(h=c-a.viewWidth);var p=a.viewTop,f=r<a.viewTop,y=s>a.viewTop+a.viewHeight,_=o>a.viewHeight;if(f||_&&y?p=r:y&&(p=s-a.viewHeight),h!==a.viewLeft||p!==a.viewTop){var k=document.activeElement;this.workspace_.scroll(-h,-p),k&&k.focus()}}}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()})(),o})()));