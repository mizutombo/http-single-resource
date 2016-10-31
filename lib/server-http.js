const http = require('http'); // use http node
const sander = require('sander'); // use sander node
const indexHtml = sander.createReadStream('./index.html');
const liquorStore = require('./liquor-store');
const promiseLiquor = new liquorStore; // new Promise object
const bodyReader = require('./body-reader');
// const Stream = require('stream');

// initiate http server
const server = http.createServer(function(req, res) {

  if (req.url === '/') {
    res.statusCode = 200;
    indexHtml.pipe(res);
  }

  else if (req.url === '/liquor' && req.method === 'GET') { // GOOD CODE
    promiseLiquor.getLiquorList('liquor')
    .then(function(data) {
      console.log(data);
      res.setHeader('content-type', 'text/html; charset=utf-8');
      for (var i = 0; i < data.length; i++) {
        res.write(data[i] + ' ... ');
      }
      res.end();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  else if (req.url === '/liquor/gin' && req.method === 'GET') { // GOOD CODE
    promiseLiquor.getLiquorType('liquor/gin.json')
    .then(function(data) {
      console.log(data);
      res.setHeader('content-type', 'application/json');
      res.write(data);
      res.end();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  else if (req.url === '/liquor/tequila' && req.method === 'POST') {
    bodyReader(req, function(err, data) {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        promiseLiquor.addLiquor('liquor/tequila.json', data)
        .then(function(data) {
          console.log(data);
          res.setHeader('content-type', 'application/json');
          res.write('data posted');
          res.end();
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });
  }



  else if (req.url === '/liquor/whisky' && req.method === 'DELETE') { // BUGGY
    promiseLiquor.removeLiquor('liquor/whisky.json')
    .then(function(data) {
      console.log(data);
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.write('removed whisky file');
      res.end();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  else {
    if (req.url === '/') {
      res.write('404 - Not Found');
    }
    res.end();
  }

});

const port = 8080;
server.listen(port);
console.log('listening on port 8080');
