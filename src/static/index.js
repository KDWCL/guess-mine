const socket = io("/");

const sendMessage = (message) => {
  socket.emit("newMessage", { message });
  // socket.emit("newMessage", message);
  // 똑같이 동작함. {message : "hello"}로 서버에서 받는다
  console.log(`You:${message}`);
};

const sendNickname = (nickname) => {
  socket.emit("newNickname", { nickname });
  // 닉네임을 유지하기 위해서는 데이터베이스와 연결해야함.
};

socket.on("messageNotif", ({ message, nickname }) => {
  console.log(`${nickname}:${message}`);
});
