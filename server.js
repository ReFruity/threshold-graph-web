const { spawn } = require('child_process');
const express = require('express');
const  path = require('path');

const app = express();
const thresholdGraph = spawn('bin/threshold_graph.exe');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/calculate', function(req, res) {
//  console.log('reg: ', req);
//  console.log('res ', res);
  console.log('in calculate')
  thresholdGraph.stdout.on('data', data => {
    console.log('data: ', data.toString());
//    res.send(data.toString())
  });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});