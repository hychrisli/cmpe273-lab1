const {cnxPool, selectPromise} = require('./db');
const Crud = require('mysql-crud');
const userCrud = Crud(cnxPool, 'USER');

module.exports = {

  retrieveAll: () => {
    return selectPromise(userCrud.load, {});
  },

  retrieve: (username) => {
    return selectPromise(userCrud.load, {username: username});
  },

  insert: (attr) => {
    return selectPromise(userCrud.create, attr);
  },

  update: (attr) => {
    return selectPromise(userCrud.update, attr);
  }
};

