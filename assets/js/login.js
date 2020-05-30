const nickname = localStorage.getItem("nickname"); // localstorage에서 가져온다.
const body = document.querySelector("body");
const loginForm = document.querySelector("#jsLogin");
const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const logIn = (nickname) => {
  // 이 함수는 로그인 처리와 동시에 nickname 설정도 처리한다.
  const socket = io("/"); // 서버 소켓과 연결
  socket.emit("setNickname", { nickname });
};

if (nickname === null) {
  // localstorage에 nickname이 없다면 loggedout 처리
  body.className = LOGGED_OUT;
} else {
  // localstorage에 nickname이 있다면 loggedin 처리
  body.className = LOGGED_IN;
  // 로그인 되었다면 이제 서버 소켓과 연결해야 되므로 함수를 만들어주자!
  logIn(nickname);
}

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
