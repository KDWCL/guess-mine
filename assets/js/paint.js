import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const controls = document.getElementById("jsControls");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 새로 만든 함수1
const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

// 새로 만든 함수2
const strokePath = (x, y, color = null) => {
  let currentColor = ctx.strokeStyle; // 원래 자기색으로 마지막 되돌리기 위해서 선언
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor; // 원래 자기색으로 되돌린다.
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    // 클라이언트에서 path를 만들면 그 값을 서버로 보낸다.
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    // 클라이언트에서 path를 만들면 그 값을 서버로 보낸다.
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle,
    });
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

const fill = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentColor; // 자신의 클릭되어졌었던 원래색으로 되돌림
};

function handleCanvasClick() {
  if (filling) {
    // ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    fill();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
  }
}

function handleCM(event) {
  event.preventDefault();
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// socekts.js를 위해 만들어준 함수
// 다른 클라이언트 canvas에 그림을 그려주는 역할을 한다.
export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStrokedPath = ({ x, y, color }) => strokePath(x, y, color);
export const handleFilled = ({ color }) => {
  fill(color);
};

export const disableCanvas = () => {
  // removeEventListener을 사용하기 위해선 똑같은 이벤트와 콜백함수를 넣어줘야함.
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", handleCanvasClick);
};

export const enableCanvas = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
};

export const hideControls = () => (controls.style.opacity = 0);
export const showControls = () => (controls.style.opacity = 1);

if (canvas) {
  enableCanvas();
  canvas.addEventListener("contextmenu", handleCM);
}
