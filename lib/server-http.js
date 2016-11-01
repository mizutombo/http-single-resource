const http = require('http'); // use http node
const sander = require('sander'); // use sander node
// const path = require('path');
const indexHtml = sander.createReadStream('./index.html');
const LiquorStore = require('./liquor-store'); // use module LiquorStore
const promiseLiquor = new LiquorStore; // new Promise object
const bodyReader = require('./body-reader'); // use module bodyReader

// initiate http server
const server = http.createServer(function(req, res) {

  if (req.url === '/') {
    res.statusCode = 200;
    indexHtml.pipe(res);
  }

  // list liquor types from directory 'liquor'
  else if (req.url === '/liquor' && req.method === 'GET') {
    console.log('inside GET liquor list');
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

  // get contents of 'gin.json' file
  else if (req.url === '/liquor/gin' && req.method === 'GET') {
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

  // add new category of liquor
  else if (req.url === '/liquor/tequila' && req.method === 'POST') {

    console.log('in POST function for tequila');
    // const baseDir = path.join(__dirname, '../liquor/tequila.json');
    bodyReader(req, function(err, data) {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        console.log('in "else" flow path');
        promiseLiquor.addLiquorType('liquor/tequila.json', data)
        .then(function(data) {
          console.log('in "addLiquorType" path');
          console.log(data);
          res.setHeader('content-type', 'application/json');
          res.write(data);
          res.end();
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });
  }

  // modify contents of 'tequila.json' file
  else if (req.url === '/liquor/tequila' && req.method === 'PUT') {
    bodyReader(req, function(err, data) {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        promiseLiquor.modifyLiquorFile('liquor/tequila.json', data)
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

  // delete file 'whisky.json'
  else if (req.url === '/liquor/whisky' && req.method === 'DELETE') {
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

module.exports = server;
