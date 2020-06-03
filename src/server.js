import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";
console.log(events);

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "view"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

// pug 템플릿에 events라는 새로운 변수를 준다.
app.get("/", (req, res) => {
  // events.js를 프론트에 넘겨주기 위해서 pug에 넘겨준다.
  return res.render("index", { events: JSON.stringify(events) });
});

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);
// socketio에게 서버를 잡고 있으라고 한다.
// http://localhost:4000/socket.io/socket.io.js를 쳐보면 프론트엔드 코드가 나오게 된다.

io.on("connection", (socket) => socketController(socket, io));
