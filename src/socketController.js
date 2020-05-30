export default (socket) => {
  socket.on("setNickname", ({ nickname }) => {
    console.log(nickname);
    socket.nickname = nickname;
  });
};
