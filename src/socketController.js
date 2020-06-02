import events from "./events";
import { chooserWord } from "./words";

let sockets = [];
let inProgress = false; // "true면 게임시작, false면 게임종료"하는 용도
let word = null;
let leader = null;
let timeout = null;

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
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        leader = chooseLeader(); // 리더 선정
        word = chooserWord();
        superBroadcast(events.gameStarting);
        // 실행속도가 너무 빠르기 때문에 조금 늦춰주기 위해 setTimeout 사용
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          // 특정 소켓에 데이터를 보낼 때 사용 io.to().emit() or io.socket.to().emit()
          io.to(leader.id).emit(events.leaderNotif, { word });
          timeout = setTimeout(endGame, 10000);
        }, 3000);
      }
    }
  };

  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    setTimeout(() => startGame(), 3000);
  };

  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame();
    clearTimeout(timeout);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    // filter이용하여 disconnect되어진 socket만 빼고 sockets에 새로운 배열을 만들어 넣는다.
    sockets = sockets.filter((aSocket) => aSocket.nickname !== socket.nickname);

    // 참가자가 없으면 게임 종료 inProgress를 false로 변환
    // 리더가 나가도 inProgress를 false로 반환해서 게임종료
    if (sockets.length === 1) {
      endGame();
    } else if (leader) {
      if (leader.id === socket.id) {
        endGame();
      }
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.nickname}, word was: ${word}`,
        nickname: "Bot",
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    }
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
