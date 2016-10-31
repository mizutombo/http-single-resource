
const sander = require('sander');

// module.exports = function directoryReader(req, cb) { }

const LiquorStore = class LiquorStore {

  getLiquorList(dir) {
    return sander.readdir(dir); // yield 'gin.json', 'rum.json', 'vodka.json'}
  }

  getLiquorType(file) {
    return sander.readFile(file, {encoding:'utf8'}); // yield contents of 'gin.json' or 'rum.json' or 'vodka.json'
  }

  addLiquor(file, data) {
    return sander.writeFile(file, data);
  }

  removeLiquor(file) {
    return sander.unlink(file); // unlink file / remove liquor type
  }
};

module.exports = LiquorStore;
