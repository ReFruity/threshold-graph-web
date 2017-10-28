const { execFileSync } = require('child_process');
const html = require('html');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let cache = [];
function circularReferenceResolver (key, value) {
  if (typeof value === 'object' && value !== null) {
    if (cache.indexOf(value) !== -1) {
      // Circular reference found, discard key
      return;
    }
    // Store value in our collection
    cache.push(value);
  }
  return value;
}

app.post('/calculate', function(req, res) {
  console.log("req.body: ", req.body);
  const resultBuffer = execFileSync('bin/threshold_graph.exe', ["3", "3", "2", "1", "1", "1", "1"]);
//  console.log(`result:\n${resultBuffer.toString()}`);
//  fs.writeFileSync('bin/sample', resultBuffer);
  fs.writeFileSync('bin/req', JSON.stringify(req, circularReferenceResolver, 2));
//  fs.writeFileSync('bin/res', JSON.stringify(req, circularReferenceResolver, 2));
//  res.send(resultBuffer.toString())
//  res.render('index', { result: resultBuffer.toString() });
//  res.render('result', { result: resultBuffer.toString() })
  res.send(resultBuffer.toString());
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});