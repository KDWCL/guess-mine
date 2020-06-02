import {
  hideControls,
  disableCanvas,
  enableCanvas,
  showControls,
  resetCanvas,
} from "./paint";
import { disableChat } from "./chat";

const board = document.querySelector("#jsPBoard");
const notifs = document.querySelector("#jsNotifs");

const addPlayers = (players) => {
  board.innerHTML = ""; // jsPBoard안에 요소들을 한번 싹 지워준다.
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => {
  addPlayers(sockets);
};

const setNotifs = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handleGameStarted = () => {
  // 게임이 시작되면 #jsNotifis는 비워줘야 함.
  setNotifs("");
  // disable canvas events
  disableCanvas();
  // hide the canvas controls
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat(); // 리더는 채팅을 못하게함.
  setNotifs(`you are the leader, paint: ${word}`);
};

export const handleGameEnded = () => {
  setNotifs("Game ended");
  disableCanvas();
  hideControls();
  resetCanvas();
};

export const handleGameStarting = () => {
  setNotifs("Game will start soon");
};
