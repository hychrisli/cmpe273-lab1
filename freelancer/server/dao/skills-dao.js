const {cnxPool, queryPromise} = require('./db');
const Crud = require('mysql-crud');
const skillCrud = Crud(cnxPool, 'SKILL');

module.exports = {

  retrieveAll: ()=>{
    return queryPromise(skillCrud.load, {});
  },

  retrieve: (skill_id)=>{
    return queryPromise(skillCrud.load, {id: skill_id});
  },

  insert: (attr)=>{
    return queryPromise(skillCrud.create, attr);
  },
};