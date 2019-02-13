module.exports = (io, socket, onlineUsers, channels) => {

  // Listen: 'New User' socket emits
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket.username = username;
    console.log(`${username} has joined the party!`);
    io.emit('new user', username);
  })

  // Listen: 'New Message' socket emits
  socket.on('new message', (data) => {
    channels[data.channel].push({sender: data.sender, message: data.message});
    io.to(data.channel).emit('new message', data);
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
    channels[newChannel] = [];
    socket.join(newChannel);
    io.emit('new channel', newChannel);
    socket.emit('user changes channel', {
      channel: newChannel,
      messages: channels[newChannel]
    })
  })

}
