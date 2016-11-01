const http = require('http'); // use http node
const sander = require('sander'); // use sander node
const indexHtml = sander.createReadStream('./index.html');
const LiquorStore = require('./liquor-store'); // use module LiquorStore
const promiseLiquor = LiquorStore; // new Promise object
const bodyReader = require('./body-reader'); // use module bodyReader
// const filePath = __dirname + '/../liquor/';
const ss = require('storage-scout');

// initiate http server
const server = http.createServer(function(req, res) {

  if (req.url === '/') {
    res.statusCode = 200;
    indexHtml.pipe(res);
  }

  // list liquor types from directory 'liquor'
  // validated functionality of GET via Postman
  else if (req.url === '/liquor' && req.method === 'GET') {
    console.log('inside GET liquor list');
    promiseLiquor.getLiquorList('liquor')
    .then(function(data) {
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
  // validated functionality of GET via Postman
  else if (req.url === '/liquor/gin' && req.method === 'GET') {
    promiseLiquor.getLiquorType('liquor/gin.json')
    .then(function(data) {
      res.setHeader('content-type', 'application/json');
      res.write(data);
      res.end();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  // add new category of liquor
  // validated functionality of POST via Postman
  // incorporated usage of storageScout
  // Postman test with outputs 1.json & 2.json
  else if (req.url === '/liquor/tequila' && req.method === 'POST') {
    bodyReader(req, function(err, data) {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        ss.create(data) // ss == storageScout
        .then(function(data) {
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

  // modify contents of tequila file
  // validated functionality of PUT via Postman
  // incorporated usage of storageScout
  // Postman test output update to contents of 2.json ... changed tequila brand from Hornitos to Cuervo
  else if (req.url === '/liquor/2' && req.method === 'PUT') {
    bodyReader(req, function(err, data) {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        ss.update('2',data) // ss == storageScout
        .then(function(data) {
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

  // delete file 'whisky.json'
  // verified functionality of DELETE via Postman
  else if (req.url === '/liquor/whisky' && req.method === 'DELETE') {
    promiseLiquor.removeLiquor('liquor/whisky.json')
    .then(function() {
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
