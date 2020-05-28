Realtime Drawing Game built with SocketIO, Gulp and Node

## Install

yarn add @babel/{core,node,preset-env}
yarn add express
yarn add nodemon
yarn add socket.io

```
    "@babel/core": "^7.9.6",
    "@babel/node": "^7.8.7",
    "@babel/preset-env": "^7.9.6",
    "express": "^4.17.1",
    "nodemon": "^2.0.4",
    "socket.io": "^2.3.0"
```

## Babel Setting

.babelrc

```
    {
        "presets": ["@babel/preset-env"]
    }

```

## ESLint

.eslintrc <- eslint extension install

```
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.3",
    "prettier": "^2.0.5",
```

```
    module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
     },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "no-console": "off", // console.log를 허용하지 않는다.
    },
};
```

## To Do

- [x] Server
- [x] Pug
- [x] Static <-프론트엔드를 위한 정적인 파일들을 모아둠
- [] SocketIO

## SocketIO

SocketIO란 Socket을 구현한 것이다. WebSocket 개발을 쉽게 하기 위한 것이다.
실시간 분석, 즉각적인 메시지나 채팅, 바이너리 스트리밍, 문서 공동작업 등을 할 수 있다.

우리는 SocketIO를 이용하여 서버위에 다른 서버를 올릴 수 있다. http와 traffic이 다르기 때문에 가능하다. 즉 ws와 http는 공존이 가능하다.

SocketIO는 서버와 클라이언트가 동시에 될 수 있다. WebSocket서버와 WebSocket클라이언트가 있다는 뜻이다. SocketIO로 서버를 프로그래밍 할 수 있고 클라이언트도 프로그래밍 가능하다. SocketIO는 서버와 클라이언트 둘다에 설치해야 한다.

http://localhost:4000/socket.io/socket.io.js를 쳐보면 프론트엔드 코드가 나오게 된다. 서버에서 html과 js파일을 보낸 것이다.

### SocketIO에서 io란?

```javascript
const server = app.listen(PORT, () => {
  console.log("서버 대기 중");
});
const io = socketIO.listen(server);
```

server 라는 변수를 만들어준 이유는 socketIO에 전달하기 위해서이다.
io라는 변수를 만들어 준 이유는 io가 모든 이벤트를 알아야하기 떄문이다. Socket은 HTTP처럼 라우터(라우터란 라우트가 일치할때 라우트핸들함수를 실행시켜주는 역할)가 없고 연결만 있으며 **이벤트**를 가지고 있다. 이벤트란 모든 것이 될 수 있다. 서버와 클라이언트는 이벤트를 받을 수 있고 보낼 수 있다. 또한 이벤트에서 가장 중요한 것은 **connection**이다.
**connection 이벤트는 서버와 클라이언트가 연결이 되었을 때 실행되는 이벤트라고 생각하면 된다.**

```javascript
io.on("connection", () => console.log("Somebody Connected"));
```

클라이언트에 스크립트를 추가해준다. 클라이언트도 소켓을 생성한다.

```html
<!DOCTYPE html> html(lang="en") head meta(charset="UTF-8") meta(name="viewport",
content="width=device-width, initial-scale=1.0") title Guess Mine body h1 Hello
script(src="/socket.io/socket.io.js")
```

이제 console창에 io를 쳐보면 엄청 긴 함수가 출력된다. 이제 io("/")를 쳐보면

```
GET / 200 68.994 ms - 244
GET /favicon.ico 404 1.186 ms - 150
GET / 304 13.290 ms - -
GET / 304 11.743 ms - -
Somebody Connected
```

가 출력 된다. 다른 브라우저를 열고 io("/")를 치게 되면 Somebody Connected가 2개가 된다. 즉 클라이언트가 2개가 연결되었다는 뜻이다.

자, 여기서 알아야 될 것은 소켓에 연결된 서버가 꺼졌을 경우 소켓은 계속해서 서버의 이벤트를 듣고 있고 서버에 접속시도를 하게 된다. 다시 서버가 살아나면 소켓과 서버는 자동으로 다시 연결된다.

소켓이란 request객체이다. express위에서 보내는 HTTP요청 같은.
어떤 요청이나 응답을 받고 request를 콘솔에 출력할 수 있다.
socket은 socket id를 가지고 있다.
