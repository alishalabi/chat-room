

// Middleware
const express = require('express');
const exphbs = require('express-handlebars');

// Initializing app and sever
const app = express();
const server = require('http').Server(app);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// HTTP: Index
app.get('/', (req, res) => {
  res.render('index.handlebars')
})

// Set Port
server.listen('3000', () => {
  console.log('Server listening on port 3000')
})
