

// Middleware
const express = require('express');
const exphbs = require('express-handlebars');

// Initializing app and sever
const app = express();
const server = require('http').Server(app);

// Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};
io.on('connection', (socket) => {
  require('./sockets/chat.js')(io, socket, onlineUsers);
})


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


// HTTP: Index
app.get('/', (req, res) => {
  res.render('index.handlebars')
})

// Set Port
server.listen('3000', () => {
  console.log('Server listening on port 3000')
})
