/**
 * приложение на экспресс
 * nmp i - установка пакетов
 */

const express = require('express');

const app = express();
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');

app.use('/public', express.static('public'));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
