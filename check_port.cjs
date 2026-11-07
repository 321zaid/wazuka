const http = require('http');
const https = require('https');

function checkPort(port, callback) {
  http.get({ port: port, hostname: 'localhost' }, (res) => {
    callback(true);
  }).on('error', (e) => {
    callback(false);
  });
}

checkPort(5173, (open) => {
  console.log('Port 5173:', open ? 'OPEN' : 'CLOSED');
  checkPort(5174, (open2) => {
    console.log('Port 5174:', open2 ? 'OPEN' : 'CLOSED');
  });
});