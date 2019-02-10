$(document).ready( () => {
  const socket = io.connect();

  // Socket Event: New User
  $('#createUserBtn').click((e) => {
    e.preventDefault();
    let username = $('#usernameInput').val();
    if(username.length > 0) {
      socket.emit('new user', username);
      $('.usernameForm').remove();
    }
  })

  // Socket Listener: New User
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat!`)
  })
})
