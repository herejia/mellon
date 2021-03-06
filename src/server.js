const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const gpio = require('./gpio.js');
const rootDir = __dirname + '/..';

const config = JSON.parse(fs.readFileSync('/etc/mellon/config.json', {
  encoding: 'UTF-8'
}));

console.log('Starting HTTP server');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public'));

app.post('/open', function(request, response) {
  if (request.body['passcode'] === config.passcode) {
    console.log('Access granted');
    gpio.openRemoteGpio();
    response.redirect('/');
  } else {
    console.log('Access denied', request.body['passcode']);
    response.redirect('/');
  }
});
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: rootDir + '/public' });
});

var options = {
  key: fs.readFileSync(config.sslpath.key),
  cert: fs.readFileSync(config.sslpath.cert)
};
https.createServer(options, app).listen(config.https.port);
console.log('HTTP server started on port ' + config.https.port);
