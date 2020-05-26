import express from 'express';
import { join } from 'path';
import socketIO from 'socket.io';

const PORT = 4000;
const app = express();
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'view'));
app.use(express.static(join(__dirname, 'static')));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.get('/', (req, res) => res.render('home'));
app.listen(PORT, handleListening);
