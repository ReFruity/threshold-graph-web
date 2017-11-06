const { execFileSync } = require('child_process');
const html = require('html');
const fs = require('fs');
const pug = require('pug');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index')
});

app.post('/partition', function(req, res) {
  console.log("req.body: ", req.body);
  const args = req.body.partition.split(' ');
  const resultBuffer = execFileSync('bin/partition', args);
  res.render('result', { result: resultBuffer.toString() })
});

app.post('/statistics', function(req, res) {
  console.log("req.body: ", req.body);
  const args = [req.body.size, req.body.seed, req.body.iterations];
  const resultBuffer = execFileSync('bin/statistics', args);
  res.render('result', { result: resultBuffer.toString() })
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});