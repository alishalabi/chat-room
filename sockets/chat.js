module.exports = (io, socket, onlineUsers) => {

  // Listen: 'New User' socket emits
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket.username = username;
    console.log(`${username} has joined the party!`);
    io.emit('new user', username);
  })

  // Listen: 'New Message' socket emits
  socket.on('new message', (data) => {
    console.log(`${data.sender}: ${data.message}`)
    io.emit('new message', data);
  });

  // Listen: 'Online Users' socket emits
  socket.on('get online users', () => {
    socket.emit('get online users', onlineUsers);
  })

  // Listen: User Disconneted
  socket.on('disconnect', () => {
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers)
  })

  // Socket Listener: New Channel
  socket.on('new channel', (newChannel) => {
    console.log(`New channel: ${newChannel}`)
  })

}
