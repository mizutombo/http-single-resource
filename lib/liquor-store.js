
const sander = require('sander');

// module.exports = function directoryReader(req, cb) { }

const LiquorStore = {

  getLiquorList(dir) { // use for GET list of liquor types in directory
    return sander.readdir(dir); // yield 'gin.json', 'rum.json', 'vodka.json'}
  },

  getLiquorType(file) { // use for GET contents of specific liquor file
    return sander.readFile(file, {encoding:'utf8'}); // yield contents of 'gin.json' or 'rum.json' or 'vodka.json'
  },

  addLiquorType(file, data) { // use for POST file with new type of liquor
    return sander.writeFile(file, data);
  },

  modifyLiquorFile(file, data) { // use for PUT ... change file contents of liquor
    return sander.writeFile(file, data);
  },

  removeLiquor(file) { // use for DELETE file for specific liquor type
    return sander.unlink(file); // unlink file / remove liquor type
  }
};

module.exports = LiquorStore;
