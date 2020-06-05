const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const busboy = require('connect-busboy');
const logRequest = require('./middlewares/log-request');
const app = express();

// config
dotenv.config();
const PORT = process.env.PORT || 3000;

// set middlewares
app.use(express.json());
app.use(cors());
app.use(busboy());
app.use(logRequest());

// controllers
const c = {
  example: require('./controllers/example'),
};

// endpoints
const e = [

  // example
  ['get', '/example/list', c.example.list],
  ['get', '/example/get/:id', c.example.get],
  ['post', '/example/save', c.example.save],
  ['post', '/example/upload', c.example.upload],

];

// init

e.forEach(([method, route, handler]) => {
  app[method](route, handler);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}\n`);
});
