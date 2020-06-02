import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.querySelector("#jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickname = localStorage.getItem("nickname"); // localstorage에서 가져온다.

const logIn = (nickname) => {
  // 이 함수는 로그인 처리와 동시에 nickname 설정도 처리한다.
  // eslint-disable-next-line no-undef
  const socket = io("/"); // 서버 소켓과 연결
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

// 첫번째 함수
if (nickname === null) {
  // localstorage에 nickname이 없다면 loggedout 처리
  body.className = LOGGED_OUT;
} else {
  // localstorage에 nickname이 있다면 loggedin 처리
  body.className = LOGGED_IN;
  // 로그인 되었다면 이제 서버 소켓과 연결해야 되므로 함수를 만들어주자!
  logIn(nickname);
}

// 두번째 함수
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = loginForm.querySelector("input");
    const { value } = input;
    input.value = "";
    // 로컬 스토리지에 저장
    localStorage.setItem(NICKNAME, value);
    // 저장한 뒤에 서버 소켓과 연결해야되므로 함수를 만들어주자!
    logIn(value);
  });
}

/* 
1. localhost:4000에 접속 시 localstorage에 nickname이 없다면 body 클래스명을 loggedOut으로 한다.
2. localhost:4000에 접속 시 localstorage에 nickname이 있다면 body 클래스명을 loggedIn으로 한다.
3. localhost:4000에 접속 시 localstorage에 nickname이 있다면 nickname을 서버에 보낸다. (socket.emit() 사용)
4. 서버에서 nickname을 받아서 다른 클라이언트 소켓에 broadcast를 한다. 즉, 접속을 알린다.
*/
