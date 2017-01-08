const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const rimraf = require('rimraf');
const path = require('path');

const server = require('../lib/server-http');

describe('test liquor e2e', () => {

  const testDir = path.join(__dirname, 'test-dir');
  const removeDir = done => rimraf(testDir, done);
  before(removeDir);
  after(removeDir);

  // pull in server-http.js (server) for testing
  const request = chai.request(server);

  // introduce 1st test case liquor object ... gin
  const gin = { // eslint-disable-line
    country: 'England',
    brand: 'Tanqueray',
  };

  // introduce 2nd test case liquor object ... tequila
  const tequila = { // eslint-disable-line
    country: 'Mexico',
    brand: 'Herradura',
  };

  it('/GET confirm all empty on init', done => { // PASS
    request
      .get('/liquor')
      .then(res => {
        assert.deepEqual(res.body, {});
        done();
      })
      .catch(done);
  });

  it('/POST', done => {
    request
      .post('/liquor')
      .send(gin)
      .then(res => {
        const liquor = res.text;
        assert.include(liquor, '"country":"England","brand":"Tanqueray"');
        gin.id = JSON.parse(res.text).id; // set gin's id to id from res.text
        console.log(gin.id);
        done();
      })
      .catch( done );
  });

  it('/GET by id', done => { // PASS
    request
      .get(`/liquor/${gin.id}`)
      .then(res => {
        console.log(res.text);
        const liquor = res.text;
        assert.include(liquor, `"id":${gin.id}`); // use gin's id from previous test
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => { // PASS
    request
      .get('/liquor')
      .then(res => {
        const liquor = res.text;
        assert.include(liquor, '"country":"England","brand":"Tanqueray"');
        done();
      })
      .catch(done);
  });

  it('/POST ... add another type of liquor ... tequila', done => { // PASS
    request
      .post('/liquor')
      .send({country: 'Mexico', brand: 'Herradura'})
      .then(res => {
        const liquor = res.text;
        assert.include(liquor, '"country":"Mexico","brand":"Herradura"');
        tequila.id = JSON.parse(res.text).id; // set tequila's id to id from res.text
        console.log(tequila.id);
        done();
      })
      .catch(done);
  });

  it('/PUT ... change brand of tequila', done => { // PASS
    request
      .put(`/liquor/${tequila.id}`)
      .send({brand: 'Hornitos'})
      .then(res => {
        console.log(res.text);
        const liquor = res.text;
        assert.include(liquor, '"brand":"Hornitos"');
        done();
      })
      .catch(done);
  });

  it('/DELETE by id', done => { // PASS
    request
      .del(`/liquor/${gin.id}`)
      .then(res => {
        console.log(res.text);
        const liquor = res.text;
        assert.include(liquor, `${gin.id}`);
        done();
      })
      .catch(done);
  });

});
