/*
nmp i - установка пакетов
 */

const http = require('http');
const fs = require('fs');
const debug = require('debug');

const log = debug('server');

const server = http.createServer((req, res) => {
  log('request', req.url);

  let file = 'index.html';

  fs.readFile('public/index.html', (err, data) => {
    if (err) {
      log('error', err);
      res.end();

      return;
    }
    res.write(data);

    res.end();

  });

});

server.listen(8000);