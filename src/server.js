const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const gpio = require('./gpio.js');

const config = JSON.parse(fs.readFileSync('config.json', {
  encoding: 'UTF-8'
}));

console.log('Starting HTTP server');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/open', function(request, response) {
  if (request.body['passcode'] === config.passcode) {
    console.log('Access granted');
    gpio.openRemoteGpio();
    response.sendStatus(200);
  } else {
    console.log('Access denied', request.body['passcode']);
    response.sendStatus(401);
  }
});
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

var options = {
  key: fs.readFileSync(config.sslpath.key),
  cert: fs.readFileSync(config.sslpath.cert)
};
https.createServer(options, app).listen(config.https.port);
console.log('HTTP server started on port ' + config.https.port);
