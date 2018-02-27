const Model = require('../models/user-model');

module.exports =  class UserDao{
  constructor(){
    this.data = new Map();
    this.data.set(1, new Model(1, "Chris", "123"));
    this.data.set(2, new Model(2, 'HyX', "456"));
  };

  retrieveAll(){
    return Array.from(this.data.values());
  };

  retrieve(id){
    return this.data.get(id);
  };
};
