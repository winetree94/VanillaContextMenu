(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{160:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Log=function(){function Log(){throw new Error("Do not create instance, only static method supported")}return Log.d=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];console.debug.apply(console,args)},Log.l=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];console.log.apply(console,args)},Log.e=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];console.error.apply(console,args)},Log}();exports.Log=Log},265:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var VEventContainer=function(){function VEventContainer(){this.listeners=[]}return VEventContainer.prototype.addEventListener=function(element,type,listener,options){element.addEventListener(type,listener,options),this.listeners.push({element:element,type:type,listener:listener})},VEventContainer.prototype.destroy=function(){this.listeners.forEach((function(_a){var element=_a.element,type=_a.type,listener=_a.listener;element.removeEventListener(type,listener)}))},VEventContainer}();exports.VEventContainer=VEventContainer},266:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var VLIElement_1=__webpack_require__(612),Log_1=__webpack_require__(160),VUListElement=function(){function VUListElement(params){this.ul=document.createElement("ul"),this.children=[],Log_1.Log.d("VUListElement"),this.params=params,this.setChildren(),this.ul.className="vanilla-context-ul",this.parseGroupClass()}return VUListElement.prototype.getElement=function(){return this.ul},VUListElement.prototype.setChildren=function(){var _this=this;this.params.nodes.forEach((function(node,index){var params={context:_this.params.context,e:_this.params.e,index:index,parent:_this,node:node},vLi=new VLIElement_1.VLIElement(params);_this.getElement().appendChild(vLi.getElement()),_this.children.push(vLi)}))},VUListElement.prototype.show=function(){this.ul.classList.add("active")},VUListElement.prototype.hide=function(){this.ul.classList.remove("active")},VUListElement.prototype.select=function(vLi){this.children.forEach((function(compare){return vLi===compare?vLi.openChild():compare.closeChild()}))},VUListElement.prototype.setLocation=function(location){this.ul.style.top=location.y+"px",this.ul.style.left=location.x+"px"},VUListElement.prototype.onDestroy=function(){var _a;null===(_a=this.ul.parentElement)||void 0===_a||_a.removeChild(this.ul),this.children.forEach((function(child){child.onDestroy()}))},VUListElement.prototype.parseGroupClass=function(){var groupClasses=this.params.context.options.groupClasses;if(groupClasses)if("function"==typeof groupClasses){var classes=groupClasses({api:this.params.context,originEvent:this.params.e});this.ul.className=this.ul.className+" "+classes}else this.ul.className=this.ul.className+" "+groupClasses},VUListElement}();exports.VUListElement=VUListElement},267:function(module,exports,__webpack_require__){__webpack_require__(268),__webpack_require__(414),module.exports=__webpack_require__(415)},332:function(module,exports){},415:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(161);Object(_storybook_html__WEBPACK_IMPORTED_MODULE_0__.configure)(__webpack_require__(605),module)}.call(this,__webpack_require__(416)(module))},605:function(module,exports,__webpack_require__){var map={"./demo.stories.ts":606};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=605},606:function(module,exports,__webpack_require__){"use strict";(function(module){Object.defineProperty(exports,"__esModule",{value:!0});var html_1=__webpack_require__(161);__webpack_require__(607);var Container_1=__webpack_require__(611);html_1.storiesOf("Demo",module).add("base",(function(){var table=document.createElement("table");table.innerHTML="\n      <tr>\n        <th>Company</th>\n        <th>Contact</th>\n        <th>Country</th>\n      </tr>\n      <tr>\n        <td>Alfreds Futterkiste</td>\n        <td>Maria Anders</td>\n        <td>Germany</td>\n      </tr>\n      <tr>\n        <td>Centro comercial Moctezuma</td>\n        <td>Francisco Chang</td>\n        <td>Mexico</td>\n      </tr>\n      <tr>\n        <td>Ernst Handel</td>\n        <td>Roland Mendel</td>\n        <td>Austria</td>\n      </tr>\n      <tr>\n        <td>Island Trading</td>\n        <td>Helen Bennett</td>\n        <td>UK</td>\n      </tr>\n      <tr>\n        <td>Laughing Bacchus Winecellars</td>\n        <td>Yoshi Tannamuri</td>\n        <td>Canada</td>\n      </tr>\n      <tr>\n        <td>Magazzini Alimentari Riuniti</td>\n        <td>Giovanni Rovelli</td>\n        <td>Italy</td>\n      </tr>\n  ";new Container_1.VanillaContext(table,{nodes:[{renderer:"Demo",onClick:function(){alert("Demo!")}}]});return table}))}).call(this,__webpack_require__(74)(module))},607:function(module,exports,__webpack_require__){var api=__webpack_require__(608),content=__webpack_require__(609);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1},exported=(api(content,options),content.locals?content.locals:{});module.exports=exported},609:function(module,exports,__webpack_require__){(exports=__webpack_require__(610)(!1)).push([module.i,".vanilla-context-ul {\n  background: #fff;\n  display: none;\n  width: 120px;\n  position: fixed;\n  z-index: 10;\n  border: 1px solid #bdc3c7;\n\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  user-select: none; /* supported by Chrome and Opera */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n}\n\n.vanilla-context-ul.active {\n  display: block;\n}\n\n.vanilla-context-li {\n  display: flex;\n  flex-direction: row;\n  height: 20px;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 8px;\n}\n\n.vanilla-context-li.disabled {\n  pointer-events: none;\n  cursor: not-allowed;\n}\n\n.vanilla-context-li.hover {\n  background: #ecf0f1;\n}\n\n.vanilla-context-text-container {\n  display: flex;\n  flex: 1 1;\n  justify-content: left;\n  align-items: center;\n}\n\n.vanilla-context-icon-container {\n  display: flex;\n  justify-content: center;\n  align-self: center;\n  height: 10px;\n  width: 10px;\n}\n\n.vanilla-context-icon {\n  display: flex;\n  width: 10px;\n  height: 10px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  background-image: url('data:image/png;base64,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UWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHoFFlfoCc8QegUWV+gJzxB6BRZX6AnPEHlvnb9A+Axf4zAgBgtcr8P1Hnnz8AAyrzo+SMPwADKvPj5Iw/AAMq8yPljD8AAyrzY+WMPwADKvOj5Yw/AAMq8+PljD8AAyrzI+aMPwADKvNj5ow/AAMq86PmjD8AAyrz4+aMPwADKvMj54w/AAMq82PnjD8AAyrzo+eMPwADKvPjt/3qF98IAH5EZX4Et1798usAwA+qzI/htqsPfBcA+HGV+VHccvWhLwIATSrz4/juVx/8FgDQqjI/ku969eGvAAADKvNj+W5Xn3h/ABhTmR/Nd7n61MsDwLDK/Hi++tUn3xwAHqEyP6KvevXp1waAB6nMj+mrXX3hnQHgcSrzo/oqV196YQB4qMr8uD796otvCwCPVpkf2adefflVAeAFVObH9mlXv/GeAPAyKvOj+5Sr33pJAHgxlfnxnb76zTcEgJdUmR9h4w8AAyrzY2z8AWBAZX6UjT8ADKjMj7PxB4ABlfmRNv4AMKAyP9bGHwAGVOZH2/gDwIDK/HgbfwAYUJkfceMPAAMq82Nu/AFgQGV+1I0/AAyozI+78QeAAZX5kTf+ADCgMj/2xh8ABlTmR9/4A8CAivEHgJUqxh8AVqoYfwBYqWL8AWClivEHgJUqxh8AVqoYfwBYqWL8AWClivEHgJUqxh8AVqoYfwBYqWL8AWClivEHgJUqxh8AVqoYfwBYqWL8AWClivEHGPH/AD3BDn8PGXvdAAAAAElFTkSuQmCC');\n}\n",""]),module.exports=exports},611:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var VEvent_1=__webpack_require__(265),VUListElement_1=__webpack_require__(266),Log_1=__webpack_require__(160),defaultContextOptions={autoClose:!0,debug:!0,nodes:[]},VanillaContext=function(){function VanillaContext(element,options){this.element=element,this.options=Object.assign(defaultContextOptions,options),this.events=new VEvent_1.VEventContainer,this.setEvents(),Log_1.Log.d("context create")}return VanillaContext.prototype.setEvents=function(){this.events.addEventListener(this.element,"contextmenu",this.onContextRequested.bind(this)),this.events.addEventListener(document,"click",this.onWindowClicked.bind(this))},VanillaContext.prototype.onContextRequested=function(e){var _this=this;if(Log_1.Log.d("onContainerClick"),e.preventDefault(),!this.context||!this.context.ul.contains(e.target)){this.context&&this.context.onDestroy(),this.context=new VUListElement_1.VUListElement({context:this,e:e,nodes:"function"==typeof _this.options.nodes?_this.options.nodes({api:_this,originEvent:e}):_this.options.nodes}),Log_1.Log.d("vUListElement created"),this.element.appendChild(this.context.getElement());var _a=VanillaContext.getMousePosition(e),x=_a.x,y=_a.y;Log_1.Log.d("requested axis",x,y),this.context.show(),this.context.setLocation({x:x,y:y})}},VanillaContext.prototype.onWindowClicked=function(e){Log_1.Log.d("onWindowClicked"),this.context&&!this.context.ul.contains(e.target)&&this.context.onDestroy()},VanillaContext.prototype.close=function(){Log_1.Log.d("close()"),this.context&&this.context.onDestroy()},VanillaContext.getMousePosition=function(event){var e=event,posx=0,posy=0;return e.pageX||e.pageY?(posx=e.pageX,posy=e.pageY):(e.clientX||e.clientY)&&(posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:posx,y:posy}},VanillaContext}();exports.VanillaContext=VanillaContext},612:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var VEvent_1=__webpack_require__(265),VUListElement_1=__webpack_require__(266),Renderer_1=__webpack_require__(613),Log_1=__webpack_require__(160),VLIElement=function(){function VLIElement(params){this.li=document.createElement("li"),this.events=new VEvent_1.VEventContainer,Log_1.Log.d("VLiElement"),this.li.className="vanilla-context-li",this.params=params,this.parseRenderer(),this.parseItemClass(),this.parseStyle(),this.parseClass(),this.parseDisabled(),this.setChild(),this.setEvent()}return VLIElement.prototype.setChild=function(){this.params.node.children&&(this.child=new VUListElement_1.VUListElement({context:this.params.context,e:this.params.e,parent:this,nodes:this.params.node.children}),this.li.appendChild(this.child.getElement()))},VLIElement.prototype.getElement=function(){return this.li},VLIElement.prototype.parseRenderer=function(){var renderer=this.params.node.renderer;if(Renderer_1.isClassRenderer(renderer))this.renderer=new renderer,this.renderer.init({api:this.params.context,originEvent:this.params.e});else if(Renderer_1.isFunctionRenderer(renderer)){var elementOrString=renderer({api:this.params.context,originEvent:this.params.e});if(elementOrString instanceof Node)this.li.appendChild(elementOrString);else{if("string"!=typeof elementOrString)throw new Error("Unsupported renderer type, you have to return Node or String");this.li.innerHTML=elementOrString}}else{if(!Renderer_1.isStringRenderer(renderer))throw new Error("Unsupported renderer type");this.li.innerHTML=renderer}if(this.params.node.children){var icon=document.createElement("div");icon.classList.add("vanilla-context-icon"),this.li.appendChild(icon)}},VLIElement.prototype.setEvent=function(){this.events.addEventListener(this.li,"click",this.onClick.bind(this)),this.events.addEventListener(this.li,"mouseover",this.onMouseOver.bind(this)),this.events.addEventListener(this.li,"mouseout",this.onMouseOut.bind(this))},VLIElement.prototype.onClick=function(e){e.target===this.li&&this.params.node.onClick&&(Log_1.Log.d("onClick"),this.params.node.onClick({api:this.params.context,event:e,originEvent:this.params.e}),this.params.context.options.autoClose&&this.params.context.close())},VLIElement.prototype.onMouseOver=function(e){Log_1.Log.d("onMouseOver"),this.li.classList.add("hover"),this.params.parent.select(this)},VLIElement.prototype.onMouseOut=function(e){Log_1.Log.d("onMouseOut"),this.li.classList.remove("hover")},VLIElement.prototype.openChild=function(){var _a,_b,_c=this.li.getBoundingClientRect(),top=_c.top,left=_c.left,width=_c.width;null===(_a=this.child)||void 0===_a||_a.show(),null===(_b=this.child)||void 0===_b||_b.setLocation({x:left+width,y:top})},VLIElement.prototype.closeChild=function(){var _a;null===(_a=this.child)||void 0===_a||_a.hide()},VLIElement.prototype.onDestroy=function(){var _a,_b;null===(_a=this.renderer)||void 0===_a||_a.destroy(),null===(_b=this.li.parentElement)||void 0===_b||_b.removeChild(this.li)},VLIElement.prototype.parseItemClass=function(){var itemClasses=this.params.context.options.itemClasses;if(itemClasses)if("function"==typeof itemClasses){var classList=itemClasses({api:this.params.context,originEvent:this.params.e});this.li.className=this.li.className+" "+classList}else this.li.className=this.li.className+" "+itemClasses},VLIElement.prototype.parseDisabled=function(){var disabled=this.params.node.disabled;disabled&&("boolean"==typeof disabled||"function"==typeof disabled&&disabled({api:this.params.context,originEvent:this.params.e}))&&this.li.classList.add("disabled")},VLIElement.prototype.parseStyle=function(){var style=this.params.node.style;style&&("function"==typeof style?Object.assign(this.li.style,style({api:this.params.context,originEvent:this.params.e})):Object.assign(this.li.style,style))},VLIElement.prototype.parseClass=function(){var classes=this.params.node.classes;if(classes)if("function"==typeof classes){var classList=classes({api:this.params.context,originEvent:this.params.e});this.li.className=this.li.className+" "+classList}else this.li.className=this.li.className+" "+classes},VLIElement}();exports.VLIElement=VLIElement},613:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isFunctionRenderer=function isFunctionRenderer(renderer){return"function"==typeof renderer&&!("init"in renderer)},exports.isClassRenderer=function isClassRenderer(renderer){return"function"==typeof renderer&&"init"in renderer},exports.isStringRenderer=function isStringRenderer(renderer){return"string"==typeof renderer}}},[[267,1,2]]]);
//# sourceMappingURL=main.f0e7e4be675c8a566adc.bundle.js.map