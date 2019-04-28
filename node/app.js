const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const availability = require('./availability');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/availability', async (req, res) => {
  res.send(await availability());
});

app.post('/book', async (req, res) => {
  res.send('Got a POST request');
});

module.exports = app;
