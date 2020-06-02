import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;

// Math.floor은 뒷자리 버림.
// Math.ceil은 뒷자리 올림.
// 리더를 랜덤으로 고른다.
const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

export default (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // 특정 url도 지정해줄 수 있음. io.of("/chart")
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      const leader = chooseLeader(); // 리더 선정
      word = chooseWord();
    }
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    // 연결되어진 클라이언트(브라우저)를 닫으면 console창에 disconnect 출력
    // console.log("disconnect");

    // fillter이용하여 disconnect되어진 socket만 빼고 sockets에 새로운 배열을 만들어 넣는다.
    sockets = sockets.filter((aSocket) => aSocket.nickname !== socket.nickname);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    console.log(socket.id);
    broadcast(events.newMsg, { message, nickname: socket.nickname });
  });

  socket.on(events.beginPath, ({ x, y }) => {
    // 내가 캔버스 위에서 마우스를 움직이면 움직인 좌표값들이 주르륵 나온다.
    console.log(x, y);
    broadcast(events.beganPath, { x, y });
  });

  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokePath, { x, y, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};
