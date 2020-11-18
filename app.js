require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');

// const commandRouter = require('./services/command/command.router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.get('/heartbeat', (req, res) => res.status(200).send('beep!'));
}

// app.use('/', commandRouter);

module.exports = app;
