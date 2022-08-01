/*! For license information please see index.js.LICENSE.txt */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("blockly/core"));else if("function"==typeof define&&define.amd)define(["blockly/core"],e);else{var o="object"==typeof exports?e(require("blockly/core")):e(t.Blockly);for(var n in o)("object"==typeof exports?exports:t)[n]=o[n]}}(this,(t=>(()=>{"use strict";var e={573:e=>{e.exports=t}},o={};function n(t){var i=o[t];if(void 0!==i)return i.exports;var r=o[t]={exports:{}};return e[t](r,r.exports,n),r.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return(()=>{n.r(i),n.d(i,{BACKPACK_CHANGE:()=>y,BACKPACK_OPEN:()=>C,Backpack:()=>D,BackpackChange:()=>f,BackpackContextMenuOptions:()=>{},BackpackOpen:()=>A,BackpackOptions:()=>{}});var t=n(573);function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,o){return e&&r(t.prototype,e),o&&r(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function c(){return c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,o){var n=a(t,e);if(n){var i=Object.getOwnPropertyDescriptor(n,e);return i.get?i.get.call(arguments.length<3?t:o):i.value}},c.apply(this,arguments)}function a(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=p(t)););return t}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&g(t,e)}function g(t,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},g(t,e)}function l(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=p(t);if(e){var i=p(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return I(this,o)}}function I(t,o){if(o&&("object"===e(o)||"function"==typeof o))return o;if(void 0!==o)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function p(t){return p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},p(t)}var C="backpack_open",A=function(t){u(n,t);var e=l(n);function n(t,i){var r;return o(this,n),(r=e.call(this,i)).isOpen=t,r.type=C,r}return s(n,[{key:"toJson",value:function(){var t=c(p(n.prototype),"toJson",this).call(this);return t.isOpen=this.isOpen,t}},{key:"fromJson",value:function(t){c(p(n.prototype),"fromJson",this).call(this,t),this.isOpen=t.isOpen}}]),n}(t.Events.UiBase);t.registry.register(t.registry.Type.EVENT,C,A);var y="backpack_change",f=function(t){u(n,t);var e=l(n);function n(t){var i;return o(this,n),(i=e.call(this,t)).type=y,i}return s(n)}(t.Events.UiBase);function h(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function M(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?h(Object(o),!0).forEach((function(e){k(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):h(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function k(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function _(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||v(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){if(t){if("string"==typeof t)return d(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}function w(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function T(t,e){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},T(t,e)}function m(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}t.registry.register(t.registry.Type.EVENT,y,f);var D=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&T(t,e)}(c,e);var o,n,i,r,s=(i=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(i);if(r){var o=O(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return m(this,t)});function c(t,e){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(o=s.call(this)).workspace_=t,o.id="backpack",o.options_=function(t){var e,o={allowEmptyBackpackOpen:!0,contextMenu:{emptyBackpack:!0,removeFromBackpack:!0,copyToBackpack:!0,copyAllToBackpack:!1,pasteAllToBackpack:!1,disablePreconditionChecks:!1}};if(!t)return o;var n={};return n.contextMenu=M(M({},o.contextMenu),t.contextMenu),n.allowEmptyBackpackOpen=null!==(e=t.allowEmptyBackpackOpen)&&void 0!==e?e:o.allowEmptyBackpackOpen,n}(e),o.flyout_=null,o.contents_=[],o.boundEvents_=[],o.left_=0,o.top_=0,o.WIDTH_=40,o.HEIGHT_=60,o.MARGIN_VERTICAL_=20,o.MARGIN_HORIZONTAL_=20,o.HOTSPOT_MARGIN_=10,o.svgGroup_=null,o.SPRITE_TOP_=10,o.SPRITE_LEFT_=20,o.SPRITE_SIZE_=80,o}return o=c,(n=[{key:"init",value:function(){var e,o;this.workspace_.getComponentManager().addComponent({component:this,weight:2,capabilities:[t.ComponentManager.Capability.AUTOHIDEABLE,t.ComponentManager.Capability.DRAG_TARGET,t.ComponentManager.Capability.POSITIONABLE]}),this.initFlyout_(),this.createDom_(),this.attachListeners_(),e=this.options_.contextMenu,o=this.workspace_,e.emptyBackpack&&function(e){var o=e.configureContextMenu;e.configureContextMenu=function(n,i){var r=e.getComponentManager().getComponent("backpack");if(r&&r.getClientRect().contains(i.clientX,i.clientY)){n.length=0;var s={text:t.Msg.EMPTY_BACKPACK,enabled:!!r.getCount(),callback:function(){r.empty()}};n.push(s)}else o&&o.call(null,n,i)}}(o),e.removeFromBackpack&&function(){if(!t.ContextMenuRegistry.registry.getItem("remove_from_backpack")){var e={displayText:t.Msg.REMOVE_FROM_BACKPACK,preconditionFn:function(t){var e=t.block.workspace;if(e.isFlyout&&e.targetWorkspace){var o=e.targetWorkspace.getComponentManager().getComponent("backpack");if(o&&o.getFlyout().getWorkspace().id===e.id)return"enabled"}return"hidden"},callback:function(t){t.block.workspace.targetWorkspace.getComponentManager().getComponent("backpack").removeBlock(t.block)},scopeType:t.ContextMenuRegistry.ScopeType.BLOCK,id:"remove_from_backpack",weight:200};t.ContextMenuRegistry.registry.register(e)}}(),e.copyToBackpack&&function(e){if(!t.ContextMenuRegistry.registry.getItem("copy_to_backpack")){var o={displayText:function(e){if(e.block){var o=e.block.workspace.getComponentManager().getComponent("backpack").getCount();return"".concat(t.Msg.COPY_TO_BACKPACK," (").concat(o,")")}},preconditionFn:function(t){var o=t.block.workspace;if(!o.isFlyout){var n=o.getComponentManager().getComponent("backpack");if(n)return e?"enabled":n.containsBlock(t.block)?"disabled":"enabled"}return"hidden"},callback:function(t){t.block.workspace.getComponentManager().getComponent("backpack").addBlock(t.block)},scopeType:t.ContextMenuRegistry.ScopeType.BLOCK,id:"copy_to_backpack",weight:200};t.ContextMenuRegistry.registry.register(o)}}(e.disablePreconditionChecks),e.copyAllToBackpack&&function(){if(!t.ContextMenuRegistry.registry.getItem("copy_all_to_backpack")){var e={displayText:t.Msg.COPY_ALL_TO_BACKPACK,preconditionFn:function(t){var e=t.workspace;return!e.isFlyout&&e.getComponentManager().getComponent("backpack")?"enabled":"hidden"},callback:function(t){var e=t.workspace;e.getComponentManager().getComponent("backpack").addBlocks(e.getTopBlocks())},scopeType:t.ContextMenuRegistry.ScopeType.WORKSPACE,id:"copy_all_to_backpack",weight:200};t.ContextMenuRegistry.registry.register(e)}}(),e.pasteAllToBackpack&&function(){if(!t.ContextMenuRegistry.registry.getItem("paste_all_from_backpack")){var e={displayText:function(e){if(e.workspace){var o=e.workspace.getComponentManager().getComponent("backpack").getCount();return"".concat(t.Msg.PASTE_ALL_FROM_BACKPACK," (").concat(o,")")}},preconditionFn:function(t){var e=t.workspace;return!e.isFlyout&&e.getComponentManager().getComponent("backpack")?"enabled":"hidden"},callback:function(e){var o=e.workspace;o.getComponentManager().getComponent("backpack").getContents().forEach((function(e){t.Xml.domToBlock(t.Xml.textToDom(e),o).scheduleSnapAndBump()}))},scopeType:t.ContextMenuRegistry.ScopeType.WORKSPACE,id:"paste_all_from_backpack",weight:200};t.ContextMenuRegistry.registry.register(e)}}(),this.initialized_=!0,this.workspace_.resize()}},{key:"dispose",value:function(){this.svgGroup_&&t.utils.dom.removeNode(this.svgGroup_);var e,o=function(t,e){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=v(t))){o&&(t=o);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,c=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return s=t.done,t},e:function(t){c=!0,r=t},f:function(){try{s||null==o.return||o.return()}finally{if(c)throw r}}}}(this.boundEvents_);try{for(o.s();!(e=o.n()).done;){var n=e.value;t.unbindEvent_(n)}}catch(t){o.e(t)}finally{o.f()}this.boundEvents_.length=0}},{key:"initFlyout_",value:function(){var e=new t.Options({scrollbars:!0,parentWorkspace:this.workspace_,rtl:this.workspace_.RTL,oneBasedIndex:this.workspace_.options.oneBasedIndex,renderer:this.workspace_.options.renderer,rendererOverrides:this.workspace_.options.rendererOverrides,move:{scrollbars:!0}});if(this.workspace_.horizontalLayout){e.toolboxPosition=this.workspace_.toolboxPosition===t.utils.toolbox.Position.TOP?t.utils.toolbox.Position.BOTTOM:t.utils.toolbox.Position.TOP;var o=t.registry.getClassFromOptions(t.registry.Type.FLYOUTS_HORIZONTAL_TOOLBOX,this.workspace_.options,!0);this.flyout_=new o(e)}else{e.toolboxPosition=this.workspace_.toolboxPosition===t.utils.toolbox.Position.RIGHT?t.utils.toolbox.Position.LEFT:t.utils.toolbox.Position.RIGHT;var n=t.registry.getClassFromOptions(t.registry.Type.FLYOUTS_VERTICAL_TOOLBOX,this.workspace_.options,!0);this.flyout_=new n(e)}this.workspace_.getParentSvg().parentNode.appendChild(this.flyout_.createDom(t.utils.Svg.SVG)),this.flyout_.init(this.workspace_)}},{key:"createDom_",value:function(){this.svgGroup_=t.utils.dom.createSvgElement(t.utils.Svg.G,{},null);var e=t.utils.IdGenerator.getNextUniqueId(),o=t.utils.dom.createSvgElement(t.utils.Svg.CLIPPATH,{id:"blocklyBackpackClipPath"+e},this.svgGroup_);t.utils.dom.createSvgElement(t.utils.Svg.RECT,{width:this.WIDTH_,height:this.HEIGHT_},o),this.svgImg_=t.utils.dom.createSvgElement(t.utils.Svg.IMAGE,{class:"blocklyBackpack","clip-path":"url(#blocklyBackpackClipPath"+e+")",width:this.SPRITE_SIZE_+"px",x:-this.SPRITE_LEFT_,height:this.SPRITE_SIZE_+"px",y:-this.SPRITE_TOP_},this.svgGroup_),this.svgImg_.setAttributeNS(t.utils.dom.XLINK_NS,"xlink:href",L),t.utils.dom.insertAfter(this.svgGroup_,this.workspace_.getBubbleCanvas())}},{key:"attachListeners_",value:function(){this.addEvent_(this.svgGroup_,"mousedown",this,this.blockMouseDownWhenOpenable_),this.addEvent_(this.svgGroup_,"mouseup",this,this.onClick_),this.addEvent_(this.svgGroup_,"mouseover",this,this.onMouseOver_),this.addEvent_(this.svgGroup_,"mouseout",this,this.onMouseOut_)}},{key:"addEvent_",value:function(e,o,n,i){var r=t.browserEvents.bind(e,o,n,i);this.boundEvents_.push(r)}},{key:"getFlyout",value:function(){return this.flyout_}},{key:"getClientRect",value:function(){if(!this.svgGroup_)return null;var e=this.svgGroup_.getBoundingClientRect(),o=e.top+this.SPRITE_TOP_-this.HOTSPOT_MARGIN_,n=o+this.HEIGHT_+2*this.HOTSPOT_MARGIN_,i=e.left+this.SPRITE_LEFT_-this.HOTSPOT_MARGIN_,r=i+this.WIDTH_+2*this.HOTSPOT_MARGIN_;return new t.utils.Rect(o,n,i,r)}},{key:"getBoundingRectangle",value:function(){return new t.utils.Rect(this.top_,this.top_+this.HEIGHT_,this.left_,this.left_+this.WIDTH_)}},{key:"position",value:function(e,o){if(this.initialized_){var n=this.workspace_.scrollbar&&this.workspace_.scrollbar.canScrollHorizontally(),i=this.workspace_.scrollbar&&this.workspace_.scrollbar.canScrollVertically();e.toolboxMetrics.position===t.TOOLBOX_AT_LEFT||this.workspace_.horizontalLayout&&!this.workspace_.RTL?(this.left_=e.absoluteMetrics.left+e.viewMetrics.width-this.WIDTH_-this.MARGIN_HORIZONTAL_,n&&!this.workspace_.RTL&&(this.left_-=t.Scrollbar.scrollbarThickness)):(this.left_=this.MARGIN_HORIZONTAL_,n&&this.workspace_.RTL&&(this.left_+=t.Scrollbar.scrollbarThickness));var r=e.toolboxMetrics.position===t.TOOLBOX_AT_BOTTOM;r?(this.top_=e.absoluteMetrics.top+e.viewMetrics.height-this.HEIGHT_-this.MARGIN_VERTICAL_,i&&(this.top_-=t.Scrollbar.scrollbarThickness)):this.top_=e.absoluteMetrics.top+this.MARGIN_VERTICAL_;for(var s,c=this.getBoundingRectangle(),a=0;s=o[a];a++)c.intersects(s)&&(this.top_=r?s.top-this.HEIGHT_-this.MARGIN_VERTICAL_:s.bottom+this.MARGIN_VERTICAL_,c=this.getBoundingRectangle(),a=-1);this.svgGroup_.setAttribute("transform","translate("+this.left_+","+this.top_+")")}}},{key:"getCount",value:function(){return this.contents_.length}},{key:"getContents",value:function(){return _(this.contents_)}},{key:"onDrop",value:function(e){e instanceof t.BlockSvg&&this.addBlock(e)}},{key:"blockToCleanXmlString_",value:function(e){return function(e){for(var o=e.cloneNode(!0),n=o;n;){n.removeAttribute&&(n.removeAttribute("x"),n.removeAttribute("y"),n.removeAttribute("id"),n.removeAttribute("disabled"),"comment"==n.nodeName&&(n.removeAttribute("h"),n.removeAttribute("w"),n.removeAttribute("pinned")));var i=n.firstChild||n.nextSibling;if(!i)for(i=n.parentNode;i;){if(i.nextSibling){i=i.nextSibling;break}i=i.parentNode}n=i}return t.Xml.domToText(o)}(t.Xml.blockToDom(e))}},{key:"containsBlock",value:function(t){var e=this.blockToCleanXmlString_(t);return-1!==this.contents_.indexOf(e)}},{key:"addBlock",value:function(t){this.addItem(this.blockToCleanXmlString_(t))}},{key:"addBlocks",value:function(t){var e=t.map(this.blockToCleanXmlString_);this.addItems(e)}},{key:"removeBlock",value:function(t){this.removeItem(this.blockToCleanXmlString_(t))}},{key:"addItem",value:function(t){this.addItems([t])}},{key:"addItems",value:function(t){var e,o=this.filterDuplicates_(t);o.length&&((e=this.contents_).unshift.apply(e,_(o)),this.onContentChange_())}},{key:"removeItem",value:function(t){var e=this.contents_.indexOf(t);-1!==e&&(this.contents_.splice(e,1),this.onContentChange_())}},{key:"setContents",value:function(t){this.contents_=[],this.contents_=this.filterDuplicates_(t),this.onContentChange_()}},{key:"empty",value:function(){this.getCount()&&(this.contents_.length&&(this.contents_=[],this.onContentChange_()),this.close())}},{key:"onContentChange_",value:function(){this.maybeRefreshFlyoutContents_(),this.contents_.length>0?this.svgImg_.setAttributeNS(t.utils.dom.XLINK_NS,"xlink:href",S):this.svgImg_.setAttributeNS(t.utils.dom.XLINK_NS,"xlink:href",L),t.Events.fire(new f(this.workspace_.id))}},{key:"filterDuplicates_",value:function(t){var e=this;return t.filter((function(o,n){return t.indexOf(o)===n&&-1===e.contents_.indexOf(o)}))}},{key:"isOpenable_",value:function(){return!(this.isOpen()||!this.options_.allowEmptyBackpackOpen)||this.getCount()>0}},{key:"isOpen",value:function(){return this.flyout_.isVisible()}},{key:"open",value:function(){if(this.isOpenable_()){var e=this.contents_.map((function(e){return t.Xml.textToDom(e)}));this.flyout_.show(e),t.Events.fire(new A(!0,this.workspace_.id))}}},{key:"maybeRefreshFlyoutContents_",value:function(){if(this.isOpen()){var e=this.contents_.map((function(e){return t.Xml.textToDom(e)}));this.flyout_.show(e)}}},{key:"close",value:function(){this.isOpen()&&(this.flyout_.hide(),t.Events.fire(new A(!1,this.workspace_.id)))}},{key:"autoHide",value:function(t){t||this.close()}},{key:"onClick_",value:function(e){if(!t.utils.isRightButton(e)){this.open();var o=new(t.Events.get(t.Events.CLICK))(null,this.workspace_.id,"backpack");t.Events.fire(o)}}},{key:"onDragEnter",value:function(e){e instanceof t.BlockSvg&&this.updateHoverStying_(!0)}},{key:"onDragExit",value:function(t){this.updateHoverStying_(!1)}},{key:"onMouseOver_",value:function(){this.isOpenable_()&&this.updateHoverStying_(!0)}},{key:"onMouseOut_",value:function(){this.updateHoverStying_(!1)}},{key:"updateHoverStying_",value:function(e){var o="blocklyBackpackDarken";e?t.utils.dom.addClass(this.svgImg_,o):t.utils.dom.removeClass(this.svgImg_,o)}},{key:"shouldPreventMove",value:function(e){return e instanceof t.BlockSvg}},{key:"blockMouseDownWhenOpenable_",value:function(e){!t.utils.isRightButton(e)&&this.isOpenable_()&&e.stopPropagation()}}])&&w(o.prototype,n),Object.defineProperty(o,"prototype",{writable:!1}),c}(t.DragTarget),L="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiM0NTVBNjQiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjwvZz48Zz48Zy8+PGc+PHBhdGggZD0iTTEzLjk3LDUuMzRDMTMuOTgsNS4yMywxNCw1LjEyLDE0LDVjMC0xLjEtMC45LTItMi0ycy0yLDAuOS0yLDJjMCwwLjEyLDAuMDIsMC4yMywwLjAzLDAuMzRDNy42OSw2LjE1LDYsOC4zOCw2LDExdjggYzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMnYtOEMxOCw4LjM4LDE2LjMxLDYuMTUsMTMuOTcsNS4zNHogTTExLDVjMC0wLjU1LDAuNDUtMSwxLTFzMSwwLjQ1LDEsMSBjMCwwLjAzLTAuMDEsMC4wNi0wLjAyLDAuMDlDMTIuNjYsNS4wMywxMi4zNCw1LDEyLDVzLTAuNjYsMC4wMy0wLjk4LDAuMDlDMTEuMDEsNS4wNiwxMSw1LjAzLDExLDV6IE0xNiwxM3YxdjAuNSBjMCwwLjI4LTAuMjIsMC41LTAuNSwwLjVTMTUsMTQuNzgsMTUsMTQuNVYxNHYtMUg4di0xaDdoMVYxM3oiLz48L2c+PC9nPjwvc3ZnPg==",S="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQiCiAgIGhlaWdodD0iMjQiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNSIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMiIgLz4KICA8ZwogICAgIGlkPSJsYXllcjEiPgogICAgPGcKICAgICAgIHN0eWxlPSJmaWxsOiM0NTVhNjQiCiAgICAgICBpZD0iZzg0OCIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMjY0NTgzMzMsMCwwLDAuMjY0NTgzMzMsOC44MjQ5OTk3LDguODI0OTk5NykiPgogICAgICA8ZwogICAgICAgICBpZD0iZzgyNiI+CiAgICAgICAgPHJlY3QKICAgICAgICAgICBmaWxsPSJub25lIgogICAgICAgICAgIGhlaWdodD0iMjQiCiAgICAgICAgICAgd2lkdGg9IjI0IgogICAgICAgICAgIGlkPSJyZWN0ODI0IgogICAgICAgICAgIHg9IjAiCiAgICAgICAgICAgeT0iMCIgLz4KICAgICAgPC9nPgogICAgICA8ZwogICAgICAgICBpZD0iZzgzNCI+CiAgICAgICAgPGcKICAgICAgICAgICBpZD0iZzgyOCIgLz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMjIyMyI+CiAgICAgICAgICA8ZwogICAgICAgICAgICAgaWQ9ImcyMTAxNiI+CiAgICAgICAgICAgIDxnCiAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsOiM0NTVhNjQiCiAgICAgICAgICAgICAgIGlkPSJnMTQ5MyIKICAgICAgICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMy43Nzk1Mjc2LDAsMCwzLjc3OTUyNzYsLTMzLjM1NDMzLC0zMy4zNTQzMykiPgogICAgICAgICAgICAgIDxnCiAgICAgICAgICAgICAgICAgaWQ9ImcxNDcxIj4KICAgICAgICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICAgICAgICBpZD0icmVjdDE0NjkiCiAgICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbDpub25lIgogICAgICAgICAgICAgICAgICAgZD0iTSAwLDAgSCAyNCBWIDI0IEggMCBaIiAvPgogICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICA8ZwogICAgICAgICAgICAgICAgIGlkPSJnMTQ3OSI+CiAgICAgICAgICAgICAgICA8ZwogICAgICAgICAgICAgICAgICAgaWQ9ImcxNDczIiAvPgogICAgICAgICAgICAgICAgPGcKICAgICAgICAgICAgICAgICAgIGlkPSJnMTQ3NyI+CiAgICAgICAgICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICAgICAgICAgIGlkPSJwYXRoMTQ3NSIKICAgICAgICAgICAgICAgICAgICAgZD0ibSAxMiwzIGMgLTEuMSwwIC0yLDAuOSAtMiwyIDAsMC4xMiAwLjAxOTMsMC4yMjk4NDM4IDAuMDI5MywwLjMzOTg0MzggQyA3LjY4OTI5NjUsNi4xNDk4NDMzIDYsOC4zOCA2LDExIHYgOCBjIDAsMS4xIDAuOSwyIDIsMiBoIDggYyAxLjEsMCAyLC0wLjkgMiwtMiBWIDExIEMgMTgsOC4zOCAxNi4zMTA3MDMsNi4xNDk4NDMzIDEzLjk3MDcwMyw1LjMzOTg0MzggMTMuOTgwNzAzLDUuMjI5ODQzOCAxNCw1LjEyIDE0LDUgMTQsMy45IDEzLjEsMyAxMiwzIFogbSAwLDEgYyAwLjU1LDAgMSwwLjQ1IDEsMSAwLDAuMDMgLTAuMDA5NSwwLjA1OTg0NCAtMC4wMTk1MywwLjA4OTg0NCBDIDEyLjY2MDQ2OSw1LjAyOTg0MzggMTIuMzQsNSAxMiw1IDExLjY2LDUgMTEuMzM5NTMxLDUuMDI5ODQzOCAxMS4wMTk1MzEsNS4wODk4NDM4IDExLjAwOTUzMSw1LjA1OTg0MzggMTEsNS4wMyAxMSw1IDExLDQuNDUgMTEuNDUsNCAxMiw0IFogbSAtMy40NzI2NTYyLDYuMzk4NDM4IGggMS4xNTYyNSB2IDIuNjQwNjI0IGggMC4zMDkzMzU0IGwgLTIuMzdlLTUsLTEuMTcxMTQ2IDEuMDgyNzEwNSwtMTBlLTcgMC4wMTEsMS4xNzExNDYgaCAwLjMzMzMwNCBsIC0wLjAzNTA0LC0yLjU4NzMxNSBoIDAuNTc4MTI1IDAuNTc4MTI1IGwgMC4wMTEwNSwyLjU4NzMxNSBoIDAuMzU2MDI0IFYgMTIuMDYwNTQ3IEggMTQuMDYyNSB2IDAuOTc4NTE1IGggMC4zMzAwNzggdiAtMi41NTI3MzQgaCAxLjE1NjI1IHYgMi41NTI3MzQgaCAwLjk2Njc5NyB2IDAuMzU3NDIyIEggOS42ODM1OTM4IDguNTI3MzQzOCA3LjYwMzUxNTYgdiAtMC4zNTc0MjIgaCAwLjkyMzgyODIgeiIKICAgICAgICAgICAgICAgICAgICAgLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=";t.Css.register([".blocklyBackpack {","opacity: .4;","}",".blocklyBackpackDarken {","opacity: .6;","}",".blocklyBackpack:active {","opacity: .8;","}"])})(),i})()));