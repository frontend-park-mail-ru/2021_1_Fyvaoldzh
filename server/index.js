/**
 * приложение на экспресс
 * nmp i - установка пакетов
 */

const express = require('express');

const app = express();
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const distDir = path.resolve(__dirname, '..', 'dist');

app.use('/src', express.static('src'));

app.use(express.static(distDir));

app.get('*', (req, res) => {
  res.sendFile(`${distDir}/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
