const socket = io("/");

const sendMessage = (message) => {
  socket.emit("newMessage", { message: message });
  console.log(`You : ${message}`);
};

const setNickname = (nickname) => {
  socket.emit("setNickname", { nickname: nickname });
};

socket.on("messageNotif", ({ message, nickname }) => {
  console.log(`${nickname} : ${message}`);
});
