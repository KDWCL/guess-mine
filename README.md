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

## 정리

### 클라이언트

1. [socket.io](https://slack-redir.net/link?url=http%3A%2F%2Fsocket.io) 라이브러리를 쓰고있는 서버에 페이지 요청을 했을 경우 /socket.io/socket.io.js 라는 파일을 덧붙여서 받게된다.
2. /socket.io/socket.io.js를 home.pug에 script을 추가해준다. 이제 클라이언트에서 io function을 쓸 수 있게된다.
3. 클라이언트용 main.js를 만들고 const socket = io() (클라이언트 소켓생성)를 해주게 되면 서버소켓에 연결요청을 한다.

### 서버

1. 서버에서 const io = socketIO.listen(app.listen(80));을 하게되면 서버 소켓인 io가 생성된다.
2. 클라이언트에서 연결요청을 하면 (const socket = io()) io.on("connection",(socket)=>{console.log(socket)}) 을 통해 connection 이벤트가 발생되고 콜백함수가 실행된다. 이 콜백함수는 인자로 클라이언트 데이터를 가지고 있는 socket을 인자로 사용한다. 이 소켓은 클라이언트에서 서버로 데이터를 보내면 서버에서 데이터를 담을 socket이라는 인스턴스를 만들고 거기에 담아서 콜백인자로 사용된다.
3. 소켓 api 들로는 socket.on, socket.emit , socket.broadcast.emit, io.broadcast.emit등이 있으며 on은 이벤트를 받을 때 , emit은 데이터를 보낼때, broadcast는 모든 소켓에게 보낼떄(io가 앞에오면 전부, socket이 앞에오면 해당 소켓제외 모든 클라이언트) 사용 된다.
4. 서버는 콜백 인자로 받은 socket 객체를 이용하여 socket.on, socket.emit, socket.broadcast.emit 등을 사용할 수 있다. 근데 이 콜백인자인 socket은 마지막으로 연결된 소켓이나마지막에 통신을 했던 소켓의 정보를 가진 socket 객체로 바뀌게 된다.

## To Do

- [x] Server
- [x] Pug
- [x] Static <-프론트엔드를 위한 정적인 파일들을 모아둠
- [x] SocketIO
