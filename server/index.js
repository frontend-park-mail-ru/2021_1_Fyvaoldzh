'use strict';

/**
 * nmp i - установка пакетов
 */

const express = require('express')

const app = express()
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public/login.html'));
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
