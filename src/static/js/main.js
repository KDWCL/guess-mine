(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _socket=require("./socket"),nickname=localStorage.getItem("nickname"),body=document.querySelector("body"),loginForm=document.querySelector("#jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",logIn=function(e){var n=io("/");n.emit(window.events.setNickname,{nickname:e}),(0,_socket.initSockets)(n)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,logIn(nickname)),loginForm&&loginForm.addEventListener("submit",function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;n.value="",localStorage.setItem(NICKNAME,o),logIn(o)});

},{"./socket":5}],2:[function(require,module,exports){
"use strict";require("./login"),require("./notification");

},{"./login":1,"./notification":3}],3:[function(require,module,exports){
"use strict";var notification=document.querySelector("#jsNotifications");

},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewUser=void 0;var notifications=document.querySelector("#jsNotifications"),handleNewUser=function(e){var o=e.nickname;console.log("".concat(o," just joined"))};exports.handleNewUser=handleNewUser;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSockets=exports.updateSocket=exports.getSocket=void 0;var _notifications=require("./notifications"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(t){return socket=t};exports.updateSocket=updateSocket;var initSockets=function(t){var e=window.events;updateSocket(t),t.on(e.newUser,_notifications.handleNewUser)};exports.initSockets=initSockets;

},{"./notifications":4}]},{},[2]);