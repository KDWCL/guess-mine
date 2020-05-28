import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "view"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);
// socketio에게 서버를 잡고 있으라고 한다.
// http://localhost:4000/socket.io/socket.io.js를 쳐보면 프론트엔드 코드가 나오게 된다.

io.on("connection", (socket) => {
  // 클라이언트에서 메세지를 보내면 그 메세지를 받을 수 있어야 한다. 그 메세지는 data 안에 들어가 있다.
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon",
    });
  });
  socket.on("newNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
