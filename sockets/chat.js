module.exports = (io, socket) => {

  // Listen: 'New User' socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the party!`);
    io.emit('new user', username);
  })

}
