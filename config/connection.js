const { connect, connection } = require('mongoose');

//a way to connect to database and export out that object; const db = require('./config/connection');
connect('mongodb://127.0.0.1:27017/userThoughtsDB', { //URI connection object or can be ://localhost, then dB name
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  
module.exports = connection;
