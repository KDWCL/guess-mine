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
