module.exports = (io, socket) => {

  // Listen: 'New User' socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the party!`);
    io.emit('new user', username);
  })

  // Listen: 'New Message' socket emits
  socket.on('new message', (data) => {
    console.log(`${data.sender}: ${data.message}`)
    io.emit('new message', data);
  });

}
