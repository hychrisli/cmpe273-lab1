const {cnxPool, queryPromise, updatePromise} = require('./db');
const Crud = require('mysql-crud');
const userCrud = Crud(cnxPool, 'USER');

module.exports = {

  retrieveAll: () => {
    return queryPromise(userCrud.load, {});
  },

  retrieve: (username) => {
    return queryPromise(userCrud.load, {username: username});
  },

  insert: (attr) => {
    return queryPromise(userCrud.create, attr);
  },

  update: (username, attr) => {
    return updatePromise(userCrud.update, {username: username}, attr);
  }
};

