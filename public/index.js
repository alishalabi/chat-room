$(document).ready( () => {
  const socket = io.connect();

  // Current user
  let currentUser;

  // Get online users from the server
  socket.emit('get online users');

  // Event Handler: New User
  $('#createUserBtn').click((e) => {
    e.preventDefault();
    if($('#usernameInput').val().length > 0) {
      socket.emit('new user', $('#usernameInput').val());
      currentUser = $('#usernameInput').val();
      $('.usernameForm').remove();
      $('.mainContainer').css('display', 'flex');
    }
  });

  // Event Handler: New Message
  $('#sendChatBtn').click((e) => {
    e.preventDefault();
    const message = $('#chatInput').val();
    if(message.length > 0){
      socket.emit('new message', {
        sender: currentUser,
        message: message,
      });
      $('#chatInput').val('');
    }
  });



  // Socket Listener: New User
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat!`);
    $('.userOnline').append(`<div class='userOnline'>${username}</div>`);
  });

  // Socket Listener: New Message
  socket.on('new message', (data) => {
    $('.messageContainer').append(`
      <div class="message">
        <p class="messageUser">${data.sender}: </p>
        <p class="messageText">${data.message}</p>
      </div>
      `);
  })


  // Socket Listener: Online Users
  socket.on('get online users', (onlineUsers) => {
    for(username in onlineUsers) {
      $('.userOnline').append(`<p class="userOnline">${username}</p>`);
    }
  });

  // Socket Listener: Disconnect
  socket.on('disconnect', () => {
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
  })

  // Refresh Online Users
  socket.on('user has left', (onlineUsers) => {
    $('.userOnline').empty();
    for(username in onlineUsers){
      $('.usersOnline').append(`<p>${username}</p>`);
    }
  })

  // Socket Listener: New Channel
  $('#newChannelBtn').click( () => {
    let newChannel = $('#newChannelInput').val();

    if(newChannel.length > 0){
      socket.emit('new channel', newChannel);
      $('#newChannelInput').val('');
    }
  })

  // Socket Listener: New Channel
  socket.on('new channel', (newChannel) => {
    console.log(`New channel: ${newChannel}`)
  })


})
