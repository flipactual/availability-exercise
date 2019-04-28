const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const availability = require('./availability');
const book = require('./book');
const STORE = require('./store');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/availability', async (req, res) => {
  res.send(await availability());
});

app.get('/booked', async (req, res) => {
  res.send({ data: STORE });
});

app.get('/book', async (req, res) => {
  res.send(await book(req));
});

module.exports = app;
