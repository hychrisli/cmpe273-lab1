const {cnxPool, queryPromise, insertPromise, countPromise} = require('./db');
const Crud = require('mysql-crud');
const skillCrud = Crud(cnxPool, 'SKILL');

module.exports = {

  count: () => {
    return countPromise('SKILL');
  },

  retrieveAll: (pagin)=>{
    return queryPromise(skillCrud.load, {}, pagin);
  },

  retrieve: (skill_id)=>{
    return queryPromise(skillCrud.load, {id: skill_id});
  },

  insert: (attr)=>{
    return insertPromise(skillCrud.create, attr);
  },
};