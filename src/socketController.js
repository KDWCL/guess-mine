import events from "./events";
export default (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    // 연결되어진 클라이언트(브라우저)를 닫으면 console창에 disconnect 출력
    // console.log("disconnect");
    broadcast(events.disconnected, { nickname: socket.nickname });
  });

  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.newMsg, { message, nickname: socket.nickname });
  });

  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });

  socket.on(events.strokePath, ({ x, y }) => {
    broadcast(events.strokePath, { x, y });
  });
};
