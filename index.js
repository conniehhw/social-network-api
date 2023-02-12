const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cors = require('cors');

// const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('/01-Activities/')[1]
//   : cwd;