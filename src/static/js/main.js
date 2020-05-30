(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var messages=document.querySelector("#jsMessage"),sendMsg=document.querySelector("#jsSendMsg"),appendMsg=function(e,n){var s=document.createElement("li");s.innerHTML="\n    <span class=".concat(n?"out":"self",">").concat(n||"You",': </span>\n    <span class="content">').concat(e," </span>\n  "),messages.appendChild(s)},handleSendMsg=function(e){e.preventDefault();var n=sendMsg.querySelector("input"),s=n.value;n.value="",appendMsg(s)};sendMsg&&sendMsg.addEventListener("submit",handleSendMsg);

},{}],2:[function(require,module,exports){
"use strict";var _socket=require("./socket"),nickname=localStorage.getItem("nickname"),body=document.querySelector("body"),loginForm=document.querySelector("#jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",logIn=function(e){var n=io("/");n.emit(window.events.setNickname,{nickname:e}),(0,_socket.initSockets)(n)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,logIn(nickname)),loginForm&&loginForm.addEventListener("submit",function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;n.value="",localStorage.setItem(NICKNAME,o),logIn(o)});

},{"./socket":5}],3:[function(require,module,exports){
"use strict";require("./login"),require("./sockets"),require("./chat");

},{"./chat":1,"./login":2,"./sockets":6}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNewUser=void 0;var body=document.querySelector("body"),fireNotification=function(e,n){var o=document.createElement("span");o.innerText=e,o.style.backgroundColor=n,o.className="notification",body.appendChild(o)},handleNewUser=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(0, 122, 255)")};exports.handleNewUser=handleNewUser;var handleDisconnected=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(255, 149, 0)")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSockets=exports.updateSocket=exports.getSocket=void 0;var _notifications=require("./notifications"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSockets=function(e){var t=window.events;updateSocket(e),e.on(t.newUser,_notifications.handleNewUser),e.on(t.disconnected,_notifications.handleDisconnected)};exports.initSockets=initSockets;

},{"./notifications":4}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSockets=exports.updateSocket=exports.getSocket=void 0;var _notifications=require("./notifications"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSockets=function(e){var t=window.events;updateSocket(e),e.on(t.newUser,_notifications.handleNewUser),e.on(t.disconnected,_notifications.handleDisconnected)};exports.initSockets=initSockets;

},{"./notifications":4}]},{},[3]);
