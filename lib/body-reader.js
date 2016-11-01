
module.exports = function bodyReader(req, cb) {

  let body = '';

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    try {
      cb(null, body);
    }
    catch (err) {
      cb(err);
    }
  });
};
