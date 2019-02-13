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
    $('.onlineUsers').append(`<p>${username}</p>`);
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
      $('.onlineUsers').append(`<p>${username}</p>`);
    }
  });

  // // Socket Listener: Disconnect
  socket.on('disconnect', () => {
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
  })

  // Refresh Online Users
  socket.on('user has left', (onlineUsers) => {
    $('.onlineUsers').empty();
    for(username in onlineUsers){
      $('.onlineUsers').append(`<p>${username}</p>`);
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

  // Enter Channel
socket.on('new channel', (newChannel) => {
  $('.channels').append(`<div class="channel">${newChannel}</div>`);
});

socket.on('user changed channel', (data) => {
  $('.channel-current').addClass('channel');
  $('.channel-current').removeClass('channel-current');
  $(`.channel:contains('${data.channel}')`).addClass('channel-current');
  $('.channel-current').removeClass('channel');
  $('.message').remove();
  data.messages.forEach((message) => {
    $('.messageContainer').append(`
      <div class="message">
        <p class="messageUser">${message.sender}: </p>
        <p class="messageText">${message.message}</p>
      </div>
    `);
  });
})


})
